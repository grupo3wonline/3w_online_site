# Calculadora de Churrasco

Web app gratuito, sem login e privacy-first para planejar churrascos brasileiros: calcula carnes, acompanhamentos, bebidas e destilados por número de convidados e duração do evento. Desenvolvido pelo **Grupo 3W Online**.

## Stack

- **Vue 3** (Composition API + `<script setup>`) + **TypeScript**
- **Vite 5** (base path `/calculadora_churrasco/`, minificação Terser)
- **Tailwind CSS 3** com CSS variables + dark mode por classe
- **Vue Router 4** (history mode) + **Pinia** (estado)
- **Zod** + **vee-validate** (validação de formulários)
- **VueUse** + **@vueuse/motion** (reatividade e animações)
- **Maska** (máscaras de input) + **vue-i18n** (pt-BR)
- **SweetAlert2** e **Font Awesome 6** (alertas e ícones)
- Qualidade: **ESLint + Prettier + Husky + lint-staged**, **Vitest** (unit) e **Playwright** (e2e)

## Estrutura

```
src/
  lib/calculadora.ts     - Lógica de cálculo (funções puras + schema Zod). Testável.
  stores/calculadora.ts  - Estado (Pinia)
  composables/           - useTheme, useLoading
  components/            - Header, Footer, Breadcrumb, CookieBanner, LoadingOverlay, campos
  pages/                 - Home (landing), Ferramenta, Orçamento, Privacidade, Erro, 404
  router/index.ts        - Rotas + SEO por rota + loading na navegação
  i18n/                  - Mensagens pt-BR
```

## Scripts

```bash
npm run dev          # servidor de desenvolvimento (porta 8080)
npm run build        # type-check + build de produção
npm run preview      # pré-visualiza o build
npm run test         # testes unitários (Vitest)
npm run test:e2e     # testes end-to-end (Playwright)
npm run lint         # ESLint + fix
npm run format       # Prettier
```

## Rotas

| Caminho          | Descrição                                        |
| ---------------- | ------------------------------------------------ |
| `/`              | Landing page (hero, benefícios, sobre, serviços) |
| `/calculadora`   | Ferramenta de cálculo (alias: `/ferramenta`)     |
| `/orcamento`     | Orçamento e rateio do churrasco (vaquinha)       |
| `/privacidade`   | Política LGPD/GDPR/CCPA/POPIA (alias: `/sobre`)  |
| `/erro`          | Página de erro genérico                          |
| `*`              | 404 personalizada                                |

## Deploy na HostGator (hospedagem compartilhada)

1. Gere o build: `npm run build`
2. Envie **todo o conteúdo de `dist/`** para o subdiretório `calculadora_churrasco/` no `public_html` (ex.: `public_html/calculadora_churrasco/`).
3. O arquivo `.htaccess` já vai incluído em `dist/` e cuida de:
   - Redirecionamento SPA (Vue Router em history mode)
   - Cabeçalhos de segurança (CSP, X-Frame-Options, HSTS, etc.)
   - Compressão Gzip e cache de assets estáticos
4. Confirme que o site abre em `https://SEU_DOMINIO/calculadora_churrasco/`.

> O `base` do Vite, o `homepage` do `package.json` e o `createWebHistory('/calculadora_churrasco/')` já estão alinhados ao subdiretório.

## Privacidade e segurança

- Processamento 100% no navegador; nenhum dado do formulário é enviado a servidor.
- Banner de consentimento de cookies (LGPD) e página de privacidade com conformidade global.
- CSP e cabeçalhos de segurança via `.htaccess`. `npm audit --omit=dev` reporta 0 vulnerabilidades de runtime.

---

Sistema desenvolvido pelo desenvolvedor **HOTWYL | WILLFROMBRASIL** — [Grupo 3W Online](https://www.3wonline.com.br).
