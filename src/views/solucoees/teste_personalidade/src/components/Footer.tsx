import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faInstagram,
    faLinkedin,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {
    faEnvelope,
    faPhone,
    faMapMarkerAlt,
    faHeart,
    faBrain,
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
            {/* CTA Section */}
            <div className="bg-gradient-to-r from-violet-600 to-purple-600 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-3xl font-bold text-white mb-4">
                        Precisa de um Sistema Personalizado?
                    </h3>
                    <p className="text-violet-100 text-lg mb-6 max-w-2xl mx-auto">
                        A <strong>3w Online</strong> desenvolve sites e sistemas sob demanda com tecnologia de ponta.
                        Transforme sua ideia em realidade!
                    </p>
                    <a
                        href="https://www.3wonline.com.br"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-white text-violet-600 font-bold px-8 py-3 rounded-full hover:bg-violet-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Conheça Nossos Serviços →
                    </a>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="bg-violet-600 p-2 rounded-lg">
                                <FontAwesomeIcon icon={faBrain} className="text-white text-2xl" />
                            </div>
                            <h3 className="text-white font-bold text-xl">Teste de Personalidade</h3>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Plataforma profissional de testes de personalidade com resultados precisos e detalhados.
                            Autoconhecimento para transformar sua vida pessoal e profissional.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold text-lg mb-4">Links Rápidos</h4>
                        <ul className="space-y-2">
                            {[
                                { to: '/', label: 'Home' },
                                { to: '/sobre', label: 'Sobre' },
                                { to: '/servicos', label: 'Serviços' },
                                { to: '/ferramentas', label: 'Ferramentas' },
                                { to: '/contato', label: 'Contato' },
                            ].map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-sm flex items-center space-x-2 group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-violet-400 transition-all duration-300"></span>
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="text-white font-semibold text-lg mb-4">Legal</h4>
                        <ul className="space-y-2">
                            {[
                                { to: '/termos', label: 'Termos de Uso' },
                                { to: '/privacidade', label: 'Política de Privacidade' },
                            ].map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-sm flex items-center space-x-2 group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-violet-400 transition-all duration-300"></span>
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6">
                            <h4 className="text-white font-semibold text-lg mb-4">Redes Sociais</h4>
                            <div className="flex space-x-3">
                                {[
                                    { icon: faFacebook, link: 'https://facebook.com/3wonline', color: 'hover:text-blue-500' },
                                    { icon: faInstagram, link: 'https://instagram.com/3wonline', color: 'hover:text-pink-500' },
                                    { icon: faLinkedin, link: 'https://linkedin.com/company/3wonline', color: 'hover:text-blue-400' },
                                    { icon: faTwitter, link: 'https://twitter.com/3wonline', color: 'hover:text-blue-400' },
                                ].map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-110`}
                                    >
                                        <FontAwesomeIcon icon={social.icon} className="text-xl" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-semibold text-lg mb-4">Contato</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3 text-sm text-gray-400">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-violet-400 mt-1" />
                                <span>Brasil</span>
                            </li>
                            <li className="flex items-start space-x-3 text-sm text-gray-400">
                                <FontAwesomeIcon icon={faEnvelope} className="text-violet-400 mt-1" />
                                <a href="mailto:contato@3wonline.com.br" className="hover:text-violet-400 transition-colors">
                                    contato@3wonline.com.br
                                </a>
                            </li>
                            <li className="flex items-start space-x-3 text-sm text-gray-400">
                                <FontAwesomeIcon icon={faPhone} className="text-violet-400 mt-1" />
                                <span>Entre em contato</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm text-center md:text-left">
                            © {currentYear} <strong className="text-white">3w Online</strong>. Todos os direitos reservados.
                        </p>
                        <p className="text-gray-400 text-sm flex items-center space-x-2">
                            <span>Feito com</span>
                            <FontAwesomeIcon icon={faHeart} className="text-red-500 animate-pulse" />
                            <span>pela</span>
                            <a
                                href="https://www.3wonline.com.br"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
                            >
                                3w Online
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
