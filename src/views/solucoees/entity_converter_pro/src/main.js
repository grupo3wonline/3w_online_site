import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './style.css'
import App from './App.vue'

// Criar aplicação Vue
const app = createApp(App)

// Usar Pinia para gerenciamento de estado
app.use(createPinia())

// Usar Vue Router
app.use(router)

// Montar aplicação
app.mount('#app')
