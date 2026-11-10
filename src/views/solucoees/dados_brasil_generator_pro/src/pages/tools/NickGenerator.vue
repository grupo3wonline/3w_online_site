<script setup lang="ts">
import SimpleGenerator from '@/components/tools/SimpleGenerator.vue'
import { generateNick } from '@/lib/brazil-generators'
</script>

<template>
  <SimpleGenerator
    slug="gerador-nicks"
    :generate="() => generateNick()"
    example="CyberNinja42"
    tip="Combine e gere vários nicks até encontrar o ideal para seu jogo ou rede social."
  />
</template>
