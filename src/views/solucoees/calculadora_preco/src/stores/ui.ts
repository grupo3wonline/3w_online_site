import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

/** Controla o overlay de carregamento global (fundo ofuscado). */
export const useUiStore = defineStore('ui', () => {
  const pending = ref(0)
  const message = ref('Processando...')

  const isLoading = computed(() => pending.value > 0)

  function start(msg = 'Processando...') {
    message.value = msg
    pending.value++
  }

  function stop() {
    pending.value = Math.max(0, pending.value - 1)
  }

  /** Executa uma ação assíncrona exibindo o overlay durante a execução. */
  async function withLoading<T>(fn: () => Promise<T> | T, msg?: string): Promise<T> {
    start(msg)
    try {
      return await fn()
    } finally {
      stop()
    }
  }

  return { isLoading, message, start, stop, withLoading }
})
