import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'

import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { site } from './config/site'
import { setupMonitoring, setupAnalytics } from './plugins/monitoring'

import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(MotionPlugin)

setupMonitoring(app, router)
setupAnalytics(router, site.analytics.ga4)

app.mount('#app')
