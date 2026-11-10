<script setup lang="ts">
import SimpleGenerator from '@/components/tools/SimpleGenerator.vue'
import { generateRenavam } from '@/lib/brazil-generators'
</script>

<template>
  <SimpleGenerator
    slug="gerador-renavam"
    :generate="() => generateRenavam()"
    example="12345678901"
    tip="RENAVAM com 11 dígitos e dígito verificador para testes de sistemas de veículos."
  />
</template>
