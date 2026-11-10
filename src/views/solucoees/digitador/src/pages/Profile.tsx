import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SkillAssessment, LearningPaths, PersonalizedExercises } from "@/components/LearningSystem";
import { PerformanceMetrics, AchievementSystem } from "@/components/TypingComponents";
import { 
  User, 
  Trophy, 
  TrendingUp, 
  Target,
  Calendar,
  Award,
  Settings,
  BarChart3,
  Brain,
  Zap,
  Clock,
  BookOpen,
  Star
} from "lucide-react";

interface SkillLevel {
  name: string;
  minWpm: number;
  minAccuracy: number;
  color: string;
  description: string;
}

const Profile = () => {
  const [currentSkillLevel, setCurrentSkillLevel] = useState<SkillLevel>({
    name: "Intermediário",
    minWpm: 30,
    minAccuracy: 90,
    color: "text-warning",
    description: "Velocidade moderada com boa precisão"
  });
  const userStats = {
    totalTime: "24h 35min",
    averageWpm: 32,
    bestWpm: 48,
    accuracy: 94,
    lessonsCompleted: 12,
    testsCompleted: 45,
    currentStreak: 7,
    totalDays: 23
  };

  const achievements = [
    {
      id: 1,
      title: "Primeiro Passo",
      description: "Complete sua primeira lição",
      icon: BookOpen,
      completed: true,
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Velocista",
      description: "Alcance 30 PPM",
      icon: Zap,
      completed: true,
      date: "2024-01-20"
    },
    {
      id: 3,
      title: "Precisão Master",
      description: "Mantenha 95% de precisão",
      icon: Target,
      completed: false,
      progress: 94
    },
    {
      id: 4,
      title: "Maratonista",
      description: "Complete 100 testes",
      icon: Trophy,
      completed: false,
      progress: 45
    },
    {
      id: 5,
      title: "Dedicado",
      description: "Pratique por 10 dias seguidos",
      icon: Calendar,
      completed: false,
      progress: 7
    },
    {
      id: 6,
      title: "Expert",
      description: "Alcance 50 PPM",
      icon: Star,
      completed: false,
      progress: 48
    }
  ];

  const recentActivity = [
    {
      date: "Hoje",
      activity: "Completou Lição 3 - Linha Superior",
      result: "32 PPM, 96% precisão"
    },
    {
      date: "Ontem", 
      activity: "Teste de Velocidade - 2 minutos",
      result: "28 PPM, 92% precisão"
    },
    {
      date: "2 dias atrás",
      activity: "Prática de Palavras Comuns",
      result: "25 palavras/min"
    },
    {
      date: "3 dias atrás",
      activity: "Completou Lição 2 - Teclas Base",
      result: "26 PPM, 89% precisão"
    }
  ];

  const weeklyProgress = [
    { day: "Dom", wpm: 0, tests: 0 },
    { day: "Seg", wpm: 28, tests: 3 },
    { day: "Ter", wpm: 30, tests: 2 },
    { day: "Qua", wpm: 29, tests: 4 },
    { day: "Qui", wpm: 32, tests: 3 },
    { day: "Sex", wpm: 31, tests: 2 },
    { day: "Sab", wpm: 35, tests: 1 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center md:justify-start space-x-6">
            <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
              <User className="h-16 w-16" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">João Silva</h1>
              <p className="text-xl text-blue-100">Nível Intermediário</p>
              <div className="flex items-center mt-2 justify-center md:justify-start">
                <span className="text-sm">Membro desde Janeiro 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="feature-card">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-primary">{userStats.averageWpm}</h3>
              <p className="text-muted-foreground text-sm">PPM Médio</p>
            </CardContent>
          </Card>
          
          <Card className="feature-card">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-success mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-success">{userStats.accuracy}%</h3>
              <p className="text-muted-foreground text-sm">Precisão</p>
            </CardContent>
          </Card>
          
          <Card className="feature-card">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-warning mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-warning">{userStats.totalTime}</h3>
              <p className="text-muted-foreground text-sm">Tempo Total</p>
            </CardContent>
          </Card>
          
          <Card className="feature-card">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-error mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-error">{userStats.currentStreak}</h3>
              <p className="text-muted-foreground text-sm">Dias Seguidos</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="achievements">Conquistas</TabsTrigger>
            <TabsTrigger value="progress">Progresso</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Personal Records */}
              <Card className="feature-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5" />
                    <span>Recordes Pessoais</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Melhor Velocidade</span>
                    <Badge className="bg-primary/10 text-primary">{userStats.bestWpm} PPM</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Melhor Precisão</span>
                    <Badge className="bg-success/10 text-success">98%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Lições Concluídas</span>
                    <Badge className="bg-warning/10 text-warning">{userStats.lessonsCompleted}/20</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Testes Realizados</span>
                    <Badge className="bg-error/10 text-error">{userStats.testsCompleted}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="feature-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Atividade Recente</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="border-l-2 border-primary/20 pl-4">
                        <div className="text-sm text-muted-foreground">{activity.date}</div>
                        <div className="font-medium">{activity.activity}</div>
                        <div className="text-sm text-primary">{activity.result}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Chart */}
            <Card className="feature-card">
              <CardHeader>
                <CardTitle>Progresso Semanal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {weeklyProgress.map((day, index) => (
                    <div key={index} className="text-center">
                      <div className="text-sm text-muted-foreground mb-2">{day.day}</div>
                      <div 
                        className="bg-primary/10 rounded-lg p-3 relative"
                        style={{ 
                          backgroundColor: day.wpm > 0 ? `hsl(var(--primary))` : 'hsl(var(--muted))',
                          opacity: day.wpm > 0 ? Math.max(0.3, day.wpm / 40) : 0.1
                        }}
                      >
                        <div className="text-xs font-semibold text-white">
                          {day.wpm > 0 ? `${day.wpm}` : '-'}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {day.tests > 0 ? `${day.tests} teste${day.tests > 1 ? 's' : ''}` : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold gradient-text mb-4">
                Suas Conquistas
              </h2>
              <p className="text-xl text-muted-foreground">
                {achievements.filter(a => a.completed).length} de {achievements.length} conquistas desbloqueadas
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card 
                  key={achievement.id} 
                  className={`feature-card ${
                    achievement.completed 
                      ? 'border-success/30 bg-success/5' 
                      : 'opacity-75'
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        achievement.completed 
                          ? 'bg-success text-success-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <achievement.icon className="h-5 w-5" />
                      </div>
                      <span>{achievement.title}</span>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    {achievement.completed ? (
                      <div className="flex items-center justify-between">
                        <Badge className="bg-success/10 text-success">
                          Conquistado
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {achievement.date}
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progresso</span>
                          <span>{achievement.progress || 0}%</span>
                        </div>
                        <Progress value={achievement.progress || 0} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold gradient-text mb-4">
                Análise de Progresso
              </h2>
              <p className="text-xl text-muted-foreground">
                Acompanhe sua evolução detalhada
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Typing Speed Trend */}
              <Card className="feature-card">
                <CardHeader>
                  <CardTitle>Evolução da Velocidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Velocidade Atual</span>
                      <span className="text-2xl font-bold text-primary">{userStats.averageWpm} PPM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Meta do Mês</span>
                      <span className="text-lg font-semibold">40 PPM</span>
                    </div>
                    <Progress value={(userStats.averageWpm / 40) * 100} className="h-3" />
                    <p className="text-sm text-muted-foreground">
                      Faltam {40 - userStats.averageWpm} PPM para atingir sua meta
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Accuracy Analysis */}
              <Card className="feature-card">
                <CardHeader>
                  <CardTitle>Análise de Precisão</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Precisão Atual</span>
                      <span className="text-2xl font-bold text-success">{userStats.accuracy}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Meta</span>
                      <span className="text-lg font-semibold">96%</span>
                    </div>
                    <Progress value={(userStats.accuracy / 96) * 100} className="h-3" />
                    <p className="text-sm text-muted-foreground">
                      Você está muito próximo da meta de precisão!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Recomendações Personalizadas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-primary">
                    <h4 className="font-semibold text-primary">Foque na Velocidade</h4>
                    <p className="text-sm text-muted-foreground">
                      Sua precisão está excelente! Agora concentre-se em aumentar a velocidade com exercícios de palavras comuns.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border-l-4 border-success">
                    <h4 className="font-semibold text-success">Continue Praticando</h4>
                    <p className="text-sm text-muted-foreground">
                      Mantenha sua rotina diária de prática. Você está no caminho certo para alcançar 40 PPM!
                    </p>
                  </div>
                  
                  <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border-l-4 border-warning">
                    <h4 className="font-semibold text-warning">Letras Desafiadoras</h4>
                    <p className="text-sm text-muted-foreground">
                      Pratique mais as letras Q, X e Z. Elas aparecem com menos frequência nos seus exercícios.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;