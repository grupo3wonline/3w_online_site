<script setup lang="ts">
import ErrorState from "@/components/errors/ErrorState.vue";
import { useSeo } from "@/composables/useSeo";

useSeo(() => ({
  title: "Acesso negado (403)",
  description: "Você não tem permissão para acessar este recurso.",
  path: "/403",
  robots: "noindex, nofollow",
}));
</script>

<template>
  <ErrorState
    code="403"
    title="Acesso negado"
    message="Você não tem permissão para acessar este recurso. Se acredita que isto é um engano, entre em contato conosco."
    icon="lucide:shield-alert"
  />
</template>
