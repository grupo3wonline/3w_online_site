import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import Swal from 'sweetalert2'

// Routes
import HomeView from './views/HomeView.vue'
import EditorView from './views/EditorView.vue'
import AboutView from './views/AboutView.vue'
import ServicesView from './views/ServicesView.vue'
import ContactView from './views/ContactView.vue'
import PrivacyView from './views/PrivacyView.vue'
import TermsView from './views/TermsView.vue'

const routes = [
    { path: '/', name: 'home', component: HomeView },
    { path: '/app', name: 'app', component: EditorView },
    { path: '/sobre', name: 'about', component: AboutView },
    { path: '/servicos', name: 'services', component: ServicesView },
    { path: '/contato', name: 'contact', component: ContactView },
    { path: '/politica-privacidade', name: 'privacy', component: PrivacyView },
    { path: '/termos-uso', name: 'terms', component: TermsView },
]

const router = createRouter({
    history: createWebHistory('/code_master/'),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    },
})

const app = createApp(App)
app.use(router)
app.mount('#app')
