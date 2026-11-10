import Swal, { type SweetAlertOptions } from 'sweetalert2'
import DOMPurify from 'dompurify'

const BRAND = '#7c3aed'

function isDark(): boolean {
  return document.documentElement.classList.contains('dark')
}

function baseOptions(): SweetAlertOptions {
  return {
    confirmButtonColor: BRAND,
    background: isDark() ? '#111827' : '#ffffff',
    color: isDark() ? '#f3f4f6' : '#111827',
  }
}

/** Sanitiza HTML antes de exibir para evitar XSS. */
function safeHtml(html: string): string {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: ['strong', 'br', 'span', 'b'] })
}

export const notify = {
  success(title: string, html?: string) {
    return Swal.fire({
      ...baseOptions(),
      icon: 'success',
      title,
      html: html ? safeHtml(html) : undefined,
    })
  },
  warning(title: string, text?: string) {
    return Swal.fire({ ...baseOptions(), icon: 'warning', title, text })
  },
  error(title: string, text?: string) {
    return Swal.fire({ ...baseOptions(), icon: 'error', title, text })
  },
  info(title: string, text?: string) {
    return Swal.fire({ ...baseOptions(), icon: 'info', title, text })
  },
}
