<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{ label: string; modelValue: string; language: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const textarea = ref<HTMLTextAreaElement | null>(null)

const lineCount = computed(() => Math.max(props.modelValue.split('\n').length, 1))
const lines = computed(() => Array.from({ length: lineCount.value }, (_, i) => i + 1))

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLTextAreaElement).value)
}

// Suporte a Tab dentro do editor (indentação) sem perder foco
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Tab') {
    e.preventDefault()
    const el = e.target as HTMLTextAreaElement
    const start = el.selectionStart
    const end = el.selectionEnd
    const value = props.modelValue.substring(0, start) + '  ' + props.modelValue.substring(end)
    emit('update:modelValue', value)
    requestAnimationFrame(() => {
      el.selectionStart = el.selectionEnd = start + 2
    })
  }
}
</script>

<template>
  <div class="flex h-full flex-col border-r border-editor-border bg-editor-bg last:border-r-0">
    <div
      class="flex items-center justify-between border-b border-editor-border bg-editor-header px-4 py-2"
    >
      <span class="text-xs font-semibold uppercase tracking-wide text-editor-foreground">
        {{ label }}
      </span>
      <span class="h-2 w-2 animate-pulse rounded-full bg-code-accent" />
    </div>
    <div class="relative flex flex-1 overflow-hidden">
      <!-- Numeração de linhas -->
      <div
        aria-hidden="true"
        class="select-none overflow-hidden bg-editor-header px-2 py-3 text-right font-mono text-xs leading-5 text-editor-foreground/40"
      >
        <div v-for="n in lines" :key="n">{{ n }}</div>
      </div>
      <textarea
        ref="textarea"
        :value="modelValue"
        :aria-label="`Editor de ${label}`"
        spellcheck="false"
        autocomplete="off"
        autocapitalize="off"
        autocorrect="off"
        class="flex-1 resize-none bg-transparent px-3 py-3 font-mono text-sm leading-5 text-editor-foreground outline-none"
        @input="onInput"
        @keydown="onKeydown"
      />
    </div>
  </div>
</template>
