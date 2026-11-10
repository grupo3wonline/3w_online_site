<script setup lang="ts">
import SimpleGenerator from '@/components/tools/SimpleGenerator.vue'
import { generateCNH } from '@/lib/brazil-generators'
</script>

<template>
  <SimpleGenerator
    slug="gerador-cnh"
    :generate="() => generateCNH()"
    example="12345678901"
    tip="Número de CNH com 11 dígitos para preenchimento de formulários de teste."
  />
</template>
