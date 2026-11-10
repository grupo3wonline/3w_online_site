import { describe, expect, it } from 'vitest'
import { formatCurrency, formatNumber } from './format'

describe('format: formatCurrency', () => {
  it('formata em BRL', () => {
    // \u00a0 é o espaço não separável usado pelo Intl pt-BR
    expect(formatCurrency(1500)).toBe('R$\u00a01.500,00')
  })

  it('trata valores inválidos como zero', () => {
    expect(formatCurrency(Number.NaN)).toBe('R$\u00a00,00')
  })
})

describe('format: formatNumber', () => {
  it('formata milhares no padrão pt-BR', () => {
    expect(formatNumber(10000)).toBe('10.000')
  })
})
