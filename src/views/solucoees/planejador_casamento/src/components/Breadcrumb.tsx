import { Link } from 'react-router-dom';

interface BreadcrumbItem {
    label: string;
    path: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
    return (
        <nav className="bg-white/40 backdrop-blur-sm border-b border-purple-100 py-3 px-4">
            <div className="container mx-auto max-w-6xl">
                <ol className="flex items-center gap-2 text-sm">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                            {index > 0 && (
                                <i className="fas fa-chevron-right text-gray-400 text-xs"></i>
                            )}
                            {index === items.length - 1 ? (
                                <span className="text-purple-600 font-semibold">{item.label}</span>
                            ) : (
                                <Link
                                    to={item.path}
                                    className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </nav>
    );
};

export default Breadcrumb;
