import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, TrendingUp, Calculator, PiggyBank } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InvestimentosCalculatorProps {
  onBack: () => void;
}

interface InvestimentoResult {
  valor_investido: string;
  montante_acumulado: string;
  lucro_obtido: string;
  evolucao_mensal: Array<{
    mes: number;
    montante: number;
    investido: number;
    lucro: number;
  }>;
}

export default function InvestimentosCalculator({ onBack }: InvestimentosCalculatorProps) {
  const [montanteInicial, setMontanteInicial] = useState("");
  const [tempoInvestimento, setTempoInvestimento] = useState("");
  const [aporteMensal, setAporteMensal] = useState("");
  const [jurosAnuais, setJurosAnuais] = useState("12.0");
  const [resultado, setResultado] = useState<InvestimentoResult | null>(null);
  const { toast } = useToast();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calcularInvestimento = () => {
    if (!montanteInicial || !tempoInvestimento || !aporteMensal || !jurosAnuais) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive"
      });
      return;
    }

    const inicial = parseFloat(montanteInicial.replace(',', '.'));
    const tempo = parseFloat(tempoInvestimento.replace(',', '.'));
    const aporte = parseFloat(aporteMensal.replace(',', '.'));
    const juros = parseFloat(jurosAnuais.replace(',', '.'));

    if (inicial < 0 || tempo <= 0 || aporte < 0 || juros < 0) {
      toast({
        title: "Erro",
        description: "Informe valores válidos maiores ou iguais a zero",
        variant: "destructive"
      });
      return;
    }

    // Cálculo baseado no código fornecido, mas corrigido
    const jurosMensais = juros / 12 / 100; // Juros mensais em decimal
    const tempoMeses = tempo * 12;

    let montanteAtual = inicial;
    let montanteInvestido = inicial;
    let lucroTotal = 0;
    const evolucaoMensal: Array<{
      mes: number;
      montante: number;
      investido: number;
      lucro: number;
    }> = [];

    for (let i = 1; i <= tempoMeses; i++) {
      // Adiciona aporte mensal
      montanteAtual += aporte;
      montanteInvestido += aporte;

      // Calcula juros sobre o montante atual
      const jurosDoMes = montanteAtual * jurosMensais;
      montanteAtual += jurosDoMes;
      lucroTotal += jurosDoMes;

      // Armazena evolução mensal (apenas alguns pontos para não sobrecarregar)
      if (i % Math.max(1, Math.floor(tempoMeses / 12)) === 0 || i === tempoMeses) {
        evolucaoMensal.push({
          mes: i,
          montante: montanteAtual,
          investido: montanteInvestido,
          lucro: lucroTotal
        });
      }
    }

    const resultadoFinal: InvestimentoResult = {
      valor_investido: montanteInvestido.toFixed(2),
      montante_acumulado: montanteAtual.toFixed(2),
      lucro_obtido: lucroTotal.toFixed(2),
      evolucao_mensal: evolucaoMensal
    };

    setResultado(resultadoFinal);
    
    toast({
      title: "Sucesso",
      description: "Simulação de investimento calculada com sucesso!"
    });
  };

  const limpar = () => {
    setMontanteInicial("");
    setTempoInvestimento("");
    setAporteMensal("");
    setJurosAnuais("12.0");
    setResultado(null);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div className="animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Simulador de Investimentos
            </h1>
            <p className="text-lg text-muted-foreground">
              Projete seus investimentos com juros compostos
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Input Form */}
          <Card className="lg:col-span-1 bg-gradient-card shadow-card animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Calculator className="h-5 w-5" />
                Dados do Investimento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="inicial">Montante Inicial (R$)</Label>
                <Input
                  id="inicial"
                  type="text"
                  placeholder="Ex: 1000,00"
                  value={montanteInicial}
                  onChange={(e) => setMontanteInicial(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tempo">Tempo de Investimento (anos)</Label>
                <Input
                  id="tempo"
                  type="text"
                  placeholder="Ex: 5"
                  value={tempoInvestimento}
                  onChange={(e) => setTempoInvestimento(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aporte">Aporte Mensal (R$)</Label>
                <Input
                  id="aporte"
                  type="text"
                  placeholder="Ex: 300,00"
                  value={aporteMensal}
                  onChange={(e) => setAporteMensal(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="juros">Taxa de Juros Anual (%)</Label>
                <Input
                  id="juros"
                  type="text"
                  placeholder="Ex: 12,0"
                  value={jurosAnuais}
                  onChange={(e) => setJurosAnuais(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={calcularInvestimento} 
                  className="flex-1 bg-gradient-primary hover:shadow-elevated transition-all duration-200"
                >
                  Simular
                </Button>
                <Button 
                  variant="outline" 
                  onClick={limpar}
                  className="flex-1"
                >
                  Limpar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            {resultado ? (
              <>
                {/* Resumo dos Resultados */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
                  <Card className="bg-gradient-card shadow-card">
                    <CardContent className="p-6 text-center">
                      <PiggyBank className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Total Investido</p>
                      <p className="text-xl font-bold text-foreground">
                        {formatCurrency(parseFloat(resultado.valor_investido))}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-card shadow-card">
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="h-8 w-8 text-success mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Montante Final</p>
                      <p className="text-xl font-bold text-success">
                        {formatCurrency(parseFloat(resultado.montante_acumulado))}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-card shadow-elevated">
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Lucro Obtido</p>
                      <p className="text-xl font-bold text-primary">
                        {formatCurrency(parseFloat(resultado.lucro_obtido))}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Evolução do Investimento */}
                <Card className="bg-gradient-card shadow-card animate-fade-in">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Evolução do Investimento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {resultado.evolucao_mensal.map((periodo, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gradient-subtle">
                          <div>
                            <p className="font-medium text-foreground">
                              Mês {periodo.mes}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {Math.floor(periodo.mes / 12)} ano(s) e {periodo.mes % 12} mês(es)
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-success">
                              {formatCurrency(periodo.montante)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Lucro: {formatCurrency(periodo.lucro)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Análise do Investimento */}
                <Card className="bg-gradient-card shadow-card animate-fade-in">
                  <CardHeader>
                    <CardTitle>Análise do Investimento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Rentabilidade</h4>
                        <p className="text-sm text-muted-foreground">
                          Rentabilidade total: <span className="font-bold text-success">
                            {(((parseFloat(resultado.montante_acumulado) / parseFloat(resultado.valor_investido)) - 1) * 100).toFixed(2)}%
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Multiplicador: <span className="font-bold">
                            {(parseFloat(resultado.montante_acumulado) / parseFloat(resultado.valor_investido)).toFixed(2)}x
                          </span>
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Composição Final</h4>
                        <p className="text-sm text-muted-foreground">
                          Capital investido: <span className="font-bold">
                            {((parseFloat(resultado.valor_investido) / parseFloat(resultado.montante_acumulado)) * 100).toFixed(1)}%
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Lucros gerados: <span className="font-bold text-success">
                            {((parseFloat(resultado.lucro_obtido) / parseFloat(resultado.montante_acumulado)) * 100).toFixed(1)}%
                          </span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="bg-gradient-card shadow-card">
                <CardContent className="p-12 text-center">
                  <TrendingUp className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Aguardando Simulação
                  </h3>
                  <p className="text-muted-foreground">
                    Preencha os dados do investimento para ver a projeção de crescimento.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}