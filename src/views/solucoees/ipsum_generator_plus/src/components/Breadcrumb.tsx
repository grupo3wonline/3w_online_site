import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const routeNames: Record<string, string> = {
        '': 'Início',
        sobre: 'Sobre',
        servicos: 'Serviços',
        ferramentas: 'Ferramentas',
        contato: 'Contato',
        'termos-de-uso': 'Termos de Uso',
        'politica-de-privacidade': 'Política de Privacidade',
    };

    if (pathnames.length === 0) return null;

    return (
        <nav
            className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200"
            aria-label="Breadcrumb"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <ol className="flex items-center space-x-2 text-sm">
                    <li>
                        <Link
                            to="/"
                            className="text-violet-600 hover:text-violet-800 transition-colors duration-300 flex items-center space-x-1 group"
                        >
                            <FontAwesomeIcon
                                icon={faHome}
                                className="group-hover:scale-110 transition-transform duration-300"
                            />
                            <span className="sr-only">Início</span>
                        </Link>
                    </li>
                    {pathnames.map((name, index) => {
                        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                        const isLast = index === pathnames.length - 1;
                        const displayName = routeNames[name] || name;

                        return (
                            <li key={name} className="flex items-center space-x-2">
                                <FontAwesomeIcon
                                    icon={faChevronRight}
                                    className="text-gray-400 text-xs"
                                />
                                {isLast ? (
                                    <span className="text-gray-700 font-medium">{displayName}</span>
                                ) : (
                                    <Link
                                        to={routeTo}
                                        className="text-violet-600 hover:text-violet-800 transition-colors duration-300 hover:underline"
                                    >
                                        {displayName}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </nav>
    );
};

export default Breadcrumb;
