import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Keyboard, 
  MousePointer,
  Target,
  Award,
  Trophy,
  Star
} from "lucide-react";

interface KeyProps {
  keyChar: string;
  isPressed?: boolean;
  isTarget?: boolean;
  finger?: string;
}

const Key = ({ keyChar, isPressed, isTarget, finger }: KeyProps) => (
  <div 
    className={`
      w-12 h-12 rounded-lg border-2 flex items-center justify-center font-mono text-sm font-semibold transition-all duration-150
      ${isPressed ? 'bg-primary text-primary-foreground border-primary scale-95' : 'bg-card border-border'}
      ${isTarget ? 'ring-2 ring-primary ring-offset-2 animate-pulse' : ''}
      hover:bg-muted/50
    `}
    title={finger ? `Dedo: ${finger}` : undefined}
  >
    {keyChar}
  </div>
);

const VirtualKeyboard = ({ targetKey, pressedKey }: { targetKey?: string; pressedKey?: string }) => {
  const keyboardLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  const fingerMapping: { [key: string]: string } = {
    'Q': 'Mindinho E', 'W': 'Anular E', 'E': 'Médio E', 'R': 'Indicador E', 'T': 'Indicador E',
    'Y': 'Indicador D', 'U': 'Indicador D', 'I': 'Médio D', 'O': 'Anular D', 'P': 'Mindinho D',
    'A': 'Mindinho E', 'S': 'Anular E', 'D': 'Médio E', 'F': 'Indicador E', 'G': 'Indicador E',
    'H': 'Indicador D', 'J': 'Indicador D', 'K': 'Médio D', 'L': 'Anular D',
    'Z': 'Mindinho E', 'X': 'Anular E', 'C': 'Médio E', 'V': 'Indicador E', 'B': 'Indicador E',
    'N': 'Indicador D', 'M': 'Indicador D'
  };

  return (
    <div className="bg-muted/30 p-6 rounded-xl">
      <h3 className="text-lg font-semibold mb-4 text-center">Teclado Virtual</h3>
      <div className="space-y-2">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1">
            {row.map((key) => (
              <Key
                key={key}
                keyChar={key}
                isPressed={pressedKey?.toUpperCase() === key}
                isTarget={targetKey?.toUpperCase() === key}
                finger={fingerMapping[key]}
              />
            ))}
          </div>
        ))}
        <div className="flex justify-center mt-4">
          <div className="w-64 h-12 bg-card border-2 border-border rounded-lg flex items-center justify-center font-mono text-sm">
            ESPAÇO
          </div>
        </div>
      </div>
    </div>
  );
};

interface PerformanceMetricsProps {
  wpm: number;
  accuracy: number;
  consistency: number;
  totalTime: number;
}

