<template>
  <div class="bg-slate-50 dark:bg-slate-900 min-h-screen flex items-center justify-center px-4">
    <div class="text-center max-w-lg animate-fade-in">
      <!-- Illustration -->
      <div class="mb-8 relative">
        <div class="absolute inset-0 flex items-center justify-center opacity-10" aria-hidden="true">
          <div class="w-64 h-64 bg-primary-300 rounded-full blur-3xl"></div>
        </div>
        <div class="relative">
          <span class="text-[120px] md:text-[160px] font-extrabold gradient-text leading-none">404</span>
        </div>
      </div>

      <!-- Content -->
      <h1 class="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-4">
        Página não encontrada
      </h1>
      <p class="text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
        A página que você está procurando não existe, foi movida ou está temporariamente indisponível.
      </p>
      <p class="text-sm text-slate-500 dark:text-slate-400 mb-8">
        <i class="fa-solid fa-lightbulb text-amber-500 mr-1"></i>
        Dica: verifique o endereço digitado ou navegue pelo menu acima.
      </p>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <router-link to="/" class="btn-primary w-full sm:w-auto">
          <i class="fa-solid fa-house"></i> Voltar ao Início
        </router-link>
        <router-link to="/ferramenta" class="btn-secondary w-full sm:w-auto">
          <i class="fa-solid fa-chart-bar"></i> Ir para Ferramenta
        </router-link>
      </div>

      <!-- Help text -->
      <p class="mt-8 text-xs text-slate-400 dark:text-slate-500">
        Se o problema persistir, entre em 
        <router-link to="/contato" class="text-primary-500 hover:text-primary-600 underline">contato conosco</router-link>.
      </p>
    </div>
  </div>
</template>
