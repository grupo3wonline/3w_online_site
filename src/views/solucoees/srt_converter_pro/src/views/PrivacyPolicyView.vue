<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div class="flex items-center space-x-4 mb-6">
          <div class="text-5xl" aria-hidden="true">🔒</div>
          <div>
            <h1 class="text-4xl font-bold text-gray-900">
              Política de Privacidade
            </h1>
            <p class="text-gray-600 mt-2">
              Em conformidade com a LGPD (Lei nº 13.709/2018)
            </p>
          </div>
        </div>

        <div
          class="flex items-center space-x-4 text-sm text-gray-600 border-t pt-4"
        >
          <div class="flex items-center space-x-2">
            <span>📅</span>
            <span
              >Última atualização: <strong>{{ lastUpdate }}</strong></span
            >
          </div>
          <div class="flex items-center space-x-2">
            <span>✅</span>
            <span
              >Vigência: <strong>{{ effectiveDate }}</strong></span
            >
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <!-- Introdução -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>📋</span>
            <span>1. Introdução</span>
          </h2>
          <div class="prose prose-purple max-w-none text-gray-700 space-y-4">
            <p>
              Bem-vindo(a) ao <strong>SRT Converter Pro</strong>. Esta Política
              de Privacidade explica como coletamos, usamos, compartilhamos e
              protegemos suas informações pessoais quando você utiliza nosso
              serviço de conversão de roteiros para legendas SRT.
            </p>
            <p>
              Levamos a sério a proteção dos seus dados pessoais e estamos
              comprometidos com a transparência no tratamento das suas
              informações, em total conformidade com a
              <strong
                >Lei Geral de Proteção de Dados (LGPD - Lei nº
                13.709/2018)</strong
              >.
            </p>
            <div class="bg-purple-50 border-l-4 border-purple-600 p-4 rounded">
              <p class="font-semibold text-purple-900">
                🛡️ Compromisso com a LGPD
              </p>
              <p class="text-sm text-purple-800 mt-2">
                Respeitamos todos os seus direitos como titular de dados,
                incluindo acesso, correção, exclusão, portabilidade e revogação
                de consentimento.
              </p>
            </div>
          </div>
        </section>

        <!-- Definições -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>📖</span>
            <span>2. Definições Importantes</span>
          </h2>
          <div class="space-y-3">
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="font-semibold text-gray-900">Dados Pessoais:</p>
              <p class="text-sm text-gray-700">
                Informações relacionadas a pessoa natural identificada ou
                identificável.
              </p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="font-semibold text-gray-900">Titular:</p>
              <p class="text-sm text-gray-700">
                Pessoa natural a quem se referem os dados pessoais que são
                objeto de tratamento.
              </p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="font-semibold text-gray-900">Controlador:</p>
              <p class="text-sm text-gray-700">
                Grupo 3w Online, responsável pelas decisões sobre o tratamento
                de dados pessoais.
              </p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="font-semibold text-gray-900">Tratamento:</p>
              <p class="text-sm text-gray-700">
                Toda operação realizada com dados pessoais (coleta,
                armazenamento, uso, compartilhamento, etc.).
              </p>
            </div>
          </div>
        </section>

        <!-- Dados Coletados -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>📊</span>
            <span>3. Dados Pessoais Coletados</span>
          </h2>
          <div class="prose prose-purple max-w-none text-gray-700 space-y-4">
            <h3 class="text-xl font-semibold text-gray-900">
              3.1. Dados Fornecidos por Você
            </h3>
            <ul class="list-disc list-inside space-y-2">
              <li>
                <strong>Formulário de Contato:</strong> Nome, e-mail e mensagem
              </li>
              <li>
                <strong>Conteúdo do Roteiro:</strong> Texto inserido para
                conversão (não armazenamos permanentemente)
              </li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-900 mt-6">
              3.2. Dados Coletados Automaticamente
            </h3>
            <ul class="list-disc list-inside space-y-2">
              <li>
                <strong>Dados de Navegação:</strong> Endereço IP, tipo de
                navegador, sistema operacional
              </li>
              <li>
                <strong>Cookies:</strong> Preferências de consentimento,
                preferências de tema
              </li>
              <li>
                <strong>Dados de Uso:</strong> Páginas visitadas, tempo de
                permanência, funcionalidades utilizadas
              </li>
              <li>
                <strong>Dados Analíticos:</strong> Google Analytics (com
                consentimento)
              </li>
            </ul>

            <div
              class="bg-green-50 border-l-4 border-green-600 p-4 rounded mt-4"
            >
              <p class="font-semibold text-green-900">
                ✅ Importante: Processamento Local
              </p>
              <p class="text-sm text-green-800 mt-2">
                A conversão de roteiros para SRT é realizada
                <strong>100% localmente no seu navegador</strong>. O conteúdo
                dos seus roteiros
                <strong>NÃO é enviado para nossos servidores</strong> e
                <strong>NÃO é armazenado</strong> permanentemente.
              </p>
            </div>
          </div>
        </section>

        <!-- Finalidade -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>🎯</span>
            <span>4. Finalidade do Tratamento</span>
          </h2>
          <div class="prose prose-purple max-w-none text-gray-700">
            <p>Utilizamos seus dados pessoais para as seguintes finalidades:</p>
            <div class="space-y-3 mt-4">
              <div class="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
                <span class="text-2xl flex-shrink-0">🛠️</span>
                <div>
                  <p class="font-semibold text-gray-900">
                    Prestação do Serviço
                  </p>
                  <p class="text-sm text-gray-700">
                    Fornecer a funcionalidade de conversão de roteiros para
                    legendas SRT.
                  </p>
                </div>
              </div>
              <div class="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
                <span class="text-2xl flex-shrink-0">📧</span>
                <div>
                  <p class="font-semibold text-gray-900">Comunicação</p>
                  <p class="text-sm text-gray-700">
                    Responder a solicitações de contato e fornecer suporte
                    técnico.
                  </p>
                </div>
              </div>
              <div class="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
                <span class="text-2xl flex-shrink-0">📈</span>
                <div>
                  <p class="font-semibold text-gray-900">
                    Melhorias e Análises
                  </p>
                  <p class="text-sm text-gray-700">
                    Analisar o uso do site para melhorar nossos serviços (com
                    seu consentimento).
                  </p>
                </div>
              </div>
              <div class="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
                <span class="text-2xl flex-shrink-0">🔒</span>
                <div>
                  <p class="font-semibold text-gray-900">Segurança</p>
                  <p class="text-sm text-gray-700">
                    Proteger contra fraudes, abusos e atividades ilegais.
                  </p>
                </div>
              </div>
              <div class="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
                <span class="text-2xl flex-shrink-0">⚖️</span>
                <div>
                  <p class="font-semibold text-gray-900">Cumprimento Legal</p>
                  <p class="text-sm text-gray-700">
                    Cumprir obrigações legais e regulatórias aplicáveis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Base Legal -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>⚖️</span>
            <span>5. Base Legal para o Tratamento</span>
          </h2>
          <div class="prose prose-purple max-w-none text-gray-700 space-y-4">
            <p>
              Tratamos seus dados pessoais com base nas seguintes bases legais
              previstas na LGPD:
            </p>
            <ul class="list-disc list-inside space-y-2">
              <li>
                <strong>Consentimento:</strong> Para cookies analíticos e de
                marketing
              </li>
              <li>
                <strong>Execução de contrato:</strong> Para prestação do serviço
                de conversão
              </li>
              <li>
                <strong>Legítimo interesse:</strong> Para melhorias do serviço e
                segurança
              </li>
              <li>
                <strong>Cumprimento de obrigação legal:</strong> Quando exigido
                por lei
              </li>
            </ul>
          </div>
        </section>

        <!-- Compartilhamento -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>🤝</span>
            <span>6. Compartilhamento de Dados</span>
          </h2>
          <div class="prose prose-purple max-w-none text-gray-700 space-y-4">
            <p>Podemos compartilhar seus dados com:</p>
            <ul class="list-disc list-inside space-y-2">
              <li>
                <strong>Prestadores de Serviços:</strong> Google Analytics (com
                consentimento), serviços de hospedagem
              </li>
              <li>
                <strong>Autoridades:</strong> Quando exigido por lei ou ordem
                judicial
              </li>
              <li>
                <strong>Sucessores:</strong> Em caso de fusão, aquisição ou
                venda de ativos
              </li>
            </ul>
            <div class="bg-red-50 border-l-4 border-red-600 p-4 rounded mt-4">
              <p class="font-semibold text-red-900">🚫 Nunca Compartilhamos:</p>
              <p class="text-sm text-red-800 mt-2">
                Não vendemos, alugamos ou compartilhamos seus dados pessoais com
                terceiros para fins de marketing sem seu consentimento
                explícito.
              </p>
            </div>
          </div>
        </section>

        <!-- Armazenamento -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>💾</span>
            <span>7. Armazenamento e Retenção</span>
          </h2>
          <div class="prose prose-purple max-w-none text-gray-700 space-y-4">
            <p>
              Armazenamos seus dados pessoais pelo período necessário para
              cumprir as finalidades descritas:
            </p>
            <ul class="list-disc list-inside space-y-2">
              <li>
                <strong>Dados de Contato:</strong> Por até 2 anos após o último
                contato
              </li>
              <li><strong>Dados de Navegação:</strong> Por até 12 meses</li>
              <li>
                <strong>Preferências de Consentimento:</strong> Até você revogar
                ou por 2 anos
              </li>
              <li>
                <strong>Conteúdo dos Roteiros:</strong> Não armazenado
                (processamento local)
              </li>
            </ul>
            <p class="mt-4">
              Após o período de retenção, os dados serão excluídos ou
              anonimizados de forma segura.
            </p>
          </div>
        </section>

        <!-- Segurança -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>🔐</span>
            <span>8. Segurança dos Dados</span>
          </h2>
          <div class="prose prose-purple max-w-none text-gray-700 space-y-4">
            <p>
              Implementamos medidas de segurança técnicas e organizacionais
              adequadas:
            </p>
            <ul class="list-disc list-inside space-y-2">
              <li>Criptografia SSL/TLS em todas as comunicações</li>
              <li>
                Processamento local no navegador (não enviamos roteiros para
                servidores)
              </li>
              <li>Controles de acesso rigorosos</li>
              <li>Monitoramento contínuo de segurança</li>
              <li>Backups regulares e seguros</li>
              <li>Treinamento de equipe em proteção de dados</li>
            </ul>
          </div>
        </section>

        <!-- Direitos do Titular -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>👤</span>
            <span>9. Seus Direitos (LGPD)</span>
          </h2>
          <div class="prose prose-purple max-w-none text-gray-700 space-y-4">
            <p>
              Como titular de dados, você tem os seguintes direitos garantidos
              pela LGPD:
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div class="bg-purple-50 p-4 rounded-lg">
                <p class="font-semibold text-purple-900">
                  ✅ Confirmação e Acesso
                </p>
                <p class="text-sm text-purple-800 mt-1">
                  Confirmar a existência de tratamento e acessar seus dados
                </p>
              </div>
              <div class="bg-purple-50 p-4 rounded-lg">
                <p class="font-semibold text-purple-900">✏️ Correção</p>
                <p class="text-sm text-purple-800 mt-1">
                  Solicitar correção de dados incompletos ou desatualizados
                </p>
              </div>
              <div class="bg-purple-50 p-4 rounded-lg">
                <p class="font-semibold text-purple-900">🗑️ Exclusão</p>
                <p class="text-sm text-purple-800 mt-1">
                  Solicitar a eliminação dos seus dados pessoais
                </p>
              </div>
              <div class="bg-purple-50 p-4 rounded-lg">
                <p class="font-semibold text-purple-900">📦 Portabilidade</p>
                <p class="text-sm text-purple-800 mt-1">
                  Solicitar a portabilidade dos dados para outro fornecedor
                </p>
              </div>
              <div class="bg-purple-50 p-4 rounded-lg">
                <p class="font-semibold text-purple-900">🚫 Revogação</p>
                <p class="text-sm text-purple-800 mt-1">
                  Revogar o consentimento a qualquer momento
                </p>
              </div>
              <div class="bg-purple-50 p-4 rounded-lg">
                <p class="font-semibold text-purple-900">ℹ️ Informação</p>
                <p class="text-sm text-purple-800 mt-1">
                  Obter informações sobre compartilhamento de dados
                </p>
              </div>
            </div>
            <div class="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mt-6">
              <p class="font-semibold text-blue-900">
                📧 Como Exercer Seus Direitos:
              </p>
              <p class="text-sm text-blue-800 mt-2">
                Para exercer qualquer um desses direitos, entre em contato
                conosco através do
                <router-link to="/contato" class="underline font-semibold"
                  >formulário de contato</router-link
                >
                ou envie um e-mail para:
                <strong>privacidade@3wonline.com.br</strong>
              </p>
              <p class="text-sm text-blue-800 mt-2">
                Responderemos à sua solicitação em até <strong>15 dias</strong>,
                conforme previsto na LGPD.
              </p>
            </div>
          </div>
        </section>

        <!-- Cookies -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>🍪</span>
            <span>10. Política de Cookies</span>
          </h2>
          <div class="prose prose-purple max-w-none text-gray-700 space-y-4">
            <p>Utilizamos cookies e tecnologias semelhantes:</p>
            <div class="space-y-3 mt-4">
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="font-semibold text-gray-900">
                  Cookies Necessários (Sempre Ativos)
                </p>
                <p class="text-sm text-gray-700 mt-1">
                  Essenciais para o funcionamento do site. Armazenam
                  preferências de tema e consentimento.
                </p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="font-semibold text-gray-900">
                  Cookies Analíticos (Opcional)
                </p>
                <p class="text-sm text-gray-700 mt-1">
                  Google Analytics para entender como os usuários interagem com
                  o site.
                </p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="font-semibold text-gray-900">
                  Cookies de Marketing (Opcional)
                </p>
                <p class="text-sm text-gray-700 mt-1">
                  Usados para exibir anúncios relevantes (quando aplicável).
                </p>
              </div>
            </div>
            <p class="mt-4">
              Você pode gerenciar suas preferências de cookies a qualquer
              momento através do banner de consentimento ou das configurações do
              seu navegador.
            </p>
          </div>
        </section>

        <!-- Transferência Internacional -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>🌍</span>
            <span>11. Transferência Internacional de Dados</span>
          </h2>
          <div class="prose prose-purple max-w-none text-gray-700 space-y-4">
            <p>
              Alguns de nossos prestadores de serviços (como Google Analytics)
              podem estar localizados fora do Brasil. Quando isso ocorre,
              garantimos que:
            </p>
            <ul class="list-disc list-inside space-y-2">
              <li>A transferência está em conformidade com a LGPD</li>
              <li>
                O país de destino oferece nível adequado de proteção de dados
              </li>
              <li>
                Existem cláusulas contratuais padrão ou outras salvaguardas
                apropriadas
              </li>
            </ul>
          </div>
        </section>

        <!-- Menores de Idade -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>👶</span>
            <span>12. Dados de Menores de Idade</span>
          </h2>
          <div class="prose prose-purple max-w-none text-gray-700 space-y-4">
            <p>
              Nosso serviço não é direcionado a menores de 18 anos. Não
              coletamos intencionalmente dados pessoais de crianças ou
              adolescentes sem o consentimento dos pais ou responsáveis legais.
            </p>
            <p>
              Se você acredita que coletamos inadvertidamente dados de um menor,
              entre em contato imediatamente para que possamos tomar as medidas
              apropriadas.
            </p>
          </div>
        </section>

        <!-- Alterações -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>🔄</span>
            <span>13. Alterações nesta Política</span>
          </h2>
          <div class="prose prose-purple max-w-none text-gray-700 space-y-4">
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente para
              refletir mudanças em nossas práticas ou por outros motivos
              operacionais, legais ou regulatórios.
            </p>
            <p>
              Quando fizermos alterações significativas, notificaremos você
              através de um aviso destacado no site ou por e-mail (se
              fornecido). A data da "Última atualização" no topo desta página
              indica quando a política foi revisada pela última vez.
            </p>
          </div>
        </section>

        <!-- Encarregado DPO -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>👔</span>
            <span>14. Encarregado de Proteção de Dados (DPO)</span>
          </h2>
          <div class="prose prose-purple max-w-none text-gray-700 space-y-4">
            <div
              class="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200"
            >
              <p class="font-semibold text-gray-900 text-lg mb-3">
                📧 Entre em Contato com Nosso DPO:
              </p>
              <div class="space-y-2 text-gray-700">
                <p>
                  <strong>Nome:</strong> Grupo 3w Online - Departamento de
                  Privacidade
                </p>
                <p>
                  <strong>E-mail:</strong>
                  <a
                    href="mailto:privacidade@3wonline.com.br"
                    class="text-purple-600 hover:text-purple-700 underline"
                    >privacidade@3wonline.com.br</a
                  >
                </p>
                <p><strong>Endereço:</strong> [Endereço da empresa]</p>
              </div>
              <p class="mt-4 text-sm text-gray-600">
                Nosso DPO está disponível para esclarecer dúvidas, receber
                solicitações e tratar de qualquer questão relacionada ao
                tratamento de dados pessoais.
              </p>
            </div>
          </div>
        </section>

        <!-- Autoridade Nacional -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>🏛️</span>
            <span>15. Autoridade Nacional de Proteção de Dados (ANPD)</span>
          </h2>
          <div class="prose prose-purple max-w-none text-gray-700 space-y-4">
            <p>
              Você tem o direito de apresentar uma reclamação à Autoridade
              Nacional de Proteção de Dados (ANPD) se acreditar que o tratamento
              de seus dados pessoais viola a LGPD.
            </p>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="font-semibold text-gray-900">Contato da ANPD:</p>
              <p class="text-sm text-gray-700 mt-2">
                <strong>Website:</strong>
                <a
                  href="https://www.gov.br/anpd"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-purple-600 hover:text-purple-700 underline"
                  >www.gov.br/anpd</a
                >
              </p>
              <p class="text-sm text-gray-700">
                <strong>E-mail:</strong>
                <a
                  href="mailto:atendimento@anpd.gov.br"
                  class="text-purple-600 hover:text-purple-700 underline"
                  >atendimento@anpd.gov.br</a
                >
              </p>
            </div>
          </div>
        </section>

        <!-- Contato -->
        <section
          class="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white"
        >
          <h2 class="text-2xl font-bold mb-4 flex items-center space-x-2">
            <span>📞</span>
            <span>16. Entre em Contato</span>
          </h2>
          <p class="mb-6">
            Se você tiver dúvidas, preocupações ou solicitações relacionadas a
            esta Política de Privacidade ou ao tratamento de seus dados
            pessoais, entre em contato conosco:
          </p>
          <div class="space-y-3 bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <p><strong>Controlador:</strong> Grupo 3w Online</p>
            <p>
              <strong>E-mail:</strong>
              <a
                href="mailto:privacidade@3wonline.com.br"
                class="underline hover:text-purple-200"
                >privacidade@3wonline.com.br</a
              >
            </p>
            <p>
              <strong>Website:</strong>
              <a
                href="https://www.3wonline.com.br"
                target="_blank"
                rel="noopener noreferrer"
                class="underline hover:text-purple-200"
                >www.3wonline.com.br</a
              >
            </p>
          </div>
          <div class="mt-6 text-center">
            <router-link
              to="/contato"
              class="inline-block bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
            >
              📧 Ir para o Formulário de Contato
            </router-link>
          </div>
        </section>
      </div>

      <!-- Back to Home -->
      <div class="mt-8 text-center">
        <router-link
          to="/"
          class="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
        >
          <span>←</span>
          <span>Voltar para a página inicial</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const lastUpdate = computed(() => {
  return new Date("2025-10-10").toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const effectiveDate = computed(() => {
  return new Date("2025-10-10").toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
</script>
