import { describe, expect, it } from 'vitest'
import { escapeHtml, isValidEmail, safeNumber, sanitizeText } from './security'

describe('security: sanitizeText', () => {
  it('remove tags HTML (mitiga XSS)', () => {
    expect(sanitizeText('<script>alert(1)</script>Olá')).toBe('alert(1)Olá')
  })

  it('remove tags de imagem com onerror', () => {
    expect(sanitizeText('<img src=x onerror=alert(1)>texto')).toBe('texto')
  })

  it('limita o tamanho máximo', () => {
    expect(sanitizeText('a'.repeat(600), 10)).toHaveLength(10)
  })

  it('retorna string vazia para entradas inválidas', () => {
    // @ts-expect-error teste de robustez
    expect(sanitizeText(null)).toBe('')
  })
})

describe('security: escapeHtml', () => {
  it('escapa caracteres perigosos', () => {
    expect(escapeHtml('<a href="x">&\'</a>')).toBe(
      '&lt;a href=&quot;x&quot;&gt;&amp;&#39;&lt;/a&gt;',
    )
  })
})

describe('security: isValidEmail', () => {
  it('aceita e-mails válidos', () => {
    expect(isValidEmail('contato@3wonline.com.br')).toBe(true)
  })

  it('rejeita e-mails inválidos', () => {
    expect(isValidEmail('invalido')).toBe(false)
    expect(isValidEmail('a@b')).toBe(false)
  })
})

describe('security: safeNumber', () => {
  it('converte string numérica', () => {
    expect(safeNumber('42')).toBe(42)
  })

  it('respeita limites min/max', () => {
    expect(safeNumber(-5, 0)).toBe(0)
    expect(safeNumber(9_999_999, 0, 100)).toBe(100)
  })

  it('retorna min para valores não numéricos', () => {
    expect(safeNumber('abc', 1)).toBe(1)
  })
})
