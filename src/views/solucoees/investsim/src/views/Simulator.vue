<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-4xl mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Simulador de Investimentos
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Descubra o potencial de crescimento dos seus investimentos com
          cálculos precisos e resultados detalhados
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Formulário -->
        <div class="lg:col-span-2">
          <div class="card p-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-6">
              Dados do Investimento
            </h2>

            <form @submit.prevent="simular" class="space-y-6">
              <!-- Montante Inicial -->
              <div>
                <label
                  for="montanteInicial"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Montante Inicial
                  <button
                    type="button"
                    @click="openModal('montanteInicial')"
                    class="ml-2 text-primary-600 hover:text-primary-700"
                  >
                    <svg
                      class="w-4 h-4 inline"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </label>
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <span class="text-gray-500 sm:text-sm">R$</span>
                  </div>
                  <input
                    id="montanteInicial"
                    v-model.number="form.montanteInicial"
                    type="number"
                    step="0.01"
                    min="0"
                    class="input-field pl-10"
                    placeholder="10.000,00"
                    :disabled="loading || simulou"
                    required
                  />
                </div>
              </div>

              <!-- Tempo de Investimento -->
              <div>
                <label
                  for="tempoInvestimento"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tempo de Investimento
                  <button
                    type="button"
                    @click="openModal('tempoInvestimento')"
                    class="ml-2 text-primary-600 hover:text-primary-700"
                  >
                    <svg
                      class="w-4 h-4 inline"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </label>
                <div class="relative">
                  <input
                    id="tempoInvestimento"
                    v-model.number="form.tempoInvestimento"
                    type="number"
                    step="0.1"
                    min="0"
                    class="input-field"
                    placeholder="5"
                    :disabled="loading || simulou"
                    required
                  />
                  <div
                    class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                  >
                    <span class="text-gray-500 sm:text-sm">anos</span>
                  </div>
                </div>
              </div>

              <!-- Aporte Mensal -->
              <div>
                <label
                  for="aporteMensal"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Aporte Mensal
                  <button
                    type="button"
                    @click="openModal('aporteMensal')"
                    class="ml-2 text-primary-600 hover:text-primary-700"
                  >
                    <svg
                      class="w-4 h-4 inline"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </label>
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <span class="text-gray-500 sm:text-sm">R$</span>
                  </div>
                  <input
                    id="aporteMensal"
                    v-model.number="form.aporteMensal"
                    type="number"
                    step="0.01"
                    min="0"
                    class="input-field pl-10"
                    placeholder="500,00"
                    :disabled="loading || simulou"
                    required
                  />
                </div>
              </div>

              <!-- Botões -->
              <div class="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  v-if="!simulou"
                  type="submit"
                  :disabled="loading"
                  class="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span
                    v-if="!loading"
                    class="flex items-center justify-center"
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
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    Simular Investimento
                  </span>
                  <span v-else class="flex items-center justify-center">
                    <svg
                      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processando...
                  </span>
                </button>

                <button
                  type="button"
                  @click="resetar"
                  :disabled="loading"
                  class="btn-secondary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
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
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Resetar Cálculo
                </button>

                <button
                  v-if="simulou"
                  type="button"
                  @click="imprimir"
                  :disabled="loading"
                  class="btn-success flex-1 disabled:opacity-50 disabled:cursor-not-allowed no-print"
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
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                  </svg>
                  Imprimir Resultado
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Informações e Dicas -->
        <div class="lg:col-span-1">
          <div class="space-y-6">
            <!-- Card de Dicas -->
            <div class="card p-6">
              <h3
                class="text-lg font-semibold text-gray-900 mb-4 flex items-center"
              >
                <svg
                  class="w-5 h-5 mr-2 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                Dicas Importantes
              </h3>
              <div class="space-y-3 text-sm text-gray-600">
                <div class="flex items-start space-x-2">
                  <div
                    class="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"
                  ></div>
                  <p>
                    Use valores realistas baseados na sua situação financeira
                    atual
                  </p>
                </div>
                <div class="flex items-start space-x-2">
                  <div
                    class="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"
                  ></div>
                  <p>
                    Considere ter uma reserva de emergência antes de investir
                  </p>
                </div>
                <div class="flex items-start space-x-2">
                  <div
                    class="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"
                  ></div>
                  <p>
                    Investimentos de longo prazo aproveitam melhor os juros
                    compostos
                  </p>
                </div>
                <div class="flex items-start space-x-2">
                  <div
                    class="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"
                  ></div>
                  <p>Diversifique seus investimentos para reduzir riscos</p>
                </div>
              </div>
            </div>

            <!-- Card de Exemplo -->
            <div class="card p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
              <h3
                class="text-lg font-semibold text-gray-900 mb-4 flex items-center"
              >
                <svg
                  class="w-5 h-5 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                Exemplo Prático
              </h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Valor inicial:</span>
                  <span class="font-semibold">R$ 10.000</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Aporte mensal:</span>
                  <span class="font-semibold">R$ 500</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Tempo:</span>
                  <span class="font-semibold">10 anos</span>
                </div>
                <hr class="my-3" />
                <div class="flex justify-between text-primary-600">
                  <span class="font-semibold">Resultado estimado:</span>
                  <span class="font-bold">R$ 150.000+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Resultados -->
      <div v-if="simulou" class="mt-12 animate-bounce-in">
        <div class="card p-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-6 text-center">
            📊 Resultados da Simulação
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center p-6 bg-blue-50 rounded-lg">
              <div class="text-3xl mb-2">💰</div>
              <h3 class="text-lg font-semibold text-gray-700 mb-2">
                Valor Investido
              </h3>
              <p class="text-2xl font-bold text-blue-600">
                R$ {{ formatCurrency(resultados.montanteInvestido) }}
              </p>
            </div>

            <div class="text-center p-6 bg-green-50 rounded-lg">
              <div class="text-3xl mb-2">📈</div>
              <h3 class="text-lg font-semibold text-gray-700 mb-2">
                Montante Acumulado
              </h3>
              <p class="text-2xl font-bold text-green-600">
                R$ {{ formatCurrency(resultados.montanteTotal) }}
              </p>
            </div>

            <div class="text-center p-6 bg-yellow-50 rounded-lg">
              <div class="text-3xl mb-2">🎯</div>
              <h3 class="text-lg font-semibold text-gray-700 mb-2">
                Lucro Obtido
              </h3>
              <p class="text-2xl font-bold text-yellow-600">
                R$ {{ formatCurrency(resultados.lucroTotal) }}
              </p>
            </div>
          </div>

          <div class="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 text-center">
              Resumo do Investimento
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Montante inicial:</span>
                <span class="font-semibold"
                  >R$ {{ formatCurrency(form.montanteInicial) }}</span
                >
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Aporte mensal:</span>
                <span class="font-semibold"
                  >R$ {{ formatCurrency(form.aporteMensal) }}</span
                >
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Tempo de investimento:</span>
                <span class="font-semibold"
                  >{{ form.tempoInvestimento }} anos</span
                >
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Total de aportes:</span>
                <span class="font-semibold"
                  >{{ Math.round(form.tempoInvestimento * 12) }} meses</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Gráficos -->
        <div class="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Gráfico de Composição -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6 text-center">
              📊 Composição do Patrimônio
            </h3>
            <ChartComponent
              v-if="chartDataComposition.labels.length > 0"
              type="doughnut"
              :data="chartDataComposition"
              :options="chartOptionsComposition"
            />
          </div>

          <!-- Gráfico de Evolução -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6 text-center">
              📈 Evolução do Investimento
            </h3>
            <ChartComponent
              v-if="chartDataEvolution.labels.length > 0"
              type="line"
              :data="chartDataEvolution"
              :options="chartOptionsEvolution"
            />
          </div>
        </div>

        <!-- Botão Download PDF -->
        <div class="mt-8 text-center">
          <button
            @click="downloadPDF"
            class="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
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
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Baixar Relatório em PDF
          </button>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <InfoModal
      v-if="activeModal"
      :type="activeModal"
      @close="activeModal = null"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import InfoModal from "../components/InfoModal.vue";
