# Analisador de Texto

Ferramenta web gratuita para análise e comparação de textos, com processamento **100% local no navegador** (nenhum texto é enviado a servidores). SPA estática, mobile-first, acessível e otimizada para SEO.

**Versão:** 3.0.0 · **Base path:** `/analisador_texto/`

## Funcionalidades

- Contagem de caracteres (com e sem espaços), palavras, sentenças, parágrafos e linhas
- Tempo de leitura estimado e média de palavras por sentença
- Comparação lado a lado de dois textos com diferença absoluta e percentual
- Filtros inteligentes (ignorar espaços, pontuação, números)
- Upload de arquivos `.txt` (até 5 MB, validado)
- Busca aproximada (fuzzy) de termos no texto (Fuse.js)
- Tema claro/escuro com persistência
- Landing page em formato hotsite (Home + Sobre + Serviços + Contato unificados)
- Consentimento de cookies granular — **LGPD, GDPR, CCPA e POPIA** (Google Consent Mode v2)

## Stack

| Camada         | Tecnologia                                          |
| -------------- | --------------------------------------------------- |
| Framework      | Vue.js 3 (Composition API, `<script setup lang="ts">`) |
| Linguagem      | TypeScript (strict)                                 |
| Build          | Vite 5                                              |
| Estado         | Pinia                                               |
| Rotas          | Vue Router 4 (`createWebHistory('/analisador_texto/')`) |
| Estilo         | Tailwind CSS 3 (dark mode via classe)               |
| i18n           | vue-i18n (pt-BR)                                     |
| Validação      | Zod + vee-validate                                  |
| Utilitários    | VueUse, date-fns, Fuse.js                           |
| Ícones         | Font Awesome 6 (CDN)                                |
| Animações      | @vueuse/motion                                      |
| Alertas        | SweetAlert2                                         |
| Monitoramento  | @sentry/vue (opcional, via `VITE_SENTRY_DSN`)       |
| Qualidade      | ESLint + Prettier + Husky + lint-staged             |
| Testes         | Vitest (unidade) + Playwright (E2E)                 |
| Analytics      | GTM `GTM-WVMJV7G6` + GA4 `G-J06THXX0MW`             |

## Comandos

```bash
npm install          # instalar dependências
npm run dev          # servidor de desenvolvimento (porta 3000)
npm run build        # type-check + build de produção (dist/)
npm run preview      # pré-visualizar o build (porta 4173)
npm run type-check   # apenas checagem de tipos
npm run lint         # ESLint com --fix
npm run format       # Prettier
npm run test         # testes de unidade (Vitest)
npm run test:e2e     # testes E2E (Playwright — requer 'npx playwright install')
```

> **Windows:** `npm run dev` e `npm run preview` são processos de longa duração — rode-os em um terminal próprio.

## Variáveis de ambiente

Copie `.env.example` para `.env`. Todas são opcionais (a app funciona sem elas):

- `VITE_SITE_URL` — URL canônica base
- `VITE_GA4_ID`, `VITE_GTM_ID` — IDs de analytics
- `VITE_SENTRY_DSN` — ativa o Sentry apenas se preenchido

## Deploy na HostGator (hospedagem compartilhada)

1. `npm run build` gera a pasta `dist/`.
2. Envie **todo o conteúdo de `dist/`** para a pasta `public_html/analisador_texto/` no servidor.
3. O arquivo `.htaccess` (já incluído em `dist/`) cuida do roteamento SPA (history mode), headers de segurança, gzip e cache. Ele assume o caminho `/analisador_texto/` — ajuste o `RewriteBase` se publicar em outro subdiretório.
4. Confira `robots.txt`, `sitemap.xml` e `manifest.json` na raiz de `/analisador_texto/`.

O `.htaccess` já define: fallback de rotas para `index.html`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security` (habilite só com SSL), `Content-Security-Policy`, compressão gzip e cache de assets.

## Segurança e privacidade

- Processamento 100% local — nenhum texto sai do navegador.
- Sanitização de entrada (limite de 500.000 caracteres, remoção de caracteres de controle).
- Validação de upload por tipo e tamanho (Zod).
- Consentimento explícito, granular e revogável (rodapé → "Preferências de privacidade").
- Headers de segurança e CSP no `.htaccess`.
- `drop_console` / `drop_debugger` no build de produção.

### Auditoria de dependências

- **0 vulnerabilidades** nas dependências de produção (`npm audit --omit=dev`).
- Alertas remanescentes do `npm audit` referem-se apenas a ferramentas de desenvolvimento (dev server do Vite/esbuild) e não afetam o bundle estático publicado.

## Escopo técnico (decisões)

Este é um SPA **estático** hospedado em HostGator compartilhado. Tecnologias que exigem
servidor Node persistente foram intencionalmente **não incluídas** por serem incompatíveis com o
ambiente de deploy e sem função no domínio da ferramenta (sem contas de usuário, sem backend):
Drizzle ORM, Better Auth, BullMQ, Nodemailer, Sharp, @upstash/ratelimit, unstorage server-side,
pino server-side, TanStack Query/Table e CASL. As bibliotecas do escopo que agregam valor no
front-end foram adotadas (ver tabela de stack).

## Desenvolvido por

**HOTWYL | WILLFROMBRASIL** — [Grupo 3W Online](https://www.3wonline.com.br)
Desenvolvimento de sites e sistemas personalizados sob demanda.
