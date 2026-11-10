import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Gift, DollarSign, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DecimoTerceiroCalculatorProps {
  onBack: () => void;
}

interface DecimoTerceiroResult {
  salario_base: number;
  meses_trabalhados: number;
  valor_bruto: number;
  desconto_inss: number;
  desconto_ir: number;
  valor_liquido: number;
  primeira_parcela: number;
  segunda_parcela: number;
}

export default function DecimoTerceiroCalculator({ onBack }: DecimoTerceiroCalculatorProps) {
  const [salarioBase, setSalarioBase] = useState("");
  const [mesesTrabalhados, setMesesTrabalhados] = useState("12");
  const [resultado, setResultado] = useState<DecimoTerceiroResult | null>(null);
  const { toast } = useToast();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calcularINSS = (salario: number) => {
    // Tabela INSS 2024 (simplificada)
    if (salario <= 1412) return salario * 0.075;
    if (salario <= 2666.68) return salario * 0.09;
    if (salario <= 4000.03) return salario * 0.12;
    if (salario <= 7786.02) return salario * 0.14;
    return 1090.04; // Teto INSS
  };

  const calcularIR = (salario: number, inss: number) => {
    const baseCalculo = salario - inss;
    // Tabela IR 2024 (simplificada)
    if (baseCalculo <= 2112) return 0;
    if (baseCalculo <= 2826.65) return baseCalculo * 0.075 - 158.40;
    if (baseCalculo <= 3751.05) return baseCalculo * 0.15 - 370.40;
    if (baseCalculo <= 4664.68) return baseCalculo * 0.225 - 651.73;
    return baseCalculo * 0.275 - 884.96;
  };

  const calcularDecimoTerceiro = () => {
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

    // Cálculo do 13º salário
    const valorBruto = (salario * meses) / 12;
    const descontoINSS = calcularINSS(valorBruto);
    const descontoIR = calcularIR(valorBruto, descontoINSS);
    const valorLiquido = valorBruto - descontoINSS - descontoIR;

    // Primeira parcela (50% do bruto, paga até 30/11)
    const primeiraParcela = valorBruto * 0.5;
    
    // Segunda parcela (resto após descontos, paga até 20/12)
    const segundaParcela = valorLiquido - primeiraParcela;

    const resultado: DecimoTerceiroResult = {
      salario_base: salario,
      meses_trabalhados: meses,
      valor_bruto: valorBruto,
      desconto_inss: descontoINSS,
      desconto_ir: descontoIR,
      valor_liquido: valorLiquido,
      primeira_parcela: primeiraParcela,
      segunda_parcela: segundaParcela
    };

    setResultado(resultado);
    
    toast({
      title: "Sucesso",
      description: "Cálculo do 13º salário realizado com sucesso!"
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
              Calculadora de 13º Salário
            </h1>
            <p className="text-lg text-muted-foreground">
              Calcule o valor do seu décimo terceiro salário
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Input Form */}
          <Card className="lg:col-span-1 bg-gradient-card shadow-card animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Gift className="h-5 w-5" />
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
                <Label htmlFor="meses">Meses Trabalhados no Ano</Label>
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
                  Meses trabalhados no ano corrente (1-12)
                </p>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={calcularDecimoTerceiro} 
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
                      <p className="text-sm text-muted-foreground">Valor Bruto</p>
                      <p className="text-xl font-bold text-foreground">
                        {formatCurrency(resultado.valor_bruto)}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-card shadow-card">
                    <CardContent className="p-6 text-center">
                      <Calendar className="h-8 w-8 text-destructive mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Total Descontos</p>
                      <p className="text-xl font-bold text-destructive">
                        {formatCurrency(resultado.desconto_inss + resultado.desconto_ir)}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-card shadow-elevated">
                    <CardContent className="p-6 text-center">
                      <Gift className="h-8 w-8 text-success mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Valor Líquido</p>
                      <p className="text-xl font-bold text-success">
                        {formatCurrency(resultado.valor_liquido)}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Parcelas */}
                <Card className="bg-gradient-card shadow-card animate-fade-in">
                  <CardHeader>
                    <CardTitle>Forma de Pagamento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 rounded-lg bg-gradient-subtle">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">1</span>
                          Primeira Parcela
                        </h4>
                        <p className="text-2xl font-bold text-success mb-2">
                          {formatCurrency(resultado.primeira_parcela)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Pagamento até 30 de Novembro
                        </p>
                        <p className="text-xs text-muted-foreground">
                          (50% do valor bruto, sem descontos)
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-gradient-subtle">
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">2</span>
                          Segunda Parcela
                        </h4>
                        <p className="text-2xl font-bold text-success mb-2">
                          {formatCurrency(resultado.segunda_parcela)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Pagamento até 20 de Dezembro
                        </p>
                        <p className="text-xs text-muted-foreground">
                          (Saldo após descontos)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Detalhamento dos Descontos */}
                <Card className="bg-gradient-card shadow-card animate-fade-in">
                  <CardHeader>
                    <CardTitle>Detalhamento dos Descontos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                      <span className="text-muted-foreground">13º Salário Bruto:</span>
                      <span className="font-semibold">{formatCurrency(resultado.valor_bruto)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                      <span className="text-muted-foreground">(-) Desconto INSS:</span>
                      <span className="font-semibold text-destructive">
                        {formatCurrency(resultado.desconto_inss)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                      <span className="text-muted-foreground">(-) Desconto IR:</span>
                      <span className="font-semibold text-destructive">
                        {formatCurrency(resultado.desconto_ir)}
                      </span>
                    </div>

                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-success/10">
                        <span className="font-semibold text-foreground">13º Salário Líquido:</span>
                        <span className="font-bold text-success text-lg">
                          {formatCurrency(resultado.valor_liquido)}
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
                      <li>• O 13º salário é pago em duas parcelas por lei</li>
                      <li>• A primeira parcela deve ser paga até 30 de novembro</li>
                      <li>• A segunda parcela deve ser paga até 20 de dezembro</li>
                      <li>• Descontos de INSS e IR incidem apenas na segunda parcela</li>
                      <li>• Valores proporcionais para quem trabalhou menos de 12 meses</li>
                      <li>• Este cálculo é uma estimativa baseada nas tabelas atuais</li>
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
                    Informe o salário base e meses trabalhados para calcular o 13º salário.
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