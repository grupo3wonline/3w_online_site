
import { Code, Eye, Palette, Download, Share2, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const Features = () => {
  const features = [
    {
      icon: Eye,
      title: "Visualização em Tempo Real",
      description: "Veja suas mudanças instantaneamente enquanto ajusta cores e configurações"
    },
    {
      icon: Palette,
      title: "Múltiplos Tipos de Gradiente",
      description: "Crie gradientes lineares, radiais e angulares com controle total"
    },
    {
      icon: Code,
      title: "Exportação de Código",
      description: "Obtenha código CSS limpo e otimizado pronto para usar"
    },
    {
      icon: Download,
      title: "Download de Imagens",
      description: "Baixe seus gradientes como PNG ou SVG em alta qualidade"
    },
    {
      icon: Share2,
      title: "Compartilhamento Fácil",
      description: "Compartilhe seus gradientes via link único e personalizável"
    },
    {
      icon: Zap,
      title: "Performance Otimizada",
      description: "Interface rápida e responsiva, funciona perfeitamente em qualquer dispositivo"
    }
  ];

  return (
    <section id="recursos" className="py-20 bg-gradient-to-b from-transparent to-purple-900/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Recursos{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Poderosos
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Tudo que você precisa para criar gradientes profissionais
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="glass-effect border-white/10 hover:border-purple-500/50 transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
