import { createRouter, createWebHistory } from 'vue-router';

// Lazy loading de rotas para melhor performance
const HomePage = () => import('@/pages/Home.vue');
const RecursosPage = () => import('@/pages/Recursos.vue');
const SobrePage = () => import('@/pages/Sobre.vue');
const ContatoPage = () => import('@/pages/Contato.vue');
const PrivacyPolicyPage = () => import('@/pages/PrivacyPolicy.vue');
const TermsOfServicePage = () => import('@/pages/TermsOfService.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      title: 'Rendimento Salarial - Calculadora Online Gratuita',
      description: 'Calculadora de rendimento salarial gratuita e moderna'
    }
  },
  {
    path: '/recursos',
    name: 'Recursos',
    component: RecursosPage,
    meta: {
      title: 'Recursos - Rendimento Salarial',
      description: 'Conheça todos os recursos da nossa calculadora'
    }
  },
  {
    path: '/sobre',
    name: 'Sobre',
    component: SobrePage,
    meta: {
      title: 'Sobre - Rendimento Salarial',
      description: 'Saiba mais sobre nossa calculadora e missão'
    }
  },
  {
    path: '/contato',
    name: 'Contato',
    component: ContatoPage,
    meta: {
      title: 'Contato - Rendimento Salarial',
      description: 'Entre em contato conosco'
    }
  },
  {
    path: '/privacidade',
    name: 'PrivacyPolicy',
    component: PrivacyPolicyPage,
    meta: {
      title: 'Política de Privacidade - Rendimento Salarial',
      description: 'Política de Privacidade e conformidade com a LGPD'
    }
  },
  {
    path: '/termos',
    name: 'TermsOfService',
    component: TermsOfServicePage,
    meta: {
      title: 'Termos de Uso - Rendimento Salarial',
      description: 'Termos e condições de uso do serviço'
    }
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory('/rendimento_salarial/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      };
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  }
});

// Navigation guards para SEO
router.beforeEach((to, from, next) => {
  // Atualiza o título da página
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
