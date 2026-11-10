import { describe, it, expect } from 'vitest'
import {
  calculateEvent,
  eventSchema,
  formatResultSummary,
  MEAL_COST,
  RESERVE_RATE,
  type EventInput,
} from './calc'

const baseInput: EventInput = {
  vlr_diaria: 1500,
  duracao_dias: 5,
  qtd_pessoas: 40,
  qtd_pagante: 10,
  outras_despesas: 3000,
  n_vezes: 5,
}

describe('calculateEvent', () => {
  it('calcula estadia como diária × dias (RN)', () => {
    const r = calculateEvent(baseInput)
    expect(r.total_estadia).toBe(1500 * 5)
  })

  it('calcula alimentação a R$ 42,83 × pessoas × dias × 2 refeições (RN-001)', () => {
    const r = calculateEvent(baseInput)
    expect(r.total_alimentacao).toBeCloseTo(40 * MEAL_COST * 5 * 2, 2)
  })

  it('aplica 11% de reserva sobre o subtotal (RN-002)', () => {
    const r = calculateEvent(baseInput)
    const subtotal = r.total_estadia + r.total_alimentacao + r.gastos_adicionais
    expect(r.valor_reserva).toBeCloseTo(subtotal * RESERVE_RATE, 2)
  })

  it('total geral é subtotal + reserva', () => {
    const r = calculateEvent(baseInput)
    const subtotal = r.total_estadia + r.total_alimentacao + r.gastos_adicionais
    expect(r.total_geral).toBeCloseTo(subtotal * (1 + RESERVE_RATE), 2)
  })

  it('arredonda o valor da parcela para cima (RN-003)', () => {
    const r = calculateEvent(baseInput)
    const expected = Math.ceil(r.total_geral / baseInput.qtd_pagante / baseInput.n_vezes)
    expect(r.valor_parcela).toBe(expected)
    expect(Number.isInteger(r.valor_parcela)).toBe(true)
  })

  it('reproduz o exemplo da landing (total ~R$ 30.671,52)', () => {
    const r = calculateEvent(baseInput)
    expect(r.total_geral).toBeCloseTo(30671.52, 2)
  })
})

describe('eventSchema', () => {
  it('aceita entrada válida', () => {
    expect(eventSchema.safeParse(baseInput).success).toBe(true)
  })

  it('rejeita pagantes maiores que participantes (RN-004)', () => {
    const res = eventSchema.safeParse({ ...baseInput, qtd_pagante: 50, qtd_pessoas: 40 })
    expect(res.success).toBe(false)
  })

  it('rejeita duração menor que 1 dia (RN-005)', () => {
    const res = eventSchema.safeParse({ ...baseInput, duracao_dias: 0 })
    expect(res.success).toBe(false)
  })

  it('rejeita parcelas menores que 1 (RN-005)', () => {
    const res = eventSchema.safeParse({ ...baseInput, n_vezes: 0 })
    expect(res.success).toBe(false)
  })

  it('rejeita valores negativos (RN-005)', () => {
    const res = eventSchema.safeParse({ ...baseInput, vlr_diaria: -10 })
    expect(res.success).toBe(false)
  })
})

describe('formatResultSummary', () => {
  it('inclui os principais valores do orçamento', () => {
    const summary = formatResultSummary(calculateEvent(baseInput))
    expect(summary).toContain('Orçamento do Evento')
    expect(summary).toContain('Participantes: 40')
    expect(summary).toContain('Total geral:')
    expect(summary).toContain('Valor por parcela/pessoa:')
    expect(summary).toContain('30.671,52')
  })

  it('gera texto multilinha pronto para compartilhar', () => {
    const summary = formatResultSummary(calculateEvent(baseInput))
    expect(summary.split('\n').length).toBeGreaterThan(5)
  })
})
