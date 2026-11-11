<template>
  <ToolShell
    title="Calculadora de Desconto"
    description="Calcule descontos, preços com desconto e porcentagem de desconto necessária para atingir um preço-alvo."
    icon="fa-percent"
    icon-gradient="from-orange-500 to-red-600"
    orb-color="orange"
    :quick-tips="['3 modos de cálculo', 'Comparativo de preços', 'Análise de margem']"
    :tips="[
      { title: 'Descontos em cascata',   text: 'Um desconto de 20% seguido de 10% NÃO é 30%. É na verdade 28% (0.8 × 0.9 = 0.72 → 28% de desconto).' },
      { title: 'Markup vs Margem',       text: 'Um markup de 50% gera margem de 33,3% sobre o preço de venda — atenção ao conceito usado na sua empresa.', type: 'info' },
    ]"
    :examples="[
      { title: 'Black Friday',    desc: 'Produto R$ 299,90 com 30% de desconto',   result: 'R$ 209,93 (economia de R$ 89,97)' },
      { title: 'Desconto negociado', desc: 'Produto R$ 1.500, cliente quer pagar R$ 1.200', result: '20% de desconto necessário' },
      { title: 'Desconto em cascata', desc: '15% + 5% adicionais sobre R$ 500',   result: 'Desconto real = 19,25%' },
    ]"
  >

    <!-- ── Modo de cálculo ───────────────────────────────────── -->
    <div class="tool-section">
      <label class="input-aurora-label mb-2">
        <i class="fas fa-sliders mr-1.5 text-orange-500"></i>
        Modo de cálculo
      </label>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <button
          v-for="m in modos"
          :key="m.id"
          :class="[
            'flex flex-col items-center gap-1 p-3 rounded-xl border-2 text-xs font-semibold transition-all',
            modo === m.id
              ? 'bg-primary-600 text-white border-primary-600'
              : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 border-gray-200 dark:border-slate-600 hover:border-primary-400'
          ]"
          @click="modo = (m.id as typeof modo.value); calcular()"
        >
          <i :class="['fas', m.icon, 'text-base']"></i>
          <span>{{ m.label }}</span>
        </button>
      </div>
    </div>

    <!-- ── Formulário ─────────────────────────────────────────── -->
    <div class="tool-body">
      <div class="space-y-4">
        <template v-if="modo === 'desconto'">
          <BaseInput v-model="precoOriginal" label="Preço Original (R$)" type="number" icon="fa-tag" placeholder="299,90" step="0.01" @input="calcular" />
          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="input-aurora-label !mb-0">
                <i class="fas fa-percent mr-1 text-orange-500"></i>
                Percentual de desconto
              </label>
              <span class="text-2xl font-black text-orange-600 dark:text-orange-400">{{ desconto }}%</span>
            </div>
            <input v-model.number="desconto" type="range" min="0" max="99" class="range-aurora" @input="calcular" />
            <div class="flex justify-between text-[10px] text-gray-400 dark:text-slate-500 mt-1">
              <span>0%</span><span>Desconto máximo 99%</span>
            </div>
          </div>
        </template>

        <template v-if="modo === 'alvo'">
          <BaseInput v-model="precoOriginal" label="Preço Original (R$)" type="number" icon="fa-tag" step="0.01" @input="calcular" />
          <BaseInput v-model="precoAlvo" label="Preço Desejado (R$)" type="number" icon="fa-bullseye" step="0.01" @input="calcular" />
        </template>

        <template v-if="modo === 'cascata'">
          <BaseInput v-model="precoOriginal" label="Preço Original (R$)" type="number" icon="fa-tag" step="0.01" @input="calcular" />
          <div class="grid grid-cols-2 gap-3">
            <BaseInput v-model="desconto1" label="1º Desconto (%)" type="number" icon="fa-percent" @input="calcular" />
            <BaseInput v-model="desconto2" label="2º Desconto (%)" type="number" icon="fa-percent" @input="calcular" />
            <BaseInput v-model="desconto3" label="3º Desconto (%) — opcional" type="number" icon="fa-percent" @input="calcular" />
          </div>
        </template>
      </div>

      <BaseButton variant="danger" icon="fa-tags" @click="calcular" class="w-full mt-4">
        Calcular Desconto
      </BaseButton>
    </div>

    <!-- ── Resultado ─────────────────────────────────────────── -->
    <Transition name="scale-in">
      <div v-if="resultado" class="mt-4 space-y-4">
        <div class="tool-result-warning">
          <div class="grid grid-cols-3 gap-4 text-center">
            <div>
              <p class="text-xs text-gray-600 dark:text-slate-300 mb-1">Preço Original</p>
              <p class="text-lg font-bold text-gray-500 dark:text-slate-300 line-through">
                {{ formatarMoeda(resultado.precoOriginal) }}
              </p>
            </div>
            <div>
              <p class="text-xs text-orange-700 dark:text-orange-300 mb-1 font-semibold">Desconto</p>
              <p class="text-2xl font-black text-orange-600 dark:text-orange-400">{{ resultado.percentual.toFixed(1) }}%</p>
            </div>
            <div>
              <p class="text-xs text-emerald-700 dark:text-emerald-300 mb-1 font-semibold">Preço Final</p>
              <p class="text-2xl font-black text-emerald-600 dark:text-emerald-400">{{ formatarMoeda(resultado.precoFinal) }}</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="metric-glass ring-1 ring-orange-100 dark:ring-orange-900">
            <div class="metric-glass-value text-orange-600 dark:text-orange-400">{{ formatarMoeda(resultado.economia) }}</div>
            <div class="metric-glass-label">Economia total</div>
          </div>
          <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
            <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ resultado.multiplicador.toFixed(3) }}×</div>
            <div class="metric-glass-label">Fator multiplicador</div>
          </div>
        </div>

        <div class="tip-card">
          <i class="fas fa-info-circle text-blue-500 flex-shrink-0 mt-0.5"></i>
          <span>
            Para obter <strong>{{ resultado.percentual.toFixed(1) }}%</strong> de desconto, multiplique qualquer preço por
            <strong>{{ resultado.multiplicador.toFixed(4) }}</strong>.
          </span>
        </div>
      </div>
    </Transition>

  </ToolShell>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const modo = ref<'desconto' | 'alvo' | 'cascata'>('desconto')
