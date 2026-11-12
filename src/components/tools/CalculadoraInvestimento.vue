<template>
  <ToolShell
    title="Calculadora de Investimento"
    description="Simule o crescimento de investimentos com aportes mensais e taxa de juros compostos."
    icon="fa-chart-line"
    icon-gradient="from-green-500 to-emerald-700"
    orb-color="emerald"
    :quick-tips="['Juros compostos reais', 'Aportes mensais', 'Rentabilidade total']"
    :tips="[
      { title: 'Rentabilidade real', text: 'Para obter a rentabilidade real, desconte a inflação da taxa nominal. Ex: 10% a.a. com 5% de inflação = ~4,76% real.', type: 'info' },
      { title: 'Benchmarks', text: 'Compare com CDI (~10% a.a.), SELIC, IPCA+6% e IBOVESPA (~10–15% a.a. histórico) para avaliar se seu investimento está competitivo.', type: 'info' },
      { title: 'Diversificação', text: 'Não concentre todo o capital em um único ativo. Diversifique entre renda fixa, ações e FIIs para equilibrar risco e retorno.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Poupança mensal', desc: 'R$ 0 inicial, R$ 500/mês, 7% a.a., 10 anos (120 meses)', result: 'Montante: ~R$ 86.800 | Rendimento: ~R$ 26.800' },
      { title: 'Tesouro Direto', desc: 'R$ 10.000 inicial, R$ 300/mês, 10% a.a., 5 anos', result: 'Montante: ~R$ 39.900 | Rentabilidade: 50%' },
      { title: 'Longo prazo', desc: 'R$ 50.000 inicial, R$ 1.000/mês, 12% a.a., 20 anos', result: 'Montante: ~R$ 1.780.000 | Rendimento: 87%' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="tool-body !mb-0 space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <BaseInput
            v-model="valorInicial"
            label="Valor Inicial (R$)"
            type="number"
            :min="0"
            step="100"
            icon="fa-dollar-sign"
            tooltip="Valor que você já possui para investir hoje."
          />
          <BaseInput
            v-model="aporteMensal"
            label="Aporte Mensal (R$)"
            type="number"
            :min="0"
            step="50"
            icon="fa-money-bill-transfer"
            tooltip="Quanto você vai adicionar mensalmente ao investimento."
          />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <BaseInput
            v-model="taxaJuros"
            label="Taxa de Juros (% a.a.)"
            type="number"
            :min="0"
            step="0.1"
            icon="fa-percent"
            hint="Taxa anual do investimento"
            tooltip="Rentabilidade anual esperada. CDI histórico: ~10% a.a."
          />
          <BaseInput
            v-model="prazoMeses"
            label="Prazo (meses)"
            type="number"
            :min="1"
            :max="600"
            icon="fa-calendar"
            hint="12 meses = 1 ano"
          />
        </div>

        <div class="flex gap-3">
          <BaseButton variant="success" icon="fa-chart-line" @click="calcular" class="flex-1">
            Simular Investimento
          </BaseButton>
          <BaseButton variant="outline" icon="fa-eraser" @click="limpar" />
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">Montante Final</p>
              <p class="text-5xl font-black text-white mb-2">R$ {{ resultado.montanteFinal }}</p>
              <p class="text-emerald-300 text-sm font-semibold">
                <i class="fas fa-arrow-up mr-1"></i>
                {{ resultado.rentabilidade }}% de rentabilidade total
              </p>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
                <span class="metric-glass-value text-emerald-600 dark:text-emerald-400">R$ {{ resultado.totalInvestido }}</span>
                <span class="metric-glass-label">Total Investido</span>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <span class="metric-glass-value text-blue-600 dark:text-blue-400">R$ {{ resultado.totalJuros }}</span>
                <span class="metric-glass-label">Rendimento</span>
              </div>
              <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
                <span class="metric-glass-value text-purple-600 dark:text-purple-400">{{ prazoMeses }}</span>
                <span class="metric-glass-label">Meses</span>
              </div>
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <span class="metric-glass-value text-teal-600 dark:text-teal-400">{{ resultado.rentabilidade }}%</span>
                <span class="metric-glass-label">Rentabilidade</span>
              </div>
            </div>

            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-list-check text-emerald-500"></i>
                Detalhamento
              </h4>
              <div class="space-y-1.5 text-sm">
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Capital inicial</span>
                  <span class="font-bold text-gray-900 dark:text-white">R$ {{ Number(valorInicial).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Aportes totais</span>
                  <span class="font-bold text-gray-900 dark:text-white">R$ {{ (Number(aporteMensal) * Number(prazoMeses)).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</span>
                </div>
                <div class="flex justify-between py-1.5">
                  <span class="text-gray-600 dark:text-slate-300">Juros compostos</span>
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">R$ {{ resultado.totalJuros }}</span>
                </div>
              </div>
            </div>

            <div class="tip-card-success">
              <i class="fas fa-seedling text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                Os juros compostos respondem por uma parte crescente do montante — quanto maior o prazo, mais eles dominam.
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-chart-line text-4xl mb-3 opacity-30 block text-emerald-400"></i>
          <p class="text-sm">Preencha os campos para simular o crescimento do investimento</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref } from 'vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

const valorInicial = ref(10000)
interface ResultadoInvestimento { montanteFinal: string; totalInvestido: string; totalJuros: string; rentabilidade: string }

const aporteMensal = ref(500)
const taxaJuros    = ref(10)
const prazoMeses   = ref(60)
const resultado    = ref<ResultadoInvestimento | null>(null)

const calcular = () => {
  const inicial = Number(valorInicial.value)
  const aporte = Number(aporteMensal.value)
  const taxa = Number(taxaJuros.value) / 100 / 12
  const meses = Number(prazoMeses.value)

  const montante = inicial * Math.pow(1 + taxa, meses) + aporte * ((Math.pow(1 + taxa, meses) - 1) / taxa)
  const totalInvestido = inicial + (aporte * meses)
  const totalJuros = montante - totalInvestido
  const rentabilidade = ((montante / totalInvestido - 1) * 100)

  resultado.value = {
    montanteFinal: montante.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    totalInvestido: totalInvestido.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    totalJuros: totalJuros.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    rentabilidade: rentabilidade.toFixed(2),
  }
}

const limpar = () => {
  valorInicial.value = 10000
  aporteMensal.value = 500
  taxaJuros.value = 10
  prazoMeses.value = 60
  resultado.value = null
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
