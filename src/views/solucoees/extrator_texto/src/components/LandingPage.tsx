import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, Upload, Download, Zap, CheckCircle, Globe, CreditCard, FileSearch, 
  Brain, Target, Shield, Scan, Search, BookOpen
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

interface LandingPageProps {
  onNavigateToOCR: () => void;
  onNavigateToSpecific: () => void;
}

const LandingPage = ({ onNavigateToOCR, onNavigateToSpecific }: LandingPageProps) => {
  const features = [
    {
      icon: Upload,
      title: "Upload Fácil",
      description: "Arraste e solte imagens (PNG, JPG) ou PDFs para extrair texto instantaneamente"
    },
    {
      icon: Zap,
      title: "OCR Rápido",
      description: "Tecnologia avançada de reconhecimento óptico de caracteres para resultados precisos"
    },
    {
      icon: Download,
      title: "Múltiplos Formatos",
      description: "Exporte seu texto em .TXT, .DOC ou .PDF com apenas um clique"
    },
    {
      icon: Globe,
      title: "100% Online",
      description: "Sem instalação necessária. Funciona direto no seu navegador, em qualquer dispositivo"
    }
  ];

  const benefits = [
    "Processamento instantâneo e preciso",
    "Interface intuitiva e moderna", 
    "Suporte para múltiplos idiomas",
    "Totalmente gratuito para usar",
    "Dados seguros - processamento local",
    "Responsivo para mobile e desktop"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                TextGrab OCR
              </span>
            </div>
            <Button variant="modern" onClick={onNavigateToOCR}>
              Usar Agora
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fadeInUp">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Extraia texto e dados de{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  documentos brasileiros
                </span>{" "}
                com precisão
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Plataforma completa de OCR com dois módulos especializados: extração geral de texto 
                e reconhecimento inteligente de documentos brasileiros (RG, CPF, CNH, Título Eleitor).
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <Button 
                  variant="hero" 
                  size="xl"
                  onClick={onNavigateToOCR}
                  className="group h-auto p-6 flex-col text-left"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Upload className="h-6 w-6 group-hover:scale-110 transition-transform" />
                    <span className="text-lg font-bold">OCR Geral</span>
                  </div>
                  <span className="text-sm opacity-90">Extraia texto de qualquer imagem ou PDF</span>
                </Button>
                
                <Button 
                  variant="modern" 
                  size="xl" 
                  onClick={onNavigateToSpecific}
                  className="group h-auto p-6 flex-col text-left"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <CreditCard className="h-6 w-6 group-hover:scale-110 transition-transform" />
                    <span className="text-lg font-bold">Extrator de Documentos</span>
                  </div>
                  <span className="text-sm opacity-90">Análise especializada de documentos brasileiros</span>
                </Button>
              </div>
            </div>
            
            <div className="relative animate-float">
              <img 
                src={heroImage} 
                alt="OCR Text Extraction Tool"
                className="rounded-2xl shadow-card w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-primary/10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

        {/* Módulos Disponíveis */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Dois Módulos Especializados
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Escolha a ferramenta ideal para suas necessidades específicas
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* OCR Geral */}
              <Card className="shadow-card border-border/50 bg-gradient-card hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Scan className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">OCR Geral</CardTitle>
                      <Badge variant="secondary" className="text-xs mt-1">Universal</Badge>
                    </div>
                  </div>
                  <CardDescription>
                    Extração de texto universal para qualquer tipo de documento, imagem ou PDF
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Suporte para múltiplos idiomas (português, inglês)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Pré-processamento inteligente de imagem</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Exportação em TXT, DOC, PDF</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Edição do texto antes da exportação</span>
                    </div>
                  </div>
                  <Button 
                    onClick={onNavigateToOCR}
                    variant="modern" 
                    className="w-full"
                  >
                    <Scan className="mr-2 h-4 w-4" />
                    Usar OCR Geral
                  </Button>
                </CardContent>
              </Card>

              {/* Extrator de Documentos */}
              <Card className="shadow-card border-border/50 bg-gradient-card hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <FileSearch className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Extrator de Documentos</CardTitle>
                      <Badge variant="default" className="text-xs mt-1">🇧🇷 Especializado</Badge>
                    </div>
                  </div>
                  <CardDescription>
                    Extração inteligente e estruturada de documentos brasileiros específicos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Suporte: RG, CPF, CNH, Título Eleitor, Passaporte</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Validação automática de CPF e números</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Extração de campos específicos por documento</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Alertas e sugestões de melhoria</span>
                    </div>
                  </div>
                  <Button 
                    onClick={onNavigateToSpecific}
                    variant="hero" 
                    className="w-full"
                  >
                    <FileSearch className="mr-2 h-4 w-4" />
                    Usar Extrator Especializado
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tecnologias e Recursos */}
        <section className="py-20 px-4 bg-gradient-card">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Tecnologia Avançada
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Algoritmos de ponta para máxima precisão na extração de texto e dados
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="shadow-card border-border/50 bg-gradient-card text-center">
                <CardHeader>
                  <Brain className="h-12 w-12 text-primary mb-4 mx-auto" />
                  <CardTitle>IA Avançada</CardTitle>
                  <CardDescription>
                    Tesseract.js com algoritmos de deep learning para reconhecimento preciso
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="shadow-card border-border/50 bg-gradient-card text-center">
                <CardHeader>
                  <Target className="h-12 w-12 text-primary mb-4 mx-auto" />
                  <CardTitle>Precisão Otimizada</CardTitle>
                  <CardDescription>
                    Pré-processamento inteligente: contraste, nitidez e correção de orientação
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="shadow-card border-border/50 bg-gradient-card text-center">
                <CardHeader>
                  <Shield className="h-12 w-12 text-primary mb-4 mx-auto" />
                  <CardTitle>Validação Automática</CardTitle>
                  <CardDescription>
                    Verificação de CPF, RG, CNH e outros documentos brasileiros
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Documentos Suportados */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Documentos Brasileiros Suportados
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Extração especializada com padrões otimizados para cada tipo de documento
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { name: "RG", desc: "Carteira de Identidade", icon: "🆔" },
                { name: "CPF", desc: "Cadastro de Pessoa Física", icon: "📋" },
                { name: "CNH", desc: "Carteira Nacional de Habilitação", icon: "🚗" },
                { name: "Título Eleitor", desc: "Documento Eleitoral", icon: "🗳️" },
                { name: "Reservista", desc: "Certificado de Reservista", icon: "🪖" },
                { name: "Passaporte", desc: "Passaporte Brasileiro", icon: "✈️" }
              ].map((doc, index) => (
                <Card key={index} className="shadow-card border-border/50 bg-gradient-card text-center hover:shadow-elegant transition-all duration-300 hover:scale-[1.05]">
                  <CardContent className="p-4">
                    <div className="text-3xl mb-2">{doc.icon}</div>
                    <h3 className="font-bold text-sm mb-1">{doc.name}</h3>
                    <p className="text-xs text-muted-foreground">{doc.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button 
                onClick={onNavigateToSpecific}
                variant="hero" 
                size="lg"
                className="group"
              >
                <Search className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Testar Extração de Documentos
              </Button>
            </div>
          </div>
        </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para extrair dados dos seus documentos?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Escolha o módulo ideal e comece a extrair informações com precisão
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="xl"
              onClick={onNavigateToOCR}
              className="hover:scale-[1.02] transition-transform shadow-elegant"
            >
              <Scan className="mr-2 h-5 w-5" />
              OCR Geral
            </Button>
            <Button 
              variant="secondary" 
              size="xl"
              onClick={onNavigateToSpecific}
              className="hover:scale-[1.02] transition-transform shadow-elegant"
            >
              <FileSearch className="mr-2 h-5 w-5" />
              Extrator de Documentos
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t border-border/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <FileText className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">TextGrab OCR</span>
            </div>
            <p className="text-muted-foreground text-center md:text-right">
              © 2024 TextGrab OCR. Extração inteligente de texto e documentos brasileiros.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;