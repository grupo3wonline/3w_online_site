# Implementation Plan — 62 Soluções Digitais

> Worktree: `d:/laragon/www/3wonline/0/0-dev/sys/dev/3w_online_site/.worktrees/feature-62-solucoes`
> Sources: `d:/laragon/www/3wonline/0/0-dev/sys/dev/3w_online_site/src/views/solucoees/` (**main project dir, not worktree**)

This plan is decomposed into 5 FEATs. See the companion FEAT JSON files for coder-ready steps.

---

## FEAT-001 — Infra: Navbar + SolucaoLayout + SolucaoView + Router + Catalog

- [ ] 1. **T1 — Navbar Soluções dropdown (desktop + mobile)**
      Add `solucoesOpen = ref(false)` and `isSolucoesActive = computed(() => route.path.startsWith('/solucoes'))`.
      Add `solucoesCategories` array with 6 items (icon, color, path, label).
      Insert dropdown `<div class="relative">` after the Ferramentas `<RouterLink>` in desktop nav.
      Add `{ path: '/solucoes', label: 'Soluções Digitais', icon: 'mdi:rocket-launch-outline', badge: '62 Apps' }` to `mobileLinks` after the Ferramentas entry.
      Files: `src/components/layout/AppNavbar.vue`
      Verify: `npx vue-tsc -b --noEmit` — no type errors; navbar renders dropdown and mobile entry.

