import { describe, it, expect } from 'vitest'
import {
  slugify,
  generatePassword,
  drawNumbers,
  encodeBase64,
  decodeBase64,
  encodeHtmlEntities,
  analyzeText,
} from '../dev-tools'
import { renderMarkdown } from '../markdown'

describe('slugify', () => {
  it('remove acentos, símbolos e normaliza', () => {
    expect(slugify('Como Gerar CPF Válido em 2026!')).toBe('como-gerar-cpf-valido-em-2026')
    expect(slugify('  Olá   Mundo  ')).toBe('ola-mundo')
  })
})

describe('generatePassword', () => {
  it('respeita o comprimento solicitado', () => {
    const pw = generatePassword({ length: 20, upper: true, lower: true, numbers: true, symbols: true })
    expect(pw).toHaveLength(20)
  })
  it('usa apenas números quando só números habilitado', () => {
    const pw = generatePassword({ length: 12, upper: false, lower: false, numbers: true, symbols: false })
    expect(pw).toMatch(/^\d{12}$/)
  })
})

describe('drawNumbers', () => {
  it('gera números únicos dentro do intervalo', () => {
    const nums = drawNumbers(1, 10, 5, true)
    expect(nums).toHaveLength(5)
    expect(new Set(nums).size).toBe(5)
    nums.forEach((n) => expect(n).toBeGreaterThanOrEqual(1) && expect(n).toBeLessThanOrEqual(10))
  })
  it('limita únicos ao tamanho do intervalo', () => {
    expect(drawNumbers(1, 3, 100, true)).toHaveLength(3)
  })
})

describe('base64 round-trip', () => {
  it('codifica e decodifica UTF-8 corretamente', () => {
    const original = 'Olá, mundo! ção 🎉'
    expect(decodeBase64(encodeBase64(original))).toBe(original)
  })
})

describe('segurança XSS', () => {
  it('encodeHtmlEntities escapa tags perigosas', () => {
    expect(encodeHtmlEntities('<script>alert(1)</script>')).not.toContain('<script>')
  })
  it('renderMarkdown não permite injeção de <script>', () => {
    const html = renderMarkdown('# Oi\n<script>alert(1)</script>')
    expect(html).not.toContain('<script>alert')
  })
  it('renderMarkdown não gera javascript: em links', () => {
    const html = renderMarkdown('[x](javascript:alert(1))')
    expect(html).not.toContain('href="javascript:')
  })
})

describe('analyzeText', () => {
  it('conta palavras e caracteres', () => {
    const s = analyzeText('olá mundo teste')
    expect(s.words).toBe(3)
    expect(s.characters).toBe(15)
  })
})
