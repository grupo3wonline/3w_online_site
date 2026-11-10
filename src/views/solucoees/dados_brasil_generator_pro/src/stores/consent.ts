import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface ConsentState {
  necessary: true
  analytics: boolean
  marketing: boolean
}

const STORAGE_KEY = 'dbg-consent'

function load(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return { necessary: true, analytics: !!parsed.analytics, marketing: !!parsed.marketing }
  } catch {
    return null
  }
}

/**
 * Store de consentimento (LGPD/GDPR/CCPA/POPIA).
 * Analytics só é liberado após consentimento explícito (opt-in).
 */
export const useConsentStore = defineStore('consent', () => {
  const state = ref<ConsentState | null>(load())
  const decided = computed(() => state.value !== null)
  const analyticsAllowed = computed(() => state.value?.analytics === true)

  function persist(value: ConsentState) {
    state.value = value
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    // Atualiza o Google Consent Mode se presente
    if (typeof window !== 'undefined' && typeof (window as never as { gtag?: unknown }).gtag === 'function') {
      const gtag = (window as never as { gtag: (...args: unknown[]) => void }).gtag
      gtag('consent', 'update', {
        analytics_storage: value.analytics ? 'granted' : 'denied',
        ad_storage: value.marketing ? 'granted' : 'denied',
        ad_user_data: value.marketing ? 'granted' : 'denied',
        ad_personalization: value.marketing ? 'granted' : 'denied',
      })
    }
  }

  function acceptAll() {
    persist({ necessary: true, analytics: true, marketing: true })
  }

  function rejectAll() {
    persist({ necessary: true, analytics: false, marketing: false })
  }

  function savePreferences(prefs: { analytics: boolean; marketing: boolean }) {
    persist({ necessary: true, analytics: prefs.analytics, marketing: prefs.marketing })
  }

  return { state, decided, analyticsAllowed, acceptAll, rejectAll, savePreferences }
})
