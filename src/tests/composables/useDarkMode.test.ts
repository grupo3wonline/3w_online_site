import { describe, it, expect, beforeEach } from 'vitest'
import { useDarkMode } from '@/composables/useDarkMode'

describe('useDarkMode', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('toggleDark() adiciona a classe "dark" ao documentElement', () => {
    const { toggleDark } = useDarkMode()

    toggleDark()

    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('segunda chamada de toggleDark() remove a classe "dark"', () => {
    const { toggleDark } = useDarkMode()

    toggleDark()
    toggleDark()

    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('isDark.value reflete corretamente o estado atual', () => {
    const { isDark, toggleDark } = useDarkMode()

    expect(isDark.value).toBe(false)

    toggleDark()
    expect(isDark.value).toBe(true)

    toggleDark()
    expect(isDark.value).toBe(false)
  })

  it('localStorage persiste o tema como "dark" ou "light" conforme o estado', () => {
    const { toggleDark } = useDarkMode()

    toggleDark()
    expect(localStorage.getItem('theme')).toBe('dark')

    toggleDark()
    expect(localStorage.getItem('theme')).toBe('light')
  })
})
