import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Star, Target, Heart, ArrowLeft, Download, Share2, ArrowUpRight, ArrowDownRight, Lightbulb, Compass } from 'lucide-react';
import { exportPDF, shareWhatsApp, shareEmail } from '@/utils/share';
import { useEffect, useState } from 'react';

const EnneagramResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || {};

  const calculateEnneagramType = () => {
    const typeCounts: Record<string, number> = {
      type1: 0, type2: 0, type3: 0, type4: 0, type5: 0,
      type6: 0, type7: 0, type8: 0, type9: 0
    };

    Object.values(answers).forEach((answer: any) => {
      if (typeCounts.hasOwnProperty(answer)) {
        typeCounts[answer]++;
      }
    });

    const maxCount = Math.max(...Object.values(typeCounts));
    const dominantType = Object.keys(typeCounts).find(
      type => typeCounts[type] === maxCount
    ) || 'type1';

    return {
      primary: dominantType,
      scores: typeCounts,
      maxScore: maxCount
    };
  };

  const result = calculateEnneagramType();

  const [showAnimation, setShowAnimation] = useState(false);
  useEffect(() => { setShowAnimation(true); }, []);

  // Wing, integration & disintegration data
  const dynamicsData: Record<string, { wings: [number, number]; integration: number; disintegration: number; compatibility: number[] }> = {
    type1: { wings: [9, 2], integration: 7, disintegration: 4, compatibility: [2, 7, 9] },
    type2: { wings: [1, 3], integration: 4, disintegration: 8, compatibility: [3, 4, 8] },
    type3: { wings: [2, 4], integration: 6, disintegration: 9, compatibility: [1, 5, 9] },
    type4: { wings: [3, 5], integration: 1, disintegration: 2, compatibility: [1, 5, 9] },
    type5: { wings: [4, 6], integration: 8, disintegration: 7, compatibility: [1, 2, 8] },
    type6: { wings: [5, 7], integration: 9, disintegration: 3, compatibility: [2, 8, 9] },
    type7: { wings: [6, 8], integration: 5, disintegration: 1, compatibility: [1, 5, 9] },
    type8: { wings: [7, 9], integration: 2, disintegration: 5, compatibility: [2, 4, 9] },
    type9: { wings: [8, 1], integration: 3, disintegration: 6, compatibility: [1, 3, 6] },
  };

  const dynamics = dynamicsData[result.primary] || dynamicsData.type1;

  const enneagramTypes = {
    type1: {
      name: "O Perfeccionista",
      description: "Racional, idealista, com princípios, determinado, controlado e perfeccionista.",
      motivation: "Ser bom, ter integridade, ser equilibrado e correto",
      fear: "Ser corrupto, deficiente ou imperfeito",
      strengths: ["Ético e consciente", "Disciplinado e trabalhador", "Justo e honesto", "Responsável e confiável"],
      challenges: ["Crítico demais", "Rígido e inflexível", "Impaciência com erros", "Tendência ao perfeccionismo"],
      growth: "Aprenda a aceitar que 'bom o suficiente' às vezes é suficiente. Pratique autocompaixão e perdoe seus erros.",
      careers: ["Juiz", "Auditor", "Editor", "Arquiteto", "Engenheiro"],
      color: "red"
    },
    type2: {
      name: "O Prestativo",
      description: "Carinhoso, interpessoal, generoso, possessivo e manipulativo.",
      motivation: "Sentir-se amado e necessário",
      fear: "Ser indesejado ou não merecedor de amor",
      strengths: ["Empático e compassivo", "Generoso e altruísta", "Caloroso e amigável", "Bom ouvinte"],
      challenges: ["Negligencia necessidades próprias", "Pode ser manipulativo", "Ressentimento quando não reconhecido", "Dificuldade em dizer não"],
      growth: "Aprenda a cuidar de si mesmo tanto quanto cuida dos outros. Reconheça suas próprias necessidades.",
      careers: ["Enfermeiro", "Conselheiro", "Professor", "Assistente Social", "Terapeuta"],
      color: "pink"
    },
    type3: {
      name: "O Realizador",
      description: "Orientado para o sucesso, pragmático, adaptável, ambicioso e consciente da imagem.",
      motivation: "Sentir-se valioso e merecedor através de conquistas",
      fear: "Ser inútil ou sem valor",
      strengths: ["Altamente motivado", "Eficiente e produtivo", "Adaptável", "Carismático e inspirador"],
      challenges: ["Pode sacrificar autenticidade pelo sucesso", "Workaholic", "Impaciência com ineficiência", "Foco excessivo na imagem"],
      growth: "Valorize quem você é, não apenas o que conquista. Encontre tempo para autorreflexão.",
      careers: ["Executivo", "Vendedor", "Empreendedor", "Advogado", "Político"],
      color: "yellow"
    },
    type4: {
      name: "O Individualista",
      description: "Sensível, retraído, expressivo, dramático, temperamental e criativo.",
      motivation: "Encontrar a si mesmo e seu significado na vida",
      fear: "Não ter identidade ou significado pessoal",
      strengths: ["Criativo e artístico", "Autêntico e genuíno", "Empático e compreensivo", "Profundidade emocional"],
      challenges: ["Oscilações de humor", "Foco no que está faltando", "Pode ser melodramático", "Tendência à melancolia"],
      growth: "Foque no que você tem, não no que falta. Canalize suas emoções de forma construtiva.",
      careers: ["Artista", "Designer", "Escritor", "Músico", "Terapeuta"],
      color: "purple"
    },
    type5: {
      name: "O Investigador",
      description: "Intenso, cerebral, perceptivo, inovador, reservado e isolado.",
      motivation: "Ser competente e compreender o ambiente",
      fear: "Ser incompetente ou invadido pelos outros",
      strengths: ["Analítico e objetivo", "Independente", "Inovador", "Observador perspicaz"],
      challenges: ["Pode ser muito reservado", "Dificuldade com emoções", "Procrastinação", "Isolamento social"],
      growth: "Compartilhe seu conhecimento e se conecte com outros. Confie em sua competência.",
      careers: ["Cientista", "Pesquisador", "Programador", "Analista", "Acadêmico"],
      color: "green"
    },
    type6: {
      name: "O Leal",
      description: "Comprometido, responsável, ansioso, desconfiado, trabalhador e leal.",
      motivation: "Ter segurança e apoio",
      fear: "Ficar sem apoio ou orientação",
      strengths: ["Leal e comprometido", "Responsável", "Trabalha bem em equipe", "Previsão de problemas"],
      challenges: ["Ansiedade e preocupação", "Dúvida excessiva", "Pode ser pessimista", "Dificuldade com autoridade"],
      growth: "Confie em sua própria sabedoria interna. Pratique coragem em pequenos passos.",
      careers: ["Bombeiro", "Policial", "Advogado", "Contador", "Gerente de projeto"],
      color: "blue"
    },
    type7: {
      name: "O Entusiasta",
      description: "Espontâneo, versátil, distraído, disperso, otimista e aventureiro.",
      motivation: "Manter felicidade e evitar dor",
      fear: "Ficar preso em dor ou privação",
      strengths: ["Otimista e entusiástico", "Versátil e espontâneo", "Criativo", "Energético"],
      challenges: ["Impulsividade", "Dificuldade com compromissos", "Evita emoções difíceis", "Pode ser superficial"],
      growth: "Aprenda a ficar presente e processar emoções difíceis. Foque na profundidade.",
      careers: ["Jornalista", "Consultor", "Empreendedor", "Guia turístico", "Planejador de eventos"],
      color: "orange"
    },
    type8: {
      name: "O Desafiador",
      description: "Autoconfiante, decisivo, determinado, confrontativo, dominador e intenso.",
      motivation: "Ser autodependente e no controle",
      fear: "Ser controlado ou vulnerável",
      strengths: ["Liderança natural", "Corajoso e forte", "Protetor dos fracos", "Decisivo"],
      challenges: ["Pode ser dominador", "Impaciência", "Dificuldade com vulnerabilidade", "Confrontativo"],
      growth: "Mostre sua vulnerabilidade e gentileza. Use seu poder para servir aos outros.",
      careers: ["CEO", "Militar", "Advogado", "Empreendedor", "Político"],
      color: "red"
    },
    type9: {
      name: "O Pacificador",
      description: "Receptivo, tranquilizador, complacente, resignado, negligente e estável.",
      motivation: "Manter harmonia interna e externa",
      fear: "Perda de conexão e fragmentação",
      strengths: ["Pacífico e harmonioso", "Aceita os outros", "Estável e consistente", "Excelente mediador"],
      challenges: ["Procrastinação", "Complacência", "Evita conflitos", "Negligencia próprias necessidades"],
      growth: "Tome iniciativa e expresse suas opiniões. Sua voz importa.",
      careers: ["Mediador", "Conselheiro", "Recursos Humanos", "Veterinário", "Bibliotecário"],
      color: "teal"
    }
  };

  const primaryType = enneagramTypes[result.primary as keyof typeof enneagramTypes];

  if (!primaryType) {
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Helmet>
        <title>Resultado — Eneagrama Profissional</title>
        <meta name="description" content="Descubra seu tipo de eneagrama com insights sobre motivações, medos e caminhos de crescimento." />
        <link rel="canonical" href={window.location.origin + '/tests/enneagram/results'} />
      </Helmet>
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/ferramentas')}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Resultado do Eneagrama</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => exportPDF('enneagram-result', 'resultado-eneagrama.pdf')}>
                <Download className="h-4 w-4 mr-2" /> PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => shareEmail('Resultado - Eneagrama', `Veja meu tipo e insights: ${window.location.href}`)}>
                <Share2 className="h-4 w-4 mr-2" /> E-mail
              </Button>
              <Button variant="outline" size="sm" onClick={() => shareWhatsApp(`Meu resultado do Eneagrama: ${window.location.href}`)}>
                <Share2 className="h-4 w-4 mr-2" /> WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div id="enneagram-result" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-4">
            <Users className="h-4 w-4 mr-2" />
            Seu Tipo de Eneagrama
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tipo {result.primary.slice(-1)} - {primaryType.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {primaryType.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  Motivação Principal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{primaryType.motivation}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-orange-500" />
                  Medo Básico
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{primaryType.fear}</p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">Pontos Fortes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {primaryType.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <Star className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-600">Desafios</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {primaryType.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start">
                        <Target className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Caminho de Crescimento</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{primaryType.growth}</p>
              </CardContent>
            </Card>

            {/* Wings */}
            <Card className="transition-all duration-700 delay-300">
              <CardHeader>
                <CardTitle className="flex items-center text-indigo-600">
                  <Compass className="h-5 w-5 mr-2" /> Suas Asas (Wings)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">As asas são os tipos adjacentes ao seu que influenciam sua personalidade.</p>
                <div className="grid grid-cols-2 gap-4">
                  {dynamics.wings.map((wing, idx) => {
                    const wingType = enneagramTypes[`type${wing}` as keyof typeof enneagramTypes];
                    return (
                      <div key={idx} className="p-4 bg-indigo-50 rounded-lg border border-indigo-100 text-center">
                        <div className="text-2xl font-bold text-indigo-600 mb-1">{wing}</div>
                        <div className="font-medium text-gray-800 text-sm">{wingType?.name}</div>
                        <p className="text-xs text-gray-500 mt-1">Asa {idx === 0 ? 'Esquerda' : 'Direita'}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Integration / Disintegration */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-green-200 bg-green-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-green-700 text-base flex items-center">
                    <ArrowUpRight className="h-4 w-4 mr-2" /> Direção de Integração
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl font-bold text-green-600">{dynamics.integration}</div>
                    <div>
                      <div className="font-medium text-green-800">{enneagramTypes[`type${dynamics.integration}` as keyof typeof enneagramTypes]?.name}</div>
                      <p className="text-xs text-green-600">Em crescimento, você absorve qualidades positivas deste tipo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-red-200 bg-red-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-red-700 text-base flex items-center">
                    <ArrowDownRight className="h-4 w-4 mr-2" /> Direção de Estresse
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl font-bold text-red-600">{dynamics.disintegration}</div>
                    <div>
                      <div className="font-medium text-red-800">{enneagramTypes[`type${dynamics.disintegration}` as keyof typeof enneagramTypes]?.name}</div>
                      <p className="text-xs text-red-600">Sob estresse, você pode exibir aspectos negativos deste tipo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Compatibility */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-pink-600">
                  <Heart className="h-5 w-5 mr-2" /> Compatibilidade com Outros Tipos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">Tipos com maior afinidade natural ao seu perfil:</p>
                <div className="grid grid-cols-3 gap-3">
                  {dynamics.compatibility.map((compat) => {
                    const compatType = enneagramTypes[`type${compat}` as keyof typeof enneagramTypes];
                    return (
                      <div key={compat} className="p-3 bg-pink-50 rounded-lg border border-pink-100 text-center">
                        <div className="text-xl font-bold text-pink-600">{compat}</div>
                        <div className="text-sm font-medium text-gray-700">{compatType?.name}</div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Carreiras Recomendadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {primaryType.careers.map((career, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {career}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
              <CardHeader>
                <CardTitle className="text-center text-indigo-900">
                  Seu Perfil de Eneagrama
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-indigo-600 mb-2">
                    {result.primary.slice(-1)}
                  </div>
                  <div className="text-lg font-medium text-indigo-800">
                    {primaryType.name}
                  </div>
                </div>
                
                <div className="space-y-3">
                  {Object.entries(result.scores).map(([type, score]) => {
                    const percentage = (score / 20) * 100;
                    const typeInfo = enneagramTypes[type as keyof typeof enneagramTypes];
                    return (
                      <div key={type} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">
                            Tipo {type.slice(-1)} - {typeInfo.name}
                          </span>
                          <span>{score}/20</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Próximos Passos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full" 
                  onClick={() => navigate('/tests/disc')}
                >
                  Fazer Teste DISC
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/tests/vocational')}
                >
                  Teste Vocacional
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/ferramentas')}
                >
                  Explorar Outros Testes
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">Dica de Aprofundamento</p>
                    <p className="text-xs text-amber-700 mt-1">Combine o Eneagrama com o teste DISC para entender seu estilo de ação, e com o MBTI para mapear preferências cognitivas.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center mt-8">Este resultado é educativo e baseado em suas respostas. Para uma análise aprofundada, consulte um profissional especializado em Eneagrama.</p>
      </div>
    </div>
  );
};

export default EnneagramResults;
