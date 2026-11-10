/** Formata número com casas decimais fixas. */
export const formatNumber = (value: number | null | undefined, decimals = 2): string => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return '0'
  }
  return Number(value).toFixed(decimals)
}

/** Formata moeda brasileira (BRL). */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

/** Formata data/hora no padrão brasileiro. */
export const formatDate = (date: string | number | Date | null | undefined): string => {
  if (!date) return ''
  const d = new Date(date)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

/** Formata área (m²). */
export const formatArea = (value: number): string => `${formatNumber(value, 2)} m²`

/** Formata volume (m³). */
export const formatVolume = (value: number): string => `${formatNumber(value, 2)} m³`

/** Formata metragem (m). */
export const formatLength = (value: number): string => `${formatNumber(value, 1)} m`

/** Formata potência (VA/W), convertendo para kilo quando aplicável. */
export const formatPower = (value: number, unit: 'VA' | 'W' = 'VA'): string => {
  if (value >= 1000) {
    return `${formatNumber(value / 1000, 2)} k${unit}`
  }
  return `${formatNumber(value, 0)} ${unit}`
}

/** Formata telefone brasileiro. */
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  return phone
}

/** Trunca texto com reticências. */
export const truncateText = (text: string | null | undefined, maxLength = 50): string => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return `${text.substring(0, maxLength)}...`
}

/** Capitaliza a primeira letra. */
export const capitalize = (text: string | null | undefined): string => {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

/** Retorna o singular ou plural conforme a contagem. */
export const pluralize = (count: number, singular: string, plural: string): string => {
  return count === 1 ? singular : plural
}
