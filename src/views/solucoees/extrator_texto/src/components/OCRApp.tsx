import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Eye,
  FileSearch,
  Settings
} from "lucide-react";
import { createWorker } from 'tesseract.js';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { preprocessImage, detectAndCorrectOrientation, resizeForOCR } from '@/utils/imagePreprocessor';
import { detectDocumentType, extractDocumentInfo, formatExtractedInfo, type BrazilianDocument } from '@/utils/documentExtractor';

interface OCRAppProps {
  onBack: () => void;
}

const OCRApp = ({ onBack }: OCRAppProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [documentInfo, setDocumentInfo] = useState<BrazilianDocument>({});
  const [documentType, setDocumentType] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [useAdvancedOCR, setUseAdvancedOCR] = useState(true);
  const [activeTab, setActiveTab] = useState("text");
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

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "Arquivo muito grande",
        description: "O arquivo deve ter no máximo 10MB.",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    setExtractedText("");
    toast({
      title: "Arquivo selecionado",
      description: `${file.name} foi carregado com sucesso.`,
    });
  };

  const processOCR = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setProgress(0);
    setExtractedText("");
    setDocumentInfo({});
    setDocumentType("");

    try {
      let processedFile: File | Blob = selectedFile;
      
      // Pré-processamento da imagem para melhor qualidade OCR
      if (useAdvancedOCR && selectedFile.type.startsWith('image/')) {
        setProgress(10);
        
        // Redimensionar para performance otimizada
        processedFile = await resizeForOCR(selectedFile);
        setProgress(20);
        
        // Aplicar pré-processamento
        processedFile = await preprocessImage(processedFile as File);
        setProgress(30);
        
        // Corrigir orientação se necessário
        processedFile = await detectAndCorrectOrientation(processedFile as File);
        setProgress(40);
      }

      // Configuração avançada do Tesseract
      const worker = await createWorker('por+eng', 1, {
        logger: m => {
          if (m.status === 'recognizing text') {
            const ocrProgress = useAdvancedOCR ? 40 + (m.progress * 60) : m.progress * 100;
            setProgress(Math.round(ocrProgress));
          }
        }
      });

      // Configurações otimizadas para documentos brasileiros
      if (useAdvancedOCR) {
        await worker.setParameters({
          preserve_interword_spaces: '1',
          tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÀÁÂÃÄÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÇàáâãäèéêëìíîïòóôõöùúûüç0123456789.,;:!?()[]{}/-_@#$%&*+="\' ',
        });
      }

      const { data: { text, confidence } } = await worker.recognize(processedFile);
      
      setExtractedText(text);
      
      // Detectar tipo de documento e extrair informações estruturadas
      const detectedType = detectDocumentType(text);
      setDocumentType(detectedType);
      
      const extractedInfo = extractDocumentInfo(text);
      setDocumentInfo(extractedInfo);
      
      await worker.terminate();

      toast({
        title: "OCR Concluído!",
        description: `Texto extraído com ${Math.round(confidence)}% de confiança. Tipo: ${detectedType}`,
        variant: "default",
      });
      
      // Automaticamente ir para a aba de dados estruturados se informações foram encontradas
      if (Object.keys(extractedInfo).length > 0) {
        setActiveTab("structured");
      }
      
    } catch (error) {
      console.error('OCR Error:', error);
      toast({
        title: "Erro no OCR",
        description: "Ocorreu um erro ao processar o arquivo. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const copyToClipboard = async () => {
    try {
      let textToCopy = extractedText;
      
      // Se estivermos na aba estruturada e há dados, incluir informações formatadas
      if (activeTab === "structured" && Object.keys(documentInfo).length > 0) {
        const formattedInfo = formatExtractedInfo(documentInfo, documentType);
        textToCopy = formattedInfo + "\n\n" + "=== TEXTO COMPLETO ===\n\n" + extractedText;
      }
      
      await navigator.clipboard.writeText(textToCopy);
      toast({
        title: "Texto copiado!",
        description: activeTab === "structured" && Object.keys(documentInfo).length > 0 
          ? "Dados estruturados e texto copiados para a área de transferência."
          : "O texto foi copiado para a área de transferência.",
      });
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o texto.",
        variant: "destructive",
      });
    }
  };

  const downloadTXT = () => {
    let content = extractedText;
    
    // Se há dados estruturados, incluir no arquivo
    if (Object.keys(documentInfo).length > 0) {
      const formattedInfo = formatExtractedInfo(documentInfo, documentType);
      content = formattedInfo + "\n\n" + "=== TEXTO COMPLETO ===\n\n" + extractedText;
    }
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const filename = documentType ? `${documentType.toLowerCase().replace(/\s+/g, '-')}-extraido.txt` : 'texto-extraido.txt';
    saveAs(blob, filename);
    toast({
      title: "Download iniciado",
      description: "Arquivo TXT baixado com sucesso.",
    });
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    let content = extractedText;
    let yPos = 20;
    
    // Se há dados estruturados, adicionar ao PDF
    if (Object.keys(documentInfo).length > 0) {
      const formattedInfo = formatExtractedInfo(documentInfo, documentType);
      content = formattedInfo + "\n\n" + "=== TEXTO COMPLETO ===\n\n" + extractedText;
    }
    
    const splitText = doc.splitTextToSize(content, 180);
    doc.text(splitText, 10, yPos);
    
    const filename = documentType ? `${documentType.toLowerCase().replace(/\s+/g, '-')}-extraido.pdf` : 'texto-extraido.pdf';
    doc.save(filename);
    toast({
      title: "Download iniciado", 
      description: "Arquivo PDF baixado com sucesso.",
    });
  };

  const downloadDOC = async () => {
    let content = extractedText;
    
    // Se há dados estruturados, incluir no documento
    if (Object.keys(documentInfo).length > 0) {
      const formattedInfo = formatExtractedInfo(documentInfo, documentType);
      content = formattedInfo + "\n\n" + "=== TEXTO COMPLETO ===\n\n" + extractedText;
    }
    
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun(content)
            ],
          }),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    const filename = documentType ? `${documentType.toLowerCase().replace(/\s+/g, '-')}-extraido.docx` : 'texto-extraido.docx';
    saveAs(blob, filename);
    toast({
      title: "Download iniciado",
      description: "Arquivo DOCX baixado com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      {/* Header */}
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <Button variant="modern" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              TextGrab OCR
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Area */}
          <Card className="h-fit shadow-card border-border/50 bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload de Arquivo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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
                  Arraste seus arquivos aqui ou clique para selecionar
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
                    <CheckCircle className="h-5 w-5 text-accent" />
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {/* Configurações de OCR */}
                <div className="flex items-center justify-between p-3 bg-gradient-card rounded-lg border border-border/50">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">OCR Avançado</span>
                    <Badge variant={useAdvancedOCR ? "default" : "secondary"} className="text-xs">
                      {useAdvancedOCR ? "Ativo" : "Básico"}
                    </Badge>
                  </div>
                  <Button
                    variant="modern"
                    size="sm"
                    onClick={() => setUseAdvancedOCR(!useAdvancedOCR)}
                  >
                    {useAdvancedOCR ? "Desativar" : "Ativar"}
                  </Button>
                </div>

                <Button 
                  onClick={processOCR}
                  disabled={!selectedFile || isProcessing}
                  className="w-full"
                  variant="hero"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {useAdvancedOCR ? "Processando OCR Avançado..." : "Processando OCR..."}
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      {useAdvancedOCR ? "Extrair com OCR Avançado" : "Extrair Texto"}
                    </>
                  )}
                </Button>
              </div>

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

          {/* Results Area */}
          <Card className="h-fit shadow-card border-border/50 bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Resultados da Extração
                {documentType && (
                  <Badge variant="secondary" className="ml-2">
                    {documentType}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="text" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Texto Completo
                  </TabsTrigger>
                  <TabsTrigger value="structured" className="flex items-center gap-2">
                    <FileSearch className="h-4 w-4" />
                    Dados Estruturados
                    {Object.keys(documentInfo).length > 0 && (
                      <Badge variant="default" className="ml-1 h-5 w-5 p-0 text-xs">
                        {Object.keys(documentInfo).length}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="space-y-4">
                  <Textarea
                    value={extractedText}
                    onChange={(e) => setExtractedText(e.target.value)}
                    placeholder="O texto extraído aparecerá aqui..."
                    className="min-h-[300px] resize-none"
                    disabled={isProcessing}
                  />
                  
                  {extractedText && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <AlertCircle className="h-4 w-4" />
                      Você pode editar o texto acima antes de exportar
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="structured" className="space-y-4">
                  {Object.keys(documentInfo).length > 0 ? (
                    <div className="space-y-4">
                      <div className="bg-gradient-card rounded-lg p-4 border border-border/50">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          Informações Identificadas
                        </h4>
                        <div className="grid gap-3">
                          {documentInfo.name && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Nome:</span>
                              <span className="font-medium">{documentInfo.name}</span>
                            </div>
                          )}
                          {documentInfo.cpf && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">CPF:</span>
                              <span className="font-medium font-mono">{documentInfo.cpf}</span>
                            </div>
                          )}
                          {documentInfo.rg && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">RG:</span>
                              <span className="font-medium font-mono">{documentInfo.rg}</span>
                            </div>
                          )}
                          {documentInfo.cnh && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">CNH:</span>
                              <span className="font-medium font-mono">{documentInfo.cnh}</span>
                            </div>
                          )}
                          {documentInfo.tituloEleitor && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Título Eleitor:</span>
                              <span className="font-medium font-mono">{documentInfo.tituloEleitor}</span>
                            </div>
                          )}
                          {documentInfo.reservista && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Reservista:</span>
                              <span className="font-medium font-mono">{documentInfo.reservista}</span>
                            </div>
                          )}
                          {documentInfo.passaporte && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Passaporte:</span>
                              <span className="font-medium font-mono">{documentInfo.passaporte}</span>
                            </div>
                          )}
                          {documentInfo.birthDate && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Data de Nascimento:</span>
                              <span className="font-medium">{documentInfo.birthDate}</span>
                            </div>
                          )}
                          {documentInfo.motherName && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Nome da Mãe:</span>
                              <span className="font-medium">{documentInfo.motherName}</span>
                            </div>
                          )}
                          {documentInfo.fatherName && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Nome do Pai:</span>
                              <span className="font-medium">{documentInfo.fatherName}</span>
                            </div>
                          )}
                          {documentInfo.naturalidade && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Naturalidade:</span>
                              <span className="font-medium">{documentInfo.naturalidade}</span>
                            </div>
                          )}
                          {documentInfo.validUntil && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Válido até:</span>
                              <span className="font-medium">{documentInfo.validUntil}</span>
                            </div>
                          )}
                          {documentInfo.issuedBy && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Expedido por:</span>
                              <span className="font-medium">{documentInfo.issuedBy}</span>
                            </div>
                          )}
                          {documentInfo.category && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Categoria:</span>
                              <span className="font-medium">{documentInfo.category}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileSearch className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhuma informação estruturada detectada</p>
                      <p className="text-sm">Faça o upload de um documento brasileiro para ver dados estruturados</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              {(extractedText || Object.keys(documentInfo).length > 0) && (
                <div className="space-y-4 border-t border-border/50 pt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={copyToClipboard}
                      variant="modern"
                      className="flex items-center gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Copiar
                    </Button>
                    <Button
                      onClick={downloadTXT}
                      variant="modern"
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      .TXT
                    </Button>
                    <Button
                      onClick={downloadDOC}
                      variant="modern"
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      .DOCX
                    </Button>
                    <Button
                      onClick={downloadPDF}
                      variant="modern"
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      .PDF
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OCRApp;