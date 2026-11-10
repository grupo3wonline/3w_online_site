<script setup lang="ts">
import { Icon } from '@iconify/vue'
import ImcCalculator from '@/components/calculator/ImcCalculator.vue'
import ImcTrendCard from '@/components/calculator/ImcTrendCard.vue'
import HistoryTable from '@/components/calculator/HistoryTable.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import { useMotionPresets } from '@/composables/useMotionPresets'

const { fadeUp } = useMotionPresets()
</script>

<template>
  <div class="bg-mesh">
    <section class="container py-8 md:py-10">
      <div v-motion="fadeUp()" class="mx-auto mb-8 max-w-2xl text-center">
        <BaseBadge class="mb-3">
          <Icon icon="lucide:shield-check" class="h-3 w-3" /> Cálculo 100% no seu dispositivo
        </BaseBadge>
        <h1 class="text-3xl font-bold md:text-4xl">Calculadora de IMC e Metas de Saúde</h1>
        <p class="mt-2 text-muted-foreground">
          Preencha seus dados e receba IMC, taxa metabólica, hidratação, macronutrientes e um plano
          completo. Tudo processado no seu dispositivo, sem envio de dados.
        </p>
      </div>
      <ImcCalculator />

      <div class="mt-8">
        <ImcTrendCard />
      </div>

      <div class="mt-8">
        <HistoryTable />
      </div>
    </section>
  </div>
</template>
