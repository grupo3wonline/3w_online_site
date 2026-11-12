<template>
  <ToolShell
    title="Simulador de Poupança"
    description="Simule o rendimento da poupança com aportes periódicos e taxa Selic vigente."
    icon="fa-piggy-bank"
    icon-gradient="from-sky-500 to-cyan-700"
    orb-color="blue"
    :quick-tips="['TR + 0,5% a.m. (Selic > 8,5%)', '70% da Selic (Selic ≤ 8,5%)', 'FGC: até R$ 250.000']"
    :tips="[
      { title: 'Regra da poupança', text: 'Quando a Selic é maior que 8,5% a.a.: rendimento = 0,5% ao mês + TR. Quando igual ou menor: 70% da Selic + TR.', type: 'info' },
      { title: 'Aniversário mensal', text: 'O rendimento da poupança só é creditado no dia do depósito (aniversário). Retirar antes do aniversário perde os juros do período.' },
      { title: 'Isenção de IR', text: 'A poupança é isenta de Imposto de Renda para pessoas físicas — uma vantagem em comparação a CDBs e Tesouro Direto.', type: 'success' },
    ]"
    :examples="[
      { title: 'R$ 5.000 iniciais + R$ 500/mês', desc: 'Selic 11,25% a.a., 24 meses', result: 'Saldo: ~R$ 18.800 (rentabilidade ~6%)' },
      { title: 'R$ 10.000, sem aportes', desc: 'Selic 13% a.a., 36 meses', result: 'Saldo: ~R$ 11.966 (juros ~R$ 1.966)' },
      { title: 'R$ 1.000 + R$ 200/mês', desc: 'Selic 10,5%, 60 meses', result: 'Saldo: ~R$ 16.300 (R$ 3.300 em juros)' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <div class="space-y-3">
            <BaseInput
              v-model="valorInicial"
              label="Valor Inicial (R$)"
              type="number" :min="0" step="100"
              icon="fa-money-bill"
              placeholder="5000"
              tooltip="Valor inicial depositado na poupança."
              @input="calcularAuto"
            />
            <BaseInput
              v-model="aporteMensal"
              label="Aporte Mensal (R$)"
              type="number" :min="0" step="50"
              icon="fa-calendar-plus"
              placeholder="500"
              hint="Quanto você deposita por mês (pode ser 0)"
              tooltip="Valor adicional depositado mensalmente na poupança."
              @input="calcularAuto"
            />
            <BaseInput
              v-model="meses"
              label="Período (meses)"
              type="number" :min="1" :max="360"
              icon="fa-clock"
              placeholder="24"
              hint="Máximo 360 meses (30 anos)"
              @input="calcularAuto"
            />
            <BaseInput
              v-model="taxaSelic"
              label="Taxa Selic Anual (%)"
              type="number" :min="0" :max="30" step="0.25"
              icon="fa-chart-line"
              placeholder="11.25"
              hint="Taxa Selic atual (referência para o cálculo)"
              tooltip="Informe a taxa Selic anual atual. Usada para calcular o rendimento da poupança."
              @input="calcularAuto"
            />
          </div>

          <!-- Indicador da regra aplicada -->
          <div :class="['glass-panel p-3 mt-3 text-xs font-medium flex items-center gap-2', Number(taxaSelic) > 8.5 ? 'text-emerald-700 dark:text-emerald-300' : 'text-blue-700 dark:text-blue-300']">
            <i :class="['fas', Number(taxaSelic) > 8.5 ? 'fa-check-circle text-emerald-500' : 'fa-info-circle text-blue-500']"></i>
            <span v-if="Number(taxaSelic) > 8.5">Selic &gt; 8,5% → Rendimento: <strong>0,5% a.m. + TR</strong></span>
            <span v-else>Selic ≤ 8,5% → Rendimento: <strong>70% da Selic + TR</strong></span>
          </div>

          <div class="flex gap-3 mt-4">
            <BaseButton variant="success" icon="fa-calculator" @click="calcular" class="flex-1">
              Calcular Rendimento
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
              <p class="text-sm text-blue-200 mb-1">Saldo Final da Poupança</p>
              <p class="text-5xl font-black text-white mb-2">R$ {{ resultado.saldoFinal }}</p>
              <p class="text-sky-300 text-sm font-semibold">
                <i class="fas fa-trending-up mr-1"></i>
                {{ meses }} meses · Rendimento: R$ {{ resultado.totalJuros }}
              </p>
            </div>

            <!-- Métricas -->
            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-sky-100 dark:ring-sky-900">
                <div class="metric-glass-value text-sky-600 dark:text-sky-400">R$ {{ resultado.totalInvestido }}</div>
                <div class="metric-glass-label">Total investido</div>
              </div>
              <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
                <div class="metric-glass-value text-emerald-600 dark:text-emerald-400">R$ {{ resultado.totalJuros }}</div>
                <div class="metric-glass-label">Rendimentos</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ resultado.rentabilidadePercentual }}%</div>
                <div class="metric-glass-label">Rentabilidade total</div>
              </div>
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <div class="metric-glass-value text-teal-600 dark:text-teal-400">{{ resultado.taxaMensal }}%</div>
                <div class="metric-glass-label">Taxa mensal</div>
              </div>
            </div>

            <!-- Composição -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-chart-pie text-sky-500"></i>
                Composição do Saldo
              </h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Depósito inicial</span>
                  <span class="font-bold">R$ {{ valorInicial }}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Aportes mensais ({{ meses }}×)</span>
                  <span class="font-bold">R$ {{ resultado.totalAportes }}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Rendimentos (isento IR)</span>
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">R$ {{ resultado.totalJuros }}</span>
                </div>
                <div class="flex justify-between py-1.5">
                  <span class="font-bold text-gray-900 dark:text-white">Saldo final</span>
                  <span class="font-black text-sky-600 dark:text-sky-400">R$ {{ resultado.saldoFinal }}</span>
                </div>
              </div>
            </div>

            <div class="tip-card-success">
              <i class="fas fa-shield-halved text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                Poupança isenta de IR e garantida pelo FGC até R$ 250.000 por CPF por instituição financeira.
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-piggy-bank text-4xl mb-3 opacity-30 block text-sky-400"></i>
          <p class="text-sm">Preencha os dados para simular o rendimento da poupança</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const valorInicial = ref(5000)
