
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Copy, Check, Download, RefreshCw, ExternalLink, Clock, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareResultProps {
  shareLink: string;
  fileName: string;
  outputFormat: string;
  onReset: () => void;
}

const ShareResult = ({ shareLink, fileName, outputFormat, onReset }: ShareResultProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      toast({
        title: "Link copiado!",
        description: "O link foi copiado para sua área de transferência.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const openLink = () => {
    window.open(shareLink, '_blank');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-green-600">Sucesso!</h1>
        <p className="text-xl text-gray-600">
          Seu arquivo foi convertido e está pronto para compartilhamento
        </p>
      </div>

      <Card className="glass-effect max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-blue-600" />
            Link de Compartilhamento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 mr-4">
                <p className="font-mono text-sm text-gray-700 break-all">
                  {shareLink}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyToClipboard}
                  className="flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copiado!' : 'Copiar'}
                </Button>
                <Button
                  size="sm"
                  onClick={openLink}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Abrir
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-900">Temporário</span>
              </div>
              <p className="text-sm text-blue-700">
                Este link expira automaticamente em 24 horas por segurança.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-900">Seguro</span>
              </div>
              <p className="text-sm text-green-700">
                Arquivo protegido e excluído automaticamente do servidor.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Detalhes do Arquivo</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p><span className="font-medium">Nome original:</span> {fileName}</p>
              <p><span className="font-medium">Formato convertido:</span> {outputFormat.toUpperCase()}</p>
              <p><span className="font-medium">Data:</span> {new Date().toLocaleDateString('pt-BR')}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onReset}
              variant="outline"
              className="flex items-center gap-2 flex-1"
            >
              <RefreshCw className="w-4 h-4" />
              Converter Outro Arquivo
            </Button>
            <Button
              onClick={copyToClipboard}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex-1"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Link Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Link
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShareResult;
