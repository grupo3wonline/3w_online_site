import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookie, faTimes } from '@fortawesome/free-solid-svg-icons';

const CookieBanner = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setShowBanner(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setShowBanner(false);
    };

    const handleReject = () => {
        localStorage.setItem('cookieConsent', 'rejected');
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-2xl border-t-4 border-violet-500 animate-slide-up">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                    {/* Icon & Message */}
                    <div className="flex items-start space-x-4 flex-1">
                        <div className="flex-shrink-0">
                            <FontAwesomeIcon
                                icon={faCookie}
                                className="text-violet-400 text-3xl animate-bounce"
                            />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-bold text-lg mb-2">
                                🍪 Cookies e Privacidade
                            </h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Utilizamos cookies para melhorar sua experiência, personalizar
                                conteúdo e analisar nosso tráfego. Ao continuar navegando, você
                                concorda com nossa{' '}
                                <Link
                                    to="/politica-de-privacidade"
                                    className="text-violet-400 hover:text-violet-300 underline font-medium"
                                >
                                    Política de Privacidade
                                </Link>{' '}
                                e{' '}
                                <Link
                                    to="/termos-de-uso"
                                    className="text-violet-400 hover:text-violet-300 underline font-medium"
                                >
                                    Termos de Uso
                                </Link>
                                .
                            </p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center space-x-3 w-full md:w-auto">
                        <button
                            onClick={handleReject}
                            className="flex-1 md:flex-none px-6 py-2.5 text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300 hover:shadow-lg"
                        >
                            Rejeitar
                        </button>
                        <button
                            onClick={handleAccept}
                            className="flex-1 md:flex-none px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
                        >
                            Aceitar Cookies
                        </button>
                        <button
                            onClick={handleReject}
                            className="md:hidden text-gray-400 hover:text-white transition-colors duration-300"
                            aria-label="Fechar"
                        >
                            <FontAwesomeIcon icon={faTimes} className="text-xl" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieBanner;
