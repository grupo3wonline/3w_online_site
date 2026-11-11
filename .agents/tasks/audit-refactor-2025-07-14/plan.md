# Plano de Implementação — Auditoria & Refatoração 3W Online Site
**Data:** 2025-07-14  
**Worktree:** `d:/laragon/www/3wonline/0/0-dev/sys/dev/3w_online_site/.worktrees/refactor-audit` (branch `refactor-audit`)  
**Artefatos:** `d:/laragon/www/3wonline/0/0-dev/sys/dev/3w_online_site/.agents/tasks/audit-refactor-2025-07-14/`

---

## O que já existe (não tocar salvo indicação explícita)

- Vue 3 + TypeScript + Vite + Tailwind CSS 3 — stack intacta e operacional
- `SweetAlert2 ^11.12.0` — instalado; `src/composables/useAlert.ts` — existente
- `@fortawesome/fontawesome-free ^6.5.2` — instalado e importado em `src/main.ts`
- `src/composables/useSeo.ts` — SEO completo (OG, Twitter, GEO, canonical, JSON-LD, AEO)
- `src/composables/usePrivacyConsent.ts` — consentimento LGPD/GDPR/CCPA/POPIA
- `App.vue` — loading overlay, AppNavbar, AppFooter, CookieBanner montados globalmente
- `src/components/layout/AppNavbar.vue`, `AppFooter.vue` — já presentes
- `src/components/ui/CookieBanner.vue`, `AppBreadcrumb.vue`, `WhatsAppFloat.vue` — existentes
- `index.html` — meta tags SEO completas, GEO, OG, Twitter Cards, JSON-LD Organization/LocalBusiness/WebSite
- Router com lazy-loading em todas as 126+ rotas
- Páginas: Error403, Error404, Error500, Privacy, Terms, Regulamento — existentes
- `public/robots.txt`, `public/sitemap.xml`, `public/.htaccess` (segurança parcial) — existentes
- `vitest ^1.6.0` em devDependencies (sem `vitest.config.ts` nem testes)
- `ToolWrapper.vue` — breadcrumb inline + promos + ferramentas relacionadas

---

## O que está faltando (escopo real desta refatoração)

1. Composables: `useCSRFToken.ts`, `useHoneypot.ts`, `useDebounce.ts`, `useDarkMode.ts`
2. Pacotes: `dompurify` + `@types/dompurify`, `@vue/test-utils`, `jsdom`
3. `tailwind.config.js` — adicionar `darkMode: 'class'`
4. `vitest.config.ts` com ambiente jsdom
5. Toggle dark mode na Navbar
6. Rodapé: crédito "Sistema desenvolvido por HOTWYL | WILLFROMBRASIL"
7. Página `/cookies` (rota + view)
8. `index.html` — `hreflang` tags + CSP `<meta>`
9. `public/.htaccess` — `X-Frame-Options: DENY` (está `SAMEORIGIN`), HSTS
10. `src/components/tools/common/BaseInput.vue` — `autocomplete="off"`
11. `src/views/Contact.vue` — honeypot + CSRF token + debounce(300ms) + disable after submit + `autocomplete="off"`
12. Tools com `v-html`: `ConversorMarkdown.vue`, `ValidadorRegex.vue`, `CalculadoraPitagoras.vue`, `CalculadoraFracao.vue` — envolver com `DOMPurify.sanitize()`
13. Testes Vitest: composables, componentes, segurança
14. Documentação: README.md, design-system.md

---

## Plano de Implementação

- [ ] 1. **Infraestrutura — Pacotes + Vitest + Composables de Segurança**

      No worktree (`d:/laragon/www/3wonline/0/0-dev/sys/dev/3w_online_site/.worktrees/refactor-audit`), executar `npm install` primeiro (node_modules não existe no worktree).  
      Instalar: `npm install dompurify`; `npm install -D @types/dompurify @vue/test-utils jsdom`.  
      Adicionar `darkMode: 'class'` à raiz do objeto de configuração em `tailwind.config.js`.  
      Criar `vitest.config.ts` na raiz do worktree com `environment: 'jsdom'`, `globals: true`, `include: ['src/tests/**/*.test.ts']`.  
      Criar os quatro composables em `src/composables/`:
      - `useDebounce.ts` — função `debounce<T>(fn: T, delay = 300)` retornando versão debounced com `clearTimeout`
      - `useCSRFToken.ts` — gera UUID v4 (via `crypto.randomUUID()`), salva em `localStorage` com chave `_csrf`, expõe `getToken()` e `validateToken(t)`
      - `useHoneypot.ts` — retorna `{ hpField: ref(''), isBot: computed(() => hpField.value !== ''), resetHoneypot() }`; nunca vincular o campo ao v-model visível
      - `useDarkMode.ts` — lê `localStorage.getItem('theme')`, aplica classe `dark` no `<html>`; expõe `isDark: ref<boolean>`, `toggleDark()`

      Files: `tailwind.config.js`, `vitest.config.ts`, `src/composables/useDebounce.ts`, `src/composables/useCSRFToken.ts`, `src/composables/useHoneypot.ts`, `src/composables/useDarkMode.ts`  
      Verify: `npm run build` no worktree — sem erros de TypeScript nem de bundling.

