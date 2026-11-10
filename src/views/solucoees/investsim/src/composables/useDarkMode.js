/**
 * Composable para gerenciamento de modo escuro
 * @module useDarkMode
 */

import { ref, watch, onMounted } from 'vue'

export function useDarkMode() {
  const isDark = ref(false)
  const STORAGE_KEY = 'investsim-dark-mode'

  /**
   * Inicializa o modo escuro baseado na preferência salva ou do sistema
   */
  const initialize = () => {
    // Verifica se há preferência salva
    const saved = localStorage.getItem(STORAGE_KEY)
    
    if (saved !== null) {
      isDark.value = saved === 'true'
    } else {
      // Usa preferência do sistema
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    
    applyTheme()
  }

  /**
   * Aplica o tema atual ao documento
   */
  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  /**
   * Alterna entre modo claro e escuro
   */
  const toggle = () => {
    isDark.value = !isDark.value
  }

  /**
   * Define o modo escuro
   * @param {boolean} value - Se deve ativar o modo escuro
   */
  const setDark = (value) => {
    isDark.value = value
  }

  // Salva preferência no localStorage quando muda
  watch(isDark, (newValue) => {
    localStorage.setItem(STORAGE_KEY, newValue.toString())
    applyTheme()
  })

  // Observa mudanças na preferência do sistema
  onMounted(() => {
    initialize()
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      // Só atualiza se não houver preferência salva
      if (localStorage.getItem(STORAGE_KEY) === null) {
        isDark.value = e.matches
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  })

  return {
    isDark,
    toggle,
    setDark
  }
}
