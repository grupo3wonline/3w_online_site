import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useLocalStorage } from './useLocalStorage'

export type Theme = 'light' | 'dark' | 'auto'

export function useTheme() {
  const theme = useLocalStorage<Theme>('theme', 'light')
  const isDark = ref(false)

  const updateTheme = () => {
    if (theme.value === 'auto') {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    } else {
      isDark.value = theme.value === 'dark'
    }

    // Update document class
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    updateTheme()
  }

  const toggleTheme = () => {
    if (theme.value === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  const cycleTheme = () => {
    if (theme.value === 'light') setTheme('dark')
    else if (theme.value === 'dark') setTheme('auto')
    else setTheme('light')
  }

  // Watch for system theme changes and cleanup
  let mediaQuery: MediaQueryList | null = null
  onMounted(() => {
    updateTheme()

    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    if (mediaQuery && typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateTheme)
    }

    watch(theme, updateTheme, { immediate: true })
  })

  onUnmounted(() => {
    if (mediaQuery && typeof mediaQuery.removeEventListener === 'function') {
      mediaQuery.removeEventListener('change', updateTheme)
    }
  })

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
    cycleTheme,
  }
}
