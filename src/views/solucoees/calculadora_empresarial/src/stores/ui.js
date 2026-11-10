import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * Store de UI global.
 * Centraliza o estado de carregamento (loading overlay) e tema,
 * seguindo o princípio de responsabilidade única (SOLID).
 */
export const useUiStore = defineStore('ui', () => {
  const isLoading = ref(false)
  const loadingMessage = ref('Processando...')
  let pendingCount = 0

  /**
   * Exibe o overlay de carregamento com fundo ofuscado.
   * @param {string} [message] Mensagem opcional exibida ao usuário.
   */
  function startLoading(message = 'Processando...') {
    pendingCount += 1
    loadingMessage.value = message
    isLoading.value = true
  }

  /**
   * Esconde o overlay quando todas as operações pendentes terminam.
   */
  function stopLoading() {
    pendingCount = Math.max(0, pendingCount - 1)
    if (pendingCount === 0) {
      isLoading.value = false
    }
  }

  /**
   * Executa uma função assíncrona exibindo o loading enquanto ela roda.
   * @template T
   * @param {() => Promise<T>} fn
   * @param {string} [message]
   * @returns {Promise<T>}
   */
  async function withLoading(fn, message) {
    startLoading(message)
    try {
      return await fn()
    } finally {
      stopLoading()
    }
  }

  return {
    isLoading,
    loadingMessage,
    startLoading,
    stopLoading,
    withLoading
  }
})
