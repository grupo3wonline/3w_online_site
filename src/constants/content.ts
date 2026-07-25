/**
 * Constantes de conteúdo reutilizáveis em toda a aplicação.
 * Mesclado dos backups: grupo-3w-online-landing-page, site_antigo_3w, site_novo_3w
 */

export const WHATSAPP_NUMBER = '5541996924829'
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`
export const COMPANY_EMAIL = 'contato@3wonline.com.br'
export const COMPANY_PHONE = '(41) 99692-4829'
export const COMPANY_CNPJ = '25.530.623/0001-05'

export interface FaqItem {
  question: string
  answer: string
}

export interface Testimonial {
  quote: string
  name: string
  company: string
  avatar?: string
  result?: string
}

export interface ProcessStep {
  icon: string
  title: string
  description: string
}

export interface Benefit {
  icon: string
  title: string
  description: string
}

/** FAQ geral — mesclado de grupo-3w e site_antigo_3w */
export const FAQ_ITEMS: FaqItem[] = [
  { question: 'Quanto tempo leva para desenvolver um site?', answer: 'O prazo varia conforme a complexidade. Um site institucional leva de 2 a 4 semanas, enquanto um sistema complexo pode levar vários meses.' },
  { question: 'Vocês oferecem suporte após a entrega?', answer: 'Sim! Oferecemos suporte técnico e planos de manutenção contínua para garantir que tudo funcione perfeitamente.' },
  { question: 'Quais são as formas de pagamento?', answer: 'Aceitamos PIX (5% desconto), cartão de crédito em até 12x sem juros e transferência bancária.' },
  { question: 'Posso alterar o projeto depois de iniciado?', answer: 'Alterações podem ser feitas durante o desenvolvimento, mas podem impactar no prazo e custo final.' },
  { question: 'Vocês trabalham com empresas de outros estados?', answer: 'Sim, atendemos clientes de todo o Brasil de forma remota com comunicação eficiente.' },
  { question: 'Qual a diferença entre um site e um sistema web?', answer: 'Um site é informativo (vitrine). Um sistema web é uma ferramenta interativa para gerenciar clientes, vendas, processos, etc.' },
  { question: 'Meu projeto será otimizado para o Google (SEO)?', answer: 'Todos os nossos projetos seguem as melhores práticas de SEO desde a base.' },
  { question: 'Em quanto tempo começo a ver resultados com marketing?', answer: 'Tráfego pago traz resultados em semanas. SEO e conteúdo são investimentos de médio prazo (3 a 6 meses).' },
  { question: 'O que inclui a gestão de redes sociais?', answer: 'Planejamento de conteúdo, criação de posts, agendamento, monitoramento de interações e relatórios mensais.' },
  { question: 'Eu consigo atualizar o site depois de pronto?', answer: 'Sim! Integramos um CMS que permite atualizar textos, imagens e posts de forma fácil, sem conhecimento técnico.' },
]

/** Etapas do processo de trabalho */
export const PROCESS_STEPS: ProcessStep[] = [
  { icon: 'mdi:lightbulb', title: '1. Descoberta e Estratégia', description: 'Entendemos seus objetivos, público-alvo e desafios para traçar a estratégia perfeita.' },
  { icon: 'mdi:pencil-ruler', title: '2. Design e UX/UI', description: 'Criamos interfaces intuitivas e visualmente impactantes, focadas na melhor experiência.' },
  { icon: 'mdi:code-braces', title: '3. Desenvolvimento', description: 'Equipe especialista com tecnologias modernas para soluções robustas, seguras e escaláveis.' },
  { icon: 'mdi:rocket-launch', title: '4. Lançamento e Suporte', description: 'Implantação, garantia de funcionamento e suporte contínuo para seu sucesso.' },
]

/** Benefícios — mesclado de grupo-3w e site_antigo_3w */
export const BENEFITS: Benefit[] = [
  { icon: 'mdi:image', title: 'Construindo sua Imagem', description: 'Vamos mostrar o que você tem para oferecer ao mundo. Comece a construir seu legado digital.' },
  { icon: 'mdi:flag-checkered', title: 'Desenvolver sua Marca', description: 'Estruturar seu negócio, desde tirar a ideia do papel até organizar o necessário para conquistar clientes.' },
  { icon: 'mdi:chart-line', title: 'Aumentar sua Produtividade', description: 'Produza com qualidade, gerencie e administre melhor seu negócio com o melhor custo-benefício.' },
  { icon: 'mdi:cash-register', title: 'Aumentar suas Vendas', description: 'Apresentar corretamente seus produtos e serviços para clientes em potencial.' },
]

/** Depoimentos — mesclado de todas as versões */
export const TESTIMONIALS: Testimonial[] = [
  { quote: 'A 3W Online transformou nossa presença digital. Aumentamos as vendas em 300% em apenas 6 meses!', name: 'João Silva', company: 'Silva & Associados', result: '+300% vendas' },
  { quote: 'Profissionalismo e qualidade excepcionais. Nosso site ficou perfeito e as redes sociais bombando!', name: 'Maria Santos', company: 'Boutique Elegance', result: '+150% engajamento' },
  { quote: 'O sistema desenvolvido automatizou 95% dos nossos processos. Economizamos 50 horas semanais.', name: 'Carlos Mendes', company: 'Logística Express', result: '+400% capacidade' },
  { quote: 'Nosso e-commerce superou expectativas. Vendas aumentaram 40% no primeiro trimestre após o lançamento.', name: 'Juliana Costa', company: 'Moda & Cia', result: '+40% vendas' },
  { quote: 'Antes gastávamos 3h diárias organizando agendamentos. Agora tudo é automático!', name: 'Marina Silva', company: 'Clínica Vida', result: 'ROI 800% em 6 meses' },
  { quote: 'Sistema de estoque inteligente reduziu perdas em 70% e aumentou lucratividade em 200%.', name: 'Roberto Costa', company: 'Distribuidora RC', result: '+200% lucratividade' },
]

/** Categorias de serviços */
export const SERVICE_CATEGORIES = [
  {
    title: 'Marketing, Publicidade e Propaganda',
    icon: 'mdi:bullhorn',
    description: 'Estratégias personalizadas que engajam seu público e promovem sua marca de forma autêntica.',
    points: ['Construa sua marca online com confiança', 'O poder da conexão autêntica com seu público'],
  },
  {
    title: 'Criação de Sites e Sistemas',
    icon: 'mdi:laptop',
    description: 'Design responsivo, usabilidade aprimorada e desenvolvimento sob medida para seu negócio.',
    points: ['Presença online impactante', 'Design personalizado e funcionalidade avançada'],
  },
]
