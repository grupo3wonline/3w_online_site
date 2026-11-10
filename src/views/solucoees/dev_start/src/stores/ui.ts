import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const loading = ref(false)
  const loadingMessage = ref('Processando...')
  let pending = 0

  function startLoading(message = 'Processando...') {
    pending += 1
    loadingMessage.value = message
    loading.value = true
  }

  function stopLoading() {
    pending = Math.max(0, pending - 1)
    if (pending === 0) loading.value = false
  }

  /** Executa uma promessa exibindo o overlay de carregamento global. */
  async function withLoading<T>(fn: () => Promise<T>, message?: string): Promise<T> {
    startLoading(message)
    try {
      return await fn()
    } finally {
      stopLoading()
    }
  }

  return { loading, loadingMessage, startLoading, stopLoading, withLoading }
})
