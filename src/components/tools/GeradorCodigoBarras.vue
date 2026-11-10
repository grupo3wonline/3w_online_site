<template>
  <ToolShell
    title="Gerador de Código de Barras"
    description="Gere códigos de barras nos formatos EAN-13, EAN-8, UPC-A, Code 128, Code 39 e ITF-14 com download em PNG."
    icon="fa-barcode"
    icon-gradient="from-slate-600 to-gray-800"
    orb-color="blue"
    :quick-tips="['6 formatos', 'Download PNG', 'Validação automática']"
    :tips="[
      { title: 'EAN-13', text: 'Padrão mundial para produtos de varejo. São 13 dígitos: 2-3 de país, 4-5 de empresa e 5-6 de produto, mais 1 verificador.' },
      { title: 'Code 128', text: 'Suporta todos os 128 caracteres ASCII. Muito usado em logística e transporte por sua alta densidade.', type: 'info' },
      { title: 'ITF-14', text: 'Usado em embalagens de transporte e caixas. Os 14 dígitos incluem o EAN da unidade interna.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Produto de supermercado', desc: 'Formato: EAN-13, Dados: 7891234567890', result: 'Código de barras EAN-13 de 13 dígitos' },
      { title: 'Logística', desc: 'Formato: Code 128, Dados: PROD-12345', result: 'Código alfanumérico de alta densidade' },
      { title: 'Embalagem de transporte', desc: 'Formato: ITF-14, Dados: 12345678901234', result: 'Código para caixa/palete de 14 dígitos' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0 space-y-4">
          <!-- Formato -->
          <div>
            <label class="input-aurora-label">
              <i class="fas fa-layer-group mr-1.5 text-slate-500"></i>
              Formato
            </label>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="f in formatos"
                :key="f.id"
                @click="formatoSelecionado = f.id; gerar()"
                :class="[
                  'p-3 rounded-xl border-2 transition-all text-left',
                  formatoSelecionado === f.id
                    ? 'border-slate-600 bg-slate-50 dark:bg-slate-700/50'
                    : 'border-gray-200 dark:border-slate-700 hover:border-slate-400'
                ]"
              >
                <div class="text-xs font-bold text-gray-900 dark:text-white">{{ f.nome }}</div>
                <div class="text-[10px] text-gray-500 dark:text-slate-400 mt-0.5">{{ f.desc }}</div>
              </button>
            </div>
          </div>

          <BaseInput
            v-model="dados"
            :label="`Dados — ${getNomeFormato()}`"
            icon="fa-keyboard"
            :placeholder="getPlaceholder()"
            tooltip="O conteúdo que será codificado no código de barras."
            @input="validarDados"
          />

          <!-- Validação -->
          <div
            v-if="mensagemValidacao"
            :class="['flex items-center gap-2 text-xs p-3 rounded-xl', dadosValidos ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300']"
          >
            <i :class="dadosValidos ? 'fas fa-check-circle text-emerald-500' : 'fas fa-exclamation-triangle text-amber-500'"></i>
            {{ mensagemValidacao }}
          </div>

          <!-- Opções -->
          <div class="grid grid-cols-2 gap-3">
            <BaseInput v-model="largura" label="Largura (px)" type="number" :min="1" :max="10" icon="fa-left-right" />
            <BaseInput v-model="altura" label="Altura (px)" type="number" :min="20" :max="300" icon="fa-up-down" />
          </div>

          <label class="flex items-center gap-3 cursor-pointer">
            <input v-model="mostrarTexto" type="checkbox" class="checkbox-aurora" />
            <span class="text-sm text-gray-700 dark:text-slate-200">Mostrar valor abaixo do código</span>
          </label>

          <!-- Botões -->
          <div class="flex gap-3">
            <BaseButton variant="success" icon="fa-magic" @click="gerar" class="flex-1">
              Gerar
            </BaseButton>
            <BaseButton variant="outline" icon="fa-dice" @click="gerarAleatorio">
              Aleatório
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in">
          <div v-if="codigoGerado" class="space-y-4">
            <!-- Canvas -->
            <div class="glass-panel p-6 flex justify-center items-center bg-white dark:bg-slate-800">
              <canvas ref="canvasRef" class="max-w-full"></canvas>
            </div>

            <!-- Métricas -->
            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-slate-100 dark:ring-slate-700">
                <div class="metric-glass-value text-slate-700 dark:text-slate-200">{{ formatoSelecionado }}</div>
                <div class="metric-glass-label">Formato</div>
              </div>
              <div class="metric-glass ring-1 ring-slate-100 dark:ring-slate-700">
                <div class="metric-glass-value text-slate-700 dark:text-slate-200">{{ dados.length }}</div>
                <div class="metric-glass-label">Caracteres</div>
              </div>
            </div>

            <!-- Download -->
            <BaseButton variant="primary" icon="fa-download" @click="baixarPNG" class="w-full">
              Baixar PNG
            </BaseButton>

            <!-- Info do formato -->
            <div class="tip-card">
              <i class="fas fa-info-circle text-slate-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">{{ getDescricaoFormato() }}</span>
            </div>
          </div>
        </Transition>

        <div v-if="!codigoGerado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-barcode text-3xl mb-3 opacity-30 block text-slate-500"></i>
          <p class="text-sm">Configure e clique em <strong>Gerar</strong></p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

