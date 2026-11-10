import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';
import CookieBanner from './CookieBanner';

interface LayoutProps {
    children: ReactNode;
    showBreadcrumb?: boolean;
}

const Layout = ({ children, showBreadcrumb = true }: LayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            {/* Spacer para o navbar fixo */}
            <div className="h-20"></div>

            {showBreadcrumb && <Breadcrumb />}

            <main className="flex-1">
                {children}
            </main>

            <Footer />
            <CookieBanner />
        </div>
    );
};

export default Layout;
