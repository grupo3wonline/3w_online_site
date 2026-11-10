import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Palette, Eye, Zap, RefreshCw, HelpCircle } from 'lucide-react';
import { convertColor, type ColorValues } from '@/utils/colorConversions';
import Swal from 'sweetalert2';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ColorConverter = () => {
  const [inputValue, setInputValue] = useState('#3B82F6');
  const [inputType, setInputType] = useState('hex');
  const [colorValues, setColorValues] = useState<ColorValues | null>(null);

  useEffect(() => {
    const result = convertColor(inputValue, inputType);
    setColorValues(result);
  }, [inputValue, inputType]);

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);

    // Custom Toast/Alert using SweetAlert2
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
      customClass: {
        popup: 'colored-toast'
      }
    })

    Toast.fire({
      icon: 'success',
      title: `${format} copiado!`,
      text: text
    })
  };

  const formatColorValue = (format: string, values: ColorValues): string => {
    if (!values) return '';
    switch (format) {
      case 'hex': return values.hex;
      case 'rgb': return `rgb(${values.rgb.r}, ${values.rgb.g}, ${values.rgb.b})`;
      case 'rgba': return `rgba(${values.rgba.r}, ${values.rgba.g}, ${values.rgba.b}, ${values.rgba.a})`;
      case 'hsl': return `hsl(${values.hsl.h}, ${values.hsl.s}%, ${values.hsl.l}%)`;
      case 'hsv': return `hsv(${values.hsv.h}, ${values.hsv.s}%, ${values.hsv.v}%)`;
      case 'cmyk': return `cmyk(${values.cmyk.c}%, ${values.cmyk.m}%, ${values.cmyk.y}%, ${values.cmyk.k}%)`;
      case 'lab': return `lab(${values.lab.l}, ${values.lab.a}, ${values.lab.b})`;
      default: return '';
    }
  };

  const colorFormats = [
    { key: 'hex', label: 'HEX', icon: '#', desc: 'Hexadecimal' },
    { key: 'rgb', label: 'RGB', icon: '🔴', desc: 'Red Green Blue' },
    { key: 'hsl', label: 'HSL', icon: '🌈', desc: 'Hue Saturation Lightness' },
    { key: 'cmyk', label: 'CMYK', icon: '🖨️', desc: 'Cyan Magenta Yellow Key' },
    { key: 'lab', label: 'LAB', icon: '🧪', desc: 'L*a*b* Color Space' },
    { key: 'hsv', label: 'HSV', icon: '🎨', desc: 'Hue Saturation Value' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in-up">
      <div className="grid lg:grid-cols-3 gap-8">

        {/* Input Section */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="glass-card hover-glow border-t-4 border-t-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Seletor de Cores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="colorInput" className="flex items-center gap-2 mb-2">
                  Valor da Cor
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Digite o código da cor (ex: #FF0000 ou rgb(255,0,0))</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <div className="relative">
                  <Input
                    id="colorInput"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Digite um valor de cor..."
                    className="input-modern font-mono pl-10"
                    autoComplete="off"
                  />
                  <div
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-border shadow-sm"
                    style={{ backgroundColor: colorValues?.hex || 'transparent' }}
                  />
                </div>
              </div>

              <div>
                <Label className="mb-3 block">Formato de Entrada</Label>
                <div className="flex flex-wrap gap-2">
                  {colorFormats.slice(0, 4).map((format) => (
                    <Badge
                      key={format.key}
                      variant={inputType === format.key ? "default" : "outline"}
                      className="cursor-pointer hover:scale-105 transition-transform py-1.5 px-3"
                      onClick={() => setInputType(format.key)}
                    >
                      {format.icon} {format.label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Color Visualizer */}
              {colorValues && (
                <div className="pt-4 border-t border-border/50">
                  <Label className="mb-3 block flex items-center gap-2">
                    <Eye className="w-4 h-4" /> Visualização
                  </Label>
                  <div
                    className="color-preview animate-pulse-glow"
                    style={{ backgroundColor: colorValues.hex }}
                  />
                  <div className="text-center mt-3 p-2 bg-secondary/30 rounded-lg font-mono text-sm">
                    {colorValues.hex.toUpperCase()}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Examples */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <RefreshCw className="w-4 h-4" /> Exemplos Rápidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { color: '#EF4444', name: 'Red' },
                  { color: '#F97316', name: 'Orange' },
                  { color: '#EAB308', name: 'Yellow' },
                  { color: '#22C55E', name: 'Green' },
                  { color: '#3B82F6', name: 'Blue' },
                  { color: '#8B5CF6', name: 'Purple' },
                  { color: '#EC4899', name: 'Pink' },
                  { color: '#64748B', name: 'Slate' },
                  { color: '#000000', name: 'Black' },
                  { color: '#FFFFFF', name: 'White' },
                ].map((example) => (
                  <TooltipProvider key={example.color}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className="color-swatch w-full aspect-square rounded-lg"
                          style={{ backgroundColor: example.color }}
                          onClick={() => {
                            setInputValue(example.color);
                            setInputType('hex');
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{example.name}</p>
                        <p className="text-xs text-muted-foreground">{example.color}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-2">
          <Card className="glass-card h-full min-h-[500px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Zap className="w-6 h-6 text-yellow-500" />
                Conversões Instantâneas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {colorValues ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {colorFormats.map((format) => (
                    <div
                      key={format.key}
                      className="group relative p-4 rounded-xl bg-secondary/30 border border-border/50 hover:bg-secondary/60 hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{format.icon}</span>
                          <div>
                            <span className="font-bold text-sm">{format.label}</span>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{format.desc}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(formatColorValue(format.key, colorValues), format.label)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="relative bg-background/50 p-3 rounded-lg border border-border/30 group-hover:border-primary/20 transition-colors">
                        <code className="text-sm font-mono break-all text-primary/90">
                          {formatColorValue(format.key, colorValues)}
                        </code>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center p-8 border-2 border-dashed border-border rounded-xl bg-secondary/10">
                  <div className="bg-secondary/50 p-4 rounded-full mb-4 animate-float">
                    <Palette className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Aguardando Cor</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Digite um código de cor no painel ao lado ou selecione um dos exemplos rápidos para começar a conversão.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ColorConverter;
