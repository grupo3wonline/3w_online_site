/**
 * useAnalytics — Google Analytics 4 + Google Tag Manager
 *
 * Rastreamento de eventos, page views, conversões e interações.
 * Respeita o consentimento do usuário (cookie banner / LGPD).
 *
 * GA4 Measurement ID: G-J06THXX0MW (via GTM-WVMJV7G6)
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}

const GA4_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined

/** Garante que o dataLayer existe e envia um evento. */
function pushDataLayer(payload: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push(payload)
}

/** Envia evento via gtag (GA4 direto) e dataLayer (GTM). */
function sendEvent(eventName: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return
  // GA4 via gtag
  if (window.gtag && GA4_ID) {
    window.gtag('event', eventName, { ...params, send_to: GA4_ID })
  }
  // GTM dataLayer
  pushDataLayer({ event: eventName, ...params })
}

export function useAnalytics() {
  // ─── Page Views ───────────────────────────────────────────────────────────

  /** Registra page view — chamar no afterEach do router. */
  function trackPageView(path: string, title: string): void {
    sendEvent('page_view', {
      page_path: path,
      page_title: title,
      page_location: typeof window !== 'undefined' ? window.location.href : '',
    })
  }

  // ─── Formulários ──────────────────────────────────────────────────────────

  /** Registra início de preenchimento do formulário. */
  function trackFormStart(formId: string): void {
    sendEvent('form_start', { form_id: formId, event_category: 'Form' })
  }

  /** Registra envio bem-sucedido do formulário. */
  function trackFormSubmit(formId: string, formName: string): void {
    sendEvent('form_submit', {
      form_id: formId,
      form_name: formName,
      event_category: 'Form',
    })
  }

  /** Registra conversão — envio de orçamento / lead gerado. */
  function trackLead(source: string, service?: string): void {
    sendEvent('generate_lead', {
      event_category: 'Lead',
      lead_source: source,
      service_interest: service ?? 'geral',
      currency: 'BRL',
    })
    // Converte também como conversion para GA4
    if (window.gtag && GA4_ID) {
      window.gtag('event', 'conversion', { send_to: GA4_ID })
    }
  }

  // ─── Ferramentas ──────────────────────────────────────────────────────────

  /** Registra uso de uma ferramenta. */
  function trackToolUsage(toolName: string, action = 'use'): void {
    sendEvent('tool_usage', {
      tool_name: toolName,
      action,
      event_category: 'Tools',
      event_label: toolName,
    })
  }

  // ─── CTA e Botões ─────────────────────────────────────────────────────────

  /** Registra clique em qualquer botão ou CTA. */
  function trackButtonClick(buttonName: string, location: string): void {
    sendEvent('click', {
      event_category: 'Button',
      event_label: buttonName,
      button_location: location,
    })
  }

  /** Registra clique em link externo (WhatsApp, redes sociais). */
  function trackOutboundClick(url: string, label: string): void {
    sendEvent('click', {
      event_category: 'Outbound',
      event_label: label,
      outbound_url: url,
      transport_type: 'beacon',
    })
  }

  // ─── Busca e Interação ────────────────────────────────────────────────────

  /** Registra busca interna. */
  function trackSearch(searchTerm: string, resultCount?: number): void {
    sendEvent('search', {
      search_term: searchTerm,
      result_count: resultCount,
      event_category: 'Search',
    })
  }

  // ─── Erros e Exceções ─────────────────────────────────────────────────────

  /** Registra erro de aplicação. */
  function trackError(errorMessage: string, errorLocation: string, fatal = false): void {
    sendEvent('exception', {
      description: errorMessage,
      fatal,
      error_location: errorLocation,
      event_category: 'Error',
    })
  }

  // ─── Conversões e E-commerce ─────────────────────────────────────────────

  /** Registra conversão genérica. */
  function trackConversion(conversionType: string, value = ''): void {
    sendEvent('conversion', {
      event_category: 'Conversion',
      event_label: conversionType,
      value,
    })
  }

  // ─── Scroll e Engajamento ─────────────────────────────────────────────────

  /** Registra scroll até uma seção específica. */
  function trackSectionView(sectionId: string, pagePath: string): void {
    sendEvent('section_view', {
      section_id: sectionId,
      page_path: pagePath,
      event_category: 'Engagement',
    })
  }

  // ─── Evento personalizado ─────────────────────────────────────────────────

  function trackCustomEvent(eventName: string, parameters: Record<string, unknown> = {}): void {
    sendEvent(eventName, parameters)
  }

  return {
    trackPageView,
    trackFormStart,
    trackFormSubmit,
    trackLead,
    trackToolUsage,
    trackButtonClick,
    trackOutboundClick,
    trackSearch,
    trackError,
    trackConversion,
    trackSectionView,
    trackCustomEvent,
  }
}
