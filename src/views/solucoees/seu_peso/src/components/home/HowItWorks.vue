<template>
  <section
    class="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2
          class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Como Funciona
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Simples, rápido e baseado em ciência
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div
          v-for="(step, index) in steps"
          :key="step.title"
          class="text-center"
        >
          <div class="relative mb-6">
            <div
              class="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-2xl flex items-center justify-center mx-auto shadow-xl transform hover:scale-110 transition-transform duration-300"
            >
              <span class="text-3xl font-bold text-white">{{ index + 1 }}</span>
            </div>
            <div
              v-if="index < steps.length - 1"
              class="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-300 to-primary-500 dark:from-primary-700 dark:to-primary-600"
            ></div>
          </div>

          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
            {{ step.title }}
          </h3>

          <p class="text-gray-600 dark:text-gray-400">
            {{ step.description }}
          </p>
        </div>
      </div>

      <div class="mt-16 text-center">
        <router-link
          to="/calculadora"
          class="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <span>Começar Agora</span>
          <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
const steps = [
  {
    title: "Insira Seus Dados",
    description:
      "Preencha informações básicas como idade, altura, peso, sexo e nível de atividade.",
  },
  {
    title: "Cálculos Instantâneos",
    description:
      "Nossa ferramenta processa os dados usando fórmulas científicas validadas.",
  },
  {
    title: "Resultados Detalhados",
    description:
      "Receba análises completas, orientações e recomendações personalizadas.",
  },
];
</script>
