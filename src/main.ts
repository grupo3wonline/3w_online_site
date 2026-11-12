import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/css/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

/**
 * Iconify — carregamento de ícones
 *
 * @iconify/vue v4 busca ícones de api.iconify.design em tempo de execução.
 * O CSP em index.html inclui explicitamente o endpoint do Iconify em
 * connect-src, permitindo as requisições em produção.
 *
 * Após o primeiro carregamento, os icon sets são cacheados em localStorage
 * — não há requisições repetidas nas visitas seguintes.
 *
 * Para ambientes offline ou com CSP mais restrito, considere usar
 * unplugin-icons + @iconify/json para tree-shaking em build-time.
 */

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
