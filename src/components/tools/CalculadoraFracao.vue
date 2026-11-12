<template>
  <ToolShell
    title="Calculadora de Frações"
    description="Some, subtraia, multiplique e divida frações com passo a passo e forma simplificada."
    icon="fa-divide"
    icon-gradient="from-pink-500 to-rose-700"
    orb-color="purple"
    :quick-tips="['Soma, subtração, multiplicação, divisão', 'Simplificação pelo MDC', 'Passo a passo explicado']"
    :tips="[
      { title: 'Soma e Subtração', text: 'É necessário igualar os denominadores usando o MMC antes de operar os numeradores.', type: 'info' },
      { title: 'Multiplicação', text: 'Multiplique numeradores entre si e denominadores entre si diretamente, sem igualar.', type: 'info' },
      { title: 'Divisão', text: 'Mantenha a primeira fração e multiplique pelo inverso da segunda (troca numerador e denominador).', type: 'warning' },
    ]"
    :examples="[
      { title: 'Soma simples', desc: '1/2 + 1/3', result: 'MMC(2,3)=6 → 3/6 + 2/6 = 5/6 ≈ 0,8333' },
      { title: 'Divisão', desc: '3/4 ÷ 2/5', result: '3/4 × 5/2 = 15/8 = 1,875' },
      { title: 'Multiplicação com simplificação', desc: '4/6 × 3/8', result: '12/48 → simplificado: 1/4 = 0,25' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <!-- Operação -->
        <div class="glass-panel p-4">
          <label class="input-aurora-label mb-3">
            <i class="fas fa-calculator mr-1.5 text-pink-500"></i>
            Operação
          </label>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="op in operacoes"
              :key="op.id"
              @click="operacao = op.id"
              :class="['p-4 rounded-xl border-2 transition-all text-center', operacao === op.id ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20' : 'border-gray-200 dark:border-slate-600 hover:border-pink-300']"
            >
              <i :class="[op.icon, 'text-2xl', operacao === op.id ? 'text-pink-600' : 'text-gray-400']"></i>
              <span :class="['text-xs block mt-1 font-semibold', operacao === op.id ? 'text-pink-700 dark:text-pink-300' : 'text-gray-500']">{{ op.label }}</span>
            </button>
          </div>
        </div>

        <!-- Frações -->
        <div class="tool-body !mb-0 space-y-4">
          <div class="grid grid-cols-2 gap-6">
            <div class="space-y-2">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200">1ª Fração</h4>
              <div class="flex items-center gap-2">
                <BaseInput v-model="num1" label="Num." type="number" />
                <span class="text-2xl text-gray-400 mt-5 font-bold">—</span>
                <BaseInput v-model="den1" label="Den." type="number" />
              </div>
            </div>
            <div class="space-y-2">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200">2ª Fração</h4>
              <div class="flex items-center gap-2">
                <BaseInput v-model="num2" label="Num." type="number" />
                <span class="text-2xl text-gray-400 mt-5 font-bold">—</span>
                <BaseInput v-model="den2" label="Den." type="number" />
              </div>
            </div>
          </div>

          <BaseButton variant="primary" icon="fa-calculator" @click="calcular" fullWidth>
            Calcular {{ operacoes.find(o => o.id === operacao)?.label }}
          </BaseButton>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="calculado" class="space-y-4">
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-2">
                {{ num1 }}/{{ den1 }} {{ getOperacaoSimbolo() }} {{ num2 }}/{{ den2 }}
              </p>
              <div class="flex items-center justify-center gap-4 text-5xl font-black text-white mb-2">
                <span>{{ resultado.numerador }}</span>
                <span class="text-white/50">—</span>
                <span>{{ resultado.denominador }}</span>
              </div>
              <p class="text-pink-300 text-sm font-semibold">= {{ resultado.decimal.toFixed(4) }}</p>
            </div>

            <div v-if="resultado.simplificado" class="glass-panel p-4 text-center">
              <p class="text-xs text-gray-500 dark:text-slate-400 mb-2">Forma Simplificada</p>
              <div class="flex items-center justify-center gap-4 text-3xl font-black text-purple-600 dark:text-purple-400">
                <span>{{ resultado.numSimplificado }}</span>
                <span class="text-gray-400">—</span>
                <span>{{ resultado.denSimplificado }}</span>
              </div>
            </div>

            <div class="metric-glass">
              <span class="metric-glass-value text-pink-600 dark:text-pink-400">{{ resultado.decimal.toFixed(6) }}</span>
              <span class="metric-glass-label">Valor decimal</span>
            </div>

            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-list-ol text-pink-500"></i>
                Passo a Passo
              </h4>
              <div class="space-y-1 text-xs text-gray-700 dark:text-slate-200 font-mono">
                <p><strong>MMC dos denominadores:</strong> {{ resultado.mmc }}</p>
                <div v-html="resultado.explicacao"></div>
              </div>
            </div>

            <div class="tip-card">
              <i class="fas fa-info-circle text-blue-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                Simplificação pelo MDC: divide numerador e denominador pelo maior divisor comum.
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="!calculado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-divide text-4xl mb-3 opacity-30 block text-pink-400"></i>
          <p class="text-sm">Insira as duas frações e selecione a operação para calcular</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref } from 'vue'
