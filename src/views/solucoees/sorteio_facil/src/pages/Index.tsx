import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Users, Hash, Shuffle, Share2, History, Shield, Zap, Target, ArrowRight, Star, Play, Clock, Download } from "lucide-react";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Helmet>
        <title>Sistema de Sorteios Online - Fácil, Rápido e Gratuito | SorteioWeb</title>
        <meta name="description" content="Faça sorteios por números, nomes e grupos em segundos. Interface simples, resultados transparentes, histórico completo e opções de compartilhamento. 100% gratuito!" />
        <meta name="keywords" content="sorteio online, sorteio nomes, sorteio números, dividir grupos, sorteio gratuito, ferramenta sorteio" />
        <link rel="canonical" href="/" />
        <meta property="og:title" content="Sistema de Sorteios Online - Fácil, Rápido e Gratuito" />
        <meta property="og:description" content="A melhor ferramenta online para sorteios. Números, nomes, grupos - tudo em segundos!" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative container mx-auto max-w-7xl px-4 py-20 md:py-32">
          <div className="text-center fade-in">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
              ✨ 100% Gratuito • Sem Cadastro • Resultados Instantâneos
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Sorteios Online
              <span className="block text-gradient">Fáceis e Rápidos</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
              A ferramenta mais completa para seus sorteios. Números, nomes, grupos - tudo em segundos com resultados transparentes e compartilháveis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <a href="/numero">
                <Button size="lg" variant="cta" className="text-lg px-8 py-4 h-auto">
                  <Play className="mr-2 h-5 w-5" />
                  Fazer Sorteio Agora
                </Button>
              </a>
              <a href="#como-funciona">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 h-auto border-white/30 text-white hover:bg-white/10">
                  Ver Como Funciona
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-white/80">Gratuito</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">3</div>
                <div className="text-white/80">Tipos de Sorteio</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">∞</div>
                <div className="text-white/80">Sorteios Ilimitados</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Sorteio */}
      <section id="tipos" className="py-20 bg-background">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Escolha Seu Tipo de Sorteio
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Três modalidades poderosas para atender todas suas necessidades
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <a href="/numero" className="group">
              <Card className="hover-lift h-full shadow-card group-hover:shadow-elevated">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-lg bg-gradient-primary mr-4">
                      <Hash className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary">Mais Popular</Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Sorteio por Números</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Defina um intervalo (ex.: 1 a 100) e a quantidade de números sorteados. Perfeito para rifas e premiações.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      Intervalo personalizável
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      Múltiplos sorteados
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      Sem repetição opcional
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>
            
            <a href="/nomes" className="group">
              <Card className="hover-lift h-full shadow-card group-hover:shadow-elevated">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-lg bg-gradient-primary mr-4">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="outline">Ideal para Eventos</Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Sorteio por Nomes</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Cole ou digite a lista de participantes e escolha quantos vencedores deseja. Transparente e justo.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      Lista ilimitada
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      Múltiplos vencedores
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      Exportar resultado
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>
            
            <a href="/grupos" className="group">
              <Card className="hover-lift h-full shadow-card group-hover:shadow-elevated">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-lg bg-gradient-primary mr-4">
                      <Shuffle className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="outline">Organizacional</Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Divisão em Grupos</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Divida automaticamente sua lista em grupos equilibrados. Ideal para times e equipes.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      Grupos balanceados
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      Configuração flexível
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      Visualização clara
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 bg-secondary/40">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Como Funciona?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              3 passos simples para seu sorteio perfeito
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center fade-in">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-elevated">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">Escolha o Tipo</h3>
              <p className="text-muted-foreground leading-relaxed">
                Selecione entre sorteio por números, nomes ou divisão em grupos conforme sua necessidade.
              </p>
            </div>
            
            <div className="text-center fade-in">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-elevated">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">Configure os Dados</h3>
              <p className="text-muted-foreground leading-relaxed">
                Insira os números, nomes ou configure os grupos. Interface simples e intuitiva para todos.
              </p>
            </div>
            
            <div className="text-center fade-in">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-elevated">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">Sorteie e Compartilhe</h3>
              <p className="text-muted-foreground leading-relaxed">
                Clique em sortear e compartilhe o resultado. Copie, exporte como imagem ou refaça quando quiser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="py-20 bg-background">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Por Que Escolher Nossa Ferramenta?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Características que fazem a diferença no seu sorteio
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover-bounce shadow-card">
              <CardContent className="p-6">
                <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20 w-fit mb-4">
                  <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">100% Transparente</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Algoritmo randômico auditável. Todos os resultados são genuinamente aleatórios e verificáveis.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-bounce shadow-card">
              <CardContent className="p-6">
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20 w-fit mb-4">
                  <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Super Rápido</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Resultados instantâneos sem demora. Interface otimizada para máxima velocidade e eficiência.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-bounce shadow-card">
              <CardContent className="p-6">
                <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/20 w-fit mb-4">
                  <Share2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Fácil Compartilhamento</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Copie resultados, exporte como imagem ou compartilhe links. Máxima facilidade para divulgar.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-bounce shadow-card">
              <CardContent className="p-6">
                <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/20 w-fit mb-4">
                  <History className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Histórico Completo</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Mantenha registro de todos os sorteios realizados durante sua sessão. Controle total do histórico.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-bounce shadow-card">
              <CardContent className="p-6">
                <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/20 w-fit mb-4">
                  <Target className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Sem Repetição</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Opção de evitar resultados repetidos. Configure conforme suas regras e necessidades específicas.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-bounce shadow-card">
              <CardContent className="p-6">
                <div className="p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 w-fit mb-4">
                  <Download className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Exportação de Dados</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Exporte resultados como imagem para apresentações ou arquive para documentação futura.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Dicas de Uso */}
      <section className="py-20 bg-secondary/40">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Dicas para Sorteios Perfeitos
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Maximize a eficiência e transparência dos seus sorteios
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-card">
              <CardContent className="p-8">
                <div className="flex items-start mb-4">
                  <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 mr-4 mt-1">
                    <Star className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Para Eventos e Premiações</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Use sorteio por nomes para lista de participantes</li>
                      <li>• Exporte o resultado como imagem para comprovação</li>
                      <li>• Mantenha a opção "sem repetição" ativada</li>
                      <li>• Compartilhe o resultado publicamente para transparência</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardContent className="p-8">
                <div className="flex items-start mb-4">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20 mr-4 mt-1">
                    <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Para Organização de Times</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Use divisão em grupos para formar equipes</li>
                      <li>• Configure por número de grupos ou tamanho do grupo</li>
                      <li>• Resorteie se necessário para ajustar composições</li>
                      <li>• Salve o histórico para futuras referências</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardContent className="p-8">
                <div className="flex items-start mb-4">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 mr-4 mt-1">
                    <Hash className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Para Rifas e Promoções</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Use sorteio por números com intervalo dos bilhetes vendidos</li>
                      <li>• Configure apenas 1 sorteado para premio único</li>
                      <li>• Exporte o resultado para documentação oficial</li>
                      <li>• Realize ao vivo para máxima credibilidade</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-card">
              <CardContent className="p-8">
                <div className="flex items-start mb-4">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20 mr-4 mt-1">
                    <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Para Sala de Aula</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Use sorteio por nomes para escolher apresentadores</li>
                      <li>• Divida a turma em grupos para trabalhos colaborativos</li>
                      <li>• Mantenha histórico da sessão para controle</li>
                      <li>• Use em tempo real durante as aulas</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Pronto para Começar?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Junte-se a milhares de usuários que já confiam na nossa ferramenta para sorteios justos e transparentes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/numero">
              <Button size="lg" variant="cta" className="text-lg px-10 py-4 h-auto bg-white text-primary hover:bg-white/90">
                <Play className="mr-2 h-5 w-5" />
                Começar Agora - É Grátis!
              </Button>
            </a>
            <a href="#tipos">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 h-auto border-white/30 text-white hover:bg-white/10">
                Ver Todos os Tipos
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container mx-auto max-w-7xl px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SorteioWeb</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                A ferramenta mais completa e confiável para sorteios online. Simples, rápido e 100% gratuito.
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Shield className="h-4 w-4 mr-2 text-green-500" />
                Dados seguros e privados
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Tipos de Sorteio</h3>
              <ul className="space-y-2">
                <li><a href="/numero" className="text-muted-foreground hover:text-primary transition-colors">Sorteio por Números</a></li>
                <li><a href="/nomes" className="text-muted-foreground hover:text-primary transition-colors">Sorteio por Nomes</a></li>
                <li><a href="/grupos" className="text-muted-foreground hover:text-primary transition-colors">Divisão em Grupos</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Características</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Resultados transparentes</li>
                <li>• Histórico completo</li>
                <li>• Compartilhamento fácil</li>
                <li>• 100% gratuito</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p className="mb-4">
              <strong>Em breve:</strong> Amigo Secreto com envio por e-mail/WhatsApp, melhorias de interface e novas funcionalidades.
            </p>
            <p>
              © 2024 SorteioWeb. Todos os direitos reservados. • Privacidade garantida • Sem coleta de dados pessoais
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;