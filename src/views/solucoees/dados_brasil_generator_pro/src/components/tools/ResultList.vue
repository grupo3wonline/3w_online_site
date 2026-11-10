<script setup lang="ts">
import { Icon } from '@iconify/vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { copyToClipboard } from '@/lib/utils'
import { toast } from '@/lib/alerts'

const props = defineProps<{ items: string[] }>()

async function copyOne(value: string) {
  const ok = await copyToClipboard(value)
  toast(ok ? 'Copiado!' : 'Falha ao copiar', ok ? 'success' : 'error')
}

async function copyAll() {
  const ok = await copyToClipboard(props.items.join('\n'))
  toast(ok ? 'Lista copiada!' : 'Falha ao copiar', ok ? 'success' : 'error')
}
</script>

<template>
  <div v-if="items.length" class="animate-fade-in space-y-3">
    <div class="overflow-hidden rounded-2xl border border-border bg-card">
      <div
        v-for="(item, i) in items"
        :key="i"
        class="flex items-center justify-between gap-3 border-b border-border px-4 py-3 last:border-0 hover:bg-secondary/50"
      >
        <span class="break-all font-mono text-lg text-foreground">{{ item }}</span>
        <BaseButton variant="ghost" size="sm" aria-label="Copiar" @click="copyOne(item)">
          <Icon icon="lucide:copy" class="h-4 w-4" />
        </BaseButton>
      </div>
    </div>
    <BaseButton v-if="items.length > 1" variant="outline" block @click="copyAll">
      <Icon icon="lucide:copy" class="h-4 w-4" /> Copiar todos
    </BaseButton>
  </div>
</template>
