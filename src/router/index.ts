import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '3W Online | Marketing Digital e Desenvolvimento' },
  },
  {
    path: '/sobre',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: { title: 'Sobre | 3W Online' },
  },
  {
    path: '/servicos',
    name: 'Services',
    component: () => import('@/views/Services.vue'),
    meta: { title: 'Serviços | 3W Online' },
  },

  {
    path: '/contato',
    name: 'Contact',
    component: () => import('@/views/Contact.vue'),
    meta: { title: 'Contato | 3W Online' },
  },
  {
    path: '/privacidade',
    name: 'Privacy',
    component: () => import('@/views/Privacy.vue'),
    meta: { title: 'Política de Privacidade | 3W Online' },
  },
  {
    path: '/termos',
    name: 'Terms',
    component: () => import('@/views/Terms.vue'),
    meta: { title: 'Termos de Uso | 3W Online' },
  },
  {
    path: '/regulamento',
    name: 'Regulamento',
    component: () => import('@/views/Regulamento.vue'),
    meta: { title: 'Regulamento | 3W Online' },
  },
  {
    path: '/institucional',
    name: 'Institucional',
    component: () => import('@/views/Institucional.vue'),
    meta: { title: 'Institucional | 3W Online' },
  },
  {
    path: '/ferramentas',
    name: 'Tools',
    component: () => import('@/views/Tools.vue'),
    meta: { title: 'Ferramentas | 3W Online' },
  },
  {
    path: '/pagamento',
    name: 'Pagamento',
    component: () => import('@/views/Pagamento.vue'),
    meta: { title: 'Pagamento Seguro | 3W Online' },
  },
  {
    path: '/anuncios',
    name: 'LandingAds',
    component: () => import('@/views/LandingAds.vue'),
    meta: { title: 'Anúncios | 3W Online' },
  },
  {
    path: '/landing-prd',
    name: 'LandingPRD',
    component: () => import('@/views/LandingPRD.vue'),
    meta: { title: 'Landing PRD | 3W Online' },
  },
  {
    path: '/lp-mkt',
    name: 'LandingMarketing',
    component: () => import('@/views/LandingMarketing.vue'),
    meta: { title: 'Marketing | 3W Online' },
  },
  {
    path: '/lp-sites-sistemas',
    name: 'LandingSitesSistemas',
    component: () => import('@/views/LandingSitesSistemas.vue'),
    meta: { title: 'Sites e Sistemas | 3W Online' },
  },
  {
    path: '/g3w',
    name: 'LandingG3w',
    component: () => import('@/views/lp/G3w.vue'),
    meta: { title: '3W Online | Software House & Marketing Digital' },
  },
  {
    path: '/lp-sistemas',
    name: 'LandingSistemas',
    component: () => import('@/views/lp/Sistemas.vue'),
    meta: { title: 'Sistemas Sob Medida | 3W Online' },
  },

  {
    path: '/william-portfolio',
    name: 'WilliamPortfolio',
    component: () => import('@/views/WilliamPortfolio.vue'),
    meta: { title: 'William Portfolio' },
  },

  // Service Landing Pages
  {
    path: '/servicos/gestao-redes-sociais',
    name: 'SocialMediaManagement',
    component: () => import('@/views/services/SocialMediaManagement.vue'),
    meta: { title: 'Gestão de Redes Sociais | 3W Online' },
  },
  {
    path: '/servicos/gestao-anuncios',
    name: 'AdsManagement',
    component: () => import('@/views/services/AdsManagement.vue'),
    meta: { title: 'Gestão de Anúncios | 3W Online' },
  },
  {
    path: '/servicos/criacao-sites',
    name: 'WebDevelopment',
    component: () => import('@/views/services/WebDevelopment.vue'),
    meta: { title: 'Criação de Sites | 3W Online' },
  },
  {
    path: '/servicos/desenvolvimento-apps',
    name: 'AppDevelopment',
    component: () => import('@/views/services/AppDevelopment.vue'),
    meta: { title: 'Desenvolvimento de Apps | 3W Online' },
  },
  {
    path: '/servicos/consultoria-marketing',
    name: 'MarketingConsulting',
    component: () => import('@/views/services/MarketingConsulting.vue'),
    meta: { title: 'Consultoria em Marketing | 3W Online' },
  },
  {
    path: '/servicos/planejamento-campanhas',
    name: 'CampaignPlanning',
    component: () => import('@/views/services/CampaignPlanning.vue'),
    meta: { title: 'Planejamento de Campanhas | 3W Online' },
  },
  {
    path: '/servicos/design-grafico',
    name: 'GraphicDesign',
    component: () => import('@/views/services/GraphicDesign.vue'),
    meta: { title: 'Design Gráfico | 3W Online' },
  },
  {
    path: '/servicos/publicidade',
    name: 'Advertising',
    component: () => import('@/views/services/Advertising.vue'),
    meta: { title: 'Publicidade e Propaganda | 3W Online' },
  },
  {
    path: '/servicos/organizacao-comercial',
    name: 'BusinessOrganization',
    component: () => import('@/views/services/BusinessOrganization.vue'),
    meta: { title: 'Organização Comercial | 3W Online' },
  },
  {
    path: '/servicos/relacoes-publicas',
    name: 'PublicRelations',
    component: () => import('@/views/services/PublicRelations.vue'),
    meta: { title: 'Relações Públicas | 3W Online' },
  },
  {
    path: '/servicos/marketing-digital',
    name: 'MarketingDigital',
    component: () => import('@/views/services/MarketingDigital.vue'),
    meta: { title: 'Marketing Digital | 3W Online' },
  },
  {
    path: '/servicos/criacao-sistemas',
    name: 'SystemDevelopment',
    component: () => import('@/views/services/SystemDevelopment.vue'),
    meta: { title: 'Criação de Sistemas | 3W Online' },
  },
  {
    path: '/servicos/automacao-ia',
    name: 'AutomacaoIA',
    component: () => import('@/views/services/AutomacaoIA.vue'),
    meta: { title: 'Automação e Inteligência Artificial | 3W Online' },
  },

  // Error Pages
  {
    path: '/403',
    name: 'Forbidden',
    component: () => import('@/views/errors/Error403.vue'),
    meta: { title: 'Acesso Negado | 3W Online' },
  },
  {
    path: '/500',
    name: 'ServerError',
    component: () => import('@/views/errors/Error500.vue'),
    meta: { title: 'Erro do Servidor | 3W Online' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/errors/Error404.vue'),
    meta: { title: 'Página Não Encontrada | 3W Online' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

// Guard global para atualizar título da página (SEO)
router.beforeEach((to) => {
  const title = to.meta.title as string | undefined
  if (title) {
    document.title = title
  }
})

export default router
