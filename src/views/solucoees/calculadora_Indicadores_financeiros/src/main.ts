import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import VueApexCharts from 'vue3-apexcharts'

import App from './App.vue'
import router from './router'
import { initSentry } from './lib/sentry'
import { useThemeStore } from './stores/theme'
import { useConsentStore } from './stores/consent'

import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(MotionPlugin)
app.use(VueApexCharts)

initSentry(app, router)

// Boot: tema e consentimento antes de montar para evitar flash.
useThemeStore().init()
useConsentStore().init()

app.mount('#app')
