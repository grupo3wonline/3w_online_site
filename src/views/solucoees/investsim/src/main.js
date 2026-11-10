import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

// Font Awesome (via CDN no index.html)

// Configuração do app
const app = createApp(App)
app.use(router)
app.mount('#app')
