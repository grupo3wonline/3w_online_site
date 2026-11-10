<script setup lang="ts">
import AppHeader from "./AppHeader.vue";
import AppFooter from "./AppFooter.vue";
import Breadcrumb from "./Breadcrumb.vue";
</script>

<template>
  <div class="flex min-h-screen flex-col bg-background text-foreground">
    <a href="#conteudo-principal" class="skip-link">Pular para o conteúdo</a>
    <AppHeader />
    <Breadcrumb />
    <main id="conteudo-principal" class="w-full flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
