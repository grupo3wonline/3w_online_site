import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useStorage } from '@vueuse/core'
import type { DadosUsuario } from '@/lib/imc'

export interface HistoryEntry {
  id: string
  /** ISO date-time do cálculo */
  data: string
  altura: number
  peso: number
  idade: number
  sexo: DadosUsuario['sexo']
  imc: number
  categoria: string
}

const STORAGE_KEY = 'imc-history'
const MAX_ITEMS = 50

/**
 * Histórico de cálculos, persistido no dispositivo do usuário (localStorage).
 * Nenhum dado é enviado a servidores — conforme LGPD/GDPR/CCPA/POPIA.
 */
export const useHistoryStore = defineStore('history', () => {
  const entries = useStorage<HistoryEntry[]>(STORAGE_KEY, [])

  const count = computed(() => entries.value.length)
  const isEmpty = computed(() => entries.value.length === 0)

  function add(entry: Omit<HistoryEntry, 'id' | 'data'>): void {
    const novo: HistoryEntry = {
      ...entry,
      id:
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      data: new Date().toISOString(),
    }
    // Mais recentes primeiro, com limite máximo de itens
    entries.value = [novo, ...entries.value].slice(0, MAX_ITEMS)
  }

  function remove(id: string): void {
    entries.value = entries.value.filter((e) => e.id !== id)
  }

  function clear(): void {
    entries.value = []
  }

  return { entries, count, isEmpty, add, remove, clear }
})
