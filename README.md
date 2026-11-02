# 3W Online — Site Institucional

Portal institucional da **3W Online** (Grupo 3W Online): landing pages, suíte de ferramentas digitais gratuitas, portfólio de serviços e páginas de conformidade de privacidade.

---

## Visão Geral

Aplicação SPA (Single Page Application) construída com Vue 3 + TypeScript, entregando:

- **126+ ferramentas client-side** (calculadoras, conversores, validadores, geradores)
- **Landing pages de alta conversão** para os serviços da 3W Online
- **SEO/SEM/GEO/AEO** — metatags dinâmicas, sitemap, robots.txt e schema markup
- **Conformidade de privacidade** — LGPD (BR), GDPR (EU), CCPA (EUA), POPIA (ZA)
- **Segurança de formulários** — CSRF token, honeypot, debounce, sanitização DOMPurify
- **Tema claro/escuro** — alternância via Navbar com persistência em localStorage

---

## Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Framework UI | Vue 3 + Composition API (`<script setup lang="ts">`) |
| Linguagem | TypeScript 5 (strict mode) |
| Build | Vite 5.4 + `@vitejs/plugin-vue` |
| Estilos | Tailwind CSS 3.4 (mobile-first, dark mode via classe) |
| Roteamento | Vue Router 4 (lazy loading por rota) |
| Estado Global | Pinia 2 |
| i18n | vue-i18n 9 (pt-BR) |
| Alertas | SweetAlert2 via `useAlert` |
| Ícones | `@iconify/vue` (layout) + Font Awesome 6 (ferramentas) |
| Testes | Vitest 1.6 + `@vue/test-utils` 2 + jsdom |
| Segurança | DOMPurify, CSRF token, honeypot, debounce |
| Qualidade | ESLint + Prettier + Husky + lint-staged |

---

## Como Executar

```bash
# 1. Instalar dependências
npm install

# 2. Servidor de desenvolvimento
npm run dev

# 3. Build de produção (TypeScript check + Vite)
npm run build

# 4. Rodar testes unitários
npx vitest --run

# 5. Preview do build gerado
npm run preview

# 6. Lint e formatação
npm run lint
npm run format
```

---

## Composables de Segurança

Todos os composables de segurança estão em `src/composables/`.

### `useCSRFToken`
Gera e valida um token UUID persistido no `localStorage` (chave `_3w_csrf`).  
Protege formulários contra ataques Cross-Site Request Forgery.

```typescript
import { useCSRFToken } from '@/composables/useCSRFToken'

const { getToken, validateToken } = useCSRFToken()

// Obter (ou criar) o token da sessão
const token = getToken()

// Validar o token antes de processar o submit
if (!validateToken(formToken)) {
  // token inválido — rejeitar
}
```

### `useHoneypot`
Campo invisível ao usuário real. Se preenchido por um bot, o submit é bloqueado.

```typescript
import { useHoneypot } from '@/composables/useHoneypot'

const { hpField, isBot, resetHoneypot } = useHoneypot()

// No template: <input v-model="hpField" tabindex="-1" aria-hidden="true" />

// Antes do submit:
if (isBot.value) return // bloquear bot
```

### `useDebounce`
Adia a execução de uma função até que o delay expire. Evita envios duplicados e chamadas em rajada.

```typescript
import { debounce } from '@/composables/useDebounce'

const handleSubmit = debounce((payload) => {
  // chamada real — só executa após 300ms de silêncio
  submitForm(payload)
}, 300)
```

### `useDarkMode`
Alterna entre tema claro e escuro, adicionando/removendo a classe `dark` no `<html>`.  
Persiste a preferência do usuário no `localStorage` (chave `theme`).

```typescript
import { useDarkMode } from '@/composables/useDarkMode'

const { isDark, toggleDark } = useDarkMode()

// isDark.value: boolean — estado atual
// toggleDark(): alterna e persiste
```

---

## Estrutura de Diretórios

```
src/
├── assets/css/           # Estilos globais (Tailwind + componentes utilitários)
├── components/
│   ├── layout/           # AppNavbar.vue, AppFooter.vue
│   ├── ui/               # AppBreadcrumb, CookieBanner, WhatsAppFloat, FAQ, Tips
│   └── tools/
│       ├── common/       # BaseButton, BaseCard, BaseInput, ToolCard
│       └── [126 ferramentas .vue]
├── composables/          # useAlert, useCSRFToken, useDarkMode, useDebounce,
│                         # useHoneypot, usePerformance, usePrivacyConsent,
│                         # useSeo, useUtm, useAnalytics
├── constants/            # Dados reutilizáveis (FAQ, depoimentos, etc.)
├── locales/              # i18n pt-BR
├── router/               # index.ts + tools.ts (rotas lazy-loaded)
├── stores/               # Pinia (tools.ts)
├── tests/
│   ├── composables/      # useDebounce, useCSRFToken, useHoneypot, useDarkMode
│   ├── components/       # AppBreadcrumb, CookieBanner
│   └── security/         # forms (integração segurança)
└── views/
    ├── errors/           # Error403, Error404, Error500
    ├── lp/               # Landing pages (G3w, Marketing, Sistemas, Ads…)
    └── services/         # Páginas de serviços individuais
public/
├── .htaccess             # Regras Apache (SPA + headers de segurança)
├── robots.txt            # Diretivas de crawlers
├── sitemap.xml           # Mapa do site
├── favicon.svg
└── 403.html / 404.html / 500.html
```

---

Desenvolvido por **HOTWYL | WILLFROMBRASIL**
