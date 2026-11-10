# 🔌 CableCal - Calculadora de Metragem de Cabos

Ferramenta web **100% gratuita** para cálculo de metragem de cabos elétricos, voltada a
eletricistas, engenheiros e técnicos. Aplicação pública, client-side, sem cadastro.

Desenvolvido por **HOTWYL | WILLFROMBRASIL** · [Grupo 3W Online](https://www.3wonline.com.br)

## 🚀 Stack

- **Vue 3** (Composition API, `<script setup>`) + **TypeScript**
- **Vite 6** (build) · **Vue Router 4** (history mode) · **Pinia** (estado)
- **Tailwind CSS** (mobile first) · **@iconify/vue** (ícones) · **@vueuse/motion** (animações)
- **vue-i18n** (pt-BR) · **Zod** (validação) · **SweetAlert2** (alertas)
- **@sentry/vue** (monitoramento opcional) · **VueUse** (utilitários)
- **Vitest** (unit) · **Playwright** (e2e) · **ESLint + Prettier + Husky + lint-staged**

## 📋 Funcionalidades

- Landing page (hotsite/página de vendas) com benefícios, funcionalidades, como funciona,
  dicas, sobre, empresa desenvolvedora, contato e FAQ.
- Calculadora de metragem com ajuda contextual, tooltips, tema claro/escuro e loading overlay.
- SEO/SEM/GEO/AEO: metadados por rota, Open Graph, Twitter Card, JSON-LD, GA4 + GTM.
- Conformidade com **LGPD, GDPR, CCPA e POPIA** (banner de consentimento + Consent Mode).
- Acessibilidade: navegação por teclado, foco visível, skip link, contraste.

## 🛠️ Scripts

```sh
npm install          # instala dependências
npm run dev          # servidor de desenvolvimento
npm run build        # type-check (vue-tsc) + build de produção
npm run preview      # pré-visualiza o build
npm run lint         # ESLint --fix
npm run format       # Prettier
npm run test         # testes unitários (Vitest)
npm run test:e2e     # testes end-to-end (Playwright)
```

## ⚙️ Configuração (subdiretório)

O app é servido no subdiretório `/calculadora_metragem_cabo/`:

- `vite.config.ts` → `base: '/calculadora_metragem_cabo/'`
- `package.json` → `"homepage": "/calculadora_metragem_cabo/"`
- `router.ts` → `createWebHistory('/calculadora_metragem_cabo/')`
- Variáveis de ambiente em `.env` (veja `.env.example`).

## 📦 Deploy (HostGator - hospedagem compartilhada)

1. `npm run build`
2. Envie **todo o conteúdo de `dist/`** para a pasta pública no servidor, dentro de
   `public_html/calculadora_metragem_cabo/`.
3. O arquivo `.htaccess` (já incluído no build) cuida do fallback de SPA, HTTPS e headers
   de segurança. Confirme que `mod_rewrite`, `mod_headers`, `mod_deflate` e `mod_expires`
   estão habilitados na hospedagem.

Consulte `DEPLOY.md` para o passo a passo detalhado.

## 🔒 Segurança e privacidade

Aplicação pública sem backend. Consulte `SECURITY.md` para as medidas aplicadas e o escopo.

## 📄 Pendências de arte

Adicione em `public/` (referenciados no SEO): `og-image.jpg` (1200×630) e, opcionalmente,
`favicon.ico`. O `favicon.svg` já está incluído.
