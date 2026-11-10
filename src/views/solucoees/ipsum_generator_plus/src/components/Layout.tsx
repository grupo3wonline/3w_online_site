import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';
import CookieBanner from './CookieBanner';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-violet-50">
            <Navbar />
            <Breadcrumb />
            <main className="flex-grow">{children}</main>
            <Footer />
            <CookieBanner />
        </div>
    );
};

export default Layout;
