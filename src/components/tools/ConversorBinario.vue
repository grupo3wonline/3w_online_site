<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-full mb-4">
          <i class="fas fa-binary text-rose-600 dark:text-rose-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Conversor Binário</h1>
        <p class="text-gray-600 dark:text-gray-400">Converta entre decimal, binário, octal e hexadecimal</p>
      </div>

      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Base de Origem</label>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button @click="baseOrigem = 'decimal'" class="p-3 rounded-lg border-2 transition-all" :class="baseOrigem === 'decimal' ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20' : 'border-gray-300 dark:border-gray-600'">
              <div class="font-bold text-gray-900 dark:text-white">Decimal</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Base 10</div>
            </button>
            <button @click="baseOrigem = 'binario'" class="p-3 rounded-lg border-2 transition-all" :class="baseOrigem === 'binario' ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20' : 'border-gray-300 dark:border-gray-600'">
              <div class="font-bold text-gray-900 dark:text-white">Binário</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Base 2</div>
            </button>
            <button @click="baseOrigem = 'octal'" class="p-3 rounded-lg border-2 transition-all" :class="baseOrigem === 'octal' ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20' : 'border-gray-300 dark:border-gray-600'">
              <div class="font-bold text-gray-900 dark:text-white">Octal</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Base 8</div>
            </button>
            <button @click="baseOrigem = 'hexadecimal'" class="p-3 rounded-lg border-2 transition-all" :class="baseOrigem === 'hexadecimal' ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20' : 'border-gray-300 dark:border-gray-600'">
              <div class="font-bold text-gray-900 dark:text-white">Hexadecimal</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Base 16</div>
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Valor</label>
          <input v-model="input" @input="converter" :placeholder="getPlaceholder()" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:border-transparent text-2xl text-center font-mono" />
        </div>

        <div v-if="resultado" class="space-y-3">
          <div v-for="conv in conversoes" :key="conv.nome" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div class="flex justify-between items-center">
              <div>
                <div class="font-bold text-gray-900 dark:text-white">{{ conv.nome }}</div>
                <div class="text-xs text-gray-600 dark:text-gray-400">{{ conv.descricao }}</div>
              </div>
              <div class="flex items-center gap-2">
                <div class="text-xl font-mono font-bold text-rose-600 dark:text-rose-400">{{ conv.valor }}</div>
                <button @click="copiar(conv.valor)" class="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm transition-colors">
                  <i class="fas fa-copy"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-rose-600 dark:text-rose-400 mt-1 mr-3"></i>
            <div class="text-sm text-rose-800 dark:text-rose-300">
              <p class="font-semibold mb-2">Sobre as bases numéricas:</p>
              <ul class="list-disc list-inside space-y-1 text-xs">
                <li><strong>Decimal (Base 10):</strong> Sistema numérico comum (0-9)</li>
                <li><strong>Binário (Base 2):</strong> Usado em computação (0-1)</li>
                <li><strong>Octal (Base 8):</strong> Representação compacta (0-7)</li>
                <li><strong>Hexadecimal (Base 16):</strong> Cores, endereços de memória (0-9, A-F)</li>
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
import Swal from 'sweetalert2'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const baseOrigem = ref('decimal')
const input = ref('255')
const resultado = ref(null)
const conversoes = ref([])

const getPlaceholder = () => {
  const placeholders = {
    decimal: '255',
    binario: '11111111',
    octal: '377',
    hexadecimal: 'FF'
  }
  return placeholders[baseOrigem.value]
}

const converter = () => {
  if (!input.value.trim()) {
    resultado.value = null
    conversoes.value = []
    return
  }
  
  try {
    let valorDecimal = 0
    
    switch (baseOrigem.value) {
      case 'decimal':
        valorDecimal = parseInt(input.value, 10)
        break
      case 'binario':
        if (!/^[01]+$/.test(input.value)) {
          throw new Error('Binário deve conter apenas 0 e 1')
        }
        valorDecimal = parseInt(input.value, 2)
        break
      case 'octal':
        if (!/^[0-7]+$/.test(input.value)) {
          throw new Error('Octal deve conter apenas dígitos 0-7')
        }
        valorDecimal = parseInt(input.value, 8)
        break
      case 'hexadecimal':
        if (!/^[0-9A-Fa-f]+$/.test(input.value)) {
          throw new Error('Hexadecimal deve conter apenas 0-9 e A-F')
        }
        valorDecimal = parseInt(input.value, 16)
        break
    }
    
    if (isNaN(valorDecimal)) {
      throw new Error('Valor inválido')
    }
    
    conversoes.value = [
      {
        nome: 'Decimal',
        descricao: 'Base 10',
        valor: valorDecimal.toString(10)
      },
      {
        nome: 'Binário',
        descricao: 'Base 2',
        valor: valorDecimal.toString(2)
      },
      {
        nome: 'Octal',
        descricao: 'Base 8',
        valor: valorDecimal.toString(8)
      },
      {
        nome: 'Hexadecimal',
        descricao: 'Base 16',
        valor: valorDecimal.toString(16).toUpperCase()
      }
    ]
    
    resultado.value = valorDecimal
    trackToolUsage('Conversor Binário', baseOrigem.value)
  } catch (e) {
    resultado.value = null
    conversoes.value = []
    Swal.fire({
      title: 'Erro',
      text: e.message,
      icon: 'error'
    })
  }
}

const copiar = async (texto) => {
  try {
    await navigator.clipboard.writeText(texto)
    Swal.fire({
      title: 'Copiado!',
      text: 'Valor copiado para área de transferência',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    })
  } catch {
    Swal.fire('Erro', 'Não foi possível copiar', 'error')
  }
}

// Conversão inicial
converter()
</script>
