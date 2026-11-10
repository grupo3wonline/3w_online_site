<script setup lang="ts">
import ErrorState from "@/components/errors/ErrorState.vue";
import { useSeo } from "@/composables/useSeo";

useSeo(() => ({
  title: "Erro interno (500)",
  description: "Ocorreu um erro inesperado no servidor.",
  path: "/500",
  robots: "noindex, nofollow",
}));
</script>

<template>
  <ErrorState
    code="500"
    title="Erro interno"
    message="Algo saiu do esperado. Nossa equipe já foi notificada. Tente novamente em instantes."
    icon="lucide:server-crash"
  />
</template>
