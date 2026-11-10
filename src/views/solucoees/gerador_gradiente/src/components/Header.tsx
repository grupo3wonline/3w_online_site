
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";

export const Header = () => {
  return (
    <header className="glass-effect border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Gerador de Gradiente
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-sm hover:text-purple-400 transition-colors">
              Home
            </a>
            <a href="#como-funciona" className="text-sm hover:text-purple-400 transition-colors">
              Como Funciona
            </a>
            <a href="#recursos" className="text-sm hover:text-purple-400 transition-colors">
              Recursos
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              Login
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Criar Agora
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
