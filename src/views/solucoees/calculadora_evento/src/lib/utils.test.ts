import { describe, it, expect } from 'vitest'
import { formatCurrency } from './utils'

describe('formatCurrency', () => {
  it('formata em BRL', () => {
    expect(formatCurrency(1500)).toContain('R$')
  })

  it('inclui separador de milhar e centavos', () => {
    const formatted = formatCurrency(30671.52)
    expect(formatted).toContain('30')
    expect(formatted).toContain('671')
    expect(formatted).toContain('52')
  })

  it('formata zero', () => {
    expect(formatCurrency(0)).toContain('0,00')
  })
})
