import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * Store de estado de carregamento global.
 * Suporta múltiplas requisições simultâneas via contador.
 */
export const useLoadingStore = defineStore('loading', () => {
  const pending = ref(0)
  const message = ref('Processando...')

  const isLoading = computed(() => pending.value > 0)

  function start(msg = 'Processando...') {
    message.value = msg
    pending.value++
  }

  function stop() {
    if (pending.value > 0) pending.value--
  }

  function reset() {
    pending.value = 0
  }

  return { pending, message, isLoading, start, stop, reset }
})
