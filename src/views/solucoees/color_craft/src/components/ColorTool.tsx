
import { useState, useRef } from 'react';
import { Copy, Download, RefreshCw, Heart, Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const ColorTool = () => {
  const [baseColor, setBaseColor] = useState('#3B82F6');
  const [colorScheme, setColorScheme] = useState('complementary');
  const [generatedPalette, setGeneratedPalette] = useState(['#3B82F6', '#F59E0B', '#EF4444', '#10B981', '#8B5CF6']);
  const [extractionMode, setExtractionMode] = useState<'harmony' | 'image'>('harmony');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const colorSchemes = [
    { value: 'complementary', label: 'Complementar' },
    { value: 'analogous', label: 'Análogo' },
    { value: 'triadic', label: 'Tríade' },
    { value: 'monochromatic', label: 'Monocromático' },
    { value: 'square', label: 'Quadrado' },
    { value: 'split-complementary', label: 'Dividir Complementar' },
    { value: 'tetradic', label: 'Tetrádico' },
    { value: 'compound', label: 'Composto' }
  ];

  const extractColorsFromImage = (imageFile: File) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) return;
        
        // Resize for performance
        const maxSize = 200;
        const scale = Math.min(maxSize / img.width, maxSize / img.height);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        
        // Simple color extraction - collect samples
        const colorMap = new Map<string, number>();
        
        for (let i = 0; i < pixels.length; i += 4 * 10) { // Sample every 10th pixel
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const a = pixels[i + 3];
          
          // Skip transparent pixels
          if (a < 128) continue;
          
          // Round to reduce color variations
          const roundedR = Math.round(r / 32) * 32;
          const roundedG = Math.round(g / 32) * 32;
          const roundedB = Math.round(b / 32) * 32;
          
          const hex = `#${roundedR.toString(16).padStart(2, '0')}${roundedG.toString(16).padStart(2, '0')}${roundedB.toString(16).padStart(2, '0')}`;
          colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
        }
        
        // Get top 5 colors
        const sortedColors = Array.from(colorMap.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([color]) => color);
        
        setGeneratedPalette(sortedColors);
        setUploadedImage(e.target?.result as string);
        
        toast({
          title: "Paleta extraída!",
          description: "Cores extraídas da imagem com sucesso.",
        });
      };
      
      img.src = e.target?.result as string;
    };
    
    reader.readAsDataURL(imageFile);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      extractColorsFromImage(file);
    } else {
      toast({
        title: "Erro",
        description: "Por favor, selecione um arquivo de imagem válido.",
        variant: "destructive"
      });
    }
  };

  const generatePalette = () => {
    // Simulação de geração de paleta - em produção seria mais sofisticado
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
      '#6C5CE7', '#FDA7DF', '#FF9FF3', '#54A0FF', '#5F27CD'
    ];
    const shuffled = colors.sort(() => 0.5 - Math.random());
    setGeneratedPalette(shuffled.slice(0, 5));
    toast({
      title: "Nova paleta gerada!",
      description: "Sua paleta foi criada com sucesso.",
    });
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast({
      title: "Cor copiada!",
      description: `${color} foi copiado para a área de transferência.`,
    });
  };

  return (
    <section id="tool" className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Experimente a Ferramenta
          </h2>
          <p className="text-xl text-muted-foreground">
            Crie sua primeira paleta de cores agora mesmo
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-card rounded-3xl shadow-xl p-8 border border-border">
          {/* Mode Selection */}
          <div className="flex gap-2 mb-8 justify-center">
            <Button
              variant={extractionMode === 'harmony' ? 'default' : 'outline'}
              onClick={() => setExtractionMode('harmony')}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Harmonia de Cores
            </Button>
            <Button
              variant={extractionMode === 'image' ? 'default' : 'outline'}
              onClick={() => setExtractionMode('image')}
              className="gap-2"
            >
              <ImageIcon className="h-4 w-4" />
              Extrair de Imagem
            </Button>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {extractionMode === 'harmony' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Cor Base
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={baseColor}
                      onChange={(e) => setBaseColor(e.target.value)}
                      className="w-12 h-12 border-2 border-input rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={baseColor}
                      onChange={(e) => setBaseColor(e.target.value)}
                      className="flex-1 px-4 py-2 border border-input bg-background rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-foreground"
                      placeholder="#3B82F6"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Esquema de Cores
                  </label>
                  <select
                    value={colorScheme}
                    onChange={(e) => setColorScheme(e.target.value)}
                    className="w-full px-4 py-2 border border-input bg-background rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-foreground"
                  >
                    {colorSchemes.map(scheme => (
                      <option key={scheme.value} value={scheme.value}>
                        {scheme.label}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <div className="col-span-2">
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Carregar Imagem
                </label>
                <div className="flex flex-col items-center justify-center gap-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {uploadedImage && (
                    <div className="relative w-full max-w-sm">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded" 
                        className="w-full h-48 object-cover rounded-lg border border-border"
                      />
                    </div>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    {uploadedImage ? 'Carregar Outra Imagem' : 'Carregar Imagem'}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Generate Button */}
          {extractionMode === 'harmony' && (
            <div className="text-center mb-8">
              <Button
                onClick={generatePalette}
                size="lg"
                className="gap-2"
              >
                <RefreshCw className="h-5 w-5" />
                Gerar Nova Paleta
              </Button>
            </div>
          )}

          {/* Generated Palette */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {generatedPalette.map((color, index) => (
              <div
                key={index}
                className="group relative bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/50"
              >
                <div
                  className="h-32 w-full cursor-pointer transition-transform hover:scale-105"
                  style={{ backgroundColor: color }}
                  onClick={() => copyColor(color)}
                ></div>
                <div className="p-4">
                  <div className="text-sm font-mono text-muted-foreground mb-3">{color}</div>
                  <div className="flex items-center justify-between gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyColor(color)}
                      className="flex-1 gap-1"
                    >
                      <Copy className="h-3 w-3" />
                      Copiar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="px-2"
                    >
                      <Heart className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Export Options */}
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar PNG
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar JSON
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar CSS
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColorTool;
