/**
 * Store de tema (claro/escuro) com persistência em localStorage e respeito à
 * preferência do sistema quando não há escolha salva.
 */
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { usePreferredDark, useStorage } from '@vueuse/core'

export type ThemeMode = 'dark' | 'light'

const STORAGE_KEY = 'analisador-theme'

export const useThemeStore = defineStore('theme', () => {
  const prefersDark = usePreferredDark()
  // Guarda a escolha explícita do usuário; null = seguir o sistema.
  const saved = useStorage<ThemeMode | null>(STORAGE_KEY, null)
  const isDark = ref(saved.value ? saved.value === 'dark' : prefersDark.value)

  function applyToDocument() {
    document.documentElement.classList.toggle('dark', isDark.value)
    document.documentElement.style.colorScheme = isDark.value ? 'dark' : 'light'
  }

  function toggle() {
    isDark.value = !isDark.value
    saved.value = isDark.value ? 'dark' : 'light'
  }

  function setTheme(mode: ThemeMode) {
    isDark.value = mode === 'dark'
    saved.value = mode
  }

  // Se o usuário nunca escolheu, acompanha o sistema em tempo real.
  watch(prefersDark, (value) => {
    if (saved.value === null) {
      isDark.value = value
    }
  })

  watch(isDark, applyToDocument, { immediate: true })

  return { isDark, toggle, setTheme }
})
