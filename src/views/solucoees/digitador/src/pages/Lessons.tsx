import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, 
  Lock, 
  CheckCircle, 
  PlayCircle, 
  Star,
  Award,
  Clock,
  Keyboard,
  Target,
  ArrowRight,
  RotateCcw,
  Play,
  Pause
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

interface LessonContent {
  id: number;
  title: string;
  description: string;
  keys: string[];
  exercises: string[];
  instructions: string[];
}

const Lessons = () => {
  const { lessonId } = useParams();
  const { toast } = useToast();
  const [selectedLesson, setSelectedLesson] = useState<LessonContent | null>(null);
  const [currentText, setCurrentText] = useState("");
  const [typedText, setTypedText] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [errors, setErrors] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);

  const lessons = [
    {
      id: 1,
      title: "Posição Básica dos Dedos",
      description: "Aprenda a posição correta das mãos no teclado",
      level: "Iniciante",
      duration: "15 min",
      completed: true,
      locked: false,
      difficulty: 1,
      progress: 100
    },
    {
      id: 2,
      title: "Teclas Base (ASDF - JKL;)",
      description: "Domine as teclas da linha base do teclado",
      level: "Iniciante",
      duration: "20 min", 
      completed: true,
      locked: false,
      difficulty: 1,
      progress: 100
    },
    {
      id: 3,
      title: "Linha Superior (QWERTY - UIOP)",
      description: "Pratique as letras da linha superior",
      level: "Iniciante",
      duration: "25 min",
      completed: false,
      locked: false,
      difficulty: 2,
      progress: 45
    },
    {
      id: 4,
      title: "Linha Inferior (ZXCV - BNM)",
      description: "Complete o alfabeto com a linha inferior",
      level: "Iniciante",
      duration: "25 min",
      completed: false,
      locked: false,
      difficulty: 2,
      progress: 0
    },
    {
      id: 5,
      title: "Números e Símbolos",
      description: "Adicione números e símbolos básicos",
      level: "Intermediário",
      duration: "30 min",
      completed: false,
      locked: true,
      difficulty: 3,
      progress: 0
    },
    {
      id: 6,
      title: "Pontuação e Acentos",
      description: "Domine a pontuação em português",
      level: "Intermediário", 
      duration: "35 min",
      completed: false,
      locked: true,
      difficulty: 3,
      progress: 0
    },
    {
      id: 7,
      title: "Palavras Comuns",
      description: "Pratique palavras frequentes do português",
      level: "Intermediário",
      duration: "40 min",
      completed: false,
      locked: true,
      difficulty: 4,
      progress: 0
    },
    {
      id: 8,
      title: "Frases e Textos",
      description: "Digite frases completas com fluidez",
      level: "Avançado",
      duration: "45 min",
      completed: false,
      locked: true,
      difficulty: 5,
      progress: 0
    }
  ];

  const lessonContents: { [key: number]: LessonContent } = {
    1: {
      id: 1,
      title: "Posição Básica dos Dedos",
      description: "Posição fundamental para uma digitação eficiente",
      keys: ["F", "J"],
      exercises: [
        "f j f j f j f j",
        "ff jj ff jj ff jj",
        "fjf jfj fjf jfj"
      ],
      instructions: [
        "Coloque os dedos indicadores nas teclas F e J",
        "Sinta os pequenos relevos nessas teclas",
        "Mantenha os outros dedos nas teclas adjacentes",
        "Pratique alternar entre F e J suavemente"
      ]
    },
    2: {
      id: 2,
      title: "Teclas Base (ASDF - JKL;)",
      description: "Domine a linha base do teclado",
      keys: ["A", "S", "D", "F", "J", "K", "L", ";"],
      exercises: [
        "asdf jkl; asdf jkl;",
        "aaa sss ddd fff jjj kkk lll ;;;",
        "asdf fdsa jkl; ;lkj",
        "fads fads jkl; ;lkj",
        "ask ask lad lad"
      ],
      instructions: [
        "Mão esquerda: mindinho (A), anular (S), médio (D), indicador (F)",
        "Mão direita: indicador (J), médio (K), anular (L), mindinho (;)",
        "Digite sem olhar para o teclado",
        "Mantenha um ritmo constante"
      ]
    },
    3: {
      id: 3,
      title: "Linha Superior (QWERTY - UIOP)",
      description: "Pratique as letras da linha superior",
      keys: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      exercises: [
        "qwert yuiop qwert yuiop",
        "qqq www eee rrr ttt yyy uuu iii ooo ppp",
        "qwer rewq yuio oiuy",
        "tret tret yuty yuty",
        "quit quit type type"
      ],
      instructions: [
        "Use os mesmos dedos da linha base para alcançar as teclas superiores",
        "Mindinho esquerdo para Q, anular para W, etc.",
        "Mantenha a posição base após cada tecla",
        "Pratique palavras simples"
      ]
    },
    4: {
      id: 4,
      title: "Linha Inferior (ZXCV - BNM)",
      description: "Complete o alfabeto com a linha inferior",
      keys: ["Z", "X", "C", "V", "B", "N", "M"],
      exercises: [
        "zxcv bnm zxcv bnm",
        "zzz xxx ccc vvv bbb nnn mmm",
        "zxcv vcxz bnm mnb",
        "cave cave bomb bomb",
        "zen zen mix mix"
      ],
      instructions: [
        "Use os dedos da linha base para alcançar para baixo",
        "Mindinho esquerdo para Z, anular para X, etc.",
        "Polegar direito para espaço",
        "Pratique palavras com todas as linhas"
      ]
    }
  };

  // Load lesson if lessonId is provided
  useEffect(() => {
    if (lessonId) {
      const id = parseInt(lessonId);
      const content = lessonContents[id];
      if (content) {
        setSelectedLesson(content);
        setCurrentText(content.exercises[0]);
        setCurrentExercise(0);
      }
    }
  }, [lessonId]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && selectedLesson) {
      interval = setInterval(() => {
        setTimeElapsed(time => time + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, selectedLesson]);

  // Calculate stats
  const calculateStats = useCallback(() => {
    if (timeElapsed > 0) {
      const wordsTyped = typedText.length / 5;
      const timeInMinutes = timeElapsed / 60;
      const currentWpm = Math.round(wordsTyped / timeInMinutes);
      const currentAccuracy = typedText.length > 0 ? Math.round(((typedText.length - errors) / typedText.length) * 100) : 100;
      
      setWpm(currentWpm);
      setAccuracy(currentAccuracy);
    }
  }, [timeElapsed, typedText.length, errors]);

  useEffect(() => {
    calculateStats();
  }, [calculateStats]);

  // Handle typing
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isActive && selectedLesson) {
      setIsActive(true);
    }
    
    const value = e.target.value;
    setTypedText(value);
    
    // Count errors
    let errorCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== currentText[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);

    // Check if exercise is completed
    if (value === currentText && value.length > 0) {
      setIsActive(false);
      
      if (currentExercise < selectedLesson.exercises.length - 1) {
        toast({
          title: "Exercício Concluído!",
          description: "Passando para o próximo exercício...",
        });
        
        setTimeout(() => {
          const nextExercise = currentExercise + 1;
          setCurrentExercise(nextExercise);
          setCurrentText(selectedLesson.exercises[nextExercise]);
          setTypedText("");
          setTimeElapsed(0);
          setErrors(0);
        }, 1500);
      } else {
        setLessonCompleted(true);
        toast({
          title: "Lição Concluída!",
          description: `WPM: ${wpm}, Precisão: ${accuracy}%`,
        });
      }
    }
  };

  // Reset exercise
  const resetExercise = () => {
    setTypedText("");
    setTimeElapsed(0);
    setErrors(0);
    setWpm(0);
    setAccuracy(100);
    setIsActive(false);
  };

  // Render text with highlighting
  const renderText = () => {
    return currentText.split('').map((char, index) => {
      let className = '';
      
      if (index < typedText.length) {
        className = typedText[index] === char 
          ? 'typing-char-correct' 
          : 'typing-char-incorrect';
      } else if (index === typedText.length) {
        className = 'typing-char-current';
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Iniciante":
        return "bg-success/10 text-success";
      case "Intermediário":
        return "bg-warning/10 text-warning";
      case "Avançado":
        return "bg-error/10 text-error";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < difficulty 
            ? "fill-yellow-400 text-yellow-400" 
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  // If lesson is selected, show lesson interface
  if (selectedLesson) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-gradient-primary text-primary-foreground py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <BookOpen className="h-12 w-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {selectedLesson.title}
              </h1>
              <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                {selectedLesson.description}
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <div className="mb-8">
            <Link to="/lessons">
              <Button variant="outline" className="flex items-center space-x-2">
                <ArrowRight className="h-4 w-4 rotate-180" />
                <span>Voltar às Lições</span>
              </Button>
            </Link>
          </div>

          {/* Lesson Progress */}
          <div className="mb-8">
            <Card className="feature-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Progresso da Lição</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsActive(!isActive)}
                      disabled={lessonCompleted || !typedText.length}
                    >
                      {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetExercise}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Exercício {currentExercise + 1} de {selectedLesson.exercises.length}</span>
                    <span>{Math.round(((currentExercise + (typedText.length / currentText.length)) / selectedLesson.exercises.length) * 100)}%</span>
                  </div>
                  <Progress value={((currentExercise + (typedText.length / currentText.length)) / selectedLesson.exercises.length) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Instruções</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selectedLesson.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-primary font-semibold">{index + 1}.</span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Key Display */}
          <div className="mb-8">
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Keyboard className="h-5 w-5" />
                  <span>Teclas desta Lição</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {selectedLesson.keys.map((key, index) => (
                    <div 
                      key={index}
                      className="w-12 h-12 bg-muted/30 rounded-lg flex items-center justify-center font-mono text-lg font-semibold border-2 border-muted"
                    >
                      {key}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Exercise Area */}
          <div className="mb-8">
            <Card className="feature-card">
              <CardHeader>
                <CardTitle>Exercício {currentExercise + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{wpm}</div>
                    <div className="text-sm text-muted-foreground">PPM</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{accuracy}%</div>
                    <div className="text-sm text-muted-foreground">Precisão</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-error">{errors}</div>
                    <div className="text-sm text-muted-foreground">Erros</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">
                      {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
                    </div>
                    <div className="text-sm text-muted-foreground">Tempo</div>
                  </div>
                </div>

                {/* Text Display */}
                <div className="p-6 bg-muted/30 rounded-lg">
                  <div className="typing-text text-xl leading-relaxed text-center">
                    {renderText()}
                  </div>
                </div>

                {/* Input Area */}
                <textarea
                  value={typedText}
                  onChange={handleInputChange}
                  disabled={lessonCompleted}
                  placeholder="Digite o texto acima..."
                  className="w-full h-24 p-4 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent typing-text text-lg"
                />

                {lessonCompleted && (
                  <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-success font-semibold">
                        <Award className="h-5 w-5" />
                        <span>Lição Concluída!</span>
                      </div>
                      <Link to="/lessons">
                        <Button>
                          Próxima Lição
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Default lessons overview
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                <BookOpen className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Lições de Digitação
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Aprenda a digitar passo a passo, do básico ao avançado
            </p>
          </div>
        </div>
      </section>

      {/* Progress Overview */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="feature-card">
              <CardContent className="p-6 text-center">
                <Award className="h-8 w-8 text-success mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-success">2</h3>
                <p className="text-muted-foreground">Lições Concluídas</p>
              </CardContent>
            </Card>
            
            <Card className="feature-card">
              <CardContent className="p-6 text-center">
                <PlayCircle className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-primary">1</h3>
                <p className="text-muted-foreground">Em Progresso</p>
              </CardContent>
            </Card>
            
            <Card className="feature-card">
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-warning mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-warning">3h 15min</h3>
                <p className="text-muted-foreground">Tempo Total</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Lessons Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold gradient-text mb-4">
              Seu Progresso de Aprendizado
            </h2>
            <p className="text-xl text-muted-foreground">
              Complete as lições em ordem para desbloquear novos desafios
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {lessons.map((lesson) => (
              <Card 
                key={lesson.id} 
                className={`feature-card relative overflow-hidden ${
                  lesson.locked 
                    ? "opacity-60" 
                    : "hover:scale-105 transition-transform"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getLevelColor(lesson.level)}>
                      {lesson.level}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {getDifficultyStars(lesson.difficulty)}
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg leading-6">
                    {lesson.title}
                  </CardTitle>
                  
                  <p className="text-muted-foreground text-sm">
                    {lesson.description}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progresso</span>
                        <span>{lesson.progress}%</span>
                      </div>
                      <Progress value={lesson.progress} className="h-2" />
                    </div>

                    {/* Duration and Status */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {lesson.duration}
                      </div>
                      
                      {lesson.completed && (
                        <CheckCircle className="h-4 w-4 text-success" />
                      )}
                      
                      {lesson.locked && (
                        <Lock className="h-4 w-4" />
                      )}
                    </div>

                    {/* Action Button */}
                    <Link to={`/lesson/${lesson.id}`}>
                      <Button 
                        className="w-full" 
                        disabled={lesson.locked}
                        variant={lesson.completed ? "outline" : "default"}
                      >
                        {lesson.locked 
                          ? "Bloqueado" 
                          : lesson.completed 
                            ? "Revisar" 
                            : lesson.progress > 0 
                              ? "Continuar" 
                              : "Começar"
                        }
                      </Button>
                    </Link>
                  </div>
                </CardContent>

                {/* Completion Overlay */}
                {lesson.completed && (
                  <div className="absolute top-4 right-4">
                    <div className="p-1 bg-success rounded-full">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Lessons;