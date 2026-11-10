
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import TestHelpButton from '@/components/TestHelpButton';

const TemperamentTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // C=Colérico, S=Sanguíneo, F=Fleumático, M=Melancólico
  const questions = [
    {
      id: 1,
      question: "Como você reage quando alguém discorda de você em público?",
      options: [
        { value: "C", label: "Defendo minha posição com firmeza e argumentos" },
        { value: "S", label: "Levo na brincadeira e tento convencer com humor" },
        { value: "F", label: "Ouço calmamente e considero outros pontos de vista" },
        { value: "M", label: "Analiso internamente os argumentos antes de responder" }
      ]
    },
    {
      id: 2,
      question: "Em uma festa, como você geralmente se comporta?",
      options: [
        { value: "C", label: "Assumo a liderança na organização ou nas atividades" },
        { value: "S", label: "Sou a alma da festa, conversando com todos" },
        { value: "F", label: "Fico confortável observando e conversando com poucos" },
        { value: "M", label: "Prefiro conversas profundas com uma ou duas pessoas" }
      ]
    },
    {
      id: 3,
      question: "Como você lida com um prazo apertado?",
      options: [
        { value: "C", label: "Acelero o ritmo e exijo resultados rápidos" },
        { value: "S", label: "Trabalho de forma rápida mas um pouco desorganizada" },
        { value: "F", label: "Mantenho meu ritmo constante sem me estressar" },
        { value: "M", label: "Planejo cada passo cuidadosamente para garantir qualidade" }
      ]
    },
    {
      id: 4,
      question: "Quando acontece uma injustiça, você:",
      options: [
        { value: "C", label: "Reago imediatamente com indignação e ação" },
        { value: "S", label: "Expresso minha revolta mas logo me distraio" },
        { value: "F", label: "Fico chateado internamente mas evito conflitos" },
        { value: "M", label: "Reflito profundamente e fico remoendo por muito tempo" }
      ]
    },
    {
      id: 5,
      question: "Qual frase melhor descreve sua forma de trabalhar?",
      options: [
        { value: "C", label: "Focado em resultados, direto ao ponto" },
        { value: "S", label: "Criativo, multitarefa e cheio de energia" },
        { value: "F", label: "Consistente, confiável e metódico" },
        { value: "M", label: "Detalhista, perfeccionista e analítico" }
      ]
    },
    {
      id: 6,
      question: "Como você toma decisões importantes?",
      options: [
        { value: "C", label: "Rapidamente, com base na intuição e experiência" },
        { value: "S", label: "Impulsivamente, seguindo meu entusiasmo" },
        { value: "F", label: "Lentamente, ponderando todos os aspectos com calma" },
        { value: "M", label: "Depois de muita análise e consideração de cenários" }
      ]
    },
    {
      id: 7,
      question: "Quando está sob pressão, você tende a:",
      options: [
        { value: "C", label: "Ficar irritado e impaciente com os outros" },
        { value: "S", label: "Ficar ansioso mas tentar manter o otimismo" },
        { value: "F", label: "Ficar ainda mais calmo e estável" },
        { value: "M", label: "Ficar pessimista e preocupado com detalhes" }
      ]
    },
    {
      id: 8,
      question: "Como você prefere seu ambiente de trabalho?",
      options: [
        { value: "C", label: "Dinâmico, desafiador e com autonomia" },
        { value: "S", label: "Divertido, social e com variedade" },
        { value: "F", label: "Tranquilo, previsível e harmônico" },
        { value: "M", label: "Organizado, silencioso e com padrões claros" }
      ]
    },
    {
      id: 9,
      question: "Quando recebe uma crítica, você:",
      options: [
        { value: "C", label: "Rebate argumentando que está certo" },
        { value: "S", label: "Fica chateado mas logo esquece" },
        { value: "F", label: "Aceita sem discutir e reflete depois" },
        { value: "M", label: "Leva muito a sério e se sente profundamente afetado" }
      ]
    },
    {
      id: 10,
      question: "Qual é sua maior motivação?",
      options: [
        { value: "C", label: "Conquista, poder e controle" },
        { value: "S", label: "Diversão, reconhecimento e socialização" },
        { value: "F", label: "Paz, estabilidade e harmonia" },
        { value: "M", label: "Perfeição, significado e propósito" }
      ]
    },
    {
      id: 11,
      question: "Como você lidera uma equipe?",
      options: [
        { value: "C", label: "Com autoridade, definindo metas claras e cobrando resultados" },
        { value: "S", label: "Com carisma, motivando e inspirando pelo exemplo" },
        { value: "F", label: "Com paciência, criando um ambiente seguro e estável" },
        { value: "M", label: "Com organização, planejando cada detalhe minuciosamente" }
      ]
    },
    {
      id: 12,
      question: "Ao acordar de manhã, seu primeiro pensamento é:",
      options: [
        { value: "C", label: "O que preciso conquistar hoje?" },
        { value: "S", label: "O que de legal vai acontecer hoje?" },
        { value: "F", label: "Espero ter um dia tranquilo" },
        { value: "M", label: "Preciso me preparar bem para o dia" }
      ]
    },
    {
      id: 13,
      question: "Em relação a regras e normas, você:",
      options: [
        { value: "C", label: "Crio minhas próprias regras e questiono as existentes" },
        { value: "S", label: "Sigo quando conveniente, mas prefiro flexibilidade" },
        { value: "F", label: "Sigo fielmente para manter a paz" },
        { value: "M", label: "Acredito que regras são essenciais e devo segui-las à risca" }
      ]
    },
    {
      id: 14,
      question: "Como as pessoas costumam descrever você?",
      options: [
        { value: "C", label: "Forte, determinado e direto" },
        { value: "S", label: "Divertido, envolvente e carismático" },
        { value: "F", label: "Calmo, amável e confiável" },
        { value: "M", label: "Inteligente, sensível e perfeccionista" }
      ]
    },
    {
      id: 15,
      question: "Quando um amigo cancela planos de última hora, você:",
      options: [
        { value: "C", label: "Fica irritado e expressa sua frustração" },
        { value: "S", label: "Fica desapontado mas logo encontra outra coisa para fazer" },
        { value: "F", label: "Entende sem problemas e relaxa em casa" },
        { value: "M", label: "Fica chateado e pensa no porquê do cancelamento" }
      ]
    },
    {
      id: 16,
      question: "Qual é seu maior desafio pessoal?",
      options: [
        { value: "C", label: "Ser mais paciente e empático com os outros" },
        { value: "S", label: "Manter o foco e terminar o que começo" },
        { value: "F", label: "Ser mais assertivo e expressar minha opinião" },
        { value: "M", label: "Parar de me preocupar demais e cobrar perfeição" }
      ]
    },
    {
      id: 17,
      question: "Em conversas, você geralmente:",
      options: [
        { value: "C", label: "Vai direto ao ponto e lidera a conversa" },
        { value: "S", label: "Fala muito, conta histórias e diverte todos" },
        { value: "F", label: "Ouve mais do que fala e concorda" },
        { value: "M", label: "Contribui com observações profundas e reflexivas" }
      ]
    },
    {
      id: 18,
      question: "Quando precisa resolver um conflito, você:",
      options: [
        { value: "C", label: "Enfrenta diretamente e busca resolver rápido" },
        { value: "S", label: "Usa humor e charme para suavizar a situação" },
        { value: "F", label: "Busca o consenso e evita confrontos" },
        { value: "M", label: "Analisa as causas profundas antes de agir" }
      ]
    },
    {
      id: 19,
      question: "Como você se sente em relação a mudanças?",
      options: [
        { value: "C", label: "Adoro mudanças que tragam novos desafios" },
        { value: "S", label: "Amo novidades e a emoção do novo" },
        { value: "F", label: "Prefiro estabilidade, mas me adapto se necessário" },
        { value: "M", label: "Preciso entender o motivo antes de aceitar qualquer mudança" }
      ]
    },
    {
      id: 20,
      question: "Qual atividade de lazer mais te atrai?",
      options: [
        { value: "C", label: "Esportes competitivos ou atividades desafiadoras" },
        { value: "S", label: "Festas, eventos sociais e viagens" },
        { value: "F", label: "Ler, assistir filmes ou relaxar em casa" },
        { value: "M", label: "Atividades artísticas, música ou reflexão" }
      ]
    },
    {
      id: 21,
      question: "Em relação ao dinheiro, você:",
      options: [
        { value: "C", label: "Investe com visão de crescimento e risco calculado" },
        { value: "S", label: "Gasta com facilidade em experiências e diversão" },
        { value: "F", label: "Economiza de forma moderada para ter segurança" },
        { value: "M", label: "Controla cada centavo e planeja meticulosamente" }
      ]
    },
    {
      id: 22,
      question: "Se pudesse escolher um superpoder, seria:",
      options: [
        { value: "C", label: "Super força — para vencer qualquer obstáculo" },
        { value: "S", label: "Teletransporte — para estar em todos os lugares" },
        { value: "F", label: "Invisibilidade — para observar sem ser notado" },
        { value: "M", label: "Ler mentes — para entender profundamente os outros" }
      ]
    },
    {
      id: 23,
      question: "Quando está aprendendo algo novo, você prefere:",
      options: [
        { value: "C", label: "Aprender fazendo, sem muita teoria" },
        { value: "S", label: "Aprender em grupo, com discussões e interações" },
        { value: "F", label: "Aprender no meu ritmo, passo a passo" },
        { value: "M", label: "Estudar a teoria profundamente antes de praticar" }
      ]
    },
    {
      id: 24,
      question: "Como você reage ao ver alguém fazendo algo errado?",
      options: [
        { value: "C", label: "Corrijo imediatamente, sem rodeios" },
        { value: "S", label: "Comento de forma leve e descontraída" },
        { value: "F", label: "Prefiro não dizer nada para não incomodar" },
        { value: "M", label: "Marco mentalmente mas espero o momento adequado" }
      ]
    },
    {
      id: 25,
      question: "Qual qualidade você mais valoriza em si mesmo?",
      options: [
        { value: "C", label: "Minha determinação e força de vontade" },
        { value: "S", label: "Meu carisma e alegria de viver" },
        { value: "F", label: "Minha paciência e lealdade" },
        { value: "M", label: "Minha inteligência e sensibilidade" }
      ]
    },
    {
      id: 26,
      question: "Em um projeto em grupo, você geralmente assume o papel de:",
      options: [
        { value: "C", label: "Líder que define direção e cobra resultados" },
        { value: "S", label: "Animador que mantém o grupo motivado" },
        { value: "F", label: "Mediador que mantém a harmonia" },
        { value: "M", label: "Planejador que cuida dos detalhes e qualidade" }
      ]
    },
    {
      id: 27,
      question: "Quando está muito estressado, você tende a:",
      options: [
        { value: "C", label: "Explodir e depois se arrepender" },
        { value: "S", label: "Desabafar com amigos e buscar distração" },
        { value: "F", label: "Se isolar e buscar paz interior" },
        { value: "M", label: "Ficar introspectivo e autocrítico" }
      ]
    },
    {
      id: 28,
      question: "O que mais te incomoda nas pessoas?",
      options: [
        { value: "C", label: "Lentidão, indecisão e falta de ação" },
        { value: "S", label: "Seriedade excessiva e falta de diversão" },
        { value: "F", label: "Agressividade e conflitos desnecessários" },
        { value: "M", label: "Superficialidade e falta de comprometimento" }
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
      navigate('/tests/temperament/results', { state: { answers } });
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate('/ferramentas')} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Teste de Temperamento</h1>
              <TestHelpButton testId="temperament" />
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
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800 mb-4">
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
              <Button onClick={handleNext} disabled={!currentAnswer} className="bg-red-600 hover:bg-red-700">
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

export default TemperamentTest;
