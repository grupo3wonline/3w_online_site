/**
 * Camada de analytics com Consent Mode.
 * Os scripts base do GTM/GA são carregados no index.html com consentimento
 * negado por padrão. Aqui apenas atualizamos o estado conforme a decisão do
 * usuário (LGPD/GDPR/CCPA/POPIA).
 */

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(args)
}

export function grantAnalyticsConsent() {
  if (typeof window === 'undefined') return
  gtag('consent', 'update', {
    ad_storage: 'granted',
    analytics_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
  })
  window.dataLayer?.push({ event: 'consent_accepted' })
}

export function denyAnalyticsConsent() {
  if (typeof window === 'undefined') return
  gtag('consent', 'update', {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

/** Dispara um evento customizado para o dataLayer/GA4. */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return
  window.dataLayer?.push({ event: name, ...params })
}
