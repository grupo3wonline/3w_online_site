import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-background via-background to-cyan-500/5">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number */}
          <div className="relative mb-8">
            <div className="text-[150px] sm:text-[200px] font-bold text-muted/20 leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/20 animate-bounce">
                <i className="fas fa-question text-white text-5xl"></i>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Página Não{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
              Encontrada
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Ops! A página que você está procurando não existe ou foi movida.
            Que tal voltar para a página inicial?
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-lg hover:shadow-cyan-500/25">
                <i className="fas fa-house mr-2"></i>
                Voltar ao Início
              </Button>
            </Link>
            <Link to="/ferramenta">
              <Button size="lg" variant="outline" className="border-border hover:bg-muted">
                <i className="fas fa-wand-magic-sparkles mr-2"></i>
                Usar Ferramenta
              </Button>
            </Link>
          </div>

          {/* Help Text */}
          <p className="text-sm text-muted-foreground mt-12">
            Precisa de ajuda?{' '}
            <Link to="/contato" className="text-cyan-500 hover:underline">
              Entre em contato conosco
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
