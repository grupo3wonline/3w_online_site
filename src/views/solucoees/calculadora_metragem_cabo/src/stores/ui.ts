import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/** Store de UI: controla o overlay de carregamento global (fundo ofuscado). */
export const useUiStore = defineStore('ui', () => {
  const loadingCount = ref(0)
  const loadingMessage = ref('Processando...')

  const isLoading = computed(() => loadingCount.value > 0)

  function startLoading(message = 'Processando...'): void {
    loadingMessage.value = message
    loadingCount.value++
  }

  function stopLoading(): void {
    loadingCount.value = Math.max(0, loadingCount.value - 1)
  }

  /** Executa uma ação assíncrona exibindo o overlay durante a execução. */
  async function withLoading<T>(fn: () => Promise<T>, message?: string): Promise<T> {
    startLoading(message)
    try {
      return await fn()
    } finally {
      stopLoading()
    }
  }

  return { isLoading, loadingMessage, startLoading, stopLoading, withLoading }
})
