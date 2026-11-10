import Swal, { type SweetAlertOptions } from 'sweetalert2'
import { useThemeStore } from '@/stores/theme'

/**
 * Composable que centraliza o uso do SweetAlert2, aplicando automaticamente
 * o tema (claro/escuro) e as cores da marca. Mantém a UI de alertas
 * consistente em toda a aplicação (responsabilidade única).
 */
export function useAlert() {
  const themeStore = useThemeStore()

  function baseConfig(): SweetAlertOptions {
    const dark = themeStore.isDark
    return {
      background: dark ? '#1e293b' : '#ffffff',
      color: dark ? '#f1f5f9' : '#1e293b',
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#64748b',
      buttonsStyling: true,
      heightAuto: false
    }
  }

  function success(title: string, text?: string) {
    return Swal.fire({ ...baseConfig(), icon: 'success', title, text, timer: 2600, showConfirmButton: false })
  }

  function error(title: string, text?: string) {
    return Swal.fire({ ...baseConfig(), icon: 'error', title, text })
  }

  function info(title: string, html?: string) {
    return Swal.fire({ ...baseConfig(), icon: 'info', title, html })
  }

  function warning(title: string, text?: string) {
    return Swal.fire({ ...baseConfig(), icon: 'warning', title, text })
  }

  function confirm(title: string, text?: string, confirmText = 'Confirmar') {
    return Swal.fire({
      ...baseConfig(),
      icon: 'question',
      title,
      text,
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: 'Cancelar'
    }).then((r) => r.isConfirmed)
  }

  /** Exibe conteúdo HTML seguro (já sanitizado pelo chamador). */
  function help(title: string, html: string) {
    return Swal.fire({
      ...baseConfig(),
      title,
      html,
      confirmButtonText: 'Entendi',
      customClass: { htmlContainer: 'text-left' }
    })
  }

  return { success, error, info, warning, confirm, help }
}
