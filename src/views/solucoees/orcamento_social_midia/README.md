# 🧮 Calculadora de Orçamento para Social Mídia

Ferramenta profissional e gratuita para criação de orçamentos de social mídia, com landing page em formato hotsite, calculadora com geração de PDF, tema claro/escuro e conformidade com as principais leis de privacidade.

> Sistema desenvolvido pelo desenvolvedor **HOTWYL | WILLFROMBRASIL** — © Grupo 3w Online.

## ✨ Destaques

- ⚡ **Vue 3 + Vite + TypeScript** com abordagem **mobile first**
- 🎨 UI moderna com **Tailwind CSS**, tema **claro/escuro** e animações (`@vueuse/motion`)
- 🧮 Calculadora de orçamentos com **geração de PDF** (jsPDF) e validação **Zod**
- 🔎 **SEO/SEM/GEO/AEO**: meta tags dinâmicas, Open Graph, Twitter Cards, JSON-LD (WebApplication + FAQ + Breadcrumb), sitemap e robots
- 📊 **Geomarketing**: Google Tag Manager (GTM) + Google Analytics 4 (GA4)
- 🛡️ **Segurança**: sanitização de entradas, cabeçalhos de segurança (CSP, HSTS, nosniff), CASL para controle de acesso
- 🍪 **Privacidade**: banner de consentimento granular em conformidade com **LGPD, GDPR, CCPA e POPIA**
- 🌐 100% em **português (pt-BR)** com `vue-i18n`
- ♿ Acessibilidade: skip-link, foco visível, ARIA, tooltips de ajuda
- 🧪 Testes **Vitest** (unitários) e **Playwright** (e2e: navegação, fluxo, SEO, tema)

## 🛠️ Stack

Stack enxuta: apenas o que a aplicação realmente usa (sem dependências mortas).

| Camada | Tecnologias |
| --- | --- |
| Core | Vue 3, Vite 6, TypeScript, Vue Router, Pinia |
| UI | Tailwind CSS, @iconify/vue (ícones fa6 offline), SweetAlert2, @vueuse/motion |
| Dados/Validação | Zod, VueUse |
| Recursos | jsPDF (geração de PDF) |
| Observabilidade | @sentry/vue (opcional, só em produção com DSN) |
| Qualidade | ESLint, Prettier, Husky + lint-staged, Vitest, Playwright |

Os ícones são registrados **offline** (sem chamadas de rede em runtime) em `src/plugins/icons.ts`,
carregando apenas os ícones efetivamente usados — mantendo o bundle leve.

## 📦 Scripts

```bash
npm install          # instala dependências
npm run dev          # servidor de desenvolvimento (http://localhost:8080/orcamento_social_midia/)
npm run build        # type-check + build de produção (gera dist/)
npm run preview      # pré-visualização do build
npm run lint         # ESLint com --fix
npm run format       # Prettier
npm run test         # testes unitários (Vitest)
npm run test:e2e     # testes end-to-end (Playwright)
```

## 🔧 Configuração de ambiente

Copie `.env.example` para `.env` e ajuste os valores:

```bash
VITE_APP_URL=https://app.3wonline.com/orcamento_social_midia/
VITE_GTM_ID=GTM-WVMJV7G6
VITE_GA4_ID=G-J06THXX0MW
VITE_SENTRY_DSN=              # opcional (produção)
VITE_WHATSAPP=(41) 99692-4829
VITE_EMAIL=contato@3wonline.com.br
```

## 📂 Estrutura

```
src/
├── assets/styles/      # design system (Tailwind + tokens de tema)
├── components/
│   ├── layout/         # AppLayout, TheNavbar, TheFooter, TheBreadcrumb, CookieBanner, CtaSection
│   └── ui/             # LoadingOverlay, HelpTooltip, ThemeToggle
├── composables/        # useSeo, useCalculator
├── config/             # site.ts (fonte única de metadados e contatos)
├── lib/                # security, format, pdf
├── pages/              # HomePage (hotsite unificado), CalculatorPage, PrivacyPolicyPage, TermsPage
│   └── errors/         # 404, 403, 500
├── plugins/            # sentry, icons (registro offline de ícones)
├── router/             # rotas com base /orcamento_social_midia/ e meta SEO
├── stores/             # theme, loading (Pinia)
├── App.vue
└── main.ts
e2e/                    # testes Playwright + preview-server.mjs (fallback SPA)
```

## 🚀 Deploy na HostGator (subdiretório)

A aplicação roda em `/orcamento_social_midia/`. Configuração já aplicada:

- `vite.config.ts` → `base: '/orcamento_social_midia/'`
- `package.json` → `homepage: '/orcamento_social_midia/'`
- Vue Router → `createWebHistory('/orcamento_social_midia/')`
- `public/.htaccess` → fallback SPA, HTTPS, cabeçalhos de segurança, gzip e cache

Passos:

```bash
npm run build
# Envie TODO o conteúdo de dist/ (incluindo .htaccess) para:
#   public_html/orcamento_social_midia/
```

O `.htaccess` gerado garante que rotas como `/orcamento_social_midia/calculadora`
sejam entregues ao `index.html` (roteamento client-side).

## 🔐 Privacidade e conformidade

O banner de cookies permite aceitar/rejeitar categorias (necessários, analíticos, marketing),
atendendo LGPD (BR), GDPR (UE), CCPA (EUA) e POPIA (ZA). Todo o processamento da calculadora
é local (client-side); nenhum dado do orçamento é enviado a servidores.

## 👥 Desenvolvido por

**Grupo 3w Online** — desenvolvemos sites e sistemas personalizados sob demanda.

- 🌐 [www.3wonline.com.br](https://www.3wonline.com.br)
- 📧 contato@3wonline.com.br
- 💬 WhatsApp: (41) 99692-4829

Desenvolvimento: **HOTWYL | WILLFROMBRASIL**

## 📄 Licença

© 2026 Grupo 3w Online. Todos os direitos reservados.
