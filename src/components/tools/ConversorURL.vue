<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-sky-100 dark:bg-sky-900/30 rounded-full mb-4">
          <i class="fas fa-link text-sky-600 dark:text-sky-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Conversor URL Encode/Decode</h1>
        <p class="text-gray-600 dark:text-gray-400">Encode e decode URLs</p>
      </div>

      <div class="space-y-6">
        <div class="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <button @click="modo = 'encode'" class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors" :class="modo === 'encode' ? 'bg-sky-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'">
            <i class="fas fa-arrow-right mr-2"></i>Encode
          </button>
          <button @click="modo = 'decode'" class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors" :class="modo === 'decode' ? 'bg-sky-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'">
            <i class="fas fa-arrow-left mr-2"></i>Decode
          </button>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Entrada</label>
          <textarea v-model="entrada" @input="converter" rows="4" :placeholder="modo === 'encode' ? 'Digite a URL ou texto para encodar...' : 'Cole a URL encodada para decodar...'" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 resize-none font-mono text-sm"></textarea>
        </div>

        <div v-if="saida">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Resultado</label>
          <div class="relative">
            <textarea v-model="saida" readonly rows="4" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-600 text-gray-900 dark:text-white resize-none font-mono text-sm"></textarea>
            <button @click="copiar" class="absolute top-2 right-2 px-3 py-1 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors text-sm">
              <i class="fas fa-copy mr-1"></i>Copiar
            </button>
          </div>
        </div>

        <div class="bg-sky-50 dark:bg-sky-900/20 border-l-4 border-sky-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-sky-600 dark:text-sky-400 mt-1 mr-3"></i>
            <div class="text-sm text-sky-800 dark:text-sky-300">
              <p class="font-semibold mb-2">Quando usar URL Encode:</p>
              <ul class="list-disc list-inside space-y-1">
                <li>Parâmetros de query string em URLs</li>
                <li>Envio de dados em formulários</li>
                <li>URLs com caracteres especiais ou espaços</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
            <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Espaço</div>
            <code class="text-sm font-bold text-gray-900 dark:text-white">%20</code>
          </div>
          <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
            <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">&</div>
            <code class="text-sm font-bold text-gray-900 dark:text-white">%26</code>
          </div>
          <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
            <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">=</div>
            <code class="text-sm font-bold text-gray-900 dark:text-white">%3D</code>
          </div>
          <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
            <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">?</div>
            <code class="text-sm font-bold text-gray-900 dark:text-white">%3F</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage, trackConversion } = useAnalytics()

const modo = ref('encode')
const entrada = ref('')
const saida = ref('')

const converter = () => {
  if (!entrada.value) {
    saida.value = ''
    return
  }

  try {
    if (modo.value === 'encode') {
      saida.value = encodeURIComponent(entrada.value)
      trackToolUsage('Conversor URL', 'encode')
    } else {
      saida.value = decodeURIComponent(entrada.value)
      trackToolUsage('Conversor URL', 'decode')
    }
  } catch (e) {
    saida.value = 'Erro: Formato inválido'
  }
}

const copiar = async () => {
  try {
    await navigator.clipboard.writeText(saida.value)
    trackConversion('copy', 'url')
    Swal.fire({ icon: 'success', title: 'Copiado!', timer: 1000, showConfirmButton: false })
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}
</script>
