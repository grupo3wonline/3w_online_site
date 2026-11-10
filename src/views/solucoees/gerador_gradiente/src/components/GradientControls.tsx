
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, RotateCw } from "lucide-react";
import { ColorStop, GradientConfig } from "./GradientGenerator";

interface GradientControlsProps {
  gradient: GradientConfig;
  onGradientChange: (gradient: GradientConfig) => void;
}

export const GradientControls = ({ gradient, onGradientChange }: GradientControlsProps) => {
  const updateGradientType = (type: 'linear' | 'radial') => {
    onGradientChange({ ...gradient, type });
  };

  const updateDirection = (direction: number) => {
    onGradientChange({ ...gradient, direction });
  };

  const updateColorStop = (id: string, updates: Partial<ColorStop>) => {
    const updatedColors = gradient.colors.map(color =>
      color.id === id ? { ...color, ...updates } : color
    );
    onGradientChange({ ...gradient, colors: updatedColors });
  };

  const addColorStop = () => {
    const newStop: ColorStop = {
      id: Date.now().toString(),
      color: '#ffffff',
      position: 50
    };
    onGradientChange({ ...gradient, colors: [...gradient.colors, newStop] });
  };

  const removeColorStop = (id: string) => {
    if (gradient.colors.length > 2) {
      const updatedColors = gradient.colors.filter(color => color.id !== id);
      onGradientChange({ ...gradient, colors: updatedColors });
    }
  };

  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <CardTitle className="text-xl">Controles</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tipo de Gradiente */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Tipo de Gradiente</Label>
          <div className="flex gap-2">
            <Button
              variant={gradient.type === 'linear' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateGradientType('linear')}
              className={gradient.type === 'linear' ? 'bg-purple-600' : ''}
            >
              Linear
            </Button>
            <Button
              variant={gradient.type === 'radial' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateGradientType('radial')}
              className={gradient.type === 'radial' ? 'bg-purple-600' : ''}
            >
              Radial
            </Button>
          </div>
        </div>

        {/* Direção (apenas para linear) */}
        {gradient.type === 'linear' && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-medium">Direção</Label>
              <Badge variant="secondary" className="flex items-center gap-1">
                <RotateCw className="h-3 w-3" />
                {gradient.direction}°
              </Badge>
            </div>
            <Slider
              value={[gradient.direction]}
              onValueChange={(value) => updateDirection(value[0])}
              min={0}
              max={360}
              step={1}
              className="w-full"
            />
          </div>
        )}

        {/* Cores */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-sm font-medium">Cores</Label>
            <Button
              size="sm"
              variant="outline"
              onClick={addColorStop}
              className="flex items-center gap-1"
            >
              <Plus className="h-3 w-3" />
              Adicionar
            </Button>
          </div>
          
          <div className="space-y-4">
            {gradient.colors.map((colorStop, index) => (
              <div key={colorStop.id} className="glass-effect p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Cor {index + 1}</span>
                  {gradient.colors.length > 2 && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeColorStop(colorStop.id)}
                      className="flex items-center gap-1 text-red-400 hover:text-red-300"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={colorStop.color}
                      onChange={(e) => updateColorStop(colorStop.id, { color: e.target.value })}
                      className="w-12 h-8 rounded border border-white/20 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={colorStop.color}
                      onChange={(e) => updateColorStop(colorStop.id, { color: e.target.value })}
                      className="flex-1 px-3 py-1 text-sm bg-white/5 border border-white/20 rounded focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">Posição</span>
                      <span className="text-xs text-gray-300">{colorStop.position}%</span>
                    </div>
                    <Slider
                      value={[colorStop.position]}
                      onValueChange={(value) => updateColorStop(colorStop.id, { position: value[0] })}
                      min={0}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
