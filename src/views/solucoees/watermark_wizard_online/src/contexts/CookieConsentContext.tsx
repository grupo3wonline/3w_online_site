import React, { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

interface CookieConsentContextType {
    hasConsented: boolean;
    showBanner: boolean;
    acceptCookies: () => void;
    rejectCookies: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [hasConsented, setHasConsented] = useState(false);
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('watermark-wizard-cookie-consent');
        if (consent === 'accepted') {
            setHasConsented(true);
            setShowBanner(false);
        } else if (consent === 'rejected') {
            setHasConsented(false);
            setShowBanner(false);
        } else {
            setShowBanner(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('watermark-wizard-cookie-consent', 'accepted');
        setHasConsented(true);
        setShowBanner(false);

        Swal.fire({
            title: 'Preferências Salvas!',
            text: 'Obrigado por aceitar os cookies. Sua experiência será personalizada.',
            icon: 'success',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#0891b2',
            timer: 3000,
            timerProgressBar: true
        });
    };

    const rejectCookies = () => {
        localStorage.setItem('watermark-wizard-cookie-consent', 'rejected');
        setHasConsented(false);
        setShowBanner(false);

        Swal.fire({
            title: 'Preferências Salvas!',
            text: 'Você optou por não aceitar cookies. Algumas funcionalidades podem ser limitadas.',
            icon: 'info',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#0891b2',
            timer: 3000,
            timerProgressBar: true
        });
    };

    return (
        <CookieConsentContext.Provider value={{ hasConsented, showBanner, acceptCookies, rejectCookies }}>
            {children}
        </CookieConsentContext.Provider>
    );
};

export const useCookieConsent = () => {
    const context = useContext(CookieConsentContext);
    if (context === undefined) {
        throw new Error('useCookieConsent must be used within a CookieConsentProvider');
    }
    return context;
};
