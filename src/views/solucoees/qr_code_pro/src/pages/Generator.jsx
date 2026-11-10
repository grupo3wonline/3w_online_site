import React from 'react';
import QRCodeGenerator from '../components/QRCodeGenerator';

const Generator = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 py-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      {/* Header */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 mb-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Gerador de QR Code
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Crie QR Codes personalizados de alta qualidade para suas necessidades. 
            Rápido, seguro e completamente gratuito.
          </p>
        </div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 w-full px-4">
        <QRCodeGenerator />
      </div>
    </div>
  );
};

export default Generator;