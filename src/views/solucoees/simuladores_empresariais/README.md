# Simuladores Empresariais Pro

Suíte gratuita de simuladores financeiros para empresas — **orçamento empresarial**, **orçamento de marketing** e **saúde da empresa** (ROI, CAC, LTV, EBITDA, valuation e +40 indicadores). Aplicação SPA, processamento 100% local no navegador.

Desenvolvido pelo desenvolvedor **HOTWYL | WILLFROMBRASIL** — projeto do **Grupo 3w Online**.

## Stack

- **Vue 3** + **Vite** + **TypeScript**
- **Vue Router** (history mode, base `/simuladores_empresariais/`) + **Pinia**
- **Tailwind CSS** (mobile-first) + componentes estilo shadcn-vue
- **Iconify** (`@iconify/vue`) + **Font Awesome** (CDN) + **SweetAlert2**
- **vee-validate** + **Zod**, **Maska**, **VueUse** + **@vueuse/motion**, **date-fns**
- **ApexCharts** (`vue3-apexcharts`), **Fuse.js**, **vue-i18n** (pt-BR)
- **@sentry/vue** (opcional via `VITE_SENTRY_DSN`)
- **Vitest** (unitário) + **Playwright** (E2E)
- **ESLint** + **Prettier** + **Husky** + **lint-staged**

## Scripts

```bash
npm install         # instala dependências
npm run dev         # desenvolvimento (porta 8080)
npm run build       # checagem de tipos + build de produção (dist/)
npm run preview     # pré-visualiza o build
npm run test        # testes unitários (Vitest)
npm run test:e2e    # testes E2E (Playwright)
npm run lint        # ESLint + correções
npm run format      # Prettier
```

## Estrutura

```
src/
  assets/        estilos globais (design system)
  components/
    layout/      Header, Footer, Breadcrumb, LoadingOverlay, CookieConsent
    simuladores/ os 3 simuladores
    ui/          componentes base (Button, Card, Input, Select, ...)
  composables/   useSeo, useAlerta
  lib/           calculos.ts (lógica pura, testada), utils.ts
  router/        rotas + metadados SEO
  stores/        theme, loading (Pinia)
  views/         páginas (Home hotsite, Ferramenta, Contato, Termos, Privacidade, 404)
```

## SEO / Analytics

- Metadados por rota (title, description, canonical, Open Graph, Twitter) via `useSeo`.
- Dados estruturados JSON-LD (WebApplication + BreadcrumbList).
- Google Analytics 4 (`G-J06THXX0MW`) e Google Tag Manager (`GTM-WVMJV7G6`) no `index.html`.
- `sitemap.xml` e `robots.txt` em `public/`.

## Privacidade e segurança

- Conformidade **LGPD, GDPR, CCPA e POPIA** (banner de consentimento + política).
- Dados dos simuladores processados apenas no cliente; nada é enviado ou armazenado.
- Cabeçalhos de segurança (CSP, HSTS, X-Frame-Options, etc.) no `.htaccess`.

## Deploy (HostGator / Apache)

1. `npm run build`
2. Envie **todo o conteúdo de `dist/`** para a pasta `/simuladores_empresariais/` no servidor.
3. O `.htaccess` (já incluído no build) cuida do roteamento SPA, headers de segurança, compressão e cache.
4. A aplicação ficará disponível em `https://SEU_DOMINIO/simuladores_empresariais/`.

> Para monitoramento de erros, copie `.env.example` para `.env` e informe `VITE_SENTRY_DSN`.
```
```
