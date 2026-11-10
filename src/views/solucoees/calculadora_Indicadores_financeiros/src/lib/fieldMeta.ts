import type { FieldId } from './calculator'

export interface FieldMeta {
  id: FieldId
  label: string
  placeholder: string
  hint: string
  tooltip: string
}

/** Metadados de UI dos 12 campos de entrada (labels, dicas e tooltips). */
export const FIELD_META: FieldMeta[] = [
  {
    id: 'revenue',
    label: 'Receita (R$)',
    placeholder: 'Ex: 1.000.000,00',
    hint: 'Faturamento bruto total do período',
    tooltip:
      'Receita bruta total da empresa no período analisado. Representa o faturamento antes das deduções.',
  },
  {
    id: 'ebit',
    label: 'EBIT (R$)',
    placeholder: 'Ex: 200.000,00',
    hint: 'Lucro antes de juros e impostos',
    tooltip:
      'Lucro Antes de Juros e Impostos. Mede o resultado operacional desconsiderando efeitos financeiros e tributários.',
  },
  {
    id: 'depreciation',
    label: 'Depreciação e Amortização (R$)',
    placeholder: 'Ex: 50.000,00',
    hint: 'Desgaste de ativos no período',
    tooltip:
      'Depreciação de ativos tangíveis e amortização de intangíveis. Somado ao EBIT para calcular o EBITDA.',
  },
  {
    id: 'netIncome',
    label: 'Lucro Líquido (R$)',
    placeholder: 'Ex: 150.000,00',
    hint: 'Resultado final do período',
    tooltip:
      'Resultado final após todas as despesas, impostos e deduções. É o lucro efetivo para os acionistas.',
  },
  {
    id: 'equity',
    label: 'Patrimônio Líquido (R$)',
    placeholder: 'Ex: 800.000,00',
    hint: 'Ativos menos passivos totais',
    tooltip:
      'Diferença entre ativos e passivos. Representa o valor contábil pertencente aos sócios/acionistas.',
  },
  {
    id: 'totalAssets',
    label: 'Total de Ativos (R$)',
    placeholder: 'Ex: 1.200.000,00',
    hint: 'Todos os bens e direitos',
    tooltip: 'Soma de todos os bens e direitos da empresa (circulantes e não circulantes).',
  },
  {
    id: 'marketCap',
    label: 'Valor de Mercado (R$)',
    placeholder: 'Ex: 2.000.000,00',
    hint: 'Capitalização de mercado',
    tooltip:
      'Capitalização de mercado: preço da ação × número de ações. Reflete o valor que o mercado atribui à empresa.',
  },
  {
    id: 'enterpriseValue',
    label: 'Valor da Empresa - EV (R$)',
    placeholder: 'Ex: 2.500.000,00',
    hint: 'Valor total incluindo dívidas',
    tooltip:
      'Enterprise Value: valor de mercado + dívida líquida. Custo teórico para adquirir a empresa inteira.',
  },
  {
    id: 'dividends',
    label: 'Dividendos (R$)',
    placeholder: 'Ex: 50.000,00',
    hint: 'Proventos pagos no período',
    tooltip: 'Total de dividendos pagos aos acionistas no período. Usado para o Dividend Yield.',
  },
  {
    id: 'currentAssets',
    label: 'Ativos Circulantes (R$)',
    placeholder: 'Ex: 500.000,00',
    hint: 'Bens realizáveis em até 12 meses',
    tooltip:
      'Bens e direitos conversíveis em dinheiro em até 12 meses: caixa, contas a receber, estoques.',
  },
  {
    id: 'currentLiabilities',
    label: 'Passivos Circulantes (R$)',
    placeholder: 'Ex: 300.000,00',
    hint: 'Obrigações de curto prazo',
    tooltip:
      'Obrigações que vencem em até 12 meses: fornecedores, salários, impostos e empréstimos de curto prazo.',
  },
  {
    id: 'inventory',
    label: 'Estoque (R$)',
    placeholder: 'Ex: 100.000,00',
    hint: 'Valor total em produtos/mercadorias',
    tooltip:
      'Valor dos produtos em estoque. Subtraído dos ativos circulantes para a Liquidez Seca.',
  },
]
