<script setup lang="ts">
import { ref, computed } from 'vue'
import ToolPageLayout from '@/components/tools/ToolPageLayout.vue'
import { analyzeText } from '@/lib/dev-tools'

const text = ref('')
const stats = computed(() => analyzeText(text.value))

const items = computed(() => [
  { label: 'Caracteres', value: stats.value.characters },
  { label: 'Sem espaços', value: stats.value.charactersNoSpaces },
  { label: 'Palavras', value: stats.value.words },
  { label: 'Linhas', value: stats.value.lines },
  { label: 'Parágrafos', value: stats.value.paragraphs },
])
</script>

<template>
  <ToolPageLayout slug="contador-texto" tip="Útil para respeitar limites de posts, meta descriptions (150-160) e títulos.">
    <div class="space-y-4 rounded-2xl border border-border bg-card p-6">
      <textarea
        v-model="text"
        rows="8"
        autocomplete="off"
        placeholder="Cole ou digite seu texto aqui..."
        class="w-full resize-y rounded-lg border border-border bg-background p-3 outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-ring"
      />
      <dl class="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div v-for="item in items" :key="item.label" class="rounded-xl bg-secondary/60 p-4 text-center">
          <dt class="text-2xl font-extrabold text-primary">{{ item.value }}</dt>
          <dd class="text-xs text-muted-foreground">{{ item.label }}</dd>
        </div>
      </dl>
    </div>
  </ToolPageLayout>
</template>
