<template>
  <ToolShell
    title="Calculadora de Área"
    description="Calcule a área de figuras geométricas com fórmulas explicadas e conversão de unidades."
    icon="fa-shapes"
    icon-gradient="from-blue-500 to-indigo-700"
    orb-color="blue"
    :quick-tips="['6 figuras geométricas', 'Fórmulas explicadas', 'Conversão cm²/m²/mm²']"
    :tips="[
      { title: 'Mesma unidade', text: 'Todas as medidas devem estar na mesma unidade de entrada. O resultado será nessa unidade ao quadrado.', type: 'warning' },
      { title: 'Pi (π)', text: 'π = 3,14159265… Usado no cálculo do círculo. A calculadora usa o valor preciso de Math.PI.', type: 'info' },
      { title: 'Figuras irregulares', text: 'Para figuras irregulares, divida-as em figuras simples (retângulos + triângulos) e some as áreas.', type: 'info' },
    ]"
    :examples="[
      { title: 'Piso de um quarto', desc: 'Retângulo 4m × 3,5m', result: 'Área = 14 m²' },
      { title: 'Tampa circular', desc: 'Círculo com raio 5 cm', result: 'Área ≈ 78,54 cm²' },
      { title: 'Lote trapezoidal', desc: 'Base maior 20m, base menor 15m, altura 10m', result: 'Área = 175 m²' },
    ]"
  >
    <!-- Seletor de figura -->
    <div class="glass-panel p-5 mb-4">
      <label class="input-aurora-label mb-3">
        <i class="fas fa-shapes mr-1.5 text-blue-500"></i>
        Figura Geométrica
      </label>
      <div class="grid grid-cols-3 sm:grid-cols-6 gap-2">
        <button
          v-for="fig in figuras"
          :key="fig.id"
          @click="figuraSelecionada = fig.id"
          :class="['p-3 rounded-xl border-2 transition-all text-center', figuraSelecionada === fig.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-slate-600 hover:border-blue-300']"
        >
          <i :class="[fig.icon, 'text-xl mb-1 block', figuraSelecionada === fig.id ? 'text-blue-600' : 'text-gray-400']"></i>
          <span :class="['text-xs font-semibold', figuraSelecionada === fig.id ? 'text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-slate-400']">{{ fig.nome }}</span>
        </button>
      </div>
    </div>

    <!-- Inputs -->
    <div class="tool-body space-y-3">
      <div v-if="figuraSelecionada === 'quadrado'">
        <BaseInput v-model="lado" label="Lado (cm)" type="number" step="0.01" icon="fa-ruler" hint="Fórmula: Área = lado²" />
      </div>
      <div v-if="figuraSelecionada === 'retangulo'" class="grid sm:grid-cols-2 gap-3">
        <BaseInput v-model="base" label="Base (cm)" type="number" step="0.01" icon="fa-ruler-horizontal" />
        <BaseInput v-model="altura" label="Altura (cm)" type="number" step="0.01" icon="fa-ruler-vertical" hint="Fórmula: Área = base × altura" />
      </div>
      <div v-if="figuraSelecionada === 'triangulo'" class="grid sm:grid-cols-2 gap-3">
        <BaseInput v-model="base" label="Base (cm)" type="number" step="0.01" icon="fa-ruler-horizontal" />
        <BaseInput v-model="altura" label="Altura (cm)" type="number" step="0.01" icon="fa-ruler-vertical" hint="Fórmula: Área = (base × altura) / 2" />
      </div>
      <div v-if="figuraSelecionada === 'circulo'">
        <BaseInput v-model="raio" label="Raio (cm)" type="number" step="0.01" icon="fa-circle" hint="Fórmula: Área = π × raio²" />
      </div>
      <div v-if="figuraSelecionada === 'trapezio'" class="grid sm:grid-cols-3 gap-3">
        <BaseInput v-model="baseMaior" label="Base Maior (cm)" type="number" step="0.01" />
        <BaseInput v-model="baseMenor" label="Base Menor (cm)" type="number" step="0.01" />
        <BaseInput v-model="altura" label="Altura (cm)" type="number" step="0.01" hint="Fórmula: ((B+b)×h)/2" />
      </div>
      <div v-if="figuraSelecionada === 'losango'" class="grid sm:grid-cols-2 gap-3">
        <BaseInput v-model="diagonalMaior" label="Diagonal Maior (cm)" type="number" step="0.01" />
        <BaseInput v-model="diagonalMenor" label="Diagonal Menor (cm)" type="number" step="0.01" hint="Fórmula: (D × d) / 2" />
      </div>

      <div class="flex gap-3">
        <BaseButton variant="primary" icon="fa-calculator" @click="calcular" class="flex-1">
          Calcular Área
        </BaseButton>
        <BaseButton variant="outline" icon="fa-eraser" @click="limpar" />
      </div>
    </div>

    <!-- Resultado -->
    <Transition name="scale-in">
      <div v-if="calculado" class="space-y-4">
        <div class="tool-header text-center py-7">
          <p class="text-sm text-blue-200 mb-1">Área do {{ figuras.find(f => f.id === figuraSelecionada)?.nome }}</p>
          <p class="text-5xl font-black text-white mb-2">{{ resultado.toFixed(2) }} cm²</p>
          <p class="text-blue-300 text-sm font-semibold">centímetros quadrados</p>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
            <span class="metric-glass-value text-blue-600 dark:text-blue-400">{{ (resultado / 10000).toFixed(4) }}</span>
            <span class="metric-glass-label">em m²</span>
          </div>
          <div class="metric-glass ring-1 ring-indigo-100 dark:ring-indigo-900">
            <span class="metric-glass-value text-indigo-600 dark:text-indigo-400">{{ (resultado * 100).toFixed(0) }}</span>
            <span class="metric-glass-label">em mm²</span>
          </div>
          <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
            <span class="metric-glass-value text-purple-600 dark:text-purple-400">{{ (resultado / 10000000000).toExponential(2) }}</span>
            <span class="metric-glass-label">em km²</span>
          </div>
        </div>

        <div class="tip-card">
          <i class="fas fa-info-circle text-blue-500 flex-shrink-0 mt-0.5"></i>
          <span class="text-xs">
            Use sempre a mesma unidade de medida. <strong>1 m² = 10.000 cm²</strong> | <strong>π ≈ 3,14159</strong>
          </span>
        </div>
      </div>
    </Transition>

    <div v-if="!calculado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
      <i class="fas fa-shapes text-4xl mb-3 opacity-30 block text-blue-400"></i>
      <p class="text-sm">Selecione a figura, insira as medidas e clique em Calcular</p>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref } from 'vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

