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
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50 animate-slide-up">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1 text-sm">
                    <p>
                        <i className="fas fa-cookie-bite mr-2 text-yellow-400"></i>
                        Este site utiliza cookies para melhorar sua experiência e analisar o tráfego.
                        Ao continuar navegando, você concorda com nossa{' '}
                        <Link to="/privacidade" className="text-violet-400 hover:text-violet-300 underline">
                            Política de Privacidade
                        </Link>
                        {' '}e{' '}
                        <Link to="/termos" className="text-violet-400 hover:text-violet-300 underline">
                            Termos de Uso
                        </Link>.
                    </p>
                </div>
                <button
                    onClick={acceptCookies}
                    className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
                >
                    <i className="fas fa-check mr-2"></i>
                    Aceitar Cookies
                </button>
            </div>
        </div>
    );
};

export default CookieBanner;
