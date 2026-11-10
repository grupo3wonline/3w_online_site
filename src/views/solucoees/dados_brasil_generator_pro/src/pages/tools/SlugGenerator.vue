<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import ToolPageLayout from '@/components/tools/ToolPageLayout.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { slugify } from '@/lib/dev-tools'
import { copyToClipboard } from '@/lib/utils'
import { toast } from '@/lib/alerts'

const input = ref('')
const slug = computed(() => slugify(input.value))

async function doCopy() {
  const ok = await copyToClipboard(slug.value)
  toast(ok ? 'Slug copiado!' : 'Falha ao copiar', ok ? 'success' : 'error')
}
</script>

<template>
  <ToolPageLayout
    slug="gerador-slug"
    tip="Slugs melhoram o SEO das URLs. Remova acentos, símbolos e espaços automaticamente."
  >
    <div class="space-y-4 rounded-2xl border border-border bg-card p-6">
      <label class="block font-medium" for="slug-in">Título ou frase</label>
      <input
        id="slug-in"
        v-model="input"
        type="text"
        autocomplete="off"
        placeholder="Ex.: Como Gerar CPF Válido em 2026"
        class="h-12 w-full rounded-lg border border-border bg-background px-4 outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-ring"
      />
      <div v-if="slug" class="flex items-center justify-between gap-3 rounded-lg bg-secondary/60 p-4">
        <span class="break-all font-mono text-primary">{{ slug }}</span>
        <BaseButton variant="ghost" size="sm" aria-label="Copiar" @click="doCopy">
          <Icon icon="lucide:copy" class="h-4 w-4" />
        </BaseButton>
      </div>
    </div>
  </ToolPageLayout>
</template>
