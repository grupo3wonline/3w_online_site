import { describe, it, expect } from 'vitest'
import { buildCharset, generatePassword, estimateStrength } from '../password'

const base = {
  length: 16,
  lowercase: true,
  uppercase: true,
  numbers: true,
  symbols: true,
  excludeAmbiguous: false,
}

describe('password', () => {
  it('gera senha com o comprimento pedido', () => {
    expect(generatePassword({ ...base, length: 24 })).toHaveLength(24)
  })

  it('respeita o comprimento mínimo e máximo', () => {
    expect(generatePassword({ ...base, length: 1 })).toHaveLength(4)
    expect(generatePassword({ ...base, length: 999 })).toHaveLength(128)
  })

  it('retorna vazio quando nenhum conjunto é selecionado', () => {
    expect(
      generatePassword({
        length: 16,
        lowercase: false,
        uppercase: false,
        numbers: false,
        symbols: false,
        excludeAmbiguous: false,
      })
    ).toBe('')
  })

  it('exclui caracteres ambíguos quando solicitado', () => {
    const charset = buildCharset({ ...base, excludeAmbiguous: true })
    expect(charset).not.toMatch(/[Il1O0o]/)
  })

  it('só usa números quando apenas números estão ativos', () => {
    const pwd = generatePassword({ ...base, lowercase: false, uppercase: false, symbols: false })
    expect(pwd).toMatch(/^[0-9]+$/)
  })

  it('estima força: senha longa e variada é forte', () => {
    const { label, score } = estimateStrength('Abc123!@#Xyz789$%')
    expect(score).toBeGreaterThan(64)
    expect(['forte', 'muito forte']).toContain(label)
  })

  it('estima força: senha curta é fraca', () => {
    expect(estimateStrength('abc').label).toBe('fraca')
  })
})
