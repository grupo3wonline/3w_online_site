<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { useConsolidatorStore } from '@/stores/consolidator'

  const store = useConsolidatorStore()

  const metrics = [
    {
      label: 'Arquivos Importados',
      icon: 'mdi:layers-outline',
      bgClass: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
    },
    {
      label: 'Linhas Consolidadas',
      icon: 'mdi:table-large',
      bgClass: 'border-teal-500/20 bg-teal-500/10 text-teal-400',
    },
    {
      label: 'Colunas Mapeadas',
      icon: 'mdi:file-document-outline',
      bgClass: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-400',
    },
  ] as const

  function getMetricValue(index: number): string | number {
    const s = store.stats
    if (index === 0) return s.fileCount
    if (index === 1) return s.totalRows.toLocaleString('pt-BR')
    return s.totalColumns
  }
</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <div
      v-for="(metric, index) in metrics"
      :key="index"
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :visible-once="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
      class="glass-card glass-card-hover flex items-center gap-4 rounded-2xl p-5"
    >
      <div class="rounded-xl border p-3" :class="metric.bgClass">
        <Icon :icon="metric.icon" class="h-6 w-6" />
      </div>
      <div>
        <p class="text-xs font-medium uppercase tracking-wider text-slate-400">
          {{ metric.label }}
        </p>
        <h3 class="mt-0.5 text-2xl font-extrabold text-white">
          {{ getMetricValue(index) }}
        </h3>
      </div>
    </div>
  </div>
</template>
