<template>
  <ToolShell
    title="Calculadora de ROI"
    description="Calcule o Retorno sobre Investimento (ROI) com análise visual detalhada e interpretação automática."
    icon="fa-money-bill-trend-up"
    icon-gradient="from-emerald-500 to-teal-700"
    orb-color="emerald"
    :quick-tips="['Análise instantânea', 'Interpretação automática', 'Histórico de cálculos']"
    :tips="[
      { title: 'O que é ROI?', text: 'ROI = (Lucro Líquido / Investimento Total) × 100. Mede a eficiência de um investimento.' },
      { title: 'ROI acima de 20%', text: 'Considerado excelente para a maioria dos segmentos de negócio.', type: 'success' },
      { title: 'ROI negativo', text: 'Significa prejuízo. Revise os custos ou o potencial de receita do investimento.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Campanha de Anúncios', desc: 'Investimento de R$ 1.000, Retorno de R$ 3.500', result: 'ROI = 250% (lucro de R$ 2.500)' },
      { title: 'Treinamento de Equipe', desc: 'Custo de R$ 5.000, Aumento de Receita de R$ 8.000', result: 'ROI = 60% — investimento válido' },
      { title: 'Novo Equipamento', desc: 'Custo R$ 20.000, Economia anual R$ 6.000', result: 'ROI = 30% / Payback = 3,3 anos' },
    ]"
  >

    <!-- ── Formulário ─────────────────────────────────────────── -->
    <div class="tool-body">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <BaseInput
          v-model="investimentoInicial"
          label="Investimento Inicial (R$)"
          type="number"
          icon="fa-coins"
          placeholder="Ex: 10000"
          :min="0"
          step="0.01"
          tooltip="Valor total investido inicialmente, incluindo custo de aquisição, setup e capital de giro."
          @input="calcularAuto"
        />
        <BaseInput
          v-model="ganhoObtido"
          label="Retorno Obtido (R$)"
          type="number"
          icon="fa-chart-line"
          placeholder="Ex: 35000"
          :min="0"
          step="0.01"
          tooltip="Valor total recebido como retorno do investimento (receita bruta gerada)."
          @input="calcularAuto"
        />
        <BaseInput
          v-model="custosAdicionais"
          label="Custos Adicionais (R$)"
          type="number"
          icon="fa-minus-circle"
          placeholder="Ex: 2500"
          :min="0"
          step="0.01"
          hint="Custos operacionais, manutenção, comissões, etc."
          @input="calcularAuto"
        />
        <BaseInput
          v-model="periodo"
          label="Período do Investimento (meses)"
          type="number"
          icon="fa-calendar-alt"
          placeholder="Ex: 12"
          :min="1"
          :max="360"
          tooltip="Tempo total do investimento em meses. Usado para calcular ROI anualizado."
          @input="calcularAuto"
        />
      </div>

      <div class="flex gap-3 mt-5">
        <BaseButton variant="primary" icon="fa-calculator" @click="calcular" class="flex-1">
          Calcular ROI
        </BaseButton>
        <BaseButton variant="outline" icon="fa-trash-alt" @click="limpar">
          Limpar
        </BaseButton>
      </div>
    </div>

    <!-- ── Resultado ─────────────────────────────────────────── -->
    <Transition name="slide-up">
      <div v-if="calculado" class="mt-5 space-y-4 animate-fade-in-up">

        <!-- Métricas principais -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div :class="['metric-glass', resultado.roi >= 0 ? 'ring-1 ring-emerald-200 dark:ring-emerald-800' : 'ring-1 ring-red-200 dark:ring-red-800']">
            <div :class="['metric-glass-value text-2xl', resultado.roi >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500']">
              {{ resultado.roi.toFixed(1) }}%
            </div>
            <div class="metric-glass-label">ROI</div>
          </div>
          <div class="metric-glass">
            <div :class="['metric-glass-value text-2xl', resultado.lucro >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-500']">
              {{ formatarMoeda(resultado.lucro) }}
            </div>
            <div class="metric-glass-label">Lucro Líquido</div>
          </div>
          <div class="metric-glass">
            <div class="metric-glass-value text-2xl text-purple-600 dark:text-purple-400">
              {{ resultado.roiAnual.toFixed(1) }}%
            </div>
            <div class="metric-glass-label">ROI Anual</div>
          </div>
          <div class="metric-glass">
            <div class="metric-glass-value text-2xl text-teal-600 dark:text-teal-400">
              {{ resultado.payback }}
            </div>
            <div class="metric-glass-label">Payback</div>
          </div>
        </div>

        <!-- Barra visual de retorno -->
        <div class="glass-panel p-4">
          <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
            <i class="fas fa-chart-bar text-primary-500"></i>
            Distribuição do Investimento
          </h4>
          <div class="space-y-3 text-xs">
            <!-- Investimento -->
            <div>
              <div class="flex justify-between mb-1 font-semibold text-gray-600 dark:text-slate-300">
                <span><i class="fas fa-coins mr-1 text-orange-400"></i>Investimento Total</span>
                <span>{{ formatarMoeda(resultado.investimentoTotal) }}</span>
              </div>
              <div class="strength-track">
                <div class="strength-bar bg-orange-400" style="width:100%"></div>
              </div>
            </div>
            <!-- Retorno -->
            <div>
              <div class="flex justify-between mb-1 font-semibold text-gray-600 dark:text-slate-300">
                <span><i class="fas fa-chart-line mr-1 text-emerald-400"></i>Retorno Bruto</span>
                <span>{{ formatarMoeda(Number(ganhoObtido) || 0) }}</span>
              </div>
              <div class="strength-track">
                <div class="strength-bar bg-emerald-400" :style="{ width: Math.min((Number(ganhoObtido) / resultado.investimentoTotal) * 100, 200) + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Análise detalhada -->
        <div class="glass-panel p-4">
          <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
            <i class="fas fa-file-invoice-dollar text-primary-500"></i>
            Análise Detalhada
          </h4>
          <div class="space-y-2 text-sm">
            <div v-for="item in breakdown" :key="item.label"
              class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-700 last:border-0">
              <span class="text-gray-600 dark:text-slate-300 flex items-center gap-1.5">
                <i :class="['fas', item.icon, 'text-xs', item.color]"></i>
                {{ item.label }}
              </span>
              <span :class="['font-bold', item.valueClass || 'text-gray-900 dark:text-white']">
                {{ item.value }}
              </span>
            </div>
          </div>
        </div>

        <!-- Interpretação IA-like -->
        <div :class="['tip-card', resultado.roi >= 20 ? 'tip-card-success' : resultado.roi >= 0 ? '' : 'tip-card-warning']">
          <i :class="['fas flex-shrink-0 mt-0.5', resultado.roi >= 20 ? 'fa-trophy text-emerald-500' : resultado.roi >= 0 ? 'fa-info-circle text-blue-500' : 'fa-times-circle text-red-500']"></i>
          <div>
            <strong class="block text-sm mb-0.5">{{ analise.titulo }}</strong>
            <span class="text-[12px]">{{ analise.descricao }}</span>
          </div>
        </div>

      </div>
    </Transition>

  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

