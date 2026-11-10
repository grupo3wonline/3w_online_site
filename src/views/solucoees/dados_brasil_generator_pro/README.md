# Dados Brasil Generator Pro

Plataforma gratuita para **gerar e validar documentos brasileiros** (CPF, CNPJ, RG, CNH e mais de 40 ferramentas) para testes de software. 100% no navegador, sem cadastro, com foco em privacidade.

Desenvolvido por **HOTWYL | WILLFROMBRASIL** — [Grupo 3w Online](https://www.3wonline.com.br).

## Stack

Vue 3 · Vite · TypeScript · Vue Router · Pinia · Tailwind CSS · vue-i18n (pt-BR) · VueUse · @vueuse/motion · vee-validate · Zod · Maska · date-fns · Fuse.js · @iconify/vue · SweetAlert2 · @sentry/vue · Vitest · Playwright · ESLint · Prettier · Husky.

## Scripts

```bash
npm install          # instala dependências
npm run dev          # servidor de desenvolvimento (http://localhost:5173/dados_brasil_generator_pro/)
npm run build        # gera sitemap + type-check + build de produção (dist/)
npm run preview      # pré-visualiza o build
npm run test         # testes unitários (Vitest)
npm run test:e2e     # testes end-to-end (Playwright)
npm run lint         # ESLint + correções
npm run format       # Prettier
```

## Arquitetura

```
src/
├── assets/          # CSS global (tema claro/escuro via CSS vars)
├── components/
│   ├── common/      # CookieBanner, LoadingOverlay, CTA, Error/Legal layouts, HelpButton, ScrollToTop
│   ├── layout/      # AppNavbar, AppFooter, AppBreadcrumb
│   ├── tools/       # SimpleGenerator, ValidatorLayout, ResultList, DataCardResult, ToolCard, ToolPageLayout
│   └── ui/          # BaseButton, BaseCard, BaseTooltip, InfoBox, HelpTip, ThemeToggle
├── composables/     # useSeo (meta tags por rota)
├── config/          # siteConfig
├── data/            # tools.ts — registro central das ferramentas (fonte única)
├── i18n/            # pt-BR
├── lib/             # brazil-generators, validators, dev-tools, markdown, alerts, utils
├── pages/           # HomeView, ToolsView, AboutView, ContactView, legal/, errors/, tools/ (42)
├── plugins/         # sentry
├── router/          # rotas (base /dados_brasil_generator_pro/)
└── stores/          # theme, ui (loading), consent (LGPD)
```

Para adicionar uma ferramenta nova, basta registrar em `src/data/tools.ts` e criar o componente correspondente em `src/pages/tools/`. Rotas, menus, busca e sitemap se atualizam automaticamente.

## Deploy — Hostgator (hospedagem compartilhada)

O app é servido no subdiretório **`/dados_brasil_generator_pro/`** (configurado em `vite.config.ts`, `package.json` e no Vue Router).

1. Gere o build:
   ```bash
   npm run build
   ```
2. Envie **todo o conteúdo da pasta `dist/`** (incluindo o arquivo oculto `.htaccess`) para:
   ```
   public_html/dados_brasil_generator_pro/
   ```
   via cPanel File Manager ou FTP. Certifique-se de que o `.htaccess` foi enviado (habilite "mostrar arquivos ocultos" no cliente FTP).
3. Acesse: `https://www.3wonline.com.br/dados_brasil_generator_pro/`

O `.htaccess` já cuida do roteamento SPA (history mode), cabeçalhos de segurança, GZIP e cache. Se hospedar em outro subdiretório, ajuste o `base` em `vite.config.ts`, o `basePath` em `src/config/site.ts` e o `RewriteBase` no `.htaccess`.

## Estrutura de navegação

A página inicial é um **hotsite único** que unifica Início, Sobre, Serviços, a vitrine de Ferramentas e Contato em seções âncora (`#ferramentas`, `#sobre`, `#servicos`, `#contato`). As rotas antigas (`/ferramentas`, `/sobre`, `/servicos`, `/contato`) redirecionam para essas âncoras. As **42 ferramentas** continuam com páginas próprias (`/ferramentas/{slug}`) para performance e SEO, acessadas pela vitrine na home.

## Conformidade e segurança

- Privacidade: **LGPD, GDPR, CCPA, POPIA** — consentimento opt-in (Google Consent Mode v2, padrão negado). Ver `/privacidade` e `/cookies`.
- Processamento 100% local: nenhum dado gerado/digitado é enviado a servidores.
- Detalhes de segurança em [`SECURITY.md`](./SECURITY.md).

## Analytics

GA4 (`G-J06THXX0MW`) e GTM (`GTM-WVMJV7G6`) configurados em `index.html`, disparando apenas após consentimento.

## Pendências opcionais

- `public/og-image.jpg` (1200×630) e `public/apple-touch-icon.png` (180×180) são referenciados nas meta tags mas ainda não foram criados. Adicione-os para melhorar o compartilhamento em redes sociais e o ícone no iOS.
