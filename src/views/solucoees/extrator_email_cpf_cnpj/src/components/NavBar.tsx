import { Link } from 'react-router-dom';
import { useState } from 'react';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 text-white hover:opacity-90 transition-opacity">
                        <i className="fas fa-cloud text-2xl"></i>
                        <span className="text-xl font-bold">Extrator</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-white hover:text-violet-200 transition-colors font-medium">
                            <i className="fas fa-home mr-2"></i>Home
                        </Link>
                        <Link to="/sobre" className="text-white hover:text-violet-200 transition-colors font-medium">
                            <i className="fas fa-info-circle mr-2"></i>Sobre
                        </Link>
                        <Link to="/servicos" className="text-white hover:text-violet-200 transition-colors font-medium">
                            <i className="fas fa-briefcase mr-2"></i>Serviços
                        </Link>
                        <Link to="/ferramentas" className="text-white hover:text-violet-200 transition-colors font-medium">
                            <i className="fas fa-tools mr-2"></i>Ferramentas
                        </Link>
                        <Link to="/contato" className="text-white hover:text-violet-200 transition-colors font-medium">
                            <i className="fas fa-envelope mr-2"></i>Contato
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-white focus:outline-none"
                        aria-label="Toggle Menu"
                    >
                        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4 animate-fade-in">
                        <Link to="/" onClick={toggleMenu} className="block py-2 text-white hover:text-violet-200 transition-colors">
                            <i className="fas fa-home mr-2"></i>Home
                        </Link>
                        <Link to="/sobre" onClick={toggleMenu} className="block py-2 text-white hover:text-violet-200 transition-colors">
                            <i className="fas fa-info-circle mr-2"></i>Sobre
                        </Link>
                        <Link to="/servicos" onClick={toggleMenu} className="block py-2 text-white hover:text-violet-200 transition-colors">
                            <i className="fas fa-briefcase mr-2"></i>Serviços
                        </Link>
                        <Link to="/ferramentas" onClick={toggleMenu} className="block py-2 text-white hover:text-violet-200 transition-colors">
                            <i className="fas fa-tools mr-2"></i>Ferramentas
                        </Link>
                        <Link to="/contato" onClick={toggleMenu} className="block py-2 text-white hover:text-violet-200 transition-colors">
                            <i className="fas fa-envelope mr-2"></i>Contato
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
