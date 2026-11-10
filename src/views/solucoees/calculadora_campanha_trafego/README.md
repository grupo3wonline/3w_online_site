# Calculadora de Campanha de Tráfego Pago

> Ferramenta profissional e gratuita para gestores de tráfego calcularem ROI e gerarem orçamentos em PDF.

## 🚀 Tecnologias

- **Vue 3** + **TypeScript** — Interface reativa e tipada
- **Vite** — Build ultrarrápido
- **Vue Router** — Roteamento SPA (modo history)
- **Tailwind CSS 3** — Design system responsivo
- **@unhead/vue** — SEO dinâmico por página
- **SweetAlert2** — Alertas modernos
- **jsPDF** — Geração de orçamentos em PDF
- **Font Awesome 6** — Ícones profissionais
- **Vitest** — Testes automatizados
- **ESLint** + **Prettier** — Qualidade e padronização de código

## 📦 Instalação

```bash
npm install
```

## 🔨 Desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:8080/calculadora_campanha_trafego/](http://localhost:8080/calculadora_campanha_trafego/)

## 🏗️ Build de Produção

```bash
npm run build
npm run preview
```

## ✅ Qualidade

```bash
npm run type-check   # Checagem de tipos
npm run lint         # ESLint
npm run format       # Prettier
npm test             # Vitest
```

## 📁 Estrutura

```
src/
├── components/
│   ├── layout/          # AppNavbar, AppFooter, CookieBanner
│   └── ui/              # CtaSection, AppTooltip, AppBreadcrumb, LoadingOverlay
├── composables/         # useTema (tema claro/escuro)
├── pages/               # HomePage (landing unificada), FerramentaPage, TermosPage,
│                        # PrivacidadePage, NaoEncontradoPage (404)
├── router/              # index.ts (rotas + redirects para âncoras)
├── utils/               # alertas.ts (SweetAlert2), calculoTrafego.ts (+ testes)
├── App.vue              # Layout raiz (Navbar + RouterView + Footer + CookieBanner)
├── main.ts              # Entry point (createApp + head + router)
└── index.css            # Design System (Tailwind + @layer components/utilities)
```

A página inicial é uma landing page (hotsite) única com seções âncora: `#beneficios`,
`#como-funciona`, `#funcionalidades`, `#dicas`, `#sobre`, `#servicos`, `#faq`, `#contato`.
As rotas antigas `/sobre`, `/servicos` e `/contato` redirecionam para as âncoras correspondentes.

## 🔒 Segurança

- Processamento 100% local no navegador
- Nenhum dado enviado a servidores externos
- `autocomplete="off"` em todos os inputs
- Headers de segurança e CSP via `public/.htaccess`
- Conformidade LGPD / GDPR / CCPA / POPIA (Termos, Privacidade, Cookie Banner)

## 📊 SEO & Marketing

- Google Analytics 4 (GA4)
- Google Tag Manager (GTM)
- Google Search Console (sitemap.xml + robots.txt + meta de verificação)
- Schema.org (WebApplication)
- Open Graph + Twitter Card

## 🚢 Deploy (Hostgator / subdiretório)

O app é servido em `/calculadora_campanha_trafego/`. Após `npm run build`, envie o conteúdo
de `dist/` para a pasta correspondente na hospedagem. O `.htaccess` já cuida do fallback SPA.

## 👨‍💻 Desenvolvido por

**[Grupo 3W Online](https://www.3wonline.com.br)** — Sites e sistemas personalizados sob demanda.
Sistema desenvolvido por **HOTWYL | WILLFROMBRASIL**.

---

© 2026 Calculadora de Campanha de Tráfego — Grupo 3W Online. Todos os direitos reservados.
