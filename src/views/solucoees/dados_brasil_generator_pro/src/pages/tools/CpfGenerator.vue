<script setup lang="ts">
import SimpleGenerator from '@/components/tools/SimpleGenerator.vue'
import { generateCPF } from '@/lib/brazil-generators'
</script>

<template>
  <SimpleGenerator
    slug="gerador-cpf"
    :generate="generateCPF"
    format-option
    example="123.456.789-09"
    tip="O CPF é validado pelo algoritmo mod11. Use com ou sem pontuação conforme o seu sistema de testes exigir."
  />
</template>
