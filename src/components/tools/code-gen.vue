<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, watch, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import QRCode from 'qrcode'
import Swal from 'sweetalert2'

const inputText = ref('')
const activeTab = ref<'qrcode' | 'barcode'>('qrcode')
const qrCanvas = ref<HTMLCanvasElement | null>(null)
const barcodeCanvas = ref<HTMLCanvasElement | null>(null)
const isGenerating = ref(false)
const barcodeError = ref('')
const copied = ref(false)

async function generateQR() {
  if (!qrCanvas.value || !inputText.value) return
  isGenerating.value = true
  try {
    await QRCode.toCanvas(qrCanvas.value, inputText.value, {
      width: 280,
      margin: 2,
      color: { dark: '#1e293b', light: '#ffffff' },
    })
  } catch (e) {
    console.error(e)
  } finally {
    isGenerating.value = false
  }
}

// Pure JS Code128 barcode renderer
function drawCode128(canvas: HTMLCanvasElement, text: string) {
  // Code128 bar patterns (B subset, ASCII 32-127)
  const CODE128_B: Record<number, string> = {}
  const patterns = [
    '11011001100','11001101100','11001100110','10010011000','10010001100',
    '10001001100','10011001000','10011000100','10001100100','11001001000',
    '11001000100','11000100100','10110011100','10011011100','10011001110',
    '10111001100','10011101100','10011100110','11001110010','11001011100',
    '11001001110','11011100100','11001110100','11101101110','11101001100',
    '11100101100','11100100110','11101100100','11100110100','11100110010',
    '11011011000','11011000110','11000110110','10100011000','10001011000',
    '10001000110','10110001000','10001101000','10001100010','11010001000',
    '11000101000','11000100010','10110111000','10110001110','10001101110',
    '10111011000','10111000110','10001110110','11101110110','11010001110',
    '11000101110','11011101000','11011100010','11011101110','11101011000',
    '11101000110','11100010110','11101101000','11101100010','11100011010',
    '11101111010','11001000010','11110001010','10100110000','10100001100',
    '10010110000','10010000110','10000101100','10000100110','10110010000',
    '10110000100','10011010000','10011000010','10000110100','10000110010',
    '11000010010','11001010000','11110111010','11000010100','10001111010',
    '10100111100','10010111100','10010011110','10111100100','10011110100',
    '10011110010','11110100100','11110010100','11110010010','11011011110',
    '11011110110','11110110110','10101111000','10100011110','10001011110',
    '10111101000','10111100010','11110101000','11110100010','10111011110',
    '10111101110','11101011110','11110101110','11010000100','11010010000',
    '11010011100','11000111010',
  ]
  patterns.forEach((p, i) => { CODE128_B[i] = p })

  const START_B = '11010010000'
  const STOP    = '1100011101011'

  let encoded = START_B
  let checksum = 104 // START B value
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i) - 32
    if (code < 0 || code > 95) return false
    encoded += patterns[code] || ''
    checksum += (code + 1) * (i + 1)
  }
  encoded += patterns[checksum % 103] || ''
  encoded += STOP

  const moduleWidth = 2
  const height = 100
  const padding = 20
  const totalWidth = encoded.length * moduleWidth + padding * 2

  canvas.width = totalWidth
  canvas.height = height + 30

  const ctx = canvas.getContext('2d')
  if (!ctx) return false
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#1e293b'

  let x = padding
  for (const bit of encoded) {
    if (bit === '1') ctx.fillRect(x, 10, moduleWidth, height)
    x += moduleWidth
  }

  ctx.fillStyle = '#1e293b'
  ctx.font = '12px monospace'
  ctx.textAlign = 'center'
  ctx.fillText(text.length > 20 ? text.slice(0, 20) + '…' : text, canvas.width / 2, height + 25)
  return true
}

function generateBarcode() {
  if (!barcodeCanvas.value || !inputText.value) return
  barcodeError.value = ''
  const ok = drawCode128(barcodeCanvas.value, inputText.value)
  if (!ok) {
    barcodeError.value = 'Use apenas caracteres ASCII (32–127) para gerar o código de barras.'
  }
}

watch(inputText, () => {
  if (activeTab.value === 'qrcode') generateQR()
  else generateBarcode()
})

watch(activeTab, () => {
  if (activeTab.value === 'qrcode') generateQR()
  else generateBarcode()
})

function downloadCode() {
  const canvas = activeTab.value === 'qrcode' ? qrCanvas.value : barcodeCanvas.value
  if (!canvas || !inputText.value) return
  const link = document.createElement('a')
  link.download = activeTab.value === 'qrcode' ? 'qrcode.png' : 'barcode.png'
  link.href = canvas.toDataURL()
  link.click()
  Swal.fire({ icon: 'success', title: 'Download iniciado!', timer: 1500, showConfirmButton: false })
}

