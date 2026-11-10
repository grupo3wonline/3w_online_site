
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import TestHelpButton from '@/components/TestHelpButton';

const ProfilerTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // E=Executor, C=Comunicador, P=Planejador, A=Analista
  const questions = [
    {
      id: 1,
      question: "Ao receber uma nova tarefa, sua primeira reação é:",
      options: [
        { value: "E", label: "Começar a fazer imediatamente" },
        { value: "C", label: "Conversar com alguém sobre a tarefa" },
        { value: "P", label: "Criar um plano detalhado antes de agir" },
        { value: "A", label: "Pesquisar e analisar dados relevantes" }
      ]
    },
    {
      id: 2,
      question: "Em qual dessas situações você se sente mais confortável?",
      options: [
        { value: "E", label: "Gerenciando múltiplas tarefas com urgência" },
        { value: "C", label: "Apresentando ideias para um grupo" },
        { value: "P", label: "Organizando processos e fluxos de trabalho" },
        { value: "A", label: "Analisando relatórios e dados complexos" }
      ]
    },
    {
      id: 3,
      question: "Qual sua maior contribuição para uma equipe?",
      options: [
        { value: "E", label: "Fazer as coisas acontecerem e entregar resultados" },
        { value: "C", label: "Manter o time motivado e conectado" },
        { value: "P", label: "Organizar e planejar as etapas do projeto" },
        { value: "A", label: "Garantir a qualidade e precisão do trabalho" }
      ]
    },
    {
      id: 4,
      question: "Quando surge um problema, você geralmente:",
      options: [
        { value: "E", label: "Age rapidamente para resolver" },
        { value: "C", label: "Discute o problema com a equipe" },
        { value: "P", label: "Busca uma solução sistemática e planejada" },
        { value: "A", label: "Investiga a causa raiz do problema" }
      ]
    },
    {
      id: 5,
      question: "Qual é seu principal defeito profissional?",
      options: [
        { value: "E", label: "Ser impaciente com demoras" },
        { value: "C", label: "Falar demais em reuniões" },
        { value: "P", label: "Ser resistente a mudanças de plano" },
        { value: "A", label: "Ser perfeccionista ao extremo" }
      ]
    },
    {
      id: 6,
      question: "Qual tipo de meta te motiva mais?",
      options: [
        { value: "E", label: "Metas agressivas e de curto prazo" },
        { value: "C", label: "Metas que envolvem trabalho em equipe" },
        { value: "P", label: "Metas estruturadas com marcos claros" },
        { value: "A", label: "Metas que exigem análise e pesquisa" }
      ]
    },
    {
      id: 7,
      question: "Como você prefere aprender algo novo?",
      options: [
        { value: "E", label: "Praticando e aprendendo na ação" },
        { value: "C", label: "Em grupo, discutindo e trocando ideias" },
        { value: "P", label: "Seguindo um tutorial passo a passo" },
        { value: "A", label: "Estudando a teoria profundamente" }
      ]
    },
    {
      id: 8,
      question: "Sua mesa de trabalho está geralmente:",
      options: [
        { value: "E", label: "Funcional — o que importa é produzir" },
        { value: "C", label: "Com fotos de pessoas e lembranças sociais" },
        { value: "P", label: "Organizada e tudo no lugar" },
        { value: "A", label: "Com livros, referências e material de pesquisa" }
      ]
    },
    {
      id: 9,
      question: "Em um conflito de equipe, seu papel natural é:",
      options: [
        { value: "E", label: "Resolver rápido e seguir em frente" },
        { value: "C", label: "Mediar e buscar harmonia" },
        { value: "P", label: "Propor um processo justo de resolução" },
        { value: "A", label: "Avaliar os fatos objetivamente" }
      ]
    },
    {
      id: 10,
      question: "Quando elogiado, o que mais te agrada ouvir?",
      options: [
        { value: "E", label: "Você é muito eficiente e produtivo" },
        { value: "C", label: "Você é incrível de se trabalhar" },
        { value: "P", label: "Você é muito organizado e confiável" },
        { value: "A", label: "Seu trabalho é impecável e preciso" }
      ]
    },
    {
      id: 11,
      question: "Qual tipo de reunião você prefere?",
      options: [
        { value: "E", label: "Rápida, objetiva, com ações definidas" },
        { value: "C", label: "Dinâmica, com brainstorming e participação" },
        { value: "P", label: "Estruturada, com pauta e ata" },
        { value: "A", label: "Focada em dados, análises e evidências" }
      ]
    },
    {
      id: 12,
      question: "O que mais te incomoda no trabalho?",
      options: [
        { value: "E", label: "Reuniões longas e improdutivas" },
        { value: "C", label: "Trabalhar sozinho por longos períodos" },
        { value: "P", label: "Mudanças de última hora no planejamento" },
        { value: "A", label: "Decisões tomadas sem dados suficientes" }
      ]
    },
    {
      id: 13,
      question: "Como você se prepara para uma apresentação?",
      options: [
        { value: "E", label: "Preparo rapidamente e foco na mensagem principal" },
        { value: "C", label: "Penso em como engajar a audiência" },
        { value: "P", label: "Organizo cada slide com cuidado" },
        { value: "A", label: "Reúno dados e referências detalhadas" }
      ]
    },
    {
      id: 14,
      question: "Qual é a sua relação com prazos?",
      options: [
        { value: "E", label: "Entrego antes do prazo sempre que possível" },
        { value: "C", label: "Negocio prazos quando necessário" },
        { value: "P", label: "Planejo para cumprir exatamente no prazo" },
        { value: "A", label: "Prefiro mais tempo para garantir qualidade" }
      ]
    },
    {
      id: 15,
      question: "Como você se vê em 10 anos?",
      options: [
        { value: "E", label: "Liderando grandes projetos e operações" },
        { value: "C", label: "Conectando pessoas e influenciando positivamente" },
        { value: "P", label: "Gerenciando processos e sistemas eficientes" },
        { value: "A", label: "Sendo referência técnica na minha área" }
      ]
    },
    {
      id: 16,
      question: "Quando delega tarefas, você:",
      options: [
        { value: "E", label: "Dá autonomia total e cobra resultados" },
        { value: "C", label: "Explica o contexto e se disponibiliza" },
        { value: "P", label: "Define processos claros e acompanha" },
        { value: "A", label: "Dá instruções detalhadas e revisas" }
      ]
    },
    {
      id: 17,
      question: "O que mais impulsiona sua produtividade?",
      options: [
        { value: "E", label: "Desafios e pressão para entregar" },
        { value: "C", label: "Trabalhar com pessoas que gosto" },
        { value: "P", label: "Ambiente organizado e previsível" },
        { value: "A", label: "Acesso a informações e recursos" }
      ]
    },
    {
      id: 18,
      question: "Ao receber um e-mail longo, você:",
      options: [
        { value: "E", label: "Leio por cima e respondo o essencial" },
        { value: "C", label: "Ligo para a pessoa para conversar" },
        { value: "P", label: "Leio com calma e organizo minha resposta" },
        { value: "A", label: "Leio detalhadamente e verifico as informações" }
      ]
    },
    {
      id: 19,
      question: "Qual ferramenta você mais usaria?",
      options: [
        { value: "E", label: "Lista de tarefas com check rápido" },
        { value: "C", label: "Chat de equipe e videochamadas" },
        { value: "P", label: "Gantt, Kanban e gerenciador de projetos" },
        { value: "A", label: "Planilhas, dashboards e BI" }
      ]
    },
    {
      id: 20,
      question: "Qual frase combina mais com você?",
      options: [
        { value: "E", label: "Feito é melhor que perfeito" },
        { value: "C", label: "Pessoas são o mais importante" },
        { value: "P", label: "Um bom plano faz toda a diferença" },
        { value: "A", label: "Os dados não mentem" }
      ]
    },
    {
      id: 21,
      question: "Como você reage quando um projeto falha?",
      options: [
        { value: "E", label: "Foco no próximo desafio rapidamente" },
        { value: "C", label: "Apoio emocionalmente a equipe" },
        { value: "P", label: "Analiso o que deu errado no processo" },
        { value: "A", label: "Investigo cada ponto de falha detalhadamente" }
      ]
    },
    {
      id: 22,
      question: "Seu estilo de liderança é mais:",
      options: [
        { value: "E", label: "Direcionador — foco em resultados" },
        { value: "C", label: "Inspirador — foco em pessoas" },
        { value: "P", label: "Processual — foco em organização" },
        { value: "A", label: "Técnico — foco em qualidade" }
      ]
    },
    {
      id: 23,
      question: "Como você lida com feedback negativo?",
      options: [
        { value: "E", label: "Absorvo rápido e mudo o que for preciso" },
        { value: "C", label: "Fico sensível mas uso para melhorar relações" },
        { value: "P", label: "Avalio se devo ajustar meu plano" },
        { value: "A", label: "Questiono se o feedback tem base factual" }
      ]
    },
    {
      id: 24,
      question: "O que seus colegas dizem sobre você?",
      options: [
        { value: "E", label: "Que faço as coisas acontecerem" },
        { value: "C", label: "Que sou ótimo(a) para conversar" },
        { value: "P", label: "Que sou organizado(a) e confiável" },
        { value: "A", label: "Que sou muito competente tecnicamente" }
      ]
    },
    {
      id: 25,
      question: "Numa situação de crise, seu primeiro impulso é:",
      options: [
        { value: "E", label: "Agir imediatamente e resolver" },
        { value: "C", label: "Reunir a equipe e comunicar" },
        { value: "P", label: "Seguir o plano de contingência" },
        { value: "A", label: "Avaliar a situação com dados" }
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
      navigate('/tests/profiler/results', { state: { answers } });
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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate('/ferramentas')} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Teste Profiler</h1>
              <TestHelpButton testId="profiler" />
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{currentQuestion + 1} de {questions.length}</span>
              <div className="w-32"><Progress value={progress} className="h-2" /></div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <div className="text-center mb-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-teal-100 text-teal-800 mb-4">
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
                  <Label htmlFor={`opt-${idx}`} className="flex-1 text-gray-700 leading-relaxed cursor-pointer">{option.label}</Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0} className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" /> Anterior
              </Button>
              <div className="text-center">
                <Progress value={progress} className="w-48 h-2 mx-auto mb-2" />
                <span className="text-sm text-gray-500">{Math.round(progress)}% completo</span>
              </div>
              <Button onClick={handleNext} disabled={!currentAnswer} className="flex items-center bg-teal-600 hover:bg-teal-700">
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

export default ProfilerTest;
