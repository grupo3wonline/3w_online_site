import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Calculator, 
  MapPin, 
  DollarSign, 
  Users, 
  Star, 
  CheckCircle, 
  TrendingUp,
  Shield,
  Clock,
  Target,
  ArrowRight,
  Quote
} from 'lucide-react';
import weddingHero from '@/assets/wedding-hero.jpg';

interface BenefitCardProps {
  icon: any;
  title: string;
  description: string;
  delay: number;
}

const BenefitCard = ({ icon: Icon, title, description, delay }: BenefitCardProps) => (
  <Card 
    className="shadow-elegant border-border/50 hover:shadow-romantic transition-all duration-300 animate-fade-in group hover:scale-105"
    style={{ animationDelay: `${delay}ms` }}
  >
    <CardHeader className="text-center">
      <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="h-8 w-8 text-primary-foreground" />
      </div>
      <CardTitle className="text-xl text-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground text-center leading-relaxed">{description}</p>
    </CardContent>
  </Card>
);

interface TestimonialCardProps {
  name: string;
  wedding: string;
  testimonial: string;
  rating: number;
}

const TestimonialCard = ({ name, wedding, testimonial, rating }: TestimonialCardProps) => (
  <Card className="shadow-elegant border-border/50 h-full">
    <CardContent className="pt-6">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
        ))}
      </div>
      <Quote className="h-8 w-8 text-primary mb-4 opacity-50" />
      <p className="text-muted-foreground mb-4 italic">"{testimonial}"</p>
      <div className="border-t pt-4">
        <p className="font-semibold text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">{wedding}</p>
      </div>
    </CardContent>
  </Card>
);

interface FeatureStepProps {
  step: number;
  title: string;
  description: string;
}

const FeatureStep = ({ step, title, description }: FeatureStepProps) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
      <span className="text-primary-foreground font-bold">{step}</span>
    </div>
    <div>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

interface LandingPageProps {
  onStartCalculator: () => void;
}

export const LandingPage = ({ onStartCalculator }: LandingPageProps) => {
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  const benefits = [
    {
      icon: Calculator,
      title: "Cálculo Inteligente",
      description: "Nossa ferramenta considera número de convidados, localização e todos os itens essenciais para fornecer um orçamento preciso e realista."
    },
    {
      icon: DollarSign,
      title: "Economia Garantida",
      description: "Evite gastos desnecessários com nosso planejamento detalhado. Economize até 30% comparado a casamentos sem planejamento orçamentário."
    },
    {
      icon: Target,
      title: "Planejamento Personalizado",
      description: "Adapte o orçamento às suas necessidades específicas com categorias customizáveis e ajustes regionais automáticos."
    },
    {
      icon: Clock,
      title: "Resultado Instantâneo",
      description: "Obtenha seu orçamento completo em segundos, sem complicações. Compare diferentes cenários rapidamente."
    },
    {
      icon: Shield,
      title: "Dados Confiáveis",
      description: "Baseado em pesquisas de mercado atualizadas e dados reais de fornecedores em todo o Brasil."
    },
    {
      icon: TrendingUp,
      title: "Otimização Contínua",
      description: "Receba dicas personalizadas para maximizar seu investimento e criar o casamento dos seus sonhos dentro do orçamento."
    }
  ];

  const testimonials = [
    {
      name: "Ana & Carlos",
      wedding: "Casamento em São Paulo - 150 convidados",
      testimonial: "A calculadora nos ajudou a economizar R$ 15.000! Conseguimos planejar tudo dentro do nosso orçamento sem abrir mão dos nossos sonhos.",
      rating: 5
    },
    {
      name: "Marina & Diego",
      wedding: "Casamento na Praia - 80 convidados",
      testimonial: "Fantástico! A ferramenta mostrou exatamente onde poderíamos economizar. Nosso casamento ficou perfeito e dentro do orçamento.",
      rating: 5
    },
    {
      name: "Juliana & Roberto",
      wedding: "Casamento no Interior - 200 convidados",
      testimonial: "Super prático e preciso. Nos deu uma visão completa de todos os custos. Recomendo para todos os noivos!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-elegant py-20 lg:py-32">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={weddingHero} 
            alt="Casal planejando casamento" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40" />
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">
              <Heart className="h-4 w-4 mr-2" />
              Ferramenta #1 para Planejamento de Casamentos
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-romantic bg-clip-text text-transparent leading-tight">
              Planeje Seu Casamento dos Sonhos
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Calcule o orçamento perfeito para o seu grande dia com nossa ferramenta intuitiva e completa. 
              Economize tempo, dinheiro e estresse no planejamento do seu casamento.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 shadow-romantic hover:shadow-elegant transition-all duration-300"
                onClick={onStartCalculator}
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calcular Meu Orçamento
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Grátis e sem cadastro</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>+10.000 casais</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span>4.9/5 avaliação</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span>Economia média de 25%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Por que Escolher Nossa Calculadora?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Desenvolvida especialmente para casais brasileiros, nossa ferramenta oferece 
              precisão, praticidade e economia no planejamento do seu casamento.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={benefit.title}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                delay={index * 200}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Como Funciona?
              </h2>
              <p className="text-xl text-muted-foreground">
                Em apenas 3 passos simples, tenha seu orçamento completo em mãos
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <FeatureStep
                  step={1}
                  title="Informe os Dados Básicos"
                  description="Digite o número de convidados e escolha a localização do seu casamento. Nossa ferramenta se adapta automaticamente aos preços regionais."
                />
                
                <FeatureStep
                  step={2}
                  title="Cálculo Automático Inteligente"
                  description="Nossa IA calcula instantaneamente todos os custos principais: local, buffet, decoração, fotografia, música e transporte."
                />
                
                <FeatureStep
                  step={3}
                  title="Receba Seu Orçamento Detalhado"
                  description="Visualize o breakdown completo por categoria, percentual de cada item e dicas personalizadas para economizar."
                />
              </div>
              
              <div className="lg:pl-8">
                <Card className="shadow-romantic border-primary/20 bg-gradient-elegant">
                  <CardContent className="p-8">
                    <div className="text-center space-y-6">
                      <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                        <Heart className="h-10 w-10 text-primary-foreground animate-float" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        Resultado em Segundos
                      </h3>
                      <p className="text-muted-foreground">
                        Tenha acesso instantâneo ao seu orçamento personalizado e comece 
                        a planejar o casamento dos seus sonhos hoje mesmo!
                      </p>
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        onClick={onStartCalculator}
                      >
                        Começar Agora
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              O que Nossos Casais Dizem
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Mais de 10.000 casais já realizaram o casamento dos sonhos com nossa ajuda
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.name}-${index}`}
                {...testimonial}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground">
              Pronto para Começar?
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Junte-se a milhares de casais que já economizaram tempo e dinheiro 
              planejando seu casamento conosco. É grátis e leva apenas alguns minutos!
            </p>
            
            <div className="space-y-4">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg px-12 py-6 shadow-romantic hover:shadow-elegant transition-all duration-300 hover:scale-105"
                onClick={onStartCalculator}
              >
                <Calculator className="mr-2 h-6 w-6" />
                Calcular Meu Orçamento Agora
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
              
              <div className="flex items-center justify-center gap-6 text-primary-foreground/80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>100% Gratuito</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Sem Cadastro</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Resultado Instantâneo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};