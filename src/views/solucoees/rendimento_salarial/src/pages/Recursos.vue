<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 animate-fade-in">
        <h1
          class="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Recursos e Funcionalidades
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Descubra todos os recursos que nossa calculadora oferece para você
          gerenciar melhor suas finanças
        </p>
      </div>

      <FeaturesShowcase />

      <!-- Additional Info -->
      <div
        class="mt-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-12"
      >
        <h2
          class="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center"
        >
          Por que usar nossa calculadora?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              ✨ Facilidade de Uso
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Interface intuitiva e moderna que qualquer pessoa consegue usar
              sem dificuldade.
            </p>
          </div>
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              🎯 Precisão nos Cálculos
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Algoritmos testados e validados para garantir resultados precisos
              sempre.
            </p>
          </div>
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              💡 Insights Valiosos
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Entenda melhor seu rendimento e tome decisões financeiras mais
              conscientes.
            </p>
          </div>
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              🚀 Sempre Atualizado
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Novas funcionalidades e melhorias sendo adicionadas
              constantemente.
            </p>
          </div>
        </div>
      </div>

      <div class="mt-12 text-center">
        <router-link
          to="/"
          class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-200"
        >
          <svg
            class="w-6 h-6 mr-2"
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
          Experimentar Calculadora
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useSEO } from "@/composables/useSEO";
import FeaturesShowcase from "@/components/landing/FeaturesShowcase.vue";

export default {
  name: "RecursosPage",
  components: {
    FeaturesShowcase,
  },
  setup() {
    const { updateSEO } = useSEO();

    onMounted(() => {
      updateSEO({
        title: "Recursos - Calculadora de Rendimento Salarial",
        description:
          "Conheça todos os recursos e funcionalidades da nossa calculadora salarial moderna e gratuita",
        canonical: "https://app.3wonline.com/rendimentosalarial/recursos",
      });
    });
  },
};
</script>
