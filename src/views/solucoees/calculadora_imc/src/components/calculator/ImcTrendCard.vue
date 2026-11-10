<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'
import { useHistoryStore } from '@/stores/history'
import BaseCard from '@/components/ui/BaseCard.vue'

const ImcTrendChart = defineAsyncComponent(() => import('./ImcTrendChart.vue'))

const { entries, count } = storeToRefs(useHistoryStore())
</script>

<template>
  <BaseCard v-if="count >= 2" class="mx-auto max-w-6xl">
    <div class="mb-2">
      <h3 class="flex items-center gap-2 text-lg font-semibold">
        <Icon icon="lucide:trending-up" class="h-5 w-5 text-primary" />
        Evolução do seu IMC
      </h3>
      <p class="text-sm text-muted-foreground">
        Acompanhe como seu IMC variou ao longo dos cálculos salvos neste dispositivo.
      </p>
    </div>
    <ImcTrendChart :entries="entries" />
  </BaseCard>
</template>
