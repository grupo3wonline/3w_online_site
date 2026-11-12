<template>
  <ToolShell
    title="Calculadora de Força"
    description="Calcule força (F), massa (m) ou aceleração (a) usando a 2ª Lei de Newton: F = m × a."
    icon="fa-dumbbell"
    icon-gradient="from-red-500 to-rose-700"
    orb-color="blue"
    :quick-tips="['F = m × a', '3 modos de cálculo', 'Unidade: Newton (N)']"
    :tips="[
      { title: '2ª Lei de Newton', text: 'A força resultante é proporcional à massa e à aceleração. 1 Newton = força para acelerar 1 kg a 1 m/s².', type: 'info' },
      { title: 'Peso vs Força', text: 'Peso (P) é a força gravitacional: P = m × g, onde g ≈ 9,81 m/s². Um objeto de 1 kg pesa ~9,81 N.', type: 'info' },
      { title: 'Aceleração gravitacional', text: 'Na superfície terrestre, g = 9,81 m/s². Na Lua, g ≈ 1,62 m/s². Em queda livre, a = g.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Força de um carro', desc: 'Massa: 1.500 kg, Aceleração: 2 m/s²', result: 'F = 3.000 N = 3 kN' },
      { title: 'Massa de um objeto', desc: 'Força: 50 N, Aceleração: 9,81 m/s² (queda livre)', result: 'm ≈ 5,1 kg' },
      { title: 'Aceleração de um foguete', desc: 'Força: 100.000 N, Massa: 5.000 kg', result: 'a = 20 m/s²' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="glass-panel p-4">
          <label class="input-aurora-label mb-3">
            <i class="fas fa-question-circle mr-1.5 text-red-500"></i>
            O que deseja calcular?
          </label>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="modo in modos"
              :key="modo.id"
              @click="modoCalculo = modo.id"
              :class="['p-3 rounded-xl border-2 transition-all text-center', modoCalculo === modo.id ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-200 dark:border-slate-600 hover:border-red-300']"
            >
              <i :class="[modo.icon, 'text-xl block mb-1', modoCalculo === modo.id ? 'text-red-600' : 'text-gray-400']"></i>
              <span :class="['text-xs font-semibold', modoCalculo === modo.id ? 'text-red-700 dark:text-red-300' : 'text-gray-600']">{{ modo.nome }}</span>
            </button>
          </div>
        </div>

        <div class="tool-body !mb-0 space-y-3">
          <div v-if="modoCalculo === 'forca'" class="grid grid-cols-2 gap-3">
            <BaseInput v-model="massa" label="Massa (kg)" type="number" step="0.01" icon="fa-weight-hanging" tooltip="Massa do objeto em quilogramas." />
            <BaseInput v-model="aceleracao" label="Aceleração (m/s²)" type="number" step="0.01" icon="fa-gauge-high" tooltip="Aceleração em metros por segundo ao quadrado." />
          </div>
          <div v-if="modoCalculo === 'massa'" class="grid grid-cols-2 gap-3">
            <BaseInput v-model="forca" label="Força (N)" type="number" step="0.01" icon="fa-bolt" tooltip="Força resultante em Newtons." />
            <BaseInput v-model="aceleracao" label="Aceleração (m/s²)" type="number" step="0.01" icon="fa-gauge-high" />
          </div>
          <div v-if="modoCalculo === 'aceleracao'" class="grid grid-cols-2 gap-3">
            <BaseInput v-model="forca" label="Força (N)" type="number" step="0.01" icon="fa-bolt" />
            <BaseInput v-model="massa" label="Massa (kg)" type="number" step="0.01" icon="fa-weight-hanging" />
          </div>

          <BaseButton variant="primary" icon="fa-calculator" @click="calcular" fullWidth>
            Calcular {{ modos.find(m => m.id === modoCalculo)?.nome }}
          </BaseButton>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="calculado" class="space-y-4">
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">{{ getTitulo() }}</p>
              <p class="text-5xl font-black text-white mb-2">{{ resultado.toFixed(2) }} {{ getUnidade() }}</p>
              <p class="text-red-300 text-sm font-semibold">F = m × a</p>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div class="metric-glass ring-1 ring-red-100 dark:ring-red-900">
                <span class="metric-glass-value text-red-600 dark:text-red-400">
                  {{ (modoCalculo === 'forca' ? resultado : Number(forca)).toFixed(2) }}
                </span>
                <span class="metric-glass-label">F (N)</span>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <span class="metric-glass-value text-blue-600 dark:text-blue-400">
                  {{ (modoCalculo === 'massa' ? resultado : Number(massa)).toFixed(2) }}
                </span>
                <span class="metric-glass-label">m (kg)</span>
              </div>
              <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
                <span class="metric-glass-value text-emerald-600 dark:text-emerald-400">
                  {{ (modoCalculo === 'aceleracao' ? resultado : Number(aceleracao)).toFixed(2) }}
                </span>
                <span class="metric-glass-label">a (m/s²)</span>
              </div>
            </div>

            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-2 flex items-center gap-2">
                <i class="fas fa-calculator text-red-500"></i>
                Cálculo Detalhado
              </h4>
              <p class="text-xs font-mono text-gray-600 dark:text-slate-300">{{ explicacao }}</p>
            </div>

            <div class="tip-card">
              <i class="fas fa-info-circle text-blue-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                <strong>2ª Lei de Newton:</strong> A força resultante é igual ao produto da massa pela aceleração. 1 N = 1 kg⋅m/s².
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="!calculado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-dumbbell text-4xl mb-3 opacity-30 block text-red-400"></i>
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
  { id: 'forca',      nome: 'Força (F)',       icon: 'fas fa-bolt' },
  { id: 'massa',      nome: 'Massa (m)',        icon: 'fas fa-weight-hanging' },
  { id: 'aceleracao', nome: 'Aceleração (a)',   icon: 'fas fa-gauge-high' },
]

const modoCalculo = ref('forca')
const forca = ref(10)
const massa = ref(2)
const aceleracao = ref(5)
const calculado = ref(false)
const resultado = ref(0)
const explicacao = ref('')

const calcular = () => {
  let valor = 0
  let exp = ''

  switch (modoCalculo.value) {
    case 'forca':
      valor = Number(massa.value) * Number(aceleracao.value)
      exp = `F = ${massa.value} kg × ${aceleracao.value} m/s² = ${valor.toFixed(2)} N`
      break
    case 'massa':
      valor = Number(forca.value) / Number(aceleracao.value)
      exp = `m = ${forca.value} N ÷ ${aceleracao.value} m/s² = ${valor.toFixed(2)} kg`
      break
    case 'aceleracao':
      valor = Number(forca.value) / Number(massa.value)
      exp = `a = ${forca.value} N ÷ ${massa.value} kg = ${valor.toFixed(2)} m/s²`
      break
  }

  resultado.value = valor
  explicacao.value = exp
  calculado.value = true
}

const getTitulo = () => {
  const titulos = { forca: 'Força', massa: 'Massa', aceleracao: 'Aceleração' }
  return titulos[modoCalculo.value as keyof typeof titulos]
}

const getUnidade = () => {
  const unids = { forca: 'N', massa: 'kg', aceleracao: 'm/s²' }
  return unids[modoCalculo.value as keyof typeof unids]
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
