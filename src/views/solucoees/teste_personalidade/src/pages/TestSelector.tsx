
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, Users, TrendingUp, Clock, CheckCircle, ArrowLeft, HeartPulse, Sparkles, Brain, Shield, Eye, Leaf, BarChart3, Layers, Compass, Award, Flame } from 'lucide-react';

const TestSelector = () => {
  const navigate = useNavigate();

  const tests = [
    {
      id: 'vocational',
      title: 'Teste Vocacional Completo',
      description: 'Análise profunda de 50 questões para identificar sua verdadeira vocação profissional baseada em interesses, habilidades e valores pessoais',
      icon: Target,
      color: 'blue',
      duration: '25-30 min',
      questions: '50 perguntas',
      benefits: [
        'Análise detalhada de 12 áreas profissionais',
        'Identifica compatibilidade por setor',
        'Sugere carreiras específicas e emergentes',
        'Recomenda cursos universitários e técnicos',
        'Avalia alinhamento com valores pessoais'
      ]
    },
    {
      id: 'enneagram',
      title: 'Eneagrama Profissional',
      description: 'Teste abrangente de 60 questões para revelar seu tipo de personalidade, motivações inconscientes e padrões comportamentais no trabalho',
      icon: Users,
      color: 'indigo',
      duration: '30-35 min',
      questions: '60 perguntas',
      benefits: [
        'Identifica 1 dos 9 tipos de personalidade',
        'Explica motivações e medos fundamentais',
        'Revela padrões de estresse e crescimento',
        'Oferece estratégias de desenvolvimento pessoal',
        'Melhora relacionamentos interpessoais'
      ]
    },
    {
      id: 'disc',
      title: 'Avaliação DISC Comportamental',
      description: 'Análise completa de 60 situações para mapear seu perfil comportamental, estilo de comunicação e preferências de trabalho em equipe',
      icon: TrendingUp,
      color: 'purple',
      duration: '25-30 min',
      questions: '60 situações',
      benefits: [
        'Define perfil DISC dominante e secundário',
        'Analisa estilo de comunicação preferido',
        'Identifica motivadores e estressores',
        'Oferece dicas para trabalho em equipe',
        'Desenvolve competências de liderança'
      ]
    },
    {
      id: 'mental-health',
      title: 'Triagem de Saúde Mental',
      description: 'Avaliação educativa expandida com 18 indicadores para monitorar sinais de humor, ansiedade e bem-estar emocional baseada em escalas clínicas',
      icon: HeartPulse,
      color: 'blue',
      duration: '10-15 min',
      questions: '18 perguntas',
      benefits: [
        'Triagem abrangente de humor e ansiedade',
        'Identifica sinais de alerta precoces',
        'Oferece recursos de apoio e orientação',
        'Recomenda quando buscar ajuda profissional',
        'Monitora progresso ao longo do tempo'
      ]
    },
    {
      id: 'mental-age',
      title: 'Teste de Maturidade Mental',
      description: 'Avaliação divertida e educativa com 48 questões sobre maturidade emocional, tomada de decisões e perspectiva de vida',
      icon: Sparkles,
      color: 'indigo',
      duration: '15-20 min',
      questions: '48 perguntas',
      benefits: [
        'Avalia maturidade emocional e social',
        'Analisa estilo de tomada de decisões',
        'Identifica áreas de crescimento pessoal',
        'Oferece insights sobre perspectiva de vida',
        'Entretenimento educativo e reflexivo'
      ]
    },
    {
      id: 'iq',
      title: 'Teste de Raciocínio Cognitivo',
      description: 'Avaliação recreativa expandida com 40 questões de lógica, raciocínio verbal, matemático e espacial para estimular capacidades cognitivas',
      icon: Brain,
      color: 'purple',
      duration: '25-30 min',
      questions: '40 perguntas',
      benefits: [
        'Avalia múltiplas dimensões cognitivas',
        'Exercita raciocínio lógico e criativo',
        'Oferece feedback detalhado por área',
        'Sugere atividades para desenvolvimento',
        'Compara com percentis populacionais'
      ]
    },
    {
      id: 'animal-profile',
      title: 'Perfil Animal — Águia, Gato, Lobo, Tubarão',
      description: 'Descubra qual animal representa seu estilo comportamental no trabalho: liderança, criatividade, organização ou ação estratégica',
      icon: Shield,
      color: 'amber',
      duration: '15-20 min',
      questions: '30 perguntas',
      benefits: [
        'Identifica seu perfil animal dominante',
        'Revela seu estilo de trabalho e comunicação',
        'Mostra pontos fortes e desafios',
        'Sugere carreiras ideais por perfil',
        'Melhora o autoconhecimento profissional'
      ]
    },
    {
      id: 'three-animals',
      title: 'Teste dos 3 Animais',
      description: 'Teste psicológico que revela 3 dimensões de sua personalidade: como você quer ser visto, quem realmente é e como os outros te percebem',
      icon: Eye,
      color: 'emerald',
      duration: '15-20 min',
      questions: '27 perguntas',
      benefits: [
        'Revela 3 facetas da personalidade',
        'Compara eu ideal, real e percebido',
        'Identifica gaps de autopercepção',
        'Orienta desenvolvimento pessoal',
        'Melhora inteligência emocional'
      ]
    },
    {
      id: 'tropical-forest',
      title: 'Teste da Floresta Tropical',
      description: 'Exercício vivencial que revela sua hierarquia de valores através de escolhas simbólicas entre necessidades, carreira, orgulho, família e amor',
      icon: Leaf,
      color: 'green',
      duration: '12-15 min',
      questions: '25 perguntas',
      benefits: [
        'Revela hierarquia de valores pessoais',
        'Conecta valores a animais simbólicos',
        'Orienta decisões de vida e carreira',
        'Promove reflexão sobre prioridades',
        'Ferramenta de coaching e autoconhecimento'
      ]
    },
    {
      id: 'profiler',
      title: 'Teste Profiler — ECPA',
      description: 'Avaliação comportamental que mapeia seu perfil entre Executor, Comunicador, Planejador e Analista para otimizar sua atuação profissional',
      icon: BarChart3,
      color: 'teal',
      duration: '12-15 min',
      questions: '25 perguntas',
      benefits: [
        'Mapeia perfil ECPA dominante',
        'Identifica estilo de trabalho ideal',
        'Sugere papéis e funções adequados',
        'Melhora produtividade e satisfação',
        'Complementa análise DISC'
      ]
    },
    {
      id: 'big-five',
      title: 'Teste Big Five — 5 Grandes Fatores',
      description: 'Modelo científico que avalia os 5 grandes traços de personalidade: Abertura, Conscienciosidade, Extroversão, Amabilidade e Neuroticismo',
      icon: Layers,
      color: 'rose',
      duration: '15-20 min',
      questions: '25 perguntas',
      benefits: [
        'Baseado no modelo científico mais validado',
        'Avalia 5 dimensões fundamentais',
        'Mostra níveis alto/baixo por traço',
        'Fornece insights para crescimento',
        'Aplicável em RH e coaching'
      ]
    },
    {
      id: 'mbti',
      title: 'Teste MBTI — 16 Personalidades',
      description: 'Descubra seu tipo entre as 16 personalidades MBTI, combinando preferências de energia, percepção, decisão e estilo de vida',
      icon: Compass,
      color: 'violet',
      duration: '15-20 min',
      questions: '28 perguntas',
      benefits: [
        'Identifica tipo entre 16 personalidades',
        'Analisa 4 dimensões de preferência',
        'Sugere carreiras e ambientes ideais',
        'Reconhecido mundialmente em RH',
        'Melhora comunicação e relacionamentos'
      ]
    },
    {
      id: 'star',
      title: 'Técnica STAR — Competências',
      description: 'Avalie como você estrutura respostas comportamentais usando Situação, Tarefa, Ação e Resultado — essencial para entrevistas e autoavaliação',
      icon: Award,
      color: 'amber',
      duration: '12-15 min',
      questions: '25 perguntas',
      benefits: [
        'Avalia domínio da técnica STAR',
        'Mede 5 competências comportamentais',
        'Prepara para entrevistas por competência',
        'Fornece dicas práticas de melhoria',
        'Ferramenta essencial para carreiras'
      ]
    },
    {
      id: 'temperament',
      title: 'Teste de Temperamento',
      description: 'Descubra seu temperamento entre Colérico, Sanguíneo, Fleumático e Melancólico — uma abordagem clássica de autoconhecimento',
      icon: Flame,
      color: 'red',
      duration: '15-18 min',
      questions: '28 perguntas',
      benefits: [
        'Identifica temperamento dominante e secundário',
        'Revela motivações e estressores naturais',
        'Sugere carreiras por temperamento',
        'Melhora relacionamentos interpessoais',
        'Abordagem clássica com base histórica'
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; button: string; border: string }> = {
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700',
        border: 'border-blue-200'
      },
      indigo: {
        bg: 'bg-indigo-100',
        text: 'text-indigo-600',
        button: 'bg-indigo-600 hover:bg-indigo-700',
        border: 'border-indigo-200'
      },
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        button: 'bg-purple-600 hover:bg-purple-700',
        border: 'border-purple-200'
      },
      amber: {
        bg: 'bg-amber-100',
        text: 'text-amber-600',
        button: 'bg-amber-600 hover:bg-amber-700',
        border: 'border-amber-200'
      },
      emerald: {
        bg: 'bg-emerald-100',
        text: 'text-emerald-600',
        button: 'bg-emerald-600 hover:bg-emerald-700',
        border: 'border-emerald-200'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        button: 'bg-green-600 hover:bg-green-700',
        border: 'border-green-200'
      },
      teal: {
        bg: 'bg-teal-100',
        text: 'text-teal-600',
        button: 'bg-teal-600 hover:bg-teal-700',
        border: 'border-teal-200'
      },
      rose: {
        bg: 'bg-rose-100',
        text: 'text-rose-600',
        button: 'bg-rose-600 hover:bg-rose-700',
        border: 'border-rose-200'
      },
      violet: {
        bg: 'bg-violet-100',
        text: 'text-violet-600',
        button: 'bg-violet-600 hover:bg-violet-700',
        border: 'border-violet-200'
      },
      red: {
        bg: 'bg-red-100',
        text: 'text-red-600',
        button: 'bg-red-600 hover:bg-red-700',
        border: 'border-red-200'
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Helmet>
        <title>Escolha seu Teste — DiagnósticoPRO</title>
        <meta name="description" content="Selecione entre Teste Vocacional, Eneagrama, DISC, Saúde Mental, Idade Mental e QI. Gratuitos e com resultados imediatos." />
        <link rel="canonical" href={window.location.origin + '/ferramentas'} />
      </Helmet>
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Escolha seu Teste</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <span className="ml-2 text-sm font-medium text-blue-600">Escolher Teste</span>
              </div>
              <div className="w-16 h-1 bg-gray-200 rounded"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <span className="ml-2 text-sm font-medium text-gray-500">Responder</span>
              </div>
              <div className="w-16 h-1 bg-gray-200 rounded"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <span className="ml-2 text-sm font-medium text-gray-500">Resultados</span>
              </div>
            </div>
          </div>
          <Progress value={33} className="w-full max-w-md mx-auto" />
        </div>

        {/* Test Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {tests.map((test) => {
            const colors = getColorClasses(test.color);
            const Icon = test.icon;
            
            return (
              <Card key={test.id} className={`hover:shadow-lg transition-all duration-300 border-2 hover:${colors.border}`}>
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mb-4`}>
                    <Icon className={`h-8 w-8 ${colors.text}`} />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{test.title}</CardTitle>
                  <p className="text-gray-600 text-sm mt-2">{test.description}</p>
                </CardHeader>
                
                <CardContent>
                  <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {test.duration}
                    </div>
                    <div>{test.questions}</div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {test.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full ${colors.button}`}
                    onClick={() => navigate(`/tests/${test.id}`)}
                  >
                    Iniciar {test.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* All Tests Button */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-100">
            <CardContent className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                🎯 Experiência Completa
              </h3>
              <p className="text-gray-600 mb-6">
                Para uma análise mais profunda, recomendamos fazer todos os testes. 
                Você terá uma visão 360° do seu perfil profissional e comportamental.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  onClick={() => navigate('/tests/vocational')}
                >
                  Fazer Todos os Testes
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/')}
                >
                  Ver mais detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TestSelector;
