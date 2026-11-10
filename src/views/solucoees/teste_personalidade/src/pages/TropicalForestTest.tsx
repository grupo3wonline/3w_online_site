
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import TestHelpButton from '@/components/TestHelpButton';

const TropicalForestTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // Dimensões: N=Necessidades básicas(Vaca), C=Carreira(Cavalo), O=Orgulho(Leão), F=Família(Macaco), A=Amor(Ovelha)
  const questions = [
    {
      id: 1,
      question: "Se você pudesse levar apenas uma coisa para uma ilha deserta, o que seria?",
      options: [
        { value: "N", label: "Comida e água suficientes para sobreviver" },
        { value: "C", label: "Ferramentas para construir e criar coisas" },
        { value: "O", label: "Um diário para registrar minha história" },
        { value: "F", label: "Uma foto da minha família" },
        { value: "A", label: "Uma carta de alguém que amo" }
      ]
    },
    {
      id: 2,
      question: "O que te faz sentir mais realizado(a) ao final do dia?",
      options: [
        { value: "N", label: "Saber que minhas necessidades básicas estão garantidas" },
        { value: "C", label: "Ter avançado em meus objetivos profissionais" },
        { value: "O", label: "Ter sido reconhecido(a) por algo que fiz" },
        { value: "F", label: "Ter passado tempo de qualidade com quem amo" },
        { value: "A", label: "Ter compartilhado momentos de carinho com alguém especial" }
      ]
    },
    {
      id: 3,
      question: "Se tivesse que abrir mão de algo permanentemente, o que seria mais difícil?",
      options: [
        { value: "N", label: "Abrir mão do conforto material e segurança financeira" },
        { value: "C", label: "Abrir mão da minha carreira e ambições" },
        { value: "O", label: "Abrir mão do meu orgulho e autoestima" },
        { value: "F", label: "Abrir mão do convívio com minha família" },
        { value: "A", label: "Abrir mão do amor romântico" }
      ]
    },
    {
      id: 4,
      question: "Em uma situação de crise, qual é sua primeira preocupação?",
      options: [
        { value: "N", label: "Garantir segurança e sustento" },
        { value: "C", label: "Proteger meu trabalho e conquistas" },
        { value: "O", label: "Manter minha dignidade e reputação" },
        { value: "F", label: "Cuidar da minha família" },
        { value: "A", label: "Estar perto de quem amo" }
      ]
    },
    {
      id: 5,
      question: "O que mais te motiva a acordar cedo pela manhã?",
      options: [
        { value: "N", label: "A necessidade de manter minha estabilidade" },
        { value: "C", label: "Um projeto empolgante no trabalho" },
        { value: "O", label: "O desejo de provar meu valor" },
        { value: "F", label: "Fazer algo especial para minha família" },
        { value: "A", label: "A presença de alguém especial ao meu lado" }
      ]
    },
    {
      id: 6,
      question: "Você ganhou uma quantia significativa de dinheiro. Qual sua primeira ação?",
      options: [
        { value: "N", label: "Investir em segurança financeira de longo prazo" },
        { value: "C", label: "Investir na minha carreira ou negócio" },
        { value: "O", label: "Comprar algo que demonstre meu sucesso" },
        { value: "F", label: "Proporcionar algo especial para minha família" },
        { value: "A", label: "Planejar algo romântico com meu parceiro(a)" }
      ]
    },
    {
      id: 7,
      question: "Qual é o seu maior medo na vida?",
      options: [
        { value: "N", label: "Passar necessidade ou não ter o básico" },
        { value: "C", label: "Nunca alcançar meu potencial profissional" },
        { value: "O", label: "Ser humilhado(a) ou perder respeito" },
        { value: "F", label: "Perder pessoas da minha família" },
        { value: "A", label: "Nunca encontrar ou perder o amor verdadeiro" }
      ]
    },
    {
      id: 8,
      question: "Se pudesse mudar uma coisa na sua vida agora, seria:",
      options: [
        { value: "N", label: "Minha situação financeira e material" },
        { value: "C", label: "Minha posição profissional e carreira" },
        { value: "O", label: "Como as pessoas me percebem e respeitam" },
        { value: "F", label: "A qualidade do tempo com minha família" },
        { value: "A", label: "Minha vida amorosa e afetiva" }
      ]
    },
    {
      id: 9,
      question: "Qual frase mais ressoa com você?",
      options: [
        { value: "N", label: "Segurança material é a base de tudo" },
        { value: "C", label: "Trabalho duro leva ao sucesso" },
        { value: "O", label: "Respeito é tudo na vida" },
        { value: "F", label: "Família é o que há de mais importante" },
        { value: "A", label: "O amor move o mundo" }
      ]
    },
    {
      id: 10,
      question: "Numa viagem dos sonhos, o mais importante seria:",
      options: [
        { value: "N", label: "Ter conforto e segurança em todos os aspectos" },
        { value: "C", label: "Visitar lugares que agreguem à minha carreira" },
        { value: "O", label: "Viver experiências exclusivas e memoráveis" },
        { value: "F", label: "Levar minha família toda junto" },
        { value: "A", label: "Viajar a dois em um destino romântico" }
      ]
    },
    {
      id: 11,
      question: "Como você define 'sucesso'?",
      options: [
        { value: "N", label: "Ter estabilidade financeira e segurança" },
        { value: "C", label: "Alcançar reconhecimento profissional" },
        { value: "O", label: "Ser respeitado e admirado por todos" },
        { value: "F", label: "Ter uma família feliz e unida" },
        { value: "A", label: "Ter um grande amor e relações profundas" }
      ]
    },
    {
      id: 12,
      question: "Se estivesse em um dilema moral, o que pesaria mais na sua decisão?",
      options: [
        { value: "N", label: "As consequências práticas e materiais" },
        { value: "C", label: "O impacto na minha reputação profissional" },
        { value: "O", label: "Se estou agindo com honra e dignidade" },
        { value: "F", label: "Como minha família seria afetada" },
        { value: "A", label: "Se estou sendo fiel ao que sinto no coração" }
      ]
    },
    {
      id: 13,
      question: "O que te causa mais estresse?",
      options: [
        { value: "N", label: "Preocupações financeiras e instabilidade" },
        { value: "C", label: "Prazos e cobranças profissionais" },
        { value: "O", label: "Sentir que fui desrespeitado(a)" },
        { value: "F", label: "Conflitos familiares" },
        { value: "A", label: "Problemas no relacionamento amoroso" }
      ]
    },
    {
      id: 14,
      question: "Se tivesse que escolher entre essas opções, qual seria?",
      options: [
        { value: "N", label: "Segurança financeira total, mas sem luxo" },
        { value: "C", label: "Carreira brilhante, mas com pouco tempo livre" },
        { value: "O", label: "Fama e respeito, mesmo com sacrifícios" },
        { value: "F", label: "Vida simples, mas com família unida" },
        { value: "A", label: "Amor verdadeiro, mesmo sem riqueza material" }
      ]
    },
    {
      id: 15,
      question: "Qual é sua lembrança mais feliz?",
      options: [
        { value: "N", label: "Quando conquistei minha independência financeira" },
        { value: "C", label: "Uma grande conquista na minha carreira" },
        { value: "O", label: "Quando fui muito elogiado(a) ou premiado(a)" },
        { value: "F", label: "Momentos especiais com minha família" },
        { value: "A", label: "Um momento inesquecível com alguém que amo" }
      ]
    },
    {
      id: 16,
      question: "O que você mais valoriza em um amigo?",
      options: [
        { value: "N", label: "Que seja prático e me ajude quando preciso" },
        { value: "C", label: "Que seja ambicioso e me inspire profissionalmente" },
        { value: "O", label: "Que me respeite e admire genuinamente" },
        { value: "F", label: "Que seja quase como família para mim" },
        { value: "A", label: "Que seja carinhoso e emocionalmente presente" }
      ]
    },
    {
      id: 17,
      question: "Se perdesse tudo, o que tentaria recuperar primeiro?",
      options: [
        { value: "N", label: "Minha casa e meus bens essenciais" },
        { value: "C", label: "Minha posição profissional e carreira" },
        { value: "O", label: "Minha reputação e a forma como sou visto" },
        { value: "F", label: "O contato com meus familiares" },
        { value: "A", label: "Meu relacionamento amoroso" }
      ]
    },
    {
      id: 18,
      question: "Como você prefere passar o fim de semana?",
      options: [
        { value: "N", label: "Organizando minha casa e finanças" },
        { value: "C", label: "Fazendo cursos ou trabalhando em projetos" },
        { value: "O", label: "Fazendo algo que me destaque socialmente" },
        { value: "F", label: "Com reunião de família e amigos próximos" },
        { value: "A", label: "Em um programa a dois, romântico e especial" }
      ]
    },
    {
      id: 19,
      question: "O que mais te faz sentir seguro(a)?",
      options: [
        { value: "N", label: "Ter dinheiro no banco e tudo pago" },
        { value: "C", label: "Ter um emprego estável e perspectiva de crescimento" },
        { value: "O", label: "Saber que sou respeitado(a) onde quer que vá" },
        { value: "F", label: "Ter minha família saudável e por perto" },
        { value: "A", label: "Ter alguém que me ama incondicionalmente" }
      ]
    },
    {
      id: 20,
      question: "Se pudesse enviar uma mensagem para o futuro, o que diria?",
      options: [
        { value: "N", label: "Construí uma base sólida para o futuro" },
        { value: "C", label: "Realizei meus sonhos profissionais" },
        { value: "O", label: "Vivi com honra e dignidade" },
        { value: "F", label: "Minha família sempre foi minha prioridade" },
        { value: "A", label: "Amei profundamente e fui amado(a)" }
      ]
    },
    {
      id: 21,
      question: "Ao pensar nos próximos 5 anos, o que mais deseja?",
      options: [
        { value: "N", label: "Estabilidade financeira completa" },
        { value: "C", label: "Crescimento profissional significativo" },
        { value: "O", label: "Reconhecimento e prestígio" },
        { value: "F", label: "Uma família ainda mais unida" },
        { value: "A", label: "Um relacionamento pleno e feliz" }
      ]
    },
    {
      id: 22,
      question: "Quando você se sente mais vivo(a)?",
      options: [
        { value: "N", label: "Quando sei que estou financeiramente bem" },
        { value: "C", label: "Quando estou criando algo significativo no trabalho" },
        { value: "O", label: "Quando recebo aplausos e reconhecimento" },
        { value: "F", label: "Quando estou rindo com minha família" },
        { value: "A", label: "Quando estou nos braços de quem amo" }
      ]
    },
    {
      id: 23,
      question: "O que te faz perder o sono?",
      options: [
        { value: "N", label: "Contas a pagar e incertezas financeiras" },
        { value: "C", label: "Pressão no trabalho e prazos" },
        { value: "O", label: "Conflitos que afetam minha reputação" },
        { value: "F", label: "Preocupação com a saúde de familiares" },
        { value: "A", label: "Problemas ou distância no relacionamento" }
      ]
    },
    {
      id: 24,
      question: "Se fosse escrever um livro sobre sua vida, o tema central seria:",
      options: [
        { value: "N", label: "Como construí segurança a partir do nada" },
        { value: "C", label: "Minha jornada de superação profissional" },
        { value: "O", label: "Como conquistei o respeito do mundo" },
        { value: "F", label: "A história da minha família e nossos laços" },
        { value: "A", label: "Uma grande história de amor" }
      ]
    },
    {
      id: 25,
      question: "Qual legado você quer deixar?",
      options: [
        { value: "N", label: "Bens e recursos para as próximas gerações" },
        { value: "C", label: "Contribuições profissionais que impactem o mundo" },
        { value: "O", label: "Uma reputação impecável e memorável" },
        { value: "F", label: "Valores e memórias familiares eternas" },
        { value: "A", label: "A prova de que o amor verdadeiro existe" }
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
      navigate('/tests/tropical-forest/results', { state: { answers } });
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate('/ferramentas')} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Teste da Floresta Tropical</h1>
              <TestHelpButton testId="tropical-forest" />
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
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 mb-4">
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
              <Button onClick={handleNext} disabled={!currentAnswer} className="flex items-center bg-green-600 hover:bg-green-700">
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

export default TropicalForestTest;
