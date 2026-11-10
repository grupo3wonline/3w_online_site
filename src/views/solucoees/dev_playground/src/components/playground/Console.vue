<script lang="ts">
export interface ConsoleLog {
  type: 'log' | 'error' | 'warn' | 'info'
  message: string
  timestamp: number
}
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{ logs: ConsoleLog[] }>()
const emit = defineEmits<{ clear: [] }>()

type Filter = 'all' | ConsoleLog['type']
const filter = ref<Filter>('all')

const colors: Record<ConsoleLog['type'], string> = {
  error: 'text-red-400',
  warn: 'text-amber-400',
  info: 'text-sky-400',
  log: 'text-editor-foreground',
}
const icons: Record<ConsoleLog['type'], string> = {
  error: 'lucide:x-circle',
  warn: 'lucide:alert-triangle',
  info: 'lucide:info',
  log: 'lucide:chevron-right',
}

const counts = computed(() => ({
  error: props.logs.filter((l) => l.type === 'error').length,
  warn: props.logs.filter((l) => l.type === 'warn').length,
  info: props.logs.filter((l) => l.type === 'info' || l.type === 'log').length,
}))

const filtered = computed(() =>
  filter.value === 'all' ? props.logs : props.logs.filter((l) => l.type === filter.value),
)

function time(ts: number) {
  return new Date(ts).toLocaleTimeString('pt-BR')
}
</script>

<template>
  <div class="flex h-full flex-col border-t border-editor-border bg-editor-bg">
    <div class="flex items-center justify-between border-b border-editor-border bg-editor-header px-4 py-2">
      <div class="flex items-center gap-2">
        <span
          class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-editor-foreground"
        >
          <Icon icon="lucide:terminal" class="h-4 w-4 text-code-accent" /> Console
        </span>
        <!-- Contadores -->
        <span class="flex items-center gap-1 text-[11px] text-red-400" title="Erros">
          <Icon icon="lucide:x-circle" class="h-3 w-3" />{{ counts.error }}
        </span>
        <span class="flex items-center gap-1 text-[11px] text-amber-400" title="Avisos">
          <Icon icon="lucide:alert-triangle" class="h-3 w-3" />{{ counts.warn }}
        </span>
        <span class="flex items-center gap-1 text-[11px] text-sky-400" title="Logs">
          <Icon icon="lucide:info" class="h-3 w-3" />{{ counts.info }}
        </span>
      </div>
      <button
        type="button"
        class="rounded p-1 text-editor-foreground/70 hover:bg-white/10 hover:text-editor-foreground"
        aria-label="Limpar console"
        @click="emit('clear')"
      >
        <Icon icon="lucide:trash-2" class="h-4 w-4" />
      </button>
    </div>

    <!-- Filtros -->
    <div class="flex gap-1 border-b border-editor-border px-2 py-1">
      <button
        v-for="f in ['all', 'log', 'warn', 'error'] as Filter[]"
        :key="f"
        type="button"
        class="rounded px-2 py-0.5 text-[11px] font-medium capitalize transition-colors"
        :class="filter === f ? 'bg-primary text-white' : 'text-editor-foreground/60 hover:bg-white/10'"
        @click="filter = f"
      >
        {{ f === 'all' ? 'Tudo' : f === 'log' ? 'Logs' : f === 'warn' ? 'Avisos' : 'Erros' }}
      </button>
    </div>

    <div class="flex-1 overflow-auto p-2 font-mono text-xs">
      <p v-if="!filtered.length" class="flex h-full items-center justify-center text-editor-foreground/40">
        O console está limpo
      </p>
      <div
        v-for="(log, i) in filtered"
        :key="`${log.timestamp}-${i}`"
        class="flex gap-2 rounded p-2 hover:bg-white/5"
        :class="colors[log.type]"
      >
        <Icon :icon="icons[log.type]" class="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
        <span class="flex-1 whitespace-pre-wrap break-all">{{ log.message }}</span>
        <span class="flex-shrink-0 text-[10px] text-editor-foreground/40">{{ time(log.timestamp) }}</span>
      </div>
    </div>
  </div>
</template>
