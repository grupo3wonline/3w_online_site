import { Copy, FileText, Download, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { GeneratorConfig } from '@/types/generator';
import { toast } from '@/hooks/use-toast';

interface TextOutputProps {
  text: string;
  config: GeneratorConfig;
}

export const TextOutput = ({ text, config }: TextOutputProps) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Texto copiado!",
        description: "O texto foi copiado para sua área de transferência.",
      });
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o texto.",
        variant: "destructive",
      });
    }
  };

  const clearText = () => {
    // This will be handled by the parent component
    toast({
      title: "Texto limpo",
      description: "Gere um novo texto usando as configurações.",
    });
  };

  const downloadText = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `textgenius-${config.textType}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Arquivo baixado!",
      description: "O texto foi salvo em um arquivo .txt",
    });
  };

  const getTypeInfo = () => {
    switch (config.textType) {
      case 'lorem':
        return { name: 'Lorem Ipsum', color: 'bg-primary' };
      case 'hipster':
        return { name: 'Hipster Ipsum', color: 'bg-hipster' };
      case 'mussum':
        return { name: 'Mussum Ipsum', color: 'bg-mussum' };
      case 'creative':
        return { name: 'Creative Ipsum', color: 'bg-creative' };
      default:
        return { name: 'Texto Gerado', color: 'bg-primary' };
    }
  };

  const typeInfo = getTypeInfo();
  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
  const charCount = text.length;

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-2xl">
          <div className="flex items-center gap-2">
            <Copy className="w-6 h-6 text-primary" />
            <span>Texto Gerado</span>
            {text && (
              <Badge variant="secondary" className="ml-2">
                {typeInfo.name}
              </Badge>
            )}
          </div>
          
          {text && (
            <div className="flex items-center gap-2">
              <Button
                onClick={downloadText}
                variant="outline"
                size="sm"
                className="hidden sm:flex"
              >
                <Download className="w-4 h-4" />
              </Button>
              
              <Button
                onClick={clearText}
                variant="outline"
                size="sm"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
              >
                <Copy className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Copiar</span>
              </Button>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {text ? (
          <div className="space-y-4">
            {/* Stats */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>{wordCount} palavras</span>
              <span>{charCount} caracteres</span>
              <span>{config.format}</span>
              <span>{config.size}</span>
            </div>
            
            <Separator />
            
            {/* Text Display */}
            <div className="bg-muted/30 rounded-lg p-6 border border-border">
              <div className="text-foreground leading-relaxed whitespace-pre-wrap text-justify max-h-96 overflow-y-auto">
                {config.format === 'lists' ? (
                  <ul className="space-y-2">
                    {text.split('\n').filter(line => line.trim()).map((line, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>{line.trim()}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  text
                )}
              </div>
            </div>
            
            {/* Mobile Actions */}
            <div className="flex sm:hidden gap-2">
              <Button
                onClick={downloadText}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <Download className="w-4 h-4 mr-2" />
                Baixar
              </Button>
              <Button
                onClick={copyToClipboard}
                variant="outline" 
                size="sm"
                className="flex-1"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copiar
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-80 text-center">
            <div className="space-y-4">
              <FileText className="w-16 h-16 mx-auto text-muted-foreground/50" />
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Pronto para gerar texto?
                </h3>
                <p className="text-muted-foreground">
                  Configure as opções ao lado e clique em "Gerar Texto" para começar
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};