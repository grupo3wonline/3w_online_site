<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import ToolPageLayout from '@/components/tools/ToolPageLayout.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { fancyStyles, toFancy } from '@/lib/dev-tools'
import { copyToClipboard } from '@/lib/utils'
import { toast } from '@/lib/alerts'

const input = ref('Gerador Brasil')

const outputs = computed(() =>
  fancyStyles.map((style) => ({ style, value: toFancy(input.value, style) })),
)

async function doCopy(value: string) {
  const ok = await copyToClipboard(value)
  toast(ok ? 'Copiado!' : 'Falha ao copiar', ok ? 'success' : 'error')
}
</script>

<template>
  <ToolPageLayout
    slug="gerador-letras"
    tip="Copie e cole em bios do Instagram, TikTok e outras redes. São caracteres Unicode reais."
  >
    <div class="space-y-4 rounded-2xl border border-border bg-card p-6">
      <label class="block font-medium" for="fancy-in">Seu texto</label>
      <input
        id="fancy-in"
        v-model="input"
        type="text"
        autocomplete="off"
        class="h-12 w-full rounded-lg border border-border bg-background px-4 outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>

    <div class="animate-fade-in space-y-2">
      <div
        v-for="o in outputs"
        :key="o.style"
        class="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:bg-secondary/50"
      >
        <div class="min-w-0">
          <p class="text-xs uppercase tracking-wider text-muted-foreground">{{ o.style }}</p>
          <p class="break-all text-lg">{{ o.value }}</p>
        </div>
        <BaseButton variant="ghost" size="sm" aria-label="Copiar" @click="doCopy(o.value)">
          <Icon icon="lucide:copy" class="h-4 w-4" />
        </BaseButton>
      </div>
    </div>
  </ToolPageLayout>
</template>
