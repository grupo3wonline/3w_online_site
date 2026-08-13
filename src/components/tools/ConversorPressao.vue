<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
          <i class="fas fa-tachometer-alt text-indigo-600 dark:text-indigo-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Conversor de Pressão</h1>
        <p class="text-gray-600 dark:text-gray-400">Converta entre diferentes unidades de pressão</p>
      </div>

      <div class="space-y-6">
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">De</label>
            <BaseInput v-model="valorEntrada" type="number" step="0.01" @input="converter" />
            <select v-model="unidadeOrigem" @change="converter"
              class="w-full mt-3 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-white">
              <option v-for="unidade in unidades" :key="unidade.id" :value="unidade.id">
                {{ unidade.nome }} ({{ unidade.simbolo }})
              </option>
            </select>
          </div>

          <div class="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Para</label>
            <div class="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">
              {{ resultado.toFixed(6) }}
            </div>
            <select v-model="unidadeDestino" @change="converter"
              class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-900 dark:text-white">
              <option v-for="unidade in unidades" :key="unidade.id" :value="unidade.id">
                {{ unidade.nome }} ({{ unidade.simbolo }})
              </option>
            </select>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
          <table class="w-full">
            <thead class="bg-indigo-50 dark:bg-indigo-900/30">
              <tr>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Unidade</th>
                <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">Valor</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
              <tr v-for="unidade in unidades" :key="unidade.id" class="hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  {{ unidade.nome }} ({{ unidade.simbolo }})
                </td>
                <td class="px-4 py-3 text-sm text-right font-mono text-gray-900 dark:text-white">
                  {{ converterPara(unidade.id).toFixed(6) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-4">
          <div class="text-sm text-indigo-800 dark:text-indigo-300">
            <p class="font-semibold mb-2">Referências Comuns</p>
            <ul class="text-xs space-y-1">
              <li><strong>1 atm:</strong> Pressão atmosférica ao nível do mar</li>
              <li><strong>1 bar:</strong> Aproximadamente igual a 1 atm</li>
              <li><strong>PSI:</strong> Usado para pneus (32-35 PSI é comum)</li>
              <li><strong>mmHg:</strong> Usado para pressão arterial (120/80 mmHg)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseInput from './common/BaseInput.vue'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const unidades = [
  { id: 'pascal', nome: 'Pascal', simbolo: 'Pa', paraPascal: 1 },
  { id: 'bar', nome: 'Bar', simbolo: 'bar', paraPascal: 100000 },
  { id: 'psi', nome: 'PSI', simbolo: 'psi', paraPascal: 6894.76 },
  { id: 'atm', nome: 'Atmosfera', simbolo: 'atm', paraPascal: 101325 },
  { id: 'mmhg', nome: 'Milímetro de Mercúrio', simbolo: 'mmHg', paraPascal: 133.322 },
  { id: 'kpa', nome: 'Quilopascal', simbolo: 'kPa', paraPascal: 1000 },
  { id: 'mbar', nome: 'Milibar', simbolo: 'mbar', paraPascal: 100 }
]

const valorEntrada = ref(1)
const unidadeOrigem = ref('atm')
const unidadeDestino = ref('psi')
const resultado = ref(0)

const converterPara = (unidadeId) => {
  const origem = unidades.find(u => u.id === unidadeOrigem.value)
  const destino = unidades.find(u => u.id === unidadeId)
  const emPascal = Number(valorEntrada.value) * origem.paraPascal
  return emPascal / destino.paraPascal
}

const converter = () => {
  resultado.value = converterPara(unidadeDestino.value)
  trackToolUsage('Conversor Pressao', 'convert', { from: unidadeOrigem.value, to: unidadeDestino.value })
}

converter()
</script>
