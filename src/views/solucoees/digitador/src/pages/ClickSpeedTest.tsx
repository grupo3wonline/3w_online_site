import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  MousePointer, 
  RotateCcw, 
  Play, 
  Pause, 
  Award,
  Target,
  Zap,
  Timer
} from "lucide-react";

const ClickSpeedTest = () => {
  const [testDuration, setTestDuration] = useState(10); // seconds
  const [timeLeft, setTimeLeft] = useState(testDuration);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [clicksPerSecond, setClicksPerSecond] = useState(0);
  const [maxCPS, setMaxCPS] = useState(0);
  const [clickHistory, setClickHistory] = useState<number[]>([]);

  const durations = [
    { value: 5, label: "5 segundos" },
    { value: 10, label: "10 segundos" },
    { value: 15, label: "15 segundos" },
    { value: 30, label: "30 segundos" }
  ];

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
    const timeElapsed = testDuration - timeLeft;
    const currentCPS = timeElapsed > 0 ? clicks / timeElapsed : 0;
    
    setClicksPerSecond(Math.round(currentCPS * 100) / 100);
    
    // Track max CPS during the test
    if (currentCPS > maxCPS) {
      setMaxCPS(Math.round(currentCPS * 100) / 100);
    }
  }, [testDuration, timeLeft, clicks, maxCPS]);

  useEffect(() => {
    calculateStats();
  }, [calculateStats]);

  const handleClick = () => {
    if (!isActive && !isComplete) {
      setIsActive(true);
    }
    
    if (isActive) {
      setClicks(prev => prev + 1);
      setClickHistory(prev => [...prev, Date.now()]);
    }
  };

  const resetTest = () => {
    setIsActive(false);
    setIsComplete(false);
    setTimeLeft(testDuration);
    setClicks(0);
    setClicksPerSecond(0);
    setMaxCPS(0);
    setClickHistory([]);
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

  const progress = ((testDuration - timeLeft) / testDuration) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                <MousePointer className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Teste de Velocidade de Clique
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Teste sua velocidade de clique do mouse
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
                    disabled={!clicks || isComplete}
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
              <MousePointer className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-primary">{clicks}</h3>
              <p className="text-muted-foreground">Cliques</p>
            </CardContent>
          </Card>
          
          <Card className="feature-card">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-success mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-success">{clicksPerSecond}</h3>
              <p className="text-muted-foreground">CPS Atual</p>
            </CardContent>
          </Card>
          
          <Card className="feature-card">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-warning mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-warning">{maxCPS}</h3>
              <p className="text-muted-foreground">CPS Máximo</p>
            </CardContent>
          </Card>
          
          <Card className="feature-card">
            <CardContent className="p-6 text-center">
              <Timer className="h-8 w-8 text-error mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-error">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </h3>
              <p className="text-muted-foreground">Tempo</p>
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

        {/* Click Area */}
        <div className="mb-8">
          <Card className="feature-card">
            <CardHeader>
              <CardTitle>Área de Clique</CardTitle>
              <p className="text-sm text-muted-foreground">
                {!isActive && !isComplete && "Clique no botão abaixo para começar o teste"}
                {isActive && "Continue clicando o mais rápido possível!"}
                {isComplete && "Teste concluído! Veja seus resultados abaixo."}
              </p>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button
                onClick={handleClick}
                disabled={isComplete}
                size="lg"
                className="w-64 h-64 rounded-full text-2xl font-bold hover:scale-105 transition-transform duration-150 active:scale-95"
                variant={isActive ? "default" : "outline"}
              >
                <div className="flex flex-col items-center space-y-4">
                  <MousePointer className="h-16 w-16" />
                  <span>CLIQUE AQUI</span>
                  <span className="text-sm font-normal">
                    {isActive ? `${clicks} cliques` : "Começar teste"}
                  </span>
                </div>
              </Button>
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
                      <li>Total de Cliques: <span className="font-semibold">{clicks}</span></li>
                      <li>CPS Médio: <span className="font-semibold">{(clicks / testDuration).toFixed(2)}</span></li>
                      <li>CPS Máximo: <span className="font-semibold">{maxCPS}</span></li>
                      <li>Duração: <span className="font-semibold">{testDuration}s</span></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Avaliação:</h4>
                    <div className="space-y-2">
                      {clicks / testDuration >= 8 && (
                        <Badge className="bg-success/10 text-success">Clique Extremamente Rápido!</Badge>
                      )}
                      {clicks / testDuration >= 6 && clicks / testDuration < 8 && (
                        <Badge className="bg-success/10 text-success">Clique Muito Rápido!</Badge>
                      )}
                      {clicks / testDuration >= 4 && clicks / testDuration < 6 && (
                        <Badge className="bg-warning/10 text-warning">Clique Rápido</Badge>
                      )}
                      {clicks / testDuration < 4 && (
                        <Badge className="bg-error/10 text-error">Continue Praticando</Badge>
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

export default ClickSpeedTest;