// ─── Estado ───────────────────────────────────────────────────────
const investimentoInicial = ref<number | ''>('')
const ganhoObtido         = ref<number | ''>('')
const custosAdicionais    = ref<number | ''>(0)
const periodo             = ref<number | ''>(12)
const calculado           = ref(false)

const resultado = ref({
  roi:              0,
  lucro:            0,
  investimentoTotal:0,
  roiAnual:         0,
  payback:          'N/A',
})

// ─── Cálculo ──────────────────────────────────────────────────────
function calcular() {
  const inv    = Number(investimentoInicial.value) || 0
  const ganho  = Number(ganhoObtido.value)         || 0
  const custos = Number(custosAdicionais.value)    || 0
  const meses  = Number(periodo.value)             || 12

  if (!inv || !ganho) {
    Swal.fire({
      icon: 'warning', title: 'Preencha os campos obrigatórios',
      text: 'Informe o Investimento Inicial e o Retorno Obtido para calcular.',
      confirmButtonColor: '#2563eb',
    })
    return
  }

  const totalInv    = inv + custos
  const lucro       = ganho - totalInv
  const roi         = (lucro / totalInv) * 100
  const roiAnual    = roi / (meses / 12)
  const paybackMeses= totalInv / (ganho / meses)
  const paybackStr  = paybackMeses <= 1   ? '< 1 mês'
                    : paybackMeses < 24   ? `${paybackMeses.toFixed(1)} meses`
                    : `${(paybackMeses / 12).toFixed(1)} anos`

  resultado.value = { roi, lucro, investimentoTotal: totalInv, roiAnual, payback: paybackStr }
  calculado.value  = true
}

