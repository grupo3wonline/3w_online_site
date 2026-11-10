import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { APP_CONFIG } from '@/utils/constants'
import type { CalculationResult, CalculationHistoryItem } from '@/types/calculator'

/**
 * Store da calculadora: histórico persistido em localStorage.
 */
export const useCalculatorStore = defineStore('calculator', () => {
  const history = ref<CalculationHistoryItem[]>([])
  const currentCalculation = ref<CalculationHistoryItem | null>(null)

  const historyCount = computed(() => history.value.length)
  const hasHistory = computed(() => history.value.length > 0)
  const recentCalculations = computed(() => history.value.slice(0, 10))

  const saveToLocalStorage = (): void => {
    try {
      localStorage.setItem(APP_CONFIG.STORAGE_KEY, JSON.stringify(history.value))
    } catch (err) {
      console.error('Erro ao salvar histórico no localStorage:', err)
    }
  }

  const loadFromLocalStorage = (): void => {
    try {
      const saved = localStorage.getItem(APP_CONFIG.STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        history.value = Array.isArray(parsed) ? parsed : []
      }
    } catch (err) {
      console.error('Erro ao carregar histórico do localStorage:', err)
      history.value = []
    }
  }

  const saveCalculation = (calculation: CalculationResult): CalculationHistoryItem => {
    const item: CalculationHistoryItem = {
      ...calculation,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    }
    history.value.unshift(item)
    if (history.value.length > APP_CONFIG.MAX_HISTORY_ITEMS) {
      history.value = history.value.slice(0, APP_CONFIG.MAX_HISTORY_ITEMS)
    }
    saveToLocalStorage()
    return item
  }

  const removeCalculation = (id: number): void => {
    const index = history.value.findIndex((item) => item.id === id)
    if (index !== -1) {
      history.value.splice(index, 1)
      saveToLocalStorage()
    }
  }

  const clearHistory = (): void => {
    history.value = []
    currentCalculation.value = null
    saveToLocalStorage()
  }

  const getCalculationById = (id: number): CalculationHistoryItem | undefined =>
    history.value.find((item) => item.id === id)

  const setCurrentCalculation = (calculation: CalculationHistoryItem | null): void => {
    currentCalculation.value = calculation
  }

  const exportHistoryAsJSON = (): void => {
    const dataStr = JSON.stringify(history.value, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `calculadora_ponto_eletrico_${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  loadFromLocalStorage()

  return {
    history,
    currentCalculation,
    historyCount,
    hasHistory,
    recentCalculations,
    saveCalculation,
    removeCalculation,
    clearHistory,
    getCalculationById,
    setCurrentCalculation,
    exportHistoryAsJSON,
    loadFromLocalStorage,
  }
})
