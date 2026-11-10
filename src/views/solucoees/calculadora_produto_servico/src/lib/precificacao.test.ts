import { describe, it, expect } from 'vitest'
import {
  calcularProduto,
  calcularServico,
  fmt,
  MULTIPLICADORES_COMPLEXIDADE,
  MULTIPLICADORES_URGENCIA,
} from './precificacao'

describe('calcularProduto', () => {
  it('soma custos, aplica margem e impostos corretamente', () => {
    const r = calcularProduto({
      custoMaterial: 50,
      custoOperacional: 10,
      tempoProducao: 2,
      valorHora: 30,
      margemLucro: 20,
      impostos: 10,
    })
    // custoMaoObra = 2 * 30 = 60; custoTotal = 50 + 10 + 60 = 120
    expect(r.custoMaoObra).toBe(60)
    expect(r.custoTotal).toBe(120)
    // lucro = 120 * 0.2 = 24; antes imposto = 144; imposto = 14.4; final = 158.4
    expect(r.lucro).toBeCloseTo(24)
    expect(r.impostoValor).toBeCloseTo(14.4)
    expect(r.precoFinal).toBeCloseTo(158.4)
  })

  it('gera 6 comparativos de margem', () => {
    const r = calcularProduto({
      custoMaterial: 100,
      custoOperacional: 0,
      tempoProducao: 0,
      valorHora: 0,
      margemLucro: 20,
      impostos: 0,
    })
    expect(r.comparativos).toHaveLength(6)
    expect(r.comparativos.map((c) => c.margem)).toEqual([10, 15, 20, 25, 30, 40])
  })

  it('preço mínimo é menor que ideal e premium é maior', () => {
    const r = calcularProduto({
      custoMaterial: 100,
      custoOperacional: 0,
      tempoProducao: 0,
      valorHora: 0,
      margemLucro: 20,
      impostos: 10,
    })
    expect(r.precoMinimo).toBeLessThan(r.precoFinal)
    expect(r.precoPremium).toBeGreaterThan(r.precoFinal)
  })

  it('lida com zeros sem quebrar', () => {
    const r = calcularProduto({
      custoMaterial: 0,
      custoOperacional: 0,
      tempoProducao: 0,
      valorHora: 0,
      margemLucro: 0,
      impostos: 0,
    })
    expect(r.custoTotal).toBe(0)
    expect(r.precoFinal).toBe(0)
  })
})

describe('calcularServico', () => {
  it('aplica multiplicadores de complexidade e urgência', () => {
    const r = calcularServico({
      horasEstimadas: 10,
      valorHora: 50,
      custosOperacionais: 100,
      complexidade: 'medio', // 1.3
      urgencia: 'urgente', // 1.2
      margemLucro: 25,
    })
    // base = 10 * 50 = 500; ajustado = 500 * 1.3 * 1.2 = 780
    expect(r.custoBaseTrabalho).toBe(500)
    expect(r.custoAjustado).toBeCloseTo(780)
    // custoTotal = 780 + 100 = 880; lucro = 220; final = 1100
    expect(r.custoTotal).toBeCloseTo(880)
    expect(r.lucro).toBeCloseTo(220)
    expect(r.precoFinal).toBeCloseTo(1100)
    expect(r.multiplicadorComplexidade).toBe(1.3)
    expect(r.multiplicadorUrgencia).toBe(1.2)
  })

  it('calcula preços por hora, dia e semana', () => {
    const r = calcularServico({
      horasEstimadas: 40,
      valorHora: 50,
      custosOperacionais: 0,
      complexidade: 'simples',
      urgencia: 'normal',
      margemLucro: 0,
    })
    // final = 40 * 50 = 2000; porHora = 50; porDia = 400; porSemana = 2000
    expect(r.precoPorHora).toBeCloseTo(50)
    expect(r.precoPorDia).toBeCloseTo(400)
    expect(r.precoPorSemana).toBeCloseTo(2000)
  })

  it('multiplicadores têm os valores esperados', () => {
    expect(MULTIPLICADORES_COMPLEXIDADE).toEqual({ simples: 1, medio: 1.3, avancado: 1.6 })
    expect(MULTIPLICADORES_URGENCIA).toEqual({ normal: 1, urgente: 1.2, express: 1.5 })
  })
})

describe('fmt', () => {
  it('formata em pt-BR com 2 casas decimais', () => {
    expect(fmt(1234.5)).toBe('1.234,50')
    expect(fmt(0)).toBe('0,00')
    expect(fmt(99.999)).toBe('100,00')
  })
})
