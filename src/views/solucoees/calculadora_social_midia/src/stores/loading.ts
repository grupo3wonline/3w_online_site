import { defineStore } from 'pinia'
import { ref } from 'vue'

/** Store global do overlay de carregamento (fundo ofuscado). */
export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref(false)
  const message = ref('Carregando...')
  let counter = 0

  function start(text = 'Carregando...') {
    counter += 1
    message.value = text
    isLoading.value = true
  }

  function stop() {
    counter = Math.max(0, counter - 1)
    if (counter === 0) isLoading.value = false
  }

  /** Executa uma tarefa assíncrona exibindo o overlay durante a operação. */
  async function withLoading<T>(task: () => Promise<T>, text?: string): Promise<T> {
    start(text)
    try {
      return await task()
    } finally {
      stop()
    }
  }

  return { isLoading, message, start, stop, withLoading }
})
