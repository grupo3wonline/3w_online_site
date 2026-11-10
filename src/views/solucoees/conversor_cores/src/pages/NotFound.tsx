import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileQuestion, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-lg mx-auto">
          <div className="relative mb-8 inline-block">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <FileQuestion className="w-24 h-24 text-primary relative z-10" />
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-4 gradient-text">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Página não encontrada</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Opa! Parece que você se perdeu no espectro de cores.
            A página que você está procurando não existe ou foi removida.
          </p>

          <Button asChild size="lg" className="btn-primary hover-lift">
            <Link to="/">
              <Home className="w-5 h-5 mr-2" />
              Voltar para o Início
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
