# Calculadora de Projetos para Programadores

Ferramenta gratuita para programadores e freelancers calcularem orçamentos de projetos de software com precisão. Landing page em formato hotsite + calculadora interativa.

Desenvolvido pelo **Grupo 3w Online** — sites e sistemas personalizados sob demanda.
Sistema desenvolvido pelo desenvolvedor **HOTWYL | WILLFROMBRASIL**.

## Stack

- **Vue 3** + **Vite** + **TypeScript**
- **Tailwind CSS** (mobile first, tema claro/escuro)
- **Vue Router** (base path `/calculadora_programadores/`)
- **Pinia** (tema, UI/loading, consentimento de cookies)
- **Zod** (validação)
- **@iconify/vue** (ícones offline: Lucide + Font Awesome Brands) e **Font Awesome** (CDN)
- **SweetAlert2** (alertas)
- **@vueuse/motion** (animações) e **vue-i18n** (pt-BR)
- **Vitest** (unit) + **Playwright** (E2E)
- **ESLint** + **Prettier** + **lint-staged** + **Husky**

> A stack foi enxugada: pacotes sem uso real (CASL, TanStack Table, ApexCharts, Fuse.js, Maska, vee-validate, date-fns, Sentry) foram removidos para reduzir peso e complexidade.

## Calculadora de orçamentos

A ferramenta (`/ferramenta`) estima projetos com base em:

- **Valor por hora** e **multiplicador de urgência** (normal/urgente/muito urgente).
- **Tarefas** com horas, **complexidade** (baixa 1x, média 1.5x, alta 2.2x) e tecnologia.
- **Condições comerciais**: desconto (%), impostos (%), horas por dia útil, validade (dias),
  forma de pagamento e observações.

Cálculos automáticos em tempo real:

- **Subtotal**, desconto, impostos e **total final**.
- **Prazo estimado** em dias úteis (total de horas ÷ horas por dia) e **data de entrega** prevista.

### Geração e impressão do orçamento

Ao clicar em **Gerar Orçamento**, é emitido um documento em `/orcamento` com:

- Número do orçamento (`ORC-AAAAMMDD-XXX`), data de emissão e **validade** (data de expiração).
- Dados do cliente/projeto, tabela de tarefas, totais, prazo e forma de pagamento.
- Dados de contato do Grupo 3w Online.

A página tem **versão de impressão** (botão *Imprimir / Salvar PDF*), com CSS `@media print` que
oculta cabeçalho, rodapé e demais elementos de navegação, deixando apenas o documento.

## Scripts

```bash
npm install          # instala dependências
npm run dev          # ambiente de desenvolvimento
npm run build        # type-check + build de produção (gera /dist)
npm run preview      # pré-visualiza o build
npm run test         # testes unitários (Vitest)
npm run test:e2e     # testes E2E (Playwright)
npm run lint         # ESLint --fix
npm run icons        # regenera o subset de ícones (src/lib/icon-data.ts)
```

## SEO / SEM / GEO / AEO

- Meta tags completas, Open Graph, Twitter Card e canonical em `index.html` e por rota (`useSeo`).
- Dados estruturados JSON-LD: `WebApplication` + `FAQPage` (AEO).
- Google Tag Manager (`GTM-WVMJV7G6`) e Google Analytics 4 (`G-J06THXX0MW`), com consentimento (LGPD/GDPR/CCPA/POPIA).
- `robots.txt` e `sitemap.xml` em `public/`.

## Privacidade e Conformidade

Banner de consentimento de cookies e página de Política de Privacidade cobrindo LGPD, GDPR, CCPA e POPIA. Analytics só dispara após consentimento.

## Deploy em hospedagem compartilhada (HostGator)

O app roda no subdiretório `/calculadora_programadores/`.

1. Gere o build:
   ```bash
   npm run build
   ```
2. Envie **todo o conteúdo da pasta `dist/`** para o diretório do site na HostGator, dentro de:
   ```
   public_html/calculadora_programadores/
   ```
3. O arquivo `.htaccess` (já incluído em `dist/`) cuida do fallback de rotas da SPA e aplica os cabeçalhos de segurança (CSP, HSTS, X-Frame-Options etc.).
4. Certifique-se de que o `mod_rewrite`, `mod_headers` e `mod_deflate` estejam habilitados (padrão na HostGator).

> Se publicar em outro domínio/subpasta, ajuste `base` em `vite.config.ts`, `RewriteBase` no `.htaccess` e o `basename` do router.

## Variáveis de ambiente

Copie `.env.example` para `.env` e configure conforme necessário:

- `VITE_SENTRY_DSN` — DSN do Sentry (opcional; vazio = desativado).
- `VITE_SITE_URL` — URL pública (opcional).
