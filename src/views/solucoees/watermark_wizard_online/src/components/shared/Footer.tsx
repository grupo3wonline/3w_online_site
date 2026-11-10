import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        ferramenta: [
            { label: 'Editor de Marca D\'Água', path: '/ferramenta' },
            { label: 'Como Usar', path: '/sobre' },
            { label: 'Recursos', path: '/servicos' },
        ],
        empresa: [
            { label: 'Sobre Nós', path: '/sobre' },
            { label: 'Serviços', path: '/servicos' },
            { label: 'Contato', path: '/contato' },
        ],
        legal: [
            { label: 'Termos de Uso', path: '/termos-de-uso' },
            { label: 'Política de Privacidade', path: '/politica-de-privacidade' },
        ],
    };

    return (
        <footer className="bg-card border-t border-border mt-auto">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-xl">W</span>
                            </div>
                            <span className="text-lg font-bold bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                                Watermark Wizard
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-4">
                            Ferramenta profissional e gratuita para adicionar marcas d'água personalizadas em suas imagens. Proteja suas criações de forma rápida e segura.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://www.facebook.com/grupo3wonline"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-cyan-500/10 hover:text-cyan-500 transition-all duration-200"
                                aria-label="Facebook"
                            >
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a
                                href="https://www.instagram.com/grupo3wonline"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-cyan-500/10 hover:text-cyan-500 transition-all duration-200"
                                aria-label="Instagram"
                            >
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a
                                href="https://www.linkedin.com/company/grupo3wonline"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-cyan-500/10 hover:text-cyan-500 transition-all duration-200"
                                aria-label="LinkedIn"
                            >
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a
                                href="https://www.youtube.com/@grupo3wonline"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-cyan-500/10 hover:text-cyan-500 transition-all duration-200"
                                aria-label="YouTube"
                            >
                                <i className="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>

                    {/* Ferramenta Links */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                            <i className="fas fa-wand-magic-sparkles text-cyan-500"></i>
                            Ferramenta
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.ferramenta.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-sm text-muted-foreground hover:text-cyan-500 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Empresa Links */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                            <i className="fas fa-building text-cyan-500"></i>
                            Empresa
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.empresa.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-sm text-muted-foreground hover:text-cyan-500 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                            <i className="fas fa-gavel text-cyan-500"></i>
                            Legal
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.legal.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-sm text-muted-foreground hover:text-cyan-500 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="border-t border-border bg-gradient-to-r from-cyan-500/5 to-cyan-600/5">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-center md:text-left">
                            <h4 className="font-semibold text-foreground mb-1">
                                Precisa de um site ou sistema personalizado?
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                O <strong>Grupo 3W Online</strong> desenvolve soluções digitais sob demanda.
                            </p>
                        </div>
                        <a
                            href="https://www.3wonline.com.br"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-medium rounded-xl hover:from-cyan-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                        >
                            <i className="fas fa-rocket"></i>
                            Conheça Nossos Serviços
                            <i className="fas fa-arrow-right text-xs"></i>
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-border">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <i className="fas fa-copyright text-xs"></i>
                            <span>{currentYear} Watermark Wizard. Todos os direitos reservados.</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span>Desenvolvido com</span>
                            <i className="fas fa-heart text-red-500 animate-pulse"></i>
                            <span>por</span>
                            <a
                                href="https://www.3wonline.com.br"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-cyan-500 hover:text-cyan-400 transition-colors"
                            >
                                hotwyl - willfrombrasil
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
