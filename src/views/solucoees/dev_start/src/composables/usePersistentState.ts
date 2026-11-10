import { watch, type Ref } from 'vue'

/**
 * Salva automaticamente o valor de um ref no localStorage e o restaura na inicialização.
 * Retorna true se havia estado salvo (útil para não sobrescrever conteúdo padrão).
 */
export function usePersistentState<T>(key: string, state: Ref<T>): { restored: boolean } {
  let restored = false
  try {
    const raw = localStorage.getItem(key)
    if (raw !== null) {
      state.value = JSON.parse(raw) as T
      restored = true
    }
  } catch {
    restored = false
  }

  watch(
    state,
    (value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch {
        /* cota de armazenamento excedida — ignora silenciosamente */
      }
    },
    { deep: true },
  )

  return { restored }
}

/** Remove o estado persistido de uma chave. */
export function clearPersistentState(key: string): void {
  localStorage.removeItem(key)
}
