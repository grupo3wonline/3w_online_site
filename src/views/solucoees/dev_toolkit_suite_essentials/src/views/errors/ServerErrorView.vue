<script setup lang="ts">
import ErrorState from '@/components/common/ErrorState.vue'
</script>

<template>
  <ErrorState
    code="500"
    title="Erro interno"
    message="Algo deu errado do nosso lado. Tente novamente em instantes."
    icon="lucide:server-crash"
  />
</template>
