# ⚡ Calculadora de Pontos Elétricos

Aplicação web moderna e responsiva para cálculo de pontos elétricos, demanda, disjuntores e metragem de cabos, baseada na **NBR 5410**. Todo o processamento é feito no navegador (sem back-end).

Desenvolvida pelo **Grupo 3w Online** — sites e sistemas personalizados sob demanda (https://www.3wonline.com.br).

## Stack

- **Vue 3** + **TypeScript** + **Vite**
- **Tailwind CSS** + **shadcn-vue** (componentes) + tokens de tema (claro/escuro)
- **Vue Router** + **Pinia**
- **Zod** + **vee-validate** (validação)
- **VueUse** + **Motion Vue** (`@vueuse/motion`)
- **Iconify** (Lucide, offline) · **ApexCharts** (gráficos) · **SweetAlert2** (alertas)
- **vue-i18n** (pt-BR) · **@unhead/vue** (SEO por rota) · **@sentry/vue** (opcional)
- **ESLint** + **Prettier** + **Husky** + **lint-staged**
- **Vitest** (unit) + **Playwright** (e2e)

## Pré-requisitos

- Node.js 20+ e npm

## Scripts

```bash
npm install          # instala dependências
npm run dev          # servidor de desenvolvimento (porta 3000)
npm run build        # gera ícones + type-check + build de produção (dist/)
npm run preview      # pré-visualiza o build (porta 4173)
npm run type-check   # verificação de tipos (vue-tsc)
npm run lint         # ESLint --fix
npm run format       # Prettier --write
npm test             # testes unitários (Vitest)
npm run test:e2e     # testes end-to-end (Playwright)
npm run build:icons  # regenera o subconjunto de ícones Lucide
```

## Estrutura

```
src/
├── main.ts                 # bootstrap (plugins, router, i18n, head)
├── App.vue                 # captura de erros + layout
├── router/index.ts         # rotas + guards + onError (chunk reload)
├── i18n/                   # vue-i18n (pt-BR)
├── layouts/DefaultLayout.vue
├── pages/                  # Home (landing), Calculator, Contato, About, Privacy, Terms, NotFound
├── components/
│   ├── ui/                 # Button, Card, Input, Tooltip, Icon (base shadcn-vue)
│   ├── layout/             # Header, Footer, Breadcrumb, LoadingOverlay, ThemeToggle
│   ├── Home/               # seções da landing (Hero, Benefits, Features, HowTo, ...)
│   └── calculator/         # CalculatorForm, ResultChart
├── composables/            # useCalculator, useSEO, useTheme, useLoading, ...
├── stores/                 # calculator (histórico), ui (loading)
├── schemas/                # Zod
├── lib/                    # cn(), mapa de ícones, subset Lucide
├── utils/                  # constants, formatters, validators
└── types/                  # tipos de domínio
```

## Configuração de subdiretório

A aplicação é servida em `/calculadora_ponto_eletrico/`:

- `vite.config.ts`: `base: '/calculadora_ponto_eletrico/'`
- `package.json`: `homepage: '/calculadora_ponto_eletrico/'`
- `src/router/index.ts`: `createWebHistory('/calculadora_ponto_eletrico/')`

## Analytics e SEO

- Google Tag Manager (`GTM-WVMJV7G6`) e Google Analytics 4 (`G-J06THXX0MW`) com **Consent Mode** (negado por padrão até o consentimento).
- Meta tags, Open Graph, Twitter Card e JSON-LD (`WebApplication`, `Organization`, `FAQPage`).
- `sitemap.xml` e `robots.txt` em `public/`.
- Variáveis em `.env` (`VITE_SITE_URL`, `VITE_GTM_ID`, `VITE_GA_ID`, `VITE_SENTRY_DSN`).

## Conformidade (LGPD/GDPR/CCPA/POPIA)

- Banner de consentimento de cookies (aceitar/recusar) integrado ao Consent Mode.
- Páginas de Política de Privacidade e Termos de Uso.
- Cálculos processados localmente; nenhum dado pessoal é enviado a servidores.

## Deploy na HostGator (hospedagem compartilhada)

1. Gere o build:
   ```bash
   npm run build
   ```
2. Envie **todo o conteúdo da pasta `dist/`** para o subdiretório do domínio, por exemplo:
   ```
   public_html/calculadora_ponto_eletrico/
   ```
   (via Gerenciador de Arquivos do cPanel ou FTP). O arquivo **`.htaccess`** já vai incluído em `dist/` e cuida do fallback de rotas (SPA), cabeçalhos de segurança e compressão.
3. Verifique se o mod_rewrite está ativo (padrão na HostGator).
4. Acesse: `https://SEU-DOMINIO/calculadora_ponto_eletrico/`

> Se publicar em outro subdiretório, ajuste `base` (vite), `homepage` (package.json), `createWebHistory(...)` (router) e o `RewriteBase` do `.htaccess`, e rebuilde.

## Base técnica dos cálculos

- **NBR 5410** — Instalações Elétricas de Baixa Tensão.
- Densidade de pontos: ~1 ponto a cada 8 m² (mínimo de 1 por ambiente).
- Margem de segurança de 20% na metragem de cabo.
- Potência por m² varia conforme o tipo de ambiente (ex.: banheiro exige mais).

## Aviso

Ferramenta de estimativa para fins educacionais e de apoio. Para projetos executivos, consulte sempre um profissional habilitado. A segurança elétrica é prioridade.

---

<div align="center">
  <p>sistema desenvolvido pelo desenvolvedor <strong>HOTWYL | WILLFROMBRASIL</strong></p>
  <p>© Grupo 3w Online — https://www.3wonline.com.br</p>
</div>
