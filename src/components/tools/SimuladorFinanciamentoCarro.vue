<template>
  <ToolShell
    title="Simulador de Financiamento de Carro"
    description="Simule financiamento de veículos com Tabela PRICE ou SAC, comparando o custo total e juros."
    icon="fa-car"
    icon-gradient="from-blue-500 to-indigo-700"
    orb-color="blue"
    :quick-tips="['PRICE vs SAC', 'CET anual', 'Entrada x parcelas']"
    :tips="[
      { title: 'Tabela PRICE vs SAC', text: 'PRICE: parcelas fixas, juros maiores no total. SAC: parcelas decrescentes, paga menos juros no longo prazo.', type: 'info' },
      { title: 'CET — Custo Efetivo Total', text: 'O CET inclui taxas, seguros e tarifas obrigatórias. Compare o CET anual entre bancos para escolher o melhor financiamento.' },
      { title: 'Entrada maior é melhor', text: 'Quanto maior a entrada, menor o valor financiado e menor o total pago em juros. Uma entrada de 30% pode economizar até 25% do total.', type: 'success' },
    ]"
    :examples="[
      { title: 'Carro R$ 50.000, PRICE', desc: 'Entrada R$ 10.000, 48 meses, 1,99% a.m.', result: 'Parcela: ~R$ 1.278, Total: R$ 61.344' },
      { title: 'Carro R$ 80.000, SAC', desc: 'Entrada R$ 20.000, 60 meses, 1,5% a.m.', result: '1ª parcela: ~R$ 1.900, última: ~R$ 1.040' },
      { title: 'Carro R$ 30.000, PRICE', desc: 'Entrada R$ 5.000, 36 meses, 1,2% a.m.', result: 'Parcela fixa: ~R$ 823, Total: R$ 29.628' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <div class="space-y-3">
            <!-- Sistema de Amortização -->
            <div>
              <label class="input-aurora-label">
                <i class="fas fa-sliders-h mr-1.5 text-blue-500"></i>
                Sistema de Amortização
              </label>
              <div class="grid grid-cols-2 gap-2 mt-1">
                <button
                  @click="sistema = 'price'"
                  :class="['p-3 rounded-xl border-2 transition-all text-center text-sm', sistema === 'price' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'border-gray-200 dark:border-slate-600 hover:border-blue-300']"
                >
                  <i class="fas fa-equals text-lg mb-1 block"></i>
                  <div class="font-bold">PRICE</div>
                  <div class="text-[10px] opacity-70">Parcelas fixas</div>
                </button>
                <button
                  @click="sistema = 'sac'"
                  :class="['p-3 rounded-xl border-2 transition-all text-center text-sm', sistema === 'sac' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'border-gray-200 dark:border-slate-600 hover:border-blue-300']"
                >
                  <i class="fas fa-chart-line text-lg mb-1 block"></i>
                  <div class="font-bold">SAC</div>
                  <div class="text-[10px] opacity-70">Parcelas decrescentes</div>
                </button>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <BaseInput
                v-model="valorVeiculo"
                label="Valor do Veículo (R$)"
                type="number" :min="0" step="1000"
                icon="fa-tag"
                placeholder="50000"
                tooltip="Valor total do veículo a ser financiado."
                @input="calcularAuto"
              />
              <BaseInput
                v-model="valorEntrada"
                label="Entrada (R$)"
                type="number" :min="0" step="1000"
                icon="fa-hand-holding-dollar"
                placeholder="10000"
                tooltip="Valor da entrada. Quanto maior, menores os juros totais."
                @input="calcularAuto"
              />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <BaseInput
                v-model="prazoMeses"
                label="Prazo (meses)"
                type="number" :min="6" :max="60"
                icon="fa-calendar"
                placeholder="48"
                hint="Mínimo 6, máximo 60 meses"
                @input="calcularAuto"
              />
              <BaseInput
                v-model="taxaJuros"
                label="Juros (% a.m.)"
                type="number" step="0.1"
                icon="fa-percentage"
                placeholder="1.99"
                hint="CDC médio: 0,99% a 3% a.m."
                tooltip="Taxa de juros mensal. Compare o CET entre diferentes bancos."
                @input="calcularAuto"
              />
            </div>

            <!-- Valor financiado -->
            <div class="glass-panel p-3">
              <div class="text-xs text-gray-500 dark:text-slate-400">Valor a financiar</div>
              <div class="text-2xl font-black text-blue-600 dark:text-blue-400">R$ {{ valorFinanciado.toFixed(2) }}</div>
            </div>
          </div>

          <div class="flex gap-3 mt-4">
            <BaseButton variant="success" icon="fa-calculator" @click="calcular" class="flex-1">
              Calcular
            </BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="limpar">
              Limpar
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">
            <!-- Destaque principal -->
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">{{ sistema === 'price' ? 'Parcela Fixa (PRICE)' : 'Primeira Parcela (SAC)' }}</p>
              <p class="text-5xl font-black text-white mb-2">R$ {{ resultado.primeiraParcela }}</p>
              <p class="text-indigo-300 text-sm font-semibold">
                <i class="fas fa-calendar-alt mr-1"></i>
                {{ prazoMeses }} meses · CET: {{ resultado.taxaEfetiva }}% a.a.
              </p>
            </div>

            <!-- Métricas -->
            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">R$ {{ resultado.valorTotal }}</div>
                <div class="metric-glass-label">Total a pagar</div>
              </div>
              <div class="metric-glass ring-1 ring-red-100 dark:ring-red-900">
                <div class="metric-glass-value text-red-600 dark:text-red-400">R$ {{ resultado.totalJuros }}</div>
                <div class="metric-glass-label">Total de juros</div>
              </div>
              <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
                <div class="metric-glass-value text-purple-600 dark:text-purple-400">R$ {{ resultado.custoEfetivo }}</div>
                <div class="metric-glass-label">Custo total (c/ entrada)</div>
              </div>
              <div v-if="sistema === 'sac'" class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <div class="metric-glass-value text-teal-600 dark:text-teal-400">R$ {{ resultado.ultimaParcela }}</div>
                <div class="metric-glass-label">Última parcela</div>
              </div>
              <div v-else class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <div class="metric-glass-value text-teal-600 dark:text-teal-400">{{ resultado.taxaEfetiva }}%</div>
                <div class="metric-glass-label">CET a.a.</div>
              </div>
            </div>

            <div v-if="sistema === 'sac'" class="tip-card">
              <i class="fas fa-info-circle text-blue-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                No SAC, a parcela cai de <strong>R$ {{ resultado.primeiraParcela }}</strong> para <strong>R$ {{ resultado.ultimaParcela }}</strong> — redução de R$ {{ resultado.reducao }}.
              </span>
            </div>

            <div class="tip-card-warning">
              <i class="fas fa-exclamation-triangle text-amber-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                Quanto maior a entrada e menor o prazo, menos juros você paga. Uma entrada de 30% pode economizar até 25% do custo total.
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-car text-4xl mb-3 opacity-30 block text-blue-400"></i>
          <p class="text-sm">Preencha os dados do veículo para simular o financiamento</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, computed, watch } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const sistema      = ref('price')
