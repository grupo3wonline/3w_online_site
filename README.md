# 3W Online — Portal Digital & Suíte de Ferramentas

Portal institucional completo do **Grupo 3W Online**: SPA Vue 3 com 280+ ferramentas digitais gratuitas, 13 páginas de serviços, múltiplas landing pages de conversão e conformidade de privacidade global.

---

## Visão Geral

SPA (Single Page Application) construída com **Vue 3 + TypeScript + Vite**, entregando:

- **Home unificada** — hero, serviços, sobre, institucional, formulário de contato e FAQ com âncoras (`#sobre`, `#institucional`, `#contato`)
- **280+ ferramentas client-side** — calculadoras, conversores, validadores, geradores e aplicações web completas
- **13 páginas de serviços** — cada uma com SEO individualizado, schema.org Service e breadcrumb
- **Landing pages de alta conversão** — `/anuncios`, `/lp-mkt`, `/lp-sites-sistemas`, `/lp-sistemas`, `/g3w`, `/landing-prd`
- **SEO/SEM/GEO/AEO** — metatags dinâmicas, sitemap, schema markup (Organization, LocalBusiness, FAQPage, BreadcrumbList, HowTo, Service), robots.txt
- **Conformidade global de privacidade** — LGPD (BR), GDPR (EU), CCPA/CPRA (EUA), POPIA (ZA)
- **Segurança de formulários** — CSRF token, honeypot, debounce, DOMPurify, reCAPTCHA v3, Cloudflare Turnstile
- **Tema claro/escuro** — alternância via navbar com barra de progresso de scroll
- **Performance** — lazy loading por rota, code splitting, Gzip via .htaccess, cache 1 ano para assets

---

## Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Framework UI | Vue 3 + Composition API (`<script setup lang="ts">`) |
| Linguagem | TypeScript 5 (strict mode) |
| Build | Vite 5.4 + `@vitejs/plugin-vue` |
| Estilos | Tailwind CSS 3.4 (mobile-first, dark mode via classe `html.dark`) |
| Design System | Aurora/Glassmorphism + Gradient UI (custom CSS layers em `main.css`) |
| Roteamento | Vue Router 4 (lazy loading + SPA history mode) |
| Estado Global | Pinia 2 (`tools.ts`, `solucoes.ts`) |
| Alertas | SweetAlert2 11 via `useAlert` composable |
| Ícones | `@iconify/vue` 4 (MDI) + Font Awesome 6 (via CSS) |
| Máscaras | Maska 3 (telefone, CPF, CNPJ, moeda) |
| OCR | Tesseract.js 7 (client-side, sem upload) |
| QR Code | qrcode 1.5 (client-side) |
| Busca | Fuse.js 7 (fuzzy search no catálogo) |
| Sanitização | DOMPurify 3 (proteção XSS) |
| Validação | Zod 3 |
| Captcha | Google reCAPTCHA v3 + Cloudflare Turnstile |
| Analytics | Google Analytics 4 (GA4) + Google Tag Manager (GTM) |
| Testes | Vitest 1.6 + `@vue/test-utils` 2 + jsdom |
| Qualidade | ESLint 8 + Prettier 3 + Husky 9 + lint-staged |
| Servidor | Apache (HostGator) + `.htaccess` (SPA rewrite, Gzip, cache, security headers) |

---

## Como Executar

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas chaves

# Servidor de desenvolvimento (porta 3000)
npm run dev

# Build de produção (TypeScript check + Vite)
npm run build

# Testes unitários (execução única)
npm run test
# ou: npx vitest --run

# Preview do build
npm run preview

