<script setup lang="ts">
import ErrorLayout from '@/components/common/ErrorLayout.vue'
</script>

<template>
  <ErrorLayout
    code="403"
    icon="lucide:lock"
    title="Acesso negado"
    message="Você não tem permissão para acessar este recurso."
  />
</template>
