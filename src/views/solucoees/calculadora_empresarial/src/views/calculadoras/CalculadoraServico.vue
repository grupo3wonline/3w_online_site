<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <AppBreadcrumb :items="breadcrumbs" />
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4"><div class="gradient-hero rounded-full p-3"><i class="fa-solid fa-users text-white text-2xl"></i></div></div>
        <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Preço de Serviço</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Defina preços justos para prestação de serviços considerando custos e tempo dedicado.</p>
      </div>
      <div class="grid lg:grid-cols-2 gap-8">
        <div class="card p-6">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"><i class="fa-solid fa-pencil text-primary-600"></i> Dados do Cálculo</h2>
          <form @submit.prevent="calcular" autocomplete="off" class="space-y-5">
            <div><label for="custoHora" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Custo por Hora (R$)</label><input id="custoHora" v-model="custoHora" type="number" step="0.01" autocomplete="off" class="input-field" /></div>
            <div><label for="horasServico" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Horas de Serviço</label><input id="horasServico" v-model="horasServico" type="number" step="0.01" autocomplete="off" class="input-field" /></div>
            <div><label for="custosExtras" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Custos Extras (R$)</label><input id="custosExtras" v-model="custosExtras" type="number" step="0.01" autocomplete="off" class="input-field" /></div>
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
import { precoPorHora } from '@/utils/pricing'

useSeo({
  title: 'Calculadora de Preço de Serviço',
  description: 'Calcule o preço ideal do seu serviço com base no custo por hora, tempo de execução e margem de lucro. Ferramenta gratuita para prestadores de serviço.',
  keywords: 'calculadora de preço de serviço, quanto cobrar por serviço, precificação de serviços, valor de mão de obra, orçamento de serviço',
  jsonLd: calculatorJsonLd({
    name: 'Calculadora de Preço de Serviço',
    description: 'Calcule o preço ideal do seu serviço com base no custo por hora, tempo de execução e margem de lucro.',
    path: '/calculadora-servico'
  })
})

const breadcrumbs = [{ label: 'Início', path: '/' }, { label: 'Calculadoras', path: '/calculadoras' }, { label: 'Preço de Serviço', path: '/calculadora-servico' }]

const custoHora = ref('')
const horasServico = ref('')
const custosExtras = ref('')
const resultado = ref(null)
const loading = ref(false)

function calcular() {
  const vHora = parseNumber(custoHora.value)
  const horas = parseNumber(horasServico.value)
  const extras = custosExtras.value ? parseNumber(custosExtras.value) : 0
  if (!(vHora > 0) || !(horas > 0) || !(extras >= 0)) {
    Swal.fire({ icon: 'warning', title: 'Dados inválidos', text: 'Informe custo por hora e horas maiores que zero.', confirmButtonColor: '#2563eb' })
    return
  }
  loading.value = true
  setTimeout(() => {
    const r = precoPorHora(horas, vHora, extras)
    resultado.value = {
      'Mão de Obra': formatBRL(r.maoDeObra),
      'Custos Extras': formatBRL(r.custos),
      'Preço do Serviço': formatBRL(r.total)
    }
    loading.value = false
    Swal.fire({ icon: 'success', title: 'Calculado!', confirmButtonColor: '#2563eb', timer: 1500, showConfirmButton: false })
  }, 400)
}

function limpar() { custoHora.value = ''; horasServico.value = ''; custosExtras.value = ''; resultado.value = null }
</script>