function calcularAuto() {
  if (investimentoInicial.value && ganhoObtido.value) calcular()
}

function limpar() {
  investimentoInicial.value = ''
  ganhoObtido.value         = ''
  custosAdicionais.value    = 0
  periodo.value             = 12
  calculado.value           = false
}

// ─── Helpers ──────────────────────────────────────────────────────
const formatarMoeda = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })

const breakdown = computed(() => [
  { label: 'Investimento Inicial', icon: 'fa-coins',           color: 'text-orange-500', value: formatarMoeda(Number(investimentoInicial.value) || 0) },
  { label: 'Custos Adicionais',    icon: 'fa-minus-circle',    color: 'text-red-400',    value: formatarMoeda(Number(custosAdicionais.value) || 0) },
  { label: 'Investimento Total',   icon: 'fa-layer-group',     color: 'text-blue-500',   value: formatarMoeda(resultado.value.investimentoTotal) },
  { label: 'Retorno Bruto',        icon: 'fa-chart-line',      color: 'text-green-500',  value: formatarMoeda(Number(ganhoObtido.value) || 0) },
  { label: 'Lucro Líquido',        icon: 'fa-sack-dollar',     color: resultado.value.lucro >= 0 ? 'text-emerald-600' : 'text-red-500',
    value: formatarMoeda(resultado.value.lucro),
    valueClass: resultado.value.lucro >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500',
  },
  { label: 'Período',              icon: 'fa-calendar',        color: 'text-purple-500', value: `${periodo.value} meses` },
  { label: 'ROI Anualizado',       icon: 'fa-percentage',      color: 'text-teal-500',   value: `${resultado.value.roiAnual.toFixed(1)}%` },
])

const analise = computed(() => {
  const r = resultado.value.roi
  if (r >= 100) return { titulo: '🏆 ROI Excepcional!', descricao: `Um ROI de ${r.toFixed(1)}% indica um retorno extraordinário. Avalie escalar este investimento.` }
  if (r >= 50)  return { titulo: '🚀 ROI Muito Alto',    descricao: `${r.toFixed(1)}% de retorno é excelente. Sua estratégia está funcionando muito bem.` }
  if (r >= 20)  return { titulo: '✅ ROI Positivo',      descricao: `${r.toFixed(1)}% é considerado bom. Continue monitorando para otimizar os resultados.` }
  if (r >= 0)   return { titulo: '⚠️ ROI Baixo',         descricao: `${r.toFixed(1)}% indica retorno modesto. Revise os custos ou estratégia de geração de receita.` }
  return { titulo: '❌ ROI Negativo — Prejuízo',         descricao: `Prejuízo de ${Math.abs(r).toFixed(1)}%. Reavalie urgentemente os fundamentos deste investimento.` }
})
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.35s ease; }
.slide-up-enter-from                            { transform: translateY(12px); opacity: 0; }
.slide-up-leave-to                              { opacity: 0; }
</style>
