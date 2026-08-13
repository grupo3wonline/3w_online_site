/**
 * Composable para Google Analytics 4 e Google Tag Manager
 * Rastreamento de eventos e page views
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}

export function useAnalytics() {
  const trackPageView = (path: string, title: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: path,
        page_title: title,
        page_location: window.location.href,
      })
    }
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'page_view', page_path: path, page_title: title })
    }
  }

  const trackToolUsage = (toolName: string, action = 'use') => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'tool_usage', {
        tool_name: toolName,
        action,
        event_category: 'Tools',
        event_label: toolName,
      })
    }
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'tool_usage', tool_name: toolName, action })
    }
  }

  const trackButtonClick = (buttonName: string, location: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'Button',
        event_label: buttonName,
        button_location: location,
      })
    }
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'button_click', button_name: buttonName, button_location: location })
    }
  }

  const trackConversion = (conversionType: string, value = '') => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        event_category: 'Conversion',
        event_label: conversionType,
        value,
      })
    }
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'conversion', conversion_type: conversionType, conversion_value: value })
    }
  }

  const trackError = (errorMessage: string, errorLocation: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', { description: errorMessage, fatal: false, error_location: errorLocation })
    }
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'error', error_message: errorMessage, error_location: errorLocation })
    }
  }

  const trackSearch = (searchTerm: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'search', { search_term: searchTerm, event_category: 'Search' })
    }
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'search', search_term: searchTerm })
    }
  }

  const trackCustomEvent = (eventName: string, parameters: Record<string, unknown> = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters)
    }
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: eventName, ...parameters })
    }
  }

  return {
    trackPageView,
    trackToolUsage,
    trackButtonClick,
    trackConversion,
    trackError,
    trackSearch,
    trackCustomEvent,
  }
}
