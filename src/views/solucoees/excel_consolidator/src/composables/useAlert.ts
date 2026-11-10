import Swal from 'sweetalert2'

const defaultOptions = {
  background: 'hsl(222.2 84% 4.9%)',
  color: 'hsl(210 40% 98%)',
  confirmButtonColor: 'hsl(160 84% 39%)',
  cancelButtonColor: 'hsl(217.2 32.6% 17.5%)',
  customClass: {
    popup: 'swal-popup-custom',
    confirmButton: 'swal-btn-custom',
    cancelButton: 'swal-btn-custom',
  },
}

export function useAlert() {
  function success(title: string, text?: string) {
    return Swal.fire({
      ...defaultOptions,
      icon: 'success',
      title,
      text,
      timer: 2500,
      showConfirmButton: false,
    })
  }

  function error(title: string, html?: string) {
    return Swal.fire({
      ...defaultOptions,
      icon: 'error',
      title,
      html,
    })
  }

  function warning(title: string, text?: string) {
    return Swal.fire({
      ...defaultOptions,
      icon: 'warning',
      title,
      text,
    })
  }

  function info(title: string, html?: string) {
    return Swal.fire({
      ...defaultOptions,
      icon: 'info',
      title,
      html,
    })
  }

  function confirm(title: string, text?: string) {
    return Swal.fire({
      ...defaultOptions,
      icon: 'warning',
      title,
      text,
      showCancelButton: true,
      confirmButtonText: 'Sim, confirmar',
      cancelButtonText: 'Cancelar',
    })
  }

  return { success, error, warning, info, confirm }
}
