import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faTimes,
    faHome,
    faInfoCircle,
    faCog,
    faTools,
    faEnvelope,
    faBrain
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { to: '/', label: 'Home', icon: faHome },
        { to: '/sobre', label: 'Sobre', icon: faInfoCircle },
        { to: '/servicos', label: 'Serviços', icon: faCog },
        { to: '/ferramentas', label: 'Ferramentas', icon: faTools },
        { to: '/contato', label: 'Contato', icon: faEnvelope },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="bg-white p-2 rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                            <FontAwesomeIcon icon={faBrain} className="text-violet-600 text-2xl" />
                        </div>
                        <span className="text-white font-bold text-xl hidden sm:block group-hover:text-violet-200 transition-colors">
                            Teste de Personalidade
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  flex items-center space-x-2 group
                  ${isActive(link.to)
                                        ? 'bg-white text-violet-600 shadow-md'
                                        : 'text-white hover:bg-white/20 hover:text-violet-100'
                                    }
                `}
                            >
                                <FontAwesomeIcon
                                    icon={link.icon}
                                    className={`text-sm ${isActive(link.to) ? 'text-violet-600' : 'group-hover:scale-110'} transition-transform`}
                                />
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Abrir menu principal</span>
                        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 bg-violet-700/95 backdrop-blur-sm">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsOpen(false)}
                            className={`
                block px-3 py-2 rounded-md text-base font-medium transition-all
                flex items-center space-x-3
                ${isActive(link.to)
                                    ? 'bg-white text-violet-600 shadow-md'
                                    : 'text-white hover:bg-white/20'
                                }
              `}
                        >
                            <FontAwesomeIcon icon={link.icon} className="text-lg" />
                            <span>{link.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
