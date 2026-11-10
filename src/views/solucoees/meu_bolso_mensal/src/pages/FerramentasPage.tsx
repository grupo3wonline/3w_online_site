import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import RendimentosCalculator from "@/components/calculators/RendimentosCalculator";
import InvestimentosCalculator from "@/components/calculators/InvestimentosCalculator";
import FeriasCalculator from "@/components/calculators/FeriasCalculator";
import DecimoTerceiroCalculator from "@/components/calculators/DecimoTerceiroCalculator";
import RescisaoCalculator from "@/components/calculators/RescisaoCalculator";
import SeguroDesempregoCalculator from "@/components/calculators/SeguroDesempregoCalculator";
import AposentadoriaCalculator from "@/components/calculators/AposentadoriaCalculator";
import FgtsCalculator from "@/components/calculators/FgtsCalculator";
import ImpostoRendaCalculator from "@/components/calculators/ImpostoRendaCalculator";
import SalarioCalculator from "@/components/calculators/SalarioCalculator";
import PlrCalculator from "@/components/calculators/PlrCalculator";
import BeneficiosCalculator from "@/components/calculators/BeneficiosCalculator";
import CTADeveloper from "@/components/shared/CTADeveloper";

const calculators = [
  {
    id: "salario",
    title: "Salário",
    icon: "fa-money-bill-wave",
    component: SalarioCalculator,
    desc: "Calcule seu salário líquido com descontos e adicionais",
    category: "Trabalhista"
  },
  {
    id: "ferias",
    title: "Férias",
    icon: "fa-umbrella-beach",
    component: FeriasCalculator,
    desc: "Descubra o valor das suas férias e 1/3 constitucional",
    category: "Trabalhista"
  },
  {
    id: "decimo-terceiro",
    title: "13º Salário",
    icon: "fa-gift",
    component: DecimoTerceiroCalculator,
    desc: "Calcule o décimo terceiro salário proporcional",
    category: "Trabalhista"
  },
  {
    id: "rescisao",
    title: "Rescisão",
    icon: "fa-file-contract",
    component: RescisaoCalculator,
    desc: "Simule os valores da rescisão trabalhista",
    category: "Trabalhista"
  },
  {
    id: "seguro-desemprego",
    title: "Seguro Desemprego",
    icon: "fa-hand-holding-dollar",
    component: SeguroDesempregoCalculator,
    desc: "Calcule o valor do seguro desemprego",
    category: "Trabalhista"
  },
  {
    id: "aposentadoria",
    title: "Aposentadoria",
    icon: "fa-user-clock",
    component: AposentadoriaCalculator,
    desc: "Planeje sua aposentadoria e descubra o valor",
    category: "Previdência"
  },
  {
    id: "fgts",
    title: "FGTS",
    icon: "fa-piggy-bank",
    component: FgtsCalculator,
    desc: "Calcule o saldo do Fundo de Garantia",
    category: "Trabalhista"
  },
  {
    id: "imposto-renda",
    title: "Imposto de Renda",
    icon: "fa-file-invoice-dollar",
    component: ImpostoRendaCalculator,
    desc: "Estime o imposto de renda a pagar ou restituir",
    category: "Impostos"
  },
  {
    id: "rendimentos",
    title: "Rendimentos",
    icon: "fa-coins",
    component: RendimentosCalculator,
    desc: "Controle todas suas fontes de renda",
    category: "Pessoal"
  },
  {
    id: "investimentos",
    title: "Investimentos",
    icon: "fa-chart-line",
    component: InvestimentosCalculator,
    desc: "Simule rendimentos de investimentos com juros compostos",
    category: "Investimentos"
  },
  {
    id: "plr",
    title: "PLR",
    icon: "fa-trophy",
    component: PlrCalculator,
    desc: "Calcule a Participação nos Lucros e Resultados",
    category: "Trabalhista"
  },
  {
    id: "beneficios",
    title: "Benefícios",
    icon: "fa-heart",
    component: BeneficiosCalculator,
    desc: "Gerencie e calcule benefícios corporativos",
    category: "Trabalhista"
  },
];

const categories = ["Todos", "Trabalhista", "Investimentos", "Impostos", "Previdência", "Pessoal"];

