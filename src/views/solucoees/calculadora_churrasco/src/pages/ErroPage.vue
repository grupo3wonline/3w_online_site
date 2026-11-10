<template>
  <div
    class="flex min-h-[70vh] items-center justify-center bg-gradient-to-br from-bbq-warm via-background to-bbq-warm/50 dark:from-background dark:via-background dark:to-background"
  >
    <div class="container mx-auto px-4 text-center">
      <div class="mx-auto max-w-md">
        <div class="mb-4 flex justify-center">
          <div class="flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10">
            <i class="fa-solid fa-triangle-exclamation text-5xl text-destructive"></i>
          </div>
        </div>
        <h1 class="mb-4 text-3xl font-bold text-foreground">Ops! Algo deu errado</h1>
        <p class="mb-8 text-lg text-muted-foreground">
          Ocorreu um erro inesperado. Tente recarregar a página ou volte ao início.
        </p>
        <div class="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-bbq-orange to-bbq-red px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
            @click="recarregar"
          >
            <i class="fa-solid fa-rotate-right"></i> Recarregar
          </button>
          <router-link
            to="/"
            class="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 font-semibold transition-all hover:bg-muted"
          >
            <i class="fa-solid fa-house"></i> Voltar ao início
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
function recarregar() {
  window.location.reload()
}
</script>
