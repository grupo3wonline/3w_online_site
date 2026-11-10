<script setup lang="ts">
// NotFoundPage.vue - Página 404

function goBack() {
  window.history.back()
}
</script>

<template>
  <div class="min-h-[70vh] flex items-center justify-center">
    <div class="container-max">
      <div class="text-center max-w-lg mx-auto animate-fade-in-up">
        <!-- 404 Visual -->
        <div class="relative inline-block mb-8">
          <span class="text-[120px] md:text-[160px] font-bold text-gradient leading-none select-none">
            404
          </span>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <i class="fa-solid fa-magnifying-glass text-2xl md:text-3xl text-primary"></i>
            </div>
          </div>
        </div>

        <!-- Content -->
        <h1 class="text-2xl md:text-3xl font-bold mb-4">
          Página Não Encontrada
        </h1>

        <p class="text-muted-foreground mb-8 max-w-md mx-auto">
          A página que você está procurando não existe, foi removida ou está temporariamente
          indisponível. Verifique o endereço ou volte à página inicial.
        </p>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <router-link
            to="/"
            class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-hero text-primary-foreground btn-glow transition-all duration-300 hover:scale-105"
          >
            <i class="fa-solid fa-house"></i>
            Voltar ao Início
          </router-link>

          <router-link
            to="/ferramenta"
            class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border border-border/50 text-foreground hover:bg-muted/50 transition-all duration-300"
          >
            <i class="fa-solid fa-calculator"></i>
            Usar Calculadora
          </router-link>
        </div>

        <!-- Back Link -->
        <button
          type="button"
          class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          @click="goBack"
        >
          <i class="fa-solid fa-arrow-left"></i>
          Voltar à página anterior
        </button>
      </div>
    </div>
  </div>
</template>
