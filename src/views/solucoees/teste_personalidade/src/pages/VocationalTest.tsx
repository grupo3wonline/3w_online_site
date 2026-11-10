
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import TestHelpButton from '@/components/TestHelpButton';

const VocationalTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      id: 1,
      question: "O que mais te motiva em um trabalho?",
      options: [
        { value: "helping", label: "Ajudar outras pessoas e fazer a diferença na sociedade" },
        { value: "creating", label: "Criar algo novo e expressar minha criatividade" },
        { value: "analyzing", label: "Analisar dados e resolver problemas complexos" },
        { value: "leading", label: "Liderar equipes e tomar decisões estratégicas" }
      ]
    },
    {
      id: 2,
      question: "Em qual ambiente você se sente mais produtivo?",
      options: [
        { value: "office", label: "Escritório tradicional com estrutura definida" },
        { value: "remote", label: "Trabalho remoto com flexibilidade de horários" },
        { value: "field", label: "Trabalho de campo, visitando clientes ou locais diferentes" },
        { value: "lab", label: "Laboratório ou ambiente técnico especializado" }
      ]
    },
    {
      id: 3,
      question: "Qual tipo de tarefa você prefere realizar?",
      options: [
        { value: "routine", label: "Tarefas rotineiras e bem estruturadas" },
        { value: "varied", label: "Atividades variadas que mudam constantemente" },
        { value: "project", label: "Projetos de longo prazo com objetivos claros" },
        { value: "immediate", label: "Demandas imediatas que requerem ação rápida" }
      ]
    },
    {
      id: 4,
      question: "Como você prefere trabalhar?",
      options: [
        { value: "team", label: "Em equipe, colaborando com outras pessoas" },
        { value: "alone", label: "Sozinho, com autonomia total" },
        { value: "small_group", label: "Em pequenos grupos de 3-5 pessoas" },
        { value: "leading", label: "Liderando e coordenando outros profissionais" }
      ]
    },
    {
      id: 5,
      question: "Qual área desperta mais seu interesse?",
      options: [
        { value: "health", label: "Saúde e bem-estar das pessoas" },
        { value: "technology", label: "Tecnologia e inovação" },
        { value: "business", label: "Negócios e empreendedorismo" },
        { value: "education", label: "Educação e desenvolvimento humano" }
      ]
    },
    {
      id: 6,
      question: "O que você considera mais importante no trabalho?",
      options: [
        { value: "stability", label: "Estabilidade financeira e segurança no emprego" },
        { value: "growth", label: "Oportunidades de crescimento e aprendizado" },
        { value: "purpose", label: "Propósito e significado no que faço" },
        { value: "recognition", label: "Reconhecimento e prestígio profissional" }
      ]
    },
    {
      id: 7,
      question: "Qual habilidade você considera seu maior ponto forte?",
      options: [
        { value: "communication", label: "Comunicação e relacionamento interpessoal" },
        { value: "analysis", label: "Análise lógica e pensamento crítico" },
        { value: "creativity", label: "Criatividade e inovação" },
        { value: "organization", label: "Organização e planejamento" }
      ]
    },
    {
      id: 8,
      question: "Em que tipo de projeto você se sentiria mais realizado?",
      options: [
        { value: "social", label: "Projetos sociais que impactam a comunidade" },
        { value: "technical", label: "Desenvolvimentos técnicos e científicos" },
        { value: "artistic", label: "Criações artísticas e culturais" },
        { value: "commercial", label: "Empreendimentos comerciais e de negócios" }
      ]
    },
    {
      id: 9,
      question: "Como você lida com mudanças no trabalho?",
      options: [
        { value: "embrace", label: "Abraço mudanças e me adapto rapidamente" },
        { value: "cautious", label: "Sou cauteloso mas me adapto gradualmente" },
        { value: "plan", label: "Prefiro mudanças planejadas e estruturadas" },
        { value: "resist", label: "Prefiro estabilidade e rotinas consolidadas" }
      ]
    },
    {
      id: 10,
      question: "Qual tipo de desafio mais te estimula?",
      options: [
        { value: "intellectual", label: "Desafios intelectuais e de raciocínio" },
        { value: "interpersonal", label: "Desafios de relacionamento e comunicação" },
        { value: "practical", label: "Problemas práticos do dia a dia" },
        { value: "strategic", label: "Planejamento estratégico e visão de futuro" }
      ]
    },
    {
      id: 11,
      question: "O que você faria em seu tempo livre se pudesse?",
      options: [
        { value: "study", label: "Estudar e aprender coisas novas" },
        { value: "volunteer", label: "Fazer trabalho voluntário" },
        { value: "create", label: "Desenvolver projetos criativos" },
        { value: "network", label: "Networking e construção de relacionamentos" }
      ]
    },
    {
      id: 12,
      question: "Qual fator é mais importante para sua satisfação profissional?",
      options: [
        { value: "autonomy", label: "Autonomia para tomar decisões" },
        { value: "collaboration", label: "Trabalho colaborativo e em equipe" },
        { value: "innovation", label: "Possibilidade de inovar e criar" },
        { value: "impact", label: "Impacto positivo do meu trabalho" }
      ]
    },
    {
      id: 13,
      question: "Como você prefere aprender novas habilidades?",
      options: [
        { value: "hands_on", label: "Prática e experiência direta" },
        { value: "theory", label: "Estudo teórico e conceitual" },
        { value: "mentoring", label: "Orientação de mentores experientes" },
        { value: "experimenting", label: "Experimentação e tentativa e erro" }
      ]
    },
    {
      id: 14,
      question: "Qual ambiente de trabalho você considera ideal?",
      options: [
        { value: "corporate", label: "Ambiente corporativo estruturado" },
        { value: "startup", label: "Startup dinâmica e inovadora" },
        { value: "non_profit", label: "Organização sem fins lucrativos" },
        { value: "government", label: "Setor público e governamental" }
      ]
    },
    {
      id: 15,
      question: "O que mais te incomoda em um trabalho?",
      options: [
        { value: "monotony", label: "Rotina repetitiva e monótona" },
        { value: "pressure", label: "Pressão excessiva e prazos apertados" },
        { value: "conflict", label: "Conflitos interpessoais constantes" },
        { value: "lack_purpose", label: "Falta de propósito e significado" }
      ]
    },
    {
      id: 16,
      question: "Qual tipo de comunicação você prefere?",
      options: [
        { value: "written", label: "Comunicação escrita e documentada" },
        { value: "verbal", label: "Conversas e apresentações orais" },
        { value: "visual", label: "Comunicação visual e apresentações" },
        { value: "digital", label: "Comunicação digital e redes sociais" }
      ]
    },
    {
      id: 17,
      question: "Como você define sucesso profissional?",
      options: [
        { value: "financial", label: "Estabilidade e crescimento financeiro" },
        { value: "recognition", label: "Reconhecimento e prestígio" },
        { value: "fulfillment", label: "Realização pessoal e satisfação" },
        { value: "influence", label: "Capacidade de influenciar e liderar" }
      ]
    },
    {
      id: 18,
      question: "Qual tipo de responsabilidade você prefere?",
      options: [
        { value: "individual", label: "Responsabilidade individual pelos resultados" },
        { value: "shared", label: "Responsabilidade compartilhada em equipe" },
        { value: "leadership", label: "Responsabilidade por liderar outros" },
        { value: "specialized", label: "Responsabilidade técnica especializada" }
      ]
    },
    {
      id: 19,
      question: "O que te dá mais energia no trabalho?",
      options: [
        { value: "problem_solving", label: "Resolver problemas complexos" },
        { value: "helping_others", label: "Ajudar e desenvolver outras pessoas" },
        { value: "creating", label: "Criar e desenvolver algo novo" },
        { value: "achieving_goals", label: "Alcançar metas e objetivos" }
      ]
    },
    {
      id: 20,
      question: "Qual aspecto do trabalho você considera mais rewarding?",
      options: [
        { value: "learning", label: "Aprendizado constante e desenvolvimento" },
        { value: "relationships", label: "Relacionamentos e conexões humanas" },
        { value: "achievement", label: "Conquistas e resultados tangíveis" },
        { value: "contribution", label: "Contribuição para algo maior" }
      ]
    },
    {
      id: 21,
      question: "Como você prefere receber feedback?",
      options: [
        { value: "regular", label: "Feedback regular e estruturado" },
        { value: "informal", label: "Conversas informais e espontâneas" },
        { value: "written", label: "Relatórios escritos detalhados" },
        { value: "public", label: "Reconhecimento público das conquistas" }
      ]
    },
    {
      id: 22,
      question: "Qual tipo de inovação mais te atrai?",
      options: [
        { value: "technological", label: "Inovação tecnológica e digital" },
        { value: "social", label: "Inovação social e sustentável" },
        { value: "business", label: "Modelos de negócio inovadores" },
        { value: "educational", label: "Métodos educacionais e de ensino" }
      ]
    },
    {
      id: 23,
      question: "O que você faria se tivesse total liberdade profissional?",
      options: [
        { value: "research", label: "Dedicar-me à pesquisa e descobertas" },
        { value: "entrepreneurship", label: "Empreender e criar meu próprio negócio" },
        { value: "teaching", label: "Ensinar e compartilhar conhecimento" },
        { value: "consulting", label: "Consultorar e resolver problemas únicos" }
      ]
    },
    {
      id: 24,
      question: "Qual tipo de impacto você gostaria de causar?",
      options: [
        { value: "local", label: "Impacto direto na minha comunidade local" },
        { value: "global", label: "Impacto global e de larga escala" },
        { value: "individual", label: "Transformação individual das pessoas" },
        { value: "systematic", label: "Mudanças sistêmicas e estruturais" }
      ]
    },
    {
      id: 25,
      question: "Como você gostaria de ser lembrado profissionalmente?",
      options: [
        { value: "expert", label: "Como um especialista técnico respeitado" },
        { value: "leader", label: "Como um líder inspirador" },
        { value: "innovator", label: "Como um inovador criativo" },
        { value: "mentor", label: "Como um mentor que desenvolveu outros" }
      ]
    },
    {
      id: 26,
      question: "Qual tipo de problema você mais gosta de resolver?",
      options: [
        { value: "technical", label: "Problemas técnicos e científicos" },
        { value: "human", label: "Questões humanas e relacionais" },
        { value: "strategic", label: "Desafios estratégicos e de planejamento" },
        { value: "creative", label: "Problemas que requerem soluções criativas" }
      ]
    },
    {
      id: 27,
      question: "Em que tipo de evento profissional você se sente mais confortável?",
      options: [
        { value: "conference", label: "Conferências técnicas e apresentações" },
        { value: "networking", label: "Eventos de networking e relacionamento" },
        { value: "workshop", label: "Workshops práticos e hands-on" },
        { value: "seminar", label: "Seminários e discussões teóricas" }
      ]
    },
    {
      id: 28,
      question: "Qual aspecto da tecnologia mais te interessa?",
      options: [
        { value: "development", label: "Desenvolvimento e programação" },
        { value: "design", label: "Design e experiência do usuário" },
        { value: "data", label: "Análise de dados e inteligência artificial" },
        { value: "infrastructure", label: "Infraestrutura e sistemas" }
      ]
    },
    {
      id: 29,
      question: "Como você prefere estruturar seu dia de trabalho?",
      options: [
        { value: "scheduled", label: "Agenda estruturada com horários definidos" },
        { value: "flexible", label: "Flexibilidade para ajustar conforme necessário" },
        { value: "blocks", label: "Blocos de tempo dedicados a atividades específicas" },
        { value: "spontaneous", label: "Abordagem espontânea baseada em prioridades" }
      ]
    },
    {
      id: 30,
      question: "Qual tipo de reconhecimento profissional você mais valoriza?",
      options: [
        { value: "peer", label: "Reconhecimento dos colegas e pares" },
        { value: "client", label: "Satisfação e feedback positivo dos clientes" },
        { value: "management", label: "Reconhecimento da liderança e gestão" },
        { value: "industry", label: "Reconhecimento do setor e comunidade profissional" }
      ]
    },
    {
      id: 31,
      question: "Como você lida com multitarefas?",
      options: [
        { value: "thrive", label: "Trabalho melhor com múltiplas tarefas simultâneas" },
        { value: "focus", label: "Prefiro focar em uma tarefa por vez" },
        { value: "organize", label: "Organizo e priorizo para gerenciar múltiplas demandas" },
        { value: "delegate", label: "Delego quando possível para manter o foco" }
      ]
    },
    {
      id: 32,
      question: "Qual ambiente de aprendizado você prefere?",
      options: [
        { value: "classroom", label: "Sala de aula tradicional com instrutor" },
        { value: "online", label: "Cursos online e autodidáticos" },
        { value: "practical", label: "Aprendizado prático no trabalho" },
        { value: "collaborative", label: "Grupos de estudo e aprendizado colaborativo" }
      ]
    },
    {
      id: 33,
      question: "Como você definiria seu estilo de liderança ideal?",
      options: [
        { value: "democratic", label: "Democrático e participativo" },
        { value: "coaching", label: "Coaching e desenvolvimento de pessoas" },
        { value: "visionary", label: "Visionário e inspiracional" },
        { value: "collaborative", label: "Colaborativo e facilitador" }
      ]
    },
    {
      id: 34,
      question: "Qual tipo de cultura organizacional você prefere?",
      options: [
        { value: "innovative", label: "Inovadora e disruptiva" },
        { value: "collaborative", label: "Colaborativa e inclusiva" },
        { value: "performance", label: "Focada em performance e resultados" },
        { value: "caring", label: "Cuidadora e centrada nas pessoas" }
      ]
    },
    {
      id: 35,
      question: "Como você prefere lidar com prazos apertados?",
      options: [
        { value: "plan", label: "Planejamento detalhado e antecipação" },
        { value: "focus", label: "Foco intenso e eliminação de distrações" },
        { value: "collaborate", label: "Colaboração e divisão de tarefas" },
        { value: "prioritize", label: "Priorização e renegociação quando necessário" }
      ]
    },
    {
      id: 36,
      question: "Qual tipo de viagem de trabalho você prefere?",
      options: [
        { value: "minimal", label: "Mínima ou nenhuma viagem" },
        { value: "occasional", label: "Viagens ocasionais para eventos específicos" },
        { value: "regular", label: "Viagens regulares como parte da função" },
        { value: "extensive", label: "Viagens extensas e internacionais" }
      ]
    },
    {
      id: 37,
      question: "Como você aborda a inovação no trabalho?",
      options: [
        { value: "incremental", label: "Melhorias incrementais e contínuas" },
        { value: "disruptive", label: "Inovação disruptiva e radical" },
        { value: "collaborative", label: "Inovação colaborativa com equipes" },
        { value: "research", label: "Baseada em pesquisa e experimentação" }
      ]
    },
    {
      id: 38,
      question: "Qual aspecto da sustentabilidade mais te motiva?",
      options: [
        { value: "environmental", label: "Impacto ambiental e conservação" },
        { value: "social", label: "Responsabilidade social e equidade" },
        { value: "economic", label: "Sustentabilidade econômica e eficiência" },
        { value: "innovation", label: "Inovação em soluções sustentáveis" }
      ]
    },
    {
      id: 39,
      question: "Como você prefere medir seu sucesso profissional?",
      options: [
        { value: "metrics", label: "Métricas quantitativas e KPIs" },
        { value: "impact", label: "Impacto qualitativo e transformação" },
        { value: "growth", label: "Crescimento pessoal e desenvolvimento" },
        { value: "recognition", label: "Reconhecimento e premiações" }
      ]
    },
    {
      id: 40,
      question: "Qual tipo de diversidade você mais valoriza no trabalho?",
      options: [
        { value: "cultural", label: "Diversidade cultural e étnica" },
        { value: "cognitive", label: "Diversidade cognitiva e de pensamento" },
        { value: "experience", label: "Diversidade de experiências e backgrounds" },
        { value: "skill", label: "Diversidade de habilidades e competências" }
      ]
    },
    {
      id: 41,
      question: "Como você prefere receber novos projetos?",
      options: [
        { value: "detailed", label: "Briefing detalhado com especificações claras" },
        { value: "objective", label: "Objetivo geral com liberdade de execução" },
        { value: "collaborative", label: "Desenvolvimento colaborativo do escopo" },
        { value: "iterative", label: "Abordagem iterativa com feedback contínuo" }
      ]
    },
    {
      id: 42,
      question: "Qual tipo de mentoria você mais valoriza?",
      options: [
        { value: "technical", label: "Mentoria técnica e especializada" },
        { value: "career", label: "Orientação de carreira e desenvolvimento" },
        { value: "leadership", label: "Desenvolvimento de liderança" },
        { value: "personal", label: "Crescimento pessoal e soft skills" }
      ]
    },
    {
      id: 43,
      question: "Como você lida com a incerteza no trabalho?",
      options: [
        { value: "research", label: "Pesquiso e busco informações para reduzir incerteza" },
        { value: "adapt", label: "Adapto-me rapidamente às mudanças" },
        { value: "plan", label: "Crio múltiplos cenários e planos de contingência" },
        { value: "embrace", label: "Abraço a incerteza como oportunidade" }
      ]
    },
    {
      id: 44,
      question: "Qual tipo de projeto de longo prazo mais te atrai?",
      options: [
        { value: "research", label: "Projetos de pesquisa e desenvolvimento" },
        { value: "transformation", label: "Transformação organizacional" },
        { value: "product", label: "Desenvolvimento de produtos inovadores" },
        { value: "social", label: "Iniciativas de impacto social" }
      ]
    },
    {
      id: 45,
      question: "Como você prefere equilibrar vida pessoal e profissional?",
      options: [
        { value: "separation", label: "Separação clara entre vida pessoal e trabalho" },
        { value: "integration", label: "Integração harmoniosa de ambas" },
        { value: "flexibility", label: "Flexibilidade para ajustar conforme necessário" },
        { value: "seasons", label: "Períodos de maior foco em uma ou outra" }
      ]
    },
    {
      id: 46,
      question: "Qual aspecto da globalização mais impacta seu trabalho ideal?",
      options: [
        { value: "collaboration", label: "Colaboração com equipes globais" },
        { value: "markets", label: "Acesso a mercados internacionais" },
        { value: "diversity", label: "Diversidade cultural e de perspectivas" },
        { value: "challenges", label: "Desafios globais complexos" }
      ]
    },
    {
      id: 47,
      question: "Como você aborda o desenvolvimento de novas competências?",
      options: [
        { value: "formal", label: "Educação formal e certificações" },
        { value: "practical", label: "Prática e experiência hands-on" },
        { value: "network", label: "Aprendizado através de networking" },
        { value: "self_directed", label: "Autodidático e autodirigido" }
      ]
    },
    {
      id: 48,
      question: "Qual tipo de reconhecimento da comunidade você mais valoriza?",
      options: [
        { value: "professional", label: "Reconhecimento profissional e técnico" },
        { value: "social", label: "Reconhecimento por contribuições sociais" },
        { value: "innovation", label: "Reconhecimento por inovação" },
        { value: "mentorship", label: "Reconhecimento por desenvolver outros" }
      ]
    },
    {
      id: 49,
      question: "Como você enxerga o papel da inteligência artificial no seu trabalho ideal?",
      options: [
        { value: "tool", label: "Como ferramenta para aumentar produtividade" },
        { value: "collaborator", label: "Como colaborador para potencializar capacidades" },
        { value: "enabler", label: "Como habilitador de novas possibilidades" },
        { value: "minimal", label: "Papel mínimo, prefiro trabalho mais humano" }
      ]
    },
    {
      id: 50,
      question: "Qual legado profissional você gostaria de deixar?",
      options: [
        { value: "innovation", label: "Inovações que transformaram o setor" },
        { value: "people", label: "Pessoas desenvolvidas e inspiradas" },
        { value: "organization", label: "Organizações mais eficazes e humanas" },
        { value: "society", label: "Contribuições significativas para a sociedade" }
      ]
    }
  ];

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate results and navigate to results page
      navigate('/tests/vocational/results', { state: { answers } });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentAnswer = answers[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <h1 className="text-xl font-bold text-gray-900">Teste Vocacional</h1>
              <TestHelpButton testId="vocational" />
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {currentQuestion + 1} de {questions.length}
              </span>
              <div className="w-32">
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <div className="text-center mb-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 mb-4">
                Questão {currentQuestion + 1} de {questions.length}
              </div>
            </div>
            <CardTitle className="text-2xl text-center text-gray-900 leading-relaxed">
              {questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="pt-6">
            <RadioGroup 
              value={currentAnswer || ""} 
              onValueChange={handleAnswerChange}
              className="space-y-4"
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div key={option.value} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                  <RadioGroupItem 
                    value={option.value} 
                    id={option.value} 
                    className="mt-0.5"
                  />
                  <Label 
                    htmlFor={option.value} 
                    className="flex-1 text-gray-700 leading-relaxed cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Anterior
              </Button>

              <div className="text-center">
                <Progress value={progress} className="w-48 h-2 mx-auto mb-2" />
                <span className="text-sm text-gray-500">
                  {Math.round(progress)}% completo
                </span>
              </div>

              <Button
                onClick={handleNext}
                disabled={!currentAnswer}
                className="flex items-center bg-blue-600 hover:bg-blue-700"
              >
                {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Próxima'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VocationalTest;
