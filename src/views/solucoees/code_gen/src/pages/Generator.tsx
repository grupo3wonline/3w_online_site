
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Download, QrCode, BarChart3, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import BarcodeGenerator from "@/components/BarcodeGenerator";

const Generator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [inputText, setInputText] = useState("");
  const [activeTab, setActiveTab] = useState("qrcode");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inputText);
      setCopied(true);
      toast({
        title: "Copiado!",
        description: "Texto copiado para a área de transferência.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível copiar o texto.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 hover:bg-white/50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CodeGen
              </span>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Gerador de Códigos
            </h1>
            <p className="text-xl text-slate-600">
              Crie QR Codes e Códigos de Barras profissionais
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Configurações</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="input-text" className="text-sm font-medium">
                    Texto ou URL
                  </Label>
                  <div className="relative">
                    <Input
                      id="input-text"
                      placeholder="Digite seu texto, URL ou dados aqui..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="pr-10"
                    />
                    {inputText && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={copyToClipboard}
                        className="absolute right-1 top-1 h-8 w-8 p-0"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Tipo de Código</Label>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="qrcode" className="flex items-center space-x-2">
                        <QrCode className="w-4 h-4" />
                        <span>QR Code</span>
                      </TabsTrigger>
                      <TabsTrigger value="barcode" className="flex items-center space-x-2">
                        <BarChart3 className="w-4 h-4" />
                        <span>Código de Barras</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                    <div>
                      <strong className="block text-slate-800">QR Code ideal para:</strong>
                      <ul className="mt-1 space-y-1 text-xs">
                        <li>• URLs e links</li>
                        <li>• Textos longos</li>
                        <li>• Contatos (vCard)</li>
                        <li>• WiFi credentials</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="block text-slate-800">Código de Barras para:</strong>
                      <ul className="mt-1 space-y-1 text-xs">
                        <li>• Produtos (SKU)</li>
                        <li>• Números</li>
                        <li>• Identificadores</li>
                        <li>• Inventário</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preview Section */}
            <Card className="shadow-xl bg-white/80 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Pré-visualização</span>
                  {inputText && (
                    <div className="text-sm text-slate-500">
                      {activeTab === "qrcode" ? "QR Code" : "Código de Barras"}
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="min-h-[300px] flex items-center justify-center">
                  {!inputText ? (
                    <div className="text-center text-slate-400">
                      <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        {activeTab === "qrcode" ? (
                          <QrCode className="w-10 h-10" />
                        ) : (
                          <BarChart3 className="w-10 h-10" />
                        )}
                      </div>
                      <p>Digite algo acima para gerar o código</p>
                    </div>
                  ) : (
                    <Tabs value={activeTab} className="w-full">
                      <TabsContent value="qrcode" className="mt-0">
                        <QRCodeGenerator text={inputText} />
                      </TabsContent>
                      <TabsContent value="barcode" className="mt-0">
                        <BarcodeGenerator text={inputText} />
                      </TabsContent>
                    </Tabs>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;
