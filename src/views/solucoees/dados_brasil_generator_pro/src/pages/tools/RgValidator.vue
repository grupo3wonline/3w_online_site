<script setup lang="ts">
import ValidatorLayout from '@/components/tools/ValidatorLayout.vue'
import { validateRG } from '@/lib/validators'
</script>

<template>
  <ValidatorLayout
    slug="validador-rg"
    placeholder="00.000.000-0"
    :validate="validateRG"
    example="12.345.678-9"
    tip="O RG varia por estado; aqui validamos o formato (7 a 13 dígitos)."
  />
</template>
