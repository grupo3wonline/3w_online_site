import { defineStore } from 'pinia'
import { ref } from 'vue'

const STORAGE_KEY = 'eventcalc-theme'

/**
 * Store de tema (claro/escuro). Persiste a preferência no localStorage e
 * respeita a preferência do sistema quando não há escolha salva.
 */
export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  function apply(dark: boolean) {
    isDark.value = dark
    document.documentElement.classList.toggle('dark', dark)
  }

  function toggle() {
    apply(!isDark.value)
    localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
  }

  function init() {
    const saved = localStorage.getItem(STORAGE_KEY)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    apply(saved === 'dark' || (!saved && prefersDark))
  }

  return { isDark, toggle, init }
})
