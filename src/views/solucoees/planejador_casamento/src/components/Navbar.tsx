import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { path: '/', label: 'Home', icon: 'fa-home' },
        { path: '/sobre', label: 'Sobre', icon: 'fa-info-circle' },
        { path: '/servicos', label: 'Serviços', icon: 'fa-briefcase' },
        { path: '/ferramentas', label: 'Ferramentas', icon: 'fa-tools' },
        { path: '/contato', label: 'Contato', icon: 'fa-envelope' }
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-purple-100 shadow-lg">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <i className="fas fa-heart text-white text-2xl"></i>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                Planejador de Casamento
                            </h1>
                            <p className="text-xs text-gray-500">Organize seu grande dia</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${isActive(link.path)
                                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                                        : 'text-gray-700 hover:bg-purple-50'
                                    }`}
                            >
                                <i className={`fas ${link.icon}`}></i>
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-purple-100">
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${isActive(link.path)
                                            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                                            : 'text-gray-700 hover:bg-purple-50'
                                        }`}
                                >
                                    <i className={`fas ${link.icon} w-5`}></i>
                                    <span>{link.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
