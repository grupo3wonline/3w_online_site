import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { ArrowRight, CheckCircle, Upload, Settings, Download, Shuffle } from "lucide-react"
import { Link } from "react-router-dom"

const Landing = () => {
  const features = [
    {
      icon: Upload,
      title: "Múltiplas formas de entrada",
      description: "Cole texto, faça upload de arquivos (.txt, .csv, .json) ou use a área de transferência"
    },
    {
      icon: Settings,
      title: "Separadores personalizáveis",
      description: "Configure separadores de entrada e saída: vírgula, espaço, quebra de linha ou personalizado"
    },
    {
      icon: Shuffle,
      title: "Transformações avançadas",
      description: "Ordene alfabeticamente, numericamente, embaralhe, remova duplicados ou inverta listas"
    },
    {
      icon: Download,
      title: "Exportação fácil",
      description: "Copie resultados ou exporte como arquivo .txt. Processamento 100% local e privado"
    }
  ]

  const useCases = [
    "Organizar listas de contatos e emails",
    "Processar dados de planilhas rapidamente", 
    "Limpar e ordenar inventários",
    "Preparar listas para importação",
    "Remover duplicados de bases de dados",
    "Embaralhar itens para sorteios"
  ]

  const faqs = [
    {
      question: "Os meus dados ficam seguros?",
      answer: "Sim! Todo o processamento é feito localmente no seu navegador. Nenhum dado é enviado para servidores externos."
    },
    {
      question: "Qual o limite de itens que posso processar?",
      answer: "A ferramenta suporta listas com até 10.000 itens mantendo boa performance."
    },
    {
      question: "Quais formatos de arquivo são aceitos?",
      answer: "Aceitamos arquivos .txt, .csv e .json. Você também pode colar texto diretamente."
    },
    {
      question: "Posso usar separadores personalizados?",
      answer: "Sim! Além dos separadores padrão (vírgula, espaço, quebra de linha), você pode definir qualquer separador personalizado."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ML</span>
            </div>
            <span className="text-xl font-bold">Manipulador de Listas</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            Processamento 100% Local e Privado
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
            Organize suas listas com facilidade profissional
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Transforme, ordene e processe listas de texto com uma ferramenta web intuitiva. 
            Suporte a separadores personalizáveis, múltiplas transformações e exportação segura.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ferramenta">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity">
                Acessar Ferramenta
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Ver Demonstração
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Recursos Principais</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Uma ferramenta completa para todas as suas necessidades de manipulação de listas
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Casos de Uso</h2>
              <p className="text-muted-foreground text-lg">
                Profissionais de diversas áreas usam nossa ferramenta para:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {useCases.map((useCase, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span>{useCase}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Perguntas Frequentes</h2>
            <p className="text-muted-foreground text-lg">
              Tire suas dúvidas sobre a ferramenta
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-soft">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3 text-lg">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Pronto para organizar suas listas?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Comece agora mesmo. Gratuito, rápido e 100% privado.
            </p>
            <Link to="/ferramenta">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity">
                Começar Agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 bg-card/50">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 h-6 bg-gradient-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">ML</span>
            </div>
            <span className="text-lg font-semibold">Manipulador de Listas</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Ferramenta web gratuita para manipulação profissional de listas
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Landing