export default function FerramentasPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCalc, setActiveCalc] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  useEffect(() => {
    const calc = searchParams.get("calc");
    if (calc && calculators.find(c => c.id === calc)) {
      setActiveCalc(calc);
    }
  }, [searchParams]);

  const handleSelect = (id: string) => {
    setActiveCalc(id);
    setSearchParams({ calc: id });
  };

  const handleBack = () => {
    setActiveCalc(null);
    setSearchParams({});
  };

  const ActiveComponent = activeCalc ? calculators.find(c => c.id === activeCalc)?.component : null;

  const filteredCalculators = selectedCategory === "Todos"
    ? calculators
    : calculators.filter(c => c.category === selectedCategory);

  return (
    <div className="py-8 md:py-12">
      <div className="container-app">
        {!activeCalc ? (
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 text-sm px-4 py-2">
                <i className="fa-solid fa-calculator mr-2"></i>
                Calculadoras Financeiras
              </Badge>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Todas as Ferramentas Que Você{" "}
                <span className="text-gradient bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Precisa
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                <strong>12 calculadoras profissionais</strong> para gerenciar suas finanças pessoais,
                direitos trabalhistas e investimentos. <span className="text-emerald-600 dark:text-emerald-400">100% grátis!</span>
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "btn-gradient" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Instructions Panel */}
            <Card className="mb-10 border-0 shadow-lg bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                      <i className="fa-solid fa-lightbulb text-emerald-600 dark:text-emerald-400 text-xl"></i>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground mb-2 text-lg">
                      <i className="fa-solid fa-info-circle mr-2"></i>
                      Como Usar
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Selecione a calculadora desejada abaixo, preencha os campos com suas informações
                      e obtenha resultados precisos instantaneamente. Todos os cálculos são feitos
                      localmente no seu navegador, garantindo total privacidade.
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                        <i className="fa-solid fa-check-circle"></i>
                        <span>Resultados instantâneos</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                        <i className="fa-solid fa-lock"></i>
                        <span>100% seguro e privado</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                        <i className="fa-solid fa-mobile-screen-button"></i>
                        <span>Funciona em qualquer dispositivo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calculators Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
              {filteredCalculators.map((calc) => (
                <Tooltip key={calc.id}>
                  <TooltipTrigger asChild>
                    <Card
                      className="card-hover cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-card group"
                      onClick={() => handleSelect(calc.id)}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                          <i className={`fa-solid ${calc.icon} text-white text-2xl`}></i>
                        </div>
                        <Badge variant="outline" className="mb-2 text-xs">
                          {calc.category}
                        </Badge>
                        <h3 className="font-display font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2 text-lg">
                          {calc.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {calc.desc}
                        </p>
                        <div className="mt-4 flex items-center justify-center text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-sm font-semibold">Abrir calculadora</span>
                          <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                        </div>
                      </CardContent>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    <p className="font-semibold mb-1">{calc.title}</p>
                    <p className="text-sm text-muted-foreground">{calc.desc}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>

            {/* Tips Section */}
            <Card className="mb-10 border-0 shadow-lg bg-card">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="font-display font-bold text-foreground mb-2 text-xl">
                    <i className="fa-solid fa-star text-yellow-500 mr-2"></i>
                    Dicas Para Controlar Suas Finanças
                  </h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: "fa-book",
                      title: "Registre Tudo",
                      tip: "Anote todas receitas e despesas, por menores que sejam. Você vai se surpreender!"
                    },
                    {
                      icon: "fa-target",
                      title: "Defina Metas",
                      tip: "Estabeleça objetivos financeiros claros e acompanhe seu progresso mensalmente"
                    },
                    {
                      icon: "fa-piggy-bank",
                      title: "Economize Primeiro",
                      tip: "Separe uma porcentagem para poupança antes de gastar com outras coisas"
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                          <i className={`fa-solid ${item.icon} text-yellow-600 dark:text-yellow-400`}></i>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <CTADeveloper variant="compact" />
          </>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="hover:bg-emerald-500/10"
              >
                <i className="fa-solid fa-arrow-left mr-2"></i>
                Voltar às Ferramentas
              </Button>
            </div>
            {ActiveComponent && <ActiveComponent onBack={handleBack} />}
          </div>
        )}
      </div>
    </div>
  );
}