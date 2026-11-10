# DevStart Academy

Plataforma educacional gamificada para aprender lógica de programação, algoritmos, PHP e
desenvolvimento web. Ferramentas interativas, tutor com IA, 100% em português.

Desenvolvido pelo **Grupo 3W Online** — sites e sistemas personalizados sob demanda
([www.3wonline.com.br](https://www.3wonline.com.br)).
Sistema desenvolvido pelo desenvolvedor **HOTWYL | WILLFROMBRASIL**.

## Stack

Vue 3 · Vite · TypeScript · Tailwind CSS · Vue Router · Pinia · Zod · Iconify · vee-validate ·
VueUse · @vueuse/motion · date-fns · vue-i18n · Fuse.js · CASL · SweetAlert2 · @unhead/vue ·
@sentry/vue · Vitest · Playwright · ESLint · Prettier · Husky + lint-staged.

## Scripts

```bash
npm install          # instala dependências
npm run dev          # servidor de desenvolvimento (http://localhost:3000/dev_start/)
npm run build        # type-check + build de produção (gera /dist)
npm run preview      # pré-visualiza o build (http://localhost:4173/dev_start/)
npm run lint         # ESLint com correção automática
npm run format       # Prettier
npm run test         # testes unitários (Vitest)
npm run test:e2e     # testes end-to-end (Playwright)
```

## Estrutura

```
src/
├── assets/           estilos globais (Tailwind)
├── components/       layout (Header, Footer, Breadcrumb), ui, home (seções do hotsite), AITutor
├── composables/      useSeo (meta por rota)
├── data/             catálogo de ferramentas, desafios, cursos e dados da empresa
├── i18n/             traduções pt-BR
├── router/           rotas (base /dev_start/) com breadcrumb e SEO por rota
├── services/         integração com IA (Gemini, Groq, OpenRouter)
├── stores/           Pinia (tema, UI/loading, IA)
├── types/            tipos compartilhados
└── views/            páginas (Home, Ferramentas, tools/*, Privacidade, erros)
```

## Configuração de subdiretório

A aplicação roda em `/dev_start/`. Isso está configurado em:

- `vite.config.ts` → `base: '/dev_start/'`
- `package.json` → `"homepage": "/dev_start/"`
- `src/router/index.ts` → `createWebHistory('/dev_start/')`
- Assets referenciados em `index.html` com prefixo `/dev_start/`

## Variáveis de ambiente

Crie `.env.local` (opcional):

```
VITE_SENTRY_DSN=            # DSN do Sentry (só ativa monitoramento em produção)
```

As chaves de API do Tutor IA (Gemini/Groq/OpenRouter) são informadas pelo próprio usuário na
interface e ficam apenas no navegador (localStorage). Não há chaves no código.

## Deploy na HostGator (hospedagem compartilhada)

1. Gere o build:

   ```bash
   npm run build
   ```

2. Envie **todo o conteúdo da pasta `dist/`** para o diretório `public_html/dev_start/` da
   HostGator (via File Manager ou FTP). O arquivo `.htaccess` já vai incluído e cuida do:
   - fallback de SPA (todas as rotas caem no `index.html`);
   - cabeçalhos de segurança (X-Frame-Options, X-Content-Type-Options, HSTS etc.);
   - compressão gzip e cache de assets.

3. Acesse `https://www.3wonline.com.br/dev_start/`.

> Se o domínio/subdiretório mudar, ajuste `base` no `vite.config.ts`, o `RewriteBase` no
> `public/.htaccess` e refaça o build.

## SEO / Analytics

- Meta tags, Open Graph, Twitter Card e JSON-LD em `index.html`; título/descrição/canonical por
  rota via `useSeo`.
- Google Tag Manager (`GTM-WVMJV7G6`) e Google Analytics 4 (`G-J06THXX0MW`) integrados.
- `robots.txt` e `sitemap.xml` em `public/`. Registre o site no Google Search Console.

## Privacidade

Banner de consentimento e página de política em conformidade com **LGPD, GDPR, CCPA e POPIA**.
Nenhum dado pessoal é armazenado em servidor.
