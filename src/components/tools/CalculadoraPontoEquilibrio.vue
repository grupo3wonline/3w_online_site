<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <i class="fas fa-chart-line text-green-600 dark:text-green-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calculadora de Ponto de Equilíbrio</h1>
        <p class="text-gray-600 dark:text-gray-400">Break-even Point - Quando receitas = despesas</p>
      </div>

      <div class="space-y-6">
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-4">
          <BaseInput v-model="custosFixos" label="Custos Fixos (R$)" type="number" step="0.01" />
          <BaseInput v-model="precoVenda" label="Preço de Venda por Unidade (R$)" type="number" step="0.01" />
          <BaseInput v-model="custoVariavel" label="Custo Variável por Unidade (R$)" type="number" step="0.01" />
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>Calcular Ponto de Equilíbrio
        </BaseButton>

        <div v-if="calculado" class="space-y-4">
          <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg p-8">
            <div class="text-center mb-6">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Ponto de Equilíbrio</div>
              <div class="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
                {{ Math.ceil(resultado.unidades) }}
              </div>
              <div class="text-lg text-gray-700 dark:text-gray-300">unidades</div>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Receita no Ponto de Equilíbrio</div>
                <div class="text-2xl font-bold text-green-600 dark:text-green-400">
                  {{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resultado.receita) }}
                </div>
              </div>
              <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Margem de Contribuição</div>
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resultado.margemContribuicao) }}
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-700 rounded-lg p-6">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-4">Análise Detalhada</h4>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-gray-600 dark:text-gray-400">Custos Fixos Mensais</span>
                <span class="font-semibold text-gray-900 dark:text-white">
                  {{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(custosFixos)) }}
                </span>
              </div>
              <div class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-gray-600 dark:text-gray-400">Preço de Venda Unitário</span>
                <span class="font-semibold text-gray-900 dark:text-white">
                  {{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(precoVenda)) }}
                </span>
              </div>
              <div class="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-gray-600 dark:text-gray-400">Custo Variável Unitário</span>
                <span class="font-semibold text-gray-900 dark:text-white">
                  {{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(custoVariavel)) }}
                </span>
              </div>
              <div class="flex justify-between py-2 bg-green-50 dark:bg-green-900/20 rounded px-3">
                <span class="text-gray-700 dark:text-gray-300">Margem de Contribuição Unitária</span>
                <span class="font-bold text-green-600 dark:text-green-400">
                  {{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resultado.margemContribuicao) }}
                </span>
              </div>
            </div>

            <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded">
              <p class="text-sm text-blue-800 dark:text-blue-300">
                <strong>Fórmula:</strong> PE = Custos Fixos ÷ (Preço de Venda - Custo Variável)
              </p>
              <p class="text-xs text-blue-700 dark:text-blue-400 mt-1">
                PE = {{ Number(custosFixos).toFixed(2) }} ÷ {{ resultado.margemContribuicao.toFixed(2) }} = {{ resultado.unidades.toFixed(2) }} unidades
              </p>
            </div>
          </div>

          <div class="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-6">
            <h5 class="font-semibold text-gray-900 dark:text-white mb-3">Simulação de Vendas</h5>
            <div class="grid grid-cols-3 gap-3 text-xs">
              <div v-for="mult in [0.5, 1, 1.5]" :key="mult" class="bg-white dark:bg-gray-800 rounded p-3">
                <div class="text-gray-500 dark:text-gray-400 mb-1">
                  {{ Math.ceil(resultado.unidades * mult) }} unidades ({{ (mult * 100).toFixed(0) }}%)
                </div>
                <div :class="['font-bold', mult < 1 ? 'text-red-600' : mult === 1 ? 'text-yellow-600' : 'text-green-600']">
                  {{ mult < 1 ? 'Prejuízo' : mult === 1 ? 'Equilíbrio' : 'Lucro' }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4">
          <div class="text-sm text-green-800 dark:text-green-300">
            <p class="font-semibold mb-1">O que é Ponto de Equilíbrio?</p>
            <p class="text-xs">É o volume mínimo de vendas necessário para cobrir todos os custos. 
            Abaixo dele, há prejuízo. Acima, há lucro.</p>
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

const custosFixos = ref(10000)
const precoVenda = ref(50)
const custoVariavel = ref(20)
const calculado = ref(false)
const resultado = ref({})

const calcular = () => {
  const margemContribuicao = Number(precoVenda.value) - Number(custoVariavel.value)
  const unidades = Number(custosFixos.value) / margemContribuicao
  const receita = unidades * Number(precoVenda.value)

  resultado.value = {
    unidades,
    receita,
    margemContribuicao
  }

  calculado.value = true
  trackToolUsage('Calculadora Ponto Equilibrio', 'calculate')
}
</script>
