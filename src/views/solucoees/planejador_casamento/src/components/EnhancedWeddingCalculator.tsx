import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  Users, 
  MapPin, 
  DollarSign, 
  Camera, 
  Utensils, 
  Music, 
  Flower2, 
  Car,
  Download,
  Share,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Calendar,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BudgetCategory {
  name: string;
  icon: any;
  basePrice: number;
  perGuestMultiplier: number;
  locationMultiplier: Record<string, number>;
  priority: 'essential' | 'important' | 'optional';
  tips: string[];
}

const budgetCategories: BudgetCategory[] = [
  {
    name: 'Local da Cerimônia',
    icon: MapPin,
    basePrice: 3000,
    perGuestMultiplier: 15,
    locationMultiplier: { 'capital': 1.5, 'interior': 1.0, 'praia': 1.3 },
    priority: 'essential',
    tips: [
      'Considere casamentos em dias da semana para desconto de até 40%',
      'Locais municipais podem custar 70% menos',
      'Verifique se inclui decoração básica'
    ]
  },
  {
    name: 'Buffet e Bebidas',
    icon: Utensils,
    basePrice: 2000,
    perGuestMultiplier: 45,
    locationMultiplier: { 'capital': 1.4, 'interior': 1.0, 'praia': 1.2 },
    priority: 'essential',
    tips: [
      'Buffet por pessoa custa menos que individual',
      'Limite bebidas importadas para economizar 30%',
      'Cardápio da estação reduz custos'
    ]
  },
  {
    name: 'Fotografia e Filmagem',
    icon: Camera,
    basePrice: 2500,
    perGuestMultiplier: 8,
    locationMultiplier: { 'capital': 1.3, 'interior': 1.0, 'praia': 1.1 },
    priority: 'important',
    tips: [
      'Contrate apenas foto OU vídeo para economizar',
      'Fotógrafos iniciantes cobram 50% menos',
      'Pacotes digitais custam menos que álbuns físicos'
    ]
  },
  {
    name: 'Decoração e Flores',
    icon: Flower2,
    basePrice: 1500,
    perGuestMultiplier: 12,
    locationMultiplier: { 'capital': 1.3, 'interior': 1.0, 'praia': 1.2 },
    priority: 'important',
    tips: [
      'Flores da estação custam 60% menos',
      'Reutilize arranjos da cerimônia na festa',
      'DIY pode economizar até R$ 3.000'
    ]
  },
  {
    name: 'Música e Entretenimento',
    icon: Music,
    basePrice: 1200,
    perGuestMultiplier: 5,
    locationMultiplier: { 'capital': 1.2, 'interior': 1.0, 'praia': 1.1 },
    priority: 'important',
    tips: [
      'DJ custa 70% menos que banda',
      'Playlist própria elimina custos',
      'Som básico para cerimônia é suficiente'
    ]
  },
  {
    name: 'Transporte',
    icon: Car,
    basePrice: 800,
    perGuestMultiplier: 2,
    locationMultiplier: { 'capital': 1.2, 'interior': 1.0, 'praia': 1.3 },
    priority: 'optional',
    tips: [
      'Carro de amigo decorado é charmoso e grátis',
      'Uber/99 pode ser mais barato',
      'Transporte só para os noivos reduz custos'
    ]
  }
];

interface EnhancedWeddingCalculatorProps {
  onBackToLanding: () => void;
}

