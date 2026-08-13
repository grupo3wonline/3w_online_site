<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
          <i class="fas fa-car text-purple-600 dark:text-purple-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Simulador de Financiamento de Carro</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule as parcelas do seu veículo</p>
      </div>

      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sistema de Amortização</label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button @click="sistema = 'price'" class="p-4 rounded-lg border-2 transition-all" :class="sistema === 'price' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-equals text-2xl mb-2 text-purple-600 dark:text-purple-400"></i>
              <div class="font-bold text-gray-900 dark:text-white">Tabela PRICE</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Parcelas fixas</div>
            </button>
            <button @click="sistema = 'sac'" class="p-4 rounded-lg border-2 transition-all" :class="sistema === 'sac' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-300 dark:border-gray-600'">
              <i class="fas fa-chart-line text-2xl mb-2 text-purple-600 dark:text-purple-400"></i>
              <div class="font-bold text-gray-900 dark:text-white">SAC</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">Parcelas decrescentes</div>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="valorVeiculo" label="Valor do Veículo (R$)" type="number" :min="0" step="1000" icon="fa-solid fa-tag" />
          <BaseInput v-model="valorEntrada" label="Entrada (R$)" type="number" :min="0" step="1000" icon="fa-solid fa-hand-holding-dollar" />
          <BaseInput v-model="prazoMeses" label="Prazo (meses)" type="number" :min="6" :max="60" icon="fa-solid fa-calendar" />
          <BaseInput v-model="taxaJuros" label="Taxa de Juros (% a.m.)" type="number" step="0.1" icon="fa-solid fa-percentage" />
        </div>

        <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Valor a Financiar</div>
          <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">R$ {{ valorFinanciado.toFixed(2) }}</div>
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>
          Calcular Financiamento
        </BaseButton>

        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">{{ sistema === 'price' ? 'Parcela Fixa' : 'Primeira Parcela' }}</div>
            <div class="text-5xl font-bold mb-2">R$ {{ resultado.primeiraParcela }}</div>
            <div class="text-purple-100">{{ prazoMeses }} meses</div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">R$ {{ resultado.valorTotal }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Total a Pagar</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">R$ {{ resultado.totalJuros }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Total Juros</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">R$ {{ resultado.custoEfetivo }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Custo Total</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ resultado.taxaEfetiva }}%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">CET (a.a.)</div>
            </div>
          </div>

          <div v-if="sistema === 'sac'" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Última Parcela (SAC)</div>
            <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">R$ {{ resultado.ultimaParcela }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-500 mt-1">Redução de R$ {{ resultado.reducao }} da primeira para última parcela</div>
          </div>

          <div class="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4">
            <div class="flex">
              <i class="fas fa-info-circle text-purple-600 dark:text-purple-400 mt-1 mr-3"></i>
              <div class="text-sm text-purple-800 dark:text-purple-300">
                <p class="font-semibold mb-2">Dicas para financiamento:</p>
                <ul class="list-disc list-inside space-y-1 text-xs">
                  <li><strong>Entrada maior:</strong> Dê a maior entrada possível para reduzir juros</li>
                  <li><strong>Prazo menor:</strong> Quanto menor o prazo, menos juros você paga</li>
                  <li><strong>PRICE vs SAC:</strong> PRICE tem parcelas fixas, SAC economiza juros no longo prazo</li>
                  <li><strong>Taxas:</strong> Compare CET (Custo Efetivo Total) entre bancos</li>
                  <li><strong>Seguros:</strong> O CET inclui seguros e tarifas obrigatórias</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseInput from './common/BaseInput.vue'
import BaseButton from './common/BaseButton.vue'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const sistema = ref('price')
const valorVeiculo = ref(50000)
const valorEntrada = ref(10000)
const prazoMeses = ref(48)
const taxaJuros = ref(1.99)
const resultado = ref(null)

const valorFinanciado = computed(() => {
  return Number(valorVeiculo.value) - Number(valorEntrada.value)
})

const calcular = () => {
  const valor = valorFinanciado.value
  const prazo = Number(prazoMeses.value)
  const taxa = Number(taxaJuros.value) / 100
  
  let primeiraParcela = 0
  let totalPago = 0
  let ultimaParcela = 0
  
  if (sistema.value === 'price') {
    primeiraParcela = valor * (taxa * Math.pow(1 + taxa, prazo)) / (Math.pow(1 + taxa, prazo) - 1)
    totalPago = primeiraParcela * prazo
    ultimaParcela = primeiraParcela
  } else {
    const amortizacao = valor / prazo
    primeiraParcela = amortizacao + (valor * taxa)
    
    let saldo = valor
    totalPago = 0
    for (let i = 0; i < prazo; i++) {
      const juros = saldo * taxa
      const parcela = amortizacao + juros
      totalPago += parcela
      saldo -= amortizacao
      if (i === prazo - 1) ultimaParcela = parcela
    }
  }
  
  const totalJuros = totalPago - valor
  const entrada = Number(valorEntrada.value)
  const custoEfetivo = totalPago + entrada
  const taxaAnual = (Math.pow(1 + taxa, 12) - 1) * 100

  resultado.value = {
    primeiraParcela: primeiraParcela.toFixed(2),
    ultimaParcela: ultimaParcela.toFixed(2),
    valorTotal: totalPago.toFixed(2),
    totalJuros: totalJuros.toFixed(2),
    custoEfetivo: custoEfetivo.toFixed(2),
    taxaEfetiva: taxaAnual.toFixed(2),
    reducao: sistema.value === 'sac' ? (primeiraParcela - ultimaParcela).toFixed(2) : '0.00'
  }

  trackToolUsage('Simulador Financiamento Carro', 'calculate', { sistema: sistema.value })
}
</script>
