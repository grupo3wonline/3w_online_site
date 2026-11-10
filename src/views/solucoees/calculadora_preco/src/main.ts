import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue/client'
import { MotionPlugin } from '@vueuse/motion'
import VueApexCharts from 'vue3-apexcharts'

import App from './App.vue'
import { router } from './router'
import { i18n } from './i18n'
import { initSentry } from './lib/sentry'
import { useConsentStore } from './stores/consent'

import '@/styles/index.css'

const app = createApp(App)
const pinia = createPinia()
const head = createHead()

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(head)
app.use(MotionPlugin)
app.component('Apexchart', VueApexCharts)

initSentry(app, router)

// Reaplica o consentimento salvo antes de montar.
useConsentStore(pinia).syncConsent()

app.mount('#app')
