<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-full mb-4">
          <i class="fas fa-divide text-pink-600 dark:text-pink-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calculadora de Frações</h1>
        <p class="text-gray-600 dark:text-gray-400">Operações com frações: soma, subtração, multiplicação e divisão</p>
      </div>

      <div class="space-y-6">
        <div class="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Operação</label>
          <div class="grid grid-cols-4 gap-3">
            <button v-for="op in operacoes" :key="op.id" @click="operacao = op.id"
              :class="['p-4 rounded-lg border-2', operacao === op.id ? 'border-pink-600 bg-pink-50 dark:bg-pink-900/30' : 'border-gray-200 dark:border-gray-600']">
              <i :class="[op.icon, 'text-3xl', operacao === op.id ? 'text-pink-600' : 'text-gray-400']"></i>
            </button>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <h3 class="font-bold text-gray-900 dark:text-white">Primeira Fração</h3>
              <div class="flex items-center gap-3">
                <BaseInput v-model="num1" label="Numerador" type="number" />
                <div class="text-3xl text-gray-400 mt-6">—</div>
                <BaseInput v-model="den1" label="Denominador" type="number" />
              </div>
            </div>

            <div class="space-y-4">
              <h3 class="font-bold text-gray-900 dark:text-white">Segunda Fração</h3>
              <div class="flex items-center gap-3">
                <BaseInput v-model="num2" label="Numerador" type="number" />
                <div class="text-3xl text-gray-400 mt-6">—</div>
                <BaseInput v-model="den2" label="Denominador" type="number" />
              </div>
            </div>
          </div>
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>Calcular
        </BaseButton>

        <div v-if="calculado" class="space-y-4">
          <div class="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/30 dark:to-purple-900/30 rounded-lg p-8">
            <div class="text-center">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-4">Resultado</div>
              <div class="flex items-center justify-center gap-4 text-4xl font-bold text-pink-600 dark:text-pink-400">
                <span>{{ resultado.numerador }}</span>
                <span class="text-gray-400">—</span>
                <span>{{ resultado.denominador }}</span>
              </div>
              <div class="mt-4 text-lg text-gray-700 dark:text-gray-300">
                = {{ resultado.decimal.toFixed(4) }}
              </div>
              <div v-if="resultado.simplificado" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Forma Simplificada</div>
                <div class="flex items-center justify-center gap-3 text-2xl font-bold text-purple-600 dark:text-purple-400">
                  <span>{{ resultado.numSimplificado }}</span>
                  <span class="text-gray-400">—</span>
                  <span>{{ resultado.denSimplificado }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-700 rounded-lg p-6">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Passo a Passo</h4>
            <div class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p><strong>Operação:</strong> {{ num1 }}/{{ den1 }} {{ getOperacaoSimbolo() }} {{ num2 }}/{{ den2 }}</p>
              <p><strong>MMC:</strong> {{ resultado.mmc }}</p>
              <p v-html="resultado.explicacao"></p>
            </div>
          </div>
        </div>

        <div class="bg-pink-50 dark:bg-pink-900/20 border-l-4 border-pink-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-pink-600 dark:text-pink-400 mt-1 mr-3"></i>
            <div class="text-sm text-pink-800 dark:text-pink-300">
              <p class="font-semibold mb-2">Regras das Frações:</p>
              <ul class="list-disc list-inside space-y-1 text-xs">
                <li><strong>Soma/Subtração:</strong> Iguale os denominadores (MMC), depois opere os numeradores</li>
                <li><strong>Multiplicação:</strong> Multiplique numeradores e denominadores diretamente</li>
                <li><strong>Divisão:</strong> Multiplique pela fração invertida (mantém × inverte)</li>
                <li>Sempre simplifique o resultado dividindo pelo MDC</li>
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
import BaseInput from './common/BaseInput.vue'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const operacoes = [
  { id: 'soma', icon: 'fas fa-plus' },
  { id: 'subtracao', icon: 'fas fa-minus' },
  { id: 'multiplicacao', icon: 'fas fa-times' },
  { id: 'divisao', icon: 'fas fa-divide' }
]

const operacao = ref('soma')
const num1 = ref(1)
const den1 = ref(2)
const num2 = ref(1)
const den2 = ref(3)
const calculado = ref(false)
const resultado = ref({})

const mdc = (a, b) => {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) {
    const t = b
    b = a % b
    a = t
  }
  return a
}

const mmc = (a, b) => {
  return Math.abs(a * b) / mdc(a, b)
}

const simplificar = (num, den) => {
  const divisor = mdc(num, den)
  return {
    numerador: num / divisor,
    denominador: den / divisor
  }
}

const calcular = () => {
  let numResultado = 0
  let denResultado = 1
  let explicacao = ''
  const mmcDen = mmc(Number(den1.value), Number(den2.value))

  switch (operacao.value) {
    case 'soma':
      numResultado = (Number(num1.value) * mmcDen / Number(den1.value)) + (Number(num2.value) * mmcDen / Number(den2.value))
      denResultado = mmcDen
      explicacao = `MMC(${den1.value}, ${den2.value}) = ${mmcDen}<br>
                    ${num1.value}×${mmcDen / Number(den1.value)} + ${num2.value}×${mmcDen / Number(den2.value)} = ${numResultado}<br>
                    Resultado: ${numResultado}/${denResultado}`
      break

    case 'subtracao':
      numResultado = (Number(num1.value) * mmcDen / Number(den1.value)) - (Number(num2.value) * mmcDen / Number(den2.value))
      denResultado = mmcDen
      explicacao = `MMC(${den1.value}, ${den2.value}) = ${mmcDen}<br>
                    ${num1.value}×${mmcDen / Number(den1.value)} - ${num2.value}×${mmcDen / Number(den2.value)} = ${numResultado}<br>
                    Resultado: ${numResultado}/${denResultado}`
      break

    case 'multiplicacao':
      numResultado = Number(num1.value) * Number(num2.value)
      denResultado = Number(den1.value) * Number(den2.value)
      explicacao = `${num1.value} × ${num2.value} = ${numResultado}<br>
                    ${den1.value} × ${den2.value} = ${denResultado}<br>
                    Resultado: ${numResultado}/${denResultado}`
      break

    case 'divisao':
      numResultado = Number(num1.value) * Number(den2.value)
      denResultado = Number(den1.value) * Number(num2.value)
      explicacao = `Mantém a primeira e multiplica pelo inverso da segunda<br>
                    ${num1.value} × ${den2.value} = ${numResultado}<br>
                    ${den1.value} × ${num2.value} = ${denResultado}<br>
                    Resultado: ${numResultado}/${denResultado}`
      break
  }

  const simplificado = simplificar(numResultado, denResultado)
  const precisaSimplificar = simplificado.numerador !== numResultado || simplificado.denominador !== denResultado

  resultado.value = {
    numerador: numResultado,
    denominador: denResultado,
    decimal: numResultado / denResultado,
    mmc: mmcDen,
    explicacao,
    simplificado: precisaSimplificar,
    numSimplificado: simplificado.numerador,
    denSimplificado: simplificado.denominador
  }

  calculado.value = true
  trackToolUsage('Calculadora Fracao', 'calculate', { operation: operacao.value })
}

const getOperacaoSimbolo = () => {
  const simbolos = { soma: '+', subtracao: '-', multiplicacao: '×', divisao: '÷' }
  return simbolos[operacao.value]
}
</script>
