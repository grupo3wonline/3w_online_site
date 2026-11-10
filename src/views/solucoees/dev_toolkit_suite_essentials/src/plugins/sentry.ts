import type { App } from 'vue'
import type { Router } from 'vue-router'
import * as Sentry from '@sentry/vue'

/**
 * Inicializa o Sentry apenas quando VITE_SENTRY_DSN estiver definido.
 * Em desenvolvimento ou sem DSN, torna-se um no-op seguro.
 */
export function setupSentry(app: App, router: Router) {
  const dsn = import.meta.env.VITE_SENTRY_DSN
  if (!dsn || import.meta.env.DEV) return

  Sentry.init({
    app,
    dsn,
    integrations: [Sentry.browserTracingIntegration({ router })],
    tracesSampleRate: 0.2,
    // Não captura dados de PII por padrão (conformidade LGPD/GDPR)
    sendDefaultPii: false,
  })
}
