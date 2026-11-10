import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Timer, 
  RotateCcw, 
  Play, 
  Pause, 
  Award,
  Target,
  Zap,
  TrendingUp
} from "lucide-react";

const SpeedTest = () => {
  const [testDuration, setTestDuration] = useState(60); // seconds
  const [timeLeft, setTimeLeft] = useState(testDuration);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [typedText, setTypedText] = useState("");
  const [errors, setErrors] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const sampleTexts = [
    "O rápido desenvolvimento da tecnologia moderna transformou completamente nossa maneira de viver, trabalhar e nos comunicarmos uns com os outros.",
    "A prática constante da digitação é fundamental para aumentar a velocidade e a precisão na escrita digital.",
    "Dominar o teclado permite maior produtividade no trabalho e facilita a expressão de ideias através da escrita.",
    "A concentração e a paciência são qualidades essenciais para o aprendizado eficaz da digitação rápida e precisa."
  ];

  const durations = [
    { value: 30, label: "30 segundos" },
    { value: 60, label: "1 minuto" },
    { value: 120, label: "2 minutos" },
    { value: 300, label: "5 minutos" }
  ];

  useEffect(() => {
    // Initialize with random text
    setCurrentText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setIsComplete(true);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const calculateStats = useCallback(() => {
    const timeElapsed = (testDuration - timeLeft) / 60; // in minutes
    const wordsTyped = typedText.length / 5; // standard: 5 characters = 1 word
    const currentWpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
    const currentAccuracy = typedText.length > 0 ? Math.round(((typedText.length - errors) / typedText.length) * 100) : 100;
    
    setWpm(currentWpm);
    setAccuracy(currentAccuracy);
  }, [testDuration, timeLeft, typedText.length, errors]);

  useEffect(() => {
    calculateStats();
  }, [calculateStats]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isActive && !isComplete) {
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
  };

  const resetTest = () => {
    setIsActive(false);
    setIsComplete(false);
    setTimeLeft(testDuration);
    setTypedText("");
    setErrors(0);
    setWpm(0);
    setAccuracy(100);
    setCurrentText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
  };

  const togglePause = () => {
    setIsActive(!isActive);
  };

  const changeDuration = (duration: number) => {
    if (!isActive) {
      setTestDuration(duration);
      setTimeLeft(duration);
    }
  };

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

  const progress = ((testDuration - timeLeft) / testDuration) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                <Timer className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Teste de Velocidade
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Meça sua velocidade e precisão na digitação
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Controls */}
        <div className="mb-8">
          <Card className="feature-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Timer className="h-5 w-5" />
                <span>Configurações do Teste</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-2">
                  {durations.map((duration) => (
                    <Button
                      key={duration.value}
                      variant={testDuration === duration.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => changeDuration(duration.value)}
                      disabled={isActive}
                    >
                      {duration.label}
                    </Button>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={togglePause}
                    disabled={!typedText.length || isComplete}
                  >
                    {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetTest}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="feature-card">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-primary">{wpm}</h3>
              <p className="text-muted-foreground">PPM</p>
            </CardContent>
          </Card>
          
          <Card className="feature-card">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-success mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-success">{accuracy}%</h3>
              <p className="text-muted-foreground">Precisão</p>
            </CardContent>
          </Card>
          
          <Card className="feature-card">
            <CardContent className="p-6 text-center">
              <Timer className="h-8 w-8 text-warning mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-warning">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </h3>
              <p className="text-muted-foreground">Tempo</p>
            </CardContent>
          </Card>
          
          <Card className="feature-card">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-error mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-error">{errors}</h3>
              <p className="text-muted-foreground">Erros</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span>Progresso do Teste</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Typing Area */}
        <div className="space-y-6">
          <Card className="feature-card">
            <CardHeader>
              <CardTitle>Texto para Digitação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-muted/30 rounded-lg typing-text leading-relaxed">
                {renderText()}
              </div>
            </CardContent>
          </Card>

          <Card className="feature-card">
            <CardHeader>
              <CardTitle>Digite Aqui</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={typedText}
                onChange={handleInputChange}
                disabled={isComplete}
                placeholder="Comece a digitar para iniciar o teste..."
                className="w-full h-32 p-4 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent typing-text"
              />
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        {isComplete && (
          <div className="mt-8">
            <Card className="feature-card border-success/20 bg-success/5">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-success">
                  <Award className="h-6 w-6" />
                  <span>Teste Concluído!</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Seus Resultados:</h4>
                    <ul className="space-y-1 text-sm">
                      <li>Velocidade: <span className="font-semibold">{wpm} PPM</span></li>
                      <li>Precisão: <span className="font-semibold">{accuracy}%</span></li>
                      <li>Erros: <span className="font-semibold">{errors}</span></li>
                      <li>Caracteres: <span className="font-semibold">{typedText.length}</span></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Avaliação:</h4>
                    <div className="space-y-2">
                      {wpm >= 40 && (
                        <Badge className="bg-success/10 text-success">Excelente Velocidade!</Badge>
                      )}
                      {wpm >= 25 && wpm < 40 && (
                        <Badge className="bg-warning/10 text-warning">Boa Velocidade</Badge>
                      )}
                      {wpm < 25 && (
                        <Badge className="bg-error/10 text-error">Continue Praticando</Badge>
                      )}
                      
                      {accuracy >= 95 && (
                        <Badge className="bg-success/10 text-success">Precisão Excelente!</Badge>
                      )}
                      {accuracy >= 85 && accuracy < 95 && (
                        <Badge className="bg-warning/10 text-warning">Boa Precisão</Badge>
                      )}
                      {accuracy < 85 && (
                        <Badge className="bg-error/10 text-error">Foque na Precisão</Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button onClick={resetTest}>
                    Fazer Novo Teste
                  </Button>
                  <Button variant="outline">
                    Compartilhar Resultado
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeedTest;