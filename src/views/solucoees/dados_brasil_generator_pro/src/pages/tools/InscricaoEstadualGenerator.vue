<script setup lang="ts">
import SimpleGenerator from '@/components/tools/SimpleGenerator.vue'
import { generateIE } from '@/lib/brazil-generators'
</script>

<template>
  <SimpleGenerator
    slug="gerador-inscricao-estadual"
    :generate="(formatted) => generateIE('SP', formatted)"
    format-option
    example="110.042.490.114"
    tip="Inscrição Estadual simulada (padrão de tamanho SP). O cálculo real varia por UF."
  />
</template>
