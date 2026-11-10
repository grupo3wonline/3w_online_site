import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * Store de estado de UI global — controla o overlay de carregamento
 * exibido enquanto operações assíncronas estão em andamento.
 */
export const useUiStore = defineStore('ui', () => {
  const isLoading = ref(false)

  function setLoading(value: boolean) {
    isLoading.value = value
  }

  return { isLoading, setLoading }
})
