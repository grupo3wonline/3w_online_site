import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Clock, User, DollarSign, Calendar, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AposentadoriaCalculatorProps {
  onBack: () => void;
}

interface AposentadoriaResult {
  idade_atual: number;
  tempo_contribuicao_atual: number;
  salario_contribuicao: number;
  tipo_aposentadoria: string;
  pode_aposentar: boolean;
  tempo_restante_anos: number;
  idade_para_aposentar: number;
  valor_estimado_beneficio: number;
  fator_previdenciario: number;
  media_salarios: number;
}

export default function AposentadoriaCalculator({ onBack }: AposentadoriaCalculatorProps) {
  const [idadeAtual, setIdadeAtual] = useState("");
  const [sexo, setSexo] = useState("");
  const [tempoContribuicao, setTempoContribuicao] = useState("");
  const [salarioContribuicao, setSalarioContribuicao] = useState("");
  const [tipoAposentadoria, setTipoAposentadoria] = useState("");
  const [resultado, setResultado] = useState<AposentadoriaResult | null>(null);
  const { toast } = useToast();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calcularFatorPrevidenciario = (idade: number, tempoContrib: number, sexo: string) => {
    const expectativaVida = sexo === 'masculino' ? 75 : 80; // Simplificado
    const aliquota = 0.31;
    const idadeAposentadoria = idade;
    const tempoContribuicaoCompleto = tempoContrib / 12; // em anos
    
    const fator = (tempoContribuicaoCompleto * aliquota) / expectativaVida;
    return Math.min(fator * (1 + (idadeAposentadoria / 100)), 1);
  };

  const calcularAposentadoria = () => {
    if (!idadeAtual || !sexo || !tempoContribuicao || !salarioContribuicao || !tipoAposentadoria) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive"
      });
      return;
    }

    const idade = parseInt(idadeAtual);
    const tempoContribMeses = parseInt(tempoContribuicao);
    const salario = parseFloat(salarioContribuicao.replace(',', '.'));

    if (idade <= 0 || tempoContribMeses < 0 || salario <= 0) {
      toast({
        title: "Erro",
        description: "Informe valores válidos",
        variant: "destructive"
      });
      return;
    }

    const tempoContribAnos = tempoContribMeses / 12;
    let podeAposentar = false;
    let tempoRestanteAnos = 0;
    let idadeParaAposentar = 0;
    let valorEstimado = 0;

    // Regras de aposentadoria (Lei 13.135/2019 - EC 103/2019)
    switch (tipoAposentadoria) {
      case "idade":
        // Aposentadoria por idade
        const idadeMinimaIdade = sexo === 'masculino' ? 65 : 62;
        const tempoMinimoIdade = 15; // 15 anos de contribuição
        
        podeAposentar = idade >= idadeMinimaIdade && tempoContribAnos >= tempoMinimoIdade;
        idadeParaAposentar = idadeMinimaIdade;
        
        if (!podeAposentar) {
          if (idade < idadeMinimaIdade) {
            tempoRestanteAnos = idadeMinimaIdade - idade;
          } else {
            tempoRestanteAnos = Math.max(0, tempoMinimoIdade - tempoContribAnos);
          }
        }
        
        // Cálculo do benefício (60% + 2% por ano acima de 20 anos de contribuição)
        const percentualIdade = Math.min(0.6 + Math.max(0, (tempoContribAnos - 20) * 0.02), 1);
        valorEstimado = salario * percentualIdade;
        break;

      case "tempo":
        // Aposentadoria por tempo de contribuição
        const tempoMinimoTempo = sexo === 'masculino' ? 35 : 30; // anos
        const pontuacao = idade + tempoContribAnos;
        const pontuacaoMinima = sexo === 'masculino' ? 96 : 86; // Regra de transição

        podeAposentar = tempoContribAnos >= tempoMinimoTempo && pontuacao >= pontuacaoMinima;
        
        if (!podeAposentar) {
          const tempoRestanteTempo = Math.max(0, tempoMinimoTempo - tempoContribAnos);
          const pontuacaoRestante = Math.max(0, pontuacaoMinima - pontuacao);
          tempoRestanteAnos = Math.max(tempoRestanteTempo, pontuacaoRestante);
        }

        // Fator previdenciário (opcional, mas pode reduzir o benefício)
        const fatorPrevidenciario = calcularFatorPrevidenciario(idade, tempoContribMeses, sexo);
        valorEstimado = salario * fatorPrevidenciario;
        break;

      case "especial":
        // Aposentadoria especial (atividade insalubre/perigosa)
        const tempoEspecial = 25; // 25 anos para atividade especial
        const pontuacaoEspecial = idade + tempoContribAnos;
        const pontuacaoMinimaEspecial = 86; // Para 25 anos de atividade especial

        podeAposentar = tempoContribAnos >= tempoEspecial && pontuacaoEspecial >= pontuacaoMinimaEspecial;
        
        if (!podeAposentar) {
          const tempoRestanteEspecial = Math.max(0, tempoEspecial - tempoContribAnos);
          const pontuacaoRestanteEspecial = Math.max(0, pontuacaoMinimaEspecial - pontuacaoEspecial);
          tempoRestanteAnos = Math.max(tempoRestanteEspecial, pontuacaoRestanteEspecial);
        }

        // Aposentadoria especial: 100% da média
        valorEstimado = salario;
        break;
    }

    // Aplicar limites do INSS
    const salarioMinimo = 1412; // 2024
    const tetoINSS = 7786.02; // 2024
    valorEstimado = Math.max(salarioMinimo, Math.min(valorEstimado, tetoINSS));

    const resultado: AposentadoriaResult = {
      idade_atual: idade,
      tempo_contribuicao_atual: tempoContribMeses,
      salario_contribuicao: salario,
      tipo_aposentadoria: tipoAposentadoria,
      pode_aposentar: podeAposentar,
      tempo_restante_anos: tempoRestanteAnos,
      idade_para_aposentar: idadeParaAposentar,
      valor_estimado_beneficio: valorEstimado,
      fator_previdenciario: calcularFatorPrevidenciario(idade, tempoContribMeses, sexo),
      media_salarios: salario
    };

    setResultado(resultado);
    
    toast({
      title: "Sucesso",
      description: podeAposentar ? "Você pode se aposentar!" : "Simulação calculada com sucesso!"
    });
  };

  const limpar = () => {
    setIdadeAtual("");
    setSexo("");
    setTempoContribuicao("");
    setSalarioContribuicao("");
    setTipoAposentadoria("");
    setResultado(null);
  };

  const getTipoAposentadoriaLabel = (tipo: string) => {
    const tipos: { [key: string]: string } = {
      "idade": "Por Idade",
      "tempo": "Por Tempo de Contribuição",
      "especial": "Especial"
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
              Calculadora de Aposentadoria
            </h1>
            <p className="text-lg text-muted-foreground">
              Simule sua aposentadoria por tempo, idade ou especial
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Input Form */}
          <Card className="lg:col-span-1 bg-gradient-card shadow-card animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Clock className="h-5 w-5" />
                Dados Previdenciários
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="idade">Idade Atual</Label>
                <Input
                  id="idade"
                  type="number"
                  min="18"
                  max="100"
                  placeholder="Ex: 55"
                  value={idadeAtual}
                  onChange={(e) => setIdadeAtual(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sexo">Sexo</Label>
                <Select value={sexo} onValueChange={setSexo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="feminino">Feminino</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tempo">Tempo de Contribuição (meses)</Label>
                <Input
                  id="tempo"
                  type="number"
                  min="0"
                  placeholder="Ex: 300"
                  value={tempoContribuicao}
                  onChange={(e) => setTempoContribuicao(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Total de meses já contribuídos para o INSS
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salario">Média Salarial (R$)</Label>
                <Input
                  id="salario"
                  type="text"
                  placeholder="Ex: 4000,00"
                  value={salarioContribuicao}
                  onChange={(e) => setSalarioContribuicao(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Média dos seus salários de contribuição
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Aposentadoria</Label>
                <Select value={tipoAposentadoria} onValueChange={setTipoAposentadoria}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="idade">Por Idade</SelectItem>
                    <SelectItem value="tempo">Por Tempo de Contribuição</SelectItem>
                    <SelectItem value="especial">Especial (Insalubridade)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={calcularAposentadoria} 
                  className="flex-1 bg-gradient-primary hover:shadow-elevated transition-all duration-200"
                >
                  Simular
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
                {/* Status da Aposentadoria */}
                <Card className={`shadow-elevated animate-fade-in ${
                  resultado.pode_aposentar ? 'bg-gradient-card border-success' : 'bg-gradient-card border-warning'
                }`}>
                  <CardContent className="p-8 text-center">
                    {resultado.pode_aposentar ? (
                      <>
                        <Clock className="h-16 w-16 text-success mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-success mb-2">
                          PODE SE APOSENTAR!
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Você atende aos requisitos para aposentadoria {getTipoAposentadoriaLabel(resultado.tipo_aposentadoria).toLowerCase()}
                        </p>
                      </>
                    ) : (
                      <>
                        <User className="h-16 w-16 text-warning mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-warning mb-2">
                          AINDA NÃO PODE SE APOSENTAR
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Faltam aproximadamente <strong>{Math.ceil(resultado.tempo_restante_anos)} ano(s)</strong> para sua aposentadoria
                        </p>
                      </>
                    )}
                    
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Valor Estimado do Benefício</p>
                      <p className="text-3xl font-bold text-primary">
                        {formatCurrency(resultado.valor_estimado_beneficio)}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Resumo dos Dados */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
                  <Card className="bg-gradient-card shadow-card">
                    <CardContent className="p-6 text-center">
                      <User className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Idade Atual</p>
                      <p className="text-xl font-bold text-foreground">
                        {resultado.idade_atual} anos
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-card shadow-card">
                    <CardContent className="p-6 text-center">
                      <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Tempo Contribuição</p>
                      <p className="text-xl font-bold text-foreground">
                        {Math.floor(resultado.tempo_contribuicao_atual / 12)} anos e {resultado.tempo_contribuicao_atual % 12} meses
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-card shadow-card">
                    <CardContent className="p-6 text-center">
                      <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Média Salarial</p>
                      <p className="text-xl font-bold text-foreground">
                        {formatCurrency(resultado.media_salarios)}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Requisitos por Tipo */}
                <Card className="bg-gradient-card shadow-card animate-fade-in">
                  <CardHeader>
                    <CardTitle>Requisitos para {getTipoAposentadoriaLabel(resultado.tipo_aposentadoria)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {resultado.tipo_aposentadoria === 'idade' && (
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg bg-gradient-subtle">
                            <h4 className="font-semibold text-foreground mb-2">Idade Mínima</h4>
                            <p className="text-2xl font-bold text-primary">
                              {sexo === 'masculino' ? '65' : '62'} anos
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Status: {resultado.idade_atual >= (sexo === 'masculino' ? 65 : 62) ? 
                                <span className="text-success font-semibold">✓ Atendido</span> : 
                                <span className="text-warning font-semibold">⏳ Pendente</span>
                              }
                            </p>
                          </div>
                          
                          <div className="p-4 rounded-lg bg-gradient-subtle">
                            <h4 className="font-semibold text-foreground mb-2">Tempo de Contribuição</h4>
                            <p className="text-2xl font-bold text-primary">15 anos</p>
                            <p className="text-sm text-muted-foreground">
                              Status: {(resultado.tempo_contribuicao_atual / 12) >= 15 ? 
                                <span className="text-success font-semibold">✓ Atendido</span> : 
                                <span className="text-warning font-semibold">⏳ Pendente</span>
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {resultado.tipo_aposentadoria === 'tempo' && (
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg bg-gradient-subtle">
                            <h4 className="font-semibold text-foreground mb-2">Tempo de Contribuição</h4>
                            <p className="text-2xl font-bold text-primary">
                              {sexo === 'masculino' ? '35' : '30'} anos
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Atual: {Math.floor(resultado.tempo_contribuicao_atual / 12)} anos
                            </p>
                          </div>
                          
                          <div className="p-4 rounded-lg bg-gradient-subtle">
                            <h4 className="font-semibold text-foreground mb-2">Pontuação</h4>
                            <p className="text-2xl font-bold text-primary">
                              {sexo === 'masculino' ? '96' : '86'} pontos
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Atual: {resultado.idade_atual + Math.floor(resultado.tempo_contribuicao_atual / 12)} pontos
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {resultado.tipo_aposentadoria === 'especial' && (
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg bg-gradient-subtle">
                            <h4 className="font-semibold text-foreground mb-2">Tempo Atividade Especial</h4>
                            <p className="text-2xl font-bold text-primary">25 anos</p>
                            <p className="text-sm text-muted-foreground">
                              Para atividades insalubres/perigosas
                            </p>
                          </div>
                          
                          <div className="p-4 rounded-lg bg-gradient-subtle">
                            <h4 className="font-semibold text-foreground mb-2">Pontuação</h4>
                            <p className="text-2xl font-bold text-primary">86 pontos</p>
                            <p className="text-sm text-muted-foreground">
                              Idade + tempo de contribuição
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Projeção Futura */}
                {!resultado.pode_aposentar && (
                  <Card className="bg-gradient-card shadow-card animate-fade-in">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Projeção para Aposentadoria
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Quando Você Poderá se Aposentar:</h4>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">
                              Idade estimada: <span className="font-semibold text-foreground">
                                {resultado.idade_atual + Math.ceil(resultado.tempo_restante_anos)} anos
                              </span>
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Ano estimado: <span className="font-semibold text-foreground">
                                {new Date().getFullYear() + Math.ceil(resultado.tempo_restante_anos)}
                              </span>
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Tempo restante: <span className="font-semibold text-warning">
                                {Math.ceil(resultado.tempo_restante_anos)} ano(s)
                              </span>
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Valor Estimado do Benefício:</h4>
                          <p className="text-3xl font-bold text-success mb-2">
                            {formatCurrency(resultado.valor_estimado_beneficio)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            *Baseado na legislação atual e média salarial informada
                          </p>
                        </div>
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
                      <li>• Esta simulação é baseada na legislação previdenciária atual (EC 103/2019)</li>
                      <li>• Os valores são estimativos e podem variar conforme alterações na lei</li>
                      <li>• Para aposentadoria por tempo, considere o fator previdenciário</li>
                      <li>• Aposentadoria especial requer comprovação de atividade insalubre/perigosa</li>
                      <li>• Consulte um contador ou advogado previdenciário para casos específicos</li>
                      <li>• Acompanhe seu CNIS (Cadastro Nacional de Informações Sociais) regularmente</li>
                    </ul>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="bg-gradient-card shadow-card">
                <CardContent className="p-12 text-center">
                  <Clock className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Simulação de Aposentadoria
                  </h3>
                  <p className="text-muted-foreground">
                    Preencha seus dados previdenciários para simular sua aposentadoria.
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