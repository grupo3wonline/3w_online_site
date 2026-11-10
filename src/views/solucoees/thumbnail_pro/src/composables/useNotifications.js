import { ref, createApp } from 'vue'
import NotificationToast from '../components/NotificationToast.vue'

const notifications = ref([])

export function useNotifications() {
  const addNotification = (notification) => {
    const id = Date.now() + Math.random()
    const notificationWithId = { ...notification, id }
    
    // Criar elemento container
    const container = document.createElement('div')
    container.id = `notification-${id}`
    document.body.appendChild(container)
    
    // Criar instância Vue
    const app = createApp(NotificationToast, {
      ...notificationWithId,
      onClose: () => removeNotification(id)
    })
    
    app.mount(container)
    notifications.value.push({ id, app, container })
    
    return id
  }
  
  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      const notification = notifications.value[index]
      notification.app.unmount()
      document.body.removeChild(notification.container)
      notifications.value.splice(index, 1)
    }
  }
  
  const showSuccess = (message, title = 'Sucesso!', options = {}) => {
    return addNotification({
      type: 'success',
      title,
      message,
      ...options
    })
  }
  
  const showError = (message, title = 'Erro!', options = {}) => {
    return addNotification({
      type: 'error',
      title,
      message,
      ...options
    })
  }
  
  const showWarning = (message, title = 'Atenção!', options = {}) => {
    return addNotification({
      type: 'warning',
      title,
      message,
      ...options
    })
  }
  
  const showInfo = (message, title = 'Informação', options = {}) => {
    return addNotification({
      type: 'info',
      title,
      message,
      ...options
    })
  }
  
  const clearAll = () => {
    notifications.value.forEach(notification => {
      removeNotification(notification.id)
    })
  }
  
  return {
    notifications,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    clearAll
  }
}
