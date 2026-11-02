/**
 * useDarkMode — alterna entre tema claro e escuro via classe 'dark' no <html>.
 * Persiste a preferência do usuário no localStorage.
 */
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'

const STORAGE_KEY = 'theme'

export function useDarkMode(): {
  isDark: Ref<boolean>
  toggleDark: () => void
} {
  const isDark: Ref<boolean> = ref(false)

  function applyTheme(dark: boolean): void {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    isDark.value = dark
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
  }

  function toggleDark(): void {
    applyTheme(!isDark.value)
  }

  onMounted(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    const prefersDark =
      stored === 'dark' ||
      (stored === null && window.matchMedia('(prefers-color-scheme: dark)').matches)
    applyTheme(prefersDark)
  })

  return { isDark, toggleDark }
}
