import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { usePreferredDark, useStorage } from '@vueuse/core'

export const useThemeStore = defineStore('theme', () => {
  const preferredDark = usePreferredDark()
  const stored = useStorage<'light' | 'dark' | null>('theme', null)

  // Se não houver preferência salva, respeita o sistema.
  const isDark = ref(stored.value ? stored.value === 'dark' : preferredDark.value)

  function apply() {
    const root = document.documentElement
    root.classList.toggle('dark', isDark.value)
    root.style.colorScheme = isDark.value ? 'dark' : 'light'
  }

  function toggle() {
    isDark.value = !isDark.value
  }

  function setDark(value: boolean) {
    isDark.value = value
  }

  watch(
    isDark,
    (value) => {
      stored.value = value ? 'dark' : 'light'
      apply()
    },
    { immediate: true },
  )

  return { isDark, toggle, setDark, apply }
})
