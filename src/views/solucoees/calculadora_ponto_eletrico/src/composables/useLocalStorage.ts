import { ref, watch, type Ref } from 'vue'

/**
 * localStorage reativo e tipado.
 */
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const readValue = (): T => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : defaultValue
    } catch (err) {
      console.warn(`Erro ao ler localStorage "${key}":`, err)
      return defaultValue
    }
  }

  const storedValue = ref(readValue()) as Ref<T>

  watch(
    storedValue,
    (newValue) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(newValue))
      } catch (err) {
        console.warn(`Erro ao gravar localStorage "${key}":`, err)
      }
    },
    { deep: true },
  )

  const remove = (): void => {
    try {
      window.localStorage.removeItem(key)
      storedValue.value = defaultValue
    } catch (err) {
      console.warn(`Erro ao remover localStorage "${key}":`, err)
    }
  }

  return { value: storedValue, remove }
}
