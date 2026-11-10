
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import TestHelpButton from '@/components/TestHelpButton';

const AnimalProfileTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      id: 1,
      question: "Como você reage quando surge um problema urgente no trabalho?",
      options: [
        { value: "T", label: "Ajo imediatamente e resolvo com rapidez" },
        { value: "G", label: "Reúno a equipe e busco uma solução coletiva" },
        { value: "A", label: "Analiso o problema de forma ampla para encontrar a melhor estratégia" },
        { value: "L", label: "Sigo o procedimento e analiso os dados antes de agir" }
      ]
    },
    {
      id: 2,
      question: "Qual dessas frases melhor descreve seu estilo de liderança?",
      options: [
        { value: "T", label: "Lidero pelo exemplo, com foco em resultados rápidos" },
        { value: "G", label: "Inspiro e motivo as pessoas com entusiasmo" },
        { value: "A", label: "Defino a visão e oriento a equipe para o futuro" },
        { value: "L", label: "Organizo processos e garanto que todos cumpram suas funções" }
      ]
    },
    {
      id: 3,
      question: "Em um projeto de equipe, qual papel você naturalmente assume?",
      options: [
        { value: "T", label: "O líder que define prazos e cobra entregas" },
        { value: "G", label: "O mediador que mantém todos animados e conectados" },
        { value: "A", label: "O estrategista que planeja a visão geral" },
        { value: "L", label: "O organizador que estrutura tarefas e cronogramas" }
      ]
    },
    {
      id: 4,
      question: "Como você prefere se comunicar no ambiente de trabalho?",
      options: [
        { value: "T", label: "De forma direta e objetiva, sem rodeios" },
        { value: "G", label: "De forma calorosa, criando conexão pessoal" },
        { value: "A", label: "De forma visionária, compartilhando ideias amplas" },
        { value: "L", label: "De forma detalhada, com dados e fatos" }
      ]
    },
    {
      id: 5,
      question: "O que mais te motiva no trabalho?",
      options: [
        { value: "T", label: "Superar desafios e alcançar metas ambiciosas" },
        { value: "G", label: "Trabalhar com pessoas e criar um ambiente positivo" },
        { value: "A", label: "Criar soluções inovadoras e pensar no futuro" },
        { value: "L", label: "Fazer um trabalho bem-feito e organizado" }
      ]
    },
    {
      id: 6,
      question: "Quando você precisa tomar uma decisão importante, como procede?",
      options: [
        { value: "T", label: "Decido rapidamente confiando no meu instinto" },
        { value: "G", label: "Consulto pessoas para ouvir diferentes opiniões" },
        { value: "A", label: "Avalio o cenário completo antes de decidir" },
        { value: "L", label: "Coleto dados e faço uma análise criteriosa" }
      ]
    },
    {
      id: 7,
      question: "Qual é sua maior frustração profissional?",
      options: [
        { value: "T", label: "Processos lentos e falta de agilidade" },
        { value: "G", label: "Ambientes frios e sem interação humana" },
        { value: "A", label: "Falta de liberdade criativa e inovação" },
        { value: "L", label: "Desorganização e falta de planejamento" }
      ]
    },
    {
      id: 8,
      question: "Como você lida com conflitos na equipe?",
      options: [
        { value: "T", label: "Enfrento diretamente e busco solução rápida" },
        { value: "G", label: "Uso diplomacia e carisma para harmonizar" },
        { value: "A", label: "Busco entender a visão de cada um e proponho uma solução criativa" },
        { value: "L", label: "Analiso os fatos com imparcialidade antes de intervir" }
      ]
    },
    {
      id: 9,
      question: "Qual tipo de ambiente de trabalho você prefere?",
      options: [
        { value: "T", label: "Dinâmico, competitivo e com desafios constantes" },
        { value: "G", label: "Colaborativo, social e com boa energia" },
        { value: "A", label: "Criativo, flexível e aberto a novas ideias" },
        { value: "L", label: "Organizado, estável e com regras claras" }
      ]
    },
    {
      id: 10,
      question: "Como você reage a mudanças inesperadas?",
      options: [
        { value: "T", label: "Adapto-me rapidamente e vejo como oportunidade" },
        { value: "G", label: "Aceito bem e ajudo os outros a se adaptarem" },
        { value: "A", label: "Tento entender o contexto maior da mudança" },
        { value: "L", label: "Analiso os impactos antes de aceitar" }
      ]
    },
    {
      id: 11,
      question: "Qual seu ponto forte mais reconhecido?",
      options: [
        { value: "T", label: "Determinação e foco em resultados" },
        { value: "G", label: "Habilidade de comunicação e empatia" },
        { value: "A", label: "Visão estratégica e criatividade" },
        { value: "L", label: "Organização e atenção aos detalhes" }
      ]
    },
    {
      id: 12,
      question: "Quando você apresenta uma ideia, como faz?",
      options: [
        { value: "T", label: "Vou direto ao ponto e mostro o resultado esperado" },
        { value: "G", label: "Conto uma história envolvente que conecta as pessoas" },
        { value: "A", label: "Apresento a visão ampla e o potencial futuro" },
        { value: "L", label: "Mostro dados, gráficos e análises detalhadas" }
      ]
    },
    {
      id: 13,
      question: "O que você mais valoriza em um colega de trabalho?",
      options: [
        { value: "T", label: "Eficiência e comprometimento com resultados" },
        { value: "G", label: "Simpatia e capacidade de trabalhar em equipe" },
        { value: "A", label: "Criatividade e pensamento inovador" },
        { value: "L", label: "Responsabilidade e cumprimento de prazos" }
      ]
    },
    {
      id: 14,
      question: "Como você age sob pressão?",
      options: [
        { value: "T", label: "Fico mais focado e determinado" },
        { value: "G", label: "Busco apoio na equipe e mantenho o otimismo" },
        { value: "A", label: "Busco alternativas criativas para contornar a situação" },
        { value: "L", label: "Reviso o planejamento e priorizo tarefas" }
      ]
    },
    {
      id: 15,
      question: "Qual frase mais combina com você?",
      options: [
        { value: "T", label: "Tempo é dinheiro — vamos agir agora!" },
        { value: "G", label: "Juntos somos mais fortes!" },
        { value: "A", label: "Precisamos pensar grande e diferente!" },
        { value: "L", label: "Vamos analisar os dados antes de decidir." }
      ]
    },
    {
      id: 16,
      question: "Qual sua atitude frente a riscos?",
      options: [
        { value: "T", label: "Assumo riscos calculados sem hesitar" },
        { value: "G", label: "Prefiro riscos compartilhados com a equipe" },
        { value: "A", label: "Gosto de riscos que trazem inovação" },
        { value: "L", label: "Evito riscos sem informações suficientes" }
      ]
    },
    {
      id: 17,
      question: "Em reuniões, você costuma:",
      options: [
        { value: "T", label: "Ir direto ao assunto e propor ações" },
        { value: "G", label: "Animar o grupo e facilitar a interação" },
        { value: "A", label: "Trazer perspectivas diferenciadas e visão de futuro" },
        { value: "L", label: "Anotar tudo e organizar as informações" }
      ]
    },
    {
      id: 18,
      question: "Como você lida com tarefas repetitivas?",
      options: [
        { value: "T", label: "Delego para poder focar no que importa" },
        { value: "G", label: "Faço junto com alguém para tornar mais agradável" },
        { value: "A", label: "Tento encontrar formas de automatizar ou inovar" },
        { value: "L", label: "Executo com disciplina e consistência" }
      ]
    },
    {
      id: 19,
      question: "O que mais te incomoda em outras pessoas no trabalho?",
      options: [
        { value: "T", label: "Indecisão e falta de atitude" },
        { value: "G", label: "Frieza e falta de empatia" },
        { value: "A", label: "Pensamento limitado e resistência à inovação" },
        { value: "L", label: "Desorganização e falta de comprometimento" }
      ]
    },
    {
      id: 20,
      question: "Como você define sucesso profissional?",
      options: [
        { value: "T", label: "Alcançar metas e ter reconhecimento pelos resultados" },
        { value: "G", label: "Ter bons relacionamentos e fazer diferença na vida das pessoas" },
        { value: "A", label: "Criar algo inovador e deixar um legado" },
        { value: "L", label: "Ter estabilidade e fazer um trabalho de excelência" }
      ]
    },
    {
      id: 21,
      question: "Quando recebe um feedback negativo, você:",
      options: [
        { value: "T", label: "Aceito e uso para melhorar rapidamente" },
        { value: "G", label: "Fico sensível mas uso para crescer nos relacionamentos" },
        { value: "A", label: "Reflito sobre como isso afeta minha visão de futuro" },
        { value: "L", label: "Analiso se o feedback tem fundamentação lógica" }
      ]
    },
    {
      id: 22,
      question: "Qual seu estilo de planejamento?",
      options: [
        { value: "T", label: "Planejo o mínimo necessário e parto para ação" },
        { value: "G", label: "Planejo envolvendo as pessoas que vão participar" },
        { value: "A", label: "Planejo com foco na visão macro e estratégica" },
        { value: "L", label: "Planejo minuciosamente cada etapa e detalhe" }
      ]
    },
    {
      id: 23,
      question: "O que seus colegas diriam sobre você?",
      options: [
        { value: "T", label: "Que sou determinado(a) e faço as coisas acontecerem" },
        { value: "G", label: "Que sou uma pessoa agradável e fácil de trabalhar" },
        { value: "A", label: "Que tenho ideias brilhantes e visão de futuro" },
        { value: "L", label: "Que sou confiável e organizado(a)" }
      ]
    },
    {
      id: 24,
      question: "Como você se comporta em uma negociação?",
      options: [
        { value: "T", label: "Sou firme e busco o melhor resultado possível" },
        { value: "G", label: "Busco um acordo que satisfaça ambos os lados" },
        { value: "A", label: "Proponho soluções criativas que ninguém pensou" },
        { value: "L", label: "Apresento argumentos baseados em dados" }
      ]
    },
    {
      id: 25,
      question: "Qual atividade de lazer mais combina com você?",
      options: [
        { value: "T", label: "Esportes competitivos ou atividades radicais" },
        { value: "G", label: "Encontros sociais e eventos com amigos" },
        { value: "A", label: "Viagens para lugares diferentes e experiências novas" },
        { value: "L", label: "Leitura, jogos de estratégia ou atividades organizadas" }
      ]
    },
    {
      id: 26,
      question: "Como você gerencia seu tempo?",
      options: [
        { value: "T", label: "Priorizo o que dá mais resultado e elimino o resto" },
        { value: "G", label: "Reservo tempo para pessoas e relacionamentos" },
        { value: "A", label: "Mantenho flexibilidade para aproveitar oportunidades" },
        { value: "L", label: "Uso agenda, listas e ferramentas de organização" }
      ]
    },
    {
      id: 27,
      question: "O que mais te energiza?",
      options: [
        { value: "T", label: "Conquistar algo difícil e superar limites" },
        { value: "G", label: "Estar rodeado de pessoas e trocar experiências" },
        { value: "A", label: "Ter liberdade para criar e inovar" },
        { value: "L", label: "Completar tarefas com perfeição e ordem" }
      ]
    },
    {
      id: 28,
      question: "Quando alguém pede sua opinião, você:",
      options: [
        { value: "T", label: "Sou direto e digo exatamente o que penso" },
        { value: "G", label: "Dou minha opinião com cuidado para não magoar" },
        { value: "A", label: "Compartilho uma perspectiva ampla e diferente" },
        { value: "L", label: "Analiso os fatos antes de dar minha posição" }
      ]
    },
    {
      id: 29,
      question: "Qual tipo de reconhecimento mais te valoriza?",
      options: [
        { value: "T", label: "Promoções e resultados tangíveis" },
        { value: "G", label: "Elogios públicos e reconhecimento social" },
        { value: "A", label: "Ter minhas ideias implementadas e valorizadas" },
        { value: "L", label: "Ser reconhecido pela qualidade e precisão do trabalho" }
      ]
    },
    {
      id: 30,
      question: "Se pudesse escolher um superpoder, qual seria?",
      options: [
        { value: "T", label: "Super velocidade — para fazer tudo mais rápido" },
        { value: "G", label: "Telepatia — para entender melhor as pessoas" },
        { value: "A", label: "Voar — para ter liberdade e ver tudo do alto" },
        { value: "L", label: "Super inteligência — para analisar tudo perfeitamente" }
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
      navigate('/tests/animal-profile/results', { state: { answers } });
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate('/ferramentas')} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Perfil Animal Comportamental</h1>
              <TestHelpButton testId="animal-profile" />
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{currentQuestion + 1} de {questions.length}</span>
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
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800 mb-4">
                Pergunta {currentQuestion + 1} de {questions.length}
              </div>
            </div>
            <CardTitle className="text-2xl text-center text-gray-900 leading-relaxed">
              {questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <RadioGroup value={currentAnswer || ""} onValueChange={handleAnswerChange} className="space-y-4">
              {questions[currentQuestion].options.map((option, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value={option.value} id={`opt-${idx}`} className="mt-0.5" />
                  <Label htmlFor={`opt-${idx}`} className="flex-1 text-gray-700 leading-relaxed cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0} className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Anterior
              </Button>
              <div className="text-center">
                <Progress value={progress} className="w-48 h-2 mx-auto mb-2" />
                <span className="text-sm text-gray-500">{Math.round(progress)}% completo</span>
              </div>
              <Button onClick={handleNext} disabled={!currentAnswer} className="flex items-center bg-amber-600 hover:bg-amber-700">
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

export default AnimalProfileTest;
