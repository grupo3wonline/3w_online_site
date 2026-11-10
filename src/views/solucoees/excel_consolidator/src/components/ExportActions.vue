<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { useConsolidatorStore } from '@/stores/consolidator'
  import { useExport } from '@/composables/useExport'

  const store = useConsolidatorStore()
  const { exportToExcel, exportToCSV } = useExport()
</script>

<template>
  <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
    <button
      class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition duration-200 hover:from-emerald-400 hover:to-teal-400 active:scale-95 disabled:opacity-50 sm:flex-none"
      :disabled="store.consolidatedData.length === 0"
      @click="exportToExcel(store.consolidatedData)"
    >
      <Icon icon="mdi:download" class="h-4 w-4" />
      Baixar Excel (.xlsx)
    </button>

    <button
      class="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/80 px-4 py-2.5 text-xs font-semibold text-slate-300 transition duration-200 hover:bg-slate-800 active:scale-95 disabled:opacity-50 sm:flex-none"
      :disabled="store.consolidatedData.length === 0"
      @click="exportToCSV(store.consolidatedData)"
    >
      <Icon icon="mdi:file-delimited-outline" class="h-4 w-4 text-emerald-400" />
      Exportar CSV
    </button>
  </div>
</template>
