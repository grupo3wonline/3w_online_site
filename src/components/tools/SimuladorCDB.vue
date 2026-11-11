<template>
  <ToolShell
    title="Simulador de CDB"
    description="Calcule o rendimento líquido de CDBs pós-fixados e pré-fixados com IR regressivo e comparação com poupança."
    icon="fa-landmark"
    icon-gradient="from-blue-500 to-indigo-700"
    orb-color="blue"
    :quick-tips="['Tabela IR regressiva', '% CDI personalizável', 'Garantido pelo FGC']"
    :tips="[
      { title: 'IR Regressivo', text: 'Quanto maior o prazo, menor o IR: 22,5% (até 180d) → 20% → 17,5% → 15% (acima de 720d).', type: 'info' },
      { title: '100% do CDI', text: 'Um CDB de 100% do CDI rende aproximadamente igual à SELIC menos 0,1%. Prefira 110%+ CDI para superar.', type: 'info' },
      { title: 'FGC protege até R$ 250k', text: 'O Fundo Garantidor de Créditos cobre CDBs até R$ 250.000 por CPF por instituição financeira.', type: 'success' },
    ]"
    :examples="[
      { title: 'CDB 100% CDI, 1 ano', desc: 'R$ 10.000 | 100% CDI | CDI 11% | 12 meses', result: 'Bruto: R$ 11.100 | Líquido: ~R$ 10.880 (IR 20%)' },
      { title: 'CDB 110% CDI, 2 anos', desc: 'R$ 50.000 | 110% CDI | CDI 11% | 24 meses', result: 'Bruto: ~R$ 62.700 | Líquido: ~R$ 60.900 (IR 17,5%)' },
      { title: 'Longo prazo, 3 anos', desc: 'R$ 100.000 | 105% CDI | CDI 11% | 36 meses', result: 'IR cai para 15% — maior eficiência fiscal' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0 space-y-4">
          <div class="grid grid-cols-2 gap-3">
            <BaseInput v-model="valorInvestido" label="Valor a Investir (R$)" type="number" :min="0"   step="1000"  icon="fa-money-bill" tooltip="Capital inicial a aplicar no CDB." />
            <BaseInput v-model="prazoMeses"     label="Prazo (meses)"         type="number" :min="1"   :max="120"  icon="fa-calendar"   tooltip="Prazo de vencimento do CDB em meses." hint="1 a 120 meses" />
            <BaseInput v-model="percentualCDI"  label="% do CDI"              type="number" :min="50"  :max="150"  step="5"             icon="fa-percentage" tooltip="Percentual do CDI que o CDB remunera. Ex: 110% CDI." />
            <BaseInput v-model="cdiAnual"       label="CDI Anual (%)"         type="number" :min="0"   :max="20"   step="0.25"          icon="fa-chart-line" tooltip="Taxa CDI anual atual. Consulte B3 ou Banco Central para o valor vigente." />
          </div>

          <!-- Tipo de CDB -->
          <div>
            <label class="input-aurora-label mb-2">
              <i class="fas fa-landmark mr-1.5 text-blue-500"></i>
              Tipo de CDB
            </label>
            <div class="grid grid-cols-2 gap-3">
              <button
                @click="tipoCDB = 'posfixado'"
                :class="['p-3 rounded-xl border-2 transition-all text-left', tipoCDB === 'posfixado' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-slate-700 hover:border-blue-300']"
              >
                <div class="font-bold text-sm text-gray-900 dark:text-white">Pós-fixado (CDI)</div>
                <div class="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Varia conforme o CDI — mais comum</div>
              </button>
              <button
                @click="tipoCDB = 'prefixado'"
                :class="['p-3 rounded-xl border-2 transition-all text-left', tipoCDB === 'prefixado' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-slate-700 hover:border-blue-300']"
              >
                <div class="font-bold text-sm text-gray-900 dark:text-white">Pré-fixado</div>
                <div class="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Taxa definida na contratação</div>
              </button>
            </div>
          </div>

          <!-- Alíquota que será aplicada -->
          <div class="glass-panel p-3 flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-slate-300">Alíquota IR prevista ({{ prazoMeses }} meses)</span>
            <span class="font-black text-blue-600 dark:text-blue-400">{{ aliquotaPrevia }}%</span>
          </div>

          <div class="flex gap-3">
            <BaseButton variant="primary" icon="fa-calculator" @click="calcular" class="flex-1">Calcular CDB</BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="resultado = null">Limpar</BaseButton>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">Valor Líquido Final</p>
              <p class="text-5xl font-black text-white mb-2">{{ fmtBRL(resultado.valorLiquido) }}</p>
              <p class="text-emerald-300 text-sm font-semibold">
                <i class="fas fa-arrow-up mr-1"></i>+{{ fmtBRL(resultado.rendimentoLiquido) }} líquido ({{ resultado.rentabilidadeLiquida }}%)
              </p>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ fmtBRL(resultado.valorBruto) }}</div>
                <div class="metric-glass-label">Valor Bruto</div>
              </div>
              <div class="metric-glass ring-1 ring-green-100 dark:ring-green-900">
                <div class="metric-glass-value text-green-600 dark:text-green-400">{{ fmtBRL(resultado.rendimentoBruto) }}</div>
                <div class="metric-glass-label">Rendimento Bruto</div>
              </div>
              <div class="metric-glass ring-1 ring-red-100 dark:ring-red-900">
                <div class="metric-glass-value text-red-600 dark:text-red-400">{{ fmtBRL(resultado.impostoRenda) }}</div>
                <div class="metric-glass-label">IR ({{ resultado.aliquotaIR }}%)</div>
              </div>
              <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
                <div class="metric-glass-value text-emerald-600 dark:text-emerald-400">{{ resultado.rentabilidadeLiquida }}%</div>
                <div class="metric-glass-label">Rentabilidade Líquida</div>
              </div>
            </div>

            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-list-check text-blue-500"></i>Tabela IR Regressiva
              </h4>
              <div class="space-y-1.5 text-xs">
                <div v-for="faixa in faixasIR" :key="faixa.label"
                  :class="['flex justify-between py-1.5 px-2 rounded-lg border', faixa.ativa ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 font-bold' : 'border-transparent']">
                  <span :class="faixa.ativa ? 'text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-slate-300'">{{ faixa.label }}</span>
                  <span :class="faixa.ativa ? 'text-blue-700 dark:text-blue-300' : 'text-gray-900 dark:text-white'">{{ faixa.aliquota }}%</span>
                </div>
              </div>
            </div>

            <div class="tip-card-success">
              <i class="fas fa-shield-halved text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">CDBs são garantidos pelo FGC até R$ 250.000 por CPF por instituição. Seguros para a renda fixa.</span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-landmark text-4xl mb-3 opacity-30 block text-blue-400"></i>
          <p class="text-sm">Configure o CDB e clique em Calcular</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, computed } from 'vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

