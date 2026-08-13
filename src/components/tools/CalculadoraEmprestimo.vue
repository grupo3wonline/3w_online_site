<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-4">
          <i class="fas fa-hand-holding-dollar text-emerald-600 dark:text-emerald-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calculadora de Empréstimo</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule parcelas, juros e custo total do empréstimo</p>
      </div>

      <div class="space-y-6">
        <!-- Sistema de Amortização -->
        <div class="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <button
            @click="sistema = 'price'"
            class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors"
            :class="sistema === 'price' ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'"
          >
            <div class="font-bold mb-1">Tabela PRICE</div>
            <div class="text-xs">Parcelas fixas</div>
          </button>
          <button
            @click="sistema = 'sac'"
            class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors"
            :class="sistema === 'sac' ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'"
          >
            <div class="font-bold mb-1">SAC</div>
            <div class="text-xs">Parcelas decrescentes</div>
          </button>
        </div>

        <!-- Valores do Empréstimo -->
        <div class="space-y-4">
          <BaseInput
            v-model="valorEmprestimo"
            label="Valor do Empréstimo (R$)"
            type="number"
            :min="100"
            step="100"
            icon="fa-solid fa-dollar-sign"
          />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInput
              v-model="taxaJuros"
              label="Taxa de Juros (% ao mês)"
              type="number"
              :min="0"
              step="0.01"
              icon="fa-solid fa-percent"
            />

            <BaseInput
              v-model="numeroParcelas"
              label="Número de Parcelas"
              type="number"
              :min="1"
              :max="360"
              icon="fa-solid fa-calendar"
            />
          </div>
        </div>

        <!-- Botões -->
        <div class="flex gap-4">
          <BaseButton @click="calcular" variant="primary" class="flex-1">
            <i class="fas fa-calculator mr-2"></i>
            Calcular
          </BaseButton>
          <BaseButton @click="limpar" variant="outline">
            <i class="fas fa-eraser"></i>
          </BaseButton>
        </div>

        <!-- Resultado -->
        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Valor da Parcela</div>
            <div class="text-5xl font-bold mb-2">R$ {{ resultado.primeiraParcela }}</div>
            <div class="text-emerald-100">
              {{ sistema === 'price' ? 'Parcelas fixas' : `até R$ ${resultado.ultimaParcela}` }}
            </div>
          </div>

          <!-- Resumo -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">R$ {{ resultado.totalPago }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Total a Pagar</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">R$ {{ resultado.totalJuros }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Total de Juros</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{{ numeroParcelas }}x</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Parcelas</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{{ taxaJuros }}%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Taxa ao Mês</div>
            </div>
          </div>

          <!-- Tabela de Parcelas -->
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-semibold text-gray-900 dark:text-white">
                <i class="fas fa-table text-emerald-600 dark:text-emerald-400 mr-2"></i>
                Tabela de Amortização
              </h3>
              <BaseButton @click="baixarTabela" variant="outline" size="sm">
                <i class="fas fa-download mr-2"></i>
                Baixar
              </BaseButton>
            </div>

            <div class="overflow-x-auto max-h-96 overflow-y-auto">
              <table class="w-full text-sm">
                <thead class="bg-emerald-600 text-white sticky top-0">
                  <tr>
                    <th class="p-3 text-left">Parcela</th>
                    <th class="p-3 text-right">Valor</th>
                    <th class="p-3 text-right">Juros</th>
                    <th class="p-3 text-right">Amortização</th>
                    <th class="p-3 text-right">Saldo</th>
                  </tr>
                </thead>
                <tbody class="text-gray-900 dark:text-white">
                  <tr v-for="(parcela, index) in resultado.parcelas" :key="index" class="border-b border-gray-200 dark:border-gray-600">
                    <td class="p-3">{{ parcela.numero }}</td>
                    <td class="p-3 text-right font-medium">R$ {{ parcela.valor }}</td>
                    <td class="p-3 text-right text-red-600 dark:text-red-400">R$ {{ parcela.juros }}</td>
                    <td class="p-3 text-right text-blue-600 dark:text-blue-400">R$ {{ parcela.amortizacao }}</td>
                    <td class="p-3 text-right">R$ {{ parcela.saldo }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Comparação -->
          <div class="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 p-4">
            <div class="flex">
              <i class="fas fa-info-circle text-emerald-600 dark:text-emerald-400 mt-1 mr-3"></i>
              <div class="text-sm text-emerald-800 dark:text-emerald-300">
                <p class="font-semibold mb-2">Entenda o Sistema {{ sistema === 'price' ? 'PRICE' : 'SAC' }}:</p>
                <p v-if="sistema === 'price'">
                  Na Tabela PRICE, as parcelas são fixas. Os juros diminuem e a amortização aumenta ao longo do tempo. 
                  É ideal para quem prefere previsibilidade no orçamento mensal.
                </p>
                <p v-else>
                  No SAC, a amortização é fixa e as parcelas diminuem ao longo do tempo. 
                  Os juros são maiores no início, tornando-o mais econômico a longo prazo.
                </p>
              </div>
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

const { trackToolUsage, trackConversion } = useAnalytics()

const sistema = ref('price')
const valorEmprestimo = ref(50000)
const taxaJuros = ref(1.5)
const numeroParcelas = ref(24)
const resultado = ref(null)

const calcular = () => {
  const valor = Number(valorEmprestimo.value)
  const taxa = Number(taxaJuros.value) / 100
  const parcelas = Number(numeroParcelas.value)

  if (valor <= 0 || taxa <= 0 || parcelas <= 0) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Preencha todos os campos corretamente' })
    return
  }

  const tabelaParcelas = []
  let saldoDevedor = valor
  let totalJuros = 0

  if (sistema.value === 'price') {
    // Tabela PRICE - parcelas fixas
    const valorParcela = valor * (taxa * Math.pow(1 + taxa, parcelas)) / (Math.pow(1 + taxa, parcelas) - 1)

    for (let i = 1; i <= parcelas; i++) {
      const juros = saldoDevedor * taxa
      const amortizacao = valorParcela - juros
      saldoDevedor -= amortizacao
      totalJuros += juros

      tabelaParcelas.push({
        numero: i,
        valor: valorParcela.toFixed(2),
        juros: juros.toFixed(2),
        amortizacao: amortizacao.toFixed(2),
        saldo: Math.max(0, saldoDevedor).toFixed(2)
      })
    }

    resultado.value = {
      primeiraParcela: valorParcela.toFixed(2),
      ultimaParcela: valorParcela.toFixed(2),
      totalPago: (valorParcela * parcelas).toFixed(2),
      totalJuros: totalJuros.toFixed(2),
      parcelas: tabelaParcelas
    }
  } else {
    // SAC - parcelas decrescentes
    const amortizacao = valor / parcelas
    const parcelasArray = []

    for (let i = 1; i <= parcelas; i++) {
      const juros = saldoDevedor * taxa
      const valorParcela = amortizacao + juros
      saldoDevedor -= amortizacao
      totalJuros += juros

      parcelasArray.push({
        numero: i,
        valor: valorParcela.toFixed(2),
        juros: juros.toFixed(2),
        amortizacao: amortizacao.toFixed(2),
        saldo: Math.max(0, saldoDevedor).toFixed(2)
      })
    }

    resultado.value = {
      primeiraParcela: parcelasArray[0].valor,
      ultimaParcela: parcelasArray[parcelasArray.length - 1].valor,
      totalPago: (valor + totalJuros).toFixed(2),
      totalJuros: totalJuros.toFixed(2),
      parcelas: parcelasArray
    }
  }

  trackToolUsage('Calculadora Empréstimo', 'calculate')
}

const baixarTabela = () => {
  let conteudo = `TABELA DE AMORTIZAÇÃO - ${sistema.value.toUpperCase()}\n\n`
  conteudo += `Valor do Empréstimo: R$ ${Number(valorEmprestimo.value).toFixed(2)}\n`
  conteudo += `Taxa de Juros: ${taxaJuros.value}% ao mês\n`
  conteudo += `Número de Parcelas: ${numeroParcelas.value}\n`
  conteudo += `Total a Pagar: R$ ${resultado.value.totalPago}\n`
  conteudo += `Total de Juros: R$ ${resultado.value.totalJuros}\n\n`
  conteudo += `Parcela\tValor\t\tJuros\t\tAmortização\tSaldo\n`
  conteudo += `${'-'.repeat(80)}\n`

  resultado.value.parcelas.forEach(p => {
    conteudo += `${p.numero}\tR$ ${p.valor}\tR$ ${p.juros}\tR$ ${p.amortizacao}\tR$ ${p.saldo}\n`
  })

  const blob = new Blob([conteudo], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `emprestimo-${sistema.value}-${Date.now()}.txt`
  link.click()
  URL.revokeObjectURL(url)

  trackConversion('download', 'loan-table')
  Swal.fire({
    icon: 'success',
    title: 'Download iniciado!',
    timer: 1500,
    showConfirmButton: false
  })
}

const limpar = () => {
  valorEmprestimo.value = 50000
  taxaJuros.value = 1.5
  numeroParcelas.value = 24
  resultado.value = null
}
</script>
