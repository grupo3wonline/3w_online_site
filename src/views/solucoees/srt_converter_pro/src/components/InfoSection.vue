<template>
  <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
    <div 
      v-for="(info, index) in infoCards" 
      :key="info.title"
      class="text-center transform hover:scale-105 transition-all duration-300"
      :class="`animate-slide-up delay-${index * 200}`"
    >
      <div class="text-4xl mb-4 animate-bounce" :style="{ 'animation-delay': `${index * 0.2}s` }">
        {{ info.icon }}
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ info.title }}</h3>
      <p class="text-gray-600 leading-relaxed">{{ info.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const infoCards = [
  {
    icon: '⚡',
    title: 'Rápido e Eficiente',
    description: 'Conversão instantânea com formatação automática. Algoritmos otimizados para melhor performance.'
  },
  {
    icon: '🎯',
    title: 'Precisão Profissional',
    description: 'Timing perfeito para seus vídeos. Cada legenda é posicionada no momento exato do áudio.'
  },
  {
    icon: '🔒',
    title: '100% Seguro',
    description: 'Processamento local no seu navegador. Seus dados nunca são enviados para servidores externos.'
  }
]
</script>