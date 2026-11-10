import * as XLSX from 'xlsx'
import { z } from 'zod'
import {
  ALLOWED_EXTENSIONS,
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_LABEL,
  MAGIC_BYTES,
} from '@/constants'
import type { ProcessedFile, FileSheet } from '@/types'

/** Zod schema para validação básica do arquivo */
const fileSchema = z.object({
  name: z.string().min(1, 'Nome do arquivo é obrigatório'),
  size: z
    .number()
    .max(MAX_FILE_SIZE_BYTES, `Arquivo excede o limite de ${MAX_FILE_SIZE_LABEL}`),
})

/** Remove caracteres potencialmente perigosos de nomes de arquivo */
function sanitizeFileName(name: string): string {
  return name.replace(/[^\w\s\-_.()àáâãéêíóôõúüçÀÁÂÃÉÊÍÓÔÕÚÜÇ]/gi, '_')
}

/** Extrai extensão do arquivo em minúsculas */
function getFileExtension(name: string): string {
  const lastDot = name.lastIndexOf('.')
  return lastDot >= 0 ? name.slice(lastDot).toLowerCase() : ''
}

/** Formata tamanho de arquivo para exibição legível */
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/**
 * Valida magic bytes do arquivo para garantir que o conteúdo
 * corresponde à extensão declarada.
 */
function validateMagicBytes(buffer: ArrayBuffer, extension: string): boolean {
  const bytes = new Uint8Array(buffer.slice(0, 4))

  if (extension === '.xlsx') {
    return MAGIC_BYTES.ZIP.every((b, i) => bytes[i] === b)
  }

  if (extension === '.xls') {
    return MAGIC_BYTES.CFB.every((b, i) => bytes[i] === b)
  }

  // CSV é texto puro — sem magic bytes para verificar
  return true
}

export function useFileProcessor() {
  async function processFiles(
    fileList: FileList,
  ): Promise<{ files: ProcessedFile[]; errors: string[] }> {
    const results: ProcessedFile[] = []
    const errors: string[] = []

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i]

      // Validação com Zod (nome + tamanho)
      const validation = fileSchema.safeParse({
        name: file.name,
        size: file.size,
      })

      if (!validation.success) {
        const msg = validation.error.issues[0]?.message || 'Arquivo inválido'
        errors.push(`${file.name}: ${msg}`)
        continue
      }

      // Verificar extensão permitida
      const ext = getFileExtension(file.name)
      if (!(ALLOWED_EXTENSIONS as readonly string[]).includes(ext)) {
        errors.push(`${file.name}: Formato não suportado. Use .xlsx, .xls ou .csv`)
        continue
      }

      try {
        const buffer = await file.arrayBuffer()

        // Validar magic bytes para arquivos binários
        if (ext !== '.csv' && !validateMagicBytes(buffer, ext)) {
          errors.push(`${file.name}: Conteúdo do arquivo não corresponde à extensão`)
          continue
        }

        const workbook = XLSX.read(buffer, { type: 'array', cellDates: true })
        const sheets: FileSheet[] = []
        let totalRows = 0

        for (const sheetName of workbook.SheetNames) {
          const worksheet = workbook.Sheets[sheetName]
          const json = XLSX.utils.sheet_to_json(worksheet, {
            defval: '',
          }) as Record<string, unknown>[]

          if (json.length > 0) {
            sheets.push({ sheetName, data: json })
            totalRows += json.length
          }
        }

        if (sheets.length === 0) {
          errors.push(`${file.name}: Nenhuma aba com dados foi encontrada`)
          continue
        }

        results.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}-${i}`,
          name: file.name,
          sanitizedName: sanitizeFileName(file.name),
          size: formatFileSize(file.size),
          sizeBytes: file.size,
          sheetCount: sheets.length,
          rowsCount: totalRows,
          sheets,
        })
      } catch {
        errors.push(
          `${file.name}: Não foi possível ler o arquivo. Verifique se é um arquivo Excel/CSV válido.`,
        )
      }
    }

    return { files: results, errors }
  }

  return { processFiles }
}
