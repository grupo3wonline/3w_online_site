import { defineStore } from 'pinia'
import { ref } from 'vue'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

function applyTheme(theme: Theme) {
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(true)

  function init() {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
    isDark.value = saved ? saved === 'dark' : true
    applyTheme(isDark.value ? 'dark' : 'light')
  }

  function toggle() {
    isDark.value = !isDark.value
    const theme: Theme = isDark.value ? 'dark' : 'light'
    localStorage.setItem(STORAGE_KEY, theme)
    applyTheme(theme)
  }

  return { isDark, init, toggle }
})
