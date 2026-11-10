import { describe, it, expect } from 'vitest'
import {
  calculateHourlyRate,
  calculateProjectValue,
  calculateInstallments,
  calculateDeadline,
  formatCurrency,
  formatDate,
  COMPLEXITY_MULTIPLIER,
} from './calculations'

describe('calculateHourlyRate', () => {
  it('calcula o valor/hora com margem de lucro', () => {
    // 52*5 - 30 = 230 dias; 230*8 = 1840h/ano; 8000*12/1840 = 52.17; *1.2 = 62.6 -> 63
    const r = calculateHourlyRate({
      monthlyGoal: 8000,
      dailyHours: 8,
      workDays: 5,
      vacationDays: 30,
      profitMargin: 20,
    })
    expect(r.rate).toBe(63)
    expect(r.billableHours).toBe(1840)
  })

  it('aplica gross up de impostos e taxa de plataforma', () => {
    const semImposto = calculateHourlyRate({
      monthlyGoal: 8000,
      dailyHours: 8,
      workDays: 5,
      vacationDays: 30,
      profitMargin: 0,
    })
    const comImposto = calculateHourlyRate({
      monthlyGoal: 8000,
      dailyHours: 8,
      workDays: 5,
      vacationDays: 30,
      profitMargin: 0,
      taxRate: 6,
      platformFee: 10,
    })
    // Com deduções o valor final tem que ser maior para preservar a meta
    expect(comImposto.rate).toBeGreaterThan(semImposto.rate)
  })

  it('projeta faturamento mensal e anual', () => {
    const r = calculateHourlyRate({
      monthlyGoal: 8000,
      dailyHours: 8,
      workDays: 5,
      vacationDays: 30,
      profitMargin: 0,
    })
    expect(r.monthlyProjected).toBeGreaterThan(0)
    expect(r.yearlyProjected).toBeGreaterThan(r.monthlyProjected)
  })

  it('retorna zero para meta mensal inválida', () => {
    const r = calculateHourlyRate({
      monthlyGoal: 0,
      dailyHours: 8,
      workDays: 5,
      vacationDays: 30,
      profitMargin: 20,
    })
    expect(r.rate).toBe(0)
  })

  it('retorna zero quando férias excedem os dias úteis do ano', () => {
    const r = calculateHourlyRate({
      monthlyGoal: 8000,
      dailyHours: 8,
      workDays: 1,
      vacationDays: 100,
      profitMargin: 0,
    })
    expect(r.rate).toBe(0)
  })
})

describe('calculateProjectValue', () => {
  it('aplica o multiplicador de complexidade alta (+30%)', () => {
    const r = calculateProjectValue({ projectHours: 40, hourlyRate: 100, complexity: 'high' })
    expect(r.gross).toBe(5200)
    expect(r.total).toBe(5200)
  })

  it('mantém o valor na complexidade média', () => {
    expect(
      calculateProjectValue({ projectHours: 40, hourlyRate: 100, complexity: 'medium' }).total
    ).toBe(4000)
  })

  it('reduz 10% na complexidade baixa', () => {
    expect(
      calculateProjectValue({ projectHours: 40, hourlyRate: 100, complexity: 'low' }).total
    ).toBe(3600)
  })

  it('aplica desconto sobre o valor bruto', () => {
    const r = calculateProjectValue({
      projectHours: 40,
      hourlyRate: 100,
      complexity: 'medium',
      discount: 10,
    })
    expect(r.gross).toBe(4000)
    expect(r.discountAmount).toBe(400)
    expect(r.total).toBe(3600)
  })

  it('retorna zero para horas inválidas', () => {
    expect(
      calculateProjectValue({ projectHours: 0, hourlyRate: 100, complexity: 'high' }).total
    ).toBe(0)
  })

  it('tem multiplicadores corretos', () => {
    expect(COMPLEXITY_MULTIPLIER).toEqual({ low: 0.9, medium: 1, high: 1.3 })
  })
})

describe('calculateInstallments', () => {
  it('divide igualmente e a última parcela absorve o resto', () => {
    const parts = calculateInstallments(1000, 3)
    expect(parts).toHaveLength(3)
    const soma = parts.reduce((a, b) => a + b, 0)
    expect(Math.round(soma)).toBe(1000)
  })

  it('retorna vazio para entradas inválidas', () => {
    expect(calculateInstallments(0, 3)).toEqual([])
    expect(calculateInstallments(1000, 0)).toEqual([])
  })
})

describe('calculateDeadline', () => {
  it('calcula os dias de trabalho arredondando para cima', () => {
    const r = calculateDeadline({ totalHours: 41, dailyAvailability: 4 })
    expect(r.workDays).toBe(11)
  })

  it('retorna zero para disponibilidade inválida', () => {
    expect(calculateDeadline({ totalHours: 40, dailyAvailability: 0 }).workDays).toBe(0)
  })

  it('pula fins de semana por padrão (só dias úteis)', () => {
    // Começa numa sexta-feira; 2 dias úteis => pula sáb/dom => cai na terça
    const sexta = new Date('2026-01-02T12:00:00') // 02/01/2026 é sexta
    const r = calculateDeadline({ totalHours: 16, dailyAvailability: 8, startDate: sexta })
    expect(r.workDays).toBe(2)
    expect(r.deliveryDate.getDay()).not.toBe(0)
    expect(r.deliveryDate.getDay()).not.toBe(6)
  })

  it('inclui fins de semana quando solicitado', () => {
    const sexta = new Date('2026-01-02T12:00:00')
    const r = calculateDeadline({
      totalHours: 16,
      dailyAvailability: 8,
      startDate: sexta,
      includeWeekends: true,
    })
    // 2 dias corridos a partir de sexta => domingo
    expect(r.deliveryDate.getDay()).toBe(0)
  })
})

describe('formatCurrency', () => {
  it('formata em BRL sem casas decimais', () => {
    const result = formatCurrency(1250)
    expect(result).toContain('1.250')
    expect(result).toContain('R$')
  })

  it('formata com centavos quando solicitado', () => {
    expect(formatCurrency(1250.5, true)).toContain('1.250,50')
  })
})

describe('formatDate', () => {
  it('formata no padrão brasileiro dd/mm/aaaa', () => {
    const d = new Date('2026-01-15T12:00:00')
    expect(formatDate(d)).toBe('15/01/2026')
  })
})
