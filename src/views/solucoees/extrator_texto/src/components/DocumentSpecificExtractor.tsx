import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  FileText, 
  Download, 
  Copy, 
  ArrowLeft, 
  Loader2,
  CheckCircle,
  AlertCircle,
  FileSearch,
  Settings,
  CreditCard,
  Wallet,
  Car,
  Vote,
  ShieldCheck,
  Plane
} from "lucide-react";
import { createWorker } from 'tesseract.js';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { preprocessImage, resizeForOCR } from '@/utils/imagePreprocessor';
import { extractRGInfo } from '@/utils/extractors/rgExtractor';
import { extractCPFInfo } from '@/utils/extractors/cpfExtractor';
import { extractCNHInfo } from '@/utils/extractors/cnhExtractor';
import { extractTituloEleitorInfo } from '@/utils/extractors/tituloEleitorExtractor';
import { extractPassaporteInfo } from '@/utils/extractors/passaporteExtractor';
import type { DocumentType, ExtractionResult } from '@/types/documentTypes';

interface DocumentSpecificExtractorProps {
  onBack: () => void;
}

const documentTypes = [
  { value: 'RG', label: 'RG - Carteira de Identidade', icon: CreditCard, color: 'bg-blue-500' },
  { value: 'CPF', label: 'CPF - Cadastro de Pessoa Física', icon: Wallet, color: 'bg-green-500' },
  { value: 'CNH', label: 'CNH - Carteira Nacional de Habilitação', icon: Car, color: 'bg-orange-500' },
  { value: 'TITULO_ELEITOR', label: 'Título Eleitor', icon: Vote, color: 'bg-purple-500' },
  { value: 'RESERVISTA', label: 'Certificado de Reservista', icon: ShieldCheck, color: 'bg-red-500' },
  { value: 'PASSAPORTE', label: 'Passaporte', icon: Plane, color: 'bg-indigo-500' },
];

