/**
 * Testes do usePrivacyConsent — LGPD, GDPR, CCPA, POPIA.
 * Verifica que consentimentos são corretamente persistidos e lidos.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { usePrivacyConsent } from '@/composables/usePrivacyConsent'

const STORAGE_KEY = '3w_privacy_consent_v2'

describe('usePrivacyConsent — consentimento e persistência', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('getStoredConsent() retorna null quando não há consentimento salvo', () => {
    const { getStoredConsent } = usePrivacyConsent()
    expect(getStoredConsent()).toBeNull()
  })

  it('saveConsent() persiste as preferências no localStorage', () => {
    const { saveConsent, getStoredConsent } = usePrivacyConsent()

    saveConsent({ necessary: true, analytics: true, marketing: false })

    const stored = getStoredConsent()
    expect(stored).not.toBeNull()
    expect(stored!.necessary).toBe(true)
    expect(stored!.analytics).toBe(true)
    expect(stored!.marketing).toBe(false)
  })

  it('saveConsent() sempre define necessary como true independente do input', () => {
    const { saveConsent, getStoredConsent } = usePrivacyConsent()

    // Mesmo que o usuário passe necessary: false, deve ser forçado a true
    saveConsent({ necessary: false as unknown as true, analytics: false, marketing: false })

    const stored = getStoredConsent()
    expect(stored!.necessary).toBe(true)
  })

  it('acceptAll() salva analytics=true e marketing=true', () => {
    const { acceptAll, getStoredConsent } = usePrivacyConsent()

    acceptAll()

    const stored = getStoredConsent()
    expect(stored).not.toBeNull()
    expect(stored!.analytics).toBe(true)
    expect(stored!.marketing).toBe(true)
    expect(stored!.necessary).toBe(true)
  })

  it('rejectNonEssential() salva analytics=false e marketing=false', () => {
    const { rejectNonEssential, getStoredConsent } = usePrivacyConsent()

    rejectNonEssential()

    const stored = getStoredConsent()
    expect(stored).not.toBeNull()
    expect(stored!.analytics).toBe(false)
    expect(stored!.marketing).toBe(false)
    expect(stored!.necessary).toBe(true)
  })

  it('saveConsent() inclui os frameworks de conformidade', () => {
    const { saveConsent, getStoredConsent } = usePrivacyConsent()

    saveConsent({ necessary: true, analytics: true, marketing: true })

    const stored = getStoredConsent()
    expect(stored!.frameworks).toContain('LGPD (BR)')
    expect(stored!.frameworks).toContain('GDPR (EU)')
    expect(stored!.frameworks).toContain('CCPA/CPRA (US)')
    expect(stored!.frameworks).toContain('POPIA (ZA)')
  })

  it('saveConsent() persiste o timestamp de consentimento', () => {
    const { saveConsent, getStoredConsent } = usePrivacyConsent()

    const before = new Date().toISOString()
    saveConsent({ necessary: true, analytics: false, marketing: false })
    const after = new Date().toISOString()

    const stored = getStoredConsent()
    expect(stored!.timestamp).toBeTruthy()
    expect(stored!.timestamp >= before).toBe(true)
    expect(stored!.timestamp <= after).toBe(true)
  })

  it('getStoredConsent() retorna null se localStorage contiver JSON inválido', () => {
    localStorage.setItem(STORAGE_KEY, '{invalid_json}')
    const { getStoredConsent } = usePrivacyConsent()

    // Deve retornar null e não lançar exceção
    expect(() => getStoredConsent()).not.toThrow()
    expect(getStoredConsent()).toBeNull()
  })

  it('saveConsent() dispara evento "3w_privacy_updated" no window', () => {
    const { saveConsent } = usePrivacyConsent()
    const listener = vi.fn()
    window.addEventListener('3w_privacy_updated', listener)

    saveConsent({ necessary: true, analytics: true, marketing: true })

    expect(listener).toHaveBeenCalledOnce()
    window.removeEventListener('3w_privacy_updated', listener)
  })

  it('openPreferences() e closePreferences() controlam o modal', () => {
    const { openPreferences, closePreferences, isPreferencesModalOpen } = usePrivacyConsent()

    expect(isPreferencesModalOpen.value).toBe(false)

    openPreferences()
    expect(isPreferencesModalOpen.value).toBe(true)

    closePreferences()
    expect(isPreferencesModalOpen.value).toBe(false)
  })
})
