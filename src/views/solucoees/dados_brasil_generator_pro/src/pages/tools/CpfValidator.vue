<script setup lang="ts">
import ValidatorLayout from '@/components/tools/ValidatorLayout.vue'
import { validateCPF } from '@/lib/validators'
</script>

<template>
  <ValidatorLayout
    slug="validador-cpf"
    placeholder="000.000.000-00"
    mask="###.###.###-##"
    :validate="validateCPF"
    example="123.456.789-09"
    tip="A validação confere os dois dígitos verificadores pelo algoritmo mod11."
  />
</template>
