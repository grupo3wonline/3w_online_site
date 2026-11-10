import type { App } from 'vue'
import type { Router } from 'vue-router'
import * as Sentry from '@sentry/vue'

const DSN = import.meta.env.VITE_SENTRY_DSN

/** Inicializa o Sentry apenas quando um DSN estiver configurado. */
export function initSentry(app: App, router: Router): void {
  if (!DSN) return
  Sentry.init({
    app,
    dsn: DSN,
    integrations: [Sentry.browserTracingIntegration({ router })],
    tracesSampleRate: 0.2,
    environment: import.meta.env.MODE,
  })
}
