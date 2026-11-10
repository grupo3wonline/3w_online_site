import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Star, Target, Users, ArrowLeft, Download, Share2, MessageCircle, Lightbulb, Zap } from 'lucide-react';
import { exportPDF, shareWhatsApp, shareEmail } from '@/utils/share';
import { useEffect, useState } from 'react';

const DiscResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || {};

  const calculateDiscProfile = () => {
    const scores = { D: 0, I: 0, S: 0, C: 0 };

    Object.values(answers).forEach((answer: any) => {
      if (scores.hasOwnProperty(answer)) {
        scores[answer as keyof typeof scores]++;
      }
    });

    const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const percentages = {
      D: Math.round((scores.D / total) * 100),
      I: Math.round((scores.I / total) * 100),
      S: Math.round((scores.S / total) * 100),
      C: Math.round((scores.C / total) * 100)
    };

    const maxScore = Math.max(...Object.values(scores));
    const dominantStyle = Object.keys(scores).find(
      key => scores[key as keyof typeof scores] === maxScore
    ) || 'D';

    return {
      scores,
      percentages,
      dominantStyle,
      profile: generateProfile(percentages)
    };
  };

  const generateProfile = (percentages: Record<string, number>) => {
    const styles = [];
    if (percentages.D > 25) styles.push('D');
    if (percentages.I > 25) styles.push('I');
    if (percentages.S > 25) styles.push('S');
    if (percentages.C > 25) styles.push('C');
    return styles.join('');
  };

  const result = calculateDiscProfile();

  const [showAnimation, setShowAnimation] = useState(false);
  useEffect(() => { setShowAnimation(true); }, []);

  // Team interaction tips
  const interactionTips: Record<string, Record<string, string>> = {
    D: { D: 'Foque em resultados, respeite autonomia', I: 'Seja mais sociável, mostre entusiasmo', S: 'Desacelere, dê tempo para processar mudanças', C: 'Apresente dados e evidências' },
    I: { D: 'Seja direto e objetivo', I: 'Mantenha energia alta e diversão', S: 'Ouça mais, seja consistente', C: 'Organize suas ideias antes de falar' },
    S: { D: 'Seja firme em suas posições', I: 'Conecte-se socialmente', S: 'Colabore com empatia', C: 'Respeite os processos e normas' },
    C: { D: 'Apresente conclusões objetivas', I: 'Seja mais flexível e aberto', S: 'Valorize a harmonia, seja gentil', C: 'Compartilhe dados e análises detalhadas' },
  };

  const discStyles = {
    D: {
      name: "Dominância",
      description: "Direto, assertivo, orientado para resultados e gosta de desafios.",
      traits: ["Orientado para resultados", "Gosta de desafios", "Toma decisões rápidas", "Líder natural"],
      strengths: ["Assertividade", "Orientação para resultados", "Liderança", "Iniciativa"],
      challenges: ["Impaciência", "Pode ser muito direto", "Falta de detalhamento", "Resistência a controle"],
      communication: "Seja direto, conciso e focado em resultados. Evite detalhes desnecessários.",
      motivation: "Desafios, autoridade, oportunidades de liderança e reconhecimento por conquistas.",
      color: "red"
    },
    I: {
      name: "Influência",
      description: "Sociável, otimista, comunicativo e gosta de trabalhar com pessoas.",
      traits: ["Comunicativo", "Otimista", "Persuasivo", "Orientado para pessoas"],
      strengths: ["Comunicação", "Persuasão", "Entusiasmo", "Networking"],
      challenges: ["Pode falar demais", "Desorganização", "Evita conflitos", "Falta de foco nos detalhes"],
      communication: "Use tom positivo, permita interação social e reconheça publicamente.",
      motivation: "Reconhecimento público, interação social, variedade e ambiente positivo.",
      color: "yellow"
    },
    S: {
      name: "Estabilidade",
      description: "Estável, confiável, paciente e prefere ambientes harmoniosos.",
      traits: ["Confiável", "Paciente", "Leal", "Orientado para equipe"],
      strengths: ["Confiabilidade", "Paciência", "Trabalho em equipe", "Estabilidade"],
      challenges: ["Resistente a mudanças", "Evita confrontos", "Dificuldade em dizer não", "Ritmo mais lento"],
      communication: "Seja gentil, dê tempo para processar e explique os benefícios das mudanças.",
      motivation: "Segurança, apreciação pessoal, ambiente harmonioso e relacionamentos estáveis.",
      color: "green"
    },
    C: {
      name: "Conformidade",
      description: "Analítico, preciso, orientado para qualidade e segue procedimentos.",
      traits: ["Analítico", "Detalhista", "Orientado para qualidade", "Sistemático"],
      strengths: ["Precisão", "Análise", "Qualidade", "Organização"],
      challenges: ["Perfeccionismo", "Análise excessiva", "Resistência a prazos", "Crítico demais"],
      communication: "Forneça dados, seja preciso, permita tempo para análise e evite pressão.",
      motivation: "Qualidade, precisão, autonomia e reconhecimento pela expertise técnica.",
      color: "blue"
    }
  };

  const primaryStyle = discStyles[result.dominantStyle as keyof typeof discStyles];

  if (!primaryStyle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8">
          <CardContent className="text-center">
            <h2 className="text-xl font-bold mb-4">Erro nos Resultados</h2>
            <p className="text-gray-600 mb-4">Não foi possível calcular seus resultados.</p>
            <Button onClick={() => navigate('/ferramentas')}>Voltar aos Testes</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Helmet>
        <title>Resultado — Avaliação DISC Comportamental</title>
        <meta name="description" content="Descubra seu perfil DISC com insights sobre comunicação, motivação e dinâmica de equipe." />
        <link rel="canonical" href={window.location.origin + '/tests/disc/results'} />
      </Helmet>
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/ferramentas')}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Resultado DISC</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => exportPDF('disc-result', 'resultado-disc.pdf')}>
                <Download className="h-4 w-4 mr-2" /> PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => shareEmail('Resultado - DISC', `Veja meu perfil DISC: ${window.location.href}`)}>
                <Share2 className="h-4 w-4 mr-2" /> E-mail
              </Button>
              <Button variant="outline" size="sm" onClick={() => shareWhatsApp(`Meu resultado do DISC: ${window.location.href}`)}>
                <Share2 className="h-4 w-4 mr-2" /> WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div id="disc-result" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="h-4 w-4 mr-2" />
            Seu Perfil DISC
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Estilo {result.dominantStyle} - {primaryStyle.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {primaryStyle.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-500" />
                  Características Principais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {primaryStyle.traits.map((trait, index) => (
                    <div key={index} className="flex items-center">
                      <Star className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-gray-700">{trait}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">Pontos Fortes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {primaryStyle.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <Star className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-600">Áreas de Desenvolvimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {primaryStyle.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start">
                        <Target className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Como Comunicar com Você</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{primaryStyle.communication}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-purple-600">O que te Motiva</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{primaryStyle.motivation}</p>
              </CardContent>
            </Card>

            {/* Team Dynamics */}
            <Card className={`transition-all duration-700 delay-300 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <CardHeader>
                <CardTitle className="flex items-center text-indigo-600">
                  <MessageCircle className="h-5 w-5 mr-2" /> Como Interagir com Outros Estilos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">Dicas para se comunicar melhor com cada perfil DISC:</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {(['D', 'I', 'S', 'C'] as const).map((style) => {
                    const styleInfo = discStyles[style];
                    const tip = interactionTips[result.dominantStyle]?.[style] || '';
                    const isYou = style === result.dominantStyle;
                    return (
                      <div key={style} className={`p-3 rounded-lg border ${isYou ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant={isYou ? 'default' : 'secondary'} className="text-xs">{style}</Badge>
                          <span className="font-medium text-sm text-gray-800">{styleInfo.name}</span>
                          {isYou && <span className="text-xs text-purple-600">(Você)</span>}
                        </div>
                        <p className="text-xs text-gray-600">{tip}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Work Environment */}
            <Card className={`transition-all duration-700 delay-400 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <CardHeader>
                <CardTitle className="flex items-center text-teal-600">
                  <Zap className="h-5 w-5 mr-2" /> Ambiente de Trabalho Ideal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {({
                    D: ['Autonomia e liberdade para decidir', 'Metas desafiadoras e claras', 'Ambiente competitivo e dinâmico', 'Reconhecimento por conquistas'],
                    I: ['Ambiente social e colaborativo', 'Reconhecimento público frequente', 'Variedade de projetos e tarefas', 'Liberdade criativa e expressão'],
                    S: ['Estabilidade e previsibilidade', 'Equipe unida e respeitosa', 'Tempo adequado para tarefas', 'Ambiente calmo e organizado'],
                    C: ['Padrões claros de qualidade', 'Tempo para análise aprofundada', 'Autonomia técnica e especialização', 'Processos bem definidos'],
                  }[result.dominantStyle] || []).map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2 p-2">
                      <Lightbulb className="h-4 w-4 text-teal-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-center text-purple-900">
                  Sua Composição DISC
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(result.percentages).map(([style, percentage]) => {
                    const styleInfo = discStyles[style as keyof typeof discStyles];
                    return (
                      <div key={style} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2 bg-${styleInfo.color}-500`}></div>
                            <span className="font-medium">{style} - {styleInfo.name}</span>
                          </div>
                          <span className="text-sm font-semibold">{percentage}%</span>
                        </div>
                        <Progress value={percentage} className="h-3" />
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 p-4 bg-white rounded-lg">
                  <h4 className="font-medium text-center mb-2">Perfil Combinado</h4>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-purple-600">
                      {result.profile}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Próximos Passos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full" 
                  onClick={() => navigate('/tests/enneagram')}
                >
                  Fazer Teste de Eneagrama
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/tests/big-five')}
                >
                  Fazer Teste Big Five
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/ferramentas')}
                >
                  Explorar Outros Testes
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">Dica</p>
                    <p className="text-xs text-amber-700 mt-1">Compartilhe seu resultado DISC com colegas de trabalho para melhorar a comunicação e dinâmica da equipe.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center mt-8">Este resultado é educativo e baseado em suas respostas. Para uma assessoria profissional de perfil comportamental, consulte um especialista certificado em DISC.</p>
      </div>
    </div>
  );
};

export default DiscResults;
