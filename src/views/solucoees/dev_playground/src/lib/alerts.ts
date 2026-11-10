import Swal, { type SweetAlertOptions } from 'sweetalert2'

/**
 * Wrapper do SweetAlert2 com o branding da aplicação.
 * Usado para alertas, confirmações e feedbacks ao usuário.
 */
const brandColor = '#7c3aed'

function base(): SweetAlertOptions {
  const dark = document.documentElement.classList.contains('dark')
  return {
    confirmButtonColor: brandColor,
    cancelButtonColor: '#64748b',
    background: dark ? '#161a24' : '#ffffff',
    color: dark ? '#e5e7eb' : '#1e293b',
    buttonsStyling: true,
  }
}

export const alerts = {
  success(title: string, text?: string) {
    return Swal.fire({ ...base(), icon: 'success', title, text, timer: 2200, showConfirmButton: false })
  },
  error(title: string, text?: string) {
    return Swal.fire({ ...base(), icon: 'error', title, text })
  },
  info(title: string, html?: string) {
    return Swal.fire({ ...base(), icon: 'info', title, html })
  },
  help(title: string, html: string) {
    return Swal.fire({ ...base(), icon: 'question', title, html, confirmButtonText: 'Entendi' })
  },
  confirm(title: string, text?: string) {
    return Swal.fire({
      ...base(),
      icon: 'warning',
      title,
      text,
      showCancelButton: true,
      confirmButtonText: 'Sim, confirmar',
      cancelButtonText: 'Cancelar',
    })
  },
  toast(title: string, icon: 'success' | 'error' | 'info' = 'success') {
    return Swal.fire({
      ...base(),
      toast: true,
      position: 'top-end',
      icon,
      title,
      showConfirmButton: false,
      timer: 2600,
      timerProgressBar: true,
    })
  },
}
