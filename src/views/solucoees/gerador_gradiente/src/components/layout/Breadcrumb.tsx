import { Link } from 'react-router-dom';

interface BreadcrumbItem {
    label: string;
    path?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
    return (
        <nav aria-label="Breadcrumb" className="py-4">
            <ol className="flex items-center space-x-2 text-sm">
                <li>
                    <Link
                        to="/"
                        className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                        <i className="fas fa-home mr-2"></i>
                        Início
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        <i className="fas fa-chevron-right text-gray-400 text-xs mx-2"></i>
                        {item.path ? (
                            <Link
                                to={item.path}
                                className="text-gray-600 hover:text-indigo-600 transition-colors"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-indigo-600 font-medium">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
