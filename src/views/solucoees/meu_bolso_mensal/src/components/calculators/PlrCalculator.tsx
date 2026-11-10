import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calculator, TrendingUp, Users, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PlrCalculatorProps {
  onBack: () => void;
}

interface PlrResult {
  salario_base: number;
  meses_trabalhados: number;
  faltas_injustificadas: number;
  percentual_plr: number;
  valor_plr_bruto: number;
  ir_plr: number;
  valor_plr_liquido: number;
  valor_mensal_proporcional: number;
}

export default function PlrCalculator({ onBack }: PlrCalculatorProps) {
  const [salarioBase, setSalarioBase] = useState("");
  const [mesesTrabalhados, setMesesTrabalhados] = useState("12");
  const [faltasInjustificadas, setFaltasInjustificadas] = useState("0");
  const [percentualPlr, setPercentualPlr] = useState("100");
  const [resultado, setResultado] = useState<PlrResult | null>(null);
  const { toast } = useToast();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calcularIRPLR = (valorPLR: number) => {
    // PLR tem tabela específica de IR
    if (valorPLR <= 6677.55) {
      return 0;
    } else if (valorPLR <= 9922.28) {
      return valorPLR * 0.075;
    } else if (valorPLR <= 13167.00) {
      return valorPLR * 0.15;
    } else if (valorPLR <= 16380.38) {
      return valorPLR * 0.225;
    } else {
      return valorPLR * 0.275;
    }
  };

  const calcularPLR = () => {
    if (!salarioBase) {
      toast({
        title: "Erro",
        description: "Informe o salário base",
        variant: "destructive"
      });
      return;
    }

    const salario = parseFloat(salarioBase.replace(',', '.'));
    const meses = parseInt(mesesTrabalhados);
    const faltas = parseInt(faltasInjustificadas);
    const percentual = parseFloat(percentualPlr) / 100;

    if (salario <= 0 || meses <= 0 || meses > 12) {
      toast({
        title: "Erro",
        description: "Informe valores válidos",
        variant: "destructive"
      });
      return;
    }

    // Cálculo base da PLR (proporcional aos meses trabalhados)
    const valorBasePLR = salario * percentual;
    const valorProporcional = (valorBasePLR * meses) / 12;
    
    // Desconto por faltas injustificadas (cada falta desconta 1/30 do valor mensal)
    const descontoFaltas = (valorBasePLR / 30) * faltas;
    const valorPLRBruto = Math.max(0, valorProporcional - descontoFaltas);

    // Cálculo do IR sobre PLR
    const irPLR = calcularIRPLR(valorPLRBruto);
    const valorPLRLiquido = valorPLRBruto - irPLR;

    const resultado: PlrResult = {
      salario_base: salario,
      meses_trabalhados: meses,
      faltas_injustificadas: faltas,
      percentual_plr: parseFloat(percentualPlr),
      valor_plr_bruto: valorPLRBruto,
      ir_plr: irPLR,
      valor_plr_liquido: valorPLRLiquido,
      valor_mensal_proporcional: valorBasePLR
    };

    setResultado(resultado);
    
    toast({
      title: "Sucesso",
      description: "Cálculo de PLR realizado com sucesso!"
    });
  };

  const limpar = () => {
    setSalarioBase("");
    setMesesTrabalhados("12");
    setFaltasInjustificadas("0");
    setPercentualPlr("100");
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
              Calculadora de PLR
            </h1>
            <p className="text-lg text-muted-foreground">
              Calcule sua Participação nos Lucros e Resultados
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Input Form */}
          <Card className="lg:col-span-1 bg-gradient-card shadow-card animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Calculator className="h-5 w-5" />
                Dados para PLR
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
                <Label htmlFor="meses">Meses Trabalhados no Ano</Label>
                <select 
                  id="meses"
                  value={mesesTrabalhados}
                  onChange={(e) => setMesesTrabalhados(e.target.value)}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i + 1 === 1 ? 'mês' : 'meses'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="faltas">Faltas Injustificadas</Label>
                <Input
                  id="faltas"
                  type="number"
                  placeholder="Ex: 0"
                  value={faltasInjustificadas}
                  onChange={(e) => setFaltasInjustificadas(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Cada falta injustificada desconta 1/30 do valor mensal
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="percentual">Percentual da PLR (%)</Label>
                <select 
                  id="percentual"
                  value={percentualPlr}
                  onChange={(e) => setPercentualPlr(e.target.value)}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value="25">25% do salário</option>
                  <option value="50">50% do salário</option>
                  <option value="75">75% do salário</option>
                  <option value="100">100% do salário (1 salário)</option>
                  <option value="150">150% do salário</option>
                  <option value="200">200% do salário (2 salários)</option>
                </select>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={calcularPLR} 
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
                {/* Resumo da PLR */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
                  <Card className="bg-gradient-card shadow-card">
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">PLR Bruta</p>
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(resultado.valor_plr_bruto)}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-card shadow-card">
                    <CardContent className="p-6 text-center">
                      <Users className="h-8 w-8 text-destructive mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Imposto de Renda</p>
                      <p className="text-2xl font-bold text-destructive">
                        {formatCurrency(resultado.ir_plr)}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-card shadow-elevated">
                    <CardContent className="p-6 text-center">
                      <Gift className="h-8 w-8 text-success mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">PLR Líquida</p>
                      <p className="text-2xl font-bold text-success">
                        {formatCurrency(resultado.valor_plr_liquido)}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Detalhamento do Cálculo */}
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
                      <span className="text-muted-foreground">Percentual PLR:</span>
                      <span className="font-semibold">{resultado.percentual_plr}%</span>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                      <span className="text-muted-foreground">Valor Base Mensal:</span>
                      <span className="font-semibold">{formatCurrency(resultado.valor_mensal_proporcional)}</span>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                      <span className="text-muted-foreground">Meses Trabalhados:</span>
                      <span className="font-semibold">{resultado.meses_trabalhados} meses</span>
                    </div>

                    {resultado.faltas_injustificadas > 0 && (
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                        <span className="text-muted-foreground">Faltas Injustificadas:</span>
                        <span className="font-semibold text-destructive">
                          {resultado.faltas_injustificadas} faltas
                        </span>
                      </div>
                    )}

                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-primary/10">
                        <span className="font-semibold text-foreground">PLR Bruta:</span>
                        <span className="font-bold text-primary text-lg">
                          {formatCurrency(resultado.valor_plr_bruto)}
                        </span>
                      </div>
                    </div>

                    {resultado.ir_plr > 0 && (
                      <div className="flex justify-between items-center p-3 rounded-lg bg-destructive/10">
                        <span className="font-semibold text-foreground">Imposto de Renda:</span>
                        <span className="font-bold text-destructive">
                          {formatCurrency(resultado.ir_plr)}
                        </span>
                      </div>
                    )}

                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-success/10">
                        <span className="font-semibold text-foreground">PLR Líquida Final:</span>
                        <span className="font-bold text-success text-xl">
                          {formatCurrency(resultado.valor_plr_liquido)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Simulação de Parcelamento */}
                <Card className="bg-gradient-card shadow-card animate-fade-in">
                  <CardHeader>
                    <CardTitle>Simulação de Parcelamento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Pagamento em 2x:</h4>
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            1ª Parcela: <span className="font-semibold text-foreground">
                              {formatCurrency(resultado.valor_plr_liquido / 2)}
                            </span>
                          </p>
                          <p className="text-sm text-muted-foreground">
                            2ª Parcela: <span className="font-semibold text-foreground">
                              {formatCurrency(resultado.valor_plr_liquido / 2)}
                            </span>
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Pagamento à vista:</h4>
                        <div className="space-y-2">
                          <p className="text-lg text-foreground">
                            Valor Total: <span className="font-bold text-success">
                              {formatCurrency(resultado.valor_plr_liquido)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Informações Legais */}
                <Card className="bg-gradient-card shadow-card animate-fade-in">
                  <CardHeader>
                    <CardTitle>Informações Importantes sobre PLR</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• PLR não incide INSS, apenas Imposto de Renda</li>
                      <li>• Valor máximo anual de PLR: não há limite legal</li>
                      <li>• PLR deve ser paga até 28/02 do ano seguinte</li>
                      <li>• Faltas injustificadas reduzem proporcionalmente o valor</li>
                      <li>• PLR não integra o salário para nenhum efeito legal</li>
                      <li>• Consulte o acordo/convenção coletiva da sua categoria</li>
                    </ul>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="bg-gradient-card shadow-card">
                <CardContent className="p-12 text-center">
                  <Gift className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Aguardando Cálculo
                  </h3>
                  <p className="text-muted-foreground">
                    Informe os dados para calcular sua Participação nos Lucros e Resultados.
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