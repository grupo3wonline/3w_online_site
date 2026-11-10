/**
 * Fonte única de verdade para navegação, ferramentas e dados da empresa.
 * Usado por header, footer, landing page, página de ferramentas e busca.
 */

export interface ToolMeta {
  slug: string
  path: string
  title: string
  short: string
  description: string
  icon: string
  color: string
  keywords: string
}

export const COMPANY = {
  name: 'Grupo 3w Online',
  tagline: 'Sites e sistemas personalizados sob demanda',
  site: 'https://www.3wonline.com.br',
  email: 'contato@3wonline.com.br',
  whatsapp: '(41) 99692-4829',
  whatsappLink: 'https://wa.me/5541996924829',
  developer: 'HOTWYL | WILLFROMBRASIL',
}

export const TOOLS: ToolMeta[] = [
  {
    slug: 'json-xml-formatter',
    path: '/json-xml-formatter',
    title: 'Formatador JSON/XML',
    short: 'Organize e valide dados instantaneamente.',
    description:
      'Formate, valide e embeleze seus dados JSON e XML com indentação automática e detecção de erros.',
    icon: 'lucide:code-2',
    color: 'from-blue-500 to-blue-600',
    keywords: 'formatador json, validador json, formatador xml, beautify json',
  },
  {
    slug: 'base64',
    path: '/base64',
    title: 'Base64 Encoder/Decoder',
    short: 'Codificação e decodificação segura.',
    description:
      'Codifique texto em Base64 ou decodifique strings Base64 de volta para texto legível, tudo no seu navegador.',
    icon: 'lucide:binary',
    color: 'from-green-500 to-emerald-600',
    keywords: 'base64 encoder, base64 decoder, codificar base64, decodificar base64',
  },
  {
    slug: 'md5-generator',
    path: '/md5-generator',
    title: 'Gerador de Hash MD5',
    short: 'Hashes MD5 em segundos.',
    description:
      'Gere hash MD5 a partir de qualquer texto para checksums, verificação de integridade e aplicações não sensíveis.',
    icon: 'lucide:hash',
    color: 'from-purple-500 to-violet-600',
    keywords: 'gerador md5, hash md5, checksum, integridade de dados',
  },
  {
    slug: 'markdown-viewer',
    path: '/markdown-viewer',
    title: 'Visualizador de Markdown',
    short: 'Escreva e veja em tempo real.',
    description:
      'Escreva ou cole Markdown e visualize a formatação em tempo real com suporte a GitHub Flavored Markdown.',
    icon: 'lucide:file-text',
    color: 'from-indigo-500 to-indigo-600',
    keywords: 'visualizador markdown, editor markdown, preview markdown, gfm',
  },
  {
    slug: 'string-formatter',
    path: '/string-formatter',
    title: 'Formatador de Strings',
    short: 'Texto, escape, ASCII e Unicode.',
    description:
      'Converta entre texto, sequências de escape, códigos ASCII e sequências de escape Unicode.',
    icon: 'lucide:type',
    color: 'from-teal-500 to-cyan-600',
    keywords: 'formatador string, escape unicode, ascii, sequencias de escape',
  },
  {
    slug: 'file-converter',
    path: '/file-converter',
    title: 'Conversor de Arquivos',
    short: 'CSV, JSON, XML, XLS e XLSX.',
    description:
      'Converta arquivos entre os formatos CSV, JSON, XML, XLS e XLSX com pré-visualização dos dados.',
    icon: 'lucide:refresh-cw',
    color: 'from-orange-500 to-amber-600',
    keywords: 'conversor de arquivos, csv para json, json para xml, xlsx',
  },
  {
    slug: 'uuid-generator',
    path: '/uuid-generator',
    title: 'Gerador de UUID',
    short: 'UUIDs v4 criptograficamente seguros.',
    description:
      'Gere identificadores únicos universais (UUID v4) em lote, com geração criptograficamente segura.',
    icon: 'lucide:fingerprint',
    color: 'from-pink-500 to-rose-600',
    keywords: 'gerador uuid, uuid v4, guid, identificador único',
  },
  {
    slug: 'jwt-decoder',
    path: '/jwt-decoder',
    title: 'Decodificador JWT',
    short: 'Inspecione header e payload.',
    description:
      'Decodifique e inspecione tokens JWT (header e payload), com verificação de expiração. Processamento 100% local.',
    icon: 'lucide:key-round',
    color: 'from-sky-500 to-blue-600',
    keywords: 'jwt decoder, decodificar jwt, json web token, inspecionar token',
  },
  {
    slug: 'password-generator',
    path: '/password-generator',
    title: 'Gerador de Senhas',
    short: 'Senhas fortes e personalizáveis.',
    description:
      'Crie senhas seguras e aleatórias com medidor de força, opções de comprimento e tipos de caracteres.',
    icon: 'lucide:shield-check',
    color: 'from-emerald-500 to-green-600',
    keywords: 'gerador de senhas, senha forte, senha segura, password generator',
  },
]