const valorVeiculo = ref(50000)
const valorEntrada = ref(10000)
const prazoMeses   = ref(48)
const taxaJuros    = ref(1.99)
const resultado    = ref(null)

const valorFinanciado = computed(() => Number(valorVeiculo.value) - Number(valorEntrada.value))

function calcular() {
  const valor = valorFinanciado.value
  const prazo = Number(prazoMeses.value)
  const taxa  = Number(taxaJuros.value) / 100

  if (valor <= 0) { Swal.fire({ icon: 'warning', title: 'Valor financiado inválido', text: 'A entrada não pode ser maior que o valor do veículo.', confirmButtonColor: '#2563eb' }); return }
  if (!prazo || !taxa) { Swal.fire({ icon: 'warning', title: 'Preencha todos os campos', confirmButtonColor: '#2563eb' }); return }

  let primeiraParcela = 0, totalPago = 0, ultimaParcela = 0

  if (sistema.value === 'price') {
    primeiraParcela = valor * (taxa * Math.pow(1 + taxa, prazo)) / (Math.pow(1 + taxa, prazo) - 1)
    totalPago = primeiraParcela * prazo
    ultimaParcela = primeiraParcela
  } else {
    const amortizacao = valor / prazo
    primeiraParcela = amortizacao + (valor * taxa)
    let saldo = valor; totalPago = 0
    for (let i = 0; i < prazo; i++) {
      const juros = saldo * taxa
      const parcela = amortizacao + juros
      totalPago += parcela
      saldo -= amortizacao
      if (i === prazo - 1) ultimaParcela = parcela
    }
  }

  const totalJuros   = totalPago - valor
  const entrada      = Number(valorEntrada.value)
  const custoEfetivo = totalPago + entrada
  const taxaAnual    = (Math.pow(1 + taxa, 12) - 1) * 100

  resultado.value = {
    primeiraParcela: primeiraParcela.toFixed(2),
    ultimaParcela:   ultimaParcela.toFixed(2),
    valorTotal:      totalPago.toFixed(2),
    totalJuros:      totalJuros.toFixed(2),
    custoEfetivo:    custoEfetivo.toFixed(2),
    taxaEfetiva:     taxaAnual.toFixed(2),
    reducao:         sistema.value === 'sac' ? (primeiraParcela - ultimaParcela).toFixed(2) : '0.00',
  }
}

function calcularAuto() {
  if (valorVeiculo.value && prazoMeses.value && taxaJuros.value) calcular()
}

function limpar() {
  valorVeiculo.value = 50000; valorEntrada.value = 10000; prazoMeses.value = 48
  taxaJuros.value = 1.99; sistema.value = 'price'; resultado.value = null
}

calcularAuto()
watch([sistema, valorVeiculo, valorEntrada, prazoMeses, taxaJuros], calcularAuto)
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
