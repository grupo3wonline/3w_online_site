<script setup lang="ts">
import ValidatorLayout from '@/components/tools/ValidatorLayout.vue'
import { validatePIS } from '@/lib/validators'
</script>

<template>
  <ValidatorLayout
    slug="validador-pis"
    placeholder="000.00000.00-0"
    mask="###.#####.##-#"
    :validate="validatePIS"
    example="120.12345.67-8"
    tip="Confere o dígito verificador do PIS/PASEP."
  />
</template>
