import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type ThemeMode = 'dark' | 'light'

/**
 * Store de tema (claro/escuro). Persistido em localStorage.
 * O tema padrão é escuro (dark), coerente com o design system.
 */
export const useThemeStore = defineStore('theme', () => {
  const mode = ref<ThemeMode>('dark')

  function apply(next: ThemeMode) {
    const root = document.documentElement
    if (next === 'light') {
      root.classList.add('light')
    } else {
      root.classList.remove('light')
    }
    root.style.colorScheme = next
  }

  function init() {
    const saved = localStorage.getItem('theme') as ThemeMode | null
    mode.value = saved === 'light' ? 'light' : 'dark'
    apply(mode.value)
  }

  function toggle() {
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
  }

  function set(next: ThemeMode) {
    mode.value = next
  }

  watch(mode, (next) => {
    apply(next)
    localStorage.setItem('theme', next)
  })

  return { mode, init, toggle, set }
})
