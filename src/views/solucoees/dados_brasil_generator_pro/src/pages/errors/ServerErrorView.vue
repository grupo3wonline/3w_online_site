<script setup lang="ts">
import ErrorLayout from '@/components/common/ErrorLayout.vue'
</script>

<template>
  <ErrorLayout
    code="500"
    icon="lucide:server-crash"
    title="Erro interno"
    message="Algo deu errado do nosso lado. Tente novamente em instantes."
  />
</template>
