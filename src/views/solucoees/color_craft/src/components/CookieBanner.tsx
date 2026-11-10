import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieBanner = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            // Mostrar banner após 1 segundo
            setTimeout(() => setShowBanner(true), 1000);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setShowBanner(false);

        // Aqui você pode adicionar lógica para ativar cookies de analytics, etc.
        console.log('Cookies aceitos');
    };

    const handleReject = () => {
        localStorage.setItem('cookieConsent', 'rejected');
        setShowBanner(false);

        // Aqui você pode adicionar lógica para desativar cookies não essenciais
        console.log('Cookies rejeitados');
    };

    if (!showBanner) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-5 duration-500">
            <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 text-white shadow-2xl border-t-4 border-violet-500">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-start space-x-4 flex-1">
                            <div className="flex-shrink-0 w-12 h-12 bg-violet-500/20 rounded-lg flex items-center justify-center">
                                <i className="fas fa-cookie-bite text-2xl text-violet-300"></i>
                            </div>

                            <div className="flex-1">
                                <h3 className="text-lg font-bold mb-2 flex items-center">
                                    <i className="fas fa-shield-alt text-green-400 mr-2"></i>
                                    Sua Privacidade é Importante
                                </h3>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    Utilizamos cookies essenciais e analíticos para melhorar sua experiência e analisar o uso do site.
                                    Ao continuar navegando, você concorda com nossa{' '}
                                    <Link
                                        to="/color_craft/privacidade"
                                        className="text-violet-300 hover:text-violet-200 underline font-semibold"
                                    >
                                        Política de Privacidade
                                    </Link>
                                    {' '}e nossos{' '}
                                    <Link
                                        to="/color_craft/termos"
                                        className="text-violet-300 hover:text-violet-200 underline font-semibold"
                                    >
                                        Termos de Uso
                                    </Link>
                                    . Conforme a LGPD, você pode gerenciar suas preferências a qualquer momento.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                            <button
                                onClick={handleReject}
                                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105"
                                aria-label="Rejeitar cookies"
                            >
                                <i className="fas fa-times-circle"></i>
                                <span>Apenas Essenciais</span>
                            </button>

                            <button
                                onClick={handleAccept}
                                className="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105"
                                aria-label="Aceitar cookies"
                            >
                                <i className="fas fa-check-circle"></i>
                                <span>Aceitar Todos</span>
                            </button>
                        </div>
                    </div>

                    {/* Informações Adicionais */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-400">
                            <div className="flex items-center space-x-2">
                                <i className="fas fa-lock text-green-400"></i>
                                <span>Dados Criptografados</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <i className="fas fa-shield-alt text-blue-400"></i>
                                <span>Conforme LGPD</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <i className="fas fa-user-shield text-purple-400"></i>
                                <span>Privacidade Garantida</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieBanner;
