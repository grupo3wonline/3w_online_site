<template>
  <ToolShell
    title="Calculadora de Financiamento de Imóvel"
    description="Calcule financiamentos imobiliários pelos sistemas PRICE (parcelas fixas) e SAC (amortização constante)."
    icon="fa-house"
    icon-gradient="from-green-500 to-emerald-700"
    orb-color="emerald"
    :quick-tips="['PRICE e SAC', 'Tabela de parcelas', 'Total de juros']"
    :tips="[
      { title: 'Sistema SAC', text: 'Amortização constante: a parcela começa mais alta e diminui ao longo do tempo. Paga menos juros no total.', type: 'info' },
      { title: 'Sistema PRICE', text: 'Parcelas fixas durante todo o financiamento. Mais fácil de planejar, mas paga mais juros no total.', type: 'info' },
      { title: 'Entrada mínima', text: 'Bancos geralmente exigem 20–30% de entrada (ou 10% pelo FGTS). Quanto maior a entrada, menores as parcelas e os juros totais.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Apartamento PRICE', desc: 'R$ 300k, entrada 20%, 10,5% a.a., 20 anos', result: 'Parcela fixa: ~R$ 2.228 | Total juros: ~R$ 294k' },
      { title: 'Casa SAC', desc: 'R$ 400k, entrada 30%, 9% a.a., 30 anos', result: '1ª parcela: ~R$ 3.233 | Última: ~R$ 854' },
      { title: 'Quitação antecipada', desc: 'No SAC, pagar a mais reduz parcelas futuras e juros; no PRICE, reduz o prazo.', result: 'Consulte o banco sobre amortização extra' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="glass-panel p-4">
          <label class="input-aurora-label mb-3">
            <i class="fas fa-sliders mr-1.5 text-emerald-500"></i>
            Sistema de Amortização
          </label>
          <div class="grid grid-cols-2 gap-3">
            <button
              @click="sistema = 'price'"
              :class="['p-4 rounded-xl border-2 transition-all text-center', sistema === 'price' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-gray-200 dark:border-slate-600 hover:border-emerald-300']"
            >
              <i :class="['fas fa-equals text-2xl mb-2 block', sistema === 'price' ? 'text-emerald-600' : 'text-gray-400']"></i>
              <span :class="['text-sm font-bold', sistema === 'price' ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-600']">PRICE</span>
              <p class="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Parcelas fixas</p>
            </button>
            <button
              @click="sistema = 'sac'"
              :class="['p-4 rounded-xl border-2 transition-all text-center', sistema === 'sac' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-gray-200 dark:border-slate-600 hover:border-emerald-300']"
            >
              <i :class="['fas fa-arrow-down text-2xl mb-2 block', sistema === 'sac' ? 'text-emerald-600' : 'text-gray-400']"></i>
              <span :class="['text-sm font-bold', sistema === 'sac' ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-600']">SAC</span>
              <p class="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Parcelas decrescentes</p>
            </button>
          </div>
        </div>

        <div class="tool-body !mb-0 space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <BaseInput v-model="valorImovel" label="Valor do Imóvel (R$)" type="number" :min="50000" step="1000" icon="fa-house" tooltip="Valor total do imóvel a ser financiado." />
            <BaseInput v-model="entrada" label="Entrada (R$)" type="number" :min="0" step="1000" icon="fa-money-bill" tooltip="Valor que você pagará de entrada (mín. 20% geralmente)." />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <BaseInput v-model="taxaJuros" label="Taxa de Juros (% a.a.)" type="number" :min="0" step="0.01" icon="fa-percent" hint="Taxa anual do banco" />
            <BaseInput v-model="prazoAnos" label="Prazo (anos)" type="number" :min="1" :max="35" icon="fa-calendar" hint="Máximo 35 anos" />
          </div>

          <div class="flex gap-3">
            <BaseButton variant="success" icon="fa-calculator" @click="calcular" class="flex-1">
              Calcular
            </BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="limpar" />
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">{{ sistema === 'price' ? 'Parcela Mensal Fixa' : '1ª Parcela Mensal' }}</p>
              <p class="text-5xl font-black text-white mb-2">R$ {{ resultado.primeiraParcela }}</p>
              <p class="text-emerald-300 text-sm font-semibold">
                {{ sistema === 'price' ? 'Valor fixo durante todo o prazo' : `Decrescente até R$ ${resultado.ultimaParcela}` }}
              </p>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
                <span class="metric-glass-value text-emerald-600 dark:text-emerald-400">R$ {{ resultado.valorFinanciado }}</span>
                <span class="metric-glass-label">Valor Financiado</span>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <span class="metric-glass-value text-blue-600 dark:text-blue-400">R$ {{ resultado.totalPago }}</span>
                <span class="metric-glass-label">Total a Pagar</span>
              </div>
              <div class="metric-glass ring-1 ring-red-100 dark:ring-red-900">
                <span class="metric-glass-value text-red-600 dark:text-red-400">R$ {{ resultado.totalJuros }}</span>
                <span class="metric-glass-label">Total de Juros</span>
              </div>
              <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
                <span class="metric-glass-value text-purple-600 dark:text-purple-400">{{ prazoAnos }} anos</span>
                <span class="metric-glass-label">Prazo</span>
              </div>
            </div>

            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-list-check text-emerald-500"></i>
                Resumo do Financiamento
              </h4>
              <div class="space-y-1.5 text-sm">
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Valor do Imóvel</span>
                  <span class="font-bold text-gray-900 dark:text-white">R$ {{ Number(valorImovel).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Entrada</span>
                  <span class="font-bold text-gray-900 dark:text-white">R$ {{ Number(entrada).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</span>
                </div>
                <div class="flex justify-between py-1.5">
                  <span class="text-gray-600 dark:text-slate-300">Sistema</span>
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">{{ sistema.toUpperCase() }}</span>
                </div>
              </div>
            </div>

            <div class="tip-card">
              <i class="fas fa-lightbulb text-amber-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                No SAC você paga <strong>menos juros no total</strong>. No PRICE, as <strong>parcelas são previsíveis</strong> facilitando o planejamento.
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-house text-4xl mb-3 opacity-30 block text-emerald-400"></i>
          <p class="text-sm">Informe os dados do imóvel e do financiamento para calcular</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
// @ts-nocheck
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref } from 'vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import Swal from 'sweetalert2'

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
    Swal.fire({ icon: 'error', title: 'Erro', text: 'O valor da entrada não pode ser maior ou igual ao valor do imóvel', confirmButtonColor: '#2563eb' })
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
    valorFinanciado: financiado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    primeiraParcela: primeiraParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    ultimaParcela: ultimaParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    totalPago: (financiado + totalJuros).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    totalJuros: totalJuros.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  }
}

const limpar = () => {
  valorImovel.value = 300000
  entrada.value = 60000
  taxaJuros.value = 10.5
  prazoAnos.value = 20
  resultado.value = null
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
