import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layouts/DefaultLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/pages/HomePage.vue"),
        meta: { breadcrumb: "Início" },
      },
      {
        path: "ferramenta",
        name: "tool",
        component: () => import("@/pages/ToolPage.vue"),
        meta: { breadcrumb: "Calculadora" },
      },
      {
        path: "orcamento",
        name: "budget",
        component: () => import("@/pages/BudgetPage.vue"),
        meta: { breadcrumb: "Orçamento" },
      },
      {
        path: "termos-de-uso",
        name: "terms",
        component: () => import("@/pages/TermsPage.vue"),
        meta: { breadcrumb: "Termos de Uso" },
      },
      {
        path: "politica-de-privacidade",
        name: "privacy",
        component: () => import("@/pages/PrivacyPage.vue"),
        meta: { breadcrumb: "Política de Privacidade" },
      },
      {
        path: "403",
        name: "forbidden",
        component: () => import("@/pages/errors/ForbiddenPage.vue"),
        meta: { breadcrumb: "Acesso Negado" },
      },
      {
        path: "500",
        name: "server-error",
        component: () => import("@/pages/errors/ServerErrorPage.vue"),
        meta: { breadcrumb: "Erro do Servidor" },
      },
      {
        path: ":pathMatch(.*)*",
        name: "not-found",
        component: () => import("@/pages/errors/NotFoundPage.vue"),
        meta: { breadcrumb: "Página não encontrada" },
      },
    ],
  },
  // Redirects das rotas antigas (Sobre/Serviços/Contato) para as âncoras da landing unificada.
  { path: "/sobre", redirect: { name: "home", hash: "#sobre" } },
  { path: "/servicos", redirect: { name: "home", hash: "#servicos" } },
  { path: "/contato", redirect: { name: "home", hash: "#contato" } },
];

const router = createRouter({
  history: createWebHistory("/calculadora_programadores/"),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) {
      return { el: to.hash, behavior: "smooth", top: 80 };
    }
    return { top: 0, behavior: "smooth" };
  },
});

// Trata falhas de carregamento de chunk dinâmico (ex.: após novo deploy)
// recarregando a página uma única vez para buscar os novos assets.
router.onError((error, to) => {
  const isChunkError = /Failed to fetch dynamically imported module|Importing a module script failed/i.test(
    error.message
  );
  if (isChunkError && !sessionStorage.getItem("chunk-reloaded")) {
    sessionStorage.setItem("chunk-reloaded", "1");
    window.location.assign(to.fullPath);
  }
});

router.afterEach(() => {
  sessionStorage.removeItem("chunk-reloaded");
});

export default router;
