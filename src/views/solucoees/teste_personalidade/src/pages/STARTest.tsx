
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import TestHelpButton from '@/components/TestHelpButton';

const STARTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // S=Situação, T=Tarefa, A=Ação, R=Resultado — cada resposta mapeia para uma competência STAR
  // Avalia: Liderança(L), Comunicação(C), Resolução de Problemas(R), Trabalho em Equipe(E), Adaptabilidade(A)
  const questions = [
    {
      id: 1,
      question: "Ao enfrentar uma situação difícil no trabalho, como você geralmente começa?",
      options: [
        { value: "S5", label: "Analiso o contexto completo antes de qualquer ação" },
        { value: "S4", label: "Identifico os pontos principais do problema" },
        { value: "S3", label: "Peço ao meu gestor para esclarecer a situação" },
        { value: "S2", label: "Reajo instintivamente e ajusto depois" }
      ]
    },
    {
      id: 2,
      question: "Como você define seu papel quando recebe uma nova responsabilidade?",
      options: [
        { value: "T5", label: "Delimito claramente o que é esperado de mim e defino metas" },
        { value: "T4", label: "Converso com stakeholders para alinhar expectativas" },
        { value: "T3", label: "Sigo as instruções que recebo sem questionar muito" },
        { value: "T2", label: "Começo a trabalhar e vou definindo pelo caminho" }
      ]
    },
    {
      id: 3,
      question: "Quando precisa liderar um projeto, qual sua primeira ação?",
      options: [
        { value: "A5_L", label: "Defino um plano de ação claro com papéis e prazos" },
        { value: "A4_L", label: "Reúno a equipe para definir prioridades juntos" },
        { value: "A3_L", label: "Delego tarefas e acompanho o progresso" },
        { value: "A2_L", label: "Começo fazendo as tarefas mais urgentes eu mesmo" }
      ]
    },
    {
      id: 4,
      question: "Como você comunica resultados para sua liderança?",
      options: [
        { value: "R5", label: "Apresento dados quantificáveis e o impacto das ações" },
        { value: "R4", label: "Faço um relatório com antes/depois e lições aprendidas" },
        { value: "R3", label: "Informo que a tarefa foi concluída com sucesso" },
        { value: "R2", label: "Espero ser perguntado sobre os resultados" }
      ]
    },
    {
      id: 5,
      question: "Quando acontece um conflito entre colegas, como você age?",
      options: [
        { value: "A5_C", label: "Ouço ambos os lados, identifico a raiz do problema e proponho soluções" },
        { value: "A4_C", label: "Facilito uma conversa produtiva entre as partes" },
        { value: "A3_C", label: "Sugiro que busquem o RH ou gestor" },
        { value: "A2_C", label: "Prefiro não me envolver em conflitos alheios" }
      ]
    },
    {
      id: 6,
      question: "Como você se prepara para uma entrevista ou apresentação importante?",
      options: [
        { value: "S5", label: "Pesquiso o contexto, preparo exemplos STAR e pratico" },
        { value: "S4", label: "Organizo meus principais pontos e reviso" },
        { value: "S3", label: "Reviso o básico rapidamente" },
        { value: "S2", label: "Confio na minha capacidade de improvisar" }
      ]
    },
    {
      id: 7,
      question: "Diante de um problema complexo sem solução óbvia, você:",
      options: [
        { value: "A5_R", label: "Analiso de múltiplos ângulos, testo hipóteses e busco dados" },
        { value: "A4_R", label: "Divido o problema em partes menores e ataco uma de cada vez" },
        { value: "A3_R", label: "Busco soluções que funcionaram em situações similares" },
        { value: "A2_R", label: "Tento a primeira ideia que vem à mente" }
      ]
    },
    {
      id: 8,
      question: "Como você contribui em trabalhos em equipe?",
      options: [
        { value: "A5_E", label: "Identifico as forças de cada membro e distribuo tarefas adequadamente" },
        { value: "A4_E", label: "Colaboro ativamente e apoio quem precisa" },
        { value: "A3_E", label: "Faço minha parte conforme definido" },
        { value: "A2_E", label: "Prefiro trabalhar na minha parte independentemente" }
      ]
    },
    {
      id: 9,
      question: "Quando o plano inicial falha, como você reage?",
      options: [
        { value: "A5_A", label: "Reavalio rapidamente, ajusto a estratégia e comunico a mudança" },
        { value: "A4_A", label: "Busco alternativas viáveis mantendo o objetivo principal" },
        { value: "A3_A", label: "Consulto meu gestor sobre como proceder" },
        { value: "A2_A", label: "Fico frustrado mas busco uma saída" }
      ]
    },
    {
      id: 10,
      question: "Como você mede o sucesso de suas ações?",
      options: [
        { value: "R5", label: "Defino KPIs claros desde o início e acompanho métricas" },
        { value: "R4", label: "Comparo o resultado final com o objetivo inicial" },
        { value: "R3", label: "Verifico se a tarefa foi concluída corretamente" },
        { value: "R2", label: "Me baseio no feedback que recebo" }
      ]
    },
    {
      id: 11,
      question: "Quando precisa dar feedback negativo a alguém, como faz?",
      options: [
        { value: "A5_C", label: "Contextualizo a situação, descrevo o comportamento específico e sugiro melhorias" },
        { value: "A4_C", label: "Sou honesto mas gentil, focando no comportamento, não na pessoa" },
        { value: "A3_C", label: "Dou o feedback de forma geral, sem entrar em detalhes" },
        { value: "A2_C", label: "Evito dar feedback negativo para não criar conflito" }
      ]
    },
    {
      id: 12,
      question: "Como você lida com múltiplas prioridades simultâneas?",
      options: [
        { value: "T5", label: "Priorizo por impacto e urgência usando uma matriz clara" },
        { value: "T4", label: "Organizo uma lista e ataco as mais importantes primeiro" },
        { value: "T3", label: "Tento fazer tudo ao mesmo tempo" },
        { value: "T2", label: "Faço o que aparece pela frente" }
      ]
    },
    {
      id: 13,
      question: "Ao assumir um projeto que herdou problemas, você:",
      options: [
        { value: "S5", label: "Faço um diagnóstico completo da situação atual antes de agir" },
        { value: "S4", label: "Identifico os problemas mais críticos primeiro" },
        { value: "S3", label: "Sigo com o que já existe e ajusto pontualmente" },
        { value: "S2", label: "Recomeço tudo do zero" }
      ]
    },
    {
      id: 14,
      question: "Quando alcança um resultado significativo, como registra?",
      options: [
        { value: "R5", label: "Documento com dados, métricas e aprendizados para referência futura" },
        { value: "R4", label: "Compartilho com a equipe e celebro os resultados" },
        { value: "R3", label: "Adiciono ao meu currículo ou portfólio" },
        { value: "R2", label: "Sigo para o próximo desafio sem registrar" }
      ]
    },
    {
      id: 15,
      question: "Como você demonstra iniciativa no trabalho?",
      options: [
        { value: "A5_L", label: "Identifico oportunidades de melhoria e proponho projetos com plano de ação" },
        { value: "A4_L", label: "Sugiro ideias para meu gestor quando identifico algo" },
        { value: "A3_L", label: "Faço além do esperado quando tenho tempo" },
        { value: "A2_L", label: "Foco nas minhas responsabilidades definidas" }
      ]
    },
    {
      id: 16,
      question: "Ao trabalhar com pessoas difíceis, você:",
      options: [
        { value: "A5_E", label: "Busco entender perspectivas, adapto minha comunicação e foco no objetivo" },
        { value: "A4_E", label: "Mantenho profissionalismo e foco no resultado" },
        { value: "A3_E", label: "Limito a interação ao estritamente necessário" },
        { value: "A2_E", label: "Evito interação o máximo possível" }
      ]
    },
    {
      id: 17,
      question: "Como você se adapta a novas tecnologias ou processos?",
      options: [
        { value: "A5_A", label: "Estudo proativamente, pratico e ajudo outros na transição" },
        { value: "A4_A", label: "Aprendo rápido e me adapto sem resistência" },
        { value: "A3_A", label: "Sigo o treinamento oferecido pela empresa" },
        { value: "A2_A", label: "Demoro para me adaptar e prefiro métodos antigos" }
      ]
    },
    {
      id: 18,
      question: "Quando você comete um erro no trabalho, como procede?",
      options: [
        { value: "A5_R", label: "Assumo, analiso a causa, corrijo e implemento prevenção" },
        { value: "A4_R", label: "Assumo e corrijo o mais rápido possível" },
        { value: "A3_R", label: "Corrijo silenciosamente e sigo em frente" },
        { value: "A2_R", label: "Fico nervoso e demoro para reagir" }
      ]
    },
    {
      id: 19,
      question: "Como você documenta as tarefas que precisa realizar?",
      options: [
        { value: "T5", label: "Uso ferramentas de gestão com subtarefas, prazos e prioridades" },
        { value: "T4", label: "Mantenho uma lista organizada por prioridade" },
        { value: "T3", label: "Anoto em um caderno ou sticky notes" },
        { value: "T2", label: "Confio na memória e faço conforme lembro" }
      ]
    },
    {
      id: 20,
      question: "Quando precisa resolver algo urgente e importante ao mesmo tempo, você:",
      options: [
        { value: "A5_R", label: "Analiso impacto de cada um, delego o que posso e foco no mais crítico" },
        { value: "A4_R", label: "Priorizo o importante e peço ajuda para o urgente" },
        { value: "A3_R", label: "Faço o urgente primeiro e depois o importante" },
        { value: "A2_R", label: "Fico sobrecarregado e faço o que conseguir" }
      ]
    },
    {
      id: 21,
      question: "Como você constrói relacionamentos profissionais?",
      options: [
        { value: "A5_C", label: "Invisto tempo, demonstro interesse genuíno e mantenho contato regular" },
        { value: "A4_C", label: "Sou cordial e busco oportunidades de colaboração" },
        { value: "A3_C", label: "Mantenho relações formais e respeitosas" },
        { value: "A2_C", label: "Foco no trabalho, relacionamentos são secundários" }
      ]
    },
    {
      id: 22,
      question: "Diante de uma meta aparentemente impossível, você:",
      options: [
        { value: "A5_L", label: "Divido em marcos menores, crio estratégia e mobilizo recursos" },
        { value: "A4_L", label: "Busco alternativas criativas para alcançar" },
        { value: "A3_L", label: "Faço meu melhor dentro do possível" },
        { value: "A2_L", label: "Questiono se a meta é realista" }
      ]
    },
    {
      id: 23,
      question: "Como você lida com ambiguidade nas instruções?",
      options: [
        { value: "S5", label: "Busco clarificar com perguntas específicas e documento o alinhamento" },
        { value: "S4", label: "Interpreto o melhor possível e confirmo meu entendimento" },
        { value: "S3", label: "Peço para alguém explicar de novo" },
        { value: "S2", label: "Faço como acho que é certo e espero feedback" }
      ]
    },
    {
      id: 24,
      question: "Quando projetos sob sua responsabilidade apresentam atraso, você:",
      options: [
        { value: "A5_A", label: "Comunico proativamente, apresento causas e novo cronograma viável" },
        { value: "A4_A", label: "Reorganizo prioridades e acelero o que for possível" },
        { value: "A3_A", label: "Aviso o gestor e peço orientação" },
        { value: "A2_A", label: "Espero que ninguém perceba e trabalho mais rápido" }
      ]
    },
    {
      id: 25,
      question: "Ao final de um projeto, você costuma:",
      options: [
        { value: "R5", label: "Fazer retrospectiva completa: resultados, métricas, aprendizados e melhorias" },
        { value: "R4", label: "Documentar o que funcionou e o que não funcionou" },
        { value: "R3", label: "Fazer um breve resumo dos resultados" },
        { value: "R2", label: "Seguir para o próximo projeto imediatamente" }
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
      navigate('/tests/star/results', { state: { answers } });
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate('/ferramentas')} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Técnica STAR</h1>
              <TestHelpButton testId="star" />
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
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800 mb-4">
                Situação {currentQuestion + 1} de {questions.length}
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
              <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                <ArrowLeft className="h-4 w-4 mr-2" /> Anterior
              </Button>
              <div className="text-center">
                <Progress value={progress} className="w-48 h-2 mx-auto mb-2" />
                <span className="text-sm text-gray-500">{Math.round(progress)}% completo</span>
              </div>
              <Button onClick={handleNext} disabled={!currentAnswer} className="bg-amber-600 hover:bg-amber-700">
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

export default STARTest;
