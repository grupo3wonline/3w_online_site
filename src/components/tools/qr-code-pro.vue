<script setup lang="ts">
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import QRCode from 'qrcode'
import Swal from 'sweetalert2'

const inputValue = ref('')
const qrCanvas = ref<HTMLCanvasElement | null>(null)
const hasQR = ref(false)
const isGenerating = ref(false)
const textBelow = ref('')
const copied = ref(false)

async function generateQR() {
  if (!inputValue.value.trim()) return
  if (!qrCanvas.value) return
  isGenerating.value = true
  try {
    await QRCode.toCanvas(qrCanvas.value, inputValue.value, {
      width: 280,
      margin: 2,
      color: { dark: '#1e293b', light: '#ffffff' },
    })
    hasQR.value = true
  } catch (e) {
    Swal.fire({ icon: 'error', title: 'Erro ao gerar QR', text: String(e), confirmButtonColor: '#3b82f6' })
  } finally {
    isGenerating.value = false
  }
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter') generateQR()
}

async function downloadPNG() {
  if (!qrCanvas.value || !hasQR.value) return
  const canvas = document.createElement('canvas')
  const extraH = textBelow.value ? 60 : 0
  canvas.width = 280
  canvas.height = 280 + extraH
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(qrCanvas.value, 0, 0)
  if (textBelow.value) {
    ctx.fillStyle = '#1e293b'
    ctx.font = 'bold 16px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(textBelow.value, 140, 300)
  }
  const link = document.createElement('a')
  link.download = 'qrcode-pro.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
  Swal.fire({ icon: 'success', title: 'Download iniciado!', timer: 1200, showConfirmButton: false })
}

async function copyQR() {
  if (!qrCanvas.value || !hasQR.value) return
  const canvas = qrCanvas.value
  canvas.toBlob(async (blob) => {
    if (!blob) return
    try {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      copied.value = true
      setTimeout(() => { copied.value = false }, 2000)
    } catch {
      Swal.fire({ icon: 'info', title: 'Copie manualmente', text: 'Clique com botão direito na imagem para copiar.', confirmButtonColor: '#3b82f6' })
    }
  })
}

watch(textBelow, () => {
  if (hasQR.value) generateQR()
})
</script>

<template>
  <div class="bg-[#0a1628] text-white min-h-screen p-4 md:p-6">
    <!-- Header -->
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:qrcode-scan" class="text-blue-400 w-7 h-7" />
        QR Code Pro
      </h1>
      <p class="text-blue-300/70 text-sm">Gere QR Codes com download em alta qualidade</p>
    </div>

    <div class="max-w-lg mx-auto space-y-4">
      <!-- Input -->
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-5 space-y-3">
        <label class="text-blue-200 text-sm font-medium block">URL, texto ou mensagem</label>
        <input
          v-model="inputValue"
          @keydown="handleKeyDown"
          placeholder="https://exemplo.com ou qualquer texto..."
          class="w-full bg-[#0a1628] border border-white/20 text-white rounded-lg px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none placeholder-blue-300/30"
        />
        <label class="text-blue-200 text-sm font-medium block">Texto abaixo (opcional)</label>
        <input
          v-model="textBelow"
          placeholder="Ex: www.meusite.com.br"
          class="w-full bg-[#0a1628] border border-white/20 text-white rounded-lg px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none placeholder-blue-300/30"
        />
        <button
          @click="generateQR"
          :disabled="isGenerating || !inputValue.trim()"
          class="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
        >
          <Icon :icon="isGenerating ? 'mdi:loading' : 'mdi:qrcode'" :class="isGenerating ? 'animate-spin' : ''" class="w-4 h-4" />
          {{ isGenerating ? 'Gerando...' : 'Gerar QR Code' }}
        </button>
      </div>

      <!-- QR Code Preview -->
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-5 flex flex-col items-center space-y-4">
        <div
          :class="hasQR ? 'opacity-100' : 'opacity-30'"
          class="bg-white p-4 rounded-xl shadow-lg transition-opacity"
        >
          <canvas ref="qrCanvas" class="block" />
          <p v-if="textBelow && hasQR" class="text-center text-xs text-gray-700 font-semibold mt-2 max-w-[280px] truncate">
            {{ textBelow }}
          </p>
        </div>

        <div v-if="!hasQR" class="text-blue-300/50 text-sm text-center">
          <Icon icon="mdi:qrcode" class="w-10 h-10 mx-auto mb-2" />
          <p>Digite algo acima e clique em Gerar</p>
        </div>

        <div v-if="hasQR" class="flex gap-3">
          <button
            @click="copyQR"
            :class="copied ? 'bg-emerald-700' : 'bg-white/10 hover:bg-white/20'"
            class="flex items-center gap-2 px-5 py-2 rounded-lg text-sm transition-colors"
          >
            <Icon :icon="copied ? 'mdi:check' : 'mdi:content-copy'" class="w-4 h-4" />
            {{ copied ? 'Copiado!' : 'Copiar' }}
          </button>
          <button
            @click="downloadPNG"
            class="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm transition-colors"
          >
            <Icon icon="mdi:download" class="w-4 h-4" />
            Baixar PNG
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
