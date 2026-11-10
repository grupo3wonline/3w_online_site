import { describe, it, expect } from 'vitest'
import { calcularPreco, hasCost } from './useCalculator'

describe('calcularPreco', () => {
  it('calcula preço com margem e impostos', () => {
    const r = calcularPreco({ custoFixo: 100, custoVariavel: 0, margem: 50, impostos: 0 })
    expect(r.custoTotal).toBe(100)
    expect(r.precoFinal).toBe(150)
    expect(r.lucroEstimado).toBe(50)
    expect(r.valorImpostos).toBe(0)
  })

  it('aplica impostos sobre o preço com margem', () => {
    // (100) * 1.2 = 120; / (1 - 0.2) = 150
    const r = calcularPreco({ custoFixo: 60, custoVariavel: 40, margem: 20, impostos: 20 })
    expect(r.custoTotal).toBe(100)
    expect(r.precoFinal).toBe(150)
    expect(r.lucroEstimado).toBe(20)
    expect(r.valorImpostos).toBe(30)
  })

  it('soma custos fixos e variáveis', () => {
    const r = calcularPreco({ custoFixo: 30, custoVariavel: 70, margem: 0, impostos: 0 })
    expect(r.custoTotal).toBe(100)
    expect(r.precoFinal).toBe(100)
  })

  it('trata valores negativos como zero', () => {
    const r = calcularPreco({ custoFixo: -50, custoVariavel: 100, margem: -10, impostos: -5 })
    expect(r.custoTotal).toBe(100)
    expect(r.precoFinal).toBe(100)
  })

  it('limita impostos a 99.99% para evitar divisão por zero', () => {
    const r = calcularPreco({ custoFixo: 100, custoVariavel: 0, margem: 0, impostos: 100 })
    expect(Number.isFinite(r.precoFinal)).toBe(true)
    expect(r.precoFinal).toBeGreaterThan(0)
  })

  it('arredonda para 2 casas decimais', () => {
    const r = calcularPreco({ custoFixo: 33.333, custoVariavel: 0, margem: 0, impostos: 0 })
    expect(r.custoTotal).toBe(33.33)
  })
})

describe('hasCost', () => {
  it('retorna false quando nenhum custo', () => {
    expect(hasCost({ custoFixo: 0, custoVariavel: 0 })).toBe(false)
  })
  it('retorna true quando há custo fixo', () => {
    expect(hasCost({ custoFixo: 10, custoVariavel: 0 })).toBe(true)
  })
  it('retorna true quando há custo variável', () => {
    expect(hasCost({ custoFixo: 0, custoVariavel: 10 })).toBe(true)
  })
})
