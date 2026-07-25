import Swal from 'sweetalert2'

/**
 * Composable para alertas padronizados com SweetAlert2.
 * Centraliza configuração visual e facilita uso em toda a aplicação.
 */
export function useAlert() {
  const showSuccess = (title: string, text?: string) => {
    return Swal.fire({
      icon: 'success',
      title,
      text,
      confirmButtonText: 'OK',
      confirmButtonColor: '#2563eb',
      timer: 3000,
      timerProgressBar: true,
    })
  }

  const showError = (title: string, text?: string) => {
    return Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonText: 'Fechar',
      confirmButtonColor: '#ef4444',
    })
  }

  const showWarning = (title: string, text?: string) => {
    return Swal.fire({
      icon: 'warning',
      title,
      text,
      confirmButtonText: 'Entendi',
      confirmButtonColor: '#f59e0b',
    })
  }

  const showInfo = (title: string, text?: string) => {
    return Swal.fire({
      icon: 'info',
      title,
      text,
      confirmButtonText: 'OK',
      confirmButtonColor: '#2563eb',
    })
  }

  const showConfirm = (title: string, text?: string) => {
    return Swal.fire({
      icon: 'question',
      title,
      text,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#6b7280',
    })
  }

  const showLoading = (title = 'Carregando...') => {
    return Swal.fire({
      title,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading()
      },
    })
  }

  const closeLoading = () => {
    Swal.close()
  }

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm,
    showLoading,
    closeLoading,
  }
}
