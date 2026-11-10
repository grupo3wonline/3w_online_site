import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calendar, Sun, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FeriasCalculatorProps {
  onBack: () => void;
}

interface FeriasResult {
  salario_base: number;
  valor_ferias: number;
  um_terco_constitucional: number;
  total_ferias: number;
  ferias_proporcionais: number;
  meses_trabalhados: number;
}

export default function FeriasCalculator({ onBack }: FeriasCalculatorProps) {
  const [salarioBase, setSalarioBase] = useState("");
  const [mesesTrabalhados, setMesesTrabalhados] = useState("12");
  const [resultado, setResultado] = useState<FeriasResult | null>(null);
  const { toast } = useToast();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calcularFerias = () => {
    if (!salarioBase || !mesesTrabalhados) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive"
      });
      return;
    }

    const salario = parseFloat(salarioBase.replace(',', '.'));
    const meses = parseInt(mesesTrabalhados);

    if (salario <= 0 || meses < 0 || meses > 12) {
      toast({
        title: "Erro",
        description: "Informe valores válidos (meses: 0-12)",
        variant: "destructive"
      });
      return;
    }

    // Cálculo das férias
    const feriasProporcionais = (salario * meses) / 12;
    const umTercoConstitucional = feriasProporcionais / 3;
    const totalFerias = feriasProporcionais + umTercoConstitucional;

    const resultado: FeriasResult = {
      salario_base: salario,
      valor_ferias: feriasProporcionais,
      um_terco_constitucional: umTercoConstitucional,
      total_ferias: totalFerias,
      ferias_proporcionais: feriasProporcionais,
      meses_trabalhados: meses
    };

    setResultado(resultado);
    
    toast({
      title: "Sucesso",
      description: "Cálculo de férias realizado com sucesso!"
    });
  };

  const limpar = () => {
    setSalarioBase("");
    setMesesTrabalhados("12");
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
              Calculadora de Férias
            </h1>
            <p className="text-lg text-muted-foreground">
              Calcule o valor das suas férias e 1/3 constitucional
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Input Form */}
          <Card className="lg:col-span-1 bg-gradient-card shadow-card animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Calendar className="h-5 w-5" />
                Dados para Cálculo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="salario">Salário Base (R$)</Label>
                <Input
                  id="salario"
                  type="text"
                  placeholder="Ex: 3000,00"
                  value={salarioBase}
                  onChange={(e) => setSalarioBase(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meses">Meses Trabalhados</Label>
                <Input
                  id="meses"
                  type="number"
                  min="0"
                  max="12"
                  placeholder="12"
                  value={mesesTrabalhados}
                  onChange={(e) => setMesesTrabalhados(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  12 meses = férias integrais | Menos de 12 = férias proporcionais
                </p>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={calcularFerias} 
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
                {/* Resumo do Cálculo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                  <Card className="bg-gradient-card shadow-card">
                    <CardContent className="p-6 text-center">
                      <Sun className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Valor das Férias</p>
                      <p className="text-2xl font-bold text-success">
                        {formatCurrency(resultado.valor_ferias)}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-card shadow-card">
                    <CardContent className="p-6 text-center">
                      <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">1/3 Constitucional</p>
                      <p className="text-2xl font-bold text-success">
                        {formatCurrency(resultado.um_terco_constitucional)}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Total a Receber */}
                <Card className="bg-gradient-card shadow-elevated animate-fade-in">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                      Total a Receber de Férias
                    </h3>
                    <p className="text-4xl font-bold text-primary mb-4">
                      {formatCurrency(resultado.total_ferias)}
                    </p>
                    <div className="text-sm text-muted-foreground">
                      <p>Baseado em {resultado.meses_trabalhados} mês(es) trabalhado(s)</p>
                      <p>Salário base: {formatCurrency(resultado.salario_base)}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Detalhamento */}
                <Card className="bg-gradient-card shadow-card animate-fade-in">
                  <CardHeader>
                    <CardTitle>Detalhamento do Cálculo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                      <span className="text-muted-foreground">Salário Base:</span>
                      <span className="font-semibold">{formatCurrency(resultado.salario_base)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                      <span className="text-muted-foreground">Meses trabalhados:</span>
                      <span className="font-semibold">{resultado.meses_trabalhados} mês(es)</span>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                      <span className="text-muted-foreground">
                        Férias {resultado.meses_trabalhados === 12 ? 'integrais' : 'proporcionais'}:
                      </span>
                      <span className="font-semibold text-success">
                        {formatCurrency(resultado.valor_ferias)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                      <span className="text-muted-foreground">1/3 Constitucional:</span>
                      <span className="font-semibold text-success">
                        {formatCurrency(resultado.um_terco_constitucional)}
                      </span>
                    </div>

                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-primary/10">
                        <span className="font-semibold text-foreground">Total das Férias:</span>
                        <span className="font-bold text-primary text-lg">
                          {formatCurrency(resultado.total_ferias)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Informações Legais */}
                <Card className="bg-gradient-card shadow-card animate-fade-in">
                  <CardHeader>
                    <CardTitle>Informações Importantes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• O período de férias é de 30 dias corridos para quem trabalhou 12 meses</li>
                      <li>• O 1/3 constitucional é garantido pela Constituição Federal</li>
                      <li>• Férias proporcionais são calculadas com base nos meses trabalhados</li>
                      <li>• O pagamento deve ser feito até 2 dias antes do início das férias</li>
                      <li>• Este cálculo é uma estimativa baseada no salário bruto</li>
                    </ul>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="bg-gradient-card shadow-card">
                <CardContent className="p-12 text-center">
                  <Sun className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Aguardando Cálculo
                  </h3>
                  <p className="text-muted-foreground">
                    Informe o salário base e meses trabalhados para calcular suas férias.
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