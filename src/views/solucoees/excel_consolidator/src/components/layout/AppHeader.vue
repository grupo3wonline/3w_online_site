<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { useConsolidatorStore } from '@/stores/consolidator'
  import { useAlert } from '@/composables/useAlert'
  import HelpButton from '@/components/HelpButton.vue'
  import { APP_NAME, APP_VERSION, APP_DESCRIPTION } from '@/constants'

  const store = useConsolidatorStore()
  const alert = useAlert()

  async function handleClearAll() {
    const result = await alert.confirm(
      'Limpar tudo?',
      'Todos os arquivos importados e dados consolidados serão removidos.',
    )
    if (result.isConfirmed) {
      store.clearAll()
      alert.success('Dados removidos', 'Todos os arquivos foram removidos com sucesso.')
    }
  }
</script>

<template>
  <header class="glass-card sticky top-0 z-40 border-b border-white/5 px-4 py-4 sm:px-6">
    <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
      <div class="flex items-center gap-3">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 shadow-lg shadow-emerald-500/20"
        >
          <Icon icon="mdi:file-table-box-outline" class="h-6 w-6 text-slate-950" />
        </div>
        <div>
          <h1
            class="flex items-center gap-2 text-lg font-bold tracking-tight text-white sm:text-xl"
          >
            {{ APP_NAME }}
            <span
              class="rounded-full border border-emerald-500/30 bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400"
            >
              {{ APP_VERSION }}
            </span>
          </h1>
          <p class="text-xs text-slate-400">{{ APP_DESCRIPTION }}</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <HelpButton />

        <button
          v-if="store.files.length === 0"
          class="flex items-center gap-2 rounded-xl border border-emerald-800/50 bg-emerald-950/60 px-4 py-2 text-xs font-semibold text-emerald-400 transition duration-200 hover:bg-emerald-900/60"
          @click="store.loadSampleData()"
        >
          <Icon icon="mdi:auto-fix" class="h-4 w-4" />
          Carregar Exemplo
        </button>

        <button
          v-if="store.files.length > 0"
          class="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3.5 py-2 text-xs font-medium text-slate-400 transition duration-200 hover:border-rose-900/50 hover:bg-rose-950/30 hover:text-rose-400"
          @click="handleClearAll"
        >
          <Icon icon="mdi:trash-can-outline" class="h-3.5 w-3.5" />
          Limpar Tudo
        </button>
      </div>
    </div>
  </header>
</template>
