import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import * as Sentry from '@sentry/vue'

import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { useThemeStore } from './stores/theme'

import './assets/index.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(MotionPlugin)

// Monitoramento de erros (Sentry) — ativado apenas se houver DSN configurado
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

// Aplica o tema salvo antes de montar
const theme = useThemeStore(pinia)
theme.apply()

app.mount('#app')

// Remove a classe de loading anti-FOUC quando o app monta
document.documentElement.classList.remove('loading')
