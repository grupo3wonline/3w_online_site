import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Menu, X, Sun, Moon, HelpCircle } from 'lucide-react';
import Swal from 'sweetalert2';

const basePath = import.meta.env.BASE_URL || '/watermark_wizard_online/';

export const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { path: '/', label: 'Início', icon: 'fa-house' },
        { path: '/ferramenta', label: 'Ferramenta', icon: 'fa-wand-magic-sparkles' },
        { path: '/sobre', label: 'Sobre', icon: 'fa-circle-info' },
        { path: '/servicos', label: 'Serviços', icon: 'fa-briefcase' },
        { path: '/contato', label: 'Contato', icon: 'fa-envelope' },
    ];

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === basePath || location.pathname === basePath.slice(0, -1);
        return location.pathname.includes(path);
    };

    const showHelp = () => {
        Swal.fire({
            title: '<i class="fas fa-question-circle text-cyan-500"></i> Ajuda',
            html: `
        <div class="text-left space-y-3">
          <p><strong>Watermark Wizard</strong> é uma ferramenta gratuita para adicionar marcas d'água em suas imagens.</p>
          <hr class="my-3 border-gray-200 dark:border-gray-700">
          <h4 class="font-semibold mb-2">Como usar:</h4>
          <ol class="list-decimal list-inside space-y-1 text-sm">
            <li>Acesse a <strong>Ferramenta</strong></li>
            <li>Faça upload das suas imagens</li>
            <li>Configure o texto ou logo da marca d'água</li>
            <li>Ajuste posição e opacidade</li>
            <li>Baixe suas imagens com marca d'água</li>
          </ol>
          <hr class="my-3 border-gray-200 dark:border-gray-700">
          <p class="text-sm text-gray-600">Precisa de mais ajuda? <a href="/watermark_wizard_online/contato" class="text-cyan-500 hover:underline">Entre em contato</a>.</p>
        </div>
      `,
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#0891b2',
            showCloseButton: true,
            customClass: {
                popup: theme === 'dark' ? 'swal-dark' : ''
            }
        });
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300 group-hover:scale-105">
                            <span className="text-white font-bold text-xl">W</span>
                        </div>
                        <div className="hidden sm:flex flex-col">
                            <span className="text-lg font-bold bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                                Watermark Wizard
                            </span>
                            <span className="text-xs text-muted-foreground -mt-1">Marca D'Água Profissional</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${isActive(link.path)
                                        ? 'bg-cyan-500/10 text-cyan-500'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                    }`}
                            >
                                <i className={`fas ${link.icon} text-xs`}></i>
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        {/* Help Button */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={showHelp}
                                    className="hidden sm:flex hover:bg-cyan-500/10 hover:text-cyan-500"
                                >
                                    <HelpCircle className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Ajuda</p>
                            </TooltipContent>
                        </Tooltip>

                        {/* Theme Toggle */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleTheme}
                                    className="hover:bg-cyan-500/10 hover:text-cyan-500"
                                >
                                    {theme === 'dark' ? (
                                        <Sun className="h-5 w-5 transition-all" />
                                    ) : (
                                        <Moon className="h-5 w-5 transition-all" />
                                    )}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}</p>
                            </TooltipContent>
                        </Tooltip>

                        {/* CTA Button */}
                        <Link to="/ferramenta" className="hidden md:block">
                            <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                                <i className="fas fa-wand-magic-sparkles mr-2"></i>
                                Usar Ferramenta
                            </Button>
                        </Link>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden"
                        >
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="lg:hidden py-4 border-t border-border/40 animate-in slide-in-from-top-2 duration-200">
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-3 ${isActive(link.path)
                                            ? 'bg-cyan-500/10 text-cyan-500'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                        }`}
                                >
                                    <i className={`fas ${link.icon}`}></i>
                                    {link.label}
                                </Link>
                            ))}
                            <div className="pt-3 mt-2 border-t border-border/40">
                                <Link to="/ferramenta" onClick={() => setIsMenuOpen(false)}>
                                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white">
                                        <i className="fas fa-wand-magic-sparkles mr-2"></i>
                                        Usar Ferramenta
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
};
