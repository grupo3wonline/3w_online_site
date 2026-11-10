<script setup lang="ts">
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import QRCode from 'qrcode'
import ToolPageLayout from '@/components/tools/ToolPageLayout.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { toast } from '@/lib/alerts'

const text = ref('https://www.3wonline.com.br')
const dataUrl = ref('')
const error = ref('')

async function render() {
  error.value = ''
  if (!text.value.trim()) {
    dataUrl.value = ''
    return
  }
  try {
    dataUrl.value = await QRCode.toDataURL(text.value, {
      width: 320,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: { dark: '#000000', light: '#ffffff' },
    })
  } catch {
    error.value = 'Não foi possível gerar o QR Code para este conteúdo.'
  }
}

watch(text, render, { immediate: true })

function download() {
  if (!dataUrl.value) return
  const a = document.createElement('a')
  a.href = dataUrl.value
  a.download = 'qrcode.png'
  a.click()
  toast('Download iniciado!')
}
</script>

<template>
  <ToolPageLayout
    slug="qr-code"
    tip="Aponte a câmera do celular para testar. Funciona com links, textos, PIX copia-e-cola, Wi-Fi e mais."
  >
    <div class="space-y-4 rounded-2xl border border-border bg-card p-6">
      <label class="block font-medium" for="qr-in">Conteúdo do QR Code</label>
      <textarea
        id="qr-in"
        v-model="text"
        rows="3"
        autocomplete="off"
        placeholder="Digite um link ou texto..."
        class="w-full resize-y rounded-lg border border-border bg-background p-3 outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-ring"
      />
      <p v-if="error" class="text-sm text-destructive">{{ error }}</p>
    </div>

    <div v-if="dataUrl" class="flex animate-fade-in flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6">
      <img :src="dataUrl" alt="QR Code gerado" width="256" height="256" class="rounded-lg bg-white p-2" />
      <BaseButton @click="download">
        <Icon icon="lucide:download" class="h-4 w-4" /> Baixar PNG
      </BaseButton>
    </div>
  </ToolPageLayout>
</template>
