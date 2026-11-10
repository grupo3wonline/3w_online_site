/**
 * Store de estado de UI global — controla o overlay de carregamento
 * compartilhado por todas as páginas.
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const loading = ref(false)
  const loadingMessage = ref('Processando...')

  function startLoading(message = 'Processando...') {
    loadingMessage.value = message
    loading.value = true
  }

  function stopLoading() {
    loading.value = false
  }

  /**
   * Executa uma tarefa exibindo o overlay durante a espera.
   * Garante o encerramento do loading mesmo em caso de erro.
   */
  async function withLoading<T>(task: () => Promise<T> | T, message?: string): Promise<T> {
    startLoading(message)
    try {
      return await task()
    } finally {
      stopLoading()
    }
  }

  return { loading, loadingMessage, startLoading, stopLoading, withLoading }
})
