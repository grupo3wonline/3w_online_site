import { defineStore } from 'pinia'
import { ref } from 'vue'

/** Estado de UI global: overlay de carregamento com fundo ofuscado. */
export const useUiStore = defineStore('ui', () => {
  const loading = ref(false)
  const loadingMessage = ref('Processando...')

  function showLoading(message = 'Processando...') {
    loadingMessage.value = message
    loading.value = true
  }

  function hideLoading() {
    loading.value = false
  }

  return { loading, loadingMessage, showLoading, hideLoading }
})
