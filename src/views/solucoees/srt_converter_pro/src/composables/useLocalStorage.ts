import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  const storedValue = ref<T>(defaultValue) as Ref<T>

  // Initialize from localStorage
  try {
    const item = window.localStorage.getItem(key)
    if (item) {
      storedValue.value = JSON.parse(item)
    }
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error)
    storedValue.value = defaultValue
  }

  // Watch for changes and update localStorage
  watch(
    storedValue,
    (newValue) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(newValue))
      } catch (error) {
        console.error(`Error writing localStorage key "${key}":`, error)
      }
    },
    { deep: true }
  )

  return storedValue
}

export function removeFromLocalStorage(key: string): void {
  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error)
  }
}

export function clearLocalStorage(): void {
  try {
    window.localStorage.clear()
  } catch (error) {
    console.error('Error clearing localStorage:', error)
  }
}
