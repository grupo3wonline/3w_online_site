import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ThemeMode } from '@/types'

const STORAGE_KEY = 'calculadora-cabos-dark-mode'

/** Store de tema (claro/escuro) com persistência e sincronização com o sistema. */
export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)
  let initialized = false

  function apply(): void {
    const root = document.documentElement
    root.classList.toggle('dark', isDark.value)
    localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
  }

  function init(): void {
    if (initialized) return
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null
    if (saved) {
      isDark.value = saved === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    apply()
    initialized = true

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        isDark.value = e.matches
        apply()
      }
    })
  }

  function toggle(): void {
    isDark.value = !isDark.value
    apply()
  }

  function set(value: boolean): void {
    isDark.value = value
    apply()
  }

  return { isDark, init, toggle, set }
})
