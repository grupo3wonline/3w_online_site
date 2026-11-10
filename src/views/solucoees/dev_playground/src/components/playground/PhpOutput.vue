<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{ output: string; error: string | null; isExecuting: boolean }>()
</script>

<template>
  <div class="flex h-full flex-col border-t border-editor-border bg-editor-bg">
    <div class="flex items-center gap-2 border-b border-editor-border bg-editor-header px-4 py-2">
      <Icon icon="lucide:terminal" class="h-4 w-4 text-secondary" />
      <span class="text-xs font-semibold uppercase tracking-wide text-editor-foreground">Saída PHP</span>
      <Icon v-if="isExecuting" icon="lucide:loader-2" class="h-3.5 w-3.5 animate-spin text-code-accent" />
    </div>
    <div class="flex-1 overflow-auto p-4 font-mono text-sm">
      <div v-if="isExecuting" class="flex h-full items-center justify-center text-editor-foreground/50">
        <Icon icon="lucide:loader-2" class="h-6 w-6 animate-spin" />
      </div>
      <template v-else>
        <div v-if="error" class="mb-2 rounded border border-red-500/30 bg-red-500/10 p-3 text-red-400">
          <p class="mb-1 font-bold">Erro:</p>
          <pre class="whitespace-pre-wrap break-all">{{ error }}</pre>
        </div>
        <div
          v-if="output"
          class="rounded border border-code-accent/20 bg-code-accent/5 p-3 text-editor-foreground"
        >
          <p class="mb-1 font-bold text-code-accent">Saída:</p>
          <pre class="whitespace-pre-wrap break-all">{{ output }}</pre>
        </div>
        <p v-if="!output && !error" class="text-center text-editor-foreground/40">
          Clique em "Executar PHP" para rodar seu código.
        </p>
      </template>
    </div>
  </div>
</template>
