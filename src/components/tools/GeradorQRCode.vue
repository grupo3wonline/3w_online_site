<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
          <i class="fas fa-qrcode text-indigo-600 dark:text-indigo-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Gerador de QR Code</h1>
        <p class="text-gray-600 dark:text-gray-400">Crie QR Codes personalizados para URLs, textos e mais</p>
      </div>

      <div class="space-y-6">
        <!-- Tipo de Conteúdo -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            v-for="tipo in tiposConteudo"
            :key="tipo.id"
            @click="tipoSelecionado = tipo.id"
            class="p-4 rounded-lg font-medium transition-all"
            :class="tipoSelecionado === tipo.id 
              ? 'bg-indigo-600 text-white shadow-lg' 
              : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
          >
            <i :class="tipo.icon" class="text-2xl mb-2"></i>
            <div class="text-sm">{{ tipo.nome }}</div>
          </button>
        </div>

        <!-- URL -->
        <BaseInput
          v-if="tipoSelecionado === 'url'"
          v-model="conteudo.url"
          label="URL"
          type="url"
          icon="fa-solid fa-link"
          placeholder="https://exemplo.com"
        />

        <!-- Texto -->
        <div v-if="tipoSelecionado === 'texto'">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <i class="fas fa-text text-indigo-600 dark:text-indigo-400 mr-2"></i>
            Texto
          </label>
          <textarea
            v-model="conteudo.texto"
            rows="4"
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Digite o texto para o QR Code"
          ></textarea>
        </div>

        <!-- Email -->
        <div v-if="tipoSelecionado === 'email'" class="space-y-4">
          <BaseInput
            v-model="conteudo.email"
            label="Email"
            type="email"
            icon="fa-solid fa-envelope"
            placeholder="contato@exemplo.com"
          />
          <BaseInput
            v-model="conteudo.assunto"
            label="Assunto (opcional)"
            type="text"
            icon="fa-solid fa-heading"
            placeholder="Assunto do email"
          />
        </div>

        <!-- Telefone -->
        <BaseInput
          v-if="tipoSelecionado === 'telefone'"
          v-model="conteudo.telefone"
          label="Telefone"
          type="tel"
          icon="fa-solid fa-phone"
          placeholder="+55 11 98765-4321"
        />

        <!-- Personalização -->
        <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-6 space-y-4">
          <h3 class="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <i class="fas fa-sliders text-indigo-600 dark:text-indigo-400"></i>
            Personalização
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInput
              v-model="tamanho"
              label="Tamanho (px)"
              type="number"
              :min="128"
              :max="512"
              step="32"
              icon="fa-solid fa-expand"
            />

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <i class="fas fa-palette text-indigo-600 dark:text-indigo-400 mr-2"></i>
                Cor de Fundo
              </label>
              <div class="flex gap-2">
                <input
                  v-model="corFundo"
                  type="color"
                  class="h-11 w-20 rounded-lg cursor-pointer"
                />
                <input
                  v-model="corFundo"
                  type="text"
                  class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <i class="fas fa-fill-drip text-indigo-600 dark:text-indigo-400 mr-2"></i>
                Cor do QR Code
              </label>
              <div class="flex gap-2">
                <input
                  v-model="corQR"
                  type="color"
                  class="h-11 w-20 rounded-lg cursor-pointer"
                />
                <input
                  v-model="corQR"
                  type="text"
                  class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <i class="fas fa-chart-simple text-indigo-600 dark:text-indigo-400 mr-2"></i>
                Nível de Correção
              </label>
              <select 
                v-model="nivelCorrecao" 
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="L">Baixo (7%)</option>
                <option value="M">Médio (15%)</option>
                <option value="Q">Alto (25%)</option>
                <option value="H">Muito Alto (30%)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Botões -->
        <div class="flex gap-4">
          <BaseButton @click="gerar" variant="primary" class="flex-1">
            <i class="fas fa-qrcode mr-2"></i>
            Gerar QR Code
          </BaseButton>
          <BaseButton @click="limpar" variant="outline">
            <i class="fas fa-eraser"></i>
          </BaseButton>
        </div>

        <!-- QR Code Gerado -->
        <div v-if="qrCodeGerado" class="space-y-4">
          <div class="bg-white dark:bg-gray-700 rounded-2xl p-8 text-center">
            <canvas ref="qrCanvas" class="mx-auto"></canvas>
          </div>

          <div class="flex gap-4">
            <BaseButton @click="baixar" variant="primary" class="flex-1">
              <i class="fas fa-download mr-2"></i>
              Baixar PNG
            </BaseButton>
            <BaseButton @click="copiarImagem" variant="outline" class="flex-1">
              <i class="fas fa-copy mr-2"></i>
              Copiar Imagem
            </BaseButton>
          </div>

          <!-- Informações -->
          <div class="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-4">
            <div class="flex">
              <i class="fas fa-info-circle text-indigo-600 dark:text-indigo-400 mt-1 mr-3"></i>
              <div class="text-sm text-indigo-800 dark:text-indigo-300">
                <p class="font-semibold mb-2">Dicas de Uso:</p>
                <ul class="list-disc list-inside space-y-1">
                  <li>Teste o QR Code antes de imprimir ou publicar</li>
                  <li>Use alto nível de correção para impressões</li>
                  <li>Cores muito claras podem dificultar a leitura</li>
                  <li>Tamanho mínimo recomendado: 256x256px</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseInput from './common/BaseInput.vue'
