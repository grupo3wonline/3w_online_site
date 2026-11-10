import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Zap,
  Shield,
  Download,
  Globe,
  Smartphone,
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Receipt,
  Clock,
  Lock,
  Award,
  ExternalLink
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Templates Profissionais",
      description: "Mais de 10 modelos elegantes e personalizáveis para suas notas fiscais e recibos"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Criação Instantânea",
      description: "Gere suas faturas e recibos em segundos com nosso sistema intuitivo e rápido"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Multi-moedas",
      description: "Suporte completo para Real (R$), Dólar ($) e outras moedas principais"
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Download em PDF",
      description: "Baixe suas faturas e recibos em PDF de alta qualidade, prontos para impressão"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "100% Seguro",
      description: "Seus dados ficam salvos localmente no seu navegador - nunca enviamos para servidores"
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Totalmente Responsivo",
      description: "Use em qualquer dispositivo - desktop, tablet ou smartphone"
    }
  ];

  const benefits = [
    "Economize tempo criando faturas profissionais em segundos",
    "Melhore a imagem da sua empresa com documentos elegantes",
    "Organize melhor seu controle financeiro",
    "Acesso gratuito a todas as funcionalidades",
    "Interface simples e intuitiva em português",
    "Sem necessidade de cadastro ou login"
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Empreendedora",
      content: "Revolucionou minha forma de criar faturas! Super prático e profissional. Recomendo para todos os empreendedores.",
      rating: 5
    },
    {
      name: "João Santos",
      role: "Freelancer",
      content: "Perfeito para quem trabalha por conta própria. Templates lindos e funcionais. Uso todos os dias!",
      rating: 5
    },
    {
      name: "Ana Costa",
      role: "Consultora",
      content: "Praticidade incrível! Em minutos tenho minha fatura pronta e profissional. Meus clientes adoram.",
      rating: 5
    }
  ];

  const howToSteps = [
    {
      number: "1",
      title: "Preencha os Dados",
      description: "Insira as informações da sua empresa e do cliente"
    },
    {
      number: "2",
      title: "Adicione os Itens",
      description: "Inclua os produtos ou serviços com valores"
    },
    {
      number: "3",
      title: "Escolha o Template",
      description: "Selecione um dos nossos modelos profissionais"
    },
    {
      number: "4",
      title: "Baixe o PDF",
      description: "Faça download e envie para seu cliente"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-secondary/10">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm">
              <Sparkles className="mr-2 h-4 w-4" />
              100% Gratuito • Sem Cadastro • Ilimitado
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Crie Faturas e Recibos
              <br />
              <span className="text-3xl md:text-5xl">Profissionais em Segundos</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              O gerador de faturas e recibos mais moderno e intuitivo do Brasil.
              Templates elegantes, cálculos automáticos e download em PDF instantâneo.
              <strong className="text-foreground"> Usado por milhares de empreendedores.</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                onClick={() => navigate('/app')}
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-lg px-8 py-6 shadow-strong"
              >
                <FileText className="mr-2 h-5 w-5" />
                Criar Minha Primeira Fatura
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/receipt')}
                className="text-lg px-8 py-6"
              >
                <Receipt className="mr-2 h-5 w-5" />
                Gerar Recibo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center p-4 bg-background/50 rounded-xl shadow-soft">
                <div className="text-3xl font-bold text-primary mb-1">10+</div>
                <div className="text-sm text-muted-foreground">Templates</div>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-xl shadow-soft">
                <div className="text-3xl font-bold text-primary mb-1">10k+</div>
                <div className="text-sm text-muted-foreground">Documentos Gerados</div>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-xl shadow-soft">
                <div className="text-3xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Gratuito</div>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-xl shadow-soft">
                <div className="text-3xl font-bold text-primary mb-1">5★</div>
                <div className="text-sm text-muted-foreground">Avaliação</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-secondary/20">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Award className="mr-2 h-4 w-4" />
                Recursos Exclusivos
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Tudo que Você Precisa para Faturar
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Recursos poderosos pensados para simplificar sua vida financeira
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-medium hover:shadow-strong transition-all duration-300 bg-card/80 backdrop-blur-sm group">
                  <CardHeader>
                    <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 p-4 rounded-xl w-fit mb-4 group-hover:from-primary/20 group-hover:to-purple-600/20 transition-all">
                      {React.cloneElement(feature.icon, { className: "h-6 w-6 text-primary" })}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Simples como 1, 2, 3, 4
              </h2>
              <p className="text-xl text-muted-foreground">
                Crie sua fatura profissional em menos de 2 minutos
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {howToSteps.map((step, index) => (
                <div key={index} className="text-center relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-bold text-2xl flex items-center justify-center mx-auto mb-4 shadow-medium">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-primary/30 to-transparent" />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button
                size="lg"
                onClick={() => navigate('/app')}
                className="bg-gradient-to-r from-primary to-purple-600"
              >
                Começar Agora - É Grátis!
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-secondary/20">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Por que Escolher
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Por que Milhares de Empreendedores Confiam em Nós?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Desenvolvido especialmente para empreendedores brasileiros que precisam de agilidade,
                  profissionalismo e <strong>zero custo</strong>.
                </p>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-lg">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-purple-600/5 p-8 rounded-2xl">
                <div className="bg-background rounded-xl p-6 shadow-strong">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Fatura #2024-001</h3>
                    <Badge className="bg-green-500">Pago</Badge>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Consultoria em Marketing</span>
                      <span className="font-medium">R$ 1.500,00</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Design Gráfico</span>
                      <span className="font-medium">R$ 800,00</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">R$ 2.300,00</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Impostos (10%)</span>
                      <span className="font-medium">R$ 230,00</span>
                    </div>
                    <div className="flex justify-between pt-2 text-lg font-bold text-primary">
                      <span>Total</span>
                      <span>R$ 2.530,00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Users className="mr-2 h-4 w-4" />
                Depoimentos Reais
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                O que Nossos Usuários Dizem
              </h2>
              <p className="text-xl text-muted-foreground">
                Milhares de empreendedores já confiam no Gerador de Faturas
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-0 shadow-medium bg-background">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-12 text-center text-white shadow-strong">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pronto para Criar suas Faturas Profissionais?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Junte-se a milhares de empreendedores que já economizam tempo e impressionam seus clientes
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => navigate('/app')}
                  className="text-lg px-8 py-6"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Começar Gratuitamente Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <p className="mt-6 text-sm opacity-75 flex items-center justify-center gap-2">
                <Lock className="h-4 w-4" />
                Sem cadastro • Sem cartão de crédito • 100% gratuito para sempre
              </p>
            </div>
          </div>
        </section>

        {/* Developer CTA */}
        <section className="py-12 px-4 bg-secondary/20">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-background rounded-2xl shadow-medium">
              <div>
                <h3 className="text-2xl font-bold mb-2">Precisa de uma Solução Personalizada?</h3>
                <p className="text-muted-foreground">
                  O Grupo 3W Online desenvolve sites e sistemas sob demanda para seu negócio
                </p>
              </div>
              <a
                href="https://www.3wonline.com.br"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600">
                  Solicitar Orçamento
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;