async function copyText() {
  if (!inputText.value) return
  await navigator.clipboard.writeText(inputText.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <ToolShell

    title="CodeGen QR & Barcode"

    description="Gere QR Codes e códigos de barras personalizados com cores e tamanhos."

    icon="fa-qrcode"

    icon-gradient="from-slate-500 to-blue-700"

    orb-color="blue"

    :quick-tips="['Resultados instantâneos', 'Sem cadastro', '100% client-side']"

    :tips="[{ title: 'Uso recomendado', text: 'Preencha todos os campos e veja o resultado em tempo real.' }]"

  >

    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:qrcode" class="text-blue-400 w-7 h-7" />
        Gerador de Códigos
      </h1>
      <p class="text-blue-200 text-sm">Crie QR Codes e Códigos de Barras profissionais</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Input Section -->
      <div class="glass-panel p-5 space-y-5">
        <h2 class="text-white font-semibold flex items-center gap-2">
          <Icon icon="mdi:cog-outline" class="text-blue-400 w-5 h-5" />
          Configurações
        </h2>

        <div class="space-y-2">
          <label class="text-sm text-blue-200">Texto ou URL</label>
          <div class="relative">
            <input
              v-model="inputText"
              type="text"
              placeholder="Digite seu texto, URL ou dados aqui..."
              class="w-full input-aurora font-mono"
            />
            <button v-if="inputText" @click="copyText"
              class="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-blue-300 hover:text-white transition-colors">
              <Icon :icon="copied ? 'mdi:check' : 'mdi:content-copy'" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Tabs -->
        <div class="space-y-2">
          <label class="text-sm text-blue-200">Tipo de Código</label>
          <div class="flex gap-2 bg-[#0a1628] border border-white/10 rounded-lg p-1">
            <button
              @click="activeTab = 'qrcode'"
              :class="activeTab === 'qrcode' ? 'bg-blue-600 text-white' : 'text-blue-300 hover:text-white'"
              class="flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-colors">
              <Icon icon="mdi:qrcode" class="w-4 h-4" />
              QR Code
            </button>
            <button
              @click="activeTab = 'barcode'"
              :class="activeTab === 'barcode' ? 'bg-blue-600 text-white' : 'text-blue-300 hover:text-white'"
              class="flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-colors">
              <Icon icon="mdi:barcode" class="w-4 h-4" />
              Código de Barras
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 text-xs text-blue-200 pt-2 border-t border-white/5">
          <div>
            <strong class="block text-white mb-1">QR Code ideal para:</strong>
            <ul class="space-y-0.5">
              <li>• URLs e links</li>
              <li>• Textos longos</li>
              <li>• Contatos (vCard)</li>
              <li>• WiFi credentials</li>
            </ul>
          </div>
          <div>
            <strong class="block text-white mb-1">Código de Barras para:</strong>
            <ul class="space-y-0.5">
              <li>• Produtos (SKU)</li>
              <li>• Números</li>
              <li>• Identificadores</li>
              <li>• Inventário</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Preview Section -->
      <div class="glass-panel p-5 space-y-5">
        <h2 class="text-white font-semibold flex items-center gap-2">
          <Icon icon="mdi:eye-outline" class="text-blue-400 w-5 h-5" />
          Pré-visualização
        </h2>

        <div class="min-h-[280px] flex flex-col items-center justify-center">
          <div v-if="!inputText" class="text-center text-blue-300/60">
            <div class="w-20 h-20 bg-white/5 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon :icon="activeTab === 'qrcode' ? 'mdi:qrcode' : 'mdi:barcode'" class="w-10 h-10" />
            </div>
            <p class="text-sm">Digite algo acima para gerar o código</p>
          </div>

          <template v-else>
            <!-- QR Code canvas -->
            <div v-if="activeTab === 'qrcode'" class="bg-white p-4 rounded-xl shadow-lg relative">
              <canvas ref="qrCanvas" :class="isGenerating ? 'opacity-50' : ''" class="max-w-full" />
              <div v-if="isGenerating" class="absolute inset-0 flex items-center justify-center">
                <Icon icon="mdi:loading" class="w-8 h-8 text-blue-500 animate-spin" />
              </div>
            </div>

            <!-- Barcode canvas -->
            <div v-else class="bg-white p-4 rounded-xl shadow-lg w-full">
              <div v-if="barcodeError" class="text-red-500 text-sm text-center px-4">
                <Icon icon="mdi:alert-circle-outline" class="w-5 h-5 mx-auto mb-1" />
                {{ barcodeError }}
              </div>
              <canvas v-else ref="barcodeCanvas" class="max-w-full mx-auto block" />
            </div>
          </template>
        </div>

        <button
          v-if="inputText && !barcodeError"
          @click="downloadCode"
          class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
          <Icon icon="mdi:download" class="w-4 h-4" />
          Baixar PNG
        </button>
      </div>
    </div>
  


  </ToolShell></template>