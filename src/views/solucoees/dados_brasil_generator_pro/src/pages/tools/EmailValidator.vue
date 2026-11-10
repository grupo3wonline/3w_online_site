<script setup lang="ts">
import ValidatorLayout from '@/components/tools/ValidatorLayout.vue'
import { validateEmail } from '@/lib/validators'
</script>

<template>
  <ValidatorLayout
    slug="validador-email"
    placeholder="nome@dominio.com.br"
    :validate="validateEmail"
    example="contato@3wonline.com.br"
    tip="Verifica se o e-mail está em formato válido (não confirma se a caixa existe)."
  />
</template>