# Lint e formatação
npm run lint && npm run format
```

---

## Estrutura de Diretórios

```
src/
├── assets/css/
│   └── main.css              # Tailwind layers + design system (glass, aurora, etc.)
├── components/
│   ├── layout/
│   │   ├── AppNavbar.vue     # Navbar sticky com barra de progresso e dark mode
│   │   └── AppFooter.vue     # Footer com compliance e crédito HOTWYL|WILLFROMBRASIL
│   ├── ui/
│   │   ├── AppBreadcrumb.vue # Breadcrumb com schema.org BreadcrumbList
│   │   ├── AppTurnstile.vue  # Componente Cloudflare Turnstile
│   │   ├── CookieBanner.vue  # Consentimento LGPD/GDPR/CCPA/POPIA
│   │   ├── FaqAccordion.vue  # FAQ com schema.org FAQPage
│   │   ├── TipsSection.vue   # Seção de dicas e orientações
│   │   └── WhatsAppFloat.vue # Botão flutuante WhatsApp
│   └── tools/
│       ├── apps-map.ts       # Mapeamento slug → componente (AppWrapper)
│       └── [280+ .vue]       # Ferramentas individuais
├── composables/
│   ├── useAlert.ts           # SweetAlert2 padronizado
│   ├── useAnalytics.ts       # GA4 + GTM (page views, eventos, conversões)
│   ├── useApiProxy.ts        # Proxy para APIs externas via api.php
│   ├── useCSRFToken.ts       # Geração e validação de CSRF token
│   ├── useDarkMode.ts        # Tema claro/escuro (localStorage + prefers-color-scheme)
│   ├── useDebounce.ts        # Debounce para evitar submits duplicados
│   ├── useFormSecurity.ts    # Sanitização XSS + detecção injeção + cooldown
│   ├── useHoneypot.ts        # Campo honeypot anti-bot
│   ├── usePerformance.ts     # Web Vitals e monitoramento de performance
│   ├── usePrivacyConsent.ts  # Gerenciamento de consentimento LGPD/GDPR
│   ├── useRecaptcha.ts       # Google reCAPTCHA v3 (score-based, invisível)
│   ├── useRequestGuard.ts    # Guard anti-requisição concorrente
│   ├── useSeo.ts             # Meta tags + schema.org dinâmico
│   ├── useTurnstile.ts       # Cloudflare Turnstile (modo invisible)
│   └── useUtm.ts             # Captura e persistência de parâmetros UTM
├── constants/
│   └── content.ts            # FAQ, depoimentos, contatos (lê do .env)
├── router/
│   ├── index.ts              # Rotas principais + guard SEO + breadcrumbs
│   └── tools.ts              # 126+ rotas de ferramentas com lazy loading
├── stores/
│   ├── tools.ts              # Catálogo e busca das ferramentas (Fuse.js)
│   └── solucoes.ts           # Catálogo de soluções
├── tests/
│   ├── composables/          # useDebounce, useCSRFToken, useHoneypot, useDarkMode,
│   │                         # useRequestGuard, usePrivacyConsent
│   ├── components/           # AppBreadcrumb, AppFooter, AppNavbar, CookieBanner
│   ├── router/               # router.test.ts, seo-meta.test.ts
│   └── security/             # forms.test.ts, useFormSecurity.test.ts, vulnerability.test.ts
└── views/
    ├── Home.vue              # Página unificada (início, sobre, institucional, contato)
    ├── Services.vue          # Catálogo de serviços
    ├── Pagamento.vue         # Pagamento seguro
    ├── Privacy.vue           # Política de privacidade (LGPD/GDPR)
    ├── Terms.vue             # Termos de uso
    ├── Cookies.vue           # Política de cookies
    ├── Regulamento.vue       # Regulamento de serviços
    ├── errors/               # Error403.vue, Error404.vue, Error500.vue
    ├── ferramentas/          # Tools.vue, ToolWrapper.vue, AppWrapper.vue
    ├── lp/                   # Landing pages (G3w, Sistemas, Ads, Marketing, PRD, Sites)
    └── services/             # 13 páginas individuais de serviços

