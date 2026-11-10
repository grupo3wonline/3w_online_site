# Calculadora de Preço para Produto e Serviço

Aplicação web (SPA) para precificação de produtos e serviços, desenvolvida em **Vue 3 + Vite + TypeScript + Tailwind CSS**.

Sistema desenvolvido pelo desenvolvedor **HOTWYL | WILLFROMBRASIL** — Grupo 3w Online.

## Stack

- Vue 3 (Composition API, `<script setup>`) + TypeScript
- Vite 5 (build/dev), base path `/calculadora_produto_servico/`
- Vue Router 4 (histórico HTML5) + Pinia (estado)
- Tailwind CSS 3 (tema claro/escuro via `class` + CSS variables)
- VueUse + @vueuse/motion (animações), @iconify/vue (ícones), vue-i18n
- SweetAlert2 (alertas), Zod / vee-validate / Maska (utilitários de formulário)
- Vitest (testes unitários), ESLint + Prettier

## Scripts

```bash
npm install        # instala dependências
npm run dev        # servidor de desenvolvimento (porta 3000)
npm run build      # checagem de tipos (vue-tsc) + build de produção
npm run preview    # pré-visualiza o build
npm test           # roda os testes (Vitest)
npm run lint       # ESLint
npm run format     # Prettier
```

## SEO / Analytics / Conformidade

- Meta tags SEO/GEO/AEO, Open Graph e Twitter Card no `index.html` e por rota (`useSeo`).
- Dados estruturados (JSON-LD): `WebApplication` + `FAQPage`.
- Google Tag Manager (`GTM-WVMJV7G6`) e Google Analytics 4 (`G-J06THXX0MW`).
- Banner de cookies com Google Consent Mode v2 (LGPD, GDPR, CCPA, POPIA).

## Deploy na HostGator (hospedagem compartilhada)

1. Rode `npm run build`. O resultado fica na pasta `dist/`.
2. Envie **todo o conteúdo de `dist/`** para a pasta do subdiretório no servidor:
   `public_html/calculadora_produto_servico/`
3. O arquivo `.htaccess` (já incluído no build) cuida do roteamento SPA,
   redirecionamento para HTTPS, cabeçalhos de segurança, compressão e cache.
4. Confirme que o `RewriteBase` do `.htaccess` corresponde ao subdiretório
   (`/calculadora_produto_servico/`).

> Caso o app rode em outro caminho, ajuste `base` em `vite.config.ts`,
> `homepage` no `package.json` e o `RewriteBase` em `public/.htaccess`.
