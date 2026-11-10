
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star, Target, ArrowLeft, Download, Share2, Layers } from 'lucide-react';
import { exportPDF, shareWhatsApp, shareEmail } from '@/utils/share';

const dimensionData: Record<string, any> = {
  O: {
    name: "Abertura à Experiência",
    emoji: "🎨",
    high: "Você é altamente aberto a novas experiências, curioso, criativo e imaginativo. Busca novidades, aprecia arte e ideias abstratas.",
    low: "Você prefere o familiar e convencional. É prático, realista e valoriza a tradição e a previsibilidade.",
    traits_high: ["Curioso e explorador", "Criativo e imaginativo", "Aberto a novas ideias", "Aprecia arte e cultura", "Pensamento abstrato"],
    traits_low: ["Prático e realista", "Prefere rotinas", "Tradicional", "Convencional", "Concreto"],
    color: "purple"
  },
  C: {
    name: "Conscienciosidade",
    emoji: "📋",
    high: "Você é muito organizado, disciplinado, responsável e orientado a metas. Cumpre prazos e mantém altos padrões de qualidade.",
    low: "Você prefere flexibilidade e espontaneidade. Pode ter dificuldade com rotinas rígidas mas é adaptável.",
    traits_high: ["Organizado e metódico", "Disciplinado", "Responsável", "Orientado a metas", "Persistente"],
    traits_low: ["Espontâneo", "Flexível", "Despreocupado", "Adaptável", "Informal"],
    color: "blue"
  },
  E: {
    name: "Extroversão",
    emoji: "🎉",
    high: "Você é sociável, energético, comunicativo e gosta de estar rodeado de pessoas. Busca estímulo social e tende a ser otimista.",
    low: "Você é mais reservado, reflexivo e prefere ambientes tranquilos. Recarrega suas energias na solitude.",
    traits_high: ["Sociável e comunicativo", "Energético", "Assertivo", "Otimista", "Gregário"],
    traits_low: ["Reservado e reflexivo", "Independente", "Calmo", "Introspectivo", "Autossuficiente"],
    color: "yellow"
  },
  A: {
    name: "Agradabilidade",
    emoji: "🤝",
    high: "Você é empático, cooperativo, confiante e altruísta. Valoriza harmonia nas relações e tende a evitar conflitos.",
    low: "Você é mais competitivo, cético e direto. Não tem medo de confrontos e valoriza a honestidade acima da diplomacia.",
    traits_high: ["Empático e compassivo", "Cooperativo", "Confiante", "Altruísta", "Harmonioso"],
    traits_low: ["Competitivo", "Direto e assertivo", "Cético", "Independente", "Analítico"],
    color: "green"
  },
  N: {
    name: "Neuroticismo",
    emoji: "🌊",
    high: "Você tende a experimentar mais emoções negativas como ansiedade, preocupação e instabilidade emocional. É sensível a estressores.",
    low: "Você é emocionalmente estável, calmo e resiliente. Lida bem com pressão e se recupera rapidamente de adversidades.",
    traits_high: ["Sensível emocionalmente", "Preocupado", "Reativo ao estresse", "Vulnerável", "Ansioso"],
    traits_low: ["Emocionalmente estável", "Calmo e resiliente", "Seguro", "Imperturbável", "Equilibrado"],
    color: "red"
  }
};

const BigFiveResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || {};
  const questionsData = location.state?.questions || [];

  const calculateResults = () => {
    const scores: Record<string, number[]> = { O: [], C: [], E: [], A: [], N: [] };

    questionsData.forEach((q: any, idx: number) => {
      const answer = parseInt(answers[idx]) || 3;
      const score = q.reverse ? (6 - answer) : answer;
      if (scores[q.dimension]) scores[q.dimension].push(score);
    });

    const averages: Record<string, number> = {};
    const percentages: Record<string, number> = {};
    Object.keys(scores).forEach(key => {
      const arr = scores[key];
      const avg = arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 3;
      averages[key] = avg;
      percentages[key] = Math.round((avg / 5) * 100);
    });

    return { averages, percentages };
  };

  const result = calculateResults();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate('/ferramentas')} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Resultado — Big Five</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => exportPDF('bigfive-result', 'resultado-big-five.pdf')}>
                <Download className="h-4 w-4 mr-2" /> PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => shareEmail('Resultado Big Five', 'Veja meu resultado do teste Big Five!')}>
                <Share2 className="h-4 w-4 mr-2" /> E-mail
              </Button>
              <Button variant="outline" size="sm" onClick={() => shareWhatsApp('Fiz o teste Big Five (5 Grandes Traços de Personalidade)! Faça o seu também!')}>
                <Share2 className="h-4 w-4 mr-2" /> WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div id="bigfive-result" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-rose-100 text-rose-800 rounded-full text-sm font-medium mb-4">
            <Layers className="h-4 w-4 mr-2" /> Seus 5 Grandes Traços
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Perfil Big Five</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            O modelo Big Five é o mais aceito cientificamente para avaliar personalidade. Abaixo estão seus resultados em cada uma das 5 dimensões.
          </p>
        </div>

        {/* Visão geral */}
        <Card className="mb-8">
          <CardHeader><CardTitle className="text-center">Visão Geral dos 5 Traços</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(result.percentages).map(([key, pct]) => {
                const dim = dimensionData[key];
                return (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{dim.emoji} {dim.name}</span>
                      <span className="text-sm font-semibold">{pct}%</span>
                    </div>
                    <Progress value={pct} className="h-4" />
                    <p className="text-sm text-gray-500">
                      {pct >= 60 ? 'Alto' : pct >= 40 ? 'Moderado' : 'Baixo'}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Detalhes de cada dimensão */}
        <div className="space-y-6">
          {Object.entries(result.percentages).map(([key, pct]) => {
            const dim = dimensionData[key];
            const isHigh = pct >= 50;
            return (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{dim.emoji}</span>
                    {dim.name} — {pct}%
                    <span className={`text-sm px-2 py-1 rounded-full ${isHigh ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {pct >= 70 ? 'Alto' : pct >= 50 ? 'Moderado-Alto' : pct >= 30 ? 'Moderado-Baixo' : 'Baixo'}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{isHigh ? dim.high : dim.low}</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {(isHigh ? dim.traits_high : dim.traits_low).map((t: string, i: number) => (
                      <div key={i} className="flex items-center">
                        <Star className="h-4 w-4 text-rose-500 mr-2" />
                        <span className="text-gray-700">{t}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader><CardTitle className="text-rose-600">Sobre o Big Five</CardTitle></CardHeader>
            <CardContent className="text-gray-700 space-y-3">
              <p>O modelo dos Cinco Grandes Fatores (Big Five) é o framework mais utilizado e validado cientificamente na psicologia da personalidade.</p>
              <p>Não existem respostas certas ou erradas — cada dimensão é um espectro, e pontuações altas ou baixas trazem vantagens e desafios.</p>
              <p>Use estes resultados como um ponto de partida para o autoconhecimento e desenvolvimento pessoal.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Próximos Passos</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" onClick={() => navigate('/tests/mbti')}>Fazer Teste MBTI</Button>
              <Button variant="outline" className="w-full" onClick={() => navigate('/tests/profiler')}>Fazer Teste Profiler</Button>
              <Button variant="outline" className="w-full" onClick={() => navigate('/ferramentas')}>Explorar Outros Testes</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BigFiveResults;
