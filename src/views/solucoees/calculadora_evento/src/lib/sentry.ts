import type { App } from 'vue'
import type { Router } from 'vue-router'
import * as Sentry from '@sentry/vue'

/**
 * Inicializa o Sentry apenas quando VITE_SENTRY_DSN está definido.
 * Sem DSN (ex.: desenvolvimento local), a função é um no-op — nenhum
 * dado é enviado e o bundle de monitoramento fica inerte.
 */
export function initSentry(app: App, router: Router) {
  const dsn = import.meta.env.VITE_SENTRY_DSN
  if (!dsn) return

  Sentry.init({
    app,
    dsn,
    environment: import.meta.env.MODE,
    integrations: [Sentry.browserTracingIntegration({ router })],
    // Amostragem de tracing conservadora para não estourar cota
    tracesSampleRate: Number(import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE ?? 0.1),
    // Não envia PII por padrão (LGPD/GDPR)
    sendDefaultPii: false,
  })
}
