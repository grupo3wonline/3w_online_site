<script setup lang="ts">
import ValidatorLayout from '@/components/tools/ValidatorLayout.vue'
import { validateCreditCard } from '@/lib/validators'
</script>

<template>
  <ValidatorLayout
    slug="validador-cartao-credito"
    placeholder="0000 0000 0000 0000"
    mask="#### #### #### ####"
    :validate="validateCreditCard"
    example="4111 1111 1111 1111"
    tip="Validação pelo algoritmo Luhn (não verifica se o cartão existe de fato)."
  />
</template>
