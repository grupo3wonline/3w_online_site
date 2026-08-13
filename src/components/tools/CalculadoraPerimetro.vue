<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mb-4">
          <i class="fas fa-border-all text-cyan-600 dark:text-cyan-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calculadora de Perímetro</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule o perímetro de diferentes formas geométricas</p>
      </div>

      <div class="space-y-6">
        <div class="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Selecione a Figura</label>
          <div class="grid grid-cols-3 md:grid-cols-6 gap-3">
            <button v-for="figura in figuras" :key="figura.id" @click="figuraSelecionada = figura.id"
              :class="['p-4 rounded-lg border-2 transition-all', 
                figuraSelecionada === figura.id 
                  ? 'border-cyan-600 bg-cyan-50 dark:bg-cyan-900/30 shadow-lg' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-cyan-300']">
              <i :class="[figura.icon, 'text-2xl mb-2', 
                figuraSelecionada === figura.id ? 'text-cyan-600' : 'text-gray-400']"></i>
              <div :class="['text-xs font-medium', 
                figuraSelecionada === figura.id ? 'text-cyan-900 dark:text-cyan-300' : 'text-gray-600 dark:text-gray-400']">
                {{ figura.nome }}
              </div>
            </button>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <div v-if="figuraSelecionada === 'quadrado'" class="space-y-4">
            <BaseInput v-model="lado" label="Lado (cm)" type="number" step="0.01" />
          </div>

          <div v-if="figuraSelecionada === 'retangulo'" class="grid md:grid-cols-2 gap-4">
            <BaseInput v-model="base" label="Base (cm)" type="number" step="0.01" />
            <BaseInput v-model="altura" label="Altura (cm)" type="number" step="0.01" />
          </div>

          <div v-if="figuraSelecionada === 'triangulo'" class="grid md:grid-cols-3 gap-4">
            <BaseInput v-model="lado1" label="Lado 1 (cm)" type="number" step="0.01" />
            <BaseInput v-model="lado2" label="Lado 2 (cm)" type="number" step="0.01" />
            <BaseInput v-model="lado3" label="Lado 3 (cm)" type="number" step="0.01" />
          </div>

          <div v-if="figuraSelecionada === 'circulo'" class="space-y-4">
            <BaseInput v-model="raio" label="Raio (cm)" type="number" step="0.01" />
          </div>

          <div v-if="figuraSelecionada === 'pentagono'" class="space-y-4">
            <BaseInput v-model="lado" label="Lado (cm)" type="number" step="0.01" />
          </div>

          <div v-if="figuraSelecionada === 'hexagono'" class="space-y-4">
            <BaseInput v-model="lado" label="Lado (cm)" type="number" step="0.01" />
          </div>
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>Calcular Perímetro
        </BaseButton>

        <div v-if="calculado" class="space-y-4">
          <div class="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-lg p-8">
            <div class="text-center">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Perímetro</div>
              <div class="text-5xl font-bold text-cyan-600 dark:text-cyan-400 mb-4">
                {{ resultado.toFixed(2) }} cm
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-4">{{ formulaUsada }}</div>
              
              <div class="grid grid-cols-3 gap-4 mt-6">
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <div class="text-xs text-gray-500 dark:text-gray-400">Metros</div>
                  <div class="text-lg font-semibold text-gray-900 dark:text-white">{{ (resultado / 100).toFixed(4) }} m</div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <div class="text-xs text-gray-500 dark:text-gray-400">Milímetros</div>
                  <div class="text-lg font-semibold text-gray-900 dark:text-white">{{ (resultado * 10).toFixed(2) }} mm</div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <div class="text-xs text-gray-500 dark:text-gray-400">Polegadas</div>
                  <div class="text-lg font-semibold text-gray-900 dark:text-white">{{ (resultado / 2.54).toFixed(2) }} in</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-cyan-600 dark:text-cyan-400 mt-1 mr-3"></i>
            <div class="text-sm text-cyan-800 dark:text-cyan-300">
              <p class="font-semibold mb-1">O que é perímetro?</p>
              <p class="text-xs">Perímetro é a soma de todos os lados de uma figura geométrica. 
              Representa o contorno total da figura.</p>
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

const figuras = [
  { id: 'quadrado', nome: 'Quadrado', icon: 'fas fa-square' },
  { id: 'retangulo', nome: 'Retângulo', icon: 'fas fa-rectangle-landscape' },
  { id: 'triangulo', nome: 'Triângulo', icon: 'fas fa-triangle' },
  { id: 'circulo', nome: 'Círculo', icon: 'fas fa-circle' },
  { id: 'pentagono', nome: 'Pentágono', icon: 'fas fa-pentagon' },
  { id: 'hexagono', nome: 'Hexágono', icon: 'fas fa-hexagon' }
]

const figuraSelecionada = ref('quadrado')
const lado = ref(10)
const base = ref(10)
const altura = ref(8)
const raio = ref(5)
const lado1 = ref(5)
const lado2 = ref(6)
const lado3 = ref(7)
const calculado = ref(false)
const resultado = ref(0)
const formulaUsada = ref('')

const calcular = () => {
  let perimetro = 0
  let formula = ''

  switch (figuraSelecionada.value) {
    case 'quadrado':
      perimetro = Number(lado.value) * 4
      formula = `P = 4 × lado = 4 × ${lado.value} = ${perimetro} cm`
      break

    case 'retangulo':
      perimetro = 2 * (Number(base.value) + Number(altura.value))
      formula = `P = 2 × (base + altura) = 2 × (${base.value} + ${altura.value}) = ${perimetro} cm`
      break

    case 'triangulo':
      perimetro = Number(lado1.value) + Number(lado2.value) + Number(lado3.value)
      formula = `P = lado1 + lado2 + lado3 = ${lado1.value} + ${lado2.value} + ${lado3.value} = ${perimetro} cm`
      break

    case 'circulo':
      perimetro = 2 * Math.PI * Number(raio.value)
      formula = `P = 2 × π × raio = 2 × π × ${raio.value} = ${perimetro.toFixed(2)} cm`
      break

    case 'pentagono':
      perimetro = Number(lado.value) * 5
      formula = `P = 5 × lado = 5 × ${lado.value} = ${perimetro} cm`
      break

    case 'hexagono':
      perimetro = Number(lado.value) * 6
      formula = `P = 6 × lado = 6 × ${lado.value} = ${perimetro} cm`
      break
  }

  resultado.value = perimetro
  formulaUsada.value = formula
  calculado.value = true
  trackToolUsage('Calculadora Perimetro', 'calculate', { shape: figuraSelecionada.value })
}
</script>
