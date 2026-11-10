import { useUiStore } from '@/stores/ui'
import { storeToRefs } from 'pinia'

/**
 * Controla o overlay de loading global (fundo ofuscado).
 * `withLoading` garante o encerramento mesmo em caso de erro.
 */
export function useLoading() {
  const ui = useUiStore()
  const { isLoading, loadingMessage } = storeToRefs(ui)

  const start = (message?: string): void => ui.startLoading(message)
  const stop = (): void => ui.stopLoading()

  const withLoading = async <T>(fn: () => Promise<T>, message?: string): Promise<T> => {
    ui.startLoading(message)
    try {
      return await fn()
    } finally {
      ui.stopLoading()
    }
  }

  return { isLoading, loadingMessage, start, stop, withLoading }
}
