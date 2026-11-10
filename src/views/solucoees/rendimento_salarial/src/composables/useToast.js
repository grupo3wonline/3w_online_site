import { ref } from 'vue';

/**
 * Composable para gerenciamento de notificações toast
 * @returns {Object} Estado e funções para toasts
 */
export function useToast() {
  const toasts = ref([]);
  let idCounter = 0;

  /**
   * Adiciona um novo toast
   */
  const addToast = (message, type = 'info', duration = 3000) => {
    const id = ++idCounter;
    const toast = {
      id,
      message,
      type, // 'success', 'error', 'warning', 'info'
      duration,
      visible: true
    };

    toasts.value.push(toast);

    // Remove automaticamente após a duração
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  };

  /**
   * Remove um toast específico
   */
  const removeToast = (id) => {
    const index = toasts.value.findIndex(t => t.id === id);
    if (index > -1) {
      toasts.value[index].visible = false;
      // Remove do array após animação
      setTimeout(() => {
        toasts.value = toasts.value.filter(t => t.id !== id);
      }, 300);
    }
  };

  /**
   * Limpa todos os toasts
   */
  const clearToasts = () => {
    toasts.value.forEach(toast => {
      toast.visible = false;
    });
    setTimeout(() => {
      toasts.value = [];
    }, 300);
  };

  /**
   * Atalhos para tipos específicos
   */
  const success = (message, duration) => addToast(message, 'success', duration);
  const error = (message, duration) => addToast(message, 'error', duration);
  const warning = (message, duration) => addToast(message, 'warning', duration);
  const info = (message, duration) => addToast(message, 'info', duration);

  return {
    toasts,
    addToast,
    removeToast,
    clearToasts,
    success,
    error,
    warning,
    info
  };
}

// Instância global singleton (opcional)
let globalToast = null;

export function useGlobalToast() {
  if (!globalToast) {
    globalToast = useToast();
  }
  return globalToast;
}
