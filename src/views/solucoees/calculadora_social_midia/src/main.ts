import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import router from './router'
import { i18n } from './i18n'

import './index.css'
// Os ícones Font Awesome são renderizados via Iconify (@iconify/vue) usando os
// conjuntos "fa6-solid" e "fa6-brands", evitando importar o CSS completo (mais leve).

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(MotionPlugin)

// Sentry é inicializado apenas em produção e quando um DSN é fornecido,
// evitando ruído em desenvolvimento (Clean Code: configuração explícita).
const sentryDsn = import.meta.env.VITE_SENTRY_DSN
if (import.meta.env.PROD && sentryDsn) {
  import('@sentry/vue').then((Sentry) => {
    Sentry.init({
      app,
      dsn: sentryDsn,
      environment: 'production',
      tracesSampleRate: 0.1,
    })
  })
}

app.mount('#app')
