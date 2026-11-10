import React, { useState, useRef } from 'react';
import Hero from '@/components/Hero';
import PasswordGenerator from '@/components/PasswordGenerator';

const Index = () => {
  const [showGenerator, setShowGenerator] = useState(false);
  const generatorRef = useRef<HTMLDivElement>(null);

  const handleGenerateClick = () => {
    setShowGenerator(true);
    setTimeout(() => {
      generatorRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero onGenerateClick={handleGenerateClick} />
      
      {showGenerator && (
        <div ref={generatorRef} className="py-16 bg-muted/30">
          <PasswordGenerator />
        </div>
      )}
      
      <footer className="border-t bg-card py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2025 Gerador de Senhas Seguras. Sua privacidade é nossa prioridade.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Todas as senhas são geradas localmente no seu navegador. Nenhuma informação é enviada para nossos servidores.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
