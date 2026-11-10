# Empreenda Fácil — Geradores para Empreendedores

Web app de geradores gratuitos de **orçamentos**, **ordens de serviço** e **recibos** profissionais.
Os documentos são gerados 100% no navegador (nenhum dado é enviado a servidores).

Desenvolvido por **HOTWYL | WILLFROMBRASIL** para o **Grupo 3w Online**.

## Stack

- **Vue 3** + **Vite** + **TypeScript**
- **Vue Router** (history mode) e **Pinia**
- **Tailwind CSS** (design tokens, dark mode, mobile first)
- **VueUse** + **@vueuse/motion** (reatividade e animações)
- **@iconify/vue** + **Font Awesome** (ícones)
- **SweetAlert2** (alertas), **Maska** (máscaras), **date-fns**
- **vue-i18n** (pt-BR)
- **Vitest** (unit) + **Playwright** (e2e), **ESLint** + **Prettier**, **Husky** + **lint-staged**

## Scripts

```bash
npm run dev        # servidor de desenvolvimento
npm run build      # type-check + build de produção (gera dist/)
npm run preview    # pré-visualiza o build
npm run test       # testes unitários (Vitest)
npm run test:e2e   # testes e2e (Playwright)
npm run lint       # ESLint + correções
npm run format     # Prettier
```

## Estrutura

```
src/
  components/
    ui/        # componentes de UI reutilizáveis (Button, Card, Input...)
    layout/    # Header, Footer, Breadcrumb, CookieBanner, LoadingOverlay
    forms/     # PageHeader, PartyFields
  composables/ # useTheme, useSeo, useDocumentParties
  config/      # site.ts (dados institucionais), navigation.ts
  lib/         # format, print, notify, utils
  pages/       # páginas mapeadas no router
  stores/      # loading (Pinia)
  router/      # rotas com meta de SEO
  i18n/        # traduções pt-BR
```

## SEO / GEO / Analytics

- Meta tags dinâmicas por rota (`useSeo`), Open Graph, Twitter Cards e JSON-LD.
- `public/sitemap.xml` e `public/robots.txt`.
- Google Tag Manager (`GTM-WVMJV7G6`) e GA4 (`G-J06THXX0MW`) em `index.html`.
- Registre o site no **Google Search Console** e envie o `sitemap.xml`.

## Privacidade

Banner de consentimento e página de política em conformidade com **LGPD, GDPR, CCPA e POPIA**.

## Deploy na HostGator (hospedagem compartilhada)

O app roda no subdiretório `/empreenda_facil_gerador/`.

1. Gere o build:
   ```bash
   npm run build
   ```
2. Envie **todo o conteúdo de `dist/`** para a pasta
   `public_html/empreenda_facil_gerador/` via FTP/Gerenciador de Arquivos.
3. O arquivo **`.htaccess`** já vai incluído no build (a partir de `public/.htaccess`)
   e cuida do roteamento SPA, cabeçalhos de segurança, compressão e cache.
4. Garanta que o domínio use HTTPS (a regra HSTS assume conexão segura).

> O `base` do Vite, o `homepage` do `package.json` e o `createWebHistory`
> já estão configurados com `/empreenda_facil_gerador/`. Para mudar o caminho,
> ajuste os três pontos.
