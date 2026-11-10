import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import router from './router'
import './index.css'

const app = createApp(App)

// Captura erros de componentes sem derrubar toda a aplicação.
app.config.errorHandler = (err, _instance, info) => {
  console.error('[app] erro capturado:', err, info)
}

app.use(createPinia())
app.use(router)
app.use(MotionPlugin)

app.mount('#app')
