/**
 * Configuração central do site (Single Source of Truth).
 * Aplica princípio DRY: dados institucionais em um só lugar.
 */
export const siteConfig = {
  name: "Empreenda Fácil",
  shortName: "Empreenda Fácil",
  tagline: "Geradores profissionais para o seu negócio",
  description:
    "Sistema gratuito de geradores para empreendedores. Crie orçamentos, ordens de serviço e recibos profissionais em segundos. Rápido, fácil e seguro.",
  url: "https://app.3wonline.com/empreenda_facil_gerador",
  basePath: "/empreenda_facil_gerador/",
  locale: "pt-BR",
  themeColor: "#7c3aed",
  keywords:
    "gerador de orçamento, ordem de serviço, gerador de recibo, empreendedor, MEI, pequena empresa, gestão de documentos, ferramentas gratuitas",
  developer: {
    name: "HOTWYL | WILLFROMBRASIL",
    github: "https://github.com/hotwyl",
  },
  company: {
    name: "Grupo 3w Online",
    description: "Desenvolvimento de sites e sistemas personalizados sob demanda.",
    site: "https://www.3wonline.com.br",
    whatsapp: "5541996924829",
    whatsappDisplay: "(41) 99692-4829",
    email: "contato@3wonline.com.br",
  },
  analytics: {
    gtmId: "GTM-WVMJV7G6",
    ga4Id: "G-J06THXX0MW",
  },
} as const;

export const whatsappLink = (message?: string): string => {
  const base = `https://wa.me/${siteConfig.company.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};
