<script setup lang="ts">
import ErrorState from '@/components/common/ErrorState.vue'
import { useHead } from '@/composables/useHead'

useHead({ title: 'Erro interno', path: '/500', noindex: true })
</script>

<template>
  <ErrorState
    code="500"
    title="Erro interno do servidor"
    message="Algo deu errado do nosso lado. Tente novamente em instantes."
    icon="lucide:server-crash"
  />
</template>
