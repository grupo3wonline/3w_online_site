/**
 * Núcleo de cálculo dos indicadores financeiros.
 * Funções puras, sem efeitos colaterais — testáveis isoladamente.
 */
import { z } from 'zod'
import { formatCurrency, formatDecimal, formatPercent } from './format'

/** Identificadores dos 12 campos de entrada. */
export const FIELD_IDS = [
  'revenue',
  'ebit',
  'depreciation',
  'netIncome',
  'equity',
  'totalAssets',
  'marketCap',
  'enterpriseValue',
  'dividends',
  'currentAssets',
  'currentLiabilities',
  'inventory',
] as const

export type FieldId = (typeof FIELD_IDS)[number]

export const FIELD_LABELS: Record<FieldId, string> = {
  revenue: 'Receita',
  ebit: 'EBIT',
  depreciation: 'Depreciação e Amortização',
  netIncome: 'Lucro Líquido',
  equity: 'Patrimônio Líquido',
  totalAssets: 'Total de Ativos',
  marketCap: 'Valor de Mercado',
  enterpriseValue: 'Valor da Empresa',
  dividends: 'Dividendos',
  currentAssets: 'Ativos Circulantes',
  currentLiabilities: 'Passivos Circulantes',
  inventory: 'Estoque',
}

export type FinancialInputs = Record<FieldId, number>

export type IndicatorKey =
  | 'ebitda'
  | 'valuation'
  | 'pl'
  | 'evEbitda'
  | 'roe'
  | 'roa'
  | 'profitMargin'
  | 'dividendYield'
  | 'currentRatio'
  | 'quickRatio'

export type IndicatorStatus = 'good' | 'warning' | 'bad' | 'neutral'

export interface IndicatorResult {
  key: IndicatorKey
  name: string
  value: number
  formatted: string
  description: string
  status: IndicatorStatus
  statusLabel: string
}

/** Schema Zod: valores numéricos finitos e não negativos (exceto os que podem ser negativos). */
const numberField = z.number({ invalid_type_error: 'Valor inválido' }).finite('Valor inválido')

// Campos que aceitam valores negativos (prejuízo/resultado negativo).
const signedFields: FieldId[] = ['ebit', 'netIncome', 'equity']

export const financialInputsSchema = z.object(
  FIELD_IDS.reduce(
    (acc, id) => {
      acc[id] = signedFields.includes(id)
        ? numberField
        : numberField.min(0, 'Não pode ser negativo')
      return acc
    },
    {} as Record<FieldId, typeof numberField>,
  ),
) as z.ZodType<FinancialInputs>

/** Divisão segura: retorna 0 quando o denominador é 0. */
function safeDiv(numerator: number, denominator: number): number {
  return denominator === 0 ? 0 : numerator / denominator
}

const STATUS_LABELS: Record<IndicatorStatus, string> = {
  good: 'Bom',
  warning: 'Alerta',
  bad: 'Atenção',
  neutral: 'Informativo',
}

function classify(v: number, good: number, warn: number): IndicatorStatus {
  if (v > good) return 'good'
  if (v > warn) return 'warning'
  return 'bad'
}

/** Determina o status de um indicador conforme faixas de mercado. */
export function getIndicatorStatus(key: IndicatorKey, value: number): IndicatorStatus {
  switch (key) {
    case 'roe':
      return classify(value, 15, 8)
    case 'roa':
      return classify(value, 10, 5)
    case 'profitMargin':
      return classify(value, 15, 5)
    case 'dividendYield':
      return classify(value, 5, 2)
    case 'currentRatio':
      return classify(value, 1.5, 1)
    case 'quickRatio':
      return classify(value, 1, 0.5)
    case 'pl':
      if (value > 0 && value < 15) return 'good'
      if (value >= 15 && value < 25) return 'warning'
      return 'bad'
    case 'evEbitda':
      if (value > 0 && value < 8) return 'good'
      if (value < 15) return 'warning'
      return 'bad'
    default:
      return 'neutral'
  }
}

