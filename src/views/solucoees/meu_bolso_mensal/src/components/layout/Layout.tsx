import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CookieBanner from "./CookieBanner";
import CTADeveloper from "../shared/CTADeveloper";

interface LayoutProps {
  children: ReactNode;
  showCTA?: boolean;
}

export default function Layout({ children, showCTA = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16 md:pt-18" role="main">
        {children}
        {showCTA && <CTADeveloper />}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}