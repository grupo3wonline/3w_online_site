<script setup lang="ts">
import ErrorState from '@/components/common/ErrorState.vue'
import { useHead } from '@/composables/useHead'

useHead({ title: 'Acesso negado', path: '/403', noindex: true })
</script>

<template>
  <ErrorState
    code="403"
    title="Acesso negado"
    message="Você não tem permissão para acessar este recurso."
    icon="lucide:shield-x"
  />
</template>
