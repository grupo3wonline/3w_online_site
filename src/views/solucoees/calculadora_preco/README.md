# Calculadora de Preços — Grupo 3w Online

Aplicação web para precificação de produtos e serviços, construída em **Vue 3 + Vite + TypeScript**. Página inicial em formato hotsite/landing, calculadora de preços com gráfico de composição, tema claro/escuro, SEO completo e conformidade com LGPD/GDPR/CCPA/POPIA.

Servida em subdiretório: **`/calculadora_preco/`**.

## Stack

- **Vue 3** (Composition API, `<script setup>`) + **Vite 5** + **TypeScript**
- **Tailwind CSS** + **shadcn-vue** (reka-ui) — design system com tokens HSL
- **Vue Router** (history, base `/calculadora_preco/`, lazy loading)
- **Pinia** (tema, loading, consentimento)
- **vee-validate + Zod** (validação do formulário)
- **@unhead/vue** (SEO por rota) · **vue-i18n** (pt-BR)
- **@iconify/vue** + Font Awesome (ícones) · **@vueuse/core** e **@vueuse/motion**
- **ApexCharts** (gráfico de composição do preço) · **SweetAlert2** (alertas) · **Maska**
- **@sentry/vue** (observabilidade, via env)
- **ESLint + Prettier + Husky + lint-staged**
- **Vitest** (unit) + **Playwright** (E2E)

## Scripts

```bash
npm install          # instala dependências
npm run dev          # servidor de desenvolvimento (porta 8080)
npm run build        # type-check (vue-tsc) + build de produção
npm run preview      # pré-visualiza o build
npm run lint         # ESLint
npm run format       # Prettier
npm test             # testes unitários (Vitest)
npm run test:e2e     # testes E2E (Playwright)
```

## Variáveis de ambiente

Copie `.env.example` para `.env` e ajuste:

- `VITE_BASE_URL` — base da aplicação (`/calculadora_preco/`)
- `VITE_SITE_URL` — URL pública (canonical/OG)
- `VITE_GA_ID` / `VITE_GTM_ID` — Google Analytics 4 / Tag Manager
- `VITE_SENTRY_DSN` — DSN do Sentry (vazio desativa)

## Estrutura

```
src/
├── components/   # ui (shadcn-vue), layout, common, sections, calculator
├── composables/  # useCalculator, useSeo
├── layouts/      # DefaultLayout
├── lib/          # utils, seo, analytics, sentry
├── locales/      # pt-BR
├── pages/        # LandingPage, CalculadoraPage, Termos, Privacidade, 404, Erro
├── router/       # rotas + meta SEO
├── stores/       # theme, ui, consent
└── styles/       # design system (Tailwind + tokens HSL)
```

## Deploy (HostGator — hospedagem compartilhada)

1. `npm run build` gera a pasta `dist/`.
2. Envie o conteúdo de `dist/` para a pasta `/calculadora_preco/` no servidor.
3. O `public/.htaccess` (incluído no build) cuida do rewrite da SPA e dos cabeçalhos de segurança.

## Testes

- Unitários: lógica de cálculo, utilitários e stores (Vitest).
- E2E: navegação de todas as rotas, fluxo da calculadora, tema, cookies e presença de cabeçalho/rodapé (Playwright — Chromium e mobile).

---

Sistema desenvolvido pelo desenvolvedor **HOTWYL | WILLFROMBRASIL** · [Grupo 3w Online](https://www.3wonline.com.br)
