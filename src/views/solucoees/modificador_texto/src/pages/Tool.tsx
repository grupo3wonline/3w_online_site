import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

type TransformationType = 
  | 'uppercase' 
  | 'lowercase' 
  | 'capitalize' 
  | 'alternating' 
  | 'sentence' 
  | 'title' 
  | 'inverse' 
  | 'reverse';

const Tool = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [transformation, setTransformation] = useState<TransformationType>('uppercase');
  const [useFilter, setUseFilter] = useState(false);
  const [minLength, setMinLength] = useState(3);
  const { toast } = useToast();

  const transformations = [
    { value: 'uppercase', label: 'MAIÚSCULAS', example: 'HELLO WORLD' },
    { value: 'lowercase', label: 'minúsculas', example: 'hello world' },
    { value: 'capitalize', label: 'Primeira Letra Maiúscula', example: 'Hello World' },
    { value: 'alternating', label: 'fOrMaTo aLtErNaDo', example: 'hElLo WoRlD' },
    { value: 'sentence', label: 'Formato Frase', example: 'Hello world. How are you?' },
    { value: 'title', label: 'Title Case', example: 'Hello World Title' },
    { value: 'inverse', label: 'InVeRsE CaSe', example: 'hELLO wORLD' },
    { value: 'reverse', label: 'Inverter Texto', example: 'dlrow olleh' }
  ];

  const applyTransformation = (text: string, type: TransformationType, filter: boolean, minLen: number): string => {
    if (!text) return '';

    const words = text.split(/(\s+)/);
    
    const processedWords = words.map(word => {
      // Keep whitespace as is
      if (/^\s+$/.test(word)) return word;
      
      // Apply filter if enabled
      if (filter && word.length < minLen && /\w/.test(word)) {
        return word;
      }

      switch (type) {
        case 'uppercase':
          return word.toUpperCase();
        case 'lowercase':
          return word.toLowerCase();
        case 'capitalize':
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        case 'alternating':
          return word.split('').map((char, i) => 
            i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
          ).join('');
        case 'sentence':
          return word;
        case 'title':
          // Simple title case (more complex logic could be added for articles, prepositions, etc.)
          if (word.length <= 3 && ['and', 'or', 'but', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'by', 'with'].includes(word.toLowerCase())) {
            return word.toLowerCase();
          }
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        case 'inverse':
          return word.split('').map(char => 
            char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
          ).join('');
        case 'reverse':
          return word.split('').reverse().join('');
        default:
          return word;
      }
    });

    let result = processedWords.join('');

    // Special handling for sentence case
    if (type === 'sentence') {
      result = result.toLowerCase().replace(/(^|\. )([a-z])/g, (match, prefix, letter) => 
        prefix + letter.toUpperCase()
      );
    }

    return result;
  };

  useEffect(() => {
    const result = applyTransformation(inputText, transformation, useFilter, minLength);
    setOutputText(result);
  }, [inputText, transformation, useFilter, minLength]);

  const handleCopy = async () => {
    if (!outputText) {
      toast({
        title: "Nada para copiar",
        description: "O campo de resultado está vazio.",
        variant: "destructive"
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Copiado!",
        description: "Texto copiado para a área de transferência."
      });
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o texto.",
        variant: "destructive"
      });
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    toast({
      title: "Campos limpos",
      description: "Todos os campos foram limpos."
    });
  };

  const getStats = (text: string) => {
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    return { chars, words };
  };

  const inputStats = getStats(inputText);
  const outputStats = getStats(outputText);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-smooth">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">TC</span>
            </div>
            <span className="font-semibold text-xl text-foreground">TextCraft</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
            Manipulador de Texto
          </h1>
          <p className="text-muted-foreground">
            Transforme seu texto com facilidade usando nossas ferramentas avançadas
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Texto Original</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {inputStats.chars} chars • {inputStats.words} words
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Cole ou digite seu texto aqui..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[200px] resize-none bg-background/50 border-border/50 focus:border-primary transition-smooth"
              />
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Resultado</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {outputStats.chars} chars • {outputStats.words} words
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Seu texto transformado aparecerá aqui..."
                value={outputText}
                readOnly
                className="min-h-[200px] resize-none bg-muted/30 border-border/50 cursor-default"
              />
              <div className="flex gap-2">
                <Button onClick={handleCopy} className="flex-1" variant="gradient">
                  📋 Copiar Texto
                </Button>
                <Button onClick={handleClear} variant="outline">
                  🗑️ Limpar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls Section */}
        <Card className="mt-8 bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle>Opções de Transformação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Transformation Type */}
            <div className="space-y-2">
              <Label htmlFor="transformation">Tipo de Transformação</Label>
              <Select value={transformation} onValueChange={(value: TransformationType) => setTransformation(value)}>
                <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary transition-smooth">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {transformations.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      <div className="flex flex-col items-start">
                        <span>{t.label}</span>
                        <span className="text-xs text-muted-foreground">Ex: {t.example}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Filter Options */}
            <div className="space-y-4 p-4 bg-muted/20 rounded-lg border border-border/30">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="filter"
                  checked={useFilter}
                  onCheckedChange={(checked) => setUseFilter(checked === true)}
                />
                <Label htmlFor="filter" className="font-medium">
                  Ignorar palavras menores que X caracteres
                </Label>
              </div>
              
              {useFilter && (
                <div className="flex items-center space-x-2 ml-6">
                  <Label htmlFor="minLength" className="text-sm">
                    Mínimo de caracteres:
                  </Label>
                  <Input
                    id="minLength"
                    type="number"
                    min="1"
                    max="10"
                    value={minLength}
                    onChange={(e) => setMinLength(Number(e.target.value))}
                    className="w-20 bg-background/50 border-border/50 focus:border-primary transition-smooth"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tool;
