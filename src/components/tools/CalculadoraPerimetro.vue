<template>
  <ToolShell
    title="Calculadora de Perímetro"
    description="Calcule o perímetro de figuras geométricas planas com fórmulas detalhadas."
    icon="fa-border-all"
    icon-gradient="from-indigo-500 to-blue-700"
    orb-color="indigo"
    :quick-tips="['6 figuras', 'Fórmula exibida', 'Múltiplas unidades']"
    :tips="[
      { title: 'O que é perímetro?', text: 'Perímetro é a soma de todos os lados de uma figura. Representa o contorno total.' },
      { title: 'Círculo', text: 'P = 2πr. O π (pi) vale aproximadamente 3,14159. Para o diâmetro use P = πd.', type: 'info' },
      { title: 'Triângulo', text: 'Para verificar se é possível: a soma de dois lados deve ser maior que o terceiro.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Quadrado 10 cm', desc: 'P = 4 × lado', result: 'P = 40 cm' },
      { title: 'Círculo raio 7 cm', desc: 'P = 2 × π × 7', result: 'P ≈ 43,98 cm' },
      { title: 'Retângulo 15×8 cm', desc: 'P = 2 × (base + altura)', result: 'P = 46 cm' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <!-- Seleção de figura -->
        <div class="tool-body !mb-0">
          <div class="space-y-4">
            <div>
              <label class="input-aurora-label">
                <i class="fas fa-shapes mr-1.5 text-indigo-500"></i>
                Selecione a Figura
              </label>
              <div class="grid grid-cols-3 gap-2 mt-2">
                <button
                  v-for="figura in figuras"
                  :key="figura.id"
                  @click="figuraSelecionada = figura.id; resultado = null"
                  :class="[
                    'p-3 rounded-xl border-2 transition-all text-center',
                    figuraSelecionada === figura.id
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 shadow-md'
                      : 'border-gray-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700',
                  ]"
                >
                  <i
                    :class="[
                      figura.icon, 'text-xl mb-1 block',
                      figuraSelecionada === figura.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400',
                    ]"
                  ></i>
                  <span
                    :class="[
                      'text-xs font-medium',
                      figuraSelecionada === figura.id ? 'text-indigo-900 dark:text-indigo-300' : 'text-gray-500 dark:text-slate-400',
                    ]"
                  >{{ figura.nome }}</span>
                </button>
              </div>
            </div>

            <!-- Campos dinâmicos -->
            <div class="glass-panel p-4">
              <div v-if="figuraSelecionada === 'quadrado'" class="space-y-3">
                <BaseInput v-model="lado" label="Lado (cm)" type="number" step="0.01" icon="fa-ruler" tooltip="Comprimento de um dos lados do quadrado." hint="Todos os lados são iguais" />
              </div>
              <div v-else-if="figuraSelecionada === 'retangulo'" class="grid grid-cols-2 gap-3">
                <BaseInput v-model="base" label="Base (cm)" type="number" step="0.01" icon="fa-ruler-horizontal" tooltip="Comprimento da base do retângulo." />
                <BaseInput v-model="altura" label="Altura (cm)" type="number" step="0.01" icon="fa-ruler-vertical" tooltip="Comprimento da altura do retângulo." />
              </div>
              <div v-else-if="figuraSelecionada === 'triangulo'" class="grid grid-cols-3 gap-3">
                <BaseInput v-model="lado1" label="Lado 1 (cm)" type="number" step="0.01" icon="fa-slash" />
                <BaseInput v-model="lado2" label="Lado 2 (cm)" type="number" step="0.01" icon="fa-slash" />
                <BaseInput v-model="lado3" label="Lado 3 (cm)" type="number" step="0.01" icon="fa-slash" />
              </div>
              <div v-else-if="figuraSelecionada === 'circulo'" class="space-y-3">
                <BaseInput v-model="raio" label="Raio (cm)" type="number" step="0.01" icon="fa-circle" tooltip="Distância do centro até a borda do círculo." hint="Diâmetro = 2 × raio" />
              </div>
              <div v-else-if="figuraSelecionada === 'pentagono' || figuraSelecionada === 'hexagono'" class="space-y-3">
                <BaseInput v-model="lado" label="Lado (cm)" type="number" step="0.01" icon="fa-ruler" :tooltip="figuraSelecionada === 'pentagono' ? 'Comprimento de cada um dos 5 lados iguais.' : 'Comprimento de cada um dos 6 lados iguais.'" />
              </div>
            </div>
          </div>

          <div class="flex gap-3 mt-4">
            <BaseButton variant="primary" icon="fa-calculator" @click="calcular" class="flex-1">
              Calcular Perímetro
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
              <p class="text-sm text-blue-200 mb-1">Perímetro</p>
              <p class="text-5xl font-black text-white mb-2">{{ resultado.toFixed(2) }} cm</p>
              <p class="text-indigo-300 text-sm">{{ formulaUsada }}</p>
            </div>

            <!-- Conversões -->
            <div class="grid grid-cols-3 gap-3">
              <div class="metric-glass ring-1 ring-indigo-100 dark:ring-indigo-900">
                <div class="metric-glass-value text-indigo-600 dark:text-indigo-400">{{ (resultado / 100).toFixed(4) }}</div>
                <div class="metric-glass-label">Metros (m)</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ (resultado * 10).toFixed(2) }}</div>
                <div class="metric-glass-label">Milímetros (mm)</div>
              </div>
              <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
                <div class="metric-glass-value text-purple-600 dark:text-purple-400">{{ (resultado / 2.54).toFixed(2) }}</div>
                <div class="metric-glass-label">Polegadas (in)</div>
              </div>
            </div>

            <!-- Fórmula -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-2 flex items-center gap-2">
                <i class="fas fa-square-root-alt text-indigo-500"></i>
                Fórmula Utilizada
              </h4>
              <p class="text-sm text-gray-600 dark:text-slate-300 font-mono bg-gray-50 dark:bg-slate-800 rounded-lg p-3">
                {{ formulaUsada }}
              </p>
            </div>

            <div class="tip-card">
              <i class="fas fa-info-circle text-indigo-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                O perímetro representa o <strong>contorno total</strong> da figura. Útil para calcular cercas, molduras e bordas.
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="resultado === null" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-border-all text-4xl mb-3 opacity-30 block text-indigo-400"></i>
          <p class="text-sm">Selecione uma figura e informe as medidas</p>
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

