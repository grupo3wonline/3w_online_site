/**
 * Geração de senhas seguras usando Web Crypto (getRandomValues).
 */

export interface PasswordOptions {
  length: number
  lowercase: boolean
  uppercase: boolean
  numbers: boolean
  symbols: boolean
  excludeAmbiguous: boolean
}

const SETS = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.<>?',
}
const AMBIGUOUS = /[Il1O0o]/g

export function buildCharset(opts: PasswordOptions): string {
  let chars = ''
  if (opts.lowercase) chars += SETS.lowercase
  if (opts.uppercase) chars += SETS.uppercase
  if (opts.numbers) chars += SETS.numbers
  if (opts.symbols) chars += SETS.symbols
  if (opts.excludeAmbiguous) chars = chars.replace(AMBIGUOUS, '')
  return chars
}

export function generatePassword(opts: PasswordOptions): string {
  const charset = buildCharset(opts)
  if (!charset) return ''
  const length = Math.max(4, Math.min(opts.length, 128))
  const values = new Uint32Array(length)
  crypto.getRandomValues(values)
  let result = ''
  for (let i = 0; i < length; i++) {
    result += charset[values[i] % charset.length]
  }
  return result
}

export type Strength = 'fraca' | 'média' | 'forte' | 'muito forte'

/** Estima a força da senha (0-100) com base em comprimento e variedade. */
export function estimateStrength(password: string): { score: number; label: Strength } {
  if (!password) return { score: 0, label: 'fraca' }
  let variety = 0
  if (/[a-z]/.test(password)) variety++
  if (/[A-Z]/.test(password)) variety++
  if (/[0-9]/.test(password)) variety++
  if (/[^a-zA-Z0-9]/.test(password)) variety++

  const lengthScore = Math.min(password.length / 20, 1) * 60
  const varietyScore = (variety / 4) * 40
  const score = Math.round(lengthScore + varietyScore)

  let label: Strength = 'fraca'
  if (score >= 85) label = 'muito forte'
  else if (score >= 65) label = 'forte'
  else if (score >= 40) label = 'média'

  return { score, label }
}
