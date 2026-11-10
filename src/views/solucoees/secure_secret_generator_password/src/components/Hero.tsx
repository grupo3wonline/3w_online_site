import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Copy, Settings } from 'lucide-react';
import heroImage from '@/assets/hero-security.jpg';

interface HeroProps {
  onGenerateClick: () => void;
}

const Hero = ({ onGenerateClick }: HeroProps) => {
  return (
    <div className="relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background/80 to-accent/5"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="relative">
              <Shield className="h-16 w-16 text-primary animate-pulse" />
              <div className="absolute inset-0 h-16 w-16 bg-primary/20 rounded-full blur-xl"></div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Gere Senhas Fortes
            </span>
            <br />
            <span className="text-foreground">
              e Proteja Suas Contas
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Use nosso gerador de senhas seguras com múltiplas opções de personalização. 
            <br className="hidden sm:block" />
            <strong>Rápido, fácil e gratuito.</strong>
          </p>

          <div className="grid sm:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 rounded-full bg-primary/10 mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">🔐 Segurança Reforçada</h3>
              <p className="text-sm text-muted-foreground text-center">
                Algoritmos avançados para máxima proteção
              </p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 rounded-full bg-secondary/10 mb-4">
                <Settings className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">⚙️ Personalização Completa</h3>
              <p className="text-sm text-muted-foreground text-center">
                Configure tamanho, tipos e quantidade
              </p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 rounded-full bg-accent/10 mb-4">
                <Copy className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">📋 Copiar com um Clique</h3>
              <p className="text-sm text-muted-foreground text-center">
                Interface intuitiva e feedback visual
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={onGenerateClick}
              className="text-lg px-8 py-6 h-auto"
            >
              <Shield className="mr-2 h-5 w-5" />
              Gerar Senha Agora
            </Button>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              100% Gratuito • Sem registro
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;