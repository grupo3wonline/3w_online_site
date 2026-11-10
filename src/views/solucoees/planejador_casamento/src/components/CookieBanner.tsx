import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieBanner = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            // Show banner after a short delay for better UX
            const timer = setTimeout(() => {
                setShowBanner(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setShowBanner(false);

        // Initialize Google Analytics if accepted
        if (window.gtag) {
            window.gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    };

    const handleReject = () => {
        localStorage.setItem('cookieConsent', 'rejected');
        setShowBanner(false);

        // Deny Google Analytics if rejected
        if (window.gtag) {
            window.gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
            <div className="container mx-auto max-w-6xl">
                <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-200 p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        {/* Icon */}
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                                <i className="fas fa-cookie-bite text-white text-2xl"></i>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-3">
                            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <i className="fas fa-shield-alt text-purple-600"></i>
                                Aviso de Cookies e Privacidade
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Utilizamos cookies essenciais e tecnologias semelhantes de acordo com nossa{' '}
                                <Link to="/privacidade" className="text-purple-600 hover:text-purple-700 font-semibold underline">
                                    Política de Privacidade
                                </Link>
                                {' '}e os{' '}
                                <Link to="/termos" className="text-purple-600 hover:text-purple-700 font-semibold underline">
                                    Termos de Uso
                                </Link>
                                . Dados são coletados para melhorar sua experiência e garantir o funcionamento adequado da plataforma, em conformidade com a LGPD.
                            </p>

                            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                    <i className="fas fa-check-circle text-green-500"></i>
                                    Cookies Funcionais
                                </span>
                                <span className="flex items-center gap-1">
                                    <i className="fas fa-chart-line text-blue-500"></i>
                                    Analytics (GA4, GTM)
                                </span>
                                <span className="flex items-center gap-1">
                                    <i className="fas fa-shield-halved text-purple-500"></i>
                                    100% LGPD
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <button
                                onClick={handleAccept}
                                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
                            >
                                <i className="fas fa-check mr-2"></i>
                                Aceitar Tudo
                            </button>
                            <button case
                                onClick={handleReject}
                                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 whitespace-nowrap"
                            >
                                <i className="fas fa-times mr-2"></i>
                                Rejeitar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slide-up {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .animate-slide-up {
    animation: slide-up 0.5s ease-out;
  }
`;
document.head.appendChild(style);

export default CookieBanner;
