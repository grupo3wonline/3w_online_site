import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        empresa: [
            { name: 'Sobre Nós', path: '/sobre' },
            { name: 'Serviços', path: '/servicos' },
            { name: 'Contato', path: '/contato' },
        ],
        legal: [
            { name: 'Termos de Uso', path: '/termos' },
            { name: 'Política de Privacidade', path: '/privacidade' },
        ],
        ferramentas: [
            { name: 'Gerador de Gradiente', path: '/ferramenta' },
        ],
    };

    const socialLinks = [
        { icon: 'fab fa-facebook', url: 'https://facebook.com/3wonline', label: 'Facebook' },
        { icon: 'fab fa-instagram', url: 'https://instagram.com/3wonline', label: 'Instagram' },
        { icon: 'fab fa-linkedin', url: 'https://linkedin.com/company/3wonline', label: 'LinkedIn' },
        { icon: 'fab fa-youtube', url: 'https://youtube.com/3wonline', label: 'YouTube' },
    ];

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Sobre */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg">
                                <i className="fas fa-palette text-white text-2xl"></i>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Gerador de Gradiente</h3>
                                <p className="text-sm text-gray-400">by 3w Online</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Crie gradientes CSS perfeitos gratuitamente. Ferramenta profissional para designers e desenvolvedores.
                        </p>
                        <div className="flex space-x-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                                >
                                    <i className={`${social.icon} text-lg`}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Empresa */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 flex items-center">
                            <i className="fas fa-building mr-2 text-indigo-400"></i>
                            Empresa
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.empresa.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-200 block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Ferramentas */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 flex items-center">
                            <i className="fas fa-tools mr-2 text-purple-400"></i>
                            Ferramentas
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.ferramentas.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-200 block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 flex items-center">
                            <i className="fas fa-shield-alt mr-2 text-green-400"></i>
                            Legal
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.legal.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-200 block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm text-center md:text-left">
                            © {currentYear} <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 font-medium">3w Online</a>. Todos os direitos reservados.
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center">
                                <i className="fas fa-heart text-red-500 mx-1 animate-pulse"></i>
                                Feito com amor
                                <i className="fas fa-code text-indigo-400 mx-1"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
