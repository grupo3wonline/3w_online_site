
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Share2, Star, Award, Target, Users, MessageCircle, Lightbulb, RefreshCw } from 'lucide-react';
import { exportPDF, shareWhatsApp, shareEmail } from '@/utils/share';

const STARResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers: Record<number, string> = location.state?.answers || {};

  // Parse answers into STAR dimension scores and competency scores
  const calculateScores = () => {
    const starScores = { S: 0, T: 0, A: 0, R: 0, S_count: 0, T_count: 0, A_count: 0, R_count: 0 };
    const compScores = { L: 0, C: 0, R: 0, E: 0, A: 0, L_count: 0, C_count: 0, R_count: 0, E_count: 0, A_count: 0 };

    Object.values(answers).forEach(val => {
      // Extract STAR dimension and score
      const scoreMatch = /^([STAR])(\d)/.exec(val);
      const compMatch = /^A\d_([LCREA])/.exec(val);

      if (scoreMatch) {
        const dim = scoreMatch[1] as 'S' | 'T' | 'A' | 'R';
        const score = Number.parseInt(scoreMatch[2]);
        starScores[dim] += score;
        starScores[`${dim}_count` as keyof typeof starScores] += 1;
      }

      if (compMatch) {
        const comp = compMatch[1] as 'L' | 'C' | 'R' | 'E' | 'A';
        const digitMatch = /(\d)/.exec(val);
        const compScore = Number.parseInt(digitMatch?.[1] || '3');
        compScores[comp] += compScore;
        compScores[`${comp}_count` as keyof typeof compScores] += 1;
      }
    });

    return { starScores, compScores };
  };

  const { starScores, compScores } = calculateScores();

  const getStarPercentage = (dim: 'S' | 'T' | 'A' | 'R') => {
    const count = starScores[`${dim}_count` as keyof typeof starScores];
    if (count === 0) return 0;
    const score = starScores[dim];
    return Math.round((score / (count * 5)) * 100);
  };

  const getCompPercentage = (comp: 'L' | 'C' | 'R' | 'E' | 'A') => {
    const count = compScores[`${comp}_count` as keyof typeof compScores];
    if (count === 0) return 0;
    const score = compScores[comp];
    return Math.round((score / (count * 5)) * 100);
  };

  const starDimensions = [
    {
      key: 'S' as const,
      name: 'Situação',
      icon: '📍',
      color: 'bg-blue-500',
      description: 'Capacidade de contextualizar e descrever cenários com clareza',
      highTip: 'Excelente em apresentar contextos. Use isso em entrevistas e apresentações para criar narrativas envolventes.',
      lowTip: 'Pratique descrever cenários com detalhes relevantes: quem estava envolvido, quando aconteceu, qual era o contexto.'
    },
    {
      key: 'T' as const,
      name: 'Tarefa',
      icon: '🎯',
      color: 'bg-green-500',
      description: 'Habilidade de definir objetivos, responsabilidades e metas claras',
      highTip: 'Ótimo em definir objetivos. Continue usando metas SMART para dar clareza às suas responsabilidades.',
      lowTip: 'Antes de agir, pergunte-se: "Qual é exatamente meu papel aqui?" e "Qual é o resultado esperado?"'
    },
    {
      key: 'A' as const,
      name: 'Ação',
      icon: '⚡',
      color: 'bg-amber-500',
      description: 'Capacidade de executar ações estratégicas e eficazes',
      highTip: 'Suas ações são bem pensadas e executadas. Destaque essa competência em processos seletivos.',
      lowTip: 'Foque em descrever o que VOCÊ fez especificamente, não apenas o que a equipe fez como um todo.'
    },
    {
      key: 'R' as const,
      name: 'Resultado',
      icon: '🏆',
      color: 'bg-purple-500',
      description: 'Habilidade de mensurar, documentar e comunicar resultados',
      highTip: 'Excelente em mensurar impacto. Mantenha um registro de seus resultados quantificáveis.',
      lowTip: 'Sempre que possível, quantifique seus resultados: "Reduzi em 30%", "Aumentei em 50%", etc.'
    }
  ];

  const competencies = [
    {
      key: 'L' as const,
      name: 'Liderança',
      icon: <Star className="h-5 w-5" />,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      description: 'Capacidade de influenciar, motivar e guiar equipes'
    },
    {
      key: 'C' as const,
      name: 'Comunicação',
      icon: <MessageCircle className="h-5 w-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Habilidade de se expressar, ouvir e construir relacionamentos'
    },
    {
      key: 'R' as const,
      name: 'Resolução de Problemas',
      icon: <Lightbulb className="h-5 w-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Capacidade analítica e de encontrar soluções criativas'
    },
    {
      key: 'E' as const,
      name: 'Trabalho em Equipe',
      icon: <Users className="h-5 w-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Colaboração efetiva e construção de sinergia'
    },
    {
      key: 'A' as const,
      name: 'Adaptabilidade',
      icon: <RefreshCw className="h-5 w-5" />,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Flexibilidade e resiliência diante de mudanças'
    }
  ];

  // Overall STAR readiness
  const overallSTAR = Math.round(
    (getStarPercentage('S') + getStarPercentage('T') + getStarPercentage('A') + getStarPercentage('R')) / 4
  );

  const getOverallLevel = () => {
    if (overallSTAR >= 80) return { level: 'Expert STAR', emoji: '🌟', color: 'text-amber-600', desc: 'Você domina a técnica STAR e consegue estruturar experiências de forma exemplar.' };
    if (overallSTAR >= 60) return { level: 'Proficiente', emoji: '⭐', color: 'text-blue-600', desc: 'Você tem boa capacidade de estruturar experiências usando STAR, com espaço para refinamento.' };
    if (overallSTAR >= 40) return { level: 'Em Desenvolvimento', emoji: '📈', color: 'text-green-600', desc: 'Você demonstra base na técnica STAR, mas pode aprimorar a estruturação de suas respostas.' };
    return { level: 'Iniciante', emoji: '🌱', color: 'text-gray-600', desc: 'Você está começando a desenvolver a técnica STAR. Com prática, seu desempenho pode melhorar muito.' };
  };

  const overallLevel = getOverallLevel();

  const handleShare = (method: 'whatsapp' | 'email') => {
    const message = `📊 Resultado do Teste Técnica STAR\n\n` +
      `Nível: ${overallLevel.emoji} ${overallLevel.level} (${overallSTAR}%)\n\n` +
      `Dimensões STAR:\n` +
      `📍 Situação: ${getStarPercentage('S')}%\n` +
      `🎯 Tarefa: ${getStarPercentage('T')}%\n` +
      `⚡ Ação: ${getStarPercentage('A')}%\n` +
      `🏆 Resultado: ${getStarPercentage('R')}%\n\n` +
      `Faça seu teste: ${globalThis.location.origin}/teste_personalidade/tests/star`;

    if (method === 'whatsapp') shareWhatsApp(message);
    else shareEmail('Meu Resultado - Técnica STAR', message);
  };

  if (!location.state?.answers) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-yellow-50">
        <Card className="max-w-md text-center p-8">
          <CardTitle className="mb-4">Nenhum resultado encontrado</CardTitle>
          <p className="text-gray-600 mb-6">Faça o teste primeiro para ver seus resultados.</p>
          <Button onClick={() => navigate('/tests/star')} className="bg-amber-600 hover:bg-amber-700">Fazer o Teste</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate('/ferramentas')} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Resultado - Técnica STAR</h1>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => exportPDF('star-results', 'resultado-star.pdf')}>
                <Download className="h-4 w-4 mr-2" /> PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare('whatsapp')}>
                <Share2 className="h-4 w-4 mr-2" /> WhatsApp
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare('email')}>
                <Share2 className="h-4 w-4 mr-2" /> Email
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="star-results">
        {/* Overall Level */}
        <Card className="mb-8 border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="text-6xl mb-4">{overallLevel.emoji}</div>
            <h2 className={`text-3xl font-bold ${overallLevel.color} mb-2`}>{overallLevel.level}</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-4">{overallLevel.desc}</p>
            <Badge className="text-lg px-4 py-2 bg-amber-100 text-amber-800 border-amber-300">
              Índice STAR: {overallSTAR}%
            </Badge>
          </CardContent>
        </Card>

        {/* STAR Dimensions */}
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Award className="h-6 w-6 mr-2 text-amber-600" /> Dimensões STAR
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {starDimensions.map(dim => {
            const pct = getStarPercentage(dim.key);
            const isHigh = pct >= 60;
            return (
              <Card key={dim.key} className="border hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <span className="text-2xl mr-3">{dim.icon}</span>
                    {dim.name}
                    <Badge className="ml-auto" variant={pct >= 80 ? 'default' : 'secondary'}>{pct}%</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{dim.description}</p>
                  <Progress value={pct} className="h-3 mb-3" />
                  <div className={`p-3 rounded-lg text-sm ${isHigh ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-800'}`}>
                    <strong>{isHigh ? '✅ Ponto Forte:' : '💡 Dica de Melhoria:'}</strong> {isHigh ? dim.highTip : dim.lowTip}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Competencies */}
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Target className="h-6 w-6 mr-2 text-amber-600" /> Competências Comportamentais
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {competencies.map(comp => {
            const pct = getCompPercentage(comp.key);
            return (
              <Card key={comp.key} className={`border ${comp.bgColor}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-3">
                    <div className={`${comp.color} mr-2`}>{comp.icon}</div>
                    <h4 className="font-semibold text-gray-800">{comp.name}</h4>
                    <Badge className="ml-auto" variant="secondary">{pct}%</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{comp.description}</p>
                  <Progress value={pct} className="h-2" />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tips Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center">💡 Como Usar a Técnica STAR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Em Entrevistas</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start"><span className="mr-2">📍</span> <strong>Situação:</strong> Descreva onde e quando aconteceu (1-2 frases)</li>
                  <li className="flex items-start"><span className="mr-2">🎯</span> <strong>Tarefa:</strong> Explique seu papel e o que precisava fazer</li>
                  <li className="flex items-start"><span className="mr-2">⚡</span> <strong>Ação:</strong> Detalhe as ações específicas que VOCÊ tomou</li>
                  <li className="flex items-start"><span className="mr-2">🏆</span> <strong>Resultado:</strong> Quantifique o impacto (números, métricas)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Dicas Práticas</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✅ Prepare 5-8 histórias STAR antes de entrevistas</li>
                  <li>✅ Use números e dados para quantificar resultados</li>
                  <li>✅ Foque em suas ações individuais, não da equipe</li>
                  <li>✅ Pratique em voz alta até soar natural</li>
                  <li>✅ Adapte suas histórias para cada vaga</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-center gap-4 pt-4">
          <Button onClick={() => navigate('/tests/star')} variant="outline">
            Refazer Teste
          </Button>
          <Button onClick={() => navigate('/ferramentas')} className="bg-amber-600 hover:bg-amber-700">
            Ver Outros Testes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default STARResults;
