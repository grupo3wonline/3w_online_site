
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star, Target, ArrowLeft, Download, Share2, Compass } from 'lucide-react';
import { exportPDF, shareWhatsApp, shareEmail } from '@/utils/share';

const mbtiTypes: Record<string, any> = {
  ISTJ: { title: "O Logístico", desc: "Prático, factual, confiável. Responsável e comprometido com deveres e obrigações.", strengths: ["Integridade e responsabilidade", "Organizado e metódico", "Confiável e leal", "Perseverante"], careers: ["Contabilidade", "Auditoria", "Gestão administrativa", "Engenharia civil"] },
  ISFJ: { title: "O Defensor", desc: "Silencioso, amigável, responsável e consciencioso. Dedicado a cumprir suas obrigações.", strengths: ["Empático e cuidadoso", "Confiável", "Paciente e observador", "Detalhista"], careers: ["Enfermagem", "Serviço social", "Educação", "Recursos humanos"] },
  INFJ: { title: "O Advogado", desc: "Idealista, significativo, visionário. Busca um propósito maior e impacto positivo.", strengths: ["Visionário e idealista", "Empático profundo", "Criativo e perspicaz", "Comprometido com valores"], careers: ["Psicologia", "Consultoria", "Escrita criativa", "Desenvolvimento organizacional"] },
  INTJ: { title: "O Arquiteto", desc: "Estratégico, independente, determinado. Tem visão clara e trabalha eficientemente para alcançá-la.", strengths: ["Pensamento estratégico", "Independente e determinado", "Inovador", "Alta competência"], careers: ["Planejamento estratégico", "Ciência de dados", "Arquitetura de sistemas", "Pesquisa e desenvolvimento"] },
  ISTP: { title: "O Virtuoso", desc: "Analítico, prático, observador. Flexível e adaptável, com boa capacidade de resolução de problemas.", strengths: ["Analítico e lógico", "Prático e engenhoso", "Calmo sob pressão", "Adaptável"], careers: ["Engenharia mecânica", "Forense", "Programação", "Pilotagem"] },
  ISFP: { title: "O Aventureiro", desc: "Sensível, gentil, artístico. Vive o momento e aprecia a beleza ao redor.", strengths: ["Artístico e criativo", "Sensível e empático", "Gentil e harmonioso", "Adaptável"], careers: ["Design", "Artes visuais", "Musicoterapia", "Veterinária"] },
  INFP: { title: "O Mediador", desc: "Idealista, empático, criativo. Busca viver de acordo com seus valores mais profundos.", strengths: ["Idealista e empático", "Criativo e expressivo", "Apaixonado por causas", "Aberto a possibilidades"], careers: ["Escrita", "Aconselhamento", "Psicologia", "Artes"] },
  INTP: { title: "O Lógico", desc: "Lógico, original, criativo. Curioso sobre sistemas e como as coisas funcionam.", strengths: ["Pensamento lógico excepcional", "Inventivo e criativo", "Objetivo e analítico", "Amor por conhecimento"], careers: ["Pesquisa científica", "Filosofia", "Desenvolvimento de software", "Matemática"] },
  ESTP: { title: "O Empresário", desc: "Pragmático, direto, energético. Focado no momento presente e na ação.", strengths: ["Pragmático e direto", "Energético e ativo", "Bom observador", "Negociador nato"], careers: ["Vendas", "Empreendedorismo", "Marketing", "Esportes profissionais"] },
  ESFP: { title: "O Animador", desc: "Sociável, espontâneo, entusiasta. Adora estar no centro da diversão e da ação.", strengths: ["Sociável e divertido", "Espontâneo e energético", "Prático e adaptável", "Generoso"], careers: ["Entretenimento", "Eventos", "Relações públicas", "Turismo"] },
  ENFP: { title: "O Ativista", desc: "Entusiasmado, criativo, sociável. Free spirit que encontra conexões em tudo.", strengths: ["Criativo e entusiasmado", "Sociável e carismático", "Empático e compreensivo", "Versátil e energético"], careers: ["Jornalismo", "Publicidade", "Coaching", "Gestão de projetos criativos"] },
  ENTP: { title: "O Debatedor", desc: "Inteligente, curioso, estrategista. Adora desafios intelectuais e debates.", strengths: ["Mentalmente ágil", "Inovador e inventivo", "Carismático", "Excelente em debates"], careers: ["Direito", "Consultoria estratégica", "Empreendedorismo", "Inovação"] },
  ESTJ: { title: "O Executivo", desc: "Organizado, lógico, assertivo. Líder nato que valoriza ordem e eficiência.", strengths: ["Organizado e eficiente", "Líder decidido", "Confiável e dedicado", "Direto e honesto"], careers: ["Gestão executiva", "Administração pública", "Gestão de operações", "Finanças"] },
  ESFJ: { title: "O Cônsul", desc: "Caloroso, consciente, cooperativo. Preocupa-se genuinamente com os outros.", strengths: ["Sociável e caloroso", "Cooperativo e leal", "Responsável e organizado", "Empático e atencioso"], careers: ["Recursos humanos", "Educação", "Medicina", "Relações públicas"] },
  ENFJ: { title: "O Protagonista", desc: "Carismático, empático, líder inspirador. Motiva e desenvolve pessoas ao seu redor.", strengths: ["Líder carismático", "Empático e inspirador", "Comunicador excepcional", "Altruísta e envolvente"], careers: ["Coaching e mentoring", "Gestão de pessoas", "Diplomacia", "Educação"] },
  ENTJ: { title: "O Comandante", desc: "Assertivo, estratégico, líder decidido. Natural em posições de comando e estratégia.", strengths: ["Liderança estratégica", "Determinado e eficiente", "Decisivo", "Visionário e ambicioso"], careers: ["CEO e alta gestão", "Consultoria estratégica", "Empreendedorismo", "Direito corporativo"] }
};

const MBTIResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || {};

  const calculateMBTI = () => {
    const counts: Record<string, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    Object.values(answers).forEach((a: any) => { if (counts.hasOwnProperty(a)) counts[a]++; });

    const ei = counts.E >= counts.I ? 'E' : 'I';
    const sn = counts.S >= counts.N ? 'S' : 'N';
    const tf = counts.T >= counts.F ? 'T' : 'F';
    const jp = counts.J >= counts.P ? 'J' : 'P';

    const type = `${ei}${sn}${tf}${jp}`;

    const dimensions = [
      { left: 'E', right: 'I', leftName: 'Extroversão', rightName: 'Introversão', leftPct: Math.round((counts.E / (counts.E + counts.I || 1)) * 100), rightPct: Math.round((counts.I / (counts.E + counts.I || 1)) * 100) },
      { left: 'S', right: 'N', leftName: 'Sensação', rightName: 'Intuição', leftPct: Math.round((counts.S / (counts.S + counts.N || 1)) * 100), rightPct: Math.round((counts.N / (counts.S + counts.N || 1)) * 100) },
      { left: 'T', right: 'F', leftName: 'Pensamento', rightName: 'Sentimento', leftPct: Math.round((counts.T / (counts.T + counts.F || 1)) * 100), rightPct: Math.round((counts.F / (counts.T + counts.F || 1)) * 100) },
      { left: 'J', right: 'P', leftName: 'Julgamento', rightName: 'Percepção', leftPct: Math.round((counts.J / (counts.J + counts.P || 1)) * 100), rightPct: Math.round((counts.P / (counts.J + counts.P || 1)) * 100) }
    ];

    return { type, dimensions };
  };

  const result = calculateMBTI();
  const typeInfo = mbtiTypes[result.type];

  if (!typeInfo) {
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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate('/ferramentas')} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Resultado — MBTI</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => exportPDF('mbti-result', 'resultado-mbti.pdf')}>
                <Download className="h-4 w-4 mr-2" /> PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => shareEmail('Resultado MBTI', `Meu tipo MBTI: ${result.type} — ${typeInfo.title}`)}>
                <Share2 className="h-4 w-4 mr-2" /> E-mail
              </Button>
              <Button variant="outline" size="sm" onClick={() => shareWhatsApp(`Meu tipo MBTI é ${result.type} — ${typeInfo.title}! Faça o teste!`)}>
                <Share2 className="h-4 w-4 mr-2" /> WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div id="mbti-result" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-violet-100 text-violet-800 rounded-full text-sm font-medium mb-4">
            <Compass className="h-4 w-4 mr-2" /> Seu Tipo Myers-Briggs
          </div>
          <h1 className="text-5xl font-bold text-violet-700 mb-2">{result.type}</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{typeInfo.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{typeInfo.desc}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Dimensões */}
            <Card>
              <CardHeader><CardTitle className="text-violet-600">Suas 4 Dimensões</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                {result.dimensions.map((dim, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span className={dim.leftPct >= 50 ? 'text-violet-700 font-bold' : 'text-gray-500'}>
                        {dim.left} — {dim.leftName} ({dim.leftPct}%)
                      </span>
                      <span className={dim.rightPct > 50 ? 'text-violet-700 font-bold' : 'text-gray-500'}>
                        {dim.rightName} — {dim.right} ({dim.rightPct}%)
                      </span>
                    </div>
                    <div className="flex h-4 rounded-full overflow-hidden bg-gray-200">
                      <div className="bg-violet-500 transition-all" style={{ width: `${dim.leftPct}%` }}></div>
                      <div className="bg-purple-300 transition-all" style={{ width: `${dim.rightPct}%` }}></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Pontos fortes */}
            <Card>
              <CardHeader><CardTitle className="text-green-600">Pontos Fortes</CardTitle></CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {typeInfo.strengths.map((s: string, i: number) => (
                    <div key={i} className="flex items-center">
                      <Star className="h-4 w-4 text-green-500 mr-2" /><span className="text-gray-700">{s}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Carreiras */}
            <Card>
              <CardHeader><CardTitle className="text-blue-600">Carreiras Sugeridas</CardTitle></CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {typeInfo.careers.map((c: string, i: number) => (
                    <div key={i} className="flex items-center bg-blue-50 rounded-lg p-3">
                      <Target className="h-4 w-4 text-blue-500 mr-2" /><span className="text-gray-700">{c}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200">
              <CardHeader><CardTitle className="text-center text-violet-900">Sobre o MBTI</CardTitle></CardHeader>
              <CardContent className="text-gray-700 text-sm space-y-3">
                <p>O MBTI classifica personalidades em 16 tipos baseados em 4 dimensões de preferência.</p>
                <p>Não existem tipos melhores ou piores — cada um traz forças únicas e perspectivas valiosas.</p>
                <p>Use este resultado como ponto de partida para autoconhecimento e desenvolvimento pessoal.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Próximos Passos</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" onClick={() => navigate('/tests/big-five')}>Fazer Teste Big Five</Button>
                <Button variant="outline" className="w-full" onClick={() => navigate('/tests/enneagram')}>Fazer Eneagrama</Button>
                <Button variant="outline" className="w-full" onClick={() => navigate('/ferramentas')}>Explorar Outros Testes</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MBTIResults;
