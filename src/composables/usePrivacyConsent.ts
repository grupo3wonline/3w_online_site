/**
 * Composable para Gerenciamento Global de Privacidade e Consentimento
 * em conformidade com LGPD (Brasil), GDPR (União Europeia), CCPA/CPRA (Califórnia/EUA) e POPIA (África do Sul).
 */
import { ref } from 'vue'

export interface PrivacyPreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  timestamp: string
  frameworks: string[]
}

const STORAGE_KEY = '3w_privacy_consent_v2'

export const isPreferencesModalOpen = ref(false)
export const consentPreferences = ref<PrivacyPreferences>({
  necessary: true,
  analytics: false,
  marketing: false,
  timestamp: '',
  frameworks: ['LGPD', 'GDPR', 'CCPA', 'POPIA'],
})

export function usePrivacyConsent() {
  function getStoredConsent(): PrivacyPreferences | null {
    if (typeof window === 'undefined') return null
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored) as PrivacyPreferences
      }
    } catch {
      // Fallback on parse error
    }
    return null
  }

  function saveConsent(prefs: Partial<PrivacyPreferences>): void {
    if (typeof window === 'undefined') return
    const updated: PrivacyPreferences = {
      necessary: true,
      analytics: Boolean(prefs.analytics),
      marketing: Boolean(prefs.marketing),
      timestamp: new Date().toISOString(),
      frameworks: ['LGPD (BR)', 'GDPR (EU)', 'CCPA/CPRA (US)', 'POPIA (ZA)'],
    }
    consentPreferences.value = updated
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      window.dispatchEvent(new CustomEvent('3w_privacy_updated', { detail: updated }))
    } catch {
      // Ignora erro de storage restrito
    }
  }

  function acceptAll(): void {
    saveConsent({ necessary: true, analytics: true, marketing: true })
  }

  function rejectNonEssential(): void {
    saveConsent({ necessary: true, analytics: false, marketing: false })
  }

  function openPreferences(): void {
    isPreferencesModalOpen.value = true
  }

  function closePreferences(): void {
    isPreferencesModalOpen.value = false
  }

  return {
    isPreferencesModalOpen,
    consentPreferences,
    getStoredConsent,
    saveConsent,
    acceptAll,
    rejectNonEssential,
    openPreferences,
    closePreferences,
  }
}
