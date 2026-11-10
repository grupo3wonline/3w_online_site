import { defineStore } from 'pinia'
import { ref } from 'vue'

/** Store de UI global: overlay de carregamento ofuscado. */
export const useUiStore = defineStore('ui', () => {
  const loading = ref(false)
  const loadingText = ref('Processando...')
  let counter = 0

  function startLoading(text = 'Processando...') {
    counter++
    loadingText.value = text
    loading.value = true
  }

  function stopLoading() {
    counter = Math.max(0, counter - 1)
    if (counter === 0) loading.value = false
  }

  /** Envolve uma ação assíncrona exibindo o overlay durante a execução. */
  async function withLoading<T>(fn: () => Promise<T> | T, text = 'Processando...'): Promise<T> {
    startLoading(text)
    try {
      return await fn()
    } finally {
      stopLoading()
    }
  }

  return { loading, loadingText, startLoading, stopLoading, withLoading }
})
