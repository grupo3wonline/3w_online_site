<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import CalculatorForm from '@/components/calculator/CalculatorForm.vue'
import SectionHeading from './SectionHeading.vue'

const { t } = useI18n()
</script>

<template>
  <section
    id="calculadora"
    class="relative scroll-mt-20 bg-muted/40 py-16 sm:py-20"
    aria-labelledby="calculator-title"
  >
    <div class="container relative z-10 mx-auto px-4 sm:px-6">
      <SectionHeading
        id="calculator-title"
        :eyebrow="t('home.tools.title')"
        gradient
        :title="t('calculator.title')"
        :subtitle="t('calculator.subtitle')"
      />

      <CalculatorForm />
    </div>
  </section>
</template>
