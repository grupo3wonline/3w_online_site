import type { App } from 'vue'
import type { Router } from 'vue-router'
import * as Sentry from '@sentry/vue'
import { tracking } from '@/config/site'

/**
 * Inicializa o Sentry apenas quando há DSN configurado (produção).
 * Evita ruído/overhead em desenvolvimento.
 */
export function setupSentry(app: App, router: Router) {
  if (!tracking.sentryDsn || import.meta.env.DEV) return

  Sentry.init({
    app,
    dsn: tracking.sentryDsn,
    integrations: [Sentry.browserTracingIntegration({ router })],
    tracesSampleRate: 0.2,
    // Não captura dados de formulário/PII por padrão
    sendDefaultPii: false,
  })
}