- [ ] 2. **UI/UX — Dark Mode Toggle + Rodapé + Página de Cookies**

      `src/components/layout/AppNavbar.vue`: importar `useDarkMode`; adicionar botão toggle no bloco "Right / Actions" antes do hamburger mobile — ícone `fa-moon` / `fa-sun` com `title="Alternar tema"`, `aria-label`, chama `toggleDark()`.  
      `src/components/layout/AppFooter.vue`: no "Bottom Bar" (`<div class="border-t ...">`) adicionar linha de crédito abaixo do copyright: `<p>Sistema desenvolvido por <strong>HOTWYL</strong> | <strong>WILLFROMBRASIL</strong></p>`; adicionar link `<RouterLink to="/cookies">Política de Cookies</RouterLink>` na faixa de links (entre "Termos de Uso" e "Regulamento").  
      Criar `src/views/Cookies.vue` — página de Política de Cookies com layout `page-hero` + conteúdo informativo em pt-BR sobre tipos de cookie, finalidades, como desativá-los; reutilizar padrão visual de `src/views/Privacy.vue`.  
      `src/router/index.ts`: inserir rota `{ path: '/cookies', name: 'Cookies', component: () => import('@/views/Cookies.vue'), meta: { title: 'Política de Cookies | 3W Online', ... } }` antes dos erros.  
      `index.html`: adicionar após `<link rel="canonical" ...>` as tags `<link rel="alternate" hreflang="pt-BR" href="https://www.3wonline.com.br" />` e `<link rel="alternate" hreflang="x-default" href="https://www.3wonline.com.br" />`.

      Files: `src/components/layout/AppNavbar.vue`, `src/components/layout/AppFooter.vue`, `src/views/Cookies.vue` (novo), `src/router/index.ts`, `index.html`  
      Verify: `npm run build` no worktree — sem erros.

- [ ] 3. **Segurança — CSP + .htaccess + Formulário Contact + DOMPurify + BaseInput**

      `index.html`: adicionar antes do `</head>` a meta tag CSP: `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https:; frame-ancestors 'none';" />`.  
      `public/.htaccess`: na seção `mod_headers`, substituir `Header always set X-Frame-Options "SAMEORIGIN"` por `"DENY"`; adicionar `Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"`.  
      `src/components/tools/common/BaseInput.vue`: no elemento `<input>`, adicionar atributo `autocomplete="off"`.  
      `src/views/Contact.vue`: 
        - Importar `useHoneypot`, `useCSRFToken`, `useDebounce` 
        - Adicionar campo honeypot oculto: `<input type="text" name="hp_field" v-model="hpField" tabindex="-1" aria-hidden="true" style="position:absolute;left:-9999px;opacity:0;" autocomplete="off" />`
        - Na função `handleSubmit`: checar `isBot` → abortar silenciosamente se `true`; chamar `validateToken(form._csrf)` antes de prosseguir
        - Envolver o submit com debounce de 300ms
        - Adicionar `autocomplete="off"` ao elemento `<form>`
        - Adicionar `ref isSubmitting` para desabilitar botão após envio (`disabled="isSubmitting"`)
        - Adicionar campo oculto `<input type="hidden" name="_csrf" :value="getToken()" />`
      Tools com `v-html`: nos quatro arquivos abaixo, importar `DOMPurify from 'dompurify'` e envolver o valor computado/ref com `DOMPurify.sanitize(...)`:
        - `src/components/tools/ConversorMarkdown.vue` — `html` variável/computed antes de renderizar
        - `src/components/tools/ValidadorRegex.vue` — `textoHighlighted` computed
        - `src/components/tools/CalculadoraPitagoras.vue` — `explicacao` ref/computed
        - `src/components/tools/CalculadoraFracao.vue` — `resultado.explicacao` propriedade

      Files: `index.html`, `public/.htaccess`, `src/components/tools/common/BaseInput.vue`, `src/views/Contact.vue`, `src/components/tools/ConversorMarkdown.vue`, `src/components/tools/ValidadorRegex.vue`, `src/components/tools/CalculadoraPitagoras.vue`, `src/components/tools/CalculadoraFracao.vue`  
      Verify: `npm run build` no worktree — sem erros de TypeScript.

