# Calculadora de Orçamento de Marketing Digital

Ferramenta gratuita para calcular orçamentos de campanhas de marketing digital —
ideal para influenciadores, agências e criadores de conteúdo. Aplicação estática
(SPA) com landing page em formato de página de vendas, 100% em português (pt-BR).

Sistema desenvolvido pelo desenvolvedor **HOTWYL | WILLFROMBRASIL** |
**Grupo 3w Online** — sites e sistemas personalizados sob demanda
(https://www.3wonline.com.br).

## Stack

- **Vue 3** + **Vite** + **TypeScript**
- **Vue Router** (history mode, base `/calculadora_orcamento_marketing_digital/`)
- **Pinia** (tema, consentimento de cookies, loading global)
- **Tailwind CSS** (design system com tema claro/escuro)
- **Zod** + **vee-validate** (validação)
- **VueUse** + **@vueuse/motion** (utilidades e animações)
- **vue-i18n** (pt-BR)
- **SweetAlert2** (alertas) e **Font Awesome** (ícones)
- **@iconify/vue**, **date-fns**
- **@sentry/vue** (plugável via `VITE_SENTRY_DSN`)
- Qualidade: **ESLint**, **Prettier**, **Husky** + **lint-staged**
- Testes: **Vitest** (unit) e **Playwright** (E2E)

## Scripts

```bash
npm run dev            # servidor de desenvolvimento
npm run build          # build de produção (type-check + Vite) -> dist/
npm run preview        # pré-visualiza o build
npm run lint           # ESLint --fix
npm run format         # Prettier
npm run test:unit      # testes unitários (Vitest)
npm run test:e2e       # testes E2E (Playwright)
```

## Estrutura

```
src/
├── assets/main.css        # design system (tokens, tema claro/escuro, utilitários)
├── components/            # AppHeader, AppFooter, CookieBanner, Breadcrumb,
│                          # LoadingOverlay, HelpTooltip, ThemeToggle, MarketingCalculator
├── composables/useSeo.ts  # meta tags dinâmicas por rota (SEO/OG/Twitter)
├── config/site.ts         # dados centrais (contato, empresa, analytics)
├── i18n/                  # pt-BR
├── layouts/DefaultLayout  # header + breadcrumb + conteúdo + footer + banner + overlay
├── lib/calculator.ts      # regra de cálculo + validação (Zod) + formatação
├── plugins/monitoring.ts  # Sentry (opcional) + page_view GA4
├── router/                # rotas e redirecionamentos
├── stores/                # theme, consent, loading (Pinia)
└── views/                 # HomeView (landing unificada), Contato, Termos,
                           # Privacidade, NotFound, Error
```

## Funcionalidades

- Landing page de vendas unificada (Início, Sobre, Serviços e a calculadora numa
  só página, com âncoras `#calculadora`, `#sobre`, `#servicos`).
- Calculadora funcional: `orçamento = seguidores × (taxa_centavos ÷ 100) × dias`.
- Tema claro/escuro persistido.
- Breadcrumb, tooltips de ajuda, loaders com fundo ofuscado, SweetAlert2.
- SEO/GA4/GTM/JSON-LD, sitemap e robots.
- Conformidade LGPD/GDPR/CCPA/POPIA com banner de consentimento e Consent Mode.
- Página de contato com WhatsApp e e-mail (sem formulário/iframe).
- Páginas de erro (404 e genérica).
- Segurança via `.htaccess` (HTTPS, CSP, headers, SPA fallback).

## Deploy

Veja [DEPLOY.md](./DEPLOY.md) para publicação em hospedagem compartilhada (HostGator).
