import Swal, { type SweetAlertIcon } from 'sweetalert2'

/** Detecta tema atual para estilizar os alertas. */
function isDark(): boolean {
  return document.documentElement.classList.contains('dark')
}

function themeColors() {
  return isDark()
    ? { background: '#141418', color: '#f5f5f7' }
    : { background: '#ffffff', color: '#1a1a24' }
}

/** Toast rápido no canto superior direito. */
export function toast(title: string, icon: SweetAlertIcon = 'success') {
  return Swal.fire({
    title,
    icon,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1800,
    timerProgressBar: true,
    ...themeColors(),
  })
}

/** Modal de confirmação (sim/não). */
export function confirmAction(title: string, text = '') {
  return Swal.fire({
    title,
    text,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#7c3aed',
    ...themeColors(),
  })
}

/** Alerta de sucesso/erro/info modal. */
export function alertMessage(title: string, text = '', icon: SweetAlertIcon = 'info') {
  return Swal.fire({ title, text, icon, confirmButtonColor: '#7c3aed', ...themeColors() })
}
