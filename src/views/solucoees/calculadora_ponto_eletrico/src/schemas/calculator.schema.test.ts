import { describe, it, expect } from 'vitest'
import { calculatorSchema } from './calculator.schema'

describe('calculatorSchema', () => {
  it('aceita entrada válida', () => {
    const r = calculatorSchema.safeParse({
      width: 3.5,
      length: 4.2,
      ceilingHeight: 2.8,
      roomType: 'LIVING',
    })
    expect(r.success).toBe(true)
  })

  it('rejeita largura não positiva', () => {
    const r = calculatorSchema.safeParse({
      width: 0,
      length: 4,
      ceilingHeight: 2.8,
      roomType: 'LIVING',
    })
    expect(r.success).toBe(false)
  })

  it('rejeita pé-direito fora do intervalo', () => {
    const r = calculatorSchema.safeParse({
      width: 3,
      length: 4,
      ceilingHeight: 1.5,
      roomType: 'LIVING',
    })
    expect(r.success).toBe(false)
  })

  it('rejeita tipo de ambiente inválido', () => {
    const r = calculatorSchema.safeParse({
      width: 3,
      length: 4,
      ceilingHeight: 2.8,
      roomType: 'INVALID',
    })
    expect(r.success).toBe(false)
  })
})