interface ResultadoCDB {
  valorBruto: number; rendimentoBruto: number; impostoRenda: number
  aliquotaIR: number; valorLiquido: number; rentabilidadeLiquida: string
  rendimentoLiquido: number
}

const valorInvestido = ref<number | ''>(10000)
const prazoMeses     = ref<number | ''>(12)
const percentualCDI  = ref<number | ''>(100)
const cdiAnual       = ref<number | ''>(11)
const tipoCDB        = ref<'posfixado' | 'prefixado'>('posfixado')
const resultado      = ref<ResultadoCDB | null>(null)

const fmtBRL = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const getAliquota = (meses: number) => {
  if (meses <= 6)  return 22.5
  if (meses <= 12) return 20
  if (meses <= 24) return 17.5
  return 15
}

const aliquotaPrevia = computed(() => getAliquota(Number(prazoMeses.value) || 0))

const faixasIR = computed(() => {
  const p = Number(prazoMeses.value) || 0
  return [
    { label: 'Até 180 dias (6 meses)',    aliquota: 22.5, ativa: p <= 6  },
    { label: '181 a 360 dias (12 meses)', aliquota: 20,   ativa: p > 6 && p <= 12 },
    { label: '361 a 720 dias (24 meses)', aliquota: 17.5, ativa: p > 12 && p <= 24 },
    { label: 'Acima de 720 dias',         aliquota: 15,   ativa: p > 24 },
  ]
})

const calcular = () => {
  const valor    = Number(valorInvestido.value) || 0
  const prazo    = Number(prazoMeses.value) || 0
  const percCDI  = Number(percentualCDI.value) / 100
  const cdi      = Number(cdiAnual.value) / 100

  const taxaEfet = cdi * percCDI
  const taxaMes  = Math.pow(1 + taxaEfet, 1/12) - 1
  const valorBruto = valor * Math.pow(1 + taxaMes, prazo)
  const rendBruto  = valorBruto - valor
  const aliquota   = getAliquota(prazo)
  const ir         = rendBruto * (aliquota / 100)
  const liquido    = valorBruto - ir
  const rendLiq    = liquido - valor
  const rentLiq    = ((liquido / valor - 1) * 100).toFixed(2)

  resultado.value = { valorBruto, rendimentoBruto: rendBruto, impostoRenda: ir, aliquotaIR: aliquota, valorLiquido: liquido, rentabilidadeLiquida: rentLiq, rendimentoLiquido: rendLiq }
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>

