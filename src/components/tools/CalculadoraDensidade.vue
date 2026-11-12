<template>
  <ToolShell
    title="Calculadora de Densidade"
    description="Calcule densidade (d = m/V), massa ou volume a partir de dois valores conhecidos."
    icon="fa-flask"
    icon-gradient="from-purple-500 to-violet-700"
    orb-color="purple"
    :quick-tips="['d = m/V', '3 modos de cálculo', 'Densidades de referência']"
    :tips="[
      { title: 'Fórmula fundamental', text: 'Densidade = Massa ÷ Volume (d = m/V). Escolha o que quer calcular e informe os outros dois.', type: 'info' },
      { title: 'Densidade da água', text: 'A água pura tem densidade de 1 g/cm³ a 4°C. Materiais com d > 1 afundam; d < 1 flutuam.', type: 'info' },
      { title: 'Unidades', text: 'Use g para massa e cm³ para volume e o resultado será g/cm³. Para SI, use kg e m³.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Ouro puro', desc: 'Massa: 193 g, Volume: 10 cm³', result: 'Densidade = 19,3 g/cm³' },
      { title: 'Volume de água', desc: 'Massa: 500 g, Densidade: 1 g/cm³', result: 'Volume = 500 cm³ (500 ml)' },
      { title: 'Massa do alumínio', desc: 'Densidade: 2,7 g/cm³, Volume: 50 cm³', result: 'Massa = 135 g' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="glass-panel p-4">
          <label class="input-aurora-label mb-3">
            <i class="fas fa-question-circle mr-1.5 text-purple-500"></i>
            O que deseja calcular?
          </label>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="modo in modos"
              :key="modo.id"
              @click="modoCalculo = modo.id"
              :class="['p-3 rounded-xl border-2 transition-all text-center', modoCalculo === modo.id ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-slate-600 hover:border-purple-300']"
            >
              <i :class="[modo.icon, 'text-xl block mb-1', modoCalculo === modo.id ? 'text-purple-600' : 'text-gray-400']"></i>
              <span :class="['text-xs font-semibold', modoCalculo === modo.id ? 'text-purple-700 dark:text-purple-300' : 'text-gray-600 dark:text-slate-400']">{{ modo.nome }}</span>
            </button>
          </div>
        </div>

        <div class="tool-body !mb-0 space-y-3">
          <div v-if="modoCalculo === 'densidade'" class="grid grid-cols-2 gap-3">
            <BaseInput v-model="massa" label="Massa (g)" type="number" step="0.01" icon="fa-weight-hanging" />
            <BaseInput v-model="volume" label="Volume (cm³)" type="number" step="0.01" icon="fa-cube" />
          </div>
          <div v-if="modoCalculo === 'massa'" class="grid grid-cols-2 gap-3">
            <BaseInput v-model="densidade" label="Densidade (g/cm³)" type="number" step="0.001" icon="fa-flask" />
            <BaseInput v-model="volume" label="Volume (cm³)" type="number" step="0.01" icon="fa-cube" />
          </div>
          <div v-if="modoCalculo === 'volume'" class="grid grid-cols-2 gap-3">
            <BaseInput v-model="massa" label="Massa (g)" type="number" step="0.01" icon="fa-weight-hanging" />
            <BaseInput v-model="densidade" label="Densidade (g/cm³)" type="number" step="0.001" icon="fa-flask" />
          </div>

          <BaseButton variant="primary" icon="fa-calculator" @click="calcular" fullWidth>
            Calcular {{ modos.find(m => m.id === modoCalculo)?.nome }}
          </BaseButton>
        </div>

        <!-- Densidades de referência -->
        <div class="glass-panel p-4">
          <h5 class="text-xs font-bold text-gray-700 dark:text-slate-200 mb-3">
            <i class="fas fa-table text-purple-500 mr-1.5"></i>
            Densidades Comuns (g/cm³)
          </h5>
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div v-for="ref in densidadesRef" :key="ref.nome"
              class="flex justify-between items-center px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-gray-100 dark:border-slate-600">
              <span class="text-gray-600 dark:text-slate-300">{{ ref.nome }}</span>
              <span class="font-bold text-purple-600 dark:text-purple-400">{{ ref.valor }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="calculado" class="space-y-4">
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">{{ getTitulo() }}</p>
              <p class="text-5xl font-black text-white mb-2">{{ resultado.toFixed(3) }}</p>
              <p class="text-purple-300 text-sm font-semibold">{{ getUnidade() }}</p>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
                <span class="metric-glass-value text-purple-600 dark:text-purple-400">
                  {{ (modoCalculo === 'densidade' ? resultado : Number(densidade)).toFixed(3) }}
                </span>
                <span class="metric-glass-label">d (g/cm³)</span>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <span class="metric-glass-value text-blue-600 dark:text-blue-400">
                  {{ (modoCalculo === 'massa' ? resultado : Number(massa)).toFixed(2) }}
                </span>
                <span class="metric-glass-label">m (g)</span>
              </div>
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <span class="metric-glass-value text-teal-600 dark:text-teal-400">
                  {{ (modoCalculo === 'volume' ? resultado : Number(volume)).toFixed(2) }}
                </span>
                <span class="metric-glass-label">V (cm³)</span>
              </div>
            </div>

            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-2 flex items-center gap-2">
                <i class="fas fa-calculator text-purple-500"></i>
                Cálculo Detalhado
              </h4>
              <p class="text-xs text-gray-600 dark:text-slate-300 font-mono">{{ explicacao }}</p>
            </div>

            <div class="tip-card">
              <i class="fas fa-info-circle text-blue-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                Materiais com densidade menor que a água (1 g/cm³) flutuam; maior, afundam.
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="!calculado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-flask text-4xl mb-3 opacity-30 block text-purple-400"></i>
          <p class="text-sm">Selecione o que calcular, insira os valores e clique em Calcular</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref } from 'vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const modos = [
  { id: 'densidade', nome: 'Densidade', icon: 'fas fa-flask' },
  { id: 'massa',     nome: 'Massa',     icon: 'fas fa-weight-hanging' },
  { id: 'volume',    nome: 'Volume',    icon: 'fas fa-cube' },
]

