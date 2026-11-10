<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <AppBreadcrumb :items="breadcrumbs" />
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4"><div class="gradient-hero rounded-full p-3"><i class="fa-solid fa-bullhorn text-white text-2xl"></i></div></div>
        <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Marketing Digital</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Calcule investimentos e retorno esperado em campanhas de marketing digital.</p>
      </div>
      <div class="grid lg:grid-cols-2 gap-8">
        <div class="card p-6">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"><i class="fa-solid fa-pencil text-primary-600"></i> Dados do Cálculo</h2>
          <form @submit.prevent="calcular" autocomplete="off" class="space-y-5">
            <div><label for="investMensal" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Investimento Mensal (R$)</label><input id="investMensal" v-model="investMensal" type="number" step="0.01" autocomplete="off" class="input-field" /></div>
            <div><label for="roiEsperado" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ROI Esperado (%)</label><input id="roiEsperado" v-model="roiEsperado" type="number" step="0.01" autocomplete="off" class="input-field" /></div>
            <div><label for="custosFixosMkt" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Custos Fixos (R$)</label><input id="custosFixosMkt" v-model="custosFixosMkt" type="number" step="0.01" autocomplete="off" class="input-field" /></div>
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
import { retornoMarketing } from '@/utils/pricing'

useSeo({
  title: 'Calculadora de Marketing Digital',
  description: 'Planeje o investimento mensal em marketing digital e estime o retorno das suas campanhas online. Ferramenta gratuita para distribuir verba e medir ROI.',
  keywords: 'calculadora de marketing digital, investimento em marketing digital, ROI marketing digital, orçamento de campanhas online, verba de marketing digital',
  jsonLd: calculatorJsonLd({
    name: 'Calculadora de Marketing Digital',
    description: 'Planeje o investimento mensal em marketing digital e estime o retorno das suas campanhas online.',
    path: '/calculadora-marketing-digital'
  })
})

const breadcrumbs = [{ label: 'Início', path: '/' }, { label: 'Calculadoras', path: '/calculadoras' }, { label: 'Marketing Digital', path: '/calculadora-marketing-digital' }]

const investMensal = ref('')
const roiEsperado = ref('')
const custosFixosMkt = ref('')
const resultado = ref(null)
const loading = ref(false)

function calcular() {
  const invest = parseNumber(investMensal.value)
  const roi = parseNumber(roiEsperado.value)
  const custosFixos = custosFixosMkt.value ? parseNumber(custosFixosMkt.value) : 0
  if (!(invest > 0) || !(roi >= 0) || !(custosFixos >= 0)) {
    Swal.fire({ icon: 'warning', title: 'Dados inválidos', text: 'Informe um investimento maior que zero e ROI não-negativo.', confirmButtonColor: '#2563eb' })
    return
  }
  loading.value = true
  setTimeout(() => {
    const r = retornoMarketing(invest, roi, custosFixos)
    resultado.value = {
      'Investimento': formatBRL(invest),
      'Retorno Bruto': formatBRL(r.retornoBruto),
      'Custos Fixos': formatBRL(custosFixos),
      'Lucro Líquido': formatBRL(r.lucroLiquido)
    }
    loading.value = false
    Swal.fire({ icon: 'success', title: 'Calculado!', confirmButtonColor: '#2563eb', timer: 1500, showConfirmButton: false })
  }, 400)
}

function limpar() { investMensal.value = ''; roiEsperado.value = ''; custosFixosMkt.value = ''; resultado.value = null }
</script>
