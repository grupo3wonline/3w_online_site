<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import ToolPageLayout from '@/components/tools/ToolPageLayout.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { generateLorem } from '@/lib/dev-tools'
import { copyToClipboard } from '@/lib/utils'
import { toast } from '@/lib/alerts'

const paragraphs = ref(3)
const result = ref<string[]>([])

function run() {
  const qty = Math.min(Math.max(1, paragraphs.value), 20)
  paragraphs.value = qty
  result.value = generateLorem(qty)
}

async function doCopy() {
  const ok = await copyToClipboard(result.value.join('\n\n'))
  toast(ok ? 'Texto copiado!' : 'Falha ao copiar', ok ? 'success' : 'error')
}
</script>

<template>
  <ToolPageLayout slug="lorem-ipsum" tip="Use para preencher layouts e protótipos com texto de exemplo.">
    <div class="space-y-4 rounded-2xl border border-border bg-card p-6">
      <div class="flex items-center justify-between gap-4">
        <label class="font-medium" for="lorem-qty">Parágrafos</label>
        <input
          id="lorem-qty"
          v-model.number="paragraphs"
          type="number"
          min="1"
          max="20"
          autocomplete="off"
          class="h-11 w-24 rounded-lg border border-border bg-background px-3 text-center outline-none focus:border-primary"
        />
      </div>
      <BaseButton block size="lg" @click="run">
        <Icon icon="lucide:align-left" class="h-5 w-5" /> Gerar texto
      </BaseButton>
    </div>

    <div v-if="result.length" class="animate-fade-in space-y-3">
      <div class="space-y-3 rounded-2xl border border-border bg-card p-6 text-muted-foreground">
        <p v-for="(p, i) in result" :key="i">{{ p }}</p>
      </div>
      <BaseButton variant="outline" block @click="doCopy">
        <Icon icon="lucide:copy" class="h-4 w-4" /> Copiar texto
      </BaseButton>
    </div>
  </ToolPageLayout>
</template>
