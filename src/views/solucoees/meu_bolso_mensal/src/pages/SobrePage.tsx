import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const values = [
  {
    icon: "fa-lightbulb",
    title: "Simplicidade",
    description: "Acreditamos que controle financeiro não precisa ser complicado. Nossa missão é tornar a gestão do dinheiro acessível para todos."
  },
  {
    icon: "fa-heart",
    title: "Empatia",
    description: "Entendemos as dificuldades financeiras do dia a dia e criamos uma ferramenta que realmente ajuda pessoas reais."
  },
  {
    icon: "fa-shield-halved",
    title: "Transparência",
    description: "100% gratuito, sem pegadinhas, sem dados escondidos. O que você vê é o que você recebe."
  },
  {
    icon: "fa-rocket",
    title: "Inovação",
    description: "Estamos sempre melhorando e adicionando novos recursos baseados no feedback da nossa comunidade."
  }
];

const stats = [
  { number: "15.000+", label: "Usuários Ativos", icon: "fa-users" },
  { number: "100%", label: "Gratuito", icon: "fa-gift" },
  { number: "4.9/5", label: "Avaliação", icon: "fa-star" },
  { number: "82%", label: "Economizam Mais", icon: "fa-chart-line" }
];

export default function SobrePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-gradient py-16 md:py-24">
        <div className="container-app">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <Badge variant="outline" className="mb-4 text-sm px-4 py-2">
              <i className="fa-solid fa-info-circle mr-2"></i>
              Sobre Nós
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Nossa Missão É{" "}
              <span className="text-gradient bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Democratizar
              </span>
              {" "}o Controle Financeiro
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Acreditamos que <strong>toda pessoa merece ter controle total sobre seu dinheiro</strong>,
              sem pagar caro por isso. Por isso criamos o Meu Bolso Mensal: uma ferramenta profissional,
              gratuita e que respeita sua privacidade.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 -mt-8">
        <div className="container-app">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <Card key={i} className="border-0 shadow-xl bg-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                    <i className={`fa-solid ${stat.icon} text-emerald-600 dark:text-emerald-400 text-xl`}></i>
                  </div>
                  <div className="font-display text-3xl md:text-4xl font-bold text-foreground mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container-app">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Como Tudo Começou
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto rounded-full"></div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8 md:p-12">
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    <i className="fa-solid fa-quote-left text-emerald-500 text-2xl mr-2"></i>
                    Em 2024, percebemos que <strong className="text-foreground">milhares de brasileiros estavam lutando para entender
                      para onde seu dinheiro ia todo mês</strong>. Aplicativos de finanças eram caros, complicados
                    ou vendiam dados dos usuários.
                  </p>

                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Decidimos criar algo diferente: uma ferramenta <strong className="text-foreground">100% gratuita,
                      simples de usar e que respeitasse a privacidade</strong> das pessoas. Sem vender dados,
                    sem mensalidades escondidas, sem complicações.
                  </p>

                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Hoje, o <strong className="text-emerald-600 dark:text-emerald-400">Meu Bolso Mensal</strong> é usado
                    por mais de 15.000 pessoas que conseguiram organizar suas finanças e, mais importante,
                    <strong className="text-foreground"> economizar mais dinheiro todo mês</strong>.
                  </p>

                  <div className="flex items-center gap-4 mt-8 pt-8 border-t border-border">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold">
                      3W
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-lg">Grupo 3W Online</p>
                      <p className="text-muted-foreground">Desenvolvedores apaixonados por tecnologia e finanças</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container-app">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-sm px-4 py-2">
              <i className="fa-solid fa-gem mr-2"></i>
              Nossos Valores
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              O Que Nos Move
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Estes princípios guiam cada decisão que tomamos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, i) => (
              <Card key={i} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-card">
                <CardContent className="p-8">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-xl">
                        <i className={`fa-solid ${value.icon} text-white text-2xl`}></i>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground mb-3 text-xl">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Detail Section */}
      <section className="py-16 md:py-24">
        <div className="container-app">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Por Que Somos Diferentes?
              </h2>
              <p className="text-lg text-muted-foreground">
                Não somos apenas mais um aplicativo de finanças
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  icon: "fa-lock",
                  title: "100% Privado",
                  desc: "Seus dados financeiros NUNCA saem do seu dispositivo. Não coletamos, não vendemos, não compartilhamos. Ponto final."
                },
                {
                  icon: "fa-infinity",
                  title: "Grátis Para Sempre",
                  desc: "Sem período de teste, sem planos premium, sem pegadinhas. Todos os recursos, completamente grátis, para sempre."
                },
                {
                  icon: "fa-mobile-screen-button",
                  title: "Funciona Em Qualquer Lugar",
                  desc: "No celular, tablet ou computador. Em casa, no trabalho, no ônibus. Acesse quando e onde quiser."
                },
                {
                  icon: "fa-brain",
                  title: "Inteligente e Simples",
                  desc: "Interface intuitiva que qualquer pessoa consegue usar, mas com recursos poderosos para quem quer se aprofundar."
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-emerald-500/30 hover:shadow-lg transition-all duration-300">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <i className={`fa-solid ${item.icon} text-emerald-600 dark:text-emerald-400 text-2xl`}></i>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground mb-2 text-xl">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
        <div className="container-app">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Pronto Para Ter Controle Total do Seu Dinheiro?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-emerald-50">
              Junte-se a milhares de pessoas que já transformaram suas vidas financeiras com o Meu Bolso Mensal
            </p>
            <Link to="/ferramentas">
              <Button size="lg" variant="secondary" className="px-12 py-6 text-lg shadow-2xl bg-white text-emerald-600 hover:bg-emerald-50">
                <i className="fa-solid fa-rocket mr-2"></i>
                Começar Agora Gratuitamente
                <i className="fa-solid fa-arrow-right ml-2"></i>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}