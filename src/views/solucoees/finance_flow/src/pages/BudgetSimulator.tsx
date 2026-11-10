import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FinancialCard from "@/components/FinancialCard";
import { 
  Calculator, 
  PiggyBank, 
  GraduationCap, 
  Heart, 
  Home, 
  Coffee,
  Clock,
  TrendingUp,
  DollarSign,
  Target,
  ShoppingCart,
  Car,
  Users,
  Receipt
} from "lucide-react";
import { calculateOrcamentoPessoal, getBudgetMethods, calculateOrcamentoFamiliar, formatCurrency } from "@/utils/budgetCalculations";
import { toast } from "@/hooks/use-toast";

const BudgetSimulator = () => {
  const [salary, setSalary] = useState<string>("");
  const [results, setResults] = useState<any>(null);
  const [familyResults, setFamilyResults] = useState<any>(null);
  const [methods, setMethods] = useState<any[]>([]);

  const handleCalculate = () => {
    const salaryNumber = parseFloat(salary.replace(/[^\d,]/g, '').replace(',', '.'));
    
    if (!salaryNumber || salaryNumber <= 0) {
      toast({
        title: "Valor inválido",
        description: "Por favor, insira um valor de salário válido.",
        variant: "destructive",
      });
      return;
    }

    const budgetResults = calculateOrcamentoPessoal(salaryNumber);
    const familyBudgetResults = calculateOrcamentoFamiliar(salaryNumber);
    const budgetMethods = getBudgetMethods(salaryNumber);
    
    setResults(budgetResults);
    setFamilyResults(familyBudgetResults);
    setMethods(budgetMethods);
    
    toast({
      title: "Cálculo realizado!",
      description: "Suas divisões orçamentárias foram calculadas com sucesso.",
    });
  };

  const formatInputValue = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(parseInt(numericValue) / 100);
    
    return numericValue ? formattedValue : '';
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatInputValue(e.target.value);
    setSalary(formatted);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Simulador de Orçamento Pessoal
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubra como dividir seu salário de forma inteligente usando métodos comprovados 
            de organização financeira. Insira sua renda e veja as melhores estratégias para você.
          </p>
        </div>

        {/* Input Section */}
        <Card className="max-w-2xl mx-auto mb-12 shadow-medium">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Calculator className="w-6 h-6 text-primary" />
              Calcular Divisão Orçamentária
            </CardTitle>
            <CardDescription>
              Informe sua renda mensal líquida para ver como organizar suas finanças
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="salary" className="text-base font-medium">
                Salário Mensal Líquido
              </Label>
              <Input
                id="salary"
                type="text"
                placeholder="R$ 0,00"
                value={salary}
                onChange={handleSalaryChange}
                className="text-lg h-12"
              />
            </div>
            
            <Button 
              onClick={handleCalculate}
              variant="hero"
              size="lg"
              className="w-full"
              disabled={!salary}
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calcular Orçamento
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {results && (
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="personal">Orçamento Pessoal</TabsTrigger>
              <TabsTrigger value="family">Orçamento Familiar</TabsTrigger>
              <TabsTrigger value="methods">Métodos Alternativos</TabsTrigger>
            </TabsList>

            {/* Personal Budget Tab */}
            <TabsContent value="personal">
              {/* Recommended Division */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-center mb-8">
                  Nossa Recomendação Pessoal para Você
                </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <FinancialCard
                  title="Plano de Aposentadoria"
                  value={results.sugentao_divisao.plano_aposentadoria}
                  description="5% da renda para o futuro"
                  icon={PiggyBank}
                  variant="primary"
                />
                <FinancialCard
                  title="Reserva de Emergência"
                  value={results.sugentao_divisao.reserva_emergencia}
                  description="5% para emergências"
                  icon={Target}
                  variant="success"
                />
                <FinancialCard
                  title="Educação Profissional"
                  value={results.sugentao_divisao.educacao_profissional}
                  description="15% para desenvolvimento"
                  icon={GraduationCap}
                  variant="warning"
                />
                <FinancialCard
                  title="Sonhos e Aspirações"
                  value={results.sugentao_divisao.sonhos_aspiracoes}
                  description="15% para seus objetivos"
                  icon={Heart}
                />
                <FinancialCard
                  title="Gastos Essenciais"
                  value={results.sugentao_divisao.gastos_essenciais}
                  description="50% para necessidades básicas"
                  icon={Home}
                />
                <FinancialCard
                  title="Gastos Extras"
                  value={results.sugentao_divisao.gastos_extras}
                  description="10% para lazer e extras"
                  icon={Coffee}
                />
              </div>
              </div>

              {/* Salary Breakdown */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-center mb-8">
                  Seu Rendimento por Período
                </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FinancialCard
                  title="Por Hora"
                  value={results.rendimento_salarial.hora}
                  icon={Clock}
                />
                <FinancialCard
                  title="Por Dia"
                  value={results.rendimento_salarial.dia}
                  icon={Clock}
                />
                <FinancialCard
                  title="Por Semana"
                  value={results.rendimento_salarial.semana}
                  icon={TrendingUp}
                />
                <FinancialCard
                  title="Por Mês"
                  value={results.rendimento_salarial.mes}
                  icon={DollarSign}
                />
                <FinancialCard
                  title="Por Trimestre"
                  value={results.rendimento_salarial.trimestre}
                  icon={TrendingUp}
                />
                <FinancialCard
                  title="Por Semestre"
                  value={results.rendimento_salarial.semestre}
                  icon={TrendingUp}
                />
                <FinancialCard
                  title="Por Ano"
                  value={results.rendimento_salarial.ano}
                  icon={TrendingUp}
                  variant="success"
                />
              </div>
            </div>
            </TabsContent>

            {/* Family Budget Tab */}
            <TabsContent value="family">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-center mb-8">
                  Organização do Orçamento Familiar
                </h2>
                <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Divisão estratégica do orçamento familiar focada nas principais categorias de gastos domésticos.
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FinancialCard
                    title="Alimentação"
                    value={familyResults.sugentao_divisao.alimentacao}
                    description="25% para supermercado e alimentação"
                    icon={ShoppingCart}
                    variant="primary"
                  />
                  <FinancialCard
                    title="Contas e Moradia"
                    value={familyResults.sugentao_divisao.contas}
                    description="35% para contas fixas da casa"
                    icon={Home}
                    variant="warning"
                  />
                  <FinancialCard
                    title="Transporte"
                    value={familyResults.sugentao_divisao.transporte}
                    description="20% para combustível e mobilidade"
                    icon={Car}
                  />
                  <FinancialCard
                    title="Poupança Familiar"
                    value={familyResults.sugentao_divisao.poupanca}
                    description="10% para reserva da família"
                    icon={PiggyBank}
                    variant="success"
                  />
                  <FinancialCard
                    title="Outros Gastos"
                    value={familyResults.sugentao_divisao.outros_gastos}
                    description="10% para gastos diversos"
                    icon={Receipt}
                  />
                  <FinancialCard
                    title="Total do Orçamento"
                    value={familyResults.salario_base_informado}
                    description="Renda familiar total"
                    icon={Users}
                    variant="primary"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Alternative Methods Tab */}
            <TabsContent value="methods">
            {/* Alternative Methods */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">
                Métodos Alternativos de Divisão
              </h2>
              
              <Tabs defaultValue="0" className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 mb-8">
                  {methods.map((_, index) => (
                    <TabsTrigger key={index} value={index.toString()}>
                      Método {index + 1}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {methods.map((method, index) => (
                  <TabsContent key={index} value={index.toString()}>
                    <Card className="shadow-medium">
                      <CardHeader className="text-center">
                        <CardTitle className="text-2xl text-primary">
                          {method.titulo}
                        </CardTitle>
                        <CardDescription>
                          Baseado em sua renda de {formatCurrency(parseFloat(salary.replace(/[^\d,]/g, '').replace(',', '.')))}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {Object.entries(method).map(([key, value]) => {
                            if (key === 'titulo') return null;
                            
                            const formattedKey = key
                              .replace(/([A-Z])/g, ' $1')
                              .replace(/^./, str => str.toUpperCase())
                              .replace(/([a-z])([A-Z])/g, '$1 $2');
                            
                            return (
                              <div
                                key={key}
                                className="p-4 bg-gradient-card rounded-lg border"
                              >
                                <p className="text-sm text-muted-foreground mb-1">
                                  {formattedKey}
                                </p>
                                <p className="text-xl font-bold text-primary">
                                  {value as string}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default BudgetSimulator;