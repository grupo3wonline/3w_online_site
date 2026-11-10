/** Utilitários para as ferramentas de desenvolvedor (não específicas do Brasil). */

/** Gera senha segura com opções de complexidade. */
export function generatePassword(opts: {
  length: number
  upper: boolean
  lower: boolean
  numbers: boolean
  symbols: boolean
}): string {
  const sets: string[] = []
  if (opts.lower) sets.push('abcdefghijklmnopqrstuvwxyz')
  if (opts.upper) sets.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
  if (opts.numbers) sets.push('0123456789')
  if (opts.symbols) sets.push('!@#$%^&*()-_=+[]{};:,.<>?')
  if (sets.length === 0) sets.push('abcdefghijklmnopqrstuvwxyz')

  const all = sets.join('')
  const values = new Uint32Array(opts.length)
  crypto.getRandomValues(values)
  let out = ''
  for (let i = 0; i < opts.length; i++) {
    out += all[values[i] % all.length]
  }
  return out
}

/** UUID v4 usando crypto nativo. */
export function generateUUID(): string {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  // Fallback
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) => {
    const n = Number(c)
    return (n ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (n / 4)))).toString(16)
  })
}

/** Converte texto em slug amigável para URL. */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const LOREM_WORDS =
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum'.split(
    ' ',
  )

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/** Gera parágrafos de Lorem Ipsum. */
export function generateLorem(paragraphs: number): string[] {
  const result: string[] = []
  for (let p = 0; p < paragraphs; p++) {
    const sentences = randInt(3, 6)
    const parts: string[] = []
    for (let s = 0; s < sentences; s++) {
      const len = randInt(6, 14)
      const words = Array.from({ length: len }, () => LOREM_WORDS[randInt(0, LOREM_WORDS.length - 1)])
      let sentence = words.join(' ')
      sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.'
      parts.push(sentence)
    }
    result.push(parts.join(' '))
  }
  return result
}

/** Sorteia números únicos ou com repetição dentro de um intervalo. */
export function drawNumbers(min: number, max: number, count: number, unique: boolean): number[] {
  if (min > max) [min, max] = [max, min]
  const range = max - min + 1
  const qty = unique ? Math.min(count, range) : count
  if (unique) {
    const pool = Array.from({ length: range }, (_, i) => min + i)
    for (let i = pool.length - 1; i > 0; i--) {
      const j = randInt(0, i)
      ;[pool[i], pool[j]] = [pool[j], pool[i]]
    }
    return pool.slice(0, qty)
  }
  return Array.from({ length: qty }, () => randInt(min, max))
}

// Transformação de fontes "fancy" (Unicode)
const FANCY_MAPS: Record<string, (c: string) => string> = {
  bold: (c) => transformRange(c, 0x1d400, 0x1d41a),
  italic: (c) => transformRange(c, 0x1d434, 0x1d44e),
  script: (c) => transformRange(c, 0x1d49c, 0x1d4b6),
  monospace: (c) => transformRange(c, 0x1d670, 0x1d68a),
}

function transformRange(char: string, upperBase: number, lowerBase: number): string {
  const code = char.charCodeAt(0)
  if (code >= 65 && code <= 90) return String.fromCodePoint(upperBase + (code - 65))
  if (code >= 97 && code <= 122) return String.fromCodePoint(lowerBase + (code - 97))
  return char
}

export const fancyStyles = Object.keys(FANCY_MAPS)

/** Aplica um estilo de fonte Unicode ao texto. */
export function toFancy(text: string, style: string): string {
  const fn = FANCY_MAPS[style]
  if (!fn) return text
  return [...text].map(fn).join('')
}

/** Codifica/decodifica Base64 com suporte a UTF-8. */
export function encodeBase64(text: string): string {
  return btoa(unescape(encodeURIComponent(text)))
}
export function decodeBase64(text: string): string {
  return decodeURIComponent(escape(atob(text)))
}

/** Codifica/decodifica entidades HTML. */
export function encodeHtmlEntities(text: string): string {
  return text.replace(
    /[<>&"']/g,
    (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' })[c] || c,
  )
}
export function decodeHtmlEntities(text: string): string {
  const el = document.createElement('textarea')
  el.innerHTML = text
  return el.value
}

/** Analisa texto: contagens úteis. */
export function analyzeText(text: string) {
  const trimmed = text.trim()
  return {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: trimmed ? trimmed.split(/\s+/).length : 0,
    lines: text ? text.split(/\n/).length : 0,
    paragraphs: trimmed ? trimmed.split(/\n\s*\n/).filter(Boolean).length : 0,
  }
}
