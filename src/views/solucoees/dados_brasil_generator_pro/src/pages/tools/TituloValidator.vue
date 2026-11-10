<script setup lang="ts">
import ValidatorLayout from '@/components/tools/ValidatorLayout.vue'
import { validateTitulo } from '@/lib/validators'
</script>

<template>
  <ValidatorLayout
    slug="validador-titulo"
    placeholder="000000000000"
    mask="############"
    :validate="validateTitulo"
    example="123456789012"
    tip="Confere o formato do título de eleitor (12 dígitos)."
  />
</template>
