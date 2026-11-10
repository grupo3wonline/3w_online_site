import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Share2, Target, BookOpen, Briefcase, TrendingUp, CheckCircle, Star, Lightbulb, Globe, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { exportPDF, shareWhatsApp, shareEmail } from '@/utils/share';

const VocationalResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(false);
  
  const answers = location.state?.answers || {};

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  // Calculate results based on answers
  const calculateResults = () => {
    const areas = {
      health: { name: 'Saúde e Bem-estar', score: 0, color: 'bg-green-500' },
      technology: { name: 'Tecnologia e Inovação', score: 0, color: 'bg-blue-500' },
      business: { name: 'Negócios e Empreendedorismo', score: 0, color: 'bg-purple-500' },
      education: { name: 'Educação e Desenvolvimento', score: 0, color: 'bg-yellow-500' },
      arts: { name: 'Artes e Criatividade', score: 0, color: 'bg-pink-500' },
      social: { name: 'Ciências Sociais e Humanas', score: 0, color: 'bg-indigo-500' },
      engineering: { name: 'Engenharia e Exatas', score: 0, color: 'bg-red-500' },
      communication: { name: 'Comunicação e Marketing', score: 0, color: 'bg-orange-500' }
    };

    // Scoring logic based on answers
    Object.values(answers).forEach((answer: any) => {
      switch (answer) {
        case 'helping':
        case 'social':
        case 'volunteer':
        case 'helping_others':
        case 'contribution':
        case 'individual':
        case 'non_profit':
          areas.health.score += 3;
          areas.social.score += 2;
          areas.education.score += 2;
          break;
        case 'creating':
        case 'artistic':
        case 'creativity':
        case 'create':
        case 'innovation':
        case 'innovator':
          areas.arts.score += 3;
          areas.technology.score += 2;
          break;
        case 'analyzing':
        case 'technical':
        case 'lab':
        case 'analysis':
        case 'intellectual':
        case 'research':
        case 'expert':
          areas.technology.score += 3;
          areas.engineering.score += 3;
          break;
        case 'leading':
        case 'business':
        case 'commercial':
        case 'strategic':
        case 'leadership':
        case 'entrepreneurship':
        case 'leader':
          areas.business.score += 3;
          areas.communication.score += 2;
          break;
        case 'communication':
        case 'verbal':
        case 'digital':
        case 'network':
        case 'relationships':
          areas.communication.score += 3;
          areas.social.score += 2;
          break;
        case 'study':
        case 'theory':
        case 'teaching':
        case 'mentoring':
        case 'mentor':
        case 'educational':
          areas.education.score += 3;
          areas.social.score += 1;
          break;
      }
    });

    // Normalize scores to percentages
    const maxScore = Math.max(...Object.values(areas).map(area => area.score));
    if (maxScore > 0) {
      Object.keys(areas).forEach(key => {
        areas[key as keyof typeof areas].score = Math.round((areas[key as keyof typeof areas].score / maxScore) * 100);
      });
    }

    return Object.entries(areas)
      .map(([key, area]) => ({ key, ...area }))
      .sort((a, b) => b.score - a.score);
  };

  const results = calculateResults();
  const topArea = results[0];
  const secondArea = results[1];
  const thirdArea = results[2];

  const getRecommendations = (topArea: any) => {
    const recommendations = {
      health: {
        careers: ['Medicina', 'Enfermagem', 'Fisioterapia', 'Psicologia', 'Nutrição', 'Educação Física'],
        courses: ['Medicina', 'Enfermagem', 'Fisioterapia', 'Psicologia', 'Nutrição', 'Biomedicina'],
        skills: ['Empatia', 'Comunicação', 'Resolução de problemas', 'Trabalho em equipe', 'Cuidado ao próximo']
      },
      technology: {
        careers: ['Desenvolvedor de Software', 'Engenheiro de Dados', 'UX/UI Designer', 'Analista de Sistemas', 'DevOps', 'Cientista de Dados'],
        courses: ['Ciência da Computação', 'Engenharia de Software', 'Sistemas de Informação', 'Análise de Sistemas'],
        skills: ['Programação', 'Pensamento lógico', 'Resolução de problemas', 'Aprendizado contínuo', 'Inovação']
      },
      business: {
        careers: ['Administrador', 'Consultor Empresarial', 'Gerente de Projetos', 'Empreendedor', 'Analista Financeiro'],
        courses: ['Administração', 'Economia', 'Gestão Empresarial', 'MBA em Negócios'],
        skills: ['Liderança', 'Negociação', 'Planejamento estratégico', 'Tomada de decisão', 'Gestão de pessoas']
      },
      education: {
        careers: ['Professor', 'Pedagogo', 'Coordenador Educacional', 'Psicopedagogo', 'Instrutor Corporativo'],
        courses: ['Pedagogia', 'Licenciaturas', 'Psicopedagogia', 'Gestão Educacional'],
        skills: ['Didática', 'Paciência', 'Comunicação', 'Empatia', 'Planejamento de aulas']
      },
      arts: {
        careers: ['Designer Gráfico', 'Arquiteto', 'Publicitário', 'Fotógrafo', 'Diretor de Arte', 'Artista Visual'],
        courses: ['Design Gráfico', 'Arquitetura', 'Publicidade', 'Artes Visuais', 'Design de Produto'],
        skills: ['Criatividade', 'Senso estético', 'Domínio de ferramentas', 'Inovação', 'Comunicação visual']
      },
      social: {
        careers: ['Assistente Social', 'Sociólogo', 'Antropólogo', 'Jornalista', 'Relações Públicas'],
        courses: ['Serviço Social', 'Sociologia', 'Antropologia', 'Jornalismo', 'Relações Públicas'],
        skills: ['Empatia', 'Comunicação', 'Análise social', 'Trabalho comunitário', 'Mediação de conflitos']
      },
      engineering: {
        careers: ['Engenheiro Civil', 'Engenheiro Mecânico', 'Engenheiro Elétrico', 'Arquiteto', 'Engenheiro de Produção'],
        courses: ['Engenharia Civil', 'Engenharia Mecânica', 'Engenharia Elétrica', 'Engenharia de Produção'],
        skills: ['Matemática', 'Física', 'Pensamento analítico', 'Resolução de problemas', 'Precisão técnica']
      },
      communication: {
        careers: ['Jornalista', 'Publicitário', 'Relações Públicas', 'Social Media', 'Locutor', 'Assessor de Imprensa'],
        courses: ['Jornalismo', 'Publicidade e Propaganda', 'Relações Públicas', 'Marketing Digital'],
        skills: ['Comunicação', 'Escrita', 'Criatividade', 'Networking', 'Mídia digital']
      }
    };

    return recommendations[topArea.key as keyof typeof recommendations] || recommendations.business;
  };

  const recommendations = getRecommendations(topArea);

  const areaDescriptions: Record<string, { description: string; trend: string; salary: string }> = {
    health: { description: 'Focada no cuidado com pessoas, saúde física e mental, qualidade de vida e bem-estar geral.', trend: '📈 Alta demanda — setor em crescimento constante', salary: 'R$ 4.000 – R$ 25.000+' },
    technology: { description: 'Envolve desenvolvimento de software, análise de dados, inteligência artificial e inovação digital.', trend: '🚀 Explosão de demanda — um dos setores que mais cresce', salary: 'R$ 5.000 – R$ 30.000+' },
    business: { description: 'Abrange gestão, empreendedorismo, finanças, consultoria e planejamento estratégico.', trend: '📊 Demanda estável — oportunidades em todos os setores', salary: 'R$ 4.000 – R$ 20.000+' },
    education: { description: 'Voltada para ensino, formação, desenvolvimento humano e transformação social pela educação.', trend: '📚 Crescimento com EdTech e ensino online', salary: 'R$ 3.000 – R$ 12.000+' },
    arts: { description: 'Engloba design, arquitetura, artes visuais, fotografia e expressão artística em diversas mídias.', trend: '🎨 Demanda crescente em Design UX/UI e mídia digital', salary: 'R$ 3.500 – R$ 18.000+' },
    social: { description: 'Dedicada à compreensão da sociedade, relações humanas, políticas públicas e transformação social.', trend: '🌍 Relevância crescente em ESG e impacto social', salary: 'R$ 3.000 – R$ 15.000+' },
    engineering: { description: 'Combina ciências exatas com aplicações práticas em construção, indústria, energia e infraestrutura.', trend: '⚙️ Demanda alta — especialmente em energia renovável', salary: 'R$ 5.000 – R$ 25.000+' },
    communication: { description: 'Envolve jornalismo, marketing, relações públicas, mídias sociais e produção de conteúdo.', trend: '📱 Transformação digital impulsiona novas carreiras', salary: 'R$ 3.500 – R$ 18.000+' },
  };

  const topAreaDetails = areaDescriptions[topArea.key] || areaDescriptions.business;

  if (!answers || Object.keys(answers).length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center p-8">
          <CardContent>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Oops! Nenhum resultado encontrado</h2>
            <p className="text-gray-600 mb-6">Parece que você não completou o teste ainda.</p>
            <Button onClick={() => navigate('/tests/vocational')}>
              Fazer o Teste Vocacional
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Helmet>
        <title>Resultado — Teste Vocacional Completo</title>
        <meta name="description" content="Descubra sua área vocacional com carreiras, cursos e habilidades recomendadas." />
        <link rel="canonical" href={window.location.origin + '/tests/vocational/results'} />
      </Helmet>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/ferramentas')}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar aos Testes
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Resultado do Teste Vocacional</h1>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => exportPDF('vocational-result', 'resultado-vocacional.pdf')}>
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => shareEmail('Resultado - Teste Vocacional', `Veja meu resultado e recomendações: ${window.location.href}`)}>
                <Share2 className="h-4 w-4 mr-2" />
                E-mail
              </Button>
              <Button variant="outline" size="sm" onClick={() => shareWhatsApp(`Meu resultado do Teste Vocacional: ${window.location.href}`)}>
                <Share2 className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div id="vocational-result" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Animation */}
        <div className={`text-center mb-8 transition-all duration-1000 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Parabéns! Teste Concluído</h2>
          <p className="text-lg text-gray-600">Aqui estão seus resultados personalizados</p>
        </div>

        {/* Main Result */}
        <Card className={`mb-8 border-2 ${topArea.color.replace('bg-', 'border-').replace('-500', '-200')} transition-all duration-700 ${showAnimation ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <CardHeader className="text-center pb-4">
            <div className={`mx-auto w-20 h-20 ${topArea.color} rounded-full flex items-center justify-center mb-4`}>
              <Target className="h-10 w-10 text-white" />
            </div>
            <Badge className={`mb-4 ${topArea.color} text-white`}>
              Sua Área Vocacional Principal
            </Badge>
            <CardTitle className="text-3xl text-gray-900 mb-2">{topArea.name}</CardTitle>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">{topArea.score}%</span>
              <span className="text-gray-600">de compatibilidade</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <Progress value={topArea.score} className="w-full max-w-md mx-auto h-3 mb-2" />
            </div>
            <p className="text-lg text-gray-700 text-center leading-relaxed">
              Com base em suas respostas, você demonstra forte afinidade com a área de {topArea.name.toLowerCase()}. 
              Esta área combina perfeitamente com seu perfil de interesses e habilidades naturais.
            </p>
            <p className="text-base text-gray-600 text-center mt-3">{topAreaDetails.description}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
              <Badge variant="secondary" className="px-3 py-1 text-sm">{topAreaDetails.trend}</Badge>
              <Badge variant="outline" className="px-3 py-1 text-sm">💰 Faixa salarial: {topAreaDetails.salary}</Badge>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Career Recommendations */}
          <Card className={`transition-all duration-700 delay-200 ${showAnimation ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Carreiras Recomendadas</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {recommendations.careers.map((career, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">{career}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Course Recommendations */}
          <Card className={`transition-all duration-700 delay-300 ${showAnimation ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Cursos Sugeridos</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendations.courses.map((course, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-gray-700">{course}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills to Develop */}
        <Card className={`mb-8 transition-all duration-700 delay-400 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <CardHeader>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Habilidades Importantes para Desenvolver</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {recommendations.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* All Areas Ranking */}
        <Card className={`mb-8 transition-all duration-700 delay-500 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <Globe className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <CardTitle className="text-xl">Ranking Completo de Áreas</CardTitle>
                <p className="text-gray-600">Todas as 8 áreas analisadas com sua compatibilidade</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((area, index) => {
                const details = areaDescriptions[area.key] || areaDescriptions.business;
                return (
                  <div key={index} className={`flex items-center justify-between p-4 border rounded-lg ${index === 0 ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200' : ''}`}>
                    <div className="flex items-center space-x-4">
                      <div className="text-lg font-bold text-gray-400 w-6 text-center">{index + 1}</div>
                      <div className={`w-4 h-4 ${area.color} rounded-full`}></div>
                      <div>
                        <h4 className="font-medium text-gray-900">{area.name}</h4>
                        <p className="text-xs text-gray-500">{details.trend}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Progress value={area.score} className="w-24 h-2" />
                      <span className="text-sm font-semibold text-gray-700 w-10 text-right">{area.score}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className={`mb-8 transition-all duration-700 delay-500 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Lightbulb className="h-6 w-6 text-amber-600" />
              </div>
              <CardTitle className="text-xl">Dicas para sua Jornada Profissional</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: '🎯', title: 'Conheça-se profundamente', tip: 'Combine este resultado com os testes DISC e Eneagrama para uma visão completa do seu perfil.' },
                { icon: '🌐', title: 'Pesquise o mercado', tip: 'Busque informações sobre demanda, salários e tendências na área que mais combina com você.' },
                { icon: '🤝', title: 'Faça networking', tip: 'Converse com profissionais da área, participe de eventos e siga referências no LinkedIn.' },
                { icon: '📚', title: 'Invista em formação', tip: 'Explore cursos, workshops e certificações que potencializem suas habilidades naturais.' },
                { icon: '💡', title: 'Considere combinações', tip: `Suas 2ª e 3ª áreas (${secondArea.name} e ${thirdArea.name}) podem gerar nichos únicos de atuação.` },
                { icon: '🔄', title: 'Valorize a adaptação', tip: 'Carreiras evoluem. Mantenha-se aberto a novas possibilidades dentro da sua área de interesse.' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{item.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-gray-500 text-center mb-8">Este resultado é baseado em suas respostas e serve como orientação. Consulte um orientador profissional para aprofundar sua análise.</p>

        {/* Next Steps */}
        <Card className={`bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 transition-all duration-700 delay-600 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <CardContent className="text-center p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Próximos Passos</h3>
            <p className="text-gray-600 mb-6">
              Complete sua análise com nossos outros testes para uma visão ainda mais completa do seu perfil
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/tests/enneagram')}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Fazer Teste de Eneagrama
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/tests/disc')}
              >
                Fazer Avaliação DISC
              </Button>
              <Button variant="outline" onClick={() => navigate('/ferramentas')}>
                Explorar Outros Testes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VocationalResults;
