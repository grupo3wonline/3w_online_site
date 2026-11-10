import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Mail, MapPin, ExternalLink, Heart } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-card/30 border-t border-border/50 pt-16 pb-8 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                                <Palette className="w-6 h-6 text-primary" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                                Conversor Cores
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Ferramenta profissional gratuita para conversão e manipulação de cores.
                            Desenvolvida para designers e desenvolvedores que buscam produtividade e precisão.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Links Rápidos</h3>
                        <ul className="space-y-2">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Ferramenta', path: '/ferramenta' },
                                { name: 'Sobre', path: '/sobre' },
                                { name: 'Serviços', path: '/servicos' },
                                { name: 'Contato', path: '/contato' },
                            ].map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary transition-all duration-300" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/termos" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                    Termos de Uso
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacidade" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                                    Política de Privacidade
                                </Link>
                            </li>
                        </ul>

                        <div className="pt-4">
                            <h4 className="text-sm font-semibold mb-2">Desenvolvido por</h4>
                            <a
                                href="https://www.3wonline.com.br"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium bg-primary/5 px-3 py-2 rounded-lg border border-primary/10 hover:border-primary/30"
                            >
                                Grupo 3W Online
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Contato</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-muted-foreground">
                                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <span><a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer">www.3wonline.com.br</a></span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-muted-foreground">
                                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <span><a href="mailto:contato@3wonline.com.br" target="_blank" rel="noopener noreferrer">contato@3wonline.com.br</a></span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border/50 pt-8 mt-8 text-center text-sm text-muted-foreground">
                    <p className="flex items-center justify-center gap-1 flex-wrap">
                        © {currentYear} Grupo 3W Online. Todos os direitos reservados.
                        <span className="hidden sm:inline mx-1">•</span>
                        Sistema desenvolvido pelo desenvolvedor
                        <a href="https://github.com/willfrombrasil" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1 font-medium">
                            hotwyl - willfrombrasil
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
