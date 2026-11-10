import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { abilitiesPlugin } from '@casl/vue'
import { MotionPlugin } from '@vueuse/motion'
import { vMaska } from 'maska/vue'

import App from './App.vue'
import router from './router'
import { i18n } from './i18n'
import { ability } from './plugins/ability'
import { setupSentry } from './plugins/sentry'

import './index.css'
import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(MotionPlugin)
app.use(abilitiesPlugin, ability, { useGlobalProperties: true })
app.directive('maska', vMaska)

setupSentry(app, router)

app.mount('#app')
