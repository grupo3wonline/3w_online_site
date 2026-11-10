import { ref, watch, onMounted } from 'vue'

export function useDarkMode() {
  const isDark = ref(false)

  // Inicializar tema baseado no localStorage ou preferência do sistema
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      // Detectar preferência do sistema
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    
    applyTheme()
  }

  // Aplicar tema ao documento
  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }

  // Toggle entre dark e light mode
  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    applyTheme()
    
    // Tracking para Analytics
    if (window.gtag) {
      window.gtag('event', 'theme_change', {
        theme: isDark.value ? 'dark' : 'light'
      })
    }
  }

  // Watch para mudanças reativas
  watch(isDark, () => {
    applyTheme()
  })

  // Inicializar quando montado
  onMounted(() => {
    initTheme()
  })

  return {
    isDark,
    toggleDarkMode,
    initTheme
  }
}
