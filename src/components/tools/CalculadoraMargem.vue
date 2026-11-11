<template>
  <ToolShell
    title="Calculadora de Margem & Markup"
    description="Calcule margem de lucro, markup e preço de venda ideal a partir do custo do produto."
    icon="fa-coins"
    icon-gradient="from-amber-500 to-yellow-600"
    orb-color="orange"
    :quick-tips="['Margem vs Markup', '3 modos de cálculo', 'Resultado instantâneo']"
    :tips="[
      { title: 'Margem vs Markup', text: 'Margem: lucro sobre o PREÇO DE VENDA. Markup: lucro sobre o CUSTO. Uma margem de 40% equivale a um markup de 66,7%. Confundir os dois é um erro clássico!' },
      { title: 'Exemplo prático', text: 'Custo R$ 60, Venda R$ 100 → Margem = 40% | Markup = 66,7%. A margem é sempre menor que o markup para o mesmo produto.', type: 'info' },
      { title: 'Inclua todos os custos', text: 'Custo real = produto + frete + impostos + taxas de marketplace + custo de operação. Muitos vendedores ignoram e ficam com margem negativa.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Loja física',       desc: 'Custo R$ 50, margem desejada 40%',    result: 'Venda: R$ 83,33 | Markup: 66,7%' },
      { title: 'E-commerce (ML)',   desc: 'Custo R$ 80, markup de 60%',          result: 'Venda: R$ 128 | Margem: 37,5%' },
      { title: 'Encontrar margem', desc: 'Custo R$ 30, venda R$ 60',             result: 'Margem: 50% | Markup: 100%' },
    ]"
  >

    <!-- Modo de cálculo -->
    <div class="tool-section mb-4">
      <div class="grid grid-cols-3 gap-2">
        <button
          v-for="m in modos"
          :key="m.id"
          :class="['p-3 rounded-xl border-2 text-xs font-semibold text-center transition-all',
            modo === m.id ? 'bg-amber-500 text-white border-amber-500' : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:border-amber-400']"
          @click="modo = m.id; calcularAuto()"
        >
          <i :class="['fas', m.icon, 'block mb-1', modo === m.id ? 'text-white' : 'text-amber-500']"></i>
          {{ m.label }}
        </button>
      </div>
    </div>

    <div class="tool-body">
      <div class="space-y-3">
        <BaseInput v-model="precoCusto" label="Preço de Custo (R$)" type="number"
          icon="fa-dollar-sign" placeholder="50" :min="0.01" step="0.01"
          hint="Custo total do produto/serviço (produção + frete + impostos)"
          tooltip="Inclua TODOS os custos: produto, frete, taxas, marketplaces, impostos e custos de operação."
          @input="calcularAuto" />

        <BaseInput v-if="modo === 'custo-venda'" v-model="precoVenda" label="Preço de Venda (R$)" type="number"
          icon="fa-tag" placeholder="100" :min="0.01" step="0.01"
          hint="Quanto você cobra pelo produto" @input="calcularAuto" />

        <BaseInput v-if="modo === 'custo-margem'" v-model="margemDesejada" label="Margem Desejada (%)" type="number"
          icon="fa-percent" placeholder="40" :min="0.01" :max="99.99" step="0.01"
          hint="Margem = Lucro ÷ Venda × 100 (máx 99,99%)"
          tooltip="Informe qual % do preço de venda você quer de lucro." @input="calcularAuto" />

        <BaseInput v-if="modo === 'custo-markup'" v-model="markupDesejado" label="Markup Desejado (%)" type="number"
          icon="fa-arrow-trend-up" placeholder="100" :min="0.01" step="0.01"
          hint="Markup = Lucro ÷ Custo × 100"
          tooltip="Informe qual % a mais que o custo você quer cobrar." @input="calcularAuto" />
      </div>

      <BaseButton variant="primary" icon="fa-calculator" @click="calcular" class="w-full mt-4"
        style="background: linear-gradient(135deg, #f59e0b, #d97706)">
        Calcular Margem & Markup
      </BaseButton>
    </div>

    <!-- Resultado -->
    <Transition name="scale-in">
      <div v-if="resultado" class="mt-4 space-y-4">

        <!-- Destaque -->
        <div class="tool-header text-center py-7" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)">
          <p class="text-amber-100 text-sm mb-1">Preço de Venda Ideal</p>
          <p class="text-5xl font-black text-white mb-2">{{ fmt(Number(resultado.precoVenda)) }}</p>
          <p class="text-amber-200 text-sm font-semibold">
            Lucro: {{ fmt(Number(resultado.lucro)) }}
          </p>
        </div>

        <!-- Métricas -->
        <div class="grid grid-cols-3 gap-3">
          <div class="metric-glass ring-1 ring-amber-100 dark:ring-amber-900">
            <div class="metric-glass-value text-amber-600 dark:text-amber-400">{{ resultado.margem }}%</div>
            <div class="metric-glass-label">Margem</div>
          </div>
          <div class="metric-glass ring-1 ring-orange-100 dark:ring-orange-900">
            <div class="metric-glass-value text-orange-600 dark:text-orange-400">{{ resultado.markup }}%</div>
            <div class="metric-glass-label">Markup</div>
          </div>
          <div class="metric-glass ring-1 ring-green-100 dark:ring-green-900">
            <div class="metric-glass-value text-green-600 dark:text-green-400">{{ fmt(Number(resultado.lucro)) }}</div>
            <div class="metric-glass-label">Lucro</div>
          </div>
        </div>

        <!-- Barra visual -->
        <div class="glass-panel p-4">
          <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
            <i class="fas fa-chart-pie text-amber-500"></i>
            Composição do preço de venda
          </h4>
          <div class="relative h-8 rounded-xl overflow-hidden flex">
            <div class="bg-blue-500 flex items-center justify-center text-white text-[10px] font-bold transition-all duration-700"
              :style="{ width: (100 - Number(resultado.margem)) + '%' }">
              {{ (100 - Number(resultado.margem)).toFixed(0) }}% Custo
            </div>
            <div class="bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold transition-all duration-700"
              :style="{ width: resultado.margem + '%' }">
              {{ resultado.margem }}% Lucro
            </div>
          </div>
          <div class="flex justify-between text-[10px] text-gray-500 dark:text-slate-400 mt-1.5">
            <span>Custo: {{ fmt(Number(precoCusto)) }}</span>
            <span>Lucro: {{ fmt(Number(resultado.lucro)) }}</span>
          </div>
        </div>

        <!-- Comparação de conceitos -->
        <div class="glass-panel p-4">
          <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3">
            <i class="fas fa-scale-balanced mr-2 text-amber-500"></i>
            Margem vs Markup
          </h4>
          <div class="grid grid-cols-2 gap-3 text-xs">
            <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800">
              <span class="font-bold text-amber-700 dark:text-amber-300 block mb-1">Margem {{ resultado.margem }}%</span>
              <code class="text-[10px] text-amber-600 dark:text-amber-400">Lucro ÷ Venda × 100</code>
              <p class="text-amber-600 dark:text-amber-300 mt-1">{{ resultado.lucro }} ÷ {{ resultado.precoVenda }} × 100</p>
            </div>
            <div class="p-3 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800">
              <span class="font-bold text-orange-700 dark:text-orange-300 block mb-1">Markup {{ resultado.markup }}%</span>
              <code class="text-[10px] text-orange-600 dark:text-orange-400">Lucro ÷ Custo × 100</code>
              <p class="text-orange-600 dark:text-orange-300 mt-1">{{ resultado.lucro }} ÷ {{ precoCusto }} × 100</p>
            </div>
          </div>
        </div>

        <!-- Dica -->
        <div class="tip-card">
          <i class="fas fa-lightbulb text-blue-500 flex-shrink-0 mt-0.5"></i>
          <span class="text-xs">
            Markup é sempre maior que margem para o mesmo produto.
            Vender com <strong>markup 100%</strong> é o mesmo que <strong>margem 50%</strong>.
          </span>
        </div>

      </div>
    </Transition>

  </ToolShell>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

