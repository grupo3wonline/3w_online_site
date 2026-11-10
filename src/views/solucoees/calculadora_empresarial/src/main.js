import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue/client'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './assets/main.css'

const app = createApp(App)
const head = createHead()

app.use(createPinia())
app.use(router)
app.use(head)

// Tratamento global de erros: evita tela branca e loga para diagnóstico.
app.config.errorHandler = (err, _instance, info) => {
  console.error('[App Error]', err, info)
}

app.mount('#app')
