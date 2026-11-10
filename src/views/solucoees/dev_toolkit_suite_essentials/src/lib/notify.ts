import Swal, { type SweetAlertIcon } from 'sweetalert2'

function isDark() {
  return document.documentElement.classList.contains('dark')
}

const baseTheme = () => ({
  background: isDark() ? '#111827' : '#ffffff',
  color: isDark() ? '#e5e7eb' : '#1f2937',
  confirmButtonColor: '#4f46e5',
  cancelButtonColor: '#64748b',
})

/**
 * Toast rápido no canto superior direito.
 */
export function toast(title: string, icon: SweetAlertIcon = 'success') {
  return Swal.fire({
    toast: true,
    position: 'top-end',
    icon,
    title,
    showConfirmButton: false,
    timer: 2200,
    timerProgressBar: true,
    ...baseTheme(),
  })
}

/**
 * Alerta modal com título, mensagem e ícone.
 */
export function alertMessage(title: string, text: string, icon: SweetAlertIcon = 'info') {
  return Swal.fire({ title, text, icon, confirmButtonText: 'Entendi', ...baseTheme() })
}

/**
 * Confirmação com dois botões. Resolve para true quando confirmado.
 */
export async function confirmAction(
  title: string,
  text: string,
  confirmText = 'Confirmar'
): Promise<boolean> {
  const res = await Swal.fire({
    title,
    text,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: 'Cancelar',
    ...baseTheme(),
  })
  return res.isConfirmed
}
