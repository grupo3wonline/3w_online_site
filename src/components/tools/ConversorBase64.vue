<template>
  <ToolShell
    title="Base64 Encode / Decode"
    description="Codifique e decodifique Base64 para texto, arquivos e imagens — com preview e download."
    icon="fa-code"
    icon-gradient="from-indigo-500 to-blue-800"
    orb-color="indigo"
    :quick-tips="['Texto, Arquivo & Imagem', 'URL-safe Base64', 'Preview de imagem', 'Download direto']"
    :tips="base64Tips"
  >
    <!-- ── Tabs ───────────────────────────────────────────────────────────── -->
    <div class="tab-row w-fit !flex-nowrap p-1 bg-white/5 rounded-xl">
      <button v-for="t in tabs" :key="t.id" @click="aba = t.id"
        :class="['flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all',
          aba === t.id ? 'bg-indigo-600 text-white shadow-sm' : 'text-blue-300 hover:text-white hover:bg-white/10']">
        <Icon :icon="t.icon" class="w-4 h-4" /> {{ t.label }}
      </button>
    </div>

    <!-- ══════════════════════════════════════════════════════════════════════
         ABA: TEXTO
    ═══════════════════════════════════════════════════════════════════════ -->
    <div v-if="aba === 'texto'" class="space-y-4">

      <!-- Modo encode/decode + options -->
      <div class="flex flex-wrap items-center gap-3">
        <div class="flex gap-1 p-1 bg-white/5 rounded-xl">
          <button @click="modoTexto='encode'; processarTexto()"
            :class="['px-4 py-1.5 rounded-lg text-sm font-semibold transition-all', modoTexto==='encode'?'bg-indigo-600 text-white':'text-blue-300 hover:text-white']">
            <Icon icon="mdi:arrow-right" class="w-3.5 h-3.5 inline mr-1" /> Encode
          </button>
          <button @click="modoTexto='decode'; processarTexto()"
            :class="['px-4 py-1.5 rounded-lg text-sm font-semibold transition-all', modoTexto==='decode'?'bg-indigo-600 text-white':'text-blue-300 hover:text-white']">
            <Icon icon="mdi:arrow-left" class="w-3.5 h-3.5 inline mr-1" /> Decode
          </button>
        </div>

        <div class="flex items-center gap-3 text-xs">
          <div>
            <label class="text-blue-300 mr-1.5">Charset:</label>
            <select v-model="charset" @change="processarTexto()" class="bg-white/10 text-white border border-white/20 rounded px-2 py-1 text-xs">
              <option value="utf8">UTF-8</option>
              <option value="latin1">Latin-1</option>
            </select>
          </div>
          <label class="flex items-center gap-1.5 text-blue-300 cursor-pointer">
            <input type="checkbox" v-model="urlSafe" @change="processarTexto()" class="accent-indigo-500 w-3.5 h-3.5" />
            URL-safe
          </label>
          <label class="flex items-center gap-1.5 text-blue-300 cursor-pointer">
            <input type="checkbox" v-model="quebraLinha76" @change="processarTexto()" class="accent-indigo-500 w-3.5 h-3.5" />
            Quebrar a 76 chars (MIME)
          </label>
        </div>
      </div>

      <div class="grid lg:grid-cols-2 gap-4">
        <!-- Input texto -->
        <div>
          <div class="flex justify-between items-center mb-1.5">
            <label class="text-xs font-semibold text-blue-300">
              {{ modoTexto === 'encode' ? 'Texto para codificar' : 'Base64 para decodificar' }}
            </label>
            <span class="text-[11px] text-blue-400">{{ textoEntrada.length }} chars</span>
          </div>
          <textarea
            v-model="textoEntrada"
            @input="processarTexto()"
            rows="12"
            spellcheck="false"
            :placeholder="modoTexto === 'encode' ? 'Digite ou cole o texto...' : 'Cole o Base64 aqui...'"
            class="input-aurora font-mono text-sm resize-y w-full"
          ></textarea>
          <div class="flex gap-2 mt-2">
            <button @click="colarTexto()" class="text-xs text-blue-400 hover:text-white px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-1">
              <Icon icon="mdi:content-paste" class="w-3 h-3" /> Colar
            </button>
            <button @click="trocarTexto()" class="text-xs text-blue-400 hover:text-white px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-1">
              <Icon icon="mdi:swap-horizontal" class="w-3 h-3" /> Trocar
            </button>
            <button @click="textoEntrada=''; textoSaida=''; erroTexto=''" class="text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded bg-red-500/10 hover:bg-red-500/20 transition-colors flex items-center gap-1">
              <Icon icon="mdi:delete-outline" class="w-3 h-3" /> Limpar
            </button>
          </div>
        </div>

        <!-- Output texto -->
        <div>
          <div class="flex justify-between items-center mb-1.5">
            <label class="text-xs font-semibold text-blue-300">
              {{ modoTexto === 'encode' ? 'Base64 gerado' : 'Texto decodificado' }}
            </label>
            <div class="flex gap-1.5">
              <span class="text-[11px] text-blue-400 mr-2">{{ textoSaida.length }} chars</span>
              <button @click="copiarTexto()" :disabled="!textoSaida" class="text-xs text-blue-400 hover:text-white px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-30 flex items-center gap-1">
                <Icon :icon="copiadoTexto?'mdi:check':'mdi:content-copy'" class="w-3 h-3" :class="copiadoTexto?'text-emerald-400':''" />
                {{ copiadoTexto ? 'Copiado!' : 'Copiar' }}
              </button>
            </div>
          </div>
          <div v-if="erroTexto" class="mb-2 p-2 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-300 flex items-center gap-1.5">
            <Icon icon="mdi:alert-circle-outline" class="w-4 h-4 shrink-0" /> {{ erroTexto }}
          </div>
          <textarea
            :value="textoSaida"
            readonly
            rows="12"
            spellcheck="false"
            class="input-aurora font-mono text-sm resize-y w-full bg-white/5 cursor-text"
            placeholder="O resultado aparecerá aqui..."
          ></textarea>

          <!-- Métricas -->
          <div v-if="textoEntrada && textoSaida" class="mt-2 grid grid-cols-3 gap-2">
            <div class="glass-panel px-2 py-1.5 text-center">
              <p class="text-[10px] text-blue-300">Original</p>
              <p class="text-xs font-mono font-bold text-white">{{ textoEntrada.length }} B</p>
            </div>
            <div class="glass-panel px-2 py-1.5 text-center">
              <p class="text-[10px] text-blue-300">{{ modoTexto==='encode'?'Base64':'Decoded' }}</p>
              <p class="text-xs font-mono font-bold text-white">{{ textoSaida.length }} B</p>
            </div>
            <div class="glass-panel px-2 py-1.5 text-center">
              <p class="text-[10px] text-blue-300">Overhead</p>
              <p class="text-xs font-mono font-bold" :class="modoTexto==='encode'?'text-amber-400':'text-emerald-400'">
                {{ modoTexto==='encode' ? '+' : '' }}{{ overhead }}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════════════════════════
         ABA: ARQUIVO
    ═══════════════════════════════════════════════════════════════════════ -->
    <div v-if="aba === 'arquivo'" class="space-y-4">

      <div class="grid lg:grid-cols-2 gap-4">
        <!-- Arquivo → Base64 -->
        <div class="glass-panel p-5 space-y-4">
          <h3 class="text-sm font-semibold text-white flex items-center gap-2">
            <Icon icon="mdi:file-upload-outline" class="w-5 h-5 text-indigo-400" />
            Arquivo → Base64
          </h3>
          <label class="flex flex-col items-center justify-center border-2 border-dashed border-white/20 hover:border-indigo-400/60 rounded-xl p-8 cursor-pointer transition-colors bg-white/5 hover:bg-white/10 group">
            <Icon icon="mdi:cloud-upload-outline" class="w-10 h-10 text-blue-400 group-hover:text-indigo-400 transition-colors mb-2" />
            <p class="text-sm text-blue-300 font-semibold">Clique ou arraste o arquivo</p>
            <p class="text-xs text-blue-400 mt-1">Qualquer tipo — até 5 MB</p>
            <input type="file" class="hidden" @change="arquivoParaBase64" />
          </label>
          <div v-if="arquivoInfo" class="text-xs text-blue-300 space-y-0.5">
            <p>📄 <strong class="text-white">{{ arquivoInfo.nome }}</strong></p>
            <p>Tipo: {{ arquivoInfo.tipo || 'desconhecido' }} · Tamanho: {{ arquivoInfo.tamanho }}</p>
          </div>
          <div v-if="arquivoBase64" class="space-y-2">
            <label class="text-xs font-semibold text-blue-300">Base64 gerado:</label>
            <div class="relative">
              <textarea :value="arquivoBase64" readonly rows="5" class="input-aurora font-mono text-xs w-full bg-white/5 cursor-text resize-none"></textarea>
              <button @click="copiarArquivoBase64()" class="absolute top-2 right-2 text-xs text-blue-400 hover:text-white px-2 py-1 rounded bg-white/10 transition-colors flex items-center gap-1">
                <Icon :icon="copiadoArq?'mdi:check':'mdi:content-copy'" class="w-3 h-3" :class="copiadoArq?'text-emerald-400':''" />
                {{ copiadoArq?'Copiado!':'Copiar' }}
              </button>
            </div>
            <div class="flex gap-2 text-xs text-blue-300">
              <span>Tamanho Base64: {{ arquivoBase64.length }} chars</span>
              <span>· Overhead: ~{{ Math.round((arquivoBase64.length / (arquivoInfo?.bytesRaw||1) - 1)*100) }}%</span>
            </div>
          </div>
        </div>

        <!-- Base64 → Arquivo -->
        <div class="glass-panel p-5 space-y-4">
          <h3 class="text-sm font-semibold text-white flex items-center gap-2">
            <Icon icon="mdi:file-download-outline" class="w-5 h-5 text-blue-400" />
            Base64 → Arquivo
          </h3>
          <div>
            <label class="text-xs font-semibold text-blue-300 mb-1.5 block">Cole o Base64:</label>
            <textarea
              v-model="base64ParaArquivo"
              rows="6"
              spellcheck="false"
              class="input-aurora font-mono text-xs w-full resize-none"
              placeholder="Cole o Base64 (ou data:...;base64,...) aqui..."
            ></textarea>
          </div>
          <div class="flex gap-2 items-center">
            <div class="flex-1">
              <label class="text-xs text-blue-300 mb-1 block">Nome do arquivo:</label>
              <input v-model="nomeArquivoDownload" class="input-aurora text-sm w-full" placeholder="arquivo.bin" />
            </div>
          </div>
          <button @click="baixarArquivo()"
            :disabled="!base64ParaArquivo.trim()"
            class="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-white rounded-lg font-semibold transition-colors">
            <Icon icon="mdi:download" class="w-4 h-4" /> Baixar Arquivo
          </button>
          <div v-if="erroArquivo" class="text-xs text-red-300 flex items-center gap-1.5">
            <Icon icon="mdi:alert-circle-outline" class="w-4 h-4" /> {{ erroArquivo }}
          </div>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════════════════════════
         ABA: IMAGEM
    ═══════════════════════════════════════════════════════════════════════ -->
    <div v-if="aba === 'imagem'" class="space-y-4">

      <div class="grid lg:grid-cols-2 gap-4">
        <!-- Imagem → Base64 -->
        <div class="glass-panel p-5 space-y-4">
          <h3 class="text-sm font-semibold text-white flex items-center gap-2">
            <Icon icon="mdi:image-plus-outline" class="w-5 h-5 text-pink-400" />
            Imagem → Base64
          </h3>
          <label class="flex flex-col items-center justify-center border-2 border-dashed border-white/20 hover:border-pink-400/60 rounded-xl p-6 cursor-pointer transition-colors bg-white/5 hover:bg-white/10 group">
            <Icon icon="mdi:image-outline" class="w-10 h-10 text-blue-400 group-hover:text-pink-400 transition-colors mb-2" />
            <p class="text-sm text-blue-300 font-semibold">Selecione uma imagem</p>
            <p class="text-xs text-blue-400 mt-1">PNG, JPG, GIF, WebP, SVG</p>
            <input type="file" accept="image/*" class="hidden" @change="imagemParaBase64" />
          </label>

          <div v-if="imagemPreview" class="space-y-2">
            <img :src="imagemPreview" alt="Preview" class="w-full max-h-40 object-contain rounded-lg border border-white/10 bg-white/5 p-1" />
            <p class="text-xs text-blue-300">{{ imagemInfo }}</p>
            <div class="relative">
              <label class="text-xs font-semibold text-blue-300 mb-1 block">Data URL (Base64):</label>
              <textarea :value="imagemBase64" readonly rows="4" class="input-aurora font-mono text-xs w-full bg-white/5 cursor-text resize-none"></textarea>
              <button @click="copiarImagemBase64()" class="absolute top-6 right-2 text-xs text-blue-400 hover:text-white px-2 py-1 rounded bg-white/10 transition-colors flex items-center gap-1">
                <Icon :icon="copiadoImg?'mdi:check':'mdi:content-copy'" class="w-3 h-3" :class="copiadoImg?'text-emerald-400':''" />
                {{ copiadoImg?'Copiado!':'Copiar' }}
              </button>
            </div>
            <div class="text-xs text-blue-300 space-y-0.5">
              <p>Uso em HTML: <code class="text-indigo-300">&lt;img src="{{ imagemBase64.slice(0,30) }}..."&gt;</code></p>
              <p>Uso em CSS: <code class="text-indigo-300">background-image: url("{{ imagemBase64.slice(0,20) }}...")</code></p>
            </div>
          </div>
        </div>

        <!-- Base64 → Imagem -->
        <div class="glass-panel p-5 space-y-4">
          <h3 class="text-sm font-semibold text-white flex items-center gap-2">
            <Icon icon="mdi:image-search-outline" class="w-5 h-5 text-blue-400" />
            Base64 → Imagem (Preview)
          </h3>
          <div>
            <label class="text-xs font-semibold text-blue-300 mb-1.5 block">Cole o Base64 ou Data URL:</label>
            <textarea
              v-model="base64ParaImagem"
              @input="previewBase64Imagem()"
              rows="6"
              spellcheck="false"
              class="input-aurora font-mono text-xs w-full resize-none"
              placeholder="data:image/png;base64,iVBORw0... ou só o base64 puro"
            ></textarea>
          </div>
          <div v-if="base64ImagemPreview" class="space-y-2">
            <img :src="base64ImagemPreview" alt="Preview" class="w-full max-h-56 object-contain rounded-lg border border-white/10 bg-white/5 p-2" />
            <button @click="baixarImagem()" class="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-colors">
              <Icon icon="mdi:download" class="w-4 h-4" /> Baixar Imagem
            </button>
          </div>
          <div v-else-if="base64ParaImagem.trim()" class="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-300 flex items-center gap-1.5">
            <Icon icon="mdi:alert-circle-outline" class="w-4 h-4" /> Base64 inválido ou não é uma imagem reconhecível
          </div>
          <div v-else class="flex items-center justify-center h-32 rounded-xl border border-white/10 bg-white/5 text-blue-300/40 text-sm">
            A imagem aparecerá aqui
          </div>
        </div>
      </div>
    </div>

  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Icon } from '@iconify/vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import Swal from 'sweetalert2'

