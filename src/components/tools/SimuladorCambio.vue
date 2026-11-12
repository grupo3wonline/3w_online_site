<template>
  <ToolShell
    title="Simulador de Câmbio"
    description="Calcule o custo real de operações de câmbio incluindo IOF, spread bancário e compare os métodos."
    icon="fa-money-bill-transfer"
    icon-gradient="from-violet-500 to-purple-700"
    orb-color="purple"
    :quick-tips="['IOF por tipo de operação', 'Spread do banco incluso', 'Compare 3 métodos']"
    :tips="[
      { title: 'IOF no câmbio', text: 'Cartão de crédito/débito tem IOF de 5,38%. Dinheiro em espécie: 1,1%. Transferência internacional (wire): 0,38%.', type: 'warning' },
      { title: 'VET - Valor Efetivo Total', text: 'O VET deve ser informado pela corretora ou banco. É o custo total incluindo cotação, spread e IOF.', type: 'info' },
      { title: 'Como economizar', text: 'Transferências internacionais têm o menor IOF. Evite saque no exterior com cartão (IOF 6,38%).', type: 'success' },
    ]"
    :examples="[
      { title: 'Comprar USD 1.000 no cartão', desc: 'USD 1.000 | Cotação R$ 5,00 | Spread 3% | Cartão', result: 'Total: ~R$ 5.550 (IOF 5,38% + spread 3%)' },
      { title: 'Enviar USD 1.000 (wire)', desc: 'USD 1.000 | Cotação R$ 5,00 | Spread 1% | Transferência', result: 'Total: ~R$ 5.070 (IOF 0,38% + spread 1%)' },
      { title: 'Diferença de IOF', desc: 'Mesmo valor, cartão vs. transferência', result: 'Economia de ~R$ 480 usando transferência' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0 space-y-4">
          <!-- Tipo de Operação -->
          <div>
            <label class="input-aurora-label mb-2">
              <i class="fas fa-credit-card mr-1.5 text-violet-500"></i>
              Tipo de Operação
            </label>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="op in tiposOp"
                :key="op.value"
                @click="tipoOperacao = op.value"
                :class="['p-3 rounded-xl border-2 transition-all text-center', tipoOperacao === op.value ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20' : 'border-gray-200 dark:border-slate-700 hover:border-violet-300']"
              >
                <i :class="['fas', op.icon, 'text-violet-600 dark:text-violet-400 mb-1 block text-xl']"></i>
                <div class="font-bold text-xs text-gray-900 dark:text-white">{{ op.label }}</div>
                <div class="text-[10px] text-gray-500">IOF {{ op.iof }}%</div>
              </button>
            </div>
          </div>

          <!-- Moeda e valores -->
          <div>
            <label class="input-aurora-label">
              <i class="fas fa-flag mr-1.5 text-violet-500"></i>
              Moeda Estrangeira
            </label>
            <select v-model="moedaEstrangeira" class="input-aurora">
              <option value="USD">🇺🇸 Dólar Americano (USD)</option>
              <option value="EUR">🇪🇺 Euro (EUR)</option>
              <option value="GBP">🇬🇧 Libra Esterlina (GBP)</option>
              <option value="JPY">🇯🇵 Iene Japonês (JPY)</option>
              <option value="CAD">🇨🇦 Dólar Canadense (CAD)</option>
              <option value="AUD">🇦🇺 Dólar Australiano (AUD)</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <BaseInput v-model="valorEstrangeiro" :label="`Valor em ${moedaEstrangeira}`"       type="number" step="0.01" icon="fa-dollar-sign" tooltip="Valor em moeda estrangeira a converter." />
            <BaseInput v-model="cotacao"           :label="`Cotação (1 ${moedaEstrangeira} = R$)`" type="number" step="0.01" icon="fa-chart-line"  tooltip="Taxa de câmbio base (comercial)." />
            <BaseInput v-model="taxaSpread"        label="Spread da Casa de Câmbio (%)"            type="number" step="0.1"  icon="fa-percentage"  hint="Acréscimo sobre cotação base" tooltip="Margem da corretora ou banco sobre a cotação." />
          </div>

          <!-- Resumo IOF + Spread -->
          <div class="glass-panel p-3 grid grid-cols-2 gap-3 text-center">
            <div>
              <div class="text-xs text-gray-500 dark:text-slate-400 mb-0.5">IOF Aplicado</div>
              <div class="text-xl font-black text-violet-600 dark:text-violet-400">{{ taxaIOF }}%</div>
            </div>
            <div>
              <div class="text-xs text-gray-500 dark:text-slate-400 mb-0.5">Cotação + Spread</div>
              <div class="text-xl font-black text-violet-600 dark:text-violet-400">R$ {{ cotacaoFinal }}</div>
            </div>
          </div>

          <div class="flex gap-3">
            <BaseButton variant="primary" icon="fa-calculator" @click="calcular" class="flex-1">Calcular Custos</BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="resultado = null">Limpar</BaseButton>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">Valor Total em Reais</p>
              <p class="text-5xl font-black text-white mb-2">{{ fmtBRL(resultado.valorTotal) }}</p>
              <p class="text-violet-300 text-sm font-semibold">
                <i class="fas fa-info-circle mr-1"></i>{{ valorEstrangeiro }} {{ moedaEstrangeira }} • custo total {{ resultado.custoTotal }}%
              </p>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-violet-100 dark:ring-violet-900">
                <div class="metric-glass-value text-violet-600 dark:text-violet-400">{{ fmtBRL(resultado.valorSemTaxas) }}</div>
                <div class="metric-glass-label">Sem Taxas</div>
              </div>
              <div class="metric-glass ring-1 ring-orange-100 dark:ring-orange-900">
                <div class="metric-glass-value text-orange-600 dark:text-orange-400">{{ fmtBRL(resultado.valorSpread) }}</div>
                <div class="metric-glass-label">Spread</div>
              </div>
              <div class="metric-glass ring-1 ring-red-100 dark:ring-red-900">
                <div class="metric-glass-value text-red-600 dark:text-red-400">{{ fmtBRL(resultado.valorIOF) }}</div>
                <div class="metric-glass-label">IOF</div>
              </div>
              <div class="metric-glass ring-1 ring-pink-100 dark:ring-pink-900">
                <div class="metric-glass-value text-pink-600 dark:text-pink-400">{{ resultado.custoTotal }}%</div>
                <div class="metric-glass-label">Custo Total</div>
              </div>
            </div>

            <!-- Comparação de métodos -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-scale-balanced text-violet-500"></i>Comparação de Métodos
              </h4>
              <div class="space-y-2">
                <div v-for="metodo in comparacao" :key="metodo.tipo"
                  class="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                  <div>
                    <div class="font-semibold text-gray-900 dark:text-white text-sm">{{ metodo.nome }}</div>
                    <div class="text-xs text-gray-500 dark:text-slate-400">IOF: {{ metodo.iof }}%</div>
                  </div>
                  <div class="text-right">
                    <div class="font-bold text-violet-600 dark:text-violet-400">{{ fmtBRL(Number(metodo.total)) }}</div>
                    <div class="text-xs text-gray-500">Δ {{ fmtBRL(Number(metodo.diferenca)) }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="tip-card-success">
              <i class="fas fa-lightbulb text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">Use transferência internacional para o menor IOF (0,38%). Negocie o spread — casas de câmbio independentes costumam oferecer taxas menores.</span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-money-bill-transfer text-4xl mb-3 opacity-30 block text-violet-400"></i>
          <p class="text-sm">Configure a operação de câmbio e clique em Calcular</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

interface ResultadoCambio {
  valorSemTaxas: number; valorSpread: number; valorIOF: number; valorTotal: number; custoTotal: string
}
interface ComparacaoItem { tipo: string; nome: string; iof: number; total: string; diferenca: string }

const tipoOperacao      = ref('cartao')
const moedaEstrangeira  = ref('USD')
const valorEstrangeiro  = ref<number | ''>(1000)
const cotacao           = ref<number | ''>(5.0)
const taxaSpread        = ref<number | ''>(3)
const resultado         = ref<ResultadoCambio | null>(null)
const comparacao        = ref<ComparacaoItem[]>([])

const tiposOp = [
  { value: 'cartao',       label: 'Cartão',       icon: 'fa-credit-card',  iof: 5.38 },
  { value: 'dinheiro',     label: 'Dinheiro',     icon: 'fa-money-bill',   iof: 1.1  },
  { value: 'transferencia',label: 'Wire Transfer', icon: 'fa-exchange-alt', iof: 0.38 },
]

const taxasIOF = { cartao: 5.38, dinheiro: 1.1, transferencia: 0.38 }
const taxaIOF  = computed(() => taxasIOF[tipoOperacao.value as keyof typeof taxasIOF])
const cotacaoFinal = computed(() => {
  const spread = Number(taxaSpread.value) / 100
  return (Number(cotacao.value) * (1 + spread)).toFixed(4)
})

const fmtBRL = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const calcular = () => {
  const valor    = Number(valorEstrangeiro.value) || 0
  const cotBase  = Number(cotacao.value) || 0
  const spread   = Number(taxaSpread.value) / 100
  const iof      = taxaIOF.value / 100

  const semTaxas = valor * cotBase
  const comSpread= semTaxas * (1 + spread)
  const valIOF   = comSpread * iof
  const total    = comSpread + valIOF
  const custoPct = ((total / semTaxas - 1) * 100).toFixed(2)

  resultado.value = { valorSemTaxas: semTaxas, valorSpread: comSpread - semTaxas, valorIOF: valIOF, valorTotal: total, custoTotal: custoPct }

  comparacao.value = Object.entries(taxasIOF).map(([tipo, iofPct]) => {
    const iofM   = iofPct / 100
    const totM   = comSpread + comSpread * iofM
    const diff   = Math.abs(totM - total)
    const nomes  = { cartao: 'Cartão de Crédito/Débito', dinheiro: 'Dinheiro em Espécie', transferencia: 'Transferência (Wire)' }
    return { tipo, nome: nomes[tipo as keyof typeof nomes], iof: iofPct, total: totM.toFixed(2), diferenca: diff.toFixed(2) }
  })
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>

