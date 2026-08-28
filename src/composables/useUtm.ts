/**
 * Composable para SEM (Search Engine Marketing) e Rastreamento de Conversão.
 * Captura e persiste parâmetros UTM, gclid e fbclid para atribuição em campanhas pagas
 * (Google Ads, Meta Ads, Display) e formatação inteligente de links de WhatsApp e formulários.
 */

export interface UtmParams {
  source?: string
  medium?: string
  campaign?: string
  term?: string
  content?: string
  gclid?: string
  fbclid?: string
}

const STORAGE_KEY = '3w_sem_utm_attribution'

export function useUtm() {
  function captureUtmFromUrl(): UtmParams {
    if (typeof window === 'undefined') return {}
    try {
      const params = new URLSearchParams(window.location.search)
      const captured: UtmParams = {}

      if (params.get('utm_source')) captured.source = params.get('utm_source')!
      if (params.get('utm_medium')) captured.medium = params.get('utm_medium')!
      if (params.get('utm_campaign')) captured.campaign = params.get('utm_campaign')!
      if (params.get('utm_term')) captured.term = params.get('utm_term')!
      if (params.get('utm_content')) captured.content = params.get('utm_content')!
      if (params.get('gclid')) captured.gclid = params.get('gclid')!
      if (params.get('fbclid')) captured.fbclid = params.get('fbclid')!

      if (Object.keys(captured).length > 0) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(captured))
        return captured
      }

      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored) as UtmParams
      }
    } catch {
      // Ignora erro de acesso a storage
    }
    return {}
  }

  function getStoredUtm(): UtmParams {
    if (typeof window === 'undefined') return {}
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (stored) return JSON.parse(stored) as UtmParams
    } catch {
      // fallback
    }
    return {}
  }

  function getWhatsAppUrlWithAttribution(baseUrl: string, baseText: string): string {
    const utms = getStoredUtm()
    let text = baseText

    if (utms.source || utms.campaign) {
      const tag = ` [Origem: ${utms.source || 'direto'}${utms.campaign ? ` | Campanha: ${utms.campaign}` : ''}]`
      text += tag
    }

    const encoded = encodeURIComponent(text)
    return `https://wa.me/5541996924829?text=${encoded}`
  }

  return {
    captureUtmFromUrl,
    getStoredUtm,
    getWhatsAppUrlWithAttribution,
  }
}