public/
├── .htaccess                 # Apache: SPA fallback + Gzip + cache + security headers
├── api.php                   # Proxy PHP para APIs externas (HMAC auth)
├── api-config.php            # Configuração do proxy (lê env vars do .htaccess)
├── robots.txt                # Diretivas de crawl
├── sitemap.xml               # Sitemap XML
├── favicon.svg               # Ícone do site
├── llms.txt                  # Diretivas para LLMs/AI crawlers
└── 403.html / 404.html / 500.html  # Páginas de erro do Apache
```

---

## Configuração de Ambiente (`.env`)

```bash
# URLs do site
VITE_SITE_URL=https://www.3wonline.com.br
VITE_API_PROXY=/api.php

# Empresa
VITE_SITE_EMAIL=contato@3wonline.com.br
VITE_WHATSAPP_NUMBER=5541996924829
VITE_PHONE=(41) 99692-4829

# Captcha (chaves públicas — seguras no cliente)
VITE_RECAPTCHA_SITE_KEY=...    # Google reCAPTCHA v3 — console.google.com/recaptcha
VITE_TURNSTILE_SITE_KEY=...    # Cloudflare Turnstile — dash.cloudflare.com

# Analytics
VITE_GA4_MEASUREMENT_ID=G-...  # Google Analytics 4
VITE_GTM_ID=GTM-...            # Google Tag Manager

# Geolocalização
VITE_GEO_REGION=BR-PR
VITE_GEO_CITY=Curitiba
VITE_GEO_LAT=-25.4284
VITE_GEO_LNG=-49.2733
```

> **Chaves secretas do backend** (reCAPTCHA secret, Turnstile secret, HMAC secret)
> → Configure via `SetEnv` no `.htaccess` em produção. **Nunca no bundle JS.**

---

## Roteamento — Âncoras da Home Unificada

| Rota | Redireciona para | Seção |
|---|---|---|
| `/sobre` | `/#sobre` | História, Missão/Visão/Valores, Diferenciais |
| `/institucional` | `/#institucional` | Timeline, Certificações, Dados Jurídicos |
| `/contato` | `/#contato` | Formulário + canais de contato + FAQ |
| `/solucoes` | `/ferramentas#aplicacoes` | Retrocompatibilidade |
| `/solucoes/:slug` | `/ferramentas/:slug` | Retrocompatibilidade |

---

## Composables de Segurança

### `useCSRFToken` — proteção CSRF
```typescript
const { getToken, validateToken } = useCSRFToken()
const token = getToken()          // UUID gerado/lido do localStorage
const ok = validateToken(token)   // true apenas para o token legítimo
```

### `useHoneypot` — anti-bot
```typescript
const { hpField, isBot, resetHoneypot } = useHoneypot()
// No template: <input v-model="hpField" tabindex="-1" aria-hidden="true" autocomplete="off" />
if (isBot.value) return // bloqueia bot silenciosamente
```

### `useFormSecurity` — sanitização e detecção de injeção
```typescript
const { sanitizeText, sanitizeFormData, detectInjectionAttempt, useSubmitGuard } = useFormSecurity()

const safeText = sanitizeText(input)       // remove XSS via DOMPurify
const cleanForm = sanitizeFormData(form)   // sanitiza todos os campos string
const suspicious = detectInjectionAttempt(form)  // detecta SQL/XSS/template injection

const { isSubmitting, wasSubmittedRecently, markAsSubmitted } = useSubmitGuard('form-id')
```

### `useDebounce` — anti-duplo-submit
```typescript
const debouncedSubmit = debounce(handleSubmit, 300) // dispara apenas após 300ms de silêncio
```

### `useRequestGuard` — anti-requisição concorrente
```typescript
const { pending, run } = useRequestGuard()
await run(async () => { /* executa apenas se não há outra em andamento */ })
```

### `useRecaptcha` — Google reCAPTCHA v3
```typescript
const { execute } = useRecaptcha()
const token = await execute('contact_submit') // token para validar no servidor
```