/** Calcula os 10 indicadores a partir das entradas validadas. */
export function calculateIndicators(values: FinancialInputs): IndicatorResult[] {
  const {
    revenue,
    ebit,
    depreciation,
    netIncome,
    equity,
    totalAssets,
    marketCap,
    enterpriseValue,
    dividends,
    currentAssets,
    currentLiabilities,
    inventory,
  } = values

  const ebitda = ebit + depreciation
  const pl = safeDiv(marketCap, netIncome)
  const evEbitda = safeDiv(enterpriseValue, ebitda)
  const roe = safeDiv(netIncome, equity) * 100
  const roa = safeDiv(netIncome, totalAssets) * 100
  const profitMargin = safeDiv(netIncome, revenue) * 100
  const dividendYield = safeDiv(dividends, marketCap) * 100
  const currentRatio = safeDiv(currentAssets, currentLiabilities)
  const quickRatio = safeDiv(currentAssets - inventory, currentLiabilities)

  const raw: Omit<IndicatorResult, 'status' | 'statusLabel'>[] = [
    {
      key: 'ebitda',
      name: 'EBITDA',
      value: ebitda,
      formatted: formatCurrency(ebitda),
      description: 'Lucro antes de juros, impostos, depreciação e amortização',
    },
    {
      key: 'valuation',
      name: 'Valuation',
      value: marketCap,
      formatted: formatCurrency(marketCap),
      description: 'Valor de mercado da empresa',
    },
    {
      key: 'pl',
      name: 'P/L',
      value: pl,
      formatted: `${formatDecimal(pl)}x`,
      description: 'Preço sobre Lucro',
    },
    {
      key: 'evEbitda',
      name: 'EV/EBITDA',
      value: evEbitda,
      formatted: `${formatDecimal(evEbitda)}x`,
      description: 'Valor da empresa sobre EBITDA',
    },
    {
      key: 'roe',
      name: 'ROE',
      value: roe,
      formatted: formatPercent(roe),
      description: 'Retorno sobre Patrimônio Líquido',
    },
    {
      key: 'roa',
      name: 'ROA',
      value: roa,
      formatted: formatPercent(roa),
      description: 'Retorno sobre Ativos Totais',
    },
    {
      key: 'profitMargin',
      name: 'Margem de Lucro',
      value: profitMargin,
      formatted: formatPercent(profitMargin),
      description: 'Percentual de lucro sobre receita',
    },
    {
      key: 'dividendYield',
      name: 'Dividend Yield',
      value: dividendYield,
      formatted: formatPercent(dividendYield),
      description: 'Rendimento de dividendos',
    },
    {
      key: 'currentRatio',
      name: 'Liquidez Corrente',
      value: currentRatio,
      formatted: formatDecimal(currentRatio),
      description: 'Capacidade de pagamento de curto prazo',
    },
    {
      key: 'quickRatio',
      name: 'Liquidez Seca',
      value: quickRatio,
      formatted: formatDecimal(quickRatio),
      description: 'Liquidez excluindo estoques',
    },
  ]

  return raw.map((item) => {
    const status = getIndicatorStatus(item.key, item.value)
    return { ...item, status, statusLabel: STATUS_LABELS[status] }
  })
}

/** Metadados visuais (ícone Iconify + cores) por indicador. */
export const INDICATOR_ICONS: Record<IndicatorKey, { icon: string; bg: string; color: string }> = {
  ebitda: {
    icon: 'mdi:cash-multiple',
    bg: 'bg-green-100 dark:bg-green-900/30',
    color: 'text-green-600 dark:text-green-400',
  },
  valuation: {
    icon: 'mdi:bank',
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    color: 'text-blue-600 dark:text-blue-400',
  },
  pl: {
    icon: 'mdi:scale-balance',
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    color: 'text-purple-600 dark:text-purple-400',
  },
  evEbitda: {
    icon: 'mdi:chart-line',
    bg: 'bg-indigo-100 dark:bg-indigo-900/30',
    color: 'text-indigo-600 dark:text-indigo-400',
  },
  roe: {
    icon: 'mdi:trending-up',
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    color: 'text-emerald-600 dark:text-emerald-400',
  },
  roa: {
    icon: 'mdi:percent',
    bg: 'bg-teal-100 dark:bg-teal-900/30',
    color: 'text-teal-600 dark:text-teal-400',
  },
  profitMargin: {
    icon: 'mdi:hand-coin',
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    color: 'text-amber-600 dark:text-amber-400',
  },
  dividendYield: {
    icon: 'mdi:piggy-bank',
    bg: 'bg-pink-100 dark:bg-pink-900/30',
    color: 'text-pink-600 dark:text-pink-400',
  },
  currentRatio: {
    icon: 'mdi:water',
    bg: 'bg-cyan-100 dark:bg-cyan-900/30',
    color: 'text-cyan-600 dark:text-cyan-400',
  },
  quickRatio: {
    icon: 'mdi:lightning-bolt',
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    color: 'text-orange-600 dark:text-orange-400',
  },
}

/** Dados de exemplo (empresa fictícia) para demonstração. */
export const EXAMPLE_DATA: Record<FieldId, string> = {
  revenue: '5.000.000,00',
  ebit: '800.000,00',
  depreciation: '120.000,00',
  netIncome: '550.000,00',
  equity: '2.200.000,00',
  totalAssets: '4.500.000,00',
  marketCap: '8.000.000,00',
  enterpriseValue: '9.500.000,00',
  dividends: '180.000,00',
  currentAssets: '1.800.000,00',
  currentLiabilities: '900.000,00',
  inventory: '350.000,00',
}
