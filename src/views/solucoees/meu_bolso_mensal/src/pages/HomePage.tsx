import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: "fa-wallet",
    title: "Controle Total",
    desc: "Visualize todas suas receitas e despesas em um só lugar"
  },
  {
    icon: "fa-chart-line",
    title: "Planejamento Inteligente",
    desc: "Defina metas e acompanhe seu progresso mensal"
  },
  {
    icon: "fa-piggy-bank",
    title: "Economia Automática",
    desc: "Identifique onde você pode economizar mais"
  },
  {
    icon: "fa-shield-halved",
    title: "100% Seguro",
    desc: "Seus dados ficam apenas no seu navegador"
  },
];

const benefits = [
  {
    icon: "fa-bolt",
    title: "Rápido e Prático",
    text: "Configure em menos de 2 minutos e comece a gerenciar suas finanças imediatamente"
  },
  {
    icon: "fa-mobile-screen-button",
    title: "Acesse de Qualquer Lugar",
    text: "Funciona perfeitamente em celular, tablet e computador"
  },
  {
    icon: "fa-lock",
    title: "Privacidade Garantida",
    text: "Processamento local sem envio de dados para servidores externos"
  },
  {
    icon: "fa-infinity",
    title: "Sem Limites",
    text: "Cadastre quantas receitas, despesas e categorias você precisar"
  },
];

const testimonials = [
  {
    name: "Maria Silva",
    role: "Professora",
    text: "Consegui economizar R$ 800 por mês depois que comecei a usar! A visualização clara me ajudou a identificar gastos desnecessários.",
    rating: 5
  },
  {
    name: "João Santos",
    role: "Empresário",
    text: "Ferramenta essencial para quem quer ter controle financeiro de verdade. Simples, eficiente e completamente gratuita!",
    rating: 5
  },
  {
    name: "Ana Costa",
    role: "Estudante",
    text: "Finalmente consegui organizar minha mesada e ainda sobra dinheiro no fim do mês. Recomendo demais!",
    rating: 5
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section com Gatilho de Escassez e Prova Social */}
      <section className="section-gradient py-16 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="container-app">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            {/* Badge de Prova Social */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <i className="fa-solid fa-users"></i>
              <span>Mais de <strong>15.000+ pessoas</strong> já organizaram suas finanças</span>
            </div>

            {/* Headline com Benefício Claro */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Tome Controle do Seu{" "}
              <span className="text-gradient bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Bolso
              </span>
            </h1>

            {/* Subheadline com Gatilho de Transformação */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Descubra para onde seu dinheiro está indo e <strong>transforme sua vida financeira</strong> com o método mais simples e eficaz de controle de gastos. <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% gratuito, para sempre.</span>
            </p>

            {/* CTA Principal com Urgência */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/ferramentas">
                <Button size="lg" className="btn-gradient w-full sm:w-auto text-base px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                  <i className="fa-solid fa-rocket mr-2 group-hover:animate-bounce"></i>
                  Começar Agora — É Grátis
                  <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </Button>
              </Link>
              <Link to="/sobre">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 py-6 border-2">
                  <i className="fa-solid fa-play-circle mr-2"></i>
                  Ver Como Funciona
                </Button>
              </Link>
            </div>

            {/* Gatilho de Autoridade */}
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
              <i className="fa-solid fa-check-circle text-emerald-500"></i>
              Sem cadastro obrigatório
              <span className="text-muted-foreground/40">•</span>
              <i className="fa-solid fa-check-circle text-emerald-500"></i>
              Sem cartão de crédito
              <span className="text-muted-foreground/40">•</span>
              <i className="fa-solid fa-check-circle text-emerald-500"></i>
              Comece em menos de 2 minutos
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </section>

      {/* Features Section com Gatilho de Benefício */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container-app">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-sm px-4 py-2">
              <i className="fa-solid fa-sparkles mr-2"></i>
              Recursos Poderosos
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Tudo Que Você Precisa Para{" "}
              <span className="text-emerald-600 dark:text-emerald-400">Prosperar</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ferramentas profissionais que cabem no seu bolso (literalmente, porque é grátis!)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, i) => (
              <Card key={i} className="card-hover border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <i className={`fa-solid ${item.icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-3 text-lg">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section com Princípio de Pareto (80/20) */}
      <section className="py-16 md:py-24">
        <div className="container-app">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Por Que <span className="text-emerald-600 dark:text-emerald-400">82% dos Usuários</span> Conseguem Economizar Mais?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A diferença está em ter as informações certas na hora certa
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-emerald-500/30 hover:shadow-xl transition-all duration-300">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <i className={`fa-solid ${benefit.icon} text-emerald-600 dark:text-emerald-400 text-xl`}></i>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground mb-2 text-lg">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section com Gatilho de Prova Social (Cialdini) */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container-app">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-sm px-4 py-2">
              <i className="fa-solid fa-star mr-2"></i>
              Depoimentos Reais
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Veja O Que Nossos Usuários Dizem
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Milhares de pessoas já transformaram suas vidas financeiras
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-card">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="fa-solid fa-star text-yellow-500"></i>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container-app">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Como Funciona? <span className="text-emerald-600 dark:text-emerald-400">É Muito Simples!</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Em apenas 3 passos você terá controle total das suas finanças
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Registre", desc: "Adicione suas receitas e despesas do mês", icon: "fa-pen-to-square" },
              { step: "2", title: "Visualize", desc: "Veja gráficos e relatórios detalhados", icon: "fa-chart-pie" },
              { step: "3", title: "Economize", desc: "Identifique oportunidades de economia", icon: "fa-sack-dollar" },
            ].map((item, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-xl">
                  {item.step}
                </div>
                <h3 className="font-display font-bold text-foreground mb-3 text-xl">{item.title}</h3>
                <i className={`fa-solid ${item.icon} text-4xl text-emerald-500/20 mb-4`}></i>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-emerald-500/30">
                    <i className="fa-solid fa-arrow-right text-2xl"></i>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/ferramentas">
              <Button size="lg" className="btn-gradient px-12 py-6 text-lg shadow-xl hover:shadow-2xl">
                <i className="fa-solid fa-rocket mr-2"></i>
                Começar Meu Controle Financeiro Agora
                <i className="fa-solid fa-arrow-right ml-2"></i>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section com Gatilho de Escassez/Urgência */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-600 to-teal-600 text-white relative overflow-hidden">
        <div className="container-app relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Não Deixe Para Amanhã o Que Você Pode Fazer Hoje
            </h2>
            <p className="text-lg md:text-xl mb-8 text-emerald-50">
              Junte-se a milhares de pessoas que já tomaram controle de suas finanças.
              <strong className="block mt-2">É grátis, é rápido e pode mudar sua vida financeira.</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/ferramentas">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto px-12 py-6 text-lg shadow-xl hover:shadow-2xl bg-white text-emerald-600 hover:bg-emerald-50">
                  <i className="fa-solid fa-rocket mr-2"></i>
                  Sim, Quero Ter Controle Financeiro!
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-emerald-100">
              <i className="fa-solid fa-shield-halved mr-2"></i>
              Seus dados são 100% seguros e privados
            </p>
          </div>
        </div>

        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </section>
    </>
  );
}