export type InputFormat = 'text' | 'escaped'
export type OutputFormat = 'text' | 'escaped' | 'ascii' | 'unicode'

/** Converte sequências de escape textuais em caracteres reais. */
export function unescapeString(s: string): string {
  return s
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\b/g, '\b')
    .replace(/\\f/g, '\f')
    .replace(/\\v/g, '\v')
    .replace(/\\0/g, '\0')
    .replace(/\\\\/g, '\\')
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
}

/** Converte caracteres especiais em sequências de escape textuais. */
export function escapeString(s: string): string {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/\f/g, '\\f')
    .replace(/\v/g, '\\v')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
}

export function toAscii(s: string): string {
  return Array.from(s)
    .map((c) => c.charCodeAt(0))
    .join(' ')
}

export function toUnicode(s: string): string {
  return Array.from(s)
    .map((c) => {
      const code = c.charCodeAt(0)
      return code > 127 ? `\\u${code.toString(16).padStart(4, '0')}` : c
    })
    .join('')
}

/** Processa uma string do formato de entrada para o de saída. */
export function formatString(
  input: string,
  inputFormat: InputFormat,
  outputFormat: OutputFormat
): string {
  const processed = inputFormat === 'escaped' ? unescapeString(input) : input
  switch (outputFormat) {
    case 'escaped':
      return escapeString(processed)
    case 'ascii':
      return toAscii(processed)
    case 'unicode':
      return toUnicode(processed)
    default:
      return processed
  }
}
