<script setup lang="ts">
import ErrorState from '@/components/common/ErrorState.vue'
</script>

<template>
  <ErrorState
    code="403"
    title="Acesso negado"
    message="Você não tem permissão para acessar este recurso."
    icon="lucide:lock"
  />
</template>
