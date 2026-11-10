import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Home,
    Info,
    Briefcase,
    Wrench,
    Mail,
    Menu,
    X,
    Sun,
    Moon,
    FileText
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const Header = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    };

    const navItems = [
        { to: '/', label: 'Início', icon: <Home className="h-4 w-4" /> },
        { to: '/sobre', label: 'Sobre', icon: <Info className="h-4 w-4" /> },
        { to: '/servicos', label: 'Serviços', icon: <Briefcase className="h-4 w-4" /> },
        { to: '/ferramentas', label: 'Ferramentas', icon: <Wrench className="h-4 w-4" /> },
        { to: '/contato', label: 'Contato', icon: <Mail className="h-4 w-4" /> },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header className="border-b bg-background/95 backdrop-blur-md sticky top-0 z-50 shadow-soft">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="bg-gradient-to-r from-primary to-purple-600 p-2.5 rounded-xl shadow-medium group-hover:shadow-strong transition-all duration-300">
                            <FileText className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                                Gerador de Faturas
                            </h1>
                            <p className="text-xs text-muted-foreground">Documentos Profissionais</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        {navItems.map((item) => (
                            <Tooltip key={item.to}>
                                <TooltipTrigger asChild>
                                    <Link
                                        to={item.to}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(item.to)
                                            ? 'bg-primary text-primary-foreground shadow-soft'
                                            : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                            }`}
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Ir para {item.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center space-x-2">
                        {/* Theme Toggle */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleTheme}
                                    className="rounded-full"
                                    aria-label={isDarkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
                                >
                                    {isDarkMode ? (
                                        <Sun className="h-5 w-5 text-yellow-500" />
                                    ) : (
                                        <Moon className="h-5 w-5 text-slate-600" />
                                    )}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{isDarkMode ? 'Modo Claro' : 'Modo Escuro'}</p>
                            </TooltipContent>
                        </Tooltip>

                        {/* CTA Button */}
                        <Link to="/app" className="hidden sm:block">
                            <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-soft">
                                <FileText className="mr-2 h-4 w-4" />
                                Criar Documento
                            </Button>
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Abrir menu"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="lg:hidden mt-4 pb-4 border-t pt-4 animate-in slide-in-from-top-2">
                        <div className="flex flex-col space-y-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(item.to)
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:bg-secondary'
                                        }`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                            <Link
                                to="/app"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-purple-600 text-primary-foreground font-medium mt-2"
                            >
                                <FileText className="h-4 w-4" />
                                <span>Criar Documento</span>
                            </Link>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;
