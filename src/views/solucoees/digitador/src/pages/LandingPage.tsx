import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Keyboard, Users, Trophy, Clock, Target, BookOpen, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Lições Estruturadas",
      description: "Aprenda do básico ao avançado com lições organizadas por níveis de dificuldade."
    },
    {
      icon: Clock,
      title: "Testes de Velocidade",
      description: "Meça sua velocidade e precisão com testes personalizáveis de 1 a 5 minutos."
    },
    {
      icon: Target,
      title: "Exercícios Personalizados",
      description: "Pratique letras específicas e reforce pontos de dificuldade com exercícios adaptativos."
    },
    {
      icon: Trophy,
      title: "Sistema de Conquistas",
      description: "Acompanhe seu progresso e desbloqueie conquistas conforme evolui na digitação."
    }
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      age: "34 anos",
      text: "Consegui aumentar minha velocidade de 15 para 45 PPM em apenas 2 meses!",
      rating: 5
    },
    {
      name: "João Santos",
      age: "16 anos", 
      text: "As lições são divertidas e me ajudaram muito com trabalhos escolares.",
      rating: 5
    },
    {
      name: "Ana Costa",
      age: "67 anos",
      text: "Interface simples e clara. Finalmente aprendi a usar o computador direito!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm animate-float">
                <Keyboard className="h-16 w-16" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
              Aprenda a Digitar de Forma
              <span className="block text-transparent bg-gradient-to-r from-white to-blue-200 bg-clip-text">
                Divertida e Eficiente
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-slide-up">
              Plataforma completa de aprendizado de digitação para todas as idades. 
              Desenvolva velocidade, precisão e confiança no teclado.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link to="/lessons">
                <Button size="lg" className="btn-hero">
                  Começar Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/speed-test">
                <Button size="lg" variant="outline" className="btn-hero-outline">
                  Teste sua Velocidade
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 text-blue-100">
              <p className="text-sm mb-2">Mais de 10.000 usuários já melhoraram sua digitação</p>
              <div className="flex justify-center items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 font-semibold">4.8/5</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Por que escolher o TypingMaster?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Uma abordagem completa e adaptável para dominar a arte da digitação
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="feature-card border-0 text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-accent rounded-xl">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Age Groups Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Para Todas as Idades
            </h2>
            <p className="text-xl text-muted-foreground">
              Experiência personalizada para cada faixa etária
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="feature-card border-0">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">🧒</div>
                  <h3 className="text-2xl font-bold text-primary">Crianças</h3>
                  <p className="text-muted-foreground">6 a 12 anos</p>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                    Interface lúdica e colorida
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                    Jogos educativos
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                    Recompensas visuais
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                    Acompanhamento dos pais
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="feature-card border-0">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">👥</div>
                  <h3 className="text-2xl font-bold text-primary">Jovens e Adultos</h3>
                  <p className="text-muted-foreground">13 a 60 anos</p>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                    Foco em produtividade
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                    Métricas detalhadas
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                    Exercícios profissionais
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                    Competições online
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="feature-card border-0">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">👴</div>
                  <h3 className="text-2xl font-bold text-primary">Idosos</h3>
                  <p className="text-muted-foreground">60+ anos</p>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                    Interface simplificada
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                    Texto ampliado
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                    Feedback por voz
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                    Ritmo personalizado
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              O que nossos usuários dizem
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="feature-card border-0">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.age}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para Dominar a Digitação?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Junte-se a milhares de usuários que já transformaram sua relação com o teclado
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/lessons">
              <Button size="lg" variant="secondary" className="font-semibold">
                Começar Gratuitamente
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <p className="mt-6 text-blue-200 text-sm">
            Sem compromisso • Acesso completo • Resultados garantidos
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;