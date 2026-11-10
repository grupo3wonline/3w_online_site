<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { useConsolidatorStore } from '@/stores/consolidator'

  const store = useConsolidatorStore()
</script>

<template>
  <div class="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
    <label
      class="flex cursor-pointer items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/60 px-3.5 py-2.5 transition hover:border-slate-700"
    >
      <button
        type="button"
        role="switch"
        :aria-checked="store.includeFileName"
        class="inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        :class="store.includeFileName ? 'bg-emerald-500' : 'bg-slate-700'"
        @click="store.includeFileName = !store.includeFileName"
      >
        <span
          class="pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform"
          :class="store.includeFileName ? 'translate-x-4' : 'translate-x-0'"
        />
      </button>
      <span>Coluna "Arquivo_Origem"</span>
      <Icon
        icon="mdi:information-outline"
        class="h-3.5 w-3.5 text-slate-500"
        title="Adiciona uma coluna indicando de qual arquivo cada linha foi extraída"
      />
    </label>

    <label
      class="flex cursor-pointer items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/60 px-3.5 py-2.5 transition hover:border-slate-700"
    >
      <button
        type="button"
        role="switch"
        :aria-checked="store.includeSheetName"
        class="inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        :class="store.includeSheetName ? 'bg-emerald-500' : 'bg-slate-700'"
        @click="store.includeSheetName = !store.includeSheetName"
      >
        <span
          class="pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform"
          :class="store.includeSheetName ? 'translate-x-4' : 'translate-x-0'"
        />
      </button>
      <span>Coluna "Aba_Origem"</span>
      <Icon
        icon="mdi:information-outline"
        class="h-3.5 w-3.5 text-slate-500"
        title="Adiciona uma coluna indicando de qual aba/planilha cada linha foi extraída"
      />
    </label>
  </div>
</template>
