<script setup lang="ts">
import { onMounted } from 'vue'
import Calculadora from '@/components/Calculadora.vue'
import { useSeo } from '@/composables/useSeo'
import { useAnalytics } from '@/composables/useAnalytics'
import { SITE } from '@/config/site'

useSeo(() => ({
  title: 'Calculadora de Metragem de Cabos Elétricos Online',
  description:
    'Use a calculadora online para estimar a metragem de cabos elétricos a partir do lance longo, lance curto, número de pontos e pé direito. Gratuita e sem cadastro.',
  keywords:
    'calculadora cabos, metragem cabo elétrico, cálculo online, pontos elétricos, pé direito',
  url: `${SITE.url}/calculadora`,
  type: 'website',
}))

const { trackPageView } = useAnalytics()
onMounted(() => trackPageView('/calculadora', 'Calculadora'))
</script>

<template>
  <Calculadora />
</template>
