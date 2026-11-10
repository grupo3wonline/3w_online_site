import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import TestHelpButton from '@/components/TestHelpButton';

const MentalAgeTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const questions = [
    'Prefere sair para festas ou ficar em casa lendo/assistindo?',
    'Com que frequência tenta coisas novas (comida, hobbies, lugares)?',
    'Como lida com mudanças inesperadas na rotina?',
    'Qual sua relação com tecnologia e tendências digitais?',
    'Quão confortável você se sente em assumir riscos?',
    'Você costuma planejar a longo prazo ou vive o presente?',
    'Como lida com frustrações do dia a dia?',
    'Qual seu nível de curiosidade para aprender coisas novas?',
    'Com que frequência pratica autocuidado e descanso?',
    'Em grupos, você normalmente lidera, contribui ou observa?',
    'Você se adapta facilmente a novas ideias de outras pessoas?',
    'Você prefere estabilidade ou variedade e novidade?',
    'Como você se comporta em situações de pressão ou estresse?',
    'Qual sua atitude em relação a críticas construtivas?',
    'Você prefere seguir regras estabelecidas ou criar suas próprias?',
    'Como você reage quando algo não sai como planejado?',
    'Qual sua relação com responsabilidades e compromissos?',
    'Você tende a ser mais otimista ou realista/pessimista?',
    'Como você lida com conflitos interpessoais?',
    'Qual sua atitude em relação ao dinheiro e gastos?',
    'Você prefere atividades intelectuais ou físicas?',
    'Como você se comporta em ambientes desconhecidos?',
    'Qual sua relação com autoridade e hierarquia?',
    'Você tende a agir por impulso ou refletir antes de decidir?',
  ];

  const scale = [
    { value: 1, label: 'Muito mais jovem/impulsivo' },
    { value: 2, label: 'Um pouco mais jovem' },
    { value: 3, label: 'Equilibrado' },
    { value: 4, label: 'Um pouco mais maduro' },
    { value: 5, label: 'Muito mais maduro/tradicional' },
  ];

  const handleAnswerChange = (value: number) => setAnswers({ ...answers, [currentQuestion]: value });

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) setCurrentQuestion(currentQuestion + 1);
    else {
      const values = Object.values(answers);
      const avg = values.reduce((s, v) => s + v, 0) / values.length;
      const mentalAge = Math.round(16 + (avg - 3) * 8 + questions.length / 12); // ~16-40+
      navigate('/tests/mental-age/results', { state: { mentalAge, answers } });
    }
  };

  const handlePrevious = () => { if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1); };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentAnswer = answers[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50">
      <Helmet>
        <title>Teste de Idade Mental — Divertido e Educativo</title>
        <meta name="description" content="Descubra sua idade mental com um teste leve e divertido. Apenas para entretenimento." />
        <link rel="canonical" href={window.location.origin + '/tests/mental-age'} />
      </Helmet>

      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate('/ferramentas')} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
              </Button>
              <h1 className="text-xl font-bold text-gray-900 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-yellow-500" /> Teste de Idade Mental
              </h1>
              <TestHelpButton testId="mental-age" />
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
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800 mb-2">
                Pergunta {currentQuestion + 1} de {questions.length}
              </div>
            </div>
            <CardTitle className="text-2xl text-center text-gray-900 leading-relaxed">
              {questions[currentQuestion]}
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-2">
            <RadioGroup value={currentAnswer?.toString() || ''} onValueChange={(v) => handleAnswerChange(Number(v))} className="space-y-4">
              {scale.map((opt) => (
                <div key={opt.value} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value={String(opt.value)} id={`mq${currentQuestion}-o${opt.value}`} className="mt-0.5" />
                  <Label htmlFor={`mq${currentQuestion}-o${opt.value}`} className="flex-1 text-gray-700 leading-relaxed cursor-pointer">
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

            <p className="text-xs text-gray-500 mt-6">Apenas para entretenimento — não representa idade real nem avaliação psicológica.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MentalAgeTest;
