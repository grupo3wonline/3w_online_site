import { useState } from 'react';
import { ArrowRight, Zap, FileText, Smile, Wand2, Copy, Shuffle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: FileText,
      title: "Lorem Ipsum Clássico",
      description: "Texto padrão da indústria desde 1500. Ideal para protótipos profissionais.",
      color: "bg-primary",
      badge: "Tradicional"
    },
    {
      icon: Wand2,
      title: "Hipster Ipsum",
      description: "Texto com estilo hipster moderno. Perfeito para projetos criativos.",
      color: "bg-hipster",
      badge: "Moderno"
    },
    {
      icon: Smile,
      title: "Mussum Ipsum",
      description: "Versão brasileira divertida inspirada no humorista Mussum.",
      color: "bg-mussum",
      badge: "Brasileiro"
    },
    {
      icon: Star,
      title: "Creative Ipsum",
      description: "Lorem personalizado com temas especiais como Harry Potter.",
      color: "bg-creative",
      badge: "Criativo"
    }
  ];

  const formats = [
    { name: "Parágrafos", desc: "Blocos de texto completos" },
    { name: "Palavras", desc: "Sequências de palavras" },
    { name: "Listas", desc: "Itens organizados" }
  ];

  const sizes = [
    { name: "Pequeno", desc: "Para testes rápidos" },
    { name: "Médio", desc: "Para protótipos" },
    { name: "Grande", desc: "Para documentação" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-accent/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23f59e0b%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%227%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative container mx-auto px-4 pt-20 pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Zap className="w-12 h-12 text-primary" />
              <h1 className="text-5xl md:text-7xl font-bold text-foreground">
                TextGenius
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              O gerador de texto falso mais completo e intuitivo do Brasil
            </p>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Crie textos Lorem Ipsum clássicos, Hipster modernos, Mussum brasileiros ou temas personalizados 
              para seus projetos de design e desenvolvimento.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                Geração Instantânea
              </Badge>
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <Copy className="w-4 h-4 mr-2" />
                Cópia com Um Clique
              </Badge>
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <Shuffle className="w-4 h-4 mr-2" />
                4 Estilos Únicos
              </Badge>
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <FileText className="w-4 h-4 mr-2" />
                Múltiplos Formatos
              </Badge>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/generator">
                <Button size="lg" className="h-14 px-8 text-lg">
                  <Shuffle className="w-5 h-5 mr-2" />
                  Começar a Gerar
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg">
                <FileText className="w-5 h-5 mr-2" />
                Ver Exemplos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tipos de Texto Disponíveis
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Escolha entre diferentes estilos de texto falso para atender suas necessidades específicas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 hover:border-primary/20"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <CardHeader className="text-center pb-2">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <Badge variant="secondary" className="w-fit mx-auto mb-2">
                    {feature.badge}
                  </Badge>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Como Funciona
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Em apenas 3 passos simples, você terá o texto perfeito para seus projetos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Escolha o Estilo</h3>
              <p className="text-muted-foreground">Selecione entre Lorem Ipsum clássico, Hipster, Mussum ou temas criativos</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Configure o Formato</h3>
              <p className="text-muted-foreground">Defina o tipo (parágrafos, listas, palavras) e tamanho desejado</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Gere e Copie</h3>
              <p className="text-muted-foreground">Clique em gerar e copie o texto pronto para usar em seus projetos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Por Que Escolher o TextGenius?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A ferramenta mais completa e fácil de usar para gerar texto falso no Brasil
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Rápido e Eficiente</h3>
              <p className="text-muted-foreground">Gere textos em segundos, sem complicação ou configurações desnecessárias</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-hipster/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Wand2 className="w-6 h-6 text-hipster" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Estilos Únicos</h3>
              <p className="text-muted-foreground">4 tipos diferentes de texto, incluindo versões brasileiras e criativas</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Copy className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Cópia Instantânea</h3>
              <p className="text-muted-foreground">Botão de copiar integrado para uso imediato em seus projetos</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-mussum/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Smile className="w-6 h-6 text-mussum" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Toque Brasileiro</h3>
              <p className="text-muted-foreground">Mussum Ipsum exclusivo com expressões típicas do Brasil</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-creative/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-creative" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Temas Criativos</h3>
              <p className="text-muted-foreground">Textos personalizados como Harry Potter para projetos especiais</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Múltiplos Formatos</h3>
              <p className="text-muted-foreground">Parágrafos, listas ou palavras avulsas em diferentes tamanhos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formats & Sizes Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Formatos Flexíveis
              </h3>
              <div className="space-y-4">
                {formats.map((format, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-card border">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3"></div>
                    <div>
                      <h4 className="font-semibold text-foreground">{format.name}</h4>
                      <p className="text-muted-foreground">{format.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Tamanhos Personalizados
              </h3>
              <div className="space-y-4">
                {sizes.map((size, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-card border">
                    <div className="w-2 h-2 bg-accent rounded-full mt-3"></div>
                    <div>
                      <h4 className="font-semibold text-foreground">{size.name}</h4>
                      <p className="text-muted-foreground">{size.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ideal Para Profissionais
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Usado por designers, desenvolvedores e criadores de conteúdo em todo o Brasil
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-background rounded-lg border text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Designers</h3>
              <p className="text-sm text-muted-foreground">Mockups e protótipos de sites e aplicativos</p>
            </div>
            
            <div className="p-6 bg-background rounded-lg border text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Wand2 className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Desenvolvedores</h3>
              <p className="text-sm text-muted-foreground">Testes de layout e preenchimento de conteúdo</p>
            </div>
            
            <div className="p-6 bg-background rounded-lg border text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Agências</h3>
              <p className="text-sm text-muted-foreground">Apresentações e propostas para clientes</p>
            </div>
            
            <div className="p-6 bg-background rounded-lg border text-center">
              <div className="w-12 h-12 bg-mussum/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Smile className="w-6 h-6 text-mussum" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Estudantes</h3>
              <p className="text-sm text-muted-foreground">Projetos acadêmicos e trabalhos de design</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Mais de 10.000 Profissionais Confiam
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Junte-se a milhares de designers e desenvolvedores que já usam o TextGenius
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">"Economizo horas de trabalho com textos de preenchimento. O Mussum Ipsum é genial!"</p>
              <div className="font-semibold text-foreground">Marina Silva</div>
              <div className="text-sm text-muted-foreground">Designer UX/UI</div>
            </div>
            
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">"Interface limpa e funcional. Uso diariamente em meus projetos freelancer."</p>
              <div className="font-semibold text-foreground">Carlos Mendes</div>
              <div className="text-sm text-muted-foreground">Desenvolvedor Front-end</div>
            </div>
            
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">"Os textos hipster dão um toque especial aos nossos mockups criativos!"</p>
              <div className="font-semibold text-foreground">Ana Costa</div>
              <div className="text-sm text-muted-foreground">Diretora de Arte</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23f59e0b%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%227%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Transforme Seus Projetos Hoje Mesmo
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Pare de perder tempo procurando textos de preenchimento. Com o TextGenius, você tem 
              tudo que precisa em um só lugar, de forma rápida e profissional.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Gratuito para sempre
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Sem cadastro necessário
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Uso ilimitado
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/generator">
                <Button size="lg" className="h-16 px-10 text-xl shadow-lg hover:shadow-xl transition-all">
                  <Zap className="w-6 h-6 mr-3" />
                  Começar Gratuitamente
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </Link>
              
              <Button variant="outline" size="lg" className="h-16 px-10 text-xl border-2 hover:bg-background/80">
                <FileText className="w-6 h-6 mr-3" />
                Ver Demonstração
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">
              Junte-se a mais de 10.000 profissionais que já usam o TextGenius
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">TextGenius</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Gerador de texto falso profissional para designers e desenvolvedores
            </p>
            <p className="text-sm text-muted-foreground">
              Feito com ❤️ para a comunidade brasileira de design e desenvolvimento
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;