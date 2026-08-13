<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
          <i class="fas fa-percent text-blue-600 dark:text-blue-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calculadora de Porcentagem</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule porcentagens, aumentos e descontos</p>
      </div>

      <div class="space-y-6">
        <!-- Tipo de Cálculo -->
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Tipo de Cálculo
          </label>
          <div class="grid md:grid-cols-2 gap-3">
            <button
              v-for="tipo in tiposCalculo"
              :key="tipo.id"
              @click="tipoSelecionado = tipo.id"
              :class="[
                'p-4 rounded-lg border-2 transition-all text-left',
                tipoSelecionado === tipo.id
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30'
                  : 'border-gray-200 dark:border-gray-600 hover:border-blue-400'
              ]"
            >
              <div class="flex items-center gap-3">
                <i :class="[tipo.icon, 'text-blue-600 dark:text-blue-400']"></i>
                <div>
                  <div class="font-semibold text-gray-900 dark:text-white">{{ tipo.nome }}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">{{ tipo.descricao }}</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        <!-- Porcentagem de um Valor -->
        <div v-if="tipoSelecionado === 'percentual'" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-4">
          <div class="grid md:grid-cols-2 gap-4">
            <BaseInput v-model="percentual1" label="Porcentagem (%)" type="number" />
            <BaseInput v-model="valor1" label="De qual valor?" type="number" />
          </div>
          <BaseButton @click="calcularPercentual" variant="primary" class="w-full">
            <i class="fas fa-calculator mr-2"></i>Calcular
          </BaseButton>
          <div v-if="resultado1" class="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4 text-center">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">{{ percentual1 }}% de {{ formatarMoeda(valor1) }} é:</div>
            <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">{{ formatarMoeda(resultado1) }}</div>
          </div>
        </div>

        <!-- Quanto é X de Y em Porcentagem -->
        <div v-if="tipoSelecionado === 'proporcao'" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-4">
          <div class="grid md:grid-cols-2 gap-4">
            <BaseInput v-model="valor2a" label="Valor (parte)" type="number" />
            <BaseInput v-model="valor2b" label="Valor (total)" type="number" />
          </div>
          <BaseButton @click="calcularProporcao" variant="primary" class="w-full">
            <i class="fas fa-calculator mr-2"></i>Calcular
          </BaseButton>
          <div v-if="resultado2" class="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4 text-center">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">{{ formatarMoeda(valor2a) }} representa:</div>
            <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">{{ resultado2 }}%</div>
            <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">de {{ formatarMoeda(valor2b) }}</div>
          </div>
        </div>

        <!-- Aumento Percentual -->
        <div v-if="tipoSelecionado === 'aumento'" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-4">
          <div class="grid md:grid-cols-2 gap-4">
            <BaseInput v-model="valor3" label="Valor inicial" type="number" />
            <BaseInput v-model="percentual3" label="Aumento (%)" type="number" />
          </div>
          <BaseButton @click="calcularAumento" variant="primary" class="w-full">
            <i class="fas fa-arrow-up mr-2"></i>Calcular Aumento
          </BaseButton>
          <div v-if="resultado3" class="space-y-3">
            <div class="bg-green-100 dark:bg-green-900/30 rounded-lg p-4">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Valor do aumento:</div>
              <div class="text-2xl font-bold text-green-600 dark:text-green-400">+ {{ formatarMoeda(resultado3.aumento) }}</div>
            </div>
            <div class="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Valor final:</div>
              <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">{{ formatarMoeda(resultado3.final) }}</div>
            </div>
          </div>
        </div>

        <!-- Desconto Percentual -->
        <div v-if="tipoSelecionado === 'desconto'" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-4">
          <div class="grid md:grid-cols-2 gap-4">
            <BaseInput v-model="valor4" label="Valor inicial" type="number" />
            <BaseInput v-model="percentual4" label="Desconto (%)" type="number" />
          </div>
          <BaseButton @click="calcularDesconto" variant="primary" class="w-full">
            <i class="fas fa-arrow-down mr-2"></i>Calcular Desconto
          </BaseButton>
          <div v-if="resultado4" class="space-y-3">
            <div class="bg-red-100 dark:bg-red-900/30 rounded-lg p-4">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Valor do desconto:</div>
              <div class="text-2xl font-bold text-red-600 dark:text-red-400">- {{ formatarMoeda(resultado4.desconto) }}</div>
            </div>
            <div class="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Valor final:</div>
              <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">{{ formatarMoeda(resultado4.final) }}</div>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-blue-600 dark:text-blue-400 mt-1 mr-3"></i>
            <div class="text-sm text-blue-800 dark:text-blue-300">
              <p class="font-semibold mb-2">Exemplos de uso:</p>
              <ul class="list-disc list-inside space-y-1 text-xs">
                <li>Calcular descontos em compras</li>
                <li>Calcular aumento salarial</li>
                <li>Saber qual porcentagem de meta foi atingida</li>
                <li>Calcular impostos e taxas</li>
                <li>Analisar crescimento ou redução</li>
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

const tiposCalculo = [
  { id: 'percentual', nome: 'X% de Y', descricao: 'Quanto é uma porcentagem de um valor', icon: 'fas fa-percentage' },
  { id: 'proporcao', nome: 'X é Y% de Z', descricao: 'Qual porcentagem um valor representa', icon: 'fas fa-chart-pie' },
  { id: 'aumento', nome: 'Aumento %', descricao: 'Aplicar aumento percentual', icon: 'fas fa-arrow-up' },
  { id: 'desconto', nome: 'Desconto %', descricao: 'Aplicar desconto percentual', icon: 'fas fa-arrow-down' }
]

const tipoSelecionado = ref('percentual')

// Tipo 1: X% de Y
const percentual1 = ref(10)
const valor1 = ref(100)
const resultado1 = ref(0)

// Tipo 2: X é Y% de Z
const valor2a = ref(25)
const valor2b = ref(100)
const resultado2 = ref(0)

// Tipo 3: Aumento
const valor3 = ref(100)
const percentual3 = ref(10)
const resultado3 = ref(null)

// Tipo 4: Desconto
const valor4 = ref(100)
const percentual4 = ref(10)
const resultado4 = ref(null)

const formatarMoeda = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor)
}

const calcularPercentual = () => {
  resultado1.value = (valor1.value * percentual1.value) / 100
  trackToolUsage('Calculadora Porcentagem', 'percentual')
}

const calcularProporcao = () => {
  resultado2.value = ((valor2a.value / valor2b.value) * 100).toFixed(2)
  trackToolUsage('Calculadora Porcentagem', 'proporcao')
}

const calcularAumento = () => {
  const aumento = (valor3.value * percentual3.value) / 100
  resultado3.value = {
    aumento,
    final: valor3.value + aumento
  }
  trackToolUsage('Calculadora Porcentagem', 'aumento')
}

const calcularDesconto = () => {
  const desconto = (valor4.value * percentual4.value) / 100
  resultado4.value = {
    desconto,
    final: valor4.value - desconto
  }
  trackToolUsage('Calculadora Porcentagem', 'desconto')
}
</script>