type Modo = 'custo-venda' | 'custo-margem' | 'custo-markup'

const modo            = ref<Modo>('custo-venda')
const precoCusto      = ref<number | ''>(50)
const precoVenda      = ref<number | ''>(100)
const margemDesejada  = ref<number | ''>(40)
const markupDesejado  = ref<number | ''>(100)

const modos = [
  { id: 'custo-venda'  as Modo, label: 'Custo + Venda',   icon: 'fa-tag'          },
  { id: 'custo-margem' as Modo, label: 'Custo + Margem',   icon: 'fa-percent'      },
  { id: 'custo-markup' as Modo, label: 'Custo + Markup',   icon: 'fa-arrow-trend-up'},
]

interface Resultado { precoVenda: string; lucro: string; margem: number | string; markup: number | string }
const resultado = ref<Resultado | null>(null)
const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function calcular() {
  const custo = Number(precoCusto.value) || 0
  if (!custo) return

  let venda = 0, lucro = 0, margem: number = 0, markup: number = 0

  if (modo.value === 'custo-venda') {
    venda = Number(precoVenda.value) || 0
    if (venda <= custo) { resultado.value = null; return }
    lucro = venda - custo
    margem = (lucro / venda) * 100
    markup = (lucro / custo) * 100

  } else if (modo.value === 'custo-margem') {
    const m = Number(margemDesejada.value) || 0
    if (m >= 100) { Swal.fire({ icon: 'warning', title: 'Margem deve ser < 100%', confirmButtonColor: '#2563eb' }); return }
    venda  = custo / (1 - m / 100)
    lucro  = venda - custo
    margem = m
    markup = (lucro / custo) * 100

  } else {
    const mk = Number(markupDesejado.value) || 0
    venda  = custo * (1 + mk / 100)
    lucro  = venda - custo
    markup = mk
    margem = (lucro / venda) * 100
  }

  resultado.value = {
    precoVenda: venda.toFixed(2),
    lucro: lucro.toFixed(2),
    margem: margem.toFixed(2),
    markup: markup.toFixed(2),
  }
}

function calcularAuto() { if (precoCusto.value) calcular() }

calcularAuto()
watch([modo, precoCusto, precoVenda, margemDesejada, markupDesejado], calcularAuto)
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.25s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>