import ChartComponent from "../components/ChartComponent.vue";
import Swal from "sweetalert2";
import { usePDF } from "../composables/usePDF";
import { useFormat } from "../composables/useFormat";

const { generateSimulationPDF } = usePDF();
const { formatCurrency: formatCurrencyUtil } = useFormat();

const loading = ref(false);
const simulou = ref(false);
const activeModal = ref(null);

const form = reactive({
  montanteInicial: 0,
  tempoInvestimento: 0,
  aporteMensal: 0,
});

const resultados = reactive({
  montanteInvestido: 0,
  montanteTotal: 0,
  lucroTotal: 0,
});

// Dados para gráfico de composição (pizza)
const chartDataComposition = computed(() => {
  if (!simulou.value) return { labels: [], datasets: [] };

  return {
    labels: ["Montante Inicial", "Aportes Mensais", "Lucro Obtido"],
    datasets: [
      {
        data: [
          form.montanteInicial,
          form.aporteMensal * form.tempoInvestimento * 12 -
            form.montanteInicial,
          resultados.lucroTotal,
        ],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)", // primary-600
          "rgba(147, 197, 253, 0.8)", // primary-300
          "rgba(34, 197, 94, 0.8)", // success-600
        ],
        borderColor: [
          "rgb(59, 130, 246)",
          "rgb(147, 197, 253)",
          "rgb(34, 197, 94)",
        ],
        borderWidth: 2,
      },
    ],
  };
});

const chartOptionsComposition = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const label = context.label || "";
          const value = formatCurrencyUtil(context.parsed, true);
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = ((context.parsed / total) * 100).toFixed(1);
          return `${label}: ${value} (${percentage}%)`;
        },
      },
    },
  },
};

