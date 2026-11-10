import { Link } from "react-router-dom";

const footerLinks = {
  ferramentas: [
    { label: "Calculadora de Salário", path: "/ferramentas?calc=salario" },
    { label: "Cálculo de Férias", path: "/ferramentas?calc=ferias" },
    { label: "13º Salário", path: "/ferramentas?calc=decimo-terceiro" },
    { label: "Simulador de Investimentos", path: "/ferramentas?calc=investimentos" },
  ],
  empresa: [
    { label: "Sobre Nós", path: "/sobre" },
    { label: "Serviços", path: "/servicos" },
    { label: "Contato", path: "/contato" },
  ],
  legal: [
    { label: "Termos de Uso", path: "/termos-de-uso" },
    { label: "Política de Privacidade", path: "/politica-de-privacidade" },
  ],
};

const socialLinks = [
  { icon: "fa-facebook-f", url: "https://facebook.com", label: "Facebook" },
  { icon: "fa-instagram", url: "https://instagram.com", label: "Instagram" },
  { icon: "fa-linkedin-in", url: "https://linkedin.com", label: "LinkedIn" },
  { icon: "fa-whatsapp", url: "https://wa.me/5500000000000", label: "WhatsApp" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background" role="contentinfo">
      {/* CTA Section */}
      <div className="bg-gradient-primary py-12">
        <div className="container-app text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Precisa de um Sistema Personalizado?
          </h2>
          <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
            O <strong>Grupo 3W Online</strong> desenvolve websites e sistemas sob demanda 
            para transformar sua ideia em realidade digital. Mais de 15 anos de experiência 
            em soluções tecnológicas.
          </p>
          <a
            href="https://www.3wonline.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-background text-primary font-semibold px-6 py-3 rounded-lg hover:bg-background/90 transition-colors shadow-elevated"
          >
            <i className="fa-solid fa-globe"></i>
            Conhecer Grupo 3W Online
            <i className="fa-solid fa-arrow-right text-sm"></i>
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12 md:py-16">
        <div className="container-app">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link to="/" className="inline-flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <i className="fa-solid fa-calculator text-primary-foreground text-lg"></i>
                </div>
                <div>
                  <span className="font-display font-bold text-lg text-background">
                    CalcFinance
                  </span>
                  <span className="font-display font-bold text-lg text-primary-glow">
                    Pro
                  </span>
                </div>
              </Link>
              <p className="text-background/70 text-sm mb-6">
                Simulador financeiro completo para você planejar seu futuro com 
                precisão e segurança. 100% gratuito e online.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center text-background/80 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    aria-label={social.label}
                  >
                    <i className={`fa-brands ${social.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Ferramentas Column */}
            <div>
              <h3 className="font-display font-semibold text-background mb-4">
                Ferramentas
              </h3>
              <ul className="space-y-2">
                {footerLinks.ferramentas.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-background/70 hover:text-primary-glow transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Empresa Column */}
            <div>
              <h3 className="font-display font-semibold text-background mb-4">
                Empresa
              </h3>
              <ul className="space-y-2">
                {footerLinks.empresa.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-background/70 hover:text-primary-glow transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="font-display font-semibold text-background mb-4">
                Legal
              </h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-background/70 hover:text-primary-glow transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-background/5 rounded-lg">
                <p className="text-xs text-background/60">
                  <i className="fa-solid fa-shield-halved mr-2 text-primary-glow"></i>
                  Este site está em conformidade com a LGPD - Lei Geral de 
                  Proteção de Dados.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-background/10 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-background/60 text-sm text-center md:text-left">
                © {currentYear} CalcFinance Pro. Todos os direitos reservados.
              </p>
              <p className="text-background/60 text-sm text-center md:text-right">
                Desenvolvido com <i className="fa-solid fa-heart text-destructive mx-1"></i> por{" "}
                <a
                  href="https://www.3wonline.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-glow hover:underline font-medium"
                >
                  Grupo 3W Online
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}