const precoOriginal = ref<number | ''>(299.90)
const precoAlvo     = ref<number | ''>(209.93)
const desconto      = ref(30)
const desconto1     = ref<number | ''>(15)
const desconto2     = ref<number | ''>(5)
const desconto3     = ref<number | ''>(0)

const modos = [
  { id: 'desconto', label: 'Desconto em %',         icon: 'fa-percent'      },
  { id: 'alvo',     label: 'Calcular % necessário',  icon: 'fa-bullseye'     },
  { id: 'cascata',  label: 'Descontos em cascata',   icon: 'fa-layer-group'  },
]

interface Resultado { precoOriginal: number; precoFinal: number; economia: number; percentual: number; multiplicador: number }
const resultado = ref<Resultado | null>(null)

function calcular() {
  const po = Number(precoOriginal.value) || 0
  if (!po) { resultado.value = null; return }

  let pf   = 0
  let pct  = 0

  if (modo.value === 'desconto') {
    pct = desconto.value
    pf  = po * (1 - pct / 100)
  } else if (modo.value === 'alvo') {
    const pa = Number(precoAlvo.value) || 0
    if (!pa || pa >= po) { resultado.value = null; return }
    pf  = pa
    pct = ((po - pa) / po) * 100
  } else {
    const d1 = Number(desconto1.value) || 0
    const d2 = Number(desconto2.value) || 0
    const d3 = Number(desconto3.value) || 0
    pf  = po * (1 - d1/100) * (1 - d2/100) * (1 - d3/100)
    pct = ((po - pf) / po) * 100
  }

  resultado.value = {
    precoOriginal: po, precoFinal: pf,
    economia: po - pf, percentual: pct,
    multiplicador: pf / po,
  }
}

const formatarMoeda = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

calcular()
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.25s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>
