import { describe, it, expect } from 'vitest'
import {
  getCategoriaIMC,
  calcTMB,
  calcGET,
  calcIngestaoAgua,
  calcularResultado,
} from './calculator'
import type { DadosUsuario } from './types'

describe('getCategoriaIMC', () => {
  it('classifica as faixas de IMC corretamente', () => {
    expect(getCategoriaIMC(17)).toBe('Abaixo do peso')
    expect(getCategoriaIMC(22)).toBe('Peso normal')
    expect(getCategoriaIMC(27)).toBe('Sobrepeso')
    expect(getCategoriaIMC(32)).toBe('Obesidade grau I')
    expect(getCategoriaIMC(37)).toBe('Obesidade grau II')
    expect(getCategoriaIMC(42)).toBe('Obesidade grau III')
  })

  it('trata os limites de faixa', () => {
    expect(getCategoriaIMC(18.5)).toBe('Peso normal')
    expect(getCategoriaIMC(25)).toBe('Sobrepeso')
  })
})

describe('calcTMB', () => {
  it('usa a fórmula masculina', () => {
    const r = calcTMB(70, 1.75, 30, 'male')
    // 66 + 13.75*70 + 5*175 - 6.75*30 = 66 + 962.5 + 875 - 202.5 = 1701
    expect(r.valor).toBe(1701)
  })

  it('usa a fórmula feminina', () => {
    const r = calcTMB(60, 1.65, 30, 'female')
    // 655 + 9.56*60 + 1.85*165 - 4.68*30 = 655 + 573.6 + 305.25 - 140.4 = 1393.45
    expect(r.valor).toBeCloseTo(1393.45, 2)
  })
})

describe('calcGET', () => {
  it('multiplica a TMB pelo fator de atividade', () => {
    const tmb = calcTMB(70, 1.75, 30, 'male').valor
    const get = calcGET(70, 1.75, 30, 'male', 1.55).valor
    expect(get).toBeCloseTo(tmb * 1.55, 2)
  })
})

describe('calcIngestaoAgua', () => {
  it('calcula 35ml por kg', () => {
    const r = calcIngestaoAgua(70, 'male')
    expect(r.necessidadeHidrica).toBe(2.45)
    expect(r.litros).toBe('2.45 Litros')
  })
})

describe('calcularResultado', () => {
  const dados: DadosUsuario = {
    altura: 1.75,
    peso: 70,
    idade: 30,
    sexo: 'male',
    atividade: 1.55,
  }

  it('calcula o IMC corretamente', () => {
    const r = calcularResultado(dados)
    // 70 / (1.75^2) = 22.857...
    expect(r.imc).toBeCloseTo(22.86, 2)
    expect(r.imcCategoria).toBe('Peso normal')
  })

  it('preenche todos os blocos do resultado', () => {
    const r = calcularResultado(dados)
    expect(r.gastoCalorico.calorias.necessidade).toBeGreaterThan(0)
    expect(r.hidratacao.necessidadeHidrica).toBeGreaterThan(0)
    expect(r.pesoIdeal.pesoMin).toBeGreaterThan(0)
    expect(Object.keys(r.nutrientes).length).toBeGreaterThan(30)
    expect(Object.keys(r.remediosNaturais)).toHaveLength(8)
  })

  it('distribui as refeições somando ~100% das calorias', () => {
    const r = calcularResultado(dados)
    const soma =
      r.refeicoes.cafe.calorias +
      r.refeicoes.almoco.calorias +
      r.refeicoes.jantar.calorias +
      r.refeicoes.lanches.calorias
    // 25% + 35% + 30% + 10% = 100%
    expect(soma).toBeCloseTo(r.calorias, -1)
  })
})
