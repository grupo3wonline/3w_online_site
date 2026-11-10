<template>
  <section
    id="recursos"
    class="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 animate-fade-in">
        <span
          class="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-semibold mb-4"
        >
          ⚡ Recursos Poderosos
        </span>
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
        >
          Tudo Que Você Precisa
          <span class="block text-primary-600 dark:text-primary-400"
            >Para Sua Saúde</span
          >
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Ferramentas completas baseadas em padrões científicos reconhecidos
          mundialmente
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(feature, index) in features"
          :key="feature.title"
          class="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div
            :class="`w-14 h-14 ${feature.colorBg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`"
          >
            <component
              :is="feature.icon"
              :class="`w-7 h-7 ${feature.colorText}`"
            />
          </div>

          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
            {{ feature.title }}
          </h3>

          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ feature.description }}
          </p>

          <div
            class="mt-4 flex items-center text-primary-600 dark:text-primary-400 font-semibold text-sm group-hover:translate-x-2 transition-transform"
          >
            <span>Saiba mais</span>
            <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { h } from "vue";

const features = [
  {
    title: "Índice de Massa Corporal (IMC)",
    description:
      "Calcule e classifique seu IMC de acordo com os padrões da OMS. Entenda se você está no peso ideal.",
    icon: () =>
      h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
        }),
      ]),
    colorBg: "bg-primary-100 dark:bg-primary-900/30",
    colorText: "text-primary-600 dark:text-primary-400",
  },
  {
    title: "Metabolismo Basal (TMB)",
    description:
      "Descubra quantas calorias seu corpo queima em repouso usando a equação de Mifflin-St Jeor.",
    icon: () =>
      h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M13 10V3L4 14h7v7l9-11h-7z",
        }),
      ]),
    colorBg: "bg-green-100 dark:bg-green-900/30",
    colorText: "text-green-600 dark:text-green-400",
  },
  {
    title: "Calorias Diárias",
    description:
      "Calcule suas necessidades calóricas baseadas no seu nível de atividade física diária.",
    icon: () =>
      h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707",
        }),
      ]),
    colorBg: "bg-yellow-100 dark:bg-yellow-900/30",
    colorText: "text-yellow-600 dark:text-yellow-400",
  },
  {
    title: "Peso Ideal",
    description:
      "Determine seu peso ideal usando fórmulas científicas reconhecidas como a de Devine.",
    icon: () =>
      h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
        }),
      ]),
    colorBg: "bg-purple-100 dark:bg-purple-900/30",
    colorText: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Necessidades Nutricionais",
    description:
      "Calcule suas necessidades de proteínas, carboidratos, gorduras e água de forma personalizada.",
    icon: () =>
      h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
        }),
      ]),
    colorBg: "bg-blue-100 dark:bg-blue-900/30",
    colorText: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Gasto Calórico",
    description:
      "Estime o gasto calórico de diferentes tipos de exercícios físicos e atividades.",
    icon: () =>
      h("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
        }),
      ]),
    colorBg: "bg-red-100 dark:bg-red-900/30",
    colorText: "text-red-600 dark:text-red-400",
  },
];
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
  opacity: 0;
}
</style>
