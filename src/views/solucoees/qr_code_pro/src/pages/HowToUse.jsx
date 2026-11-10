import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  ArrowRight, 
  Type, 
  Download, 
  Settings, 
  CheckCircle,
  PlayCircle,
  Smartphone,
  QrCode
} from "lucide-react";
import { Link } from "react-router-dom";

const HowToUse = () => {
  const steps = [
    {
      number: "01",
      icon: <Type className="h-6 w-6" />,
      title: "Digite seu Conteúdo",
      description: "Insira a URL, texto ou mensagem que deseja converter em QR Code",
      details: [
        "URLs de sites, redes sociais ou lojas online",
        "Textos informativos ou mensagens",
        "Dados de contato ou informações pessoais",
        "Links para downloads ou documentos"
      ]
    },
    {
      number: "02",
      icon: <Settings className="h-6 w-6" />,
      title: "Personalize (Opcional)",
      description: "Configure opções avançadas como resolução, logo e texto adicional",
      details: [
        "Ajuste a resolução para suas necessidades",
        "Adicione sua logo no centro do QR Code",
        "Inclua texto descritivo abaixo do código",
        "Todas as opções são completamente opcionais"
      ]
    },
    {
      number: "03",
      icon: <QrCode className="h-6 w-6" />,
      title: "Gere o QR Code",
      description: "Clique em 'Gerar QR Code' e aguarde a criação instantânea",
      details: [
        "Processo rápido e automático",
        "Visualização em tempo real",
        "Qualidade profissional garantida",
        "Pronto para usar imediatamente"
      ]
    },
    {
      number: "04",
      icon: <Download className="h-6 w-6" />,
      title: "Baixe ou Copie",
      description: "Faça download em PNG ou copie diretamente para a área de transferência",
      details: [
        "Download em alta resolução",
        "Formato PNG universalmente compatível",
        "Cópia rápida para área de transferência",
        "Pronto para impressão ou uso digital"
      ]
    }
  ];

  const useCases = [
    {
      icon: <Smartphone className="h-5 w-5" />,
      title: "Marketing Digital",
      description: "Links para redes sociais, sites ou campanhas promocionais"
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Educação",
      description: "Material didático, links para recursos ou informações de contato"
    },
    {
      icon: <PlayCircle className="h-5 w-5" />,
      title: "Eventos",
      description: "Ingressos digitais, informações do evento ou links de check-in"
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: "Negócios",
      description: "Cartões de visita digitais, menus ou informações de produtos"
    }
  ];

  const faqs = [
    {
      question: "Os QR Codes gerados expiram?",
      answer: "Não! Nossos QR Codes são permanentes. Eles contêm diretamente as informações que você inseriu, não dependem de nossos servidores."
    },
    {
      question: "Qual o tamanho ideal para impressão?",
      answer: "Recomendamos no mínimo 2x2cm para impressão. Use resolução de 300 DPI ou superior para melhor qualidade."
    },
    {
      question: "Posso usar logos personalizadas?",
      answer: "Sim! Você pode adicionar sua logo no centro do QR Code. Certifique-se de que a URL da imagem seja pública e acessível."
    },
    {
      question: "Como garantir que o QR Code funciona?",
      answer: "Sempre teste o código após gerar usando diferentes dispositivos e apps de leitura antes de imprimir ou publicar."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-playfair font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Como Usar
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Aprenda a criar QR Codes profissionais em 4 passos simples. 
            É rápido, fácil e não requer conhecimento técnico.
          </p>
        </div>

        {/* Steps */}
        <div className="mb-16">
          <h2 className="text-2xl font-playfair font-bold text-center mb-8">
            Passo a Passo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="group hover:shadow-medium transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm relative">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 p-4 rounded-full group-hover:bg-primary/20 transition-colors">
                      {step.icon}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-lg font-bold text-primary border-primary/30 mb-2">
                    {step.number}
                  </Badge>
                  <CardTitle className="text-lg font-semibold">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-center mb-4">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Try It Now CTA */}
        <div className="text-center mb-16">
          <Card className="max-w-2xl mx-auto border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-playfair font-bold mb-4 text-primary">
                Pronto para começar?
              </h3>
              <p className="text-foreground mb-6">
                Experimente agora nossa ferramenta e crie seu primeiro QR Code em segundos!
              </p>
              <Button asChild size="lg" className="gradient-primary hover:shadow-glow transition-all duration-300">
                <Link to="/gerador">
                  <QrCode className="mr-2 h-5 w-5" />
                  Criar Meu QR Code
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Use Cases */}
        <div className="mb-16">
          <h2 className="text-2xl font-playfair font-bold text-center mb-8">
            Casos de Uso Populares
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="group hover:shadow-medium transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 p-3 rounded-lg inline-block mb-4 group-hover:bg-primary/20 transition-colors">
                    {useCase.icon}
                  </div>
                  <h3 className="font-semibold mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {useCase.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-playfair font-bold text-center mb-8">
            Perguntas Frequentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Ainda tem dúvidas? Experimente nossa ferramenta!
          </p>
          <Button asChild variant="outline" size="lg">
            <Link to="/dicas">
              Ver Mais Dicas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;