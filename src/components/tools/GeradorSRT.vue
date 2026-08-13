<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
          <i class="fas fa-closed-captioning text-red-600 dark:text-red-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Gerador de Legenda SRT</h1>
        <p class="text-gray-600 dark:text-gray-400">Crie arquivos de legenda no formato SubRip (SRT)</p>
      </div>

      <div class="space-y-6">
        <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
          <h3 class="font-bold text-gray-900 dark:text-white mb-3">Legendas</h3>
          <div class="space-y-4">
            <div v-for="(legenda, index) in legendas" :key="index" class="bg-white dark:bg-gray-700 rounded-lg p-4 border-2 border-gray-200 dark:border-gray-600">
              <div class="flex justify-between items-start mb-3">
                <span class="text-lg font-bold text-red-600 dark:text-red-400">{{ index + 1 }}</span>
                <button @click="removerLegenda(index)" class="text-red-600 hover:text-red-700 dark:text-red-400">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
              
              <div class="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Início (HH:MM:SS,ms)</label>
                  <input v-model="legenda.inicio" type="text" placeholder="00:00:00,000" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm" />
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Fim (HH:MM:SS,ms)</label>
                  <input v-model="legenda.fim" type="text" placeholder="00:00:02,500" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm" />
                </div>
              </div>
              
              <div>
                <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Texto da Legenda</label>
                <textarea v-model="legenda.texto" rows="2" placeholder="Digite o texto da legenda..." class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm resize-none"></textarea>
              </div>
            </div>
          </div>
          
          <button @click="adicionarLegenda" class="mt-4 w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
            <i class="fas fa-plus mr-2"></i>Adicionar Legenda
          </button>
        </div>

        <div class="flex gap-3">
          <BaseButton @click="gerarSRT" variant="primary" class="flex-1">
            <i class="fas fa-file-alt mr-2"></i>Gerar SRT
          </BaseButton>
          <BaseButton @click="baixarSRT" variant="success" class="flex-1" :disabled="!srtGerado">
            <i class="fas fa-download mr-2"></i>Baixar Arquivo
          </BaseButton>
        </div>

        <div v-if="srtGerado" class="space-y-4">
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div class="flex justify-between items-center mb-2">
              <h3 class="font-bold text-gray-900 dark:text-white">Pré-visualização SRT</h3>
              <button @click="copiarSRT" class="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm">
                <i class="fas fa-copy mr-1"></i>Copiar
              </button>
            </div>
            <pre class="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-auto max-h-96 font-mono">{{ srtConteudo }}</pre>
          </div>
        </div>

        <div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-red-600 dark:text-red-400 mt-1 mr-3"></i>
            <div class="text-sm text-red-800 dark:text-red-300">
              <p class="font-semibold mb-2">Formato SRT (SubRip):</p>
              <ul class="list-disc list-inside space-y-1 text-xs">
                <li><strong>Numeração:</strong> Cada legenda começa com um número sequencial</li>
                <li><strong>Tempo:</strong> Formato HH:MM:SS,ms (milissegundos com vírgula)</li>
                <li><strong>Texto:</strong> Pode ter múltiplas linhas</li>
                <li><strong>Compatível:</strong> VLC, YouTube, Premiere, DaVinci Resolve</li>
                <li><strong>Exemplo:</strong> 00:00:10,500 --> 00:00:13,000</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from './common/BaseButton.vue'
import { useAnalytics } from '../../composables/useAnalytics'
import Swal from 'sweetalert2'

const { trackToolUsage } = useAnalytics()

const legendas = ref([
  { inicio: '00:00:00,000', fim: '00:00:02,500', texto: 'Olá, bem-vindo!' },
  { inicio: '00:00:03,000', fim: '00:00:05,000', texto: 'Este é um exemplo de legenda SRT' }
])
const srtGerado = ref(false)
const srtConteudo = ref('')

const adicionarLegenda = () => {
  const ultimaLegenda = legendas.value[legendas.value.length - 1]
  const novoInicio = ultimaLegenda ? calcularProximoTempo(ultimaLegenda.fim) : '00:00:00,000'
  const novoFim = calcularProximoTempo(novoInicio, 2500)
  
  legendas.value.push({
    inicio: novoInicio,
    fim: novoFim,
    texto: ''
  })
}

const removerLegenda = (index) => {
  if (legendas.value.length > 1) {
    legendas.value.splice(index, 1)
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Atenção',
      text: 'É necessário ter pelo menos uma legenda',
      confirmButtonColor: '#dc2626'
    })
  }
}

const calcularProximoTempo = (tempo, incrementoMs = 500) => {
  const regex = /(\d{2}):(\d{2}):(\d{2}),(\d{3})/
  const match = tempo.match(regex)
  
  if (!match) return '00:00:00,000'
  
  let [, horas, minutos, segundos, milissegundos] = match.map(Number)
  
  milissegundos += incrementoMs
  segundos += Math.floor(milissegundos / 1000)
  milissegundos %= 1000
  minutos += Math.floor(segundos / 60)
  segundos %= 60
  horas += Math.floor(minutos / 60)
  minutos %= 60
  
  return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')},${String(milissegundos).padStart(3, '0')}`
}

const gerarSRT = () => {
  let conteudo = ''
  
  legendas.value.forEach((legenda, index) => {
    conteudo += `${index + 1}\n`
    conteudo += `${legenda.inicio} --> ${legenda.fim}\n`
    conteudo += `${legenda.texto}\n\n`
  })
  
  srtConteudo.value = conteudo.trim()
  srtGerado.value = true
  
  trackToolUsage('Gerador SRT', 'generate', { count: legendas.value.length })
  
  Swal.fire({
    icon: 'success',
    title: 'Sucesso!',
    text: `Arquivo SRT gerado com ${legendas.value.length} legendas`,
    confirmButtonColor: '#dc2626'
  })
}

const baixarSRT = () => {
  const blob = new Blob([srtConteudo.value], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `legendas_${Date.now()}.srt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  
  trackToolUsage('Gerador SRT', 'download')
}

const copiarSRT = () => {
  navigator.clipboard.writeText(srtConteudo.value)
  Swal.fire({
    icon: 'success',
    title: 'Copiado!',
    text: 'Conteúdo SRT copiado para área de transferência',
    timer: 2000,
    showConfirmButton: false
  })
}
</script>
