/**
 * Sanitização e aplicação de filtros de texto.
 * Responsabilidade única: transformar strings de entrada em texto seguro/filtrado.
 */
import type { TextFilters } from './types'

/** Limite máximo de caracteres processados, protege contra travamentos com entradas gigantes. */
export const MAX_TEXT_LENGTH = 500_000

/** Tamanho máximo de arquivo aceito no upload (5 MB). */
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024

/**
 * Corta o texto no limite máximo. Também remove caracteres de controle invisíveis
 * (exceto quebras de linha e tabs) que poderiam distorcer a contagem ou a renderização.
 */
export function sanitizeText(input: string): string {
  if (!input) return ''
  const clipped = input.slice(0, MAX_TEXT_LENGTH)
  // Remove caracteres de controle C0/C1 exceto \t (\x09) \n (\x0A) \r (\x0D).
  // eslint-disable-next-line no-control-regex
  return clipped.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '')
}

/**
 * Aplica os filtros de contagem. Cada filtro é independente e opcional.
 * A ordem preserva o comportamento original da ferramenta.
 */
export function applyFilters(text: string, filters: TextFilters): string {
  let processed = text
  if (filters.ignoreSpaces) processed = processed.replace(/\s/g, '')
  if (filters.ignorePunctuation) processed = processed.replace(/[^\w\s\u00C0-\u024F]/g, '')
  if (filters.ignoreNumbers) processed = processed.replace(/\d/g, '')
  return processed
}
