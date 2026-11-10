<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'
import { formatBRL } from '@/lib/utils'

const props = defineProps<{
  custoTotal: number
  lucroEstimado: number
  valorImpostos: number
}>()

const { isDark } = storeToRefs(useThemeStore())

const series = computed(() => [
  Math.max(0, props.custoTotal),
  Math.max(0, props.lucroEstimado),
  Math.max(0, props.valorImpostos),
])

const options = computed(() => ({
  chart: {
    type: 'donut',
    fontFamily: 'Inter, sans-serif',
    foreColor: isDark.value ? '#cbd5e1' : '#475569',
  },
  labels: ['Custo Total', 'Lucro Estimado', 'Impostos'],
  colors: ['#6366f1', '#22c55e', '#f59e0b'],
  legend: { position: 'bottom' },
  dataLabels: {
    enabled: true,
    formatter: (val: number) => `${val.toFixed(1)}%`,
  },
  stroke: { width: 2, colors: [isDark.value ? '#0f172a' : '#ffffff'] },
  tooltip: {
    theme: isDark.value ? 'dark' : 'light',
    y: { formatter: (val: number) => formatBRL(val) },
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          total: {
            show: true,
            label: 'Preço Final',
            formatter: () => formatBRL(series.value.reduce((a, b) => a + b, 0)),
          },
        },
      },
    },
  },
  responsive: [{ breakpoint: 480, options: { legend: { position: 'bottom' } } }],
}))
</script>

<template>
  <Apexchart type="donut" height="320" :options="options" :series="series" />
</template>
