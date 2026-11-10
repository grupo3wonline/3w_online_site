
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star, Target, ArrowLeft, Download, Share2, BarChart3 } from 'lucide-react';
import { exportPDF, shareWhatsApp, shareEmail } from '@/utils/share';

const profileData: Record<string, any> = {
  E: {
    name: "Executor",
    emoji: "🚀",
    description: "O Executor é orientado para a ação e resultados. Você é prático, direto, competitivo e não perde tempo. Prefere agir rapidamente e valoriza a eficiência acima de tudo.",
    traits: ["Orientado para resultados", "Prático e direto", "Competitivo", "Rápido na ação", "Foco em entregas"],
    strengths: ["Alta produtividade", "Capacidade de execução", "Tomada de decisão rápida", "Foco em resultados", "Liderança operacional"],
    challenges: ["Impaciência", "Pode pular etapas importantes", "Dificuldade em delegar", "Pode ser autoritário", "Pouco cuidado com detalhes"],
    ideal_roles: ["Gerente de operações", "Diretor executivo", "Empreendedor", "Líder de vendas", "Gerente de projetos ágeis"],
    color: "red"
  },
  C: {
    name: "Comunicador",
    emoji: "🗣️",
    description: "O Comunicador é orientado para pessoas e relacionamentos. Você é carismático, persuasivo, sociável e cria conexões naturalmente. Motiva equipes e cria ambientes positivos.",
    traits: ["Sociável e carismático", "Persuasivo", "Motivador de equipes", "Criativo em comunicação", "Empático e acessível"],
    strengths: ["Habilidade interpessoal", "Persuasão e influência", "Motivação de equipes", "Networking", "Gestão de relacionamentos"],
    challenges: ["Dispersão", "Superficialidade em análises", "Dificuldade com rotinas", "Pode prometer demais", "Evita confrontos"],
    ideal_roles: ["Relações públicas", "RH e gestão de pessoas", "Marketing e comunicação", "Treinamento corporativo", "Vendas consultivas"],
    color: "yellow"
  },
  P: {
    name: "Planejador",
    emoji: "📋",
    description: "O Planejador é orientado para processos e organização. Você é metódico, confiável, estável e valoriza a ordem. Prefere ambientes previsíveis e planeja cada detalhe.",
    traits: ["Organizado e metódico", "Confiável e estável", "Focado em processos", "Disciplinado", "Consistente"],
    strengths: ["Organização excepcional", "Confiabilidade", "Gestão de processos", "Planejamento de longo prazo", "Estabilidade operacional"],
    challenges: ["Resistência a mudanças", "Pode ser lento em decisões", "Dificuldade com imprevistos", "Pouca flexibilidade", "Pode ser inflexível"],
    ideal_roles: ["Gerente de processos", "Planejamento estratégico", "Gestão da qualidade", "PMO", "Logística e supply chain"],
    color: "green"
  },
  A: {
    name: "Analista",
    emoji: "🔬",
    description: "O Analista é orientado para dados e qualidade. Você é preciso, detalhista, criterioso e busca a excelência. Prefere decisões baseadas em evidências e fatos.",
    traits: ["Analítico e detalhista", "Preciso e criterioso", "Orientado por dados", "Busca excelência", "Meticuloso"],
    strengths: ["Precisão e qualidade", "Capacidade analítica", "Pensamento crítico", "Atenção aos detalhes", "Expertise técnica"],
    challenges: ["Perfeccionismo", "Análise excessiva (paralysis)", "Pode ser exigente demais", "Dificuldade com prazos curtos", "Crítico em excesso"],
    ideal_roles: ["Analista de dados", "Engenheiro de qualidade", "Auditor", "Pesquisador", "Consultor técnico"],
    color: "blue"
  }
};

const ProfilerResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || {};

  const calculateResults = () => {
    const scores: Record<string, number> = { E: 0, C: 0, P: 0, A: 0 };
    Object.values(answers).forEach((a: any) => { if (scores.hasOwnProperty(a)) scores[a]++; });
    const total = Object.values(scores).reduce((s, v) => s + v, 0) || 1;
    const percentages: Record<string, number> = {};
    Object.keys(scores).forEach(k => { percentages[k] = Math.round((scores[k] / total) * 100); });
    const maxScore = Math.max(...Object.values(scores));
    const dominant = Object.keys(scores).find(k => scores[k] === maxScore) || 'E';
    return { scores, percentages, dominant };
  };

  const result = calculateResults();
  const primary = profileData[result.dominant];

  if (!primary) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8"><CardContent className="text-center">
          <h2 className="text-xl font-bold mb-4">Erro nos Resultados</h2>
          <Button onClick={() => navigate('/ferramentas')}>Voltar</Button>
        </CardContent></Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate('/ferramentas')} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Resultado — Profiler</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => exportPDF('profiler-result', 'resultado-profiler.pdf')}>
                <Download className="h-4 w-4 mr-2" /> PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => shareEmail('Resultado Profiler', `Meu perfil: ${primary.name}`)}>
                <Share2 className="h-4 w-4 mr-2" /> E-mail
              </Button>
              <Button variant="outline" size="sm" onClick={() => shareWhatsApp(`Meu perfil Profiler: ${primary.emoji} ${primary.name}!`)}>
                <Share2 className="h-4 w-4 mr-2" /> WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div id="profiler-result" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-4">
            <BarChart3 className="h-4 w-4 mr-2" /> Seu Perfil Profiler
          </div>
          <div className="text-5xl mb-2">{primary.emoji}</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{primary.name}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{primary.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader><CardTitle className="text-teal-600">Características Principais</CardTitle></CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {primary.traits.map((t: string, i: number) => (
                    <div key={i} className="flex items-center"><Star className="h-4 w-4 text-teal-500 mr-2" /><span className="text-gray-700">{t}</span></div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader><CardTitle className="text-green-600">Pontos Fortes</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-2">{primary.strengths.map((s: string, i: number) => (
                    <li key={i} className="flex items-start"><Star className="h-4 w-4 text-green-500 mr-2 mt-0.5" /><span className="text-gray-700">{s}</span></li>
                  ))}</ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-orange-600">Áreas de Desenvolvimento</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-2">{primary.challenges.map((c: string, i: number) => (
                    <li key={i} className="flex items-start"><Target className="h-4 w-4 text-orange-500 mr-2 mt-0.5" /><span className="text-gray-700">{c}</span></li>
                  ))}</ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader><CardTitle className="text-blue-600">Funções Ideais</CardTitle></CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {primary.ideal_roles.map((r: string, i: number) => (
                    <div key={i} className="flex items-center bg-blue-50 rounded-lg p-3">
                      <Target className="h-4 w-4 text-blue-500 mr-2" /><span className="text-gray-700">{r}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
              <CardHeader><CardTitle className="text-center text-teal-900">Composição do Perfil</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(result.percentages).map(([key, pct]) => {
                    const p = profileData[key];
                    return (
                      <div key={key} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{p.emoji} {p.name}</span>
                          <span className="font-semibold">{pct}%</span>
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
                <Button className="w-full" onClick={() => navigate('/tests/big-five')}>Fazer Teste Big Five</Button>
                <Button variant="outline" className="w-full" onClick={() => navigate('/ferramentas')}>Explorar Outros Testes</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilerResults;
