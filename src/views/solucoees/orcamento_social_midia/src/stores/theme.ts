import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { usePreferredDark, useStorage } from '@vueuse/core'
import { siteConfig } from '@/config/site'

export type ThemeMode = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'osm-theme'

/**
 * Store de tema: alterna entre claro/escuro/sistema.
 * Persiste a preferência e aplica a classe `dark` no <html>.
 */
export const useThemeStore = defineStore('theme', () => {
  const mode = useStorage<ThemeMode>(STORAGE_KEY, 'system')
  const prefersDark = usePreferredDark()
  const isDark = ref(false)

  function resolveIsDark(): boolean {
    if (mode.value === 'dark') return true
    if (mode.value === 'light') return false
    return prefersDark.value
  }

  function apply() {
    isDark.value = resolveIsDark()
    const root = document.documentElement
    root.classList.toggle('dark', isDark.value)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) {
      meta.setAttribute('content', isDark.value ? '#0f172a' : siteConfig.themeColor)
    }
  }

  function setMode(next: ThemeMode) {
    mode.value = next
    apply()
  }

  /** Alterna diretamente entre claro e escuro (botão do header). */
  function toggle() {
    setMode(isDark.value ? 'light' : 'dark')
  }

  watch([mode, prefersDark], apply, { immediate: false })

  return { mode, isDark, setMode, toggle, apply }
})
