<template>
  <ToolShell
    title="Gerador de QR Code"
    description="Crie QR Codes personalizados para URLs, texto, e-mail, WhatsApp ou qualquer dado — download em PNG."
    icon="fa-qrcode"
    icon-gradient="from-slate-600 to-slate-900"
    orb-color="blue"
    :quick-tips="['Download em PNG', 'Personalização de cores', 'Pré-sets prontos']"
    :tips="[
      { title: 'Tamanho mínimo', text: 'QR Codes devem ter no mínimo 2cm × 2cm impressos para leitura confiável.' },
      { title: 'Contraste',      text: 'Sempre use fundo claro com código escuro. Fundo escuro dificulta a leitura.', type: 'warning' },
      { title: 'URL curta',      text: 'Quanto menor o conteúdo, menor o QR Code e mais fácil a leitura. Use encurtadores de URL.', type: 'info' },
    ]"
    :examples="[
      { title: 'Link de website',   desc: 'https://www.3wonline.com.br',                result: 'QR Code que abre o site' },
      { title: 'WhatsApp direto',   desc: 'https://wa.me/5541996924829?text=Olá!',      result: 'QR Code que abre conversa' },
      { title: 'Vcard / contato',   desc: 'BEGIN:VCARD\nFN:João Silva\nTEL:+55...',    result: 'QR Code que adiciona contato' },
    ]"
  >
    <!-- ── Pré-sets ──────────────────────────────────────────── -->
    <div class="tool-section mb-4">
      <p class="input-aurora-label">
        <i class="fas fa-magic mr-1.5 text-purple-500"></i>
        Pré-sets rápidos
      </p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="preset in presets"
          :key="preset.tipo"
          :class="[
            'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all',
            tipoSelecionado === preset.tipo
              ? 'bg-primary-600 text-white border-primary-600'
              : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-200 border-gray-200 dark:border-slate-600 hover:border-primary-400'
          ]"
          @click="selecionarPreset(preset)"
        >
          <i :class="['fas', preset.icon, 'mr-1']"></i>
          {{ preset.tipo }}
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Coluna: Configuração -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <div class="space-y-3">
            <div>
              <label class="input-aurora-label">
                <i class="fas fa-align-left mr-1.5 text-primary-500"></i>
                Conteúdo do QR Code
              </label>
              <textarea
                v-model="conteudo"
                :placeholder="placeholder"
                rows="4"
                class="input-aurora resize-none"
                @input="gerar"
              ></textarea>
              <p class="input-aurora-hint">{{ conteudo.length }} caracteres · {{ qualidadeInfo }}</p>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="input-aurora-label">
                  <i class="fas fa-paint-brush mr-1 text-purple-500"></i>
                  Cor do código
                </label>
                <input type="color" v-model="corCodigo" @change="gerar"
                  class="w-full h-10 rounded-xl border border-gray-200 dark:border-slate-600 cursor-pointer p-0.5" />
              </div>
              <div>
                <label class="input-aurora-label">
                  <i class="fas fa-fill-drip mr-1 text-teal-500"></i>
                  Cor do fundo
                </label>
                <input type="color" v-model="corFundo" @change="gerar"
                  class="w-full h-10 rounded-xl border border-gray-200 dark:border-slate-600 cursor-pointer p-0.5" />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between mb-1">
                <label class="input-aurora-label !mb-0">
                  <i class="fas fa-expand mr-1 text-orange-500"></i>
                  Tamanho (px)
                </label>
                <span class="font-bold text-primary-600 dark:text-primary-400">{{ tamanho }}px</span>
              </div>
              <input v-model.number="tamanho" type="range" min="128" max="512" step="32" class="range-aurora" @input="gerar" />
            </div>

            <div>
              <label class="input-aurora-label">
                <i class="fas fa-shield-alt mr-1 text-green-500"></i>
                Nível de correção de erros
              </label>
              <div class="grid grid-cols-4 gap-1.5">
                <button
                  v-for="nivel in niveis"
                  :key="nivel.value"
                  :class="[
                    'py-2 rounded-lg text-xs font-bold border transition-all',
                    correcao === nivel.value
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-200 border-gray-200 dark:border-slate-600 hover:border-primary-300'
                  ]"
                  :title="nivel.desc"
                  @click="correcao = nivel.value; gerar()"
                >
                  {{ nivel.value }}
                  <span class="block text-[10px] opacity-60">{{ nivel.percent }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Coluna: Preview -->
      <div class="flex flex-col items-center gap-4">
        <div class="glass-card p-5 w-full flex flex-col items-center">
          <p class="text-xs text-gray-500 dark:text-slate-400 font-semibold mb-4">
            <i class="fas fa-eye mr-1"></i>
            Preview
          </p>
          <div class="relative">
            <canvas
              ref="canvasRef"
              :width="tamanho"
              :height="tamanho"
              class="max-w-full rounded-lg border border-gray-100 dark:border-slate-700 shadow-sm"
              style="max-width: 240px; image-rendering: pixelated;"
            ></canvas>
            <div v-if="gerando" class="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-slate-900/80 rounded-lg">
              <i class="fas fa-spinner fa-spin text-primary-600 text-xl"></i>
            </div>
          </div>
          <p v-if="conteudo" class="text-[11px] text-gray-400 dark:text-slate-500 mt-3 max-w-[200px] truncate text-center">
            {{ conteudo }}
          </p>
          <div v-if="!conteudo" class="text-xs text-gray-400 dark:text-slate-500 text-center mt-2">
            Digite o conteúdo para gerar
          </div>
        </div>

        <div class="flex gap-2 w-full">
          <BaseButton variant="primary" icon="fa-download" @click="baixar" :disabled="!conteudo" class="flex-1">
            Baixar PNG
          </BaseButton>
          <BaseButton variant="outline" icon="fa-copy" @click="copiarImagem" :disabled="!conteudo">
            Copiar
          </BaseButton>
        </div>

        <div v-if="conteudo" class="tip-card-success w-full">
          <i class="fas fa-check-circle text-emerald-500 flex-shrink-0 mt-0.5"></i>
          <span>
            Correção <strong>{{ correcao }}</strong> — suporta até
            <strong>{{ niveis.find(n => n.value === correcao)?.maxDano }}</strong> de dano físico
          </span>
        </div>
      </div>
    </div>

  </ToolShell>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Swal from 'sweetalert2'
// @ts-ignore
import QRCode from 'qrcode'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

// ─── Estado ───────────────────────────────────────────────────────
const canvasRef      = ref<HTMLCanvasElement | null>(null)
const conteudo       = ref('https://www.3wonline.com.br')
const corCodigo      = ref('#000000')
const corFundo       = ref('#ffffff')
const tamanho        = ref(256)
const correcao = ref('M')
const gerando        = ref(false)
const tipoSelecionado= ref('URL')
const placeholder    = ref('https://www.3wonline.com.br')

const niveis = [
  { value: 'L', percent: '7%',  desc: 'Baixo — máxima compactação',    maxDano: '7%'  },
  { value: 'M', percent: '15%', desc: 'Médio — uso geral recomendado', maxDano: '15%' },
  { value: 'Q', percent: '25%', desc: 'Alto — para ambientes sujos',   maxDano: '25%' },
  { value: 'H', percent: '30%', desc: 'Máximo — com logo sobreposta',  maxDano: '30%' },
]

const qualidadeInfo = computed_qual()
function computed_qual() {
  // Computed simples via função
  return () => {
    if (!conteudo.value) return 'Aguardando conteúdo'
    const len = conteudo.value.length
    if (len < 50) return 'QR Code pequeno e fácil de ler'
    if (len < 200) return 'QR Code médio'
    return 'QR Code denso — considere uma URL mais curta'
  }
}

const presets = [
  { tipo: 'URL',       icon: 'fa-link',         placeholder: 'https://www.3wonline.com.br',                                           exemplo: 'https://www.3wonline.com.br' },
  { tipo: 'WhatsApp',  icon: 'fa-whatsapp',      placeholder: 'https://wa.me/5541996924829?text=Olá!',                                exemplo: 'https://wa.me/5541996924829?text=Olá!'},
  { tipo: 'E-mail',    icon: 'fa-envelope',      placeholder: 'mailto:contato@empresa.com.br?subject=Contato&body=Olá!',              exemplo: 'mailto:contato@empresa.com.br' },
  { tipo: 'Texto',     icon: 'fa-align-left',    placeholder: 'Escreva qualquer texto aqui...',                                       exemplo: 'Meu primeiro QR Code!' },
  { tipo: 'Telefone',  icon: 'fa-phone',         placeholder: 'tel:+5541996924829',                                                   exemplo: 'tel:+5541996924829' },
  { tipo: 'Vcard',     icon: 'fa-id-card',       placeholder: 'BEGIN:VCARD\nVERSION:3.0\nFN:João Silva\nTEL:+5541999...\nEND:VCARD', exemplo: '' },
  { tipo: 'PIX',       icon: 'fa-pix',           placeholder: 'Chave PIX: contato@empresa.com.br',                                   exemplo: 'Chave PIX: contato@empresa.com.br' },
  { tipo: 'Wi-Fi',     icon: 'fa-wifi',          placeholder: 'WIFI:T:WPA;S:NomeRede;P:Senha;;',                                     exemplo: 'WIFI:T:WPA;S:MinhaRede;P:SenhaWiFi;;' },
]

function selecionarPreset(p: typeof presets[0]) {
  tipoSelecionado.value = p.tipo
  placeholder.value     = p.placeholder
  if (p.exemplo)        conteudo.value = p.exemplo
  gerar()
}

// ─── Geração via qrcode lib ───────────────────────────────────────
async function gerar() {
  if (!canvasRef.value || !conteudo.value.trim()) return
  gerando.value = true
  try {
    await QRCode.toCanvas(canvasRef.value, conteudo.value.trim() || ' ', {
      width: tamanho.value,
      // @ts-ignore
      errorCorrectionLevel: correcao.value,
      color: { dark: corCodigo.value, light: corFundo.value },
      margin: 2,
    })
  } catch {
    // Conteúdo inválido para o tamanho
  } finally {
    gerando.value = false
  }
}

function baixar() {
  if (!canvasRef.value || !conteudo.value) return
  const link = document.createElement('a')
  link.download = `qrcode-3wonline-${Date.now()}.png`
  link.href = canvasRef.value.toDataURL('image/png')
  link.click()
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'QR Code baixado!', showConfirmButton: false, timer: 2000 })
}

async function copiarImagem() {
  if (!canvasRef.value) return
  canvasRef.value.toBlob(async (blob) => {
    if (!blob) return
    const item = new ClipboardItem({ 'image/png': blob })
    await navigator.clipboard.write([item])
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Imagem copiada!', showConfirmButton: false, timer: 1800 })
  })
}

// Reexportar como computed_qual workaround
const qualidadeLabel = qualidadeInfo()

onMounted(gerar)
watch([corCodigo, corFundo, tamanho], gerar)
</script>
