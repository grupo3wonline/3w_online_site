<script setup lang="ts">
import ErrorState from './ErrorState.vue'
</script>

<template>
  <ErrorState
    code="404"
    title="Página não encontrada"
    message="A página que você procura não existe, foi movida ou o endereço está incorreto. Que tal voltar ao início?"
    icon="fa6-solid:compass"
  />
</template>
