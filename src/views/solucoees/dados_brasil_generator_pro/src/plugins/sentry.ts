import type { App } from 'vue'
import type { Router } from 'vue-router'
import * as Sentry from '@sentry/vue'

/**
 * Inicializa o Sentry apenas em produção e quando um DSN é fornecido.
 * Sem DSN, é um no-op (não coleta nada) — respeitando privacidade em dev.
 */
export function initSentry(app: App, router: Router) {
  const dsn = import.meta.env.VITE_SENTRY_DSN
  if (!dsn || import.meta.env.DEV) return

  Sentry.init({
    app,
    dsn,
    integrations: [Sentry.browserTracingIntegration({ router })],
    tracesSampleRate: 0.1,
    // Não envia PII por padrão
    sendDefaultPii: false,
    environment: import.meta.env.MODE,
  })
}
