/**
 * Composable de LocalStorage
 * Gerenciamento seguro de dados no localStorage
 */

import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue = null) {
  // Estado reativo
  const data = ref(defaultValue)
  const error = ref(null)
  const loading = ref(false)

  /**
   * Carrega dados do localStorage
   */
  const load = () => {
    loading.value = true
    error.value = null
    
    try {
      const item = localStorage.getItem(key)
      
      if (item === null) {
        data.value = defaultValue
      } else {
        try {
          data.value = JSON.parse(item)
        } catch {
          // Se não for JSON, retorna como string
          data.value = item
        }
      }
    } catch (err) {
      error.value = err.message
      console.error(`Erro ao carregar do localStorage (${key}):`, err)
      data.value = defaultValue
    } finally {
      loading.value = false
    }
  }

  /**
   * Salva dados no localStorage
   */
  const save = (value) => {
    loading.value = true
    error.value = null
    
    try {
      const serialized = typeof value === 'string' 
        ? value 
        : JSON.stringify(value)
      
      localStorage.setItem(key, serialized)
      data.value = value
      return true
    } catch (err) {
      error.value = err.message
      console.error(`Erro ao salvar no localStorage (${key}):`, err)
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Remove dados do localStorage
   */
  const remove = () => {
    try {
      localStorage.removeItem(key)
      data.value = defaultValue
      return true
    } catch (err) {
      error.value = err.message
      console.error(`Erro ao remover do localStorage (${key}):`, err)
      return false
    }
  }

  /**
   * Limpa todos os dados do localStorage
   */
  const clear = () => {
    try {
      localStorage.clear()
      data.value = defaultValue
      return true
    } catch (err) {
      error.value = err.message
      console.error('Erro ao limpar localStorage:', err)
      return false
    }
  }

  /**
   * Verifica se uma chave existe
   */
  const exists = () => {
    try {
      return localStorage.getItem(key) !== null
    } catch {
      return false
    }
  }

  /**
   * Obtém o tamanho aproximado dos dados em bytes
   */
  const getSize = () => {
    try {
      const item = localStorage.getItem(key)
      return item ? new Blob([item]).size : 0
    } catch {
      return 0
    }
  }

  // Carrega dados inicialmente
  load()

  // Watch para auto-save quando data mudar
  watch(data, (newValue) => {
    if (newValue !== null && newValue !== undefined) {
      save(newValue)
    }
  }, { deep: true })

  return {
    data,
    error,
    loading,
    load,
    save,
    remove,
    clear,
    exists,
    getSize
  }
}

/**
 * Hook para gerenciar histórico no localStorage
 * @param {string} key - Chave do localStorage
 * @param {number} maxItems - Número máximo de itens
 */
export function useLocalStorageHistory(key, maxItems = 50) {
  const { data, save, clear } = useLocalStorage(key, [])

  /**
   * Adiciona item ao histórico
   */
  const add = (item) => {
    try {
      const history = Array.isArray(data.value) ? [...data.value] : []
      
      // Remove duplicatas
      const filtered = history.filter(h => 
        JSON.stringify(h) !== JSON.stringify(item)
      )
      
      // Adiciona no início
      filtered.unshift({
        ...item,
        timestamp: Date.now(),
        id: Date.now() + Math.random()
      })
      
      // Limita quantidade
      const limited = filtered.slice(0, maxItems)
      
      return save(limited)
    } catch (error) {
      console.error('Erro ao adicionar ao histórico:', error)
      return false
    }
  }

  /**
   * Remove item do histórico por ID
   */
  const removeItem = (id) => {
    try {
      const history = Array.isArray(data.value) ? [...data.value] : []
      const filtered = history.filter(item => item.id !== id)
      return save(filtered)
    } catch (error) {
      console.error('Erro ao remover do histórico:', error)
      return false
    }
  }

  /**
   * Limpa histórico
   */
  const clearHistory = () => {
    return save([])
  }

  /**
   * Obtém itens do histórico
   */
  const getItems = () => {
    return Array.isArray(data.value) ? data.value : []
  }

  /**
   * Obtém item por ID
   */
  const getItemById = (id) => {
    const items = getItems()
    return items.find(item => item.id === id) || null
  }

  /**
   * Verifica se histórico está vazio
   */
  const isEmpty = () => {
    return getItems().length === 0
  }

  /**
   * Obtém quantidade de itens
   */
  const count = () => {
    return getItems().length
  }

  return {
    items: data,
    add,
    removeItem,
    clearHistory,
    getItems,
    getItemById,
    isEmpty,
    count,
    clear
  }
}

/**
 * Hook para preferências do usuário
 */
export function useUserPreferences() {
  const { data, save } = useLocalStorage('user_preferences', {
    theme: 'light',
    language: 'pt-BR',
    notifications: true,
    autoDownload: false
  })

  const setPreference = (key, value) => {
    const prefs = { ...data.value }
    prefs[key] = value
    return save(prefs)
  }

  const getPreference = (key) => {
    return data.value[key]
  }

  const resetPreferences = () => {
    return save({
      theme: 'light',
      language: 'pt-BR',
      notifications: true,
      autoDownload: false
    })
  }

  return {
    preferences: data,
    setPreference,
    getPreference,
    resetPreferences
  }
}

export default useLocalStorage
