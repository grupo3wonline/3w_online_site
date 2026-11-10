<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-20 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12 animate-fadeIn">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold mb-6"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span>Documentos Legais</span>
        </div>
        <h1
          class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Termos de Uso
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          Última atualização: {{ lastUpdated }}
        </p>
      </div>

      <!-- Content -->
      <BaseCard class="p-8 md:p-12 animate-slideUp">
        <div class="prose prose-blue dark:prose-invert max-w-none">
          <!-- Introdução -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              1. Introdução
            </h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Bem-vindo ao InvestSim! Estes Termos de Uso regulam o acesso e
              utilização da plataforma InvestSim, disponível em
              <a
                href="https://www.3wonline.com.br/investsim"
                class="text-primary-600 hover:underline"
                >www.3wonline.com.br/investsim</a
              >, desenvolvida e mantida pelo Grupo 3w Online.
            </p>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              Ao acessar e utilizar o InvestSim, você concorda em cumprir estes
              Termos de Uso. Caso não concorde com algum dos termos aqui
              apresentados, pedimos que não utilize a plataforma.
            </p>
          </section>

          <!-- Serviço -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              2. Descrição do Serviço
            </h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              O InvestSim é uma ferramenta educacional e gratuita de simulação
              de investimentos que permite aos usuários:
            </p>
            <ul
              class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4"
            >
              <li>Calcular projeções de investimentos com juros compostos</li>
              <li>Simular diferentes cenários de aportes mensais</li>
              <li>Visualizar gráficos de evolução patrimonial</li>
              <li>Exportar relatórios em PDF</li>
              <li>Planejar metas financeiras de longo prazo</li>
            </ul>
          </section>

          <!-- Uso Permitido -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              3. Uso Permitido
            </h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              O InvestSim destina-se exclusivamente para fins educacionais e de
              planejamento pessoal. Você concorda em:
            </p>
            <ul
              class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4"
            >
              <li>
                Utilizar a plataforma apenas para simulações e planejamento
                financeiro pessoal
              </li>
              <li>
                Não utilizar a ferramenta para fins comerciais não autorizados
              </li>
              <li>
                Não tentar acessar áreas restritas ou sistemas não públicos
              </li>
              <li>
                Não realizar engenharia reversa, descompilação ou desmontagem da
                plataforma
              </li>
              <li>
                Não sobrecarregar ou prejudicar o funcionamento da plataforma
              </li>
            </ul>
          </section>

          <!-- Isenção de Responsabilidade -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              4. Isenção de Responsabilidade
            </h2>
            <div
              class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-4"
            >
              <p class="text-gray-800 dark:text-gray-200 font-semibold">
                ⚠️ Importante: Não somos consultores financeiros
              </p>
            </div>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              O InvestSim é uma ferramenta de simulação e não constitui
              aconselhamento financeiro, fiscal ou jurídico. As projeções e
              cálculos apresentados são baseados em fórmulas matemáticas e nos
              dados fornecidos pelo usuário.
            </p>
            <ul
              class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4"
            >
              <li>
                Os resultados são estimativas e não garantem rentabilidade real
              </li>
              <li>O desempenho passado não é garantia de resultados futuros</li>
              <li>
                Investimentos envolvem riscos e podem resultar em perdas
                financeiras
              </li>
              <li>
                Recomendamos consultar um profissional certificado antes de
                tomar decisões de investimento
              </li>
              <li>
                Não nos responsabilizamos por decisões tomadas com base nas
                simulações
              </li>
            </ul>
          </section>

          <!-- Propriedade Intelectual -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              5. Propriedade Intelectual
            </h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Todo o conteúdo da plataforma InvestSim, incluindo mas não
              limitado a textos, gráficos, logotipos, ícones, imagens, código
              fonte e software, é propriedade do Grupo 3w Online e está
              protegido pelas leis de direitos autorais brasileiras e
              internacionais.
            </p>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              É proibida a reprodução, distribuição, modificação ou uso
              comercial do conteúdo sem autorização prévia por escrito.
            </p>
          </section>

          <!-- Privacidade de Dados -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              6. Privacidade e Proteção de Dados (LGPD)
            </h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Respeitamos sua privacidade e estamos comprometidos com a proteção
              dos seus dados pessoais em conformidade com a Lei Geral de
              Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Para informações detalhadas sobre como coletamos, usamos,
              armazenamos e protegemos seus dados, consulte nossa
              <router-link
                to="/politica-de-privacidade"
                class="text-primary-600 hover:underline font-semibold"
              >
                Política de Privacidade </router-link
              >.
            </p>
            <div
              class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4"
            >
              <p class="text-gray-800 dark:text-gray-200">
                <strong>Seus Direitos:</strong> Você tem direito de acessar,
                corrigir, excluir e solicitar a portabilidade dos seus dados
                pessoais conforme estabelecido pela LGPD.
              </p>
            </div>
          </section>

          <!-- Cookies -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              7. Uso de Cookies e Tecnologias Similares
            </h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              O InvestSim utiliza cookies e tecnologias similares para melhorar
              sua experiência de navegação. Utilizamos:
            </p>
            <ul
              class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 mb-4"
            >
              <li>
                <strong>Cookies Essenciais:</strong> Necessários para o
                funcionamento básico da plataforma
              </li>
              <li>
                <strong>Cookies de Preferências:</strong> Armazenam suas
                configurações (ex: modo escuro)
              </li>
              <li>
                <strong>Cookies Analíticos:</strong> Nos ajudam a entender como
                você usa a plataforma (com seu consentimento)
              </li>
            </ul>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              Você pode gerenciar suas preferências de cookies através do banner
              de consentimento ou nas configurações do seu navegador.
            </p>
          </section>

          <!-- Disponibilidade -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              8. Disponibilidade do Serviço
            </h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              Embora nos esforcemos para manter o InvestSim sempre disponível,
              não garantimos que o serviço será ininterrupto ou livre de erros.
              Podemos realizar manutenções programadas ou enfrentar
              indisponibilidades técnicas sem aviso prévio.
            </p>
          </section>

          <!-- Modificações -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              9. Modificações dos Termos
            </h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              Reservamo-nos o direito de modificar estes Termos de Uso a
              qualquer momento. As alterações entrarão em vigor imediatamente
              após sua publicação na plataforma. Recomendamos que você revise
              periodicamente esta página para estar ciente de quaisquer
              mudanças.
            </p>
          </section>

          <!-- Lei Aplicável -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              10. Lei Aplicável e Foro
            </h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
              Estes Termos de Uso são regidos pelas leis da República Federativa
              do Brasil. Qualquer disputa decorrente destes termos será
              submetida ao foro da comarca onde o Grupo 3w Online possui sua
              sede, com exclusão de qualquer outro, por mais privilegiado que
              seja.
            </p>
          </section>

          <!-- Contato -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              11. Contato
            </h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Para dúvidas, sugestões ou solicitações relacionadas a estes
              Termos de Uso, entre em contato conosco:
            </p>
            <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 space-y-2">
              <p class="text-gray-800 dark:text-gray-200">
                <strong>Grupo 3w Online</strong>
              </p>
              <p class="text-gray-700 dark:text-gray-300">
                E-mail:
                <a
                  href="mailto:contato@3wonline.com.br"
                  class="text-primary-600 hover:underline"
                  >contato@3wonline.com.br</a
                >
              </p>
              <p class="text-gray-700 dark:text-gray-300">
                Website:
                <a
                  href="https://www.3wonline.com.br"
                  target="_blank"
                  class="text-primary-600 hover:underline"
                  >www.3wonline.com.br</a
                >
              </p>
            </div>
          </section>

          <!-- Aceitação -->
          <section>
            <div
              class="bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-200 dark:border-primary-800 rounded-lg p-6"
            >
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Aceitação dos Termos
              </h3>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                Ao utilizar o InvestSim, você declara ter lido, compreendido e
                concordado com todos os termos e condições aqui estabelecidos.
              </p>
            </div>
          </section>
        </div>

        <!-- Back Button -->
        <div class="mt-8 flex justify-center">
          <router-link to="/">
            <BaseButton variant="outline">
              <template #left>
                <svg
                  class="w-5 h-5"
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
              </template>
              Voltar à Página Inicial
            </BaseButton>
          </router-link>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useSEO } from "@/composables/useSEO";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

const { setSEO } = useSEO();

const lastUpdated = "10 de Outubro de 2025";

onMounted(() => {
  setSEO({
    title: "Termos de Uso | InvestSim",
    description:
      "Leia os Termos de Uso do InvestSim. Conheça as regras e condições para utilização da nossa plataforma de simulação de investimentos.",
    keywords: "termos de uso, condições de uso, regulamento, investsim, legal",
  });
});
</script>
