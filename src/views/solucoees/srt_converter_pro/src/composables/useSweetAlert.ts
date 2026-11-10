import Swal from 'sweetalert2'

export interface AlertOptions {
  title: string
  text?: string
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question'
  confirmButtonText?: string
  cancelButtonText?: string
  showCancelButton?: boolean
}

export interface ConfirmOptions {
  title: string
  text?: string
  icon?: 'warning' | 'question' | 'info'
  confirmButtonText?: string
  cancelButtonText?: string
}

/**
 * Composable para usar SweetAlert2 com configurações predefinidas
 */
export function useSweetAlert() {
  const defaultConfig = {
    confirmButtonColor: '#7c3aed',
    cancelButtonColor: '#6b7280',
    backdrop: true,
    allowOutsideClick: true,
    allowEscapeKey: true,
    focusConfirm: true,
  }

  /**
   * Mostra um alerta de sucesso
   */
  const success = (title: string, text?: string) => {
    return Swal.fire({
      ...defaultConfig,
      icon: 'success',
      title,
      text,
      confirmButtonText: 'Ok',
      timer: 3000,
      timerProgressBar: true,
    })
  }

  /**
   * Mostra um alerta de erro
   */
  const error = (title: string, text?: string) => {
    return Swal.fire({
      ...defaultConfig,
      icon: 'error',
      title,
      text,
      confirmButtonText: 'Entendi',
    })
  }

  /**
   * Mostra um alerta de aviso
   */
  const warning = (title: string, text?: string) => {
    return Swal.fire({
      ...defaultConfig,
      icon: 'warning',
      title,
      text,
      confirmButtonText: 'Ok',
    })
  }

  /**
   * Mostra um alerta informativo
   */
  const info = (title: string, text?: string) => {
    return Swal.fire({
      ...defaultConfig,
      icon: 'info',
      title,
      text,
      confirmButtonText: 'Entendi',
    })
  }

  /**
   * Mostra um alerta de confirmação
   */
  const confirm = async (options: ConfirmOptions): Promise<boolean> => {
    const result = await Swal.fire({
      ...defaultConfig,
      icon: options.icon || 'question',
      title: options.title,
      text: options.text,
      showCancelButton: true,
      confirmButtonText: options.confirmButtonText || 'Confirmar',
      cancelButtonText: options.cancelButtonText || 'Cancelar',
    })

    return result.isConfirmed
  }

  /**
   * Mostra um alerta customizado
   */
  const custom = (options: AlertOptions) => {
    return Swal.fire({
      ...defaultConfig,
      ...options,
    })
  }

  /**
   * Mostra um toast (notificação pequena)
   */
  const toast = (title: string, icon: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
    })

    return Toast.fire({
      icon,
      title,
    })
  }

  /**
   * Mostra um loading
   */
  const loading = (title: string = 'Processando...', text?: string) => {
    Swal.fire({
      title,
      text,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      },
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
    custom,
    toast,
    loading,
    close,
  }
}
