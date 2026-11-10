<template>
  <div
    class="flex min-h-[70vh] items-center justify-center bg-gradient-to-br from-bbq-warm via-background to-bbq-warm/50 dark:from-background dark:via-background dark:to-background"
  >
    <div class="container mx-auto px-4 text-center">
      <div class="mx-auto max-w-md">
        <div class="mb-4 flex items-center justify-center gap-2">
          <span class="text-8xl font-extrabold text-gradient">4</span>
          <i class="fa-solid fa-fire-burner text-6xl text-bbq-orange"></i>
          <span class="text-8xl font-extrabold text-gradient">4</span>
        </div>
        <h1 class="mb-4 text-3xl font-bold text-foreground">Página não encontrada</h1>
        <p class="mb-8 text-lg text-muted-foreground">
          Parece que essa brasa apagou. A página que você procura não existe ou foi movida.
        </p>
        <div class="flex flex-col justify-center gap-4 sm:flex-row">
          <router-link
            to="/"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-bbq-orange to-bbq-red px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
          >
            <i class="fa-solid fa-house"></i> Voltar ao início
          </router-link>
          <router-link
            to="/calculadora"
            class="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 font-semibold transition-all hover:bg-muted"
          >
            <i class="fa-solid fa-calculator"></i> Ir para a calculadora
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
