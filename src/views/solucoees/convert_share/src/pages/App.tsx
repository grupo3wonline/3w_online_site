
import { useState, useCallback } from "react";
import { ArrowLeft, Upload, FileText, Download, Share2, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import FileUpload from "@/components/FileUpload";
import ConversionStatus from "@/components/ConversionStatus";
import ShareResult from "@/components/ShareResult";

const App = () => {
  const [step, setStep] = useState<'upload' | 'convert' | 'share'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>('');
  const [conversionProgress, setConversionProgress] = useState(0);
  const [isConverting, setIsConverting] = useState(false);
  const [shareLink, setShareLink] = useState<string>('');
  const [isSharing, setIsSharing] = useState(false);
  const { toast } = useToast();

  const supportedFormats = [
    { value: 'pdf', label: 'PDF', description: 'Portable Document Format' },
    { value: 'docx', label: 'DOCX', description: 'Microsoft Word Document' },
    { value: 'xlsx', label: 'XLSX', description: 'Microsoft Excel Spreadsheet' },
    { value: 'pptx', label: 'PPTX', description: 'Microsoft PowerPoint' },
    { value: 'jpg', label: 'JPG', description: 'JPEG Image' },
    { value: 'png', label: 'PNG', description: 'Portable Network Graphics' },
    { value: 'mp4', label: 'MP4', description: 'Video Format' },
    { value: 'mp3', label: 'MP3', description: 'Audio Format' },
  ];

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    console.log('Arquivo selecionado:', file.name, file.type, file.size);
    toast({
      title: "Arquivo carregado!",
      description: `${file.name} está pronto para conversão.`,
    });
  }, [toast]);

  const handleConvert = async () => {
    if (!selectedFile || !outputFormat) {
      toast({
        title: "Erro",
        description: "Selecione um arquivo e formato de saída.",
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);
    setStep('convert');
    
    console.log('Iniciando conversão:', selectedFile.name, 'para', outputFormat);

    // Simulação do processo de conversão
    for (let i = 0; i <= 100; i += 10) {
      setConversionProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    toast({
      title: "Conversão concluída!",
      description: "Arquivo convertido com sucesso.",
    });

    // Simular compartilhamento automático
    await handleShare();
  };

  const handleShare = async () => {
    setIsSharing(true);
    
    console.log('Iniciando compartilhamento do arquivo convertido');

    // Simulação do upload para File.io
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockShareLink = `https://file.io/abc123def456`;
    setShareLink(mockShareLink);
    setStep('share');
    setIsSharing(false);

    toast({
      title: "Link gerado!",
      description: "Seu arquivo está pronto para compartilhamento.",
    });
  };

  const resetProcess = () => {
    setStep('upload');
    setSelectedFile(null);
    setOutputFormat('');
    setConversionProgress(0);
    setIsConverting(false);
    setShareLink('');
    setIsSharing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">ConvertShare</span>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 'upload' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'}`}>
                <Upload className="w-5 h-5" />
              </div>
              <div className={`w-16 h-1 ${step !== 'upload' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 'convert' ? 'bg-blue-600 text-white' : step === 'share' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                <FileText className="w-5 h-5" />
              </div>
              <div className={`w-16 h-1 ${step === 'share' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 'share' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                <Share2 className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Upload Step */}
          {step === 'upload' && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Converter Arquivo</h1>
                <p className="text-xl text-gray-600">
                  Faça upload do seu arquivo e escolha o formato desejado
                </p>
              </div>

              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Upload do Arquivo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FileUpload onFileSelect={handleFileSelect} selectedFile={selectedFile} />
                </CardContent>
              </Card>

              {selectedFile && (
                <Card className="glass-effect animate-slide-up">
                  <CardHeader>
                    <CardTitle>Formato de Saída</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select value={outputFormat} onValueChange={setOutputFormat}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o formato desejado" />
                      </SelectTrigger>
                      <SelectContent>
                        {supportedFormats.map((format) => (
                          <SelectItem key={format.value} value={format.value}>
                            <div className="flex flex-col">
                              <span className="font-medium">{format.label}</span>
                              <span className="text-sm text-gray-500">{format.description}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {outputFormat && (
                      <Button 
                        onClick={handleConvert} 
                        className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        size="lg"
                      >
                        Converter para {outputFormat.toUpperCase()}
                        <ArrowLeft className="ml-2 w-4 h-4 rotate-180" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Convert Step */}
          {step === 'convert' && (
            <ConversionStatus 
              progress={conversionProgress}
              isConverting={isConverting}
              isSharing={isSharing}
              fileName={selectedFile?.name || ''}
              outputFormat={outputFormat}
            />
          )}

          {/* Share Step */}
          {step === 'share' && (
            <ShareResult 
              shareLink={shareLink}
              fileName={selectedFile?.name || ''}
              outputFormat={outputFormat}
              onReset={resetProcess}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
