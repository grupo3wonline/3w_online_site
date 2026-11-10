import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue = null) {
  const data = ref(defaultValue)

  // Load from localStorage on init
  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem(key)
      if (stored !== null) {
        data.value = JSON.parse(stored)
      }
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error)
    }
  }

  // Save to localStorage
  const saveToStorage = () => {
    try {
      localStorage.setItem(key, JSON.stringify(data.value))
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
    }
  }

  // Remove from localStorage
  const removeFromStorage = () => {
    try {
      localStorage.removeItem(key)
      data.value = defaultValue
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error)
    }
  }

  // Watch for changes and auto-save
  watch(data, () => {
    saveToStorage()
  }, { deep: true })

  // Load on mount
  loadFromStorage()

  return {
    data,
    save: saveToStorage,
    remove: removeFromStorage
  }
}

// Specific composable for health calculations history
export function useHealthHistory() {
  const history = useLocalStorage('health-calculations-history', [])

  const addCalculation = (calculation) => {
    const entry = {
      ...calculation,
      id: Date.now(),
      date: new Date().toISOString()
    }
    
    history.data.value.unshift(entry)
    
    // Keep only last 10 calculations
    if (history.data.value.length > 10) {
      history.data.value = history.data.value.slice(0, 10)
    }
  }

  const clearHistory = () => {
    history.remove()
  }

  const getCalculation = (id) => {
    return history.data.value.find(calc => calc.id === id)
  }

  return {
    history: history.data,
    addCalculation,
    clearHistory,
    getCalculation
  }
}
