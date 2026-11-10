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
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navigation = [
        { name: 'Início', href: '/', icon: faHome },
        { name: 'Sobre', href: '/sobre', icon: faInfoCircle },
        { name: 'Serviços', href: '/servicos', icon: faCog },
        { name: 'Ferramentas', href: '/ferramentas', icon: faTools },
        { name: 'Contato', href: '/contato', icon: faEnvelope },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center space-x-2 group transition-transform duration-300 hover:scale-105"
                    >
                        <div className="bg-white p-2 rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300">
                            <FontAwesomeIcon
                                icon={faTools}
                                className="text-violet-600 text-2xl"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-bold text-xl tracking-tight">
                                Lorem Ipsum+
                            </span>
                            <span className="text-violet-200 text-xs">
                                by 3w Online
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${isActive(item.href)
                                        ? 'bg-white text-violet-600 shadow-md'
                                        : 'text-white hover:bg-white/20 hover:shadow-md'
                                    }`}
                            >
                                <FontAwesomeIcon icon={item.icon} />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white hover:bg-white/20 p-2 rounded-lg transition-colors duration-300"
                        aria-label="Toggle menu"
                    >
                        <FontAwesomeIcon
                            icon={isOpen ? faTimes : faBars}
                            className="text-2xl"
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div
                className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
            >
                <div className="px-4 py-4 space-y-2 bg-violet-700/50 backdrop-blur-sm">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-3 ${isActive(item.href)
                                    ? 'bg-white text-violet-600 shadow-lg'
                                    : 'text-white hover:bg-white/20'
                                }`}
                        >
                            <FontAwesomeIcon icon={item.icon} className="w-5" />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
