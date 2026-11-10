import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import router from './router'
import { i18n } from './i18n'
import { initSentry } from './lib/monitoring/sentry'
import './assets/css/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(MotionPlugin)

initSentry(app, router)

// Handler global — registra o erro e evita que a UI quebre silenciosamente.
app.config.errorHandler = (err, _instance, info) => {
  console.error('[App] Erro não tratado:', err, info)
}

app.mount('#app')
