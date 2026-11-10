import { describe, it, expect } from 'vitest'
import { formatCurrency, formatPercent, formatDecimal, parseCurrency, sanitize } from './format'

describe('parseCurrency', () => {
  it('converte string pt-BR com milhar e decimal', () => {
    expect(parseCurrency('1.000.000,50')).toBe(1_000_000.5)
  })
  it('remove prefixo R$ e espaços', () => {
    expect(parseCurrency('R$ 5.000,00')).toBe(5000)
  })
  it('retorna NaN para string vazia', () => {
    expect(Number.isNaN(parseCurrency(''))).toBe(true)
  })
})

describe('formatadores', () => {
  it('formata moeda BRL', () => {
    expect(formatCurrency(1234.5)).toContain('R$')
    expect(formatCurrency(Number.NaN)).toBe('R$ 0,00')
  })
  it('formata percentual', () => {
    expect(formatPercent(12.5)).toBe('12,50%')
  })
  it('formata decimal', () => {
    expect(formatDecimal(3.14159)).toBe('3,14')
  })
})

describe('sanitize', () => {
  it('escapa tags HTML maliciosas', () => {
    const out = sanitize('<script>alert(1)</script>')
    expect(out).not.toContain('<script>')
    expect(out).toContain('&lt;script&gt;')
  })
})
