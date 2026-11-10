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
        <nav className="bg-gray-50 py-3 px-4 rounded-lg mb-6" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center space-x-2 text-sm">
                <li>
                    <Link to="/" className="text-violet-600 hover:text-violet-800 transition-colors">
                        <i className="fas fa-home mr-1"></i>
                        Home
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        <i className="fas fa-chevron-right text-gray-400 text-xs mx-2"></i>
                        {item.path && index < items.length - 1 ? (
                            <Link to={item.path} className="text-violet-600 hover:text-violet-800 transition-colors">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-gray-700 font-medium">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
