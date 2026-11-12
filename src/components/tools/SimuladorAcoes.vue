<template>
  <ToolShell
    title="Simulador de Investimento em Ações"
    description="Simule o crescimento patrimonial com ações, incluindo valorização, dividendos e aportes mensais."
    icon="fa-chart-line"
    icon-gradient="from-rose-500 to-pink-700"
    orb-color="pink"
    :quick-tips="['3 cenários prontos', 'Reinvestimento de dividendos', 'CAGR calculado']"
    :tips="[
      { title: 'Rentabilidade passada', text: 'Rentabilidade passada não garante resultados futuros. Use os cenários como referência, não como promessa de ganhos.', type: 'warning' },
      { title: 'Diversifique', text: 'Invista em pelo menos 8-10 empresas de setores diferentes para reduzir o risco específico.', type: 'info' },
      { title: 'Longo prazo vence', text: 'A bolsa brasileira historicamente rende acima da inflação no longo prazo (10+ anos), mas espere oscilações.', type: 'success' },
    ]"
    :examples="[
      { title: 'Perfil conservador', desc: 'R$ 10k + R$ 500/mês | 8% a.a. | 10 anos', result: 'Patrimônio: ~R$ 180k (100% de retorno)' },
      { title: 'Perfil moderado', desc: 'R$ 10k + R$ 1k/mês | 12% a.a. | 10 anos', result: 'Patrimônio: ~R$ 300k (150% de retorno)' },
      { title: 'Perfil agressivo', desc: 'R$ 10k + R$ 1k/mês | 15% a.a. | 15 anos', result: 'Patrimônio: ~R$ 800k (450% de retorno)' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0 space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <BaseInput v-model="valorInicial"     label="Valor Inicial (R$)"     type="number" :min="0"  step="1000" icon="fa-coins"              tooltip="Capital inicial a investir." />
            <BaseInput v-model="aportesMensais"   label="Aportes Mensais (R$)"   type="number" :min="0"  step="100"  icon="fa-calendar-plus"      tooltip="Valor adicional investido todo mês." />
            <BaseInput v-model="valorizacaoAnual" label="Valorização Anual (%)"  type="number"           step="0.5"  icon="fa-arrow-trend-up"     tooltip="Expectativa de valorização das ações por ano." />
            <BaseInput v-model="dividendYield"    label="Dividend Yield (% a.a.)"type="number"           step="0.1"  icon="fa-hand-holding-dollar" tooltip="Rendimento de dividendos anual sobre o patrimônio." />
            <BaseInput v-model="prazoAnos"        label="Prazo (anos)"           type="number" :min="1"  :max="30"   icon="fa-hourglass-half"     tooltip="Por quantos anos vai simular o investimento." />
            <BaseInput v-model="taxaCorretagem"   label="Corretagem (%)"         type="number"           step="0.1"  icon="fa-percentage"         tooltip="Taxa percentual cobrada por transação." />
          </div>

          <!-- Cenários -->
          <div>
            <label class="input-aurora-label mb-2">
              <i class="fas fa-chart-bar mr-1.5 text-rose-500"></i>
              Cenários do Ibovespa
            </label>
            <div class="grid grid-cols-3 gap-2">
              <button @click="usarCenario('conservador')" class="p-2.5 rounded-xl border-2 border-blue-200 dark:border-blue-800 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-center">
                <div class="font-bold text-blue-700 dark:text-blue-300 text-xs">Conservador</div>
                <div class="text-[10px] text-gray-500 mt-0.5">8% a.a.</div>
              </button>
              <button @click="usarCenario('moderado')" class="p-2.5 rounded-xl border-2 border-purple-200 dark:border-purple-800 hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all text-center">
                <div class="font-bold text-purple-700 dark:text-purple-300 text-xs">Moderado</div>
                <div class="text-[10px] text-gray-500 mt-0.5">12% a.a.</div>
              </button>
              <button @click="usarCenario('agressivo')" class="p-2.5 rounded-xl border-2 border-rose-200 dark:border-rose-800 hover:border-rose-500 dark:hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all text-center">
                <div class="font-bold text-rose-700 dark:text-rose-300 text-xs">Agressivo</div>
                <div class="text-[10px] text-gray-500 mt-0.5">15% a.a.</div>
              </button>
            </div>
          </div>

          <!-- Reinvestir dividendos -->
          <label class="checkbox-aurora">
            <input v-model="reinvestirDividendos" type="checkbox" />
            <span>Reinvestir dividendos automaticamente</span>
          </label>

          <div class="flex gap-3">
            <BaseButton variant="success" icon="fa-calculator" @click="calcular" class="flex-1">Simular</BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="resultado = null">Limpar</BaseButton>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">Patrimônio Final em {{ prazoAnos }} anos</p>
              <p class="text-5xl font-black text-white mb-2">{{ fmtBRL(resultado.patrimonioFinal) }}</p>
              <p class="text-rose-300 text-sm font-semibold">
                <i class="fas fa-arrow-up mr-1"></i>+{{ resultado.rentabilidade }}% de rentabilidade
              </p>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ fmtBRL(resultado.totalInvestido) }}</div>
                <div class="metric-glass-label">Total Investido</div>
              </div>
              <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
                <div class="metric-glass-value text-emerald-600 dark:text-emerald-400">{{ fmtBRL(resultado.ganhosCapital) }}</div>
                <div class="metric-glass-label">Ganhos de Capital</div>
              </div>
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <div class="metric-glass-value text-teal-600 dark:text-teal-400">{{ fmtBRL(resultado.dividendosRecebidos) }}</div>
                <div class="metric-glass-label">Dividendos</div>
              </div>
              <div class="metric-glass ring-1 ring-rose-100 dark:ring-rose-900">
                <div class="metric-glass-value text-rose-600 dark:text-rose-400">{{ resultado.cagr }}% a.a.</div>
                <div class="metric-glass-label">CAGR</div>
              </div>
            </div>

            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-list-check text-rose-500"></i>Detalhamento
              </h4>
              <div class="space-y-2 text-sm">
                <div v-for="item in breakdown" :key="item.label"
                  class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700 last:border-0">
                  <span class="text-gray-600 dark:text-slate-300">{{ item.label }}</span>
                  <span :class="['font-bold', item.cls || 'text-gray-900 dark:text-white']">{{ item.value }}</span>
                </div>
              </div>
            </div>

            <div class="tip-card-warning">
              <i class="fas fa-exclamation-triangle text-amber-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">Simulação baseada em retorno constante. Ações oscilam — resultados reais variam. Dividendos isentos de IR até R$ 20k/mês.</span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-chart-line text-4xl mb-3 opacity-30 block text-rose-400"></i>
          <p class="text-sm">Configure o investimento e clique em Simular</p>
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

