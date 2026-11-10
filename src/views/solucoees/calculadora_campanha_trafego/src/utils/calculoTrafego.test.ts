import { describe, it, expect } from 'vitest'
import {
  calcularCampanha,
  parametrosValidos,
  recomendacaoPorRoi,
  formatarMoeda,
  formatarNumero,
  type ParametrosCampanha,
} from './calculoTrafego'

const parametrosBase: ParametrosCampanha = {
  orcamento: 10000,
  cpc: 4,
  ctr: 2.5,
  taxaConversao: 3,
  ticketMedio: 500,
}

describe('parametrosValidos', () => {
  it('aceita parâmetros positivos e finitos', () => {
    expect(parametrosValidos(parametrosBase)).toBe(true)
  })

  it('rejeita valores zero', () => {
    expect(parametrosValidos({ ...parametrosBase, orcamento: 0 })).toBe(false)
  })

  it('rejeita valores negativos', () => {
    expect(parametrosValidos({ ...parametrosBase, cpc: -1 })).toBe(false)
  })

  it('rejeita NaN', () => {
    expect(parametrosValidos({ ...parametrosBase, ctr: NaN })).toBe(false)
  })

  it('rejeita Infinity', () => {
    expect(parametrosValidos({ ...parametrosBase, ticketMedio: Infinity })).toBe(false)
  })
})

describe('calcularCampanha', () => {
  it('calcula todas as métricas corretamente para o cenário base', () => {
    const r = calcularCampanha(parametrosBase)
    // 10000 / 4 = 2500 cliques
    expect(r.cliques).toBe(2500)
    // 2500 / 0.025 = 100000 impressões
    expect(r.impressoes).toBe(100000)
    // 2500 * 0.03 = 75 conversões
    expect(r.conversoes).toBe(75)
    // 10000 / 75 = 133.33 custo por conversão
    expect(r.custoConversao).toBe(133.33)
    // 75 * 500 = 37500 receita
    expect(r.receita).toBe(37500)
    // ((37500 - 10000) / 10000) * 100 = 275% ROI
    expect(r.roi).toBe(275)
    // 10000 / 500 = 20 vendas no ponto de equilíbrio
    expect(r.pontoEquilibrio).toBe(20)
  })

  it('produz ROI negativo quando a receita é menor que o orçamento', () => {
    const r = calcularCampanha({ ...parametrosBase, ticketMedio: 50 })
    expect(r.roi).toBeLessThan(0)
  })

  it('lança RangeError para parâmetros inválidos', () => {
    expect(() => calcularCampanha({ ...parametrosBase, orcamento: 0 })).toThrow(RangeError)
  })

  it('arredonda valores monetários para no máximo 2 casas decimais', () => {
    const r = calcularCampanha(parametrosBase)
    // Compara com o próprio valor arredondado a 2 casas: não deve haver mais precisão que isso.
    expect(r.custoConversao).toBe(Math.round(r.custoConversao * 100) / 100)
    expect(r.custoConversao).toBe(133.33)
  })
})

describe('recomendacaoPorRoi', () => {
  it('retorna recomendação de alto ROI acima de 200%', () => {
    expect(recomendacaoPorRoi(275)).toMatch(/altamente recomendada/i)
  })

  it('retorna recomendação positiva entre 100% e 200%', () => {
    expect(recomendacaoPorRoi(150)).toMatch(/recomendada/i)
  })

  it('alerta sobre ROI baixo entre 0% e 100%', () => {
    expect(recomendacaoPorRoi(50)).toMatch(/otimiza/i)
  })

  it('alerta sobre ROI negativo', () => {
    expect(recomendacaoPorRoi(-10)).toMatch(/negativo/i)
  })
})

describe('formatação pt-BR', () => {
  it('formata moeda em reais', () => {
    const texto = formatarMoeda(1234.5)
    expect(texto).toContain('R$')
    expect(texto).toContain('1.234,50')
  })

  it('formata número com separador de milhar', () => {
    expect(formatarNumero(100000)).toBe('100.000')
  })
})
