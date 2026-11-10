
import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import JsBarcode from "jsbarcode";

interface BarcodeGeneratorProps {
  text: string;
}

const BarcodeGenerator = ({ text }: BarcodeGeneratorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (text && canvasRef.current) {
      generateBarcode();
    }
  }, [text]);

  const generateBarcode = async () => {
    if (!canvasRef.current || !text) return;

    setIsGenerating(true);
    setError(null);
    
    try {
      // Clear canvas
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }

      JsBarcode(canvasRef.current, text, {
        format: "CODE128",
        width: 2,
        height: 100,
        displayValue: true,
        fontSize: 14,
        margin: 10,
        background: "#ffffff",
        lineColor: "#1e293b",
      });
    } catch (error) {
      console.error('Error generating barcode:', error);
      setError("Texto inválido para código de barras. Tente apenas números e letras.");
      toast({
        title: "Erro",
        description: "Não foi possível gerar o código de barras. Verifique se o texto contém apenas caracteres válidos.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadBarcode = () => {
    if (!canvasRef.current) return;

    try {
      const link = document.createElement('a');
      link.download = 'barcode.png';
      link.href = canvasRef.current.toDataURL();
      link.click();
      
      toast({
        title: "Download iniciado!",
        description: "Seu código de barras foi baixado com sucesso.",
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
      <div className="bg-white p-6 rounded-lg shadow-sm inline-block min-h-[140px] flex items-center justify-center">
        {error ? (
          <div className="text-red-500 text-sm max-w-xs">
            <p className="font-medium">Erro ao gerar código</p>
            <p className="mt-1">{error}</p>
            <p className="mt-2 text-xs text-slate-500">
              Dica: Use apenas letras, números e alguns símbolos básicos
            </p>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            className={`max-w-full h-auto ${isGenerating ? 'opacity-50' : ''}`}
            width={400}
            height={140}
          />
        )}
        {isGenerating && !error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>
      
      <Button 
        onClick={downloadBarcode}
        disabled={!text || isGenerating || !!error}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      >
        <Download className="w-4 h-4 mr-2" />
        Baixar PNG
      </Button>
    </div>
  );
};

export default BarcodeGenerator;
