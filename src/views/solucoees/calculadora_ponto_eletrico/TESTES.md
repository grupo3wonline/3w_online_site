# Guia de Testes Automatizados

## Configuração de Testes

Para implementar testes automatizados completos nesta aplicação, siga os passos abaixo:

### 1. Instalar Dependências de Teste

```powershell
npm install -D vitest @vue/test-utils jsdom @vitest/ui
npm install -D playwright @playwright/test
```

### 2. Configurar Vitest (vitest.config.js)

Crie o arquivo `vitest.config.js` na raiz do projeto:

```javascript
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'tests/', '**/*.spec.js', '**/*.test.js'],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```

### 3. Adicionar Scripts no package.json

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

### 4. Estrutura de Testes Recomendada

```
tests/
├── unit/
│   ├── components/
│   │   ├── Header.spec.js
│   │   ├── Footer.spec.js
│   │   ├── Button.spec.js
│   │   ├── Input.spec.js
│   │   └── Calculadora.spec.js
│   └── composables/
│       ├── useDarkMode.spec.js
│       └── useCookieConsent.spec.js
├── e2e/
│   ├── navigation.spec.js
│   ├── calculator.spec.js
│   └── darkmode.spec.js
└── setup.js
```

### 5. Exemplo de Teste Unitário (tests/unit/components/Button.spec.js)

```javascript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '@/components/common/Button.vue'

describe('Button Component', () => {
  it('renderiza corretamente', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Clique Aqui',
      },
    })
    expect(wrapper.text()).toContain('Clique Aqui')
  })

  it('emite evento click quando clicado', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('não emite click quando desabilitado', async () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('mostra loading state', () => {
    const wrapper = mount(Button, {
      props: { loading: true, loadingText: 'Carregando...' },
    })
    expect(wrapper.text()).toContain('Carregando...')
  })
})
```

### 6. Exemplo de Teste E2E (tests/e2e/calculator.spec.js)

```javascript
import { test, expect } from '@playwright/test'

test.describe('Calculadora de Pontos Elétricos', () => {
  test('deve calcular pontos corretamente', async ({ page }) => {
    await page.goto('http://localhost:3000/calculadora')

    // Preencher formulário
    await page.fill('#largura', '3.5')
    await page.fill('#comprimento', '4.2')
    await page.fill('#pe-direito', '2.8')

    // Clicar no botão calcular
    await page.click('button[type="submit"]')

    // Aguardar resultado
    await page.waitForSelector('.animate-fade-in')

    // Verificar se o resultado foi exibido
    const resultado = await page.textContent('.resultado')
    expect(resultado).toBeTruthy()
  })

  test('deve mostrar erro com valores inválidos', async ({ page }) => {
    await page.goto('http://localhost:3000/calculadora')

    await page.fill('#largura', '-1')
    await page.fill('#comprimento', '4.2')
    await page.click('button[type="submit"]')

    // Verificar se SweetAlert de erro aparece
    await expect(page.locator('.swal2-popup')).toBeVisible()
  })
})
```

### 7. Testes de Segurança e Performance

Para testes avançados, considere:

#### Lighthouse CI (Performance)

```powershell
npm install -D @lhci/cli
```

#### OWASP ZAP (Segurança)

Configure em CI/CD para análise de vulnerabilidades

#### k6 (Testes de Carga)

```javascript
import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  vus: 10,
  duration: '30s',
}

export default function () {
  const res = http.get('http://localhost:3000')
  check(res, { 'status is 200': (r) => r.status === 200 })
  sleep(1)
}
```

### 8. Executar Testes

```powershell
# Testes unitários em modo watch
npm run test

# Testes unitários com cobertura
npm run test:coverage

# Testes E2E
npm run test:e2e

# Todos os testes
npm run test:run && npm run test:e2e
```

### 9. CI/CD com GitHub Actions

Crie `.github/workflows/test.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run lint
      - run: npm run test:run
      - run: npx playwright install
      - run: npm run test:e2e
```

## Métricas de Qualidade Esperadas

- ✅ Cobertura de código: > 80%
- ✅ Testes unitários: > 50 testes
- ✅ Testes E2E: > 10 cenários
- ✅ Performance Score (Lighthouse): > 90
- ✅ Acessibilidade Score: > 95
- ✅ Sem vulnerabilidades críticas

## Checklist de Testes

- [ ] Componentes comuns (Button, Input, Card, Modal, Tooltip)
- [ ] Layouts (AppLayout, DefaultLayout)
- [ ] Páginas (Home, Calculator, About, Contact)
- [ ] Composables (useDarkMode, useCookieConsent, useSEO)
- [ ] Navegação e rotas
- [ ] Dark mode toggle
- [ ] Cookie consent
- [ ] Formulários e validações
- [ ] Cálculos da calculadora
- [ ] Responsividade (mobile, tablet, desktop)
- [ ] Acessibilidade (ARIA, teclado)
- [ ] Performance (lazy loading, code splitting)
- [ ] Segurança (XSS, CSRF, headers)
