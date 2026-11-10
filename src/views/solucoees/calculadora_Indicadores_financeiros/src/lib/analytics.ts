/**
 * Carregamento condicional de GTM + GA4, respeitando o consentimento do usuário
 * (LGPD/GDPR/CCPA/POPIA). Nada é carregado antes do "aceite".
 */

const GTM_ID = import.meta.env.VITE_GTM_ID
const GA4_ID = import.meta.env.VITE_GA4_ID

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

let loaded = false

/** Injeta GTM e GA4 apenas uma vez, após consentimento. */
export function loadAnalytics(): void {
  if (loaded || typeof window === 'undefined') return
  if (!GTM_ID && !GA4_ID) return
  loaded = true

  window.dataLayer = window.dataLayer || []

  // Google Tag Manager
  if (GTM_ID) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    const gtm = document.createElement('script')
    gtm.async = true
    gtm.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
    document.head.appendChild(gtm)
  }

  // Google Analytics 4
  if (GA4_ID) {
    const ga = document.createElement('script')
    ga.async = true
    ga.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
    document.head.appendChild(ga)

    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA4_ID, { anonymize_ip: true })
  }
}

/** Envia um pageview manual (SPA) ao GA4/GTM, se carregado. */
export function trackPageView(path: string, title: string): void {
  if (!loaded) return
  window.gtag?.('event', 'page_view', { page_path: path, page_title: title })
  window.dataLayer?.push({ event: 'page_view', page_path: path, page_title: title })
}
