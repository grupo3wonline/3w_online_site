<script setup lang="ts">
import ErrorState from './ErrorState.vue'
</script>

<template>
  <ErrorState
    code="403"
    title="Acesso negado"
    message="Você não tem permissão para acessar este recurso. Se acredita que isso é um engano, entre em contato conosco."
    icon="fa6-solid:lock"
    accent="bg-gradient-to-br from-amber-500 to-orange-600"
  />
</template>
