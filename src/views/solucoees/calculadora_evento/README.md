# EventCalc — Calculadora de Eventos

Calculadora profissional e gratuita de custos para eventos corporativos, retiros e viagens de equipe. Desenvolvida pelo **Grupo 3W Online** e publicada sob o subdiretório `/calculadora_evento/`.

## Stack

- **Vue 3** (Composition API, `<script setup>`) + **TypeScript**
- **Vite 5** (build) — servido em `/calculadora_evento/`
- **Tailwind CSS 3** com variáveis CSS para temas (claro/escuro)
- **Vue Router** (modo history) + **Pinia** (estado: tema, loading, consentimento)
- **Zod** (validação) + **Maska** (máscara monetária pt-BR)
- **vue-i18n** (pt-BR)
- **SweetAlert2** (modais) + **Font Awesome** (ícones)
- **@sentry/vue** (monitoramento opcional, por variável de ambiente)
- **Vitest** (testes unitários) + **Playwright** (E2E) + **ESLint/Prettier** + **Husky/lint-staged**

## Requisitos

- Node.js 18+ e npm

## Desenvolvimento

```sh
npm install        # instala dependências
npm run dev        # servidor de desenvolvimento (porta 8080)
```

## Scripts

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Typecheck (`vue-tsc`) + build de produção |
| `npm run preview` | Pré-visualiza o build (porta 4173, com fallback SPA) |
| `npm run lint` / `npm run lint:fix` | Linting |
| `npm run format` | Formata com Prettier |
| `npm run typecheck` | Checagem de tipos |
| `npm run test` | Testes unitários (Vitest) |
| `npm run test:coverage` | Cobertura de testes |
| `npm run test:e2e` | Testes end-to-end (Playwright) |

## Variáveis de Ambiente

Copie `.env.example` para `.env` e ajuste conforme necessário:

```sh
VITE_SENTRY_DSN=                     # deixe vazio para desativar o Sentry
VITE_SENTRY_TRACES_SAMPLE_RATE=0.1
```

Nenhum dado é enviado ao Sentry sem um DSN configurado.

## Analytics

Google Tag Manager (`GTM-WVMJV7G6`) e Google Analytics 4 (`G-J06THXX0MW`) estão integrados no `index.html` com **Consent Mode v2**: nenhum cookie de análise/marketing é ativado até o consentimento do usuário (LGPD/GDPR/CCPA/POPIA).

## Deploy na HostGator (hospedagem compartilhada)

O app é uma SPA estática servida a partir do subdiretório `/calculadora_evento/`.

1. **Gerar o build:**

   ```sh
   npm install
   npm run build
   ```

   Isso cria a pasta `dist/` já com o `.htaccess`, `manifest.json`, `robots.txt` e `sitemap.xml`.

2. **Enviar os arquivos:** copie **todo o conteúdo de `dist/`** (não a pasta em si) para a pasta do subdiretório no servidor, por exemplo:

   ```
   public_html/calculadora_evento/
   ```

   Use o Gerenciador de Arquivos do cPanel ou FTP. Garanta que o arquivo oculto `.htaccess` também seja enviado.

3. **Conferir o caminho base:** o app está fixado em `/calculadora_evento/`. Se publicar em outro subdiretório, ajuste **antes do build**:
   - `vite.config.ts` → `base`
   - `package.json` → `homepage`
   - `src/router.ts` → `createWebHistory('/<subdir>/')`
   - `public/.htaccess` → `RewriteBase` e `ErrorDocument`
   - `public/manifest.json` → `start_url`, `scope`, `icons`
   - `index.html` → `canonical`, `og:url` e caminhos de assets

4. **Verificar após o deploy:**
   - A home carrega em `https://SEU_DOMINIO/calculadora_evento/`
   - Deep links funcionam (ex.: `/calculadora_evento/termos-de-uso` não dá 404 — o `.htaccess` faz o fallback)
   - HTTPS está ativo (o `.htaccess` força o redirecionamento)
   - Enviar o `sitemap.xml` no Google Search Console

## Segurança

O `public/.htaccess` aplica: HTTPS forçado, HSTS, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` e uma **Content Security Policy** que libera apenas GTM/GA, Google Fonts e Font Awesome. Os cabeçalhos dependem dos módulos `mod_headers`, `mod_rewrite` e `mod_expires` (padrão na HostGator).

## Estrutura

```
src/
├── assets/styles.css       # Tailwind + variáveis de tema
├── components/             # AppHeader, AppFooter, CalculatorTool, CookieConsent, LoadingOverlay
├── i18n/                   # vue-i18n (pt-BR)
├── lib/                    # calc.ts (regras de negócio + Zod), utils.ts, sentry.ts
├── pages/                  # HomePage (landing), Termos, Política, 404, Erro
├── stores/                 # Pinia: theme, ui, consent
├── App.vue
├── main.ts
└── router.ts
e2e/                        # testes Playwright
```

## Licença

© Grupo 3W Online. Desenvolvido por HOTWYL | WILLFROMBRASIL.
