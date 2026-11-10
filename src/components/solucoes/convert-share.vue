<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

type Step = 'upload' | 'convert' | 'share'

const step = ref<Step>('upload')
const selectedFile = ref<File | null>(null)
const outputFormat = ref('')
const conversionProgress = ref(0)
const isConverting = ref(false)
const shareLink = ref('')
const isDragging = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const supportedFormats = [
  { value: 'pdf', label: 'PDF', desc: 'Portable Document Format' },
  { value: 'docx', label: 'DOCX', desc: 'Microsoft Word' },
  { value: 'xlsx', label: 'XLSX', desc: 'Microsoft Excel' },
  { value: 'jpg', label: 'JPG', desc: 'JPEG Image' },
  { value: 'png', label: 'PNG', desc: 'Portable Network Graphics' },
  { value: 'mp4', label: 'MP4', desc: 'Video Format' },
  { value: 'mp3', label: 'MP3', desc: 'Audio Format' },
  { value: 'txt', label: 'TXT', desc: 'Plain Text' },
]

function handleFileSelect(file: File) {
  selectedFile.value = file
  Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 1800 })
    .fire({ icon: 'success', title: `${file.name} carregado!` })
}

function onFileInput(e: Event) {
  const f = (e.target as HTMLInputElement).files?.[0]
  if (f) handleFileSelect(f)
}

function onDrop(e: DragEvent) {
  e.preventDefault(); isDragging.value = false
  const f = e.dataTransfer?.files[0]
  if (f) handleFileSelect(f)
}

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

async function handleConvert() {
  if (!selectedFile.value || !outputFormat.value) {
    Swal.fire({ icon: 'warning', title: 'Selecione um arquivo e formato!', confirmButtonColor: '#3b82f6' })
    return
  }
  isConverting.value = true
  step.value = 'convert'
  conversionProgress.value = 0
  for (let i = 0; i <= 100; i += 10) {
    conversionProgress.value = i
    await new Promise(r => setTimeout(r, 180))
  }
  await new Promise(r => setTimeout(r, 1200))
  shareLink.value = `https://file.io/${Math.random().toString(36).slice(2, 10)}`
  step.value = 'share'
  isConverting.value = false
  Swal.fire({ icon: 'success', title: 'Conversão concluída!', text: 'Link de compartilhamento gerado.', timer: 2000, showConfirmButton: false })
}

async function copyLink() {
  if (!shareLink.value) return
  await navigator.clipboard.writeText(shareLink.value)
  Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 1500 })
    .fire({ icon: 'success', title: 'Link copiado!' })
}

