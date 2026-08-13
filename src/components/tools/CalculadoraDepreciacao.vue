<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
          <i class="fas fa-chart-line-down text-amber-600 dark:text-amber-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calculadora de Depreciação</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule a desvalorização de ativos ao longo do tempo</p>
      </div>

      <div class="space-y-6">
        <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Método de Depreciação</label>
          <div class="grid grid-cols-2 gap-3">
            <button @click="metodo = 'linear'"
              :class="['p-4 rounded-lg border-2', metodo === 'linear' ? 'border-amber-600 bg-amber-50 dark:bg-amber-900/30' : 'border-gray-200 dark:border-gray-600']">
              <i :class="['fas fa-chart-line text-2xl mb-2', metodo === 'linear' ? 'text-amber-600' : 'text-gray-400']"></i>
              <div :class="['text-sm font-medium', metodo === 'linear' ? 'text-amber-900 dark:text-amber-300' : 'text-gray-600']">
                Linear
              </div>
            </button>

            <button @click="metodo = 'acelerada'"
              :class="['p-4 rounded-lg border-2', metodo === 'acelerada' ? 'border-amber-600 bg-amber-50 dark:bg-amber-900/30' : 'border-gray-200 dark:border-gray-600']">
              <i :class="['fas fa-chart-line-down text-2xl mb-2', metodo === 'acelerada' ? 'text-amber-600' : 'text-gray-400']"></i>
              <div :class="['text-sm font-medium', metodo === 'acelerada' ? 'text-amber-900 dark:text-amber-300' : 'text-gray-600']">
                Acelerada
              </div>
            </button>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-4">
          <BaseInput v-model="valorInicial" label="Valor Inicial do Ativo (R$)" type="number" step="0.01" />
          <BaseInput v-model="valorResidual" label="Valor Residual (R$)" type="number" step="0.01" />
          <BaseInput v-model="vidaUtil" label="Vida Útil (anos)" type="number" />
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>Calcular Depreciação
        </BaseButton>

        <div v-if="calculado" class="space-y-4">
          <div class="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg p-8">
            <div class="text-center mb-6">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Depreciação Anual ({{ metodo === 'linear' ? 'Linear' : 'Acelerada' }})</div>
              <div class="text-5xl font-bold text-amber-600 dark:text-amber-400 mb-2">
                {{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resultado.depreciacaoAnual) }}
              </div>
            </div>

            <div class="grid md:grid-cols-3 gap-4">
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Taxa Anual</div>
                <div class="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {{ resultado.taxaAnual.toFixed(2) }}%
                </div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Depreciação Mensal</div>
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resultado.depreciacaoMensal) }}
                </div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Valor Final</div>
                <div class="text-2xl font-bold text-green-600 dark:text-green-400">
                  {{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(valorResidual)) }}
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-700 rounded-lg p-6">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Tabela de Depreciação</h4>
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead class="bg-amber-50 dark:bg-amber-900/20">
                  <tr>
                    <th class="px-3 py-2 text-left text-gray-700 dark:text-gray-300">Ano</th>
                    <th class="px-3 py-2 text-right text-gray-700 dark:text-gray-300">Depreciação</th>
                    <th class="px-3 py-2 text-right text-gray-700 dark:text-gray-300">Acumulada</th>
                    <th class="px-3 py-2 text-right text-gray-700 dark:text-gray-300">Valor Contábil</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
                  <tr v-for="linha in resultado.tabela" :key="linha.ano" class="hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ linha.ano }}</td>
                    <td class="px-3 py-2 text-right font-mono text-gray-900 dark:text-white">
                      {{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(linha.depreciacao) }}
                    </td>
                    <td class="px-3 py-2 text-right font-mono text-gray-900 dark:text-white">
                      {{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(linha.acumulada) }}
                    </td>
                    <td class="px-3 py-2 text-right font-mono font-semibold text-amber-600 dark:text-amber-400">
                      {{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(linha.valorContabil) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4">
            <div class="text-sm text-amber-800 dark:text-amber-300">
              <p class="font-semibold mb-1">Depreciação Linear</p>
              <p class="text-xs">Valor constante todo ano. Método mais comum e simples.</p>
            </div>
          </div>

          <div class="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-4">
            <div class="text-sm text-orange-800 dark:text-orange-300">
              <p class="font-semibold mb-1">Depreciação Acelerada</p>
              <p class="text-xs">Maior depreciação nos primeiros anos. Usado para tecnologia.</p>
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

const metodo = ref('linear')
const valorInicial = ref(50000)
const valorResidual = ref(5000)
const vidaUtil = ref(5)
const calculado = ref(false)
const resultado = ref({})

const calcular = () => {
  const valorDepreciavel = Number(valorInicial.value) - Number(valorResidual.value)
  const taxaAnual = 100 / Number(vidaUtil.value)
  
  let depreciacaoAnual = valorDepreciavel / Number(vidaUtil.value)
  
  if (metodo.value === 'acelerada') {
    depreciacaoAnual = valorDepreciavel * 2 / Number(vidaUtil.value)
  }

  const tabela = []
  let acumulada = 0
  
  for (let ano = 1; ano <= Number(vidaUtil.value); ano++) {
    let depreciacao

    if (metodo.value === 'linear') {
      depreciacao = valorDepreciavel / Number(vidaUtil.value)
    } else {
      const saldoInicial = Number(valorInicial.value) - acumulada
      depreciacao = Math.min(saldoInicial * (taxaAnual / 100) * 2, saldoInicial - Number(valorResidual.value))
    }

    acumulada += depreciacao
    const valorContabil = Number(valorInicial.value) - acumulada

    tabela.push({
      ano,
      depreciacao,
      acumulada,
      valorContabil: Math.max(valorContabil, Number(valorResidual.value))
    })
  }

  resultado.value = {
    depreciacaoAnual: metodo.value === 'linear' ? depreciacaoAnual : tabela[0].depreciacao,
    depreciacaoMensal: (metodo.value === 'linear' ? depreciacaoAnual : tabela[0].depreciacao) / 12,
    taxaAnual,
    tabela
  }

  calculado.value = true
  trackToolUsage('Calculadora Depreciacao', 'calculate', { method: metodo.value })
}
</script>
