import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export default function PrivacidadePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-gradient py-16 md:py-20">
        <div className="container-app">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 text-sm px-4 py-2">
              <i className="fa-solid fa-shield-halved mr-2"></i>
              Política de Privacidade
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Política de Privacidade e Proteção de Dados
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
                    <i className="fa-solid fa-lock"></i>
                    Seu Compromisso Com Sua Privacidade
                  </h3>
                  <p className="mb-0 text-muted-foreground">
                    O <strong>Meu Bolso Mensal</strong> foi desenvolvido com foco total em privacidade.
                    Esta política explica como tratamos seus dados de acordo com a <strong>LGPD (Lei Geral de Proteção de Dados)</strong>.
                  </p>
                </div>

                <h2 className="flex items-center gap-2">
                  <i className="fa-solid fa-1 text-emerald-500"></i>
                  Informações que Coletamos
                </h2>

                <h3>1.1 Dados Financeiros (Processamento Local)</h3>
                <p>
                  Todos os seus dados financeiros (receitas, despesas, saldos, etc.) são processados
                  <strong> exclusivamente no seu navegador (armazenamento local)</strong> e <strong>NUNCA são
                    enviados para nossos servidores</strong>.
                </p>
                <ul>
                  <li>Receitas e despesas cadastradas</li>
                  <li>Categorias e tags personalizadas</li>
                  <li>Metas e objetivos financeiros</li>
                  <li>Histórico de transações</li>
                  <li>Configurações de preferências</li>
                </ul>

                <h3>1.2 Dados de Navegação (Google Analytics)</h3>
                <p>
                  Utilizamos Google Analytics 4 (GA4) e Google Tag Manager (GTM) para coletar dados
                  agregados e anônimos de uso:
                </p>
                <ul>
                  <li>Páginas visitadas e tempo de permanência</li>
                  <li>Dispositivo e navegador utilizados</li>
                  <li>Localização geográfica aproximada (cidade/estado)</li>
                  <li>Origem do tráfego (como você chegou até nós)</li>
                  <li>Interações com elementos da página</li>
                </ul>
                <p>
                  <strong>Estes dados são anônimos e não permitem sua identificação pessoal.</strong>
                </p>

                <h3>1.3 Dados de Contato (Formulário)</h3>
                <p>
                  Se você utilizar nosso formulário de contato, coletamos:
                </p>
                <ul>
                  <li>Nome</li>
                  <li>E-mail</li>
                  <li>Mensagem enviada</li>
                </ul>
                <p>
                  <strong>Base Legal (LGPD):</strong> Consentimento (Art. 7º, I) e Execução de Contrato (Art. 7º, V)
                </p>

                <h2 className="flex items-center gap-2">
                  <i className="fa-solid fa-2 text-emerald-500"></i>
                  Como Usamos Suas Informações
                </h2>

                <h3>2.1 Dados Financeiros</h3>
                <p>
                  Como seus dados financeiros <strong>nunca saem do seu dispositivo</strong>, nós:
                </p>
                <ul>
                  <li><strong>NÃO armazenamos</strong> em nossos servidores</li>
                  <li><strong>NÃO compartilhamos</strong> com terceiros</li>
                  <li><strong>NÃO vendemos</strong> para empresas</li>
                  <li><strong>NÃO utilizamos</strong> para marketing</li>
                </ul>

                <h3>2.2 Dados de Navegação</h3>
                <p>
                  Utilizamos os dados de navegação (via GA4/GTM) para:
                </p>
                <ul>
                  <li>Melhorar a experiência do usuário</li>
                  <li>Identificar problemas técnicos</li>
                  <li>Entender quais recursos são mais utilizados</li>
                  <li>Tomar decisões sobre novos recursos</li>
                </ul>

                <h3>2.3 Dados de Contato</h3>
                <p>
                  Utilizamos seus dados de contato exclusivamente para:
                </p>
                <ul>
                  <li>Responder suas dúvidas e solicitações</li>
                  <li>Fornecer suporte técnico</li>
                  <li>Comunicar atualizações importantes (se você optar)</li>
                </ul>

                <h2 className="flex items-center gap-2">
                  <i className="fa-solid fa-3 text-emerald-500"></i>
                  Compartilhamento de Dados
                </h2>
                <p>
                  <strong>Não compartilhamos seus dados pessoais com terceiros</strong>, exceto:
                </p>
                <ul>
                  <li><strong>Google (Analytics):</strong> Dados agregados e anônimos de navegação</li>
                  <li><strong>Freshdesk (formulário de contato):</strong> Nome, e-mail e mensagem enviada</li>
                  <li><strong>Por obrigação legal:</strong> Se exigido por lei ou ordem judicial</li>
                </ul>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
                  <h3 className="text-yellow-600 dark:text-yellow-400 mt-0 mb-2 flex items-center gap-2">
                    <i className="fa-solid fa-exclamation-triangle"></i>
                    Importante
                  </h3>
                  <p className="mb-0 text-muted-foreground">
                    <strong>Nunca pediremos senhas de bancos, cartões de crédito ou informações financeiras sensíveis.</strong>
                    Se alguém se passar por nós solicitando essas informações, é fraude. Denuncie imediatamente.
                  </p>
                </div>

                <h2 className="flex items-center gap-2">
                  <i className="fa-solid fa-4 text-emerald-500"></i>
                  Cookies e Tecnologias Similares
                </h2>
                <p>
                  Utilizamos cookies para:
                </p>
                <ul>
                  <li><strong>Cookies essenciais:</strong> Funcionamento básico da plataforma</li>
                  <li><strong>Cookies de análise:</strong> Google Analytics (anônimos)</li>
                  <li><strong>Cookies de preferências:</strong> Salvar suas configurações (tema, idioma)</li>
                </ul>
                <p>
                  Você pode gerenciar ou desabilitar cookies através das configurações do seu navegador.
                  No entanto, algumas funcionalidades podem não funcionar corretamente sem cookies.
                </p>

                <h2 className="flex items-center gap-2">
                  <i className="fa-solid fa-5 text-emerald-500"></i>
                  Seus Direitos (LGPD - Art. 18)
                </h2>
                <p>
                  De acordo com a LGPD, você tem direito a:
                </p>
                <ul>
                  <li><strong>Confirmação:</strong> Saber se tratamos seus dados pessoais</li>
                  <li><strong>Acesso:</strong> Solicitar cópia dos dados que temos sobre você</li>
                  <li><strong>Correção:</strong> Atualizar dados incompletos ou incorretos</li>
                  <li><strong>Anonimização ou Bloqueio:</strong> Solicitar anonimização ou bloqueio de dados desnecessários</li>
                  <li><strong>Eliminação:</strong> Solicitar exclusão de dados tratados com seu consentimento</li>
                  <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
                  <li><strong>Revogação:</strong> Retirar consentimento a qualquer momento</li>
                  <li><strong>Informação:</strong> Saber com quem compartilhamos seus dados</li>
                  <li><strong>Oposição:</strong> Opor-se a tratamentos realizados sem consentimento</li>
                </ul>
                <p>
                  Para exercer qualquer desses direitos, entre em contato através:
                </p>
                <ul>
                  <li>
                    <strong>E-mail:</strong>{" "}
                    <a href="mailto:contato@3wonline.com.br" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                      contato@3wonline.com.br
                    </a>
                  </li>
                  <li>
                    <Link to="/contato" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                      Formulário de Contato
                    </Link>
                  </li>
                </ul>

                <h2 className="flex items-center gap-2">
                  <i className="fa-solid fa-6 text-emerald-500"></i>
                  Segurança dos Dados
                </h2>
                <p>
                  Implementamos medidas de segurança para proteger seus dados:
                </p>
                <ul>
                  <li><strong>HTTPS:</strong> Conexão criptografada em toda a plataforma</li>
                  <li><strong>Processamento Local:</strong> Dados financeiros não saem do seu navegador</li>
                  <li><strong>Sem Armazenamento em Servidor:</strong> Informações sensíveis não são enviadas para servidores</li>
                  <li><strong>Código Seguro:</strong> Desenvolvimento seguindo boas práticas de segurança</li>
                </ul>
                <p>
                  No entanto, nenhum método de transmissão pela Internet ou armazenamento eletrônico
                  é 100% seguro. Recomendamos que você também tome precauções ao usar a plataforma.
                </p>

                <h2 className="flex items-center gap-2">
                  <i className="fa-solid fa-7 text-emerald-500"></i>
                  Retenção de Dados
                </h2>
                <p>
                  <strong>Dados Financeiros:</strong> Como são armazenados localmente no seu navegador,
                  continuam no seu dispositivo até que você os exclua manualmente (limpando os dados
                  do navegador ou usando a função de exclusão da plataforma).
                </p>
                <p>
                  <strong>Dados de Contato:</strong> Mantemos enquanto necessário para responder sua
                  solicitação e por até 5 anos para cumprimento de obrigações legais.
                </p>
                <p>
                  <strong>Dados de Navegação (Analytics):</strong> O Google Analytics retém os dados
                  por até 26 meses (configuração padrão).
                </p>

                <h2 className="flex items-center gap-2">
                  <i className="fa-solid fa-8 text-emerald-500"></i>
                  Menores de Idade
                </h2>
                <p>
                  Nossa plataforma é destinada a usuários maiores de 18 anos. Não coletamos
                  intencionalmente dados de menores de idade. Se você é responsável por um menor
                  e acredita que ele nos forneceu informações pessoais, entre em contato para
                  que possamos excluir esses dados.
                </p>

                <h2 className="flex items-center gap-2">
                  <i className="fa-solid fa-9 text-emerald-500"></i>
                  Alterações na Política
                </h2>
                <p>
                  Podemos atualizar esta Política de Privacidade periodicamente. Alterações
                  significativas serão comunicadas através de aviso na plataforma ou por e-mail
                  (se você forneceu seu e-mail).
                </p>
                <p>
                  Recomendamos revisar esta página periodicamente para estar ciente de quaisquer mudanças.
                </p>

                <h2 className="flex items-center gap-2">
                  <i className="fa-solid fa-envelope text-emerald-500"></i>
                  Contato e Encarregado de Dados (DPO)
                </h2>
                <p>
                  Se você tiver dúvidas sobre esta Política de Privacidade ou quiser exercer
                  seus direitos sob a LGPD, entre em contato:
                </p>
                <ul>
                  <li><strong>Empresa:</strong> Grupo 3W Online</li>
                  <li>
                    <strong>E-mail do DPO:</strong>{" "}
                    <a href="mailto:contato@3wonline.com.br" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                      contato@3wonline.com.br
                    </a>
                  </li>
                  <li>
                    <strong>Formulário:</strong>{" "}
                    <Link to="/contato" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                      Página de Contato
                    </Link>
                  </li>
                </ul>

                <div className="bg-gray-500/10 border border-gray-500/20 rounded-xl p-6 mt-8">
                  <p className="mb-2 text-sm text-muted-foreground">
                    <strong>Desenvolvido por:</strong> Grupo 3W Online<br />
                    <strong>Última atualização:</strong> 02 de fevereiro de 2026<br />
                    <strong>Conformidade:</strong> LGPD (Lei nº 13.709/2018)
                  </p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mt-6">
                  <h3 className="text-blue-600 dark:text-blue-400 mt-0 mb-2 flex items-center gap-2">
                    <i className="fa-solid fa-circle-info"></i>
                    Resumo: Sua Privacidade Em Primeiro Lugar
                  </h3>
                  <ul className="mb-0">
                    <li><strong>Dados financeiros:</strong> Nunca saem do seu navegador ✅</li>
                    <li><strong>Não vendemos dados:</strong> Jamais comercializamos suas informações ✅</li>
                    <li><strong>Analytics anônimo:</strong> Apenas para melhorar a plataforma ✅</li>
                    <li><strong>Você tem controle:</strong> Pode solicitar exclusão a qualquer momento ✅</li>
                    <li><strong>Conformidade LGPD:</strong> Respeitamos todos os seus direitos ✅</li>
                  </ul>
                </div>

              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}