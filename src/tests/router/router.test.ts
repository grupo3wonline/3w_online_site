/**
 * Testes de rotas — verifica que todos os paths estão definidos
 * e que os links de navegação correspondem a rotas existentes.
 *
 * Usa router.resolve() para verificar rotas sem efeitos colaterais
 * de navegação real, e router.push() apenas para testar redirects.
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createRouter, createMemoryHistory, type Router } from 'vue-router'

// ─── Factory de router isolado para cada teste ───────────────────────────────
// Usamos createMemoryHistory para isolar testes de navegação sem jsdom/window

async function buildTestRouter(): Promise<Router> {
  // Importa as rotas sem o guard de SEO (que usa document)
  const { toolsRoutes } = await import('@/router/tools')

  // Recria as rotas de forma simplificada (sem os componentes reais)
  // para testar apenas resolução de paths e redirects
  const DummyComponent = { template: '<div />' }

  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/',             name: 'Home',               component: DummyComponent },
      { path: '/sobre',        name: 'About',              redirect: { path: '/', hash: '#sobre' } },
      { path: '/servicos',     name: 'Services',           component: DummyComponent },
      { path: '/contato',      name: 'Contact',            redirect: { path: '/', hash: '#contato' } },
      { path: '/privacidade',  name: 'Privacy',            component: DummyComponent },
      { path: '/termos',       name: 'Terms',              component: DummyComponent },
      { path: '/regulamento',  name: 'Regulamento',        component: DummyComponent },
      { path: '/cookies',      name: 'Cookies',            component: DummyComponent },
      { path: '/institucional',name: 'Institucional',      redirect: { path: '/', hash: '#institucional' } },
      { path: '/ferramentas',  name: 'Tools',              component: DummyComponent },
      { path: '/pagamento',    name: 'Pagamento',          component: DummyComponent },
      { path: '/anuncios',     name: 'LandingAds',         component: DummyComponent },
      { path: '/landing-prd',  name: 'LandingPRD',         component: DummyComponent },
      { path: '/lp-mkt',       name: 'LandingMarketing',   component: DummyComponent },
      { path: '/lp-sites-sistemas', name: 'LandingSitesSistemas', component: DummyComponent },
      { path: '/g3w',          name: 'LandingG3w',         component: DummyComponent },
      { path: '/lp-sistemas',  name: 'LandingSistemas',    component: DummyComponent },
      // Service pages
      { path: '/servicos/gestao-redes-sociais',   name: 'SocialMediaManagement', component: DummyComponent },
      { path: '/servicos/gestao-anuncios',         name: 'AdsManagement',         component: DummyComponent },
      { path: '/servicos/criacao-sites',           name: 'WebDevelopment',        component: DummyComponent },
      { path: '/servicos/desenvolvimento-apps',    name: 'AppDevelopment',        component: DummyComponent },
      { path: '/servicos/consultoria-marketing',   name: 'MarketingConsulting',   component: DummyComponent },
      { path: '/servicos/planejamento-campanhas',  name: 'CampaignPlanning',      component: DummyComponent },
      { path: '/servicos/design-grafico',          name: 'GraphicDesign',         component: DummyComponent },
      { path: '/servicos/publicidade',             name: 'Advertising',           component: DummyComponent },
      { path: '/servicos/organizacao-comercial',   name: 'BusinessOrganization',  component: DummyComponent },
      { path: '/servicos/relacoes-publicas',       name: 'PublicRelations',       component: DummyComponent },
      { path: '/servicos/marketing-digital',       name: 'MarketingDigital',      component: DummyComponent },
      { path: '/servicos/criacao-sistemas',        name: 'SystemDevelopment',     component: DummyComponent },
      { path: '/servicos/automacao-ia',            name: 'AutomacaoIA',           component: DummyComponent },
      // Error pages
      { path: '/403', name: 'Forbidden',   component: DummyComponent },
      { path: '/500', name: 'ServerError', component: DummyComponent },
      // Ferramentas (rotas filhas)
      {
        path: '/ferramentas',
        component: DummyComponent,
        children: [
          ...toolsRoutes[0].children!.map((child) => ({
            ...child,
            component: DummyComponent,
          })),
        ],
      },
      // Redirects de retrocompatibilidade
      { path: '/solucoes',      redirect: '/ferramentas#aplicacoes' },
      { path: '/solucoes/:slug', redirect: (to: { params: Record<string, string> }) => `/ferramentas/${to.params.slug}` },
      // 404 catch-all
      { path: '/:pathMatch(.*)*', name: 'NotFound', component: DummyComponent },
    ],
  })

  return router
}

// ─── Testes de rotas principais ───────────────────────────────────────────────

describe('Resolução de rotas principais', () => {
  let router: Router

  beforeEach(async () => {
    router = await buildTestRouter()
  })

  it('"/" resolve para a rota Home', () => {
    const resolved = router.resolve('/')
    expect(resolved.name).toBe('Home')
  })

  it('"/servicos" resolve para a rota Services', () => {
    const resolved = router.resolve('/servicos')
    expect(resolved.name).toBe('Services')
  })

  it('"/ferramentas" resolve para a rota Tools', () => {
    const resolved = router.resolve('/ferramentas')
    expect(resolved.name).toBe('Tools')
  })

  it('"/privacidade" resolve para a rota Privacy', () => {
    const resolved = router.resolve('/privacidade')
    expect(resolved.name).toBe('Privacy')
  })

  it('"/termos" resolve para a rota Terms', () => {
    const resolved = router.resolve('/termos')
    expect(resolved.name).toBe('Terms')
  })

  it('"/cookies" resolve para a rota Cookies', () => {
    const resolved = router.resolve('/cookies')
    expect(resolved.name).toBe('Cookies')
  })

  it('"/regulamento" resolve para a rota Regulamento', () => {
    const resolved = router.resolve('/regulamento')
    expect(resolved.name).toBe('Regulamento')
  })

  it('"/pagamento" resolve para a rota Pagamento', () => {
    const resolved = router.resolve('/pagamento')
    expect(resolved.name).toBe('Pagamento')
  })
})

describe('Redirects de rotas', () => {
  let router: Router

  beforeEach(async () => {
    router = await buildTestRouter()
  })

  it('"/sobre" redireciona para "/" com hash "#sobre"', async () => {
    await router.push('/sobre')
    expect(router.currentRoute.value.path).toBe('/')
    expect(router.currentRoute.value.hash).toBe('#sobre')
  })

  it('"/contato" redireciona para "/" com hash "#contato"', async () => {
    await router.push('/contato')
    expect(router.currentRoute.value.path).toBe('/')
    expect(router.currentRoute.value.hash).toBe('#contato')
  })

  it('"/institucional" redireciona para "/" com hash "#institucional"', async () => {
    await router.push('/institucional')
    expect(router.currentRoute.value.path).toBe('/')
    expect(router.currentRoute.value.hash).toBe('#institucional')
  })

  it('"/solucoes/:slug" redireciona para "/ferramentas/:slug"', async () => {
    await router.push('/solucoes/calculadora-roi')
    expect(router.currentRoute.value.path).toBe('/ferramentas/calculadora-roi')
  })

  it('path desconhecido cai na rota NotFound', async () => {
    await router.push('/pagina-inexistente-xyz')
    expect(router.currentRoute.value.name).toBe('NotFound')
  })
})

describe('Resolução de rotas de serviços', () => {
  const serviceRoutes = [
    { path: '/servicos/gestao-redes-sociais',   name: 'SocialMediaManagement' },
    { path: '/servicos/gestao-anuncios',         name: 'AdsManagement' },
    { path: '/servicos/criacao-sites',           name: 'WebDevelopment' },
    { path: '/servicos/desenvolvimento-apps',    name: 'AppDevelopment' },
    { path: '/servicos/consultoria-marketing',   name: 'MarketingConsulting' },
    { path: '/servicos/planejamento-campanhas',  name: 'CampaignPlanning' },
    { path: '/servicos/design-grafico',          name: 'GraphicDesign' },
    { path: '/servicos/publicidade',             name: 'Advertising' },
    { path: '/servicos/organizacao-comercial',   name: 'BusinessOrganization' },
    { path: '/servicos/relacoes-publicas',       name: 'PublicRelations' },
    { path: '/servicos/marketing-digital',       name: 'MarketingDigital' },
    { path: '/servicos/criacao-sistemas',        name: 'SystemDevelopment' },
    { path: '/servicos/automacao-ia',            name: 'AutomacaoIA' },
  ] as const

  let router: Router

  beforeEach(async () => {
    router = await buildTestRouter()
  })

  for (const { path, name } of serviceRoutes) {
    it(`"${path}" resolve para a rota "${name}"`, () => {
      const resolved = router.resolve(path)
      expect(resolved.name, `"${path}" não resolveu corretamente`).toBe(name)
    })
  }
})

describe('Resolução de landing pages', () => {
  const landingRoutes = [
    { path: '/anuncios',          name: 'LandingAds' },
    { path: '/landing-prd',       name: 'LandingPRD' },
    { path: '/lp-mkt',            name: 'LandingMarketing' },
    { path: '/lp-sites-sistemas', name: 'LandingSitesSistemas' },
    { path: '/g3w',               name: 'LandingG3w' },
    { path: '/lp-sistemas',       name: 'LandingSistemas' },
  ] as const

  let router: Router

  beforeEach(async () => {
    router = await buildTestRouter()
  })

  for (const { path, name } of landingRoutes) {
    it(`"${path}" resolve para a landing page "${name}"`, () => {
      const resolved = router.resolve(path)
      expect(resolved.name).toBe(name)
    })
  }
})

describe('Resolução de páginas de erro', () => {
  let router: Router

  beforeEach(async () => {
    router = await buildTestRouter()
  })

  it('"/403" resolve para Forbidden', () => {
    const resolved = router.resolve('/403')
    expect(resolved.name).toBe('Forbidden')
  })

  it('"/500" resolve para ServerError', () => {
    const resolved = router.resolve('/500')
    expect(resolved.name).toBe('ServerError')
  })
})

describe('Resolução de ferramentas (amostra)', () => {
  const toolSample = [
    { path: '/ferramentas/calculadora-freelancer', name: 'CalculadoraFreelancer' },
    { path: '/ferramentas/calculadora-roi',        name: 'CalculadoraROI' },
    { path: '/ferramentas/gerador-qrcode',         name: 'GeradorQRCode' },
    { path: '/ferramentas/gerador-senha',          name: 'GeradorSenha' },
    { path: '/ferramentas/validador-cpf',          name: 'ValidadorCPF' },
    { path: '/ferramentas/validador-cnpj',         name: 'ValidadorCNPJ' },
    { path: '/ferramentas/validador-email',        name: 'ValidadorEmail' },
    { path: '/ferramentas/conversor-moeda',        name: 'ConversorMoeda' },
    { path: '/ferramentas/simulador-fgts',         name: 'SimuladorFGTS' },
    { path: '/ferramentas/calculadora-imc',        name: 'CalculadoraIMC' },
    { path: '/ferramentas/analisador-texto',       name: 'AnalisadorTexto' },
    { path: '/ferramentas/modificador-texto',      name: 'ModificadorTexto' },
    { path: '/ferramentas/gerador-cpf-cnpj',       name: 'GeradorCPFCNPJ' },
    { path: '/ferramentas/conversor-base64',       name: 'ConversorBase64' },
    { path: '/ferramentas/simulador-ferias',       name: 'SimuladorFerias' },
  ] as const

  let router: Router

  beforeEach(async () => {
    router = await buildTestRouter()
  })

  for (const { path, name } of toolSample) {
    it(`"${path}" resolve para a ferramenta "${name}"`, () => {
      const resolved = router.resolve(path)
      expect(resolved.name, `Rota "${path}" não foi encontrada`).toBe(name)
    })
  }

  it('slug desconhecido em /ferramentas/* resolve via AppWrapper (FerraApp)', () => {
    const resolved = router.resolve('/ferramentas/app-personalizado-xyz')
    expect(resolved.name).toBe('FerraApp')
  })
})

describe('Integridade de links: Navbar vs rotas registradas', () => {
  // Todos os paths que a Navbar possui (RouterLink + âncoras href)
  const navbarLinks = [
    '/',
    '/servicos',
    '/ferramentas',
    '/servicos/criacao-sites',
    '/servicos/criacao-sistemas',
    '/servicos/automacao-ia',
    '/servicos/gestao-anuncios',
    '/servicos/gestao-redes-sociais',
    '/servicos/marketing-digital',
    '/servicos/desenvolvimento-apps',
    '/servicos/design-grafico',
    '/servicos/consultoria-marketing',
  ] as const

  let router: Router

  beforeEach(async () => {
    router = await buildTestRouter()
  })

  for (const path of navbarLinks) {
    it(`link da navbar "${path}" não cai no 404`, () => {
      const resolved = router.resolve(path)
      expect(resolved.name, `Link da navbar "${path}" caiu no NotFound`).not.toBe('NotFound')
    })
  }
})

describe('Integridade de links: Footer vs rotas registradas', () => {
  const footerLinks = [
    '/',
    '/servicos',
    '/ferramentas',
    '/privacidade',
    '/termos',
    '/cookies',
    '/regulamento',
    '/pagamento',
    '/servicos/criacao-sites',
    '/servicos/criacao-sistemas',
    '/servicos/automacao-ia',
    '/servicos/gestao-anuncios',
    '/servicos/gestao-redes-sociais',
    '/servicos/marketing-digital',
    '/servicos/desenvolvimento-apps',
    '/servicos/design-grafico',
  ] as const

  let router: Router

  beforeEach(async () => {
    router = await buildTestRouter()
  })

  for (const path of footerLinks) {
    it(`link do footer "${path}" não cai no 404`, () => {
      const resolved = router.resolve(path)
      expect(resolved.name, `Link do footer "${path}" caiu no NotFound`).not.toBe('NotFound')
    })
  }
})
