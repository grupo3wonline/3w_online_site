import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieBanner from '../shared/CookieBanner';
import { ScrollToTop } from '@/utils/ScrollToTop';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-primary/30">
            <ScrollToTop />
            <Navbar />
            <main className="flex-grow pt-20">
                {children}
            </main>
            <Footer />
            <CookieBanner />
        </div>
    );
};

export default Layout;