// Dados para gráfico de evolução (linha)
const chartDataEvolution = computed(() => {
  if (!simulou.value) return { labels: [], datasets: [] };

  const years = Math.ceil(form.tempoInvestimento);
  const labels = [];
  const dataInvestido = [];
  const dataTotal = [];

  for (let year = 0; year <= years; year++) {
    labels.push(`Ano ${year}`);

    // Valor investido até o ano
    const investidoAteAno =
      form.montanteInicial + form.aporteMensal * year * 12;
    dataInvestido.push(investidoAteAno);

    // Valor total estimado (usando proporção do resultado final)
    const proporcao = year / form.tempoInvestimento;
    const totalEstimado =
      form.montanteInicial +
      (resultados.montanteTotal - form.montanteInicial) * proporcao;
    dataTotal.push(totalEstimado);
  }

  return {
    labels,
    datasets: [
      {
        label: "Valor Investido",
        data: dataInvestido,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Valor Total com Juros",
        data: dataTotal,
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };
});

const chartOptionsEvolution = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const label = context.dataset.label || "";
          const value = formatCurrencyUtil(context.parsed.y, true);
          return `${label}: ${value}`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (value) {
          return formatCurrencyUtil(value, true);
        },
      },
    },
  },
};

const openModal = (type) => {
  activeModal.value = type;
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const simular = async () => {
  // Validações
  if (form.montanteInicial <= 0) {
    await Swal.fire({
      icon: "error",
      title: "Montante Inicial",
      text: 'O campo "Montante Inicial" deve ser preenchido com valor superior a 0.',
      confirmButtonColor: "#3b82f6",
    });
    return;
  }

  if (form.tempoInvestimento <= 0) {
    await Swal.fire({
      icon: "error",
      title: "Tempo de Investimento",
      text: 'O campo "Tempo de Investimento" deve ser preenchido com valor superior a 0.',
      confirmButtonColor: "#3b82f6",
    });
    return;
  }

  if (form.aporteMensal <= 0) {
    await Swal.fire({
      icon: "error",
      title: "Aporte Mensal",
      text: 'O campo "Aporte Mensal" deve ser preenchido com valor superior a 0.',
      confirmButtonColor: "#3b82f6",
    });
    return;
  }

  loading.value = true;

  try {
    const response = await fetch(
      "https://3wsys-back-hotwyl.vercel.app/simuladores/investimento",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          montanteInicial: form.montanteInicial,
          tempoInvestimento: form.tempoInvestimento,
          aporteMensal: form.aporteMensal,
        }),
      }
    );

    const data = await response.json();

    if (data.content) {
      resultados.montanteTotal = data.content.montante_acumulado;
      resultados.montanteInvestido = data.content.valor_investido;
      resultados.lucroTotal = data.content.lucro_obitido;
      simulou.value = true;

      // Scroll suave para os resultados
      setTimeout(() => {
        const resultElement = document.querySelector(".animate-bounce-in");
        if (resultElement) {
          resultElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      throw new Error("Erro na resposta da API");
    }
  } catch (error) {
    console.error("Erro ao realizar simulação:", error);
    await Swal.fire({
      icon: "error",
      title: "Erro na Simulação",
      text: "Erro ao realizar a simulação. Tente novamente mais tarde.",
      confirmButtonColor: "#3b82f6",
    });
  } finally {
    loading.value = false;
  }
};

const resetar = () => {
  form.montanteInicial = 0;
  form.tempoInvestimento = 0;
  form.aporteMensal = 0;
  resultados.montanteTotal = 0;
  resultados.montanteInvestido = 0;
  resultados.lucroTotal = 0;
  simulou.value = false;
};

const imprimir = () => {
  if (!simulou.value) {
    Swal.fire({
      icon: "warning",
      title: "Simulação não realizada",
      text: "Para imprimir o resultado, é necessário realizar a simulação primeiro.",
      confirmButtonColor: "#3b82f6",
    });
    return;
  }
  window.print();
};

const downloadPDF = async () => {
  if (!simulou.value) {
    await Swal.fire({
      icon: "warning",
      title: "Simulação não realizada",
      text: "Para gerar o PDF, é necessário realizar a simulação primeiro.",
      confirmButtonColor: "#3b82f6",
    });
    return;
  }

  try {
    await generateSimulationPDF({
      montanteInicial: form.montanteInicial,
      aporteMensal: form.aporteMensal,
      tempoInvestimento: form.tempoInvestimento,
      montanteTotal: resultados.montanteTotal,
      montanteInvestido: resultados.montanteInvestido,
      lucroTotal: resultados.lucroTotal,
    });

    await Swal.fire({
      icon: "success",
      title: "PDF Gerado!",
      text: "O relatório foi baixado com sucesso.",
      confirmButtonColor: "#3b82f6",
      timer: 2000,
    });
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    await Swal.fire({
      icon: "error",
      title: "Erro ao Gerar PDF",
      text: "Não foi possível gerar o relatório. Tente novamente.",
      confirmButtonColor: "#3b82f6",
    });
  }
};
</script>
