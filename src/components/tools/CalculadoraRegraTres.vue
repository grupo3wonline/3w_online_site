<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full mb-4">
          <i class="fas fa-square-root-variable text-teal-600 dark:text-teal-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calculadora de Regra de Três</h1>
        <p class="text-gray-600 dark:text-gray-400">Resolva problemas de proporção facilmente</p>
      </div>

      <div class="space-y-6">
        <!-- Tipo -->
        <div class="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Tipo de Regra de Três
          </label>
          <div class="grid md:grid-cols-2 gap-3">
            <button
              @click="tipo = 'simples'"
              :class="[
                'p-4 rounded-lg border-2 transition-all',
                tipo === 'simples' ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/30' : 'border-gray-200 dark:border-gray-600'
              ]"
            >
              <div class="font-semibold text-gray-900 dark:text-white">Simples</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Duas grandezas proporcionais</div>
            </button>
            <button
              @click="tipo = 'composta'"
              :class="[
                'p-4 rounded-lg border-2 transition-all',
                tipo === 'composta' ? 'border-teal-600 bg-teal-50 dark:bg-teal-900/30' : 'border-gray-200 dark:border-gray-600'
              ]"
            >
              <div class="font-semibold text-gray-900 dark:text-white">Composta</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Três ou mais grandezas</div>
            </button>
          </div>
        </div>

        <!-- Regra de Três Simples -->
        <div v-if="tipo === 'simples'" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h3 class="font-bold text-gray-900 dark:text-white mb-4">
            Se A está para B, então C está para X
          </h3>
          
          <div class="grid grid-cols-2 gap-6">
            <div class="space-y-4">
              <BaseInput v-model="a" label="A" type="number" step="0.01" />
              <BaseInput v-model="b" label="B" type="number" step="0.01" />
            </div>
            <div class="space-y-4">
              <BaseInput v-model="c" label="C" type="number" step="0.01" />
              <div class="bg-teal-100 dark:bg-teal-900/30 rounded-lg p-4">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">X (Resultado)</label>
                <div class="text-3xl font-bold text-teal-600 dark:text-teal-400">
                  {{ resultadoSimples.toFixed(2) }}
                </div>
              </div>
            </div>
          </div>

          <BaseButton @click="calcularSimples" variant="primary" class="w-full mt-6">
            <i class="fas fa-calculator mr-2"></i>Calcular
          </BaseButton>

          <div v-if="calculado" class="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <p class="text-sm text-gray-700 dark:text-gray-300">
              <strong>Proporção:</strong> {{ a }} está para {{ b }}, assim como {{ c }} está para <strong class="text-teal-600">{{ resultadoSimples.toFixed(2) }}</strong>
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 font-mono">
              {{ a }} / {{ b }} = {{ c }} / {{ resultadoSimples.toFixed(2) }}
            </p>
          </div>
        </div>

        <!-- Regra de Três Composta -->
        <div v-if="tipo === 'composta'" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h3 class="font-bold text-gray-900 dark:text-white mb-4">
            Múltiplas Grandezas Proporcionais
          </h3>
          
          <div class="space-y-4">
            <div class="grid md:grid-cols-3 gap-4">
              <BaseInput v-model="g1a" label="Grandeza 1 (inicial)" type="number" step="0.01" />
              <BaseInput v-model="g1b" label="Grandeza 1 (final)" type="number" step="0.01" />
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Proporção</label>
                <select v-model="prop1" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option value="direta">Direta</option>
                  <option value="inversa">Inversa</option>
                </select>
              </div>
            </div>

            <div class="grid md:grid-cols-3 gap-4">
              <BaseInput v-model="g2a" label="Grandeza 2 (inicial)" type="number" step="0.01" />
              <BaseInput v-model="g2b" label="Grandeza 2 (final)" type="number" step="0.01" />
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Proporção</label>
                <select v-model="prop2" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  <option value="direta">Direta</option>
                  <option value="inversa">Inversa</option>
                </select>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <BaseInput v-model="valorInicial" label="Valor Inicial" type="number" step="0.01" />
              <div class="bg-teal-100 dark:bg-teal-900/30 rounded-lg p-4">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Valor Final (X)</label>
                <div class="text-3xl font-bold text-teal-600 dark:text-teal-400">
                  {{ resultadoComposta.toFixed(2) }}
                </div>
              </div>
            </div>
          </div>

          <BaseButton @click="calcularComposta" variant="primary" class="w-full mt-6">
            <i class="fas fa-calculator mr-2"></i>Calcular Regra de Três Composta
          </BaseButton>
        </div>

        <div class="bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-teal-600 dark:text-teal-400 mt-1 mr-3"></i>
            <div class="text-sm text-teal-800 dark:text-teal-300">
              <p class="font-semibold mb-2">Dicas:</p>
              <ul class="list-disc list-inside space-y-1 text-xs">
                <li><strong>Simples:</strong> Use quando tiver duas grandezas relacionadas</li>
                <li><strong>Composta:</strong> Use quando tiver 3 ou mais grandezas</li>
                <li><strong>Direta:</strong> Quando as grandezas aumentam juntas</li>
                <li><strong>Inversa:</strong> Quando uma aumenta e outra diminui</li>
                <li>Exemplo: Mais pessoas fazem o trabalho em menos tempo (inversa)</li>
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

const tipo = ref('simples')
const calculado = ref(false)

// Regra de 3 Simples
const a = ref(10)
const b = ref(20)
const c = ref(15)
const resultadoSimples = ref(0)

// Regra de 3 Composta
const g1a = ref(10)
const g1b = ref(20)
const prop1 = ref('direta')
const g2a = ref(5)
const g2b = ref(10)
const prop2 = ref('direta')
const valorInicial = ref(100)
const resultadoComposta = ref(0)

const calcularSimples = () => {
  // X = (B × C) / A
  resultadoSimples.value = (Number(b.value) * Number(c.value)) / Number(a.value)
  calculado.value = true
  trackToolUsage('Calculadora Regra Tres', 'simples')
}

const calcularComposta = () => {
  let resultado = Number(valorInicial.value)
  
  // Aplicar primeira grandeza
  if (prop1.value === 'direta') {
    resultado = resultado * (Number(g1b.value) / Number(g1a.value))
  } else {
    resultado = resultado * (Number(g1a.value) / Number(g1b.value))
  }
  
  // Aplicar segunda grandeza
  if (prop2.value === 'direta') {
    resultado = resultado * (Number(g2b.value) / Number(g2a.value))
  } else {
    resultado = resultado * (Number(g2a.value) / Number(g2b.value))
  }
  
  resultadoComposta.value = resultado
  trackToolUsage('Calculadora Regra Tres', 'composta')
}
</script>
