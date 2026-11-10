import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Clock, 
  Target,
  CheckCircle,
  ArrowRight
} from "lucide-react";

interface LandingPageProps {
  onNavigateToCalculator: (calculatorType: string) => void;
}

const calculatorModules = [
  {
    id: "rendimentos",
    title: "Calculadora de Rendimentos",
    description: "Calcule seus ganhos por hora, dia, semana, mês e projeções anuais",
    icon: DollarSign,
    benefits: ["Projeção de ganhos", "Planejamento financeiro", "Análise temporal"]
  },
  {
    id: "ferias",
    title: "Calculadora de Férias",
    description: "Simule o valor das suas férias e planeje seu descanso",
    icon: Clock,
    benefits: ["Valor das férias", "1/3 constitucional", "Planejamento"]
  },
  {
    id: "decimo-terceiro",
    title: "Calculadora de 13º Salário",
    description: "Calcule o valor do seu décimo terceiro salário",
    icon: Target,
    benefits: ["Valor proporcional", "Planejamento anual", "Projeções"]
  },
  {
    id: "rescisao",
    title: "Calculadora de Rescisão",
    description: "Simule os valores de rescisão trabalhista",
    icon: Shield,
    benefits: ["Direitos trabalhistas", "Valores de rescisão", "Orientação legal"]
  },
  {
    id: "seguro-desemprego",
    title: "Seguro Desemprego",
    description: "Calcule os valores e parcelas do seguro desemprego",
    icon: Shield,
    benefits: ["Parcelas disponíveis", "Valores mensais", "Período de cobertura"]
  },
  {
    id: "aposentadoria",
    title: "Calculadora de Aposentadoria",
    description: "Simule sua aposentadoria por tempo ou idade",
    icon: Clock,
    benefits: ["Tempo de contribuição", "Valor estimado", "Planejamento futuro"]
  },
  {
    id: "fgts",
    title: "Calculadora de FGTS",
    description: "Calcule FGTS, insalubridade, periculosidade e adicionais",
    icon: Calculator,
    benefits: ["FGTS mensal", "Adicionais legais", "Horas extras"]
  },
  {
    id: "imposto-renda",
    title: "Imposto de Renda",
    description: "Simule o desconto do imposto de renda no seu salário",
    icon: DollarSign,
    benefits: ["Desconto IR", "Faixas de tributação", "Planejamento fiscal"]
  },
  {
    id: "investimentos",
    title: "Simulador de Investimentos",
    description: "Projete seus investimentos com juros compostos",
    icon: TrendingUp,
    benefits: ["Juros compostos", "Aportes mensais", "Projeção de lucros"]
  },
  {
    id: "salario",
    title: "Cálculo de Salário",
    description: "Calcule salário com adicionais e descontos",
    icon: DollarSign,
    benefits: ["Insalubridade", "Periculosidade", "Horas extras"]
  },
  {
    id: "plr",
    title: "PLR",
    description: "Participação nos Lucros e Resultados",
    icon: Calculator,
    benefits: ["PLR anual", "Descontos IR", "Proporcionalidade"]
  },
  {
    id: "beneficios",
    title: "Benefícios",
    description: "Vale transporte, alimentação e outros",
    icon: Clock,
    benefits: ["Vale transporte", "Plano saúde", "Auxílios"]
  }
];

const mainBenefits = [
  {
    icon: Calculator,
    title: "Cálculos Precisos",
    description: "Simulações baseadas na legislação trabalhista brasileira atual"
  },
  {
    icon: TrendingUp,
    title: "Planejamento Financeiro",
    description: "Organize suas finanças e projete seu futuro financeiro"
  },
  {
    icon: Shield,
    title: "Segurança e Confiabilidade",
    description: "Dados processados localmente, sem armazenamento externo"
  },
  {
    icon: Clock,
    title: "Economia de Tempo",
    description: "Resultados instantâneos para todos os seus cálculos financeiros"
  }
];

export default function LandingPage({ onNavigateToCalculator }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Simulador Financeiro
              <span className="text-primary block mt-2">Completo</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              A ferramenta mais completa para simular seus cálculos trabalhistas, 
              financeiros e de investimentos. Planeje seu futuro com precisão.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:shadow-elevated transition-all duration-200"
                onClick={() => onNavigateToCalculator('rendimentos')}
              >
                <Calculator className="mr-2 h-5 w-5" />
                Começar Agora
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('beneficios')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Saiba Mais
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-20 px-4 bg-gradient-subtle">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Por que escolher nosso simulador?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Desenvolvido especificamente para o mercado brasileiro, 
              com todas as particularidades da legislação trabalhista.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {mainBenefits.map((benefit, index) => (
              <Card key={index} className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-200 animate-scale-in">
                <CardContent className="p-6 text-center">
                  <benefit.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Calculadoras Disponíveis
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Escolha a calculadora que atende suas necessidades específicas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculatorModules.map((calculator, index) => (
              <Card 
                key={calculator.id} 
                className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-200 animate-scale-in cursor-pointer group"
                onClick={() => onNavigateToCalculator(calculator.id)}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <calculator.icon className="h-8 w-8 text-primary" />
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {calculator.title}
                    </CardTitle>
                  </div>
                  <p className="text-muted-foreground text-sm">{calculator.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {calculator.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-4 bg-gradient-primary hover:shadow-elevated transition-all duration-200"
                    onClick={() => onNavigateToCalculator(calculator.id)}
                  >
                    Calcular Agora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pronto para planejar seu futuro financeiro?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Comece agora mesmo com nossas calculadoras gratuitas e tome 
            decisões financeiras mais inteligentes.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:shadow-elevated transition-all duration-200"
            onClick={() => onNavigateToCalculator('rendimentos')}
          >
            <Calculator className="mr-2 h-5 w-5" />
            Iniciar Cálculos
          </Button>
        </div>
      </section>
    </div>
  );
}