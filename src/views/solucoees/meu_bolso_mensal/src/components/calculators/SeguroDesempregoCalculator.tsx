import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Shield, DollarSign, Calendar, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SeguroDesempregoCalculatorProps {
  onBack: () => void;
}

interface SeguroDesempregoResult {
  salario_base: number;
  tempo_trabalho_meses: number;
  tem_direito: boolean;
  numero_parcelas: number;
  valor_parcela: number;
  total_beneficio: number;
  parcelas_detalhadas: Array<{
    parcela: number;
    valor: number;
  }>;
}

export default function SeguroDesempregoCalculator({ onBack }: SeguroDesempregoCalculatorProps) {
  const [salarioBase, setSalarioBase] = useState("");
  const [tempoTrabalho, setTempoTrabalho] = useState("");
  const [vezesSeguro, setVezesSeguro] = useState("0");
  const [resultado, setResultado] = useState<SeguroDesempregoResult | null>(null);
  const { toast } = useToast();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calcularSeguroDesemprego = () => {
    if (!salarioBase || !tempoTrabalho) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive"
      });
      return;
    }

    const salario = parseFloat(salarioBase.replace(',', '.'));
    const meses = parseInt(tempoTrabalho);
    const vezes = parseInt(vezesSeguro);

    if (salario <= 0 || meses <= 0) {
      toast({
        title: "Erro",
        description: "Informe valores válidos maiores que zero",
        variant: "destructive"
      });
      return;
    }

    // Verificar direito ao seguro desemprego
    let temDireito = false;
    let numeroParcelas = 0;

    if (vezes === 0) {
      // Primeira vez
      if (meses >= 12) {
        temDireito = true;
        if (meses >= 24) numeroParcelas = 5;
        else if (meses >= 18) numeroParcelas = 4;
        else numeroParcelas = 3;
      }
    } else if (vezes === 1) {
      // Segunda vez
      if (meses >= 9) {
        temDireito = true;
        if (meses >= 18) numeroParcelas = 4;
        else if (meses >= 12) numeroParcelas = 3;
        else numeroParcelas = 2;
      }
    } else {
      // Terceira vez ou mais
      if (meses >= 6) {
        temDireito = true;
        numeroParcelas = meses >= 24 ? 5 : meses >= 12 ? 3 : 2;
      }
    }

    if (!temDireito) {
      setResultado({
        salario_base: salario,
        tempo_trabalho_meses: meses,
        tem_direito: false,
        numero_parcelas: 0,
        valor_parcela: 0,
        total_beneficio: 0,
        parcelas_detalhadas: []
      });

      toast({
        title: "Resultado",
        description: "Não há direito ao seguro desemprego com estes dados",
        variant: "destructive"
      });
      return;
    }

    // Calcular valor das parcelas (valores 2024)
    const salarioMinimo = 1412; // Salário mínimo 2024
    let valorParcela = 0;

    // Fórmula do seguro desemprego baseada na média salarial
    if (salario <= salarioMinimo * 1.5) {
      valorParcela = salario * 0.8; // 80% do salário
    } else if (salario <= salarioMinimo * 2.5) {
      valorParcela = (salarioMinimo * 1.5 * 0.8) + ((salario - salarioMinimo * 1.5) * 0.5);
    } else {
      valorParcela = (salarioMinimo * 1.5 * 0.8) + (salarioMinimo * 0.5);
    }

    // Limites mínimo e máximo
    valorParcela = Math.max(valorParcela, salarioMinimo);
    valorParcela = Math.min(valorParcela, 2313.74); // Teto 2024

    // Detalhamento das parcelas
    const parcelasDetalhadas = [];
    for (let i = 1; i <= numeroParcelas; i++) {
      parcelasDetalhadas.push({
        parcela: i,
        valor: valorParcela
      });
    }

    const resultado: SeguroDesempregoResult = {
      salario_base: salario,
      tempo_trabalho_meses: meses,
      tem_direito: true,
      numero_parcelas: numeroParcelas,
      valor_parcela: valorParcela,
      total_beneficio: valorParcela * numeroParcelas,
      parcelas_detalhadas: parcelasDetalhadas
    };

    setResultado(resultado);
    
    toast({
      title: "Sucesso",
      description: `Direito confirmado! ${numeroParcelas} parcelas disponíveis.`
    });
  };

  const limpar = () => {
    setSalarioBase("");
    setTempoTrabalho("");
    setVezesSeguro("0");
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
              Calculadora de Seguro Desemprego
            </h1>
            <p className="text-lg text-muted-foreground">
              Verifique seu direito e calcule os valores do seguro desemprego
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Input Form */}
          <Card className="lg:col-span-1 bg-gradient-card shadow-card animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Shield className="h-5 w-5" />
                Dados para Verificação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="salario">Último Salário (R$)</Label>
                <Input
                  id="salario"
                  type="text"
                  placeholder="Ex: 3000,00"
                  value={salarioBase}
                  onChange={(e) => setSalarioBase(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tempo">Tempo de Trabalho (meses)</Label>
                <Input
                  id="tempo"
                  type="number"
                  min="1"
                  placeholder="Ex: 18"
                  value={tempoTrabalho}
                  onChange={(e) => setTempoTrabalho(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Nos últimos 36 meses antes da demissão
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vezes">Quantas vezes já recebeu?</Label>
                <select 
                  id="vezes"
                  value={vezesSeguro}
                  onChange={(e) => setVezesSeguro(e.target.value)}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value="0">Primeira vez</option>
                  <option value="1">Segunda vez</option>
                  <option value="2">Terceira vez ou mais</option>
                </select>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={calcularSeguroDesemprego} 
                  className="flex-1 bg-gradient-primary hover:shadow-elevated transition-all duration-200"
                >
                  Verificar
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
                {resultado.tem_direito ? (
                  <>
                    {/* Status do Direito */}
                    <Card className="bg-gradient-card shadow-elevated animate-fade-in">
                      <CardContent className="p-8 text-center">
                        <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-success mb-2">
                          DIREITO CONFIRMADO!
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Você tem direito ao seguro desemprego
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Número de Parcelas</p>
                            <p className="text-2xl font-bold text-primary">{resultado.numero_parcelas}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Valor por Parcela</p>
                            <p className="text-2xl font-bold text-success">
                              {formatCurrency(resultado.valor_parcela)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Resumo do Benefício */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
                      <Card className="bg-gradient-card shadow-card">
                        <CardContent className="p-6 text-center">
                          <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Valor por Parcela</p>
                          <p className="text-xl font-bold text-success">
                            {formatCurrency(resultado.valor_parcela)}
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-card shadow-card">
                        <CardContent className="p-6 text-center">
                          <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Número de Parcelas</p>
                          <p className="text-xl font-bold text-foreground">
                            {resultado.numero_parcelas}
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-card shadow-elevated">
                        <CardContent className="p-6 text-center">
                          <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Total do Benefício</p>
                          <p className="text-xl font-bold text-primary">
                            {formatCurrency(resultado.total_beneficio)}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Cronograma de Parcelas */}
                    <Card className="bg-gradient-card shadow-card animate-fade-in">
                      <CardHeader>
                        <CardTitle>Cronograma de Pagamentos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {resultado.parcelas_detalhadas.map((parcela, index) => (
                            <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                              <span className="font-medium text-foreground">
                                {parcela.parcela}ª Parcela
                              </span>
                              <span className="font-bold text-success">
                                {formatCurrency(parcela.valor)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Como Solicitar */}
                    <Card className="bg-gradient-card shadow-card animate-fade-in">
                      <CardHeader>
                        <CardTitle>Como Solicitar o Seguro Desemprego</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-foreground mb-2">Documentos Necessários:</h4>
                            <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                              <li>• Carteira de Trabalho</li>
                              <li>• Termo de rescisão (TRCT)</li>
                              <li>• Documento de identidade</li>
                              <li>• CPF</li>
                              <li>• Comprovante de residência</li>
                              <li>• Extrato da conta do FGTS</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-foreground mb-2">Onde Solicitar:</h4>
                            <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                              <li>• Agências do SINE</li>
                              <li>• Superintendências Regionais do Trabalho</li>
                              <li>• Portal gov.br (online)</li>
                              <li>• App Carteira de Trabalho Digital</li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold text-foreground mb-2">Prazo:</h4>
                            <p className="text-sm text-muted-foreground ml-4">
                              • Solicitar entre 7 e 120 dias após a demissão
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <Card className="bg-gradient-card shadow-card">
                    <CardContent className="p-12 text-center">
                      <Shield className="h-16 w-16 mx-auto mb-4 text-destructive opacity-50" />
                      <h3 className="text-xl font-semibold text-destructive mb-2">
                        Sem Direito ao Benefício
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Com base nos dados informados, você não tem direito ao seguro desemprego.
                      </p>
                      <div className="text-sm text-muted-foreground">
                        <p><strong>Requisitos mínimos:</strong></p>
                        <ul className="mt-2 space-y-1">
                          <li>• Primeira vez: 12 meses trabalhados</li>
                          <li>• Segunda vez: 9 meses trabalhados</li>
                          <li>• Terceira vez ou mais: 6 meses trabalhados</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Informações Importantes */}
                <Card className="bg-gradient-card shadow-card animate-fade-in">
                  <CardHeader>
                    <CardTitle>Informações Importantes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• O seguro desemprego é um direito do trabalhador demitido sem justa causa</li>
                      <li>• Os valores são calculados com base na média dos últimos 3 salários</li>
                      <li>• Há limite mínimo (1 salário mínimo) e máximo para as parcelas</li>
                      <li>• É obrigatório comparecer mensalmente para recadastramento</li>
                      <li>• O benefício pode ser suspenso se recusar emprego compatível</li>
                      <li>• Este cálculo é uma estimativa baseada na legislação atual</li>
                    </ul>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="bg-gradient-card shadow-card">
                <CardContent className="p-12 text-center">
                  <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Verificação de Direito
                  </h3>
                  <p className="text-muted-foreground">
                    Informe seus dados para verificar se tem direito ao seguro desemprego.
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