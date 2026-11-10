
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import TestHelpButton from '@/components/TestHelpButton';

const EnneagramTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      id: 1,
      question: "Quando você comete um erro, qual é sua primeira reação?",
      options: [
        { value: "type1", label: "Fico irritado comigo mesmo e quero corrigi-lo imediatamente" },
        { value: "type2", label: "Me preocupo com como isso afetará os outros" },
        { value: "type3", label: "Penso em como isso pode afetar minha imagem" },
        { value: "type4", label: "Sinto que é mais uma prova de que sou diferente/deficiente" }
      ]
    },
    {
      id: 2,
      question: "O que mais te motiva no trabalho?",
      options: [
        { value: "type5", label: "Entender profundamente como as coisas funcionam" },
        { value: "type6", label: "Ter segurança e apoio da equipe" },
        { value: "type7", label: "Variedade e novas possibilidades" },
        { value: "type8", label: "Ter controle e poder de decisão" }
      ]
    },
    {
      id: 3,
      question: "Como você lida com conflitos?",
      options: [
        { value: "type9", label: "Evito conflitos e busco harmonia" },
        { value: "type1", label: "Acredito que há uma forma certa de resolver" },
        { value: "type2", label: "Foco em como posso ajudar as pessoas envolvidas" },
        { value: "type8", label: "Encaro diretamente e com firmeza" }
      ]
    },
    {
      id: 4,
      question: "Qual é seu maior medo?",
      options: [
        { value: "type3", label: "Ser visto como um fracasso" },
        { value: "type4", label: "Ser comum ou insignificante" },
        { value: "type5", label: "Ser incompetente ou incapaz" },
        { value: "type6", label: "Não ter apoio ou orientação" }
      ]
    },
    {
      id: 5,
      question: "Como você se sente em situações sociais?",
      options: [
        { value: "type7", label: "Energizado e busco manter o clima animado" },
        { value: "type2", label: "Focado em fazer os outros se sentirem bem" },
        { value: "type5", label: "Observo mais do que participo" },
        { value: "type4", label: "Às vezes me sinto deslocado ou diferente" }
      ]
    },
    {
      id: 6,
      question: "Qual característica melhor te descreve?",
      options: [
        { value: "type1", label: "Perfeccionista e crítico" },
        { value: "type9", label: "Pacífico e acomodativo" },
        { value: "type8", label: "Assertivo e confrontativo" },
        { value: "type6", label: "Leal mas ansioso" }
      ]
    },
    {
      id: 7,
      question: "Como você toma decisões importantes?",
      options: [
        { value: "type5", label: "Preciso de muito tempo para analisar todas as opções" },
        { value: "type3", label: "Considero o que será mais eficiente e impressionante" },
        { value: "type7", label: "Vou com a opção que parece mais interessante" },
        { value: "type1", label: "Busco a opção mais correta e ética" }
      ]
    },
    {
      id: 8,
      question: "O que mais te incomoda nas pessoas?",
      options: [
        { value: "type8", label: "Fraqueza e falta de assertividade" },
        { value: "type4", label: "Falta de profundidade emocional" },
        { value: "type2", label: "Egoísmo e falta de consideração" },
        { value: "type9", label: "Pressão e agressividade desnecessária" }
      ]
    },
    {
      id: 9,
      question: "Como você se comporta sob pressão?",
      options: [
        { value: "type6", label: "Busco apoio e orientação de outros" },
        { value: "type3", label: "Trabalho ainda mais para manter a performance" },
        { value: "type7", label: "Procuro distrações ou alternativas" },
        { value: "type5", label: "Me retiro para pensar sozinho" }
      ]
    },
    {
      id: 10,
      question: "Qual é sua maior força?",
      options: [
        { value: "type2", label: "Capacidade de cuidar e ajudar outros" },
        { value: "type1", label: "Senso de justiça e integridade" },
        { value: "type9", label: "Habilidade de mediar e manter a paz" },
        { value: "type4", label: "Autenticidade e profundidade emocional" }
      ]
    },
    {
      id: 11,
      question: "Como você se relaciona com autoridade?",
      options: [
        { value: "type8", label: "Questiono e desafio quando necessário" },
        { value: "type6", label: "Busco orientação mas também questiono" },
        { value: "type3", label: "Vejo como uma oportunidade de impressionar" },
        { value: "type9", label: "Prefiro evitar conflitos com autoridades" }
      ]
    },
    {
      id: 12,
      question: "O que você faz quando se sente sobrecarregado?",
      options: [
        { value: "type7", label: "Busco algo novo e estimulante" },
        { value: "type5", label: "Me isolo para recuperar energia" },
        { value: "type2", label: "Foco em ajudar outros para esquecer meus problemas" },
        { value: "type1", label: "Fico ainda mais crítico e exigente" }
      ]
    },
    {
      id: 13,
      question: "Qual é sua abordagem para mudanças?",
      options: [
        { value: "type4", label: "Mudanças me permitem expressar minha individualidade" },
        { value: "type6", label: "Me preocupo com as incertezas que trazem" },
        { value: "type8", label: "Vejo como oportunidade de exercer controle" },
        { value: "type9", label: "Prefiro que as coisas permaneçam estáveis" }
      ]
    },
    {
      id: 14,
      question: "Como você demonstra amor e cuidado?",
      options: [
        { value: "type2", label: "Antecipando e atendendo as necessidades dos outros" },
        { value: "type5", label: "Compartilhando conhecimento e insights" },
        { value: "type8", label: "Protegendo e defendendo quem amo" },
        { value: "type4", label: "Sendo autêntico e compartilhando emoções profundas" }
      ]
    },
    {
      id: 15,
      question: "Qual é seu padrão quando está estressado?",
      options: [
        { value: "type1", label: "Fico ainda mais crítico e perfeccionista" },
        { value: "type3", label: "Trabalho compulsivamente para manter a imagem" },
        { value: "type7", label: "Me disperso em muitas atividades" },
        { value: "type9", label: "Procrastino e evito decisões" }
      ]
    },
    {
      id: 16,
      question: "O que mais valoriza em um relacionamento?",
      options: [
        { value: "type6", label: "Lealdade e confiança mútua" },
        { value: "type4", label: "Conexão emocional profunda e autenticidade" },
        { value: "type7", label: "Diversão e aventuras compartilhadas" },
        { value: "type5", label: "Respeito ao espaço pessoal e independência" }
      ]
    },
    {
      id: 17,
      question: "Como você lida com críticas?",
      options: [
        { value: "type3", label: "Me machuca profundamente, mas não demonstro" },
        { value: "type1", label: "Fico defensivo se acho que estão errados" },
        { value: "type8", label: "Confronto diretamente se discordo" },
        { value: "type2", label: "Me pergunto como posso melhorar para agradar" }
      ]
    },
    {
      id: 18,
      question: "Qual é sua maior motivação na vida?",
      options: [
        { value: "type9", label: "Manter harmonia e evitar conflitos" },
        { value: "type5", label: "Compreender o mundo ao meu redor" },
        { value: "type7", label: "Experimentar tudo que a vida oferece" },
        { value: "type1", label: "Fazer o que é certo e correto" }
      ]
    },
    {
      id: 19,
      question: "Como você se comporta em grupos?",
      options: [
        { value: "type2", label: "Foco em harmonizar e cuidar do grupo" },
        { value: "type8", label: "Naturalmente assumo liderança" },
        { value: "type6", label: "Busco me alinhar com outros ou questiono tudo" },
        { value: "type4", label: "Me sinto único mas às vezes deslocado" }
      ]
    },
    {
      id: 20,
      question: "Qual frase mais ressoa com você?",
      options: [
        { value: "type3", label: "O sucesso é a melhor vingança" },
        { value: "type5", label: "Conhecimento é poder" },
        { value: "type7", label: "A vida é uma aventura" },
        { value: "type9", label: "Para que complicar se pode ser simples?" }
      ]
    },
    {
      id: 21,
      question: "Como você se sente em relação às regras e normas?",
      options: [
        { value: "type1", label: "Acredito que regras existem para ser seguidas" },
        { value: "type7", label: "Regras podem ser adaptadas conforme a situação" },
        { value: "type8", label: "Questiono regras que não fazem sentido" },
        { value: "type9", label: "Sigo regras para evitar conflitos" }
      ]
    },
    {
      id: 22,
      question: "O que você mais admira nas pessoas?",
      options: [
        { value: "type2", label: "Generosidade e capacidade de ajudar" },
        { value: "type3", label: "Competência e conquistas" },
        { value: "type4", label: "Autenticidade e profundidade" },
        { value: "type6", label: "Lealdade e confiabilidade" }
      ]
    },
    {
      id: 23,
      question: "Como você lida com elogios?",
      options: [
        { value: "type3", label: "Gosto e me sinto motivado a fazer mais" },
        { value: "type4", label: "Às vezes duvido se são sinceros" },
        { value: "type1", label: "Aprecio quando reconhecem meu esforço" },
        { value: "type5", label: "Fico um pouco desconfortável" }
      ]
    },
    {
      id: 24,
      question: "Qual é sua atitude em relação ao tempo?",
      options: [
        { value: "type1", label: "Pontualidade é essencial" },
        { value: "type7", label: "O tempo voa quando estou me divertindo" },
        { value: "type9", label: "Não me estresso muito com horários" },
        { value: "type8", label: "O tempo é um recurso que deve ser usado eficientemente" }
      ]
    },
    {
      id: 25,
      question: "Como você prefere resolver problemas complexos?",
      options: [
        { value: "type5", label: "Analiso profundamente antes de agir" },
        { value: "type8", label: "Vou direto ao ponto e tomo ação" },
        { value: "type6", label: "Busco conselhos e diferentes perspectivas" },
        { value: "type2", label: "Considero como afetará todas as pessoas envolvadas" }
      ]
    },
    {
      id: 26,
      question: "O que mais te motiva a acordar todos os dias?",
      options: [
        { value: "type7", label: "Todas as possibilidades e experiências do dia" },
        { value: "type1", label: "A oportunidade de fazer algo bem feito" },
        { value: "type2", label: "Poder fazer diferença na vida das pessoas" },
        { value: "type4", label: "Expressar minha autenticidade única" }
      ]
    },
    {
      id: 27,
      question: "Como você se comporta quando está feliz?",
      options: [
        { value: "type7", label: "Compartilho minha alegria com todos" },
        { value: "type2", label: "Fico ainda mais disposto a ajudar outros" },
        { value: "type9", label: "Me sinto em paz e harmonia" },
        { value: "type3", label: "Fico motivado a conquistar ainda mais" }
      ]
    },
    {
      id: 28,
      question: "Qual é sua maior preocupação na vida?",
      options: [
        { value: "type6", label: "Não ter segurança ou apoio suficiente" },
        { value: "type4", label: "Nunca encontrar meu verdadeiro lugar" },
        { value: "type8", label: "Ser controlado ou manipulado" },
        { value: "type5", label: "Não ser capaz o suficiente" }
      ]
    },
    {
      id: 29,
      question: "Como você demonstra que se importa com alguém?",
      options: [
        { value: "type2", label: "Antecipo suas necessidades e ajudo ativamente" },
        { value: "type8", label: "Protejo e defendo essa pessoa" },
        { value: "type5", label: "Compartilho meu tempo e conhecimento" },
        { value: "type9", label: "Estou presente e ofereço minha calma" }
      ]
    },
    {
      id: 30,
      question: "O que você faria se tivesse todo o dinheiro do mundo?",
      options: [
        { value: "type2", label: "Ajudaria a resolver os problemas das pessoas" },
        { value: "type7", label: "Viveria todas as experiências possíveis" },
        { value: "type1", label: "Trabalharia para tornar o mundo mais justo" },
        { value: "type8", label: "Usaria para ter influência e poder positivo" }
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
      navigate('/tests/enneagram/results', { state: { answers } });
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
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
              <h1 className="text-xl font-bold text-gray-900">Teste de Eneagrama</h1>
              <TestHelpButton testId="enneagram" />
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
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800 mb-4">
                Questão {currentQuestion + 1} de {questions.length}
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
                className="flex items-center bg-indigo-600 hover:bg-indigo-700"
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

export default EnneagramTest;