type FiguraId = 'quadrado' | 'retangulo' | 'triangulo' | 'circulo' | 'trapezio' | 'losango'

interface Figura {
  id: FiguraId
  nome: string
  icon: string
}

const figuras: Figura[] = [
  { id: 'quadrado', nome: 'Quadrado', icon: 'fas fa-square' },
  { id: 'retangulo', nome: 'Retângulo', icon: 'fas fa-th-large' },
  { id: 'triangulo', nome: 'Triângulo', icon: 'fas fa-play' },
  { id: 'circulo', nome: 'Círculo', icon: 'fas fa-circle' },
  { id: 'trapezio', nome: 'Trapézio', icon: 'fas fa-caret-up' },
  { id: 'losango', nome: 'Losango', icon: 'fas fa-gem' },
]

const figuraSelecionada = ref<FiguraId>('quadrado')
const calculado = ref(false)
const resultado = ref(0)

const lado = ref<number | ''>(10)
const base = ref<number | ''>(10)
const altura = ref<number | ''>(5)
const raio = ref<number | ''>(5)
const baseMaior = ref<number | ''>(10)
const baseMenor = ref<number | ''>(6)
const diagonalMaior = ref<number | ''>(12)
const diagonalMenor = ref<number | ''>(8)

const calcular = () => {
  switch (figuraSelecionada.value) {
    case 'quadrado':
      resultado.value = Number(lado.value) ** 2
      break
    case 'retangulo':
      resultado.value = Number(base.value) * Number(altura.value)
      break
    case 'triangulo':
      resultado.value = (Number(base.value) * Number(altura.value)) / 2
      break
    case 'circulo':
      resultado.value = Math.PI * (Number(raio.value) ** 2)
      break
    case 'trapezio':
      resultado.value = ((Number(baseMaior.value) + Number(baseMenor.value)) * Number(altura.value)) / 2
      break
    case 'losango':
      resultado.value = (Number(diagonalMaior.value) * Number(diagonalMenor.value)) / 2
      break
  }
  calculado.value = true
}

const limpar = () => {
  calculado.value = false
  resultado.value = 0
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
