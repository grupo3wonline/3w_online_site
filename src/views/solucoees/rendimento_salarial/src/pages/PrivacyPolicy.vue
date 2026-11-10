<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <router-link
          to="/"
          class="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mb-4"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Voltar
        </router-link>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Política de Privacidade
        </h1>
        <p class="text-gray-600 dark:text-gray-300">
          Última atualização: {{ lastUpdate }}
        </p>
      </div>

      <!-- Content -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-8"
      >
        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            1. Introdução
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Esta Política de Privacidade descreve como a
            <strong>Calculadora de Rendimento Salarial</strong>
            ("nós", "nosso" ou "nossa") coleta, usa, armazena e protege suas
            informações pessoais. Estamos comprometidos em proteger sua
            privacidade e em estar em conformidade com a Lei Geral de Proteção
            de Dados (LGPD - Lei nº 13.709/2018) e demais legislações
            aplicáveis.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            2. Dados Coletados
          </h2>
          <div class="space-y-4">
            <div>
              <h3
                class="text-xl font-medium text-gray-900 dark:text-white mb-2"
              >
                2.1 Dados Fornecidos por Você
              </h3>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                Coletamos as seguintes informações quando você utiliza nossa
                calculadora:
              </p>
              <ul
                class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 ml-4"
              >
                <li>Valores salariais informados para cálculo</li>
                <li>
                  Informações de contato (quando você entra em contato conosco)
                </li>
                <li>Preferências de uso (tema, idioma)</li>
              </ul>
            </div>

            <div>
              <h3
                class="text-xl font-medium text-gray-900 dark:text-white mb-2"
              >
                2.2 Dados Coletados Automaticamente
              </h3>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                Podemos coletar automaticamente:
              </p>
              <ul
                class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 ml-4"
              >
                <li>
                  Informações de navegação (páginas visitadas, tempo de
                  permanência)
                </li>
                <li>Endereço IP e informações do dispositivo</li>
                <li>Tipo de navegador e sistema operacional</li>
                <li>Cookies e tecnologias similares</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            3. Como Usamos Seus Dados
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
            Utilizamos seus dados para:
          </p>
          <ul
            class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 ml-4"
          >
            <li>Fornecer e manter nosso serviço de calculadora</li>
            <li>Processar os cálculos solicitados</li>
            <li>Melhorar a experiência do usuário</li>
            <li>Responder a dúvidas e solicitações</li>
            <li>Enviar atualizações importantes sobre o serviço</li>
            <li>Realizar análises estatísticas e de uso</li>
            <li>Cumprir obrigações legais e regulatórias</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            4. Base Legal para Processamento
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Processamos seus dados pessoais com base nas seguintes bases legais
            previstas na LGPD:
          </p>
          <ul
            class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 ml-4 mt-2"
          >
            <li>
              <strong>Consentimento:</strong> quando você concorda com o
              processamento de seus dados
            </li>
            <li>
              <strong>Execução de contrato:</strong> para fornecer o serviço
              solicitado
            </li>
            <li>
              <strong>Legítimo interesse:</strong> para melhorar nossos serviços
              e segurança
            </li>
            <li>
              <strong>Cumprimento de obrigação legal:</strong> quando exigido
              por lei
            </li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            5. Compartilhamento de Dados
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
            Não vendemos seus dados pessoais. Podemos compartilhar suas
            informações apenas nas seguintes situações:
          </p>
          <ul
            class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 ml-4"
          >
            <li>
              Com prestadores de serviços que nos auxiliam (hospedagem,
              analytics)
            </li>
            <li>Quando exigido por lei ou ordem judicial</li>
            <li>Para proteger nossos direitos e propriedade</li>
            <li>Com seu consentimento explícito</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            6. Cookies e Tecnologias Similares
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
            Utilizamos diferentes tipos de cookies:
          </p>
          <div class="space-y-3 mt-3">
            <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h4 class="font-medium text-gray-900 dark:text-white mb-1">
                Cookies Necessários
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Essenciais para o funcionamento básico do site. Não podem ser
                desabilitados.
              </p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h4 class="font-medium text-gray-900 dark:text-white mb-1">
                Cookies de Análise
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Nos ajudam a entender como você usa o site para melhorar a
                experiência.
              </p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h4 class="font-medium text-gray-900 dark:text-white mb-1">
                Cookies de Marketing
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Usados para exibir anúncios relevantes e medir a eficácia de
                campanhas.
              </p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h4 class="font-medium text-gray-900 dark:text-white mb-1">
                Cookies de Preferências
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                Guardam suas preferências pessoais, como idioma e tema.
              </p>
            </div>
          </div>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
            Você pode gerenciar suas preferências de cookies através do banner
            que aparece em sua primeira visita ou através das configurações do
            seu navegador.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            7. Seus Direitos (LGPD)
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
            De acordo com a LGPD, você tem os seguintes direitos:
          </p>
          <ul
            class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 ml-4"
          >
            <li>
              <strong>Confirmação:</strong> saber se processamos seus dados
            </li>
            <li><strong>Acesso:</strong> solicitar cópia dos seus dados</li>
            <li>
              <strong>Correção:</strong> corrigir dados incompletos ou
              desatualizados
            </li>
            <li>
              <strong>Anonimização, bloqueio ou eliminação:</strong> de dados
              desnecessários
            </li>
            <li>
              <strong>Portabilidade:</strong> receber seus dados em formato
              estruturado
            </li>
            <li>
              <strong>Eliminação:</strong> dos dados tratados com base no
              consentimento
            </li>
            <li>
              <strong>Informação:</strong> sobre compartilhamento de dados
            </li>
            <li>
              <strong>Revogação do consentimento:</strong> a qualquer momento
            </li>
            <li><strong>Oposição:</strong> ao tratamento de dados</li>
          </ul>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
            Para exercer qualquer um desses direitos, entre em contato conosco
            através do e-mail:
            <a
              href="mailto:contato@3wsys.com"
              class="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              contato@3wsys.com
            </a>
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            8. Segurança dos Dados
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Implementamos medidas técnicas e organizacionais apropriadas para
            proteger seus dados pessoais contra acesso não autorizado,
            alteração, divulgação ou destruição. No entanto, nenhum método de
            transmissão pela Internet ou armazenamento eletrônico é 100% seguro.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            9. Retenção de Dados
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Mantemos seus dados pessoais apenas pelo tempo necessário para
            cumprir as finalidades para as quais foram coletados, incluindo
            requisitos legais, contábeis ou de relatórios. Os dados armazenados
            localmente (no seu navegador) permanecem até que você os exclua ou
            limpe o cache.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            10. Dados de Menores
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Nosso serviço não é direcionado a menores de 18 anos. Não coletamos
            intencionalmente dados pessoais de menores. Se você acredita que
            coletamos dados de um menor, entre em contato conosco imediatamente.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            11. Transferência Internacional de Dados
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Seus dados podem ser transferidos e mantidos em computadores
            localizados fora do Brasil. Quando isso ocorrer, garantiremos que
            medidas adequadas de proteção estejam em vigor, em conformidade com
            a LGPD.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            12. Alterações nesta Política
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Podemos atualizar esta Política de Privacidade periodicamente.
            Notificaremos você sobre quaisquer alterações publicando a nova
            política nesta página e atualizando a data de "Última atualização".
            Recomendamos que você revise esta política periodicamente.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            13. Encarregado de Dados (DPO)
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Para questões relacionadas à proteção de dados pessoais, você pode
            entrar em contato com nosso Encarregado de Dados:
          </p>
          <div class="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg mt-3">
            <p class="text-gray-800 dark:text-gray-200">
              <strong>E-mail:</strong>
              <a
                href="mailto:contato@3wsys.com"
                class="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                contato@3wsys.com
              </a>
            </p>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            14. Contato
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
            Se você tiver dúvidas sobre esta Política de Privacidade, entre em
            contato:
          </p>
          <div class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg space-y-2">
            <p class="text-gray-800 dark:text-gray-200">
              <strong>3wSys</strong>
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              <strong>E-mail:</strong>
              <a
                href="mailto:contato@3wsys.com"
                class="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                contato@3wsys.com
              </a>
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              <strong>Website:</strong>
              <a
                href="https://ferramentaswyl.com/rendimento_salarial"
                target="_blank"
                class="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                ferramentaswyl.com/rendimento_salarial
              </a>
            </p>
          </div>
        </section>

        <!-- Ações -->
        <div class="pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="flex flex-col sm:flex-row gap-4">
            <router-link
              to="/termos"
              class="flex-1 px-6 py-3 text-center text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors font-medium"
            >
              Ver Termos de Uso
            </router-link>
            <button
              @click="handleManageCookies"
              class="flex-1 px-6 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md"
            >
              Gerenciar Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useConsent } from "@/composables/useConsent";

export default {
  name: "PrivacyPolicy",
  setup() {
    const { openBanner } = useConsent();

    const lastUpdate = computed(() => {
      return new Date().toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    });

    const handleManageCookies = () => {
      openBanner();
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    };

    return {
      lastUpdate,
      handleManageCookies,
    };
  },
};
</script>
