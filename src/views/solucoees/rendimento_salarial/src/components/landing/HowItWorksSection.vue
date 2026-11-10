<template>
  <section class="py-20 bg-gray-50 dark:bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2
          class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Como Funciona?
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          Simples, rápido e eficiente em apenas 3 passos
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <!-- Step 1 -->
        <div class="relative text-center group">
          <div
            class="bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-xl group-hover:scale-110 transition-transform"
          >
            1
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Digite Seu Salário
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            Insira o valor do seu salário mensal no campo de entrada
          </p>
        </div>

        <!-- Step 2 -->
        <div class="relative text-center group">
          <div
            class="bg-gradient-to-br from-green-500 to-emerald-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-xl group-hover:scale-110 transition-transform"
          >
            2
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Clique em Calcular
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            Aperte o botão e deixe a mágica acontecer
          </p>
        </div>

        <!-- Step 3 -->
        <div class="relative text-center group">
          <div
            class="bg-gradient-to-br from-purple-500 to-pink-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-xl group-hover:scale-110 transition-transform"
          >
            3
          </div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Veja os Resultados
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            Obtenha instantaneamente todos os valores calculados
          </p>
        </div>

        <!-- Connecting Lines (Desktop) -->
        <div
          class="hidden md:block absolute top-10 left-1/4 right-1/4 border-t-4 border-dashed border-gray-300 dark:border-gray-600"
        ></div>
        <div
          class="hidden md:block absolute top-10 left-1/2 right-8 border-t-4 border-dashed border-gray-300 dark:border-gray-600"
        ></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HowItWorksSection",
};
</script>
