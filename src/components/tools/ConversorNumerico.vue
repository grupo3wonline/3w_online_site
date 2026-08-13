<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
          <i class="fas fa-exchange-alt text-indigo-600 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Conversor Numérico</h1>
        <p class="text-gray-600">Converta números entre diferentes bases e formatos</p>
      </div>

      <div class="space-y-6">
        <!-- Entrada -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Número de Entrada
          </label>
          <input
            v-model="numeroEntrada"
            @input="converter"
            type="text"
            placeholder="Digite um número"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <!-- Tipo de Entrada -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Entrada
          </label>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
            <button
              v-for="tipo in tipos"
              :key="tipo.value"
              @click="tipoEntrada = tipo.value; converter()"
              :class="[
                'p-3 rounded-lg border-2 transition-all text-center',
                tipoEntrada === tipo.value
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 hover:border-indigo-300'
              ]"
            >
              <div class="text-xs font-medium">{{ tipo.label }}</div>
            </button>
          </div>
        </div>

        <!-- Resultado se houver entrada válida -->
        <div v-if="numeroEntrada && !erro" class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900">Conversões</h3>
          
          <!-- Conversões Numéricas -->
          <div class="grid gap-4">
            <div
              v-for="resultado in resultados"
              :key="resultado.tipo"
              class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
            >
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <div class="text-sm font-medium text-gray-600 mb-1">{{ resultado.label }}</div>
                  <div class="text-xl font-mono font-bold text-gray-900 break-all">
                    {{ resultado.valor }}
                  </div>
                </div>
                <button
                  @click="copiar(resultado.valor)"
                  class="ml-4 p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  title="Copiar"
                >
                  <i class="fas fa-copy"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Erro -->
        <div v-if="erro" class="bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <i class="fas fa-exclamation-circle text-red-600 mt-1"></i>
            <div class="text-sm text-red-900">
              <strong>Erro:</strong> {{ erro }}
            </div>
          </div>
        </div>

        <!-- Informações -->
        <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <i class="fas fa-info-circle text-indigo-600 mt-1"></i>
            <div class="text-sm text-indigo-900 space-y-2">
              <p><strong>Dica:</strong> Digite um número e escolha o tipo de entrada:</p>
              <ul class="list-disc list-inside space-y-1 ml-2">
                <li><strong>Decimal:</strong> Números normais (ex: 123, 456)</li>
                <li><strong>Binário:</strong> Apenas 0 e 1 (ex: 1010, 11001)</li>
                <li><strong>Octal:</strong> Dígitos 0-7 (ex: 123, 755)</li>
                <li><strong>Hexadecimal:</strong> 0-9 e A-F (ex: 1A2B, FF00)</li>
                <li><strong>Romano:</strong> I, V, X, L, C, D, M (ex: XIV, MCMXC)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'

const tipos = [
  { value: 'decimal', label: 'Decimal' },
  { value: 'binario', label: 'Binário' },
  { value: 'octal', label: 'Octal' },
  { value: 'hexadecimal', label: 'Hex' },
  { value: 'romano', label: 'Romano' }
]

const numeroEntrada = ref('')
const tipoEntrada = ref('decimal')
const erro = ref('')

// Funções de validação
const validarBinario = (num) => /^[01]+$/.test(num)
const validarOctal = (num) => /^[0-7]+$/.test(num)
const validarDecimal = (num) => /^\d+$/.test(num)
const validarHexadecimal = (num) => /^[0-9A-Fa-f]+$/.test(num)
const validarRomano = (num) => /^[IVXLCDM]+$/i.test(num)

// Converter Romano para Decimal
const romanoParaDecimal = (romano) => {
  const valores = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }
  romano = romano.toUpperCase()
  let resultado = 0
  
  for (let i = 0; i < romano.length; i++) {
    const atual = valores[romano[i]]
    const proximo = valores[romano[i + 1]]
    
    if (proximo && atual < proximo) {
      resultado -= atual
    } else {
      resultado += atual
    }
  }
  
  return resultado
}

// Converter Decimal para Romano
const decimalParaRomano = (num) => {
  if (num <= 0 || num > 3999) return 'Número fora do intervalo (1-3999)'
  
  const valores = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
  ]
  
  let resultado = ''
  
  for (const [valor, letra] of valores) {
    while (num >= valor) {
      resultado += letra
      num -= valor
    }
  }
  
  return resultado
}

// Converter entrada para decimal
const entradaParaDecimal = () => {
  const num = numeroEntrada.value.trim()
  
  if (!num) {
    erro.value = 'Digite um número'
    return null
  }
  
  try {
    switch (tipoEntrada.value) {
      case 'decimal':
        if (!validarDecimal(num)) {
          erro.value = 'Número decimal inválido'
          return null
        }
        return parseInt(num, 10)
        
      case 'binario':
        if (!validarBinario(num)) {
          erro.value = 'Número binário inválido (use apenas 0 e 1)'
          return null
        }
        return parseInt(num, 2)
        
      case 'octal':
        if (!validarOctal(num)) {
          erro.value = 'Número octal inválido (use apenas 0-7)'
          return null
        }
        return parseInt(num, 8)
        
      case 'hexadecimal':
        if (!validarHexadecimal(num)) {
          erro.value = 'Número hexadecimal inválido (use 0-9 e A-F)'
          return null
        }
        return parseInt(num, 16)
        
      case 'romano':
        if (!validarRomano(num)) {
          erro.value = 'Número romano inválido (use I, V, X, L, C, D, M)'
          return null
        }
        return romanoParaDecimal(num)
        
      default:
        return null
    }
  } catch (e) {
    erro.value = 'Erro ao converter número'
    return null
  }
}

// Resultados computados
const resultados = computed(() => {
  const decimal = entradaParaDecimal()
  
  if (decimal === null) return []
  
  const results = []
  
  // Decimal
  if (tipoEntrada.value !== 'decimal') {
    results.push({
      tipo: 'decimal',
      label: 'Decimal',
      valor: decimal.toString()
    })
  }
  
  // Binário
  if (tipoEntrada.value !== 'binario') {
    results.push({
      tipo: 'binario',
      label: 'Binário',
      valor: decimal.toString(2)
    })
  }
  
  // Octal
  if (tipoEntrada.value !== 'octal') {
    results.push({
      tipo: 'octal',
      label: 'Octal',
      valor: decimal.toString(8)
    })
  }
  
  // Hexadecimal
  if (tipoEntrada.value !== 'hexadecimal') {
    results.push({
      tipo: 'hexadecimal',
      label: 'Hexadecimal',
      valor: decimal.toString(16).toUpperCase()
    })
  }
  
  // Romano
  if (tipoEntrada.value !== 'romano') {
    results.push({
      tipo: 'romano',
      label: 'Romano',
      valor: decimalParaRomano(decimal)
    })
  }
  
  return results
})

// Função converter
const converter = () => {
  erro.value = ''
  entradaParaDecimal() // Isso irá definir o erro se houver
}

// Copiar para clipboard
const copiar = async (valor) => {
  try {
    await navigator.clipboard.writeText(valor)
    Swal.fire({
      icon: 'success',
      title: 'Copiado!',
      text: 'Valor copiado para a área de transferência',
      timer: 1500,
      showConfirmButton: false
    })
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: 'Não foi possível copiar'
    })
  }
}
</script>
