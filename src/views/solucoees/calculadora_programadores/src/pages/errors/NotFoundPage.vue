<script setup lang="ts">
import ErrorState from "@/components/errors/ErrorState.vue";
import { useSeo } from "@/composables/useSeo";

useSeo(() => ({
  title: "Página não encontrada (404)",
  description: "A página que você procura não foi encontrada.",
  path: "/404",
  robots: "noindex, follow",
}));
</script>

<template>
  <ErrorState
    code="404"
    title="Página não encontrada"
    message="O endereço que você tentou acessar não existe ou foi movido. Verifique o link ou volte ao início."
    icon="lucide:map-pin-off"
  />
</template>
