import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

/**
 * Store de UI global: controla o overlay de carregamento (loading)
 * com fundo ofuscado exibido enquanto a aplicação processa.
 */
export const useUiStore = defineStore('ui', () => {
  const pendingCount = ref(0)
  const message = ref('Carregando...')

  const isLoading = computed(() => pendingCount.value > 0)

  function startLoading(msg = 'Carregando...') {
    message.value = msg
    pendingCount.value++
  }

  function stopLoading() {
    pendingCount.value = Math.max(0, pendingCount.value - 1)
  }

  function reset() {
    pendingCount.value = 0
  }

  /** Executa uma promise exibindo o overlay durante o processamento. */
  async function withLoading<T>(fn: () => Promise<T>, msg = 'Processando...'): Promise<T> {
    startLoading(msg)
    try {
      return await fn()
    } finally {
      stopLoading()
    }
  }

  return { isLoading, message, startLoading, stopLoading, reset, withLoading }
})
