<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from '@/composables/useTheme'
import type { CalculatedValues } from '@/types/calculator'

const props = defineProps<{ calculated: CalculatedValues }>()
const { isDark } = useTheme()

const series = computed(() => [
  {
    name: 'Valor',
    data: [
      props.calculated.points,
      Number(props.calculated.cableLength.toFixed(1)),
      Number((props.calculated.totalPower / 1000).toFixed(2)),
      Number(props.calculated.current.toFixed(1)),
      props.calculated.circuitBreaker,
      props.calculated.cableGauge,
    ],
  },
])

const options = computed(() => ({
  chart: {
    type: 'bar' as const,
    toolbar: { show: false },
    fontFamily: 'Inter, sans-serif',
    background: 'transparent',
  },
  theme: { mode: isDark.value ? ('dark' as const) : ('light' as const) },
  plotOptions: { bar: { borderRadius: 6, horizontal: true, distributed: true } },
  colors: ['#2563eb', '#7c3aed', '#0891b2', '#059669', '#d97706', '#dc2626'],
  dataLabels: { enabled: true },
  legend: { show: false },
  grid: { borderColor: isDark.value ? '#334155' : '#e2e8f0' },
  xaxis: {
    categories: [
      'Pontos',
      'Cabo (m)',
      'Potência (kVA)',
      'Corrente (A)',
      'Disjuntor (A)',
      'Bitola (mm²)',
    ],
  },
  tooltip: { theme: isDark.value ? 'dark' : 'light' },
}))
</script>

<template>
  <VueApexCharts type="bar" height="320" :options="options" :series="series" />
</template>
