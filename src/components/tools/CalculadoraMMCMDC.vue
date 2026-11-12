<template>
  <ToolShell
    title="Calculadora de MMC e MDC"
    description="Calcule o Mínimo Múltiplo Comum e o Máximo Divisor Comum de dois ou mais números inteiros."
    icon="fa-square-root-variable"
    icon-gradient="from-purple-500 to-violet-700"
    orb-color="purple"
    :quick-tips="['MMC para frações', 'MDC para simplificar', 'Fatoração passo a passo']"
    :tips="[
      { title: 'Quando usar MMC', text: 'O MMC é usado para somar ou subtrair frações (igualar denominadores) e em problemas de múltiplos comuns.', type: 'info' },
      { title: 'Quando usar MDC', text: 'O MDC é usado para simplificar frações e dividir quantidades em partes iguais da maior forma possível.', type: 'info' },
      { title: 'Propriedade', text: 'MMC(a,b) × MDC(a,b) = a × b. Para dois números, você pode usar essa relação para calcular um a partir do outro.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Dois números', desc: 'MMC e MDC de 12 e 18', result: 'MMC = 36 | MDC = 6' },
      { title: 'Três números', desc: 'MMC e MDC de 12, 18 e 24', result: 'MMC = 72 | MDC = 6' },
      { title: 'Números primos', desc: 'MMC e MDC de 7 e 13', result: 'MMC = 91 | MDC = 1 (coprimos)' },
    ]"
  >
    <!-- Input -->
    <div class="tool-body space-y-3">
      <label class="input-aurora-label">
        <i class="fas fa-list mr-1.5 text-purple-500"></i>
        Números (separados por vírgula ou espaço)
      </label>
      <input
        v-model="numerosTexto"
        type="text"
        placeholder="Ex: 12, 18, 24"
        class="input-aurora w-full"
        @input="calcularAutomatico"
      />
      <p class="input-aurora-hint">Insira 2 ou mais números inteiros positivos</p>
    </div>

    <!-- Resultado -->
    <Transition name="scale-in">
      <div v-if="numeros.length >= 2" class="space-y-4 mt-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="tool-header text-center py-6 !mb-0">
            <div class="flex items-center justify-between mb-3 px-2">
              <span class="text-xs text-blue-200">Mínimo Múltiplo Comum</span>
              <span class="badge-aurora-blue text-[10px]">MMC</span>
            </div>
            <p class="text-5xl font-black text-white mb-1">{{ resultadoMMC }}</p>
            <p class="text-blue-300 text-xs">{{ numeros.join(' e ') }}</p>
          </div>
          <div class="tool-header text-center py-6 !mb-0 !from-emerald-600 !via-emerald-700 !to-teal-800">
            <div class="flex items-center justify-between mb-3 px-2">
              <span class="text-xs text-emerald-200">Máximo Divisor Comum</span>
              <span class="badge-aurora-green text-[10px]">MDC</span>
            </div>
            <p class="text-5xl font-black text-white mb-1">{{ resultadoMDC }}</p>
            <p class="text-emerald-300 text-xs">{{ numeros.join(' e ') }}</p>
          </div>
        </div>

        <!-- Tabela de fatoração -->
        <div v-if="fatoracao.length > 0" class="glass-panel p-4">
          <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
            <i class="fas fa-project-diagram text-purple-500"></i>
            Fatoração — Método da Decomposição
          </h4>
          <div class="overflow-x-auto">
            <table class="w-full text-xs">
              <thead>
                <tr class="border-b border-gray-200 dark:border-slate-600">
                  <th class="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold">Números</th>
                  <th class="text-left py-2 px-3 text-gray-700 dark:text-gray-300 font-semibold">Divisor</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 dark:divide-slate-700">
                <tr v-for="(linha, index) in fatoracao" :key="index" class="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                  <td class="py-2 px-3 font-mono text-gray-900 dark:text-white">{{ linha.numeros.join(', ') }}</td>
                  <td class="py-2 px-3 font-bold text-purple-600 dark:text-purple-400">{{ linha.divisor }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-3 glass-panel p-3 text-xs text-gray-700 dark:text-slate-200 space-y-1">
            <p><strong>MMC:</strong> {{ divisoresMMC.join(' × ') }} = {{ resultadoMMC }}</p>
            <p><strong>MDC:</strong> {{ divisoresMDC.join(' × ') }} = {{ resultadoMDC }}</p>
          </div>
        </div>

        <div class="grid sm:grid-cols-2 gap-3">
          <div class="tip-card">
            <i class="fas fa-arrow-up text-blue-500 flex-shrink-0 mt-0.5"></i>
            <div>
              <strong class="block text-xs mb-0.5">Use MMC para:</strong>
              <ul class="text-xs space-y-0.5 list-disc list-inside">
                <li>Somar ou subtrair frações</li>
                <li>Problemas de múltiplos comuns</li>
              </ul>
            </div>
          </div>
          <div class="tip-card-success">
            <i class="fas fa-arrow-down text-emerald-500 flex-shrink-0 mt-0.5"></i>
            <div>
              <strong class="block text-xs mb-0.5">Use MDC para:</strong>
              <ul class="text-xs space-y-0.5 list-disc list-inside">
                <li>Simplificar frações</li>
                <li>Dividir em partes iguais</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <div v-if="numeros.length < 2" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
      <i class="fas fa-square-root-variable text-4xl mb-3 opacity-30 block text-purple-400"></i>
      <p class="text-sm">Digite ao menos 2 números para calcular o MMC e MDC</p>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed } from 'vue'

const numerosTexto = ref('12, 18, 24')
const fatoracao = ref([])
const divisoresMMC = ref([])
const divisoresMDC = ref([])

const numeros = computed(() =>
  numerosTexto.value
    .split(/[,\s]+/)
    .map(n => parseInt(n.trim()))
    .filter(n => !isNaN(n) && n > 0)
)

const mdc2 = (a, b) => {
  while (b) { const t = b; b = a % b; a = t }
  return a
}

const mmc2 = (a, b) => (a * b) / mdc2(a, b)

const calcularMDC = (nums) => nums.reduce((acc, num) => mdc2(acc, num))
const calcularMMC = (nums) => nums.reduce((acc, num) => mmc2(acc, num))

const resultadoMMC = computed(() => numeros.value.length < 2 ? 0 : calcularMMC(numeros.value))
const resultadoMDC = computed(() => numeros.value.length < 2 ? 0 : calcularMDC(numeros.value))

const calcularFatoracao = () => {
  if (numeros.value.length < 2) { fatoracao.value = []; return }

  const nums = [...numeros.value]
  const passos = []
  const divisoresMmcTemp = []
  const divisoresMdcTemp = []

  let divisor = 2
  while (nums.some(n => n > 1)) {
    let dividiu = false
    const novosNums = nums.map(n => {
      if (n % divisor === 0) { dividiu = true; return n / divisor }
      return n
    })

    if (dividiu) {
      passos.push({ numeros: [...nums], divisor })
      divisoresMmcTemp.push(divisor)
      if (nums.every(n => n % divisor === 0)) divisoresMdcTemp.push(divisor)
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
  if (numeros.value.length >= 2) calcularFatoracao()
}

calcularAutomatico()
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
