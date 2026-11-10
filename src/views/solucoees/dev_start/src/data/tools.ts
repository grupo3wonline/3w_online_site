import type { ToolInfo, Challenge } from '@/types'

/** Catálogo de ferramentas interativas da plataforma. */
export const TOOLS: ToolInfo[] = [
  {
    id: 'flowchart',
    route: '/ferramentas/fluxograma',
    title: 'Fluxograma Interativo',
    short: 'Desenhe a lógica antes de codar',
    description:
      'Editor visual de fluxogramas com simulação passo a passo. Monte o raciocínio do seu algoritmo com blocos de início, processo, decisão, laços e switch.',
    icon: 'lucide:workflow',
    color: 'blue',
    tips: [
      'Comece sempre com um bloco de INÍCIO.',
      'Rotule as saídas das decisões (Sim/Não).',
      'Use a simulação passo a passo para entender o fluxo.',
    ],
  },
  {
    id: 'logic',
    route: '/ferramentas/logica',
    title: 'Simulador Lógico',
    short: 'Circuitos digitais em tempo real',
    description:
      'Monte circuitos com portas AND, OR, NOT, XOR e NAND, interruptores e lâmpadas. Veja os sinais propagando em tempo real.',
    icon: 'lucide:cpu',
    color: 'indigo',
    tips: [
      'Clique nos interruptores para alternar 0 e 1.',
      'Conecte a saída (direita) na entrada (esquerda).',
      'Portas NAND são universais: dá para montar tudo com elas.',
    ],
  },
  {
    id: 'scratch',
    route: '/ferramentas/blocos',
    title: 'Programação em Blocos',
    short: 'Estilo Scratch, arrasta e solta',
    description:
      'Programe um personagem animado arrastando blocos de movimento, aparência, som, sensores, variáveis e controle.',
    icon: 'lucide:blocks',
    color: 'orange',
    tips: [
      'Inicie com "Quando bandeira clicada".',
      'Use "Repita" para animações fluidas.',
      'Combine movimento e som para dar vida ao personagem.',
    ],
  },
  {
    id: 'portugol',
    route: '/ferramentas/portugol',
    title: 'Portugol Studio',
    short: 'Lógica estruturada em português',
    description:
      'Editor de Portugol com execução simulada e snippets prontos. Ideal para dar os primeiros passos em algoritmos.',
    icon: 'lucide:terminal',
    color: 'emerald',
    tips: [
      'O código começa na função inicio().',
      'Use escreva() para exibir resultados.',
      'Peça ao Tutor IA para explicar erros.',
    ],
  },
  {
    id: 'visualg',
    route: '/ferramentas/visualg',
    title: 'VisualG',
    short: 'Pseudocódigo de cursos técnicos',
    description:
      'Ambiente de algoritmos no estilo VisualG, muito usado em cursos técnicos e faculdades.',
    icon: 'lucide:file-code-2',
    color: 'teal',
    tips: [
      'Declare variáveis na seção Var.',
      'Use Escreval() para pular linha.',
      'Estruture com Inicio e Fimalgoritmo.',
    ],
  },
  {
    id: 'php',
    route: '/ferramentas/php',
    title: 'PHP Sandbox',
    short: 'Backend web sem instalar nada',
    description:
      'Escreva PHP e veja a saída simulada. Aprenda variáveis, condicionais, laços, arrays e funções.',
    icon: 'lucide:server',
    color: 'violet',
    tips: [
      'Toda variável começa com $.',
      'O ponto e vírgula é obrigatório.',
      'PHP mistura-se facilmente com HTML.',
    ],
  },
  {
    id: 'codepen',
    route: '/ferramentas/web',
    title: 'Playground Web',
    short: 'HTML, CSS e JS ao vivo',
    description:
      'Combine HTML, CSS e JavaScript e veja o resultado atualizando na hora. Seu laboratório front-end.',
    icon: 'lucide:code-2',
    color: 'pink',
    tips: [
      'HTML é a estrutura, CSS o estilo, JS a lógica.',
      'Use console.log() para depurar.',
      'O preview atualiza automaticamente.',
    ],
  },
  {
    id: 'challenges',
    route: '/ferramentas/desafios',
    title: 'Desafios & Cursos',
    short: 'Pratique e evolua',
    description:
      'Desafios semanais e uma curadoria de cursos gratuitos de programação para acelerar seu aprendizado.',
    icon: 'lucide:trophy',
    color: 'amber',
    tips: [
      'Complete um desafio por semana.',
      'Explore os cursos recomendados.',
      'Contribua com projetos open source.',
    ],
  },
]

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'c1',
    title: 'Hello Logic',
    description: 'Crie um fluxograma que tenha um Início e um Fim.',
    completed: false,
    module: 'flowchart',
  },
  {
    id: 'c2',
    title: 'Porta da Verdade',
    description: 'Ative a saída de uma porta AND no simulador lógico.',
    completed: false,
    module: 'logic',
  },
  {
    id: 'c3',
    title: 'Caminho do Quadrado',
    description: 'Use blocos para mover o personagem em um quadrado.',
    completed: false,
    module: 'scratch',
  },
  {
    id: 'c4',
    title: 'Olá Mundo em Portugol',
    description: 'Escreva um algoritmo que exiba "Olá Mundo" no console.',
    completed: false,
    module: 'portugol',
  },
  {
    id: 'c5',
    title: 'Página Colorida',
    description: 'Crie um HTML com fundo azul no Playground Web.',
    completed: false,
    module: 'codepen',
  },
]

