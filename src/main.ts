import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/css/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

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
