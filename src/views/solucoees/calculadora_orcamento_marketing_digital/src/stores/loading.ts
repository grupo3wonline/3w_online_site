import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

/**
 * Store de loading global. Suporta múltiplas requisições concorrentes
 * via contador, evitando que uma finalize o overlay de outra.
 */
export const useLoadingStore = defineStore('loading', () => {
  const count = ref(0)
  const message = ref('Processando...')

  const isLoading = computed(() => count.value > 0)

  function start(msg = 'Processando...') {
    message.value = msg
    count.value++
  }

  function stop() {
    if (count.value > 0) count.value--
  }

  function reset() {
    count.value = 0
  }

  /** Envolve uma promessa exibindo o overlay durante sua execução. */
  async function wrap<T>(promise: Promise<T>, msg?: string): Promise<T> {
    start(msg)
    try {
      return await promise
    } finally {
      stop()
    }
  }

  return { isLoading, message, start, stop, reset, wrap }
})
