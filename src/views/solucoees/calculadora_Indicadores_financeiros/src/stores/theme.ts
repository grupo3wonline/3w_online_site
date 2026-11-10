import { defineStore } from 'pinia'
import { ref } from 'vue'

const STORAGE_KEY = 'theme'
type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    /* ignore */
  }
  const prefersDark =
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>(getInitialTheme())

  function apply() {
    document.documentElement.classList.toggle('dark', theme.value === 'dark')
    try {
      localStorage.setItem(STORAGE_KEY, theme.value)
    } catch {
      /* ignore */
    }
  }

  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    apply()
  }

  function init() {
    apply()
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      let saved: string | null = null
      try {
        saved = localStorage.getItem(STORAGE_KEY)
      } catch {
        /* ignore */
      }
      if (!saved) {
        theme.value = e.matches ? 'dark' : 'light'
        apply()
      }
    })
  }

  return { theme, toggle, init }
})
