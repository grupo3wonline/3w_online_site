<script setup lang="ts">
import SimpleGenerator from '@/components/tools/SimpleGenerator.vue'
import { generateRG } from '@/lib/brazil-generators'
</script>

<template>
  <SimpleGenerator
    slug="gerador-rg"
    :generate="generateRG"
    format-option
    example="12.345.678-9"
    tip="O formato do RG varia por estado. Aqui geramos um padrão genérico de 9 dígitos para testes."
  />
</template>
