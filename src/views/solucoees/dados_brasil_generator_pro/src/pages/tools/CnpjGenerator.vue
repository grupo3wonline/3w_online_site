<script setup lang="ts">
import SimpleGenerator from '@/components/tools/SimpleGenerator.vue'
import { generateCNPJ } from '@/lib/brazil-generators'
</script>

<template>
  <SimpleGenerator
    slug="gerador-cnpj"
    :generate="generateCNPJ"
    format-option
    example="12.345.678/0001-95"
    tip="CNPJ gerado com filial 0001 e dígitos verificadores válidos. Ideal para cadastros de teste de empresas."
  />
</template>
