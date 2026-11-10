import { describe, it, expect } from 'vitest'
import {
  calculateBudget,
  campaignSchema,
  parseNumber,
  formatCurrency,
  formatNumber,
} from './calculator'

describe('calculateBudget', () => {
  it('calcula seguidores × (taxa/100) × duração', () => {
    // 50000 × (20/100) × 7 = 70000
    expect(calculateBudget({ followers: 50000, rateInCents: 20, durationDays: 7 })).toBe(70000)
  })

  it('lida com taxas decimais em centavos', () => {
    // 1000 × (5.5/100) × 1 = 55
    expect(calculateBudget({ followers: 1000, rateInCents: 5.5, durationDays: 1 })).toBeCloseTo(55)
  })

  it('rejeita valores zero ou negativos', () => {
    expect(() => calculateBudget({ followers: 0, rateInCents: 20, durationDays: 7 })).toThrow()
    expect(() => calculateBudget({ followers: 100, rateInCents: -1, durationDays: 7 })).toThrow()
    expect(() => calculateBudget({ followers: 100, rateInCents: 20, durationDays: 0 })).toThrow()
  })
})

describe('campaignSchema', () => {
  it('valida entrada correta', () => {
    const r = campaignSchema.safeParse({ followers: 10, rateInCents: 10, durationDays: 1 })
    expect(r.success).toBe(true)
  })

  it('falha com NaN', () => {
    const r = campaignSchema.safeParse({ followers: NaN, rateInCents: 10, durationDays: 1 })
    expect(r.success).toBe(false)
  })
})

describe('parseNumber', () => {
  it('aceita vírgula como separador decimal', () => {
    expect(parseNumber('1,5')).toBe(1.5)
  })
  it('retorna 0 para entrada inválida', () => {
    expect(parseNumber('abc')).toBe(0)
    expect(parseNumber('')).toBe(0)
  })
  it('ignora espaços', () => {
    expect(parseNumber(' 1000 ')).toBe(1000)
  })
})

describe('formatação pt-BR', () => {
  it('formata moeda em Real', () => {
    const s = formatCurrency(70000)
    expect(s).toContain('R$')
    expect(s).toContain('70.000,00')
  })
  it('formata número com separador de milhar', () => {
    expect(formatNumber(50000)).toBe('50.000')
  })
})
