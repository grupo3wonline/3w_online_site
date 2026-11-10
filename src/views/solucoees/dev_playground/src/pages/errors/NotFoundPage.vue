<script setup lang="ts">
import ErrorState from '@/components/common/ErrorState.vue'
import { useHead } from '@/composables/useHead'

useHead({ title: 'Página não encontrada', path: '/404', noindex: true })
</script>

<template>
  <ErrorState
    code="404"
    title="Página não encontrada"
    message="Desculpe, a página que você procura não existe ou foi movida."
    icon="lucide:map-pin-off"
  />
</template>
