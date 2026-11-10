# Relatório de Refatoração — Migração React → Vue 3

## Status: concluído

A aplicação **Calculadora de Preços** foi migrada de **React 18** para **Vue 3 + Vite + TypeScript**, com reconstrução completa de UI/UX, SEO, segurança, conformidade legal e testes. Todo o conteúdo textual das páginas originais foi preservado.

Base de deploy: `/calculadora_preco/` (hospedagem compartilhada HostGator).

---

## O que foi feito

### Stack
- Vue 3 (`<script setup>`), Vite 5, TypeScript, Tailwind CSS, shadcn-vue (reka-ui).
- Vue Router (history, base `/calculadora_preco/`, lazy loading por rota).
- Pinia (tema, loading global, consentimento).
- vee-validate + Zod, @unhead/vue (SEO), vue-i18n (pt-BR).
- @iconify/vue + Font Awesome, @vueuse/core, @vueuse/motion, ApexCharts, SweetAlert2, Maska.
- @sentry/vue (via env), ESLint + Prettier + Husky + lint-staged, Vitest + Playwright.

### Estrutura e páginas
- **Landing hotsite** unificando Home + Sobre + Serviços + Contato em seções com âncoras.
- **Calculadora** em rota própria (`/calculadora`), com gráfico de composição do preço (ApexCharts), validação (Zod), máscara, tooltips e `autocomplete="off"`.
- **Termos** e **Privacidade** (LGPD, GDPR, CCPA e POPIA).
- Páginas de erro **404** e **erro genérico**.
- Cabeçalho e rodapé em todas as páginas; menu **sem** o link "Ferramentas"; breadcrumb nas páginas internas.
- Rodapé com crédito: **sistema desenvolvido pelo desenvolvedor HOTWYL | WILLFROMBRASIL** e CTAs do **Grupo 3w Online** com gatilhos de escassez/urgência.
- Contato: WhatsApp (41) 99692-4829 e e-mail contato@3wonline.com.br — sem formulário, sem iframe Freshdesk.

### SEO / Analytics / Conformidade
- Meta tags completas, Open Graph, Twitter Card, JSON-LD (WebApplication), canonical por rota (@unhead/vue).
- robots.txt e sitemap.xml.
- Google Tag Manager (GTM-WVMJV7G6) e GA4 (G-J06THXX0MW) com **Consent Mode** (negado por padrão até o aceite no banner de cookies).
- Tema claro/escuro persistente; overlay de loading ofuscado.

### Segurança e deploy
- `public/.htaccess`: rewrite SPA em subdiretório + cabeçalhos de segurança (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy), compressão e cache.
- Entradas validadas (Zod); links externos com `rel="noopener noreferrer"`.

### Qualidade e testes
- ESLint + Prettier: sem erros/avisos.
- Vitest: 20 testes unitários (lógica de cálculo, utilitários, store de consentimento) — todos passam.
- Playwright: 11 cenários E2E × 2 (Chromium + mobile) = 22 — todos passam. Cobrem navegação de todas as rotas, 404, ausência do link "Ferramentas", cabeçalho/rodapé em todas as páginas, fluxo completo da calculadora, tema e banner de cookies.
- Build de produção (`vue-tsc` + Vite): sem erros.

---

## Observações e pendências

1. **Vulnerabilidades `npm audit`:** restam 5, **todas em devDependencies** (esbuild/vite/vite-node/@vitest/mocker/vitest). Não afetam o bundle de produção (`dist/`). A correção completa exigiria `vite@8`/`vitest@5` (breaking changes) e foi adiada para não desestabilizar a stack. As vulnerabilidades de maior severidade (unhead, no `useHeadSafe`) foram resolvidas atualizando `@unhead/vue` para 2.x — e o projeto não usa `useHeadSafe`.

2. **Imagem `og-image.jpg`:** referenciada nas meta tags de compartilhamento, mas ainda **não existe** em `public/`. Recomenda-se adicionar uma imagem 1200×630 para os previews de redes sociais. Favicon e apple-touch-icon já foram gerados (SVG com a identidade violet/pink).

3. **IDs de GA4/GTM** estão fixos conforme fornecido; ajuste em `.env` / `index.html` se necessário.

---

Desenvolvido pelo desenvolvedor **HOTWYL | WILLFROMBRASIL** · Grupo 3w Online (www.3wonline.com.br)
