import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  QrCode, 
  Zap, 
  Shield, 
  Download, 
  Smartphone, 
  Palette,
  CheckCircle,
  ArrowRight,
  Users,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Geração Instantânea",
      description: "Crie QR Codes em segundos com nossa tecnologia otimizada"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "100% Seguro",
      description: "Seus dados são processados localmente, sem envio para servidores"
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Download Gratuito",
      description: "Baixe seus QR Codes em alta qualidade sem custos"
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Responsivo",
      description: "Funciona perfeitamente em qualquer dispositivo"
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Personalizável",
      description: "Adicione logos, textos e ajuste a resolução"
    },
    {
      icon: <QrCode className="h-6 w-6" />,
      title: "Alta Qualidade",
      description: "QR Codes com correção de erro nível H para máxima durabilidade"
    }
  ];

  const benefits = [
    "Interface intuitiva e fácil de usar",
    "Suporte a URLs, textos e mensagens",
    "Personalização com logo e texto",
    "Resolução ajustável até 1000x1000px",
    "Cópia rápida para área de transferência",
    "Download em formato PNG"
  ];

  const stats = [
    { number: "10k+", label: "QR Codes Gerados" },
    { number: "99.9%", label: "Tempo de Atividade" },
    { number: "5★", label: "Avaliação Média" },
    { number: "0s", label: "Tempo de Carregamento" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10 py-20 lg:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              🚀 Gerador de QR Code Profissional
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold tracking-tight mb-8">
              <span className="bg-gradient-to-r from-primary via-primary-dark to-primary bg-clip-text text-transparent">
                Crie QR Codes
              </span>
              <br />
              <span className="text-foreground">Incríveis</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              A ferramenta mais avançada para gerar QR Codes personalizados. 
              Rápido, seguro e completamente gratuito.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild 
                size="lg"
                className="text-lg px-8 py-6 gradient-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105"
              >
                <Link to="/gerador">
                  <QrCode className="mr-2 h-5 w-5" />
                  Começar Agora
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6 border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
              >
                <Link to="/como-usar">
                  Como Usar
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
              Por que escolher nosso gerador?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Recursos avançados que fazem a diferença na criação dos seus QR Codes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-medium transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-lg text-primary group-hover:bg-primary/20 transition-colors">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
                Tudo que você precisa em uma ferramenta
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Nossa plataforma oferece todos os recursos necessários para criar 
                QR Codes profissionais de forma simples e eficiente.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl"></div>
              <Card className="relative bg-card/80 backdrop-blur-sm border-0 shadow-medium">
                <CardContent className="p-8">
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 mb-6">
                    <QrCode className="h-12 w-12 text-primary mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-4">
                    QR Code de Exemplo
                  </h3>
                  <p className="text-muted-foreground text-center">
                    Veja a qualidade dos nossos QR Codes em ação
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl p-12 shadow-soft">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              Pronto para criar seu primeiro QR Code?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de usuários que já confiam em nossa plataforma 
              para criar QR Codes de qualidade profissional.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg"
                className="text-lg px-8 py-6 gradient-primary hover:shadow-glow transition-all duration-300"
              >
                <Link to="/gerador">
                  <QrCode className="mr-2 h-5 w-5" />
                  Criar QR Code Grátis
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6"
              >
                <Link to="/dicas">
                  <Users className="mr-2 h-5 w-5" />
                  Ver Dicas
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;