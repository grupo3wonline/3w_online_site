<script setup lang="ts">
  import { useConsolidatorStore } from '@/stores/consolidator'
  import LoadingOverlay from '@/components/LoadingOverlay.vue'
  import MetricCards from '@/components/MetricCards.vue'
  import FileDropZone from '@/components/FileDropZone.vue'
  import ConsolidationOptions from '@/components/ConsolidationOptions.vue'
  import DataTable from '@/components/DataTable.vue'
  import ExportActions from '@/components/ExportActions.vue'
  import EmptyState from '@/components/EmptyState.vue'

  const store = useConsolidatorStore()
</script>

<template>
  <div class="mx-auto max-w-7xl space-y-6 px-4 pb-16 pt-4 sm:px-6 sm:pt-6">
    <!-- Overlay de carregamento -->
    <LoadingOverlay v-if="store.isProcessing" message="Processando planilhas..." />

    <!-- Cards de métricas -->
    <MetricCards />

    <!-- Zona de upload -->
    <FileDropZone />

    <!-- Opções + Exportação -->
    <section
      v-if="store.consolidatedData.length > 0"
      class="glass-card rounded-2xl p-4 sm:p-6"
    >
      <div
        class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <ConsolidationOptions />
        <ExportActions />
      </div>
    </section>

    <!-- Tabela de dados consolidados -->
    <DataTable v-if="store.consolidatedData.length > 0" />

    <!-- Estado vazio (sem arquivos) -->
    <EmptyState v-if="store.files.length === 0" />
  </div>
</template>
