<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useThemeStore } from '@/stores/theme'

/**
 * Componente reutilizável de gráfico (ApexCharts) com título, ícone e
 * suporte automático a tema claro/escuro. Mantém a responsabilidade única
 * de renderizar um gráfico dentro do padrão visual de card do projeto.
 */
const props = defineProps<{
  title: string
  icon?: string
  type: 'line' | 'bar' | 'area' | 'donut' | 'pie' | 'radialBar'
  series: unknown
  options: Record<string, unknown>
  height?: number
}>()

const themeStore = useThemeStore()

const mergedOptions = computed(() => ({
  chart: {
    fontFamily: 'Inter, system-ui, sans-serif',
    toolbar: { show: false },
    background: 'transparent'
  },
  theme: { mode: themeStore.isDark ? 'dark' : 'light' },
  grid: { borderColor: themeStore.isDark ? '#334155' : '#e2e8f0' },
  tooltip: { theme: themeStore.isDark ? 'dark' : 'light' },
  ...props.options
}))
</script>

<template>
  <div class="card p-6">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
      <i v-if="icon" :class="['fa-solid text-primary-500', icon]"></i>
      {{ title }}
    </h3>
    <VueApexCharts
      :type="type"
      :height="height || 320"
      :series="series"
      :options="mergedOptions"
    />
  </div>
</template>
