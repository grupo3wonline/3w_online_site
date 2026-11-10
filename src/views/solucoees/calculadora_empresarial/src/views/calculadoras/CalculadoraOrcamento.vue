<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <AppBreadcrumb :items="breadcrumbs" />
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4"><div class="gradient-hero rounded-full p-3"><i class="fa-solid fa-calculator text-white text-2xl"></i></div></div>
        <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Orçamento Geral</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Crie orçamentos detalhados para seus produtos e serviços com custos e margem de lucro.</p>
      </div>
      <div class="grid lg:grid-cols-2 gap-8">
        <div class="card p-6">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"><i class="fa-solid fa-pencil text-primary-600"></i> Dados do Cálculo</h2>
          <form @submit.prevent="calcular" autocomplete="off" class="space-y-5">
            <div><label for="materiais" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Custo dos Materiais (R$)</label><input id="materiais" v-model="materiais" type="number" step="0.01" autocomplete="off" class="input-field" /></div>
            <div><label for="maoDeObra" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mão de Obra (R$)</label><input id="maoDeObra" v-model="maoDeObra" type="number" step="0.01" autocomplete="off" class="input-field" /></div>
            <div><label for="margemLucro" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Margem de Lucro (%)</label><input id="margemLucro" v-model="margemLucro" type="number" step="0.01" autocomplete="off" class="input-field" /></div>
            <div class="flex gap-3 pt-4">
              <button type="submit" class="flex-1 btn-primary" :disabled="loading"><i class="fa-solid fa-calculator mr-2"></i>{{ loading ? 'Calculando...' : 'Calcular' }}</button>
              <button type="button" @click="limpar" class="btn-secondary">Limpar</button>
            </div>
          </form>
        </div>
        <div v-if="resultado" class="card p-6">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"><i class="fa-solid fa-chart-column text-secondary-500"></i> Resultados</h2>
          <div class="space-y-4">
            <div v-for="(value, key) in resultado" :key="key" class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ key }}</span>
              <span class="font-bold text-gray-900 dark:text-white">{{ value }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-12 grid md:grid-cols-2 gap-8">
        <div class="card p-6"><h3 class="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><i class="fa-solid fa-circle-info text-primary-600"></i> Como Usar</h3><ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400"><li> Preencha todos os campos com valores válidos</li><li> Clique em Calcular para ver os resultados</li><li> Use Limpar para recomeçar</li></ul></div>
        <div class="card p-6"><h3 class="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><i class="fa-solid fa-lightbulb text-secondary-500"></i> Dicas</h3><ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400"><li> Considere todos os custos envolvidos</li><li> Compare com valores do mercado</li><li> Revise seus cálculos periodicamente</li></ul></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue'
import { useSeo, calculatorJsonLd } from '@/composables/useSeo'
import { parseNumber, formatBRL } from '@/utils/finance'
import { orcamentoComMargem } from '@/utils/pricing'

useSeo({
  title: 'Calculadora de Orçamento',
  description: 'Monte o orçamento do seu trabalho somando materiais, mão de obra e margem de lucro. Ferramenta gratuita para criar propostas comerciais com preço justo.',
  keywords: 'calculadora de orçamento, como fazer orçamento, orçamento de serviço, cálculo de custos, proposta comercial',
  jsonLd: calculatorJsonLd({
    name: 'Calculadora de Orçamento',
    description: 'Monte o orçamento do seu trabalho somando materiais, mão de obra e margem de lucro.',
    path: '/calculadora-orcamento'
  })
})

const breadcrumbs = [{ label: 'Início', path: '/' }, { label: 'Calculadoras', path: '/calculadoras' }, { label: 'Orçamento', path: '/calculadora-orcamento' }]

const materiais = ref('')
const maoDeObra = ref('')
const margemLucro = ref('')
const resultado = ref(null)
const loading = ref(false)

function calcular() {
  const mat = parseNumber(materiais.value)
  const mao = parseNumber(maoDeObra.value)
  const margem = parseNumber(margemLucro.value)
  if (!(mat >= 0) || !(mao >= 0) || !(mat + mao > 0) || !(margem >= 0) || margem > 99) {
    Swal.fire({ icon: 'warning', title: 'Dados inválidos', text: 'Informe materiais e mão de obra, e uma margem entre 0 e 99%.', confirmButtonColor: '#2563eb' })
    return
  }
  loading.value = true
  setTimeout(() => {
    const r = orcamentoComMargem(mat, mao, margem)
    resultado.value = {
      'Custo Total': formatBRL(r.custo),
      'Margem': `${margem}%`,
      'Lucro': formatBRL(r.lucro),
      'Preço Final': formatBRL(r.preco)
    }
    loading.value = false
    Swal.fire({ icon: 'success', title: 'Calculado!', confirmButtonColor: '#2563eb', timer: 1500, showConfirmButton: false })
  }, 400)
}

function limpar() { materiais.value = ''; maoDeObra.value = ''; margemLucro.value = ''; resultado.value = null }
</script>
