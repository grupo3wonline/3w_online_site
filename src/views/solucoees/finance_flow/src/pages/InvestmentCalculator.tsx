import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FinancialCard from "@/components/FinancialCard";
import { 
  TrendingUp, 
  DollarSign, 
  PiggyBank, 
  Calendar, 
  Percent,
  BarChart3,
  Target,
  Calculator
} from "lucide-react";
import { calculateInvestment, formatCurrency } from "@/utils/investmentCalculations";
import { toast } from "@/hooks/use-toast";

const InvestmentCalculator = () => {
  const [formData, setFormData] = useState({
    montanteInicial: "",
    tempoInvestimento: "",
    aporteMensal: "",
    jurosAnuais: "18.5",
    jurosMensais: "6.9"
  });
  
  const [results, setResults] = useState<any>(null);

  const formatInputValue = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(parseInt(numericValue) / 100);
    
    return numericValue ? formattedValue : '';
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'montanteInicial' || field === 'aporteMensal') {
      setFormData(prev => ({
        ...prev,
        [field]: formatInputValue(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleCalculate = () => {
    const montanteInicial = parseFloat(formData.montanteInicial.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    const tempoInvestimento = parseFloat(formData.tempoInvestimento) || 0;
    const aporteMensal = parseFloat(formData.aporteMensal.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    const jurosAnuais = parseFloat(formData.jurosAnuais) || 0;
    const jurosMensais = parseFloat(formData.jurosMensais) || 0;

    if (tempoInvestimento <= 0) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha pelo menos o tempo de investimento.",
        variant: "destructive",
      });
      return;
    }

    const investmentResults = calculateInvestment({
      montanteInicial,
      tempoInvestimento,
      aporteMensal,
      jurosAnuais,
      jurosMensais
    });
    
    setResults(investmentResults);
    
    toast({
      title: "Simulação concluída!",
      description: "Sua projeção de investimento foi calculada com sucesso.",
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Calculadora de Investimentos
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Projete o crescimento dos seus investimentos ao longo do tempo. 
            Veja quanto seu dinheiro pode render com aportes regulares e juros compostos.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Input Form */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Calculator className="w-6 h-6 text-primary" />
                Dados do Investimento
              </CardTitle>
              <CardDescription>
                Preencha as informações para simular seu investimento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="montanteInicial" className="text-base font-medium">
                  Valor Inicial (Opcional)
                </Label>
                <Input
                  id="montanteInicial"
                  type="text"
                  placeholder="R$ 0,00"
                  value={formData.montanteInicial}
                  onChange={(e) => handleInputChange('montanteInicial', e.target.value)}
                  className="text-lg h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aporteMensal" className="text-base font-medium">
                  Aporte Mensal
                </Label>
                <Input
                  id="aporteMensal"
                  type="text"
                  placeholder="R$ 0,00"
                  value={formData.aporteMensal}
                  onChange={(e) => handleInputChange('aporteMensal', e.target.value)}
                  className="text-lg h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tempoInvestimento" className="text-base font-medium">
                  Tempo de Investimento (anos)
                </Label>
                <Input
                  id="tempoInvestimento"
                  type="number"
                  placeholder="10"
                  value={formData.tempoInvestimento}
                  onChange={(e) => handleInputChange('tempoInvestimento', e.target.value)}
                  className="text-lg h-12"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jurosAnuais" className="text-base font-medium">
                    Taxa Anual (%)
                  </Label>
                  <Input
                    id="jurosAnuais"
                    type="number"
                    step="0.1"
                    value={formData.jurosAnuais}
                    onChange={(e) => handleInputChange('jurosAnuais', e.target.value)}
                    className="text-lg h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jurosMensais" className="text-base font-medium">
                    Taxa Mensal (%)
                  </Label>
                  <Input
                    id="jurosMensais"
                    type="number"
                    step="0.1"
                    value={formData.jurosMensais}
                    onChange={(e) => handleInputChange('jurosMensais', e.target.value)}
                    className="text-lg h-12"
                  />
                </div>
              </div>

              <Button 
                onClick={handleCalculate}
                variant="hero"
                size="lg"
                className="w-full"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Calcular Projeção
              </Button>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="shadow-medium bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-primary" />
                Como Funciona
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <PiggyBank className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Valor Inicial</h3>
                  <p className="text-sm text-muted-foreground">
                    O montante que você já possui para começar a investir.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Aporte Mensal</h3>
                  <p className="text-sm text-muted-foreground">
                    Valor que você planeja investir todo mês.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Tempo</h3>
                  <p className="text-sm text-muted-foreground">
                    Por quanto tempo você pretende manter o investimento.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Percent className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Taxas de Retorno</h3>
                  <p className="text-sm text-muted-foreground">
                    Percentual de rendimento esperado do investimento.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        {results && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">
              Projeção do seu Investimento
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FinancialCard
                title="Total Investido"
                value={results.valorInvestido}
                description="Valor que você colocará"
                icon={DollarSign}
                variant="primary"
              />
              
              <FinancialCard
                title="Montante Acumulado"
                value={results.montanteAcumulado}
                description="Valor final projetado"
                icon={TrendingUp}
                variant="success"
              />
              
              <FinancialCard
                title="Lucro Obtido"
                value={results.lucroObtido}
                description="Ganho com o investimento"
                icon={Target}
                variant="warning"
              />
              
              <FinancialCard
                title="Rendimento Mensal"
                value={results.rendimentoMensal}
                description="Média de ganho por mês"
                icon={Calendar}
              />
              
              <FinancialCard
                title="Rendimento Anual"
                value={results.rendimentoAnual}
                description="Média de ganho por ano"
                icon={BarChart3}
              />
              
              <FinancialCard
                title="Percentual de Lucro"
                value={results.percentualLucro}
                description="% de retorno sobre investido"
                icon={Percent}
              />
            </div>

            {/* Additional Info */}
            <Card className="mt-8 shadow-medium bg-gradient-to-r from-success/5 to-warning/5">
              <CardHeader>
                <CardTitle className="text-xl text-center">
                  💡 Dica Importante
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Estes cálculos são uma projeção baseada nas taxas informadas. 
                  Os rendimentos reais podem variar conforme as condições do mercado. 
                  Sempre consulte um profissional antes de tomar decisões de investimento.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentCalculator;