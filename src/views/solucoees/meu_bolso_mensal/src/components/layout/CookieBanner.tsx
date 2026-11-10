import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Pequeno delay para animação suave
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setIsVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookie-consent", "rejected");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 safe-bottom animate-fade-in-up"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
    >
      <div className="container-app">
        <div className="bg-card border border-border rounded-2xl shadow-floating p-4 md:p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            {/* Icon */}
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <i className="fa-solid fa-cookie-bite text-primary text-xl"></i>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3
                id="cookie-banner-title"
                className="font-display font-semibold text-foreground mb-1"
              >
                Aviso de Cookies e Privacidade
              </h3>
              <p
                id="cookie-banner-description"
                className="text-sm text-muted-foreground"
              >
                Utilizamos cookies para melhorar sua experiência de navegação, 
                personalizar conteúdo e analisar nosso tráfego. Ao continuar navegando, 
                você concorda com nossa{" "}
                <Link
                  to="/politica-de-privacidade"
                  className="text-primary hover:underline font-medium"
                >
                  Política de Privacidade
                </Link>{" "}
                e{" "}
                <Link
                  to="/termos-de-uso"
                  className="text-primary hover:underline font-medium"
                >
                  Termos de Uso
                </Link>
                .
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
              <Button
                variant="outline"
                onClick={rejectCookies}
                className="text-sm"
              >
                <i className="fa-solid fa-times mr-2"></i>
                Recusar
              </Button>
              <Button
                onClick={acceptCookies}
                className="btn-gradient text-sm"
              >
                <i className="fa-solid fa-check mr-2"></i>
                Aceitar Cookies
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}