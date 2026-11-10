export default {
  app: {
    name: 'Calculadora de Pontos Elétricos',
    shortName: 'Calc Elétrica',
    tagline: 'Profissional e Gratuita',
    description:
      'Ferramenta profissional e gratuita para cálculo de pontos elétricos, demanda e dimensionamento conforme a NBR 5410.',
  },
  nav: {
    home: 'Início',
    calculator: 'Calculadora',
    tools: 'Ferramentas',
    about: 'Sobre',
    services: 'Serviços',
    contact: 'Contato',
    help: 'Central de Ajuda',
    toggleTheme: 'Alternar tema',
    lightMode: 'Ativar modo claro',
    darkMode: 'Ativar modo escuro',
    menu: 'Menu',
  },
  breadcrumb: {
    home: 'Início',
  },
  actions: {
    calculate: 'Calcular',
    clear: 'Limpar',
    understood: 'Entendi',
    tryNow: 'Experimente Agora',
    knowMore: 'Saiba Mais',
    backHome: 'Voltar ao Início',
    contactUs: 'Fale Conosco',
    requestQuote: 'Solicitar Orçamento',
  },
  loading: {
    processing: 'Processando...',
    calculating: 'Calculando...',
  },
  footer: {
    developedBy: 'sistema desenvolvido pelo desenvolvedor {developer}',
    agency: 'Grupo 3w Online',
    agencyTagline: 'Sites e Sistemas Personalizados Sob Demanda',
    quickLinks: 'Links Rápidos',
    resources: 'Recursos',
    legal: 'Legal',
    secure: '100% Seguro',
    secureNote: 'Dados processados localmente',
    rights: 'Todos os direitos reservados',
  },
  legal: {
    terms: 'Termos de Uso',
    privacy: 'Política de Privacidade',
  },
  home: {
    hero: {
      badge: 'Baseado na NBR 5410',
      title: 'Calculadora de Pontos Elétricos',
      subtitle: 'Profissional, gratuita e precisa',
      lead: 'Dimensione pontos elétricos, demanda, disjuntores e metragem de cabos em segundos. Ideal para eletricistas, engenheiros e arquitetos.',
      ctaPrimary: 'Calcular Agora',
      ctaSecondary: 'Como funciona',
      stats: {
        norm: 'NBR 5410',
        normLabel: 'Base normativa',
        free: '100%',
        freeLabel: 'Gratuito',
        instant: 'Segundos',
        instantLabel: 'Resultado',
      },
    },
    benefits: {
      title: 'Por que usar a Calculadora Elétrica',
      subtitle: 'Uma ferramenta feita para agilizar o seu dia a dia com segurança.',
      items: {
        norm: {
          title: 'Baseada na NBR 5410',
          text: 'Cálculos seguem as normas técnicas brasileiras para instalações de baixa tensão.',
        },
        free: {
          title: '100% gratuita',
          text: 'Sem cadastro, sem limites e sem custo. Use quantas vezes precisar.',
        },
        privacy: {
          title: 'Privada e segura',
          text: 'Todos os cálculos são processados localmente no seu navegador. Seus dados não saem do dispositivo.',
        },
        fast: {
          title: 'Resultados instantâneos',
          text: 'Informe as dimensões e receba o dimensionamento na hora, com interface responsiva.',
        },
      },
    },
    features: {
      title: 'O que a ferramenta calcula',
      subtitle: 'Tudo o que você precisa para dimensionar um ambiente.',
      items: {
        points: {
          title: 'Pontos elétricos',
          text: 'Quantidade mínima de pontos conforme a área do ambiente.',
        },
        cable: { title: 'Metragem de cabo', text: 'Estimativa de cabo com margem de segurança.' },
        power: {
          title: 'Potência e corrente',
          text: 'Demanda estimada em VA e corrente em ampères.',
        },
        breaker: {
          title: 'Disjuntor e bitola',
          text: 'Sugestão de disjuntor e bitola de cabo adequados.',
        },
      },
    },
    howto: {
      title: 'Como funciona',
      subtitle: 'Em três passos simples você tem o dimensionamento completo.',
      steps: {
        one: {
          title: 'Informe as dimensões',
          text: 'Digite largura, comprimento e pé-direito do ambiente.',
        },
        two: {
          title: 'Escolha o tipo de ambiente',
          text: 'Sala, cozinha, banheiro e outros ajustam os fatores de cálculo.',
        },
        three: {
          title: 'Receba os resultados',
          text: 'Pontos, cabo, potência, corrente, disjuntor e bitola na hora.',
        },
      },
      tip: 'Dica: o pé-direito padrão residencial é 2,8 m. Ambientes molhados (banheiro) exigem mais potência.',
    },
    about: {
      title: 'Sobre a ferramenta',
      mission:
        'Nossa missão é democratizar o acesso a ferramentas profissionais de cálculo elétrico, com uma solução gratuita, precisa e intuitiva para profissionais, estudantes e entusiastas.',
      values:
        'Acreditamos que todos devem ter acesso a ferramentas de qualidade para projetos elétricos seguros e eficientes, seguindo as normas técnicas brasileiras.',
      applicationsTitle: 'Aplicações',
      applications: {
        residential: 'Projetos residenciais',
        commercial: 'Instalações comerciais básicas',
        reforms: 'Reformas e ampliações',
        studies: 'Estudos e treinamentos',
      },
    },
    faq: {
      title: 'Perguntas frequentes',
      items: {
        q1: {
          q: 'A calculadora é gratuita?',
          a: 'Sim. O uso é totalmente gratuito, sem cadastro e sem limites.',
        },
        q2: {
          q: 'Os cálculos seguem alguma norma?',
          a: 'Sim, são baseados na NBR 5410, norma brasileira para instalações elétricas de baixa tensão.',
        },
        q3: {
          q: 'Meus dados ficam salvos em algum servidor?',
          a: 'Não. Todo o processamento ocorre localmente no seu navegador; nada é enviado para servidores externos.',
        },
        q4: {
          q: 'A ferramenta substitui um projeto profissional?',
          a: 'É uma estimativa de apoio. Projetos executivos devem ser validados por um profissional habilitado.',
        },
      },
    },
    tools: {
      title: 'Ferramentas disponíveis',
      subtitle: 'Recursos gratuitos para o seu dia a dia. Novas ferramentas em breve.',
      calculator: {
        title: 'Calculadora de Pontos Elétricos',
        text: 'Dimensione pontos, cabo, potência, disjuntor e bitola conforme a NBR 5410.',
        cta: 'Abrir calculadora',
      },
      soon: {
        title: 'Mais ferramentas em breve',
        text: 'Estamos desenvolvendo novos utilitários para profissionais da área elétrica.',
        badge: 'Em breve',
      },
    },
    services: {
      title: 'Serviços do Grupo 3w Online',
      subtitle: 'Sites e sistemas personalizados sob demanda para o seu negócio.',
      items: {
        sites: {
          title: 'Sites profissionais',
          text: 'Design moderno, responsivo e otimizado para conversão e SEO.',
        },
        systems: {
          title: 'Sistemas sob medida',
          text: 'Aplicações web personalizadas para o seu processo e regras de negócio.',
        },
        maintenance: {
          title: 'Suporte e manutenção',
          text: 'Acompanhamento contínuo do planejamento à evolução do produto.',
        },
      },
    },
    agency: {
      badge: 'Oferta por tempo limitado',
      title: 'Precisa de um site ou sistema sob medida?',
      text: 'O Grupo 3w Online desenvolve sites e sistemas personalizados sob demanda. Vagas limitadas para novos projetos neste mês — garanta a sua.',
      urgency: 'Poucas vagas disponíveis. Fale conosco hoje e saia na frente.',
      cta: 'Solicitar orçamento agora',
    },
  },
  calculator: {
    title: 'Calculadora de Pontos Elétricos',
    subtitle: 'Dimensionamento conforme a NBR 5410. Informe os dados do ambiente.',
    formTitle: 'Dados do ambiente',
    resultsTitle: 'Resultado do cálculo',
    emptyResults: 'Preencha os dados e clique em calcular para ver o dimensionamento.',
    fields: {
      roomType: 'Tipo de ambiente',
      width: 'Largura (m)',
      length: 'Comprimento (m)',
      ceilingHeight: 'Pé-direito (m)',
    },
    placeholders: {
      width: 'Ex.: 3.5',
      length: 'Ex.: 4.2',
      ceilingHeight: 'Ex.: 2.8',
    },
    help: {
      width: 'Largura interna do ambiente, em metros. Ex.: 3,5 para 3 metros e meio.',
      length: 'Comprimento interno do ambiente, em metros. Meça a maior dimensão.',
      ceilingHeight: 'Altura do piso ao teto. Padrão residencial: 2,8 m (entre 2,0 e 5,0).',
      roomType:
        'O tipo de ambiente ajusta a potência considerada por m² (ex.: banheiro exige mais).',
    },
    results: {
      area: 'Área',
      volume: 'Volume',
      perimeter: 'Perímetro',
      points: 'Pontos elétricos',
      cableLength: 'Metragem de cabo',
      totalPower: 'Potência estimada',
      current: 'Corrente estimada',
      circuitBreaker: 'Disjuntor sugerido',
      cableGauge: 'Bitola de cabo',
      chartTitle: 'Distribuição estimada',
    },
    disclaimer:
      'Estimativas baseadas na NBR 5410. Para projetos executivos, valide com um profissional habilitado.',
    tipTitle: 'Dica profissional',
    tip: 'Considere uma margem de 20% na potência total para futuras expansões e maior segurança.',
    liveArea: 'Área total',
  },
  contact: {
    title: 'Fale com a gente',
    subtitle: 'Tire dúvidas, envie sugestões ou solicite um orçamento. Respondemos rápido.',
    whatsapp: 'WhatsApp',
    whatsappCta: 'Chamar no WhatsApp',
    email: 'E-mail',
    emailCta: 'Enviar e-mail',
    channelsTitle: 'Canais de atendimento',
    companyTitle: 'Grupo 3w Online',
    companyLead:
      'Somos especialistas em sites e sistemas personalizados sob demanda. Transformamos a sua ideia em uma solução digital sob medida.',
    companyBullets: {
      sites: 'Sites profissionais, modernos e otimizados para conversão',
      systems: 'Sistemas sob medida para o seu processo',
      support: 'Suporte dedicado do planejamento à manutenção',
    },
    ctaTitle: 'Pronto para tirar seu projeto do papel?',
    ctaText:
      'Estamos selecionando poucos novos projetos neste mês. Garanta uma proposta personalizada antes que as vagas acabem.',
    ctaUrgency: 'Vagas limitadas — fale conosco hoje.',
    ctaButton: 'Solicitar orçamento agora',
    responseTime: 'Resposta em até 24 horas úteis',
  },
  cookies: {
    title: 'Nós valorizamos sua privacidade',
    message:
      'Usamos cookies para melhorar sua experiência e analisar o tráfego. Você pode aceitar ou recusar os cookies não essenciais.',
    accept: 'Aceitar todos',
    reject: 'Recusar não essenciais',
    learnMore: 'Saiba mais',
  },
  errors: {
    notFoundTitle: 'Página não encontrada',
    notFoundMessage: 'A página que você procura não existe ou foi movida.',
    genericTitle: 'Algo deu errado',
    genericMessage: 'Ocorreu um erro inesperado. Tente recarregar a página.',
    reload: 'Recarregar',
  },
}
