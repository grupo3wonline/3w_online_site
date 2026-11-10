import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import { vMaska } from 'maska/vue'

import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { initSentry } from './plugins/sentry'

import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(MotionPlugin)
app.directive('maska', vMaska)

initSentry(app, router)

app.mount('#app')
