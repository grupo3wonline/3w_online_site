<script setup lang="ts">
import SimpleGenerator from '@/components/tools/SimpleGenerator.vue'
import { generatePIS } from '@/lib/brazil-generators'
</script>

<template>
  <SimpleGenerator
    slug="gerador-pis"
    :generate="generatePIS"
    format-option
    example="123.45678.90-1"
    tip="PIS/PASEP com dígito verificador calculado por mod11."
  />
</template>
