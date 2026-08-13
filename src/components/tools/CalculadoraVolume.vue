<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
          <i class="fas fa-cube text-purple-600 dark:text-purple-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calculadora de Volume</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule o volume de sólidos geométricos</p>
      </div>

      <div class="space-y-6">
        <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Selecione o Sólido</label>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
            <button v-for="solido in solidos" :key="solido.id" @click="solidoSelecionado = solido.id"
              :class="['p-4 rounded-lg border-2 transition-all', 
                solidoSelecionado === solido.id 
                  ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/30' 
                  : 'border-gray-200 dark:border-gray-600']">
              <i :class="[solido.icon, 'text-2xl mb-2', 
                solidoSelecionado === solido.id ? 'text-purple-600' : 'text-gray-400']"></i>
              <div :class="['text-xs font-medium', 
                solidoSelecionado === solido.id ? 'text-purple-900 dark:text-purple-300' : 'text-gray-600']">
                {{ solido.nome }}
              </div>
            </button>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <div v-if="solidoSelecionado === 'cubo'" class="space-y-4">
            <BaseInput v-model="aresta" label="Aresta (cm)" type="number" step="0.01" />
          </div>

          <div v-if="solidoSelecionado === 'paralelepipedo'" class="grid md:grid-cols-3 gap-4">
            <BaseInput v-model="comprimento" label="Comprimento (cm)" type="number" step="0.01" />
            <BaseInput v-model="largura" label="Largura (cm)" type="number" step="0.01" />
            <BaseInput v-model="altura" label="Altura (cm)" type="number" step="0.01" />
          </div>

          <div v-if="solidoSelecionado === 'esfera'" class="space-y-4">
            <BaseInput v-model="raio" label="Raio (cm)" type="number" step="0.01" />
          </div>

          <div v-if="solidoSelecionado === 'cilindro'" class="grid md:grid-cols-2 gap-4">
            <BaseInput v-model="raio" label="Raio da base (cm)" type="number" step="0.01" />
            <BaseInput v-model="altura" label="Altura (cm)" type="number" step="0.01" />
          </div>

          <div v-if="solidoSelecionado === 'cone'" class="grid md:grid-cols-2 gap-4">
            <BaseInput v-model="raio" label="Raio da base (cm)" type="number" step="0.01" />
            <BaseInput v-model="altura" label="Altura (cm)" type="number" step="0.01" />
          </div>
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>Calcular Volume
        </BaseButton>

        <div v-if="calculado" class="space-y-4">
          <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg p-8">
            <div class="text-center">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Volume</div>
              <div class="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                {{ resultado.toFixed(2) }} cm³
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-4">{{ formulaUsada }}</div>
              
              <div class="grid grid-cols-3 gap-4 mt-6">
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <div class="text-xs text-gray-500 dark:text-gray-400">Metros Cúbicos</div>
                  <div class="text-lg font-semibold text-gray-900 dark:text-white">{{ (resultado / 1000000).toFixed(6) }} m³</div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <div class="text-xs text-gray-500 dark:text-gray-400">Litros</div>
                  <div class="text-lg font-semibold text-gray-900 dark:text-white">{{ (resultado / 1000).toFixed(3) }} L</div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <div class="text-xs text-gray-500 dark:text-gray-400">Mililitros</div>
                  <div class="text-lg font-semibold text-gray-900 dark:text-white">{{ resultado.toFixed(2) }} ml</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-purple-600 dark:text-purple-400 mt-1 mr-3"></i>
            <div class="text-sm text-purple-800 dark:text-purple-300">
              <p class="font-semibold mb-1">Sobre Volume</p>
              <p class="text-xs">Volume é a medida do espaço ocupado por um corpo. 
              É expresso em unidades cúbicas (cm³, m³) ou em litros (1 L = 1000 cm³).</p>
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

const solidos = [
  { id: 'cubo', nome: 'Cubo', icon: 'fas fa-cube' },
  { id: 'paralelepipedo', nome: 'Paralelepípedo', icon: 'fas fa-box' },
  { id: 'esfera', nome: 'Esfera', icon: 'fas fa-globe' },
  { id: 'cilindro', nome: 'Cilindro', icon: 'fas fa-toilet-paper' },
  { id: 'cone', nome: 'Cone', icon: 'fas fa-triangle' }
]

const solidoSelecionado = ref('cubo')
const aresta = ref(5)
const comprimento = ref(10)
const largura = ref(6)
const altura = ref(8)
const raio = ref(5)
const calculado = ref(false)
const resultado = ref(0)
const formulaUsada = ref('')

const calcular = () => {
  let volume = 0
  let formula = ''

  switch (solidoSelecionado.value) {
    case 'cubo':
      volume = Math.pow(Number(aresta.value), 3)
      formula = `V = aresta³ = ${aresta.value}³ = ${volume.toFixed(2)} cm³`
      break

    case 'paralelepipedo':
      volume = Number(comprimento.value) * Number(largura.value) * Number(altura.value)
      formula = `V = c × l × h = ${comprimento.value} × ${largura.value} × ${altura.value} = ${volume.toFixed(2)} cm³`
      break

    case 'esfera':
      volume = (4/3) * Math.PI * Math.pow(Number(raio.value), 3)
      formula = `V = (4/3) × π × r³ = (4/3) × π × ${raio.value}³ = ${volume.toFixed(2)} cm³`
      break

    case 'cilindro':
      volume = Math.PI * Math.pow(Number(raio.value), 2) * Number(altura.value)
      formula = `V = π × r² × h = π × ${raio.value}² × ${altura.value} = ${volume.toFixed(2)} cm³`
      break

    case 'cone':
      volume = (1/3) * Math.PI * Math.pow(Number(raio.value), 2) * Number(altura.value)
      formula = `V = (1/3) × π × r² × h = (1/3) × π × ${raio.value}² × ${altura.value} = ${volume.toFixed(2)} cm³`
      break
  }

  resultado.value = volume
  formulaUsada.value = formula
  calculado.value = true
  trackToolUsage('Calculadora Volume', 'calculate', { solid: solidoSelecionado.value })
}
</script>
