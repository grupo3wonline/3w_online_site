import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-image.jpg';

const Landing = () => {
  const features = [
    {
      title: "Transformações Instantâneas",
      description: "Converta texto para maiúsculas, minúsculas, capitalize e muito mais com um clique.",
      icon: "⚡"
    },
    {
      title: "Filtros Inteligentes",
      description: "Ignore palavras menores que X caracteres e aplicar regras personalizadas.",
      icon: "🎯"
    },
    {
      title: "Interface Moderna",
      description: "Design responsivo com tema claro/escuro e experiência fluida.",
      icon: "✨"
    },
    {
      title: "Cópia Rápida",
      description: "Copie resultado com um clique e receba confirmação visual instantânea.",
      icon: "📋"
    }
  ];

  const transformExamples = [
    { from: "hello world", to: "HELLO WORLD", type: "MAIÚSCULAS" },
    { from: "HELLO WORLD", to: "hello world", type: "minúsculas" },
    { from: "hello world", to: "Hello World", type: "Capitalize" },
    { from: "hello world", to: "hElLo WoRlD", type: "Alternado" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">TC</span>
            </div>
            <span className="font-semibold text-xl text-foreground">TextCraft</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8 rounded-2xl overflow-hidden shadow-card">
            <img 
              src={heroImage} 
              alt="TextCraft Hero" 
              className="w-full h-64 object-cover"
            />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6 leading-tight">
            Transforme Textos
            <br />
            <span className="text-foreground">com Facilidade</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Ferramenta profissional para manipulação de texto com múltiplas opções de formatação, 
            filtros inteligentes e interface moderna.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg" 
              variant="gradient"
              className="px-8 py-6 text-lg font-medium"
            >
              <Link to="/ferramenta">Usar Ferramenta</Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-6 text-lg font-medium"
            >
              Ver Exemplos
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Recursos Principais
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card border-border/50 shadow-card hover:shadow-elegant transition-smooth">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-semibold text-lg mb-2 text-card-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Exemplos de Transformação
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {transformExamples.map((example, index) => (
              <Card key={index} className="bg-gradient-card border-border/50 shadow-card">
                <CardContent className="p-6">
                  <div className="text-center">
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                      {example.type}
                    </span>
                    <div className="space-y-2">
                      <div className="text-muted-foreground">
                        "{example.from}"
                      </div>
                      <div className="text-2xl">↓</div>
                      <div className="font-semibold text-foreground">
                        "{example.to}"
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para Começar?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experimente agora e transforme seus textos de forma profissional e eficiente.
          </p>
          <Button 
            asChild 
            size="lg" 
            variant="hero"
            className="px-8 py-6 text-lg font-medium"
          >
            <Link to="/ferramenta">Começar Agora</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">TC</span>
            </div>
            <span className="font-semibold text-foreground">TextCraft</span>
          </div>
          <p className="text-muted-foreground">
            Ferramenta profissional para manipulação de texto - Desenvolvido com ❤️
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;