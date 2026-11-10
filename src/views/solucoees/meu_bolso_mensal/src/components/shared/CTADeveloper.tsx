import { Button } from "@/components/ui/button";

interface CTADeveloperProps {
  variant?: "default" | "compact";
}

export default function CTADeveloper({ variant = "default" }: CTADeveloperProps) {
  if (variant === "compact") {
    return (
      <div className="bg-secondary/50 border border-border rounded-xl p-4 mt-8">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-code text-primary-foreground text-lg"></i>
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Precisa de um sistema personalizado?</strong>{" "}
              O Grupo 3W Online desenvolve soluções sob demanda.
            </p>
          </div>
          <a
            href="https://www.3wonline.com.br"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" className="btn-gradient whitespace-nowrap">
              <i className="fa-solid fa-arrow-right mr-2"></i>
              Saiba Mais
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 md:py-20 section-gradient">
      <div className="container-app">
        <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full w-fit mb-6">
                <i className="fa-solid fa-sparkles"></i>
                Desenvolvimento Sob Demanda
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Transforme Sua Ideia em Realidade Digital
              </h2>
              <p className="text-muted-foreground mb-6">
                O <strong className="text-foreground">Grupo 3W Online</strong> é especializado 
                em desenvolvimento de websites, sistemas web e aplicações personalizadas. 
                Com mais de 15 anos de experiência, entregamos soluções que impulsionam 
                negócios e geram resultados.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-check text-success text-xs"></i>
                  </span>
                  Websites institucionais e e-commerce
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-check text-success text-xs"></i>
                  </span>
                  Sistemas de gestão empresarial (ERP, CRM)
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-check text-success text-xs"></i>
                  </span>
                  Aplicações web e mobile sob medida
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-check text-success text-xs"></i>
                  </span>
                  Consultoria e suporte técnico especializado
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://www.3wonline.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="btn-gradient w-full sm:w-auto">
                    <i className="fa-solid fa-globe mr-2"></i>
                    Visitar Site
                  </Button>
                </a>
                <a
                  href="https://wa.me/5500000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full sm:w-auto">
                    <i className="fa-brands fa-whatsapp mr-2 text-success"></i>
                    Falar no WhatsApp
                  </Button>
                </a>
              </div>
            </div>

            {/* Visual */}
            <div className="bg-gradient-primary p-8 md:p-12 flex items-center justify-center">
              <div className="text-center text-primary-foreground">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                  <i className="fa-solid fa-laptop-code text-4xl md:text-5xl"></i>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold mb-2">
                  Grupo 3W Online
                </h3>
                <p className="text-primary-foreground/80 text-sm md:text-base">
                  Soluções Tecnológicas Inteligentes
                </p>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <div className="text-center">
                    <p className="font-display text-2xl font-bold">15+</p>
                    <p className="text-xs text-primary-foreground/70">Anos</p>
                  </div>
                  <div className="w-px h-10 bg-primary-foreground/20"></div>
                  <div className="text-center">
                    <p className="font-display text-2xl font-bold">500+</p>
                    <p className="text-xs text-primary-foreground/70">Projetos</p>
                  </div>
                  <div className="w-px h-10 bg-primary-foreground/20"></div>
                  <div className="text-center">
                    <p className="font-display text-2xl font-bold">100%</p>
                    <p className="text-xs text-primary-foreground/70">Satisfação</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}