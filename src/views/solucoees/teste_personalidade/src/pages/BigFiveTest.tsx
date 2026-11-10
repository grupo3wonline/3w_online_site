
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import TestHelpButton from '@/components/TestHelpButton';

const BigFiveTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // Dimensões: O=Abertura, C=Conscienciosidade, E=Extroversão, A=Agradabilidade, N=Neuroticismo
  // Cada resposta é dimensão + pontuação (ex: "O_5" = Abertura, concordo totalmente)
  const questions = [
    // Abertura à Experiência (O) — 5 questões
    { id: 1, dimension: "O", question: "Tenho uma imaginação muito ativa e gosto de criar cenários hipotéticos.", reverse: false },
    { id: 2, dimension: "O", question: "Gosto de experimentar coisas novas, mesmo que saiam da minha zona de conforto.", reverse: false },
    { id: 3, dimension: "O", question: "Prefiro manter rotinas e evitar mudanças desnecessárias.", reverse: true },
    { id: 4, dimension: "O", question: "Sinto grande curiosidade sobre diferentes culturas, filosofias e ideias.", reverse: false },
    { id: 5, dimension: "O", question: "Aprecio arte, música e expressões criativas em geral.", reverse: false },

    // Conscienciosidade (C) — 5 questões
    { id: 6, dimension: "C", question: "Sou muito organizado(a) e gosto de planejar meu dia com antecedência.", reverse: false },
    { id: 7, dimension: "C", question: "Quando assumo um compromisso, faço de tudo para cumpri-lo.", reverse: false },
    { id: 8, dimension: "C", question: "Costumo deixar tarefas para a última hora.", reverse: true },
    { id: 9, dimension: "C", question: "Presto muita atenção aos detalhes em tudo que faço.", reverse: false },
    { id: 10, dimension: "C", question: "Tenho dificuldade em manter a disciplina e a constância.", reverse: true },

    // Extroversão (E) — 5 questões
    { id: 11, dimension: "E", question: "Sinto-me energizado(a) quando estou rodeado de pessoas.", reverse: false },
    { id: 12, dimension: "E", question: "Gosto de ser o centro das atenções em eventos sociais.", reverse: false },
    { id: 13, dimension: "E", question: "Prefiro ficar em casa a ir a festas ou eventos.", reverse: true },
    { id: 14, dimension: "E", question: "Faço amizades com facilidade e gosto de conhecer pessoas novas.", reverse: false },
    { id: 15, dimension: "E", question: "Considero-me uma pessoa falante e comunicativa.", reverse: false },

    // Agradabilidade (A) — 5 questões
    { id: 16, dimension: "A", question: "Costumo me colocar no lugar dos outros antes de julgá-los.", reverse: false },
    { id: 17, dimension: "A", question: "Prefiro cooperar do que competir com as pessoas.", reverse: false },
    { id: 18, dimension: "A", question: "Às vezes sinto que as pessoas se aproveitam da minha bondade.", reverse: false },
    { id: 19, dimension: "A", question: "Tendo a confiar nas boas intenções das pessoas.", reverse: false },
    { id: 20, dimension: "A", question: "Prefiro evitar conflitos, mesmo quando discordo.", reverse: false },

    // Neuroticismo (N) — 5 questões
    { id: 21, dimension: "N", question: "Costumo me preocupar excessivamente com coisas fora do meu controle.", reverse: false },
    { id: 22, dimension: "N", question: "Meu humor muda com frequência ao longo do dia.", reverse: false },
    { id: 23, dimension: "N", question: "Geralmente consigo manter a calma em situações de pressão.", reverse: true },
    { id: 24, dimension: "N", question: "Sinto ansiedade ou nervosismo com frequência.", reverse: false },
    { id: 25, dimension: "N", question: "Pequenos contratempos podem me afetar muito emocionalmente.", reverse: false }
  ];

  const likertOptions = [
    { value: "1", label: "Discordo totalmente" },
    { value: "2", label: "Discordo parcialmente" },
    { value: "3", label: "Neutro" },
    { value: "4", label: "Concordo parcialmente" },
    { value: "5", label: "Concordo totalmente" }
  ];

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate('/tests/big-five/results', { state: { answers, questions } });
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate('/ferramentas')} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Big Five — 5 Grandes Traços</h1>
              <TestHelpButton testId="big-five" />
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
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-rose-100 text-rose-800 mb-4">
                Afirmação {currentQuestion + 1} de {questions.length}
              </div>
            </div>
            <CardTitle className="text-2xl text-center text-gray-900 leading-relaxed">
              {questions[currentQuestion].question}
            </CardTitle>
            <p className="text-center text-gray-500 text-sm mt-2">Selecione o quanto você concorda com esta afirmação:</p>
          </CardHeader>
          <CardContent className="pt-6">
            <RadioGroup value={currentAnswer || ""} onValueChange={handleAnswerChange} className="space-y-3">
              {likertOptions.map((option, idx) => (
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
              <Button onClick={handleNext} disabled={!currentAnswer} className="bg-rose-600 hover:bg-rose-700">
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

export default BigFiveTest;