const aporteMensal = ref(500)
const meses        = ref(24)
interface ResultadoPoupanca {
  saldoFinal: string; totalInvestido: string; totalAportes: string
  totalJuros: string; rentabilidadePercentual: string; taxaMensal: string
}

const taxaSelic    = ref(11.25)
const resultado    = ref<ResultadoPoupanca | null>(null)

function calcular() {
  const inicial       = Number(valorInicial.value)
  const aporte        = Number(aporteMensal.value)
  const periodoMeses  = Number(meses.value)
  const selic         = Number(taxaSelic.value)

  if (!periodoMeses) { Swal.fire({ icon: 'warning', title: 'Informe o período em meses', confirmButtonColor: '#2563eb' }); return }

  let taxaMensalPoup = selic > 8.5 ? 0.5 : (selic / 100) * 0.70 / 12 * 100
  const taxaMensalDecimal = taxaMensalPoup / 100
  const totalAportes  = aporte * periodoMeses
  const totalInvestido = inicial + totalAportes

  let saldo = inicial
  for (let i = 0; i < periodoMeses; i++) {
    saldo = saldo * (1 + taxaMensalDecimal) + aporte
  }

  const totalJuros             = saldo - totalInvestido
  const rentabilidadePercentual = ((saldo / totalInvestido - 1) * 100)

  resultado.value = {
    saldoFinal:              saldo.toFixed(2),
    totalInvestido:          totalInvestido.toFixed(2),
    totalAportes:            totalAportes.toFixed(2),
    totalJuros:              totalJuros.toFixed(2),
    rentabilidadePercentual: rentabilidadePercentual.toFixed(2),
    taxaMensal:              taxaMensalPoup.toFixed(3),
  }
}

function calcularAuto() {
  if (meses.value && taxaSelic.value) calcular()
}

function limpar() {
  valorInicial.value = 5000; aporteMensal.value = 500; meses.value = 24
  taxaSelic.value = 11.25; resultado.value = null
}

calcularAuto()
watch([valorInicial, aporteMensal, meses, taxaSelic], calcularAuto)
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
