<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import ToolPageLayout from '@/components/tools/ToolPageLayout.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { copyToClipboard } from '@/lib/utils'
import { toast } from '@/lib/alerts'

const input = ref('')
const secondsPerLine = ref(3)
const output = ref('')

function pad(n: number, size = 2) {
  return String(n).padStart(size, '0')
}
function formatTime(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = Math.floor(totalSeconds % 60)
  return `${pad(h)}:${pad(m)}:${pad(s)},000`
}

function convert() {
  const lines = input.value.split('\n').map((l) => l.trim()).filter(Boolean)
  const dur = Math.max(1, secondsPerLine.value)
  output.value = lines
    .map((line, i) => {
      const start = i * dur
      const end = start + dur
      return `${i + 1}\n${formatTime(start)} --> ${formatTime(end)}\n${line}\n`
    })
    .join('\n')
}

async function doCopy() {
  if (!output.value) return
  const ok = await copyToClipboard(output.value)
  toast(ok ? 'Legenda copiada!' : 'Falha ao copiar', ok ? 'success' : 'error')
}
function download() {
  if (!output.value) return
  const blob = new Blob([output.value], { type: 'text/plain;charset=utf-8' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'legenda.srt'
  a.click()
  URL.revokeObjectURL(a.href)
}
</script>

<template>
  <ToolPageLayout
    slug="roteiro-srt"
    tip="Cada linha do roteiro vira uma legenda sequencial. Ajuste a duração por linha conforme o ritmo do vídeo."
  >
    <div class="space-y-4 rounded-2xl border border-border bg-card p-6">
      <textarea
        v-model="input"
        rows="6"
        autocomplete="off"
        placeholder="Uma frase por linha..."
        class="w-full resize-y rounded-lg border border-border bg-background p-3 outline-none focus:border-primary"
      />
      <div class="flex items-center justify-between gap-4">
        <label class="font-medium" for="srt-dur">Segundos por linha</label>
        <input
          id="srt-dur"
          v-model.number="secondsPerLine"
          type="number"
          min="1"
          autocomplete="off"
          class="h-11 w-24 rounded-lg border border-border bg-background px-3 text-center outline-none focus:border-primary"
        />
      </div>
      <BaseButton block @click="convert"><Icon icon="lucide:captions" class="h-4 w-4" /> Converter para SRT</BaseButton>

      <div v-if="output" class="space-y-2">
        <textarea :value="output" rows="8" readonly class="w-full resize-y rounded-lg border border-border bg-secondary/40 p-3 font-mono text-sm" />
        <div class="flex flex-wrap gap-2">
          <BaseButton variant="ghost" size="sm" @click="doCopy"><Icon icon="lucide:copy" class="h-4 w-4" /> Copiar</BaseButton>
          <BaseButton variant="outline" size="sm" @click="download"><Icon icon="lucide:download" class="h-4 w-4" /> Baixar .srt</BaseButton>
        </div>
      </div>
    </div>
  </ToolPageLayout>
</template>
