
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GradientConfig } from "./GradientGenerator";

interface GradientPreviewProps {
  gradient: GradientConfig;
}

export const GradientPreview = ({ gradient }: GradientPreviewProps) => {
  const generateGradientStyle = () => {
    const stops = gradient.colors
      .sort((a, b) => a.position - b.position)
      .map(stop => `${stop.color} ${stop.position}%`)
      .join(', ');

    if (gradient.type === 'linear') {
      return {
        background: `linear-gradient(${gradient.direction}deg, ${stops})`
      };
    } else {
      return {
        background: `radial-gradient(circle, ${stops})`
      };
    }
  };

  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <CardTitle className="text-xl">Visualização</CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="w-full h-64 rounded-lg border border-white/20 shadow-2xl transition-all duration-300"
          style={generateGradientStyle()}
        />
        <div className="mt-4 p-4 glass-effect rounded-lg">
          <p className="text-sm text-gray-400 mb-2">Configuração atual:</p>
          <p className="text-sm font-mono">
            Tipo: {gradient.type === 'linear' ? 'Linear' : 'Radial'}
            {gradient.type === 'linear' && ` • Direção: ${gradient.direction}°`}
            {` • Cores: ${gradient.colors.length}`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
