<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mb-4">
          <i class="fas fa-shapes text-cyan-600 dark:text-cyan-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calculadora de Área</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule áreas de figuras geométricas</p>
      </div>

      <div class="space-y-6">
        <div class="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Figura Geométrica</label>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button v-for="fig in figuras" :key="fig.id" @click="figuraSelecionada = fig.id"
              :class="['p-4 rounded-lg border-2 transition-all', figuraSelecionada === fig.id ? 'border-cyan-600 bg-cyan-50 dark:bg-cyan-900/30' : 'border-gray-200 dark:border-gray-600']">
              <i :class="[fig.icon, 'text-2xl mb-2', figuraSelecionada === fig.id ? 'text-cyan-600' : 'text-gray-400']"></i>
              <div class="text-xs font-semibold text-gray-900 dark:text-white">{{ fig.nome }}</div>
            </button>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-4">
          <!-- Quadrado -->
          <div v-if="figuraSelecionada === 'quadrado'">
            <BaseInput v-model="lado" label="Lado (cm)" type="number" step="0.01" />
            <p class="text-xs text-gray-500 mt-1">Fórmula: Área = lado²</p>
          </div>

          <!-- Retângulo -->
          <div v-if="figuraSelecionada === 'retangulo'" class="grid md:grid-cols-2 gap-4">
            <BaseInput v-model="base" label="Base (cm)" type="number" step="0.01" />
            <BaseInput v-model="altura" label="Altura (cm)" type="number" step="0.01" />
            <p class="text-xs text-gray-500 col-span-2">Fórmula: Área = base × altura</p>
          </div>

          <!-- Triângulo -->
          <div v-if="figuraSelecionada === 'triangulo'" class="grid md:grid-cols-2 gap-4">
            <BaseInput v-model="base" label="Base (cm)" type="number" step="0.01" />
            <BaseInput v-model="altura" label="Altura (cm)" type="number" step="0.01" />
            <p class="text-xs text-gray-500 col-span-2">Fórmula: Área = (base × altura) / 2</p>
          </div>

          <!-- Círculo -->
          <div v-if="figuraSelecionada === 'circulo'">
            <BaseInput v-model="raio" label="Raio (cm)" type="number" step="0.01" />
            <p class="text-xs text-gray-500 mt-1">Fórmula: Área = π × raio²</p>
          </div>

          <!-- Trapézio -->
          <div v-if="figuraSelecionada === 'trapezio'" class="grid md:grid-cols-3 gap-4">
            <BaseInput v-model="baseMaior" label="Base Maior (cm)" type="number" step="0.01" />
            <BaseInput v-model="baseMenor" label="Base Menor (cm)" type="number" step="0.01" />
            <BaseInput v-model="altura" label="Altura (cm)" type="number" step="0.01" />
            <p class="text-xs text-gray-500 col-span-3">Fórmula: Área = ((B + b) × h) / 2</p>
          </div>

          <!-- Losango -->
          <div v-if="figuraSelecionada === 'losango'" class="grid md:grid-cols-2 gap-4">
            <BaseInput v-model="diagonalMaior" label="Diagonal Maior (cm)" type="number" step="0.01" />
            <BaseInput v-model="diagonalMenor" label="Diagonal Menor (cm)" type="number" step="0.01" />
            <p class="text-xs text-gray-500 col-span-2">Fórmula: Área = (D × d) / 2</p>
          </div>
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>Calcular Área
        </BaseButton>

        <div v-if="calculado" class="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-lg p-8">
          <div class="text-center">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Área do {{ figuras.find(f => f.id === figuraSelecionada)?.nome }}</div>
            <div class="text-5xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
              {{ resultado.toFixed(2) }}
            </div>
            <div class="text-lg text-gray-700 dark:text-gray-300">
              cm² (centímetros quadrados)
            </div>
            <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <div class="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div class="text-gray-500 dark:text-gray-400">em m²</div>
                  <div class="font-bold">{{ (resultado / 10000).toFixed(4) }}</div>
                </div>
                <div>
                  <div class="text-gray-500 dark:text-gray-400">em mm²</div>
                  <div class="font-bold">{{ (resultado * 100).toFixed(0) }}</div>
                </div>
                <div>
                  <div class="text-gray-500 dark:text-gray-400">em km²</div>
                  <div class="font-bold">{{ (resultado / 10000000000).toFixed(10) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-cyan-600 dark:text-cyan-400 mt-1 mr-3"></i>
            <div class="text-sm text-cyan-800 dark:text-cyan-300">
              <p class="font-semibold mb-2">Dicas:</p>
              <ul class="list-disc list-inside space-y-1 text-xs">
                <li>Use sempre a mesma unidade de medida</li>
                <li>1 m² = 10.000 cm²</li>
                <li>π (Pi) ≈ 3,14159</li>
                <li>Para figuras irregulares, divida em partes regulares</li>
              </ul>
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
  { id: 'retangulo', nome: 'Retângulo', icon: 'fas fa-rectangle-wide' },
  { id: 'triangulo', nome: 'Triângulo', icon: 'fas fa-play' },
  { id: 'circulo', nome: 'Círculo', icon: 'fas fa-circle' },
  { id: 'trapezio', nome: 'Trapézio', icon: 'fas fa-square' },
  { id: 'losango', nome: 'Losango', icon: 'fas fa-diamond' }
]

const figuraSelecionada = ref('quadrado')
const calculado = ref(false)
const resultado = ref(0)

const lado = ref(10)
const base = ref(10)
const altura = ref(5)
const raio = ref(5)
const baseMaior = ref(10)
const baseMenor = ref(6)
const diagonalMaior = ref(12)
const diagonalMenor = ref(8)

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
  trackToolUsage('Calculadora Area', 'calculate', { figura: figuraSelecionada.value })
}
</script>
