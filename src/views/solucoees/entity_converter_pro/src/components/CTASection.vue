<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="py-16 md:py-24 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-white relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
    </div>
    
    <div class="max-w-6xl mx-auto px-4 text-center relative z-10">
      <!-- Badge -->
      <div class="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur text-yellow-300 text-sm font-bold px-4 py-2 rounded-full mb-6">
        <i class="fas fa-lightbulb"></i>
        <span>Dica de Mestre</span>
      </div>
      
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        Mantenha a Consistência no Seu Código!
      </h2>
      
      <p class="text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto text-gray-300">
        Não perca mais tempo com erros de encoding. <strong class="text-yellow-300">Aumente sua produtividade</strong> 
        usando HTML Entities em todos os seus projetos.
      </p>
      
      <!-- CTAs -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <a 
          href="#ferramenta" 
          class="cta-button bg-yellow-400 text-gray-900 hover:bg-yellow-300 text-lg"
        >
          <i class="fas fa-terminal mr-2"></i> Começar a Codificar com Confiança
        </a>
        <RouterLink 
          to="/contato"
          class="cta-button bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900"
        >
          <i class="fas fa-rocket mr-2"></i> Precisa de um Sistema?
        </RouterLink>
      </div>
      
      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div class="bg-white/10 backdrop-blur rounded-xl p-4">
          <div class="text-3xl font-bold text-yellow-400">80%</div>
          <div class="text-sm text-gray-400">Menos bugs</div>
        </div>
        <div class="bg-white/10 backdrop-blur rounded-xl p-4">
          <div class="text-3xl font-bold text-green-400">100%</div>
          <div class="text-sm text-gray-400">Gratuito</div>
        </div>
        <div class="bg-white/10 backdrop-blur rounded-xl p-4">
          <div class="text-3xl font-bold text-blue-400">+100</div>
          <div class="text-sm text-gray-400">Caracteres</div>
        </div>
        <div class="bg-white/10 backdrop-blur rounded-xl p-4">
          <div class="text-3xl font-bold text-purple-400">0</div>
          <div class="text-sm text-gray-400">Dados coletados</div>
        </div>
      </div>
    </div>
  </section>
</template>
