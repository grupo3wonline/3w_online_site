import { describe, it, expect } from 'vitest'
import { hourlyRateSchema, projectSchema, deadlineSchema } from './schemas'

describe('hourlyRateSchema', () => {
  it('aceita entrada válida com impostos e taxa', () => {
    const result = hourlyRateSchema.safeParse({
      monthlyGoal: '8000',
      dailyHours: '8',
      workDays: '5',
      vacationDays: '30',
      profitMargin: '20',
      taxRate: '6',
      platformFee: '10',
    })
    expect(result.success).toBe(true)
  })

  it('rejeita horas por dia acima de 24', () => {
    const result = hourlyRateSchema.safeParse({
      monthlyGoal: '8000',
      dailyHours: '30',
      workDays: '5',
      vacationDays: '0',
      profitMargin: '0',
      taxRate: '0',
      platformFee: '0',
    })
    expect(result.success).toBe(false)
  })

  it('rejeita imposto acima de 100%', () => {
    const result = hourlyRateSchema.safeParse({
      monthlyGoal: '8000',
      dailyHours: '8',
      workDays: '5',
      vacationDays: '0',
      profitMargin: '0',
      taxRate: '150',
      platformFee: '0',
    })
    expect(result.success).toBe(false)
  })

  it('rejeita valores não numéricos', () => {
    const result = hourlyRateSchema.safeParse({
      monthlyGoal: 'abc',
      dailyHours: '',
      workDays: '',
      vacationDays: '',
      profitMargin: '',
      taxRate: '',
      platformFee: '',
    })
    expect(result.success).toBe(false)
  })
})

describe('projectSchema', () => {
  it('exige complexidade válida', () => {
    const result = projectSchema.safeParse({
      projectHours: '40',
      hourlyRate: 100,
      complexity: '',
      discount: '0',
    })
    expect(result.success).toBe(false)
  })

  it('aceita projeto válido com desconto', () => {
    const result = projectSchema.safeParse({
      projectHours: '40',
      hourlyRate: 100,
      complexity: 'high',
      discount: '15',
    })
    expect(result.success).toBe(true)
  })

  it('rejeita desconto acima de 100%', () => {
    const result = projectSchema.safeParse({
      projectHours: '40',
      hourlyRate: 100,
      complexity: 'high',
      discount: '120',
    })
    expect(result.success).toBe(false)
  })
})

describe('deadlineSchema', () => {
  it('rejeita disponibilidade zero', () => {
    const result = deadlineSchema.safeParse({ totalHours: '40', dailyAvailability: '0' })
    expect(result.success).toBe(false)
  })
})
