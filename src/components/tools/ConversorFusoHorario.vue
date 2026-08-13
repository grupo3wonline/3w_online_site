<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-fuchsia-100 dark:bg-fuchsia-900/30 rounded-full mb-4">
          <i class="fas fa-globe text-fuchsia-600 dark:text-fuchsia-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Conversor de Fuso Horário</h1>
        <p class="text-gray-600 dark:text-gray-400">Converta datas e horários entre diferentes fusos</p>
      </div>

      <div class="space-y-6">
        <div class="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg p-4">
          <div class="text-center">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Horário Atual</div>
            <div class="text-3xl font-bold text-gray-900 dark:text-white">{{ horaAtual }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ dataAtual }}</div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Data e Hora</label>
            <input v-model="dataHoraInput" type="datetime-local" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Fuso de Origem</label>
            <select v-model="fusoOrigem" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option v-for="fuso in fusos" :key="fuso.value" :value="fuso.value">{{ fuso.nome }}</option>
            </select>
          </div>
        </div>

        <BaseButton @click="converter" variant="primary" class="w-full">
          <i class="fas fa-sync-alt mr-2"></i>
          Converter para Outros Fusos
        </BaseButton>

        <div v-if="conversoes.length" class="space-y-3">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">Horários Convertidos</h3>
          
          <div v-for="conv in conversoes" :key="conv.fuso" class="bg-gradient-to-r from-fuchsia-50 to-purple-50 dark:from-fuchsia-900/20 dark:to-purple-900/20 rounded-lg p-4 border border-fuchsia-200 dark:border-fuchsia-800">
            <div class="flex justify-between items-center">
              <div class="flex-1">
                <div class="font-bold text-lg text-gray-900 dark:text-white">{{ conv.nome }}</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">{{ conv.offset }}</div>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-fuchsia-600 dark:text-fuchsia-400">{{ conv.hora }}</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">{{ conv.data }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-fuchsia-50 dark:bg-fuchsia-900/20 border-l-4 border-fuchsia-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-fuchsia-600 dark:text-fuchsia-400 mt-1 mr-3"></i>
            <div class="text-sm text-fuchsia-800 dark:text-fuchsia-300">
              <p class="font-semibold mb-2">Fusos Horários do Brasil:</p>
              <ul class="list-disc list-inside space-y-1 text-xs">
                <li><strong>UTC-2:</strong> Fernando de Noronha, Atol das Rocas</li>
                <li><strong>UTC-3:</strong> Brasília (maior parte do país)</li>
                <li><strong>UTC-4:</strong> Amazonas, Roraima, Rondônia, Mato Grosso do Sul</li>
                <li><strong>UTC-5:</strong> Acre</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import BaseButton from './common/BaseButton.vue'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const horaAtual = ref('')
const dataAtual = ref('')
const dataHoraInput = ref('')
const fusoOrigem = ref('America/Sao_Paulo')
const conversoes = ref([])

const fusos = [
  { nome: 'Brasil - São Paulo (UTC-3)', value: 'America/Sao_Paulo' },
  { nome: 'Brasil - Manaus (UTC-4)', value: 'America/Manaus' },
  { nome: 'Brasil - Rio Branco (UTC-5)', value: 'America/Rio_Branco' },
  { nome: 'Brasil - Noronha (UTC-2)', value: 'America/Noronha' },
  { nome: 'Nova York (UTC-5/-4)', value: 'America/New_York' },
  { nome: 'Los Angeles (UTC-8/-7)', value: 'America/Los_Angeles' },
  { nome: 'Londres (UTC+0/+1)', value: 'Europe/London' },
  { nome: 'Paris (UTC+1/+2)', value: 'Europe/Paris' },
  { nome: 'Dubai (UTC+4)', value: 'Asia/Dubai' },
  { nome: 'Tóquio (UTC+9)', value: 'Asia/Tokyo' },
  { nome: 'Sydney (UTC+10/+11)', value: 'Australia/Sydney' },
  { nome: 'UTC', value: 'UTC' }
]

let intervalo = null

const atualizarHoraAtual = () => {
  const agora = new Date()
  horaAtual.value = agora.toLocaleTimeString('pt-BR')
  dataAtual.value = agora.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

const converter = () => {
  if (!dataHoraInput.value) {
    const agora = new Date()
    dataHoraInput.value = agora.toISOString().slice(0, 16)
  }
  
  const dataOrigem = new Date(dataHoraInput.value)
  
  conversoes.value = fusos.map(fuso => {
    const dataConvertida = new Date(dataOrigem.toLocaleString('en-US', { timeZone: fuso.value }))
    
    return {
      nome: fuso.nome,
      fuso: fuso.value,
      hora: dataConvertida.toLocaleTimeString('pt-BR'),
      data: dataConvertida.toLocaleDateString('pt-BR'),
      offset: getOffset(dataConvertida, fuso.value)
    }
  })
  
  trackToolUsage('Conversor Fuso Horário', 'convert')
}

const getOffset = (data, timeZone) => {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'short'
    })
    const parts = formatter.formatToParts(data)
    const tzName = parts.find(part => part.type === 'timeZoneName')
    return tzName ? tzName.value : timeZone
  } catch {
    return timeZone
  }
}

onMounted(() => {
  atualizarHoraAtual()
  intervalo = setInterval(atualizarHoraAtual, 1000)
  
  const agora = new Date()
  dataHoraInput.value = agora.toISOString().slice(0, 16)
})

onUnmounted(() => {
  if (intervalo) {
    clearInterval(intervalo)
  }
})
</script>
