import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * Store de UI global: controla o overlay de carregamento com fundo ofuscado.
 */
export const useUiStore = defineStore('ui', () => {
  const loading = ref(false)
  const loadingText = ref('Processando...')
  let pending = 0

  function startLoading(text = 'Processando...') {
    pending++
    loadingText.value = text
    loading.value = true
  }

  function stopLoading() {
    pending = Math.max(0, pending - 1)
    if (pending === 0) loading.value = false
  }

  /**
   * Executa uma tarefa assíncrona exibindo o overlay durante a execução.
   */
  async function withLoading<T>(task: () => Promise<T> | T, text = 'Processando...'): Promise<T> {
    startLoading(text)
    try {
      return await task()
    } finally {
      stopLoading()
    }
  }

  return { loading, loadingText, startLoading, stopLoading, withLoading }
})
