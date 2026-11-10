import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faTwitter,
    faInstagram,
    faLinkedin,
    faGithub,
} from '@fortawesome/free-brands-svg-icons';
import {
    faEnvelope,
    faPhone,
    faMapMarkerAlt,
    faHeart,
    faGlobe,
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Sobre */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-violet-400 mb-4">
                            Lorem Ipsum+
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Gerador profissional de textos Lorem Ipsum com múltiplos formatos
                            e estilos criativos. Ferramenta gratuita para designers e
                            desenvolvedores.
                        </p>
                        <div className="flex space-x-3 pt-2">
                            <a
                                href="https://www.facebook.com/3wonline"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-violet-400 transition-colors duration-300"
                                aria-label="Facebook"
                            >
                                <FontAwesomeIcon icon={faFacebook} className="text-xl" />
                            </a>
                            <a
                                href="https://www.twitter.com/3wonline"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-violet-400 transition-colors duration-300"
                                aria-label="Twitter"
                            >
                                <FontAwesomeIcon icon={faTwitter} className="text-xl" />
                            </a>
                            <a
                                href="https://www.instagram.com/3wonline"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-violet-400 transition-colors duration-300"
                                aria-label="Instagram"
                            >
                                <FontAwesomeIcon icon={faInstagram} className="text-xl" />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/3wonline"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-violet-400 transition-colors duration-300"
                                aria-label="LinkedIn"
                            >
                                <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
                            </a>
                            <a
                                href="https://github.com/3wonline"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-violet-400 transition-colors duration-300"
                                aria-label="GitHub"
                            >
                                <FontAwesomeIcon icon={faGithub} className="text-xl" />
                            </a>
                        </div>
                    </div>

                    {/* Links Rápidos */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-violet-400 mb-4">
                            Links Rápidos
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/"
                                    className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-sm"
                                >
                                    Início
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/sobre"
                                    className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-sm"
                                >
                                    Sobre Nós
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/servicos"
                                    className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-sm"
                                >
                                    Serviços
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/ferramentas"
                                    className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-sm"
                                >
                                    Ferramentas
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contato"
                                    className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-sm"
                                >
                                    Contato
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-violet-400 mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/termos-de-uso"
                                    className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-sm"
                                >
                                    Termos de Uso
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/politica-de-privacidade"
                                    className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-sm"
                                >
                                    Política de Privacidade
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://www.3wonline.com.br"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-sm"
                                >
                                    3w Online
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contato */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-violet-400 mb-4">Contato</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3 text-gray-400 text-sm">
                                <FontAwesomeIcon icon={faEnvelope} className="mt-1 text-violet-400" />
                                <span>contato@3wonline.com.br</span>
                            </li>
                            <li className="flex items-start space-x-3 text-gray-400 text-sm">
                                <FontAwesomeIcon icon={faGlobe} className="mt-1 text-violet-400" />
                                <span>www.3wonline.com.br</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-10 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        &copy; {currentYear}{' '}
                        <a
                            href="https://www.3wonline.com.br"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-violet-400 hover:text-violet-300 transition-colors duration-300 font-semibold"
                        >
                            3w Online
                        </a>
                        . Todos os direitos reservados.
                    </p>
                    <p className="text-gray-500 text-xs mt-2 flex items-center justify-center space-x-1">
                        <span>Desenvolvido com</span>
                        <FontAwesomeIcon icon={faHeart} className="text-red-500 animate-pulse" />
                        <span>pela equipe 3w Online</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
