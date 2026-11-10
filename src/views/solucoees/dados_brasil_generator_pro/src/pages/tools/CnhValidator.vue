<script setup lang="ts">
import ValidatorLayout from '@/components/tools/ValidatorLayout.vue'
import { validateCNH } from '@/lib/validators'
</script>

<template>
  <ValidatorLayout
    slug="validador-cnh"
    placeholder="00000000000"
    mask="###########"
    :validate="validateCNH"
    example="12345678901"
    tip="Confere a estrutura de 11 dígitos da CNH."
  />
</template>
