# 3W Online — Portal Digital & Suíte de Soluções

Portal institucional do **Grupo 3W Online**: landing page unificada, 126+ ferramentas digitais gratuitas, 62 soluções web independentes, landing pages de alta conversão e conformidade de privacidade global.

---

## Visão Geral

SPA (Single Page Application) construída com **Vue 3 + TypeScript + Vite**, entregando:

- **Home unificada** — hero, serviços, sobre, institucional, formulário de contato e FAQ em uma única página com âncoras (`#sobre`, `#institucional`, `#contato`)
- **126+ ferramentas client-side** — calculadoras, conversores, validadores, geradores
- **62 soluções digitais** integradas na suíte em `/solucoes/*`
- **Landing pages de alta conversão** para cada serviço da 3W Online
- **SEO/SEM/GEO/AEO** — metatags dinâmicas, sitemap, schema markup, robots.txt
- **Conformidade de privacidade** — LGPD (BR), GDPR (EU), CCPA (EUA), POPIA (ZA)
- **Segurança de formulários** — CSRF token, honeypot, debounce, DOMPurify
- **Tema claro/escuro** — alternância via navbar, persistência em localStorage

---

## Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Framework UI | Vue 3 + Composition API (`<script setup lang="ts">`) |
| Linguagem | TypeScript 5 (strict mode) |
| Build | Vite 5.4 + `@vitejs/plugin-vue` |
| Estilos | Tailwind CSS 3.4 (mobile-first, dark mode via classe) |
| Roteamento | Vue Router 4 (lazy loading por rota + redirects de âncora) |
| Estado Global | Pinia 2 (`tools.ts`, `solucoes.ts`) |
| Alertas | SweetAlert2 via `useAlert` |
| Ícones | `@iconify/vue` (MDI) + Font Awesome 6 (dark mode toggle) |
| Máscaras | Maska 3 (telefone, CPF, CNPJ, moeda) |
| OCR | Tesseract.js 7 (client-side, sem upload) |
| QR Code | qrcode 1.5 (client-side) |
| Busca | Fuse.js 7 (fuzzy search no catálogo de ferramentas) |
| Sanitização | DOMPurify 3 (proteção XSS nos `v-html`) |
| Validação | Zod 3 |
| Testes | Vitest 1.6 + `@vue/test-utils` 2 + jsdom |
| Qualidade | ESLint 8 + Prettier 3 + Husky 9 + lint-staged |

---

## Como Executar

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Build de produção (TypeScript check + Vite)
npm run build

# Testes unitários
npx vitest --run

# Preview do build
npm run preview

# Lint e formatação
npm run lint && npm run format
```

---

## Estrutura de Diretórios

```
src/
├── assets/css/           # Tailwind layers + utilitários de componentes
├── components/
│   ├── layout/           # AppNavbar.vue, AppFooter.vue
│   ├── ui/               # AppBreadcrumb, CookieBanner, WhatsAppFloat, FaqAccordion
│   ├── solucoes/         # 62 componentes Vue das soluções digitais + SolucaoLayout
│   └── tools/
│       ├── common/       # BaseButton, BaseCard, BaseInput, ToolCard
│       └── [126 ferramentas .vue]
├── composables/          # useAlert, useAnalytics, useCSRFToken, useDarkMode,
│                         # useDebounce, useHoneypot, usePerformance,
│                         # usePrivacyConsent, useSeo, useUtm
├── constants/            # Dados reutilizáveis (FAQ_ITEMS, depoimentos…)
├── router/
│   ├── index.ts          # Rotas principais + redirects de âncora
│   ├── tools.ts          # 126 rotas de ferramentas (lazy-loaded)
│   └── solucoes.ts       # 63 rotas de soluções (1 catálogo + 62 individuais)
├── stores/
│   ├── tools.ts          # Catálogo e busca das ferramentas
│   └── solucoes.ts       # Catálogo e busca das 62 soluções
├── tests/
│   ├── composables/      # useDebounce, useCSRFToken, useHoneypot, useDarkMode
│   ├── components/       # AppBreadcrumb, CookieBanner
│   └── security/         # Integração de segurança de formulários
└── views/
    ├── Home.vue           # Página unificada (início, sobre, institucional, contato)
    ├── Services.vue       # Catálogo de serviços
    ├── Solucoes.vue       # Hub das 62 soluções digitais
    ├── SolucaoView.vue    # Wrapper de solução individual
    ├── Pagamento.vue      # Pagamento seguro
    ├── Privacy.vue        # Política de privacidade (LGPD/GDPR)
    ├── Terms.vue          # Termos de uso
    ├── Cookies.vue        # Política de cookies
    ├── Regulamento.vue    # Regulamento de serviços
    ├── errors/            # Error403.vue, Error404.vue, Error500.vue
    ├── ferramentas/       # Tools.vue, ToolWrapper.vue
    ├── lp/                # Landing pages (G3w, Sistemas, Ads, Marketing…)
    ├── services/          # 13 páginas de serviços individuais
    └── solucoees/         # 62 projetos standalone das soluções (fonte)
public/
├── .htaccess             # Apache: SPA fallback + headers de segurança
├── robots.txt
├── sitemap.xml
├── favicon.svg
└── 403.html / 404.html / 500.html
```

---

## Roteamento — Âncoras da Home Unificada

As rotas `/sobre`, `/institucional` e `/contato` foram unificadas na Home e redirecionam para seções via hash:

| Rota | Redireciona para | Seção |
|---|---|---|
| `/sobre` | `/#sobre` | História, Missão/Visão/Valores, Diferenciais |
| `/institucional` | `/#institucional` | Timeline, Certificações, Dados Jurídicos |
| `/contato` | `/#contato` | Formulário de contato + canais + FAQ |

---

## Composables de Segurança

### `useCSRFToken` — proteção CSRF
```typescript
const { getToken, validateToken } = useCSRFToken()
const token = getToken() // UUID gerado/lido do localStorage
```

### `useHoneypot` — anti-bot
```typescript
const { hpField, isBot, resetHoneypot } = useHoneypot()
// No template: <input v-model="hpField" tabindex="-1" aria-hidden="true" />
if (isBot.value) return // bloquear bot silenciosamente
```

### `useDebounce` — anti-duplo-submit
```typescript
const debouncedSubmit = debounce(handleSubmit, 300)
```

### `useDarkMode` — tema escuro
```typescript
const { isDark, toggleDark } = useDarkMode()
```

---

## Soluções Digitais (`/solucoes`)

62 aplicações web completas integradas como componentes Vue, acessíveis em `/solucoes/:slug`.

Categorias:
| Categoria | Quantidade |
|---|---|
| Finanças & Saúde | 19 |
| Marketing | 4 |
| Dev Tools | 9 |
| Texto & Conteúdo | 12 |
| Design & Mídia | 11 |
| Negócios | 7 |

---

Desenvolvido por **HOTWYL | WILLFROMBRASIL**
