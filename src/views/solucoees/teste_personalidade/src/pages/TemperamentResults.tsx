
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { exportPDF, shareWhatsApp, shareEmail } from '@/utils/share';

interface TemperamentProfile {
  name: string;
  emoji: string;
  element: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  strengths: string[];
  challenges: string[];
  motivations: string[];
  idealRoles: string[];
  communication: string;
  leadership: string;
  famousPeople: string[];
  tip: string;
}

const TemperamentResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers: Record<number, string> = location.state?.answers || {};

  const profiles: Record<string, TemperamentProfile> = {
    C: {
      name: "Colérico",
      emoji: "🔥",
      element: "Fogo",
      color: "text-red-700",
      bgColor: "bg-red-50",
      borderColor: "border-red-300",
      description: "O Colérico é o líder nato, movido por resultados e conquistas. É determinado, objetivo e corajoso, enfrentando desafios de frente. Possui uma energia intensa que inspira e movimenta equipes inteiras. Sua natureza orientada a metas o torna um executor excepcional.",
      strengths: [
        "Liderança natural e decisiva",
        "Orientado a resultados e metas",
        "Determinação e persistência inabaláveis",
        "Coragem para tomar decisões difíceis",
        "Capacidade de trabalhar sob pressão",
        "Independência e autossuficiência"
      ],
      challenges: [
        "Pode ser impaciente e intolerante",
        "Tendência a ser autoritário",
        "Dificuldade em demonstrar empatia",
        "Pode parecer insensível ou frio",
        "Resistência a aceitar ajuda",
        "Explosões de raiva sob pressão"
      ],
      motivations: ["Conquista e vitória", "Autoridade e controle", "Desafios complexos", "Independência"],
      idealRoles: ["CEO / Diretor Executivo", "Gerente de Projetos", "Empreendedor", "Líder de operações", "Consultor estratégico", "Cirurgião"],
      communication: "Direta, objetiva e assertiva. Prefere fatos a sentimentos e valoriza eficiência na comunicação.",
      leadership: "Liderança autocrática e visionária. Define metas ambiciosas e cobra resultados com firmeza.",
      famousPeople: ["Steve Jobs", "Margaret Thatcher", "Napoleão Bonaparte"],
      tip: "Pratique a escuta ativa e a empatia. Seu maior crescimento virá quando aprender a valorizar o ritmo e a perspectiva dos outros."
    },
    S: {
      name: "Sanguíneo",
      emoji: "☀️",
      element: "Ar",
      color: "text-amber-700",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-300",
      description: "O Sanguíneo é a energia contagiante do grupo. Extrovertido, otimista e cheio de vida, ele transforma qualquer ambiente com seu carisma natural. É o comunicador nato, capaz de envolver e motivar pessoas com sua alegria de viver e entusiasmo genuíno.",
      strengths: [
        "Carisma e habilidade social extraordinária",
        "Otimismo e entusiasmo contagiantes",
        "Criatividade e pensamento inovador",
        "Facilidade de adaptação a novas situações",
        "Capacidade de motivar e inspirar outros",
        "Espontaneidade e energia alta"
      ],
      challenges: [
        "Dificuldade em manter o foco e terminar tarefas",
        "Tendência a ser superficial nos relacionamentos",
        "Impulsividade nas decisões",
        "Desorganização crônica",
        "Dificuldade com rotinas e detalhes",
        "Pode prometer mais do que consegue cumprir"
      ],
      motivations: ["Reconhecimento social", "Diversão e novidade", "Liberdade de expressão", "Aprovação dos outros"],
      idealRoles: ["Vendedor / Comercial", "Relações Públicas", "Marketing e Publicidade", "Apresentador / Influenciador", "Professor / Coach", "Artista / Performer"],
      communication: "Expressiva, entusiasta e persuasiva. Usa histórias, humor e gestos para se comunicar.",
      leadership: "Liderança carismática e inspiradora. Motiva pela energia positiva e pelo exemplo pessoal.",
      famousPeople: ["Robin Williams", "Jim Carrey", "Oprah Winfrey"],
      tip: "Desenvolva disciplina e organização. Canalize seu entusiasmo em projetos com início, meio e fim bem definidos."
    },
    F: {
      name: "Fleumático",
      emoji: "🌊",
      element: "Água",
      color: "text-blue-700",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
      description: "O Fleumático é a âncora emocional dos grupos. Calmo, paciente e confiável, ele traz estabilidade e harmonia para qualquer ambiente. É o melhor ouvinte e mediador, capaz de manter a paz mesmo nas situações mais turbulentas. Sua lealdade e constância são incomparáveis.",
      strengths: [
        "Estabilidade emocional impressionante",
        "Habilidade natural de mediação",
        "Lealdade e confiabilidade inabaláveis",
        "Paciência excepcional",
        "Capacidade de ouvir e apoiar",
        "Diplomacia e tato nas relações"
      ],
      challenges: [
        "Dificuldade em tomar iniciativa",
        "Tendência à procrastinação",
        "Falta de assertividade",
        "Resistência a mudanças",
        "Pode parecer apático ou desinteressado",
        "Dificuldade em expressar emoções"
      ],
      motivations: ["Paz e harmonia", "Estabilidade e segurança", "Relacionamentos genuínos", "Ambiente previsível"],
      idealRoles: ["Mediador / Conciliador", "Conselheiro / Terapeuta", "Administrador", "Analista de Qualidade", "Bibliotecário", "Assistente Social"],
      communication: "Calma, diplomática e gentil. Prefere ouvir antes de falar e evita confrontos.",
      leadership: "Liderança democrática e servidora. Cria ambientes seguros onde todos se sentem ouvidos.",
      famousPeople: ["Mahatma Gandhi", "Dalai Lama", "Keanu Reeves"],
      tip: "Pratique a assertividade e tome mais iniciativa. Sua natureza conciliadora é um dom, mas não deixe que ela impeça você de defender suas ideias."
    },
    M: {
      name: "Melancólico",
      emoji: "🌙",
      element: "Terra",
      color: "text-indigo-700",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-300",
      description: "O Melancólico é o pensador profundo e o visionário idealista. Detalhista, analítico e sensível, ele busca a perfeição em tudo que faz. Sua capacidade de análise e reflexão o torna excepcional em trabalhos que exigem precisão, criatividade e profundidade intelectual.",
      strengths: [
        "Pensamento analítico e profundo",
        "Perfeccionismo e atenção aos detalhes",
        "Sensibilidade artística e criativa",
        "Capacidade excepcional de planejamento",
        "Lealdade profunda nos relacionamentos",
        "Empatia e compaixão genuínas"
      ],
      challenges: [
        "Tendência ao perfeccionismo paralisante",
        "Autocrítica excessiva",
        "Propensão a preocupação e ansiedade",
        "Dificuldade em lidar com críticas",
        "Pode ser excessivamente pessimista",
        "Demora para confiar nas pessoas"
      ],
      motivations: ["Qualidade e excelência", "Significado e propósito", "Compreensão profunda", "Ordem e organização"],
      idealRoles: ["Pesquisador / Cientista", "Escritor / Artista", "Arquiteto / Designer", "Analista de Dados", "Músico / Compositor", "Filósofo / Acadêmico"],
      communication: "Reflexiva, precisa e profunda. Escolhe cada palavra com cuidado e valoriza conversas significativas.",
      leadership: "Liderança meticulosa e visionária. Planeja com perfeição e inspira pela qualidade do trabalho.",
      famousPeople: ["Beethoven", "Albert Einstein", "Frida Kahlo"],
      tip: "Pratique a autocompaixão e aceite que 'bom o suficiente' às vezes é perfeito. Sua profundidade é rara — use-a sem deixar que o perfeccionismo te paralise."
    }
  };

  // Count scores
  const scores: Record<string, number> = { C: 0, S: 0, F: 0, M: 0 };
  Object.values(answers).forEach(val => {
    if (scores[val] !== undefined) scores[val]++;
  });

  const totalAnswers = Object.values(answers).length;
  const sortedTemperaments = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const dominantKey = sortedTemperaments[0][0];
  const secondaryKey = sortedTemperaments[1][0];
  const dominant = profiles[dominantKey];
  const secondary = profiles[secondaryKey];

  const getPercentage = (key: string) => totalAnswers > 0 ? Math.round((scores[key] / totalAnswers) * 100) : 0;

  const handleShare = (method: 'whatsapp' | 'email') => {
    const message = `🌡️ Resultado do Teste de Temperamento\n\n` +
      `${dominant.emoji} Temperamento Dominante: ${dominant.name} (${getPercentage(dominantKey)}%)\n` +
      `${secondary.emoji} Secundário: ${secondary.name} (${getPercentage(secondaryKey)}%)\n\n` +
      `${dominant.description.substring(0, 150)}...\n\n` +
      `Faça seu teste: ${globalThis.location.origin}/teste_personalidade/tests/temperament`;

    if (method === 'whatsapp') shareWhatsApp(message);
    else shareEmail('Meu Resultado - Teste de Temperamento', message);
  };

  if (!location.state?.answers) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50">
        <Card className="max-w-md text-center p-8">
          <CardTitle className="mb-4">Nenhum resultado encontrado</CardTitle>
          <p className="text-gray-600 mb-6">Faça o teste primeiro para ver seus resultados.</p>
          <Button onClick={() => navigate('/tests/temperament')} className="bg-red-600 hover:bg-red-700">Fazer o Teste</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate('/ferramentas')} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Resultado - Teste de Temperamento</h1>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => exportPDF('temperament-results', 'resultado-temperamento.pdf')}>
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="temperament-results">
        {/* Dominant Temperament */}
        <Card className={`mb-8 border-2 ${dominant.borderColor} ${dominant.bgColor}`}>
          <CardContent className="pt-8 pb-8 text-center">
            <Badge className="mb-4 text-sm">Temperamento Dominante</Badge>
            <div className="text-6xl mb-4">{dominant.emoji}</div>
            <h2 className={`text-3xl font-bold ${dominant.color} mb-2`}>{dominant.name}</h2>
            <p className="text-sm text-gray-500 mb-4">Elemento: {dominant.element}</p>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">{dominant.description}</p>
          </CardContent>
        </Card>

        {/* Score Distribution */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Distribuição dos Temperamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedTemperaments.map(([key]) => {
                const profile = profiles[key];
                const pct = getPercentage(key);
                return (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium flex items-center">
                        <span className="mr-2">{profile.emoji}</span>
                        {profile.name}
                        {key === dominantKey && <Badge className="ml-2 text-xs" variant="default">Dominante</Badge>}
                        {key === secondaryKey && <Badge className="ml-2 text-xs" variant="secondary">Secundário</Badge>}
                      </span>
                      <span className="text-sm font-semibold">{pct}% ({scores[key]} respostas)</span>
                    </div>
                    <Progress value={pct} className="h-3" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Strengths & Challenges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className={`${dominant.bgColor} border ${dominant.borderColor}`}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <span className="mr-2">💪</span> Pontos Fortes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {dominant.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-700">
                    <span className="mr-2 text-green-600">✅</span> {s}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <span className="mr-2">⚠️</span> Desafios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {dominant.challenges.map((c, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-700">
                    <span className="mr-2 text-amber-600">⚡</span> {c}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Details Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader><CardTitle className="text-lg">🎯 Motivações</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {dominant.motivations.map((m, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-center">
                    <span className="mr-2">▸</span> {m}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">💼 Carreiras Ideais</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {dominant.idealRoles.map((r, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-center">
                    <span className="mr-2">▸</span> {r}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">🗣️ Comunicação & Liderança</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">Estilo de Comunicação</h4>
                  <p className="text-sm text-gray-600">{dominant.communication}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">Estilo de Liderança</h4>
                  <p className="text-sm text-gray-600">{dominant.leadership}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Famous People */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">⭐ Personalidades com Temperamento {dominant.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {dominant.famousPeople.map((p, idx) => (
                <Badge key={idx} variant="secondary" className="text-sm px-3 py-1">{p}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Secondary Temperament */}
        <Card className={`mb-8 ${secondary.bgColor} border ${secondary.borderColor}`}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              {secondary.emoji} Temperamento Secundário: {secondary.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{secondary.description}</p>
            <p className="text-sm text-gray-600">
              <strong>Combinação {dominant.name}-{secondary.name}:</strong> Essa combinação traz um 
              equilíbrio interessante entre as características de ambos os temperamentos. Você possui a 
              base do {dominant.name} temperada com traços do {secondary.name}, criando uma 
              personalidade multifacetada e adaptável.
            </p>
          </CardContent>
        </Card>

        {/* Growth Tip */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <span className="mr-2">🌱</span> Dica de Crescimento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-lg leading-relaxed">{dominant.tip}</p>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-center gap-4 pt-4">
          <Button onClick={() => navigate('/tests/temperament')} variant="outline">
            Refazer Teste
          </Button>
          <Button onClick={() => navigate('/ferramentas')} className="bg-red-600 hover:bg-red-700">
            Ver Outros Testes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemperamentResults;
