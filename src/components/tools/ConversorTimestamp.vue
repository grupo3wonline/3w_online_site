<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
          <i class="fas fa-calendar-days text-amber-600 dark:text-amber-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Conversor de Timestamp</h1>
        <p class="text-gray-600 dark:text-gray-400">Converta timestamp Unix</p>
      </div>

      <div class="space-y-6">
        <div class="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-center text-white">
          <div class="text-sm font-medium mb-2">Timestamp Atual</div>
          <div class="text-4xl font-bold font-mono">{{ timestampAtual }}</div>
          <button @click="copiar(timestampAtual.toString())" class="mt-3 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm">
            <i class="fas fa-copy mr-2"></i>Copiar
          </button>
        </div>

        <div class="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <button @click="modo = 'timestamp-data'" class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors" :class="modo === 'timestamp-data' ? 'bg-amber-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'">
            Timestamp → Data
          </button>
          <button @click="modo = 'data-timestamp'" class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors" :class="modo === 'data-timestamp' ? 'bg-amber-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'">
            Data → Timestamp
          </button>
        </div>

        <div v-if="modo === 'timestamp-data'" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timestamp Unix (segundos)</label>
            <input v-model="timestampInput" @input="converterTimestampParaData" type="number" placeholder="1698710400" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono">
          </div>
        </div>

        <div v-else class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Data e Hora</label>
            <input v-model="dataInput" @input="converterDataParaTimestamp" type="datetime-local" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
          </div>
        </div>

        <div v-if="resultado" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-4">
          <div class="flex items-center justify-between p-4 bg-white dark:bg-gray-600 rounded-lg">
            <div>
              <div class="text-xs text-gray-500 dark:text-gray-400">Data Completa</div>
              <div class="text-lg font-semibold text-gray-900 dark:text-white">{{ resultado.dataCompleta }}</div>
            </div>
            <button @click="copiar(resultado.dataCompleta)" class="px-3 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm">
              <i class="fas fa-copy"></i>
            </button>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="p-3 bg-white dark:bg-gray-600 rounded-lg">
              <div class="text-xs text-gray-500 dark:text-gray-400">Data</div>
              <div class="text-sm font-semibold text-gray-900 dark:text-white">{{ resultado.data }}</div>
            </div>
            <div class="p-3 bg-white dark:bg-gray-600 rounded-lg">
              <div class="text-xs text-gray-500 dark:text-gray-400">Hora</div>
              <div class="text-sm font-semibold text-gray-900 dark:text-white">{{ resultado.hora }}</div>
            </div>
            <div class="p-3 bg-white dark:bg-gray-600 rounded-lg">
              <div class="text-xs text-gray-500 dark:text-gray-400">Timestamp (s)</div>
              <div class="text-sm font-semibold text-gray-900 dark:text-white font-mono">{{ resultado.timestamp }}</div>
            </div>
            <div class="p-3 bg-white dark:bg-gray-600 rounded-lg">
              <div class="text-xs text-gray-500 dark:text-gray-400">Timestamp (ms)</div>
              <div class="text-sm font-semibold text-gray-900 dark:text-white font-mono">{{ resultado.timestampMs }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Swal from 'sweetalert2'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage, trackConversion } = useAnalytics()

const modo = ref('timestamp-data')
const timestampAtual = ref(Math.floor(Date.now() / 1000))
const timestampInput = ref('')
const dataInput = ref('')
const resultado = ref(null)

let intervalo = null

const converterTimestampParaData = () => {
  const ts = Number(timestampInput.value)
  if (ts && ts > 0) {
    const data = new Date(ts * 1000)
    resultado.value = {
      dataCompleta: data.toLocaleString('pt-BR'),
      data: data.toLocaleDateString('pt-BR'),
      hora: data.toLocaleTimeString('pt-BR'),
      timestamp: ts,
      timestampMs: ts * 1000
    }
    trackToolUsage('Conversor Timestamp', 'timestamp-to-date')
  }
}

const converterDataParaTimestamp = () => {
  if (dataInput.value) {
    const data = new Date(dataInput.value)
    const ts = Math.floor(data.getTime() / 1000)
    resultado.value = {
      dataCompleta: data.toLocaleString('pt-BR'),
      data: data.toLocaleDateString('pt-BR'),
      hora: data.toLocaleTimeString('pt-BR'),
      timestamp: ts,
      timestampMs: ts * 1000
    }
    trackToolUsage('Conversor Timestamp', 'date-to-timestamp')
  }
}

const copiar = async (texto) => {
  try {
    await navigator.clipboard.writeText(texto)
    trackConversion('copy', 'timestamp')
    Swal.fire({ icon: 'success', title: 'Copiado!', timer: 1000, showConfirmButton: false })
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}

onMounted(() => {
  intervalo = setInterval(() => {
    timestampAtual.value = Math.floor(Date.now() / 1000)
  }, 1000)
})

onUnmounted(() => {
  if (intervalo) clearInterval(intervalo)
})
</script>
