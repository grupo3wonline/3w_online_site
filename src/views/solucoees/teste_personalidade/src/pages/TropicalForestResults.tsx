
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star, ArrowLeft, Download, Share2, TreePine } from 'lucide-react';
import { exportPDF, shareWhatsApp, shareEmail } from '@/utils/share';

const valueData: Record<string, any> = {
  N: {
    emoji: "🐄",
    animal: "Vaca",
    value: "Necessidades Básicas e Segurança",
    description: "Você valoriza acima de tudo a segurança, estabilidade e a satisfação das necessidades fundamentais da vida. Ter uma base sólida — financeira, material e prática — é essencial para que você se sinta bem e possa cuidar de tudo mais.",
    traits: ["Prático e realista", "Valoriza segurança financeira", "Pensamento de longo prazo", "Busca estabilidade", "Cuidadoso com recursos"],
    advice: "Embora a segurança seja fundamental, lembre-se de não deixar o medo da escassez impedir você de aproveitar as outras riquezas da vida: relacionamentos, aventuras e amor."
  },
  C: {
    emoji: "🐴",
    animal: "Cavalo",
    value: "Carreira e Realização Profissional",
    description: "Sua principal motivação é a realização profissional e o crescimento na carreira. Você encontra significado e propósito através do trabalho, metas e conquistas. Sua ambição e dedicação são seus maiores motores.",
    traits: ["Ambicioso e determinado", "Focado em crescimento", "Valoriza competência", "Orientado por metas", "Busca significado no trabalho"],
    advice: "O trabalho é uma parte importante da vida, mas cuidado para não se perder nele. Reserve tempo e energia para cultivar as relações pessoais e cuidar do seu bem-estar."
  },
  O: {
    emoji: "🦁",
    animal: "Leão",
    value: "Orgulho e Autoestima",
    description: "Para você, respeito, dignidade e reconhecimento são as coisas mais valiosas da vida. Você se esforça para manter uma reputação íntegra e ser admirado por quem é e pelo que faz.",
    traits: ["Digno e respeitável", "Valoriza reconhecimento", "Preocupado com imagem", "Busca excelência pessoal", "Senso de honra forte"],
    advice: "Respeito próprio é essencial, mas lembre-se de que a verdadeira autoestima vem de dentro. Não dependa exclusivamente da validação alheia para se sentir completo(a)."
  },
  F: {
    emoji: "🐒",
    animal: "Macaco",
    value: "Família e Laços Afetivos",
    description: "Família é o centro do seu universo. Seus laços familiares são a fonte de maior alegria, segurança e sentido na vida. Você é dedicado(a) aos seus entes queridos e se realiza cuidando deles.",
    traits: ["Devotado à família", "Protetor e acolhedor", "Valoriza tradições", "Conectado emocionalmente", "Prioriza relações familiares"],
    advice: "O amor pela família é lindo, mas lembre-se de cuidar também de si mesmo(a). Equilibre suas dedicações para que você também possa nutrir seus sonhos individuais."
  },
  A: {
    emoji: "🐑",
    animal: "Ovelha",
    value: "Amor e Relacionamentos",
    description: "O amor é a força mais poderosa na sua vida. Você valoriza conexões emocionais profundas, relacionamentos significativos e a intimidade como fonte de realização e felicidade.",
    traits: ["Romântico e sensível", "Valoriza intimidade", "Busca conexões profundas", "Carinhoso e atencioso", "Guiado pelo coração"],
    advice: "O amor é maravilhoso, mas não se anule em prol de outra pessoa. Relações saudáveis são aquelas onde ambos crescem juntos, mantendo suas individualidades."
  }
};

const TropicalForestResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || {};

  const calculateResults = () => {
    const scores: Record<string, number> = { N: 0, C: 0, O: 0, F: 0, A: 0 };
    Object.values(answers).forEach((answer: any) => {
      if (scores.hasOwnProperty(answer)) scores[answer]++;
    });
    const total = Object.values(scores).reduce((s, v) => s + v, 0) || 1;
    const percentages: Record<string, number> = {};
    Object.keys(scores).forEach(k => { percentages[k] = Math.round((scores[k] / total) * 100); });

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return { scores, percentages, primary: sorted[0][0], secondary: sorted[1][0], ranking: sorted.map(s => s[0]) };
  };

  const result = calculateResults();
  const primary = valueData[result.primary];

  if (!primary) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8">
          <CardContent className="text-center">
            <h2 className="text-xl font-bold mb-4">Erro nos Resultados</h2>
            <p className="text-gray-600 mb-4">Não foi possível calcular.</p>
            <Button onClick={() => navigate('/ferramentas')}>Voltar</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate('/ferramentas')} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Resultado — Floresta Tropical</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => exportPDF('forest-result', 'resultado-floresta.pdf')}>
                <Download className="h-4 w-4 mr-2" /> PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => shareEmail('Resultado - Floresta Tropical', `Meu valor principal: ${primary.value}`)}>
                <Share2 className="h-4 w-4 mr-2" /> E-mail
              </Button>
              <Button variant="outline" size="sm" onClick={() => shareWhatsApp(`No Teste da Floresta Tropical, meu valor principal é: ${primary.value}! ${primary.emoji}`)}>
                <Share2 className="h-4 w-4 mr-2" /> WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div id="forest-result" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            <TreePine className="h-4 w-4 mr-2" /> O que você mais valoriza
          </div>
          <div className="text-6xl mb-4">{primary.emoji}</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{primary.value}</h1>
          <p className="text-lg text-gray-500">Animal: {primary.animal}</p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">{primary.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader><CardTitle className="text-green-600">Suas Características</CardTitle></CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {primary.traits.map((t: string, i: number) => (
                    <div key={i} className="flex items-center">
                      <Star className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-gray-700">{t}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-amber-600">Conselho para Você</CardTitle></CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{primary.advice}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-blue-600">Sua Ordem de Prioridades</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {result.ranking.map((key, idx) => {
                    const v = valueData[key];
                    return (
                      <div key={key} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${idx === 0 ? 'bg-green-500' : idx === 1 ? 'bg-blue-500' : idx === 2 ? 'bg-yellow-500' : idx === 3 ? 'bg-orange-500' : 'bg-red-400'}`}>
                          {idx + 1}
                        </div>
                        <span className="text-2xl">{v.emoji}</span>
                        <div className="flex-1">
                          <span className="font-medium">{v.value}</span>
                          <span className="text-gray-500 text-sm ml-2">({v.animal})</span>
                        </div>
                        <span className="font-semibold">{result.percentages[key]}%</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-green-50 to-lime-50 border-green-200">
              <CardHeader><CardTitle className="text-center text-green-900">Composição de Valores</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(result.percentages).map(([key, pct]) => {
                    const v = valueData[key];
                    return (
                      <div key={key} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{v.emoji} {v.animal}</span>
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
                <Button className="w-full" onClick={() => navigate('/tests/temperament')}>Fazer Teste de Temperamento</Button>
                <Button variant="outline" className="w-full" onClick={() => navigate('/ferramentas')}>Explorar Outros Testes</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TropicalForestResults;
