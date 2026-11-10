
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import TestHelpButton from '@/components/TestHelpButton';

const ThreeAnimalsTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // Seções: 1-9 = Eu Ideal (animal 1), 10-18 = Eu Real (animal 2), 19-27 = Como me veem (animal 3)
  const questions = [
    // --- SEÇÃO 1: EU IDEAL (Quem você gostaria de ser) ---
    {
      id: 1,
      section: "Eu Ideal",
      question: "Qual qualidade você mais gostaria de ter?",
      options: [
        { value: "I_leao", label: "Coragem e liderança natural" },
        { value: "I_golfinho", label: "Inteligência e adaptabilidade" },
        { value: "I_aguia", label: "Visão ampla e liberdade" },
        { value: "I_elefante", label: "Sabedoria e memória marcante" },
        { value: "I_lobo", label: "Lealdade e trabalho em equipe" }
      ]
    },
    {
      id: 2,
      section: "Eu Ideal",
      question: "Se pudesse alcançar qualquer meta, qual seria?",
      options: [
        { value: "I_leao", label: "Liderar e inspirar grandes mudanças" },
        { value: "I_golfinho", label: "Criar soluções inovadoras para problemas complexos" },
        { value: "I_aguia", label: "Ter liberdade total para explorar o mundo" },
        { value: "I_elefante", label: "Construir algo duradouro e significativo" },
        { value: "I_lobo", label: "Formar uma comunidade forte e unida" }
      ]
    },
    {
      id: 3,
      section: "Eu Ideal",
      question: "Que tipo de impacto você gostaria de deixar no mundo?",
      options: [
        { value: "I_leao", label: "Ser lembrado como um líder corajoso" },
        { value: "I_golfinho", label: "Ser conhecido por inteligência e criatividade" },
        { value: "I_aguia", label: "Inspirar outros a sonhar alto" },
        { value: "I_elefante", label: "Deixar um legado de sabedoria" },
        { value: "I_lobo", label: "Ser lembrado pela lealdade e companheirismo" }
      ]
    },
    {
      id: 4,
      section: "Eu Ideal",
      question: "Qual virtude você mais admira nos outros?",
      options: [
        { value: "I_leao", label: "Determinação inabalável" },
        { value: "I_golfinho", label: "Capacidade de se adaptar e inovar" },
        { value: "I_aguia", label: "Independência e perspicácia" },
        { value: "I_elefante", label: "Paciência e resistência" },
        { value: "I_lobo", label: "Fidelidade e cooperação" }
      ]
    },
    {
      id: 5,
      section: "Eu Ideal",
      question: "Seu maior sonho profissional é:",
      options: [
        { value: "I_leao", label: "Estar no topo e guiar pessoas" },
        { value: "I_golfinho", label: "Criar algo revolucionário" },
        { value: "I_aguia", label: "Ter autonomia total na carreira" },
        { value: "I_elefante", label: "Ser referência em minha área" },
        { value: "I_lobo", label: "Trabalhar em uma equipe extraordinária" }
      ]
    },
    {
      id: 6,
      section: "Eu Ideal",
      question: "Como você idealmente resolveria um grande problema?",
      options: [
        { value: "I_leao", label: "Enfrentando diretamente com coragem" },
        { value: "I_golfinho", label: "Usando inteligência e criatividade" },
        { value: "I_aguia", label: "Vendo o problema de uma perspectiva ampla" },
        { value: "I_elefante", label: "Com paciência e persistência" },
        { value: "I_lobo", label: "Reunindo aliados e trabalhando em grupo" }
      ]
    },
    {
      id: 7,
      section: "Eu Ideal",
      question: "Que característica você mais quer desenvolver?",
      options: [
        { value: "I_leao", label: "Presença e autoridade" },
        { value: "I_golfinho", label: "Agilidade mental e comunicação" },
        { value: "I_aguia", label: "Foco e clareza de visão" },
        { value: "I_elefante", label: "Resiliência e profundidade" },
        { value: "I_lobo", label: "Cooperação e senso de comunidade" }
      ]
    },
    {
      id: 8,
      section: "Eu Ideal",
      question: "Qual cenário ideal para o seu futuro?",
      options: [
        { value: "I_leao", label: "Ser um líder respeitado e influente" },
        { value: "I_golfinho", label: "Viver experiências variadas e estimulantes" },
        { value: "I_aguia", label: "Ter liberdade para ir aonde quiser" },
        { value: "I_elefante", label: "Ter uma vida estável e significativa" },
        { value: "I_lobo", label: "Estar sempre cercado de pessoas leais" }
      ]
    },
    {
      id: 9,
      section: "Eu Ideal",
      question: "Se pudesse ser famoso por algo, seria por:",
      options: [
        { value: "I_leao", label: "Atos de bravura e liderança heroica" },
        { value: "I_golfinho", label: "Descobertas científicas ou artísticas" },
        { value: "I_aguia", label: "Explorar territórios desconhecidos" },
        { value: "I_elefante", label: "Contribuições duradouras à sociedade" },
        { value: "I_lobo", label: "Criar laços comunitários profundos" }
      ]
    },
    // --- SEÇÃO 2: EU REAL (Quem você realmente é) ---
    {
      id: 10,
      section: "Eu Real",
      question: "Como você realmente reage quando está sob pressão?",
      options: [
        { value: "R_leao", label: "Fico mais assertivo e tomo a frente" },
        { value: "R_golfinho", label: "Busco soluções criativas e improviso" },
        { value: "R_aguia", label: "Me isolo para pensar com clareza" },
        { value: "R_elefante", label: "Mantenho a calma e aguardo o momento certo" },
        { value: "R_lobo", label: "Busco apoio no meu grupo de confiança" }
      ]
    },
    {
      id: 11,
      section: "Eu Real",
      question: "No dia a dia, como você costuma tomar decisões?",
      options: [
        { value: "R_leao", label: "Rápida e decisivamente" },
        { value: "R_golfinho", label: "Com flexibilidade, me adaptando" },
        { value: "R_aguia", label: "Analisando o cenário completo" },
        { value: "R_elefante", label: "Com cautela e reflexão profunda" },
        { value: "R_lobo", label: "Consultando pessoas importantes para mim" }
      ]
    },
    {
      id: 12,
      section: "Eu Real",
      question: "Como você se comporta em um grupo social?",
      options: [
        { value: "R_leao", label: "Costumo liderar as conversas" },
        { value: "R_golfinho", label: "Sou o animador e conto histórias" },
        { value: "R_aguia", label: "Prefiro observar antes de participar" },
        { value: "R_elefante", label: "Sou calmo e falo quando necessário" },
        { value: "R_lobo", label: "Fico próximo dos meus amigos mais chegados" }
      ]
    },
    {
      id: 13,
      section: "Eu Real",
      question: "Qual é sua atitude diante de um conflito?",
      options: [
        { value: "R_leao", label: "Enfrento e busco resolver logo" },
        { value: "R_golfinho", label: "Tento descontrair e amenizar" },
        { value: "R_aguia", label: "Me afasto para avaliar antes de agir" },
        { value: "R_elefante", label: "Tenho paciência e espero a poeira baixar" },
        { value: "R_lobo", label: "Defendo meu grupo fiercely" }
      ]
    },
    {
      id: 14,
      section: "Eu Real",
      question: "Como você lida com rotina?",
      options: [
        { value: "R_leao", label: "Me canso rápido e busco novos desafios" },
        { value: "R_golfinho", label: "Transformo a rotina em algo divertido" },
        { value: "R_aguia", label: "Aceito desde que tenha espaço para pensar" },
        { value: "R_elefante", label: "Gosto de rotina, me dá segurança" },
        { value: "R_lobo", label: "Prefiro rotina compartilhada com meu time" }
      ]
    },
    {
      id: 15,
      section: "Eu Real",
      question: "Como você realmente se sente sobre mudanças?",
      options: [
        { value: "R_leao", label: "Gosto — são oportunidades de dominar algo novo" },
        { value: "R_golfinho", label: "Adoro — mantém a vida interessante" },
        { value: "R_aguia", label: "Aceito se fazem sentido estratégico" },
        { value: "R_elefante", label: "Prefiro mudanças graduais e bem planejadas" },
        { value: "R_lobo", label: "Aceito se meu grupo também aceitar" }
      ]
    },
    {
      id: 16,
      section: "Eu Real",
      question: "O que você faz quando tem tempo livre inesperado?",
      options: [
        { value: "R_leao", label: "Procuro algo produtivo para fazer" },
        { value: "R_golfinho", label: "Faço algo divertido e espontâneo" },
        { value: "R_aguia", label: "Aproveito para refletir e planejar" },
        { value: "R_elefante", label: "Descanso e recarrego as energias" },
        { value: "R_lobo", label: "Procuro alguém para estar junto" }
      ]
    },
    {
      id: 17,
      section: "Eu Real",
      question: "Qual sua relação real com autoridade?",
      options: [
        { value: "R_leao", label: "Gosto de exercer autoridade" },
        { value: "R_golfinho", label: "Prefiro influenciar sem exercer poder direto" },
        { value: "R_aguia", label: "Respeito autoridade competente" },
        { value: "R_elefante", label: "Sigo as regras e respeito a hierarquia" },
        { value: "R_lobo", label: "Reconheço líderes que cuidam do grupo" }
      ]
    },
    {
      id: 18,
      section: "Eu Real",
      question: "O que mais te estressa no trabalho?",
      options: [
        { value: "R_leao", label: "Não ter controle sobre as decisões" },
        { value: "R_golfinho", label: "Monotonia e falta de estímulo" },
        { value: "R_aguia", label: "Interrupções constantes" },
        { value: "R_elefante", label: "Pressa e mudanças bruscas" },
        { value: "R_lobo", label: "Deslealdade e falta de espírito de equipe" }
      ]
    },
    // --- SEÇÃO 3: COMO OS OUTROS ME VEEM ---
    {
      id: 19,
      section: "Como me Veem",
      question: "O que as pessoas geralmente dizem sobre você?",
      options: [
        { value: "V_leao", label: "Que sou forte e determinado(a)" },
        { value: "V_golfinho", label: "Que sou divertido(a) e comunicativo(a)" },
        { value: "V_aguia", label: "Que sou inteligente e observador(a)" },
        { value: "V_elefante", label: "Que sou calmo(a) e confiável" },
        { value: "V_lobo", label: "Que sou leal e companheiro(a)" }
      ]
    },
    {
      id: 20,
      section: "Como me Veem",
      question: "Qual impressão você acha que causa ao conhecer alguém?",
      options: [
        { value: "V_leao", label: "De alguém confiante e imponente" },
        { value: "V_golfinho", label: "De alguém simpático e acessível" },
        { value: "V_aguia", label: "De alguém reservado mas perspicaz" },
        { value: "V_elefante", label: "De alguém tranquilo e acolhedor" },
        { value: "V_lobo", label: "De alguém protetor e solícito" }
      ]
    },
    {
      id: 21,
      section: "Como me Veem",
      question: "Como seus colegas te descreveriam em uma palavra?",
      options: [
        { value: "V_leao", label: "Decidido(a)" },
        { value: "V_golfinho", label: "Carismático(a)" },
        { value: "V_aguia", label: "Estratégico(a)" },
        { value: "V_elefante", label: "Estável" },
        { value: "V_lobo", label: "Confiável" }
      ]
    },
    {
      id: 22,
      section: "Como me Veem",
      question: "Em um grupo, as pessoas costumam procurá-lo(a) para:",
      options: [
        { value: "V_leao", label: "Tomar decisões difíceis" },
        { value: "V_golfinho", label: "Animar o ambiente e motivar" },
        { value: "V_aguia", label: "Dar conselhos estratégicos" },
        { value: "V_elefante", label: "Oferecer apoio emocional" },
        { value: "V_lobo", label: "Ajudar e colaborar em tarefas" }
      ]
    },
    {
      id: 23,
      section: "Como me Veem",
      question: "Que tipo de líder as pessoas acham que você é?",
      options: [
        { value: "V_leao", label: "Líder forte e direto" },
        { value: "V_golfinho", label: "Líder inspirador e motivador" },
        { value: "V_aguia", label: "Líder visionário e analítico" },
        { value: "V_elefante", label: "Líder calmo e ponderado" },
        { value: "V_lobo", label: "Líder democrático e protetor" }
      ]
    },
    {
      id: 24,
      section: "Como me Veem",
      question: "Qual crítica construtiva você mais recebe?",
      options: [
        { value: "V_leao", label: "Que às vezes sou autoritário(a) demais" },
        { value: "V_golfinho", label: "Que às vezes sou disperso(a)" },
        { value: "V_aguia", label: "Que às vezes sou distante ou frio(a)" },
        { value: "V_elefante", label: "Que às vezes sou lento(a) para decidir" },
        { value: "V_lobo", label: "Que às vezes sou possessivo(a) com o grupo" }
      ]
    },
    {
      id: 25,
      section: "Como me Veem",
      question: "Qual elogio você recebe com mais frequência?",
      options: [
        { value: "V_leao", label: "Que sou corajoso(a) e decisivo(a)" },
        { value: "V_golfinho", label: "Que sou uma pessoa incrível de se conviver" },
        { value: "V_aguia", label: "Que tenho uma mente brilhante" },
        { value: "V_elefante", label: "Que transmito paz e segurança" },
        { value: "V_lobo", label: "Que sou um(a) amigo(a) para todas as horas" }
      ]
    },
    {
      id: 26,
      section: "Como me Veem",
      question: "Como as pessoas reagem quando você entra numa sala?",
      options: [
        { value: "V_leao", label: "Sentem respeito e atenção" },
        { value: "V_golfinho", label: "Ficam mais animadas e alegres" },
        { value: "V_aguia", label: "Sentem curiosidade sobre o que vou dizer" },
        { value: "V_elefante", label: "Sentem conforto e tranquilidade" },
        { value: "V_lobo", label: "Sentem segurança e acolhimento" }
      ]
    },
    {
      id: 27,
      section: "Como me Veem",
      question: "Ao trabalhar em equipe, os outros te veem como:",
      options: [
        { value: "V_leao", label: "A pessoa que toma a frente e decide" },
        { value: "V_golfinho", label: "A pessoa que traz energia e boas ideias" },
        { value: "V_aguia", label: "A pessoa que tem a visão do todo" },
        { value: "V_elefante", label: "A pessoa que mantém tudo estável" },
        { value: "V_lobo", label: "A pessoa que une e protege o grupo" }
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
      navigate('/tests/three-animals/results', { state: { answers } });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentAnswer = answers[currentQuestion];
  const currentSec = questions[currentQuestion].section;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate('/ferramentas')} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Teste dos 3 Animais</h1>
              <TestHelpButton testId="three-animals" />
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
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-800 mb-2">
                {currentSec}
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
              <Button onClick={handleNext} disabled={!currentAnswer} className="flex items-center bg-emerald-600 hover:bg-emerald-700">
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

export default ThreeAnimalsTest;
