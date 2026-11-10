import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useConsentStore } from './consent'

describe('consent store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('começa sem decisão', () => {
    const consent = useConsentStore()
    expect(consent.hasDecided).toBe(false)
    expect(consent.analyticsAllowed).toBe(false)
  })

  it('aceitar marca analytics permitido', () => {
    const consent = useConsentStore()
    consent.accept()
    expect(consent.hasDecided).toBe(true)
    expect(consent.analyticsAllowed).toBe(true)
    expect(consent.status).toBe('accepted')
  })

  it('recusar bloqueia analytics', () => {
    const consent = useConsentStore()
    consent.decline()
    expect(consent.hasDecided).toBe(true)
    expect(consent.analyticsAllowed).toBe(false)
    expect(consent.status).toBe('declined')
  })
})