- [ ] 4. **Testes Vitest + Build Final + Documentação**

      Criar os seguintes arquivos de teste em `src/tests/` (diretório novo):
      - `src/tests/composables/useDebounce.test.ts` — testa que a função debounced só dispara após o delay, e que chamadas repetidas reiniciam o timer
      - `src/tests/composables/useCSRFToken.test.ts` — testa que `getToken()` retorna UUID salvo no localStorage; `validateToken(t)` retorna `true` para token correto e `false` para diferente
      - `src/tests/composables/useHoneypot.test.ts` — testa que `isBot` é `false` quando `hpField` é vazio e `true` quando preenchido
      - `src/tests/composables/useDarkMode.test.ts` — testa `toggleDark()` adiciona/remove classe `dark` no `document.documentElement`; persiste no localStorage
      - `src/tests/components/AppBreadcrumb.test.ts` — monta `AppBreadcrumb` com `@vue/test-utils`, verifica renderização de ítens e link ativo
      - `src/tests/components/CookieBanner.test.ts` — testa que banner aparece sem consent no localStorage; desaparece após `acceptAll()`
      - `src/tests/security/forms.test.ts` — testa que submit é bloqueado quando `hpField !== ''`; que debounce previne chamada dupla em 100ms; que CSP token é validado

      Executar: `npx vitest --run` no worktree — todos os testes devem passar.  
      Salvar saída completa em `d:/laragon/www/3wonline/0/0-dev/sys/dev/3w_online_site/.agents/tasks/audit-refactor-2025-07-14/test-results.md`.  
      Executar `npm run build` no worktree — confirmar zero erros.  
      Atualizar `README.md` no worktree: documentar stack, scripts (`npm run dev`, `npm run build`, `npm test`), composables de segurança, dark mode, estrutura de diretórios.  
      Atualizar `design-system.md` no worktree: adicionar seção "Dark Mode" (tokens `dark:` do Tailwind, toggle na Navbar, persistência em localStorage).

      Files: `src/tests/composables/*.test.ts` (4 novos), `src/tests/components/*.test.ts` (2 novos), `src/tests/security/forms.test.ts` (novo), `README.md`, `design-system.md`, `d:/laragon/www/3wonline/0/0-dev/sys/dev/3w_online_site/.agents/tasks/audit-refactor-2025-07-14/test-results.md`  
      Verify: `npx vitest --run` no worktree — todos os testes verdes; `npm run build` — sem erros.

---

## Digest

| Arquivo | Bloco a alterar | Teste que cobre | Status hoje |
|---|---|---|---|
| `tailwind.config.js` | Adicionar `darkMode: 'class'` na raiz | `useDarkMode.test.ts` | ❌ faltando |
| `vitest.config.ts` | Criar do zero (environment: jsdom) | — | ❌ faltando |
| `src/composables/useDebounce.ts` | Criar do zero | `useDebounce.test.ts` | ❌ faltando |
| `src/composables/useCSRFToken.ts` | Criar do zero | `useCSRFToken.test.ts` | ❌ faltando |
| `src/composables/useHoneypot.ts` | Criar do zero | `useHoneypot.test.ts` | ❌ faltando |
| `src/composables/useDarkMode.ts` | Criar do zero | `useDarkMode.test.ts` | ❌ faltando |
| `src/components/layout/AppNavbar.vue` | Bloco "Right / Actions" (~linha 82) — toggle escuro | `useDarkMode.test.ts` | ❌ faltando toggle |
| `src/components/layout/AppFooter.vue` | Bottom Bar (~linha 80) — crédito + link cookies | — | ❌ faltando |
| `src/views/Cookies.vue` | Criar do zero | — | ❌ faltando |
| `src/router/index.ts` | Inserir rota `/cookies` antes dos erros (~linha 170) | — | ❌ faltando |
| `index.html` | Após `<link rel="canonical">` (~linha 16) — hreflang | — | ❌ faltando |
| `index.html` | Antes de `</head>` — CSP meta tag | — | ❌ faltando |
| `public/.htaccess` | Linha `X-Frame-Options "SAMEORIGIN"` → `"DENY"` + HSTS | — | ❌ incompleto |
| `src/components/tools/common/BaseInput.vue` | `<input>` (~linha 22) — adicionar `autocomplete="off"` | — | ❌ faltando |
| `src/views/Contact.vue` | `<form>` + `handleSubmit` — honeypot, CSRF, debounce | `forms.test.ts` | ❌ faltando |
| `src/components/tools/ConversorMarkdown.vue` | `v-html="html"` (~linha 35) — DOMPurify | — | ❌ faltando |
| `src/components/tools/ValidadorRegex.vue` | `v-html="textoHighlighted"` (~linha 56) — DOMPurify | — | ❌ faltando |
| `src/components/tools/CalculadoraPitagoras.vue` | `v-html="explicacao"` (~linha 107) — DOMPurify | — | ❌ faltando |
| `src/components/tools/CalculadoraFracao.vue` | `v-html="resultado.explicacao"` (~linha 77) — DOMPurify | — | ❌ faltando |

**Build command:** `npm run build` (no worktree)  
**Test command:** `npx vitest --run` (no worktree)  
**Testes existentes hoje:** nenhum (`src/tests/` não existe)  
**Build atual:** passa (verificado pela presença do diretório `dist/` no workspace principal)
