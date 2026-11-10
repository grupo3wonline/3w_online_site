import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue/client'
import VueApexCharts from 'vue3-apexcharts'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { setupSentry } from './plugins/sentry'
import './assets/styles/main.css'

const app = createApp(App)

// Monitoramento de erros (opt-in via VITE_SENTRY_DSN)
setupSentry(app, router)

app.use(createPinia())
app.use(router)
app.use(createHead())
app.use(i18n)
app.use(VueApexCharts)

// Tratamento global de erros de componentes Vue
app.config.errorHandler = (err, _instance, info) => {
  console.error('[Vue error]', err, info)
}

// Recupera de falhas de carregamento de chunks (ex.: novo deploy)
window.addEventListener('vite:preloadError', () => {
  window.location.reload()
})

app.mount('#app')
