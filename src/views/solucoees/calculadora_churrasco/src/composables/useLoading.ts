import { ref, computed, readonly } from 'vue'

/**
 * Controle global de estado de carregamento.
 * Um contador evita que operações concorrentes desliguem o overlay
 * prematuramente uma da outra.
 */
const contador = ref(0)
const mensagem = ref('Processando...')

const ativo = computed(() => contador.value > 0)

export function useLoading() {
  function iniciar(msg = 'Processando...'): void {
    mensagem.value = msg
    contador.value++
  }

  function finalizar(): void {
    contador.value = Math.max(0, contador.value - 1)
  }

  /** Envolve uma operação (sync ou async) exibindo o overlay durante a execução. */
  async function withLoading<T>(fn: () => Promise<T> | T, msg?: string): Promise<T> {
    iniciar(msg)
    try {
      return await fn()
    } finally {
      finalizar()
    }
  }

  return {
    ativo,
    mensagem: readonly(mensagem),
    iniciar,
    finalizar,
    withLoading,
  }
}