### `useDarkMode` — tema escuro/claro
```typescript
const { isDark, toggleDark } = useDarkMode() // persiste no localStorage
```

---

## Analytics & Tracking (GA4 + GTM)

```typescript
const { trackPageView, trackFormSubmit, trackLead, trackToolUsage, trackButtonClick } = useAnalytics()

trackPageView('/servicos', 'Serviços') // automático no router guard
trackFormSubmit('contact-form', 'Orçamento')
trackLead('website_form', 'criacao-sites')
trackToolUsage('calculadora-roi', 'use')
```

---

## SEO/GEO/AEO — Schemas Implementados

| Schema | Onde | Propósito |
|---|---|---|
| `Organization` | Todas as páginas | Identidade da empresa |
| `LocalBusiness / ProfessionalService` | Todas as páginas | GEO targeting Curitiba |
| `WebSite + SearchAction` | Home | AEO — busca no site |
| `BreadcrumbList` | Todas com breadcrumb | Navegação estruturada |
| `FAQPage` | Home, serviços | AEO — respostas diretas em IAs |
| `Service` | Páginas de serviço | SEM — rich results de serviço |
| `HowTo` | Onde aplicável | AEO — instruções passo a passo |
| `Speakable` | Todas as páginas | Voice Search / AI assistants |

---

## Conformidade de Privacidade

| Lei | Região | Status |
|---|---|---|
| LGPD | Brasil | ✅ Cookie banner, política, opt-in/opt-out |
| GDPR | União Europeia | ✅ Consentimento granular, direito de exclusão |
| CCPA/CPRA | Califórnia (EUA) | ✅ "Do Not Sell" — não vendemos dados |
| POPIA | África do Sul | ✅ Adequação ao modelo internacional |

---

## Testes Automatizados

```bash
npm run test                    # Roda todos os testes (Vitest)
npx vitest --run --reporter=verbose  # Saída detalhada
```

Arquivos de teste:

