import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Brain, Download, Share2, Star, TrendingUp, Lightbulb, BookOpen, Zap, Target } from 'lucide-react';
import { exportPDF, shareWhatsApp, shareEmail } from '@/utils/share';
import { useEffect, useState } from 'react';

const IQResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAnimation, setShowAnimation] = useState(false);
  const score: number = location.state?.score ?? 0;
  const total: number = location.state?.total ?? 10;
  const percentage = Math.round((score / total) * 100);

  useEffect(() => { setShowAnimation(true); }, []);

  const interpret = (p: number) => {
    if (p < 30) return {
      label: 'Em Desenvolvimento', color: 'bg-red-500', borderColor: 'border-red-200',
      textColor: 'text-red-600', bgLight: 'bg-red-50', emoji: '🔍',
      description: 'Seu resultado indica oportunidades de desenvolvimento cognitivo. Exercitar diferentes tipos de raciocínio pode melhorar significativamente seu desempenho.',
      strengths: ['Potencial para crescimento significativo', 'Oportunidade de explorar novas formas de pensar', 'Espaço para desenvolvimento diversificado'],
      tips: ['Pratique quebra-cabeças e jogos de lógica diariamente', 'Leia sobre temas variados para ampliar vocabulário', 'Resolva problemas matemáticos básicos como exercício mental', 'Jogue xadrez ou sudoku para estimular raciocínio estratégico', 'Considere aplicativos de treinamento cerebral como Lumosity ou Peak'],
      cognitiveProfile: { logica: 35, verbal: 40, matematica: 30, analitica: 35 }
    };
    if (p < 50) return {
      label: 'Abaixo da Média', color: 'bg-orange-500', borderColor: 'border-orange-200',
      textColor: 'text-orange-600', bgLight: 'bg-orange-50', emoji: '📊',
      description: 'Você demonstra habilidades cognitivas que podem ser aprimoradas com prática consistente. Foque nas áreas que mais te desafiam.',
      strengths: ['Capacidade de reconhecer padrões básicos', 'Compreensão de conceitos fundamentais', 'Potencial para melhora rápida com prática'],
      tips: ['Pratique problemas de lógica e sequências numéricas', 'Amplie seu vocabulário com leitura diversificada', 'Resolva exercícios de raciocínio verbal regularmente', 'Explore puzzles e jogos de estratégia', 'Mantenha uma alimentação saudável e boa qualidade de sono'],
      cognitiveProfile: { logica: 45, verbal: 50, matematica: 40, analitica: 45 }
    };
    if (p < 70) return {
      label: 'Média', color: 'bg-yellow-500', borderColor: 'border-yellow-200',
      textColor: 'text-yellow-600', bgLight: 'bg-yellow-50', emoji: '⚡',
      description: 'Seu desempenho está na média esperada. Você demonstra boa capacidade de raciocínio em várias dimensões cognitivas.',
      strengths: ['Bom raciocínio lógico geral', 'Capacidade de resolver problemas do cotidiano', 'Equilíbrio entre diferentes áreas cognitivas', 'Boa compreensão verbal'],
      tips: ['Explore quebra-cabeças mais complexos para subir de nível', 'Pratique raciocínio matemático avançado', 'Amplie vocabulário com leitura crítica e técnica', 'Jogue jogos de estratégia que exijam planejamento', 'Desafie-se com problemas fora da sua zona de conforto'],
      cognitiveProfile: { logica: 60, verbal: 65, matematica: 55, analitica: 60 }
    };
    if (p < 90) return {
      label: 'Acima da Média', color: 'bg-green-500', borderColor: 'border-green-200',
      textColor: 'text-green-600', bgLight: 'bg-green-50', emoji: '🎯',
      description: 'Excelente desempenho! Você demonstra capacidade cognitiva acima da média em múltiplas dimensões. Suas habilidades analíticas são notáveis.',
      strengths: ['Raciocínio lógico avançado', 'Excelente capacidade analítica', 'Bom raciocínio verbal e vocabulário', 'Capacidade de resolver problemas complexos'],
      tips: ['Mantenha desafios constantes para não estagnar', 'Diversifique áreas de estudo para expandir horizontes', 'Considere mentoria ou ensino para consolidar conhecimento', 'Explore olimpíadas de conhecimento ou competições intelectuais', 'Pratique pensamento lateral e criativo'],
      cognitiveProfile: { logica: 80, verbal: 75, matematica: 78, analitica: 82 }
    };
    return {
      label: 'Muito Acima da Média', color: 'bg-emerald-600', borderColor: 'border-emerald-200',
      textColor: 'text-emerald-600', bgLight: 'bg-emerald-50', emoji: '🏆',
      description: 'Desempenho excepcional! Suas habilidades cognitivas estão significativamente acima da média. Você demonstra domínio em múltiplas dimensões do raciocínio.',
      strengths: ['Raciocínio lógico sofisticado', 'Excelência em resolução de problemas complexos', 'Vocabulário avançado e precisão verbal', 'Capacidade analítica superior', 'Pensamento abstrato bem desenvolvido'],
      tips: ['Aprofunde-se em temas complexos de seu interesse', 'Considere mentorias e liderança intelectual', 'Explore áreas interdisciplinares como filosofia, matemática avançada', 'Mantenha a curiosidade ativa explorando novas fronteiras do conhecimento', 'Pratique ensino — ensinar consolida e aprofunda o aprendizado'],
      cognitiveProfile: { logica: 92, verbal: 88, matematica: 90, analitica: 95 }
    };
  };

  const res = interpret(percentage);

  const cognitiveAreas = [
    { name: 'Raciocínio Lógico', score: res.cognitiveProfile.logica, icon: Target, color: 'text-blue-500', description: 'Sequências, padrões e deduções' },
    { name: 'Raciocínio Verbal', score: res.cognitiveProfile.verbal, icon: BookOpen, color: 'text-green-500', description: 'Vocabulário, sinônimos e analogias' },
    { name: 'Raciocínio Matemático', score: res.cognitiveProfile.matematica, icon: TrendingUp, color: 'text-purple-500', description: 'Cálculos, proporções e álgebra' },
    { name: 'Capacidade Analítica', score: res.cognitiveProfile.analitica, icon: Brain, color: 'text-indigo-500', description: 'Análise crítica e resolução' },
  ];

  const studyResources = [
    { title: 'Lógica e Puzzles', items: ['Sudoku e KenKen', 'Quebra-cabeças 3D', 'Jogos de xadrez', 'Desafios de programação'] },
    { title: 'Raciocínio Verbal', items: ['Leitura de clássicos', 'Palavras cruzadas', 'Debates e discussões', 'Escrita criativa'] },
    { title: 'Matemática', items: ['Khan Academy', 'Olimpíadas de matemática', 'Problemas do dia a dia', 'Aplicativos de treino'] },
    { title: 'Capacidade Analítica', items: ['Análise de dados', 'Pensamento sistêmico', 'Filosofia e ética', 'Resolução de cases'] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <Helmet>
        <title>Resultado — Teste de QI (Recreativo)</title>
        <meta name="description" content="Veja seu desempenho no teste recreativo de raciocínio lógico e verbal." />
        <link rel="canonical" href={window.location.origin + '/tests/iq/results'} />
      </Helmet>

      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate('/ferramentas')} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
              </Button>
              <h1 className="text-xl font-bold text-gray-900 flex items-center">
                <Brain className="h-5 w-5 mr-2 text-indigo-600" /> Resultado — QI (Recreativo)
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => exportPDF('iq-result', 'resultado-qi.pdf')}>
                <Download className="h-4 w-4 mr-2" /> PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => shareEmail('Resultado — QI (Recreativo)', `Veja meu percentual no teste de QI: ${window.location.href}`)}>
                <Share2 className="h-4 w-4 mr-2" /> E-mail
              </Button>
              <Button variant="outline" size="sm" onClick={() => shareWhatsApp(`Meu resultado — QI (recreativo): ${window.location.href}`)}>
                <Share2 className="h-4 w-4 mr-2" /> WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div id="iq-result" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Animation */}
        <div className={`text-center mb-8 transition-all duration-1000 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <Brain className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Análise Concluída!</h2>
          <p className="text-lg text-gray-600">Veja seu desempenho nas dimensões cognitivas</p>
        </div>

        {/* Main Result */}
        <Card className={`mb-8 border-2 ${res.borderColor} transition-all duration-700 ${showAnimation ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <CardHeader className="text-center pb-4">
            <div className="text-5xl mb-4">{res.emoji}</div>
            <Badge className={`${res.color} text-white mb-3 text-sm px-4 py-1`}>{res.label}</Badge>
            <CardTitle className="text-4xl text-gray-900 mb-2">{score} / {total} ({percentage}%)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-md mx-auto text-center mb-4">
              <Progress value={percentage} className="h-3 mb-2" />
              <div className="text-sm text-gray-600">Percentual de acertos</div>
            </div>
            <p className="text-lg text-gray-700 text-center mt-4 max-w-2xl mx-auto leading-relaxed">{res.description}</p>
          </CardContent>
        </Card>

        {/* Cognitive Dimensions */}
        <Card className={`mb-8 transition-all duration-700 delay-200 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <CardTitle className="text-xl">Perfil Cognitivo por Dimensão</CardTitle>
                <p className="text-sm text-gray-600">Estimativa baseada no seu padrão de respostas</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {cognitiveAreas.map((area, idx) => {
                const Icon = area.icon;
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className={`h-5 w-5 ${area.color}`} />
                        <div>
                          <span className="font-medium text-gray-700">{area.name}</span>
                          <p className="text-xs text-gray-500">{area.description}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-gray-600">{area.score}%</span>
                    </div>
                    <Progress value={area.score} className="h-3" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
          <Card className={`transition-all duration-700 delay-300 ${showAnimation ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            <CardHeader>
              <CardTitle className="text-xl text-green-600 flex items-center">
                <Star className="h-5 w-5 mr-2" /> Pontos Fortes Identificados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {res.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start">
                    <Star className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{s}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className={`transition-all duration-700 delay-300 ${showAnimation ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
            <CardHeader>
              <CardTitle className="text-xl text-blue-600 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2" /> Dicas para Evoluir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {res.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start">
                    <Zap className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Study Resources */}
        <Card className={`mb-8 transition-all duration-700 delay-400 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-xl">Recursos para Desenvolvimento Cognitivo</CardTitle>
                <p className="text-sm text-gray-600">Sugestões por área para potencializar suas habilidades</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {studyResources.map((resource, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="font-semibold text-gray-800">{resource.title}</h4>
                  <ul className="space-y-2">
                    {resource.items.map((item, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2 flex-shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-gray-500 text-center mb-8">Este teste é recreativo e não equivale a uma medição oficial de QI. Use como ferramenta de estímulo cognitivo.</p>

        {/* Next Steps */}
        <Card className="bg-gradient-to-r from-sky-50 to-indigo-50 border-indigo-200">
          <CardContent className="text-center p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Continue Exercitando Sua Mente</h3>
            <p className="text-gray-600 mb-6">Explore outros testes para uma análise completa do seu perfil</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/tests/mental-health')} className="bg-indigo-600 hover:bg-indigo-700">Fazer Triagem de Saúde Mental</Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/tests/big-five')}>Fazer Teste Big Five</Button>
              <Button variant="outline" onClick={() => navigate('/ferramentas')}>Explorar Outros Testes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IQResults;