const densidadesRef = [
  { nome: 'Água',      valor: '1,00' },
  { nome: 'Alumínio',  valor: '2,70' },
  { nome: 'Ferro',     valor: '7,87' },
  { nome: 'Cobre',     valor: '8,96' },
  { nome: 'Prata',     valor: '10,49' },
  { nome: 'Ouro',      valor: '19,30' },
]

const modoCalculo = ref('densidade')
const densidade = ref(1)
const massa = ref(100)
const volume = ref(100)
const calculado = ref(false)
const resultado = ref(0)
const explicacao = ref('')

const calcular = () => {
  let valor = 0
  let exp = ''

  switch (modoCalculo.value) {
    case 'densidade':
      valor = Number(massa.value) / Number(volume.value)
      exp = `d = ${massa.value} g ÷ ${volume.value} cm³ = ${valor.toFixed(3)} g/cm³`
      break
    case 'massa':
      valor = Number(densidade.value) * Number(volume.value)
      exp = `m = ${densidade.value} g/cm³ × ${volume.value} cm³ = ${valor.toFixed(2)} g`
      break
    case 'volume':
      valor = Number(massa.value) / Number(densidade.value)
      exp = `V = ${massa.value} g ÷ ${densidade.value} g/cm³ = ${valor.toFixed(2)} cm³`
      break
  }

  resultado.value = valor
  explicacao.value = exp
  calculado.value = true
}

const getTitulo = () => {
  const titulos = { densidade: 'Densidade', massa: 'Massa', volume: 'Volume' }
  return titulos[modoCalculo.value]
}

const getUnidade = () => {
  const unids = { densidade: 'g/cm³', massa: 'g', volume: 'cm³' }
  return unids[modoCalculo.value]
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
