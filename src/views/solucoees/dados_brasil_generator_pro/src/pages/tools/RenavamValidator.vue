<script setup lang="ts">
import ValidatorLayout from '@/components/tools/ValidatorLayout.vue'
import { validateRenavam } from '@/lib/validators'
</script>

<template>
  <ValidatorLayout
    slug="validador-renavam"
    placeholder="00000000000"
    mask="###########"
    :validate="validateRenavam"
    example="12345678900"
    tip="Confere o dígito verificador do RENAVAM (11 dígitos)."
  />
</template>
