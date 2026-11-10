import { defineStore } from 'pinia'
import { ref } from 'vue'
import { safeStorage } from '@/utils/security'

type ThemeMode = 'light' | 'dark'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  function applyTheme(mode: ThemeMode) {
    isDark.value = mode === 'dark'
    document.documentElement.classList.toggle('dark', isDark.value)
    document.documentElement.setAttribute('data-theme', mode)
  }

  function initTheme() {
    const saved = safeStorage.get<ThemeMode | null>('theme', null)
    if (saved === 'dark' || saved === 'light') {
      applyTheme(saved)
      return
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    applyTheme(prefersDark ? 'dark' : 'light')
  }

  function toggleTheme() {
    const next: ThemeMode = isDark.value ? 'light' : 'dark'
    applyTheme(next)
    safeStorage.set('theme', next)
  }

  return { isDark, initTheme, toggleTheme }
})
