
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FileText, Zap, Share2, Loader2 } from 'lucide-react';

interface ConversionStatusProps {
  progress: number;
  isConverting: boolean;
  isSharing: boolean;
  fileName: string;
  outputFormat: string;
}

const ConversionStatus = ({ 
  progress, 
  isConverting, 
  isSharing, 
  fileName, 
  outputFormat 
}: ConversionStatusProps) => {
  const getStatusText = () => {
    if (isSharing) return 'Gerando link de compartilhamento...';
    if (progress < 100) return 'Convertendo arquivo...';
    return 'Conversão concluída!';
  };

  const getStatusIcon = () => {
    if (isSharing) return <Share2 className="w-6 h-6 text-blue-600" />;
    if (progress < 100) return <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />;
    return <Zap className="w-6 h-6 text-green-600" />;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Processando Arquivo</h1>
        <p className="text-xl text-gray-600">
          Aguarde enquanto convertemos e preparamos seu arquivo para compartilhamento
        </p>
      </div>

      <Card className="glass-effect max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {getStatusIcon()}
            <div>
              <p className="text-lg">{getStatusText()}</p>
              <p className="text-sm text-gray-500 font-normal">
                {fileName} → {outputFormat.toUpperCase()}
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isSharing && (
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progresso da conversão</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          )}

          {isSharing && (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center space-x-3">
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                <span className="text-gray-600">Preparando link seguro...</span>
              </div>
            </div>
          )}

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 mb-1">O que está acontecendo?</p>
                <ul className="text-blue-700 space-y-1">
                  {progress < 100 && <li>• Convertendo arquivo para {outputFormat.toUpperCase()}</li>}
                  {progress === 100 && !isSharing && <li>• Conversão finalizada com sucesso</li>}
                  {isSharing && <li>• Enviando arquivo para compartilhamento seguro</li>}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversionStatus;
