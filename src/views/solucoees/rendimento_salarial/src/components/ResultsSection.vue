<template>
  <div>
    <div class="max-w-6xl mx-auto animate-bounce-in results-section">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="bg-green-100 border border-green-200 rounded-2xl p-6 mb-8">
          <h2 class="text-2xl font-bold text-green-800 mb-2">
            🎉 Cálculo Realizado com Sucesso!
          </h2>
          <p class="text-green-700">
            Baseado no salário mensal de
            <strong>{{ formatCurrency(salaryData.base) }}</strong>
          </p>
        </div>
      </div>

      <!-- Results Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Hourly Rate -->
        <div
          class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-200"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="bg-blue-100 p-3 rounded-lg">
              <svg
                class="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <span class="text-2xl font-bold text-blue-600">{{
              formatCurrency(salaryData.hourly)
            }}</span>
          </div>
          <h3 class="font-semibold text-gray-900">Por Hora</h3>
          <p class="text-sm text-gray-600">Baseado em 220h/mês</p>
        </div>

        <!-- Daily Rate -->
        <div
          class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-200"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="bg-green-100 p-3 rounded-lg">
              <svg
                class="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <span class="text-2xl font-bold text-green-600">{{
              formatCurrency(salaryData.daily)
            }}</span>
          </div>
          <h3 class="font-semibold text-gray-900">Por Dia</h3>
          <p class="text-sm text-gray-600">Média de 30 dias</p>
        </div>

        <!-- Weekly Rate -->
        <div
          class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow duration-200"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="bg-purple-100 p-3 rounded-lg">
              <svg
                class="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
            </div>
            <span class="text-2xl font-bold text-purple-600">{{
              formatCurrency(salaryData.weekly)
            }}</span>
          </div>
          <h3 class="font-semibold text-gray-900">Por Semana</h3>
          <p class="text-sm text-gray-600">4,33 semanas/mês</p>
        </div>

        <!-- Monthly Rate -->
        <div
          class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-500 hover:shadow-xl transition-shadow duration-200"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="bg-indigo-100 p-3 rounded-lg">
              <svg
                class="w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                ></path>
              </svg>
            </div>
            <span class="text-2xl font-bold text-indigo-600">{{
              formatCurrency(salaryData.monthly)
            }}</span>
          </div>
          <h3 class="font-semibold text-gray-900">Por Mês</h3>
          <p class="text-sm text-gray-600">Salário base</p>
        </div>
      </div>

      <!-- Extended Periods -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h3 class="text-xl font-bold text-gray-900 mb-6 text-center">
          📈 Projeções de Períodos Maiores
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center p-4 bg-gray-50 rounded-xl">
            <h4 class="font-semibold text-gray-900 mb-2">Quinzena</h4>
            <p class="text-lg font-bold text-gray-700">
              {{ formatCurrency(salaryData.biweekly) }}
            </p>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded-xl">
            <h4 class="font-semibold text-gray-900 mb-2">Trimestre</h4>
            <p class="text-lg font-bold text-gray-700">
              {{ formatCurrency(salaryData.quarterly) }}
            </p>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded-xl">
            <h4 class="font-semibold text-gray-900 mb-2">Semestre</h4>
            <p class="text-lg font-bold text-gray-700">
              {{ formatCurrency(salaryData.semester) }}
            </p>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded-xl">
            <h4 class="font-semibold text-gray-900 mb-2">Ano</h4>
            <p class="text-lg font-bold text-gray-700">
              {{ formatCurrency(salaryData.yearly) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center no-print">
        <button
          @click="$emit('reset')"
          class="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center"
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
            ></path>
          </svg>
          Nova Simulação
        </button>
        <button
          @click="$emit('print')"
          class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center"
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
            ></path>
          </svg>
          Imprimir Resultados
        </button>
      </div>

      <!-- Print-only header -->
      <div class="print-only hidden">
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-gray-900 mb-4">
            Calculadora de Rendimento Salarial - Resultados
          </h1>
          <p class="text-gray-600">
            Salário base: {{ formatCurrency(salaryData.base) }}
          </p>
          <p class="text-sm text-gray-500">
            Gerado em: {{ new Date().toLocaleDateString("pt-BR") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCurrency } from "@/composables/useCurrency";

export default {
  name: "ResultsSection",
  props: {
    salaryData: {
      type: Object,
      required: true,
    },
  },
  emits: ["reset", "print"],
  setup() {
    const { formatCurrency } = useCurrency();

    return {
      formatCurrency,
    };
  },
};
</script>

<style scoped>
.animate-bounce-in {
  animation: bounceIn 0.8s ease-out;
}
</style>
