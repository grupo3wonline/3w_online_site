import Swal from 'sweetalert2'

/**
 * Composable para alertas padronizados com SweetAlert2.
 * Centraliza configuração visual e facilita uso em toda a aplicação.
 * Suporta tema claro e escuro automaticamente.
 */

/** Detecta se o dark mode está ativo na página */
function isDarkMode(): boolean {
  return document.documentElement.classList.contains('dark')
}

/** Configuração base com suporte a dark mode */
function baseConfig() {
  const dark = isDarkMode()
  return {
    confirmButtonColor: '#2563eb',
    ...(dark && {
      background: '#1e293b',
      color: '#f1f5f9',
    }),
  }
}

export function useAlert() {
  const showSuccess = (title: string, text?: string) => {
    return Swal.fire({
      ...baseConfig(),
      icon: 'success',
      title,
      text,
      confirmButtonText: 'OK',
      timer: 3000,
      timerProgressBar: true,
    })
  }

  const showError = (title: string, text?: string) => {
    return Swal.fire({
      ...baseConfig(),
      icon: 'error',
      title,
      text,
      confirmButtonText: 'Fechar',
      confirmButtonColor: '#ef4444',
    })
  }

  const showWarning = (title: string, text?: string) => {
    return Swal.fire({
      ...baseConfig(),
      icon: 'warning',
      title,
      text,
      confirmButtonText: 'Entendi',
      confirmButtonColor: '#f59e0b',
    })
  }

  const showInfo = (title: string, text?: string) => {
    return Swal.fire({
      ...baseConfig(),
      icon: 'info',
      title,
      text,
      confirmButtonText: 'OK',
    })
  }

  const showConfirm = (title: string, text?: string) => {
    return Swal.fire({
      ...baseConfig(),
      icon: 'question',
      title,
      text,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      cancelButtonColor: '#6b7280',
    })
  }

  const showLoading = (title = 'Carregando...') => {
    return Swal.fire({
      ...baseConfig(),
      title,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })
  }

  const closeLoading = () => {
    Swal.close()
  }

  /**
   * Toast leve — aparece no canto sem bloquear a UI.
   * Ideal para feedback rápido de ações (cópia, download, etc.)
   */
  const showToast = (title: string, icon: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    return Swal.fire({
      ...baseConfig(),
      icon,
      title,
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
    })
  }

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm,
    showLoading,
    closeLoading,
    showToast,
  }
}
