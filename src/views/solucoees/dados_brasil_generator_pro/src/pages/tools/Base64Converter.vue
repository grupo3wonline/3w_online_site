<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import ToolPageLayout from '@/components/tools/ToolPageLayout.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { encodeBase64, decodeBase64 } from '@/lib/dev-tools'
import { copyToClipboard } from '@/lib/utils'
import { toast } from '@/lib/alerts'

const input = ref('')
const output = ref('')
const errorMsg = ref('')

function encode() {
  errorMsg.value = ''
  output.value = encodeBase64(input.value)
}
function decode() {
  errorMsg.value = ''
  try {
    output.value = decodeBase64(input.value)
  } catch {
    errorMsg.value = 'Conteúdo Base64 inválido.'
    output.value = ''
  }
}
async function doCopy() {
  if (!output.value) return
  const ok = await copyToClipboard(output.value)
  toast(ok ? 'Copiado!' : 'Falha ao copiar', ok ? 'success' : 'error')
}
</script>

<template>
  <ToolPageLayout slug="base64" tip="Suporta acentuação e emojis (UTF-8). Útil para embutir dados em URLs e configs.">
    <div class="space-y-4 rounded-2xl border border-border bg-card p-6">
      <textarea
        v-model="input"
        rows="4"
        autocomplete="off"
        placeholder="Cole o texto aqui..."
        class="w-full resize-y rounded-lg border border-border bg-background p-3 font-mono text-sm outline-none focus:border-primary"
      />
      <div class="flex flex-wrap gap-2">
        <BaseButton @click="encode"><Icon icon="lucide:lock" class="h-4 w-4" /> Codificar</BaseButton>
        <BaseButton variant="outline" @click="decode"><Icon icon="lucide:unlock" class="h-4 w-4" /> Decodificar</BaseButton>
      </div>
      <p v-if="errorMsg" class="text-sm text-destructive">{{ errorMsg }}</p>
      <div v-if="output" class="space-y-2">
        <textarea
          :value="output"
          rows="4"
          readonly
          class="w-full resize-y rounded-lg border border-border bg-secondary/40 p-3 font-mono text-sm"
        />
        <BaseButton variant="ghost" size="sm" @click="doCopy"><Icon icon="lucide:copy" class="h-4 w-4" /> Copiar resultado</BaseButton>
      </div>
    </div>
  </ToolPageLayout>
</template>
