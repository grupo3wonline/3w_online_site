import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import { vMaska } from 'maska/vue'
import App from './App.vue'
import router from './router'
import { useThemeStore } from './stores/theme'
import { setupSentry } from './plugins/sentry'
import './index.css'

const app = createApp(App)
const pinia = createPinia()

setupSentry(app, router)

app.use(pinia)
app.use(router)
app.use(MotionPlugin)
app.directive('maska', vMaska)

// Inicializa o tema antes de montar para evitar flash de tema.
useThemeStore(pinia).init()

app.mount('#app')
