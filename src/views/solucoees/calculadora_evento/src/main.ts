import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { vMaska } from 'maska/vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { initSentry } from './lib/sentry'
import './assets/styles.css'

const app = createApp(App)

// Diretiva de máscara de input (Maska) disponível globalmente como v-maska
app.directive('maska', vMaska)

// Handler global de erros — registra no console e (se configurado) no Sentry
app.config.errorHandler = (err, _instance, info) => {
  console.error('[EventCalc] Erro não tratado:', err, info)
}

initSentry(app, router)

app.use(createPinia())
app.use(i18n)
app.use(router)
app.mount('#app')
