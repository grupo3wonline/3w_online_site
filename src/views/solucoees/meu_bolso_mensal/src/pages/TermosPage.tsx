import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export default function TermosPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-gradient py-16 md:py-20">
        <div className="container-app">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 text-sm px-4 py-2">
              <i className="fa-solid fa-file-contract mr-2"></i>
              Termos de Uso
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Termos e Condições de Uso
            </h1>
            <p className="text-muted-foreground">
              Última atualização: 02 de fevereiro de 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20">
        <div className="container-app">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl bg-card">
              <CardContent className="p-8 md:p-12 prose prose-lg dark:prose-invert max-w-none">

                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 mb-8">
                  <h3 className="text-emerald-600 dark:text-emerald-400 mt-0 mb-2 flex items-center gap-2">
                    <i className="fa-solid fa-shield-halved"></i>
                    Bem-vindo ao Meu Bolso Mensal
                  </h3>
                  <p className="mb-0 text-muted-foreground">
                    Ao utilizar nossa plataforma, você concorda com os termos descritos neste documento.
                    Leia atentamente antes de prosseguir.
                  </p>
                </div>

                <h2 className="flex items-center gap-2">
                  <i className="fa-solid fa-1 text-emerald-500"></i>
                  Aceitação dos Termos
                </h2>
                <p>
                  Ao acessar e usar o <strong>Meu Bolso Mensal</strong>, você concorda em cumprir e estar
                  vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer
                  parte destes termos, não deverá usar nossa plataforma.
                </p>

                <h2 className="flex items-center gap-2">
                  <i className="fa-solid fa-2 text-emerald-500"></i>
                  Descrição do Serviço
                </h2>
                <p>
                  O <strong>Meu Bolso Mensal</strong> é uma ferramenta online gratuita de controle financeiro pessoal
                  que permite aos usuários gerenciar receitas, despesas, investimentos e planejamento financeiro.
                </p>
                <p>
                  <strong>Características do serviço:</strong>
                </p>
                <ul>
                  <li>Processamento local de dados no navegador do usuário</li>
                  <li>Calculadoras financeiras e trabalhistas</li>
                  <li>Relatórios e gráficos de análise financeira</li>
                  <li>100% gratuito, sem custos ocultos</li>
                </ul>

                <h2 className="flex items-center gap-2">
                  <i className="fa-solid fa-3 text-emerald-500"></i>
                  Responsabilidades do Usuário
                </h2>
                <p>
                  Como usuário do Meu Bolso Mensal, você concorda em:
                </p>
                <ul>
                  <li>Fornecer informações precisas e atualizadas</li>
                  <li>Manter a confidencialidade de seus dados de acesso</li>
                  <li>Não utilizar a plataforma para fins ilícitos ou não autorizados</li>
                  <li>Não tentar hackear, comprometer ou acessar áreas restritas do sistema</li>
                  <li>Respeitar os direitos de propriedade intelectual da plataforma</li>
                </ul>

                <h2 className="flex items-center gap-2">
                  <i className="fa-solid fa-4 text-emerald-500"></i>
                  Limitações de Responsabilidade
                </h2>
                <p>
                  O <strong>Meu Bolso Mensal</strong> é fornecido "como está" e "conforme disponível",
                  sem garantias de qualquer tipo, expressas ou implícitas.
                </p>
                <p>
                  <strong>Não nos responsabilizamos por:</strong>
                </p>
                <ul>
                  <li>Decisões financeiras tomadas com base nas informações fornecidas pela plataforma</li>
                  <li>Erros ou imprecisões nos cálculos, embora nos esforcemos para garantir a precisão</li>
                  <li>Perda de dados devido a problemas técnicos do navegador ou dispositivo do usuário</li>
                  <li>Interrupções temporárias do serviço por manutenção ou problemas técnicos</li>
                  <li>Danos diretos, indiretos, incidentais ou consequenciais do uso da plataforma</li>
                </ul>

                <h2 className="flex items-center gap-2">
                  <i className="fa-solid fa-5 text-emerald-500"></i>
                  Propriedade Intelectual
                </h2>
                <p>
                  Todo o conteúdo da plataforma, incluindo mas não limitado a textos, gráficos, logos,
                  ícones, imagens, código-fonte e software, é propriedade do <strong>Grupo 3W Online</strong>
                  e está protegido por leis de direitos autorais.
                </p>
                <p>
                  É proibida a reprodução, distribuição ou modificação do conteúdo sem autorização prévia por escrito.
                </p>

                <h2 className="flex items-center gap-2">
                  <i className="fa-solid fa-6 text-emerald-500"></i>
                  Privacidade e Proteção de Dados
                </h2>
                <p>
                  Levamos sua privacidade a sério. Para informações detalhadas sobre como coletamos,
                  usamos e protegemos seus dados pessoais, consulte nossa{" "}
                  <Link to="/politica-de-privacidade" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                    Política de Privacidade
                  </Link>.
                </p>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                  <h3 className="text-blue-600 dark:text-blue-400 mt-0 mb-2 flex items-center gap-2">
                    <i className="fa-solid fa-info-circle"></i>
                    Importante
                  </h3>
                  <p className="mb-0 text-muted-foreground">
                    Seus dados financeiros são processados <strong>localmente no seu navegador</strong> e
                    NUNCA são enviados para nossos servidores. Você mantém controle total sobre suas informações.
                  </p>
                </div>

                <h2 className="flex items-center gap-2">
                  <i className="fa-solid fa-7 text-emerald-500"></i>
                  Modificações nos Termos
                </h2>
                <p>
                  Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento.
                  Alterações significativas serão comunicadas aos usuários através da plataforma.
                </p>
                <p>
                  O uso contínuo da plataforma após modificações constitui aceitação dos novos termos.
                </p>

                <h2 className="flex items-center gap-2">
                  <i className="fa-solid fa-8 text-emerald-500"></i>
                  Rescisão
                </h2>
                <p>
                  Podemos suspender ou encerrar seu acesso à plataforma imediatamente, sem aviso prévio,
                  por qualquer motivo, incluindo, mas não se limitando a, violação destes Termos de Uso.
                </p>

                <h2 className="flex items-center gap-2">
                  <i className="fa-solid fa-9 text-emerald-500"></i>
                  Lei Aplicável
                </h2>
                <p>
                  Estes Termos de Uso são regidos e interpretados de acordo com as leis da República
                  Federativa do Brasil, especialmente a <strong>Lei Geral de Proteção de Dados (LGPD)</strong>,
                  Lei nº 13.709/2018.
                </p>

                <h2 className="flex items-center gap-2">
                  <i className="fa-solid fa-envelope text-emerald-500"></i>
                  Contato
                </h2>
                <p>
                  Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
                </p>
                <ul>
                  <li>
                    <strong>E-mail:</strong>{" "}
                    <a href="mailto:contato@3wonline.com.br" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                      contato@3wonline.com.br
                    </a>
                  </li>
                  <li>
                    <strong>Formulário de Contato:</strong>{" "}
                    <Link to="/contato" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                      Página de Contato
                    </Link>
                  </li>
                </ul>

                <div className="bg-gray-500/10 border border-gray-500/20 rounded-xl p-6 mt-8">
                  <p className="mb-2 text-sm text-muted-foreground">
                    <strong>Desenvolvido por:</strong> Grupo 3W Online<br />
                    <strong>Última atualização:</strong> 02 de fevereiro de 2026
                  </p>
                </div>

              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}