function reset() {
  step.value = 'upload'
  selectedFile.value = null
  outputFormat.value = ''
  conversionProgress.value = 0
  isConverting.value = false
  shareLink.value = ''
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-4 space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:file-convert-outline" class="text-blue-400 w-7 h-7" />
        ConvertShare — Conversor de Arquivos
      </h1>
      <p class="text-blue-200 text-sm">Converta seus arquivos e gere links de compartilhamento</p>
    </div>

    <!-- Step indicators -->
    <div class="flex items-center justify-center gap-4">
      <div v-for="(s, i) in [['upload','Upload','mdi:upload-outline'],['convert','Converter','mdi:file-sync-outline'],['share','Compartilhar','mdi:share-variant-outline']]" :key="s[0]"
        class="flex items-center gap-2">
        <div :class="[
          'w-9 h-9 rounded-full flex items-center justify-center',
          step === s[0] ? 'bg-blue-600 text-white' :
          (i < ['upload','convert','share'].indexOf(step)) ? 'bg-green-600 text-white' : 'bg-white/10 text-blue-300'
        ]">
          <Icon :icon="String(s[2])" class="w-4 h-4" />
        </div>
        <span class="text-sm text-blue-200 hidden sm:block">{{ s[1] }}</span>
        <div v-if="i < 2" class="w-8 h-0.5 bg-white/10 mx-1 hidden sm:block" />
      </div>
    </div>

    <!-- Upload Step -->
    <template v-if="step === 'upload'">
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-6 space-y-5">
        <!-- Drop zone -->
        <div
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop="onDrop"
          @click="fileInput?.click()"
          :class="isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-white/20 hover:border-white/40'"
          class="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors">
          <input ref="fileInput" type="file" class="hidden" @change="onFileInput" />
          <Icon icon="mdi:upload-outline" class="w-12 h-12 text-blue-400 mx-auto mb-3" />
          <p class="text-white font-medium mb-1">Arraste seus arquivos aqui ou clique para selecionar</p>
          <p class="text-blue-300/60 text-sm">Suporta qualquer formato de arquivo</p>
        </div>

        <!-- Selected file -->
        <div v-if="selectedFile" class="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
          <Icon icon="mdi:file-outline" class="w-8 h-8 text-blue-400 shrink-0" />
          <div class="flex-1 min-w-0">
            <p class="text-white font-medium truncate">{{ selectedFile.name }}</p>
            <p class="text-blue-300 text-sm">{{ formatSize(selectedFile.size) }}</p>
          </div>
          <Icon icon="mdi:check-circle" class="w-5 h-5 text-green-400 shrink-0" />
        </div>

        <!-- Format selection -->
        <div v-if="selectedFile" class="space-y-3">
          <label class="text-sm text-blue-200">Formato de Saída</label>
          <select v-model="outputFormat"
            class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50">
            <option value="" disabled>Selecione o formato desejado</option>
            <option v-for="f in supportedFormats" :key="f.value" :value="f.value">{{ f.label }} — {{ f.desc }}</option>
          </select>

          <button v-if="outputFormat" @click="handleConvert"
            class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
            <Icon icon="mdi:file-convert-outline" class="w-5 h-5" />
            Converter para {{ outputFormat.toUpperCase() }}
          </button>
        </div>
      </div>
    </template>

    <!-- Convert Step -->
    <template v-else-if="step === 'convert'">
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-8 text-center space-y-6">
        <Icon icon="mdi:file-sync-outline" class="w-16 h-16 text-blue-400 mx-auto animate-spin" />
        <div>
          <h2 class="text-white text-xl font-bold mb-1">Convertendo arquivo...</h2>
          <p class="text-blue-300 text-sm">{{ selectedFile?.name }} → {{ outputFormat?.toUpperCase() }}</p>
        </div>
        <div class="max-w-md mx-auto space-y-2">
          <div class="flex justify-between text-sm text-blue-300">
            <span>Progresso</span>
            <span>{{ conversionProgress }}%</span>
          </div>
          <div class="w-full bg-white/10 rounded-full h-3">
            <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-200"
              :style="{ width: conversionProgress + '%' }" />
          </div>
        </div>
      </div>
    </template>

    <!-- Share Step -->
    <template v-else>
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-8 text-center space-y-6">
        <div class="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
          <Icon icon="mdi:check-circle-outline" class="w-10 h-10 text-green-400" />
        </div>
        <div>
          <h2 class="text-white text-xl font-bold mb-1">Arquivo Convertido!</h2>
          <p class="text-blue-300 text-sm">Seu link de compartilhamento foi gerado</p>
        </div>

        <div class="max-w-md mx-auto space-y-3">
          <div class="bg-[#0a1628] border border-white/10 rounded-lg px-3 py-2.5 text-blue-300 font-mono text-sm truncate">
            {{ shareLink }}
          </div>
          <div class="flex gap-3">
            <button @click="copyLink"
              class="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
              <Icon icon="mdi:content-copy" class="w-4 h-4" />
              Copiar Link
            </button>
            <button @click="reset"
              class="flex-1 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
              <Icon icon="mdi:refresh" class="w-4 h-4" />
              Novo Arquivo
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
