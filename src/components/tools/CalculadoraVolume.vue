<template>
  <ToolShell
    title="Calculadora de Volume"
    description="Calcule o volume de sólidos geométricos 3D com conversão em m³, litros e mililitros."
    icon="fa-cube"
    icon-gradient="from-teal-500 to-emerald-700"
    orb-color="teal"
    :quick-tips="['5 sólidos', 'Fórmula exibida', 'm³, L e mL']"
    :tips="[
      { title: 'Volume × litros', text: 'V = 1000 cm³ corresponde a 1 litro. Essencial para recipientes, piscinas e tanques.' },
      { title: 'Esfera', text: 'V = (4/3)πr³. O π (pi) ≈ 3,14159. Dobrar o raio aumenta o volume 8 vezes.', type: 'info' },
      { title: 'Cilindro vs cone', text: 'O cone tem exatamente 1/3 do volume de um cilindro com mesma base e altura.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Piscina retangular', desc: 'Paralelepípedo 6×3×1,5 m', result: 'V = 27 m³ = 27.000 L' },
      { title: 'Bola de futebol', desc: 'Esfera com raio 11 cm', result: 'V ≈ 5.575 cm³ = 5,575 L' },
      { title: 'Lata de refrigerante', desc: 'Cilindro raio 3,3 cm, altura 12 cm', result: 'V ≈ 410 cm³ = 410 mL' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <!-- Seleção de sólido -->
          <div class="mb-4">
            <label class="input-aurora-label">
              <i class="fas fa-shapes mr-1.5 text-teal-500"></i>
              Selecione o Sólido
            </label>
            <div class="grid grid-cols-5 gap-2 mt-2">
              <button
                v-for="solido in solidos"
                :key="solido.id"
                @click="solidoSelecionado = solido.id; resultado = null"
                :class="['p-3 rounded-xl border-2 transition-all text-center', solidoSelecionado === solido.id ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30 shadow-md' : 'border-gray-200 dark:border-slate-700 hover:border-teal-300']"
              >
                <i :class="[solido.icon, 'text-xl mb-1 block', solidoSelecionado === solido.id ? 'text-teal-600 dark:text-teal-400' : 'text-gray-400']"></i>
                <span :class="['text-[10px] font-medium leading-tight', solidoSelecionado === solido.id ? 'text-teal-900 dark:text-teal-300' : 'text-gray-500']">{{ solido.nome }}</span>
              </button>
            </div>
          </div>

          <!-- Campos dinâmicos -->
          <div class="glass-panel p-4 space-y-3">
            <div v-if="solidoSelecionado === 'cubo'">
              <BaseInput v-model="aresta" label="Aresta (cm)" type="number" step="0.01" icon="fa-ruler" tooltip="Comprimento de cada aresta do cubo (todos os lados são iguais)." hint="Todos os lados iguais" />
            </div>
            <div v-else-if="solidoSelecionado === 'paralelepipedo'" class="grid grid-cols-3 gap-3">
              <BaseInput v-model="comprimento" label="Comprimento (cm)" type="number" step="0.01" icon="fa-ruler-horizontal" />
              <BaseInput v-model="largura"     label="Largura (cm)"     type="number" step="0.01" icon="fa-ruler-horizontal" />
              <BaseInput v-model="altura"      label="Altura (cm)"      type="number" step="0.01" icon="fa-ruler-vertical" />
            </div>
            <div v-else-if="solidoSelecionado === 'esfera'">
              <BaseInput v-model="raio" label="Raio (cm)" type="number" step="0.01" icon="fa-circle" tooltip="Distância do centro até a superfície da esfera." hint="Diâmetro = 2 × raio" />
            </div>
            <div v-else-if="solidoSelecionado === 'cilindro'" class="grid grid-cols-2 gap-3">
              <BaseInput v-model="raio"   label="Raio da base (cm)" type="number" step="0.01" icon="fa-circle" />
              <BaseInput v-model="altura" label="Altura (cm)"       type="number" step="0.01" icon="fa-ruler-vertical" />
            </div>
            <div v-else-if="solidoSelecionado === 'cone'" class="grid grid-cols-2 gap-3">
              <BaseInput v-model="raio"   label="Raio da base (cm)" type="number" step="0.01" icon="fa-circle" tooltip="Raio da base circular do cone." />
              <BaseInput v-model="altura" label="Altura (cm)"       type="number" step="0.01" icon="fa-ruler-vertical" tooltip="Distância da base ao vértice do cone." />
            </div>
          </div>

          <div class="flex gap-3 mt-4">
            <BaseButton variant="success" icon="fa-calculator" @click="calcular" class="flex-1">
              Calcular Volume
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
              <p class="text-sm text-blue-200 mb-1">Volume</p>
              <p class="text-5xl font-black text-white mb-2">{{ resultado.toFixed(2) }} cm³</p>
              <p class="text-teal-300 text-sm">{{ formulaUsada }}</p>
            </div>

            <!-- Conversões -->
            <div class="grid grid-cols-3 gap-3">
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <div class="metric-glass-value text-teal-600 dark:text-teal-400">{{ (resultado / 1e6).toFixed(6) }}</div>
                <div class="metric-glass-label">m³</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ (resultado / 1000).toFixed(4) }}</div>
                <div class="metric-glass-label">Litros (L)</div>
              </div>
              <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
                <div class="metric-glass-value text-purple-600 dark:text-purple-400">{{ resultado.toFixed(2) }}</div>
                <div class="metric-glass-label">Mililitros (mL)</div>
              </div>
            </div>

            <!-- Fórmula -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-2 flex items-center gap-2">
                <i class="fas fa-square-root-alt text-teal-500"></i>
                Fórmula Utilizada
              </h4>
              <p class="text-xs font-mono bg-gray-50 dark:bg-slate-800 rounded-lg p-3 text-gray-700 dark:text-slate-200">
                {{ formulaUsada }}
              </p>
            </div>

            <div class="tip-card">
              <i class="fas fa-info-circle text-teal-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                1 litro = 1.000 cm³ · 1 m³ = 1.000.000 cm³ · 1 m³ = 1.000 L
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="resultado === null" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-cube text-4xl mb-3 opacity-30 block text-teal-400"></i>
          <p class="text-sm">Selecione um sólido e informe as dimensões</p>
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

