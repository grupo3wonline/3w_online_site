import React from 'react';
import { Link } from 'react-router-dom';
import {
    FileText,
    Mail,
    Phone,
    MapPin,
    ExternalLink,
    Heart
} from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { to: '/', label: 'Início' },
        { to: '/sobre', label: 'Sobre' },
        { to: '/servicos', label: 'Serviços' },
        { to: '/ferramentas', label: 'Ferramentas' },
        { to: '/contato', label: 'Contato' },
    ];

    const toolLinks = [
        { to: '/app', label: 'Gerador de Notas Fiscais' },
        { to: '/receipt', label: 'Gerador de Recibos' },
        { to: '/templates', label: 'Galeria de Templates' },
    ];

    const legalLinks = [
        { to: '/termos', label: 'Termos de Uso' },
        { to: '/privacidade', label: 'Política de Privacidade' },
    ];

    return (
        <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="bg-gradient-to-r from-primary to-purple-600 p-2.5 rounded-xl">
                                <FileText className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Gerador de Faturas</h3>
                                <p className="text-xs text-slate-400">by Grupo 3W Online</p>
                            </div>
                        </div>
                        <p className="text-slate-300 text-sm mb-4">
                            Crie notas fiscais e recibos profissionais em segundos.
                            Ferramenta 100% gratuita desenvolvida para empreendedores brasileiros.
                        </p>
                        <a
                            href="https://www.3wonline.com.br"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 text-primary hover:text-purple-400 transition-colors text-sm font-medium"
                        >
                            <span>Visite nosso site</span>
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-slate-300 hover:text-primary transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tools */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Ferramentas</h4>
                        <ul className="space-y-2">
                            {toolLinks.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-slate-300 hover:text-primary transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Legal */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contato</h4>
                        <div className="space-y-3 mb-6">
                            <a
                                href="https://www.3wonline.com.br"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 text-slate-300 hover:text-primary transition-colors text-sm"
                            >
                                <MapPin className="h-4 w-4" />
                                <span>Grupo 3W Online</span>
                            </a>
                            <Link
                                to="/contato"
                                className="flex items-center space-x-2 text-slate-300 hover:text-primary transition-colors text-sm"
                            >
                                <Mail className="h-4 w-4" />
                                <span>Fale Conosco</span>
                            </Link>
                        </div>

                        <h4 className="text-lg font-semibold mb-3">Legal</h4>
                        <ul className="space-y-2">
                            {legalLinks.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-slate-300 hover:text-primary transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* CTA Banner */}
            <div className="bg-gradient-to-r from-primary/20 to-purple-600/20 border-t border-slate-700">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-center md:text-left">
                            <h4 className="text-lg font-semibold">Precisa de um site ou sistema personalizado?</h4>
                            <p className="text-slate-300 text-sm">O Grupo 3W Online desenvolve soluções sob demanda para seu negócio.</p>
                        </div>
                        <a
                            href="https://www.3wonline.com.br"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-medium"
                        >
                            <span>Solicitar Orçamento</span>
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-700 bg-slate-900/50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
                        <p className="text-slate-400 text-sm">
                            © {currentYear} Calculadora Aluguel Fácil. Todos os direitos reservados.
                        </p>
                        <p className="text-slate-400 text-sm flex items-center gap-1">
                            Sistema desenvolvido com <Heart className="h-3 w-3 text-red-500 inline" /> por{' '}
                            <span className="text-primary font-medium">hotwyl - willfrombrasil</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
