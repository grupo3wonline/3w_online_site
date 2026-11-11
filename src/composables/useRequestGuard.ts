/**
 * useRequestGuard — evita requisições concorrentes e duplicate-submit.
 *
 * - Bloqueia nova chamada enquanto a anterior está pendente
 * - Mantém estado `pending` reativo para desabilitar botões
 * - Aceita AbortController externo para cancelamento
 */
import { ref } from 'vue'

export function useRequestGuard() {
  const pending = ref(false)

  /**
   * Executa `fn` apenas se não houver outra execução em andamento.
   * Define `pending = true` no início e `pending = false` ao término.
   *
   * @returns valor retornado por `fn`, ou `undefined` se bloqueado
   */
  async function run<T>(fn: () => Promise<T>): Promise<T | undefined> {
    if (pending.value) return undefined
    pending.value = true
    try {
      return await fn()
    } catch (err) {
      // AbortError é silencioso (cancela requisição anterior)
      if (err instanceof DOMException && err.name === 'AbortError') return undefined
      throw err
    } finally {
      pending.value = false
    }
  }

  /** Reseta o guard manualmente (útil em resets de formulário). */
  function reset(): void {
    pending.value = false
  }

  return { pending, run, reset }
}
