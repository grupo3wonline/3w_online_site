<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

type Mode = 'home' | 'text-to-pdf' | 'pdf-extract'

const mode = ref<Mode>('home')

// --- Text to PDF ---
const pdfTitle = ref('')
const pdfContent = ref('')

function printAsPDF() {
  if (!pdfContent.value.trim()) {
    Swal.fire({ icon: 'warning', title: 'Conteúdo vazio', text: 'Digite algum texto para gerar o PDF.', confirmButtonColor: '#3b82f6' })
    return
  }
  const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>${pdfTitle.value || 'Documento'}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; color: #111; font-size: 12pt; }
        h1 { font-size: 18pt; margin-bottom: 20px; }
        pre { white-space: pre-wrap; }
      </style>
    </head>
    <body>
      ${pdfTitle.value ? `<h1>${pdfTitle.value}</h1>` : ''}
      <pre>${escapeHtml(pdfContent.value)}</pre>
    </body>
    </html>
  `
  const win = window.open('', '_blank')
  if (!win) {
    Swal.fire({ icon: 'info', title: 'Popup bloqueado', text: 'Permita popups para este site e tente novamente.', confirmButtonColor: '#3b82f6' })
    return
  }
  win.document.write(html)
  win.document.close()
  win.onload = () => {
    win.focus()
    win.print()
  }
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// --- PDF Text Extractor (via File API) ---
const extractedFile = ref<File | null>(null)
const extractedText = ref('')
const isExtracting = ref(false)
const copiedExtract = ref(false)

function handleExtractFile(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (files && files[0]) {
    extractedFile.value = files[0]
    extractedText.value = ''
  }
}

async function extractTextFromPDF() {
  if (!extractedFile.value) return
  isExtracting.value = true
  try {
    // Use FileReader to read text from PDF (basic extraction for text-based PDFs)
    const arrayBuffer = await extractedFile.value.arrayBuffer()
    const bytes = new Uint8Array(arrayBuffer)
    // Convert to string and extract visible text between stream markers
    let result = ''
    const decoder = new TextDecoder('latin1')
    const rawText = decoder.decode(bytes)
    // Extract text between BT...ET markers (PDF text objects)
    const matches = rawText.matchAll(/BT\s*([\s\S]*?)ET/g)
    for (const match of matches) {
      const block = match[1]
      // Extract content inside parentheses (Tj, TJ operators)
      const textParts = [...block.matchAll(/\(([^)]*)\)\s*T[jJ]/g)]
      for (const part of textParts) {
        result += part[1].replace(/\\n/g, '\n').replace(/\\r/g, '').replace(/\\/g, '') + ' '
      }
    }
    extractedText.value = result.trim() || 'Não foi possível extrair texto deste PDF. O arquivo pode ser um PDF de imagem (escaneado) ou ter proteção de cópia.'
  } catch (err) {
    extractedText.value = 'Erro ao processar o arquivo. Verifique se é um PDF válido.'
  } finally {
    isExtracting.value = false
  }
}

async function copyExtracted() {
  if (!extractedText.value) return
  await navigator.clipboard.writeText(extractedText.value)
  copiedExtract.value = true
  setTimeout(() => { copiedExtract.value = false }, 2000)
}

function downloadExtracted() {
  if (!extractedText.value) return
  const blob = new Blob([extractedText.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'texto-extraido.txt'
  a.click()
  URL.revokeObjectURL(url)
}

const wordCount = computed(() => pdfContent.value.trim() ? pdfContent.value.trim().split(/\s+/).length : 0)
</script>

<template>
  <div class="bg-[#0a1628] text-white min-h-screen p-4 md:p-6">
    <!-- Header -->
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:file-pdf-box" class="text-red-400 w-7 h-7" />
        PDF Convert Pro
      </h1>
      <p class="text-blue-300/70 text-sm">Ferramentas de PDF — processamento 100% no navegador</p>
    </div>

    <!-- Back Button -->
    <div v-if="mode !== 'home'" class="mb-4">
      <button @click="mode = 'home'" class="flex items-center gap-2 text-blue-300 hover:text-white text-sm transition-colors">
        <Icon icon="mdi:arrow-left" class="w-4 h-4" />
        Voltar ao menu
      </button>
    </div>

    <!-- Home -->
    <div v-if="mode === 'home'" class="max-w-2xl mx-auto space-y-4">
      <div class="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3 text-sm text-blue-300">
        <Icon icon="mdi:lock-outline" class="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-400" />
        <p>Todo o processamento ocorre localmente no seu navegador. Nenhum arquivo é enviado para servidores externos.</p>
      </div>

      <button @click="mode = 'text-to-pdf'"
        class="w-full bg-[#111d3a] border border-white/10 hover:border-blue-500/50 rounded-xl p-6 text-left transition-all group">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
            <Icon icon="mdi:file-document-outline" class="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <div class="text-white font-semibold group-hover:text-blue-300 transition-colors">Texto → PDF</div>
            <div class="text-blue-300/60 text-xs">Converta texto em PDF via impressão do navegador</div>
          </div>
        </div>
        <p class="text-blue-300/50 text-xs mt-1">Suporte a título, formatação básica e impressão direta</p>
      </button>

      <button @click="mode = 'pdf-extract'"
        class="w-full bg-[#111d3a] border border-white/10 hover:border-green-500/50 rounded-xl p-6 text-left transition-all group">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-12 h-12 rounded-xl bg-green-600/20 flex items-center justify-center">
            <Icon icon="mdi:file-search-outline" class="w-6 h-6 text-green-400" />
          </div>
          <div>
            <div class="text-white font-semibold group-hover:text-green-300 transition-colors">PDF → Texto</div>
            <div class="text-blue-300/60 text-xs">Extraia texto de PDFs baseados em texto (não imagem)</div>
          </div>
        </div>
        <p class="text-blue-300/50 text-xs mt-1">Funciona com PDFs de texto puro. PDFs escaneados requerem OCR externo.</p>
      </button>
    </div>

    <!-- Text to PDF Mode -->
    <div v-if="mode === 'text-to-pdf'" class="max-w-2xl mx-auto space-y-4">
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-5 space-y-4">
        <h2 class="text-sm font-semibold text-blue-200">Converter Texto em PDF</h2>
        <div>
          <label class="text-blue-300 text-xs block mb-1">Título do documento (opcional)</label>
          <input v-model="pdfTitle" placeholder="Ex: Relatório Mensal"
            class="w-full bg-[#0a1628] border border-white/20 text-white rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label class="text-blue-300 text-xs block mb-1">
            Conteúdo <span class="text-blue-400/60">— {{ wordCount }} palavras</span>
          </label>
          <textarea v-model="pdfContent" rows="12" placeholder="Digite ou cole o seu texto aqui..."
            class="w-full bg-[#0a1628] border border-white/10 text-white rounded-lg px-3 py-2 text-sm resize-none focus:border-blue-500 focus:outline-none placeholder-blue-300/30" />
        </div>
        <button @click="printAsPDF"
          :disabled="!pdfContent.trim()"
          class="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm">
          <Icon icon="mdi:printer-outline" class="w-4 h-4" />
          Abrir diálogo de impressão (Salvar como PDF)
        </button>
        <p class="text-blue-300/50 text-xs text-center">Dica: Na janela de impressão, selecione "Salvar como PDF" como destino.</p>
      </div>
    </div>

    <!-- PDF Extract Mode -->
    <div v-if="mode === 'pdf-extract'" class="max-w-2xl mx-auto space-y-4">
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-5 space-y-4">
        <h2 class="text-sm font-semibold text-blue-200">Extrair Texto de PDF</h2>

        <!-- Drop Zone -->
        <label class="block border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-green-500/50 hover:bg-green-500/5 transition-all">
          <Icon icon="mdi:cloud-upload-outline" class="w-10 h-10 mx-auto mb-3 text-green-400" />
          <p class="text-blue-200 text-sm font-medium">{{ extractedFile ? extractedFile.name : 'Clique para selecionar um PDF' }}</p>
          <p class="text-blue-300/50 text-xs mt-1">Apenas arquivos PDF</p>
          <input type="file" accept=".pdf" class="sr-only" @change="handleExtractFile" />
        </label>

        <button @click="extractTextFromPDF"
          :disabled="!extractedFile || isExtracting"
          class="w-full bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm">
          <Icon :icon="isExtracting ? 'mdi:loading' : 'mdi:text-search'" :class="isExtracting ? 'animate-spin' : ''" class="w-4 h-4" />
          {{ isExtracting ? 'Processando...' : 'Extrair Texto' }}
        </button>
      </div>

      <div v-if="extractedText" class="bg-[#111d3a] border border-white/10 rounded-xl p-5 space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-semibold text-blue-200">Texto Extraído</h3>
          <div class="flex gap-2">
            <button @click="copyExtracted"
              :class="copiedExtract ? 'bg-emerald-700' : 'bg-white/10 hover:bg-white/20'"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors">
              <Icon :icon="copiedExtract ? 'mdi:check' : 'mdi:content-copy'" class="w-3.5 h-3.5" />
              {{ copiedExtract ? 'Copiado' : 'Copiar' }}
            </button>
            <button @click="downloadExtracted"
              class="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded text-xs transition-colors">
              <Icon icon="mdi:download" class="w-3.5 h-3.5" />
              Baixar TXT
            </button>
          </div>
        </div>
        <textarea :value="extractedText" readonly rows="10"
          class="w-full bg-[#0a1628] border border-white/10 text-blue-100 rounded-lg px-3 py-2 text-xs font-mono resize-none focus:outline-none" />
      </div>
    </div>
  </div>
</template>
