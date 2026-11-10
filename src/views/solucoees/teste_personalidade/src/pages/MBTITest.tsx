
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import TestHelpButton from '@/components/TestHelpButton';

const MBTITest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // 28 questões: 7 por dimensão (E/I, S/N, T/F, J/P)
  const questions = [
    // E vs I (Extroversão vs Introversão)
    { id: 1, question: "Em uma festa, você geralmente:", options: [{ value: "E", label: "Interage com muitas pessoas, incluindo desconhecidos" }, { value: "I", label: "Conversa com poucas pessoas que já conhece" }] },
    { id: 2, question: "Você se sente mais energizado(a) quando:", options: [{ value: "E", label: "Está com um grupo de pessoas" }, { value: "I", label: "Tem tempo sozinho(a) para reflexão" }] },
    { id: 3, question: "No trabalho, você prefere:", options: [{ value: "E", label: "Espaços abertos e colaboração constante" }, { value: "I", label: "Um espaço privado para concentração" }] },
    { id: 4, question: "Ao resolver um problema, você tende a:", options: [{ value: "E", label: "Pensar em voz alta e discutir com outros" }, { value: "I", label: "Refletir internamente antes de falar" }] },
    { id: 5, question: "Seus amigos diriam que você é:", options: [{ value: "E", label: "Expansivo(a) e fácil de conhecer" }, { value: "I", label: "Reservado(a) mas profundo(a)" }] },
    { id: 6, question: "Em reuniões sociais, você:", options: [{ value: "E", label: "Fica até o final e adora a interação" }, { value: "I", label: "Participa mas precisa de tempo para recarregar depois" }] },
    { id: 7, question: "Quando precisa de inspiração, você:", options: [{ value: "E", label: "Busca conversar com pessoas e trocar ideias" }, { value: "I", label: "Prefere um momento de silêncio e introspecção" }] },

    // S vs N (Sensação vs Intuição)
    { id: 8, question: "Ao aprender algo novo, você prefere:", options: [{ value: "S", label: "Fatos concretos e exemplos práticos" }, { value: "N", label: "Conceitos e possibilidades teóricas" }] },
    { id: 9, question: "Você se descreve mais como:", options: [{ value: "S", label: "Uma pessoa prática e realista" }, { value: "N", label: "Uma pessoa imaginativa e visionária" }] },
    { id: 10, question: "Ao ler um livro ou ver um filme, você presta mais atenção:", options: [{ value: "S", label: "Nos detalhes e na sequência dos eventos" }, { value: "N", label: "Nos temas, simbolismos e significados mais profundos" }] },
    { id: 11, question: "Você confia mais em:", options: [{ value: "S", label: "Experiência e dados comprovados" }, { value: "N", label: "Instinto e intuição" }] },
    { id: 12, question: "Ao planejar o futuro, você tende a:", options: [{ value: "S", label: "Focar no presente e no próximo passo concreto" }, { value: "N", label: "Visualizar possibilidades e cenários futuros" }] },
    { id: 13, question: "Você prefere instruções que sejam:", options: [{ value: "S", label: "Passo a passo, detalhadas e claras" }, { value: "N", label: "Gerais, com liberdade para interpretar" }] },
    { id: 14, question: "Em conversas, você tende a ser mais:", options: [{ value: "S", label: "Literal e específico(a)" }, { value: "N", label: "Abstrato(a) e metafórico(a)" }] },

    // T vs F (Pensamento vs Sentimento)
    { id: 15, question: "Ao tomar uma decisão difícil, você valoriza mais:", options: [{ value: "T", label: "Lógica, justiça e análise objetiva" }, { value: "F", label: "Valores pessoais e o impacto nas pessoas" }] },
    { id: 16, question: "Quando um amigo tem um problema, você:", options: [{ value: "T", label: "Oferece soluções práticas e conselhos" }, { value: "F", label: "Oferece apoio emocional e compreensão" }] },
    { id: 17, question: "Você se sente mais confortável em:", options: [{ value: "T", label: "Avaliar situações de forma imparcial" }, { value: "F", label: "Considerar os sentimentos de todos envolvidos" }] },
    { id: 18, question: "No trabalho, você prefere ser avaliado por:", options: [{ value: "T", label: "Sua competência e resultados" }, { value: "F", label: "Sua contribuição para o time e relações" }] },
    { id: 19, question: "Em debates, você tende a:", options: [{ value: "T", label: "Focar nos argumentos lógicos" }, { value: "F", label: "Considerar como as pessoas se sentem" }] },
    { id: 20, question: "Ao dar feedback, você é mais:", options: [{ value: "T", label: "Direto e objetivo, focado na melhoria" }, { value: "F", label: "Cuidadoso para não magoar, focado no encorajamento" }] },
    { id: 21, question: "Você acredita que as decisões devem ser baseadas em:", options: [{ value: "T", label: "Princípios universais e imparciais" }, { value: "F", label: "Circunstâncias individuais e empatia" }] },

    // J vs P (Julgamento vs Percepção)
    { id: 22, question: "No seu dia a dia, você prefere:", options: [{ value: "J", label: "Ter um plano definido e segui-lo" }, { value: "P", label: "Manter opções abertas e ser flexível" }] },
    { id: 23, question: "Prazos fazem você se sentir:", options: [{ value: "J", label: "Motivado(a) — gosto de cumprir com antecedência" }, { value: "P", label: "Pressionado(a) — trabalho melhor sob pressão" }] },
    { id: 24, question: "Sua agenda ideal seria:", options: [{ value: "J", label: "Organizada com horários e compromissos definidos" }, { value: "P", label: "Flexível, permitindo mudanças de última hora" }] },
    { id: 25, question: "Ao fazer compras, você:", options: [{ value: "J", label: "Faz uma lista e segue o planejado" }, { value: "P", label: "Explora e decide na hora" }] },
    { id: 26, question: "Quando um projeto termina, você sente:", options: [{ value: "J", label: "Satisfação por ter completado a tarefa" }, { value: "P", label: "Um pouco de tristeza por perder as possibilidades" }] },
    { id: 27, question: "Em viagens, você prefere:", options: [{ value: "J", label: "Roteiro organizado com reservas feitas" }, { value: "P", label: "Viajar sem roteiro fixo e decidir no caminho" }] },
    { id: 28, question: "Seu espaço de trabalho geralmente é:", options: [{ value: "J", label: "Organizado e tudo em seu lugar" }, { value: "P", label: "Um pouco bagunçado, mas funcional para mim" }] }
  ];

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate('/tests/mbti/results', { state: { answers } });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentAnswer = answers[currentQuestion];

  const getDimensionLabel = () => {
    const idx = currentQuestion;
    if (idx < 7) return "Extroversão × Introversão";
    if (idx < 14) return "Sensação × Intuição";
    if (idx < 21) return "Pensamento × Sentimento";
    return "Julgamento × Percepção";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate('/ferramentas')} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Teste MBTI</h1>
              <TestHelpButton testId="mbti" />
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
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-violet-100 text-violet-800 mb-2">
                {getDimensionLabel()}
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600 ml-2 mb-2">
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
              <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                <ArrowLeft className="h-4 w-4 mr-2" /> Anterior
              </Button>
              <div className="text-center">
                <Progress value={progress} className="w-48 h-2 mx-auto mb-2" />
                <span className="text-sm text-gray-500">{Math.round(progress)}% completo</span>
              </div>
              <Button onClick={handleNext} disabled={!currentAnswer} className="bg-violet-600 hover:bg-violet-700">
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

export default MBTITest;