// ─── Tabs ─────────────────────────────────────────────────────────────────────
const base64Tips = [
  { title: 'Base64 não é criptografia', text: 'Base64 é apenas codificação. Não use para proteger dados sensíveis sem criptografia adicional.', type: 'warning' as const },
  { title: 'URL-safe', text: 'A variante URL-safe substitui + por - e / por _, ideal para tokens em URLs e JWTs.', type: 'info' as const },
  { title: 'Imagens como data URL', text: 'Uma imagem em Base64 pode ser usada em HTML como data URL: src="data:image/png;base64,..."', type: 'info' as const },
]

const tabs = [
  { id: 'texto' as 'texto',     label: 'Texto',    icon: 'mdi:format-text' },
  { id: 'arquivo' as 'arquivo', label: 'Arquivo',  icon: 'mdi:file-outline' },
  { id: 'imagem' as 'imagem',   label: 'Imagem',   icon: 'mdi:image-outline' },
]
const aba = ref<'texto'|'arquivo'|'imagem'>('texto')

// ─── ABA TEXTO ────────────────────────────────────────────────────────────────
const modoTexto     = ref<'encode'|'decode'>('encode')
const textoEntrada  = ref('')
const textoSaida    = ref('')
const erroTexto     = ref('')
const charset       = ref<'utf8'|'latin1'>('utf8')
const urlSafe       = ref(false)
const quebraLinha76 = ref(false)
const copiadoTexto  = ref(false)

