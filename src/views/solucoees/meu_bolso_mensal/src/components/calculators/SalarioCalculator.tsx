import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Calculator, DollarSign, TrendingUp, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SalarioCalculatorProps {
  onBack: () => void;
}

interface SalarioResult {
  salario_base: number;
  insalubridade: number;
  periculosidade: number;
  adicional_noturno: number;
  horas_extras: number;
  comissoes: number;
  gratificacoes: number;
  salario_bruto: number;
  inss: number;
  irrf: number;
  salario_liquido: number;
  descontos_totais: number;
  adicionais_totais: number;
}

export default function SalarioCalculator({ onBack }: SalarioCalculatorProps) {
  const [salarioBase, setSalarioBase] = useState("");
  const [temInsalubridade, setTemInsalubridade] = useState(false);
  const [grauInsalubridade, setGrauInsalubridade] = useState("20");
  const [temPericulosidade, setTemPericulosidade] = useState(false);
  const [horasExtras, setHorasExtras] = useState("");
  const [adicionalNoturno, setAdicionalNoturno] = useState("");
  const [comissoes, setComissoes] = useState("");
  const [gratificacoes, setGratificacoes] = useState("");
  const [dependentes, setDependentes] = useState("");
  const [resultado, setResultado] = useState<SalarioResult | null>(null);
  const { toast } = useToast();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calcularINSS = (salarioBruto: number) => {
    if (salarioBruto <= 1412) {
      return salarioBruto * 0.075;
    } else if (salarioBruto <= 2666.68) {
      return (1412 * 0.075) + ((salarioBruto - 1412) * 0.09);
    } else if (salarioBruto <= 4000.03) {
      return (1412 * 0.075) + ((2666.68 - 1412) * 0.09) + ((salarioBruto - 2666.68) * 0.12);
    } else if (salarioBruto <= 7786.02) {
      return (1412 * 0.075) + ((2666.68 - 1412) * 0.09) + ((4000.03 - 2666.68) * 0.12) + ((salarioBruto - 4000.03) * 0.14);
    } else {
      return 908.85; // Teto do INSS 2024
    }
  };

  const calcularIRRF = (salarioBruto: number, inss: number, dependentesQtd: number) => {
    const baseCalculo = salarioBruto - inss - (dependentesQtd * 189.59);
    
    if (baseCalculo <= 2112) {
      return 0;
    } else if (baseCalculo <= 2826.65) {
      return (baseCalculo * 0.075) - 158.40;
    } else if (baseCalculo <= 3751.05) {
      return (baseCalculo * 0.15) - 370.40;
    } else if (baseCalculo <= 4664.68) {
      return (baseCalculo * 0.225) - 651.73;
    } else {
      return (baseCalculo * 0.275) - 884.96;
    }
  };

  const calcularSalario = () => {
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
    const deps = dependentes ? parseInt(dependentes) : 0;

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

    // Nota: Insalubridade e periculosidade são excludentes
    const adicionalRisco = Math.max(valorInsalubridade, valorPericulosidade);
    const adicionaisTotais = adicionalRisco + hExtras + aNoturno + comiss + gratif;

    // Salário bruto
    const salarioBruto = salario + adicionaisTotais;

    // Cálculo dos descontos
    const valorINSS = calcularINSS(salarioBruto);
    const valorIRRF = Math.max(0, calcularIRRF(salarioBruto, valorINSS, deps));
    const descontosTotais = valorINSS + valorIRRF;

    // Salário líquido
    const salarioLiquido = salarioBruto - descontosTotais;

    const resultado: SalarioResult = {
      salario_base: salario,
      insalubridade: temInsalubridade ? valorInsalubridade : 0,
      periculosidade: temPericulosidade ? valorPericulosidade : 0,
      adicional_noturno: aNoturno,
      horas_extras: hExtras,
      comissoes: comiss,
      gratificacoes: gratif,
      salario_bruto: salarioBruto,
      inss: valorINSS,
      irrf: valorIRRF,
      salario_liquido: salarioLiquido,
      descontos_totais: descontosTotais,
      adicionais_totais: adicionaisTotais
    };

    setResultado(resultado);
    
    toast({
      title: "Sucesso",
      description: "Cálculo de salário realizado com sucesso!"
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
    setDependentes("");
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
              Calculadora de Salário
            </h1>
            <p className="text-lg text-muted-foreground">
              Calcule seu salário bruto e líquido com adicionais e descontos
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
                      if (checked) setTemPericulosidade(false);
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
                      if (checked) setTemInsalubridade(false);
                    }}
                  />
                  <Label htmlFor="periculosidade" className="font-semibold">
                    Adicional de Periculosidade (30%)
                  </Label>
                </div>
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

              <div className="space-y-2">
                <Label htmlFor="dependentes">Dependentes para IR</Label>
                <Input
                  id="dependentes"
                  type="number"
                  placeholder="Ex: 2"
                  value={dependentes}
                  onChange={(e) => setDependentes(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={calcularSalario} 
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
                {/* Resumo Financeiro */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
                  <Card className="bg-gradient-card shadow-card">
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Salário Bruto</p>
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(resultado.salario_bruto)}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-card shadow-card">
                    <CardContent className="p-6 text-center">
                      <Users className="h-8 w-8 text-destructive mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Descontos</p>
                      <p className="text-2xl font-bold text-destructive">
                        {formatCurrency(resultado.descontos_totais)}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-card shadow-elevated">
                    <CardContent className="p-6 text-center">
                      <DollarSign className="h-8 w-8 text-success mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Salário Líquido</p>
                      <p className="text-2xl font-bold text-success">
                        {formatCurrency(resultado.salario_liquido)}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Composição Salarial */}
                <Card className="bg-gradient-card shadow-card animate-fade-in">
                  <CardHeader>
                    <CardTitle>Composição do Salário Bruto</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                      <span className="text-muted-foreground">Salário Base:</span>
                      <span className="font-semibold">{formatCurrency(resultado.salario_base)}</span>
                    </div>

                    {resultado.insalubridade > 0 && (
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                        <span className="text-muted-foreground">Insalubridade:</span>
                        <span className="font-semibold text-success">
                          {formatCurrency(resultado.insalubridade)}
                        </span>
                      </div>
                    )}

                    {resultado.periculosidade > 0 && (
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                        <span className="text-muted-foreground">Periculosidade:</span>
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
                  </CardContent>
                </Card>

                {/* Descontos */}
                <Card className="bg-gradient-card shadow-card animate-fade-in">
                  <CardHeader>
                    <CardTitle>Descontos Obrigatórios</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                      <span className="text-muted-foreground">INSS:</span>
                      <span className="font-semibold text-destructive">
                        {formatCurrency(resultado.inss)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                      <span className="text-muted-foreground">Imposto de Renda:</span>
                      <span className="font-semibold text-destructive">
                        {formatCurrency(resultado.irrf)}
                      </span>
                    </div>

                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-destructive/10">
                        <span className="font-semibold text-foreground">Total de Descontos:</span>
                        <span className="font-bold text-destructive text-lg">
                          {formatCurrency(resultado.descontos_totais)}
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
                      <li>• Cálculos baseados na legislação vigente de 2024</li>
                      <li>• Insalubridade e periculosidade são excludentes</li>
                      <li>• INSS tem teto máximo de R$ 908,85</li>
                      <li>• Cada dependente deduz R$ 189,59 do IR</li>
                      <li>• Valores aproximados - consulte um contador para cálculos precisos</li>
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
                    Informe os dados salariais para calcular seu salário bruto e líquido.
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