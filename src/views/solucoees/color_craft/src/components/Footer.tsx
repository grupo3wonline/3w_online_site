import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Sobre */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg flex items-center justify-center">
                <i className="fas fa-palette text-white"></i>
              </div>
              <h3 className="text-xl font-bold">ColorCraft</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Ferramenta profissional e gratuita para criação de paletas de cores harmônicas.
              Desenvolvida com tecnologia de ponta para designers e desenvolvedores.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/3wonline"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-violet-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/3wonline"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-violet-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/3wonline"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-violet-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <i className="fas fa-link mr-2 text-violet-400"></i>
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-violet-400 transition-colors duration-300 flex items-center group"
                >
                  <i className="fas fa-chevron-right mr-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="text-gray-300 hover:text-violet-400 transition-colors duration-300 flex items-center group"
                >
                  <i className="fas fa-chevron-right mr-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  to="/servicos"
                  className="text-gray-300 hover:text-violet-400 transition-colors duration-300 flex items-center group"
                >
                  <i className="fas fa-chevron-right mr-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  to="/ferramentas"
                  className="text-gray-300 hover:text-violet-400 transition-colors duration-300 flex items-center group"
                >
                  <i className="fas fa-chevron-right mr-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                  Ferramentas
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  className="text-gray-300 hover:text-violet-400 transition-colors duration-300 flex items-center group"
                >
                  <i className="fas fa-chevron-right mr-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <i className="fas fa-tools mr-2 text-violet-400"></i>
              Recursos
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-violet-400 transition-colors duration-300 flex items-center group"
                >
                  <i className="fas fa-chevron-right mr-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                  Teoria das Cores
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-violet-400 transition-colors duration-300 flex items-center group"
                >
                  <i className="fas fa-chevron-right mr-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                  Gerador de Gradientes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-violet-400 transition-colors duration-300 flex items-center group"
                >
                  <i className="fas fa-chevron-right mr-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                  Conversor de Cores
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-violet-400 transition-colors duration-300 flex items-center group"
                >
                  <i className="fas fa-chevron-right mr-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                  Paletas Harmônicas
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <i className="fas fa-shield-alt mr-2 text-violet-400"></i>
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/termos"
                  className="text-gray-300 hover:text-violet-400 transition-colors duration-300 flex items-center group"
                >
                  <i className="fas fa-chevron-right mr-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  to="/privacidade"
                  className="text-gray-300 hover:text-violet-400 transition-colors duration-300 flex items-center group"
                >
                  <i className="fas fa-chevron-right mr-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <a
                  href="https://www.3wonline.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-violet-400 transition-colors duration-300 flex items-center group"
                >
                  <i className="fas fa-chevron-right mr-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                  3w Online
                </a>
              </li>
            </ul>

            {/* Selos de Segurança */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <i className="fas fa-lock text-green-400"></i>
                <span>Conexão Segura SSL</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <i className="fas fa-shield-alt text-blue-400"></i>
                <span>Conforme LGPD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} ColorCraft - Todos os direitos reservados | Desenvolvido por{' '}
              <a
                href="https://www.3wonline.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
              >
                3w Online
              </a>
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span className="flex items-center">
                <i className="fas fa-heart text-red-500 mr-2 animate-pulse"></i>
                Feito com amor
              </span>
              <span className="flex items-center">
                <i className="fas fa-code text-violet-400 mr-2"></i>
                React + Vite
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
