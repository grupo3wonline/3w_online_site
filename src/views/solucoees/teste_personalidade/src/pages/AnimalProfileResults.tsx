
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star, Target, Users, ArrowLeft, Download, Share2, Shield } from 'lucide-react';
import { exportPDF, shareWhatsApp, shareEmail } from '@/utils/share';

const AnimalProfileResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || {};

  const calculateProfile = () => {
    const scores = { T: 0, G: 0, A: 0, L: 0 };
    Object.values(answers).forEach((answer: any) => {
      if (scores.hasOwnProperty(answer)) {
        scores[answer as keyof typeof scores]++;
      }
    });
    const total = Object.values(scores).reduce((sum, s) => sum + s, 0) || 1;
    const percentages = {
      T: Math.round((scores.T / total) * 100),
      G: Math.round((scores.G / total) * 100),
      A: Math.round((scores.A / total) * 100),
      L: Math.round((scores.L / total) * 100)
    };
    const maxScore = Math.max(...Object.values(scores));
    const dominant = Object.keys(scores).find(k => scores[k as keyof typeof scores] === maxScore) || 'T';
    return { scores, percentages, dominant };
  };

  const result = calculateProfile();

  const profiles: Record<string, any> = {
    T: {
      animal: "🦈 Tubarão",
      name: "Tubarão — Dominância",
      subtitle: "Prático, rápido, focado em resultados",
      description: "Você possui um perfil dominante e orientado para resultados. Como o Tubarão, é direto, ágil, competitivo e não tem medo de enfrentar desafios. Prefere ambientes dinâmicos onde possa exercer liderança e tomar decisões rápidas.",
      traits: ["Orientado para resultados", "Competitivo e ambicioso", "Tomada de decisão rápida", "Líder natural", "Alta energia e agilidade"],
      strengths: ["Determinação e foco", "Capacidade de liderança", "Agilidade na resolução de problemas", "Assertividade", "Orientação para metas"],
      challenges: ["Pode ser impaciente com processos lentos", "Tendência a ser autoritário", "Pode desconsiderar detalhes importantes", "Dificuldade em delegar", "Pode parecer intimidador"],
      tips: ["Pratique a escuta ativa com sua equipe", "Reserve tempo para planejar antes de agir", "Valorize os detalhes e processos", "Desenvolva empatia nas relações profissionais", "Aprenda a celebrar conquistas coletivas"],
      careers: ["Direção executiva", "Empreendedorismo", "Vendas de alto impacto", "Gestão de crises", "Consultoria estratégica"],
      color: "red"
    },
    G: {
      animal: "🐱 Gato",
      name: "Gato — Influência",
      subtitle: "Comunicativo, social, flexível e entusiasmado",
      description: "Seu perfil é marcado pela influência e sociabilidade. Como o Gato, você é comunicativo, flexível, adaptável e sabe como criar conexões com as pessoas ao seu redor. Tem facilidade para motivar equipes e criar ambientes positivos.",
      traits: ["Comunicativo e persuasivo", "Sociável e empático", "Flexível e adaptável", "Entusiasmado e otimista", "Criador de conexões"],
      strengths: ["Habilidade de comunicação", "Construção de relacionamentos", "Motivação de equipes", "Adaptabilidade", "Carisma e influência"],
      challenges: ["Pode dispersar-se facilmente", "Dificuldade com tarefas repetitivas", "Pode evitar conflitos necessários", "Tendência a ser superficial em análises", "Pode prometer mais do que entregar"],
      tips: ["Desenvolva foco e disciplina em projetos longos", "Aprenda a dar feedbacks difíceis quando necessário", "Estabeleça metas claras e mensuráveis", "Equilibre socialização com produtividade", "Pratique a organização pessoal"],
      careers: ["Relações públicas", "Marketing", "Recursos humanos", "Treinamento e desenvolvimento", "Vendas consultivas"],
      color: "yellow"
    },
    A: {
      animal: "🦅 Águia",
      name: "Águia — Estabilidade / Visão",
      subtitle: "Criativa, visionária, lógica e focada em regras",
      description: "Você tem o perfil visionário e estratégico da Águia. Consegue enxergar o panorama geral, é criativo na resolução de problemas e busca sempre o 'voo alto'. Combina lógica com visão de futuro, sendo preciso e focado em padrões.",
      traits: ["Visionário e estratégico", "Criativo e inovador", "Lógico e preciso", "Focado em regras e padrões", "Busca excelência"],
      strengths: ["Visão estratégica", "Pensamento criativo", "Capacidade analítica", "Planejamento de longo prazo", "Inovação"],
      challenges: ["Pode ser perfeccionista em excesso", "Dificuldade com tarefas operacionais", "Pode parecer distante ou frio", "Impaciência com falta de visão alheia", "Pode demorar para agir"],
      tips: ["Comunique sua visão de forma acessível", "Valorize as contribuições operacionais da equipe", "Equilibre planejamento com execução", "Desenvolva habilidades interpessoais", "Aceite que nem tudo precisa ser perfeito"],
      careers: ["Planejamento estratégico", "Inovação e P&D", "Arquitetura de sistemas", "Consultoria", "Gestão de projetos"],
      color: "blue"
    },
    L: {
      animal: "🐺 Lobo",
      name: "Lobo — Conformidade",
      subtitle: "Organizado, analítico, leal, disciplinado e metódico",
      description: "Seu perfil é o do Lobo: organizado, analítico, leal e disciplinado. Você é metódico em suas ações, valoriza a ordem e o planejamento. É confiável e trabalha melhor em ambientes com estrutura e regras claras.",
      traits: ["Organizado e metódico", "Analítico e detalhista", "Leal e confiável", "Disciplinado", "Orientado para qualidade"],
      strengths: ["Organização e planejamento", "Atenção aos detalhes", "Lealdade e comprometimento", "Trabalho consistente", "Qualidade e precisão"],
      challenges: ["Resistência a mudanças repentinas", "Pode ser inflexível", "Dificuldade em improvisar", "Pode ser excessivamente crítico", "Tendência a análise excessiva"],
      tips: ["Pratique a flexibilidade diante de mudanças", "Aprenda a tomar decisões com informações parciais", "Valorize a perspectiva de pessoas mais espontâneas", "Reserve espaço para criatividade", "Confie mais na sua intuição"],
      careers: ["Controladoria e finanças", "Auditoria", "Engenharia de processos", "Análise de dados", "Gestão da qualidade"],
      color: "green"
    }
  };

  const primary = profiles[result.dominant];

  if (!primary) {
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate('/ferramentas')} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Resultado — Perfil Animal</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => exportPDF('animal-result', 'resultado-perfil-animal.pdf')}>
                <Download className="h-4 w-4 mr-2" /> PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => shareEmail('Resultado - Perfil Animal', `Meu perfil animal: ${primary.name}`)}>
                <Share2 className="h-4 w-4 mr-2" /> E-mail
              </Button>
              <Button variant="outline" size="sm" onClick={() => shareWhatsApp(`Meu perfil animal é: ${primary.name}! Faça o teste: ${window.location.href}`)}>
                <Share2 className="h-4 w-4 mr-2" /> WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div id="animal-result" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4">
            <Shield className="h-4 w-4 mr-2" />
            Seu Perfil Animal
          </div>
          <h1 className="text-5xl mb-2">{primary.animal}</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{primary.name}</h2>
          <p className="text-lg text-gray-500">{primary.subtitle}</p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">{primary.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-amber-500" />
                  Características Principais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {primary.traits.map((t: string, i: number) => (
                    <div key={i} className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 mr-2" />
                      <span className="text-gray-700">{t}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader><CardTitle className="text-green-600">Pontos Fortes</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {primary.strengths.map((s: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <Star className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{s}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-orange-600">Áreas de Desenvolvimento</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {primary.challenges.map((c: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <Target className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{c}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader><CardTitle className="text-blue-600">Dicas de Desenvolvimento</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {primary.tips.map((t: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <Star className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{t}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-purple-600">Carreiras Recomendadas</CardTitle></CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {primary.careers.map((c: string, i: number) => (
                    <div key={i} className="flex items-center bg-purple-50 rounded-lg p-3">
                      <Target className="h-4 w-4 text-purple-500 mr-2" />
                      <span className="text-gray-700">{c}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
              <CardHeader>
                <CardTitle className="text-center text-amber-900">Sua Composição</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(result.percentages).map(([key, pct]) => {
                    const p = profiles[key];
                    return (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">{p.animal.split(' ')[0]} {p.name.split('—')[0]}</span>
                          <span className="text-sm font-semibold">{pct}%</span>
                        </div>
                        <Progress value={pct} className="h-3" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Próximos Passos</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" onClick={() => navigate('/tests/three-animals')}>Fazer Teste dos 3 Animais</Button>
                <Button variant="outline" className="w-full" onClick={() => navigate('/ferramentas')}>Explorar Outros Testes</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalProfileResults;
