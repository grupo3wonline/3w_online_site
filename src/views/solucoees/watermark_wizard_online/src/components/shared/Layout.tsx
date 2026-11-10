import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieBanner } from './CookieBanner';

interface LayoutProps {
    children: React.ReactNode;
    showHeader?: boolean;
    showFooter?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
    children,
    showHeader = true,
    showFooter = true
}) => {
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
            {showHeader && <Header />}
            <main className="flex-1">
                {children}
            </main>
            {showFooter && <Footer />}
            <CookieBanner />
        </div>
    );
};
