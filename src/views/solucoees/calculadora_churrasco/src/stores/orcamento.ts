import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useStorage } from '@vueuse/core'
import {
  calcularOrcamento,
  itemVazio,
  type ItemOrcamento,
  type ResumoOrcamento,
} from '@/lib/orcamento'

/**
 * Store da calculadora manual de orçamento.
 * Persiste os itens e o número de participantes localmente (privacy-first).
 */
export const useOrcamentoStore = defineStore('orcamento', () => {
  // Serializer tipado para a lista de itens (nunca retorna null).
  const itens = useStorage<ItemOrcamento[]>('orcamento:itens', [], localStorage, {
    serializer: {
      read: (v: string): ItemOrcamento[] => {
        try {
          const parsed = v ? JSON.parse(v) : []
          return Array.isArray(parsed) ? (parsed as ItemOrcamento[]) : []
        } catch {
          return []
        }
      },
      write: (v: ItemOrcamento[]): string => JSON.stringify(v),
    },
  })

  const participantes = useStorage<number>('orcamento:participantes', 1, localStorage)

  const resumo = computed<ResumoOrcamento>(() =>
    calcularOrcamento(itens.value, participantes.value),
  )

  function adicionarItem(): void {
    itens.value = [...itens.value, itemVazio()]
  }

  function removerItem(id: string): void {
    itens.value = itens.value.filter((i) => i.id !== id)
  }

  function limpar(): void {
    itens.value = []
    participantes.value = 1
  }

  return { itens, participantes, resumo, adicionarItem, removerItem, limpar }
})
