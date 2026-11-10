<template>
  <ToolShell
    title="Regra de Três"
    description="Resolva regras de três simples (direta/inversa) e compostas com grandezas múltiplas."
    icon="fa-calculator"
    icon-gradient="from-teal-500 to-cyan-700"
    orb-color="teal"
    :quick-tips="['Simples e composta', 'Direta e inversa', 'Passo a passo']"
    :tips="[
      { title: 'Regra de três simples', text: 'Use quando há duas grandezas relacionadas: se A → B, então C → X. Fórmula: X = (B × C) / A.' },
      { title: 'Proporção direta', text: 'As grandezas crescem juntas: mais produto → mais custo.', type: 'info' },
      { title: 'Proporção inversa', text: 'Uma cresce enquanto a outra diminui: mais trabalhadores → menos dias de obra.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Receita de bolo', desc: 'Se 2 xícaras de farinha fazem 12 porcões, quantas fazem 30?', result: 'X = 5 xícaras' },
      { title: 'Tempo de obra', desc: '5 pedreiros constroem em 20 dias. Com 10 pedreiros? (inversa)', result: 'X = 10 dias' },
      { title: 'Regra de câmbio', desc: 'R$ 100 = US$ 19. Quanto são US$ 50?', result: 'X = R$ 263,16' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <!-- Seleção de tipo -->
          <div class="mb-4">
            <label class="input-aurora-label">
              <i class="fas fa-th-large mr-1.5 text-teal-500"></i>
              Tipo de Regra de Três
            </label>
            <div class="grid grid-cols-2 gap-2 mt-2">
              <button
                @click="tipo = 'simples'; resultado = null"
                :class="['p-3 rounded-xl border-2 transition-all text-center', tipo === 'simples' ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30 shadow-md' : 'border-gray-200 dark:border-slate-700 hover:border-teal-300']"
              >
                <i :class="['fas fa-equals text-xl mb-1 block', tipo === 'simples' ? 'text-teal-600 dark:text-teal-400' : 'text-gray-400']"></i>
                <span :class="['text-xs font-medium', tipo === 'simples' ? 'text-teal-900 dark:text-teal-300' : 'text-gray-500']">Simples</span>
              </button>
              <button
                @click="tipo = 'composta'; resultado = null"
                :class="['p-3 rounded-xl border-2 transition-all text-center', tipo === 'composta' ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30 shadow-md' : 'border-gray-200 dark:border-slate-700 hover:border-teal-300']"
              >
                <i :class="['fas fa-layer-group text-xl mb-1 block', tipo === 'composta' ? 'text-teal-600 dark:text-teal-400' : 'text-gray-400']"></i>
                <span :class="['text-xs font-medium', tipo === 'composta' ? 'text-teal-900 dark:text-teal-300' : 'text-gray-500']">Composta</span>
              </button>
            </div>
          </div>

          <!-- Regra de Três Simples -->
          <div v-if="tipo === 'simples'" class="glass-panel p-4 space-y-3">
            <p class="text-xs text-gray-500 dark:text-slate-400 font-medium">Se A → B, então C → X</p>
            <div class="grid grid-cols-3 gap-3">
              <BaseInput v-model="a" label="A" type="number" step="0.01" icon="fa-arrow-right" tooltip="Valor inicial da primeira grandeza." />
              <BaseInput v-model="b" label="B" type="number" step="0.01" icon="fa-arrow-right" tooltip="Valor final da primeira grandeza." />
              <BaseInput v-model="c" label="C" type="number" step="0.01" icon="fa-question" tooltip="Valor inicial da segunda grandeza (correspondente a A)." />
            </div>
            <div>
              <label class="input-aurora-label">
                <i class="fas fa-arrows-alt-h mr-1.5 text-teal-500"></i>
                Tipo de proporção
              </label>
              <select v-model="propSimples" class="input-aurora mt-1">
                <option value="direta">Direta — grandezas crescem juntas</option>
                <option value="inversa">Inversa — uma cresce, outra diminui</option>
              </select>
            </div>
          </div>

          <!-- Regra de Três Composta -->
          <div v-if="tipo === 'composta'" class="glass-panel p-4 space-y-3">
            <p class="text-xs text-gray-500 dark:text-slate-400 font-medium">Múltiplas grandezas relacionadas</p>
            <div class="grid grid-cols-3 gap-2">
              <BaseInput v-model="g1a" label="Grandeza 1 (A)" type="number" step="0.01" icon="fa-hashtag" />
              <BaseInput v-model="g1b" label="Grandeza 1 (B)" type="number" step="0.01" icon="fa-hashtag" />
              <div>
                <label class="input-aurora-label text-xs">Proporção 1</label>
                <select v-model="prop1" class="input-aurora mt-1 text-sm">
                  <option value="direta">Direta</option>
                  <option value="inversa">Inversa</option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-2">
              <BaseInput v-model="g2a" label="Grandeza 2 (A)" type="number" step="0.01" icon="fa-hashtag" />
              <BaseInput v-model="g2b" label="Grandeza 2 (B)" type="number" step="0.01" icon="fa-hashtag" />
              <div>
                <label class="input-aurora-label text-xs">Proporção 2</label>
                <select v-model="prop2" class="input-aurora mt-1 text-sm">
                  <option value="direta">Direta</option>
                  <option value="inversa">Inversa</option>
                </select>
              </div>
            </div>
            <BaseInput v-model="valorInicial" label="Valor Inicial (a calcular)" type="number" step="0.01" icon="fa-equals" tooltip="Valor de referência que será proporcionalmente ajustado." />
          </div>

          <div class="flex gap-3 mt-4">
            <BaseButton variant="success" icon="fa-calculator" @click="calcular" class="flex-1">
              Calcular
            </BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="limpar">
              Limpar
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado !== null" class="space-y-4">
            <!-- Destaque -->
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">Valor de X</p>
              <p class="text-5xl font-black text-white mb-2">{{ resultado.toFixed(4) }}</p>
              <p class="text-teal-300 text-sm">Regra de três {{ tipo }}</p>
            </div>

            <!-- Verificação -->
            <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
              <div class="metric-glass-value text-teal-600 dark:text-teal-400">{{ resultado.toFixed(2) }}</div>
              <div class="metric-glass-label">X (resultado)</div>
            </div>

            <!-- Proporção detalhada -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-equals text-teal-500"></i>
                Verificação
              </h4>
              <div v-if="tipo === 'simples'" class="text-sm text-gray-600 dark:text-slate-300 space-y-2">
                <p class="font-mono bg-gray-50 dark:bg-slate-800 rounded p-2 text-xs">
                  <span v-if="propSimples === 'direta'">{{ a }} / {{ b }} = {{ c }} / X → X = ({{ b }} × {{ c }}) / {{ a }}</span>
                  <span v-else>{{ a }} × {{ b }} = {{ c }} × X → X = ({{ a }} × {{ b }}) / {{ c }}</span>
                </p>
                <p class="text-sm">
                  <strong>Proporção {{ propSimples }}:</strong>
                  {{ a }} está para {{ b }} assim como {{ c }} está para <strong class="text-teal-600 dark:text-teal-400">{{ resultado.toFixed(2) }}</strong>
                </p>
              </div>
              <div v-else class="text-xs text-gray-600 dark:text-slate-300 space-y-1 font-mono bg-gray-50 dark:bg-slate-800 rounded p-2">
                <p>Grandeza 1 ({{ prop1 }}): fator = {{ prop1 === 'direta' ? (Number(g1b)/Number(g1a)).toFixed(4) : (Number(g1a)/Number(g1b)).toFixed(4) }}</p>
                <p>Grandeza 2 ({{ prop2 }}): fator = {{ prop2 === 'direta' ? (Number(g2b)/Number(g2a)).toFixed(4) : (Number(g2a)/Number(g2b)).toFixed(4) }}</p>
                <p>X = {{ valorInicial }} × fatores = {{ resultado.toFixed(4) }}</p>
              </div>
            </div>

            <div class="tip-card">
              <i class="fas fa-info-circle text-teal-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                Resultado: <strong>X = {{ resultado.toFixed(2) }}</strong>
                <span v-if="tipo === 'simples'"> · proporção {{ propSimples }}</span>
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="resultado === null" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-calculator text-4xl mb-3 opacity-30 block text-teal-400"></i>
          <p class="text-sm">Preencha os valores e calcule a proporção</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const tipo       = ref<'simples' | 'composta'>('simples')
const resultado  = ref<number | null>(null)

// Simples
const a          = ref<number | ''>(10)
const b          = ref<number | ''>(20)
const c          = ref<number | ''>(15)
const propSimples = ref<'direta' | 'inversa'>('direta')

// Composta
const g1a         = ref<number | ''>(10)
const g1b         = ref<number | ''>(20)
const prop1       = ref<'direta' | 'inversa'>('direta')
const g2a         = ref<number | ''>(5)
const g2b         = ref<number | ''>(10)
const prop2       = ref<'direta' | 'inversa'>('direta')
const valorInicial = ref<number | ''>(100)

const calcular = () => {
  if (tipo.value === 'simples') {
    const av = Number(a.value), bv = Number(b.value), cv = Number(c.value)
    if (!av || !bv || !cv) { Swal.fire({ icon: 'warning', title: 'Informe A, B e C', confirmButtonColor: '#2563eb' }); return }
    resultado.value = propSimples.value === 'direta'
      ? (bv * cv) / av
      : (av * bv) / cv
  } else {
    const vals = [g1a.value, g1b.value, g2a.value, g2b.value, valorInicial.value].map(Number)
    if (vals.some(v => !v)) { Swal.fire({ icon: 'warning', title: 'Preencha todos os campos', confirmButtonColor: '#2563eb' }); return }
    let x = Number(valorInicial.value)
    x = prop1.value === 'direta' ? x * (Number(g1b.value) / Number(g1a.value)) : x * (Number(g1a.value) / Number(g1b.value))
    x = prop2.value === 'direta' ? x * (Number(g2b.value) / Number(g2a.value)) : x * (Number(g2a.value) / Number(g2b.value))
    resultado.value = x
  }
}

const limpar = () => {
  a.value = 10; b.value = 20; c.value = 15; propSimples.value = 'direta'
  g1a.value = 10; g1b.value = 20; prop1.value = 'direta'
  g2a.value = 5;  g2b.value = 10; prop2.value = 'direta'
  valorInicial.value = 100; resultado.value = null
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
