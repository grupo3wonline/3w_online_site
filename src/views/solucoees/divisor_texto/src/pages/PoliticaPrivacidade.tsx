import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

const PoliticaPrivacidade = () => {
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
          <div className="flex items-center gap-3 mb-4">
            <FontAwesomeIcon icon={faShieldAlt} className="text-4xl text-success" />
            <h1 className="text-4xl font-bold m-0 bg-gradient-hero bg-clip-text text-transparent">
              Política de Privacidade
            </h1>
          </div>
          
          <p className="text-muted-foreground text-lg mb-8">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <div className="p-6 bg-success/10 rounded-lg border border-success/20 mb-8">
            <p className="text-sm m-0">
              <strong className="text-success">🔒 Sua privacidade é nossa prioridade:</strong> Não coletamos, 
              armazenamos ou compartilhamos NENHUM dado pessoal. Todo processamento ocorre localmente no seu navegador.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Informações Gerais</h2>
            <p className="text-muted-foreground">
              Esta Política de Privacidade descreve como o Divisor de Texto trata suas informações 
              em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Dados Coletados</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Dados que NÃO Coletamos</h3>
            <p className="text-muted-foreground mb-4">
              <strong>Importante:</strong> Não coletamos, processamos ou armazenamos em nossos servidores:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Blocos de texto gerados</li>
              <li>Arquivos SRT criados</li>
              <li>Nomes, e-mails ou dados pessoais identificáveis</li>
              <li>Endereços IP ou localização geográfica</li>
              <li>Histórico de navegação ou comportamento</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Dados Enviados a Terceiros (API de IA)</h3>
            <p className="text-muted-foreground mb-4">
              Ao utilizar a funcionalidade de geração de áudio, seus textos são enviados para a API Google Gemini 
              para processamento de síntese de voz. Essa transmissão ocorre apenas quando você solicita a geração 
              de áudio. Consulte a <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Política de Privacidade do Google</a> para mais detalhes.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Dados Armazenados Localmente</h3>
            <p className="text-muted-foreground mb-4">
              Apenas armazenamos no <strong>localStorage</strong> do seu navegador:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Consentimento de cookies:</strong> Sua escolha de aceitar ou rejeitar cookies</li>
              <li><strong>Preferência de tema:</strong> Modo claro ou escuro</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Esses dados ficam apenas no seu dispositivo e podem ser apagados a qualquer momento 
              limpando os dados do navegador.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Como Usamos Seus Dados</h2>
            <p className="text-muted-foreground mb-4">
              Como não coletamos dados pessoais, não há uso, compartilhamento ou processamento de informações identificáveis.
            </p>
            <p className="text-muted-foreground">
              Os dados armazenados localmente (preferências) servem apenas para melhorar sua experiência de uso 
              e não são acessíveis por nós.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Cookies</h2>
            <p className="text-muted-foreground mb-4">
              Utilizamos apenas <strong>cookies essenciais</strong> para:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Lembrar sua preferência de tema (claro/escuro)</li>
              <li>Registrar seu consentimento sobre uso de cookies</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              <strong>Não utilizamos:</strong> Cookies de rastreamento, analytics ou publicidade.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Compartilhamento de Dados</h2>
            <p className="text-muted-foreground">
              Não compartilhamos, vendemos ou transferimos seus dados para terceiros, pois simplesmente não os coletamos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Segurança</h2>
            <p className="text-muted-foreground">
              Todo o processamento de texto acontece no seu navegador (client-side). Seus textos nunca são enviados 
              para servidores externos, garantindo máxima privacidade e segurança.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Direitos do Titular (LGPD)</h2>
            <p className="text-muted-foreground mb-4">
              De acordo com a LGPD, você tem direito a:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Confirmação e acesso:</strong> Como não coletamos dados, não há dados para acessar</li>
              <li><strong>Correção:</strong> Não aplicável, pois não armazenamos dados pessoais</li>
              <li><strong>Exclusão:</strong> Limpe o localStorage do navegador para remover preferências locais</li>
              <li><strong>Portabilidade:</strong> Não aplicável</li>
              <li><strong>Informação sobre compartilhamento:</strong> Não compartilhamos dados</li>
              <li><strong>Revogação de consentimento:</strong> Limpe os cookies do navegador</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Serviços de Terceiros</h2>
            <p className="text-muted-foreground mb-4">
              A ferramenta utiliza os seguintes serviços de terceiros:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Google Gemini API:</strong> Para geração de áudio a partir de texto. Os textos são processados pela API apenas quando você solicita a geração de áudio.</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Não utilizamos serviços de analytics ou rastreamento (Google Analytics, Facebook Pixel, etc.).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Menores de Idade</h2>
            <p className="text-muted-foreground">
              Como não coletamos dados pessoais, a ferramenta pode ser usada por pessoas de qualquer idade. 
              No entanto, recomendamos supervisão parental para menores de 13 anos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Alterações na Política</h2>
            <p className="text-muted-foreground">
              Podemos atualizar esta Política de Privacidade periodicamente. Mudanças significativas serão 
              comunicadas através de aviso na ferramenta.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Contato</h2>
            <p className="text-muted-foreground">
              Para questões sobre privacidade ou exercício de direitos da LGPD, entre em contato através 
              da nossa página principal.
            </p>
          </section>

          <div className="mt-12 p-6 bg-primary/10 rounded-lg border border-primary/20">
            <h3 className="text-lg font-semibold mb-3 mt-0">Resumo Executivo</h3>
            <ul className="space-y-2 text-sm text-muted-foreground mb-0">
              <li>✅ Processamento 100% local no navegador</li>
              <li>✅ Nenhum dado pessoal coletado ou armazenado</li>
              <li>✅ Sem rastreamento ou analytics</li>
              <li>✅ Apenas cookies essenciais (preferências locais)</li>
              <li>✅ Totalmente conforme a LGPD</li>
              <li>✅ Você tem controle total sobre seus dados</li>
            </ul>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default PoliticaPrivacidade;
