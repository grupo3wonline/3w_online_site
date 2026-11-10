import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import { createHead } from '@unhead/vue/client'
import * as Sentry from '@sentry/vue'

import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './assets/main.css'

const app = createApp(App)
const head = createHead()

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(head)
app.use(MotionPlugin)

// Sentry: só inicializa em produção quando houver DSN configurado.
const sentryDsn = import.meta.env.VITE_SENTRY_DSN
if (import.meta.env.PROD && sentryDsn) {
  Sentry.init({
    app,
    dsn: sentryDsn,
    integrations: [Sentry.browserTracingIntegration({ router })],
    tracesSampleRate: 0.1,
    environment: import.meta.env.MODE,
  })
}

app.mount('#app')
