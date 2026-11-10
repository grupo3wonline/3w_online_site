/**
 * Funções puras de cálculo da calculadora freelancer.
 * Sem dependência de UI — facilita testes unitários e reuso (SRP).
 */

export type Complexity = 'low' | 'medium' | 'high'

export interface HourlyRateInput {
  /** Receita mensal desejada (R$) */
  monthlyGoal: number
  /** Horas trabalhadas por dia */
  dailyHours: number
  /** Dias trabalhados por semana */
  workDays: number
  /** Dias de férias/folga por ano */
  vacationDays: number
  /** Margem de lucro desejada (%) */
  profitMargin: number
  /** Impostos sobre o faturamento (%) — ex.: Simples/MEI. Opcional. */
  taxRate?: number
  /** Taxa de plataforma/intermediação (%) — ex.: marketplaces. Opcional. */
  platformFee?: number
}

export interface HourlyRateResult {
  /** Valor final por hora (R$) já com margem, impostos e taxas */
  rate: number
  /** Valor base por hora, apenas custo/meta sem acréscimos */
  baseRate: number
  /** Total de horas faturáveis por ano */
  billableHours: number
  /** Faturamento mensal projetado com o valor final */
  monthlyProjected: number
  /** Faturamento anual projetado com o valor final */
  yearlyProjected: number
}

export interface ProjectInput {
  /** Estimativa de horas do projeto */
  projectHours: number
  /** Valor por hora (R$) */
  hourlyRate: number
  /** Complexidade do projeto */
  complexity: Complexity
  /** Desconto aplicado ao valor (%) — opcional */
  discount?: number
}

export interface ProjectResult {
  /** Valor bruto (horas × valor/hora × complexidade) */
  gross: number
  /** Valor do desconto aplicado (R$) */
  discountAmount: number
  /** Valor final após desconto (R$) */
  total: number
}

export interface DeadlineInput {
  /** Total de horas estimadas */
  totalHours: number
  /** Horas disponíveis por dia */
  dailyAvailability: number
  /** Incluir fins de semana na contagem? (padrão: false = só dias úteis) */
  includeWeekends?: boolean
  /** Data de início (padrão: hoje) */
  startDate?: Date
}

export interface DeadlineResult {
  /** Dias de trabalho necessários */
  workDays: number
  /** Data estimada de entrega */
  deliveryDate: Date
}

export const COMPLEXITY_MULTIPLIER: Record<Complexity, number> = {
  low: 0.9,
  medium: 1,
  high: 1.3,
}

/** Limita um número entre min e max. */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Calcula o valor/hora ideal considerando meta mensal, jornada, margem de lucro,
 * impostos e taxas de plataforma. Retorna um breakdown completo.
 *
 * A lógica de impostos/taxas faz o "gross up": o valor é ajustado para que,
 * após descontar impostos e taxas, sobre a meta desejada.
 */
export function calculateHourlyRate(input: HourlyRateInput): HourlyRateResult {
  const {
    monthlyGoal,
    dailyHours,
    workDays,
    vacationDays,
    profitMargin,
    taxRate = 0,
    platformFee = 0,
  } = input

  const empty: HourlyRateResult = {
    rate: 0,
    baseRate: 0,
    billableHours: 0,
    monthlyProjected: 0,
    yearlyProjected: 0,
  }

  if (monthlyGoal <= 0 || dailyHours <= 0 || workDays <= 0) return empty
  if (vacationDays < 0 || profitMargin < 0 || taxRate < 0 || platformFee < 0) return empty

  const workingDaysPerYear = 52 * workDays - vacationDays
  if (workingDaysPerYear <= 0) return empty

  const totalHoursPerYear = workingDaysPerYear * dailyHours
  if (totalHoursPerYear <= 0) return empty

  const baseRate = (monthlyGoal * 12) / totalHoursPerYear
  const rateWithMargin = baseRate * (1 + profitMargin / 100)

  // Gross up de impostos + taxas (somados). Limita a soma a <100% para evitar divisão inválida.
  const deductions = clamp((taxRate + platformFee) / 100, 0, 0.99)
  const finalRate = rateWithMargin / (1 - deductions)

  const rate = Math.round(finalRate)
  const monthlyHours = totalHoursPerYear / 12

  return {
    rate,
    baseRate: Math.round(baseRate),
    billableHours: Math.round(totalHoursPerYear),
    monthlyProjected: Math.round(rate * monthlyHours),
    yearlyProjected: Math.round(rate * totalHoursPerYear),
  }
}

/**
 * Calcula o valor total de um projeto ajustado pela complexidade e desconto.
 */
export function calculateProjectValue(input: ProjectInput): ProjectResult {
  const { projectHours, hourlyRate, complexity, discount = 0 } = input

  if (projectHours <= 0 || hourlyRate <= 0) {
    return { gross: 0, discountAmount: 0, total: 0 }
  }

  const multiplier = COMPLEXITY_MULTIPLIER[complexity] ?? 1
  const gross = Math.round(projectHours * hourlyRate * multiplier)
  const safeDiscount = clamp(discount, 0, 100)
  const discountAmount = Math.round(gross * (safeDiscount / 100))
  const total = gross - discountAmount

  return { gross, discountAmount, total }
}

/**
 * Divide um valor em parcelas iguais (a última absorve o arredondamento).
 * @returns array com o valor de cada parcela (R$).
 */
export function calculateInstallments(total: number, installments: number): number[] {
  if (total <= 0 || installments <= 0) return []
  const count = Math.floor(installments)
  const base = Math.floor((total / count) * 100) / 100
  const parts = Array<number>(count).fill(base)
  const remainder = Math.round((total - base * count) * 100) / 100
  parts[count - 1] = Math.round((base + remainder) * 100) / 100
  return parts
}

/**
 * Calcula o prazo em dias de trabalho e a data estimada de entrega.
 * Por padrão conta apenas dias úteis (seg-sex), pulando os fins de semana.
 */
export function calculateDeadline(input: DeadlineInput): DeadlineResult {
  const { totalHours, dailyAvailability, includeWeekends = false, startDate } = input

  if (totalHours <= 0 || dailyAvailability <= 0) {
    return { workDays: 0, deliveryDate: startDate ?? new Date() }
  }

  const workDays = Math.ceil(totalHours / dailyAvailability)

  const base = startDate ? new Date(startDate) : new Date()
  const delivery = new Date(base)
  let added = 0
  // Avança dias no calendário até acumular a quantidade de dias de trabalho.
  while (added < workDays) {
    delivery.setDate(delivery.getDate() + 1)
    const day = delivery.getDay()
    const isWeekend = day === 0 || day === 6
    if (includeWeekends || !isWeekend) added++
  }

  return { workDays, deliveryDate: delivery }
}

/**
 * Formata um valor numérico como moeda brasileira (BRL).
 */
export function formatCurrency(value: number, withCents = false): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: withCents ? 2 : 0,
    maximumFractionDigits: withCents ? 2 : 0,
  })
}

/**
 * Formata uma data no formato brasileiro (dd/mm/aaaa).
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
