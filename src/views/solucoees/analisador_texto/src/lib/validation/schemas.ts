/**
 * Schemas de validação com Zod. Centraliza regras de entrada da aplicação.
 */
import { z } from 'zod'
import { MAX_FILE_SIZE_BYTES, MAX_TEXT_LENGTH } from '@/lib/text/sanitize'

/** Extensões e MIME types aceitos no upload. */
const ACCEPTED_MIME = ['text/plain', ''] as const

export const filtersSchema = z.object({
  ignoreSpaces: z.boolean(),
  ignorePunctuation: z.boolean(),
  ignoreNumbers: z.boolean()
})

export const textInputSchema = z
  .string()
  .max(MAX_TEXT_LENGTH, `O texto excede o limite de ${MAX_TEXT_LENGTH.toLocaleString('pt-BR')} caracteres.`)

/**
 * Valida um arquivo antes da leitura: precisa ser .txt e respeitar o limite de tamanho.
 * Retorna uma mensagem de erro amigável (pt-BR) ou null quando válido.
 */
export function validateTextFile(file: File): string | null {
  const isTxtExtension = file.name.toLowerCase().endsWith('.txt')
  const isTxtMime = (ACCEPTED_MIME as readonly string[]).includes(file.type)

  if (!isTxtExtension || !isTxtMime) {
    return 'Apenas arquivos .txt são aceitos. Selecione um arquivo de texto válido.'
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return 'O arquivo deve ter no máximo 5 MB.'
  }
  if (file.size === 0) {
    return 'O arquivo selecionado está vazio.'
  }
  return null
}

export type FiltersInput = z.infer<typeof filtersSchema>
