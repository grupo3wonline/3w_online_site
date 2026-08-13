<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
          <i class="fas fa-house text-blue-600 dark:text-blue-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calculadora de Financiamento de Imóvel</h1>
        <p class="text-gray-600 dark:text-gray-400">Simule financiamento imobiliário com PRICE e SAC</p>
      </div>

      <div class="space-y-6">
        <!-- Sistema -->
        <div class="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <button @click="sistema = 'price'" class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors" :class="sistema === 'price' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'">
            <div class="font-bold mb-1">PRICE</div>
            <div class="text-xs">Parcelas fixas</div>
          </button>
          <button @click="sistema = 'sac'" class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors" :class="sistema === 'sac' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'">
            <div class="font-bold mb-1">SAC</div>
            <div class="text-xs">Parcelas decrescentes</div>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="valorImovel" label="Valor do Imóvel (R$)" type="number" :min="50000" step="1000" icon="fa-solid fa-house" />
          <BaseInput v-model="entrada" label="Entrada (R$)" type="number" :min="0" step="1000" icon="fa-solid fa-money-bill" />
          <BaseInput v-model="taxaJuros" label="Taxa de Juros (% ao ano)" type="number" :min="0" step="0.01" icon="fa-solid fa-percent" />
          <BaseInput v-model="prazoAnos" label="Prazo (anos)" type="number" :min="1" :max="35" icon="fa-solid fa-calendar" />
        </div>

        <div class="flex gap-4">
          <BaseButton @click="calcular" variant="primary" class="flex-1">
            <i class="fas fa-calculator mr-2"></i>
            Calcular
          </BaseButton>
          <BaseButton @click="limpar" variant="outline"><i class="fas fa-eraser"></i></BaseButton>
        </div>

        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Parcela Mensal</div>
            <div class="text-5xl font-bold mb-2">R$ {{ resultado.primeiraParcela }}</div>
            <div class="text-blue-100">{{ sistema === 'price' ? 'Fixa' : `Decrescente até R$ ${resultado.ultimaParcela}` }}</div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">R$ {{ resultado.valorFinanciado }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Valor Financiado</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">R$ {{ resultado.totalPago }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Total a Pagar</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">R$ {{ resultado.totalJuros }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Total de Juros</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ prazoAnos }} anos</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Prazo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseInput from './common/BaseInput.vue'
import BaseButton from './common/BaseButton.vue'
import Swal from 'sweetalert2'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const sistema = ref('price')
const valorImovel = ref(300000)
const entrada = ref(60000)
const taxaJuros = ref(10.5)
const prazoAnos = ref(20)
const resultado = ref(null)

const calcular = () => {
  const imovel = Number(valorImovel.value)
  const ent = Number(entrada.value)
  const taxa = Number(taxaJuros.value) / 100 / 12
  const meses = Number(prazoAnos.value) * 12
  const financiado = imovel - ent

  if (financiado <= 0) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Valor da entrada não pode ser maior ou igual ao valor do imóvel' })
    return
  }

  let totalJuros = 0
  let primeiraParcela = 0
  let ultimaParcela = 0

  if (sistema.value === 'price') {
    primeiraParcela = financiado * (taxa * Math.pow(1 + taxa, meses)) / (Math.pow(1 + taxa, meses) - 1)
    ultimaParcela = primeiraParcela
    totalJuros = (primeiraParcela * meses) - financiado
  } else {
    const amortizacao = financiado / meses
    primeiraParcela = amortizacao + (financiado * taxa)
    ultimaParcela = amortizacao + (amortizacao * taxa)
    
    let saldo = financiado
    for (let i = 0; i < meses; i++) {
      totalJuros += saldo * taxa
      saldo -= amortizacao
    }
  }

  resultado.value = {
    valorFinanciado: financiado.toFixed(2),
    primeiraParcela: primeiraParcela.toFixed(2),
    ultimaParcela: ultimaParcela.toFixed(2),
    totalPago: (financiado + totalJuros).toFixed(2),
    totalJuros: totalJuros.toFixed(2)
  }

  trackToolUsage('Calculadora Imóvel', 'calculate')
}

const limpar = () => {
  valorImovel.value = 300000
  entrada.value = 60000
  taxaJuros.value = 10.5
  prazoAnos.value = 20
  resultado.value = null
}
</script>
