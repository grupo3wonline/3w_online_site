import * as Sentry from '@sentry/vue'
import type { App } from 'vue'
import type { Router } from 'vue-router'

/**
 * Monitoramento de erros com Sentry.
 * Só é inicializado quando a variável de ambiente VITE_SENTRY_DSN está definida,
 * evitando qualquer overhead ou envio de dados em ambientes sem configuração.
 */
export function setupSentry(app: App, router: Router): void {
  const dsn = import.meta.env.VITE_SENTRY_DSN as string | undefined

  if (!dsn) {
    return
  }

  Sentry.init({
    app,
    dsn,
    environment: import.meta.env.MODE,
    integrations: [Sentry.browserTracingIntegration({ router })],
    // Amostragem conservadora para não impactar performance nem custos
    tracesSampleRate: 0.1,
    // Não capturar dados sensíveis por padrão (privacidade / LGPD)
    sendDefaultPii: false
  })
}
