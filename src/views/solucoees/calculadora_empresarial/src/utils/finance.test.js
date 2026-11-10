import { describe, it, expect } from 'vitest'
import {
  parseNumber,
  jurosCompostos,
  jurosSimples,
  precoComMargem,
  valorHora,
  valorParcela,
  parcelamento,
  formatBRL
} from './finance'

describe('parseNumber', () => {
  it('converte string simples', () => {
    expect(parseNumber('1.5')).toBe(1.5)
  })
  it('aceita vírgula como decimal (pt-BR)', () => {
    expect(parseNumber('1,5')).toBe(1.5)
  })
  it('retorna NaN para vazio', () => {
    expect(Number.isNaN(parseNumber(''))).toBe(true)
  })
  it('mantém number', () => {
    expect(parseNumber(42)).toBe(42)
  })
})

describe('jurosCompostos', () => {
  it('calcula montante corretamente (10000 a 1% por 12 meses)', () => {
    const { montante, juros } = jurosCompostos(10000, 1, 12)
    expect(montante).toBeCloseTo(11268.25, 2)
    expect(juros).toBeCloseTo(1268.25, 2)
  })
  it('taxa zero mantém o capital', () => {
    const { montante, juros } = jurosCompostos(1000, 0, 10)
    expect(montante).toBe(1000)
    expect(juros).toBe(0)
  })
  it('lança erro com capital inválido', () => {
    expect(() => jurosCompostos(0, 1, 12)).toThrow()
    expect(() => jurosCompostos(-100, 1, 12)).toThrow()
  })
})

describe('jurosSimples', () => {
  it('calcula juros simples (1000 a 2% por 6)', () => {
    const { montante, juros } = jurosSimples(1000, 2, 6)
    expect(juros).toBeCloseTo(120, 2)
    expect(montante).toBeCloseTo(1120, 2)
  })
})

describe('precoComMargem', () => {
  it('calcula preço com margem de 50% sobre custo 100', () => {
    const { preco, lucro } = precoComMargem(100, 50)
    expect(preco).toBeCloseTo(200, 2)
    expect(lucro).toBeCloseTo(100, 2)
  })
  it('margem 0 devolve o custo', () => {
    expect(precoComMargem(100, 0).preco).toBe(100)
  })
  it('rejeita margem >= 100', () => {
    expect(() => precoComMargem(100, 100)).toThrow()
  })
})

describe('valorHora', () => {
  it('divide custos por horas', () => {
    expect(valorHora(5000, 160)).toBeCloseTo(31.25, 2)
  })
  it('rejeita horas zero', () => {
    expect(() => valorHora(5000, 0)).toThrow()
  })
})

describe('valorParcela', () => {
  it('divide total por quantidade', () => {
    expect(valorParcela(1200, 12)).toBe(100)
  })
  it('rejeita quantidade zero', () => {
    expect(() => valorParcela(1200, 0)).toThrow()
  })
})

describe('parcelamento', () => {
  it('sem juros divide igualmente', () => {
    const r = parcelamento(1200, 12, 0)
    expect(r.valorParcela).toBe(100)
    expect(r.totalPago).toBe(1200)
    expect(r.jurosTotal).toBe(0)
  })
  it('com juros aumenta o total pago', () => {
    const r = parcelamento(1000, 10, 2)
    expect(r.valorParcela).toBeGreaterThan(100)
    expect(r.jurosTotal).toBeGreaterThan(0)
  })
  it('rejeita valores inválidos', () => {
    expect(() => parcelamento(0, 10, 2)).toThrow()
  })
})

describe('formatBRL', () => {
  it('formata como moeda brasileira', () => {
    const result = formatBRL(1268.25)
    expect(result).toContain('1.268,25')
    expect(result).toContain('R$')
  })
  it('trata valores inválidos como 0', () => {
    expect(formatBRL(NaN)).toContain('0,00')
  })
})
