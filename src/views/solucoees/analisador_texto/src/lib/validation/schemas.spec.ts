import { describe, it, expect } from 'vitest'
import { validateTextFile, filtersSchema } from './schemas'
import { MAX_FILE_SIZE_BYTES } from '@/lib/text/sanitize'

function makeFile(name: string, type: string, size: number): File {
  const blob = new Blob([new Uint8Array(Math.min(size, 1024))], { type })
  const file = new File([blob], name, { type })
  Object.defineProperty(file, 'size', { value: size })
  return file
}

describe('validateTextFile', () => {
  it('aceita .txt válido dentro do limite', () => {
    expect(validateTextFile(makeFile('doc.txt', 'text/plain', 1000))).toBeNull()
  })

  it('rejeita extensão não .txt', () => {
    expect(validateTextFile(makeFile('doc.pdf', 'application/pdf', 1000))).toMatch(/apenas arquivos \.txt/i)
  })

  it('rejeita arquivo acima de 5MB', () => {
    expect(validateTextFile(makeFile('big.txt', 'text/plain', MAX_FILE_SIZE_BYTES + 1))).toMatch(/5 mb/i)
  })

  it('rejeita arquivo vazio', () => {
    expect(validateTextFile(makeFile('empty.txt', 'text/plain', 0))).toMatch(/vazio/i)
  })
})

describe('filtersSchema', () => {
  it('valida objeto de filtros correto', () => {
    const result = filtersSchema.safeParse({
      ignoreSpaces: true,
      ignorePunctuation: false,
      ignoreNumbers: true
    })
    expect(result.success).toBe(true)
  })

  it('rejeita filtros com tipo inválido', () => {
    const result = filtersSchema.safeParse({ ignoreSpaces: 'sim', ignorePunctuation: false, ignoreNumbers: false })
    expect(result.success).toBe(false)
  })
})
