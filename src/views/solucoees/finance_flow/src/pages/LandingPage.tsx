import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  PiggyBank, 
  TrendingUp, 
  Shield, 
  Target, 
  Clock,
  CheckCircle,
  BarChart3,
  DollarSign,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-finance.jpg";

const LandingPage = () => {
  const benefits = [
    {
      icon: Calculator,
      title: "Múltiplos Métodos",
      description: "7 métodos diferentes de divisão orçamentária para encontrar o ideal para você"
    },
    {
      icon: PiggyBank,
      title: "Orçamento Familiar",
      description: "Organize as finanças da família com divisão específica para gastos domésticos"
    },
    {
      icon: TrendingUp,
      title: "Simulador de Investimentos",
      description: "Projete seus ganhos futuros com cálculos precisos de rendimento"
    },
    {
      icon: Shield,
      title: "Segurança Financeira",
      description: "Construa uma base sólida para sua estabilidade econômica"
    },
    {
      icon: Target,
      title: "Metas Realistas",
      description: "Defina objetivos alcançáveis baseados em sua renda atual"
    },
    {
      icon: Clock,
      title: "Resultados Instantâneos",
      description: "Veja imediatamente como dividir melhor seu dinheiro"
    }
  ];

  const methods = [
    { name: "Método Recomendado", desc: "Nossa sugestão personalizada" },
    { name: "50-30-20", desc: "Regra clássica de orçamento" },
    { name: "50-15-35", desc: "Foco em saúde financeira" },
    { name: "70-20-10", desc: "Para quem tem dívidas" },
    { name: "60-10-10-20", desc: "Investimentos balanceados" },
    { name: "Método 6 Categorias", desc: "Divisão detalhada" },
    { name: "Método Completo", desc: "Inclui doação e desenvolvimento" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-6 py-2 text-sm font-medium">
              <Zap className="w-4 h-4 mr-2" />
              Transforme suas Finanças Agora
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent leading-tight">
              Controle Total das suas{" "}
              <span className="block">Finanças Pessoais</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Descubra como organizar seu orçamento com métodos comprovados, 
              simule investimentos e construa um futuro financeiro próspero.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/simulator">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  <Calculator className="w-5 h-5 mr-2" />
                  Começar Simulação Gratuita
                </Button>
              </Link>
              <Link to="/investments">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Ver Calculadora de Investimentos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que escolher o FinanceFlow?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nossa plataforma oferece ferramentas profissionais para você tomar 
              controle completo das suas finanças pessoais.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methods Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              7 Métodos de Organização Financeira
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Escolha entre diferentes estratégias comprovadas de divisão orçamentária 
              e encontre a que melhor se adapta ao seu perfil.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {methods.map((method, index) => (
              <Card key={index} className="bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 group">
                <CardHeader className="text-center">
                  <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <span className="font-bold text-accent-foreground">
                      {index + 1}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{method.name}</CardTitle>
                  <CardDescription>{method.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Funcionalidades Completas
              </h2>
              <p className="text-xl text-muted-foreground">
                Tudo que você precisa para organizar suas finanças em um só lugar.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Orçamento Familiar Especializado</h3>
                    <p className="text-muted-foreground">
                      Divisão específica para gastos familiares: alimentação, contas, transporte e poupança.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Planejamento de Aposentadoria</h3>
                    <p className="text-muted-foreground">
                      Calcule quanto reservar mensalmente para garantir sua aposentadoria.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Reserva de Emergência</h3>
                    <p className="text-muted-foreground">
                      Defina o valor ideal para sua reserva de emergência baseada na sua renda.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Simulador de Investimentos</h3>
                    <p className="text-muted-foreground">
                      Projete seus ganhos com diferentes valores de aporte e tempo de investimento.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Interface Responsiva</h3>
                    <p className="text-muted-foreground">
                      Acesse de qualquer dispositivo com design otimizado para mobile e desktop.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Totalmente Gratuito</h3>
                    <p className="text-muted-foreground">
                      Todas as funcionalidades disponíveis sem custo, sem cadastro obrigatório.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Comece a Transformar suas Finanças Hoje
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Não deixe para amanhã o que pode começar hoje. 
            Organize seu orçamento em poucos minutos e veja a diferença.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/simulator">
              <Button variant="outline" size="xl" className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <BarChart3 className="w-5 h-5 mr-2" />
                Acessar Simulador
              </Button>
            </Link>
            <Link to="/investments">
              <Button variant="ghost" size="xl" className="w-full sm:w-auto text-primary-foreground hover:bg-primary-foreground/10">
                <DollarSign className="w-5 h-5 mr-2" />
                Calcular Investimentos
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;