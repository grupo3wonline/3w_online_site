
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section id="home" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20" />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-full mb-6 glass-effect">
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-purple-200">Ferramenta Online Gratuita</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Crie{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-shift">
              Gradientes Perfeitos
            </span>{" "}
            em Instantes
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Ferramenta intuitiva para gerar gradientes e degradês personalizados com visualização em tempo real e exportação de código CSS.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-3 animate-scale-in">
              Começar Agora
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
            
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 border-purple-500/50 hover:bg-purple-500/10">
              Ver Exemplos
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="h-16 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 animate-scale-in" style={{ animationDelay: '0.1s' }} />
            <div className="h-16 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 animate-scale-in" style={{ animationDelay: '0.2s' }} />
            <div className="h-16 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 animate-scale-in" style={{ animationDelay: '0.3s' }} />
            <div className="h-16 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 animate-scale-in" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
