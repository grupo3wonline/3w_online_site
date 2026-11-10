<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-16 md:py-20 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Hero Section -->
      <div class="text-center mb-16 md:mb-20 animate-fadeIn">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold mb-6"
        >
          <i class="fas fa-info-circle"></i>
          <span>Sobre o InvestSim</span>
        </div>
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Planejamento Financeiro
          <span
            class="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent block mt-2"
          >
            Ao Alcance de Todos
          </span>
        </h1>
        <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Uma plataforma completa de simulação de investimentos, desenvolvida
          para tornar o planejamento financeiro acessível, visual e intuitivo
          para todos os brasileiros.
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-20">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center animate-slideUp"
        >
          <div
            class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent mb-2"
          >
            {{ stat.value }}
          </div>
          <div class="text-xs md:text-sm text-gray-600 dark:text-gray-400">
            {{ stat.label }}
          </div>
        </div>
      </div>

      <!-- Funcionalidades do Simulador -->
      <div class="mb-16 md:mb-20">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            <i class="fas fa-gem text-primary-600"></i>
            Funcionalidades Premium
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            Tudo que você precisa para planejar seu futuro financeiro
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BaseCard
            v-for="feature in features"
            :key="feature.title"
            class="p-6 hover:shadow-2xl transition-shadow duration-300 group"
          >
            <div
              class="w-14 h-14 bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
            >
              <i :class="`${feature.icon} text-2xl text-white`"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ feature.description }}
            </p>
          </BaseCard>
        </div>
      </div>

      <!-- Tech Stack -->
      <div class="text-center mb-20">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Tecnologias Utilizadas
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-12">
          Desenvolvido com as melhores ferramentas do mercado
        </p>

        <div class="flex flex-wrap justify-center gap-4">
          <BaseBadge
            v-for="tech in techStack"
            :key="tech"
            variant="primary"
            size="lg"
          >
            {{ tech }}
          </BaseBadge>
        </div>
      </div>

      <!-- CTA Section -->
      <div
        class="bg-gradient-to-r from-primary-600 to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl"
      >
        <h2 class="text-4xl font-bold mb-4">Pronto para Começar?</h2>
        <p class="text-xl mb-8 opacity-90">
          Faça sua primeira simulação agora e descubra o potencial dos seus
          investimentos
        </p>
        <router-link to="/simulador">
          <BaseButton
            variant="secondary"
            size="lg"
            class="shadow-xl hover:scale-105 transition-transform"
          >
            Simular Agora
            <template #right>
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
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </template>
          </BaseButton>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useSEO } from "@/composables/useSEO";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseBadge from "@/components/ui/BaseBadge.vue";

const { setSEO } = useSEO();

onMounted(() => {
  setSEO({
    title: "Sobre Nós | InvestSim",
    description:
      "Conheça a InvestSim, plataforma de simulação de investimentos com tecnologia de ponta. Democratizando o planejamento financeiro.",
    keywords:
      "sobre investsim, plataforma investimentos, tecnologia financeira, simulador",
  });
});

const stats = [
  { value: "10K+", label: "Simulações" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9/5", label: "Avaliação" },
  { value: "24/7", label: "Disponível" },
];

const features = [
  {
    title: "Simulação Avançada",
    description:
      "Algoritmos precisos que calculam o crescimento do seu investimento com juros compostos reais.",
    icon: "fas fa-calculator",
  },
  {
    title: "Visualização Gráfica",
    description:
      "Gráficos interativos com Chart.js para visualizar a evolução e composição do seu patrimônio.",
    icon: "fas fa-chart-line",
  },
  {
    title: "Relatórios em PDF",
    description:
      "Exporte suas simulações em PDF profissional para compartilhar ou guardar para referência.",
    icon: "fas fa-file-pdf",
  },
  {
    title: "Design Responsivo",
    description:
      "Interface moderna que funciona perfeitamente em desktop, tablet e smartphone.",
    icon: "fas fa-mobile-alt",
  },
  {
    title: "Dark Mode",
    description:
      "Alternância entre tema claro e escuro para conforto visual em qualquer ambiente.",
    icon: "fas fa-moon",
  },
  {
    title: "Performance",
    description:
      "Carregamento ultra-rápido com otimizações de código, lazy loading e compressão.",
    icon: "fas fa-rocket",
  },
];

const steps = [
  {
    title: "Defina Valores",
    description: "Informe o montante inicial e aportes mensais",
  },
  {
    title: "Escolha o Prazo",
    description: "Selecione o tempo de investimento em anos",
  },
  { title: "Simule", description: "Clique em simular e veja os resultados" },
  { title: "Analise", description: "Visualize gráficos e exporte em PDF" },
];

const techStack = [
  "Vue.js 3",
  "Vite",
  "Tailwind CSS",
  "Chart.js",
  "Vue Router",
  "Composition API",
  "jsPDF",
  "SweetAlert2",
  "HeadlessUI",
  "Heroicons",
];
</script>
