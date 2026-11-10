<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div class="flex items-center space-x-4 mb-6">
          <div class="text-5xl" aria-hidden="true">📜</div>
          <div>
            <h1 class="text-4xl font-bold text-gray-900">Termos de Uso</h1>
            <p class="text-gray-600 mt-2">
              Condições gerais de uso do SRT Converter Pro
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
            <span>1. Aceitação dos Termos</span>
          </h2>
          <div class="prose prose-blue max-w-none text-gray-700 space-y-4">
            <p>
              Bem-vindo(a) ao <strong>SRT Converter Pro</strong>, um serviço
              gratuito de conversão de roteiros para legendas SRT, oferecido
              pelo <strong>Grupo 3w Online</strong>.
            </p>
            <p>
              Ao acessar e utilizar este site e seus serviços, você concorda em
              cumprir e estar vinculado(a) a estes Termos de Uso. Se você não
              concordar com qualquer parte destes termos, não utilize nosso
              serviço.
            </p>
            <div class="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
              <p class="font-semibold text-blue-900">⚠️ Importante</p>
              <p class="text-sm text-blue-800 mt-2">
                Estes termos constituem um acordo legal entre você (usuário) e o
                Grupo 3w Online. Leia atentamente antes de utilizar nossos
                serviços.
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
            <span>2. Definições</span>
          </h2>
          <div class="space-y-3">
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="font-semibold text-gray-900">Serviço:</p>
              <p class="text-sm text-gray-700">
                Ferramenta online gratuita para conversão de roteiros em
                legendas no formato SRT.
              </p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="font-semibold text-gray-900">Usuário:</p>
              <p class="text-sm text-gray-700">
                Qualquer pessoa que acesse e utilize o SRT Converter Pro.
              </p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="font-semibold text-gray-900">Conteúdo do Usuário:</p>
              <p class="text-sm text-gray-700">
                Textos, roteiros e qualquer material fornecido pelo usuário para
                conversão.
              </p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="font-semibold text-gray-900">Plataforma:</p>
              <p class="text-sm text-gray-700">
                O website SRT Converter Pro e todas as suas funcionalidades.
              </p>
            </div>
          </div>
        </section>

        <!-- Descrição do Serviço -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>🛠️</span>
            <span>3. Descrição do Serviço</span>
          </h2>
          <div class="prose prose-blue max-w-none text-gray-700 space-y-4">
            <p>O SRT Converter Pro oferece:</p>
            <ul class="list-disc list-inside space-y-2">
              <li>
                <strong>Conversão Gratuita:</strong> Transformação de roteiros
                em legendas formato SRT
              </li>
              <li>
                <strong>Processamento Local:</strong> Conversão realizada 100%
                no navegador do usuário
              </li>
              <li>
                <strong>Download Instantâneo:</strong> Geração e download
                imediato do arquivo SRT
              </li>
              <li>
                <strong>Sem Registro:</strong> Não é necessário criar conta ou
                fazer login
              </li>
              <li>
                <strong>Sem Limites:</strong> Conversões ilimitadas e gratuitas
              </li>
            </ul>
            <div
              class="bg-green-50 border-l-4 border-green-600 p-4 rounded mt-4"
            >
              <p class="font-semibold text-green-900">
                ✅ Processamento 100% Local
              </p>
              <p class="text-sm text-green-800 mt-2">
                Seu conteúdo é processado localmente no seu navegador. Não
                enviamos, armazenamos ou temos acesso ao conteúdo dos seus
                roteiros.
              </p>
            </div>
          </div>
        </section>

        <!-- Uso Aceitável -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>✅</span>
            <span>4. Uso Aceitável</span>
          </h2>
          <div class="prose prose-blue max-w-none text-gray-700 space-y-4">
            <p>Ao utilizar nosso serviço, você concorda em:</p>
            <ul class="list-disc list-inside space-y-2">
              <li>Usar o serviço apenas para fins legais e legítimos</li>
              <li>
                Não violar direitos de propriedade intelectual de terceiros
              </li>
              <li>
                Não utilizar o serviço para criar conteúdo ilegal, ofensivo ou
                prejudicial
              </li>
              <li>
                Não tentar comprometer a segurança ou integridade da plataforma
              </li>
              <li>
                Não usar o serviço para distribuir vírus, malware ou código
                malicioso
              </li>
              <li>
                Não realizar engenharia reversa, descompilar ou desmontar o
                serviço
              </li>
              <li>
                Não utilizar bots, scripts ou ferramentas automatizadas de forma
                abusiva
              </li>
            </ul>
          </div>
        </section>

        <!-- Uso Proibido -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>🚫</span>
            <span>5. Uso Proibido</span>
          </h2>
          <div class="prose prose-blue max-w-none text-gray-700 space-y-4">
            <p>É expressamente proibido utilizar o serviço para:</p>
            <div class="space-y-3 mt-4">
              <div
                class="flex items-start space-x-3 bg-red-50 p-4 rounded-lg border border-red-200"
              >
                <span class="text-2xl flex-shrink-0">⛔</span>
                <div>
                  <p class="font-semibold text-red-900">Conteúdo Ilegal</p>
                  <p class="text-sm text-red-800">
                    Criar legendas para conteúdo que viole leis brasileiras ou
                    internacionais.
                  </p>
                </div>
              </div>
              <div
                class="flex items-start space-x-3 bg-red-50 p-4 rounded-lg border border-red-200"
              >
                <span class="text-2xl flex-shrink-0">🔞</span>
                <div>
                  <p class="font-semibold text-red-900">Conteúdo Ofensivo</p>
                  <p class="text-sm text-red-800">
                    Material que promova ódio, discriminação, violência ou
                    pornografia infantil.
                  </p>
                </div>
              </div>
              <div
                class="flex items-start space-x-3 bg-red-50 p-4 rounded-lg border border-red-200"
              >
                <span class="text-2xl flex-shrink-0">🏴‍☠️</span>
                <div>
                  <p class="font-semibold text-red-900">Pirataria</p>
                  <p class="text-sm text-red-800">
                    Facilitar ou promover a distribuição de conteúdo protegido
                    por direitos autorais.
                  </p>
                </div>
              </div>
              <div
                class="flex items-start space-x-3 bg-red-50 p-4 rounded-lg border border-red-200"
              >
                <span class="text-2xl flex-shrink-0">💻</span>
                <div>
                  <p class="font-semibold text-red-900">Ataques Cibernéticos</p>
                  <p class="text-sm text-red-800">
                    Tentar hackear, sobrecarregar ou comprometer a segurança da
                    plataforma.
                  </p>
                </div>
              </div>
              <div
                class="flex items-start space-x-3 bg-red-50 p-4 rounded-lg border border-red-200"
              >
                <span class="text-2xl flex-shrink-0">📧</span>
                <div>
                  <p class="font-semibold text-red-900">Spam</p>
                  <p class="text-sm text-red-800">
                    Enviar comunicações não solicitadas ou usar o serviço para
                    phishing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Propriedade Intelectual -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>©️</span>
            <span>6. Propriedade Intelectual</span>
          </h2>
          <div class="prose prose-blue max-w-none text-gray-700 space-y-4">
            <h3 class="text-xl font-semibold text-gray-900">
              6.1. Direitos do Grupo 3w Online
            </h3>
            <p>
              Todo o conteúdo da plataforma (código, design, textos, logotipos,
              gráficos) é de propriedade exclusiva do Grupo 3w Online e está
              protegido por leis de direitos autorais e propriedade intelectual.
            </p>

            <h3 class="text-xl font-semibold text-gray-900 mt-6">
              6.2. Direitos do Usuário
            </h3>
            <p>
              Você mantém todos os direitos sobre o conteúdo que fornece ao
              serviço (roteiros). Não reivindicamos propriedade sobre seu
              conteúdo.
            </p>

            <h3 class="text-xl font-semibold text-gray-900 mt-6">
              6.3. Licença de Uso
            </h3>
            <p>
              Concedemos a você uma licença limitada, não exclusiva,
              intransferível e revogável para usar o serviço de acordo com estes
              Termos.
            </p>
          </div>
        </section>

        <!-- Conteúdo do Usuário -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>📝</span>
            <span>7. Conteúdo do Usuário</span>
          </h2>
          <div class="prose prose-blue max-w-none text-gray-700 space-y-4">
            <h3 class="text-xl font-semibold text-gray-900">
              7.1. Responsabilidade pelo Conteúdo
            </h3>
            <p>
              Você é o único responsável pelo conteúdo que fornece ao serviço.
              Garantimos que:
            </p>
            <ul class="list-disc list-inside space-y-2">
              <li>Não armazenamos o conteúdo dos seus roteiros</li>
              <li>O processamento é realizado localmente no seu navegador</li>
              <li>Não temos acesso ao conteúdo dos seus arquivos</li>
              <li>Não monitoramos ou revisamos o conteúdo fornecido</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-900 mt-6">
              7.2. Garantias do Usuário
            </h3>
            <p>Ao usar o serviço, você garante que:</p>
            <ul class="list-disc list-inside space-y-2">
              <li>
                Possui todos os direitos necessários sobre o conteúdo fornecido
              </li>
              <li>O conteúdo não viola direitos de terceiros</li>
              <li>O conteúdo é legal e não viola nenhuma lei aplicável</li>
              <li>O conteúdo não contém vírus, malware ou código malicioso</li>
            </ul>
          </div>
        </section>

        <!-- Gratuidade -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>💰</span>
            <span>8. Gratuidade do Serviço</span>
          </h2>
          <div class="prose prose-blue max-w-none text-gray-700 space-y-4">
            <p>
              O SRT Converter Pro é um serviço <strong>100% gratuito</strong>.
              Não cobramos taxas, assinaturas ou qualquer tipo de pagamento pelo
              uso do serviço.
            </p>
            <p>
              Reservamos o direito de introduzir recursos pagos no futuro, mas o
              serviço básico de conversão permanecerá gratuito.
            </p>
            <div class="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
              <p class="font-semibold text-blue-900">🎁 Sempre Gratuito</p>
              <p class="text-sm text-blue-800 mt-2">
                Nossa missão é oferecer ferramentas de qualidade acessíveis a
                todos os criadores de conteúdo.
              </p>
            </div>
          </div>
        </section>

        <!-- Limitação de Responsabilidade -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>⚖️</span>
            <span>9. Limitação de Responsabilidade</span>
          </h2>
          <div class="prose prose-blue max-w-none text-gray-700 space-y-4">
            <p>
              O serviço é fornecido "como está" e "conforme disponível". Não
              garantimos que:
            </p>
            <ul class="list-disc list-inside space-y-2">
              <li>O serviço estará sempre disponível ou livre de erros</li>
              <li>O serviço atenderá às suas expectativas específicas</li>
              <li>Os resultados da conversão serão perfeitos ou sem falhas</li>
              <li>Não haverá interrupções ou problemas técnicos</li>
            </ul>
            <div
              class="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded mt-4"
            >
              <p class="font-semibold text-yellow-900">
                ⚠️ Isenção de Responsabilidade
              </p>
              <p class="text-sm text-yellow-800 mt-2">
                O Grupo 3w Online não se responsabiliza por quaisquer danos
                diretos, indiretos, incidentais, especiais, consequenciais ou
                punitivos resultantes do uso ou impossibilidade de uso do
                serviço.
              </p>
            </div>
          </div>
        </section>

        <!-- Garantias -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>🔧</span>
            <span>10. Garantias e Isenções</span>
          </h2>
          <div class="prose prose-blue max-w-none text-gray-700 space-y-4">
            <h3 class="text-xl font-semibold text-gray-900">
              10.1. Sem Garantias Expressas
            </h3>
            <p>
              Não oferecemos garantias expressas ou implícitas sobre a precisão,
              confiabilidade, disponibilidade ou adequação do serviço para
              qualquer finalidade específica.
            </p>

            <h3 class="text-xl font-semibold text-gray-900 mt-6">
              10.2. Responsabilidade do Usuário
            </h3>
            <p>
              É sua responsabilidade revisar e validar os arquivos SRT gerados
              antes de utilizá-los. Recomendamos sempre testar as legendas em
              seu projeto.
            </p>
          </div>
        </section>

        <!-- Disponibilidade -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>⏱️</span>
            <span>11. Disponibilidade e Manutenção</span>
          </h2>
          <div class="prose prose-blue max-w-none text-gray-700 space-y-4">
            <p>
              Faremos nossos melhores esforços para manter o serviço disponível
              24/7, mas reservamos o direito de:
            </p>
            <ul class="list-disc list-inside space-y-2">
              <li>Realizar manutenções programadas ou emergenciais</li>
              <li>Suspender temporariamente o serviço por razões técnicas</li>
              <li>Modificar ou descontinuar recursos sem aviso prévio</li>
              <li>Limitar o uso em caso de abuso ou sobrecarga do sistema</li>
            </ul>
          </div>
        </section>

        <!-- Indenização -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>🛡️</span>
            <span>12. Indenização</span>
          </h2>
          <div class="prose prose-blue max-w-none text-gray-700 space-y-4">
            <p>
              Você concorda em indenizar, defender e isentar o Grupo 3w Online,
              seus diretores, funcionários e parceiros de quaisquer
              reivindicações, danos, obrigações, perdas, responsabilidades,
              custos ou dívidas resultantes de:
            </p>
            <ul class="list-disc list-inside space-y-2">
              <li>Violação destes Termos de Uso</li>
              <li>
                Violação de direitos de terceiros, incluindo direitos de
                propriedade intelectual
              </li>
              <li>Uso inadequado ou ilegal do serviço</li>
              <li>Conteúdo fornecido por você que viole leis aplicáveis</li>
            </ul>
          </div>
        </section>

        <!-- Links Externos -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>🔗</span>
            <span>13. Links para Sites de Terceiros</span>
          </h2>
          <div class="prose prose-blue max-w-none text-gray-700 space-y-4">
            <p>
              Nosso site pode conter links para sites de terceiros. Não
              controlamos, endossamos ou assumimos responsabilidade pelo
              conteúdo, políticas de privacidade ou práticas desses sites.
            </p>
            <p>
              Recomendamos que você leia os termos e políticas de privacidade de
              qualquer site de terceiro que visitar.
            </p>
          </div>
        </section>

        <!-- Modificações -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>🔄</span>
            <span>14. Modificações dos Termos</span>
          </h2>
          <div class="prose prose-blue max-w-none text-gray-700 space-y-4">
            <p>
              Reservamos o direito de modificar estes Termos de Uso a qualquer
              momento. Quando fizermos alterações significativas:
            </p>
            <ul class="list-disc list-inside space-y-2">
              <li>
                Atualizaremos a data de "Última atualização" no topo desta
                página
              </li>
              <li>Publicaremos um aviso destacado no site</li>
              <li>
                Notificaremos por e-mail (se aplicável) sobre mudanças
                importantes
              </li>
            </ul>
            <p class="mt-4">
              O uso continuado do serviço após a publicação de alterações
              constitui sua aceitação dos novos termos.
            </p>
          </div>
        </section>

        <!-- Rescisão -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>❌</span>
            <span>15. Rescisão e Suspensão</span>
          </h2>
          <div class="prose prose-blue max-w-none text-gray-700 space-y-4">
            <p>
              Podemos suspender ou encerrar seu acesso ao serviço imediatamente,
              sem aviso prévio, se acreditarmos que você:
            </p>
            <ul class="list-disc list-inside space-y-2">
              <li>Violou estes Termos de Uso</li>
              <li>Usou o serviço de forma ilegal ou prejudicial</li>
              <li>Representou um risco de segurança para a plataforma</li>
              <li>Causou danos ao serviço ou a outros usuários</li>
            </ul>
            <p class="mt-4">
              Você pode parar de usar o serviço a qualquer momento, sem
              necessidade de notificação.
            </p>
          </div>
        </section>

        <!-- Lei Aplicável -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>🏛️</span>
            <span>16. Lei Aplicável e Jurisdição</span>
          </h2>
          <div class="prose prose-blue max-w-none text-gray-700 space-y-4">
            <p>
              Estes Termos de Uso são regidos e interpretados de acordo com as
              leis da
              <strong>República Federativa do Brasil</strong>, sem considerar
              conflitos de leis.
            </p>
            <p>
              Quaisquer disputas decorrentes destes termos serão submetidas à
              jurisdição exclusiva dos tribunais brasileiros competentes.
            </p>
          </div>
        </section>

        <!-- Diversos -->
        <section>
          <h2
            class="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-2"
          >
            <span>📌</span>
            <span>17. Disposições Gerais</span>
          </h2>
          <div class="prose prose-blue max-w-none text-gray-700 space-y-4">
            <h3 class="text-xl font-semibold text-gray-900">
              17.1. Acordo Integral
            </h3>
            <p>
              Estes Termos constituem o acordo integral entre você e o Grupo 3w
              Online em relação ao uso do serviço.
            </p>

            <h3 class="text-xl font-semibold text-gray-900 mt-4">
              17.2. Renúncia
            </h3>
            <p>
              A não aplicação de qualquer disposição destes Termos não
              constituirá renúncia a essa ou qualquer outra disposição.
            </p>

            <h3 class="text-xl font-semibold text-gray-900 mt-4">
              17.3. Divisibilidade
            </h3>
            <p>
              Se qualquer disposição destes Termos for considerada inválida, as
              demais disposições permanecerão em pleno vigor.
            </p>

            <h3 class="text-xl font-semibold text-gray-900 mt-4">
              17.4. Cessão
            </h3>
            <p>
              Você não pode transferir ou ceder seus direitos sob estes Termos
              sem nosso consentimento prévio.
            </p>
          </div>
        </section>

        <!-- Contato -->
        <section
          class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white"
        >
          <h2 class="text-2xl font-bold mb-4 flex items-center space-x-2">
            <span>📞</span>
            <span>18. Entre em Contato</span>
          </h2>
          <p class="mb-6">
            Se você tiver dúvidas, preocupações ou comentários sobre estes
            Termos de Uso, entre em contato conosco:
          </p>
          <div class="space-y-3 bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <p><strong>Empresa:</strong> Grupo 3w Online</p>
            <p>
              <strong>E-mail:</strong>
              <a
                href="mailto:contato@3wonline.com.br"
                class="underline hover:text-blue-200"
                >contato@3wonline.com.br</a
              >
            </p>
            <p>
              <strong>Website:</strong>
              <a
                href="https://www.3wonline.com.br"
                target="_blank"
                rel="noopener noreferrer"
                class="underline hover:text-blue-200"
                >www.3wonline.com.br</a
              >
            </p>
          </div>
          <div class="mt-6 text-center">
            <router-link
              to="/contato"
              class="inline-block bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
            >
              📧 Ir para o Formulário de Contato
            </router-link>
          </div>
        </section>

        <!-- Aceitação -->
        <section class="border-t-4 border-blue-600 pt-6">
          <div class="bg-blue-50 p-6 rounded-lg">
            <p class="text-lg font-semibold text-blue-900 mb-3">
              ✅ Aceitação dos Termos
            </p>
            <p class="text-gray-700">
              AO UTILIZAR O SRT CONVERTER PRO, VOCÊ RECONHECE QUE LEU,
              COMPREENDEU E CONCORDA EM ESTAR VINCULADO(A) A ESTES TERMOS DE USO
              E À NOSSA
              <router-link
                to="/privacidade"
                class="text-blue-600 hover:text-blue-700 underline font-semibold"
              >
                Política de Privacidade </router-link
              >.
            </p>
          </div>
        </section>
      </div>

      <!-- Back to Home -->
      <div class="mt-8 text-center">
        <router-link
          to="/"
          class="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
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
