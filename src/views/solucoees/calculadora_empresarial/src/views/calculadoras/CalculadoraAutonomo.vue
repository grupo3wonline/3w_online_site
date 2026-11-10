<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <AppBreadcrumb :items="breadcrumbs" />
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4"><div class="gradient-hero rounded-full p-3"><i class="fa-solid fa-chart-pie text-white text-2xl"></i></div></div>
        <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Trabalho Autônomo</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Calcule seus custos e defina preços para trabalho autônomo considerando impostos e despesas.</p>
      </div>
      <div class="grid lg:grid-cols-2 gap-8">
        <div class="card p-6">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"><i class="fa-solid fa-pencil text-primary-600"></i> Dados do Cálculo</h2>
          <form @submit.prevent="calcular" autocomplete="off" class="space-y-5">
            <div><label for="rendaDesejada" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Renda Desejada (R$)</label><input id="rendaDesejada" v-model="rendaDesejada" type="number" step="0.01" autocomplete="off" class="input-field" /></div>
            <div><label for="impostos" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Impostos (%)</label><input id="impostos" v-model="impostos" type="number" step="0.01" autocomplete="off" class="input-field" /></div>
            <div><label for="despesasFixas" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Despesas Fixas (R$)</label><input id="despesasFixas" v-model="despesasFixas" type="number" step="0.01" autocomplete="off" class="input-field" /></div>
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
import { faturamentoAutonomo } from '@/utils/pricing'

useSeo({
  title: 'Calculadora para Autônomo',
  description: 'Descubra quanto cobrar como profissional autônomo a partir da renda desejada, custos e horas de trabalho. Ferramenta gratuita para precificar seu trabalho.',
  keywords: 'calculadora para autônomo, quanto cobrar autônomo, precificação autônomo, valor da hora profissional liberal, renda de autônomo',
  jsonLd: calculatorJsonLd({
    name: 'Calculadora para Autônomo',
    description: 'Descubra quanto cobrar como profissional autônomo a partir da renda desejada, custos e horas de trabalho.',
    path: '/calculadora-autonomo'
  })
})

const breadcrumbs = [{ label: 'Início', path: '/' }, { label: 'Calculadoras', path: '/calculadoras' }, { label: 'Autônomo', path: '/calculadora-autonomo' }]

const rendaDesejada = ref('')
const impostos = ref('')
const despesasFixas = ref('')
const resultado = ref(null)
const loading = ref(false)

function calcular() {
  const renda = parseNumber(rendaDesejada.value)
  const pImpostos = parseNumber(impostos.value)
  const despesas = despesasFixas.value ? parseNumber(despesasFixas.value) : 0
  if (!(renda > 0) || !(pImpostos >= 0) || pImpostos > 99 || !(despesas >= 0)) {
    Swal.fire({ icon: 'warning', title: 'Dados inválidos', text: 'Informe uma renda válida e impostos entre 0 e 99%.', confirmButtonColor: '#2563eb' })
    return
  }
  loading.value = true
  setTimeout(() => {
    const r = faturamentoAutonomo(renda, pImpostos, despesas)
    resultado.value = {
      'Renda Desejada': formatBRL(renda),
      'Despesas Fixas': formatBRL(r.despesas),
      'Impostos': formatBRL(r.impostos),
      'Faturamento Necessário': formatBRL(r.faturamentoNecessario)
    }
    loading.value = false
    Swal.fire({ icon: 'success', title: 'Calculado!', confirmButtonColor: '#2563eb', timer: 1500, showConfirmButton: false })
  }, 400)
}

function limpar() { rendaDesejada.value = ''; impostos.value = ''; despesasFixas.value = ''; resultado.value = null }
</script>
