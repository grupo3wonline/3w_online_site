import { Shuffle, FileText, Wand2, Smile, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { GeneratorConfig, TextTypeInfo } from '@/types/generator';
import { generateText } from '@/utils/textGenerators';

interface TextGeneratorFormProps {
  config: GeneratorConfig;
  setConfig: (config: GeneratorConfig) => void;
  onGenerate: (text: string) => void;
}

const textTypes: TextTypeInfo[] = [
  {
    id: 'lorem',
    name: 'Lorem Ipsum',
    description: 'Texto clássico da indústria',
    color: 'bg-primary',
    badge: 'Tradicional',
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
  },
  {
    id: 'hipster',
    name: 'Hipster Ipsum',
    description: 'Estilo moderno e descolado',
    color: 'bg-hipster',
    badge: 'Moderno',
    example: 'Craft beer vinyl sustainable, organic fixie...'
  },
  {
    id: 'mussum',
    name: 'Mussum Ipsum',
    description: 'Versão brasileira divertida',
    color: 'bg-mussum',
    badge: 'Brasileiro',
    example: 'Mussum Ipsum, cacilds vidis litro abertis...'
  },
  {
    id: 'creative',
    name: 'Creative Ipsum',
    description: 'Temas especiais personalizados',
    color: 'bg-creative',
    badge: 'Criativo',
    example: 'Mr. and Mrs. Dursley of number four...'
  }
];

export const TextGeneratorForm = ({ config, setConfig, onGenerate }: TextGeneratorFormProps) => {
  const handleGenerate = () => {
    const text = generateText(config);
    onGenerate(text);
  };

  const getQuantityRange = () => {
    switch (config.format) {
      case 'words':
        return { min: 5, max: 500 };
      case 'paragraphs':
        return { min: 1, max: 20 };
      case 'lists':
        return { min: 3, max: 50 };
      default:
        return { min: 1, max: 20 };
    }
  };

  const range = getQuantityRange();

  return (
    <Card className="h-fit sticky top-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <FileText className="w-6 h-6 text-primary" />
          Configurações
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Text Type Selection */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Tipo de Texto</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {textTypes.map((type) => {
              const Icon = type.id === 'lorem' ? FileText : 
                         type.id === 'hipster' ? Wand2 : 
                         type.id === 'mussum' ? Smile : Star;
              
              return (
                <Button
                  key={type.id}
                  variant={config.textType === type.id ? 'default' : 'outline'}
                  onClick={() => setConfig({ ...config, textType: type.id })}
                  className="h-auto p-4 flex flex-col items-start gap-2 text-left"
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className={`w-8 h-8 ${type.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{type.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {type.badge}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-left w-full">
                    {type.description}
                  </p>
                </Button>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Format Selection */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Formato</Label>
          <Select 
            value={config.format} 
            onValueChange={(value: any) => setConfig({ ...config, format: value })}
          >
            <SelectTrigger className="h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paragraphs">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Parágrafos</span>
                </div>
              </SelectItem>
              <SelectItem value="words">
                <div className="flex items-center gap-2">
                  <Wand2 className="w-4 h-4" />
                  <span>Palavras</span>
                </div>
              </SelectItem>
              <SelectItem value="lists">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span>Listas</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Size Selection */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Tamanho</Label>
          <div className="grid grid-cols-3 gap-2">
            {(['small', 'medium', 'large'] as const).map((size) => (
              <Button
                key={size}
                variant={config.size === size ? 'default' : 'outline'}
                onClick={() => setConfig({ ...config, size })}
                className="h-12 flex flex-col gap-1"
                size="sm"
              >
                <span className="text-sm font-medium">
                  {size === 'small' ? 'Pequeno' : size === 'medium' ? 'Médio' : 'Grande'}
                </span>
                <span className="text-xs text-muted-foreground">
                  {size === 'small' ? '20-40' : size === 'medium' ? '50-80' : '100-150'} palavras
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Quantity Input */}
        <div className="space-y-3">
          <Label className="text-base font-medium">
            Quantidade de {config.format === 'words' ? 'palavras' : config.format === 'paragraphs' ? 'parágrafos' : 'itens'}
          </Label>
          <Input
            type="number"
            min={range.min}
            max={range.max}
            value={config.quantity}
            onChange={(e) => setConfig({ 
              ...config, 
              quantity: Math.max(range.min, Math.min(range.max, parseInt(e.target.value) || range.min))
            })}
            className="h-12 text-lg"
          />
          <div className="text-xs text-muted-foreground">
            Entre {range.min} e {range.max} {config.format === 'words' ? 'palavras' : config.format === 'paragraphs' ? 'parágrafos' : 'itens'}
          </div>
        </div>

        <Separator />

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          size="lg"
          className="w-full h-14 text-lg"
        >
          <Shuffle className="w-5 h-5 mr-2" />
          Gerar Texto
        </Button>
      </CardContent>
    </Card>
  );
};