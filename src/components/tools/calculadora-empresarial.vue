<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, reactive } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

type TabKey = 'hora' | 'projeto' | 'juros' | 'parcelas'

const tab = ref<TabKey>('hora')

// ---- Calculadora de Hora ----
const hora = reactive({ meta: 8000, horas: 8, dias: 5, ferias: 30, margem: 25, impostos: 6 })
const resultHora = ref<{ rate: number; billable: number } | null>(null)

function calcHora() {
  const workDays = 52 * hora.dias - hora.ferias
  if (workDays <= 0 || hora.horas <= 0 || hora.meta <= 0) {
    Swal.fire({ icon: 'warning', title: 'Dados inválidos', confirmButtonColor: '#6366f1' }); return
  }
  const totalHours = workDays * hora.horas
  const base = (hora.meta * 12) / totalHours
  const withMargin = base * (1 + hora.margem / 100)
  const rate = Math.round(withMargin / (1 - Math.min(hora.impostos / 100, 0.9)))
  resultHora.value = { rate, billable: Math.round(totalHours) }
  Swal.fire({ icon: 'success', title: `Valor/hora: R$ ${rate}`, timer: 1800, showConfirmButton: false })
}

// ---- Calculadora de Projeto ----
const proj = reactive({ horas: 40, valorHora: 0, complexidade: 1, desconto: 0 })
const resultProj = ref<{ gross: number; total: number } | null>(null)

function calcProj() {
  const rate = proj.valorHora || resultHora.value?.rate || 0
  if (!proj.horas || !rate) { Swal.fire({ icon: 'warning', title: 'Informe horas e valor/hora', confirmButtonColor: '#6366f1' }); return }
  const gross = Math.round(proj.horas * rate * proj.complexidade)
  const total = gross - Math.round(gross * proj.desconto / 100)
  resultProj.value = { gross, total }
  Swal.fire({ icon: 'success', title: `Valor do projeto: ${fmt(total)}`, timer: 1800, showConfirmButton: false })
}

// ---- Calculadora de Juros ----
const juros = reactive({ principal: 0, taxa: 0, periodos: 12, tipo: 'simples' })
const resultJuros = ref<{ totalSimples: number; totalComposto: number; jurosSimples: number; jurosComposto: number } | null>(null)

function calcJuros() {
  if (!juros.principal || !juros.taxa || !juros.periodos) { Swal.fire({ icon: 'warning', title: 'Preencha todos os campos', confirmButtonColor: '#6366f1' }); return }
  const jurosSimples = juros.principal * (juros.taxa / 100) * juros.periodos
  const totalSimples = juros.principal + jurosSimples
  const totalComposto = juros.principal * Math.pow(1 + juros.taxa / 100, juros.periodos)
  const jurosComposto = totalComposto - juros.principal
  resultJuros.value = { totalSimples: Math.round(totalSimples * 100) / 100, totalComposto: Math.round(totalComposto * 100) / 100, jurosSimples: Math.round(jurosSimples * 100) / 100, jurosComposto: Math.round(jurosComposto * 100) / 100 }
}

// ---- Calculadora de Parcelas ----
const parcelas = reactive({ valor: 0, entrada: 0, nParcelas: 12, taxa: 0 })
const resultParcelas = ref<{ parcelaSemJuros: number; parcelaComJuros: number; totalComJuros: number; totalJuros: number } | null>(null)

function calcParcelas() {
  if (!parcelas.valor || !parcelas.nParcelas) { Swal.fire({ icon: 'warning', title: 'Preencha valor e número de parcelas', confirmButtonColor: '#6366f1' }); return }
  const saldo = parcelas.valor - parcelas.entrada
  const parcelaSemJuros = saldo / parcelas.nParcelas
  let parcelaComJuros: number
  if (parcelas.taxa > 0) {
    const i = parcelas.taxa / 100
    parcelaComJuros = saldo * (i * Math.pow(1 + i, parcelas.nParcelas)) / (Math.pow(1 + i, parcelas.nParcelas) - 1)
  } else { parcelaComJuros = parcelaSemJuros }
  const totalComJuros = parcelaComJuros * parcelas.nParcelas + parcelas.entrada
  resultParcelas.value = {
    parcelaSemJuros: Math.round(parcelaSemJuros * 100) / 100,
    parcelaComJuros: Math.round(parcelaComJuros * 100) / 100,
    totalComJuros: Math.round(totalComJuros * 100) / 100,
    totalJuros: Math.round((totalComJuros - parcelas.valor) * 100) / 100,
  }
}

function fmt(v: number) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }

