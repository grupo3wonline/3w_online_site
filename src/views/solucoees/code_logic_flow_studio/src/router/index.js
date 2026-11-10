import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/sobre',
        name: 'about',
        component: () => import('../views/AboutView.vue')
    },
    {
        path: '/servicos',
        name: 'services',
        component: () => import('../views/ServicesView.vue')
    },
    {
        path: '/ferramentas',
        name: 'tools',
        component: () => import('../views/ToolsView.vue')
    },
    {
        path: '/contato',
        name: 'contact',
        component: () => import('../views/ContactView.vue')
    }
]

const router = createRouter({
    history: createWebHistory('/code_logic_flow_studio/'),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

export default router
