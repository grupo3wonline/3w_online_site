import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Target, 
  Keyboard, 
  RefreshCw, 
  BookOpen,
  Zap,
  TrendingUp,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Award
} from "lucide-react";

interface ExerciseData {
  wpm: number;
  accuracy: number;
  errors: number;
  timeSpent: number;
}

const Practice = () => {
  const { toast } = useToast();
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [currentText, setCurrentText] = useState("");
  const [typedText, setTypedText] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [errors, setErrors] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);

  // Exercise data
  const letterDrills = [
    { 
      letter: "A", 
      words: ["casa", "água", "amor", "ano", "arte", "alta", "ação", "ainda", "antes", "assim"],
      description: "Pratique a letra A - dedo mindinho esquerdo"
    },
    { 
      letter: "S", 
      words: ["sol", "som", "ser", "sua", "sobre", "sem", "sempre", "sistema", "social", "segundo"],
      description: "Pratique a letra S - dedo anular esquerdo"
    },
    { 
      letter: "D", 
      words: ["dia", "dez", "dar", "dois", "depois", "dizer", "dentro", "direito", "durante", "dados"],
      description: "Pratique a letra D - dedo médio esquerdo"
    },
    { 
      letter: "F", 
      words: ["faz", "fim", "foi", "fora", "fazer", "forma", "família", "força", "função", "frente"],
      description: "Pratique a letra F - dedo indicador esquerdo"
    },
    { 
      letter: "G", 
      words: ["gente", "grande", "grupo", "governo", "geral", "guerra", "guardar", "ganhar", "gosto", "grau"],
      description: "Pratique a letra G - dedo indicador esquerdo"
    },
    { 
      letter: "H", 
      words: ["hoje", "hora", "homem", "história", "hospital", "hotel", "humor", "honesto", "habitar", "herói"],
      description: "Pratique a letra H - dedo indicador direito"
    }
  ];

  const commonWords = [
    "que", "não", "uma", "tem", "para", "com", "todo", "ela", "seu", "fazer",
    "quando", "muito", "nos", "já", "está", "minha", "são", "foi", "isso", "ele",
    "entre", "poder", "depois", "grande", "estado", "ainda", "mesmo", "vida", "tempo", "pode"
  ];

  const difficultCombinations = [
    "qu", "nh", "lh", "rr", "ss", "ch", "tr", "pr", "br", "cr", "gr", "fl",
    "bl", "cl", "dr", "fr", "pl", "gl", "st", "sc", "sp", "sm", "sn", "sw"
  ];

  const practiceTexts = [
    "A prática diária da digitação melhora significativamente a velocidade e precisão dos movimentos dos dedos.",
    "O desenvolvimento de habilidades no teclado requer paciência, dedicação constante e exercícios regulares.",
    "Exercícios estruturados fortalecem a memória muscular dos dedos e aumentam a confiança na digitação.",
    "A concentração e foco são fundamentais para o aprendizado eficaz da arte de digitar com maestria."
  ];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && activeExercise) {
      interval = setInterval(() => {
        setTimeElapsed(time => time + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, activeExercise]);

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
    if (!isActive && activeExercise) {
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
      setExerciseCompleted(true);
      toast({
        title: "Exercício Concluído!",
        description: `WPM: ${wpm}, Precisão: ${accuracy}%`,
      });
    }
  };

  // Start exercise
  const startExercise = (type: string, content?: string) => {
    setActiveExercise(type);
    setTypedText("");
    setTimeElapsed(0);
    setErrors(0);
    setWpm(0);
    setAccuracy(100);
    setIsActive(false);
    setExerciseCompleted(false);

    if (content) {
      setCurrentText(content);
    } else {
      // Generate content based on type
      if (type.startsWith("letter-")) {
        const letter = type.split("-")[1];
        const drill = letterDrills.find(d => d.letter === letter);
        if (drill) {
          setCurrentText(drill.words.join(" "));
        }
      } else if (type === "words") {
        setCurrentText(commonWords.join(" "));
      } else if (type === "combinations") {
        const combWords = difficultCombinations.map(combo => 
          `${combo}${combo} ${combo}ato ${combo}ema`
        ).join(" ");
        setCurrentText(combWords);
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
    setExerciseCompleted(false);
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                <Target className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Exercícios de Prática
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Exercícios personalizados para melhorar suas habilidades específicas
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Exercise Area */}
        {activeExercise && (
          <div className="mb-8">
            <Card className="feature-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Exercício Ativo</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsActive(!isActive)}
                      disabled={exerciseCompleted || !typedText.length}
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

                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progresso</span>
                    <span>{Math.round((typedText.length / currentText.length) * 100)}%</span>
                  </div>
                  <Progress value={(typedText.length / currentText.length) * 100} className="h-2" />
                </div>

                {/* Text Display */}
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="typing-text leading-relaxed">
                    {renderText()}
                  </div>
                </div>

                {/* Input Area */}
                <textarea
                  value={typedText}
                  onChange={handleInputChange}
                  disabled={exerciseCompleted}
                  placeholder="Digite o texto acima..."
                  className="w-full h-32 p-4 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent typing-text"
                />

                {exerciseCompleted && (
                  <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                    <div className="flex items-center space-x-2 text-success font-semibold">
                      <Award className="h-5 w-5" />
                      <span>Exercício Concluído!</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="feature-card">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-success mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-success">28</h3>
              <p className="text-muted-foreground">PPM Médio</p>
            </CardContent>
          </Card>
          
          <Card className="feature-card">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-primary">92%</h3>
              <p className="text-muted-foreground">Precisão</p>
            </CardContent>
          </Card>
          
          <Card className="feature-card">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-warning mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-warning">15</h3>
              <p className="text-muted-foreground">Exercícios Hoje</p>
            </CardContent>
          </Card>
          
          <Card className="feature-card">
            <CardContent className="p-6 text-center">
              <RefreshCw className="h-8 w-8 text-error mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-error">Q, X</h3>
              <p className="text-muted-foreground">Letras Difíceis</p>
            </CardContent>
          </Card>
        </div>

        {/* Practice Tabs */}
        <Tabs defaultValue="letters" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="letters" className="flex items-center space-x-2">
              <Keyboard className="h-4 w-4" />
              <span>Letras</span>
            </TabsTrigger>
            <TabsTrigger value="words" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Palavras</span>
            </TabsTrigger>
            <TabsTrigger value="combinations" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Combinações</span>
            </TabsTrigger>
            <TabsTrigger value="texts" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Textos</span>
            </TabsTrigger>
          </TabsList>

          {/* Letter Practice */}
          <TabsContent value="letters" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold gradient-text mb-4">
                Prática por Letras
              </h2>
              <p className="text-xl text-muted-foreground">
                Foque em letras específicas para melhorar a precisão
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {letterDrills.map((drill) => (
                <Card key={drill.letter} className="feature-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Letra {drill.letter}</span>
                      <Badge variant="outline">{drill.words.length} palavras</Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{drill.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {drill.words.slice(0, 6).map((word, index) => (
                        <div 
                          key={index} 
                          className="p-2 bg-muted/30 rounded text-center font-mono hover:bg-muted/50 transition-colors"
                        >
                          {word}
                        </div>
                      ))}
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => startExercise(`letter-${drill.letter}`)}
                    >
                      Praticar Letra {drill.letter}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Word Practice */}
          <TabsContent value="words" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold gradient-text mb-4">
                Palavras Comuns
              </h2>
              <p className="text-xl text-muted-foreground">
                Pratique as palavras mais usadas no português
              </p>
            </div>
            
            <Card className="feature-card">
              <CardHeader>
                <CardTitle>Palavras Frequentes</CardTitle>
                <p className="text-muted-foreground">
                  Digite as palavras mais comuns para ganhar fluência
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
                  {commonWords.slice(0, 15).map((word, index) => (
                    <div 
                      key={index}
                      className="p-3 bg-muted/30 rounded-lg text-center font-mono hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      {word}
                    </div>
                  ))}
                </div>
                <Button 
                  className="w-full"
                  onClick={() => startExercise("words")}
                >
                  Iniciar Prática de Palavras
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Combination Practice */}
          <TabsContent value="combinations" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold gradient-text mb-4">
                Combinações Difíceis
              </h2>
              <p className="text-xl text-muted-foreground">
                Domine as combinações de letras mais desafiadoras
              </p>
            </div>
            
            <Card className="feature-card">
              <CardHeader>
                <CardTitle>Dígrafos e Combinações</CardTitle>
                <p className="text-muted-foreground">
                  Pratique combinações que costumam gerar dificuldades
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
                  {difficultCombinations.map((combo, index) => (
                    <div 
                      key={index}
                      className="p-4 bg-muted/30 rounded-lg text-center font-mono text-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      {combo}
                    </div>
                  ))}
                </div>
                <Button 
                  className="w-full"
                  onClick={() => startExercise("combinations")}
                >
                  Praticar Combinações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Text Practice */}
          <TabsContent value="texts" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold gradient-text mb-4">
                Textos Completos
              </h2>
              <p className="text-xl text-muted-foreground">
                Desenvolva fluência com textos reais e contextualizados
              </p>
            </div>
            
            <div className="space-y-6">
              {practiceTexts.map((text, index) => (
                <Card key={index} className="feature-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Texto {index + 1}</span>
                      <Badge variant="outline">{text.length} caracteres</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-muted/30 rounded-lg mb-4 font-mono text-sm leading-relaxed">
                      {text}
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => startExercise(`text-${index}`, text)}
                    >
                      Praticar Este Texto
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Practice;