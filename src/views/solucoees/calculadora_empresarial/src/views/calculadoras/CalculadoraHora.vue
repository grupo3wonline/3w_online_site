<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <AppBreadcrumb :items="breadcrumbs" />
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <div class="gradient-hero rounded-full p-3"><i class="fa-solid fa-clock text-white text-2xl"></i></div>
        </div>
        <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Preço Hora de Trabalho</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Calcule o valor ideal da sua hora de trabalho baseado nos seus custos mensais e horas disponíveis.</p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8">
        <div class="card p-6">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <i class="fa-solid fa-pencil text-primary-600"></i> Dados do Cálculo
          </h2>
          <form @submit.prevent="calcular" autocomplete="off" class="space-y-5">
            <div>
              <label for="custoMensal" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Custos Mensais (R$)</label>
              <input id="custoMensal" v-model="custoMensal" type="number" step="0.01" placeholder="Ex: 5000" autocomplete="off" class="input-field" />
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Total de custos fixos mensais</p>
            </div>            <div>
              <label for="horasMes" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Horas Trabalhadas/Mês</label>
              <input id="horasMes" v-model="horasMes" type="number" step="0.01" placeholder="Ex: 160" autocomplete="off" class="input-field" />
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Horas disponíveis por mês</p>
            </div>            <div>
              <label for="lucroDesejado" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lucro Desejado (%)</label>
              <input id="lucroDesejado" v-model="lucroDesejado" type="number" step="0.01" placeholder="Ex: 30" autocomplete="off" class="input-field" />
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Margem de lucro em %</p>
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
  title: 'Calculadora de Valor da Hora de Trabalho',
  description: 'Calcule o valor ideal da sua hora de trabalho com base nos custos mensais, horas disponíveis e lucro desejado. Ferramenta gratuita para freelancers e autônomos.',
  keywords: 'calculadora de valor da hora, preço da hora de trabalho, valor hora freelancer, quanto cobrar por hora, precificação de serviços',
  jsonLd: calculatorJsonLd({
    name: 'Calculadora de Valor da Hora de Trabalho',
    description: 'Calcule o valor ideal da sua hora de trabalho com base em custos mensais, horas disponíveis e lucro desejado.',
    path: '/calculadora-hora'
  })
})

const breadcrumbs = [
  { label: 'Início', path: '/' },
  { label: 'Calculadoras', path: '/calculadoras' },
  { label: 'Valor da Hora', path: '/calculadora-hora' }
]

const custoMensal = ref('')
const horasMes = ref('')
const lucroDesejado = ref('')

const resultado = ref(null)
const loading = ref(false)

function calcular() {
  if (!custoMensal.value || !horasMes.value || !lucroDesejado.value) {
    Swal.fire({ icon: 'warning', title: 'Campos obrigatórios', text: 'Preencha todos os campos.', confirmButtonColor: '#2563eb' })
    return
  }
  loading.value = true
  setTimeout(() => {
    const custos = parseFloat(custoMensal.value); const horas = parseFloat(horasMes.value); const lucro = parseFloat(lucroDesejado.value); const valorBase = custos / horas; const valorComLucro = valorBase * (1 + lucro / 100); resultado.value = { valorHora: valorComLucro.toFixed(2), valorBase: valorBase.toFixed(2), custosMsg: custos.toFixed(2), horasMsg: horas }
    loading.value = false
    Swal.fire({ icon: 'success', title: 'Calculado!', confirmButtonColor: '#2563eb', timer: 2000, showConfirmButton: false })
  }, 500)
}

function limpar() {
  custoMensal.value = ''; horasMes.value = ''; lucroDesejado.value = ''; resultado.value = null
}
</script>
