import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

/**
 * Store de loading global (overlay com fundo ofuscado).
 * Usa contador para suportar múltiplas operações concorrentes.
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

  /** Envolve uma Promise exibindo o overlay durante sua execução. */
  async function wrap<T>(task: () => Promise<T>, msg?: string): Promise<T> {
    start(msg)
    try {
      return await task()
    } finally {
      stop()
    }
  }

  return { isLoading, message, start, stop, reset, wrap }
})
