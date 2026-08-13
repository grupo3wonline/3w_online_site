<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
          <i class="fas fa-barcode text-amber-600 dark:text-amber-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Gerador de Código de Barras</h1>
        <p class="text-gray-600 dark:text-gray-400">Gere códigos de barras em diversos formatos</p>
      </div>

      <div class="space-y-6">
        <!-- Formato -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            <i class="fas fa-layer-group mr-2"></i>
            Formato
          </label>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <button
              v-for="formato in formatos"
              :key="formato.id"
              @click="formatoSelecionado = formato.id; gerar()"
              class="p-3 rounded-lg border-2 transition-all text-left"
              :class="formatoSelecionado === formato.id 
                ? 'border-amber-600 bg-amber-50 dark:bg-amber-900/30' 
                : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-amber-400'"
            >
              <div class="font-semibold text-sm text-gray-900 dark:text-white">{{ formato.nome }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ formato.desc }}</div>
            </button>
          </div>
        </div>

        <!-- Dados -->
        <BaseInput
          v-model="dados"
          :label="`Dados do ${getNomeFormato()}`"
          type="text"
          :placeholder="getPlaceholder()"
          icon="fa-solid fa-keyboard"
          @input="validarDados"
        />

        <!-- Validação -->
        <div v-if="mensagemValidacao" class="p-3 rounded-lg" :class="dadosValidos ? 'bg-green-100 dark:bg-green-900/30' : 'bg-yellow-100 dark:bg-yellow-900/30'">
          <div class="flex items-center gap-2 text-sm">
            <i :class="dadosValidos ? 'fas fa-check-circle text-green-600' : 'fas fa-exclamation-triangle text-yellow-600'"></i>
            <span :class="dadosValidos ? 'text-green-800 dark:text-green-300' : 'text-yellow-800 dark:text-yellow-300'">
              {{ mensagemValidacao }}
            </span>
          </div>
        </div>

        <!-- Opções -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BaseInput
            v-model="largura"
            label="Largura"
            type="number"
            :min="1"
            :max="10"
            icon="fa-solid fa-left-right"
          />

          <BaseInput
            v-model="altura"
            label="Altura (px)"
            type="number"
            :min="20"
            :max="200"
            icon="fa-solid fa-up-down"
          />

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Exibir Texto
            </label>
            <div class="flex items-center gap-2 h-11">
              <input
                type="checkbox"
                id="mostrarTexto"
                v-model="mostrarTexto"
                class="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500"
              >
              <label for="mostrarTexto" class="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                Mostrar valor abaixo
              </label>
            </div>
          </div>
        </div>

        <!-- Botões -->
        <div class="flex gap-4">
          <BaseButton @click="gerar" variant="primary" class="flex-1">
            <i class="fas fa-magic mr-2"></i>
            Gerar Código de Barras
          </BaseButton>
          <BaseButton @click="gerarAleatorio" variant="outline">
            <i class="fas fa-dice mr-2"></i>
            Aleatório
          </BaseButton>
        </div>

        <!-- Canvas -->
        <div v-if="codigoGerado" class="space-y-4">
          <div class="bg-white dark:bg-gray-700 rounded-lg p-8 border-2 border-gray-200 dark:border-gray-600">
            <div class="flex justify-center">
              <canvas ref="canvasRef"></canvas>
            </div>
          </div>

          <!-- Informações -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-amber-600 dark:text-amber-400">{{ formatoSelecionado }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Formato</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-amber-600 dark:text-amber-400">{{ dados.length }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Caracteres</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-amber-600 dark:text-amber-400">{{ largura }}x</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Largura</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-amber-600 dark:text-amber-400">{{ altura }}px</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Altura</div>
            </div>
          </div>

          <!-- Ações -->
          <div class="flex gap-4">
            <BaseButton @click="baixarPNG" variant="primary" class="flex-1">
              <i class="fas fa-download mr-2"></i>
              Baixar PNG
            </BaseButton>
            <BaseButton @click="baixarSVG" variant="outline" class="flex-1">
              <i class="fas fa-download mr-2"></i>
              Baixar SVG
            </BaseButton>
          </div>

          <!-- Informações do Formato -->
          <div class="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4">
            <div class="flex">
              <i class="fas fa-info-circle text-amber-600 dark:text-amber-400 mt-1 mr-3"></i>
              <div class="text-sm text-amber-800 dark:text-amber-300">
                <p class="font-semibold mb-2">Sobre {{ getNomeFormato() }}:</p>
                <p>{{ getDescricaoFormato() }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BaseInput from './common/BaseInput.vue'
import BaseButton from './common/BaseButton.vue'
import Swal from 'sweetalert2'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage, trackConversion } = useAnalytics()

const formatos = [
  { id: 'CODE128', nome: 'Code 128', desc: 'Alfanumérico completo' },
  { id: 'CODE39', nome: 'Code 39', desc: 'Números e letras' },
  { id: 'EAN13', nome: 'EAN-13', desc: '13 dígitos (produtos)' },
  { id: 'EAN8', nome: 'EAN-8', desc: '8 dígitos (pequenos)' },
  { id: 'UPC', nome: 'UPC-A', desc: '12 dígitos (EUA)' },
  { id: 'ITF14', nome: 'ITF-14', desc: '14 dígitos (caixas)' }
]

const formatoSelecionado = ref('CODE128')
const dados = ref('3wonline.com')
const largura = ref(2)
const altura = ref(100)
const mostrarTexto = ref(true)
const codigoGerado = ref(false)
const canvasRef = ref(null)
const dadosValidos = ref(true)
const mensagemValidacao = ref('')

const getNomeFormato = () => {
  const formato = formatos.find(f => f.id === formatoSelecionado.value)
  return formato ? formato.nome : ''
}

const getPlaceholder = () => {
  const placeholders = {
    'CODE128': 'Ex: ABC123 (alfanumérico)',
    'CODE39': 'Ex: ABC-123 (letras e números)',
    'EAN13': 'Ex: 7891234567890 (13 dígitos)',
    'EAN8': 'Ex: 12345678 (8 dígitos)',
    'UPC': 'Ex: 123456789012 (12 dígitos)',
    'ITF14': 'Ex: 12345678901234 (14 dígitos)'
  }
  return placeholders[formatoSelecionado.value] || 'Digite os dados'
}

const getDescricaoFormato = () => {
  const descricoes = {
    'CODE128': 'Code 128 é um código de barras linear de alta densidade que codifica todos os 128 caracteres ASCII. Amplamente usado em logística e transporte.',
    'CODE39': 'Code 39 é um código alfanumérico que codifica 43 caracteres (0-9, A-Z e símbolos). Muito usado em indústrias e controle de inventário.',
    'EAN13': 'EAN-13 é o padrão internacional para identificação de produtos de varejo. Usado em supermercados e lojas no mundo todo.',
    'EAN8': 'EAN-8 é uma versão compacta do EAN-13 para produtos pequenos. Possui 8 dígitos e é usado quando o espaço é limitado.',
    'UPC': 'UPC-A é o padrão americano para códigos de barras de produtos. Possui 12 dígitos e é amplamente usado nos EUA e Canadá.',
    'ITF14': 'ITF-14 é usado para identificação de embalagens de transporte e caixas. Codifica 14 dígitos numéricos.'
  }
  return descricoes[formatoSelecionado.value] || ''
}

const validarDados = () => {
  const valor = dados.value
  
  switch (formatoSelecionado.value) {
    case 'EAN13':
      if (!/^\d{13}$/.test(valor)) {
        mensagemValidacao.value = 'EAN-13 deve ter exatamente 13 dígitos'
        dadosValidos.value = false
      } else {
        mensagemValidacao.value = 'Formato válido!'
        dadosValidos.value = true
      }
      break
    case 'EAN8':
      if (!/^\d{8}$/.test(valor)) {
        mensagemValidacao.value = 'EAN-8 deve ter exatamente 8 dígitos'
        dadosValidos.value = false
      } else {
        mensagemValidacao.value = 'Formato válido!'
        dadosValidos.value = true
      }
      break
    case 'UPC':
      if (!/^\d{12}$/.test(valor)) {
        mensagemValidacao.value = 'UPC-A deve ter exatamente 12 dígitos'
        dadosValidos.value = false
      } else {
        mensagemValidacao.value = 'Formato válido!'
        dadosValidos.value = true
      }
      break
    case 'ITF14':
      if (!/^\d{14}$/.test(valor)) {
        mensagemValidacao.value = 'ITF-14 deve ter exatamente 14 dígitos'
        dadosValidos.value = false
      } else {
        mensagemValidacao.value = 'Formato válido!'
        dadosValidos.value = true
      }
      break
    case 'CODE39':
      if (!/^[0-9A-Z\-. $/+%]+$/.test(valor)) {
        mensagemValidacao.value = 'Code 39 aceita apenas números, letras maiúsculas e símbolos especiais'
        dadosValidos.value = false
      } else {
        mensagemValidacao.value = 'Formato válido!'
        dadosValidos.value = true
      }
      break
    default:
      mensagemValidacao.value = 'Formato válido!'
      dadosValidos.value = true
  }
}

const gerarAleatorio = () => {
  switch (formatoSelecionado.value) {
    case 'EAN13':
      dados.value = Array.from({ length: 13 }, () => Math.floor(Math.random() * 10)).join('')
      break
    case 'EAN8':
      dados.value = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('')
      break
    case 'UPC':
      dados.value = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join('')
      break
    case 'ITF14':
      dados.value = Array.from({ length: 14 }, () => Math.floor(Math.random() * 10)).join('')
      break
    case 'CODE39':
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      dados.value = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
      break
    default:
      dados.value = `PROD${Math.floor(Math.random() * 100000)}`
  }
  validarDados()
  gerar()
}

const desenharCodigoBarras = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const barWidth = Number(largura.value)
  const barHeight = Number(altura.value)
  const exibirTexto = mostrarTexto.value
  
  // Simular código de barras básico (implementação simplificada)
  const valor = dados.value
  const bits = valor.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('')
  
  const totalWidth = bits.length * barWidth
  const padding = 20
  const textHeight = exibirTexto ? 25 : 0
  
  canvas.width = totalWidth + (padding * 2)
  canvas.height = barHeight + textHeight + (padding * 2)
  
  // Fundo branco
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  // Desenhar barras
  ctx.fillStyle = '#000000'
  for (let i = 0; i < bits.length; i++) {
    if (bits[i] === '1') {
      ctx.fillRect(padding + (i * barWidth), padding, barWidth, barHeight)
    }
  }
  
  // Texto
  if (exibirTexto) {
    ctx.fillStyle = '#000000'
    ctx.font = '14px monospace'
    ctx.textAlign = 'center'
    ctx.fillText(valor, canvas.width / 2, barHeight + padding + 18)
  }
}

const gerar = () => {
  if (!dados.value) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Digite os dados do código de barras' })
    return
  }

  validarDados()
  
  if (!dadosValidos.value) {
    Swal.fire({ icon: 'warning', title: 'Atenção', text: mensagemValidacao.value })
    return
  }

  codigoGerado.value = true
  
  setTimeout(() => {
    desenharCodigoBarras()
    trackToolUsage('Gerador Código Barras', 'generate')
  }, 100)
}

const baixarPNG = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `barcode-${formatoSelecionado.value}-${Date.now()}.png`
    link.click()
    URL.revokeObjectURL(url)

    trackConversion('download', 'barcode-png')
    Swal.fire({
      icon: 'success',
      title: 'Download iniciado!',
      timer: 1500,
      showConfirmButton: false
    })
  })
}

const baixarSVG = () => {
  // Versão simplificada - converter canvas para SVG seria complexo
  // Aqui simulamos com uma mensagem
  Swal.fire({
    icon: 'info',
    title: 'Formato SVG',
    text: 'Para SVG de alta qualidade, use o formato PNG e converta com ferramentas especializadas.',
    confirmButtonText: 'Entendi'
  })
}

onMounted(() => {
  validarDados()
  gerar()
})
</script>
