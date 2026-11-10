/** Verifica se o valor está dentro do intervalo [min, max]. */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max
}

/** Verifica se é um número positivo. */
export const isPositiveNumber = (value: unknown): boolean => {
  return typeof value === 'number' && !Number.isNaN(value) && value > 0
}

/** Valida e-mail. */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/** Valida telefone brasileiro (DDD + número). */
export const isValidPhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, '')
  return /^(\d{2})(\d{4,5})(\d{4})$/.test(cleanPhone)
}

/** Sanitiza string para prevenir XSS ao renderizar em contexto HTML. */
export const sanitizeInput = <T>(input: T): T | string => {
  if (typeof input !== 'string') return input
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}
