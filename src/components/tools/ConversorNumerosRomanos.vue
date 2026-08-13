<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-violet-100 dark:bg-violet-900/30 rounded-full mb-4">
          <i class="fas fa-sort-numeric-up text-violet-600 dark:text-violet-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Conversor de Números Romanos</h1>
        <p class="text-gray-600 dark:text-gray-400">Converta entre algarismos romanos e arábicos</p>
      </div>

      <div class="space-y-6">
        <div class="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <button @click="modo = 'arabico-romano'" class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors" :class="modo === 'arabico-romano' ? 'bg-violet-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'">
            <i class="fas fa-arrow-right mr-2"></i>
            Arábico → Romano
          </button>
          <button @click="modo = 'romano-arabico'" class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors" :class="modo === 'romano-arabico' ? 'bg-violet-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'">
            <i class="fas fa-arrow-left mr-2"></i>
            Romano → Arábico
          </button>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ modo === 'arabico-romano' ? 'Número Arábico' : 'Número Romano' }}
          </label>
          <input v-model="input" @input="converter" :placeholder="modo === 'arabico-romano' ? '2024' : 'MMXXIV'" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent text-2xl text-center font-bold" />
        </div>

        <div v-if="output" class="space-y-4">
          <div class="bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Resultado</div>
            <div class="text-6xl font-bold mb-4">{{ output }}</div>
            <button @click="copiar" class="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
              <i class="fas fa-copy mr-2"></i>
              Copiar
            </button>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <button v-for="num in exemplos" :key="num.arabico" @click="usarExemplo(num)" class="p-3 bg-gray-50 dark:bg-gray-700 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg transition-colors">
              <div class="text-lg font-bold text-gray-900 dark:text-white">{{ num.romano }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">{{ num.arabico }}</div>
            </button>
          </div>
        </div>

        <div class="bg-violet-50 dark:bg-violet-900/20 border-l-4 border-violet-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-violet-600 dark:text-violet-400 mt-1 mr-3"></i>
            <div class="text-sm text-violet-800 dark:text-violet-300">
              <p class="font-semibold mb-2">Algarismos Romanos Básicos:</p>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <div><span class="font-bold">I</span> = 1</div>
                <div><span class="font-bold">V</span> = 5</div>
                <div><span class="font-bold">X</span> = 10</div>
                <div><span class="font-bold">L</span> = 50</div>
                <div><span class="font-bold">C</span> = 100</div>
                <div><span class="font-bold">D</span> = 500</div>
                <div><span class="font-bold">M</span> = 1000</div>
              </div>
              <p class="mt-2 text-xs">Regra de subtração: IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900</p>
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

const modo = ref('arabico-romano')
const input = ref('2024')
const output = ref('MMXXIV')

const exemplos = [
  { arabico: '1', romano: 'I' },
  { arabico: '10', romano: 'X' },
  { arabico: '50', romano: 'L' },
  { arabico: '100', romano: 'C' },
  { arabico: '500', romano: 'D' },
  { arabico: '1000', romano: 'M' },
  { arabico: '2024', romano: 'MMXXIV' },
  { arabico: '1999', romano: 'MCMXCIX' },
  { arabico: '444', romano: 'CDXLIV' }
]

const arabicoParaRomano = (num) => {
  const numero = parseInt(num)
  
  if (isNaN(numero) || numero < 1 || numero > 3999) {
    throw new Error('Digite um número entre 1 e 3999')
  }
  
  const valores = [
    { valor: 1000, simbolo: 'M' },
    { valor: 900, simbolo: 'CM' },
    { valor: 500, simbolo: 'D' },
    { valor: 400, simbolo: 'CD' },
    { valor: 100, simbolo: 'C' },
    { valor: 90, simbolo: 'XC' },
    { valor: 50, simbolo: 'L' },
    { valor: 40, simbolo: 'XL' },
    { valor: 10, simbolo: 'X' },
    { valor: 9, simbolo: 'IX' },
    { valor: 5, simbolo: 'V' },
    { valor: 4, simbolo: 'IV' },
    { valor: 1, simbolo: 'I' }
  ]
  
  let resultado = ''
  let restante = numero
  
  for (const { valor, simbolo } of valores) {
    while (restante >= valor) {
      resultado += simbolo
      restante -= valor
    }
  }
  
  return resultado
}

const romanoParaArabico = (romano) => {
  const str = romano.toUpperCase().trim()
  
  if (!/^[MDCLXVI]+$/.test(str)) {
    throw new Error('Digite apenas algarismos romanos válidos (M, D, C, L, X, V, I)')
  }
  
  const valores = {
    'M': 1000,
    'D': 500,
    'C': 100,
    'L': 50,
    'X': 10,
    'V': 5,
    'I': 1
  }
  
  let total = 0
  let anterior = 0
  
  for (let i = str.length - 1; i >= 0; i--) {
    const atual = valores[str[i]]
    
    if (atual < anterior) {
      total -= atual
    } else {
      total += atual
    }
    
    anterior = atual
  }
  
  return total.toString()
}

const converter = () => {
  if (!input.value.trim()) {
    output.value = ''
    return
  }
  
  try {
    if (modo.value === 'arabico-romano') {
      output.value = arabicoParaRomano(input.value)
    } else {
      output.value = romanoParaArabico(input.value)
    }
    
    trackToolUsage('Conversor Números Romanos', modo.value)
  } catch (e) {
    output.value = ''
    Swal.fire({
      title: 'Erro',
      text: e.message,
      icon: 'error'
    })
  }
}

const usarExemplo = (exemplo) => {
  if (modo.value === 'arabico-romano') {
    input.value = exemplo.arabico
  } else {
    input.value = exemplo.romano
  }
  converter()
}

const copiar = async () => {
  try {
    await navigator.clipboard.writeText(output.value)
    Swal.fire({
      title: 'Copiado!',
      text: 'Número copiado para área de transferência',
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