const overhead = computed(() => {
  if (!textoEntrada.value || !textoSaida.value) return '0'
  const a = textoEntrada.value.length, b = textoSaida.value.length
  return modoTexto.value === 'encode'
    ? Math.round((b / a - 1) * 100).toString()
    : Math.round((1 - b / a) * 100).toString()
})

function toBase64(str: string): string {
  let result: string
  if (charset.value === 'utf8') {
    result = btoa(unescape(encodeURIComponent(str)))
  } else {
    result = btoa(str)
  }
  if (urlSafe.value) result = result.replace(/\+/g, '-').replace(/\//g, '_')
  if (quebraLinha76.value) result = result.replace(/.{76}/g, '$&\n')
  return result
}

function fromBase64(str: string): string {
  let clean = str.trim().replace(/\s/g, '')
  if (urlSafe.value || clean.includes('-') || clean.includes('_')) {
    clean = clean.replace(/-/g, '+').replace(/_/g, '/')
  }
  if (charset.value === 'utf8') {
    return decodeURIComponent(escape(atob(clean)))
  } else {
    return atob(clean)
  }
}

function processarTexto() {
  if (!textoEntrada.value.trim()) { textoSaida.value = ''; erroTexto.value = ''; return }
  erroTexto.value = ''
  try {
    textoSaida.value = modoTexto.value === 'encode' ? toBase64(textoEntrada.value) : fromBase64(textoEntrada.value)
  } catch (e: any) {
    erroTexto.value = 'Erro: ' + e.message; textoSaida.value = ''
  }
}

function trocarTexto() {
  const tmp = textoEntrada.value
  textoEntrada.value = textoSaida.value
  textoSaida.value = tmp
  modoTexto.value = modoTexto.value === 'encode' ? 'decode' : 'encode'
  processarTexto()
}

async function colarTexto() {
  try {
    textoEntrada.value = await navigator.clipboard.readText()
    processarTexto()
  } catch { Swal.fire({ icon: 'error', title: 'Sem permissão para colar', timer: 1200, showConfirmButton: false }) }
}

function copiarTexto() {
  navigator.clipboard.writeText(textoSaida.value)
  copiadoTexto.value = true
  setTimeout(() => { copiadoTexto.value = false }, 2000)
}

// ─── ABA ARQUIVO ──────────────────────────────────────────────────────────────
interface ArquivoInfo { nome: string; tipo: string; tamanho: string; bytesRaw: number }
const arquivoBase64       = ref('')
const arquivoInfo         = ref<ArquivoInfo | null>(null)
const copiadoArq          = ref(false)
const base64ParaArquivo   = ref('')
const nomeArquivoDownload = ref('arquivo.bin')
const erroArquivo         = ref('')

function arquivoParaBase64(e: Event) {
  const f = (e.target as HTMLInputElement).files?.[0]
  if (!f) return
  if (f.size > 5 * 1024 * 1024) { Swal.fire({ icon: 'error', title: 'Arquivo muito grande', text: 'Máximo de 5 MB.', confirmButtonColor: '#4f46e5' }); return }
  const reader = new FileReader()
  reader.onload = (ev) => {
    const result = ev.target?.result as string
    arquivoBase64.value = result.split(',')[1] || result
    arquivoInfo.value = {
      nome: f.name, tipo: f.type, bytesRaw: f.size,
      tamanho: f.size < 1024 ? `${f.size} B` : f.size < 1024*1024 ? `${(f.size/1024).toFixed(1)} KB` : `${(f.size/1024/1024).toFixed(2)} MB`,
    }
  }
  reader.readAsDataURL(f)
  ;(e.target as HTMLInputElement).value = ''
}

function copiarArquivoBase64() {
  navigator.clipboard.writeText(arquivoBase64.value)
  copiadoArq.value = true
  setTimeout(() => { copiadoArq.value = false }, 2000)
}

function baixarArquivo() {
  erroArquivo.value = ''
  try {
    let b64 = base64ParaArquivo.value.trim()
    // Strip data URL prefix if present
    const dataUrlMatch = b64.match(/^data:[^;]+;base64,(.+)/)
    if (dataUrlMatch) b64 = dataUrlMatch[1]
    b64 = b64.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '')
    const binary = atob(b64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
    const blob = new Blob([bytes])
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = nomeArquivoDownload.value || 'arquivo.bin'
    a.click()
    URL.revokeObjectURL(a.href)
  } catch (e: any) {
    erroArquivo.value = 'Base64 inválido: ' + e.message
  }
}

// ─── ABA IMAGEM ───────────────────────────────────────────────────────────────
const imagemBase64       = ref('')
const imagemPreview      = ref('')
const imagemInfo         = ref('')
const copiadoImg         = ref(false)
const base64ParaImagem   = ref('')
const base64ImagemPreview = ref('')

function imagemParaBase64(e: Event) {
  const f = (e.target as HTMLInputElement).files?.[0]
  if (!f) return
  if (f.size > 5 * 1024 * 1024) { Swal.fire({ icon: 'error', title: 'Imagem muito grande', text: 'Máximo de 5 MB.', confirmButtonColor: '#4f46e5' }); return }
  const reader = new FileReader()
  reader.onload = (ev) => {
    const dataUrl = ev.target?.result as string
    imagemBase64.value  = dataUrl
    imagemPreview.value = dataUrl
    imagemInfo.value = `${f.name} · ${f.type} · ${f.size < 1024 ? f.size + ' B' : (f.size/1024).toFixed(1) + ' KB'} · Base64: ${dataUrl.length} chars`
  }
  reader.readAsDataURL(f)
  ;(e.target as HTMLInputElement).value = ''
}

function copiarImagemBase64() {
  navigator.clipboard.writeText(imagemBase64.value)
  copiadoImg.value = true
  setTimeout(() => { copiadoImg.value = false }, 2000)
}

function previewBase64Imagem() {
  const raw = base64ParaImagem.value.trim()
  if (!raw) { base64ImagemPreview.value = ''; return }
  if (raw.startsWith('data:image/')) {
    base64ImagemPreview.value = raw
    return
  }
  // Try to detect image type from raw b64
  const types = ['png','jpeg','gif','webp','svg+xml']
  for (const t of types) {
    base64ImagemPreview.value = `data:image/${t};base64,${raw.replace(/\s/g,'')}`
    return
  }
}

function baixarImagem() {
  if (!base64ImagemPreview.value) return
  const a = document.createElement('a')
  a.href = base64ImagemPreview.value
  a.download = 'imagem.' + (base64ImagemPreview.value.match(/data:image\/([^;]+)/)?.[1]?.replace('svg+xml','svg') || 'png')
  a.click()
}

watch(base64ParaImagem, previewBase64Imagem)
</script>

