import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import * as Sentry from '@sentry/vue'
import { vMaska } from 'maska/vue'

import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

const app = createApp(App)

// Monitoramento de erros (Sentry) — ativado somente se DSN estiver definido
const sentryDsn = import.meta.env.VITE_SENTRY_DSN
if (sentryDsn) {
  Sentry.init({
    app,
    dsn: sentryDsn,
    integrations: [Sentry.browserTracingIntegration({ router })],
    tracesSampleRate: 0.1,
  })
}

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(MotionPlugin)

// Diretiva de máscara de input (Maska) disponível globalmente
app.directive('maska', vMaska)

app.mount('#app')
