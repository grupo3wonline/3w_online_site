import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// ─── Interfaces ────────────────────────────────────────────────────────────────

export interface Solucao {
  /** Slug para a rota da vitrine: /solucoes/:id */
  id: string
  /** Nome do diretório em src/views/solucoees/ */
  folderName: string
  /** Nome de exibição */
  name: string
  /** Descrição curta (para cards) */
  shortDesc: string
  /** Ícone Iconify */
  icon: string
  /** ID da categoria */
  category: string
  /** Caminho do app implantado (ex.: /calculadora_imc/) */
  appPath: string
  /** Tags de busca */
  tags: string[]
  /** Destaque na página principal */
  featured?: boolean
}

export interface SolucaoCategory {
  id: string
  title: string
  icon: string
  colorClass: string
  bgClass: string
}

// ─── Store ─────────────────────────────────────────────────────────────────────

export const useSolucoesStore = defineStore('solucoes', () => {
  const searchQuery = ref('')
  const selectedCategory = ref('todos')

  // Categorias disponíveis
  const categories: SolucaoCategory[] = [
    { id: 'todos',      title: 'Todas',           icon: 'mdi:grid',                colorClass: 'text-primary-400',  bgClass: 'bg-primary-500/20'  },
    { id: 'financeiro', title: 'Finanças & Saúde', icon: 'mdi:cash-multiple',       colorClass: 'text-emerald-400',  bgClass: 'bg-emerald-500/20'  },
    { id: 'marketing',  title: 'Marketing',        icon: 'mdi:trending-up',         colorClass: 'text-orange-400',   bgClass: 'bg-orange-500/20'   },
    { id: 'dev',        title: 'Dev Tools',        icon: 'mdi:code-braces',         colorClass: 'text-cyan-400',     bgClass: 'bg-cyan-500/20'     },
    { id: 'texto',      title: 'Texto & Conteúdo', icon: 'mdi:text-box-outline',    colorClass: 'text-violet-400',   bgClass: 'bg-violet-500/20'   },
    { id: 'design',     title: 'Design & Mídia',   icon: 'mdi:palette-outline',     colorClass: 'text-pink-400',     bgClass: 'bg-pink-500/20'     },
    { id: 'negocios',   title: 'Negócios',         icon: 'mdi:briefcase-outline',   colorClass: 'text-yellow-400',   bgClass: 'bg-yellow-500/20'   },
  ]

  // Catálogo completo de soluções (62 apps)
  const solucoes = ref<Solucao[]>([

    // ── FINANÇAS & SAÚDE ──────────────────────────────────────────────────────
    {
      id: 'calculadora-imc',
      folderName: 'calculadora_imc',
      name: 'Calculadora IMC & Saúde',
      shortDesc: 'Calcule IMC, peso ideal, metas de saúde e plano nutricional online.',
      icon: 'mdi:heart-pulse',
      category: 'financeiro',
      appPath: '/calculadora_imc/',
      tags: ['imc', 'saúde', 'peso', 'nutrição', 'body mass index'],
      featured: true,
    },
    {
      id: 'calculadora-aluguel-facil',
      folderName: 'calculadora_aluguel_facil',
      name: 'Calculadora Aluguel Fácil',
      shortDesc: 'Calcule o valor ideal do aluguel, custos totais e retorno sobre imóvel.',
      icon: 'mdi:home-city-outline',
      category: 'financeiro',
      appPath: '/calculadora_aluguel_facil/',
      tags: ['aluguel', 'imóvel', 'locação', 'compra', 'financeiro'],
      featured: true,
    },
    {
      id: 'calculadora-churrasco',
      folderName: 'calculadora_churrasco',
      name: 'Calculadora de Churrasco',
      shortDesc: 'Planeje o churrasco perfeito: calcule quantidades de carne, bebidas e custos.',
      icon: 'mdi:fire',
      category: 'financeiro',
      appPath: '/calculadora_churrasco/',
      tags: ['churrasco', 'carne', 'festa', 'churrasqueiro', 'planejamento'],
    },
    {
      id: 'calculadora-empresarial',
      folderName: 'calculadora_empresarial',
      name: 'Calculadora Empresarial',
      shortDesc: 'Ferramentas gratuitas de cálculos financeiros para empreendedores.',
      icon: 'mdi:calculator-variant-outline',
      category: 'financeiro',
      appPath: '/calculadora_empresarial/',
      tags: ['empresa', 'financeiro', 'empreendedorismo', 'cálculo', 'negócio'],
      featured: true,
    },
    {
      id: 'calculadora-evento',
      folderName: 'calculadora_evento',
      name: 'Calculadora de Eventos',
      shortDesc: 'Calcule custos e orçamentos de eventos com precisão profissional.',
      icon: 'mdi:calendar-star',
      category: 'financeiro',
      appPath: '/calculadora_evento/',
      tags: ['evento', 'festa', 'orçamento', 'custo', 'planejamento'],
    },
    {
      id: 'calculadora-freelance',
      folderName: 'calculadora_freelance',
      name: 'Calculadora Freelancer',
      shortDesc: 'Calcule valor/hora, orçamentos de projetos e prazos de entrega.',
      icon: 'mdi:laptop',
      category: 'financeiro',
      appPath: '/calculadora_freelance/',
      tags: ['freelancer', 'valor hora', 'projeto', 'precificação', 'pj'],
      featured: true,
    },
    {
      id: 'calculadora-indicadores-financeiros',
      folderName: 'calculadora_Indicadores_financeiros',
      name: 'Indicadores Financeiros',
      shortDesc: 'Calcule KPIs financeiros: ROI, margem, EBITDA, fluxo de caixa e mais.',
      icon: 'mdi:chart-bar',
      category: 'financeiro',
      appPath: '/calculadora_indicadores_financeiros/',
      tags: ['kpi', 'roi', 'margem', 'ebitda', 'indicadores', 'análise financeira'],
    },
    {
      id: 'calculadora-metragem-cabo',
      folderName: 'calculadora_metragem_cabo',
      name: 'Calculadora de Metragem de Cabos',
      shortDesc: 'Calcule a metragem necessária de cabos para instalações elétricas e redes.',
      icon: 'mdi:cable-data',
      category: 'financeiro',
      appPath: '/calculadora_metragem_cabo/',
      tags: ['cabo', 'metragem', 'instalação', 'elétrica', 'rede', 'TI'],
    },
    {
      id: 'calculadora-ponto-eletrico',
      folderName: 'calculadora_ponto_eletrico',
      name: 'Calculadora de Pontos Elétricos',
      shortDesc: 'Ferramenta NBR 5410 para cálculo profissional de pontos elétricos.',
      icon: 'mdi:lightning-bolt',
      category: 'financeiro',
      appPath: '/calculadora_ponto_eletrico/',
      tags: ['elétrica', 'NBR 5410', 'pontos elétricos', 'instalação', 'tomada'],
    },
    {
      id: 'calculadora-preco',
      folderName: 'calculadora_preco',
      name: 'Calculadora de Preços',
      shortDesc: 'Descubra o valor justo do seu trabalho com precificação profissional.',
      icon: 'mdi:tag-outline',
      category: 'financeiro',
      appPath: '/calculadora_preco/',
      tags: ['preço', 'precificação', 'valor', 'tabela', 'profissional'],
    },
    {
      id: 'calculadora-produto-servico',
      folderName: 'calculadora_produto_servico',
      name: 'Calculadora Produto/Serviço',
      shortDesc: 'Precifique produtos e serviços com cálculo de margem, impostos e lucro.',
      icon: 'mdi:package-variant-closed',
      category: 'financeiro',
      appPath: '/calculadora_produto_servico/',
      tags: ['produto', 'serviço', 'precificação', 'margem', 'lucro'],
    },
    {
      id: 'calculadora-programadores',
      folderName: 'calculadora_programadores',
      name: 'Calculadora para Programadores',
      shortDesc: 'Orçamentos precisos para projetos de desenvolvimento e hora técnica.',
      icon: 'mdi:code-tags',
      category: 'financeiro',
      appPath: '/calculadora_programadores/',
      tags: ['programador', 'dev', 'orçamento', 'desenvolvimento', 'hora'],
      featured: true,
    },
    {
      id: 'calculadora-saude',
      folderName: 'calculadora_saude',
      name: 'Calculadora de Saúde',
      shortDesc: 'IMC, peso ideal, metabolismo basal e plano nutricional personalizado.',
      icon: 'mdi:doctor',
      category: 'financeiro',
      appPath: '/calculadora_saude/',
      tags: ['saúde', 'imc', 'nutrição', 'metabolismo', 'dieta'],
    },
    {
      id: 'investsim',
      folderName: 'investsim',
      name: 'InvestSim — Simulador de Investimentos',
      shortDesc: 'Simule, planeje e compare investimentos: CDB, Tesouro, ações e mais.',
      icon: 'mdi:chart-line-variant',
      category: 'financeiro',
      appPath: '/investsim/',
      tags: ['investimento', 'simulador', 'CDB', 'tesouro', 'ações', 'renda fixa'],
      featured: true,
    },
    {
      id: 'meu-bolso-mensal',
      folderName: 'meu_bolso_mensal',
      name: 'Meu Bolso Mensal',
      shortDesc: 'Controle financeiro pessoal: organize receitas, despesas e metas.',
      icon: 'mdi:wallet-outline',
      category: 'financeiro',
      appPath: '/meu_bolso_mensal/',
      tags: ['orçamento pessoal', 'finanças', 'controle', 'despesas', 'receitas'],
    },
    {
      id: 'rendimento-salarial',
      folderName: 'rendimento_salarial',
      name: 'Rendimento Salarial',
      shortDesc: 'Calcule salário líquido, INSS, IRRF, décimo terceiro e férias.',
      icon: 'mdi:currency-brl',
      category: 'financeiro',
      appPath: '/rendimento_salarial/',
      tags: ['salário', 'INSS', 'IRRF', 'férias', '13 salário', 'CLT'],
    },
    {
      id: 'simuladores-empresariais',
      folderName: 'simuladores_empresariais',
      name: 'Simuladores Empresariais Pro',
      shortDesc: 'Análise financeira profissional: DRE, fluxo de caixa e projeções.',
      icon: 'mdi:office-building-outline',
      category: 'financeiro',
      appPath: '/simuladores_empresariais/',
      tags: ['DRE', 'fluxo de caixa', 'empresa', 'análise', 'projeção'],
      featured: true,
    },
    {
      id: 'finance-flow',
      folderName: 'finance_flow',
      name: 'FinanceFlow',
      shortDesc: 'Simulador de finanças pessoais com gráficos e controle de gastos.',
      icon: 'mdi:cash-flow',
      category: 'financeiro',
      appPath: '/finance_flow/',
      tags: ['finanças pessoais', 'controle', 'gastos', 'simulador'],
    },
    {
      id: 'seu-peso',
      folderName: 'seu_peso',
      name: 'Seu Peso',
      shortDesc: 'Calculadora de saúde corporal: IMC, metabolismo, calorias e gordura.',
      icon: 'mdi:scale-bathroom',
      category: 'financeiro',
      appPath: '/seu_peso/',
      tags: ['peso', 'IMC', 'calorias', 'gordura corporal', 'saúde'],
    },

    // ── MARKETING ────────────────────────────────────────────────────────────
    {
      id: 'calculadora-campanha-trafego',
      folderName: 'calculadora_campanha_trafego',
      name: 'Calculadora de Campanha de Tráfego',
      shortDesc: 'Calcule ROI, CPC, conversões e métricas de campanhas pagas.',
      icon: 'mdi:chart-areaspline',
      category: 'marketing',
      appPath: '/calculadora_campanha_trafego/',
      tags: ['tráfego pago', 'ROI', 'CPC', 'Google Ads', 'Meta Ads', 'campanhas'],
      featured: true,
    },
    {
      id: 'calculadora-orcamento-marketing-digital',
      folderName: 'calculadora_orcamento_marketing_digital',
      name: 'Orçamento de Marketing Digital',
      shortDesc: 'Monte o orçamento ideal para sua estratégia de marketing digital.',
      icon: 'mdi:calculator-variant',
      category: 'marketing',
      appPath: '/calculadora_orcamento_marketing_digital/',
      tags: ['marketing digital', 'orçamento', 'investimento', 'mídia', 'agência'],
      featured: true,
    },
    {
      id: 'calculadora-social-midia',
      folderName: 'calculadora_social_midia',
      name: 'Calculadora de Redes Sociais',
      shortDesc: 'Precifique serviços de social media e calcule o valor do seu trabalho.',
      icon: 'mdi:instagram',
      category: 'marketing',
      appPath: '/calculadora_social_midia/',
      tags: ['social media', 'instagram', 'gestão', 'precificação', 'redes sociais'],
    },
    {
      id: 'orcamento-social-midia',
      folderName: 'orcamento_social_midia',
      name: 'Orçamento Social Mídia',
      shortDesc: 'Gere propostas de orçamento profissional para serviços de social media.',
      icon: 'mdi:bullhorn-outline',
      category: 'marketing',
      appPath: '/orcamento_social_midia/',
      tags: ['proposta', 'social media', 'orçamento', 'cliente', 'agência'],
    },

    // ── DEV TOOLS ────────────────────────────────────────────────────────────
    {
      id: 'code-gen',
      folderName: 'code_gen',
      name: 'CodeGen',
      shortDesc: 'Gerador de QR Code e código de barras para produtos e aplicações.',
      icon: 'mdi:qrcode-plus',
      category: 'dev',
      appPath: '/code_gen/',
      tags: ['QR code', 'código de barras', 'gerador', 'EAN', 'UPC'],
    },
    {
      id: 'code-logic-flow-studio',
      folderName: 'code_logic_flow_studio',
      name: 'LogicFlow Studio',
      shortDesc: 'Aprenda lógica de programação de forma visual, interativa e gratuita.',
      icon: 'mdi:sitemap-outline',
      category: 'dev',
      appPath: '/code_logic_flow_studio/',
      tags: ['lógica', 'programação', 'fluxograma', 'aprendizado', 'visual'],
      featured: true,
    },
    {
      id: 'code-master',
      folderName: 'code_master',
      name: 'CodeMaster',
      shortDesc: 'Editor de código online (HTML/CSS/JS/PHP) — grátis e profissional.',
      icon: 'mdi:code-braces-box',
      category: 'dev',
      appPath: '/code_master/',
      tags: ['editor', 'código', 'HTML', 'CSS', 'JavaScript', 'PHP', 'online'],
      featured: true,
    },
    {
      id: 'dados-brasil-generator-pro',
      folderName: 'dados_brasil_generator_pro',
      name: 'Dados Brasil Generator Pro',
      shortDesc: 'Gere e valide documentos brasileiros: CPF, CNPJ, CEP, RG e mais.',
      icon: 'mdi:flag-variant-outline',
      category: 'dev',
      appPath: '/dados_brasil_generator_pro/',
      tags: ['CPF', 'CNPJ', 'CEP', 'RG', 'dados', 'gerador', 'validador', 'teste'],
      featured: true,
    },
    {
      id: 'dev-playground',
      folderName: 'dev_playground',
      name: 'DevPlayground',
      shortDesc: 'Editor online de código grátis — teste HTML, CSS e JS em tempo real.',
      icon: 'mdi:play-box-outline',
      category: 'dev',
      appPath: '/dev_playground/',
      tags: ['playground', 'editor', 'HTML', 'CSS', 'JavaScript', 'live preview'],
    },
    {
      id: 'dev-start',
      folderName: 'dev_start',
      name: 'DevStart Academy',
      shortDesc: 'Aprenda programação de forma gamificada e interativa.',
      icon: 'mdi:school-outline',
      category: 'dev',
      appPath: '/dev_start/',
      tags: ['aprendizado', 'programação', 'gamificação', 'curso', 'iniciante'],
    },
    {
      id: 'dev-toolkit-suite-essentials',
      folderName: 'dev_toolkit_suite_essentials',
      name: 'Dev Toolkit Suite',
      shortDesc: 'Suite completa de ferramentas essenciais para desenvolvedores.',
      icon: 'mdi:toolbox-outline',
      category: 'dev',
      appPath: '/dev_toolkit_suite_essentials/',
      tags: ['toolkit', 'dev tools', 'utilitários', 'desenvolvedor', 'suite'],
    },
    {
      id: 'entity-converter-pro',
      folderName: 'entity_converter_pro',
      name: 'Entity Converter Pro',
      shortDesc: 'Converta caracteres especiais para HTML entities e vice-versa.',
      icon: 'mdi:xml',
      category: 'dev',
      appPath: '/entity_converter_pro/',
      tags: ['HTML entities', 'XML', 'caracteres', 'encode', 'decode'],
    },
    {
      id: 'excel-consolidator',
      folderName: 'excel_consolidator',
      name: 'Excel Consolidator',
      shortDesc: 'Unifique e consolide múltiplas planilhas Excel e CSV inteligentemente.',
      icon: 'mdi:microsoft-excel',
      category: 'dev',
      appPath: '/excel_consolidator/',
      tags: ['Excel', 'CSV', 'planilha', 'consolidar', 'mesclar', 'dados'],
      featured: true,
    },

    // ── TEXTO & CONTEÚDO ─────────────────────────────────────────────────────
    {
      id: 'analisador-texto',
      folderName: 'analisador_texto',
      name: 'Analisador de Texto',
      shortDesc: 'Analise, compare e extraia insights de textos em tempo real.',
      icon: 'mdi:text-search',
      category: 'texto',
      appPath: '/analisador_texto/',
      tags: ['texto', 'análise', 'comparação', 'palavras', 'contagem', 'SEO'],
      featured: true,
    },
    {
      id: 'digitador',
      folderName: 'digitador',
      name: 'TypingMaster',
      shortDesc: 'Aprenda digitação de forma divertida, eficiente e progressiva.',
      icon: 'mdi:keyboard-outline',
      category: 'texto',
      appPath: '/digitador/',
      tags: ['digitação', 'typing', 'teclado', 'wpm', 'treino'],
    },
    {
      id: 'divisor-texto',
      folderName: 'divisor_texto',
      name: 'Divisor de Texto',
      shortDesc: 'Divida e organize textos longos em partes menores com privacidade total.',
      icon: 'mdi:scissors-cutting',
      category: 'texto',
      appPath: '/divisor_texto/',
      tags: ['dividir', 'texto', 'partes', 'fatias', 'limite de caracteres'],
    },
    {
      id: 'extrator-email',
      folderName: 'extrator_email',
      name: 'Extrator de E-mails',
      shortDesc: 'Extraia endereços de e-mail de qualquer texto rápido e seguro.',
      icon: 'mdi:email-search-outline',
      category: 'texto',
      appPath: '/extrator_email/',
      tags: ['e-mail', 'extrator', 'lista', 'email marketing', 'contatos'],
    },
    {
      id: 'extrator-email-cpf-cnpj',
      folderName: 'extrator_email_cpf_cnpj',
      name: 'Extrator Email/CPF/CNPJ',
      shortDesc: 'Extraia e-mails, CPFs e CNPJs de textos com um clique.',
      icon: 'mdi:magnify-scan',
      category: 'texto',
      appPath: '/extrator_email_cpf_cnpj/',
      tags: ['CPF', 'CNPJ', 'e-mail', 'extrator', 'dados'],
    },
    {
      id: 'extrator-texto',
      folderName: 'extrator_texto',
      name: 'TextGrab — OCR Online',
      shortDesc: 'Extraia texto de imagens usando OCR inteligente no navegador.',
      icon: 'mdi:scan-helper',
      category: 'texto',
      appPath: '/extrator_texto/',
      tags: ['OCR', 'imagem para texto', 'reconhecimento', 'digitalização'],
      featured: true,
    },
    {
      id: 'gerador-legenda',
      folderName: 'gerador_legenda',
      name: 'Gerador de Legenda',
      shortDesc: 'Crie legendas e subtítulos profissionais para vídeos e conteúdo.',
      icon: 'mdi:subtitles-outline',
      category: 'texto',
      appPath: '/gerador_legenda/',
      tags: ['legenda', 'subtítulo', 'vídeo', 'acessibilidade', 'SRT'],
    },
    {
      id: 'ipsum-generator-plus',
      folderName: 'ipsum_generator_plus',
      name: 'Ipsum Generator Plus',
      shortDesc: 'Gerador de Lorem Ipsum profissional e criativo para projetos.',
      icon: 'mdi:format-quote-open',
      category: 'texto',
      appPath: '/ipsum_generator_plus/',
      tags: ['lorem ipsum', 'placeholder', 'texto', 'design', 'mockup'],
    },
    {
      id: 'manipulador-lista',
      folderName: 'manipulador_lista',
      name: 'Manipulador de Listas',
      shortDesc: 'Organize, processe e transforme listas de dados online.',
      icon: 'mdi:format-list-bulleted',
      category: 'texto',
      appPath: '/manipulador_lista/',
      tags: ['lista', 'ordenar', 'filtrar', 'processar', 'dados'],
    },
    {
      id: 'modificador-texto',
      folderName: 'modificador_texto',
      name: 'TextCraft',
      shortDesc: 'Transforme e formate textos: maiúsculas, camelCase, slug e mais.',
      icon: 'mdi:text-short',
      category: 'texto',
      appPath: '/modificador_texto/',
      tags: ['texto', 'maiúsculas', 'minúsculas', 'camelCase', 'slug', 'formatar'],
    },
    {
      id: 'srt-converter-pro',
      folderName: 'srt_converter_pro',
      name: 'SRT Converter Pro',
      shortDesc: 'Converta roteiros e textos para o formato de legenda SRT.',
      icon: 'mdi:closed-caption-outline',
      category: 'texto',
      appPath: '/srt_converter_pro/',
      tags: ['SRT', 'legenda', 'subtítulo', 'vídeo', 'conversor'],
    },
    {
      id: 'wordcraft-pro',
      folderName: 'WordCraftPRO',
      name: 'WordCraft PRO',
      shortDesc: 'Gerador de passatempos e palavras-cruzadas profissional.',
      icon: 'mdi:crosshairs-gps',
      category: 'texto',
      appPath: '/WordCraftPRO/',
      tags: ['palavras cruzadas', 'caça-palavras', 'passatempo', 'jogo', 'educação'],
    },

    // ── DESIGN & MÍDIA ───────────────────────────────────────────────────────
    {
      id: 'color-craft',
      folderName: 'color_craft',
      name: 'ColorCraft',
      shortDesc: 'Criador de paletas de cores profissional para design e branding.',
      icon: 'mdi:palette',
      category: 'design',
      appPath: '/color_craft/',
      tags: ['cores', 'paleta', 'design', 'branding', 'harmonia'],
      featured: true,
    },
    {
      id: 'conversor-cores',
      folderName: 'conversor_cores',
      name: 'Conversor de Cores',
      shortDesc: 'Converta cores entre RGB, HEX, HSL, CMYK e LAB instantaneamente.',
      icon: 'mdi:format-color-fill',
      category: 'design',
      appPath: '/conversor_cores/',
      tags: ['cor', 'RGB', 'HEX', 'HSL', 'CMYK', 'conversor'],
    },
    {
      id: 'convert-share',
      folderName: 'convert_share',
      name: 'ConvertShare',
      shortDesc: 'Converta e compartilhe arquivos de diferentes formatos online.',
      icon: 'mdi:file-convert-outline',
      category: 'design',
      appPath: '/convert_share/',
      tags: ['converter', 'arquivo', 'formato', 'compartilhar', 'upload'],
    },
    {
      id: 'gerador-gradiente',
      folderName: 'gerador_gradiente',
      name: 'Gerador de Gradiente CSS',
      shortDesc: 'Crie gradientes CSS lindos e copie o código pronto para usar.',
      icon: 'mdi:gradient-vertical',
      category: 'design',
      appPath: '/gerador_gradiente/',
      tags: ['CSS', 'gradiente', 'cor', 'background', 'design'],
      featured: true,
    },
    {
      id: 'marca-dagua',
      folderName: 'marca_dagua',
      name: 'Marca D\'Água Online',
      shortDesc: 'Adicione marca d\'água profissional em imagens — rápido e seguro.',
      icon: 'mdi:image-edit-outline',
      category: 'design',
      appPath: '/marca_dagua/',
      tags: ['marca dágua', 'watermark', 'imagem', 'proteção', 'logo'],
    },
    {
      id: 'pdf-convert-pro',
      folderName: 'pdf_convert_pro',
      name: 'PDFConvert Pro',
      shortDesc: 'Converta PDF para Word e Excel com precisão profissional.',
      icon: 'mdi:file-pdf-box',
      category: 'design',
      appPath: '/pdf_convert_pro/',
      tags: ['PDF', 'Word', 'Excel', 'converter', 'documento'],
      featured: true,
    },
    {
      id: 'qr-code-pro',
      folderName: 'qr_code_pro',
      name: 'QR Code Alchemist',
      shortDesc: 'Gerador avançado de QR Code com design personalizado e cores.',
      icon: 'mdi:qrcode-plus',
      category: 'design',
      appPath: '/qr_code_pro/',
      tags: ['QR code', 'personalizado', 'cores', 'download', 'URL'],
      featured: true,
    },
    {
      id: 'thumbnail-pro',
      folderName: 'thumbnail_pro',
      name: 'ThumbnailPro',
      shortDesc: 'Extraia thumbnails do YouTube em alta qualidade gratuitamente.',
      icon: 'mdi:image-frame',
      category: 'design',
      appPath: '/thumbnail_pro/',
      tags: ['thumbnail', 'YouTube', 'download', 'imagem', 'miniatura'],
    },
    {
      id: 'thumbnail-youtube',
      folderName: 'thumbnail_youtube',
      name: 'Thumbnail YouTube HD',
      shortDesc: 'Baixe miniaturas do YouTube em HD, Full HD e 4K de qualquer vídeo.',
      icon: 'mdi:youtube',
      category: 'design',
      appPath: '/thumbnail_youtube/',
      tags: ['YouTube', 'thumbnail', 'HD', 'download', 'miniatura'],
    },
    {
      id: 'watermark-wizard',
      folderName: 'watermark_wizard_online',
      name: 'Watermark Wizard',
      shortDesc: 'Adicione marca d\'água em lote nas suas imagens de forma inteligente.',
      icon: 'mdi:watermark',
      category: 'design',
      appPath: '/watermark_wizard_online/',
      tags: ['watermark', 'marca dágua', 'imagens', 'lote', 'proteção'],
    },

    // ── NEGÓCIOS ─────────────────────────────────────────────────────────────
    {
      id: 'consulta-pix',
      folderName: 'consulta_pix',
      name: 'Pix Decode Pro',
      shortDesc: 'Decodifique e analise QR Codes PIX — valide antes de pagar.',
      icon: 'mdi:contactless-payment',
      category: 'negocios',
      appPath: '/consulta_pix/',
      tags: ['PIX', 'QR code', 'pagamento', 'validar', 'decodificar'],
      featured: true,
    },
    {
      id: 'empreenda-facil',
      folderName: 'empreenda_facil_gerador',
      name: 'Empreenda Fácil',
      shortDesc: 'Gere orçamentos, recibos e ordens de serviço profissionais grátis.',
      icon: 'mdi:store-outline',
      category: 'negocios',
      appPath: '/empreenda_facil_gerador/',
      tags: ['orçamento', 'recibo', 'ordem de serviço', 'empreendedor', 'MEI'],
      featured: true,
    },
    {
      id: 'gerador-fatura',
      folderName: 'gerador_fatura',
      name: 'Gerador de Contratos',
      shortDesc: 'Crie contratos e faturas profissionais de forma rápida e gratuita.',
      icon: 'mdi:file-document-outline',
      category: 'negocios',
      appPath: '/gerador_fatura/',
      tags: ['contrato', 'fatura', 'nota', 'profissional', 'MEI', 'empresa'],
      featured: true,
    },
    {
      id: 'planejador-casamento',
      folderName: 'planejador_casamento',
      name: 'Planejador de Casamento',
      shortDesc: 'Organize o casamento dos seus sonhos com checklist e controle de custos.',
      icon: 'mdi:ring',
      category: 'negocios',
      appPath: '/planejador_casamento/',
      tags: ['casamento', 'planejamento', 'orçamento', 'checklist', 'evento'],
    },
    {
      id: 'sorteio-facil',
      folderName: 'sorteio_facil',
      name: 'Sorteio Fácil',
      shortDesc: 'Realize sorteios e rifas online de forma transparente e confiável.',
      icon: 'mdi:dice-6-outline',
      category: 'negocios',
      appPath: '/sorteio_facil/',
      tags: ['sorteio', 'rifa', 'sorte', 'ganhador', 'aleatório'],
    },
    {
      id: 'teste-personalidade',
      folderName: 'teste_personalidade',
      name: 'Teste de Personalidade',
      shortDesc: 'Descubra seu perfil com testes DISC, Eneagrama e vocacional grátis.',
      icon: 'mdi:brain',
      category: 'negocios',
      appPath: '/teste_personalidade/',
      tags: ['DISC', 'eneagrama', 'personalidade', 'perfil', 'teste', 'vocacional'],
    },
    {
      id: 'teste-vocacional',
      folderName: 'teste_vocacionl',
      name: 'Teste Vocacional Online',
      shortDesc: 'Descubra sua carreira ideal com o teste vocacional gratuito.',
      icon: 'mdi:school',
      category: 'negocios',
      appPath: '/teste_vocacionl/',
      tags: ['vocacional', 'carreira', 'profissão', 'aptidão', 'orientação'],
    },
    {
      id: 'secure-secret-generator',
      folderName: 'secure_secret_generator_password',
      name: 'Gerador de Senhas Seguras',
      shortDesc: 'Crie senhas fortes e chaves secretas com segurança avançada.',
      icon: 'mdi:lock-plus-outline',
      category: 'negocios',
      appPath: '/secure_secret_generator_password/',
      tags: ['senha', 'segurança', 'password', 'chave', 'criptografia'],
    },
  ])

  // ── Computed ────────────────────────────────────────────────────────────────

  const filteredSolucoes = computed(() => {
    let result = solucoes.value

    if (selectedCategory.value !== 'todos') {
      result = result.filter((s) => s.category === selectedCategory.value)
    }

    const q = searchQuery.value.trim().toLowerCase()
    if (q) {
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.shortDesc.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q)),
      )
    }

    return result
  })

  const featuredSolucoes = computed(() => solucoes.value.filter((s) => s.featured))

  const totalByCategory = computed(() => {
    const map: Record<string, number> = { todos: solucoes.value.length }
    for (const s of solucoes.value) {
      map[s.category] = (map[s.category] ?? 0) + 1
    }
    return map
  })

  /** Busca uma solução pelo slug de rota */
  function findById(id: string): Solucao | undefined {
    return solucoes.value.find((s) => s.id === id)
  }

  return {
    searchQuery,
    selectedCategory,
    categories,
    solucoes,
    filteredSolucoes,
    featuredSolucoes,
    totalByCategory,
    findById,
  }
})
