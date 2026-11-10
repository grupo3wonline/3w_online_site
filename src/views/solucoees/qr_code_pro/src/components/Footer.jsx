import React from 'react';
import { QrCode, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <QrCode className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-playfair font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                QR Code Pro
              </span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              A ferramenta mais avançada e fácil de usar para gerar QR Codes personalizados. 
              Grátis, rápido e com qualidade profissional.
            </p>
          </div>

          {/* Links Úteis */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/gerador" className="text-muted-foreground hover:text-primary transition-colors">
                  Gerador
                </Link>
              </li>
              <li>
                <Link to="/dicas" className="text-muted-foreground hover:text-primary transition-colors">
                  Dicas
                </Link>
              </li>
              <li>
                <Link to="/como-usar" className="text-muted-foreground hover:text-primary transition-colors">
                  Como Usar
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Recursos</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• QR Codes em alta resolução</li>
              <li>• Personalização avançada</li>
              <li>• Download PNG grátis</li>
              <li>• Interface responsiva</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} QR Code Pro. Todos os direitos reservados.
          </p>
          <p className="text-muted-foreground text-sm mt-2 md:mt-0 flex items-center">
            Feito com <Heart className="h-4 w-4 text-red-500 mx-1" /> usando Lovable
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;