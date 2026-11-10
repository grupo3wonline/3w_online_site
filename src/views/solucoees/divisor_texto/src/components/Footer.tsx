import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCode, faBuilding } from '@fortawesome/free-solid-svg-icons';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/50 backdrop-blur">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-hero" aria-hidden="true"></div>
              <span className="font-bold text-lg">Divisor de Texto</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Ferramenta gratuita para organização e divisão de textos longos. 
              Processamento 100% local e privado.
            </p>
          </div>

          {/* Links Legais */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/termos" className="hover:text-primary transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="hover:text-primary transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/app" className="hover:text-primary transition-colors">
                  Usar Ferramenta
                </Link>
              </li>
            </ul>
          </div>

          {/* Sobre / Desenvolvedor */}
          <div>
            <h3 className="font-semibold mb-4">Sobre</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Desenvolvido para ajudar estudantes, editores e profissionais de conteúdo 
              a organizarem seus textos de forma eficiente.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <FontAwesomeIcon icon={faCode} className="text-primary" />
              <span>Desenvolvido por <strong className="text-foreground">Hotwyl</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FontAwesomeIcon icon={faBuilding} className="text-primary" />
              <span><strong className="text-foreground">Grupo 3W Online</strong></span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1 flex-wrap">
            © {currentYear} Divisor de Texto. Todos os direitos reservados.
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              Feito com <FontAwesomeIcon icon={faHeart} className="text-destructive" aria-label="amor" /> no Brasil
            </span>
          </p>
          <p className="mt-2">
            Sistema desenvolvido por <strong>Hotwyl</strong> | <strong>Grupo 3W Online</strong>
          </p>
          <p className="mt-1 text-xs">Ferramenta gratuita • Sem cadastro • Conforme LGPD</p>
        </div>
      </div>
    </footer>
  );
};
