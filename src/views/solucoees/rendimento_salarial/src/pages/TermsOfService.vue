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
          Termos de Uso
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
            1. Aceitação dos Termos
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Ao acessar e usar a
            <strong>Calculadora de Rendimento Salarial</strong> ("Serviço"),
            você concorda em cumprir e estar vinculado aos seguintes Termos de
            Uso. Se você não concordar com qualquer parte destes termos, não
            deve usar nosso Serviço.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            2. Descrição do Serviço
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
            A Calculadora de Rendimento Salarial é uma ferramenta online
            gratuita que permite aos usuários:
          </p>
          <ul
            class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 ml-4"
          >
            <li>
              Calcular rendimentos salariais com base em diferentes parâmetros
            </li>
            <li>Visualizar resultados de cálculos financeiros</li>
            <li>Salvar preferências de uso localmente no navegador</li>
            <li>Acessar recursos educacionais sobre finanças pessoais</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            3. Uso Adequado do Serviço
          </h2>
          <div class="space-y-4">
            <div>
              <h3
                class="text-xl font-medium text-gray-900 dark:text-white mb-2"
              >
                3.1 Permissões
              </h3>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                Você tem permissão para:
              </p>
              <ul
                class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 ml-4"
              >
                <li>Usar o Serviço para fins pessoais e não comerciais</li>
                <li>Realizar cálculos quantas vezes necessário</li>
                <li>Compartilhar o link do Serviço com outras pessoas</li>
              </ul>
            </div>

            <div>
              <h3
                class="text-xl font-medium text-gray-900 dark:text-white mb-2"
              >
                3.2 Restrições
              </h3>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                Você NÃO tem permissão para:
              </p>
              <ul
                class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 ml-4"
              >
                <li>
                  Copiar, modificar ou distribuir o código-fonte do Serviço sem
                  autorização
                </li>
                <li>Usar o Serviço para fins ilegais ou não autorizados</li>
                <li>Tentar acessar áreas restritas do sistema</li>
                <li>Realizar engenharia reversa ou descompilar o Serviço</li>
                <li>
                  Usar bots, scrapers ou ferramentas automatizadas sem
                  autorização
                </li>
                <li>Sobrecarregar ou prejudicar a infraestrutura do Serviço</li>
                <li>Violar direitos de propriedade intelectual</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            4. Isenção de Responsabilidade
          </h2>
          <div
            class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded"
          >
            <p class="text-gray-800 dark:text-gray-200 font-medium mb-2">
              ⚠️ Importante: Limitações do Serviço
            </p>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              Os cálculos fornecidos pelo Serviço são apenas estimativas e não
              devem ser considerados como consultoria financeira, contábil ou
              jurídica profissional. Sempre consulte um profissional qualificado
              para decisões financeiras importantes.
            </p>
          </div>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Não nos responsabilizamos por:
          </p>
          <ul
            class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 ml-4 mt-2"
          >
            <li>Decisões tomadas com base nos cálculos fornecidos</li>
            <li>Erros ou imprecisões nos resultados</li>
            <li>Perdas financeiras decorrentes do uso do Serviço</li>
            <li>Interrupções ou indisponibilidade do Serviço</li>
            <li>Perda de dados armazenados localmente</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            5. Propriedade Intelectual
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Todo o conteúdo do Serviço, incluindo mas não limitado a textos,
            gráficos, logotipos, ícones, imagens, código-fonte e software, é
            propriedade da <strong>3wSys</strong> ou de seus licenciadores e é
            protegido pelas leis de direitos autorais e propriedade intelectual
            do Brasil e internacionais.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            6. Privacidade e Proteção de Dados
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
            Seu uso do Serviço também é regido pela nossa
            <router-link
              to="/privacidade"
              class="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
            >
              Política de Privacidade </router-link
            >, que descreve como coletamos, usamos e protegemos suas informações
            pessoais em conformidade com a LGPD.
          </p>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Destacamos que:
          </p>
          <ul
            class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 ml-4 mt-2"
          >
            <li>
              Os dados dos cálculos são processados localmente no seu navegador
            </li>
            <li>Não armazenamos valores salariais em nossos servidores</li>
            <li>Você tem controle total sobre seus dados</li>
            <li>Respeitamos todos os seus direitos previstos na LGPD</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            7. Disponibilidade do Serviço
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Embora nos esforcemos para manter o Serviço disponível 24/7, não
            garantimos que ele estará sempre acessível, ininterrupto ou livre de
            erros. Reservamo-nos o direito de suspender, modificar ou
            descontinuar qualquer parte do Serviço a qualquer momento, com ou
            sem aviso prévio.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            8. Links para Sites de Terceiros
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            O Serviço pode conter links para sites de terceiros. Não somos
            responsáveis pelo conteúdo, políticas de privacidade ou práticas de
            sites de terceiros. Recomendamos que você leia os termos e políticas
            de qualquer site de terceiros que visitar.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            9. Modificações dos Termos
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Reservamo-nos o direito de modificar estes Termos de Uso a qualquer
            momento. As alterações entrarão em vigor imediatamente após sua
            publicação no Serviço. Seu uso continuado após quaisquer alterações
            constitui sua aceitação dos novos termos.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            10. Rescisão
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Podemos encerrar ou suspender seu acesso ao Serviço imediatamente,
            sem aviso prévio ou responsabilidade, por qualquer motivo,
            incluindo, sem limitação, se você violar estes Termos de Uso.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            11. Lei Aplicável e Jurisdição
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Estes Termos de Uso são regidos pelas leis da República Federativa
            do Brasil. Qualquer disputa decorrente destes termos será submetida
            à jurisdição exclusiva dos tribunais brasileiros.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            12. Indenização
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Você concorda em indenizar, defender e isentar a
            <strong>3wSys</strong>, seus diretores, funcionários e agentes de
            quaisquer reclamações, danos, obrigações, perdas, responsabilidades,
            custos ou dívidas decorrentes de: (a) seu uso do Serviço; (b)
            violação destes Termos; ou (c) violação de direitos de terceiros.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            13. Disposições Gerais
          </h2>
          <div class="space-y-3">
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Independência das Cláusulas:</strong> Se qualquer
              disposição destes Termos for considerada inválida ou inexequível,
              as demais disposições continuarão em pleno vigor e efeito.
            </p>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Renúncia:</strong> A falha em exercer qualquer direito ou
              disposição destes Termos não constituirá uma renúncia a tal
              direito ou disposição.
            </p>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Acordo Integral:</strong> Estes Termos constituem o acordo
              integral entre você e a <strong>3wSys</strong> em relação ao uso
              do Serviço.
            </p>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            14. Contato
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
            Se você tiver dúvidas sobre estes Termos de Uso, entre em contato:
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
              to="/privacidade"
              class="flex-1 px-6 py-3 text-center text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors font-medium"
            >
              Ver Política de Privacidade
            </router-link>
            <router-link
              to="/"
              class="flex-1 px-6 py-3 text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md"
            >
              Voltar ao Início
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "TermsOfService",
  setup() {
    const lastUpdate = computed(() => {
      return new Date().toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    });

    return {
      lastUpdate,
    };
  },
};
</script>
