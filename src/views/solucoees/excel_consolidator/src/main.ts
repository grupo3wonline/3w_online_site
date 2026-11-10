import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import { addCollection } from '@iconify/vue'
import mdiIcons from '@iconify-json/mdi/icons.json'
import svgSpinnersIcons from '@iconify-json/svg-spinners/icons.json'
import App from './App.vue'
import router from './router'
import './assets/index.css'

// Registrar coleções de ícones offline no Iconify para funcionamento instantâneo e offline
addCollection(mdiIcons)
addCollection(svgSpinnersIcons)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(MotionPlugin)

/** Tratamento global de erros — mensagem genérica, sem detalhes internos */
app.config.errorHandler = (_err, _instance, info) => {
  console.error('Erro na aplicação:', info)
  router.push({ name: 'error' })
}

app.mount('#app')
