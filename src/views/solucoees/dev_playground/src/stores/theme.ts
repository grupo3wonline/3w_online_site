import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { usePreferredDark, useStorage } from '@vueuse/core'

export type ThemeMode = 'light' | 'dark' | 'system'

/**
 * Store de tema. Suporta claro, escuro e "sistema".
 * Persiste a preferência do usuário e aplica a classe `dark` no <html>.
 */
export const useThemeStore = defineStore('theme', () => {
  const mode = useStorage<ThemeMode>('dp-theme', 'system')
  const prefersDark = usePreferredDark()
  const isDark = ref(false)

  function apply() {
    const dark = mode.value === 'dark' || (mode.value === 'system' && prefersDark.value)
    isDark.value = dark
    document.documentElement.classList.toggle('dark', dark)
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
  }

  function setMode(next: ThemeMode) {
    mode.value = next
    apply()
  }

  function toggle() {
    setMode(isDark.value ? 'light' : 'dark')
  }

  watch([mode, prefersDark], apply, { immediate: false })

  return { mode, isDark, apply, setMode, toggle }
})
