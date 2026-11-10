import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCalculatorStore } from './calculator'
import type { CalculationResult } from '@/types/calculator'

const sample: CalculationResult = {
  dimensions: { width: 4, length: 5, ceilingHeight: 2.8 },
  calculated: {
    area: 20,
    volume: 56,
    perimeter: 18,
    points: 3,
    cableLength: 40,
    totalPower: 2000,
    current: 9,
    circuitBreaker: 15,
    cableGauge: 2.5,
  },
  metadata: { roomType: 'LIVING', calculatedAt: new Date().toISOString(), version: '1.0.0' },
}

describe('useCalculatorStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('inicia com histórico vazio', () => {
    const store = useCalculatorStore()
    expect(store.hasHistory).toBe(false)
    expect(store.historyCount).toBe(0)
  })

  it('salva cálculo e persiste no localStorage', () => {
    const store = useCalculatorStore()
    const item = store.saveCalculation(sample)
    expect(store.historyCount).toBe(1)
    expect(item.id).toBeTypeOf('number')
    const raw = localStorage.getItem('electroCalc_history')
    expect(raw).toBeTruthy()
  })

  it('remove cálculo por id', () => {
    const store = useCalculatorStore()
    const item = store.saveCalculation(sample)
    store.removeCalculation(item.id)
    expect(store.historyCount).toBe(0)
  })

  it('limpa o histórico', () => {
    const store = useCalculatorStore()
    store.saveCalculation(sample)
    store.saveCalculation(sample)
    store.clearHistory()
    expect(store.historyCount).toBe(0)
    expect(store.currentCalculation).toBeNull()
  })
})
