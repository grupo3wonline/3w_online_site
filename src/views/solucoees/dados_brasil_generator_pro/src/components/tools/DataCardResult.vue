<script setup lang="ts">
import { Icon } from '@iconify/vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { copyToClipboard } from '@/lib/utils'
import { toast } from '@/lib/alerts'

const props = defineProps<{ fields: { label: string; value: string }[] }>()

async function copyField(value: string) {
  const ok = await copyToClipboard(value)
  toast(ok ? 'Copiado!' : 'Falha ao copiar', ok ? 'success' : 'error')
}

async function copyAll() {
  const text = props.fields.map((f) => `${f.label}: ${f.value}`).join('\n')
  const ok = await copyToClipboard(text)
  toast(ok ? 'Dados copiados!' : 'Falha ao copiar', ok ? 'success' : 'error')
}
</script>

<template>
  <div v-if="fields.length" class="animate-fade-in space-y-3">
    <div class="overflow-hidden rounded-2xl border border-border bg-card">
      <div
        v-for="(f, i) in fields"
        :key="i"
        class="flex items-center justify-between gap-3 border-b border-border px-4 py-3 last:border-0 hover:bg-secondary/50"
      >
        <div class="min-w-0">
          <p class="text-xs uppercase tracking-wider text-muted-foreground">{{ f.label }}</p>
          <p class="break-all font-mono text-foreground">{{ f.value }}</p>
        </div>
        <BaseButton variant="ghost" size="sm" aria-label="Copiar" @click="copyField(f.value)">
          <Icon icon="lucide:copy" class="h-4 w-4" />
        </BaseButton>
      </div>
    </div>
    <BaseButton variant="outline" block @click="copyAll">
      <Icon icon="lucide:copy" class="h-4 w-4" /> Copiar todos os dados
    </BaseButton>
  </div>
</template>
