import { useColorMode, useCycleList } from '@vueuse/core'
import { computed } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'auto'

/**
 * Gerencia o tema (claro/escuro/automático) com persistência em localStorage
 * e sincronização com a classe `.dark` no elemento <html>.
 */
export function useTheme() {
  const mode = useColorMode({
    selector: 'html',
    attribute: 'class',
    modes: { light: '', dark: 'dark' },
    storageKey: 'dtse-theme',
    emitAuto: true,
  })

  const { next } = useCycleList<ThemeMode>(['light', 'dark', 'auto'], {
    initialValue: mode as unknown as ThemeMode,
  })

  const isDark = computed(() => mode.value === 'dark')

  function toggle() {
    mode.value = isDark.value ? 'light' : 'dark'
  }

  function cycle() {
    mode.value = next() as ThemeMode
  }

  return { mode, isDark, toggle, cycle }
}
