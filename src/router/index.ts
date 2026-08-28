import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useSeo } from '@/composables/useSeo'
import { toolsRoutes } from './tools'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: 'Agência de Marketing Digital em Curitiba | 3W Online - Sites, Sistemas e IA',
      description: 'Agência de marketing digital em Curitiba. Criação de sites, gestão de redes sociais, anúncios Google Ads, desenvolvimento de apps, sistemas web e automação com inteligência artificial.',
      keywords: 'agência marketing digital curitiba, criação de sites curitiba, gestão redes sociais, google ads, meta ads, desenvolvimento web, sistemas sob medida, automação ia',
    },
  },
  {
    path: '/sobre',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: {
      title: 'Sobre a 3W Online | Agência de Marketing Digital em Curitiba PR',
      description: 'Conheça a 3W Online: agência de marketing digital em Curitiba com 5+ anos de experiência, 150+ projetos entregues. Especialistas em sites, sistemas e automação com IA.',
      keywords: 'sobre 3w online, agência marketing digital curitiba, equipe marketing digital, quem somos',
    },
  },
  {
    path: '/servicos',
    name: 'Services',
    component: () => import('@/views/Services.vue'),
    meta: {
      title: 'Serviços de Marketing Digital e Desenvolvimento | 3W Online Curitiba',
      description: 'Serviços completos: gestão de redes sociais, criação de sites, Google Ads, Meta Ads, design gráfico, desenvolvimento de apps, sistemas web e automação com IA em Curitiba.',
      keywords: 'serviços marketing digital, criação sites, gestão redes sociais, google ads, desenvolvimento apps, sistemas web, automação ia, curitiba',
    },
  },
  {
    path: '/contato',
    name: 'Contact',
    component: () => import('@/views/Contact.vue'),
    meta: {
      title: 'Contato | Fale com a 3W Online - Orçamento Gratuito',
      description: 'Entre em contato com a 3W Online para orçamento gratuito. WhatsApp (41) 99692-4829. Agência em Curitiba, Paraná. Resposta em até 24 horas úteis (Segunda a Sexta das 8h às 18h).',
      keywords: 'contato 3w online, orçamento marketing digital, whatsapp agência curitiba, fale conosco',
    },
  },
  {
    path: '/privacidade',
    name: 'Privacy',
    component: () => import('@/views/Privacy.vue'),
    meta: {
      title: 'Política de Privacidade | 3W Online - LGPD',
      description: 'Política de Privacidade da 3W Online. Saiba como coletamos, usamos e protegemos seus dados conforme a Lei Geral de Proteção de Dados (LGPD).',
      keywords: 'política privacidade, lgpd, proteção dados, 3w online',
    },
  },
  {
    path: '/termos',
    name: 'Terms',
    component: () => import('@/views/Terms.vue'),
    meta: {
      title: 'Termos de Uso | 3W Online',
      description: 'Termos de Uso e condições gerais dos serviços prestados pela 3W Online. Leia antes de utilizar nossos serviços.',
      keywords: 'termos de uso, condições gerais, 3w online',
    },
  },
  {
    path: '/regulamento',
    name: 'Regulamento',
    component: () => import('@/views/Regulamento.vue'),
    meta: {
      title: 'Regulamento | 3W Online',
      description: 'Regulamento de uso dos serviços e plataformas da 3W Online. Regras, diretrizes e políticas de utilização.',
      keywords: 'regulamento, regras de uso, 3w online',
    },
  },
  {
    path: '/institucional',
    name: 'Institucional',
    component: () => import('@/views/Institucional.vue'),
    meta: {
      title: 'Institucional | Grupo 3W Online - Missão, Visão e Valores',
      description: 'Conheça o Grupo 3W Online: nossa missão, visão, valores e história. Agência de marketing digital e tecnologia em Curitiba desde 2019.',
      keywords: 'institucional, missão visão valores, grupo 3w online, história empresa',
    },
  },
  {
    path: '/ferramentas',
    name: 'Tools',
    component: () => import('@/views/Tools.vue'),
    meta: {
      title: 'Ferramentas Digitais Gratuitas | 3W Online',
      description: 'Ferramentas digitais gratuitas para seu negócio. Calculadoras, geradores e utilitários de marketing digital da 3W Online.',
      keywords: 'ferramentas digitais, ferramentas marketing, calculadora marketing, 3w online',
    },
  },
  {
    path: '/pagamento',
    name: 'Pagamento',
    component: () => import('@/views/Pagamento.vue'),
    meta: {
      title: 'Pagamento Seguro | 3W Online',
      description: 'Realize pagamentos seguros para os serviços da 3W Online. Ambiente protegido com criptografia SSL.',
      keywords: 'pagamento seguro, pagar serviços, 3w online',
      noindex: true,
    },
  },
  {
    path: '/anuncios',
    name: 'LandingAds',
    component: () => import('@/views/LandingAds.vue'),
    meta: {
      title: 'Gestão de Anúncios Online em Curitiba | Google Ads e Meta Ads | 3W Online',
      description: 'Gestão profissional de anúncios no Google Ads e Meta Ads em Curitiba. Aumente suas vendas com campanhas otimizadas. ROI comprovado e relatórios detalhados.',
      keywords: 'gestão anúncios curitiba, google ads curitiba, meta ads curitiba, facebook ads, instagram ads, tráfego pago',
    },
  },
  {
    path: '/landing-prd',
    name: 'LandingPRD',
    component: () => import('@/views/LandingPRD.vue'),
    meta: {
      title: 'Marketing Digital e Desenvolvimento Web | 3W Online Curitiba',
      description: 'Soluções completas de marketing digital e desenvolvimento web em Curitiba. Sites, sistemas, apps e estratégias digitais que geram resultados.',
      keywords: 'marketing digital curitiba, desenvolvimento web, criação sites, 3w online',
    },
  },
  {
    path: '/lp-mkt',
    name: 'LandingMarketing',
    component: () => import('@/views/LandingMarketing.vue'),
    meta: {
      title: 'Marketing Digital Completo em Curitiba | 3W Online',
      description: 'Pacote completo de marketing digital: redes sociais, anúncios, conteúdo e relatórios. Agência especializada em Curitiba com resultados comprovados.',
      keywords: 'marketing digital completo, pacote marketing, agência curitiba, redes sociais, anúncios',
    },
  },
  {
    path: '/lp-sites-sistemas',
    name: 'LandingSitesSistemas',
    component: () => import('@/views/LandingSitesSistemas.vue'),
    meta: {
      title: 'Criação de Sites e Sistemas Web em Curitiba | 3W Online',
      description: 'Criação de sites profissionais e sistemas web sob medida em Curitiba. Design responsivo, SEO otimizado e tecnologia de ponta.',
      keywords: 'criação sites curitiba, sistemas web curitiba, desenvolvimento web, site institucional, e-commerce',
    },
  },
  {
    path: '/g3w',
    name: 'LandingG3w',
    component: () => import('@/views/lp/G3w.vue'),
    meta: {
      title: '3W Online | Software House & Agência de Marketing Digital em Curitiba',
      description: 'Software house e agência de marketing digital em Curitiba. Desenvolvimento de sistemas, sites, apps e soluções com inteligência artificial.',
      keywords: 'software house curitiba, agência marketing digital, desenvolvimento software, 3w online',
    },
  },
  {
    path: '/lp-sistemas',
    name: 'LandingSistemas',
    component: () => import('@/views/lp/Sistemas.vue'),
    meta: {
      title: 'Desenvolvimento de Sistemas Sob Medida em Curitiba | 3W Online',
      description: 'Sistemas web sob medida para automatizar seu negócio. CRM, ERP, agendamento, e-commerce e mais. Empresa de desenvolvimento em Curitiba.',
      keywords: 'sistemas sob medida curitiba, desenvolvimento sistemas, crm personalizado, erp, sistema web',
    },
  },


  // Service Landing Pages
  {
    path: '/servicos/gestao-redes-sociais',
    name: 'SocialMediaManagement',
    component: () => import('@/views/services/SocialMediaManagement.vue'),
    meta: {
      title: 'Gestão de Redes Sociais em Curitiba | Social Media | 3W Online',
      description: 'Gestão profissional de redes sociais em Curitiba. Criação de conteúdo, estratégia personalizada, SEO social, funil de vendas e planejamento antecipado. Instagram, Facebook, TikTok.',
      keywords: 'gestão redes sociais curitiba, social media, criação conteúdo, instagram, facebook, tiktok, marketing redes sociais',
    },
  },
  {
    path: '/servicos/gestao-anuncios',
    name: 'AdsManagement',
    component: () => import('@/views/services/AdsManagement.vue'),
    meta: {
      title: 'Gestão de Google Ads e Meta Ads em Curitiba | Tráfego Pago | 3W Online',
      description: 'Gestão profissional de anúncios Google Ads e Meta Ads em Curitiba. Campanhas otimizadas para gerar leads e vendas com ROI comprovado. Relatórios detalhados.',
      keywords: 'google ads curitiba, meta ads, facebook ads, instagram ads, gestão anúncios, tráfego pago, campanhas ads',
    },
  },
  {
    path: '/servicos/criacao-sites',
    name: 'WebDevelopment',
    component: () => import('@/views/services/WebDevelopment.vue'),
    meta: {
      title: 'Criação de Sites Profissionais em Curitiba | Web Design | 3W Online',
      description: 'Criação de sites profissionais em Curitiba. Sites institucionais, e-commerce, landing pages e portais. Design responsivo, SEO otimizado e carregamento rápido.',
      keywords: 'criação sites curitiba, web design, site institucional, e-commerce, landing page, site responsivo, desenvolvimento web',
    },
  },
  {
    path: '/servicos/desenvolvimento-apps',
    name: 'AppDevelopment',
    component: () => import('@/views/services/AppDevelopment.vue'),
    meta: {
      title: 'Desenvolvimento de Aplicativos em Curitiba | Apps iOS e Android | 3W Online',
      description: 'Desenvolvimento de aplicativos mobile em Curitiba. Apps nativos e híbridos para iOS e Android. React Native, UI/UX exclusivo e publicação nas lojas.',
      keywords: 'desenvolvimento apps curitiba, aplicativos mobile, ios, android, react native, app sob medida',
    },
  },
  {
    path: '/servicos/consultoria-marketing',
    name: 'MarketingConsulting',
    component: () => import('@/views/services/MarketingConsulting.vue'),
    meta: {
      title: 'Consultoria em Marketing Digital em Curitiba | Estratégia | 3W Online',
      description: 'Consultoria especializada em marketing digital em Curitiba. Diagnóstico, plano estratégico, análise de concorrência e acompanhamento de resultados.',
      keywords: 'consultoria marketing digital curitiba, estratégia marketing, diagnóstico digital, plano marketing',
    },
  },
  {
    path: '/servicos/planejamento-campanhas',
    name: 'CampaignPlanning',
    component: () => import('@/views/services/CampaignPlanning.vue'),
    meta: {
      title: 'Planejamento de Campanhas Publicitárias em Curitiba | 3W Online',
      description: 'Planejamento estratégico de campanhas publicitárias em Curitiba. Campanhas digitais, integradas e sazonais com foco em ROI e resultados mensuráveis.',
      keywords: 'planejamento campanhas curitiba, campanha publicitária, mídia digital, estratégia campanha',
    },
  },
  {
    path: '/servicos/design-grafico',
    name: 'GraphicDesign',
    component: () => import('@/views/services/GraphicDesign.vue'),
    meta: {
      title: 'Design Gráfico e Identidade Visual em Curitiba | 3W Online',
      description: 'Design gráfico profissional em Curitiba. Criação de logotipos, identidade visual, materiais para redes sociais, embalagens e peças publicitárias.',
      keywords: 'design gráfico curitiba, identidade visual, criação logo, material gráfico, design redes sociais',
    },
  },
  {
    path: '/servicos/publicidade',
    name: 'Advertising',
    component: () => import('@/views/services/Advertising.vue'),
    meta: {
      title: 'Publicidade e Propaganda em Curitiba | Agência | 3W Online',
      description: 'Agência de publicidade e propaganda em Curitiba. Campanhas integradas online e offline, produção de materiais e gestão de mídia.',
      keywords: 'publicidade curitiba, propaganda, agência publicidade, campanha publicitária, mídia offline',
    },
  },
  {
    path: '/servicos/organizacao-comercial',
    name: 'BusinessOrganization',
    component: () => import('@/views/services/BusinessOrganization.vue'),
    meta: {
      title: 'Organização Comercial e CRM em Curitiba | Vendas | 3W Online',
      description: 'Organização comercial e implementação de CRM em Curitiba. Estruture processos de vendas, treine sua equipe e aumente a eficiência comercial.',
      keywords: 'organização comercial curitiba, crm, funil de vendas, processos comerciais, treinamento vendas',
    },
  },
  {
    path: '/servicos/relacoes-publicas',
    name: 'PublicRelations',
    component: () => import('@/views/services/PublicRelations.vue'),
    meta: {
      title: 'Assessoria de Imprensa e Relações Públicas em Curitiba | 3W Online',
      description: 'Assessoria de imprensa e relações públicas em Curitiba. Gestão de crise, relacionamento com mídia, comunicação corporativa e eventos.',
      keywords: 'assessoria imprensa curitiba, relações públicas, gestão crise, comunicação corporativa, pr',
    },
  },
  {
    path: '/servicos/marketing-digital',
    name: 'MarketingDigital',
    component: () => import('@/views/services/MarketingDigital.vue'),
    meta: {
      title: 'Pacote Marketing Digital Completo R$ 500/mês em Curitiba | 3W Online',
      description: 'Pacote completo de marketing digital por R$ 500/mês em Curitiba. Gestão de redes sociais, produção de conteúdo, anúncios e relatórios. Sem fidelidade.',
      keywords: 'pacote marketing digital curitiba, marketing digital barato, gestão redes sociais, anúncios, r$ 500',
    },
  },
  {
    path: '/servicos/criacao-sistemas',
    name: 'SystemDevelopment',
    component: () => import('@/views/services/SystemDevelopment.vue'),
    meta: {
      title: 'Desenvolvimento de Sistemas Web em Curitiba | CRM, ERP | 3W Online',
      description: 'Desenvolvimento de sistemas web sob medida em Curitiba. CRM, ERP, agendamento, estoque, financeiro e plataformas SaaS com tecnologia de ponta.',
      keywords: 'desenvolvimento sistemas curitiba, sistema web, crm personalizado, erp, saas, software sob medida',
    },
  },
  {
    path: '/servicos/automacao-ia',
    name: 'AutomacaoIA',
    component: () => import('@/views/services/AutomacaoIA.vue'),
    meta: {
      title: 'Automação com Inteligência Artificial em Curitiba | Chatbot IA | 3W Online',
      description: 'Automação e soluções com IA em Curitiba. Chatbots GPT, automação WhatsApp, n8n, Chatwoot, Evolution API, Dify, Langflow, Typebot e Flowise. Reduza custos e escale.',
      keywords: 'automação ia curitiba, chatbot ia, inteligência artificial, n8n, chatwoot, evolution api, whatsapp automação, dify, langflow, typebot',
    },
  },

  // Ferramentas (todas as 126+ ferramentas integradas)
  ...toolsRoutes,

  // Error Pages
  {
    path: '/403',
    name: 'Forbidden',
    component: () => import('@/views/errors/Error403.vue'),
    meta: { title: 'Acesso Negado | 3W Online', description: '', noindex: true },
  },
  {
    path: '/500',
    name: 'ServerError',
    component: () => import('@/views/errors/Error500.vue'),
    meta: { title: 'Erro do Servidor | 3W Online', description: '', noindex: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/errors/Error404.vue'),
    meta: { title: 'Página Não Encontrada | 3W Online', description: '', noindex: true },
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

// Guard global para SEO (title, description, OG, Twitter, GEO, canonical)
router.beforeEach((to) => {
  const { applySeo } = useSeo()
  const title = (to.meta.title as string) || '3W Online | Marketing Digital e Desenvolvimento'
  const description = (to.meta.description as string) || 'Agência de marketing digital em Curitiba. Sites, sistemas, apps e automação com IA.'
  const keywords = to.meta.keywords as string | undefined
  const noindex = to.meta.noindex as boolean | undefined

  applySeo({
    title,
    description,
    path: to.path,
    keywords,
    noindex: noindex || false,
  })
})

export default router
