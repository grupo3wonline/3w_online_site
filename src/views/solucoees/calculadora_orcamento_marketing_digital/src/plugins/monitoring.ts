import type { App } from 'vue'
import type { Router } from 'vue-router'
import * as Sentry from '@sentry/vue'

/**
 * Inicializa o Sentry apenas se um DSN for fornecido via env.
 * Sem DSN, é um no-op — mantém o app leve em ambientes sem monitoramento.
 */
export function setupMonitoring(app: App, router: Router) {
  const dsn = import.meta.env.VITE_SENTRY_DSN
  if (!dsn) return

  Sentry.init({
    app,
    dsn,
    integrations: [Sentry.browserTracingIntegration({ router })],
    tracesSampleRate: 0.2,
    environment: import.meta.env.MODE,
  })
}

/**
 * Envia um page_view ao GA4 a cada mudança de rota (SPA).
 * Respeita o consentimento de cookies via Consent Mode do gtag.
 */
export function setupAnalytics(router: Router, ga4Id: string) {
  router.afterEach((to) => {
    window.gtag?.('event', 'page_view', {
      page_path: to.fullPath,
      page_title: document.title,
      send_to: ga4Id,
    })
  })
}