| Arquivo | Cobertura |
|---|---|
| `security/vulnerability.test.ts` | XSS, SQL Injection, Template Injection, Path Traversal, CSRF, Honeypot, Duplicate-Submit |
| `security/useFormSecurity.test.ts` | Sanitização, detecção de injeção, cooldown de formulário |
| `security/forms.test.ts` | Integração das proteções (honeypot + debounce + CSRF) |
| `security/csp-headers.test.ts` | XSS avançado, Open Redirect, CSRF properties, Rate Limiting, Replay |
| `composables/useDebounce.test.ts` | Debounce (delay, múltiplas chamadas) |
| `composables/useCSRFToken.test.ts` | Geração UUID, persistência, validação |
| `composables/useHoneypot.test.ts` | Detecção bot, reset |
| `composables/useAlert.test.ts` | SweetAlert2: success/error/warning/info/confirm/toast/loading, textos pt-BR |
| `composables/useDarkMode.test.ts` | Tema, persistência, prefers-color-scheme |
| `composables/useRequestGuard.test.ts` | Concorrência, bloqueio, reset, AbortError |
| `composables/usePrivacyConsent.test.ts` | LGPD/GDPR consentimento, persistência, evento |
| `router/router.test.ts` | Resolução de 50+ rotas, redirects, 404, links navbar/footer |
| `router/hash-navigation.test.ts` | Redirecionamentos para âncoras (#sobre, #contato, #institucional), scrollBehavior |
| `router/seo-meta.test.ts` | Title/description de todas as rotas (comprimento, branding, geo) |
| `components/AppNavbar.test.ts` | Renderização, links, acessibilidade, dark mode |
| `components/AppFooter.test.ts` | Renderização, links, compliance |
| `components/AppBreadcrumb.test.ts` | Schema BreadcrumbList, renderização |
| `components/CookieBanner.test.ts` | Exibição, aceitar/rejeitar, modal |

---

## Changelog & Melhorias Recentes

### Auditoria e Refatoração (2025)

#### 🐛 Correções
- **Router `scrollBehavior`**: Corrigido para processar hash anchors (`#sobre`, `#contato`, `#institucional`). Anteriormente ignorava o hash e rolava sempre para `top: 0`. Agora usa `{ el: to.hash, behavior: 'smooth', top: 72 }` com offset de 72px para compensar a navbar sticky.
- **Animação `shimmer`**: Corrigida de `ease` (padrão irregular) para `linear` no `tailwind.config.js`. Shimmer agora é suave e consistente.
- **Router — `serviceType` encoding**: Corrigidos campos `serviceType` corrompidos nas rotas `/servicos/gestao-anuncios`, `/servicos/planejamento-campanhas` e `/servicos/relacoes-publicas`. Schemas JSON-LD de Service agora emitem strings UTF-8 corretas.
- **CSS `animate-gradient-x`**: Adicionada utility `.animate-gradient-x { background-size: 200% 200% }` que faltava para o keyframe `gradientX` funcionar corretamente.

#### ✨ Melhorias
- **Diretiva `v-tooltip`**: Reescrita de `title` nativo para tooltip CSS real com suporte a:
  - Posicionamento (`v-tooltip.top`, `.bottom`, `.left`, `.right`)
  - Tema escuro/claro (`v-tooltip.dark`)
  - Clamp automático dentro da viewport
  - Acessibilidade (`role="tooltip"`, `aria-label`)
  - `prefers-reduced-motion` respeitado
- **Formulário de Contato**: Todos os inputs individuais (name, email, phone, company) passaram de autocomplete específico (`name`, `email`, `tel`, `organization`) para `autocomplete="off"` conforme requisito de segurança.

#### 🧪 Novos Testes
- `router/hash-navigation.test.ts`: Testes de redirecionamento para âncoras, lógica de `scrollBehavior` e todas as âncoras esperadas na Home unificada.
- `security/csp-headers.test.ts`: XSS avançado (null bytes, unicode, base64, data URIs, event handlers), Open Redirect, CSRF properties, Rate Limiting avançado, Replay com cooldown.
- `composables/useAlert.test.ts`: Cobertura completa do SweetAlert2 composable (`showSuccess`, `showError`, `showWarning`, `showInfo`, `showConfirm`, `showToast`, `showLoading`), incluindo verificação de textos em pt-BR.

---

## Deploy (HostGator)

Ver `DEPLOY_HOSTGATOR.md` para instruções completas de deploy.

**Pré-deploy checklist:**
1. `npm run build` — sem erros TypeScript e Vite
2. `npm run test` — todos os testes passando
3. Configurar `SetEnv` no `.htaccess` em produção com as chaves secretas do backend
4. Verificar que `VITE_SITE_URL` no `.env` aponta para o domínio correto
5. Upload da pasta `dist/` + `public/api.php` + `public/api-config.php` + `.htaccess`

---

## Design System

O projeto usa um sistema de design personalizado construído sobre Tailwind CSS com:

- **Aurora/Gradient UI** — gradientes mesh e aurora para heróis e seções de destaque
- **Glassmorphism** — `glass-card`, `glass-panel`, `glass-hover` para cards interativos
- **Dark mode** — via classe `html.dark` com variáveis CSS (`--bg-page`, `--color-text`, etc.)
- **Animações** — `animate-fade-in`, `animate-float`, `animate-bounce-gentle`, shimmer
- **Navbar scrollaware** — glassmorphism ativado ao rolar, barra de progresso de leitura

Tokens disponíveis em `src/assets/css/main.css` e `tailwind.config.js`.

---

## Créditos

Desenvolvido por **HOTWYL | WILLFROMBRASIL**

© 2024–2026 Grupo 3W Online. Todos os direitos reservados.
