import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, DollarSign, TrendingUp, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RendimentosCalculatorProps {
  onBack: () => void;
}

interface RendimentosResult {
  rendimento_base_informado: string;
  ganho: {
    hora: string;
    dia: string;
    semana: string;
    mes: string;
    trimestre: string;
    semestre: string;
    ano: string;
  };
  acumulado: { [key: string]: string };
}

export default function RendimentosCalculator({ onBack }: RendimentosCalculatorProps) {
  const [salarioBase, setSalarioBase] = useState("");
  const [resultado, setResultado] = useState<RendimentosResult | null>(null);
  const { toast } = useToast();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return value.toFixed(2).replace('.', ',');
  };

  const calcularRendimentos = () => {
    if (!salarioBase) {
      toast({
        title: "Erro",
        description: "Informe o valor do salário base",
        variant: "destructive"
      });
      return;
    }

    const budget = parseFloat(salarioBase.replace(',', '.'));
    
    if (budget <= 0) {
      toast({
        title: "Erro",
        description: "Informe um valor válido maior que zero",
        variant: "destructive"
      });
      return;
    }

    const salario: RendimentosResult = {
      rendimento_base_informado: formatNumber(budget),
      ganho: {
        hora: formatNumber(budget / 200), // 200 horas/mês (25 dias x 8h)
        dia: formatNumber(budget / 30),
        semana: formatNumber(budget / 4),
        mes: formatNumber(budget),
        trimestre: formatNumber(budget * 3),
        semestre: formatNumber(budget * 6),
        ano: formatNumber(budget * 12)
      },
      acumulado: {}
    };

    // Calcular acumulado por anos (1 a 50 anos)
    for (let i = 1; i <= 50; i++) {
      salario.acumulado[`${i}ano`] = formatNumber((budget * 12) * i);
    }

    setResultado(salario);
    
    toast({
      title: "Sucesso",
      description: "Cálculo de rendimentos realizado com sucesso!"
    });
  };

  const limpar = () => {
    setSalarioBase("");
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
              Calculadora de Rendimentos
            </h1>
            <p className="text-lg text-muted-foreground">
              Calcule seus ganhos por período e projeções futuras
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Input Form */}
          <Card className="lg:col-span-1 bg-gradient-card shadow-card animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <DollarSign className="h-5 w-5" />
                Dados de Entrada
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="salario">Salário Base Mensal (R$)</Label>
                <Input
                  id="salario"
                  type="text"
                  placeholder="Ex: 3000,00"
                  value={salarioBase}
                  onChange={(e) => setSalarioBase(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') calcularRendimentos();
                  }}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={calcularRendimentos} 
                  className="flex-1 bg-gradient-primary hover:shadow-elevated transition-all duration-200"
                >
                  Calcular
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
                {/* Ganhos por Período */}
                <Card className="bg-gradient-card shadow-card animate-fade-in">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Ganhos por Período
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 rounded-lg bg-gradient-subtle">
                        <p className="text-sm text-muted-foreground">Por Hora</p>
                        <p className="text-lg font-bold text-success">
                          R$ {resultado.ganho.hora}
                        </p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-gradient-subtle">
                        <p className="text-sm text-muted-foreground">Por Dia</p>
                        <p className="text-lg font-bold text-success">
                          R$ {resultado.ganho.dia}
                        </p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-gradient-subtle">
                        <p className="text-sm text-muted-foreground">Por Semana</p>
                        <p className="text-lg font-bold text-success">
                          R$ {resultado.ganho.semana}
                        </p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-gradient-subtle">
                        <p className="text-sm text-muted-foreground">Por Mês</p>
                        <p className="text-lg font-bold text-primary">
                          R$ {resultado.ganho.mes}
                        </p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-gradient-subtle">
                        <p className="text-sm text-muted-foreground">Por Trimestre</p>
                        <p className="text-lg font-bold text-success">
                          R$ {resultado.ganho.trimestre}
                        </p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-gradient-subtle">
                        <p className="text-sm text-muted-foreground">Por Semestre</p>
                        <p className="text-lg font-bold text-success">
                          R$ {resultado.ganho.semestre}
                        </p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-gradient-subtle">
                        <p className="text-sm text-muted-foreground">Por Ano</p>
                        <p className="text-lg font-bold text-primary">
                          R$ {resultado.ganho.ano}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Projeções Acumuladas */}
                <Card className="bg-gradient-card shadow-card animate-fade-in">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Projeções Acumuladas (Anos)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-h-96 overflow-y-auto">
                      {Object.entries(resultado.acumulado).slice(0, 20).map(([periodo, valor]) => (
                        <div key={periodo} className="text-center p-3 rounded-lg bg-gradient-subtle">
                          <p className="text-sm text-muted-foreground">{periodo.replace('ano', ' ano(s)')}</p>
                          <p className="text-sm font-bold text-primary">
                            R$ {valor}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 text-center">
                      Mostrando projeções para os primeiros 20 anos. Total disponível: 50 anos.
                    </p>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="bg-gradient-card shadow-card">
                <CardContent className="p-12 text-center">
                  <DollarSign className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Aguardando Cálculo
                  </h3>
                  <p className="text-muted-foreground">
                    Informe o valor do salário base para ver os resultados dos rendimentos.
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