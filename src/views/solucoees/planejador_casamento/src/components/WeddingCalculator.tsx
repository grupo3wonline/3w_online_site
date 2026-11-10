import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Users, MapPin, DollarSign, Camera, Utensils, Music, Flower2, Car } from 'lucide-react';

interface BudgetCategory {
  name: string;
  icon: any;
  basePrice: number;
  perGuestMultiplier: number;
  locationMultiplier: Record<string, number>;
}

const budgetCategories: BudgetCategory[] = [
  {
    name: 'Local da Cerimônia',
    icon: MapPin,
    basePrice: 3000,
    perGuestMultiplier: 15,
    locationMultiplier: { 'capital': 1.5, 'interior': 1.0, 'praia': 1.3 }
  },
  {
    name: 'Buffet e Bebidas',
    icon: Utensils,
    basePrice: 2000,
    perGuestMultiplier: 45,
    locationMultiplier: { 'capital': 1.4, 'interior': 1.0, 'praia': 1.2 }
  },
  {
    name: 'Fotografia e Filmagem',
    icon: Camera,
    basePrice: 2500,
    perGuestMultiplier: 8,
    locationMultiplier: { 'capital': 1.3, 'interior': 1.0, 'praia': 1.1 }
  },
  {
    name: 'Decoração e Flores',
    icon: Flower2,
    basePrice: 1500,
    perGuestMultiplier: 12,
    locationMultiplier: { 'capital': 1.3, 'interior': 1.0, 'praia': 1.2 }
  },
  {
    name: 'Música e Entretenimento',
    icon: Music,
    basePrice: 1200,
    perGuestMultiplier: 5,
    locationMultiplier: { 'capital': 1.2, 'interior': 1.0, 'praia': 1.1 }
  },
  {
    name: 'Transporte',
    icon: Car,
    basePrice: 800,
    perGuestMultiplier: 2,
    locationMultiplier: { 'capital': 1.2, 'interior': 1.0, 'praia': 1.3 }
  }
];

export const WeddingCalculator = () => {
  const [guests, setGuests] = useState<number>(100);
  const [location, setLocation] = useState<string>('interior');
  const [budget, setBudget] = useState<Record<string, number>>({});
  const [totalBudget, setTotalBudget] = useState<number>(0);

  useEffect(() => {
    const newBudget: Record<string, number> = {};
    let total = 0;

    budgetCategories.forEach(category => {
      const baseAmount = category.basePrice;
      const guestAmount = category.perGuestMultiplier * guests;
      const locationMultiplier = category.locationMultiplier[location] || 1;
      const categoryTotal = (baseAmount + guestAmount) * locationMultiplier;
      
      newBudget[category.name] = categoryTotal;
      total += categoryTotal;
    });

    setBudget(newBudget);
    setTotalBudget(total);
  }, [guests, location]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="h-8 w-8 text-primary animate-float" />
          <h1 className="text-4xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
            Calculadora de Orçamento de Casamento
          </h1>
          <Heart className="h-8 w-8 text-primary animate-float" />
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Planeje o orçamento perfeito para o seu grande dia! Calcule os custos baseados no número de convidados e localização.
        </p>
      </div>

      {/* Input Section */}
      <Card className="shadow-romantic border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Informações Básicas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="guests">Número de Convidados</Label>
              <Input
                id="guests"
                type="number"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                min={1}
                max={500}
                className="border-border/50 focus:border-primary"
              />
            </div>
            
            <div className="space-y-2">
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
          </div>
        </CardContent>
      </Card>

      {/* Budget Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgetCategories.map((category, index) => {
          const Icon = category.icon;
          const amount = budget[category.name] || 0;
          
          return (
            <Card 
              key={category.name} 
              className="shadow-elegant border-border/50 hover:shadow-romantic transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon className="h-5 w-5 text-primary" />
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(amount)}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {((amount / totalBudget) * 100).toFixed(1)}% do orçamento total
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Total Budget */}
      <Card className="shadow-romantic border-primary/20 bg-gradient-elegant">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <DollarSign className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Orçamento Total Estimado</h3>
            </div>
            <div className="text-4xl font-bold text-primary">
              {formatCurrency(totalBudget)}
            </div>
            <p className="text-muted-foreground">
              Para {guests} convidados em {location === 'capital' ? 'capital/grande centro' : location === 'praia' ? 'destino de praia' : 'interior'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Tips Section */}
      <Card className="shadow-elegant border-border/50">
        <CardHeader>
          <CardTitle className="text-primary">💡 Dicas para Economizar</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Considere casamentos em dias da semana para reduzir custos</li>
            <li>• Flores da estação são mais econômicas e bonitas</li>
            <li>• Buffets com menos opções podem reduzir o custo por pessoa</li>
            <li>• Fotógrafos iniciantes oferecem qualidade com preços menores</li>
            <li>• Decorações DIY podem personalizar e economizar</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};