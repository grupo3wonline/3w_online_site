<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { useConsolidatorStore } from '@/stores/consolidator'
  import { useAlert } from '@/composables/useAlert'
  import type { ProcessedFile } from '@/types'

  const props = defineProps<{
    file: ProcessedFile
  }>()

  const store = useConsolidatorStore()
  const alert = useAlert()

  async function handleRemove() {
    const result = await alert.confirm(
      'Remover arquivo?',
      `O arquivo "${props.file.sanitizedName}" será removido da consolidação.`,
    )
    if (result.isConfirmed) {
      store.removeFile(props.file.id)
    }
  }
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 10 }"
    :enter="{ opacity: 1, y: 0 }"
    class="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/80 p-3 text-xs"
  >
    <div class="flex min-w-0 items-center gap-3">
      <Icon icon="mdi:file-table-outline" class="h-5 w-5 shrink-0 text-emerald-400" />
      <div class="min-w-0">
        <p class="truncate font-semibold text-slate-200" :title="file.name">
          {{ file.sanitizedName }}
        </p>
        <p class="text-[11px] text-slate-400">
          {{ file.size }} • {{ file.rowsCount }} linhas • {{ file.sheetCount }} aba(s)
        </p>
      </div>
    </div>
    <button
      class="shrink-0 rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-800 hover:text-rose-400"
      title="Remover arquivo"
      aria-label="Remover arquivo"
      @click.stop="handleRemove"
    >
      <Icon icon="mdi:trash-can-outline" class="h-4 w-4" />
    </button>
  </div>
</template>
