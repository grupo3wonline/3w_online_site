import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
    const location = useLocation();

    const pathnames = location.pathname.split('/').filter((x) => x);

    // Remove 'color_craft' do breadcrumb path
    const filteredPathnames = pathnames.filter((name) => name !== 'color_craft');

    const getBreadcrumbName = (path: string) => {
        const names: { [key: string]: string } = {
            'sobre': 'Sobre',
            'servicos': 'Serviços',
            'ferramentas': 'Ferramentas',
            'contato': 'Contato',
            'termos': 'Termos de Uso',
            'privacidade': 'Política de Privacidade',
        };
        return names[path] || path.charAt(0).toUpperCase() + path.slice(1);
    };

    if (filteredPathnames.length === 0) {
        return null;
    }

    return (
        <nav className="bg-gradient-to-r from-violet-50 to-purple-50 border-b border-violet-100">
            <div className="container mx-auto px-4 py-4">
                <ol className="flex items-center space-x-2 text-sm">
                    <li>
                        <Link
                            to="/color_craft/"
                            className="flex items-center text-gray-600 hover:text-violet-600 transition-colors duration-300 group"
                        >
                            <i className="fas fa-home mr-2 group-hover:scale-110 transition-transform"></i>
                            <span className="font-medium">Home</span>
                        </Link>
                    </li>

                    {filteredPathnames.map((name, index) => {
                        const routeTo = `/color_craft/${filteredPathnames.slice(0, index + 1).join('/')}`;
                        const isLast = index === filteredPathnames.length - 1;

                        return (
                            <li key={name} className="flex items-center">
                                <i className="fas fa-chevron-right text-gray-400 text-xs mx-2"></i>
                                {isLast ? (
                                    <span className="text-violet-600 font-semibold flex items-center">
                                        <i className="fas fa-circle text-[4px] mr-2"></i>
                                        {getBreadcrumbName(name)}
                                    </span>
                                ) : (
                                    <Link
                                        to={routeTo}
                                        className="text-gray-600 hover:text-violet-600 transition-colors duration-300 font-medium"
                                    >
                                        {getBreadcrumbName(name)}
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
