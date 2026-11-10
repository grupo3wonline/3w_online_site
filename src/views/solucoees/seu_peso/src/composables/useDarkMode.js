import { ref, watch, onMounted } from 'vue'
import { useLocalStorage } from './useLocalStorage'

export function useDarkMode() {
  const isDark = ref(false)
  const { data: preference } = useLocalStorage('dark-mode-preference', 'auto')

  const applyTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    isDark.value = dark
  }

  const updateTheme = () => {
    if (preference.value === 'dark') {
      applyTheme(true)
    } else if (preference.value === 'light') {
      applyTheme(false)
    } else {
      // Auto mode - use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      applyTheme(prefersDark)
    }
  }

  const toggleDarkMode = () => {
    // Alternar entre light e dark apenas
    if (isDark.value) {
      preference.value = 'light'
      applyTheme(false)
    } else {
      preference.value = 'dark'
      applyTheme(true)
    }
  }

  const setMode = (mode) => {
    preference.value = mode // 'light', 'dark', or 'auto'
    updateTheme()
  }

  // Watch for system preference changes
  onMounted(() => {
    updateTheme()

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', () => {
      if (preference.value === 'auto') {
        updateTheme()
      }
    })
  })

  // Watch preference changes
  watch(preference, () => {
    updateTheme()
  })

  return {
    isDark,
    preference,
    toggleDarkMode,
    setMode
  }
}