const formatos = [
  { id: 'CODE128', nome: 'Code 128', desc: 'Alfanumérico completo' },
  { id: 'CODE39',  nome: 'Code 39',  desc: 'Números e letras maiúsculas' },
  { id: 'EAN13',   nome: 'EAN-13',   desc: '13 dígitos (produtos)' },
  { id: 'EAN8',    nome: 'EAN-8',    desc: '8 dígitos (pequenos)' },
  { id: 'UPC',     nome: 'UPC-A',    desc: '12 dígitos (EUA)' },
  { id: 'ITF14',   nome: 'ITF-14',   desc: '14 dígitos (caixas)' },
]

const formatoSelecionado = ref('CODE128')
const dados              = ref('3wonline.com')
const largura            = ref(2)
const altura             = ref(100)
const mostrarTexto       = ref(true)
const codigoGerado       = ref(false)
const canvasRef          = ref(null)
const dadosValidos       = ref(true)
const mensagemValidacao  = ref('')

const getNomeFormato = () => formatos.find(f => f.id === formatoSelecionado.value)?.nome || ''

const getPlaceholder = () => ({
  CODE128: 'Ex: ABC123 (alfanumérico)',
  CODE39:  'Ex: ABC-123 (letras maiúsculas)',
  EAN13:   'Ex: 7891234567890 (13 dígitos)',
  EAN8:    'Ex: 12345678 (8 dígitos)',
  UPC:     'Ex: 123456789012 (12 dígitos)',
  ITF14:   'Ex: 12345678901234 (14 dígitos)',
}[formatoSelecionado.value] || 'Digite os dados')

const getDescricaoFormato = () => ({
  CODE128: 'Code 128 codifica todos os 128 caracteres ASCII. Alta densidade, amplamente usado em logística.',
  CODE39:  'Code 39 codifica 43 caracteres (0-9, A-Z e símbolos). Muito usado em indústrias e inventário.',
  EAN13:   'EAN-13 é o padrão mundial para identificação de produtos em supermercados e varejistas.',
  EAN8:    'EAN-8 é a versão compacta do EAN-13 para produtos pequenos onde o espaço é limitado.',
  UPC:     'UPC-A é o padrão americano. 12 dígitos numéricos, amplamente usado nos EUA e Canadá.',
  ITF14:   'ITF-14 identifica embalagens de transporte e caixas. Codifica 14 dígitos numéricos.',
}[formatoSelecionado.value] || '')

const validarDados = () => {
  const v = dados.value
  const regras = {
    EAN13: { re: /^\d{13}$/, msg: 'EAN-13 deve ter exatamente 13 dígitos' },
    EAN8:  { re: /^\d{8}$/,  msg: 'EAN-8 deve ter exatamente 8 dígitos' },
    UPC:   { re: /^\d{12}$/, msg: 'UPC-A deve ter exatamente 12 dígitos' },
    ITF14: { re: /^\d{14}$/, msg: 'ITF-14 deve ter exatamente 14 dígitos' },
    CODE39:{ re: /^[0-9A-Z\-. $/+%]+$/, msg: 'Code 39 aceita números, letras maiúsculas e símbolos' },
  }
  const regra = regras[formatoSelecionado.value]
  if (regra && !regra.re.test(v)) {
    mensagemValidacao.value = regra.msg; dadosValidos.value = false
  } else {
    mensagemValidacao.value = v ? 'Formato válido!' : ''; dadosValidos.value = true
  }
}

const gerarAleatorio = () => {
  const rnd = (n) => Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join('')
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const rndChars = (n) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  dados.value = {
    EAN13:   rnd(13), EAN8: rnd(8), UPC: rnd(12), ITF14: rnd(14),
    CODE39:  rndChars(8), CODE128: `PROD${rnd(5)}`,
  }[formatoSelecionado.value] || rndChars(8)
  validarDados(); gerar()
}

const desenharCodigoBarras = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx       = canvas.getContext('2d')
  const barW      = Number(largura.value)
  const barH      = Number(altura.value)
  const bits      = dados.value.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join('')
  const totalW    = bits.length * barW
  const pad       = 20
  const textH     = mostrarTexto.value ? 25 : 0
  canvas.width    = totalW + pad * 2
  canvas.height   = barH + textH + pad * 2
  ctx.fillStyle   = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle   = '#000000'
  for (let i = 0; i < bits.length; i++) {
    if (bits[i] === '1') ctx.fillRect(pad + i * barW, pad, barW, barH)
  }
  if (mostrarTexto.value) {
    ctx.fillStyle = '#000000'
    ctx.font      = '14px monospace'
    ctx.textAlign = 'center'
    ctx.fillText(dados.value, canvas.width / 2, barH + pad + 18)
  }
}

const gerar = () => {
  if (!dados.value) {
    Swal.fire({ icon: 'error', title: 'Dados obrigatórios', text: 'Digite os dados do código de barras', confirmButtonColor: '#2563eb' })
    return
  }
  validarDados()
  if (!dadosValidos.value) {
    Swal.fire({ icon: 'warning', title: 'Formato inválido', text: mensagemValidacao.value, confirmButtonColor: '#2563eb' })
    return
  }
  codigoGerado.value = true
  setTimeout(desenharCodigoBarras, 100)
}

const baixarPNG = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.toBlob(blob => {
    const url  = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url; link.download = `barcode-${formatoSelecionado.value}-${Date.now()}.png`; link.click()
    URL.revokeObjectURL(url)
    Swal.fire({ icon: 'success', title: 'Download iniciado!', timer: 1500, showConfirmButton: false })
  })
}

onMounted(() => { validarDados(); gerar() })
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>
