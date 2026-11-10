import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Brain } from 'lucide-react';
import TestHelpButton from '@/components/TestHelpButton';

interface IQQuestion {
  q: string;
  options: string[];
  correct: number;
}

const IQTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const questions: IQQuestion[] = [
    { q: 'Qual número completa a sequência: 2, 4, 8, 16, __?', options: ['18', '24', '32', '34'], correct: 2 },
    { q: 'Se todos os Flurbs são Brelbs e alguns Brelbs são Grunks, então alguns Flurbs podem ser Grunks?', options: ['Sim', 'Não'], correct: 0 },
    { q: 'Quantos triângulos há em um triângulo dividido em 4 partes iguais?', options: ['4', '6', '8', '10'], correct: 1 },
    { q: 'SINÔNIMO de "Conciso":', options: ['Extenso', 'Sucinto', 'Prolixo', 'Ambíguo'], correct: 1 },
    { q: 'Qual figura completa o padrão lógico? (imagine sequência A, B, A, B, ...)', options: ['A', 'B'], correct: 1 },
    { q: 'Se hoje é terça, que dia será em 10 dias?', options: ['Quinta', 'Sexta', 'Sábado', 'Domingo'], correct: 2 },
    { q: 'Qual número não pertence ao grupo: 9, 16, 25, 36, 45?', options: ['9', '16', '25', '36', '45'], correct: 4 },
    { q: 'Antônimo de "Rígido":', options: ['Flexível', 'Firme', 'Duro', 'Constante'], correct: 0 },
    { q: 'Se 5x = 45, então x = ?', options: ['5', '7', '9', '10'], correct: 2 },
    { q: 'Qual palavra completa: IN__ITO (pista: lógica comum)', options: ['FIN', 'CUR', 'FIN', 'SUB'], correct: 0 },
    { q: 'Qual sequência segue o padrão: 1, 1, 2, 3, 5, 8, __?', options: ['11', '13', '15', '21'], correct: 1 },
    { q: 'Se A=1, B=2, C=3... qual é o valor de CASA?', options: ['18', '21', '24', '27'], correct: 0 },
    { q: 'Analise: Alguns médicos são professores. Todos os professores são inteligentes. Logo:', options: ['Alguns médicos são inteligentes', 'Todos médicos são inteligentes', 'Nenhum médico é inteligente', 'Impossível determinar'], correct: 0 },
    { q: 'Qual número vem a seguir: 100, 50, 25, 12.5, __?', options: ['6.25', '7.5', '10', '5'], correct: 0 },
    { q: 'SINÔNIMO de "Perspicaz":', options: ['Confuso', 'Astuto', 'Lento', 'Ingênuo'], correct: 1 },
    { q: 'Se um trem viaja 120km em 2 horas, quantos km viaja em 5 horas na mesma velocidade?', options: ['240', '300', '360', '480'], correct: 1 },
    { q: 'Qual é o próximo da série: Z, Y, X, W, __?', options: ['V', 'U', 'T', 'S'], correct: 0 },
    { q: 'Antônimo de "Efêmero":', options: ['Transitório', 'Permanente', 'Rápido', 'Momentâneo'], correct: 1 },
    { q: 'Se 3 pintores pintam 3 casas em 3 dias, quantos pintores pintam 6 casas em 6 dias?', options: ['3', '6', '9', '12'], correct: 0 },
    { q: 'Complete a analogia: Livro está para Biblioteca assim como Quadro está para:', options: ['Pincel', 'Museu', 'Arte', 'Moldura'], correct: 1 },
  ];

  const handleAnswerChange = (value: number) => setAnswers({ ...answers, [currentQuestion]: value });

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) setCurrentQuestion(currentQuestion + 1);
    else {
      const score = Object.entries(answers).reduce((sum, [idx, ans]) => sum + (ans === questions[Number(idx)].correct ? 1 : 0), 0);
      navigate('/tests/iq/results', { state: { score, total: questions.length } });
    }
  };

  const handlePrevious = () => { if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1); };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentAnswer = answers[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <Helmet>
        <title>Teste de QI (recreativo) — Lógico e Verbal</title>
        <meta name="description" content="Um teste recreativo de raciocínio lógico e verbal com 10 questões. Não é avaliação oficial de QI." />
        <link rel="canonical" href={window.location.origin + '/tests/iq'} />
      </Helmet>

      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate('/ferramentas')} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
              </Button>
              <h1 className="text-xl font-bold text-gray-900 flex items-center">
                <Brain className="h-5 w-5 mr-2 text-indigo-600" /> Teste de QI (Recreativo)
              </h1>
              <TestHelpButton testId="iq" />
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
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800 mb-2">
                Questão {currentQuestion + 1} de {questions.length}
              </div>
            </div>
            <CardTitle className="text-2xl text-center text-gray-900 leading-relaxed">
              {questions[currentQuestion].q}
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-2">
            <RadioGroup value={currentAnswer?.toString() || ''} onValueChange={(v) => handleAnswerChange(Number(v))} className="space-y-4">
              {questions[currentQuestion].options.map((opt, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value={String(idx)} id={`iq${currentQuestion}-o${idx}`} className="mt-0.5" />
                  <Label htmlFor={`iq${currentQuestion}-o${idx}`} className="flex-1 text-gray-700 leading-relaxed cursor-pointer">
                    {opt}
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

            <p className="text-xs text-gray-500 mt-6">Recreativo — não é um instrumento psicométrico oficial nem certificado.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IQTest;
