<template>
  <section class="pt-12 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1
          class="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in"
        >
          Calculadora de
          <span
            class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Rendimento Salarial
          </span>
        </h1>
        <p
          class="text-xl text-gray-400 max-w-3xl mx-auto mb-8 animate-slide-up"
        >
          Descubra quanto você ganha por hora, dia, semana, mês e ano. Planeje
          suas finanças com precisão e tome decisões informadas sobre sua
          carreira.
        </p>

        <!-- Key Benefits -->
        <div class="flex flex-wrap justify-center gap-4 mb-8">
          <span
            class="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
          >
            ✨ Gratuito
          </span>
          <span
            class="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium"
          >
            📱 Responsivo
          </span>
          <span
            class="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium"
          >
            ⚡ Instantâneo
          </span>
          <span
            class="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium"
          >
            🔒 Seguro
          </span>
        </div>
      </div>

      <!-- Calculator Form -->
      <div v-if="!showResults" class="max-w-2xl mx-auto">
        <div class="bg-white rounded-3xl shadow-2xl p-8 md:p-12 glass-effect">
          <div class="text-center mb-8">
            <div
              class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center"
            >
              <svg
                class="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">
              Insira seu Salário
            </h2>
            <p class="text-gray-900">
              Digite o valor do seu salário mensal para ver o breakdown completo
            </p>
          </div>

          <form @submit.prevent="calculateSalary" class="space-y-6">
            <div>
              <label
                for="salary"
                class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center justify-between"
              >
                <span class="flex items-center">
                  <i class="fas fa-money-bill-wave text-blue-600 dark:text-blue-400 mr-2"></i>
                  Salário Mensal (R$)
                </span>
                <button
                  type="button"
                  @click="showTooltip = !showTooltip"
                  class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  title="Informações"
                >
                  <i class="fas fa-info-circle text-lg"></i>
                </button>
              </label>
              
              <!-- Tooltip -->
              <div
                v-if="showTooltip"
                class="mb-3 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 rounded-lg text-sm text-gray-700 dark:text-gray-300"
              >
                <p class="flex items-start">
                  <i class="fas fa-lightbulb text-yellow-500 mr-2 mt-1"></i>
                  <span>
                    <strong>Dica:</strong> Digite o valor do seu salário bruto mensal sem descontos. 
                    A calculadora mostrará quanto você ganha por hora, dia, semana e ano.
                  </span>
                </p>
              </div>

              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <span class="text-gray-500 text-lg">R$</span>
                </div>
                <input
                  v-model="salaryInput"
                  type="number"
                  id="salary"
                  name="salary"
                  step="0.01"
                  min="0"
                  placeholder="2.500,00"
                  autocomplete="off"
                  class="number-input block w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  :class="{
                    'border-red-300 focus:border-red-500 focus:ring-red-500/20':
                      salaryInput && !isValidInput,
                  }"
                />
              </div>
              <p
                v-if="salaryInput && !isValidInput"
                class="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center"
              >
                <i class="fas fa-exclamation-triangle mr-2"></i>
                Por favor, insira um valor válido maior que zero.
              </p>
            </div>

            <button
              type="submit"
              :disabled="!isValidInput || isCalculating"
              class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span
                v-if="!isCalculating"
                class="flex items-center justify-center"
              >
                <i class="fas fa-calculator mr-2"></i>
                Calcular Rendimento
              </span>
              <span v-else class="flex items-center justify-center">
                <i class="fas fa-spinner fa-spin mr-3"></i>
                Calculando...
              </span>
            </button>
          </form>
        </div>
      </div>

      <!-- Results Section -->
      <ResultsSection
        v-if="showResults"
        :salary-data="salaryData"
        @reset="resetCalculator"
        @print="printResults"
      />
    </div>
  </section>
</template>

<script>
import { ref, computed, inject, nextTick } from "vue";
import ResultsSection from "./ResultsSection.vue";
import { useCalculator } from "@/composables/useCalculator";

export default {
  name: "CalculatorSection",
  components: {
    ResultsSection,
  },
  emits: ["salary-calculated"],
  setup(props, { emit }) {
    const toast = inject("toast", null);
    const showResults = ref(false);
    const showTooltip = ref(false);

    const {
      salaryInput,
      isCalculating,
      salaryData,
      isValidInput,
      calculateSalary: calculate,
      resetCalculator: reset,
      saveToHistory,
    } = useCalculator();

    const calculateSalary = async () => {
      try {
        await calculate();
        showResults.value = true;

        // Salva no histórico
        saveToHistory();

        // Emite evento
        emit("salary-calculated", salaryData.value);

        // SweetAlert2 de sucesso
        if (window.Swal) {
          window.Swal.fire({
            icon: 'success',
            title: 'Cálculo Realizado!',
            text: 'Seus resultados estão prontos abaixo.',
            timer: 2000,
            showConfirmButton: false,
            timerProgressBar: true,
          });
        } else if (toast) {
          toast.success?.("Cálculo realizado com sucesso!", 2000);
        }

        // Scroll suave para resultados
        await nextTick();
        const resultsElement = document.querySelector(".results-section");
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: "smooth" });
        }
      } catch (error) {
        if (window.Swal) {
          window.Swal.fire({
            icon: 'error',
            title: 'Erro ao Calcular',
            text: error.message || 'Ocorreu um erro ao calcular o rendimento.',
            confirmButtonColor: '#3B82F6',
          });
        } else if (toast) {
          toast.error?.(error.message || "Erro ao calcular", 3000);
        } else {
          alert(error.message);
        }
      }
    };

    const resetCalculator = () => {
      reset();
      showResults.value = false;
      window.scrollTo({ top: 0, behavior: "smooth" });

      if (window.Swal) {
        window.Swal.fire({
          icon: 'info',
          title: 'Calculadora Resetada',
          text: 'Você pode fazer um novo cálculo agora.',
          timer: 1500,
          showConfirmButton: false,
          toast: true,
          position: 'top-end',
        });
      } else if (toast) {
        toast.info?.("Calculadora resetada", 2000);
      }
    };

    const printResults = () => {
      window.print();
    };

    return {
      salaryInput,
      showResults,
      showTooltip,
      isCalculating,
      salaryData,
      isValidInput,
      calculateSalary,
      resetCalculator,
      printResults,
    };
  },
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out;
}
</style>
