<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import ToolPageLayout from '@/components/tools/ToolPageLayout.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { copyToClipboard } from '@/lib/utils'
import { toast } from '@/lib/alerts'

const input = ref('')
const output = ref('')
const status = ref<{ ok: boolean; msg: string } | null>(null)

function format(indent: number) {
  try {
    const parsed = JSON.parse(input.value)
    output.value = JSON.stringify(parsed, null, indent)
    status.value = { ok: true, msg: 'JSON válido e formatado.' }
  } catch (e) {
    output.value = ''
    status.value = { ok: false, msg: `JSON inválido: ${(e as Error).message}` }
  }
}
async function doCopy() {
  if (!output.value) return
  const ok = await copyToClipboard(output.value)
  toast(ok ? 'Copiado!' : 'Falha ao copiar', ok ? 'success' : 'error')
}
</script>

<template>
  <ToolPageLayout slug="formatador-json" tip="Cole um JSON para validar e identar. Use 'Minificar' para reduzir o tamanho.">
    <div class="space-y-4 rounded-2xl border border-border bg-card p-6">
      <textarea
        v-model="input"
        rows="6"
        autocomplete="off"
        spellcheck="false"
        placeholder='{"nome":"exemplo","ativo":true}'
        class="w-full resize-y rounded-lg border border-border bg-background p-3 font-mono text-sm outline-none focus:border-primary"
      />
      <div class="flex flex-wrap gap-2">
        <BaseButton @click="format(2)"><Icon icon="lucide:braces" class="h-4 w-4" /> Formatar</BaseButton>
        <BaseButton variant="outline" @click="format(0)"><Icon icon="lucide:minimize-2" class="h-4 w-4" /> Minificar</BaseButton>
      </div>
      <p v-if="status" :class="status.ok ? 'text-green-600 dark:text-green-400' : 'text-destructive'" class="text-sm">
        {{ status.msg }}
      </p>
      <div v-if="output" class="space-y-2">
        <textarea :value="output" rows="6" readonly class="w-full resize-y rounded-lg border border-border bg-secondary/40 p-3 font-mono text-sm" />
        <BaseButton variant="ghost" size="sm" @click="doCopy"><Icon icon="lucide:copy" class="h-4 w-4" /> Copiar</BaseButton>
      </div>
    </div>
  </ToolPageLayout>
</template>
