import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import ptBR from './locales/pt-BR'
import './assets/css/main.css'

const i18n = createI18n({
  legacy: false,
  locale: 'pt-BR',
  fallbackLocale: 'pt-BR',
  messages: {
    'pt-BR': ptBR,
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

// Diretiva global para tooltips
app.directive('tooltip', {
  mounted(el, binding) {
    el.setAttribute('title', binding.value)
    el.classList.add('cursor-help')
  },
  updated(el, binding) {
    el.setAttribute('title', binding.value)
  },
})

app.mount('#app')
