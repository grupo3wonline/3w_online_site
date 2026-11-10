import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const LandingView = () => import('@/views/LandingView.vue');
const PrivacyView = () => import('@/views/PrivacyView.vue');
const TermsView = () => import('@/views/TermsView.vue');
const NotFoundView = () => import('@/views/NotFoundView.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: LandingView,
    meta: { title: 'Calculadora de Saúde — IMC, Peso Ideal e Plano Nutricional' },
  },
  {
    path: '/privacidade',
    name: 'privacy',
    component: PrivacyView,
    meta: { title: 'Política de Privacidade — Calculadora de Saúde' },
  },
  {
    path: '/termos',
    name: 'terms',
    component: TermsView,
    meta: { title: 'Termos de Uso — Calculadora de Saúde' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: { title: 'Página não encontrada — Calculadora de Saúde' },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/calculadora_saude/'),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 };
    }
    if (savedPosition) return savedPosition;
    return { top: 0, behavior: 'smooth' };
  },
});

export default router;
