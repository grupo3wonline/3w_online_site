import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, HeartPulse } from 'lucide-react';
import TestHelpButton from '@/components/TestHelpButton';

const MentalHealthCalculator = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const questions = [
    { id: 1, text: 'Pouco interesse ou prazer em fazer as coisas' },
    { id: 2, text: 'Se sente para baixo, deprimido(a) ou sem esperanças' },
    { id: 3, text: 'Dificuldade para adormecer, continuar dormindo ou dormir em excesso' },
    { id: 4, text: 'Se sente cansado(a) ou com pouca energia' },
    { id: 5, text: 'Falta de apetite ou come em excesso' },
    { id: 6, text: 'Se sente mal consigo mesmo(a) — se acha um fracasso ou decepciona sua família' },
    { id: 7, text: 'Dificuldade para se concentrar em coisas, como ler ou ver TV' },
    { id: 8, text: 'Move-se ou fala devagar; ou está agitado(a) e inquieto(a)' },
    { id: 9, text: 'Pensamentos de que seria melhor estar morto(a) ou se ferir de alguma forma' },
    { id: 10, text: 'Sente-se nervoso(a), ansioso(a) ou muito tenso(a)' },
    { id: 11, text: 'Não consegue parar ou controlar as preocupações' },
    { id: 12, text: 'Preocupa-se demais com coisas diferentes' },
    { id: 13, text: 'Tem dificuldade para relaxar' },
    { id: 14, text: 'Fica tão inquieto(a) que é difícil ficar parado(a)' },
    { id: 15, text: 'Fica facilmente aborrecido(a) ou irritado(a)' },
    { id: 16, text: 'Sente medo como se algo terrível pudesse acontecer' },
    { id: 17, text: 'Tem dificuldade para tomar decisões do dia a dia' },
    { id: 18, text: 'Evita situações sociais ou sente desconforto em grupos' },
  ];

  const options = [
    { value: 0, label: 'Nunca' },
    { value: 1, label: 'Vários dias' },
    { value: 2, label: 'Mais da metade dos dias' },
    { value: 3, label: 'Quase todos os dias' },
  ];

  const handleAnswerChange = (value: number) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const total = Object.values(answers).reduce((sum, v) => sum + v, 0);
      navigate('/tests/mental-health/results', { state: { answers, total } });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentAnswer = answers[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Helmet>
        <title>Calculadora de Saúde Mental — Autoteste</title>
        <meta name="description" content="Avalie sinais de humor e bem-estar com uma calculadora de saúde mental (triagem). Não é diagnóstico médico." />
        <link rel="canonical" href={window.location.origin + '/tests/mental-health'} />
      </Helmet>

      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate('/ferramentas')} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
              </Button>
              <h1 className="text-xl font-bold text-gray-900 flex items-center">
                <HeartPulse className="h-5 w-5 mr-2 text-red-500" /> Calculadora de Saúde Mental
              </h1>
              <TestHelpButton testId="mental-health" />
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
            <div className="text-center mb-2">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 mb-2">
                Questão {currentQuestion + 1} de {questions.length}
              </div>
            </div>
            <CardTitle className="text-2xl text-center text-gray-900 leading-relaxed">
              Nos últimos 14 dias, com que frequência você teve o seguinte problema?
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-2">
            <div className="text-lg text-center text-gray-800 mb-6">{questions[currentQuestion].text}</div>
            <RadioGroup value={currentAnswer?.toString() || ''} onValueChange={(v) => handleAnswerChange(Number(v))} className="space-y-4">
              {options.map((opt) => (
                <div key={opt.value} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value={String(opt.value)} id={`q${currentQuestion}-o${opt.value}`} className="mt-0.5" />
                  <Label htmlFor={`q${currentQuestion}-o${opt.value}`} className="flex-1 text-gray-700 leading-relaxed cursor-pointer">
                    {opt.label}
                  </Label>
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
              <Button onClick={handleNext} disabled={currentAnswer === undefined} className="flex items-center">
                {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Próxima'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <p className="text-xs text-gray-500 mt-6">
              Aviso: Esta ferramenta é apenas uma triagem educacional e não substitui avaliação profissional. Procure um profissional de saúde se estiver em sofrimento.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MentalHealthCalculator;
