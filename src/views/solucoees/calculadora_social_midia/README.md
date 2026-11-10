# Calculadora de Redes Sociais

> Ferramenta profissional e gratuita para calcular o valor ideal dos serviços de gestão de redes sociais.

## 🚀 Sobre o Projeto

A **Calculadora de Redes Sociais** é uma aplicação web moderna (Vue 3) que ajuda profissionais de social media, freelancers e agências a precificar seus serviços com base em dados de mercado. A página inicial é uma landing page em formato hotsite que unifica Home, Sobre e Serviços.

### Funcionalidades

- ✅ Cálculo de preços com validação (Zod)
- ✅ Interface responsiva (Mobile First)
- ✅ Processamento 100% local (dados não saem do navegador)
- ✅ Tema claro/escuro com persistência
- ✅ Breadcrumb com structured data
- ✅ Loading overlay com fundo ofuscado
- ✅ SweetAlert2 para alertas, tooltips informativos
- ✅ Conformidade LGPD, GDPR, CCPA e POPIA
- ✅ SEO / SEM / GEO / AEO (meta tags + JSON-LD)
- ✅ Páginas de erro (404 / 403 / 500 / 503)

## 🛠️ Stack Tecnológica

| Tecnologia | Uso |
|-----------|-----|
| Vue 3 + Vite + TypeScript | Base da aplicação |
| Tailwind CSS | Estilos (design tokens HSL) |
| Vue Router | Roteamento (history mode) |
| Pinia | Estado (tema, loading) |
| Zod + vee-validate | Validação |
| VueUse + @vueuse/motion | Reatividade e animações |
| @iconify/vue | Ícones (Lucide + Font Awesome 6) |
| vue-i18n | Internacionalização (pt-BR) |
| SweetAlert2 | Alertas |
| date-fns, Fuse.js, Maska, CASL | Utilitários |
| @sentry/vue | Monitoramento (produção) |
| Vitest + @vue/test-utils | Testes unitários |
| Playwright | Testes E2E |
| ESLint + Prettier + Husky + lint-staged | Qualidade de código |

## 📁 Estrutura do Projeto

```
src/
├── components/          # Navbar, Footer, Cookie, Breadcrumb, Loading, ThemeToggle, BackToTop, Calculator
├── layouts/             # DefaultLayout (cabeçalho + rodapé em todas as páginas)
├── pages/               # HomePage, FerramentasPage, ContatoPage, Termos, Privacidade, NotFound, ErrorPage
├── stores/              # theme, loading (Pinia)
├── composables/         # useSeo
├── lib/                 # utils (SITE, cn, formatCurrency), calculator (lógica pura)
├── i18n/                # configuração pt-BR
├── router/              # rotas
├── App.vue
├── main.ts
└── index.css            # design system
tests/
├── unit/                # Vitest
└── e2e/                 # Playwright
```

## 🔧 Instalação e Execução

```bash
npm install          # instala dependências
npm run dev          # desenvolvimento
npm run build        # build de produção (type-check + vite build)
npm run preview      # preview do build
npm run lint         # ESLint --fix
npm run test         # testes unitários (Vitest)
npm run test:e2e     # testes E2E (Playwright)
```

## 🌐 SEO & Marketing

- Google Analytics 4 (GA4): `G-J06THXX0MW`
- Google Tag Manager (GTM): `GTM-WVMJV7G6`
- Open Graph, Twitter Cards, Schema.org (WebApplication, Organization, FAQPage, BreadcrumbList)
- Meta tags GEO (região BR) e AEO (FAQ)
- robots.txt e manifest PWA

## 🔒 Segurança

- Cabeçalhos de segurança e CSP no `.htaccess` (X-Frame-Options, HSTS, CSP)
- `autocomplete="off"` nos inputs
- Processamento local de dados
- Sentry opcional em produção (via `VITE_SENTRY_DSN`)

## 📋 Base Path

A aplicação roda em `/calculadora_social_midia/`:
- `vite.config.ts`: `base: '/calculadora_social_midia/'`
- `package.json`: `homepage: '/calculadora_social_midia/'`
- Vue Router: `createWebHistory('/calculadora_social_midia/')`

## 🚀 Deploy (HostGator - hospedagem compartilhada)

1. Rode `npm run build`.
2. Envie o conteúdo da pasta `dist/` para o diretório `public_html/calculadora_social_midia/`.
3. O arquivo `.htaccess` (já incluído em `public/` e copiado para `dist/`) cuida do roteamento SPA, HTTPS e cabeçalhos de segurança.

## 🏢 Desenvolvido por

Sistema desenvolvido pelo desenvolvedor **HOTWYL | WILLFROMBRASIL** — **Grupo 3W Online**, sites e sistemas personalizados sob demanda.

🌐 [www.3wonline.com.br](https://www.3wonline.com.br) · 📱 WhatsApp (41) 99692-4829 · ✉️ contato@3wonline.com.br
