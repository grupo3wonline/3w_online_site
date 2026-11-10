import { describe, it, expect, beforeEach, vi } from 'vitest'
import { nextTick } from 'vue'
import { setActivePinia, createPinia } from 'pinia'
import { useLoadingStore } from './loading'
import { useThemeStore } from './theme'
import { useConsentStore } from './consent'

beforeEach(() => {
  setActivePinia(createPinia())
  localStorage.clear()
  // gtag stub para consent
  window.gtag = vi.fn()
})

describe('loading store', () => {
  it('controla o overlay por contador', () => {
    const s = useLoadingStore()
    expect(s.isLoading).toBe(false)
    s.start()
    s.start()
    expect(s.isLoading).toBe(true)
    s.stop()
    expect(s.isLoading).toBe(true)
    s.stop()
    expect(s.isLoading).toBe(false)
  })

  it('wrap resolve o valor e finaliza o loading', async () => {
    const s = useLoadingStore()
    const r = await s.wrap(Promise.resolve(42))
    expect(r).toBe(42)
    expect(s.isLoading).toBe(false)
  })
})

describe('theme store', () => {
  it('alterna entre dark e light e persiste', async () => {
    const s = useThemeStore()
    s.init()
    expect(s.mode).toBe('dark')
    s.toggle()
    expect(s.mode).toBe('light')
    await nextTick() // aguarda o watcher persistir e aplicar a classe
    expect(localStorage.getItem('theme')).toBe('light')
    expect(document.documentElement.classList.contains('light')).toBe(true)
  })
})

describe('consent store', () => {
  it('registra decisão e persiste', () => {
    const s = useConsentStore()
    s.decide('all')
    expect(s.level).toBe('all')
    expect(localStorage.getItem('cookieConsent')).toBe('all')
    expect(window.gtag).toHaveBeenCalled()
  })

  it('reset limpa a decisão', () => {
    const s = useConsentStore()
    s.decide('essential')
    s.reset()
    expect(s.level).toBeNull()
    expect(localStorage.getItem('cookieConsent')).toBeNull()
  })
})