const tabs = [
  { key: 'hora', label: 'Valor/Hora', icon: 'mdi:clock-outline' },
  { key: 'projeto', label: 'Projeto', icon: 'mdi:folder-outline' },
  { key: 'juros', label: 'Juros', icon: 'mdi:percent' },
  { key: 'parcelas', label: 'Parcelas', icon: 'mdi:credit-card-outline' },
]
</script>

<template>
  <ToolShell

    title="Calculadora Empresarial"

    description="Calcule indicadores essenciais da sua empresa: margem, ROI, ponto de equilíbrio."

    icon="fa-chart-line"

    icon-gradient="from-blue-500 to-indigo-700"

    orb-color="blue"

    :quick-tips="['Resultados instantâneos', 'Sem cadastro', '100% client-side']"

    :tips="[{ title: 'Uso recomendado', text: 'Preencha todos os campos e veja o resultado em tempo real.' }]"

  >

    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:briefcase-outline" class="text-blue-400 w-7 h-7" />
        Calculadora Empresarial
      </h1>
      <p class="text-blue-200 text-sm">Ferramentas profissionais para cálculos de preços, projetos e finanças</p>
    </div>

    <!-- Tabs -->
    <div class="glass-panel p-1 grid grid-cols-4 gap-1">
      <button v-for="t in tabs" :key="t.key" @click="tab = t.key as TabKey"
        :class="['flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all', tab === t.key ? 'bg-blue-600 text-white' : 'text-blue-200 hover:bg-white/5']">
        <Icon :icon="t.icon" class="w-4 h-4" /> {{ t.label }}
      </button>
    </div>

    <!-- Valor/Hora -->
    <div v-show="tab === 'hora'" class="grid md:grid-cols-2 gap-6">
      <div class="glass-panel p-5 space-y-3">
        <h2 class="text-white font-semibold text-sm">Calculadora de Valor/Hora</h2>
        <div class="grid grid-cols-2 gap-3">
          <div v-for="f in [{ k: 'meta', l: 'Meta mensal (R$)' }, { k: 'horas', l: 'Horas/dia' }, { k: 'dias', l: 'Dias/semana' }, { k: 'ferias', l: 'Férias/ano' }, { k: 'margem', l: 'Margem (%)' }, { k: 'impostos', l: 'Impostos (%)' }]" :key="f.k">
            <label class="input-aurora-label">{{ f.l }}</label>
            <input v-model.number="(hora as any)[f.k]" type="number" min="0" autocomplete="off"
              class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
          </div>
        </div>
        <button @click="calcHora" class="btn-aurora w-full">Calcular</button>
      </div>
      <div v-if="resultHora" class="tool-header flex flex-col items-center justify-center text-center space-y-3">
        <p class="text-blue-100">Valor ideal por hora</p>
        <div class="text-5xl font-extrabold text-white">{{ fmt(resultHora.rate) }}</div>
        <div class="text-blue-100 text-sm">{{ resultHora.billable }} h faturáveis/ano</div>
      </div>
      <div v-else class="glass-panel flex items-center justify-center p-10">
        <div class="text-center"><Icon icon="mdi:clock-outline" class="w-10 h-10 text-blue-400/20 mx-auto mb-2" /><p class="text-blue-200 text-sm">Preencha e calcule</p></div>
      </div>
    </div>

    <!-- Projeto -->
    <div v-show="tab === 'projeto'" class="grid md:grid-cols-2 gap-6">
      <div class="glass-panel p-5 space-y-3">
        <h2 class="text-white font-semibold text-sm">Calculadora de Projeto</h2>
        <div class="space-y-3">
          <div v-for="f in [{ k: 'horas', l: 'Horas estimadas' }, { k: 'valorHora', l: 'Valor/hora (R$) — 0=usar calculado' }, { k: 'desconto', l: 'Desconto (%)' }]" :key="f.k">
            <label class="input-aurora-label">{{ f.l }}</label>
            <input v-model.number="(proj as any)[f.k]" type="number" min="0" autocomplete="off"
              class="w-full input-aurora" />
          </div>
          <div>
            <label class="input-aurora-label">Complexidade</label>
            <select v-model.number="proj.complexidade" autocomplete="off"
              class="w-full input-aurora">
              <option value="0.9">Baixa (-10%)</option>
              <option value="1">Média (padrão)</option>
              <option value="1.3">Alta (+30%)</option>
            </select>
          </div>
        </div>
        <button @click="calcProj" class="btn-aurora w-full">Calcular Projeto</button>
      </div>
      <div v-if="resultProj" class="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-2">
        <p class="text-blue-100">Valor do projeto</p>
        <div class="text-5xl font-extrabold text-white">{{ fmt(resultProj.total) }}</div>
        <div v-if="resultProj.gross !== resultProj.total" class="text-sm text-white/70 line-through">{{ fmt(resultProj.gross) }}</div>
      </div>
      <div v-else class="glass-panel flex items-center justify-center p-10">
        <div class="text-center"><Icon icon="mdi:folder-outline" class="w-10 h-10 text-blue-400/20 mx-auto mb-2" /><p class="text-blue-200 text-sm">Preencha e calcule</p></div>
      </div>
    </div>

    <!-- Juros -->
    <div v-show="tab === 'juros'" class="grid md:grid-cols-2 gap-6">
      <div class="glass-panel p-5 space-y-3">
        <h2 class="text-white font-semibold text-sm">Juros Simples vs Composto</h2>
        <div v-for="f in [{ k: 'principal', l: 'Capital Inicial (R$)' }, { k: 'taxa', l: 'Taxa por Período (%)' }, { k: 'periodos', l: 'Número de Períodos' }]" :key="f.k">
          <label class="input-aurora-label">{{ f.l }}</label>
          <input v-model.number="(juros as any)[f.k]" type="number" min="0" autocomplete="off"
            class="w-full input-aurora" />
        </div>
        <button @click="calcJuros" class="btn-aurora w-full">Calcular Juros</button>
      </div>
      <div v-if="resultJuros" class="glass-panel p-5 space-y-3">
        <h3 class="text-white font-semibold text-sm">Comparativo</h3>
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-blue-900/20 border border-blue-500/20 rounded-lg p-3 text-center">
            <div class="text-blue-300 text-xs mb-1">Total (Simples)</div>
            <div class="text-xl font-bold text-white">{{ fmt(resultJuros.totalSimples) }}</div>
            <div class="text-blue-300 text-xs">Juros: {{ fmt(resultJuros.jurosSimples) }}</div>
          </div>
          <div class="bg-green-900/20 border border-green-500/20 rounded-lg p-3 text-center">
            <div class="text-green-300 text-xs mb-1">Total (Composto)</div>
            <div class="text-xl font-bold text-white">{{ fmt(resultJuros.totalComposto) }}</div>
            <div class="text-green-300 text-xs">Juros: {{ fmt(resultJuros.jurosComposto) }}</div>
          </div>
        </div>
      </div>
      <div v-else class="glass-panel flex items-center justify-center p-10">
        <div class="text-center"><Icon icon="mdi:percent" class="w-10 h-10 text-blue-400/20 mx-auto mb-2" /><p class="text-blue-200 text-sm">Preencha e calcule</p></div>
      </div>
    </div>

    <!-- Parcelas -->
    <div v-show="tab === 'parcelas'" class="grid md:grid-cols-2 gap-6">
      <div class="glass-panel p-5 space-y-3">
        <h2 class="text-white font-semibold text-sm">Calculadora de Parcelas</h2>
        <div v-for="f in [{ k: 'valor', l: 'Valor Total (R$)' }, { k: 'entrada', l: 'Entrada (R$)' }, { k: 'nParcelas', l: 'Número de Parcelas' }, { k: 'taxa', l: 'Taxa de Juros/mês (%)' }]" :key="f.k">
          <label class="input-aurora-label">{{ f.l }}</label>
          <input v-model.number="(parcelas as any)[f.k]" type="number" min="0" step="0.01" autocomplete="off"
            class="w-full input-aurora" />
        </div>
        <button @click="calcParcelas" class="btn-aurora w-full">Calcular Parcelas</button>
      </div>
      <div v-if="resultParcelas" class="glass-panel p-5 space-y-3">
        <h3 class="text-white font-semibold text-sm">Resultado</h3>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between"><span class="text-blue-200">Parcela sem juros</span><span class="text-white font-semibold">{{ fmt(resultParcelas.parcelaSemJuros) }}</span></div>
          <div class="flex justify-between"><span class="text-blue-200">Parcela com juros</span><span class="text-white font-semibold">{{ fmt(resultParcelas.parcelaComJuros) }}</span></div>
          <div class="flex justify-between border-t border-white/10 pt-2"><span class="text-blue-200">Total com juros</span><span class="text-white font-semibold">{{ fmt(resultParcelas.totalComJuros) }}</span></div>
          <div class="flex justify-between"><span class="text-blue-200">Juros pagos</span><span class="text-red-400 font-semibold">{{ fmt(resultParcelas.totalJuros) }}</span></div>
        </div>
      </div>
      <div v-else class="glass-panel flex items-center justify-center p-10">
        <div class="text-center"><Icon icon="mdi:credit-card-outline" class="w-10 h-10 text-blue-400/20 mx-auto mb-2" /><p class="text-blue-200 text-sm">Preencha e calcule</p></div>
      </div>
    </div>
  


  </ToolShell></template>