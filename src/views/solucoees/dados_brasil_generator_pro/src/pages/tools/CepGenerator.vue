<script setup lang="ts">
import SimpleGenerator from '@/components/tools/SimpleGenerator.vue'
import { generateCEP } from '@/lib/brazil-generators'
</script>

<template>
  <SimpleGenerator
    slug="gerador-cep"
    :generate="generateCEP"
    format-option
    example="01001-000"
    tip="CEP simulado (8 dígitos). Para endereços reais, consulte a base dos Correios."
  />
</template>
