import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X, Check, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState({
        necessary: true, // Sempre ativado
        analytics: false,
        marketing: false,
    });

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            // Mostrar banner após pequeno delay para UX
            setTimeout(() => setIsVisible(true), 1000);
        }
    }, []);

    const acceptAll = () => {
        const consent = {
            necessary: true,
            analytics: true,
            marketing: true,
            timestamp: new Date().toISOString(),
        };
        localStorage.setItem('cookieConsent', JSON.stringify(consent));
        setIsVisible(false);

        // Ativar Google Analytics se aceito
        if (window.gtag) {
            window.gtag('consent', 'update', {
                'analytics_storage': 'granted',
                'ad_storage': 'granted',
            });
        }
    };

    const acceptNecessary = () => {
        const consent = {
            necessary: true,
            analytics: false,
            marketing: false,
            timestamp: new Date().toISOString(),
        };
        localStorage.setItem('cookieConsent', JSON.stringify(consent));
        setIsVisible(false);

        // Desativar Google Analytics
        if (window.gtag) {
            window.gtag('consent', 'update', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
            });
        }
    };

    const savePreferences = () => {
        const consent = {
            ...preferences,
            timestamp: new Date().toISOString(),
        };
        localStorage.setItem('cookieConsent', JSON.stringify(consent));
        setIsVisible(false);

        if (window.gtag) {
            window.gtag('consent', 'update', {
                'analytics_storage': preferences.analytics ? 'granted' : 'denied',
                'ad_storage': preferences.marketing ? 'granted' : 'denied',
            });
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 animate-in slide-in-from-bottom-4">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-background border shadow-strong rounded-2xl p-6">
                    {!showSettings ? (
                        <>
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <Cookie className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold mb-2">
                                        🍪 Nós valorizamos sua privacidade
                                    </h3>
                                    <p className="text-muted-foreground text-sm mb-4">
                                        Utilizamos cookies para melhorar sua experiência, analisar o tráfego do site e
                                        personalizar conteúdo. Ao clicar em "Aceitar todos", você concorda com o uso de
                                        cookies conforme nossa{' '}
                                        <Link to="/privacidade" className="text-primary hover:underline">
                                            Política de Privacidade
                                        </Link>.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <Button
                                            onClick={acceptAll}
                                            className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                                        >
                                            <Check className="mr-2 h-4 w-4" />
                                            Aceitar Todos
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={acceptNecessary}
                                        >
                                            Apenas Necessários
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            onClick={() => setShowSettings(true)}
                                        >
                                            <Settings className="mr-2 h-4 w-4" />
                                            Personalizar
                                        </Button>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={acceptNecessary}
                                    className="shrink-0"
                                    aria-label="Fechar"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Configurações de Cookies</h3>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setShowSettings(false)}
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                                    <div>
                                        <h4 className="font-medium">Cookies Necessários</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Essenciais para o funcionamento do site. Não podem ser desativados.
                                        </p>
                                    </div>
                                    <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                                        Sempre ativo
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                                    <div>
                                        <h4 className="font-medium">Cookies de Análise</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Nos ajudam a entender como você usa o site (Google Analytics).
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={preferences.analytics}
                                            onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                                    <div>
                                        <h4 className="font-medium">Cookies de Marketing</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Usados para personalizar anúncios e conteúdo.
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={preferences.marketing}
                                            onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3">
                                <Button variant="outline" onClick={() => setShowSettings(false)}>
                                    Voltar
                                </Button>
                                <Button
                                    onClick={savePreferences}
                                    className="bg-gradient-to-r from-primary to-purple-600"
                                >
                                    Salvar Preferências
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CookieBanner;
