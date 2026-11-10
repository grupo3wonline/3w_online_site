<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <AppBreadcrumb :items="breadcrumbs" />
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <div class="gradient-hero rounded-full p-3"><i class="fa-solid fa-box text-white text-2xl"></i></div>
        </div>
        <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Preço de Produto</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Calcule o preço ideal de venda dos seus produtos considerando custos e margem de lucro desejada.</p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8">
        <div class="card p-6">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <i class="fa-solid fa-pencil text-primary-600"></i> Dados do Cálculo
          </h2>
          <form @submit.prevent="calcular" autocomplete="off" class="space-y-5">
            <div>
              <label for="custo" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Custo do Produto</label>
              <input id="custo" v-model="custo" type="number" step="0.01" placeholder="Ex: 50.00" autocomplete="off" class="input-field" />
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Custo unitário em R$</p>
            </div>            <div>
              <label for="margem" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Margem de Lucro (%)</label>
              <input id="margem" v-model="margem" type="number" step="0.01" placeholder="Ex: 30" autocomplete="off" class="input-field" />
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Margem desejada em %</p>
            </div>            <div>
              <label for="despesas" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Despesas Fixas (%)</label>
              <input id="despesas" v-model="despesas" type="number" step="0.01" placeholder="Ex: 15" autocomplete="off" class="input-field" />
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Percentual de despesas fixas</p>
            </div>
            <div class="flex gap-3 pt-4">
              <button type="submit" class="flex-1 btn-primary" :disabled="loading"><i class="fa-solid fa-calculator mr-2"></i>{{ loading ? 'Calculando...' : 'Calcular' }}</button>
              <button type="button" @click="limpar" class="btn-secondary">Limpar</button>
            </div>
          </form>
        </div>

        <div v-if="resultado" class="card p-6">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <i class="fa-solid fa-chart-column text-secondary-500"></i> Resultados
          </h2>
          <div class="space-y-4">
            <div v-for="(value, key) in resultado" :key="key" class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span class="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">{{ key }}:</span>
              <span class="font-bold text-gray-900 dark:text-white">{{ value }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 grid md:grid-cols-2 gap-8">
        <div class="card p-6">
          <h3 class="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><i class="fa-solid fa-circle-info text-primary-600"></i> Como Usar</h3>
          <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li> Preencha todos os campos com valores válidos</li>
            <li> Clique em Calcular para ver os resultados</li>
            <li> Use o botão Limpar para recomeçar</li>
          </ul>
        </div>
        <div class="card p-6">
          <h3 class="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><i class="fa-solid fa-lightbulb text-secondary-500"></i> Dicas</h3>
          <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li> Considere todos os custos envolvidos</li>
            <li> Compare com valores praticados no mercado</li>
            <li> Revise periodicamente seus cálculos</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import { useSeo, calculatorJsonLd } from '@/composables/useSeo'

useSeo({
  title: 'Calculadora de Preço de Produto',
  description: 'Descubra o preço de venda ideal do seu produto considerando custo, margem de lucro e despesas fixas. Precifique com lucro garantido de forma gratuita.',
  keywords: 'calculadora de preço de produto, precificação, margem de lucro, markup, preço de venda, custo do produto',
  jsonLd: calculatorJsonLd({
    name: 'Calculadora de Preço de Produto',
    description: 'Calcule o preço de venda ideal do seu produto considerando custo, margem de lucro e despesas fixas.',
    path: '/calculadora-produto'
  })
})

const breadcrumbs = [
  { label: 'Início', path: '/' },
  { label: 'Calculadoras', path: '/calculadoras' },
  { label: 'Preço de Produto', path: '/calculadora-produto' }
]

const custo = ref('')
const margem = ref('')
const despesas = ref('')

const resultado = ref(null)
const loading = ref(false)

function calcular() {
  if (!custo.value || !margem.value || !despesas.value) {
    Swal.fire({ icon: 'warning', title: 'Campos obrigatórios', text: 'Preencha todos os campos.', confirmButtonColor: '#2563eb' })
    return
  }
  loading.value = true
  setTimeout(() => {
    const custoNum = parseFloat(custo.value); const margemNum = parseFloat(margem.value); const despNum = parseFloat(despesas.value); const markup = 100 / (100 - margemNum - despNum); const precoVenda = custoNum * markup; const lucro = precoVenda - custoNum - (custoNum * despNum / 100); resultado.value = { precoVenda: precoVenda.toFixed(2), custoUnit: custoNum.toFixed(2), margem: margemNum.toFixed(1), lucroUnit: lucro.toFixed(2) }
    loading.value = false
    Swal.fire({ icon: 'success', title: 'Calculado!', confirmButtonColor: '#2563eb', timer: 2000, showConfirmButton: false })
  }, 500)
}

function limpar() {
  custo.value = ''; margem.value = ''; despesas.value = ''; resultado.value = null
}
</script>
