import type { App } from 'vue'
import type { Router } from 'vue-router'
import * as Sentry from '@sentry/vue'

/**
 * Inicializa o Sentry apenas quando um DSN é fornecido via variável de ambiente
 * (VITE_SENTRY_DSN). Em desenvolvimento, ou sem DSN, nada é ativado — assim o
 * monitoramento não interfere no fluxo local nem gera ruído.
 */
export function setupSentry(app: App, router: Router): void {
  const dsn = import.meta.env.VITE_SENTRY_DSN

  if (!dsn) return

  Sentry.init({
    app,
    dsn,
    environment: import.meta.env.MODE,
    integrations: [
      Sentry.browserTracingIntegration({ router }),
      Sentry.replayIntegration(),
    ],
    // Amostragem conservadora para hospedagem compartilhada
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0.0,
    replaysOnErrorSampleRate: 1.0,
    // Não enviar dados de saúde do usuário; a app é client-side e sem PII enviada
    sendDefaultPii: false,
  })
}
