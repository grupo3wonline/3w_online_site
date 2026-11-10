import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import * as Sentry from '@sentry/vue'

import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { SITE } from './config/site'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(MotionPlugin)

// Monitoramento de erros (ativado apenas se houver DSN configurado)
const sentryDsn = import.meta.env.VITE_SENTRY_DSN
if (sentryDsn) {
  Sentry.init({
    app,
    dsn: sentryDsn,
    environment: import.meta.env.MODE,
    tracesSampleRate: 0.1,
    release: `${SITE.name}@1.0.0`,
  })
}

app.mount('#app')
