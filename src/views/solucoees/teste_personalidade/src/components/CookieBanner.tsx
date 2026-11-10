import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookie, faTimes, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Mostra o banner após 1 segundo
            setTimeout(() => setIsVisible(true), 1000);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);

        // Aqui você pode inicializar scripts de analytics, etc.
        console.log('Cookies aceitos');
    };

    const rejectCookies = () => {
        localStorage.setItem('cookie-consent', 'rejected');
        setIsVisible(false);
        console.log('Cookies rejeitados');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t-4 border-violet-500 shadow-2xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        {/* Icon and Text */}
                        <div className="flex items-start space-x-4 flex-1">
                            <div className="bg-violet-500/20 p-3 rounded-lg flex-shrink-0">
                                <FontAwesomeIcon icon={faCookie} className="text-violet-400 text-2xl" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                    <FontAwesomeIcon icon={faShieldAlt} className="text-violet-400 text-sm" />
                                    <h3 className="text-white font-semibold text-lg">
                                        Privacidade e Cookies
                                    </h3>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    Usamos cookies para melhorar sua experiência, personalizar conteúdo e analisar nosso tráfego.
                                    Ao continuar navegando, você concorda com nossa{' '}
                                    <Link
                                        to="/privacidade"
                                        className="text-violet-400 hover:text-violet-300 underline font-medium transition-colors"
                                    >
                                        Política de Privacidade
                                    </Link>
                                    {' '}e{' '}
                                    <Link
                                        to="/termos"
                                        className="text-violet-400 hover:text-violet-300 underline font-medium transition-colors"
                                    >
                                        Termos de Uso
                                    </Link>
                                    .
                                </p>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <button
                                onClick={rejectCookies}
                                className="px-6 py-2.5 border-2 border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition-all duration-300 font-medium text-sm whitespace-nowrap"
                            >
                                Rejeitar
                            </button>
                            <button
                                onClick={acceptCookies}
                                className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
                            >
                                Aceitar Cookies
                            </button>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={rejectCookies}
                            className="absolute top-2 right-2 md:static text-gray-400 hover:text-white transition-colors p-2"
                            aria-label="Fechar"
                        >
                            <FontAwesomeIcon icon={faTimes} className="text-lg" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieBanner;
