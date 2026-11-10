# Calculadora de Indicadores Financeiros

Aplicação Vue 3 + Vite + TypeScript para análise da saúde financeira de empresas
(EBITDA, ROE, ROA, P/L, EV/EBITDA, Margem de Lucro, Dividend Yield, Liquidez).
Todo o cálculo roda no navegador — nenhum dado financeiro é enviado a servidores.

Desenvolvido por **HOTWYL | WILLFROMBRASIL** · Grupo 3W Online.

## Stack

- Vue 3 (`<script setup>`), Vite, TypeScript
- Tailwind CSS, tema claro/escuro
- Vue Router (history mode), Pinia
- Zod + vee-validate, Maska (máscara de moeda)
- VueUse, @vueuse/motion, date-fns, vue-i18n
- ApexCharts (gráfico), SweetAlert2 (alertas), Iconify (ícones)
- @sentry/vue (monitoramento opcional)
- ESLint, Prettier, Husky + lint-staged
- Vitest (unit) e Playwright (E2E)

## Scripts

```bash
npm install
npm run dev          # servidor de desenvolvimento
npm run build        # type-check + build de produção (dist/)
npm run preview      # pré-visualização do build
npm run test:unit    # testes unitários (Vitest)
npm run test:e2e     # testes E2E (Playwright)
npm run lint         # ESLint --fix
npm run format       # Prettier
```

## Configuração

Variáveis em `.env` (veja `.env.example`):

- `VITE_SITE_URL` — URL canônica do site
- `VITE_GTM_ID` — ID do Google Tag Manager
- `VITE_GA4_ID` — ID do Google Analytics 4
- `VITE_SENTRY_DSN` — DSN do Sentry (opcional)

Analytics (GTM/GA4) só carrega após o consentimento do usuário (LGPD/GDPR/CCPA/POPIA).

## Deploy (HostGator — subdiretório)

O app é servido em `/calculadora_indicadores_financeiros/`. O `base` está
configurado em `vite.config.ts`, no `router` e no `manifest.json`.

1. `npm run build`
2. Envie o conteúdo de `dist/` para a pasta
   `public_html/calculadora_indicadores_financeiros/` no HostGator.
3. O `.htaccess` (incluído no build via `public/`) cuida do rewrite do SPA e dos
   cabeçalhos de segurança.

## Estrutura

```
src/
  assets/         estilos globais (Tailwind)
  components/     header, footer, breadcrumb, cards, overlays, banner
  composables/    useSeo
  i18n/           mensagens pt-BR
  layouts/        DefaultLayout (header/footer em todas as páginas)
  lib/            calculator, format, analytics, sentry, fieldMeta
  router/         rotas com base path
  stores/         Pinia (theme, consent, ui, calculator)
  views/          Home (hotsite), Calculadora, Privacidade, 404
e2e/              testes Playwright
```
