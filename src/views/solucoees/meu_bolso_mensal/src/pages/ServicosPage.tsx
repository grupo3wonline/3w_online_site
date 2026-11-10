import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: "fa-code",
    title: "Desenvolvimento de Sites",
    description: "Sites institucionais, landing pages e hotsites profissionais com design moderno e responsivo.",
    features: ["Design responsivo", "SEO otimizado", "Alta performance", "Manutenção incluída"]
  },
  {
    icon: "fa-mobile-screen-button",
    title: "Sistemas Web Personalizados",
    description: "Desenvolvimento de sistemas sob medida para automatizar e otimizar processos do seu negócio.",
    features: ["100% personalizado", "Escalável", "Seguro", "Suporte técnico"]
  },
  {
    icon: "fa-store",
    title: "E-commerce Completo",
    description: "Lojas virtuais robustas com integração de pagamentos, controle de estoque e gestão de pedidos.",
    features: ["Pagamento integrado", "Gestão de produtos", "Relatórios", "App mobile"]
  },
  {
    icon: "fa-chart-line",
    title: "Marketing Digital",
    description: "Estratégias de marketing digital para aumentar sua presença online e gerar mais vendas.",
    features: ["Google Ads", "SEO", "Redes sociais", "Analytics"]
  },
  {
    icon: "fa-server",
    title: "Hospedagem e Domínio",
    description: "Infraestrutura segura e confiável para manter sua aplicação sempre no ar.",
    features: ["Servidor dedicado", "Backup automático", "SSL grátis", "99.9% uptime"]
  },
  {
    icon: "fa-headset",
    title: "Suporte e Manutenção",
    description: "Suporte técnico especializado e manutenção contínua para garantir o funcionamento perfeito.",
    features: ["Suporte rápido", "Atualizações", "Monitoramento", "Consultoria"]
  }
];

const technologies = [
  { name: "React", icon: "fa-react", color: "text-cyan-500" },
  { name: "Vue.js", icon: "fa-vuejs", color: "text-green-500" },
  { name: "Laravel", icon: "fa-laravel", color: "text-red-500" },
  { name: "Node.js", icon: "fa-node-js", color: "text-green-600" },
  { name: "PHP", icon: "fa-php", color: "text-purple-500" },
  { name: "JavaScript", icon: "fa-js", color: "text-yellow-500" },
  { name: "Python", icon: "fa-python", color: "text-blue-500" },
  { name: "WordPress", icon: "fa-wordpress", color: "text-blue-600" }
];

const benefits = [
  {
    icon: "fa-handshake",
    title: "Parceria de Longo Prazo",
    description: "Não somos apenas fornecedores, somos parceiros estratégicos do seu negócio."
  },
  {
    icon: "fa-bolt",
    title: "Entrega Rápida",
    description: "Projetos entregues no prazo combinado, sem atrasos e com qualidade garantida."
  },
  {
    icon: "fa-shield-halved",
    title: "Segurança em Primeiro Lugar",
    description: "Desenvolvimento seguindo as melhores práticas de segurança da informação."
  },
  {
    icon: "fa-dollar-sign",
    title: "Preço Justo",
    description: "Orçamentos transparentes e competitivos, sem custos escondidos."
  }
];

export default function ServicosPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-gradient py-16 md:py-24">
        <div className="container-app">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <Badge variant="outline" className="mb-4 text-sm px-4 py-2">
              <i className="fa-solid fa-briefcase mr-2"></i>
              Nossos Serviços
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Desenvolvemos{" "}
              <span className="text-gradient bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Sites e Sistemas
              </span>
              {" "}Sob Medida
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              O <strong>Grupo 3W Online</strong> transforma ideias em soluções digitais poderosas.
              Desenvolvimento web profissional, personalizado e focado em resultados.
            </p>
            <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="btn-gradient px-8 py-6 shadow-xl">
                <i className="fa-solid fa-external-link-alt mr-2"></i>
                Visitar Site da 3W Online
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container-app">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Soluções Completas Para Seu Negócio
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Da concepção ao lançamento, cuidamos de cada detalhe do seu projeto digital
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <Card key={i} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-card group">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <i className={`fa-solid ${service.icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-3 text-xl">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <i className="fa-solid fa-check-circle text-emerald-500"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container-app">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-sm px-4 py-2">
              <i className="fa-solid fa-tools mr-2"></i>
              Stack Tecnológico
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tecnologias Modernas e Confiáveis
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Usamos as melhores ferramentas e frameworks do mercado
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            {technologies.map((tech, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border/50 hover:border-emerald-500/30 hover:shadow-lg transition-all duration-300 min-w-[120px]">
                <i className={`fa-brands ${tech.icon} text-5xl ${tech.color}`}></i>
                <span className="font-semibold text-foreground">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container-app">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Por Que Escolher a 3W Online?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Compromisso com excelência e resultados
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex gap-6 p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-emerald-500/30 hover:shadow-xl transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <i className={`fa-solid ${benefit.icon} text-emerald-600 dark:text-emerald-400 text-2xl`}></i>
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground mb-2 text-xl">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container-app">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nosso Processo de Trabalho
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Metodologia eficiente e transparente do início ao fim
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Briefing", icon: "fa-comments", desc: "Entendemos suas necessidades" },
              { step: "2", title: "Desenvolvimento", icon: "fa-code", desc: "Codificamos sua solução" },
              { step: "3", title: "Testes", icon: "fa-vial", desc: "Validamos qualidade" },
              { step: "4", title: "Lançamento", icon: "fa-rocket", desc: "Publicamos online" },
            ].map((item, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-xl">
                  {item.step}
                </div>
                <i className={`fa-solid ${item.icon} text-3xl text-emerald-500/30 mb-4`}></i>
                <h3 className="font-display font-bold text-foreground mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
        <div className="container-app">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Pronto Para Transformar Sua Ideia em Realidade?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-emerald-50">
              Entre em contato com a <strong>3W Online</strong> e descubra como podemos
              desenvolver a solução perfeita para o seu negócio
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto px-12 py-6 text-lg shadow-2xl bg-white text-emerald-600 hover:bg-emerald-50">
                  <i className="fa-solid fa-globe mr-2"></i>
                  Visitar 3W Online
                </Button>
              </a>
              <a href="/contato">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-12 py-6 text-lg border-2 border-white text-white hover:bg-white/10">
                  <i className="fa-solid fa-envelope mr-2"></i>
                  Solicitar Orçamento
                </Button>
              </a>
            </div>
            <p className="mt-6 text-sm text-emerald-100">
              <i className="fa-solid fa-clock mr-2"></i>
              Respondemos em até 24 horas úteis
            </p>
          </div>
        </div>
      </section>
    </>
  );
}