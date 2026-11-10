import { ref, readonly } from 'vue'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

const toasts = ref<Toast[]>([])
let toastIdCounter = 0

export function useToast() {
  const add = (toast: Omit<Toast, 'id'>) => {
    const id = `toast-${++toastIdCounter}-${Date.now()}`
    const duration = toast.duration || 5000

    const newToast: Toast = {
      id,
      ...toast,
      duration,
    }

    toasts.value.push(newToast)

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        remove(id)
      }, duration)
    }

    return id
  }

  const remove = (id: string) => {
    const index = toasts.value.findIndex((t) => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const clear = () => {
    toasts.value = []
  }

  const success = (title: string, message?: string, duration?: number) => {
    return add({ type: 'success', title, message, duration })
  }

  const error = (title: string, message?: string, duration?: number) => {
    return add({ type: 'error', title, message, duration })
  }

  const warning = (title: string, message?: string, duration?: number) => {
    return add({ type: 'warning', title, message, duration })
  }

  const info = (title: string, message?: string, duration?: number) => {
    return add({ type: 'info', title, message, duration })
  }

  return {
    toasts: readonly(toasts),
    add,
    remove,
    clear,
    success,
    error,
    warning,
    info,
  }
}
