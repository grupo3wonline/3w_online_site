<script setup lang="ts">
import ValidatorLayout from '@/components/tools/ValidatorLayout.vue'
import { validateCNPJ } from '@/lib/validators'
</script>

<template>
  <ValidatorLayout
    slug="validador-cnpj"
    placeholder="00.000.000/0000-00"
    mask="##.###.###/####-##"
    :validate="validateCNPJ"
    example="11.222.333/0001-81"
    tip="Confere os dígitos verificadores do CNPJ."
  />
</template>
