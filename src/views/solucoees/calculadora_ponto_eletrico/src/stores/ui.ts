import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * Store de UI: controla o overlay de loading global.
 * O tema (claro/escuro) é gerenciado por useTheme (VueUse).
 */
export const useUiStore = defineStore('ui', () => {
  const pendingCount = ref(0)
  const loadingMessage = ref<string | null>(null)

  const isLoading = computed(() => pendingCount.value > 0)

  const startLoading = (message?: string): void => {
    pendingCount.value += 1
    if (message) loadingMessage.value = message
  }

  const stopLoading = (): void => {
    pendingCount.value = Math.max(0, pendingCount.value - 1)
    if (pendingCount.value === 0) loadingMessage.value = null
  }

  return {
    pendingCount,
    loadingMessage,
    isLoading,
    startLoading,
    stopLoading,
  }
})
