import { createRouter, createWebHistory } from 'vue-router'

// Views - Lazy loaded
const HomeView = () => import('../views/HomeView.vue')
const AboutView = () => import('../views/AboutView.vue')
const ServicesView = () => import('../views/ServicesView.vue')
const ToolsView = () => import('../views/ToolsView.vue')
const ContactView = () => import('../views/ContactView.vue')

const router = createRouter({
    history: createWebHistory('/gerador_legenda/'),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: { title: 'Home - Gerador de Legenda' }
        },
        {
            path: '/sobre',
            name: 'about',
            component: AboutView,
            meta: { title: 'Sobre Nós - Gerador de Legenda' }
        },
        {
            path: '/servicos',
            name: 'services',
            component: ServicesView,
            meta: { title: 'Serviços - Gerador de Legenda' }
        },
        {
            path: '/ferramentas',
            name: 'tools',
            component: ToolsView,
            meta: { title: 'Ferramentas - Gerador de Legenda' }
        },
        {
            path: '/contato',
            name: 'contact',
            component: ContactView,
            meta: { title: 'Contato - Gerador de Legenda' }
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Gerador de Legenda';
    next();
});

export default router
