<script setup lang="ts">
import { ref, computed } from 'vue'
import ToolPageLayout from '@/components/tools/ToolPageLayout.vue'
import { renderMarkdown } from '@/lib/markdown'

const input = ref(`# Título\n\nTexto com **negrito** e *itálico*.\n\n- Item 1\n- Item 2\n\n\`código inline\``)
const html = computed(() => renderMarkdown(input.value))
</script>

<template>
  <ToolPageLayout slug="markdown-preview" tip="Pré-visualização em tempo real. HTML é escapado antes da renderização (seguro contra XSS).">
    <div class="grid gap-4 md:grid-cols-2">
      <div class="rounded-2xl border border-border bg-card p-4">
        <p class="mb-2 text-sm font-semibold text-muted-foreground">Markdown</p>
        <textarea
          v-model="input"
          rows="14"
          autocomplete="off"
          spellcheck="false"
          class="w-full resize-y rounded-lg border border-border bg-background p-3 font-mono text-sm outline-none focus:border-primary"
        />
      </div>
      <div class="rounded-2xl border border-border bg-card p-4">
        <p class="mb-2 text-sm font-semibold text-muted-foreground">Pré-visualização</p>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="prose-preview max-w-none" v-html="html" />
      </div>
    </div>
  </ToolPageLayout>
</template>

<style scoped>
.prose-preview :deep(h1) {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0.5rem 0;
}
.prose-preview :deep(h2) {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0.5rem 0;
}
.prose-preview :deep(h3) {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0.4rem 0;
}
.prose-preview :deep(p) {
  margin: 0.5rem 0;
}
.prose-preview :deep(ul) {
  list-style: disc;
  padding-left: 1.25rem;
  margin: 0.5rem 0;
}
.prose-preview :deep(code) {
  background: hsl(var(--secondary));
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  font-family: ui-monospace, monospace;
}
.prose-preview :deep(pre) {
  background: hsl(var(--secondary));
  padding: 0.75rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 0.5rem 0;
}
.prose-preview :deep(blockquote) {
  border-left: 3px solid hsl(var(--primary));
  padding-left: 0.75rem;
  color: hsl(var(--muted-foreground));
  margin: 0.5rem 0;
}
.prose-preview :deep(a) {
  color: hsl(var(--primary));
  text-decoration: underline;
}
</style>
