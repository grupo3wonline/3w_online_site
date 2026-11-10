import Swal, { type SweetAlertIcon, type SweetAlertResult } from 'sweetalert2'

/** Helper do SweetAlert2 com suporte a tema claro/escuro. */

function isDark(): boolean {
  return document.documentElement.classList.contains('dark')
}

function themedColors() {
  const dark = isDark()
  return {
    background: dark ? '#1f2937' : '#ffffff',
    color: dark ? '#f9fafb' : '#111827',
    confirmButtonColor: '#16a34a',
    cancelButtonColor: '#dc2626',
  }
}

export const Toast = Swal.mixin({
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

export function showSuccess(message: string, title = 'Sucesso!') {
  return Swal.fire({ icon: 'success', title, text: message, ...themedColors(), confirmButtonText: 'OK' })
}

export function showError(message: string, title = 'Erro!') {
  return Swal.fire({ icon: 'error', title, text: message, ...themedColors(), confirmButtonText: 'OK' })
}

export function showInfo(title: string, message: string) {
  return Swal.fire({
    icon: 'info',
    title,
    html: `<p style="text-align:left;line-height:1.6">${message}</p>`,
    ...themedColors(),
    confirmButtonText: 'Entendido',
    width: '520px',
  })
}

export async function showConfirm(message: string, title = 'Confirmar?'): Promise<boolean> {
  const result: SweetAlertResult = await Swal.fire({
    icon: 'question',
    title,
    text: message,
    ...themedColors(),
    showCancelButton: true,
    confirmButtonText: 'Sim',
    cancelButtonText: 'Não',
  })
  return result.isConfirmed
}

export function showToast(message: string, icon: SweetAlertIcon = 'success') {
  const c = themedColors()
  return Toast.fire({ icon, title: message, background: c.background, color: c.color })
}

export default { Toast, showSuccess, showError, showInfo, showConfirm, showToast }
