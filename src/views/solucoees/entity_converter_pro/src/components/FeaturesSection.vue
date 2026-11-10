<script setup>
const features = [
  {
    icon: 'fas fa-bolt',
    color: 'blue',
    title: 'Conversão Instantânea',
    description: 'Converta textos com centenas de caracteres em milissegundos. Nossa engine é otimizada para máxima performance.'
  },
  {
    icon: 'fas fa-table',
    color: 'green',
    title: '+100 Caracteres',
    description: 'Tabela completa com acentos (á, é, ç), símbolos (€, ©, ™) e caracteres especiais HTML (<, >, &).'
  },
  {
    icon: 'fas fa-search',
    color: 'purple',
    title: 'Busca Inteligente',
    description: 'Encontre qualquer caractere na tabela de referência. Pesquise por nome, código ou símbolo.'
  },
  {
    icon: 'fas fa-shield-alt',
    color: 'yellow',
    title: '100% Seguro (LGPD)',
    description: 'Processamento 100% client-side. Seu texto nunca sai do seu navegador. Conformidade total com a LGPD.'
  },
  {
    icon: 'fas fa-mobile-alt',
    color: 'pink',
    title: 'Mobile First',
    description: 'Interface totalmente responsiva. Use em qualquer dispositivo: desktop, tablet ou smartphone.'
  },
  {
    icon: 'fas fa-moon',
    color: 'indigo',
    title: 'Modo Escuro',
    description: 'Alterne entre tema claro e escuro para maior conforto visual durante longas sessões de trabalho.'
  }
]

const colorClasses = {
  blue: { bg: 'bg-blue-100 dark:bg-blue-900', icon: 'text-blue-600 dark:text-blue-400' },
  green: { bg: 'bg-green-100 dark:bg-green-900', icon: 'text-green-600 dark:text-green-400' },
  purple: { bg: 'bg-purple-100 dark:bg-purple-900', icon: 'text-purple-600 dark:text-purple-400' },
  yellow: { bg: 'bg-yellow-100 dark:bg-yellow-900', icon: 'text-yellow-600 dark:text-yellow-400' },
  pink: { bg: 'bg-pink-100 dark:bg-pink-900', icon: 'text-pink-600 dark:text-pink-400' },
  indigo: { bg: 'bg-indigo-100 dark:bg-indigo-900', icon: 'text-indigo-600 dark:text-indigo-400' }
}
</script>

<template>
  <section class="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-12">
        <span class="inline-block bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm font-semibold px-4 py-1 rounded-full mb-4">
          <i class="fas fa-star mr-2"></i> Funcionalidades
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Tudo que Você Precisa em Uma Ferramenta
        </h2>
        <p class="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Desenvolvida por especialistas para atender todas as suas necessidades de conversão de caracteres
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div 
          v-for="feature in features" 
          :key="feature.title"
          class="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
        >
          <div :class="[colorClasses[feature.color].bg, 'w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform']">
            <i :class="[feature.icon, colorClasses[feature.color].icon, 'text-2xl']"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {{ feature.title }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            {{ feature.description }}
          </p>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-12">
        <a 
          href="#ferramenta"
          class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
        >
          <i class="fas fa-rocket"></i>
          Experimentar Agora
        </a>
      </div>
    </div>
  </section>
</template>