export interface NavLink {
  label: string
  to: string
  hash?: boolean
}

/** Navegação principal — landing usa âncoras; ferramentas têm rota própria. */
export const NAV_LINKS: NavLink[] = [
  { label: 'Início', to: '/#topo', hash: true },
  { label: 'Benefícios', to: '/#beneficios', hash: true },
  { label: 'Ferramentas', to: '/ferramentas' },
  { label: 'Sobre', to: '/#sobre', hash: true },
  { label: 'Serviços', to: '/#servicos', hash: true },
  { label: 'FAQ', to: '/#faq', hash: true },
  { label: 'Contato', to: '/#contato', hash: true },
]

export interface Faq {
  q: string
  a: string
}

export const FAQS: Faq[] = [
  {
    q: 'As ferramentas são realmente gratuitas?',
    a: 'Sim. Todas as ferramentas são 100% gratuitas, sem limites de uso e sem necessidade de cadastro.',
  },
  {
    q: 'Meus dados são enviados para algum servidor?',
    a: 'Não. Todo o processamento acontece localmente no seu navegador (abordagem Local-First). O conteúdo que você digita ou envia nunca sai do seu dispositivo.',
  },
  {
    q: 'Preciso instalar alguma coisa?',
    a: 'Não. Basta abrir no navegador, em qualquer dispositivo — desktop, tablet ou celular. Funciona até offline após o primeiro carregamento.',
  },
  {
    q: 'O gerador de MD5 serve para senhas?',
    a: 'O MD5 é indicado para checksums e verificação de integridade, não para segurança criptográfica. Para senhas, use o Gerador de Senhas e algoritmos modernos como SHA-256/bcrypt no back-end.',
  },
  {
    q: 'Posso usar as ferramentas em projetos comerciais?',
    a: 'Sim. Você pode usar livremente em projetos pessoais e comerciais. Consulte os Termos de Uso para detalhes.',
  },
  {
    q: 'Quem desenvolve e mantém a suíte?',
    a: 'A suíte é uma iniciativa do Grupo 3w Online, que desenvolve sites e sistemas personalizados sob demanda. Precisa de um projeto sob medida? Fale com a gente.',
  },
]

export interface Testimonial {
  name: string
  role: string
  text: string
  initials: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Rafael Menezes',
    role: 'Desenvolvedor Full-Stack',
    initials: 'RM',
    text: 'Uso o formatador JSON e o decoder JWT o dia inteiro. Rápido, sem propaganda e sem mandar meus dados pra lugar nenhum. Virou minha primeira aba.',
  },
  {
    name: 'Carla Duarte',
    role: 'Analista de Dados',
    initials: 'CD',
    text: 'O conversor de CSV para JSON me poupa um tempo enorme nas rotinas de importação. A validação de arquivo dá muita segurança.',
  },
  {
    name: 'Bruno Tavares',
    role: 'Tech Lead',
    initials: 'BT',
    text: 'Recomendo pra todo o time. Interface limpa, funciona no celular e o fato de rodar tudo local resolve nossa preocupação com privacidade.',
  },
]

export const TECH_STACK: { name: string; icon: string }[] = [
  { name: 'Vue 3', icon: 'lucide:component' },
  { name: 'TypeScript', icon: 'lucide:file-code-2' },
  { name: 'Vite', icon: 'lucide:zap' },
  { name: 'Tailwind CSS', icon: 'lucide:paintbrush' },
  { name: 'Web Crypto', icon: 'lucide:shield' },
  { name: 'PWA', icon: 'lucide:smartphone' },
]
