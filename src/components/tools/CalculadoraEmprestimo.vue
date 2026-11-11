<template>
  <ToolShell
    title="Calculadora de Empréstimo"
    description="Calcule parcelas, juros e custo total pelos sistemas PRICE (parcelas fixas) e SAC (parcelas decrescentes)."
    icon="fa-hand-holding-dollar"
    icon-gradient="from-emerald-500 to-green-700"
    orb-color="emerald"
    :quick-tips="['PRICE e SAC', 'Tabela de amortização', 'Download em TXT']"
    :tips="[
      { title: 'PRICE vs SAC', text: 'PRICE: parcelas iguais, mais juros no total. SAC: amortização fixa, parcelas decrescentes, menos juros no total — porém a primeira parcela é maior.' },
      { title: 'CET — Custo Efetivo Total', text: 'O CET inclui taxas, seguros e tarifas além dos juros. Sempre compare o CET ao contratar empréstimos, não apenas a taxa de juros.', type: 'warning' },
      { title: 'Juros compostos', text: 'Uma taxa de 1,5% ao mês equivale a ~19,56% ao ano (não simplesmente 18%). Atente-se ao período da taxa informada pelo banco.', type: 'info' },
    ]"
    :examples="[
      { title: 'Empréstimo pessoal', desc: 'R$ 20.000, 2% a.m., 24 parcelas, PRICE',  result: 'Parcela fixa: R$ 1.009,69 | Total pago: R$ 24.232,56' },
      { title: 'Financiamento SAC',  desc: 'R$ 50.000, 1,5% a.m., 36 parcelas, SAC',  result: '1ª parcela: R$ 2.138,89 | Última: R$ 1.395,83' },
    ]"
  >

    <!-- Sistema de amortização -->
    <div class="tool-section mb-4">
      <label class="input-aurora-label mb-2">
        <i class="fas fa-sliders mr-1.5 text-emerald-500"></i>
        Sistema de amortização
      </label>
      <div class="grid grid-cols-2 gap-3">
        <button
          :class="['p-4 rounded-xl border-2 text-center transition-all',
            sistema === 'price' ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600 hover:border-emerald-400 text-gray-700 dark:text-slate-200']"
          @click="sistema = 'price'"
        >
          <div class="font-black text-sm">Tabela PRICE</div>
          <div class="text-xs opacity-70 mt-0.5">Parcelas fixas</div>
        </button>
        <button
          :class="['p-4 rounded-xl border-2 text-center transition-all',
            sistema === 'sac' ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600 hover:border-emerald-400 text-gray-700 dark:text-slate-200']"
          @click="sistema = 'sac'"
        >
          <div class="font-black text-sm">SAC</div>
          <div class="text-xs opacity-70 mt-0.5">Parcelas decrescentes</div>
        </button>
      </div>
    </div>

    <!-- Formulário -->
    <div class="tool-body">
      <div class="space-y-3">
        <BaseInput v-model="valorEmprestimo" label="Valor do Empréstimo (R$)" type="number"
          icon="fa-dollar-sign" placeholder="50000" :min="100" step="100"
          tooltip="Valor total a ser emprestado/financiado." @input="calcularAuto" />
        <div class="grid grid-cols-2 gap-3">
          <BaseInput v-model="taxaJuros" label="Taxa de Juros (% a.m.)" type="number"
            icon="fa-percent" placeholder="1.5" :min="0.01" step="0.01"
            tooltip="Taxa mensal de juros cobrada. Para taxa anual, divida por 12 para ter a equivalência simples." @input="calcularAuto" />
          <BaseInput v-model="numeroParcelas" label="Nº de Parcelas" type="number"
            icon="fa-calendar-alt" placeholder="24" :min="1" :max="360" @input="calcularAuto" />
        </div>
      </div>
      <div class="flex gap-3 mt-4">
        <BaseButton variant="success" icon="fa-calculator" @click="calcular" class="flex-1">
          Calcular Empréstimo
        </BaseButton>
        <BaseButton variant="outline" icon="fa-eraser" @click="limpar">
          Limpar
        </BaseButton>
      </div>
    </div>

    <!-- Resultado -->
    <Transition name="scale-in">
      <div v-if="resultado" class="mt-4 space-y-4">

        <!-- Destaque principal -->
        <div class="tool-header text-center py-7">
          <p class="text-blue-200 text-sm mb-1">{{ sistema === 'price' ? 'Parcela Fixa' : '1ª Parcela' }}</p>
          <p class="text-5xl font-black text-white mb-2">{{ fmt(Number(resultado.primeiraParcela)) }}</p>
          <p v-if="sistema === 'sac'" class="text-emerald-300 text-sm font-semibold">
            Última parcela: {{ fmt(Number(resultado.ultimaParcela)) }}
          </p>
        </div>

        <!-- Métricas -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
            <div class="metric-glass-value text-emerald-600 dark:text-emerald-400">{{ fmt(Number(resultado.totalPago)) }}</div>
            <div class="metric-glass-label">Total a pagar</div>
          </div>
          <div class="metric-glass ring-1 ring-red-100 dark:ring-red-900">
            <div class="metric-glass-value text-red-500">{{ fmt(Number(resultado.totalJuros)) }}</div>
            <div class="metric-glass-label">Total de juros</div>
          </div>
          <div class="metric-glass">
            <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ numeroParcelas }}×</div>
            <div class="metric-glass-label">Parcelas</div>
          </div>
          <div class="metric-glass">
            <div class="metric-glass-value text-purple-600 dark:text-purple-400">{{ taxaJuros }}%</div>
            <div class="metric-glass-label">a.m.</div>
          </div>
        </div>

        <!-- CET estimado -->
        <div class="tip-card">
          <i class="fas fa-info-circle text-blue-500 flex-shrink-0 mt-0.5"></i>
          <span class="text-xs">
            O custo dos juros representa <strong>{{ pctJuros }}%</strong> do valor emprestado.
            Sistema <strong>{{ sistema === 'price' ? 'PRICE' : 'SAC' }}</strong>:
            {{ sistema === 'price' ? 'parcelas iguais, ideal para planejamento de orçamento fixo.' : 'amortização fixa, parcelas decrescentes — menos juros no total.' }}
          </span>
        </div>

        <!-- Tabela de parcelas -->
        <div class="glass-panel overflow-hidden">
          <div class="flex items-center justify-between p-4 border-b border-gray-100 dark:border-slate-700">
            <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 flex items-center gap-2">
              <i class="fas fa-table text-emerald-500"></i>
              Tabela de Amortização ({{ resultado.parcelas.length }} parcelas)
            </h4>
            <button @click="baixarTabela" class="copy-btn">
              <i class="fas fa-download text-xs"></i>
              Baixar TXT
            </button>
          </div>
          <div class="overflow-x-auto max-h-72 overflow-y-auto">
            <table class="w-full text-xs">
              <thead class="bg-emerald-600 text-white sticky top-0">
                <tr>
                  <th class="p-2.5 text-left">#</th>
                  <th class="p-2.5 text-right">Parcela</th>
                  <th class="p-2.5 text-right">Juros</th>
                  <th class="p-2.5 text-right">Amort.</th>
                  <th class="p-2.5 text-right">Saldo</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in resultado.parcelas" :key="p.numero"
                  class="border-b border-gray-100 dark:border-slate-700/50 hover:bg-primary-50/30 dark:hover:bg-primary-900/10 transition-colors">
                  <td class="p-2.5 font-mono font-bold text-gray-500 dark:text-slate-400">{{ p.numero }}</td>
                  <td class="p-2.5 text-right font-semibold text-gray-900 dark:text-white font-mono">R$ {{ p.valor }}</td>
                  <td class="p-2.5 text-right text-red-500 font-mono">R$ {{ p.juros }}</td>
                  <td class="p-2.5 text-right text-blue-600 dark:text-blue-400 font-mono">R$ {{ p.amortizacao }}</td>
                  <td class="p-2.5 text-right text-gray-600 dark:text-slate-300 font-mono">R$ {{ p.saldo }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Transition>

  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const sistema        = ref<'price' | 'sac'>('price')
const valorEmprestimo= ref<number | ''>(50000)
const taxaJuros      = ref<number | ''>(1.5)
const numeroParcelas = ref<number | ''>(24)

interface Parcela   { numero: number; valor: string; juros: string; amortizacao: string; saldo: string }
interface Resultado { primeiraParcela: string; ultimaParcela: string; totalPago: string; totalJuros: string; parcelas: Parcela[] }

const resultado = ref<Resultado | null>(null)
const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const pctJuros = computed(() => {
  if (!resultado.value) return 0
  const v = Number(valorEmprestimo.value) || 1
  return ((Number(resultado.value.totalJuros) / v) * 100).toFixed(1)
})

function calcular() {
  const valor   = Number(valorEmprestimo.value) || 0
  const taxa    = (Number(taxaJuros.value) || 0) / 100
  const parc    = Number(numeroParcelas.value) || 0
  if (!valor || !taxa || !parc) return

  const parcelas: Parcela[] = []
  let saldo      = valor
  let totalJuros = 0

  if (sistema.value === 'price') {
    const pmt = valor * (taxa * Math.pow(1 + taxa, parc)) / (Math.pow(1 + taxa, parc) - 1)
    for (let i = 1; i <= parc; i++) {
      const j = saldo * taxa; const a = pmt - j; saldo -= a; totalJuros += j
      parcelas.push({ numero: i, valor: pmt.toFixed(2), juros: j.toFixed(2), amortizacao: a.toFixed(2), saldo: Math.max(0, saldo).toFixed(2) })
    }
    resultado.value = { primeiraParcela: pmt.toFixed(2), ultimaParcela: pmt.toFixed(2), totalPago: (pmt * parc).toFixed(2), totalJuros: totalJuros.toFixed(2), parcelas }
  } else {
    const amort = valor / parc
    for (let i = 1; i <= parc; i++) {
      const j = saldo * taxa; const pmt = amort + j; saldo -= amort; totalJuros += j
      parcelas.push({ numero: i, valor: pmt.toFixed(2), juros: j.toFixed(2), amortizacao: amort.toFixed(2), saldo: Math.max(0, saldo).toFixed(2) })
    }
    resultado.value = {
      primeiraParcela: parcelas[0].valor,
      ultimaParcela:   parcelas[parcelas.length - 1].valor,
      totalPago: (valor + totalJuros).toFixed(2),
      totalJuros: totalJuros.toFixed(2),
      parcelas,
    }
  }
}

function calcularAuto() { if (valorEmprestimo.value && taxaJuros.value && numeroParcelas.value) calcular() }

function limpar() {
  valorEmprestimo.value = 50000; taxaJuros.value = 1.5
  numeroParcelas.value = 24; resultado.value = null
}

function baixarTabela() {
  if (!resultado.value) return
  let txt = `TABELA DE AMORTIZAÇÃO — ${sistema.value.toUpperCase()}\n`
  txt += `Valor: R$ ${valorEmprestimo.value} | Taxa: ${taxaJuros.value}% a.m. | Parcelas: ${numeroParcelas.value}\n\n`
  txt += `Parcela\tValor\tJuros\tAmortização\tSaldo\n`
  resultado.value.parcelas.forEach(p => { txt += `${p.numero}\tR$ ${p.valor}\tR$ ${p.juros}\tR$ ${p.amortizacao}\tR$ ${p.saldo}\n` })
  const blob = new Blob([txt], { type: 'text/plain' })
  const url  = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url; link.download = `emprestimo-${sistema.value}-${Date.now()}.txt`; link.click()
  URL.revokeObjectURL(url)
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Download iniciado!', showConfirmButton: false, timer: 1500 })
}

calcularAuto()
watch([sistema, valorEmprestimo, taxaJuros, numeroParcelas], calcularAuto)
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.25s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>
