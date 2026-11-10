<script setup lang="ts">
import ValidatorLayout from '@/components/tools/ValidatorLayout.vue'
import { validateCertidao } from '@/lib/validators'
</script>

<template>
  <ValidatorLayout
    slug="validador-certidoes"
    placeholder="Certidão de 32 dígitos"
    :validate="validateCertidao"
    tip="Certidões (nascimento, casamento, óbito) têm 32 dígitos no padrão nacional."
  />
</template>
