<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import ToolPageLayout from '@/components/tools/ToolPageLayout.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { encodeHtmlEntities, decodeHtmlEntities } from '@/lib/dev-tools'
import { copyToClipboard } from '@/lib/utils'
import { toast } from '@/lib/alerts'

const input = ref('')
const output = ref('')

function encode() {
  output.value = encodeHtmlEntities(input.value)
}
function decode() {
  output.value = decodeHtmlEntities(input.value)
}
async function doCopy() {
  if (!output.value) return
  const ok = await copyToClipboard(output.value)
  toast(ok ? 'Copiado!' : 'Falha ao copiar', ok ? 'success' : 'error')
}
</script>

<template>
  <ToolPageLayout slug="html-entities" tip="Converta &lt; &gt; &amp; para exibir código HTML como texto com segurança.">
    <div class="space-y-4 rounded-2xl border border-border bg-card p-6">
      <textarea
        v-model="input"
        rows="4"
        autocomplete="off"
        placeholder="<div>Olá & bem-vindo</div>"
        class="w-full resize-y rounded-lg border border-border bg-background p-3 font-mono text-sm outline-none focus:border-primary"
      />
      <div class="flex flex-wrap gap-2">
        <BaseButton @click="encode"><Icon icon="lucide:code" class="h-4 w-4" /> Codificar</BaseButton>
        <BaseButton variant="outline" @click="decode"><Icon icon="lucide:code-2" class="h-4 w-4" /> Decodificar</BaseButton>
      </div>
      <div v-if="output" class="space-y-2">
        <textarea :value="output" rows="4" readonly class="w-full resize-y rounded-lg border border-border bg-secondary/40 p-3 font-mono text-sm" />
        <BaseButton variant="ghost" size="sm" @click="doCopy"><Icon icon="lucide:copy" class="h-4 w-4" /> Copiar</BaseButton>
      </div>
    </div>
  </ToolPageLayout>
</template>
