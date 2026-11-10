import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useNavigate, Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCut, 
  faParagraph, 
  faCopy, 
  faVolumeUp, 
  faDownload, 
  faClosedCaptioning,
  faMicrophone,
  faSliders,
  faShieldAlt,
  faFileAudio,
  faMars,
  faVenus
} from '@fortawesome/free-solid-svg-icons';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: faCut,
      title: "Divisão Inteligente",
      description: "Divida textos longos em blocos organizados mantendo a integridade das sentenças"
    },
    {
      icon: faParagraph,
      title: "Sentenças Preservadas", 
      description: "Nunca quebra sentenças no meio - respeita a estrutura do seu texto"
    },
    {
      icon: faCopy,
      title: "Cópia Rápida",
      description: "Copie cada bloco com um clique e tenha feedback visual instantâneo"
    },
    {
      icon: faVolumeUp,
      title: "Síntese de Voz",
      description: "Ouça seus textos com voz natural diretamente no navegador"
    },
    {
      icon: faDownload,
      title: "Download MP3/WAV",
      description: "Gere e baixe áudio em MP3 ou WAV de cada bloco ou do texto completo"
    },
    {
      icon: faClosedCaptioning,
      title: "Geração de SRT",
      description: "Exporte legendas no formato .srt para uso em vídeos"
    },
    {
      icon: faMicrophone,
      title: "Múltiplas Vozes IA",
      description: "Escolha entre diversas vozes masculinas e femininas com tecnologia Gemini"
    },
    {
      icon: faSliders,
      title: "Controle de Velocidade",
      description: "Ajuste a velocidade de reprodução do áudio de 0.5x a 2x"
    }
  ];

  const additionalFeatures = [
    {
      icon: faFileAudio,
      title: "Formatos de Áudio",
      description: "Exporte em MP3 ou WAV conforme sua necessidade"
    },
    {
      icon: faMars,
      title: "Filtro por Gênero",
      description: "Filtre vozes por masculino ou feminino"
    },
    {
      icon: faVenus,
      title: "Prévia de Voz",
      description: "Ouça uma amostra antes de escolher a voz"
    },
    {
      icon: faShieldAlt,
      title: "Conforme LGPD",
      description: "Seus dados são processados localmente com total privacidade"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-hero" aria-hidden="true"></div>
            <span className="font-bold text-xl">Divisor de Texto</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link 
              to="/app" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hidden sm:inline"
            >
              Usar Ferramenta
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-24 text-center flex-1">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Divida Seus Textos com Inteligência
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transforme textos longos em blocos organizados, gere áudio MP3 com IA Gemini, 
            exporte legendas SRT e muito mais. Perfeito para estudantes, criadores de conteúdo e profissionais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => navigate('/app')}
              className="text-lg px-8 py-6"
            >
              Usar Agora - Grátis
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate('/app')}
              className="text-lg px-8 py-6"
            >
              Ver Demonstração
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faShieldAlt} className="text-success" />
            Sem cadastro • 100% privado • Conforme LGPD
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="container py-24 bg-muted/30">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-4">Por que usar o Divisor de Texto?</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Uma ferramenta completa para organização, síntese de voz e exportação de textos
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-soft hover:shadow-medium transition-smooth group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <FontAwesomeIcon icon={feature.icon} className="text-xl text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Highlight Section */}
      <section className="container py-16">
        <div className="mx-auto max-w-4xl">
          <Card className="bg-gradient-hero p-[2px] rounded-2xl overflow-hidden shadow-elegant">
            <div className="bg-background rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Novo: Geração de Áudio com IA Gemini</h3>
                  <p className="text-muted-foreground mb-6">
                    Transforme seus textos em áudio de alta qualidade com nossa integração de IA Google Gemini. 
                    Baixe arquivos MP3 ou WAV prontos para usar em podcasts, vídeos ou estudos.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" aria-hidden="true"></div>
                      Vozes naturais masculinas e femininas
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" aria-hidden="true"></div>
                      Download em formato MP3 ou WAV
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" aria-hidden="true"></div>
                      Prévia de voz antes de gerar
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" aria-hidden="true"></div>
                      Controle de velocidade personalizável
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center">
                  <div className="w-48 h-48 rounded-full bg-gradient-hero opacity-20 flex items-center justify-center">
                    <FontAwesomeIcon icon={faMicrophone} className="text-6xl text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Additional Features */}
      <section className="container py-16 bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-8">Recursos Adicionais</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-background border">
                <FontAwesomeIcon icon={feature.icon} className="text-primary text-lg" />
                <div>
                  <h4 className="font-medium text-sm">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para organizar seus textos?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Comece agora mesmo e veja como é fácil dividir, ouvir e exportar textos longos.
          </p>
          <Button 
            variant="hero" 
            size="lg" 
            onClick={() => navigate('/app')}
            className="text-lg px-8 py-6"
          >
            Começar Gratuitamente
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Cookie Consent */}
      <CookieConsent />
    </div>
  );
};

export default Landing;