const DocumentSpecificExtractor = ({ onBack }: DocumentSpecificExtractorProps) => {
  const [selectedDocumentType, setSelectedDocumentType] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractionResult, setExtractionResult] = useState<ExtractionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelection = (file: File) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
    
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Formato não suportado",
        description: "Por favor, selecione uma imagem (PNG, JPG) ou PDF.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O arquivo deve ter no máximo 10MB.",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    setExtractionResult(null);
    toast({
      title: "Arquivo selecionado",
      description: `${file.name} foi carregado com sucesso.`,
    });
  };

  const processSpecificExtraction = async () => {
    if (!selectedFile || !selectedDocumentType) return;

    setIsProcessing(true);
    setProgress(0);
    setExtractionResult(null);

    try {
      let processedFile: File | Blob = selectedFile;
      
      // Pré-processamento para melhor qualidade
      if (selectedFile.type.startsWith('image/')) {
        setProgress(10);
        processedFile = await resizeForOCR(selectedFile);
        setProgress(20);
        processedFile = await preprocessImage(processedFile as File);
        setProgress(30);
      }

      // OCR com configurações específicas para o tipo de documento
      const worker = await createWorker('por+eng', 1, {
        logger: m => {
          if (m.status === 'recognizing text') {
            const ocrProgress = 30 + (m.progress * 60);
            setProgress(Math.round(ocrProgress));
          }
        }
      });

      // Configurações específicas por tipo de documento
      await worker.setParameters({
        preserve_interword_spaces: '1',
        tessedit_char_whitelist: getCharWhitelistForDocument(selectedDocumentType),
      });

      const { data: { text, confidence } } = await worker.recognize(processedFile);
      await worker.terminate();
      
      setProgress(95);

      // Extração específica baseada no tipo de documento
      let result: ExtractionResult;
      
      switch (selectedDocumentType) {
        case 'RG':
          result = extractRGInfo(text);
          break;
        case 'CPF':
          result = extractCPFInfo(text);
          break;
        case 'CNH':
          result = extractCNHInfo(text);
          break;
        case 'TITULO_ELEITOR':
          result = extractTituloEleitorInfo(text);
          break;
        case 'PASSAPORTE':
          result = extractPassaporteInfo(text);
          break;
        default:
          result = {
            success: false,
            confidence: 0,
            errors: ['Tipo de documento não suportado'],
          };
      }

      // Ajustar confiança baseada no OCR
      if (result.document) {
        result.confidence = Math.min(result.confidence * (confidence / 100), 100);
      }

      setExtractionResult(result);
      setProgress(100);

      if (result.success) {
        toast({
          title: "Extração Concluída!",
          description: `Informações extraídas com ${Math.round(result.confidence)}% de confiança.`,
          variant: "default",
        });
      } else {
        toast({
          title: "Extração com Problemas",
          description: "Algumas informações podem não ter sido encontradas.",
          variant: "destructive",
        });
      }
      
    } catch (error) {
      console.error('Extraction Error:', error);
      toast({
        title: "Erro na Extração",
        description: "Ocorreu um erro ao processar o documento.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const getCharWhitelistForDocument = (docType: string): string => {
    const base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÀÁÂÃÄÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÇàáâãäèéêëìíîïòóôõöùúûüç0123456789.,;:!?()[]{}/-_@#$%&*+="\' ';
    
    switch (docType) {
      case 'CNH':
        return base + 'ABCDE'; // Categorias de CNH
      case 'PASSAPORTE':
        return base; // Inclui letras maiúsculas para código do passaporte
      default:
        return base;
    }
  };

  const getSelectedDocumentInfo = () => {
    return documentTypes.find(doc => doc.value === selectedDocumentType);
  };

  const downloadStructuredInfo = () => {
    if (!extractionResult?.document) return;
    
    const doc = extractionResult.document;
    let content = `=== ${doc.type} - INFORMAÇÕES EXTRAÍDAS ===\n\n`;
    
    Object.entries(doc).forEach(([key, value]) => {
      if (key !== 'type' && key !== 'rawText' && value) {
        const label = key.charAt(0).toUpperCase() + key.slice(1);
        content += `${label}: ${value}\n`;
      }
    });
    
    content += `\nConfiança: ${Math.round(extractionResult.confidence)}%\n`;
    content += `\n=== TEXTO COMPLETO ===\n\n${doc.rawText}`;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const filename = `${doc.type.toLowerCase()}-extraido.txt`;
    saveAs(blob, filename);
    
    toast({
      title: "Download iniciado",
      description: "Arquivo com informações estruturadas baixado.",
    });
  };

  const copyStructuredInfo = async () => {
    if (!extractionResult?.document) return;
    
    const doc = extractionResult.document;
    let content = `=== ${doc.type} - INFORMAÇÕES EXTRAÍDAS ===\n\n`;
    
    Object.entries(doc).forEach(([key, value]) => {
      if (key !== 'type' && key !== 'rawText' && value) {
        const label = key.charAt(0).toUpperCase() + key.slice(1);
        content += `${label}: ${value}\n`;
      }
    });
    
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Informações copiadas!",
        description: "Dados estruturados copiados para a área de transferência.",
      });
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar as informações.",
        variant: "destructive",
      });
    }
  };

  const renderDocumentFields = () => {
    if (!extractionResult?.document) return null;
    
    const doc = extractionResult.document;
    const fields = Object.entries(doc).filter(([key, value]) => 
      key !== 'type' && key !== 'rawText' && value
    );
    
    return (
      <div className="grid gap-3">
        {fields.map(([key, value]) => (
          <div key={key} className="flex justify-between items-center p-2 bg-muted/30 rounded">
            <span className="text-sm font-medium capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}:
            </span>
            <span className="text-sm font-mono">{value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="modern" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div className="flex items-center space-x-2">
            <FileSearch className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Extrator de Documentos
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload e Configuração */}
          <Card className="h-fit shadow-card border-border/50 bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configuração e Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Seleção do Tipo de Documento */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Tipo de Documento</label>
                <Select value={selectedDocumentType} onValueChange={setSelectedDocumentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de documento" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map((doc) => (
                      <SelectItem key={doc.value} value={doc.value}>
                        <div className="flex items-center gap-2">
                          <doc.icon className="h-4 w-4" />
                          {doc.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedDocumentType && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {(() => {
                        const docInfo = getSelectedDocumentInfo();
                        return docInfo ? <docInfo.icon className="h-3 w-3" /> : null;
                      })()}
                      {getSelectedDocumentInfo()?.label}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer ${
                  dragActive 
                    ? 'border-primary bg-primary/5 shadow-glow' 
                    : 'border-border hover:border-primary/30 hover:bg-primary/5'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">
                  Arraste o documento aqui ou clique para selecionar
                </p>
                <p className="text-sm text-muted-foreground">
                  Suporta PNG, JPG e PDF (máx. 10MB)
                </p>
                <input
                  id="file-input"
                  type="file"
                  accept=".png,.jpg,.jpeg,.pdf"
                  onChange={(e) => e.target.files?.[0] && handleFileSelection(e.target.files[0])}
                  className="hidden"
                />
              </div>

              {selectedFile && (
                <div className="bg-gradient-card rounded-lg p-4 border border-border/50 shadow-soft">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                </div>
              )}

              <Button 
                onClick={processSpecificExtraction}
                disabled={!selectedFile || !selectedDocumentType || isProcessing}
                className="w-full"
                variant="hero"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Extraindo Informações...
                  </>
                ) : (
                  <>
                    <FileSearch className="mr-2 h-4 w-4" />
                    Extrair Dados do {selectedDocumentType || 'Documento'}
                  </>
                )}
              </Button>

              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resultados */}
          <Card className="h-fit shadow-card border-border/50 bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Informações Extraídas
                {extractionResult && (
                  <Badge variant={extractionResult.success ? "default" : "destructive"}>
                    {Math.round(extractionResult.confidence)}% confiança
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!extractionResult ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileSearch className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Selecione um documento e clique em "Extrair" para ver os resultados</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Alertas e Sugestões */}
                  {extractionResult.errors && extractionResult.errors.length > 0 && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="space-y-1">
                          {extractionResult.errors.map((error, index) => (
                            <div key={index}>• {error}</div>
                          ))}
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {extractionResult.suggestions && extractionResult.suggestions.length > 0 && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="space-y-1">
                          <strong>Sugestões para melhorar a extração:</strong>
                          {extractionResult.suggestions.map((suggestion, index) => (
                            <div key={index}>• {suggestion}</div>
                          ))}
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Dados Extraídos */}
                  {extractionResult.document && (
                    <div className="space-y-4">
                      <div className="bg-gradient-card rounded-lg p-4 border border-border/50">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Dados Identificados
                        </h4>
                        {renderDocumentFields()}
                      </div>

                      {/* Ações */}
                      <div className="grid grid-cols-2 gap-3 border-t border-border/50 pt-4">
                        <Button
                          onClick={copyStructuredInfo}
                          variant="modern"
                          className="flex items-center gap-2"
                        >
                          <Copy className="h-4 w-4" />
                          Copiar Dados
                        </Button>
                        <Button
                          onClick={downloadStructuredInfo}
                          variant="modern"
                          className="flex items-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Baixar .TXT
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DocumentSpecificExtractor;