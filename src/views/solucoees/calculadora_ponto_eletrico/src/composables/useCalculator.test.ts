import { describe, it, expect } from 'vitest'
import { useCalculator } from './useCalculator'

const {
  calculateArea,
  calculateVolume,
  calculatePerimeter,
  calculateElectricPoints,
  calculateCableLength,
  calculateTotalPower,
  calculateCurrent,
  suggestCircuitBreaker,
  suggestCableGauge,
  performCalculation,
} = useCalculator()

describe('useCalculator — geometria', () => {
  it('calcula a área', () => {
    expect(calculateArea(3, 4)).toBe(12)
  })

  it('calcula o volume', () => {
    expect(calculateVolume(3, 4, 2.8)).toBeCloseTo(33.6)
  })

  it('calcula o perímetro', () => {
    expect(calculatePerimeter(3, 4)).toBe(14)
  })
})

describe('useCalculator — pontos elétricos (NBR 5410)', () => {
  it('garante no mínimo 1 ponto por ambiente', () => {
    expect(calculateElectricPoints(1, 1)).toBe(1)
  })

  it('usa 1 ponto a cada 8 m² (arredondando p/ cima)', () => {
    // 20 m² -> ceil(20/8) = 3
    expect(calculateElectricPoints(4, 5)).toBe(3)
  })
})

describe('useCalculator — elétrica', () => {
  it('potência = área × VA/m² do ambiente (LIVING=100)', () => {
    expect(calculateTotalPower(10, 'LIVING')).toBe(1000)
  })

  it('potência para banheiro usa 600 VA/m²', () => {
    expect(calculateTotalPower(5, 'BATHROOM')).toBe(3000)
  })

  it('corrente = potência / tensão', () => {
    expect(calculateCurrent(2200, 220)).toBe(10)
  })

  it('sugere disjuntor com margem de 25%', () => {
    // 10 A * 1.25 = 12.5 -> primeiro disjuntor >= 12.5 é 15 A
    expect(suggestCircuitBreaker(10)).toBe(15)
  })

  it('limita o disjuntor máximo a 70 A', () => {
    expect(suggestCircuitBreaker(100)).toBe(70)
  })

  it('sugere bitola por faixa de corrente', () => {
    expect(suggestCableGauge(8)).toBe(1.5)
    expect(suggestCableGauge(18)).toBe(4.0)
    expect(suggestCableGauge(50)).toBe(25.0)
  })

  it('cabo cresce com pontos e perímetro', () => {
    const menor = calculateCableLength(3, 3, 2.8, 2)
    const maior = calculateCableLength(6, 6, 2.8, 5)
    expect(maior).toBeGreaterThan(menor)
  })
})

describe('useCalculator — performCalculation', () => {
  it('retorna um resultado estruturado e consistente', async () => {
    const result = await performCalculation(4, 5, 2.8, 'LIVING')
    expect(result.dimensions).toEqual({ width: 4, length: 5, ceilingHeight: 2.8 })
    expect(result.calculated.area).toBe(20)
    expect(result.calculated.points).toBe(3)
    expect(result.metadata.roomType).toBe('LIVING')
    expect(result.metadata.calculatedAt).toBeTypeOf('string')
  })
})
