import { ref, watch, onMounted } from 'vue'

/**
 * Composable para gerenciar Dark Mode
 * Persiste preferência no localStorage e aplica ao documento
 */
export function useDarkMode() {
  const isDark = ref(false)
  const isLoading = ref(true)

  /**
   * Inicializa o dark mode baseado em:
   * 1. localStorage (preferência salva)
   * 2. Preferência do sistema (prefers-color-scheme)
   * 3. Padrão: light mode
   */
  const initDarkMode = () => {
    try {
      const savedTheme = localStorage.getItem('entity-converter-theme')
      
      if (savedTheme) {
        // Usar preferência salva
        isDark.value = savedTheme === 'dark'
      } else {
        // Detectar preferência do sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        isDark.value = prefersDark
      }
      
      // Aplicar tema ao documento
      applyTheme(isDark.value)
    } catch (error) {
      console.warn('Erro ao inicializar dark mode:', error)
      isDark.value = false
      applyTheme(false)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Aplica o tema ao documento HTML
   */
  const applyTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }

  /**
   * Alterna entre dark e light mode
   */
  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    
    // Enviar evento para Google Analytics
    if (window.gtag) {
      window.gtag('event', 'dark_mode_toggle', {
        event_category: 'engagement',
        event_label: isDark.value ? 'dark' : 'light',
        value: isDark.value ? 1 : 0
      })
    }

    // Enviar evento para GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'theme_change',
        theme: isDark.value ? 'dark' : 'light'
      })
    }
  }

  /**
   * Define o modo escuro (true) ou claro (false)
   */
  const setDarkMode = (dark) => {
    isDark.value = dark
  }

  // Watch para salvar preferência e aplicar tema
  watch(isDark, (newValue) => {
    try {
      localStorage.setItem('entity-converter-theme', newValue ? 'dark' : 'light')
      applyTheme(newValue)
    } catch (error) {
      console.warn('Erro ao salvar preferência de tema:', error)
    }
  })

  // Monitorar mudanças na preferência do sistema
  onMounted(() => {
    initDarkMode()
    
    // Listener para mudanças no sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      // Só atualizar se não houver preferência salva
      const savedTheme = localStorage.getItem('entity-converter-theme')
      if (!savedTheme) {
        isDark.value = e.matches
      }
    }
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    } else {
      // Legacy browsers
      mediaQuery.addListener(handleChange)
    }
    
    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange)
      } else {
        mediaQuery.removeListener(handleChange)
      }
    }
  })

  return {
    isDark,
    isLoading,
    toggleDarkMode,
    setDarkMode
  }
}
