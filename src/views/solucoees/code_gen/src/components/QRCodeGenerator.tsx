
import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import QRCode from "qrcode";

interface QRCodeGeneratorProps {
  text: string;
}

const QRCodeGenerator = ({ text }: QRCodeGeneratorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (text && canvasRef.current) {
      generateQRCode();
    }
  }, [text]);

  const generateQRCode = async () => {
    if (!canvasRef.current || !text) return;

    setIsGenerating(true);
    try {
      await QRCode.toCanvas(canvasRef.current, text, {
        width: 300,
        margin: 2,
        color: {
          dark: '#1e293b',
          light: '#ffffff'
        }
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast({
        title: "Erro",
        description: "Não foi possível gerar o QR Code.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (!canvasRef.current) return;

    try {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = canvasRef.current.toDataURL();
      link.click();
      
      toast({
        title: "Download iniciado!",
        description: "Seu QR Code foi baixado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível fazer o download.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="text-center space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm inline-block">
        <canvas
          ref={canvasRef}
          className={`max-w-full h-auto ${isGenerating ? 'opacity-50' : ''}`}
          style={{ imageRendering: 'pixelated' }}
        />
        {isGenerating && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>
      
      <Button 
        onClick={downloadQRCode}
        disabled={!text || isGenerating}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      >
        <Download className="w-4 h-4 mr-2" />
        Baixar PNG
      </Button>
    </div>
  );
};

export default QRCodeGenerator;
