import Swal, { type SweetAlertIcon } from 'sweetalert2'

/**
 * Notificações toast baseadas em SweetAlert2 (canto superior direito).
 */
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3500,
  timerProgressBar: true,
  didOpen: (el) => {
    el.addEventListener('mouseenter', Swal.stopTimer)
    el.addEventListener('mouseleave', Swal.resumeTimer)
  },
})

function fire(icon: SweetAlertIcon, title: string, timer: number): void {
  void Toast.fire({ icon, title, timer })
}

export function useToast() {
  const success = (message: string): void => fire('success', message, 3000)
  const error = (message: string): void => fire('error', message, 5000)
  const warning = (message: string): void => fire('warning', message, 4000)
  const info = (message: string): void => fire('info', message, 3000)

  return { success, error, warning, info }
}
