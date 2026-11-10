import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ConsentPreferences } from '@/types'

const CONSENT_KEY = 'cookie-consent'
const CONSENT_TIMESTAMP_KEY = 'cookie-consent-timestamp'
const CONSENT_EXPIRY_DAYS = 180

/**
 * Store de consentimento de cookies, em conformidade com
 * LGPD (BR), GDPR (UE), CCPA (EUA/CA) e POPIA (ZA).
 */
export const useConsentStore = defineStore('consent', () => {
  const hasConsent = ref(false)
  const preferences = ref<ConsentPreferences>({
    essential: true,
    analytics: false,
    preferences: false,
  })

  const analyticsAllowed = computed(() => hasConsent.value && preferences.value.analytics)

  function isExpired(): boolean {
    const ts = localStorage.getItem(CONSENT_TIMESTAMP_KEY)
    if (!ts) return true
    const days = (Date.now() - Number(ts)) / (1000 * 60 * 60 * 24)
    return days > CONSENT_EXPIRY_DAYS
  }

  function load(): void {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored && !isExpired()) {
      try {
        const parsed = JSON.parse(stored) as Partial<ConsentPreferences>
        preferences.value = {
          essential: true,
          analytics: !!parsed.analytics,
          preferences: !!parsed.preferences,
        }
        hasConsent.value = true
      } catch {
        hasConsent.value = false
      }
    } else {
      hasConsent.value = false
    }
  }

  function save(prefs: Partial<ConsentPreferences>): void {
    preferences.value = {
      essential: true,
      analytics: !!prefs.analytics,
      preferences: !!prefs.preferences,
    }
    hasConsent.value = true
    localStorage.setItem(CONSENT_KEY, JSON.stringify(preferences.value))
    localStorage.setItem(CONSENT_TIMESTAMP_KEY, String(Date.now()))
    window.dispatchEvent(
      new CustomEvent('cookie-consent-updated', { detail: preferences.value }),
    )
  }

  function acceptAll(): void {
    save({ analytics: true, preferences: true })
  }

  function rejectAll(): void {
    save({ analytics: false, preferences: false })
  }

  function reset(): void {
    localStorage.removeItem(CONSENT_KEY)
    localStorage.removeItem(CONSENT_TIMESTAMP_KEY)
    hasConsent.value = false
    preferences.value = { essential: true, analytics: false, preferences: false }
  }

  return {
    hasConsent,
    preferences,
    analyticsAllowed,
    load,
    save,
    acceptAll,
    rejectAll,
    reset,
  }
})
