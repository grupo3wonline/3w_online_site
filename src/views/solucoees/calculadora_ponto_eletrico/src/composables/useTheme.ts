import { watch, onMounted } from 'vue'
import { useStorage } from '@vueuse/core'
import { APP_CONFIG } from '@/utils/constants'

/**
 * Gerencia o tema claro/escuro: detecta preferência do sistema,
 * persiste a escolha e aplica a classe `dark` no root.
 */
export function useTheme() {
  const getSystemPreference = (): boolean => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  const isDark = useStorage<boolean>(APP_CONFIG.THEME_STORAGE_KEY, getSystemPreference())

  const toggleDarkMode = (): void => {
    isDark.value = !isDark.value
  }

  const setDark = (): void => {
    isDark.value = true
  }

  const setLight = (): void => {
    isDark.value = false
  }

  const updateThemeColor = (dark: boolean): void => {
    if (typeof document === 'undefined') return
    let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'theme-color'
      document.head.appendChild(meta)
    }
    meta.content = dark ? '#0f172a' : '#2563eb'
  }

  const applyTheme = (dark: boolean): void => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    root.classList.add('theme-transition')
    root.classList.toggle('dark', dark)
    root.style.colorScheme = dark ? 'dark' : 'light'
    window.setTimeout(() => root.classList.remove('theme-transition'), 300)
    updateThemeColor(dark)
  }

  watch(isDark, (value) => applyTheme(value), { immediate: true })

  onMounted(() => {
    applyTheme(isDark.value)
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', (e) => {
        const hasUserPreference = localStorage.getItem(APP_CONFIG.THEME_STORAGE_KEY)
        if (!hasUserPreference) isDark.value = e.matches
      })
    }
  })

  return { isDark, toggle: toggleDarkMode, toggleDarkMode, setDark, setLight }
}

/** Alias de compatibilidade durante a migração. */
export const useDarkMode = useTheme
