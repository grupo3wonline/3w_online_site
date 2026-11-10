import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain,
  Target,
  Clock,
  Zap,
  TrendingUp,
  Award,
  Star,
  ChevronRight
} from "lucide-react";

interface SkillLevel {
  name: string;
  minWpm: number;
  minAccuracy: number;
  color: string;
  description: string;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  difficulty: number;
  prerequisites: string[];
  skills: string[];
  progress: number;
  unlocked: boolean;
}

const SkillAssessment = ({ 
  currentWpm, 
  currentAccuracy, 
  onLevelChange 
}: { 
  currentWpm: number;
  currentAccuracy: number;
  onLevelChange: (level: SkillLevel) => void;
}) => {
  const skillLevels: SkillLevel[] = [
    {
      name: "Iniciante",
      minWpm: 0,
      minAccuracy: 0,
      color: "text-muted-foreground",
      description: "Aprendendo a posição básica dos dedos"
    },
    {
      name: "Básico",
      minWpm: 15,
      minAccuracy: 80,
      color: "text-primary",
      description: "Digitação lenta mas com alguma precisão"
    },
    {
      name: "Intermediário",
      minWpm: 30,
      minAccuracy: 90,
      color: "text-warning",
      description: "Velocidade moderada com boa precisão"
    },
    {
      name: "Avançado",
      minWpm: 50,
      minAccuracy: 95,
      color: "text-success",
      description: "Digitação rápida e precisa"
    },
    {
      name: "Expert",
      minWpm: 70,
      minAccuracy: 98,
      color: "text-success",
      description: "Mestre da digitação profissional"
    }
  ];

  const getCurrentLevel = () => {
    for (let i = skillLevels.length - 1; i >= 0; i--) {
      const level = skillLevels[i];
      if (currentWpm >= level.minWpm && currentAccuracy >= level.minAccuracy) {
        return { level, index: i };
      }
    }
    return { level: skillLevels[0], index: 0 };
  };

  const { level: currentLevel, index: currentIndex } = getCurrentLevel();
  const nextLevel = currentIndex < skillLevels.length - 1 ? skillLevels[currentIndex + 1] : null;

  useEffect(() => {
    onLevelChange(currentLevel);
  }, [currentLevel, onLevelChange]);

  const getProgressToNext = () => {
    if (!nextLevel) return 100;
    
    const wpmProgress = Math.min((currentWpm / nextLevel.minWpm) * 100, 100);
    const accuracyProgress = Math.min((currentAccuracy / nextLevel.minAccuracy) * 100, 100);
    
    return Math.min(wpmProgress, accuracyProgress);
  };

  return (
    <Card className="feature-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5" />
          <span>Avaliação de Habilidade</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Level */}
        <div className="text-center">
          <div className={`text-3xl font-bold ${currentLevel.color} mb-2`}>
            {currentLevel.name}
          </div>
          <p className="text-muted-foreground">{currentLevel.description}</p>
        </div>

        {/* Progress to Next Level */}
        {nextLevel && (
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Progresso para {nextLevel.name}</span>
              <span>{Math.round(getProgressToNext())}%</span>
            </div>
            <Progress value={getProgressToNext()} className="h-3" />
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Velocidade:</span>
                  <span className={currentWpm >= nextLevel.minWpm ? "text-success" : "text-muted-foreground"}>
                    {currentWpm}/{nextLevel.minWpm} PPM
                  </span>
                </div>
                <Progress 
                  value={Math.min((currentWpm / nextLevel.minWpm) * 100, 100)} 
                  className="h-1"
                />
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Precisão:</span>
                  <span className={currentAccuracy >= nextLevel.minAccuracy ? "text-success" : "text-muted-foreground"}>
                    {currentAccuracy}%/{nextLevel.minAccuracy}%
                  </span>
                </div>
                <Progress 
                  value={Math.min((currentAccuracy / nextLevel.minAccuracy) * 100, 100)} 
                  className="h-1"
                />
              </div>
            </div>
          </div>
        )}

        {/* Level Indicators */}
        <div className="flex justify-between items-center">
          {skillLevels.map((level, index) => (
            <div key={level.name} className="flex flex-col items-center space-y-1">
              <div 
                className={`
                  w-3 h-3 rounded-full border-2 transition-colors
                  ${index <= currentIndex 
                    ? 'bg-primary border-primary' 
                    : 'border-muted-foreground bg-background'
                  }
                `}
              />
              <span className={`text-xs ${index <= currentIndex ? 'text-primary' : 'text-muted-foreground'}`}>
                {level.name}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const LearningPaths = ({ currentLevel }: { currentLevel: SkillLevel }) => {
  const learningPaths: LearningPath[] = [
    {
      id: "foundation",
      title: "Base Sólida",
      description: "Domine a posição correta dos dedos e teclas básicas",
      estimatedTime: "2-3 semanas",
      difficulty: 1,
      prerequisites: [],
      skills: ["Posição dos dedos", "Teclas base ASDF-JKL", "Memória muscular"],
      progress: 85,
      unlocked: true
    },
    {
      id: "speed_building",
      title: "Construção de Velocidade",
      description: "Aumente sua velocidade mantendo a precisão",
      estimatedTime: "3-4 semanas",
      difficulty: 2,
      prerequisites: ["Base Sólida"],
      skills: ["Digitação fluida", "Palavras comuns", "Ritmo constante"],
      progress: 45,
      unlocked: true
    },
    {
      id: "accuracy_mastery",
      title: "Maestria em Precisão",
      description: "Alcance precisão profissional na digitação",
      estimatedTime: "2-3 semanas",
      difficulty: 3,
      prerequisites: ["Base Sólida"],
      skills: ["Correção automática", "Consciência de erros", "Digitação limpa"],
      progress: 20,
      unlocked: currentLevel.minWpm >= 25
    },
    {
      id: "professional",
      title: "Nível Profissional",
      description: "Digitação avançada com símbolos e números",
      estimatedTime: "4-6 semanas",
      difficulty: 4,
      prerequisites: ["Construção de Velocidade", "Maestria em Precisão"],
      skills: ["Números", "Símbolos", "Pontuação", "Textos complexos"],
      progress: 0,
      unlocked: currentLevel.minWpm >= 40 && currentLevel.minAccuracy >= 90
    }
  ];

  const getDifficultyStars = (difficulty: number) => (
    <div className="flex space-x-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i < difficulty ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );

  return (
    <Card className="feature-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5" />
          <span>Trilhas de Aprendizado</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {learningPaths.map((path) => (
            <Card 
              key={path.id} 
              className={`transition-all duration-200 ${
                path.unlocked 
                  ? 'hover:shadow-md cursor-pointer' 
                  : 'opacity-60 cursor-not-allowed'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold">{path.title}</h4>
                      {getDifficultyStars(path.difficulty)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{path.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{path.estimatedTime}</span>
                      </span>
                      <span>{path.skills.length} habilidades</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    {path.unlocked && (
                      <Button size="sm" variant="outline">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    )}
                    {!path.unlocked && (
                      <Badge variant="secondary">Bloqueado</Badge>
                    )}
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso</span>
                    <span>{path.progress}%</span>
                  </div>
                  <Progress value={path.progress} className="h-2" />
                </div>

                {/* Skills */}
                <div className="mt-3">
                  <div className="flex flex-wrap gap-1">
                    {path.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Prerequisites */}
                {path.prerequisites.length > 0 && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    Requer: {path.prerequisites.join(", ")}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const PersonalizedExercises = ({ currentLevel }: { currentLevel: SkillLevel }) => {
  const getRecommendedExercises = () => {
    const wpm = currentLevel.minWpm;
    
    if (wpm < 15) {
      return [
        { title: "Posição dos Dedos", type: "foundation", time: "10 min", difficulty: 1 },
        { title: "Teclas Base ASDF", type: "letters", time: "15 min", difficulty: 1 },
        { title: "Teclas Base JKL;", type: "letters", time: "15 min", difficulty: 1 }
      ];
    }
    
    if (wpm < 30) {
      return [
        { title: "Palavras Simples", type: "words", time: "20 min", difficulty: 2 },
        { title: "Linha Superior QWER", type: "letters", time: "15 min", difficulty: 2 },
        { title: "Combinações Comuns", type: "combinations", time: "15 min", difficulty: 2 }
      ];
    }
    
    if (wpm < 50) {
      return [
        { title: "Textos Médios", type: "texts", time: "25 min", difficulty: 3 },
        { title: "Números e Símbolos", type: "numbers", time: "20 min", difficulty: 3 },
        { title: "Frases Complexas", type: "sentences", time: "20 min", difficulty: 3 }
      ];
    }
    
    return [
      { title: "Textos Profissionais", type: "professional", time: "30 min", difficulty: 4 },
      { title: "Programação", type: "coding", time: "25 min", difficulty: 4 },
      { title: "Idiomas Estrangeiros", type: "languages", time: "30 min", difficulty: 5 }
    ];
  };

  const exercises = getRecommendedExercises();

  return (
    <Card className="feature-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="h-5 w-5" />
          <span>Exercícios Recomendados</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {exercises.map((exercise, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < exercise.difficulty 
                          ? "fill-yellow-400 text-yellow-400" 
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <div>
                  <div className="font-medium">{exercise.title}</div>
                  <div className="text-sm text-muted-foreground">{exercise.time}</div>
                </div>
              </div>
              <Button size="sm">Praticar</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { SkillAssessment, LearningPaths, PersonalizedExercises };