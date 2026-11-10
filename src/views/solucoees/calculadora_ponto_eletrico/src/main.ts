import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue/client'
import { MotionPlugin } from '@vueuse/motion'
import VueApexCharts from 'vue3-apexcharts'

import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { setupFontAwesome, setupSentry } from './plugins'

const app = createApp(App)

setupFontAwesome(app)
setupSentry(app, router)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(createHead())
app.use(MotionPlugin)
app.use(VueApexCharts)

app.mount('#app')
