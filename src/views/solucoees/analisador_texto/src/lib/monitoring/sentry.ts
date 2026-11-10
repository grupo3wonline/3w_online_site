/**
 * Inicialização opcional do Sentry (monitoramento de erros no cliente).
 * Só é ativado quando VITE_SENTRY_DSN está definido — evita ruído em dev.
 */
import type { App } from 'vue'
import type { Router } from 'vue-router'
import * as Sentry from '@sentry/vue'

export function initSentry(app: App, router: Router): void {
  const dsn = import.meta.env.VITE_SENTRY_DSN
  if (!dsn) return

  Sentry.init({
    app,
    dsn,
    integrations: [Sentry.browserTracingIntegration({ router })],
    // Amostragem conservadora para não impactar performance/quota.
    tracesSampleRate: 0.1,
    // Não capturar dados do usuário — a ferramenta é privada por design.
    sendDefaultPii: false,
    environment: import.meta.env.MODE
  })
}
