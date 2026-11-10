import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Download } from 'lucide-react';
import { templates } from '../utils/templateRegistry';

const TemplatesPage = () => {
  const navigate = useNavigate();

  const handleTemplateSelect = (templateIndex) => {
    // Redirect to app page to create invoice with selected template
    navigate('/app', { state: { selectedTemplate: templateIndex + 1 } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar ao Início</span>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-primary to-purple-600 p-2 rounded-xl">
                  <FileText className="h-5 w-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  FaturaPro - Modelos de Notas Fiscais
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Escolha seu Modelo
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Selecione o modelo perfeito para suas notas fiscais. Todos os modelos são profissionais e totalmente personalizáveis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-medium hover:shadow-large transition-all duration-300 bg-card/50 backdrop-blur-sm cursor-pointer group"
              onClick={() => handleTemplateSelect(index)}
            >
              <CardHeader>
                <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 p-4 rounded-lg mb-4 group-hover:from-primary/20 group-hover:to-purple-600/20 transition-all duration-300">
                  <div className="w-full h-32 bg-gradient-to-br from-muted to-muted/50 rounded border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {template.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  Design profissional e elegante, perfeito para sua empresa.
                </CardDescription>
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTemplateSelect(index);
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Usar Este Modelo
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-8 text-primary-foreground">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Não Encontrou o Modelo Ideal?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Todos os modelos são totalmente personalizáveis. Você pode ajustar cores, fontes e layout conforme sua necessidade.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/app')}
              className="text-lg px-8 py-6"
            >
              Criar Nota Fiscal Personalizada
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;