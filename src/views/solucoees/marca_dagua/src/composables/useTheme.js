import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'

export function useTheme() {
  const theme = useStorage('theme', 'auto')
  const isDark = ref(false)

  const applyTheme = (value) => {
    const root = document.documentElement
    root.classList.remove('dark', 'light')
    
    if (value === 'dark') {
      root.classList.add('dark')
      isDark.value = true
    } else if (value === 'light') {
      root.classList.remove('dark')
      isDark.value = false
    } else {
      // auto mode
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        root.classList.add('dark')
        isDark.value = true
      } else {
        root.classList.remove('dark')
        isDark.value = false
      }
    }
  }

  const setTheme = (value) => {
    theme.value = value
    applyTheme(value)
  }

  const toggleTheme = () => {
    if (theme.value === 'light') {
      setTheme('dark')
    } else if (theme.value === 'dark') {
      setTheme('auto')
    } else {
      setTheme('light')
    }
  }

  // Initialize theme
  applyTheme(theme.value)

  // Listen for system theme changes in auto mode
  if (typeof window !== 'undefined') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (theme.value === 'auto') {
        applyTheme('auto')
      }
    })
  }

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
    applyTheme
  }
}
