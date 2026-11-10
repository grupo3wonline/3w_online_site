import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const TermosDeUso = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Voltar
            </Button>
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="h-8 w-8 rounded-lg bg-gradient-hero"></div>
              <span className="font-bold text-xl hidden sm:inline">Divisor de Texto</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Content */}
      <main className="container py-12 flex-1">
        <article className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-hero bg-clip-text text-transparent">
            Termos de Uso
          </h1>
          
          <p className="text-muted-foreground text-lg mb-8">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Aceitação dos Termos</h2>
            <p className="text-muted-foreground">
              Ao acessar e utilizar o Divisor de Texto, você concorda com estes Termos de Uso. 
              Se você não concorda com qualquer parte destes termos, não utilize nossa ferramenta.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Descrição do Serviço</h2>
            <p className="text-muted-foreground mb-4">
              O Divisor de Texto é uma ferramenta gratuita baseada em navegador que permite:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Dividir textos longos em blocos organizados (máximo 4500 caracteres / 900 palavras por bloco)</li>
              <li>Gerar arquivos SRT para legendas</li>
              <li>Copiar blocos de texto individualmente</li>
              <li>Gerar e baixar áudio em MP3/WAV usando síntese de voz com IA Google Gemini</li>
              <li>Prévia de vozes masculinas e femininas</li>
              <li>Visualizar estatísticas de caracteres, palavras e sentenças</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Processamento de Dados</h2>
            <p className="text-muted-foreground mb-4">
              <strong>Importante:</strong> Todo o processamento de texto ocorre localmente no seu navegador. 
              Nenhum texto que você insere na ferramenta é enviado para nossos servidores ou armazenado permanentemente.
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Não coletamos, armazenamos ou processamos seus textos em nossos servidores</li>
              <li>Não compartilhamos seus dados com terceiros</li>
              <li>Todo o processamento é feito no lado do cliente (client-side)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Uso Adequado</h2>
            <p className="text-muted-foreground mb-4">Você concorda em:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Utilizar a ferramenta apenas para fins legais e legítimos</li>
              <li>Não tentar interferir ou comprometer a segurança da ferramenta</li>
              <li>Não utilizar a ferramenta para processar conteúdo ilegal, ofensivo ou prejudicial</li>
              <li>Respeitar direitos autorais e propriedade intelectual de terceiros</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Propriedade Intelectual</h2>
            <p className="text-muted-foreground">
              O código-fonte, design e funcionalidades do Divisor de Texto são protegidos por direitos autorais. 
              Você mantém todos os direitos sobre os textos que processa na ferramenta.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Isenção de Garantias</h2>
            <p className="text-muted-foreground">
              A ferramenta é fornecida "como está" e "conforme disponível", sem garantias de qualquer tipo. 
              Não garantimos que o serviço será ininterrupto, seguro ou livre de erros.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Limitação de Responsabilidade</h2>
            <p className="text-muted-foreground">
              Não nos responsabilizamos por quaisquer danos diretos, indiretos, incidentais ou consequenciais 
              resultantes do uso ou incapacidade de usar a ferramenta.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Modificações dos Termos</h2>
            <p className="text-muted-foreground">
              Reservamos o direito de modificar estes Termos de Uso a qualquer momento. 
              Mudanças significativas serão comunicadas através de aviso na ferramenta.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Lei Aplicável</h2>
            <p className="text-muted-foreground">
              Estes termos são regidos pelas leis brasileiras, em conformidade com o Marco Civil da Internet 
              e a Lei Geral de Proteção de Dados (LGPD).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Contato</h2>
            <p className="text-muted-foreground">
              Para questões sobre estes Termos de Uso, entre em contato através da nossa página principal.
            </p>
          </section>

          <div className="mt-12 p-6 bg-accent/10 rounded-lg border border-accent/20">
            <p className="text-sm text-muted-foreground m-0">
              <strong>Resumo:</strong> Use a ferramenta com responsabilidade. Seus dados são privados e processados 
              localmente. Não armazenamos nem compartilhamos suas informações. A ferramenta é gratuita e fornecida 
              sem garantias.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default TermosDeUso;
