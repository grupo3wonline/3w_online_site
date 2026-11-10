import { describe, it, expect } from 'vitest'
import {
  precoPorHora,
  salarioLiquido,
  faturamentoAutonomo,
  orcamentoComMargem,
  campanhaMidia,
  retornoMarketing,
  custoGestaoTrafego,
  cacheInfluencer
} from './pricing'

describe('precoPorHora', () => {
  it('multiplica horas por valor e soma custos', () => {
    const r = precoPorHora(40, 100, 500)
    expect(r.maoDeObra).toBe(4000)
    expect(r.total).toBe(4500)
  })
  it('funciona sem custos adicionais', () => {
    expect(precoPorHora(10, 50).total).toBe(500)
  })
  it('rejeita negativos', () => {
    expect(() => precoPorHora(-1, 50)).toThrow()
  })
})

describe('salarioLiquido', () => {
  it('desconta INSS e outros do bruto', () => {
    const r = salarioLiquido(3000, 11, 200)
    expect(r.descontoInss).toBeCloseTo(330, 2)
    expect(r.liquido).toBeCloseTo(2470, 2)
  })
  it('rejeita inss acima de 100', () => {
    expect(() => salarioLiquido(3000, 150)).toThrow()
  })
})

describe('faturamentoAutonomo', () => {
  it('calcula faturamento necessário cobrindo impostos', () => {
    const r = faturamentoAutonomo(5000, 20, 1000)
    // (5000 + 1000) / 0.8 = 7500
    expect(r.faturamentoNecessario).toBeCloseTo(7500, 2)
    expect(r.impostos).toBeCloseTo(1500, 2)
  })
  it('rejeita impostos >= 100', () => {
    expect(() => faturamentoAutonomo(5000, 100)).toThrow()
  })
})

describe('orcamentoComMargem', () => {
  it('aplica margem sobre custo total', () => {
    const r = orcamentoComMargem(100, 100, 50)
    // custo 200 / 0.5 = 400
    expect(r.custo).toBe(200)
    expect(r.preco).toBeCloseTo(400, 2)
    expect(r.lucro).toBeCloseTo(200, 2)
  })
})

describe('campanhaMidia', () => {
  it('calcula cliques, conversões e CPA', () => {
    const r = campanhaMidia(1000, 2, 5)
    expect(r.cliques).toBe(500)
    expect(r.conversoes).toBe(25)
    expect(r.cpa).toBeCloseTo(40, 2)
  })
  it('CPA zero quando não há conversões', () => {
    expect(campanhaMidia(1000, 2, 0).cpa).toBe(0)
  })
  it('rejeita cpc zero', () => {
    expect(() => campanhaMidia(1000, 0, 5)).toThrow()
  })
})

describe('retornoMarketing', () => {
  it('calcula retorno e lucro', () => {
    const r = retornoMarketing(1000, 200, 300)
    // retorno 3000, lucro 3000-1000-300 = 1700
    expect(r.retornoBruto).toBeCloseTo(3000, 2)
    expect(r.lucroLiquido).toBeCloseTo(1700, 2)
  })
})

describe('custoGestaoTrafego', () => {
  it('soma investimento, fee e operacionais', () => {
    const r = custoGestaoTrafego(2000, 15, 300)
    expect(r.fee).toBeCloseTo(300, 2)
    expect(r.total).toBeCloseTo(2600, 2)
  })
})

describe('cacheInfluencer', () => {
  it('estima cachê a partir do alcance engajado', () => {
    const r = cacheInfluencer(10000, 5, 100)
    // alcance 500; valor 100 + 500*0.01 = 105
    expect(r.alcanceEngajado).toBe(500)
    expect(r.valorSugerido).toBeCloseTo(105, 2)
  })
})
