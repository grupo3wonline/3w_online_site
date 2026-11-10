import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useThemeStore } from '@/stores/theme'
import { useUiStore } from '@/stores/ui'

describe('themeStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    document.documentElement.className = ''
    localStorage.clear()
  })

  it('alterna entre claro e escuro', () => {
    const theme = useThemeStore()
    theme.setMode('light')
    expect(theme.isDark).toBe(false)
    theme.toggle()
    expect(theme.isDark).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('aplica a classe dark no html quando escuro', () => {
    const theme = useThemeStore()
    theme.setMode('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})

describe('uiStore', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('controla o estado de loading com contador', () => {
    const ui = useUiStore()
    expect(ui.isLoading).toBe(false)
    ui.startLoading('teste')
    expect(ui.isLoading).toBe(true)
    expect(ui.message).toBe('teste')
    ui.startLoading()
    ui.stopLoading()
    expect(ui.isLoading).toBe(true) // ainda há 1 pendente
    ui.stopLoading()
    expect(ui.isLoading).toBe(false)
  })

  it('withLoading executa e finaliza o loading', async () => {
    const ui = useUiStore()
    const result = await ui.withLoading(async () => 42)
    expect(result).toBe(42)
    expect(ui.isLoading).toBe(false)
  })
})