const figuras = [
  { id: 'quadrado',   nome: 'Quadrado',   icon: 'fas fa-square' },
  { id: 'retangulo',  nome: 'Retângulo',  icon: 'fas fa-rectangle-landscape' },
  { id: 'triangulo',  nome: 'Triângulo',  icon: 'fas fa-triangle' },
  { id: 'circulo',    nome: 'Círculo',    icon: 'fas fa-circle' },
  { id: 'pentagono',  nome: 'Pentágono',  icon: 'fas fa-pentagon' },
  { id: 'hexagono',   nome: 'Hexágono',   icon: 'fas fa-hexagon' },
]

const figuraSelecionada = ref('quadrado')
const lado   = ref<number | ''>(10)
const base   = ref<number | ''>(10)
const altura = ref<number | ''>(8)
const raio   = ref<number | ''>(5)
const lado1  = ref<number | ''>(5)
const lado2  = ref<number | ''>(6)
const lado3  = ref<number | ''>(7)
const resultado    = ref<number | null>(null)
const formulaUsada = ref('')

const calcular = () => {
  let perimetro = 0
  let formula   = ''

  switch (figuraSelecionada.value) {
    case 'quadrado':
      if (!lado.value) { Swal.fire({ icon: 'warning', title: 'Informe o lado', confirmButtonColor: '#2563eb' }); return }
      perimetro = Number(lado.value) * 4
      formula   = `P = 4 × ${lado.value} = ${perimetro.toFixed(2)} cm`
      break
    case 'retangulo':
      if (!base.value || !altura.value) { Swal.fire({ icon: 'warning', title: 'Informe base e altura', confirmButtonColor: '#2563eb' }); return }
      perimetro = 2 * (Number(base.value) + Number(altura.value))
      formula   = `P = 2 × (${base.value} + ${altura.value}) = ${perimetro.toFixed(2)} cm`
      break
    case 'triangulo':
      if (!lado1.value || !lado2.value || !lado3.value) { Swal.fire({ icon: 'warning', title: 'Informe os 3 lados', confirmButtonColor: '#2563eb' }); return }
      perimetro = Number(lado1.value) + Number(lado2.value) + Number(lado3.value)
      formula   = `P = ${lado1.value} + ${lado2.value} + ${lado3.value} = ${perimetro.toFixed(2)} cm`
      break
    case 'circulo':
      if (!raio.value) { Swal.fire({ icon: 'warning', title: 'Informe o raio', confirmButtonColor: '#2563eb' }); return }
      perimetro = 2 * Math.PI * Number(raio.value)
      formula   = `P = 2 × π × ${raio.value} ≈ ${perimetro.toFixed(2)} cm`
      break
    case 'pentagono':
      if (!lado.value) { Swal.fire({ icon: 'warning', title: 'Informe o lado', confirmButtonColor: '#2563eb' }); return }
      perimetro = Number(lado.value) * 5
      formula   = `P = 5 × ${lado.value} = ${perimetro.toFixed(2)} cm`
      break
    case 'hexagono':
      if (!lado.value) { Swal.fire({ icon: 'warning', title: 'Informe o lado', confirmButtonColor: '#2563eb' }); return }
      perimetro = Number(lado.value) * 6
      formula   = `P = 6 × ${lado.value} = ${perimetro.toFixed(2)} cm`
      break
  }

  resultado.value    = perimetro
  formulaUsada.value = formula
}

const limpar = () => {
  lado.value   = 10; base.value  = 10; altura.value = 8
  raio.value   = 5;  lado1.value = 5;  lado2.value  = 6; lado3.value = 7
  resultado.value = null; formulaUsada.value = ''
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