- [ ] 2. **T2 — SolucaoLayout.vue**
      Breadcrumb bar (dark navy gradient, matches ToolWrapper): Início > Soluções > `name` prop.
      Promo carousel (identical markup to ToolWrapper's promo section — same `promos[]` array + prevPromo/nextPromo + 4-second interval).
      Privacy seal (identical to ToolWrapper's emerald bar).
      Share row: Compartilhar (WhatsApp) + Copiar Link (copy to clipboard with `copied` ref).
      `<slot />` for the tool body.
      File: `src/components/solucoes/SolucaoLayout.vue`
      Verify: component compiles with `npx vue-tsc -b --noEmit`.

- [ ] 3. **T2 — src/components/solucoes/index.ts (skeleton)**
      Export `type SolucaoLoader = () => Promise<{ default: Component }>` and
      `export const solucoesMap: Record<string, SolucaoLoader> = {}` — empty; each FEAT adds its entries.
      File: `src/components/solucoes/index.ts`
      Verify: `npx vue-tsc -b --noEmit`.

- [ ] 4. **T2 — SolucaoView.vue**
      Reads `route.params.slug as string`.
      Imports `solucoesMap` from `@/components/solucoes/index`.
      Wraps everything in `<SolucaoLayout :name="meta.name">`.
      If `solucoesMap[slug]` exists: renders `defineAsyncComponent(solucoesMap[slug])` inside the slot.
      If not: renders a "Em breve" placeholder card (dark navy background, rocket icon, message "Estamos portando esta ferramenta. Volte em breve!").
      Has `const solutionMeta` map (all 62 slugs → `{ name: string }`), so the breadcrumb always shows a readable title.
      File: `src/views/SolucaoView.vue`
      Verify: `npx vue-tsc -b --noEmit`.

- [ ] 5. **T4 — src/router/solucoes.ts**
      Catalog route: `{ path: '/solucoes', name: 'Solucoes', component: () => import('@/views/Solucoes.vue'), meta: { title: '62 Soluções Digitais Gratuitas | 3W Online', ... } }`.
      62 individual routes under path `/solucoes/<slug>`, each with unique name `Solucao<PascalCase>`, component `() => import('@/views/SolucaoView.vue')`, and meta with the solution's display title.
      Export `solucoesRoutes: RouteRecordRaw[]`.
      File: `src/router/solucoes.ts`
      Verify: `npx vue-tsc -b --noEmit`.

- [ ] 6. **T5 — src/views/Solucoes.vue (catalog)**
      Reads `route.query.cat` on mount and when query changes (`watch`).
      `selectedCat = ref<string>('todas')` — initialised from query param.
      `categories` array matching the 6 nav categories plus "Todas".
      `solutions` array: 62 items with `{ slug, name, category, description, icon }`.
      Filtered computed based on `selectedCat`.
      Layout: dark navy header + promo banner + filter chips row + card grid.
      Each card links to `/solucoes/<slug>`.
      File: `src/views/Solucoes.vue`
      Verify: `npx vue-tsc -b --noEmit`.

- [ ] 7. **Update router/index.ts**
      Import `solucoesRoutes` from `./solucoes` and spread into routes array before `toolsRoutes` (after the existing static routes, before error pages).
      File: `src/router/index.ts`
      Verify: `npm run build` — build succeeds with 0 TS errors.

---

## FEAT-002 — Vue→Vue Batch 1 (18 components)

Port 18 Vue solutions. For each:
- Read `src/views/solucoees/<folder>/src/` files
- Create `src/components/solucoes/<slug>.vue` as a self-contained SFC
- Inline all Pinia state as `ref/reactive`; keep business logic pure; use `@iconify/vue` Icon; use Tailwind only
- After all 18 are done, add their `solucoesMap` entries to `src/components/solucoes/index.ts`

Slugs: `analisador-texto`, `calculadora-aluguel-facil`, `calculadora-campanha-trafego`, `calculadora-churrasco`, `calculadora-empresarial`, `calculadora-evento`, `calculadora-freelance`, `calculadora-imc`, `calculadora-indicadores-financeiros`, `calculadora-metragem-cabo`, `calculadora-orcamento-marketing-digital`, `calculadora-ponto-eletrico`, `calculadora-preco`, `calculadora-produto-servico`, `calculadora-programadores`, `calculadora-saude`, `calculadora-social-midia`, `code-logic-flow-studio`.

Verify: `npm run build` — build succeeds; all 18 components resolve without import errors.

---

## FEAT-003 — Vue→Vue Batch 2 (18 components)

Same porting approach as FEAT-002.

Slugs: `code-master`, `dados-brasil-generator-pro`, `dev-playground`, `dev-start`, `dev-toolkit-suite-essentials`, `empreenda-facil`, `entity-converter-pro`, `excel-consolidator`, `gerador-legenda`, `investsim`, `marca-dagua`, `orcamento-social-midia`, `rendimento-salarial`, `seu-peso`, `simuladores-empresariais`, `srt-converter-pro`, `thumbnail-pro`, `thumbnail-youtube`.

Verify: `npm run build` — succeeds.

---

## FEAT-004 — React→Vue Batch 1 (13 components)

Convert 13 React (TSX/JSX) solutions to Vue 3 SFCs. Mapping rules:
- `useState(x)` → `ref(x)`
- `useEffect(() => fn, [dep])` → `watch([dep], fn)` or `onMounted`
- `className` → `class`
- JSX → `<template>` with Vue bindings
- `onClick={fn}` → `@click="fn"`
- Remove React-specific imports; add `@iconify/vue` Icon when icons needed

Slugs: `code-gen`, `color-craft`, `conversor-cores`, `convert-share`, `digitador`, `divisor-texto`, `extrator-email-cpf-cnpj`, `extrator-texto`, `finance-flow`, `gerador-fatura`, `gerador-gradiente`, `ipsum-generator-plus`, `manipulador-lista`.

After conversion, add their entries to `src/components/solucoes/index.ts`.

Verify: `npm run build` — succeeds.

---

## FEAT-005 — React→Vue Batch 2 (13 components) + index.ts complete

Convert 9 more React solutions, plus 4 fallback stubs for plain-HTML tools.

Slugs (React→Vue): `meu-bolso-mensal`, `modificador-texto`, `pdf-convert-pro`, `planejador-casamento`, `qr-code-pro`, `secure-secret-generator`, `sorteio-facil`, `teste-personalidade`, `watermark-wizard`.

Fallback stubs (plain HTML, no portable source): `extrator-email`, `consulta-pix`, `teste-vocacional`, `wordcraft-pro`.
Each fallback stub is a minimal Vue SFC that renders a "Ferramenta disponível em formato standalone" message with a note that the tool will be integrated soon.

Then populate `src/components/solucoes/index.ts` with ALL 62 entries in one final edit.

Verify: `npm run build` — succeeds; `npx vitest run` — existing tests still pass.

---

## Digest

| File | Block to change | Test |
|---|---|---|
| `src/components/layout/AppNavbar.vue` | Add `solucoesOpen`, `isSolucoesActive`, `solucoesCategories`; insert dropdown markup after Ferramentas link; add mobile entry | `npx vitest run` — existing navbar tests pass |
| `src/components/solucoes/SolucaoLayout.vue` | New file; breadcrumb + promo + privacy seal + share buttons + slot | `npx vue-tsc -b --noEmit` |
| `src/components/solucoes/index.ts` | New file; grows from empty map → 62 entries across FEATs | `npx vue-tsc -b --noEmit` |
| `src/views/SolucaoView.vue` | New file; reads slug param, loads from solucoesMap, fallback card | `npx vue-tsc -b --noEmit` |
| `src/router/solucoes.ts` | New file; 63 routes (1 catalog + 62 individual) | `npx vue-tsc -b --noEmit` |
| `src/views/Solucoes.vue` | New file; catalog with ?cat= filter | `npx vue-tsc -b --noEmit` |
| `src/router/index.ts` | Import and spread `solucoesRoutes` | `npm run build` |
| `src/components/solucoes/<slug>.vue` × 62 | New files; ported logic | `npm run build` |

**Build command**: `npm run build` (in worktree: runs `vue-tsc -b && vite build`)
**Test command**: `npx vitest run` (uses `vitest.config.js`, glob `src/tests/**/*.test.ts`)
**Tests passing today**: AppBreadcrumb, CookieBanner, useCSRFToken, useDarkMode, useDebounce, useHoneypot, security/forms (7 test files, confirmed by prior FEAT-004 commit)
**Source solutions path**: `d:/laragon/www/3wonline/0/0-dev/sys/dev/3w_online_site/src/views/solucoees/` — this is in the **main repo**, not the worktree; use absolute paths when reading sources
