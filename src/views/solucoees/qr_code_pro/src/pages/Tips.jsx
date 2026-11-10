import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  Target, 
  Palette, 
  Shield, 
  Download, 
  Smartphone,
  Eye,
  CheckCircle,
  AlertTriangle,
  Zap
} from "lucide-react";

const Tips = () => {
  const tips = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Escolha o Conteúdo Certo",
      category: "Conteúdo",
      level: "Básico",
      description: "Mantenha URLs curtas e use links que não expiram. Para textos, seja claro e conciso.",
      details: [
        "URLs devem ser funcionais e acessíveis",
        "Evite links temporários ou com expiração",
        "Para textos longos, considere usar um link",
        "Teste sempre o conteúdo antes de imprimir"
      ]
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Tamanho e Posicionamento",
      category: "Design",
      level: "Básico",
      description: "O QR Code deve ter pelo menos 2x2cm quando impresso e estar em local visível.",
      details: [
        "Tamanho mínimo: 2x2cm para impressão",
        "Mantenha espaço em branco ao redor",
        "Posicione em locais de fácil acesso",
        "Evite dobras ou vincos sobre o código"
      ]
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Contraste e Cores",
      category: "Design",
      level: "Intermediário",
      description: "Use cores contrastantes. Códigos escuros em fundos claros funcionam melhor.",
      details: [
        "Prefira preto sobre branco",
        "Evite cores muito claras ou similares",
        "Teste a leitura em diferentes dispositivos",
        "Cores personalizadas podem reduzir a taxa de leitura"
      ]
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Nível de Correção de Erro",
      category: "Técnico",
      level: "Avançado",
      description: "Use nível H para maior durabilidade, especialmente se adicionar logos.",
      details: [
        "Nível L: 7% de correção (básico)",
        "Nível M: 15% de correção (padrão)",
        "Nível Q: 25% de correção (bom)",
        "Nível H: 30% de correção (máximo)"
      ]
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Formato e Resolução",
      category: "Técnico",
      level: "Intermediário",
      description: "Baixe em alta resolução (mínimo 300 DPI) para impressão de qualidade.",
      details: [
        "300 DPI ou mais para impressão",
        "PNG mantém a qualidade",
        "Resolução mínima: 500x500px",
        "Para web: 200x200px é suficiente"
      ]
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Teste em Dispositivos",
      category: "Validação",
      level: "Básico",
      description: "Sempre teste o QR Code em diferentes smartphones e apps de leitura.",
      details: [
        "Teste em iOS e Android",
        "Use diferentes apps de leitura",
        "Verifique em condições de luz variadas",
        "Teste a distância de leitura"
      ]
    }
  ];

  const bestPractices = [
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      text: "Sempre teste antes de imprimir ou publicar"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      text: "Mantenha backup do conteúdo original"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      text: "Use URLs encurtadas para economizar espaço"
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      text: "Adicione instruções claras para o usuário"
    }
  ];

  const avoidMistakes = [
    {
      icon: <AlertTriangle className="h-5 w-5 text-orange-500" />,
      text: "Não use cores com pouco contraste"
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-orange-500" />,
      text: "Evite QR Codes muito pequenos"
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-orange-500" />,
      text: "Não coloque sobre superfícies curvas"
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-orange-500" />,
      text: "Evite URLs que podem expirar"
    }
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case 'Básico':
        return 'bg-green-100 text-green-800';
      case 'Intermediário':
        return 'bg-yellow-100 text-yellow-800';
      case 'Avançado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <Lightbulb className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-playfair font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Dicas e Melhores Práticas
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Aprenda como criar QR Codes mais eficazes e evitar erros comuns. 
            Guia completo para iniciantes e usuários avançados.
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {tips.map((tip, index) => (
            <Card key={index} className="group hover:shadow-medium transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary group-hover:bg-primary/20 transition-colors">
                    {tip.icon}
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {tip.category}
                    </Badge>
                    <Badge className={`text-xs ${getLevelColor(tip.level)}`}>
                      {tip.level}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-xl font-semibold">
                  {tip.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {tip.description}
                </p>
                <ul className="space-y-2">
                  {tip.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Best Practices & Common Mistakes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Best Practices */}
          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-green-100 p-2 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl text-green-700">
                  Boas Práticas
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {bestPractices.map((practice, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    {practice.icon}
                    <span className="text-foreground font-medium">
                      {practice.text}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Common Mistakes */}
          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl text-orange-700">
                  Erros Comuns
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {avoidMistakes.map((mistake, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    {mistake.icon}
                    <span className="text-foreground font-medium">
                      {mistake.text}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Quick Tip */}
        <Card className="mt-8 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/20 p-3 rounded-full">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  Dica Rápida
                </h3>
                <p className="text-foreground">
                  Use nossa ferramenta para testar diferentes configurações! 
                  Experimente várias resoluções e opções para encontrar 
                  a combinação perfeita para seu projeto.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tips;