import Swal from 'sweetalert2'

/**
 * Composable para usar SweetAlert2 de forma consistente na aplicação
 */
export function useAlert() {
  // Configuração padrão para todos os alertas
  const defaultConfig = {
    confirmButtonColor: '#2563eb',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancelar',
    customClass: {
      popup: 'dark:bg-gray-800 dark:text-white',
      confirmButton: 'px-4 py-2 rounded-lg font-medium',
      cancelButton: 'px-4 py-2 rounded-lg font-medium',
    }
  }

  /**
   * Exibe um alerta de sucesso
   */
  const success = (title, text = '') => {
    return Swal.fire({
      ...defaultConfig,
      icon: 'success',
      title,
      text,
      timer: 3000,
      timerProgressBar: true,
    })
  }

  /**
   * Exibe um alerta de erro
   */
  const error = (title, text = '') => {
    return Swal.fire({
      ...defaultConfig,
      icon: 'error',
      title,
      text,
    })
  }

  /**
   * Exibe um alerta de aviso
   */
  const warning = (title, text = '') => {
    return Swal.fire({
      ...defaultConfig,
      icon: 'warning',
      title,
      text,
    })
  }

  /**
   * Exibe um alerta informativo
   */
  const info = (title, text = '') => {
    return Swal.fire({
      ...defaultConfig,
      icon: 'info',
      title,
      text,
    })
  }

  /**
   * Exibe uma confirmação
   */
  const confirm = (title, text = '', confirmText = 'Confirmar') => {
    return Swal.fire({
      ...defaultConfig,
      icon: 'question',
      title,
      text,
      showCancelButton: true,
      confirmButtonText: confirmText,
    })
  }

  /**
   * Exibe um toast (notificação pequena)
   */
  const toast = (title, icon = 'success', position = 'top-end') => {
    const Toast = Swal.mixin({
      toast: true,
      position,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    return Toast.fire({
      icon,
      title
    })
  }

  /**
   * Exibe um alerta de loading
   */
  const loading = (title = 'Processando...', text = '') => {
    return Swal.fire({
      ...defaultConfig,
      title,
      text,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })
  }

  /**
   * Fecha o alerta atual
   */
  const close = () => {
    Swal.close()
  }

  return {
    success,
    error,
    warning,
    info,
    confirm,
    toast,
    loading,
    close
  }
}
