import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

/**
 * Rotas com lazy-loading para melhor performance (code splitting).
 * meta.title e meta.description alimentam SEO e breadcrumb.
 */
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/HomePage.vue"),
    meta: {
      title: "Início",
      description:
        "Geradores gratuitos de orçamentos, ordens de serviço e recibos profissionais para empreendedores. Rápido, fácil e seguro.",
    },
  },
  {
    path: "/orcamentos",
    name: "orcamentos",
    component: () => import("@/pages/OrcamentosPage.vue"),
    meta: {
      title: "Gerador de Orçamentos",
      breadcrumb: "Orçamentos",
      description:
        "Crie orçamentos profissionais com cálculo automático de itens, valores e totais. Pronto para impressão e PDF.",
    },
  },
  {
    path: "/ordem-servicos",
    name: "ordem-servicos",
    component: () => import("@/pages/OrdemServicosPage.vue"),
    meta: {
      title: "Gerador de Ordem de Serviço",
      breadcrumb: "Ordem de Serviço",
      description:
        "Gere ordens de serviço detalhadas com prazos, prioridades, status e assinaturas. Ideal para prestadores de serviço.",
    },
  },
  {
    path: "/recibos",
    name: "recibos",
    component: () => import("@/pages/RecibosPage.vue"),
    meta: {
      title: "Gerador de Recibos",
      breadcrumb: "Recibos",
      description:
        "Emita recibos de venda, compra e prestação de serviços com valor por extenso automático e formato legal.",
    },
  },
  {
    path: "/simulador",
    name: "simulador",
    component: () => import("@/pages/SimuladorPage.vue"),
    meta: {
      title: "Simulador de Preço e Parcelamento",
      breadcrumb: "Simulador",
      description:
        "Calcule o preço de venda ideal com margem ou markup e simule parcelamentos com juros pela Tabela Price.",
    },
  },
  // Dicas e Contato foram unificados na landing (âncoras /#dicas e /#contato).
  // Redirecionamos as rotas antigas para preservar links existentes e SEO.
  { path: "/dicas", redirect: { path: "/", hash: "#dicas" } },
  { path: "/contato", redirect: { path: "/", hash: "#contato" } },
  {
    path: "/termos",
    name: "termos",
    component: () => import("@/pages/TermosPage.vue"),
    meta: {
      title: "Termos de Uso",
      breadcrumb: "Termos de Uso",
      description: "Termos de uso do Empreenda Fácil.",
    },
  },
  {
    path: "/privacidade",
    name: "privacidade",
    component: () => import("@/pages/PrivacidadePage.vue"),
    meta: {
      title: "Política de Privacidade",
      breadcrumb: "Privacidade",
      description: "Política de privacidade em conformidade com LGPD, GDPR, CCPA e POPIA.",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/pages/NotFoundPage.vue"),
    meta: { title: "Página não encontrada" },
  },
];

const router = createRouter({
  history: createWebHistory("/empreenda_facil_gerador/"),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) {
      // Aguarda a seção da âncora existir (páginas com lazy-load/animação de entrada).
      return new Promise((resolve) => {
        setTimeout(() => resolve({ el: to.hash, behavior: "smooth", top: 80 }), 350);
      });
    }
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
