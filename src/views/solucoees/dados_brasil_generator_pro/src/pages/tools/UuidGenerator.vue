<script setup lang="ts">
import SimpleGenerator from '@/components/tools/SimpleGenerator.vue'
import { generateUUID } from '@/lib/dev-tools'
</script>

<template>
  <SimpleGenerator
    slug="uuid-generator"
    :generate="() => generateUUID()"
    example="3f2504e0-4f89-41d3-9a0c-0305e82c3301"
    tip="UUID v4 gerado com o gerador criptográfico do navegador (crypto)."
  />
</template>
