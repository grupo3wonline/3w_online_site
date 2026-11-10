import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Calculator, DollarSign, Clock, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FgtsCalculatorProps {
  onBack: () => void;
}

interface FgtsResult {
  salario_base: number;
  fgts_mensal: number;
  insalubridade: number;
  periculosidade: number;
  adicional_noturno: number;
  horas_extras: number;
  comissoes: number;
  gratificacoes: number;
  salario_total: number;
  fgts_total: number;
  fgts_anual: number;
}

export default function FgtsCalculator({ onBack }: FgtsCalculatorProps) {
  const [salarioBase, setSalarioBase] = useState("");
  const [temInsalubridade, setTemInsalubridade] = useState(false);
  const [grauInsalubridade, setGrauInsalubridade] = useState("20");
  const [temPericulosidade, setTemPericulosidade] = useState(false);
  const [horasExtras, setHorasExtras] = useState("");
  const [adicionalNoturno, setAdicionalNoturno] = useState("");
  const [comissoes, setComissoes] = useState("");
  const [gratificacoes, setGratificacoes] = useState("");
  const [resultado, setResultado] = useState<FgtsResult | null>(null);
  const { toast } = useToast();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calcularFgts = () => {
    if (!salarioBase) {
      toast({
        title: "Erro",
        description: "Informe o salário base",
        variant: "destructive"
      });
      return;
    }

    const salario = parseFloat(salarioBase.replace(',', '.'));
    const hExtras = horasExtras ? parseFloat(horasExtras.replace(',', '.')) : 0;
    const aNoturno = adicionalNoturno ? parseFloat(adicionalNoturno.replace(',', '.')) : 0;
    const comiss = comissoes ? parseFloat(comissoes.replace(',', '.')) : 0;
    const gratif = gratificacoes ? parseFloat(gratificacoes.replace(',', '.')) : 0;

    if (salario <= 0) {
      toast({
        title: "Erro",
        description: "Informe um salário válido",
        variant: "destructive"
      });
      return;
    }

    // Cálculo da insalubridade (sobre salário mínimo)
    const salarioMinimo = 1412; // 2024
    let valorInsalubridade = 0;
    if (temInsalubridade) {
      const percentualInsalubridade = parseInt(grauInsalubridade) / 100;
      valorInsalubridade = salarioMinimo * percentualInsalubridade;
    }

    // Cálculo da periculosidade (30% do salário base)
    let valorPericulosidade = 0;
    if (temPericulosidade) {
      valorPericulosidade = salario * 0.30;
    }

    // Nota: Insalubridade e periculosidade são excludentes (não cumulativos)
    const adicionalRisco = Math.max(valorInsalubridade, valorPericulosidade);

    // Salário total para cálculo do FGTS
    const salarioTotal = salario + adicionalRisco + hExtras + aNoturno + comiss + gratif;

    // FGTS: 8% sobre o salário total
    const fgtsMensal = salarioTotal * 0.08;
    const fgtsAnual = fgtsMensal * 12;

    const resultado: FgtsResult = {
      salario_base: salario,
      fgts_mensal: fgtsMensal,
      insalubridade: temInsalubridade ? valorInsalubridade : 0,
      periculosidade: temPericulosidade ? valorPericulosidade : 0,
      adicional_noturno: aNoturno,
      horas_extras: hExtras,
      comissoes: comiss,
      gratificacoes: gratif,
      salario_total: salarioTotal,
      fgts_total: fgtsMensal,
      fgts_anual: fgtsAnual
    };

    setResultado(resultado);
    
    toast({
      title: "Sucesso",
      description: "Cálculo de FGTS e adicionais realizado com sucesso!"
    });
  };

  const limpar = () => {
    setSalarioBase("");
    setTemInsalubridade(false);
    setGrauInsalubridade("20");
    setTemPericulosidade(false);
    setHorasExtras("");
    setAdicionalNoturno("");
    setComissoes("");
    setGratificacoes("");
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
              Calculadora de FGTS e Adicionais
            </h1>
            <p className="text-lg text-muted-foreground">
              Calcule FGTS, insalubridade, periculosidade e outros adicionais
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Input Form */}
          <Card className="lg:col-span-1 bg-gradient-card shadow-card animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Calculator className="h-5 w-5" />
                Dados Salariais
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

              {/* Insalubridade */}
              <div className="space-y-3 p-4 rounded-lg bg-gradient-subtle">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="insalubridade" 
                    checked={temInsalubridade}
                    onCheckedChange={(checked) => {
                      setTemInsalubridade(checked as boolean);
                      if (checked) setTemPericulosidade(false); // Excludentes
                    }}
                  />
                  <Label htmlFor="insalubridade" className="font-semibold">
                    Adicional de Insalubridade
                  </Label>
                </div>
                {temInsalubridade && (
                  <div className="space-y-2">
                    <Label htmlFor="grau">Grau de Insalubridade</Label>
                    <select 
                      id="grau"
                      value={grauInsalubridade}
                      onChange={(e) => setGrauInsalubridade(e.target.value)}
                      className="w-full p-2 border rounded-md bg-background"
                    >
                      <option value="10">Grau Mínimo (10%)</option>
                      <option value="20">Grau Médio (20%)</option>
                      <option value="40">Grau Máximo (40%)</option>
                    </select>
                    <p className="text-xs text-muted-foreground">
                      Calculado sobre o salário mínimo (R$ 1.412,00)
                    </p>
                  </div>
                )}
              </div>

              {/* Periculosidade */}
              <div className="space-y-3 p-4 rounded-lg bg-gradient-subtle">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="periculosidade" 
                    checked={temPericulosidade}
                    onCheckedChange={(checked) => {
                      setTemPericulosidade(checked as boolean);
                      if (checked) setTemInsalubridade(false); // Excludentes
                    }}
                  />
                  <Label htmlFor="periculosidade" className="font-semibold">
                    Adicional de Periculosidade (30%)
                  </Label>
                </div>
                {temPericulosidade && (
                  <p className="text-xs text-muted-foreground">
                    Calculado sobre o salário base (30%)
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="horas">Horas Extras (R$)</Label>
                <Input
                  id="horas"
                  type="text"
                  placeholder="Ex: 400,00"
                  value={horasExtras}
                  onChange={(e) => setHorasExtras(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="noturno">Adicional Noturno (R$)</Label>
                <Input
                  id="noturno"
                  type="text"
                  placeholder="Ex: 200,00"
                  value={adicionalNoturno}
                  onChange={(e) => setAdicionalNoturno(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="comissoes">Comissões (R$)</Label>
                <Input
                  id="comissoes"
                  type="text"
                  placeholder="Ex: 500,00"
                  value={comissoes}
                  onChange={(e) => setComissoes(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gratificacoes">Gratificações (R$)</Label>
                <Input
                  id="gratificacoes"
                  type="text"
                  placeholder="Ex: 300,00"
                  value={gratificacoes}
                  onChange={(e) => setGratificacoes(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={calcularFgts} 
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
                {/* Resumo do FGTS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
                  <Card className="bg-gradient-card shadow-card">
                    <CardContent className="p-6 text-center">
                      <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">FGTS Mensal</p>
                      <p className="text-2xl font-bold text-success">
                        {formatCurrency(resultado.fgts_mensal)}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-card shadow-card">
                    <CardContent className="p-6 text-center">
                      <Calculator className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">FGTS Anual</p>
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(resultado.fgts_anual)}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-card shadow-elevated">
                    <CardContent className="p-6 text-center">
                      <DollarSign className="h-8 w-8 text-success mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Salário Total</p>
                      <p className="text-2xl font-bold text-success">
                        {formatCurrency(resultado.salario_total)}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Detalhamento Salarial */}
                <Card className="bg-gradient-card shadow-card animate-fade-in">
                  <CardHeader>
                    <CardTitle>Composição Salarial</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                      <span className="text-muted-foreground">Salário Base:</span>
                      <span className="font-semibold">{formatCurrency(resultado.salario_base)}</span>
                    </div>

                    {resultado.insalubridade > 0 && (
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                        <span className="text-muted-foreground">
                          Insalubridade ({grauInsalubridade}%):
                        </span>
                        <span className="font-semibold text-success">
                          {formatCurrency(resultado.insalubridade)}
                        </span>
                      </div>
                    )}

                    {resultado.periculosidade > 0 && (
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                        <span className="text-muted-foreground">Periculosidade (30%):</span>
                        <span className="font-semibold text-success">
                          {formatCurrency(resultado.periculosidade)}
                        </span>
                      </div>
                    )}

                    {resultado.horas_extras > 0 && (
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                        <span className="text-muted-foreground">Horas Extras:</span>
                        <span className="font-semibold text-success">
                          {formatCurrency(resultado.horas_extras)}
                        </span>
                      </div>
                    )}

                    {resultado.adicional_noturno > 0 && (
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                        <span className="text-muted-foreground">Adicional Noturno:</span>
                        <span className="font-semibold text-success">
                          {formatCurrency(resultado.adicional_noturno)}
                        </span>
                      </div>
                    )}

                    {resultado.comissoes > 0 && (
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                        <span className="text-muted-foreground">Comissões:</span>
                        <span className="font-semibold text-success">
                          {formatCurrency(resultado.comissoes)}
                        </span>
                      </div>
                    )}

                    {resultado.gratificacoes > 0 && (
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                        <span className="text-muted-foreground">Gratificações:</span>
                        <span className="font-semibold text-success">
                          {formatCurrency(resultado.gratificacoes)}
                        </span>
                      </div>
                    )}

                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-primary/10">
                        <span className="font-semibold text-foreground">Salário Total:</span>
                        <span className="font-bold text-primary text-lg">
                          {formatCurrency(resultado.salario_total)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cálculo do FGTS */}
                <Card className="bg-gradient-card shadow-card animate-fade-in">
                  <CardHeader>
                    <CardTitle>Detalhamento do FGTS</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Cálculo Mensal:</h4>
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            Base de cálculo: <span className="font-semibold text-foreground">
                              {formatCurrency(resultado.salario_total)}
                            </span>
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Alíquota FGTS: <span className="font-semibold text-foreground">8%</span>
                          </p>
                          <p className="text-lg text-foreground">
                            FGTS Mensal: <span className="font-bold text-success">
                              {formatCurrency(resultado.fgts_mensal)}
                            </span>
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Projeção Anual:</h4>
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            FGTS em 12 meses: <span className="font-semibold text-foreground">
                              {formatCurrency(resultado.fgts_anual)}
                            </span>
                          </p>
                          <p className="text-sm text-muted-foreground">
                            FGTS em 5 anos: <span className="font-semibold text-foreground">
                              {formatCurrency(resultado.fgts_anual * 5)}
                            </span>
                          </p>
                          <p className="text-sm text-muted-foreground">
                            FGTS em 10 anos: <span className="font-semibold text-foreground">
                              {formatCurrency(resultado.fgts_anual * 10)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Aviso sobre Conflitos */}
                {(temInsalubridade && temPericulosidade) && (
                  <Card className="bg-gradient-card shadow-card border-warning animate-fade-in">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-warning">
                        <AlertTriangle className="h-5 w-5" />
                        Atenção: Adicionais Excludentes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Insalubridade e periculosidade são adicionais excludentes (não podem ser pagos cumulativamente). 
                        Este cálculo considerou apenas o maior valor entre eles: <strong>
                          {resultado.periculosidade > resultado.insalubridade ? 'Periculosidade' : 'Insalubridade'}
                        </strong>.
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Informações Legais */}
                <Card className="bg-gradient-card shadow-card animate-fade-in">
                  <CardHeader>
                    <CardTitle>Informações Importantes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• O FGTS é calculado sobre 8% da remuneração total do trabalhador</li>
                      <li>• Insalubridade e periculosidade são excludentes (não cumulativos)</li>
                      <li>• Adicional de insalubridade é calculado sobre o salário mínimo</li>
                      <li>• Adicional de periculosidade é calculado sobre o salário base (30%)</li>
                      <li>• Horas extras, comissões e gratificações compõem a base do FGTS</li>
                      <li>• O empregador deposita o FGTS até o dia 7 do mês seguinte</li>
                      <li>• Consulte a CLT para detalhes sobre cada tipo de adicional</li>
                    </ul>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="bg-gradient-card shadow-card">
                <CardContent className="p-12 text-center">
                  <Calculator className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Aguardando Cálculo
                  </h3>
                  <p className="text-muted-foreground">
                    Informe os dados salariais para calcular o FGTS e adicionais.
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