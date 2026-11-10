import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";
import { Link } from "react-router-dom";

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            // Delay display slightly for better UX
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 animate-in slide-in-from-bottom-10 fade-in duration-500">
            <div className="max-w-7xl mx-auto">
                <div className="bg-card/95 backdrop-blur-xl border border-primary/20 p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="bg-primary/10 p-3 rounded-full shrink-0">
                        <Cookie className="w-6 h-6 text-primary" />
                    </div>

                    <div className="flex-grow text-center md:text-left z-10">
                        <h3 className="text-lg font-semibold mb-2">Respeitamos sua privacidade</h3>
                        <p className="text-muted-foreground text-sm max-w-2xl">
                            Utilizamos cookies para melhorar sua experiência, analisar o tráfego e personalizar conteúdos.
                            Ao continuar navegando, você concorda com nossa{' '}
                            <Link to="/privacidade" className="text-primary hover:underline">Política de Privacidade</Link> e{' '}
                            <Link to="/termos" className="text-primary hover:underline">Termos de Uso</Link>.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 z-10">
                        <Button
                            variant="outline"
                            onClick={acceptCookies}
                            className="w-full sm:w-auto hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                        >
                            Recusar Opcionais
                        </Button>
                        <Button
                            onClick={acceptCookies}
                            className="w-full sm:w-auto btn-primary"
                        >
                            Aceitar Tudo
                        </Button>
                    </div>

                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-4 right-4 text-muted-foreground hover:text-foreground md:hidden"
                        aria-label="Fechar"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieBanner;
