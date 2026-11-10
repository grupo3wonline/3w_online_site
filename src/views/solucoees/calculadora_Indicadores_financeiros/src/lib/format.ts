/**
 * Utilitários de formatação e parsing em pt-BR.
 */

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/** Formata número como moeda BRL. */
export function formatCurrency(value: number): string {
  if (!Number.isFinite(value)) return 'R$ 0,00'
  return currencyFormatter.format(value)
}

/** Formata número como percentual pt-BR. */
export function formatPercent(value: number): string {
  if (!Number.isFinite(value)) return '0,00%'
  return `${value.toFixed(2).replace('.', ',')}%`
}

/** Formata número decimal pt-BR. */
export function formatDecimal(value: number): string {
  if (!Number.isFinite(value)) return '0,00'
  return value.toFixed(2).replace('.', ',')
}

/**
 * Converte string formatada em pt-BR (ex.: "1.000.000,50") para número.
 * Remove R$, espaços e pontos de milhar; troca vírgula por ponto.
 */
export function parseCurrency(str: string): number {
  if (!str || typeof str !== 'string') return Number.NaN
  const cleaned = str
    .replace(/[R$\s]/g, '')
    .replace(/\./g, '')
    .replace(',', '.')
  const num = Number.parseFloat(cleaned)
  return Number.isNaN(num) ? Number.NaN : num
}

/**
 * Sanitiza string contra XSS ao escapar caracteres HTML.
 * Usada antes de qualquer inserção de conteúdo dinâmico bruto.
 */
export function sanitize(str: unknown): string {
  const div = document.createElement('div')
  div.textContent = String(str ?? '')
  return div.innerHTML
}
