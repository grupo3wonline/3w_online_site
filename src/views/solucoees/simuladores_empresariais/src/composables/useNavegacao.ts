/**
 * Fonte única de navegação da aplicação (DRY).
 * Cabeçalho e rodapé consomem estas listas para permanecerem sempre sincronizados.
 */

export interface ItemNav {
  to: string
  label: string
  icon: string
}

// Landing única: todos os itens apontam para âncoras da home.
/** Menu principal (cabeçalho + coluna "Navegação" do rodapé). */
export const menuPrincipal: ItemNav[] = [
  { to: '/', label: 'Início', icon: 'lucide:home' },
  { to: '/#ferramentas', label: 'Ferramentas', icon: 'lucide:calculator' },
  { to: '/#sobre', label: 'Sobre', icon: 'lucide:info' },
  { to: '/#servicos', label: 'Serviços', icon: 'lucide:briefcase' },
  { to: '/#contato', label: 'Contato', icon: 'lucide:mail' },
]

/** Atalhos diretos para cada simulador (âncoras da seção de ferramentas). */
export const menuSimuladores: ItemNav[] = [
  { to: '/#empresarial', label: 'Orçamento Empresarial', icon: 'lucide:calculator' },
  { to: '/#marketing', label: 'Orçamento de Marketing', icon: 'lucide:trending-up' },
  { to: '/#saude', label: 'Saúde da Empresa', icon: 'lucide:heart-pulse' },
  { to: '/#precificacao', label: 'Precificação e Markup', icon: 'lucide:tag' },
]

/** Páginas legais / conformidade. */
export const menuLegal: ItemNav[] = [
  { to: '/termos-de-uso', label: 'Termos de Uso', icon: 'lucide:file-text' },
  { to: '/politica-de-privacidade', label: 'Política de Privacidade', icon: 'lucide:shield-check' },
]

/** Dados de contato reutilizáveis. */
export const contato = {
  whatsappNumero: '5541996924829',
  whatsappLabel: '(41) 99692-4829',
  email: 'contato@3wonline.com.br',
  site: 'https://www.3wonline.com.br',
  get whatsappUrl() {
    return `https://wa.me/${this.whatsappNumero}?text=${encodeURIComponent(
      'Olá! Vim pelos Simuladores Empresariais e gostaria de falar sobre um projeto.'
    )}`
  },
}
