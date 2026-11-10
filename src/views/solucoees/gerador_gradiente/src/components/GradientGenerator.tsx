
import { useState } from "react";
import { GradientPreview } from "./GradientPreview";
import { GradientControls } from "./GradientControls";
import { CodeExport } from "./CodeExport";

export interface ColorStop {
  id: string;
  color: string;
  position: number;
}

export interface GradientConfig {
  type: 'linear' | 'radial';
  direction: number;
  colors: ColorStop[];
}

export const GradientGenerator = () => {
  const [gradient, setGradient] = useState<GradientConfig>({
    type: 'linear',
    direction: 90,
    colors: [
      { id: '1', color: '#667eea', position: 0 },
      { id: '2', color: '#764ba2', position: 100 }
    ]
  });

  const generateCSS = () => {
    const stops = gradient.colors
      .sort((a, b) => a.position - b.position)
      .map(stop => `${stop.color} ${stop.position}%`)
      .join(', ');

    if (gradient.type === 'linear') {
      return `background: linear-gradient(${gradient.direction}deg, ${stops});`;
    } else {
      return `background: radial-gradient(circle, ${stops});`;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Gerador de{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Gradiente
          </span>
        </h2>
        <p className="text-gray-400 text-lg">
          Ajuste as configurações abaixo e veja o resultado em tempo real
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <GradientPreview gradient={gradient} />
          <CodeExport css={generateCSS()} />
        </div>
        
        <div>
          <GradientControls 
            gradient={gradient} 
            onGradientChange={setGradient} 
          />
        </div>
      </div>
    </div>
  );
};