export const EnhancedWeddingCalculator = ({ onBackToLanding }: EnhancedWeddingCalculatorProps) => {
  const { toast } = useToast();
  const [guests, setGuests] = useState<number>(100);
  const [location, setLocation] = useState<string>('interior');
  const [budget, setBudget] = useState<Record<string, number>>({});
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [maxBudget, setMaxBudget] = useState<number>(50000);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>(['essential', 'important']);

  useEffect(() => {
    const newBudget: Record<string, number> = {};
    let total = 0;

    budgetCategories.forEach(category => {
      if (selectedPriorities.includes(category.priority)) {
        const baseAmount = category.basePrice;
        const guestAmount = category.perGuestMultiplier * guests;
        const locationMultiplier = category.locationMultiplier[location] || 1;
        const categoryTotal = (baseAmount + guestAmount) * locationMultiplier;
        
        newBudget[category.name] = categoryTotal;
        total += categoryTotal;
      } else {
        newBudget[category.name] = 0;
      }
    });

    setBudget(newBudget);
    setTotalBudget(total);
  }, [guests, location, selectedPriorities]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getBudgetStatus = () => {
    if (totalBudget <= maxBudget * 0.8) return { status: 'excellent', color: 'text-green-600', message: 'Orçamento muito bom!' };
    if (totalBudget <= maxBudget) return { status: 'good', color: 'text-blue-600', message: 'Dentro do orçamento' };
    if (totalBudget <= maxBudget * 1.2) return { status: 'warning', color: 'text-yellow-600', message: 'Ligeiramente acima' };
    return { status: 'over', color: 'text-red-600', message: 'Acima do orçamento' };
  };

  const budgetStatus = getBudgetStatus();
  const budgetPercentage = Math.min((totalBudget / maxBudget) * 100, 100);

  const handleShare = () => {
    const shareData = {
      title: 'Meu Orçamento de Casamento',
      text: `Calculei o orçamento do meu casamento: ${formatCurrency(totalBudget)} para ${guests} convidados!`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      toast({
        title: "Link copiado!",
        description: "O link foi copiado para sua área de transferência.",
      });
    }
  };

  const handleDownload = () => {
    const content = `
ORÇAMENTO DE CASAMENTO

Informações Básicas:
- Convidados: ${guests}
- Localização: ${location === 'capital' ? 'Capital/Grande Centro' : location === 'praia' ? 'Destino de Praia' : 'Interior'}

Breakdown por Categoria:
${budgetCategories.map(category => 
  `- ${category.name}: ${formatCurrency(budget[category.name] || 0)}`
).join('\n')}

TOTAL: ${formatCurrency(totalBudget)}

Gerado por Calculadora de Casamento
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orcamento-casamento.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Download realizado!",
      description: "Seu orçamento foi baixado com sucesso.",
    });
  };

  const togglePriority = (priority: string) => {
    setSelectedPriorities(prev => 
      prev.includes(priority) 
        ? prev.filter(p => p !== priority)
        : [...prev, priority]
    );
  };

  return (
    <div className="space-y-8">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={onBackToLanding}
          className="border-border/50 hover:bg-muted"
        >
          ← Voltar ao Início
        </Button>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="h-6 w-6 text-primary animate-float" />
            <h1 className="text-3xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
              Calculadora Avançada
            </h1>
            <Heart className="h-6 w-6 text-primary animate-float" />
          </div>
          <p className="text-muted-foreground">
            Planeje cada detalhe do seu casamento com precisão
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share className="h-4 w-4 mr-2" />
            Compartilhar
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Baixar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculator">Calculadora</TabsTrigger>
          <TabsTrigger value="breakdown">Detalhamento</TabsTrigger>
          <TabsTrigger value="tips">Dicas de Economia</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          {/* Configuration Section */}
          <Card className="shadow-romantic border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Configuração do Casamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="guests">Número de Convidados: {guests}</Label>
                  <Slider
                    value={[guests]}
                    onValueChange={(value) => setGuests(value[0])}
                    max={500}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>10</span>
                    <span>500</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="location">Localização</Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="border-border/50 focus:border-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="interior">Interior/Cidade Pequena</SelectItem>
                      <SelectItem value="capital">Capital/Grande Centro</SelectItem>
                      <SelectItem value="praia">Destino de Praia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="maxBudget">Orçamento Máximo: {formatCurrency(maxBudget)}</Label>
                  <Slider
                    value={[maxBudget]}
                    onValueChange={(value) => setMaxBudget(value[0])}
                    max={200000}
                    min={10000}
                    step={5000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>R$ 10k</span>
                    <span>R$ 200k</span>
                  </div>
                </div>
              </div>

              {/* Priority Selection */}
              <div className="space-y-3">
                <Label>Categorias Incluídas</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'essential', label: 'Essencial', count: budgetCategories.filter(c => c.priority === 'essential').length },
                    { id: 'important', label: 'Importante', count: budgetCategories.filter(c => c.priority === 'important').length },
                    { id: 'optional', label: 'Opcional', count: budgetCategories.filter(c => c.priority === 'optional').length }
                  ].map(priority => (
                    <Badge
                      key={priority.id}
                      variant={selectedPriorities.includes(priority.id) ? "default" : "outline"}
                      className="cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => togglePriority(priority.id)}
                    >
                      {priority.label} ({priority.count})
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget Status Card */}
          <Card className={`shadow-elegant border-2 ${
            budgetStatus.status === 'excellent' ? 'border-green-200 bg-green-50/50' :
            budgetStatus.status === 'good' ? 'border-blue-200 bg-blue-50/50' :
            budgetStatus.status === 'warning' ? 'border-yellow-200 bg-yellow-50/50' :
            'border-red-200 bg-red-50/50'
          }`}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {budgetStatus.status === 'over' ? 
                      <AlertCircle className="h-5 w-5 text-red-600" /> :
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    }
                    <span className={`font-semibold ${budgetStatus.color}`}>
                      {budgetStatus.message}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {formatCurrency(totalBudget)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Limite: {formatCurrency(maxBudget)}
                    </div>
                  </div>
                </div>
                
                <Progress value={budgetPercentage} className="h-3" />
                
                <div className="text-sm text-muted-foreground">
                  {budgetPercentage.toFixed(1)}% do orçamento máximo utilizado
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {budgetCategories.map((category, index) => {
              const Icon = category.icon;
              const amount = budget[category.name] || 0;
              const isIncluded = selectedPriorities.includes(category.priority);
              
              return (
                <Card 
                  key={category.name} 
                  className={`shadow-elegant border-border/50 hover:shadow-romantic transition-all duration-300 animate-fade-in ${
                    !isIncluded ? 'opacity-50' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Icon className="h-5 w-5 text-primary" />
                        {category.name}
                      </CardTitle>
                      <Badge 
                        variant={category.priority === 'essential' ? 'default' : 
                                category.priority === 'important' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {category.priority === 'essential' ? 'Essencial' :
                         category.priority === 'important' ? 'Importante' : 'Opcional'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-primary">
                        {formatCurrency(amount)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {totalBudget > 0 ? ((amount / totalBudget) * 100).toFixed(1) : 0}% do orçamento total
                      </div>
                      {isIncluded && (
                        <div className="text-xs text-muted-foreground">
                          Base: {formatCurrency(category.basePrice)} + {formatCurrency(category.perGuestMultiplier)} por convidado
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-6">
          <Card className="shadow-romantic border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Análise Detalhada do Orçamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{formatCurrency(totalBudget)}</div>
                    <div className="text-sm text-muted-foreground">Total Estimado</div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{formatCurrency(totalBudget / guests)}</div>
                    <div className="text-sm text-muted-foreground">Por Convidado</div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {maxBudget > totalBudget ? formatCurrency(maxBudget - totalBudget) : `-${formatCurrency(totalBudget - maxBudget)}`}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {maxBudget > totalBudget ? 'Economia Possível' : 'Acima do Limite'}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Distribuição por Categoria</h3>
                  {budgetCategories
                    .filter(category => selectedPriorities.includes(category.priority))
                    .sort((a, b) => (budget[b.name] || 0) - (budget[a.name] || 0))
                    .map(category => {
                      const amount = budget[category.name] || 0;
                      const percentage = totalBudget > 0 ? (amount / totalBudget) * 100 : 0;
                      
                      return (
                        <div key={category.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{category.name}</span>
                            <span className="text-sm text-muted-foreground">
                              {formatCurrency(amount)} ({percentage.toFixed(1)}%)
                            </span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {budgetCategories
              .filter(category => selectedPriorities.includes(category.priority))
              .map(category => {
                const Icon = category.icon;
                return (
                  <Card key={category.name} className="shadow-elegant border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Icon className="h-5 w-5 text-primary" />
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-lg font-semibold text-primary">
                          {formatCurrency(budget[category.name] || 0)}
                        </div>
                        <ul className="space-y-2">
                          {category.tips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};