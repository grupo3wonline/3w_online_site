# Resultados dos Testes Vitest

**Data e hora:** 2026-02-11 — 20:27 (horário local)
**Worktree:** `d:/laragon/www/3wonline/0/0-dev/sys/dev/3w_online_site/.worktrees/refactor-audit`
**Comando:** `npx vitest --run`

---

## Saída Completa

```
 RUN  v1.6.1 D:/laragon/www/3wonline/0/0-dev/sys/dev/3w_online_site/.worktrees/refactor-audit

 ✓ src/tests/composables/useDebounce.test.ts (3)
 ✓ src/tests/security/forms.test.ts (3)
 ✓ src/tests/composables/useDarkMode.test.ts (4)
 ✓ src/tests/components/AppBreadcrumb.test.ts (3)
 ✓ src/tests/components/CookieBanner.test.ts (3)
 ✓ src/tests/composables/useCSRFToken.test.ts (4)
 ✓ src/tests/composables/useHoneypot.test.ts (3)

 Test Files  7 passed (7)
      Tests  23 passed (23)
   Start at  20:27:28
   Duration  3.24s (transform 544ms, setup 1ms, collect 1.37s, tests 134ms, environment 7.91s, prepare 1.77s)
```

---

## Observações

- **0 falhas** — todos os 23 testes passaram.
- Avisos de `[Vue warn]: onMounted is called when there is no active component instance` nos testes do `useDarkMode` são esperados e não causam falhas. O composable usa `onMounted` para inicialização, que não é executado fora de um contexto de componente (o comportamento correto em testes unitários diretos).
- O `vi.hoisted` foi utilizado no `CookieBanner.test.ts` para garantir que as variáveis mock fiquem acessíveis no factory do `vi.mock`, conforme o padrão recomendado pelo Vitest para ESM.

---

## Arquivos de Teste Criados

| Arquivo | Suite | Testes |
|---|---|---|
| `src/tests/composables/useDebounce.test.ts` | `debounce` | 3 |
| `src/tests/composables/useCSRFToken.test.ts` | `useCSRFToken` | 4 |
| `src/tests/composables/useHoneypot.test.ts` | `useHoneypot` | 3 |
| `src/tests/composables/useDarkMode.test.ts` | `useDarkMode` | 4 |
| `src/tests/components/AppBreadcrumb.test.ts` | `AppBreadcrumb` | 3 |
| `src/tests/components/CookieBanner.test.ts` | `CookieBanner` | 3 |
| `src/tests/security/forms.test.ts` | `Segurança de Formulários` | 3 |
| **Total** | — | **23** |

---

## Build Final

```
npm run build → vue-tsc -b && vite build
✓ 353 modules transformed.
✓ built in 20.05s
```

Resultado: **zero erros de TypeScript ou Vite**.
