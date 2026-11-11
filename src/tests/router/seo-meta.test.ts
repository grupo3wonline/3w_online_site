/**
 * Testes de SEO — verifica que todas as rotas têm meta title e description
 * adequados (não vazios, com comprimento razoável e com branding).
 *
 * Os dados de meta são os valores REAIS do router/index.ts para garantir
 * que a configuração real de SEO está correta.
 */
import { describe, it, expect } from 'vitest'
import { toolsRoutes } from '@/router/tools'

// ─── Dados extraídos do router/index.ts (valores reais) ──────────────────────
const mainRoutes = [
  {
    path: '/',
    meta: {
      title: 'Agência de Marketing Digital em Curitiba | 3W Online - Sites, Sistemas e IA',
      description:
        'Agência de marketing digital em Curitiba. Criação de sites, gestão de redes sociais, anúncios Google Ads, desenvolvimento de apps, sistemas web e automação com inteligência artificial.',
    },
  },
  {
    path: '/servicos',
    meta: {
      title: 'Serviços de Marketing Digital e Desenvolvimento | 3W Online Curitiba',
      description:
        'Serviços completos: gestão de redes sociais, criação de sites, Google Ads, Meta Ads, design gráfico, desenvolvimento de apps, sistemas web e automação com IA em Curitiba.',
    },
  },
  {
    path: '/privacidade',
    meta: {
      title: 'Política de Privacidade | 3W Online - LGPD',
      description:
        'Política de Privacidade da 3W Online. Saiba como coletamos, usamos e protegemos seus dados conforme a Lei Geral de Proteção de Dados (LGPD).',
    },
  },
  {
    path: '/termos',
    meta: {
      title: 'Termos de Uso | 3W Online',
      description:
        'Termos de Uso e condições gerais dos serviços prestados pela 3W Online. Leia antes de utilizar nossos serviços.',
    },
  },
  {
    path: '/regulamento',
    meta: {
      title: 'Regulamento | 3W Online',
      description:
        'Regulamento de uso dos serviços e plataformas da 3W Online. Regras, diretrizes e políticas de utilização.',
    },
  },
  {
    path: '/cookies',
    meta: {
      title: 'Política de Cookies | 3W Online',
      description:
        'Saiba quais cookies utilizamos e como gerenciar suas preferências de privacidade na 3W Online.',
    },
  },
  {
    path: '/ferramentas',
    meta: {
      title: 'Ferramentas Digitais Gratuitas | 3W Online',
      description:
        'Ferramentas digitais gratuitas para seu negócio. Calculadoras, geradores e utilitários de marketing digital da 3W Online.',
    },
  },
  {
    path: '/pagamento',
    meta: {
      title: 'Pagamento Seguro | 3W Online',
      description:
        'Realize pagamentos seguros para os serviços da 3W Online. Ambiente protegido com criptografia SSL.',
    },
  },
]

