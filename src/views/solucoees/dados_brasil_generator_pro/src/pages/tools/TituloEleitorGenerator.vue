<script setup lang="ts">
import SimpleGenerator from '@/components/tools/SimpleGenerator.vue'
import { generateTituloEleitor } from '@/lib/brazil-generators'
</script>

<template>
  <SimpleGenerator
    slug="gerador-titulo-eleitor"
    :generate="() => generateTituloEleitor()"
    example="123456789012"
    tip="Número de título eleitoral com 12 dígitos para preenchimento de formulários."
  />
</template>
