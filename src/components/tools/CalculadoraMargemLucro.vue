<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <i class="fas fa-chart-line text-green-600 dark:text-green-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calculadora de Margem de Lucro</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule margem bruta, líquida e markup</p>
      </div>

      <div class="space-y-6">
        <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 space-y-4">
          <div class="grid md:grid-cols-2 gap-4">
            <BaseInput v-model="custoTotal" label="Custo Total (R$)" type="number" step="0.01" />
            <BaseInput v-model="precoVenda" label="Preço de Venda (R$)" type="number" step="0.01" />
          </div>

          <div>
            <BaseInput v-model="despesasOperacionais" label="Despesas Operacionais (R$)" type="number" step="0.01" />
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Opcional: aluguel, salários, etc.</p>
          </div>
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>Calcular Margens
        </BaseButton>

        <div v-if="calculado" class="space-y-4">
          <!-- Lucro e Markup -->
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Lucro Bruto</span>
                <i class="fas fa-dollar-sign text-blue-600 dark:text-blue-400"></i>
              </div>
              <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {{ formatarMoeda(resultado.lucroBruto) }}
              </div>
            </div>

            <div class="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Markup</span>
                <i class="fas fa-tag text-purple-600 dark:text-purple-400"></i>
              </div>
              <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {{ resultado.markup.toFixed(2) }}%
              </div>
            </div>
          </div>

          <!-- Margens -->
          <div class="bg-white dark:bg-gray-700 rounded-lg p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Margens de Lucro</h3>
            
            <div class="space-y-4">
              <!-- Margem Bruta -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Margem Bruta</span>
                  <span class="text-2xl font-bold text-green-600 dark:text-green-400">
                    {{ resultado.margemBruta.toFixed(2) }}%
                  </span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                  <div 
                    class="bg-green-600 h-3 rounded-full transition-all"
                    :style="{ width: `${Math.min(resultado.margemBruta, 100)}%` }"
                  ></div>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  (Preço - Custo) / Preço × 100
                </p>
              </div>

              <!-- Margem Líquida -->
              <div v-if="despesasOperacionais > 0">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Margem Líquida</span>
                  <span class="text-2xl font-bold" :class="resultado.margemLiquida >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                    {{ resultado.margemLiquida.toFixed(2) }}%
                  </span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                  <div 
                    :class="resultado.margemLiquida >= 0 ? 'bg-green-600' : 'bg-red-600'"
                    class="h-3 rounded-full transition-all"
                    :style="{ width: `${Math.min(Math.abs(resultado.margemLiquida), 100)}%` }"
                  ></div>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  (Lucro - Despesas) / Preço × 100
                </p>
                
                <div class="mt-3 bg-blue-50 dark:bg-blue-900/20 rounded p-3">
                  <div class="text-sm text-gray-700 dark:text-gray-300">
                    Lucro Líquido: <span class="font-bold">{{ formatarMoeda(resultado.lucroLiquido) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Análise -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <i class="fas fa-chart-bar text-green-600 mr-2"></i>
              Análise Detalhada
            </h4>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-gray-600 dark:text-gray-400">Custo Total:</span>
                <span class="font-semibold text-gray-900 dark:text-white">{{ formatarMoeda(custoTotal) }}</span>
              </div>
              <div class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-gray-600 dark:text-gray-400">Preço de Venda:</span>
                <span class="font-semibold text-gray-900 dark:text-white">{{ formatarMoeda(precoVenda) }}</span>
              </div>
              <div v-if="despesasOperacionais > 0" class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-gray-600 dark:text-gray-400">Despesas Operacionais:</span>
                <span class="font-semibold text-gray-900 dark:text-white">{{ formatarMoeda(despesasOperacionais) }}</span>
              </div>
              <div class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-gray-600 dark:text-gray-400">Lucro Bruto:</span>
                <span class="font-semibold text-green-600 dark:text-green-400">{{ formatarMoeda(resultado.lucroBruto) }}</span>
              </div>
              <div v-if="despesasOperacionais > 0" class="flex justify-between py-2">
                <span class="text-gray-600 dark:text-gray-400">Lucro Líquido:</span>
                <span class="font-semibold" :class="resultado.lucroLiquido >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                  {{ formatarMoeda(resultado.lucroLiquido) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Recomendações -->
          <div :class="[
            'border-l-4 p-4 rounded',
            resultado.margemBruta >= 30 ? 'bg-green-50 dark:bg-green-900/20 border-green-500' :
            resultado.margemBruta >= 15 ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500' :
            'bg-red-50 dark:bg-red-900/20 border-red-500'
          ]">
            <div class="flex">
              <i :class="[
                'mt-1 mr-3',
                resultado.margemBruta >= 30 ? 'fas fa-check-circle text-green-600' :
                resultado.margemBruta >= 15 ? 'fas fa-exclamation-triangle text-yellow-600' :
                'fas fa-times-circle text-red-600'
              ]"></i>
              <div class="text-sm">
                <p class="font-semibold mb-2">{{ obterTituloAnalise() }}</p>
                <p class="text-xs">{{ obterDescricaoAnalise() }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-green-600 dark:text-green-400 mt-1 mr-3"></i>
            <div class="text-sm text-green-800 dark:text-green-300">
              <p class="font-semibold mb-2">Entenda os conceitos:</p>
              <ul class="list-disc list-inside space-y-1 text-xs">
                <li><strong>Margem Bruta:</strong> Lucro antes das despesas operacionais</li>
                <li><strong>Margem Líquida:</strong> Lucro real após todas as despesas</li>
                <li><strong>Markup:</strong> Percentual sobre o custo para chegar ao preço</li>
                <li><strong>Lucro Bruto:</strong> Preço de venda menos custo</li>
                <li><strong>Lucro Líquido:</strong> Lucro bruto menos despesas operacionais</li>
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

const custoTotal = ref(100)
const precoVenda = ref(150)
const despesasOperacionais = ref(0)
const calculado = ref(false)
const resultado = ref({
  lucroBruto: 0,
  lucroLiquido: 0,
  margemBruta: 0,
  margemLiquida: 0,
  markup: 0
})

const formatarMoeda = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor)
}

const calcular = () => {
  const custo = Number(custoTotal.value)
  const preco = Number(precoVenda.value)
  const despesas = Number(despesasOperacionais.value)

  const lucroBruto = preco - custo
  const lucroLiquido = lucroBruto - despesas
  const margemBruta = (lucroBruto / preco) * 100
  const margemLiquida = (lucroLiquido / preco) * 100
  const markup = ((preco - custo) / custo) * 100

  resultado.value = {
    lucroBruto,
    lucroLiquido,
    margemBruta,
    margemLiquida,
    markup
  }

  calculado.value = true
  trackToolUsage('Calculadora Margem Lucro', 'calculate')
}

const obterTituloAnalise = () => {
  const margem = resultado.value.margemBruta
  if (margem >= 30) return 'Excelente margem de lucro!'
  if (margem >= 15) return 'Margem aceitável, mas pode melhorar'
  return 'Margem baixa - atenção necessária'
}

const obterDescricaoAnalise = () => {
  const margem = resultado.value.margemBruta
  if (margem >= 30) return 'Sua margem está acima da média. Continue monitorando custos e mantenha a qualidade.'
  if (margem >= 15) return 'Margem próxima à média do mercado. Considere reduzir custos ou aumentar valor percebido.'
  return 'Margem abaixo do ideal. Revise custos, fornecedores e estratégia de precificação urgentemente.'
}
</script>
