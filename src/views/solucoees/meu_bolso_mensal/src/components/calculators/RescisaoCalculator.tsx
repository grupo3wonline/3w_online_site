import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, FileX, DollarSign, Calendar, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RescisaoCalculatorProps {
  onBack: () => void;
}

interface RescisaoResult {
  salario_base: number;
  tempo_trabalho_meses: number;
  tipo_rescisao: string;
  aviso_previo: number;
  ferias_vencidas: number;
  ferias_proporcionais: number;
  decimo_terceiro: number;
  fgts_saldo: number;
  multa_fgts: number;
  seguro_desemprego: boolean;
  total_rescisao: number;
}

export default function RescisaoCalculator({ onBack }: RescisaoCalculatorProps) {
  const [salarioBase, setSalarioBase] = useState("");
  const [tempoTrabalhoMeses, setTempoTrabalhoMeses] = useState("");
  const [tipoRescisao, setTipoRescisao] = useState("");
  const [feriasVencidas, setFeriasVencidas] = useState("0");
  const [resultado, setResultado] = useState<RescisaoResult | null>(null);
  const { toast } = useToast();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calcularRescisao = () => {
    if (!salarioBase || !tempoTrabalhoMeses || !tipoRescisao) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const salario = parseFloat(salarioBase.replace(',', '.'));
    const tempoMeses = parseInt(tempoTrabalhoMeses);
    const feriasVenc = parseInt(feriasVencidas);

    if (salario <= 0 || tempoMeses <= 0) {
      toast({
        title: "Erro",
        description: "Informe valores válidos maiores que zero",
        variant: "destructive"
      });
      return;
    }

    // Cálculos baseados no tipo de rescisão
    let avisoPrevio = 0;
    let feriasProporcionais = 0;
    let decimoTerceiro = 0;
    let fgtsSaldo = 0;
    let multaFgts = 0;
    let seguroDesemprego = false;

    // Aviso prévio (30 dias + 3 dias por ano trabalhado, máximo 90 dias)
    const anosCompletos = Math.floor(tempoMeses / 12);
    const diasAvisoPrevio = Math.min(30 + (anosCompletos * 3), 90);
    
    // FGTS (8% do salário x meses trabalhados)
    fgtsSaldo = salario * 0.08 * tempoMeses;

    // 13º proporcional
    const mesesAtual = new Date().getMonth() + 1;
    decimoTerceiro = (salario * mesesAtual) / 12;

    // Férias proporcionais (últimos 12 meses)
    const mesesFerias = tempoMeses >= 12 ? 12 : tempoMeses;
    feriasProporcionais = (salario * mesesFerias) / 12 + ((salario * mesesFerias) / 12) / 3; // com 1/3

    switch (tipoRescisao) {
      case "demissao-sem-justa-causa":
        avisoPrevio = (salario / 30) * diasAvisoPrevio;
        multaFgts = fgtsSaldo * 0.4; // 40% de multa
        seguroDesemprego = tempoMeses >= 12;
        break;
      
      case "pedido-demissao":
        // Sem aviso prévio, sem multa FGTS, sem seguro desemprego
        break;
      
      case "demissao-justa-causa":
        // Apenas saldo de salário e férias vencidas
        feriasProporcionais = 0;
        decimoTerceiro = 0;
        break;
      
      case "acordo-mutuo":
        avisoPrevio = (salario / 30) * diasAvisoPrevio * 0.5; // 50% do aviso prévio
        multaFgts = fgtsSaldo * 0.2; // 20% de multa
        break;
      
      case "termino-contrato":
        // Contrato determinado - sem aviso prévio e multa FGTS
        break;
    }

    // Férias vencidas (com 1/3)
    const feriasVencidasValor = feriasVenc > 0 ? salario + (salario / 3) : 0;

    const totalRescisao = avisoPrevio + feriasVencidasValor + feriasProporcionais + 
                         decimoTerceiro + fgtsSaldo + multaFgts;

    const resultado: RescisaoResult = {
      salario_base: salario,
      tempo_trabalho_meses: tempoMeses,
      tipo_rescisao: tipoRescisao,
      aviso_previo: avisoPrevio,
      ferias_vencidas: feriasVencidasValor,
      ferias_proporcionais: feriasProporcionais,
      decimo_terceiro: decimoTerceiro,
      fgts_saldo: fgtsSaldo,
      multa_fgts: multaFgts,
      seguro_desemprego: seguroDesemprego,
      total_rescisao: totalRescisao
    };

    setResultado(resultado);
    
    toast({
      title: "Sucesso",
      description: "Cálculo de rescisão realizado com sucesso!"
    });
  };

  const limpar = () => {
    setSalarioBase("");
    setTempoTrabalhoMeses("");
    setTipoRescisao("");
    setFeriasVencidas("0");
    setResultado(null);
  };

  const getTipoRescisaoLabel = (tipo: string) => {
    const tipos: { [key: string]: string } = {
      "demissao-sem-justa-causa": "Demissão sem Justa Causa",
      "pedido-demissao": "Pedido de Demissão",
      "demissao-justa-causa": "Demissão por Justa Causa",
      "acordo-mutuo": "Acordo Mútuo",
      "termino-contrato": "Término de Contrato"
    };
    return tipos[tipo] || tipo;
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
              Calculadora de Rescisão
            </h1>
            <p className="text-lg text-muted-foreground">
              Simule os valores de rescisão trabalhista
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Input Form */}
          <Card className="lg:col-span-1 bg-gradient-card shadow-card animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <FileX className="h-5 w-5" />
                Dados da Rescisão
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
                <Label htmlFor="tempo">Tempo de Trabalho (meses)</Label>
                <Input
                  id="tempo"
                  type="number"
                  min="1"
                  placeholder="Ex: 24"
                  value={tempoTrabalhoMeses}
                  onChange={(e) => setTempoTrabalhoMeses(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Rescisão</Label>
                <Select value={tipoRescisao} onValueChange={setTipoRescisao}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="demissao-sem-justa-causa">Demissão sem Justa Causa</SelectItem>
                    <SelectItem value="pedido-demissao">Pedido de Demissão</SelectItem>
                    <SelectItem value="demissao-justa-causa">Demissão por Justa Causa</SelectItem>
                    <SelectItem value="acordo-mutuo">Acordo Mútuo</SelectItem>
                    <SelectItem value="termino-contrato">Término de Contrato</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ferias">Períodos de Férias Vencidas</Label>
                <Select value={feriasVencidas} onValueChange={setFeriasVencidas}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Nenhum</SelectItem>
                    <SelectItem value="1">1 período</SelectItem>
                    <SelectItem value="2">2 períodos</SelectItem>
                    <SelectItem value="3">3 períodos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={calcularRescisao} 
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
                <Card className="bg-gradient-card shadow-elevated animate-fade-in">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                      Total da Rescisão
                    </h3>
                    <p className="text-4xl font-bold text-primary mb-4">
                      {formatCurrency(resultado.total_rescisao)}
                    </p>
                    <div className="text-sm text-muted-foreground">
                      <p>Tipo: {getTipoRescisaoLabel(resultado.tipo_rescisao)}</p>
                      <p>Tempo de trabalho: {Math.floor(resultado.tempo_trabalho_meses / 12)} ano(s) e {resultado.tempo_trabalho_meses % 12} mês(es)</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Detalhamento das Verbas */}
                <Card className="bg-gradient-card shadow-card animate-fade-in">
                  <CardHeader>
                    <CardTitle>Detalhamento das Verbas Rescisórias</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resultado.aviso_previo > 0 && (
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                        <span className="text-muted-foreground">Aviso Prévio:</span>
                        <span className="font-semibold text-success">
                          {formatCurrency(resultado.aviso_previo)}
                        </span>
                      </div>
                    )}

                    {resultado.ferias_vencidas > 0 && (
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                        <span className="text-muted-foreground">Férias Vencidas + 1/3:</span>
                        <span className="font-semibold text-success">
                          {formatCurrency(resultado.ferias_vencidas)}
                        </span>
                      </div>
                    )}

                    {resultado.ferias_proporcionais > 0 && (
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                        <span className="text-muted-foreground">Férias Proporcionais + 1/3:</span>
                        <span className="font-semibold text-success">
                          {formatCurrency(resultado.ferias_proporcionais)}
                        </span>
                      </div>
                    )}

                    {resultado.decimo_terceiro > 0 && (
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                        <span className="text-muted-foreground">13º Salário Proporcional:</span>
                        <span className="font-semibold text-success">
                          {formatCurrency(resultado.decimo_terceiro)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                      <span className="text-muted-foreground">Saldo FGTS:</span>
                      <span className="font-semibold text-success">
                        {formatCurrency(resultado.fgts_saldo)}
                      </span>
                    </div>

                    {resultado.multa_fgts > 0 && (
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-subtle">
                        <span className="text-muted-foreground">Multa FGTS:</span>
                        <span className="font-semibold text-success">
                          {formatCurrency(resultado.multa_fgts)}
                        </span>
                      </div>
                    )}

                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-primary/10">
                        <span className="font-semibold text-foreground">Total a Receber:</span>
                        <span className="font-bold text-primary text-lg">
                          {formatCurrency(resultado.total_rescisao)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Informações Adicionais */}
                <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
                  {/* Seguro Desemprego */}
                  <Card className="bg-gradient-card shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-primary" />
                        Seguro Desemprego
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {resultado.seguro_desemprego ? (
                        <div className="text-center">
                          <p className="text-2xl font-bold text-success mb-2">DISPONÍVEL</p>
                          <p className="text-sm text-muted-foreground">
                            Você tem direito ao seguro desemprego. 
                            Procure uma agência do trabalhador para solicitar.
                          </p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <p className="text-2xl font-bold text-muted-foreground mb-2">NÃO DISPONÍVEL</p>
                          <p className="text-sm text-muted-foreground">
                            Não há direito ao seguro desemprego neste tipo de rescisão.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Resumo dos Direitos */}
                  <Card className="bg-gradient-card shadow-card">
                    <CardHeader>
                      <CardTitle>Resumo dos Direitos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${resultado.aviso_previo > 0 ? 'bg-success' : 'bg-muted-foreground'}`}></span>
                          Aviso Prévio: {resultado.aviso_previo > 0 ? 'Sim' : 'Não'}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${resultado.ferias_proporcionais > 0 ? 'bg-success' : 'bg-muted-foreground'}`}></span>
                          Férias Proporcionais: {resultado.ferias_proporcionais > 0 ? 'Sim' : 'Não'}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${resultado.decimo_terceiro > 0 ? 'bg-success' : 'bg-muted-foreground'}`}></span>
                          13º Proporcional: {resultado.decimo_terceiro > 0 ? 'Sim' : 'Não'}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${resultado.multa_fgts > 0 ? 'bg-success' : 'bg-muted-foreground'}`}></span>
                          Multa FGTS: {resultado.multa_fgts > 0 ? 'Sim' : 'Não'}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${resultado.seguro_desemprego ? 'bg-success' : 'bg-muted-foreground'}`}></span>
                          Seguro Desemprego: {resultado.seguro_desemprego ? 'Sim' : 'Não'}
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Informações Legais */}
                <Card className="bg-gradient-card shadow-card animate-fade-in">
                  <CardHeader>
                    <CardTitle>Informações Importantes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Os valores de INSS e IR serão descontados no acerto</li>
                      <li>• Prazo para pagamento: até 10 dias após o término do contrato</li>
                      <li>• Documentos necessários: CTPS, exames demissionais, termo de rescisão</li>
                      <li>• Este cálculo é uma estimativa baseada na legislação atual</li>
                      <li>• Consulte um advogado trabalhista para casos específicos</li>
                    </ul>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="bg-gradient-card shadow-card">
                <CardContent className="p-12 text-center">
                  <FileX className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Aguardando Cálculo
                  </h3>
                  <p className="text-muted-foreground">
                    Preencha os dados da rescisão para calcular os valores devidos.
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