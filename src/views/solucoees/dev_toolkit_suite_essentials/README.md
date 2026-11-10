# Dev Toolkit Suite Essentials

Suíte gratuita de ferramentas para desenvolvedores, 100% no navegador — sem enviar seus dados a servidores. Uma iniciativa do **Grupo 3w Online**.

Ferramentas incluídas: **Formatador JSON/XML**, **Base64**, **Gerador MD5**, **Visualizador de Markdown**, **Formatador de Strings**, **Conversor de Arquivos** (CSV/JSON/XML/XLS/XLSX), **Gerador de UUID**, **Decodificador JWT** e **Gerador de Senhas**.

## Stack

- **Vue 3** + **Vite 6** + **TypeScript**
- **Vue Router** (History API) e **Pinia**
- **Tailwind CSS** + **radix-vue** (shadcn-vue) + **Iconify**
- **VueUse** e **@vueuse/motion** (animações)
- **vee-validate** + **Zod** (validação)
- **vue-i18n** (pt-BR), **date-fns**, **maska**, **Fuse.js** (busca)
- **Zod** (validação de dados de entrada), **CASL** (permissões), **@sentry/vue** (monitoramento opcional)
- **SweetAlert2** (alertas), **marked** (Markdown), **xlsx** + **papaparse** (planilhas), **mime** + **file-type** (validação de arquivos)
- **Web Crypto API** para geração segura de UUID e senhas
- Qualidade: **ESLint**, **Prettier**, **Husky** + **lint-staged**
- Testes: **Vitest** (unitários) e **Playwright** (e2e)

## Requisitos

- Node.js >= 18

## Desenvolvimento

```sh
npm install
npm run dev
```

A aplicação roda sob o caminho base `/dev_toolkit_suite_essentials/`.

## Scripts

| Script | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Type-check + build de produção (gera `dist/`) |
| `npm run preview` | Pré-visualiza o build |
| `npm run lint` | ESLint com correção automática |
| `npm run format` | Formata com Prettier |
| `npm run type-check` | Checagem de tipos |
| `npm test` | Testes unitários (Vitest) |
| `npm run test:coverage` | Cobertura de testes |
| `npm run test:e2e` | Testes end-to-end (Playwright) |

## Estrutura

```
src/
  components/
    ui/         # componentes base (shadcn-vue / radix-vue)
    common/     # componentes reutilizáveis (Breadcrumb, ToolShell, etc.)
    layout/     # AppHeader, AppFooter, AppLayout
  composables/  # useTheme, useSeo, useClipboard
  config/       # site.ts — fonte única (empresa, ferramentas, navegação)
  i18n/         # traduções pt-BR
  lib/          # utilitários puros (md5, markdown, stringFormat, download, datetime)
  plugins/      # ability (CASL), sentry
  router/       # rotas + meta SEO/breadcrumb
  stores/       # Pinia (ui, consent)
  views/        # páginas (Home, Tools, tools/*, legal/*, errors/*)
```

## Segurança e privacidade

- Processamento **local-first**: o conteúdo das ferramentas não sai do navegador.
- Markdown com HTML escapado antes do parse (anti-XSS).
- Validação de **magic bytes** no conversor de arquivos (`file-type`).
- Cabeçalhos de segurança e **CSP** configurados no `.htaccess`.
- Consentimento de cookies (LGPD/GDPR/CCPA/POPIA) com **Consent Mode v2** do Google.

## Analytics (GEO/Marketing)

Já integrados no `index.html`: Google Tag Manager (`GTM-WVMJV7G6`) e Google Analytics 4 (`G-J06THXX0MW`), com consentimento negado por padrão até o aceite do usuário. Para o Google Search Console, adicione a meta tag de verificação no `index.html` ou valide via DNS.

## Deploy na HostGator (hospedagem compartilhada)

1. Gere o build:
   ```sh
   npm run build
   ```
2. Envie **todo o conteúdo da pasta `dist/`** para o subdiretório `dev_toolkit_suite_essentials/` dentro de `public_html` no servidor (via File Manager ou FTP).
   - O arquivo `.htaccess` já vai incluído no `dist/` e cuida do fallback de rotas do SPA e dos cabeçalhos de segurança.
3. Estrutura final esperada no servidor:
   ```
   public_html/
     dev_toolkit_suite_essentials/
       index.html
       .htaccess
       assets/...
       sitemap.xml, robots.txt, manifest.webmanifest, favicon.svg
   ```
4. Confirme que o HTTPS está ativo. O `.htaccess` já envia HSTS.

> Observação: o caminho base está fixado em `/dev_toolkit_suite_essentials/` em `vite.config.ts`, no router e no `.htaccess`. Se mudar o subdiretório, atualize os três.

## Desenvolvedor

Sistema desenvolvido pelo desenvolvedor **HOTWYL | WILLFROMBRASIL** — [Grupo 3w Online](https://www.3wonline.com.br).
