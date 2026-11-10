# Calculadora de IMC

Aplicação web pública (client-side) para cálculo de IMC e metas de saúde: taxa
metabólica (TMB/GET), hidratação, macronutrientes, distribuição de refeições,
nutrientes essenciais e os 8 remédios naturais. Gera relatório em PDF.

## Stack

- Vue 3 + Vite 7 + TypeScript
- Vue Router 4 (history mode, base `/calculadora_imc/`)
- Pinia (tema e estado de UI)
- Interface em pt-BR (idioma único)
- Tailwind CSS 3 (tokens em `src/index.css`)
- Zod (validação)
- Iconify (`@iconify/vue`) e SweetAlert2
- jsPDF (relatório)
- Vitest (testes unitários)

## Requisitos

- Node.js 20+ e npm

## Scripts

```sh
npm install        # instala dependências
npm run dev        # servidor de desenvolvimento
npm run build      # type-check + build de produção (gera dist/)
npm run preview    # serve o build localmente
npm run lint       # ESLint
npm run test       # testes unitários (Vitest)
npm run test:e2e   # testes end-to-end (Playwright)
npm run gen:images # regenera og-image.jpg e screenshot.jpg
```

## Monitoramento (Sentry)

O Sentry é opcional e só é ativado quando `VITE_SENTRY_DSN` está definido.
Copie `.env.example` para `.env` (ou `.env.production`) e informe o DSN. Sem
DSN, o monitoramento fica desativado (padrão em desenvolvimento).

## Estrutura

- `src/lib/imc/` — motor de cálculo puro e testável (sem UI)
- `src/components/` — layout, calculadora, comuns e UI
- `src/views/` — páginas (Home, Calculadora, Contato, Termos, Privacidade, 404)
- `src/router/` — rotas com metadados de SEO por página
- `src/stores/` — Pinia (tema, UI/loading, histórico)
- `public/` — favicon, manifest, robots, sitemap, `.htaccess`

## Deploy (hospedagem compartilhada / HostGator)

O app é servido no subdiretório `/calculadora_imc/`.

1. `npm run build`
2. Envie o conteúdo de `dist/` para a pasta `calculadora_imc/` no servidor.
3. O `.htaccess` (incluído no build) trata o fallback de rotas do SPA e cabeçalhos.

## Privacidade

100% client-side. Os dados informados são processados no navegador e não são
enviados a servidores. Em conformidade com LGPD, GDPR, CCPA e POPIA.

---

sistema desenvolvido pelo desenvolvedor **HOTWYL | WILLFROMBRASIL** — parte do
**Grupo 3W Online** (sites e sistemas personalizados sob demanda):
[www.3wonline.com.br](https://www.3wonline.com.br)
