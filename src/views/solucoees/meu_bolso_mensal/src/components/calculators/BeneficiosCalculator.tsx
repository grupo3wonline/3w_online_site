import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Calculator, Coffee, Car, Heart, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BeneficiosCalculatorProps {
  onBack: () => void;
}

interface BeneficiosResult {
  salario_base: number;
  vale_transporte_desc: number;
  vale_alimentacao: number;
  vale_refeicao: number;
  plano_saude_desc: number;
  plano_odonto_desc: number;
  seguro_vida: number;
  auxilio_creche: number;
  auxilio_educacao: number;
  desconto_total: number;
  beneficios_total: number;
  salario_liquido_beneficios: number;
  valor_total_beneficios_empresa: number;
}

export default function BeneficiosCalculator({ onBack }: BeneficiosCalculatorProps) {
  const [salarioBase, setSalarioBase] = useState("");
  const [temValeTransporte, setTemValeTransporte] = useState(false);
  const [valorTransporteDiario, setValorTransporteDiario] = useState("");
  const [temValeAlimentacao, setTemValeAlimentacao] = useState(false);
  const [valorValeAlimentacao, setValorValeAlimentacao] = useState("");
  const [temValeRefeicao, setTemValeRefeicao] = useState(false);
  const [valorValeRefeicao, setValorValeRefeicao] = useState("");
  const [temPlanoSaude, setTemPlanoSaude] = useState(false);
  const [valorPlanoSaude, setValorPlanoSaude] = useState("");
  const [temPlanoOdonto, setTemPlanoOdonto] = useState(false);
  const [valorPlanoOdonto, setValorPlanoOdonto] = useState("");
  const [temSeguroVida, setTemSeguroVida] = useState(false);
  const [valorSeguroVida, setValorSeguroVida] = useState("");
  const [temAuxilioCreche, setTemAuxilioCreche] = useState(false);
  const [valorAuxilioCreche, setValorAuxilioCreche] = useState("");
  const [temAuxilioEducacao, setTemAuxilioEducacao] = useState(false);
  const [valorAuxilioEducacao, setValorAuxilioEducacao] = useState("");
  const [resultado, setResultado] = useState<BeneficiosResult | null>(null);
  const { toast } = useToast();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calcularBeneficios = () => {
    if (!salarioBase) {
      toast({
        title: "Erro",
        description: "Informe o salário base",
        variant: "destructive"
      });
      return;
    }

    const salario = parseFloat(salarioBase.replace(',', '.'));
    
    if (salario <= 0) {
      toast({
        title: "Erro",
        description: "Informe um salário válido",
        variant: "destructive"
      });
      return;
    }

    // Cálculo do Vale Transporte (desconto máximo de 6% do salário)
    let valeTransporteDesc = 0;
    let valeTransporteTotal = 0;
    if (temValeTransporte && valorTransporteDiario) {
      const valorDiario = parseFloat(valorTransporteDiario.replace(',', '.'));
      valeTransporteTotal = valorDiario * 22; // 22 dias úteis
      const descontoMaximo = salario * 0.06;
      valeTransporteDesc = Math.min(valeTransporteTotal, descontoMaximo);
    }

    // Vale Alimentação e Refeição (geralmente sem desconto)
    const valeAlimentacao = temValeAlimentacao && valorValeAlimentacao ? 
      parseFloat(valorValeAlimentacao.replace(',', '.')) : 0;
    const valeRefeicao = temValeRefeicao && valorValeRefeicao ? 
      parseFloat(valorValeRefeicao.replace(',', '.')) : 0;

    // Planos de Saúde e Odontológico
    const planoSaudeDesc = temPlanoSaude && valorPlanoSaude ? 
      parseFloat(valorPlanoSaude.replace(',', '.')) : 0;
    const planoOdontoDesc = temPlanoOdonto && valorPlanoOdonto ? 
      parseFloat(valorPlanoOdonto.replace(',', '.')) : 0;

    // Seguro de Vida
    const seguroVida = temSeguroVida && valorSeguroVida ? 
      parseFloat(valorSeguroVida.replace(',', '.')) : 0;

    // Auxílios
    const auxilioCreche = temAuxilioCreche && valorAuxilioCreche ? 
      parseFloat(valorAuxilioCreche.replace(',', '.')) : 0;
    const auxilioEducacao = temAuxilioEducacao && valorAuxilioEducacao ? 
      parseFloat(valorAuxilioEducacao.replace(',', '.')) : 0;

    // Total de descontos
    const descontoTotal = valeTransporteDesc + planoSaudeDesc + planoOdontoDesc + seguroVida;

    // Total de benefícios recebidos (sem desconto)
    const beneficiosTotal = valeAlimentacao + valeRefeicao + auxilioCreche + auxilioEducacao;

    // Valor total dos benefícios para a empresa
    const valorTotalBeneficiosEmpresa = valeTransporteTotal + valeAlimentacao + valeRefeicao + 
      planoSaudeDesc * 2 + planoOdontoDesc * 2 + seguroVida + auxilioCreche + auxilioEducacao;

    // Salário líquido considerando benefícios
    const salarioLiquidoBeneficios = salario - descontoTotal;

    const resultado: BeneficiosResult = {
      salario_base: salario,
      vale_transporte_desc: valeTransporteDesc,
      vale_alimentacao: valeAlimentacao,
      vale_refeicao: valeRefeicao,
      plano_saude_desc: planoSaudeDesc,
      plano_odonto_desc: planoOdontoDesc,
      seguro_vida: seguroVida,
      auxilio_creche: auxilioCreche,
      auxilio_educacao: auxilioEducacao,
      desconto_total: descontoTotal,
      beneficios_total: beneficiosTotal,
      salario_liquido_beneficios: salarioLiquidoBeneficios,
      valor_total_beneficios_empresa: valorTotalBeneficiosEmpresa
    };

    setResultado(resultado);
    
    toast({
      title: "Sucesso",
      description: "Cálculo de benefícios realizado com sucesso!"
    });
  };

  const limpar = () => {
    setSalarioBase("");
    setTemValeTransporte(false);
    setValorTransporteDiario("");
    setTemValeAlimentacao(false);
    setValorValeAlimentacao("");
    setTemValeRefeicao(false);
    setValorValeRefeicao("");
    setTemPlanoSaude(false);
    setValorPlanoSaude("");
    setTemPlanoOdonto(false);
    setValorPlanoOdonto("");
    setTemSeguroVida(false);
    setValorSeguroVida("");
    setTemAuxilioCreche(false);
    setValorAuxilioCreche("");
    setTemAuxilioEducacao(false);
    setValorAuxilioEducacao("");
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
              Calculadora de Benefícios
            </h1>
            <p className="text-lg text-muted-foreground">
              Calcule vale transporte, alimentação e outros benefícios
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Input Form */}
          <Card className="lg:col-span-1 bg-gradient-card shadow-card animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Calculator className="h-5 w-5" />
                Dados dos Benefícios
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

              {/* Vale Transporte */}
              <div className="space-y-3 p-4 rounded-lg bg-gradient-subtle">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="vt" 
                    checked={temValeTransporte}
                    onCheckedChange={(checked) => setTemValeTransporte(checked as boolean)}
                  />
                  <Label htmlFor="vt" className="font-semibold">Vale Transporte</Label>
                </div>
                {temValeTransporte && (
                  <div className="space-y-2">
                    <Label htmlFor="vt-valor">Valor Gasto por Dia (R$)</Label>
                    <Input
                      id="vt-valor"
                      type="text"
                      placeholder="Ex: 8,50"
                      value={valorTransporteDiario}
                      onChange={(e) => setValorTransporteDiario(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Desconto máximo de 6% do salário
                    </p>
                  </div>
                )}
              </div>

              {/* Vale Alimentação */}
              <div className="space-y-3 p-4 rounded-lg bg-gradient-subtle">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="va" 
                    checked={temValeAlimentacao}
                    onCheckedChange={(checked) => setTemValeAlimentacao(checked as boolean)}
                  />
                  <Label htmlFor="va" className="font-semibold">Vale Alimentação</Label>
                </div>
                {temValeAlimentacao && (
                  <div className="space-y-2">
                    <Label htmlFor="va-valor">Valor Mensal (R$)</Label>
                    <Input
                      id="va-valor"
                      type="text"
                      placeholder="Ex: 300,00"
                      value={valorValeAlimentacao}
                      onChange={(e) => setValorValeAlimentacao(e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* Vale Refeição */}
              <div className="space-y-3 p-4 rounded-lg bg-gradient-subtle">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="vr" 
                    checked={temValeRefeicao}
                    onCheckedChange={(checked) => setTemValeRefeicao(checked as boolean)}
                  />
                  <Label htmlFor="vr" className="font-semibold">Vale Refeição</Label>
                </div>
                {temValeRefeicao && (
                  <div className="space-y-2">
                    <Label htmlFor="vr-valor">Valor Mensal (R$)</Label>
                    <Input
                      id="vr-valor"
                      type="text"
                      placeholder="Ex: 400,00"
                      value={valorValeRefeicao}
                      onChange={(e) => setValorValeRefeicao(e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* Plano de Saúde */}
              <div className="space-y-3 p-4 rounded-lg bg-gradient-subtle">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="ps" 
                    checked={temPlanoSaude}
                    onCheckedChange={(checked) => setTemPlanoSaude(checked as boolean)}
                  />
                  <Label htmlFor="ps" className="font-semibold">Plano de Saúde</Label>
                </div>
                {temPlanoSaude && (
                  <div className="space-y-2">
                    <Label htmlFor="ps-valor">Desconto Mensal (R$)</Label>
                    <Input
                      id="ps-valor"
                      type="text"
                      placeholder="Ex: 150,00"
                      value={valorPlanoSaude}
                      onChange={(e) => setValorPlanoSaude(e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* Plano Odontológico */}
              <div className="space-y-3 p-4 rounded-lg bg-gradient-subtle">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="po" 
                    checked={temPlanoOdonto}
                    onCheckedChange={(checked) => setTemPlanoOdonto(checked as boolean)}
                  />
                  <Label htmlFor="po" className="font-semibold">Plano Odontológico</Label>
                </div>
                {temPlanoOdonto && (
                  <div className="space-y-2">
                    <Label htmlFor="po-valor">Desconto Mensal (R$)</Label>
                    <Input
                      id="po-valor"
                      type="text"
                      placeholder="Ex: 30,00"
                      value={valorPlanoOdonto}
                      onChange={(e) => setValorPlanoOdonto(e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* Seguro de Vida */}
              <div className="space-y-3 p-4 rounded-lg bg-gradient-subtle">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="sv" 
                    checked={temSeguroVida}
                    onCheckedChange={(checked) => setTemSeguroVida(checked as boolean)}
                  />
                  <Label htmlFor="sv" className="font-semibold">Seguro de Vida</Label>
                </div>
                {temSeguroVida && (
                  <div className="space-y-2">
                    <Label htmlFor="sv-valor">Desconto Mensal (R$)</Label>
                    <Input
                      id="sv-valor"
                      type="text"
                      placeholder="Ex: 15,00"
                      value={valorSeguroVida}
                      onChange={(e) => setValorSeguroVida(e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* Auxílio Creche */}
              <div className="space-y-3 p-4 rounded-lg bg-gradient-subtle">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="ac" 
                    checked={temAuxilioCreche}
                    onCheckedChange={(checked) => setTemAuxilioCreche(checked as boolean)}
                  />
                  <Label htmlFor="ac" className="font-semibold">Auxílio Creche</Label>
                </div>
                {temAuxilioCreche && (
                  <div className="space-y-2">
                    <Label htmlFor="ac-valor">Valor Mensal (R$)</Label>
                    <Input
                      id="ac-valor"
                      type="text"
                      placeholder="Ex: 200,00"
                      value={valorAuxilioCreche}
                      onChange={(e) => setValorAuxilioCreche(e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* Auxílio Educação */}
              <div className="space-y-3 p-4 rounded-lg bg-gradient-subtle">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="ae" 
                    checked={temAuxilioEducacao}
                    onCheckedChange={(checked) => setTemAuxilioEducacao(checked as boolean)}
                  />
                  <Label htmlFor="ae" className="font-semibold">Auxílio Educação</Label>
                </div>
                {temAuxilioEducacao && (
                  <div className="space-y-2">
                    <Label htmlFor="ae-valor">Valor Mensal (R$)</Label>
                    <Input
                      id="ae-valor"
                      type="text"
                      placeholder="Ex: 250,00"
                      value={valorAuxilioEducacao}
                      onChange={(e) => setValorAuxilioEducacao(e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={calcularBeneficios} 
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
                {/* Resumo dos Benefícios */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
                  <Card className="bg-gradient-card shadow-card">
                    <CardContent className="p-6 text-center">
                      <Coffee className="h-8 w-8 text-success mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Benefícios Recebidos</p>
                      <p className="text-2xl font-bold text-success">
                        {formatCurrency(resultado.beneficios_total)}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-card shadow-card">
                    <CardContent className="p-6 text-center">
                      <Car className="h-8 w-8 text-destructive mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Descontos</p>
                      <p className="text-2xl font-bold text-destructive">
                        {formatCurrency(resultado.desconto_total)}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-card shadow-elevated">
                    <CardContent className="p-6 text-center">
                      <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Custo Empresa</p>
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(resultado.valor_total_beneficios_empresa)}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Benefícios Recebidos */}
                <Card className="bg-gradient-card shadow-card animate-fade-in">
                  <CardHeader>
                    <CardTitle>Benefícios Recebidos (Sem Desconto)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resultado.vale_alimentacao > 0 && (
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                        <span className="text-muted-foreground">Vale Alimentação:</span>
                        <span className="font-semibold text-success">
                          {formatCurrency(resultado.vale_alimentacao)}
                        </span>
                      </div>
                    )}

                    {resultado.vale_refeicao > 0 && (
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                        <span className="text-muted-foreground">Vale Refeição:</span>
                        <span className="font-semibold text-success">
                          {formatCurrency(resultado.vale_refeicao)}
                        </span>
                      </div>
                    )}

                    {resultado.auxilio_creche > 0 && (
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                        <span className="text-muted-foreground">Auxílio Creche:</span>
                        <span className="font-semibold text-success">
                          {formatCurrency(resultado.auxilio_creche)}
                        </span>
                      </div>
                    )}

                    {resultado.auxilio_educacao > 0 && (
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                        <span className="text-muted-foreground">Auxílio Educação:</span>
                        <span className="font-semibold text-success">
                          {formatCurrency(resultado.auxilio_educacao)}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Descontos */}
                <Card className="bg-gradient-card shadow-card animate-fade-in">
                  <CardHeader>
                    <CardTitle>Descontos em Folha</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resultado.vale_transporte_desc > 0 && (
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                        <span className="text-muted-foreground">Vale Transporte:</span>
                        <span className="font-semibold text-destructive">
                          {formatCurrency(resultado.vale_transporte_desc)}
                        </span>
                      </div>
                    )}

                    {resultado.plano_saude_desc > 0 && (
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                        <span className="text-muted-foreground">Plano de Saúde:</span>
                        <span className="font-semibold text-destructive">
                          {formatCurrency(resultado.plano_saude_desc)}
                        </span>
                      </div>
                    )}

                    {resultado.plano_odonto_desc > 0 && (
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                        <span className="text-muted-foreground">Plano Odontológico:</span>
                        <span className="font-semibold text-destructive">
                          {formatCurrency(resultado.plano_odonto_desc)}
                        </span>
                      </div>
                    )}

                    {resultado.seguro_vida > 0 && (
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                        <span className="text-muted-foreground">Seguro de Vida:</span>
                        <span className="font-semibold text-destructive">
                          {formatCurrency(resultado.seguro_vida)}
                        </span>
                      </div>
                    )}

                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-destructive/10">
                        <span className="font-semibold text-foreground">Total de Descontos:</span>
                        <span className="font-bold text-destructive text-lg">
                          {formatCurrency(resultado.desconto_total)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Resumo Final */}
                <Card className="bg-gradient-card shadow-card animate-fade-in">
                  <CardHeader>
                    <CardTitle>Resumo Financeiro</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                      <span className="text-muted-foreground">Salário Base:</span>
                      <span className="font-semibold">{formatCurrency(resultado.salario_base)}</span>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-lg bg-destructive/10">
                      <span className="text-muted-foreground">(-) Descontos:</span>
                      <span className="font-semibold text-destructive">
                        {formatCurrency(resultado.desconto_total)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-lg bg-success/10">
                      <span className="text-muted-foreground">(+) Benefícios:</span>
                      <span className="font-semibold text-success">
                        {formatCurrency(resultado.beneficios_total)}
                      </span>
                    </div>

                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-primary/10">
                        <span className="font-semibold text-foreground">Salário + Benefícios:</span>
                        <span className="font-bold text-primary text-xl">
                          {formatCurrency(resultado.salario_liquido_beneficios + resultado.beneficios_total)}
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
                      <li>• Vale transporte: desconto máximo de 6% do salário</li>
                      <li>• Vales alimentação e refeição não sofrem descontos</li>
                      <li>• Auxílios creche e educação são isentos de IR e INSS</li>
                      <li>• Planos de saúde podem ter participação da empresa</li>
                      <li>• Consulte seu RH para valores exatos dos benefícios</li>
                    </ul>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="bg-gradient-card shadow-card">
                <CardContent className="p-12 text-center">
                  <GraduationCap className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Aguardando Cálculo
                  </h3>
                  <p className="text-muted-foreground">
                    Informe os dados dos benefícios para realizar o cálculo.
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