
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, ArrowLeft, Download, Share2, Eye } from 'lucide-react';
import { exportPDF, shareWhatsApp, shareEmail } from '@/utils/share';

const animalData: Record<string, { emoji: string; name: string; description: string; traits: string[] }> = {
  leao: {
    emoji: "🦁",
    name: "Leão",
    description: "O Leão simboliza coragem, liderança, autoridade e determinação. Quem se identifica com o leão é assertivo, toma a frente em situações difíceis e tem uma presença marcante.",
    traits: ["Corajoso e destemido", "Líder nato", "Determinado e assertivo", "Presença marcante", "Protetor"]
  },
  golfinho: {
    emoji: "🐬",
    name: "Golfinho",
    description: "O Golfinho simboliza inteligência, comunicação, adaptabilidade e alegria. Quem se conecta com o golfinho é criativo, sociável e tem facilidade para se adaptar a diferentes situações.",
    traits: ["Inteligente e ágil", "Comunicativo", "Adaptável", "Alegre e otimista", "Criativo"]
  },
  aguia: {
    emoji: "🦅",
    name: "Águia",
    description: "A Águia simboliza visão, liberdade, independência e foco. Quem se identifica com a águia é observador, estratégico e valoriza sua autonomia acima de tudo.",
    traits: ["Visionário e perspicaz", "Independente", "Estratégico", "Focado", "Busca excelência"]
  },
  elefante: {
    emoji: "🐘",
    name: "Elefante",
    description: "O Elefante simboliza sabedoria, memória, resiliência e estabilidade. Quem se conecta com o elefante é paciente, confiável e constrói coisas duradouras.",
    traits: ["Sábio e paciente", "Excelente memória", "Resiliente", "Estável e confiável", "Profundo"]
  },
  lobo: {
    emoji: "🐺",
    name: "Lobo",
    description: "O Lobo simboliza lealdade, trabalho em equipe, proteção e instinto. Quem se identifica com o lobo valoriza seus laços sociais, é leal e trabalha melhor em grupo.",
    traits: ["Leal e fiel", "Espírito de equipe", "Protetor", "Instintivo", "Cooperativo"]
  }
};

const ThreeAnimalsResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || {};

  const calculateAnimals = () => {
    const idealScores: Record<string, number> = { leao: 0, golfinho: 0, aguia: 0, elefante: 0, lobo: 0 };
    const realScores: Record<string, number> = { leao: 0, golfinho: 0, aguia: 0, elefante: 0, lobo: 0 };
    const perceivedScores: Record<string, number> = { leao: 0, golfinho: 0, aguia: 0, elefante: 0, lobo: 0 };

    Object.values(answers).forEach((answer: any) => {
      const parts = answer.split('_');
      const prefix = parts[0];
      const animal = parts[1];
      if (prefix === 'I' && idealScores.hasOwnProperty(animal)) idealScores[animal]++;
      if (prefix === 'R' && realScores.hasOwnProperty(animal)) realScores[animal]++;
      if (prefix === 'V' && perceivedScores.hasOwnProperty(animal)) perceivedScores[animal]++;
    });

    const getTop = (scores: Record<string, number>) => {
      const max = Math.max(...Object.values(scores));
      return Object.keys(scores).find(k => scores[k] === max) || 'leao';
    };

    return {
      ideal: getTop(idealScores),
      real: getTop(realScores),
      perceived: getTop(perceivedScores)
    };
  };

  const result = calculateAnimals();
  const idealAnimal = animalData[result.ideal];
  const realAnimal = animalData[result.real];
  const perceivedAnimal = animalData[result.perceived];

  if (!idealAnimal || !realAnimal || !perceivedAnimal) {
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

  const sections = [
    {
      title: "1º Animal — Quem Você Deseja Ser",
      subtitle: "Representa suas aspirações e o ideal que você busca",
      animal: idealAnimal,
      bgColor: "from-yellow-50 to-amber-50",
      borderColor: "border-yellow-200"
    },
    {
      title: "2º Animal — Quem Você Realmente É",
      subtitle: "Representa seu comportamento real e essência verdadeira",
      animal: realAnimal,
      bgColor: "from-green-50 to-emerald-50",
      borderColor: "border-green-200"
    },
    {
      title: "3º Animal — Como os Outros Te Veem",
      subtitle: "Representa a imagem que você projeta para o mundo",
      animal: perceivedAnimal,
      bgColor: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate('/ferramentas')} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Resultado — 3 Animais</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => exportPDF('three-animals-result', 'resultado-3-animais.pdf')}>
                <Download className="h-4 w-4 mr-2" /> PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => shareEmail('Resultado - Teste dos 3 Animais', `Meus 3 animais: ${idealAnimal.name}, ${realAnimal.name}, ${perceivedAnimal.name}`)}>
                <Share2 className="h-4 w-4 mr-2" /> E-mail
              </Button>
              <Button variant="outline" size="sm" onClick={() => shareWhatsApp(`Meus 3 animais: ${idealAnimal.emoji}${idealAnimal.name}, ${realAnimal.emoji}${realAnimal.name}, ${perceivedAnimal.emoji}${perceivedAnimal.name}! Faça o teste!`)}>
                <Share2 className="h-4 w-4 mr-2" /> WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div id="three-animals-result" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-4">
            <Eye className="h-4 w-4 mr-2" />
            Seus 3 Animais
          </div>
          <div className="text-6xl mb-4">
            {idealAnimal.emoji} {realAnimal.emoji} {perceivedAnimal.emoji}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {idealAnimal.name} • {realAnimal.name} • {perceivedAnimal.name}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            No Teste dos 3 Animais, cada animal representa uma camada diferente da sua personalidade: quem deseja ser, quem realmente é e como os outros te veem.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section, idx) => (
            <Card key={idx} className={`bg-gradient-to-r ${section.bgColor} border-2 ${section.borderColor}`}>
              <CardHeader>
                <div className="text-center">
                  <span className="text-5xl">{section.animal.emoji}</span>
                  <CardTitle className="text-2xl mt-2">{section.title}</CardTitle>
                  <p className="text-gray-500 mt-1">{section.subtitle}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-center mb-6 max-w-2xl mx-auto">{section.animal.description}</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-2xl mx-auto">
                  {section.animal.traits.map((trait, i) => (
                    <div key={i} className="flex items-center bg-white rounded-lg p-3">
                      <Star className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{trait}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader><CardTitle className="text-emerald-600">Interpretação</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              {result.ideal === result.real && result.real === result.perceived ? (
                <p>Seus três animais são iguais! Isso indica forte coerência entre seus desejos, comportamento real e imagem projetada. Você tem grande autoconhecimento e autenticidade.</p>
              ) : result.ideal === result.real ? (
                <p>Seus animais "ideal" e "real" coincidem, o que indica que você está vivendo de acordo com seus valores e aspirações. A diferença no terceiro animal sugere que a imagem que os outros percebem pode não refletir totalmente quem você é.</p>
              ) : result.real === result.perceived ? (
                <p>Seus animais "real" e "percebido" coincidem, mostrando que você é autêntico — as pessoas te veem exatamente como você é. A diferença no animal ideal indica áreas de crescimento que você deseja desenvolver.</p>
              ) : (
                <p>Seus três animais são diferentes, revelando uma personalidade complexa e multifacetada. Cada camada traz suas próprias forças e desafios. Essa diversidade pode ser uma grande vantagem quando bem integrada.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Próximos Passos</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" onClick={() => navigate('/tests/animal-profile')}>Fazer Perfil Animal Comportamental</Button>
              <Button variant="outline" className="w-full" onClick={() => navigate('/tests/tropical-forest')}>Fazer Teste da Floresta Tropical</Button>
              <Button variant="outline" className="w-full" onClick={() => navigate('/ferramentas')}>Explorar Outros Testes</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ThreeAnimalsResults;
