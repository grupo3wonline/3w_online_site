import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, HeartPulse, Phone, Download, Share2, Star, Shield, Lightbulb, Heart, Activity, Brain } from 'lucide-react';
import { exportPDF, shareWhatsApp, shareEmail } from '@/utils/share';
import { useEffect, useState } from 'react';

const MentalHealthResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAnimation, setShowAnimation] = useState(false);
  const total: number = location.state?.total ?? 0;
  const answers: Record<number, number> = location.state?.answers ?? {};

  useEffect(() => { setShowAnimation(true); }, []);

  // Calculate dimension scores
  const depressionScore = [0,1,2,3,4,5,6,7,8].reduce((sum, i) => sum + (answers[i] ?? 0), 0); // PHQ-9 items (0-8)
  const anxietyScore = [9,10,11,12,13,14,15,16].reduce((sum, i) => sum + (answers[i] ?? 0), 0); // GAD items (9-16)
  const socialScore = (answers[17] ?? 0); // Social anxiety item

  const depressionPct = Math.round((depressionScore / 27) * 100);
  const anxietyPct = Math.round((anxietyScore / 24) * 100);
  const socialPct = Math.round((socialScore / 3) * 100);

  const categorize = (score: number) => {
    if (score <= 4) return {
      level: 'Mínimo', color: 'bg-green-500', borderColor: 'border-green-200',
      textColor: 'text-green-600', bgLight: 'bg-green-50', emoji: '🌿',
      advice: 'Sinais mínimos. Seus indicadores estão em uma faixa saudável. Mantenha hábitos saudáveis e continue cuidando do seu bem-estar.',
      detailedAdvice: 'Você demonstra um bom nível de saúde emocional. Continue investindo em autocuidado preventivo para manter esse equilíbrio.',
      selfCare: [
        'Mantenha rotina de sono consistente (7-9h por noite)',
        'Pratique atividade física regular (30min, 3-5x/semana)',
        'Cultive relacionamentos significativos',
        'Reserve tempo para hobbies e lazer',
        'Pratique gratidão diária'
      ],
      preventive: [
        'Continue com check-ups regulares de saúde',
        'Mantenha uma rede de apoio social',
        'Pratique mindfulness ou meditação como prevenção',
        'Monitore seu bem-estar periodicamente'
      ]
    };
    if (score <= 9) return {
      level: 'Leve', color: 'bg-lime-500', borderColor: 'border-lime-200',
      textColor: 'text-lime-600', bgLight: 'bg-lime-50', emoji: '💛',
      advice: 'Atenção a sinais leves. Considere ajustar rotinas de autocuidado e conversar com alguém de confiança.',
      detailedAdvice: 'Alguns indicadores sugerem sinais leves que merecem atenção. Pequenas mudanças no estilo de vida podem fazer grande diferença.',
      selfCare: [
        'Estabeleça rotina de sono regular e horários fixos',
        'Inicie atividade física leve — caminhadas de 20min ajudam',
        'Converse com amigos ou familiares sobre como se sente',
        'Reduza consumo de cafeína e açúcar refinado',
        'Experimente técnicas de respiração profunda (4-7-8)',
        'Limite tempo excessivo em redes sociais'
      ],
      preventive: [
        'Considere diário emocional para automonitoramento',
        'Busque atividades que tragam prazer e significado',
        'Avalie se há fatores de estresse que podem ser ajustados',
        'Mantenha alimentação equilibrada e hidratação'
      ]
    };
    if (score <= 14) return {
      level: 'Moderado', color: 'bg-yellow-500', borderColor: 'border-yellow-200',
      textColor: 'text-yellow-600', bgLight: 'bg-yellow-50', emoji: '⚠️',
      advice: 'Sintomas moderados identificados. Recomendamos buscar apoio profissional para orientação personalizada.',
      detailedAdvice: 'Seus indicadores sugerem sintomas moderados. Uma avaliação profissional pode ajudar a identificar estratégias eficazes para melhorar seu bem-estar.',
      selfCare: [
        'Considere agendar consulta com psicólogo ou psiquiatra',
        'Pratique técnicas de relaxamento diariamente',
        'Mantenha rotina de atividade física regular',
        'Evite isolamento — mantenha contato com pessoas próximas',
        'Limite consumo de álcool e substâncias',
        'Priorize alimentação nutritiva e sono de qualidade'
      ],
      preventive: [
        'Uma avaliação profissional é altamente recomendada',
        'Considere terapia cognitivo-comportamental (TCC)',
        'Busque grupos de apoio ou comunidades de bem-estar',
        'Não hesite em pedir ajuda — é um sinal de força'
      ]
    };
    if (score <= 19) return {
      level: 'Moderadamente Grave', color: 'bg-orange-500', borderColor: 'border-orange-200',
      textColor: 'text-orange-600', bgLight: 'bg-orange-50', emoji: '🔶',
      advice: 'Sintomas importantes detectados. Procure um profissional de saúde mental para avaliação e acompanhamento.',
      detailedAdvice: 'Seus indicadores apontam sintomas significativos que podem estar afetando sua qualidade de vida. Acompanhamento profissional é fortemente recomendado.',
      selfCare: [
        'Busque atendimento profissional assim que possível',
        'Converse com alguém de confiança sobre o que sente',
        'Mantenha rotinas básicas — sono, alimentação, higiene',
        'Evite tomar decisões importantes neste momento',
        'Pratique atividades físicas leves quando possível',
        'Evite substâncias que alterem o humor'
      ],
      preventive: [
        'Agende consulta com psicólogo ou psiquiatra urgentemente',
        'Considere tratamento combinado (terapia + medicação se indicado)',
        'Informe pessoas de confiança sobre seu estado',
        'Ligue para o CVV (188) se precisar conversar a qualquer momento'
      ]
    };
    return {
      level: 'Grave', color: 'bg-red-500', borderColor: 'border-red-200',
      textColor: 'text-red-600', bgLight: 'bg-red-50', emoji: '🚨',
      advice: 'Recomendação forte: procure ajuda profissional o quanto antes. Se houver risco, busque suporte emergencial.',
      detailedAdvice: 'Seus indicadores sugerem sintomas graves que requerem atenção profissional imediata. Não hesite em buscar ajuda — você merece cuidado e suporte.',
      selfCare: [
        'Procure atendimento profissional HOJE se possível',
        'Não fique sozinho(a) — peça para alguém ficar com você',
        'Ligue para o CVV: 188 (disponível 24h)',
        'Vá a uma UPA ou emergência se sentir risco imediato',
        'Remova acesso a substâncias ou objetos de risco',
        'Lembre-se: buscar ajuda é o passo mais corajoso'
      ],
      preventive: [
        'Atendimento de emergência se houver pensamentos de autoagressão',
        'CVV — Centro de Valorização da Vida: 188',
        'CAPS — Centro de Atenção Psicossocial da sua cidade',
        'SAMU: 192 para emergências médicas'
      ]
    };
  };

  const res = categorize(total);
  const percentage = Math.min(100, Math.round((total / 27) * 100));

  const dimensions = [
    { name: 'Indicadores de Humor', score: depressionPct, icon: Heart, color: 'text-blue-500', description: 'Avalia sintomas relacionados ao humor e energia', max: '27 pontos' },
    { name: 'Indicadores de Ansiedade', score: anxietyPct, icon: Activity, color: 'text-amber-500', description: 'Avalia preocupação, tensão e inquietação', max: '24 pontos' },
    { name: 'Conforto Social', score: 100 - socialPct, icon: Brain, color: 'text-green-500', description: 'Avalia conforto em situações sociais', max: '3 pontos' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Helmet>
        <title>Resultado — Calculadora de Saúde Mental</title>
        <meta name="description" content="Veja seu resultado de triagem de saúde mental com orientações e próximos passos." />
        <link rel="canonical" href={window.location.origin + '/tests/mental-health/results'} />
      </Helmet>

      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate('/ferramentas')} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
              </Button>
              <h1 className="text-xl font-bold text-gray-900 flex items-center">
                <HeartPulse className="h-5 w-5 mr-2 text-red-500" /> Resultado — Saúde Mental
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => exportPDF('mh-result', 'resultado-saude-mental.pdf')}>
                <Download className="h-4 w-4 mr-2" /> PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => shareEmail('Resultado — Saúde Mental', `Veja meu resultado da calculadora de saúde mental: ${window.location.href}`)}>
                <Share2 className="h-4 w-4 mr-2" /> E-mail
              </Button>
              <Button variant="outline" size="sm" onClick={() => shareWhatsApp(`Meu resultado — Saúde Mental: ${window.location.href}`)}>
                <Share2 className="h-4 w-4 mr-2" /> WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div id="mh-result" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className={`text-center mb-8 transition-all duration-1000 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <HeartPulse className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Triagem Concluída</h2>
          <p className="text-lg text-gray-600">Veja seus indicadores e orientações personalizadas</p>
        </div>

        {/* Main Result */}
        <Card className={`mb-8 border-2 ${res.borderColor} transition-all duration-700 ${showAnimation ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <CardHeader className="text-center pb-4">
            <div className="text-5xl mb-4">{res.emoji}</div>
            <Badge className={`${res.color} text-white mb-3 text-sm px-4 py-1`}>Nível: {res.level}</Badge>
            <CardTitle className="text-3xl text-gray-900">Pontuação Total: {total} / 27</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-md mx-auto text-center mb-4">
              <Progress value={percentage} className="h-3 mb-2" />
              <div className="text-sm text-gray-600">{percentage}% do máximo possível</div>
            </div>
            <p className="text-lg text-gray-700 text-center mt-4 max-w-2xl mx-auto leading-relaxed">{res.advice}</p>
          </CardContent>
        </Card>

        {/* Dimension Breakdown */}
        <Card className={`mb-8 transition-all duration-700 delay-200 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl">Análise por Dimensão</CardTitle>
                <p className="text-sm text-gray-600">Detalhamento dos seus indicadores de bem-estar</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {dimensions.map((dim, idx) => {
                const Icon = dim.icon;
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className={`h-5 w-5 ${dim.color}`} />
                        <div>
                          <span className="font-medium text-gray-700">{dim.name}</span>
                          <p className="text-xs text-gray-500">{dim.description}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-gray-600">{dim.score}%</span>
                    </div>
                    <Progress value={dim.score} className="h-3" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Advice */}
        <Card className={`mb-8 ${res.bgLight} border ${res.borderColor} transition-all duration-700 delay-300 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <CardContent className="p-6">
            <p className={`${res.textColor} text-center font-medium text-lg`}>{res.detailedAdvice}</p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Self Care */}
          <Card className={`transition-all duration-700 delay-300 ${showAnimation ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            <CardHeader>
              <CardTitle className="flex items-center text-green-600">
                <Star className="h-5 w-5 mr-2" /> Práticas de Bem-estar Recomendadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {res.selfCare.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <Lightbulb className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Professional Help / Prevention */}
          <Card className={`transition-all duration-700 delay-300 ${showAnimation ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
            <CardHeader>
              <CardTitle className="flex items-center text-blue-600">
                <Shield className="h-5 w-5 mr-2" /> Próximos Passos Recomendados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {res.preventive.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <Shield className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Resources */}
        <Card className="mb-8 border-2 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <Phone className="h-5 w-5 mr-2" /> Recursos de Emergência
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 text-center border border-red-100">
                <div className="text-2xl font-bold text-red-600 mb-1">188</div>
                <div className="text-sm font-medium text-gray-800">CVV — Centro de Valorização da Vida</div>
                <div className="text-xs text-gray-500 mt-1">24h — Ligação gratuita</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-red-100">
                <div className="text-2xl font-bold text-red-600 mb-1">192</div>
                <div className="text-sm font-medium text-gray-800">SAMU — Emergências</div>
                <div className="text-xs text-gray-500 mt-1">24h — Atendimento móvel</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-red-100">
                <div className="text-2xl font-bold text-red-600 mb-1">CAPS</div>
                <div className="text-sm font-medium text-gray-800">Centro de Atenção Psicossocial</div>
                <div className="text-xs text-gray-500 mt-1">Gratuito pelo SUS na sua cidade</div>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center mt-4">Se você ou alguém conhecido estiver em situação de risco, busque ajuda imediatamente.</p>
          </CardContent>
        </Card>

        {/* Escala de Referência */}
        <Card className={`mb-8 transition-all duration-700 delay-400 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <CardHeader>
            <CardTitle className="text-xl">Escala de Referência</CardTitle>
            <p className="text-sm text-gray-600">Como interpretar os níveis desta triagem</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {[
                { range: '0-4', label: 'Mínimo', color: 'bg-green-500' },
                { range: '5-9', label: 'Leve', color: 'bg-lime-500' },
                { range: '10-14', label: 'Moderado', color: 'bg-yellow-500' },
                { range: '15-19', label: 'Mod. Grave', color: 'bg-orange-500' },
                { range: '20-27', label: 'Grave', color: 'bg-red-500' },
              ].map((item, idx) => (
                <div key={idx} className={`text-center p-3 rounded-lg ${total >= parseInt(item.range) && total <= parseInt(item.range.split('-')[1]) ? `${item.color} text-white font-bold` : 'bg-gray-100 text-gray-600'}`}>
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs mt-1">{item.range}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-gray-500 text-center mb-8">Este resultado é educativo e não substitui diagnóstico médico. Procure um profissional de saúde para avaliação clínica.</p>

        {/* Next Steps */}
        <Card className="bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200">
          <CardContent className="text-center p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Continue Cuidando de Você</h3>
            <p className="text-gray-600 mb-6">Autoconhecimento é o primeiro passo para o bem-estar</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/tests/mental-age')} className="bg-indigo-600 hover:bg-indigo-700">Fazer Teste de Maturidade Mental</Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/tests/enneagram')}>Fazer Teste de Eneagrama</Button>
              <Button variant="outline" onClick={() => navigate('/ferramentas')}>Explorar Outros Testes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MentalHealthResults;
