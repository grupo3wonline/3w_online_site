# DevPlayground — Editor de Código Online

**DevPlayground** é uma plataforma moderna para escrever, testar e visualizar código HTML, CSS,
JavaScript e PHP diretamente no navegador, com preview em tempo real, console integrado e interface
responsiva (mobile first). Desenvolvido pela **Grupo 3w Online**.

> Sistema desenvolvido pelo desenvolvedor **HOTWYL | WILLFROMBRASIL**.

## ✨ Características

- Landing page (hotsite) unificada com seções de benefícios, recursos, casos de uso, serviços e contato
- Editor com HTML, CSS, JavaScript e PHP + preview ao vivo e console integrado
- Tema claro/escuro com persistência
- Overlay de carregamento com fundo ofuscado durante o processamento
- Breadcrumb, tooltips e botões de ajuda ao longo da interface
- Conformidade com LGPD, GDPR, CCPA e POPIA (banner de cookies + política)
- SEO/SEM/GEO/AEO: meta tags, Open Graph, Twitter Cards, JSON-LD, GA4 e GTM
- Páginas de erro (403, 404, 500)

## 🧱 Stack

- **Vue 3** + **Vite** + **TypeScript**
- **Tailwind CSS** (design tokens claro/escuro)
- **Vue Router** (history mode com base path) e **Pinia**
- **VueUse** (`@vueuse/core`) e **@vueuse/motion**
- **Iconify** (`@iconify/vue`), **SweetAlert2**, **Fuse.js** (busca)
- **vue-i18n** (pt-BR), **@sentry/vue** (monitoramento opcional)
- **Vitest** (unitário) e **Playwright** (E2E)
- **ESLint** + **Prettier** + **Husky** + **lint-staged**

## 🚀 Scripts

```sh
npm install          # instalar dependências
npm run dev          # servidor de desenvolvimento (front-end)
npm run dev:php      # servidor PHP embutido p/ o editor (rodar em OUTRO terminal)
npm run build        # build de produção (type-check + vite build)
npm run preview      # pré-visualizar o build
npm run lint         # lint + fix
npm run format       # formatar com Prettier
npm run test:unit    # testes unitários (Vitest)
npm run test:e2e     # testes E2E (Playwright)
```

## 📁 Estrutura

```
src/
├── assets/          # CSS global e design tokens
├── components/
│   ├── common/      # ErrorState, LoadingOverlay, CookieConsent, ThemeToggle, HelpButton, Breadcrumb
│   ├── landing/     # Seções da landing page (hotsite)
│   ├── layout/      # Navbar e Footer
│   ├── legal/       # Shell das páginas legais
│   ├── playground/  # Editor: CodeEditor, PreviewPane, Console, PhpOutput, TemplateLibrary, ExportMenu
│   └── ui/          # BaseButton, BaseTooltip
├── composables/     # useHead (SEO por rota)
├── config/          # site.ts (dados da empresa, contato, analytics)
├── i18n/            # internacionalização pt-BR
├── layouts/         # DefaultLayout, FullScreenLayout
├── lib/             # alerts, php-runner, templates, utils
├── pages/           # LandingPage, PlaygroundPage, TermosUso, PoliticaPrivacidade, errors/
├── router/          # rotas (lazy loading)
└── stores/          # theme, ui (Pinia)

public/
├── api/execute-php.php   # executor PHP nativo (HostGator)
├── .htaccess             # SPA + segurança (Apache)
├── favicon.svg, manifest.json, robots.txt, sitemap.xml
```

## 🌐 Deploy em Hospedagem Compartilhada (HostGator)

A aplicação é servida no subdiretório **`/dev_playground/`**.

1. Gere o build de produção:

   ```sh
   npm run build
   ```

2. Envie **todo o conteúdo da pasta `dist/`** para a pasta `public_html/dev_playground/` da HostGator
   (via FTP ou Gerenciador de Arquivos).

3. O arquivo **`.htaccess`** já incluído no build cuida do roteamento SPA (history mode), dos
   cabeçalhos de segurança, da compressão e do cache.

4. A execução de PHP usa o endpoint **`api/execute-php.php`**, que roda no PHP nativo do servidor.
   Requer que `proc_open` esteja habilitado (padrão na maioria dos planos HostGator).

### Executar PHP em desenvolvimento

O dev server do Vite **não executa PHP**. Para testar o editor PHP localmente, rode em
dois terminais:

```sh
npm run dev:php   # sobe php -S localhost:8000 servindo a pasta public/
npm run dev       # sobe o Vite (as chamadas /api são encaminhadas ao PHP via proxy)
```

Requer o PHP CLI instalado e disponível no PATH (`php -v`). Em produção (HostGator/Apache)
nada disso é necessário — o `.htaccess` já mantém `api/` fora do fallback SPA e o Apache
executa o PHP diretamente.

### Configuração do subdiretório

O base path já está configurado em:

- `vite.config.ts` → `base: '/dev_playground/'`
- `package.json` → `"homepage": "/dev_playground/"`
- `src/router/index.ts` → `createWebHistory(import.meta.env.BASE_URL)`

## 🔒 Privacidade e Segurança

- CSP e cabeçalhos de segurança via `.htaccess`
- Execução de código em iframe com `sandbox`
- Endpoint PHP com verificação de origem, funções perigosas desabilitadas e limites de tempo/memória
- Conformidade LGPD/GDPR/CCPA/POPIA

## 🏢 Contato — Grupo 3w Online

Desenvolvemos sites e sistemas personalizados sob demanda.

- WhatsApp: **(41) 99692-4829**
- E-mail: **contato@3wonline.com.br**
- Site: **https://www.3wonline.com.br**

---

© 2026 DevPlayground — Todos os direitos reservados.
