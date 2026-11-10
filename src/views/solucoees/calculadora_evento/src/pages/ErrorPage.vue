<script setup lang="ts">
// ErrorPage.vue - Página de erro genérico (falhas de runtime/carregamento)
function reload() {
  window.location.reload()
}
</script>

<template>
  <div class="min-h-[70vh] flex items-center justify-center">
    <div class="container-max">
      <div class="text-center max-w-lg mx-auto animate-fade-in-up">
        <div class="relative inline-block mb-8">
          <div
            class="w-24 h-24 md:w-28 md:h-28 rounded-full bg-destructive/10 flex items-center justify-center mx-auto"
          >
            <i class="fa-solid fa-triangle-exclamation text-4xl md:text-5xl text-destructive"></i>
          </div>
        </div>

        <h1 class="text-2xl md:text-3xl font-bold mb-4">Algo deu errado</h1>

        <p class="text-muted-foreground mb-8 max-w-md mx-auto">
          Encontramos um problema inesperado ao carregar esta parte da aplicação. Isso pode ocorrer
          após uma atualização do site. Recarregar a página costuma resolver.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-hero text-primary-foreground btn-glow transition-all duration-300 hover:scale-105"
            @click="reload"
          >
            <i class="fa-solid fa-rotate-right"></i>
            Recarregar Página
          </button>

          <router-link
            to="/"
            class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border border-border/50 text-foreground hover:bg-muted/50 transition-all duration-300"
          >
            <i class="fa-solid fa-house"></i>
            Voltar ao Início
          </router-link>
        </div>

        <a
          href="https://wa.me/5541996924829?text=Ol%C3%A1%2C%20encontrei%20um%20erro%20no%20EventCalc."
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <i class="fa-brands fa-whatsapp"></i>
          O problema persiste? Fale conosco
        </a>
      </div>
    </div>
  </div>
</template>
