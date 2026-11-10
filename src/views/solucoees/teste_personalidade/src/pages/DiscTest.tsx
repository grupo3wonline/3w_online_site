
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import TestHelpButton from '@/components/TestHelpButton';

const DiscTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      id: 1,
      question: "Em uma reunião de trabalho, você normalmente:",
      options: [
        { value: "D", label: "Toma a liderança e dirige a discussão" },
        { value: "I", label: "Mantém o clima animado e todos envolvidos" },
        { value: "S", label: "Ouve atentamente e apoia as ideias dos outros" },
        { value: "C", label: "Analisa cuidadosamente os dados apresentados" }
      ]
    },
    {
      id: 2,
      question: "Quando enfrenta um prazo apertado, você:",
      options: [
        { value: "D", label: "Age rapidamente e toma decisões firmes" },
        { value: "I", label: "Mobiliza a equipe com entusiasmo" },
        { value: "S", label: "Trabalha de forma consistente e metódica" },
        { value: "C", label: "Planeja cuidadosamente cada etapa" }
      ]
    },
    {
      id: 3,
      question: "Seu ambiente de trabalho ideal seria:",
      options: [
        { value: "D", label: "Dinâmico, com desafios constantes" },
        { value: "I", label: "Colaborativo e socialmente estimulante" },
        { value: "S", label: "Estável e harmonioso" },
        { value: "C", label: "Organizado e com procedimentos claros" }
      ]
    },
    {
      id: 4,
      question: "Ao resolver conflitos, você tende a:",
      options: [
        { value: "D", label: "Enfrentar diretamente e buscar soluções rápidas" },
        { value: "I", label: "Usar diplomacia e carisma para mediar" },
        { value: "S", label: "Buscar compromissos que agradem a todos" },
        { value: "C", label: "Analisar os fatos antes de tomar partido" }
      ]
    },
    {
      id: 5,
      question: "Como você prefere receber feedback?",
      options: [
        { value: "D", label: "Direto ao ponto, focado em resultados" },
        { value: "I", label: "De forma positiva e em ambiente descontraído" },
        { value: "S", label: "Com gentileza e de forma privada" },
        { value: "C", label: "Com dados específicos e exemplos detalhados" }
      ]
    },
    {
      id: 6,
      question: "Em projetos de equipe, você normalmente:",
      options: [
        { value: "D", label: "Assume o controle e delega tarefas" },
        { value: "I", label: "Motiva o time e gera ideias criativas" },
        { value: "S", label: "Apoia os colegas e mantém a harmonia" },
        { value: "C", label: "Foca na qualidade e nos detalhes" }
      ]
    },
    {
      id: 7,
      question: "Ao tomar decisões importantes, você:",
      options: [
        { value: "D", label: "Decide rapidamente baseado na intuição" },
        { value: "I", label: "Consulta outros e busca consenso" },
        { value: "S", label: "Considera como afetará as pessoas" },
        { value: "C", label: "Analisa todas as informações disponíveis" }
      ]
    },
    {
      id: 8,
      question: "Sua maior motivação no trabalho é:",
      options: [
        { value: "D", label: "Alcançar resultados e superar desafios" },
        { value: "I", label: "Ter reconhecimento e relacionamentos positivos" },
        { value: "S", label: "Contribuir para o bem-estar da equipe" },
        { value: "C", label: "Produzir trabalho de alta qualidade" }
      ]
    },
    {
      id: 9,
      question: "Como você lida com mudanças organizacionais?",
      options: [
        { value: "D", label: "Abraça mudanças como oportunidades" },
        { value: "I", label: "Ajuda outros a se adaptarem positivamente" },
        { value: "S", label: "Precisa de tempo para se ajustar" },
        { value: "C", label: "Analisa os impactos antes de aceitar" }
      ]
    },
    {
      id: 10,
      question: "Em apresentações, você:",
      options: [
        { value: "D", label: "É assertivo e vai direto ao ponto" },
        { value: "I", label: "É expressivo e envolve a audiência" },
        { value: "S", label: "É modesto e prefere apoiar outros" },
        { value: "C", label: "É detalhista e bem preparado" }
      ]
    },
    {
      id: 11,
      question: "O que mais te frustra no trabalho?",
      options: [
        { value: "D", label: "Processos lentos e burocracia" },
        { value: "I", label: "Ambiente negativo e falta de interação" },
        { value: "S", label: "Conflitos constantes e pressão excessiva" },
        { value: "C", label: "Falta de informações e padrões confusos" }
      ]
    },
    {
      id: 12,
      question: "Como você constrói relacionamentos profissionais?",
      options: [
        { value: "D", label: "Através de resultados e competência" },
        { value: "I", label: "Sendo amigável e criando conexões pessoais" },
        { value: "S", label: "Sendo confiável e prestativo" },
        { value: "C", label: "Demonstrando conhecimento e profissionalismo" }
      ]
    },
    {
      id: 13,
      question: "Sua abordagem para aprender algo novo é:",
      options: [
        { value: "D", label: "Ir direto à prática e aprender fazendo" },
        { value: "I", label: "Discutir e compartilhar ideias com outros" },
        { value: "S", label: "Observar primeiro, depois praticar gradualmente" },
        { value: "C", label: "Estudar teoricamente antes de aplicar" }
      ]
    },
    {
      id: 14,
      question: "Em situações de estresse, você:",
      options: [
        { value: "D", label: "Fica mais impaciente e direto" },
        { value: "I", label: "Busca apoio social e distração" },
        { value: "S", label: "Se retrai e evita confrontos" },
        { value: "C", label: "Foca ainda mais nos detalhes" }
      ]
    },
    {
      id: 15,
      question: "Como você prefere ser reconhecido?",
      options: [
        { value: "D", label: "Por alcançar objetivos difíceis" },
        { value: "I", label: "Por inspirar e motivar outros" },
        { value: "S", label: "Por ser confiável e colaborativo" },
        { value: "C", label: "Por produzir trabalho preciso e de qualidade" }
      ]
    },
    {
      id: 16,
      question: "Ao liderar uma equipe, você:",
      options: [
        { value: "D", label: "Define metas claras e cobra resultados" },
        { value: "I", label: "Inspira e motiva através do entusiasmo" },
        { value: "S", label: "Apoia e desenvolve cada membro" },
        { value: "C", label: "Estabelece processos e padrões claros" }
      ]
    },
    {
      id: 17,
      question: "Sua comunicação no trabalho é:",
      options: [
        { value: "D", label: "Direta, concisa e focada em resultados" },
        { value: "I", label: "Expressiva, animada e persuasiva" },
        { value: "S", label: "Calma, gentil e diplomática" },
        { value: "C", label: "Precisa, factual e bem estruturada" }
      ]
    },
    {
      id: 18,
      question: "Como você se comporta em networking?",
      options: [
        { value: "D", label: "Foco em conexões que geram oportunidades" },
        { value: "I", label: "Gosto de conhecer pessoas e criar amizades" },
        { value: "S", label: "Prefiro conversas mais profundas e privadas" },
        { value: "C", label: "Valorizo discussões técnicas e especializadas" }
      ]
    },
    {
      id: 19,
      question: "Ao enfrentar críticas, você:",
      options: [
        { value: "D", label: "Defende seu ponto de vista assertivamente" },
        { value: "I", label: "Tenta manter o relacionamento positivo" },
        { value: "S", label: "Aceita pacificamente mas fica magoado" },
        { value: "C", label: "Analisa se a crítica tem fundamento" }
      ]
    },
    {
      id: 20,
      question: "Qual frase melhor descreve você?",
      options: [
        { value: "D", label: "Eu faço as coisas acontecerem" },
        { value: "I", label: "Eu inspiro e conecto pessoas" },
        { value: "S", label: "Eu apoio e mantenho a estabilidade" },
        { value: "C", label: "Eu garanto a qualidade e precisão" }
      ]
    },
    {
      id: 21,
      question: "Como você se comporta em situações de incerteza?",
      options: [
        { value: "D", label: "Tomo decisões rapidamente para avançar" },
        { value: "I", label: "Mantenho otimismo e busco soluções criativas" },
        { value: "S", label: "Prefiro aguardar mais informações" },
        { value: "C", label: "Analiso todos os cenários possíveis" }
      ]
    },
    {
      id: 22,
      question: "Qual tipo de ambiente de trabalho você evitaria?",
      options: [
        { value: "D", label: "Ambientes com muita microgestão" },
        { value: "I", label: "Locais isolados sem interação social" },
        { value: "S", label: "Ambientes com mudanças constantes" },
        { value: "C", label: "Lugares sem padrões ou procedimentos claros" }
      ]
    },
    {
      id: 23,
      question: "Como você prefere ser motivado?",
      options: [
        { value: "D", label: "Através de desafios e metas ambiciosas" },
        { value: "I", label: "Com reconhecimento público e interação" },
        { value: "S", label: "Por meio de estabilidade e harmonia" },
        { value: "C", label: "Com padrões de excelência claros" }
      ]
    },
    {
      id: 24,
      question: "Sua atitude em relação a detalhes é:",
      options: [
        { value: "C", label: "Foco intensamente nos detalhes importantes" },
        { value: "D", label: "Prefiro o panorama geral aos detalhes" },
        { value: "S", label: "Presto atenção aos detalhes que afetam outros" },
        { value: "I", label: "Detalhes podem ser chatos, prefiro ideias gerais" }
      ]
    },
    {
      id: 25,
      question: "Como você age quando precisa influenciar alguém?",
      options: [
        { value: "I", label: "Uso carisma e entusiasmo" },
        { value: "D", label: "Apresento argumentos diretos e convincentes" },
        { value: "S", label: "Construo relacionamento e confiança primeiro" },
        { value: "C", label: "Uso dados e evidências factual" }
      ]
    },
    {
      id: 26,
      question: "Qual seu maior receio profissional?",
      options: [
        { value: "D", label: "Perder controle ou autoridade" },
        { value: "I", label: "Ser rejeitado ou ignorado" },
        { value: "S", label: "Criar conflitos ou instabilidade" },
        { value: "C", label: "Cometer erros ou falhas" }
      ]
    },
    {
      id: 27,
      question: "Como você lida com deadlines apertados?",
      options: [
        { value: "D", label: "Acelero o ritmo e tomo decisões rápidas" },
        { value: "I", label: "Mobilizo a equipe com energia positiva" },
        { value: "S", label: "Trabalho consistentemente sem entrar em pânico" },
        { value: "C", label: "Priorizo tarefas e foco na qualidade essencial" }
      ]
    },
    {
      id: 28,
      question: "Seu estilo de comunicação por email é:",
      options: [
        { value: "D", label: "Direto, conciso e orientado a ação" },
        { value: "I", label: "Amigável, expressivo e pessoal" },
        { value: "S", label: "Gentil, diplomático e considerado" },
        { value: "C", label: "Detalhado, estruturado e preciso" }
      ]
    },
    {
      id: 29,
      question: "Como você se sente sobre mudanças tecnológicas?",
      options: [
        { value: "D", label: "Adoto rapidamente se trouxer vantagens" },
        { value: "I", label: "Gosto quando facilita conexões com pessoas" },
        { value: "S", label: "Preciso de tempo para me adaptar" },
        { value: "C", label: "Avalio cuidadosamente antes de implementar" }
      ]
    },
    {
      id: 30,
      question: "O que mais valoriza em uma equipe de trabalho?",
      options: [
        { value: "D", label: "Resultados e eficiência" },
        { value: "I", label: "Colaboração e sinergia" },
        { value: "S", label: "Harmonia e apoio mútuo" },
        { value: "C", label: "Competência e qualidade" }
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
      navigate('/tests/disc/results', { state: { answers } });
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
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
              <h1 className="text-xl font-bold text-gray-900">Avaliação DISC</h1>
              <TestHelpButton testId="disc" />
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
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800 mb-4">
                Situação {currentQuestion + 1} de {questions.length}
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
              {questions[currentQuestion].options.map((option) => (
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
                className="flex items-center bg-purple-600 hover:bg-purple-700"
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

export default DiscTest;
