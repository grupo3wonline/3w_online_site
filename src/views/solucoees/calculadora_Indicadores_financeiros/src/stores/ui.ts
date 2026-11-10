import { defineStore } from 'pinia'
import { ref } from 'vue'

/** Estado global de UI: overlay de carregamento com fundo ofuscado. */
export const useUiStore = defineStore('ui', () => {
  const loading = ref(false)
  const loadingText = ref('Processando...')

  function startLoading(text = 'Processando...') {
    loadingText.value = text
    loading.value = true
  }

  function stopLoading() {
    loading.value = false
  }

  return { loading, loadingText, startLoading, stopLoading }
})
