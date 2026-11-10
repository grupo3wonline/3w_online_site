<script setup lang="ts">
import ErrorState from './ErrorState.vue'
</script>

<template>
  <ErrorState
    code="500"
    title="Erro interno do servidor"
    message="Algo deu errado do nosso lado. Nossa equipe foi notificada. Tente novamente em alguns instantes."
    icon="fa6-solid:triangle-exclamation"
    accent="bg-gradient-to-br from-red-500 to-rose-600"
  />
</template>
