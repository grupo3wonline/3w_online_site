import type { App } from 'vue'
import type { Router } from 'vue-router'
import * as Sentry from '@sentry/vue'

/**
 * Inicializa o Sentry apenas em produção e quando o DSN estiver definido.
 * Sem DSN, é um no-op — evita overhead e chamadas externas em dev.
 */
export function setupSentry(app: App, router: Router): void {
  const dsn = import.meta.env.VITE_SENTRY_DSN
  if (!dsn || !import.meta.env.PROD) return

  Sentry.init({
    app,
    dsn,
    integrations: [Sentry.browserTracingIntegration({ router })],
    tracesSampleRate: 0.1,
    // Não capturar dados de entrada do usuário por padrão.
    sendDefaultPii: false,
  })
}
