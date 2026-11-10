import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const contactInfo = [
  {
    icon: "fa-envelope",
    title: "E-mail",
    content: "contato@3wonline.com.br",
    link: "mailto:contato@3wonline.com.br"
  },
  {
    icon: "fa-globe",
    title: "Website",
    content: "www.3wonline.com.br",
    link: "https://www.3wonline.com.br"
  },
  {
    icon: "fa-clock",
    title: "Horário de Atendimento",
    content: "Seg - Sex: 9h às 18h",
    link: null
  },
  {
    icon: "fa-map-marker-alt",
    title: "Localização",
    content: "Atendimento Online",
    link: null
  }
];

const reasons = [
  {
    icon: "fa-question-circle",
    title: "Dúvidas sobre a Ferramenta",
    description: "Tire suas dúvidas sobre como usar o Meu Bolso Mensal"
  },
  {
    icon: "fa-lightbulb",
    title: "Sugestões de Melhorias",
    description: "Contribua com ideias para tornar o app ainda melhor"
  },
  {
    icon: "fa-briefcase",
    title: "Desenvolvimento de Projetos",
    description: "Solicite um orçamento para sites e sistemas personalizados"
  },
  {
    icon: "fa-headset",
    title: "Suporte Técnico",
    description: "Reporte bugs ou problemas técnicos que encontrou"
  }
];

export default function ContatoPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-gradient py-16 md:py-24">
        <div className="container-app">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <Badge variant="outline" className="mb-4 text-sm px-4 py-2">
              <i className="fa-solid fa-phone mr-2"></i>
              Fale Conosco
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Estamos Aqui Para{" "}
              <span className="text-gradient bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Te Ajudar
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Tem alguma dúvida, sugestão ou precisa de ajuda? Nossa equipe está pronta para atender você!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 md:py-20 -mt-8">
        <div className="container-app">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, i) => (
              <Card key={i} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <i className={`fa-solid ${info.icon} text-emerald-600 dark:text-emerald-400 text-xl`}></i>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                  {info.link ? (
                    <a href={info.link} className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline" target={info.link.startsWith('http') ? '_blank' : undefined} rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}>
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">{info.content}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reasons to Contact */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container-app">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Como Podemos Te Ajudar?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Alguns dos motivos pelos quais nossos usuários entram em contato
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {reasons.map((reason, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border/50 hover:border-emerald-500/30 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4 shadow-lg">
                  <i className={`fa-solid ${reason.icon} text-white text-xl`}></i>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24">
        <div className="container-app">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Envie Sua Mensagem
              </h2>
              <p className="text-lg text-muted-foreground">
                Preencha o formulário abaixo e retornaremos em até 24 horas úteis
              </p>
            </div>

            <Card className="border-0 shadow-2xl bg-card overflow-hidden">
              <CardContent className="p-0">
                {/* Freshdesk Feedback Form */}
                <div className="w-full flex justify-center items-center p-4 md:p-8">
                  <iframe
                    title="Feedback Form"
                    src="https://3wonline.freshdesk.com/widgets/feedback_widget/new?&widgetType=embedded&formTitle=Fale+conosco&submitTitle=Enviar&submitThanks=Mensagem+Enviada+com+Sucesso"
                    className="w-full border-0 rounded-xl"
                    style={{ maxWidth: '900px', height: '530px' }}
                  />
                </div>

                {/* Info Below Form */}
                <div className="bg-secondary/30 p-6 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-shield-halved text-emerald-500"></i>
                    <span>Suas informações estão seguras</span>
                  </div>
                  <span className="hidden md:block text-muted-foreground/40">•</span>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-clock text-emerald-500"></i>
                    <span>Resposta em até 24h úteis</span>
                  </div>
                  <span className="hidden md:block text-muted-foreground/40">•</span>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-envelope-circle-check text-emerald-500"></i>
                    <span>Confirmação por e-mail</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Quick Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container-app">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 text-sm px-4 py-2">
                <i className="fa-solid fa-circle-question mr-2"></i>
                Perguntas Frequentes
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Talvez Sua Dúvida Esteja Aqui
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "O Meu Bolso Mensal é realmente gratuito?",
                  a: "Sim! 100% gratuito, para sempre. Sem períodos de teste, sem planos premium, sem pegadinhas."
                },
                {
                  q: "Meus dados financeiros estão seguros?",
                  a: "Absolutamente! Todos os dados são processados localmente no seu navegador e nunca são enviados para servidores externos."
                },
                {
                  q: "Preciso fazer cadastro para usar?",
                  a: "Não é obrigatório, mas recomendamos para salvar seus dados e acessar de qualquer dispositivo."
                },
                {
                  q: "Posso solicitar um novo recurso?",
                  a: "Com certeza! Adoramos receber sugestões da nossa comunidade. Use o formulário acima para enviar sua ideia."
                }
              ].map((faq, i) => (
                <Card key={i} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-card">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-2 flex items-start gap-2">
                      <i className="fa-solid fa-circle-question text-emerald-500 mt-1"></i>
                      {faq.q}
                    </h3>
                    <p className="text-muted-foreground ml-6">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
        <div className="container-app">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Precisa de Um Site ou Sistema Personalizado?
            </h2>
            <p className="text-lg mb-8 text-emerald-50">
              A <strong>Grupo 3W Online</strong> desenvolve soluções web sob medida para o seu negócio
            </p>
            <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer">
              <button className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-all shadow-xl hover:shadow-2xl">
                <i className="fa-solid fa-external-link-alt mr-2"></i>
                Conhecer a 3W Online
              </button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}