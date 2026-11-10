import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        product: [
            { label: 'Home', path: '/' },
            { label: 'Ferramentas', path: '/ferramentas' },
            { label: 'Sobre', path: '/sobre' }
        ],
        company: [
            { label: 'Serviços', path: '/servicos' },
            { label: 'Contato', path: '/contato' }
        ],
        legal: [
            { label: 'Termos de Uso', path: '/termos' },
            { label: 'Política de Privacidade', path: '/privacidade' }
        ]
    };

    const socialLinks = [
        { icon: 'fa-facebook', url: '#', label: 'Facebook' },
        { icon: 'fa-instagram', url: '#', label: 'Instagram' },
        { icon: 'fa-linkedin', url: '#', label: 'LinkedIn' },
        { icon: 'fa-twitter', url: '#', label: 'Twitter' }
    ];

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
            {/* Main Footer */}
            <div className="container mx-auto max-w-7xl px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                                <i className="fas fa-heart text-white text-2xl"></i>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Planejador de Casamento</h3>
                                <p className="text-xs text-gray-400">by 3w Online</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            A ferramenta completa e gratuita para planejar o casamento dos seus sonhos com organização e praticidade.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="w-10 h-10 bg-white/10 hover:bg-purple-500 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                                >
                                    <i className={`fab ${social.icon}`}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Produto</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-purple-400 transition-colors duration-200 flex items-center gap-2"
                                    >
                                        <i className="fas fa-chevron-right text-xs"></i>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Empresa</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-purple-400 transition-colors duration-200 flex items-center gap-2"
                                    >
                                        <i className="fas fa-chevron-right text-xs"></i>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-purple-400 transition-colors duration-200 flex items-center gap-2"
                                    >
                                        <i className="fas fa-chevron-right text-xs"></i>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container mx-auto max-w-7xl px-4 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-400 text-sm text-center md:text-left">
                            © {currentYear} Planejador de Casamento. Todos os direitos reservados.
                        </p>
                        <p className="text-gray-400 text-sm text-center md:text-right">
                            Desenvolvido por{' '}
                            <a
                                href="https://www.3wonline.com.br"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200"
                            >
                                Grupo 3w Online
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