interface ResultadoAcoes {
  patrimonioFinal:    number
  totalInvestido:     number
  ganhosCapital:      number
  dividendosRecebidos:number
  rentabilidade:      string
  cagr:               string
  custoTotal:         number
}

const valorInicial     = ref<number | ''>(10000)
const aportesMensais   = ref<number | ''>(1000)
const valorizacaoAnual = ref<number | ''>(12)
const dividendYield    = ref<number | ''>(5)
const prazoAnos        = ref<number | ''>(10)
const taxaCorretagem   = ref<number | ''>(0.5)
const reinvestirDividendos = ref(true)
const resultado        = ref<ResultadoAcoes | null>(null)

const fmtBRL = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const breakdown = computed(() => {
  if (!resultado.value) return []
  const r = resultado.value
  return [
    { label: 'Capital inicial',  value: fmtBRL(Number(valorInicial.value) || 0) },
    { label: 'Aportes totais',   value: fmtBRL(r.totalInvestido - (Number(valorInicial.value) || 0)) },
    { label: 'Total investido',  value: fmtBRL(r.totalInvestido) },
    { label: 'Ganhos de capital',value: fmtBRL(r.ganhosCapital),          cls: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Dividendos',       value: fmtBRL(r.dividendosRecebidos),     cls: 'text-teal-600 dark:text-teal-400' },
    { label: 'Custos (corretagem)',value: fmtBRL(r.custoTotal),            cls: 'text-red-600 dark:text-red-400' },
    { label: 'Patrimônio final', value: fmtBRL(r.patrimonioFinal),         cls: 'text-primary-600 dark:text-primary-400' },
  ]
})

const usarCenario = (tipo: string) => {
  if (tipo === 'conservador') { valorizacaoAnual.value = 8;  dividendYield.value = 6 }
  if (tipo === 'moderado')    { valorizacaoAnual.value = 12; dividendYield.value = 5 }
  if (tipo === 'agressivo')   { valorizacaoAnual.value = 15; dividendYield.value = 3 }
}

const calcular = () => {
  const valInit   = Number(valorInicial.value) || 0
  const aporteMes = Number(aportesMensais.value) || 0
  const taxaVal   = Number(valorizacaoAnual.value) / 100
  const taxaDiv   = Number(dividendYield.value) / 100
  const anos      = Number(prazoAnos.value) || 1
  const corret    = Number(taxaCorretagem.value) / 100

  let patrimonio = valInit
  let totalInvest = valInit
  let dividAccum  = 0
  let custos      = valInit * corret

  for (let ano = 0; ano < anos; ano++) {
    for (let mes = 0; mes < 12; mes++) {
      patrimonio += aporteMes; totalInvest += aporteMes; custos += aporteMes * corret
      const taxaMes = Math.pow(1 + taxaVal, 1/12) - 1
      patrimonio *= (1 + taxaMes)
    }
    const divAno = patrimonio * taxaDiv
    dividAccum += divAno
    if (reinvestirDividendos.value) { patrimonio += divAno; custos += divAno * corret }
  }

  const ganhosK = patrimonio - totalInvest - (reinvestirDividendos.value ? dividAccum : 0)
  const rent    = ((patrimonio / totalInvest - 1) * 100).toFixed(2)
  const cagr    = ((Math.pow(patrimonio / totalInvest, 1/anos) - 1) * 100).toFixed(2)

  resultado.value = { patrimonioFinal: patrimonio, totalInvestido: totalInvest, ganhosCapital: ganhosK, dividendosRecebidos: dividAccum, rentabilidade: rent, cagr, custoTotal: custos }
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
