# 🧮 Calculadora Freelancer

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Vue](https://img.shields.io/badge/Vue-3.5-42b883.svg)
![Vite](https://img.shields.io/badge/Vite-6-646cff.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6.svg)

Ferramenta profissional e gratuita para freelancers precificarem serviços: valor/hora,
orçamento de projetos, prazos e geração de propostas. Todos os cálculos são feitos localmente
no navegador. Sistema desenvolvido pelo desenvolvedor **HOTWYL | WILLFROMBRASIL** para o
**Grupo 3W Online**.

## ✨ Funcionalidades

- 💰 Cálculo de Valor/Hora (metas, jornada e margem de lucro)
- 📊 Orçamento de Projetos com ajuste por complexidade
- ⏱️ Cálculo de Prazos com base na disponibilidade
- 📄 Prévia de Propostas comerciais
- 🌗 Tema claro/escuro, breadcrumb, tooltips e loader global
- 🍪 Consentimento de cookies (LGPD, GDPR, CCPA, POPIA) com Google Consent Mode

## 🚀 Stack

Vue 3 · Vite · TypeScript · Tailwind CSS · Vue Router · Pinia · Zod · vee-validate ·
VueUse · @vueuse/motion · Iconify · ApexCharts · Maska · vue-i18n · Fuse.js · CASL ·
DOMPurify · SweetAlert2 · Font Awesome · @sentry/vue · Vitest · Playwright · ESLint · Prettier.

## 🛠️ Desenvolvimento

```bash
npm install         # instala dependências
npm run dev         # servidor de desenvolvimento (porta 8080)
npm run build       # type-check + build de produção (gera /dist)
npm run preview     # pré-visualiza o build
npm run lint        # ESLint + correções
npm run format      # Prettier
npm run test        # testes unitários (Vitest)
npm run test:e2e    # testes end-to-end (Playwright)
```

Pré-requisitos: Node.js 20+.

## ⚙️ Base path / subdiretório

A aplicação roda no subdiretório `/calculadora_freelance/`. Os pontos de configuração são:

- `vite.config.ts` → `base: '/calculadora_freelance/'`
- `package.json` → `"homepage": "/calculadora_freelance/"`
- `src/router/index.ts` → `createWebHistory('/calculadora_freelance/')`
- `public/manifest.json` → `start_url` e `scope`
- `.env` → `VITE_BASE_URL`

## 📦 Deploy em hospedagem compartilhada (HostGator)

1. Gere o build:
   ```bash
   npm run build
   ```
2. Envie **todo o conteúdo** da pasta `dist/` para o diretório
   `public_html/calculadora_freelance/` no servidor (via FTP ou Gerenciador de Arquivos).
3. O arquivo `.htaccess` já vai incluído no build e cuida de:
   - fallback de rotas do Vue Router para `index.html` (SPA);
   - cabeçalhos de segurança (CSP, HSTS, X-Frame-Options, etc.);
   - compressão GZIP e cache de assets.
4. Garanta que o domínio use HTTPS (a HSTS assume conexão segura).

> Se o app for servido em outro subdiretório, ajuste os pontos da seção anterior e
> a `RewriteBase` dentro do `.htaccess`.

## 🔒 Segurança e privacidade

- Cálculos processados 100% no navegador — nenhum dado é enviado a servidores.
- Sanitização de HTML dinâmico com DOMPurify (proteção contra XSS).
- Cabeçalhos de segurança e CSP via `.htaccess`.
- Conformidade com LGPD, GDPR, CCPA e POPIA, com gestão de consentimento de cookies.
- `autocomplete="off"` em todos os campos de formulário.

## 📊 SEO / GEO / AEO

- Meta tags completas (Open Graph, Twitter Cards, Schema.org WebApplication).
- Meta tags de geolocalização (geo.region, ICBM).
- Título, descrição e canonical dinâmicos por rota.
- Google Analytics 4 e Google Tag Manager integrados.
- `sitemap.xml` e `robots.txt` otimizados.

## 👥 Desenvolvido por

**Grupo 3W Online** — desenvolvimento de sites e sistemas personalizados sob demanda.

- 🌐 [www.3wonline.com.br](https://www.3wonline.com.br)
- 💬 WhatsApp: (41) 99692-4829
- 📧 contato@3wonline.com.br
- 👨‍💻 Desenvolvedor: **HOTWYL | WILLFROMBRASIL**