const PerformanceMetrics = ({ wpm, accuracy, consistency, totalTime }: PerformanceMetricsProps) => {
  const getRating = (value: number, thresholds: number[]) => {
    if (value >= thresholds[2]) return { rating: 'Excelente', color: 'text-success', stars: 5 };
    if (value >= thresholds[1]) return { rating: 'Bom', color: 'text-warning', stars: 4 };
    if (value >= thresholds[0]) return { rating: 'Regular', color: 'text-primary', stars: 3 };
    return { rating: 'Precisa Melhorar', color: 'text-error', stars: 2 };
  };

  const wpmRating = getRating(wpm, [20, 35, 50]);
  const accuracyRating = getRating(accuracy, [85, 92, 98]);
  const consistencyRating = getRating(consistency, [60, 75, 90]);

  const renderStars = (count: number) => (
    <div className="flex space-x-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < count ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );

  return (
    <Card className="feature-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="h-5 w-5" />
          <span>Análise de Desempenho</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* WPM Analysis */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Velocidade (PPM)</span>
              {renderStars(wpmRating.stars)}
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-3xl font-bold text-primary">{wpm}</div>
              <div>
                <div className={`text-sm font-semibold ${wpmRating.color}`}>
                  {wpmRating.rating}
                </div>
                <div className="text-xs text-muted-foreground">
                  Meta: 40+ PPM
                </div>
              </div>
            </div>
            <Progress value={Math.min((wpm / 60) * 100, 100)} className="h-2" />
          </div>

          {/* Accuracy Analysis */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Precisão</span>
              {renderStars(accuracyRating.stars)}
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-3xl font-bold text-success">{accuracy}%</div>
              <div>
                <div className={`text-sm font-semibold ${accuracyRating.color}`}>
                  {accuracyRating.rating}
                </div>
                <div className="text-xs text-muted-foreground">
                  Meta: 95%+
                </div>
              </div>
            </div>
            <Progress value={accuracy} className="h-2" />
          </div>

          {/* Consistency Analysis */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Consistência</span>
              {renderStars(consistencyRating.stars)}
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-3xl font-bold text-warning">{consistency}%</div>
              <div>
                <div className={`text-sm font-semibold ${consistencyRating.color}`}>
                  {consistencyRating.rating}
                </div>
                <div className="text-xs text-muted-foreground">
                  Variação de velocidade
                </div>
              </div>
            </div>
            <Progress value={consistency} className="h-2" />
          </div>

          {/* Time Analysis */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Tempo Total</span>
              <Badge variant="outline">{Math.floor(totalTime / 60)}min {totalTime % 60}s</Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              <div>Tempo médio por palavra: {((totalTime / 60) / (wpm || 1)).toFixed(1)}s</div>
              <div>Eficiência: {wpm > 0 ? Math.round((accuracy / 100) * wpm) : 0} PPM efetivo</div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="pt-4 border-t">
          <h4 className="font-semibold mb-3">Recomendações Personalizadas:</h4>
          <div className="space-y-2 text-sm">
            {wpm < 30 && (
              <div className="flex items-start space-x-2">
                <Target className="h-4 w-4 text-primary mt-0.5" />
                <span>Foque em velocidade: pratique exercícios de letras básicas (ASDF-JKL;)</span>
              </div>
            )}
            {accuracy < 90 && (
              <div className="flex items-start space-x-2">
                <Target className="h-4 w-4 text-success mt-0.5" />
                <span>Melhore a precisão: diminua a velocidade e foque na correção</span>
              </div>
            )}
            {consistency < 70 && (
              <div className="flex items-start space-x-2">
                <Target className="h-4 w-4 text-warning mt-0.5" />
                <span>Trabalhe a consistência: pratique textos longos em ritmo constante</span>
              </div>
            )}
            {wpm >= 40 && accuracy >= 95 && (
              <div className="flex items-start space-x-2">
                <Award className="h-4 w-4 text-success mt-0.5" />
                <span>Excelente! Continue praticando textos complexos e símbolos especiais</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface AchievementProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
  requirement?: string;
}

const Achievement = ({ title, description, icon, unlocked, progress, requirement }: AchievementProps) => (
  <Card className={`feature-card ${unlocked ? 'bg-success/5 border-success/20' : 'opacity-60'}`}>
    <CardContent className="p-4">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${unlocked ? 'bg-success/10' : 'bg-muted/30'}`}>
          {icon}
        </div>
        <div className="flex-1">
          <h4 className={`font-semibold ${unlocked ? 'text-success' : 'text-muted-foreground'}`}>
            {title}
          </h4>
          <p className="text-xs text-muted-foreground">{description}</p>
          {requirement && !unlocked && (
            <p className="text-xs text-primary mt-1">{requirement}</p>
          )}
          {progress !== undefined && !unlocked && (
            <Progress value={progress} className="h-1 mt-2" />
          )}
        </div>
        {unlocked && <Award className="h-5 w-5 text-success" />}
      </div>
    </CardContent>
  </Card>
);

const AchievementSystem = () => {
  const achievements = [
    {
      id: 'first_lesson',
      title: 'Primeiro Passo',
      description: 'Complete sua primeira lição',
      icon: <Keyboard className="h-5 w-5" />,
      unlocked: true,
      requirement: 'Complete a Lição 1'
    },
    {
      id: 'speed_demon',
      title: 'Demônio da Velocidade',
      description: 'Atinja 40 PPM',
      icon: <Target className="h-5 w-5" />,
      unlocked: false,
      progress: 70,
      requirement: 'Atual: 28 PPM'
    },
    {
      id: 'accuracy_master',
      title: 'Mestre da Precisão',
      description: 'Mantenha 95% de precisão por 5 exercícios',
      icon: <Trophy className="h-5 w-5" />,
      unlocked: false,
      progress: 60,
      requirement: '3/5 exercícios'
    },
    {
      id: 'click_master',
      title: 'Mestre do Clique',
      description: 'Atinja 8 CPS no teste de clique',
      icon: <MousePointer className="h-5 w-5" />,
      unlocked: false,
      progress: 25,
      requirement: 'Atual: 2 CPS'
    }
  ];

  return (
    <Card className="feature-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Award className="h-5 w-5" />
          <span>Conquistas</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {achievements.map((achievement) => (
            <Achievement key={achievement.id} {...achievement} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { VirtualKeyboard, PerformanceMetrics, AchievementSystem, Key };