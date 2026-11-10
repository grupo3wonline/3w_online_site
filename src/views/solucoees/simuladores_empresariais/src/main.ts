import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import VueApexCharts from 'vue3-apexcharts'
import * as Sentry from '@sentry/vue'

import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { vReveal } from './composables/useReveal'
import './assets/main.css'

const app = createApp(App)

// Monitoramento de erros (ativado apenas se DSN estiver configurado)
const sentryDsn = import.meta.env.VITE_SENTRY_DSN
if (sentryDsn) {
  Sentry.init({
    app,
    dsn: sentryDsn,
    integrations: [Sentry.browserTracingIntegration({ router })],
    tracesSampleRate: 0.1,
    environment: import.meta.env.MODE,
  })
}

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(MotionPlugin)
app.use(VueApexCharts)

app.directive('reveal', vReveal)

app.mount('#app')
