import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookie, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShow(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom">
      <Card className="max-w-4xl mx-auto p-4 md:p-6 shadow-strong border-2">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-shrink-0">
            <FontAwesomeIcon icon={faCookie} className="text-4xl text-accent" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">🍪 Cookies e Privacidade</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Utilizamos apenas cookies essenciais para melhorar sua experiência. 
              Nenhum dado pessoal é coletado ou compartilhado. Todo processamento ocorre localmente no seu navegador.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <Link to="/privacidade" className="text-primary hover:underline">
                Política de Privacidade
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/termos" className="text-primary hover:underline">
                Termos de Uso
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <Button
              onClick={handleAccept}
              variant="default"
              size="sm"
              className="w-full sm:w-auto"
            >
              Aceitar
            </Button>
            <Button
              onClick={handleReject}
              variant="outline"
              size="sm"
              className="w-full sm:w-auto"
            >
              <FontAwesomeIcon icon={faTimes} className="mr-2" />
              Recusar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
