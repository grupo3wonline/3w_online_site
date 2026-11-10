import { ref, computed } from 'vue'

const CONSENT_KEY = 'electrocalc_cookie_consent'
const CONSENT_DATE_KEY = 'electrocalc_consent_date'

type Gtag = (...args: unknown[]) => void

// Estado global (singleton entre chamadas do composable).
const consentGiven = ref<boolean | null>(null)
const showBanner = ref(false)

function getGtag(): Gtag | undefined {
  return (window as unknown as { gtag?: Gtag }).gtag
}

/**
 * Gerencia o consentimento de cookies (LGPD/GDPR/CCPA/POPIA)
 * integrando com o Consent Mode do Google (GA/GTM).
 */
export function useCookieConsent() {
  const checkExistingConsent = (): void => {
    const stored = localStorage.getItem(CONSENT_KEY)
    const date = localStorage.getItem(CONSENT_DATE_KEY)

    if (stored !== null) {
      consentGiven.value = stored === 'true'
      if (date) {
        const consentDate = new Date(date)
        const monthsDiff = (Date.now() - consentDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
        if (monthsDiff > 12) {
          consentGiven.value = null
          showBanner.value = true
        } else {
          showBanner.value = false
        }
      } else {
        showBanner.value = false
      }
    } else {
      showBanner.value = true
    }
  }

  const updateConsentMode = (granted: boolean): void => {
    const gtag = getGtag()
    gtag?.('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: granted ? 'granted' : 'denied',
    })
  }

  const saveConsent = (accepted: boolean): void => {
    consentGiven.value = accepted
    localStorage.setItem(CONSENT_KEY, String(accepted))
    localStorage.setItem(CONSENT_DATE_KEY, new Date().toISOString())
    showBanner.value = false
    updateConsentMode(accepted)
  }

  const acceptAll = (): void => saveConsent(true)
  const rejectAll = (): void => saveConsent(false)

  const revokeConsent = (): void => {
    localStorage.removeItem(CONSENT_KEY)
    localStorage.removeItem(CONSENT_DATE_KEY)
    consentGiven.value = null
    showBanner.value = true
    updateConsentMode(false)
  }

  const hasAnalyticsConsent = computed(() => consentGiven.value === true)
  const hasDecided = computed(() => consentGiven.value !== null)

  return {
    consentGiven,
    showBanner,
    hasAnalyticsConsent,
    hasDecided,
    checkExistingConsent,
    acceptAll,
    rejectAll,
    revokeConsent,
  }
}
