import { useStorage } from '@vueuse/core'

export type ConsentValue = 'accepted' | 'rejected' | null

/**
 * Gerencia o consentimento de cookies (LGPD/GDPR/CCPA/POPIA).
 * Persiste a escolha e sincroniza o Consent Mode do Google (GA4/GTM).
 */
export function useCookieConsent() {
  const consent = useStorage<ConsentValue>('freelance-calc-cookie-consent', null)

  function updateGoogleConsent(granted: boolean) {
    if (typeof window === 'undefined') return
    const w = window as unknown as { gtag?: (...args: unknown[]) => void }
    if (typeof w.gtag === 'function') {
      w.gtag('consent', 'update', {
        ad_storage: granted ? 'granted' : 'denied',
        analytics_storage: granted ? 'granted' : 'denied',
        ad_user_data: granted ? 'granted' : 'denied',
        ad_personalization: granted ? 'granted' : 'denied',
      })
    }
  }

  function accept() {
    consent.value = 'accepted'
    updateGoogleConsent(true)
  }

  function reject() {
    consent.value = 'rejected'
    updateGoogleConsent(false)
  }

  return { consent, accept, reject }
}
