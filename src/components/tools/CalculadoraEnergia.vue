<template>
  <ToolShell
    title="Calculadora de Energia"
    description="Calcule energia cinética (Ec = ½mv²) ou energia potencial gravitacional (Ep = mgh) com conversão de unidades."
    icon="fa-bolt"
    icon-gradient="from-yellow-500 to-amber-700"
    orb-color="orange"
    :quick-tips="['Ec = ½mv²', 'Ep = mgh', 'Conversão J/kJ/cal/Wh']"
    :tips="[
      { title: 'Energia Cinética', text: 'Energia associada ao movimento. Aumenta com o quadrado da velocidade — dobrar a velocidade quadruplica a energia.', type: 'info' },
      { title: 'Energia Potencial', text: 'Energia armazenada pela posição em campo gravitacional. Depende da massa, gravidade e altura em relação a um referencial.', type: 'info' },
      { title: 'Unidade SI', text: 'A unidade de energia no SI é o Joule (J). 1 kJ = 1.000 J | 1 cal = 4,184 J | 1 Wh = 3.600 J.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Carro em movimento', desc: 'Massa: 1.500 kg, Velocidade: 30 m/s (~108 km/h)', result: 'Ec = 675.000 J = 675 kJ' },
      { title: 'Pedra no alto', desc: 'Massa: 5 kg, g = 9,8 m/s², Altura: 10 m', result: 'Ep = 490 J = 117 cal' },
      { title: 'Atleta correndo', desc: 'Massa: 70 kg, Velocidade: 10 m/s (~36 km/h)', result: 'Ec = 3.500 J = 3,5 kJ' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="glass-panel p-4">
          <label class="input-aurora-label mb-3">
            <i class="fas fa-bolt mr-1.5 text-yellow-500"></i>
            Tipo de Energia
          </label>
          <div class="grid grid-cols-2 gap-3">
            <button
              @click="tipoEnergia = 'cinetica'"
              :class="['p-4 rounded-xl border-2 transition-all text-center', tipoEnergia === 'cinetica' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' : 'border-gray-200 dark:border-slate-600 hover:border-yellow-300']"
            >
              <i :class="['fas fa-running text-2xl mb-2 block', tipoEnergia === 'cinetica' ? 'text-yellow-600' : 'text-gray-400']"></i>
              <span :class="['text-sm font-semibold', tipoEnergia === 'cinetica' ? 'text-yellow-700 dark:text-yellow-300' : 'text-gray-600']">Cinética</span>
              <p class="text-xs text-gray-500 mt-0.5">Ec = ½mv²</p>
            </button>
            <button
              @click="tipoEnergia = 'potencial'"
              :class="['p-4 rounded-xl border-2 transition-all text-center', tipoEnergia === 'potencial' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' : 'border-gray-200 dark:border-slate-600 hover:border-yellow-300']"
            >
              <i :class="['fas fa-mountain text-2xl mb-2 block', tipoEnergia === 'potencial' ? 'text-yellow-600' : 'text-gray-400']"></i>
              <span :class="['text-sm font-semibold', tipoEnergia === 'potencial' ? 'text-yellow-700 dark:text-yellow-300' : 'text-gray-600']">Potencial</span>
              <p class="text-xs text-gray-500 mt-0.5">Ep = mgh</p>
            </button>
          </div>
        </div>

        <div class="tool-body !mb-0 space-y-3">
          <div v-if="tipoEnergia === 'cinetica'" class="grid grid-cols-2 gap-3">
            <BaseInput v-model="massa" label="Massa (kg)" type="number" step="0.01" icon="fa-weight-hanging" tooltip="Massa do objeto em quilogramas." />
            <BaseInput v-model="velocidade" label="Velocidade (m/s)" type="number" step="0.01" icon="fa-gauge-high" tooltip="Velocidade em metros por segundo. 1 m/s = 3,6 km/h." />
          </div>
          <div v-if="tipoEnergia === 'potencial'" class="space-y-3">
            <div class="grid grid-cols-2 gap-3">
              <BaseInput v-model="massa" label="Massa (kg)" type="number" step="0.01" icon="fa-weight-hanging" />
              <BaseInput v-model="gravidade" label="Gravidade (m/s²)" type="number" step="0.01" icon="fa-earth-americas" hint="g = 9,8 m/s² (padrão terrestre)" />
            </div>
            <BaseInput v-model="altura" label="Altura (m)" type="number" step="0.01" icon="fa-arrows-up-down" tooltip="Altura em relação ao ponto de referência (nível do chão)." />
          </div>

          <BaseButton variant="primary" icon="fa-calculator" @click="calcular" fullWidth>
            Calcular Energia
          </BaseButton>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="calculado" class="space-y-4">
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">{{ tipoEnergia === 'cinetica' ? 'Energia Cinética' : 'Energia Potencial' }}</p>
              <p class="text-5xl font-black text-white mb-2">{{ resultado.toFixed(2) }} J</p>
              <p class="text-yellow-300 text-sm font-semibold">Joules</p>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div class="metric-glass ring-1 ring-yellow-100 dark:ring-yellow-900">
                <span class="metric-glass-value text-yellow-600 dark:text-yellow-400">{{ (resultado / 1000).toFixed(3) }}</span>
                <span class="metric-glass-label">kJ</span>
              </div>
              <div class="metric-glass ring-1 ring-orange-100 dark:ring-orange-900">
                <span class="metric-glass-value text-orange-600 dark:text-orange-400">{{ (resultado / 4.184).toFixed(2) }}</span>
                <span class="metric-glass-label">cal</span>
              </div>
              <div class="metric-glass ring-1 ring-amber-100 dark:ring-amber-900">
                <span class="metric-glass-value text-amber-600 dark:text-amber-400">{{ (resultado / 3600).toFixed(4) }}</span>
                <span class="metric-glass-label">Wh</span>
              </div>
            </div>

            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-2 flex items-center gap-2">
                <i class="fas fa-calculator text-yellow-500"></i>
                Cálculo
              </h4>
              <p class="text-xs font-mono text-gray-700 dark:text-slate-200 mb-1"><strong>Fórmula:</strong> {{ formula }}</p>
              <p class="text-xs font-mono text-gray-600 dark:text-slate-300">{{ explicacao }}</p>
            </div>

            <div class="grid sm:grid-cols-2 gap-3">
              <div class="tip-card">
                <i class="fas fa-running text-yellow-500 flex-shrink-0 mt-0.5"></i>
                <div>
                  <strong class="block text-xs mb-0.5">Energia Cinética</strong>
                  <span class="text-xs">Associada ao movimento. Dobrar a velocidade quadruplica a energia.</span>
                </div>
              </div>
              <div class="tip-card-success">
                <i class="fas fa-mountain text-emerald-500 flex-shrink-0 mt-0.5"></i>
                <div>
                  <strong class="block text-xs mb-0.5">Energia Potencial</strong>
                  <span class="text-xs">Armazenada pela posição. Libera-se ao cair.</span>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <div v-if="!calculado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-bolt text-4xl mb-3 opacity-30 block text-yellow-400"></i>
          <p class="text-sm">Selecione o tipo de energia, insira os valores e calcule</p>
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

type TipoEnergia = 'cinetica' | 'potencial'

const tipoEnergia = ref<TipoEnergia>('cinetica')
const massa = ref<number | ''>(10)
const velocidade = ref<number | ''>(20)
const gravidade = ref<number | ''>(9.8)
const altura = ref<number | ''>(5)
const calculado = ref(false)
const resultado = ref(0)
const formula = ref('')
const explicacao = ref('')

const calcular = () => {
  if (tipoEnergia.value === 'cinetica') {
    resultado.value = 0.5 * Number(massa.value) * Math.pow(Number(velocidade.value), 2)
    formula.value = 'Ec = ½mv²'
    explicacao.value = `½ × ${massa.value} kg × (${velocidade.value} m/s)² = ${resultado.value.toFixed(2)} J`
  } else {
    resultado.value = Number(massa.value) * Number(gravidade.value) * Number(altura.value)
    formula.value = 'Ep = mgh'
    explicacao.value = `${massa.value} kg × ${gravidade.value} m/s² × ${altura.value} m = ${resultado.value.toFixed(2)} J`
  }
  calculado.value = true
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
