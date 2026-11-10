import { ANALYTICS } from '@/config/site'
import { useConsentStore } from '@/stores/consent'

/**
 * Analytics (GA4/GTM) com respeito ao consentimento de cookies.
 * O carregamento do GTM/GA já ocorre no index.html; aqui controlamos
 * o consentimento (Consent Mode) e o envio de eventos.
 */
export function useAnalytics() {
  /** Atualiza o Consent Mode do Google conforme a escolha do usuário. */
  function updateConsent(analyticsGranted: boolean): void {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
    window.gtag('consent', 'update', {
      analytics_storage: analyticsGranted ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    })
  }

  function trackEvent(name: string, params: Record<string, unknown> = {}): void {
    const consent = useConsentStore()
    if (!consent.analyticsAllowed) return
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', name, params)
    }
  }

  function trackPageView(path: string, title: string): void {
    const consent = useConsentStore()
    if (!consent.analyticsAllowed) return
    if (ANALYTICS.gaId && typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: path,
        page_title: title,
      })
    }
  }

  return { updateConsent, trackEvent, trackPageView }
}
