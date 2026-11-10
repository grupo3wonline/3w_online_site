import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Sparkles, Download, Share2, Brain, Heart, Star, TrendingUp, Lightbulb, Users, Zap } from 'lucide-react';
import { exportPDF, shareWhatsApp, shareEmail } from '@/utils/share';
import { useEffect, useState } from 'react';

const MentalAgeResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAnimation, setShowAnimation] = useState(false);
  const mentalAge: number = location.state?.mentalAge ?? 0;

  useEffect(() => { setShowAnimation(true); }, []);

  const interpret = (age: number) => {
    if (age < 18) return {
      label: 'Espírito Jovem', color: 'bg-emerald-500', borderColor: 'border-emerald-200',
      textColor: 'text-emerald-600', bgLight: 'bg-emerald-50', emoji: '🌱',
      text: 'Curioso(a), espontâneo(a) e aberto(a) ao novo. Leveza e flexibilidade são seus pontos fortes.',
      traits: ['Curiosidade insaciável', 'Entusiasmo contagiante', 'Criatividade natural', 'Adaptabilidade', 'Espontaneidade'],
      strengths: ['Abertura para novas experiências', 'Capacidade de se reinventar', 'Otimismo e energia', 'Pensamento criativo e inovador'],
      challenges: ['Pode ter dificuldade com compromissos de longo prazo', 'Tendência a agir por impulso', 'Resistência a rotinas', 'Pode subestimar riscos'],
      tips: ['Cultive disciplina em pequenas doses — comece com metas diárias simples', 'Canalize sua energia criativa em projetos concretos', 'Pratique ouvir antes de reagir', 'Busque mentores que complementem sua impulsividade com experiência'],
      activities: ['Grupos de estudo e troca de ideias', 'Esportes de equipe ou aventura', 'Cursos online sobre temas variados', 'Diário de gratidão e reflexão'],
      famous: 'Personalidades com espírito jovem incluem inventores, artistas disruptivos e empreendedores inovadores.'
    };
    if (age < 26) return {
      label: 'Equilíbrio Jovem-Adulto', color: 'bg-teal-500', borderColor: 'border-teal-200',
      textColor: 'text-teal-600', bgLight: 'bg-teal-50', emoji: '⚡',
      text: 'Bom equilíbrio entre ousadia e responsabilidade. Sabe se adaptar e aprender rápido.',
      traits: ['Versatilidade', 'Abertura ao aprendizado', 'Adaptabilidade social', 'Ambição saudável', 'Energia empática'],
      strengths: ['Equilíbrio entre emoção e razão', 'Facilidade para trabalhar em equipe', 'Capacidade de aprendizado rápido', 'Boa gestão de relacionamentos'],
      challenges: ['Pode se sentir indeciso(a) entre caminhos', 'Ansiedade frente a grandes decisões', 'Dificuldade em estabelecer prioridades', 'Tendência ao perfeccionismo'],
      tips: ['Escolha 2-3 prioridades e foque nelas', 'Pratique a tomada de decisão — aceite que nem toda escolha será perfeita', 'Invista em autoconhecimento', 'Busque equilíbrio entre trabalho e lazer'],
      activities: ['Networking e eventos profissionais', 'Esportes e atividades ao ar livre', 'Leitura de desenvolvimento pessoal', 'Voluntariado e projetos sociais'],
      famous: 'Esse perfil é comum entre líderes emergentes, empreendedores jovens e profissionais em ascensão.'
    };
    if (age < 36) return {
      label: 'Maturidade em Ascensão', color: 'bg-indigo-500', borderColor: 'border-indigo-200',
      textColor: 'text-indigo-600', bgLight: 'bg-indigo-50', emoji: '🎯',
      text: 'Prático(a) e focado(a) em objetivos, mantendo curiosidade e abertura para o novo.',
      traits: ['Foco e determinação', 'Pragmatismo', 'Capacidade de planejamento', 'Inteligência emocional em desenvolvimento', 'Assertividade'],
      strengths: ['Excelente capacidade de execução', 'Bom senso de prioridades', 'Equilíbrio entre ambição e realismo', 'Comunicação assertiva'],
      challenges: ['Pode se isolar em excesso para produzir', 'Risco de burnout por excesso de foco', 'Dificuldade em delegar tarefas', 'Pode negligenciar relacionamentos pessoais'],
      tips: ['Delegue tarefas — você não precisa fazer tudo sozinho(a)', 'Reserve tempo intencional para família e amigos', 'Mantenha hobbies que não sejam produtivos — diversão pelo prazer', 'Pratique mindfulness para manter equilíbrio mental'],
      activities: ['Meditação e mindfulness', 'Planejamento financeiro de longo prazo', 'Cursos de liderança e gestão', 'Viagens culturais e experiências transformadoras'],
      famous: 'Perfil típico de gestores eficientes, consultores e profissionais especializados em alta performance.'
    };
    if (age < 46) return {
      label: 'Mente Experiente', color: 'bg-purple-500', borderColor: 'border-purple-200',
      textColor: 'text-purple-600', bgLight: 'bg-purple-50', emoji: '🧭',
      text: 'Reflexão, prudência e visão de longo prazo. Ótimo(a) conselheiro(a) e estrategista.',
      traits: ['Sabedoria prática', 'Paciência', 'Visão estratégica', 'Empatia profunda', 'Resiliência emocional'],
      strengths: ['Capacidade de mentoria e aconselhamento', 'Visão de longo prazo', 'Resiliência frente a crises', 'Habilidade de mediar conflitos'],
      challenges: ['Pode resistir a novas tecnologias ou tendências', 'Risco de se acomodar na zona de conforto', 'Dificuldade em aceitar erros alheios', 'Tendência a ruminar o passado'],
      tips: ['Mantenha-se atualizado — a curiosidade é uma aliada', 'Busque novos desafios fora da zona de conforto', 'Compartilhe sua experiência — seja mentor(a)', 'Pratique autocuidado físico regularmente'],
      activities: ['Mentoria e coaching', 'Leitura de filosofia e autoconhecimento', 'Caminhadas contemplativas', 'Participação em conselhos e grupos de discussão'],
      famous: 'Perfil encontrado em conselheiros, diretores executivos, professores experientes e líderes comunitários.'
    };
    return {
      label: 'Sabedoria Sólida', color: 'bg-rose-500', borderColor: 'border-rose-200',
      textColor: 'text-rose-600', bgLight: 'bg-rose-50', emoji: '🌳',
      text: 'Tranquilidade, profundidade e perspectiva. Valoriza estabilidade e relações significativas.',
      traits: ['Serenidade', 'Profundidade emocional', 'Perspectiva ampla', 'Sabedoria acumulada', 'Valorização do essencial'],
      strengths: ['Capacidade de aconselhar com propriedade', 'Estabilidade emocional', 'Foco no que realmente importa', 'Paciência e tolerância elevadas'],
      challenges: ['Pode se tornar inflexível', 'Risco de isolamento social', 'Dificuldade com mudanças rápidas', 'Pode subestimar ideias inovadoras'],
      tips: ['Mantenha conexões sociais ativas — cultive amizades', 'Explore novas tecnologias com curiosidade', 'Pratique atividade física regular para vitalidade', 'Transmita sua sabedoria escrevendo ou ensinando'],
      activities: ['Escrita criativa ou memórias', 'Jardinagem ou artesanato', 'Grupos de conversa e reflexão', 'Atividades físicas leves como yoga ou caminhada'],
      famous: 'Perfil associado a filósofos, escritores renomados, mentores espirituais e líderes comunitários respeitados.'
    };
  };

  const res = interpret(mentalAge);

  const dimensionScores = [
    { name: 'Maturidade Emocional', score: Math.min(100, Math.max(20, mentalAge * 2.2)), icon: Heart, color: 'text-red-500' },
    { name: 'Responsabilidade', score: Math.min(100, Math.max(15, mentalAge * 2.0)), icon: Star, color: 'text-yellow-500' },
    { name: 'Abertura a Experiências', score: Math.min(100, Math.max(30, 110 - mentalAge * 1.5)), icon: Zap, color: 'text-blue-500' },
    { name: 'Inteligência Social', score: Math.min(100, Math.max(25, mentalAge * 1.8)), icon: Users, color: 'text-green-500' },
    { name: 'Capacidade Reflexiva', score: Math.min(100, Math.max(20, mentalAge * 2.1)), icon: Brain, color: 'text-purple-500' },
    { name: 'Resiliência', score: Math.min(100, Math.max(25, mentalAge * 1.9)), icon: TrendingUp, color: 'text-indigo-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50">
      <Helmet>
        <title>Resultado — Idade Mental</title>
        <meta name="description" content="Veja sua idade mental estimada de forma divertida e as interpretações do seu perfil." />
        <link rel="canonical" href={window.location.origin + '/tests/mental-age/results'} />
      </Helmet>

      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate('/ferramentas')} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
              </Button>
              <h1 className="text-xl font-bold text-gray-900 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-yellow-500" /> Resultado — Idade Mental
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => exportPDF('ma-result', 'resultado-idade-mental.pdf')}>
                <Download className="h-4 w-4 mr-2" /> PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => shareEmail('Resultado — Idade Mental', `Veja meu resultado da idade mental: ${window.location.href}`)}>
                <Share2 className="h-4 w-4 mr-2" /> E-mail
              </Button>
              <Button variant="outline" size="sm" onClick={() => shareWhatsApp(`Meu resultado — Idade Mental: ${window.location.href}`)}>
                <Share2 className="h-4 w-4 mr-2" /> WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div id="ma-result" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Animation */}
        <div className={`text-center mb-8 transition-all duration-1000 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
            <Sparkles className="h-8 w-8 text-amber-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Teste Concluído!</h2>
          <p className="text-lg text-gray-600">Veja o que sua idade mental revela sobre você</p>
        </div>

        {/* Main Result */}
        <Card className={`mb-8 border-2 ${res.borderColor} transition-all duration-700 ${showAnimation ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <CardHeader className="text-center pb-2">
            <div className="text-6xl mb-4">{res.emoji}</div>
            <Badge className={`${res.color} text-white mb-3 text-sm px-4 py-1`}>{res.label}</Badge>
            <CardTitle className="text-5xl text-gray-900 mb-2">{mentalAge} anos</CardTitle>
            <p className="text-lg text-gray-500">Sua idade mental estimada</p>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 text-center mt-2 max-w-2xl mx-auto leading-relaxed">{res.text}</p>
          </CardContent>
        </Card>

        {/* Dimension Scores */}
        <Card className={`mb-8 transition-all duration-700 delay-200 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Brain className="h-6 w-6 text-amber-600" />
              </div>
              <CardTitle className="text-xl">Dimensões da Maturidade Mental</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {dimensionScores.map((dim, idx) => {
                const Icon = dim.icon;
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon className={`h-4 w-4 ${dim.color}`} />
                        <span className="font-medium text-gray-700">{dim.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-600">{Math.round(dim.score)}%</span>
                    </div>
                    <Progress value={dim.score} className="h-2.5" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Traits */}
          <Card className={`transition-all duration-700 delay-300 ${showAnimation ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${res.bgLight} rounded-full flex items-center justify-center`}>
                  <Star className={`h-6 w-6 ${res.textColor}`} />
                </div>
                <CardTitle className="text-xl">Traços de Personalidade</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {res.traits.map((trait, idx) => (
                  <Badge key={idx} variant="secondary" className="px-3 py-1.5 text-sm">{trait}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Strengths */}
          <Card className={`transition-all duration-700 delay-300 ${showAnimation ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
            <CardHeader>
              <CardTitle className="text-xl text-green-600 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" /> Pontos Fortes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {res.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start">
                    <Star className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{s}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Challenges */}
          <Card className={`transition-all duration-700 delay-400 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <CardHeader>
              <CardTitle className="text-xl text-orange-600 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2" /> Pontos de Atenção
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {res.challenges.map((c, idx) => (
                  <li key={idx} className="flex items-start">
                    <Lightbulb className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{c}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className={`transition-all duration-700 delay-400 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <CardHeader>
              <CardTitle className="text-xl text-blue-600 flex items-center">
                <Zap className="h-5 w-5 mr-2" /> Dicas de Desenvolvimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
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

        {/* Activities */}
        <Card className={`mb-8 transition-all duration-700 delay-500 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-xl">Atividades Recomendadas</CardTitle>
                <p className="text-sm text-gray-600">Atividades que podem enriquecer seu perfil de maturidade</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {res.activities.map((activity, idx) => (
                <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">{activity}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fun Fact */}
        <Card className={`mb-8 ${res.bgLight} border ${res.borderColor}`}>
          <CardContent className="p-6">
            <p className={`${res.textColor} text-center font-medium`}>💡 {res.famous}</p>
          </CardContent>
        </Card>

        <p className="text-xs text-gray-500 text-center mb-8">Este resultado é recreativo e não possui validade clínica. Use como ferramenta de autoconhecimento e reflexão.</p>

        {/* Next Steps */}
        <Card className="bg-gradient-to-r from-amber-50 to-rose-50 border-amber-200">
          <CardContent className="text-center p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Continue sua Jornada de Autoconhecimento</h3>
            <p className="text-gray-600 mb-6">Complete outros testes para uma visão 360° do seu perfil</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/tests/iq')} className="bg-indigo-600 hover:bg-indigo-700">Fazer Teste de Raciocínio Cognitivo</Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/tests/enneagram')}>Fazer Teste de Eneagrama</Button>
              <Button variant="outline" onClick={() => navigate('/ferramentas')}>Explorar Outros Testes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MentalAgeResults;