const solidos = [
  { id: 'cubo',           nome: 'Cubo',         icon: 'fas fa-cube' },
  { id: 'paralelepipedo', nome: 'Paral.',        icon: 'fas fa-box' },
  { id: 'esfera',         nome: 'Esfera',        icon: 'fas fa-globe' },
  { id: 'cilindro',       nome: 'Cilindro',      icon: 'fas fa-database' },
  { id: 'cone',           nome: 'Cone',          icon: 'fas fa-triangle' },
]

const solidoSelecionado = ref('cubo')
const aresta      = ref<number | ''>(5)
const comprimento = ref<number | ''>(10)
const largura     = ref<number | ''>(6)
const altura      = ref<number | ''>(8)
const raio        = ref<number | ''>(5)
const resultado   = ref<number | null>(null)
const formulaUsada = ref('')

const calcular = () => {
  let volume = 0
  let formula = ''

  switch (solidoSelecionado.value) {
    case 'cubo':
      if (!aresta.value) { Swal.fire({ icon: 'warning', title: 'Informe a aresta', confirmButtonColor: '#2563eb' }); return }
      volume  = Math.pow(Number(aresta.value), 3)
      formula = `V = a³ = ${aresta.value}³ = ${volume.toFixed(2)} cm³`
      break
    case 'paralelepipedo':
      if (!comprimento.value || !largura.value || !altura.value) { Swal.fire({ icon: 'warning', title: 'Informe comprimento, largura e altura', confirmButtonColor: '#2563eb' }); return }
      volume  = Number(comprimento.value) * Number(largura.value) * Number(altura.value)
      formula = `V = c × l × h = ${comprimento.value} × ${largura.value} × ${altura.value} = ${volume.toFixed(2)} cm³`
      break
    case 'esfera':
      if (!raio.value) { Swal.fire({ icon: 'warning', title: 'Informe o raio', confirmButtonColor: '#2563eb' }); return }
      volume  = (4 / 3) * Math.PI * Math.pow(Number(raio.value), 3)
      formula = `V = (4/3)πr³ = (4/3) × π × ${raio.value}³ ≈ ${volume.toFixed(2)} cm³`
      break
    case 'cilindro':
      if (!raio.value || !altura.value) { Swal.fire({ icon: 'warning', title: 'Informe raio e altura', confirmButtonColor: '#2563eb' }); return }
      volume  = Math.PI * Math.pow(Number(raio.value), 2) * Number(altura.value)
      formula = `V = πr²h = π × ${raio.value}² × ${altura.value} ≈ ${volume.toFixed(2)} cm³`
      break
    case 'cone':
      if (!raio.value || !altura.value) { Swal.fire({ icon: 'warning', title: 'Informe raio e altura', confirmButtonColor: '#2563eb' }); return }
      volume  = (1 / 3) * Math.PI * Math.pow(Number(raio.value), 2) * Number(altura.value)
      formula = `V = (1/3)πr²h = (1/3) × π × ${raio.value}² × ${altura.value} ≈ ${volume.toFixed(2)} cm³`
      break
  }

  resultado.value    = volume
  formulaUsada.value = formula
}

const limpar = () => {
  aresta.value = 5; comprimento.value = 10; largura.value = 6; altura.value = 8; raio.value = 5
  resultado.value = null; formulaUsada.value = ''
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