export const COURSES = [
  {
    title: 'Fundação Bradesco (EV.G)',
    url: 'https://www.ev.org.br/cursos/crie-um-site-simples-usando-html-css-e-javascript',
    desc: 'Crie um site simples usando HTML, CSS e JS',
  },
  {
    title: 'FGV Educação Executiva',
    url: 'https://educacao-executiva.fgv.br/cursos/online/curta-media-duracao-online/desenvolvimento-de-sistemas-web-css-e-html',
    desc: 'Desenvolvimento de Sistemas Web',
  },
  {
    title: 'Rocketseat Discover',
    url: 'https://www.rocketseat.com.br/discover',
    desc: 'Curso completo gratuito para iniciantes',
  },
  {
    title: 'Cursa',
    url: 'https://cursa.com.br/home/courses?category=html-e-css',
    desc: 'Vários cursos de HTML e CSS',
  },
  {
    title: 'Curso em Vídeo',
    url: 'https://www.cursoemvideo.com/curso/html5-css3-modulo1/',
    desc: 'HTML5 e CSS3: Módulo 1',
  },
  {
    title: 'EAD Education',
    url: 'https://ead.education/course/curso-de-html-e-css-para-iniciantes/',
    desc: 'HTML e CSS para Iniciantes',
  },
  {
    title: 'Estudante.dev',
    url: 'https://estudante.dev/curso/introducao-ao-html-e-css/',
    desc: 'Introdução ao HTML e CSS',
  },
  {
    title: 'UP Cursos Grátis',
    url: 'https://upcursosgratis.com.br/curso-online-gratis/html-5-e-css-3',
    desc: 'HTML 5 e CSS 3',
  },
  {
    title: 'Super Cursos',
    url: 'https://supercursos.thinkific.com/courses/curso-gratis-html-css-javascript',
    desc: 'HTML, CSS e Javascript',
  },
  {
    title: 'Senac SP',
    url: 'https://www.sp.senac.br/cursos-livres/curso-de-desenvolvimento-de-sites-com-html-e-css',
    desc: 'Desenvolvimento de Sites',
  },
  {
    title: 'Khan Academy',
    url: 'https://pt.khanacademy.org/computing/computer-programming/html-css/intro-to-html/pt/html-text-emphasis',
    desc: 'Intro to HTML/CSS',
  },
  {
    title: 'CC50 (Estudar Fora)',
    url: 'https://www.estudarfora.org.br/cc50-v2/',
    desc: 'Ciência da Computação de Harvard',
  },
]

/** Dados de contato do Grupo 3W Online. */
export const COMPANY = {
  name: 'Grupo 3W Online',
  slogan: 'Sites e sistemas personalizados sob demanda',
  site: 'https://www.3wonline.com.br',
  whatsapp: '(41) 99692-4829',
  whatsappLink:
    'https://wa.me/5541996924829?text=Ol%C3%A1!%20Vim%20pelo%20DevStart%20e%20quero%20um%20sistema%20personalizado.',
  email: 'contato@3wonline.com.br',
  developer: 'HOTWYL | WILLFROMBRASIL',
  developerUrl: 'https://github.com/hotwyl',
}
