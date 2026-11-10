import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import { vMaska } from 'maska/vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './assets/styles.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(MotionPlugin)
app.directive('maska', vMaska)

// Tratamento global de erros: registra e redireciona para a página de erro
// sem expor detalhes técnicos ao usuário final.
app.config.errorHandler = (err) => {
  console.error('[App] Erro não tratado:', err)
  if (router.currentRoute.value.name !== 'erro') {
    router.push({ name: 'erro' }).catch(() => {})
  }
}

app.mount('#app')