import BaseButton from './common/BaseButton.vue'
import Swal from 'sweetalert2'
import QRCode from 'qrcode'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage, trackConversion } = useAnalytics()

const tiposConteudo = [
  { id: 'url', nome: 'URL', icon: 'fas fa-link' },
  { id: 'texto', nome: 'Texto', icon: 'fas fa-align-left' },
  { id: 'email', nome: 'Email', icon: 'fas fa-envelope' },
  { id: 'telefone', nome: 'Telefone', icon: 'fas fa-phone' }
]

const tipoSelecionado = ref('url')
const conteudo = ref({
  url: 'https://exemplo.com',
  texto: '',
  email: '',
  assunto: '',
  telefone: ''
})

const tamanho = ref(256)
const corFundo = ref('#ffffff')
const corQR = ref('#000000')
const nivelCorrecao = ref('M')

const qrCodeGerado = ref(false)
const qrCanvas = ref(null)

const obterConteudo = () => {
  switch (tipoSelecionado.value) {
    case 'url':
      return conteudo.value.url
    case 'texto':
      return conteudo.value.texto
    case 'email':
      const email = conteudo.value.email
      const assunto = conteudo.value.assunto ? `?subject=${encodeURIComponent(conteudo.value.assunto)}` : ''
      return `mailto:${email}${assunto}`
    case 'telefone':
      return `tel:${conteudo.value.telefone}`
    default:
      return ''
  }
}

const gerar = async () => {
  const texto = obterConteudo()
  
  if (!texto || texto.trim() === '') {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Digite o conteúdo do QR Code' })
    return
  }

  try {
    await QRCode.toCanvas(qrCanvas.value, texto, {
      width: Number(tamanho.value),
      margin: 2,
      color: {
        dark: corQR.value,
        light: corFundo.value
      },
      errorCorrectionLevel: nivelCorrecao.value
    })
    
    qrCodeGerado.value = true
    trackToolUsage('Gerador QR Code', 'generate')
    
    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: 'QR Code gerado com sucesso',
      timer: 1500,
      showConfirmButton: false
    })
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível gerar o QR Code' })
  }
}

const baixar = () => {
  if (!qrCanvas.value) return
  
  const link = document.createElement('a')
  link.download = `qrcode-${Date.now()}.png`
  link.href = qrCanvas.value.toDataURL()
  link.click()
  
  trackConversion('download', 'qrcode')
  Swal.fire({
    icon: 'success',
    title: 'Download iniciado!',
    timer: 1500,
    showConfirmButton: false
  })
}

const copiarImagem = async () => {
  if (!qrCanvas.value) return
  
  try {
    qrCanvas.value.toBlob(async (blob) => {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ])
      
      trackConversion('copy', 'qrcode')
      Swal.fire({
        icon: 'success',
        title: 'Copiado!',
        text: 'Imagem copiada para a área de transferência',
        timer: 1500,
        showConfirmButton: false
      })
    })
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar a imagem' })
  }
}

const limpar = () => {
  conteudo.value = {
    url: 'https://exemplo.com',
    texto: '',
    email: '',
    assunto: '',
    telefone: ''
  }
  qrCodeGerado.value = false
  tamanho.value = 256
  corFundo.value = '#ffffff'
  corQR.value = '#000000'
  nivelCorrecao.value = 'M'
}
</script>
