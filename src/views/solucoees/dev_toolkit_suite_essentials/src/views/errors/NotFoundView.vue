<script setup lang="ts">
import ErrorState from '@/components/common/ErrorState.vue'
</script>

<template>
  <ErrorState
    code="404"
    title="Página não encontrada"
    message="A página que você procura não existe ou foi movida. Verifique o endereço ou volte ao início."
    icon="lucide:compass"
  />
</template>