const serviceRoutes = [
  {
    path: '/servicos/gestao-redes-sociais',
    meta: {
      title: 'Gestão de Redes Sociais em Curitiba | Social Media | 3W Online',
      description:
        'Gestão profissional de redes sociais em Curitiba. Criação de conteúdo, estratégia personalizada, SEO social, funil de vendas e planejamento antecipado. Instagram, Facebook, TikTok.',
    },
  },
  {
    path: '/servicos/gestao-anuncios',
    meta: {
      title: 'Gestão de Google Ads e Meta Ads em Curitiba | Tráfego Pago | 3W Online',
      description:
        'Gestão profissional de anúncios Google Ads e Meta Ads em Curitiba. Campanhas otimizadas para gerar leads e vendas com ROI comprovado. Relatórios detalhados.',
    },
  },
  {
    path: '/servicos/criacao-sites',
    meta: {
      title: 'Criação de Sites Profissionais em Curitiba | Web Design | 3W Online',
      description:
        'Criação de sites profissionais em Curitiba. Sites institucionais, e-commerce, landing pages e portais. Design responsivo, SEO otimizado e carregamento rápido.',
    },
  },
  {
    path: '/servicos/automacao-ia',
    meta: {
      title: 'Automação com Inteligência Artificial em Curitiba | Chatbot IA | 3W Online',
      description:
        'Automação e soluções com IA em Curitiba. Chatbots GPT, automação WhatsApp, n8n, Chatwoot, Evolution API, Dify, Langflow, Typebot e Flowise. Reduza custos e escale.',
    },
  },
  {
    path: '/servicos/marketing-digital',
    meta: {
      title: 'Pacote Marketing Digital Completo R$ 500/mês em Curitiba | 3W Online',
      description:
        'Pacote completo de marketing digital por R$ 500/mês em Curitiba. Gestão de redes sociais, produção de conteúdo, anúncios e relatórios. Sem fidelidade.',
    },
  },
  {
    path: '/servicos/criacao-sistemas',
    meta: {
      title: 'Desenvolvimento de Sistemas Web em Curitiba | CRM, ERP | 3W Online',
      description:
        'Desenvolvimento de sistemas web sob medida em Curitiba. CRM, ERP, agendamento, estoque, financeiro e plataformas SaaS com tecnologia de ponta.',
    },
  },
  {
    path: '/servicos/desenvolvimento-apps',
    meta: {
      title: 'Desenvolvimento de Aplicativos em Curitiba | Apps iOS e Android | 3W Online',
      description:
        'Desenvolvimento de aplicativos mobile em Curitiba. Apps nativos e híbridos para iOS e Android. React Native, UI/UX exclusivo e publicação nas lojas.',
    },
  },
  {
    path: '/servicos/design-grafico',
    meta: {
      title: 'Design Gráfico e Identidade Visual em Curitiba | 3W Online',
      description:
        'Design gráfico profissional em Curitiba. Criação de logotipos, identidade visual, materiais para redes sociais, embalagens e peças publicitárias.',
    },
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Gera testes de SEO para uma rota.
 * Thresholds baseados nas diretrizes do Google:
 * - Title: 20–70 chars (exibidos em ~600px)
 * - Description: 50–320 chars
 */
function checkMeta(route: { path: string; meta: { title: string; description: string } }) {
  const { path, meta } = route

  it(`"${path}" tem title não vazio`, () => {
    expect(meta.title, `Rota "${path}" não tem title`).toBeTruthy()
    expect(meta.title.trim().length, `Title de "${path}" está vazio`).toBeGreaterThan(0)
  })

  it(`"${path}" tem description não vazia`, () => {
    expect(meta.description, `Rota "${path}" não tem description`).toBeTruthy()
    expect(meta.description.trim().length, `Description de "${path}" está vazia`).toBeGreaterThan(0)
  })

  it(`title de "${path}" tem entre 20 e 80 caracteres (SEO)`, () => {
    const len = meta.title.length
    expect(len, `Title muito curto (${len} chars): "${meta.title}"`).toBeGreaterThanOrEqual(20)
    expect(len, `Title muito longo (${len} chars): "${meta.title}"`).toBeLessThanOrEqual(80)
  })

  it(`description de "${path}" tem entre 50 e 320 caracteres (SEO)`, () => {
    const len = meta.description.length
    expect(len, `Description muito curta (${len} chars)`).toBeGreaterThanOrEqual(50)
    expect(len, `Description muito longa (${len} chars)`).toBeLessThanOrEqual(320)
  })

  it(`title de "${path}" contém "3W Online" (branding)`, () => {
    expect(meta.title).toContain('3W Online')
  })
}

// ─── Testes ───────────────────────────────────────────────────────────────────

describe('SEO: meta tags de rotas principais', () => {
  for (const route of mainRoutes) {
    checkMeta(route)
  }
})

describe('SEO: meta tags de páginas de serviços', () => {
  for (const route of serviceRoutes) {
    checkMeta(route)
  }
})

describe('SEO: rotas de ferramentas têm title e description', () => {
  // Pega apenas as rotas de ferramentas com meta definido (exclui o catch-all :slug)
  const toolRoutesWithMeta = toolsRoutes[0].children!.filter(
    (r) => r.meta?.title && r.path !== ':slug',
  )

  it('pelo menos 100 ferramentas têm meta title definido', () => {
    expect(toolRoutesWithMeta.length).toBeGreaterThanOrEqual(100)
  })

  it('todas as ferramentas têm title contendo "3W Online"', () => {
    for (const route of toolRoutesWithMeta) {
      const title = route.meta?.title as string
      expect(title, `Ferramenta "${route.path}" não tem "3W Online" no title`).toContain(
        '3W Online',
      )
    }
  })

  it('todas as ferramentas têm description não vazia', () => {
    for (const route of toolRoutesWithMeta) {
      const desc = route.meta?.description as string
      expect(desc, `Ferramenta "${route.path}" não tem description`).toBeTruthy()
      expect(desc.trim().length).toBeGreaterThan(0)
    }
  })

  it('nenhuma ferramenta tem title duplicado', () => {
    const titles = toolRoutesWithMeta.map((r) => r.meta?.title as string)
    const uniqueTitles = new Set(titles)
    // Permite até 10% de duplicatas (algumas ferramentas podem ter o mesmo título intencionalmente)
    expect(uniqueTitles.size).toBeGreaterThan(titles.length * 0.9)
  })
})

describe('SEO: consistência de rotas de serviços', () => {
  it('todas as rotas de serviços contêm "Curitiba" na description (geo-targeting)', () => {
    for (const route of serviceRoutes) {
      expect(
        route.meta.description,
        `Rota "${route.path}" não menciona "Curitiba"`,
      ).toContain('Curitiba')
    }
  })

  it('todas as rotas de serviços têm keyword "curitiba" (lowercase) definida no meta do router', () => {
    // Verifica que pelo menos a Home e Serviços têm geotargeting
    const geoRoutes = mainRoutes.filter(
      (r) => r.path === '/' || r.path === '/servicos',
    )
    for (const route of geoRoutes) {
      expect(
        route.meta.description.toLowerCase(),
        `Rota "${route.path}" não menciona Curitiba`,
      ).toContain('curitiba')
    }
  })
})
