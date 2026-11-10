import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'

import App from './App.vue'
import router from './router'
import { setupSentry } from './plugins/sentry'

// Registra offline apenas os ícones usados (sem chamadas de rede em runtime)
import './plugins/icons'

// Estilos globais (Tailwind + design system)
import './assets/styles/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(MotionPlugin)

setupSentry(app, router)

app.mount('#root')
