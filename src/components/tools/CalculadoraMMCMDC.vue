<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
          <i class="fas fa-superscript text-indigo-600 dark:text-indigo-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calculadora de MMC e MDC</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule o Mínimo Múltiplo Comum e o Máximo Divisor Comum</p>
      </div>

      <div class="space-y-6">
        <div class="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            <i class="fas fa-list mr-2"></i>Números (separados por vírgula ou espaço)
          </label>
          <input v-model="numerosTexto" type="text" placeholder="Ex: 12, 18, 24"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            @input="calcularAutomatico">
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Você pode inserir 2 ou mais números
          </p>
        </div>

        <div v-if="numeros.length >= 2" class="grid md:grid-cols-2 gap-6">
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                <i class="fas fa-arrow-up text-blue-600 dark:text-blue-400"></i>
                <h3 class="font-bold text-gray-900 dark:text-white">MMC</h3>
              </div>
              <span class="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-2 py-1 rounded">
                Mínimo Múltiplo Comum
              </span>
            </div>
            <div class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {{ resultadoMMC }}
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              Menor número divisível por todos os números informados
            </p>
          </div>

          <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                <i class="fas fa-arrow-down text-green-600 dark:text-green-400"></i>
                <h3 class="font-bold text-gray-900 dark:text-white">MDC</h3>
              </div>
              <span class="text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 px-2 py-1 rounded">
                Máximo Divisor Comum
              </span>
            </div>
            <div class="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              {{ resultadoMDC }}
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              Maior número que divide todos os números informados
            </p>
          </div>
        </div>

        <div v-if="fatoracao.length > 0" class="bg-white dark:bg-gray-700 rounded-lg p-6">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <i class="fas fa-project-diagram text-indigo-600"></i>
            Fatoração (Método da Decomposição)
          </h4>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-600">
                  <th class="text-left py-2 px-3 text-gray-700 dark:text-gray-300">Números</th>
                  <th class="text-left py-2 px-3 text-gray-700 dark:text-gray-300">Divisor</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(linha, index) in fatoracao" :key="index" 
                  class="border-b border-gray-100 dark:border-gray-600">
                  <td class="py-2 px-3 font-mono text-gray-900 dark:text-white">{{ linha.numeros.join(', ') }}</td>
                  <td class="py-2 px-3 font-bold text-indigo-600 dark:text-indigo-400">{{ linha.divisor }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded">
            <p class="text-xs text-gray-700 dark:text-gray-300">
              <strong>MMC:</strong> Multiplicação de todos os divisores = {{ divisoresMMC.join(' × ') }} = {{ resultadoMMC }}
            </p>
            <p class="text-xs text-gray-700 dark:text-gray-300 mt-1">
              <strong>MDC:</strong> Multiplicação dos divisores comuns = {{ divisoresMDC.join(' × ') }} = {{ resultadoMDC }}
            </p>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h5 class="font-semibold text-blue-900 dark:text-blue-300 mb-2 text-sm">
              <i class="fas fa-lightbulb mr-2"></i>Quando usar MMC?
            </h5>
            <ul class="text-xs text-blue-800 dark:text-blue-400 space-y-1 list-disc list-inside">
              <li>Somar ou subtrair frações</li>
              <li>Problemas de múltiplos comuns</li>
              <li>Sincronização de eventos periódicos</li>
            </ul>
          </div>

          <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h5 class="font-semibold text-green-900 dark:text-green-300 mb-2 text-sm">
              <i class="fas fa-lightbulb mr-2"></i>Quando usar MDC?
            </h5>
            <ul class="text-xs text-green-800 dark:text-green-400 space-y-1 list-disc list-inside">
              <li>Simplificar frações</li>
              <li>Dividir em partes iguais</li>
              <li>Encontrar maior medida comum</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const numerosTexto = ref('12, 18, 24')
const fatoracao = ref([])
const divisoresMMC = ref([])
const divisoresMDC = ref([])

const numeros = computed(() => {
  return numerosTexto.value
    .split(/[,\s]+/)
    .map(n => parseInt(n.trim()))
    .filter(n => !isNaN(n) && n > 0)
})

const mdc2 = (a, b) => {
  while (b) {
    const t = b
    b = a % b
    a = t
  }
  return a
}

const mmc2 = (a, b) => {
  return (a * b) / mdc2(a, b)
}

const calcularMDC = (nums) => {
  return nums.reduce((acc, num) => mdc2(acc, num))
}

const calcularMMC = (nums) => {
  return nums.reduce((acc, num) => mmc2(acc, num))
}

const resultadoMMC = computed(() => {
  if (numeros.value.length < 2) return 0
  return calcularMMC(numeros.value)
})

const resultadoMDC = computed(() => {
  if (numeros.value.length < 2) return 0
  return calcularMDC(numeros.value)
})

const calcularFatoracao = () => {
  if (numeros.value.length < 2) {
    fatoracao.value = []
    return
  }

  const nums = [...numeros.value]
  const passos = []
  const divisoresMmcTemp = []
  const divisoresMdcTemp = []

  let divisor = 2
  while (nums.some(n => n > 1)) {
    let dividiu = false
    const novosNums = nums.map(n => {
      if (n % divisor === 0) {
        dividiu = true
        return n / divisor
      }
      return n
    })

    if (dividiu) {
      passos.push({ numeros: [...nums], divisor })
      divisoresMmcTemp.push(divisor)
      
      if (nums.every(n => n % divisor === 0)) {
        divisoresMdcTemp.push(divisor)
      }
      
      nums.splice(0, nums.length, ...novosNums)
    } else {
      divisor++
    }

    if (divisor > 1000) break
  }

  fatoracao.value = passos
  divisoresMMC.value = divisoresMmcTemp
  divisoresMDC.value = divisoresMdcTemp.length > 0 ? divisoresMdcTemp : [1]
}

const calcularAutomatico = () => {
  if (numeros.value.length >= 2) {
    calcularFatoracao()
    trackToolUsage('Calculadora MMC MDC', 'calculate', { 
      count: numeros.value.length 
    })
  }
}

calcularAutomatico()
</script>
