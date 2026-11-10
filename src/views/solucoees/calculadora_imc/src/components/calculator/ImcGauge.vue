<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'

const props = defineProps<{
  imc: number
  categoria: string
}>()

const { isDark } = storeToRefs(useThemeStore())

// Escala visual do gauge: 15 a 40 cobre as faixas relevantes de IMC.
const MIN = 15
const MAX = 40

const percent = computed(() => {
  const clamped = Math.min(Math.max(props.imc, MIN), MAX)
  return ((clamped - MIN) / (MAX - MIN)) * 100
})

// Cor de acordo com a categoria (tokens semânticos aproximados em hex).
const cor = computed(() => {
  const imc = props.imc
  if (imc < 18.5) return '#3b82f6' // info/azul — abaixo do peso
  if (imc < 25) return '#16a34a' // success/verde — normal
  if (imc < 30) return '#f59e0b' // warning/amarelo — sobrepeso
  if (imc < 35) return '#f97316' // laranja — obesidade I
  return '#ef4444' // destructive/vermelho — obesidade II+
})

const faixas = [
  { label: 'Abaixo do peso', range: '< 18,5', color: '#3b82f6' },
  { label: 'Peso normal', range: '18,5 – 24,9', color: '#16a34a' },
  { label: 'Sobrepeso', range: '25 – 29,9', color: '#f59e0b' },
  { label: 'Obesidade I', range: '30 – 34,9', color: '#f97316' },
  { label: 'Obesidade II+', range: '≥ 35', color: '#ef4444' },
]

const series = computed(() => [Math.round(percent.value)])

const options = computed(() => ({
  chart: {
    type: 'radialBar' as const,
    sparkline: { enabled: true },
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      hollow: { size: '62%' },
      track: {
        background: isDark.value ? '#334155' : '#e2e8f0',
        strokeWidth: '100%',
      },
      dataLabels: {
        name: {
          offsetY: 22,
          color: isDark.value ? '#94a3b8' : '#64748b',
          fontSize: '13px',
        },
        value: {
          offsetY: -18,
          color: isDark.value ? '#f1f5f9' : '#0f172a',
          fontSize: '32px',
          fontWeight: 700,
          formatter: () => props.imc.toFixed(1),
        },
      },
    },
  },
  colors: [cor.value],
  stroke: { lineCap: 'round' as const },
  labels: [props.categoria],
}))
</script>

<template>
  <div class="flex flex-col items-center">
    <VueApexCharts
      type="radialBar"
      height="260"
      width="260"
      :options="options"
      :series="series"
    />
    <ul class="mt-2 grid w-full max-w-md grid-cols-1 gap-1.5 sm:grid-cols-2">
      <li
        v-for="faixa in faixas"
        :key="faixa.label"
        class="flex items-center justify-between rounded-md px-2 py-1 text-xs"
        :class="faixa.label === categoria ? 'bg-muted font-semibold' : ''"
      >
        <span class="flex items-center gap-2">
          <span class="h-3 w-3 rounded-full" :style="{ backgroundColor: faixa.color }" />
          {{ faixa.label }}
        </span>
        <span class="text-muted-foreground">{{ faixa.range }}</span>
      </li>
    </ul>
  </div>
</template>
