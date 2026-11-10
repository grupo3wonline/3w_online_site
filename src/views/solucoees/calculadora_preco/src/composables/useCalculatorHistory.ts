import { useStorage } from '@vueuse/core'
import type { CalculatorInput, CalculatorResult } from './useCalculator'

export interface HistoryEntry {
  id: string
  at: number
  input: CalculatorInput
  result: CalculatorResult
}

const MAX_ENTRIES = 5

/** Histórico dos últimos cálculos, persistido em localStorage. */
export function useCalculatorHistory() {
  const history = useStorage<HistoryEntry[]>('calc-history', [])

  function add(input: CalculatorInput, result: CalculatorResult) {
    const entry: HistoryEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      at: Date.now(),
      input,
      result,
    }
    history.value = [entry, ...history.value].slice(0, MAX_ENTRIES)
  }

  function clear() {
    history.value = []
  }

  return { history, add, clear }
}
