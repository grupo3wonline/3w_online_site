
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CodeExportProps {
  css: string;
}

export const CodeExport = ({ css }: CodeExportProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      toast({
        title: "Código copiado!",
        description: "O código CSS foi copiado para a área de transferência.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o código.",
        variant: "destructive",
      });
    }
  };

  const downloadCSS = () => {
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gradient.css';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download iniciado!",
      description: "O arquivo CSS será baixado em instantes.",
    });
  };

  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Código CSS</CardTitle>
          <Badge variant="secondary" className="text-xs">
            Pronto para usar
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <pre className="bg-black/30 p-4 rounded-lg text-sm font-mono text-green-400 overflow-x-auto border border-white/10">
            <code>{css}</code>
          </pre>
          
          <div className="flex gap-2 mt-4">
            <Button
              size="sm"
              onClick={copyToClipboard}
              className="flex items-center gap-2"
              variant={copied ? "default" : "outline"}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copiar
                </>
              )}
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={downloadCSS}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
