import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieBanner = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setShowBanner(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setShowBanner(false);

        // Ativar Google Analytics após consentimento
        if (window.gtag) {
            window.gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    };

    const rejectCookies = () => {
        localStorage.setItem('cookieConsent', 'rejected');
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-start space-x-3 flex-1">
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg flex-shrink-0">
                            <i className="fas fa-cookie-bite text-white text-xl"></i>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-900 mb-1">🍪 Política de Cookies</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Utilizamos cookies para melhorar sua experiência, analisar o tráfego do site e personalizar conteúdo.
                                Ao continuar navegando, você concorda com nossa{' '}
                                <Link to="/privacidade" className="text-indigo-600 hover:underline font-medium">
                                    Política de Privacidade
                                </Link>
                                {' '}e{' '}
                                <Link to="/termos" className="text-indigo-600 hover:underline font-medium">
                                    Termos de Uso
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={rejectCookies}
                            className="px-6 py-2.5 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-all duration-200"
                        >
                            Recusar
                        </button>
                        <button
                            onClick={acceptCookies}
                            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-200 hover:scale-105"
                        >
                            <i className="fas fa-check mr-2"></i>
                            Aceitar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieBanner;