import DOMPurify from 'dompurify'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const operacoes = [
  { id: 'soma',           icon: 'fas fa-plus',   label: 'Soma' },
  { id: 'subtracao',      icon: 'fas fa-minus',  label: 'Subtração' },
  { id: 'multiplicacao',  icon: 'fas fa-times',  label: 'Multiplicação' },
  { id: 'divisao',        icon: 'fas fa-divide', label: 'Divisão' },
]

const operacao = ref('soma')
const num1 = ref(1)
const den1 = ref(2)
const num2 = ref(1)
const den2 = ref(3)
const calculado = ref(false)
const resultado = ref({})

const mdc = (a, b) => {
  a = Math.abs(a); b = Math.abs(b)
  while (b) { const t = b; b = a % b; a = t }
  return a
}

const mmc = (a, b) => Math.abs(a * b) / mdc(a, b)

const simplificar = (num, den) => {
  const divisor = mdc(num, den)
  return { numerador: num / divisor, denominador: den / divisor }
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
      explicacao = `${num1.value}×${mmcDen / Number(den1.value)} + ${num2.value}×${mmcDen / Number(den2.value)} = ${numResultado}<br>Resultado: ${numResultado}/${denResultado}`
      break
    case 'subtracao':
      numResultado = (Number(num1.value) * mmcDen / Number(den1.value)) - (Number(num2.value) * mmcDen / Number(den2.value))
      denResultado = mmcDen
      explicacao = `${num1.value}×${mmcDen / Number(den1.value)} - ${num2.value}×${mmcDen / Number(den2.value)} = ${numResultado}<br>Resultado: ${numResultado}/${denResultado}`
      break
    case 'multiplicacao':
      numResultado = Number(num1.value) * Number(num2.value)
      denResultado = Number(den1.value) * Number(den2.value)
      explicacao = `${num1.value} × ${num2.value} = ${numResultado}<br>${den1.value} × ${den2.value} = ${denResultado}`
      break
    case 'divisao':
      numResultado = Number(num1.value) * Number(den2.value)
      denResultado = Number(den1.value) * Number(num2.value)
      explicacao = `${num1.value} × ${den2.value} = ${numResultado}<br>${den1.value} × ${num2.value} = ${denResultado}`
      break
  }

  const simplificado = simplificar(numResultado, denResultado)
  const precisaSimplificar = simplificado.numerador !== numResultado || simplificado.denominador !== denResultado

  resultado.value = {
    numerador: numResultado,
    denominador: denResultado,
    decimal: numResultado / denResultado,
    mmc: mmcDen,
    explicacao: DOMPurify.sanitize(explicacao),
    simplificado: precisaSimplificar,
    numSimplificado: simplificado.numerador,
    denSimplificado: simplificado.denominador,
  }

  calculado.value = true
}

const getOperacaoSimbolo = () => {
  const simbolos = { soma: '+', subtracao: '−', multiplicacao: '×', divisao: '÷' }
  return simbolos[operacao.value]
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
