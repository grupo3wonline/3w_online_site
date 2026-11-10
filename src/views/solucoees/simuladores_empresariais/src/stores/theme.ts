import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

type Tema = 'light' | 'dark'

/** Store de tema com persistência em localStorage e respeito à preferência do sistema. */
export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  function aplicar(tema: Tema) {
    isDark.value = tema === 'dark'
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  function inicializar() {
    const salvo = localStorage.getItem('theme') as Tema | null
    const prefereDark =
      typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
    aplicar(salvo ?? (prefereDark ? 'dark' : 'light'))
  }

  function alternar() {
    aplicar(isDark.value ? 'light' : 'dark')
  }

  watch(isDark, (v) => {
    localStorage.setItem('theme', v ? 'dark' : 'light')
  })

  return { isDark, inicializar, alternar }
})
