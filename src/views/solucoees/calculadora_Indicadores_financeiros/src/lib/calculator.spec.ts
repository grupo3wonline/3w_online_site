import { describe, it, expect } from 'vitest'
import {
  calculateIndicators,
  getIndicatorStatus,
  financialInputsSchema,
  type FinancialInputs,
} from './calculator'

const baseInputs: FinancialInputs = {
  revenue: 5_000_000,
  ebit: 800_000,
  depreciation: 120_000,
  netIncome: 550_000,
  equity: 2_200_000,
  totalAssets: 4_500_000,
  marketCap: 8_000_000,
  enterpriseValue: 9_500_000,
  dividends: 180_000,
  currentAssets: 1_800_000,
  currentLiabilities: 900_000,
  inventory: 350_000,
}

describe('calculateIndicators', () => {
  const results = calculateIndicators(baseInputs)
  const byKey = Object.fromEntries(results.map((r) => [r.key, r]))

  it('retorna 10 indicadores', () => {
    expect(results).toHaveLength(10)
  })

  it('calcula EBITDA como EBIT + Depreciação', () => {
    expect(byKey.ebitda.value).toBe(920_000)
  })

  it('calcula P/L = marketCap / netIncome', () => {
    expect(byKey.pl.value).toBeCloseTo(8_000_000 / 550_000, 4)
  })

  it('calcula EV/EBITDA', () => {
    expect(byKey.evEbitda.value).toBeCloseTo(9_500_000 / 920_000, 4)
  })

  it('calcula ROE em percentual', () => {
    expect(byKey.roe.value).toBeCloseTo((550_000 / 2_200_000) * 100, 4)
  })

  it('calcula ROA em percentual', () => {
    expect(byKey.roa.value).toBeCloseTo((550_000 / 4_500_000) * 100, 4)
  })

  it('calcula Liquidez Seca excluindo estoque', () => {
    expect(byKey.quickRatio.value).toBeCloseTo((1_800_000 - 350_000) / 900_000, 4)
  })

  it('formata EBITDA como moeda BRL', () => {
    expect(byKey.ebitda.formatted).toContain('R$')
  })
})

describe('divisão por zero', () => {
  it('não retorna NaN nem Infinity quando denominadores são 0', () => {
    const zeroed: FinancialInputs = {
      ...baseInputs,
      netIncome: 0,
      equity: 0,
      totalAssets: 0,
      marketCap: 0,
      currentLiabilities: 0,
      ebit: 0,
      depreciation: 0,
    }
    const results = calculateIndicators(zeroed)
    for (const r of results) {
      expect(Number.isFinite(r.value)).toBe(true)
    }
  })
})

describe('getIndicatorStatus', () => {
  it('classifica ROE alto como good', () => {
    expect(getIndicatorStatus('roe', 20)).toBe('good')
  })
  it('classifica ROE médio como warning', () => {
    expect(getIndicatorStatus('roe', 10)).toBe('warning')
  })
  it('classifica ROE baixo como bad', () => {
    expect(getIndicatorStatus('roe', 3)).toBe('bad')
  })
  it('classifica P/L saudável (<15) como good', () => {
    expect(getIndicatorStatus('pl', 10)).toBe('good')
  })
  it('valuation é neutral', () => {
    expect(getIndicatorStatus('valuation', 999)).toBe('neutral')
  })
})

describe('financialInputsSchema', () => {
  it('valida entradas corretas', () => {
    expect(financialInputsSchema.safeParse(baseInputs).success).toBe(true)
  })

  it('rejeita ativo negativo', () => {
    const bad = { ...baseInputs, totalAssets: -1 }
    expect(financialInputsSchema.safeParse(bad).success).toBe(false)
  })

  it('aceita lucro líquido negativo (prejuízo)', () => {
    const loss = { ...baseInputs, netIncome: -50_000 }
    expect(financialInputsSchema.safeParse(loss).success).toBe(true)
  })
})
