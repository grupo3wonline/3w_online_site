<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { format } from 'date-fns'
import ToolPageLayout from '@/components/tools/ToolPageLayout.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { copyToClipboard } from '@/lib/utils'
import { toast } from '@/lib/alerts'

const now = ref(Math.floor(Date.now() / 1000))
const epochInput = ref(String(Math.floor(Date.now() / 1000)))

const humanFromEpoch = computed(() => {
  const n = Number(epochInput.value)
  if (!Number.isFinite(n)) return 'Timestamp inválido'
  const ms = String(epochInput.value).length > 10 ? n : n * 1000
  try {
    return format(new Date(ms), "dd/MM/yyyy HH:mm:ss")
  } catch {
    return 'Timestamp inválido'
  }
})

function refreshNow() {
  now.value = Math.floor(Date.now() / 1000)
  epochInput.value = String(now.value)
}

async function copyNow() {
  const ok = await copyToClipboard(String(now.value))
  toast(ok ? 'Copiado!' : 'Falha ao copiar', ok ? 'success' : 'error')
}
</script>

<template>
  <ToolPageLayout slug="epoch-converter" tip="Timestamps com 10 dígitos são segundos; com 13 dígitos, milissegundos.">
    <div class="space-y-4 rounded-2xl border border-border bg-card p-6">
      <div class="flex items-center justify-between rounded-xl bg-secondary/60 p-4">
        <div>
          <p class="text-xs uppercase tracking-wider text-muted-foreground">Timestamp atual (s)</p>
          <p class="font-mono text-xl text-primary">{{ now }}</p>
        </div>
        <div class="flex gap-2">
          <BaseButton variant="ghost" size="sm" aria-label="Atualizar" @click="refreshNow"><Icon icon="lucide:refresh-cw" class="h-4 w-4" /></BaseButton>
          <BaseButton variant="ghost" size="sm" aria-label="Copiar" @click="copyNow"><Icon icon="lucide:copy" class="h-4 w-4" /></BaseButton>
        </div>
      </div>

      <div>
        <label class="mb-1 block font-medium" for="epoch-in">Timestamp → Data</label>
        <input
          id="epoch-in"
          v-model="epochInput"
          type="text"
          inputmode="numeric"
          autocomplete="off"
          class="h-12 w-full rounded-lg border border-border bg-background px-4 font-mono outline-none focus:border-primary"
        />
        <p class="mt-2 font-mono text-lg text-foreground">{{ humanFromEpoch }}</p>
      </div>
    </div>
  </ToolPageLayout>
</template>
