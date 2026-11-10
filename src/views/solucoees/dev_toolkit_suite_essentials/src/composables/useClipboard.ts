import { useClipboard as vueUseClipboard } from '@vueuse/core'
import { toast } from '@/lib/notify'

/**
 * Copia texto para a área de transferência com feedback via toast.
 */
export function useCopy() {
  const { copy, isSupported } = vueUseClipboard()

  async function copyText(text: string, message = 'Copiado para a área de transferência!') {
    if (!text) return
    try {
      if (isSupported.value) {
        await copy(text)
      } else {
        // Fallback para navegadores sem Clipboard API
        const ta = document.createElement('textarea')
        ta.value = text
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      toast(message, 'success')
    } catch {
      toast('Não foi possível copiar.', 'error')
    }
  }

  return { copyText }
}
