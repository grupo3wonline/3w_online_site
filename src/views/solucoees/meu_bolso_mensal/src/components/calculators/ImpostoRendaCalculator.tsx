import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Receipt, DollarSign, Calculator, TrendingDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImpostoRendaCalculatorProps {
  onBack: () => void;
}

interface ImpostoRendaResult {
  salario_bruto: number;
  dependentes: number;
  base_calculo: number;
  desconto_inss: number;
  deducao_dependentes: number;
  deducao_total: number;
  faixa_tributacao: string;
  aliquota: number;
  imposto_devido: number;
  parcela_deduzir: number;
  imposto_liquido: number;
  salario_liquido: number;
}

export default function ImpostoRendaCalculator({ onBack }: ImpostoRendaCalculatorProps) {
  const [salarioBruto, setSalarioBruto] = useState("");
  const [numeroDependentes, setNumeroDependentes] = useState("0");
  const [outrasDeducoes, setOutrasDeducoes] = useState("");
  const [resultado, setResultado] = useState<ImpostoRendaResult | null>(null);
  const { toast } = useToast();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calcularINSS = (salario: number) => {
    // Tabela INSS 2024
    if (salario <= 1412) return salario * 0.075;
    if (salario <= 2666.68) return salario * 0.09;
    if (salario <= 4000.03) return salario * 0.12;
    if (salario <= 7786.02) return salario * 0.14;
    return 1090.04; // Teto INSS
  };

  const calcularImpostoRenda = () => {
    if (!salarioBruto) {
      toast({
        title: "Erro",
        description: "Informe o salário bruto",
        variant: "destructive"
      });
      return;
    }

    const salario = parseFloat(salarioBruto.replace(',', '.'));
    const dependentes = parseInt(numeroDependentes);
    const outrasDeducoesSomaadas = outrasDeducoes ? parseFloat(outrasDeducoes.replace(',', '.')) : 0;

    if (salario <= 0) {
      toast({
        title: "Erro",
        description: "Informe um salário válido",
        variant: "destructive"
      });
      return;
    }

    // Cálculo do INSS
    const descontoINSS = calcularINSS(salario);

    // Dedução por dependentes (R$ 189,59 por dependente em 2024)
    const deducaoDependentes = dependentes * 189.59;

    // Base de cálculo do IR
    const baseCalculo = salario - descontoINSS - deducaoDependentes - outrasDeducoesSomaadas;

    // Tabela do Imposto de Renda 2024
    let aliquota = 0;
    let parcelaDedurir = 0;
    let faixaTributacao = "";

    if (baseCalculo <= 2112) {
      aliquota = 0;
      parcelaDedurir = 0;
      faixaTributacao = "Isento";
    } else if (baseCalculo <= 2826.65) {
      aliquota = 7.5;
      parcelaDedurir = 158.40;
      faixaTributacao = "7,5%";
    } else if (baseCalculo <= 3751.05) {
      aliquota = 15;
      parcelaDedurir = 370.40;
      faixaTributacao = "15%";
    } else if (baseCalculo <= 4664.68) {
      aliquota = 22.5;
      parcelaDedurir = 651.73;
      faixaTributacao = "22,5%";
    } else {
      aliquota = 27.5;
      parcelaDedurir = 884.96;
      faixaTributacao = "27,5%";
    }

    // Cálculo do imposto
    const impostoDevido = baseCalculo > 2112 ? (baseCalculo * (aliquota / 100)) : 0;
    const impostoLiquido = Math.max(0, impostoDevido - parcelaDedurir);
    const salarioLiquido = salario - descontoINSS - impostoLiquido;

    const resultado: ImpostoRendaResult = {
      salario_bruto: salario,
      dependentes: dependentes,
      base_calculo: Math.max(0, baseCalculo),
      desconto_inss: descontoINSS,
      deducao_dependentes: deducaoDependentes,
      deducao_total: deducaoDependentes + outrasDeducoesSomaadas,
      faixa_tributacao: faixaTributacao,
      aliquota: aliquota,
      imposto_devido: impostoDevido,
      parcela_deduzir: parcelaDedurir,
      imposto_liquido: impostoLiquido,
      salario_liquido: salarioLiquido
    };

    setResultado(resultado);
    
    toast({
      title: "Sucesso",
      description: "Cálculo do Imposto de Renda realizado com sucesso!"
    });
  };

  const limpar = () => {
    setSalarioBruto("");
    setNumeroDependentes("0");
    setOutrasDeducoes("");
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
              Calculadora de Imposto de Renda
            </h1>
            <p className="text-lg text-muted-foreground">
              Calcule o desconto do IR sobre o salário
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Input Form */}
          <Card className="lg:col-span-1 bg-gradient-card shadow-card animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Receipt className="h-5 w-5" />
                Dados para Cálculo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="salario">Salário Bruto (R$)</Label>
                <Input
                  id="salario"
                  type="text"
                  placeholder="Ex: 5000,00"
                  value={salarioBruto}
                  onChange={(e) => setSalarioBruto(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dependentes">Número de Dependentes</Label>
                <Select value={numeroDependentes} onValueChange={setNumeroDependentes}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(11)].map((_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {i} {i === 1 ? 'dependente' : 'dependentes'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  R$ 189,59 de dedução por dependente
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="outras">Outras Deduções (R$)</Label>
                <Input
                  id="outras"
                  type="text"
                  placeholder="Ex: 300,00"
                  value={outrasDeducoes}
                  onChange={(e) => setOutrasDeducoes(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Previdência privada, pensão alimentícia, etc.
                </p>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={calcularImpostoRenda} 
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
                {/* Resumo Principal */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
                  <Card className="bg-gradient-card shadow-card">
                    <CardContent className="p-6 text-center">
                      <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Salário Bruto</p>
                      <p className="text-xl font-bold text-foreground">
                        {formatCurrency(resultado.salario_bruto)}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-card shadow-card">
                    <CardContent className="p-6 text-center">
                      <TrendingDown className="h-8 w-8 text-destructive mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">IR Descontado</p>
                      <p className="text-xl font-bold text-destructive">
                        {formatCurrency(resultado.imposto_liquido)}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-card shadow-elevated">
                    <CardContent className="p-6 text-center">
                      <DollarSign className="h-8 w-8 text-success mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Salário Líquido</p>
                      <p className="text-xl font-bold text-success">
                        {formatCurrency(resultado.salario_liquido)}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Faixa de Tributação */}
                <Card className="bg-gradient-card shadow-card animate-fade-in">
                  <CardHeader>
                    <CardTitle>Faixa de Tributação</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center p-6 rounded-lg bg-gradient-subtle">
                      <h3 className="text-2xl font-bold text-primary mb-2">
                        {resultado.faixa_tributacao}
                      </h3>
                      <p className="text-muted-foreground">
                        {resultado.aliquota === 0 ? 
                          'Você está isento do Imposto de Renda' : 
                          `Alíquota aplicada: ${resultado.aliquota}%`
                        }
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Base de cálculo: {formatCurrency(resultado.base_calculo)}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Detalhamento dos Cálculos */}
                <Card className="bg-gradient-card shadow-card animate-fade-in">
                  <CardHeader>
                    <CardTitle>Detalhamento dos Cálculos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                      <span className="text-muted-foreground">Salário Bruto:</span>
                      <span className="font-semibold">{formatCurrency(resultado.salario_bruto)}</span>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                      <span className="text-muted-foreground">(-) Desconto INSS:</span>
                      <span className="font-semibold text-destructive">
                        {formatCurrency(resultado.desconto_inss)}
                      </span>
                    </div>

                    {resultado.deducao_dependentes > 0 && (
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                        <span className="text-muted-foreground">
                          (-) Dependentes ({resultado.dependentes}):
                        </span>
                        <span className="font-semibold text-destructive">
                          {formatCurrency(resultado.deducao_dependentes)}
                        </span>
                      </div>
                    )}

                    {(resultado.deducao_total - resultado.deducao_dependentes) > 0 && (
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                        <span className="text-muted-foreground">(-) Outras Deduções:</span>
                        <span className="font-semibold text-destructive">
                          {formatCurrency(resultado.deducao_total - resultado.deducao_dependentes)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center p-3 rounded-lg bg-primary/10">
                      <span className="font-semibold text-foreground">Base de Cálculo IR:</span>
                      <span className="font-bold text-primary">
                        {formatCurrency(resultado.base_calculo)}
                      </span>
                    </div>

                    {resultado.imposto_liquido > 0 && (
                      <>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                          <span className="text-muted-foreground">Imposto Calculado ({resultado.aliquota}%):</span>
                          <span className="font-semibold">
                            {formatCurrency(resultado.imposto_devido)}
                          </span>
                        </div>

                        <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                          <span className="text-muted-foreground">(-) Parcela a Deduzir:</span>
                          <span className="font-semibold text-success">
                            {formatCurrency(resultado.parcela_deduzir)}
                          </span>
                        </div>

                        <div className="flex justify-between items-center p-3 rounded-lg bg-destructive/10">
                          <span className="font-semibold text-foreground">IR a Pagar:</span>
                          <span className="font-bold text-destructive text-lg">
                            {formatCurrency(resultado.imposto_liquido)}
                          </span>
                        </div>
                      </>
                    )}

                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-success/10">
                        <span className="font-semibold text-foreground">Salário Líquido:</span>
                        <span className="font-bold text-success text-lg">
                          {formatCurrency(resultado.salario_liquido)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tabela do IR */}
                <Card className="bg-gradient-card shadow-card animate-fade-in">
                  <CardHeader>
                    <CardTitle>Tabela do Imposto de Renda 2024</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Base de Cálculo (R$)</th>
                            <th className="text-left p-2">Alíquota</th>
                            <th className="text-left p-2">Parcela a Deduzir (R$)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className={`border-b ${resultado.base_calculo <= 2112 ? 'bg-primary/10' : ''}`}>
                            <td className="p-2">Até 2.112,00</td>
                            <td className="p-2">Isento</td>
                            <td className="p-2">0,00</td>
                          </tr>
                          <tr className={`border-b ${resultado.base_calculo > 2112 && resultado.base_calculo <= 2826.65 ? 'bg-primary/10' : ''}`}>
                            <td className="p-2">De 2.112,01 até 2.826,65</td>
                            <td className="p-2">7,5%</td>
                            <td className="p-2">158,40</td>
                          </tr>
                          <tr className={`border-b ${resultado.base_calculo > 2826.65 && resultado.base_calculo <= 3751.05 ? 'bg-primary/10' : ''}`}>
                            <td className="p-2">De 2.826,66 até 3.751,05</td>
                            <td className="p-2">15%</td>
                            <td className="p-2">370,40</td>
                          </tr>
                          <tr className={`border-b ${resultado.base_calculo > 3751.05 && resultado.base_calculo <= 4664.68 ? 'bg-primary/10' : ''}`}>
                            <td className="p-2">De 3.751,06 até 4.664,68</td>
                            <td className="p-2">22,5%</td>
                            <td className="p-2">651,73</td>
                          </tr>
                          <tr className={`${resultado.base_calculo > 4664.68 ? 'bg-primary/10' : ''}`}>
                            <td className="p-2">Acima de 4.664,68</td>
                            <td className="p-2">27,5%</td>
                            <td className="p-2">884,96</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Informações Importantes */}
                <Card className="bg-gradient-card shadow-card animate-fade-in">
                  <CardHeader>
                    <CardTitle>Informações Importantes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• O IR é calculado sobre a base de cálculo (salário - INSS - dependentes - deduções)</li>
                      <li>• Cada dependente deduz R$ 189,59 do imposto</li>
                      <li>• Contribuições para previdência privada podem ser deduzidas (até 12% da renda)</li>
                      <li>• Despesas médicas e educacionais também podem ser deduzidas na declaração anual</li>
                      <li>• Esta simulação considera apenas o cálculo mensal na fonte</li>
                      <li>• Para cálculos mais precisos, consulte um contador</li>
                    </ul>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="bg-gradient-card shadow-card">
                <CardContent className="p-12 text-center">
                  <Receipt className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Aguardando Cálculo
                  </h3>
                  <p className="text-muted-foreground">
                    Informe o salário bruto para calcular o Imposto de Renda.
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