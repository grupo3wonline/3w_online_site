export interface NavItem {
  label: string;
  to: string;
  icon: string;
  description?: string;
}

/** Itens principais de navegação (cabeçalho). */
export const mainNav: NavItem[] = [
  { label: "Início", to: "/", icon: "lucide:home", description: "Página inicial" },
  {
    label: "Orçamentos",
    to: "/orcamentos",
    icon: "lucide:calculator",
    description: "Gerador de orçamentos",
  },
  {
    label: "Ordem de Serviço",
    to: "/ordem-servicos",
    icon: "lucide:file-text",
    description: "Gerador de OS",
  },
  { label: "Recibos", to: "/recibos", icon: "lucide:receipt", description: "Gerador de recibos" },
  {
    label: "Simulador",
    to: "/simulador",
    icon: "lucide:trending-up",
    description: "Preço e parcelamento",
  },
  { label: "Dicas", to: "/#dicas", icon: "lucide:book-open", description: "Dicas e tutoriais" },
  { label: "Contato", to: "/#contato", icon: "lucide:mail", description: "Fale conosco" },
];

/** Itens de navegação do rodapé, agrupados. */
export const footerNav = {
  ferramentas: [
    { label: "Orçamentos", to: "/orcamentos", icon: "lucide:calculator" },
    { label: "Ordem de Serviço", to: "/ordem-servicos", icon: "lucide:file-text" },
    { label: "Recibos", to: "/recibos", icon: "lucide:receipt" },
    { label: "Simulador", to: "/simulador", icon: "lucide:trending-up" },
  ] as NavItem[],
  institucional: [
    { label: "Início", to: "/", icon: "lucide:home" },
    { label: "Sobre", to: "/#sobre", icon: "lucide:info" },
    { label: "Dicas", to: "/#dicas", icon: "lucide:book-open" },
    { label: "Contato", to: "/#contato", icon: "lucide:mail" },
  ] as NavItem[],
  legal: [
    { label: "Termos de Uso", to: "/termos", icon: "lucide:file-check" },
    { label: "Política de Privacidade", to: "/privacidade", icon: "lucide:shield-check" },
  ] as NavItem[],
};
