import { ref, watch } from 'vue'
import type { CalculoInput, CalculoResultado, HistoricoItem } from '@/types'

const STORAGE_KEY = 'calculator_history'
const MAX_HISTORY_ITEMS = 10

const history = ref<HistoricoItem[]>([])
let loaded = false

/** Composable para gerenciar o histórico de cálculos (localStorage, apenas no navegador). */
export function useCalculatorHistory() {
  function load(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      history.value = stored ? (JSON.parse(stored) as HistoricoItem[]) : []
    } catch {
      history.value = []
    }
  }

  function save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history.value))
    } catch {
      /* ignora falha de escrita (ex.: modo privado) */
    }
  }

  function addToHistory(entry: CalculoInput & CalculoResultado): void {
    const item: HistoricoItem = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...entry,
    }
    history.value.unshift(item)
    if (history.value.length > MAX_HISTORY_ITEMS) {
      history.value = history.value.slice(0, MAX_HISTORY_ITEMS)
    }
    save()
  }

  function removeFromHistory(id: number): void {
    history.value = history.value.filter((i) => i.id !== id)
    save()
  }

  function clearHistory(): void {
    history.value = []
    localStorage.removeItem(STORAGE_KEY)
  }

  function formatDate(isoString: string): string {
    return new Date(isoString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (!loaded) {
    load()
    watch(history, save, { deep: true })
    loaded = true
  }

  return { history, addToHistory, removeFromHistory, clearHistory, formatDate }
}
