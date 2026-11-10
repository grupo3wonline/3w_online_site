export function formatCurrency(value: number, decimals = 0): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value)
}

export function formatNumber(value: string): string {
  const numericValue = value.replace(/\D/g, '')
  return new Intl.NumberFormat('pt-BR').format(parseInt(numericValue) || 0)
}

export function parseFormattedNumber(value: string): number {
  return parseFloat(value.replace(/\./g, '').replace(',', '.')) || 0
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}
