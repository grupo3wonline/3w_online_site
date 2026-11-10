<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'
import type { HistoryEntry } from '@/stores/history'

const props = defineProps<{ entries: HistoryEntry[] }>()

const { isDark } = storeToRefs(useThemeStore())

// Ordem cronológica (o histórico guarda mais recentes primeiro)
const ordenados = computed(() =>
  [...props.entries].sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()),
)

const series = computed(() => [
  {
    name: 'IMC',
    data: ordenados.value.map((e) => ({ x: new Date(e.data).getTime(), y: e.imc })),
  },
])

const gridColor = computed(() => (isDark.value ? '#334155' : '#e2e8f0'))
const textColor = computed(() => (isDark.value ? '#94a3b8' : '#64748b'))

const options = computed(() => ({
  chart: {
    type: 'area' as const,
    height: 300,
    fontFamily: 'Inter, system-ui, sans-serif',
    toolbar: { show: false },
    zoom: { enabled: false },
    background: 'transparent',
  },
  theme: { mode: (isDark.value ? 'dark' : 'light') as 'dark' | 'light' },
  colors: ['#8b5cf6'],
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth' as const, width: 3 },
  fill: {
    type: 'gradient',
    gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] },
  },
  markers: { size: 4, hover: { size: 6 } },
  grid: { borderColor: gridColor.value, strokeDashArray: 4 },
  xaxis: {
    type: 'datetime' as const,
    labels: { style: { colors: textColor.value }, datetimeUTC: false },
    axisBorder: { color: gridColor.value },
    axisTicks: { color: gridColor.value },
  },
  yaxis: {
    labels: {
      style: { colors: textColor.value },
      formatter: (v: number) => v.toFixed(1),
    },
    min: 15,
    max: 40,
  },
  tooltip: {
    theme: (isDark.value ? 'dark' : 'light') as 'dark' | 'light',
    x: { format: 'dd/MM/yyyy HH:mm' },
    y: { formatter: (v: number) => `${v.toFixed(1)} de IMC` },
  },
  // Faixas de referência: normal (18,5–25) e sobrepeso (25–30)
  annotations: {
    yaxis: [
      {
        y: 18.5,
        y2: 25,
        fillColor: '#16a34a',
        opacity: 0.08,
        label: {
          text: 'Peso normal',
          position: 'left',
          textAnchor: 'start',
          style: { color: textColor.value, background: 'transparent', fontSize: '11px' },
        },
      },
      {
        y: 25,
        y2: 30,
        fillColor: '#f59e0b',
        opacity: 0.08,
        label: {
          text: 'Sobrepeso',
          position: 'left',
          textAnchor: 'start',
          style: { color: textColor.value, background: 'transparent', fontSize: '11px' },
        },
      },
    ],
  },
}))
</script>

<template>
  <VueApexCharts type="area" height="300" :options="options" :series="series" />
</template>
