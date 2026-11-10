import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useDark, useToggle } from '@vueuse/core'

/**
 * Store de tema claro/escuro.
 * Persiste a preferência no localStorage e respeita a preferência do sistema.
 */
export const useThemeStore = defineStore('theme', () => {
  const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: '',
    storageKey: 'freelance-calc-theme',
  })

  const toggle = useToggle(isDark)
  const current = computed(() => (isDark.value ? 'dark' : 'light'))

  return { isDark, current, toggle }
})
