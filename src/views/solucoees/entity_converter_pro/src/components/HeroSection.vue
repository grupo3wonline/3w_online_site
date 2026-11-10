<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="hero-gradient text-white pt-8 pb-16 md:pt-16 md:pb-24 rounded-b-3xl shadow-2xl overflow-hidden relative">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
    </div>
    
    <div class="max-w-6xl mx-auto px-4 text-center relative z-10">
      <!-- Badge de Urgência (Princípio de Escassez - Cialdini) -->
      <div class="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 text-sm font-bold px-4 py-2 rounded-full mb-6 animate-pulse">
        <i class="fas fa-gift"></i>
        <span>100% Gratuito • Sem Cadastro • Acesso Imediato</span>
      </div>
      
      <!-- Subtitle com Autoridade -->
      <p class="text-blue-200 uppercase tracking-widest font-semibold mb-3">
        <i class="fas fa-rocket mr-2"></i> Performance Imediata. Zero Custo.
      </p>
      
      <!-- Main Headline (Princípio 80/20 - Pareto) -->
      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
        Elimine <span class="text-yellow-300">80%</span> dos Bugs de Codificação<br class="hidden md:inline">
        com <span class="text-yellow-300">20%</span> do Esforço
      </h1>
      
      <!-- Subheadline com Prova Social -->
      <p class="text-lg md:text-xl lg:text-2xl font-light mb-8 max-w-3xl mx-auto opacity-90">
        O conversor de Entities HTML que garante compatibilidade global e segurança de código. 
        <strong class="text-yellow-300">Mais de 10.000 desenvolvedores</strong> já confiam nesta ferramenta.
      </p>

      <!-- CTAs -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <a 
          href="#ferramenta"
          class="cta-button bg-yellow-400 text-gray-900 hover:bg-yellow-300 text-lg"
        >
          <i class="fas fa-magic mr-2"></i> Usar a Ferramenta Agora
        </a>
        <RouterLink 
          to="/sobre"
          class="cta-button bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700"
        >
          <i class="fas fa-info-circle mr-2"></i> Saiba Mais
        </RouterLink>
      </div>
      
      <!-- Trust Badges -->
      <div class="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-sm">
        <span class="flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-2 rounded-full" title="Mais de 100 caracteres suportados">
          <i class="fas fa-check-circle text-green-400"></i> +100 caracteres
        </span>
        <span class="flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-2 rounded-full" title="Sem necessidade de cadastro">
          <i class="fas fa-check-circle text-green-400"></i> Sem cadastro
        </span>
        <span class="flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-2 rounded-full" title="Processamento 100% seguro no seu navegador">
          <i class="fas fa-check-circle text-green-400"></i> 100% Seguro
        </span>
        <span class="flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-2 rounded-full" title="Em conformidade com a LGPD">
          <i class="fas fa-shield-alt text-green-400"></i> LGPD
        </span>
      </div>
    </div>
  </header>
</template>
