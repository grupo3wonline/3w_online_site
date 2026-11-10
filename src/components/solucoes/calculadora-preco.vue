<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

interface Campos { custoFixo: number; custoVariavel: number; margem: number; impostos: number }
interface Resultado { custoTotal: number; lucro: number; impostoValor: number; precoFinal: number; precoMinimo: number; precoPremium: number }

const form = reactive<Campos>({ custoFixo: 0, custoVariavel: 0, margem: 30, impostos: 10 })
const resultado = ref<Resultado | null>(null)

const fields = [
  { key: 'custoFixo' as const, label: 'Custo Fixo (R$)', prefix: 'R$', help: 'Aluguel, salários, contas fixas' },
  { key: 'custoVariavel' as const, label: 'Custo Variável (R$)', prefix: 'R$', help: 'Matéria-prima, comissões, embalagens' },
  { key: 'margem' as const, label: 'Margem de Lucro (%)', prefix: '%', help: 'Percentual de lucro desejado (20–40%)' },
  { key: 'impostos' as const, label: 'Impostos (%)', prefix: '%', help: 'Impostos sobre vendas (consulte seu contador)' },
]

function calcular() {
  if (form.custoFixo <= 0 && form.custoVariavel <= 0) {
    Swal.fire({ icon: 'warning', title: 'Informe pelo menos um custo', confirmButtonColor: '#8b5cf6' }); return
  }
  if (form.margem < 0 || form.impostos < 0) {
    Swal.fire({ icon: 'warning', title: 'Margem e impostos não podem ser negativos', confirmButtonColor: '#8b5cf6' }); return
  }
  const custoTotal = form.custoFixo + form.custoVariavel
  const lucro = custoTotal * form.margem / 100
  const precoAntesImposto = custoTotal + lucro
  const impostoValor = precoAntesImposto * form.impostos / 100
  const precoFinal = precoAntesImposto + impostoValor
  const precoMinimo = custoTotal * 1.1 * (1 + form.impostos / 100)
  const precoPremium = custoTotal * 1.4 * (1 + form.impostos / 100)
  resultado.value = { custoTotal, lucro, impostoValor, precoFinal, precoMinimo, precoPremium }
  Swal.fire({ icon: 'success', title: 'Preço calculado!', html: `Preço sugerido: <strong>${fmt(precoFinal)}</strong>`, timer: 1800, showConfirmButton: false })
}

function limpar() { form.custoFixo = 0; form.custoVariavel = 0; form.margem = 30; form.impostos = 10; resultado.value = null }

function fmt(v: number) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }

const comparativos = computed(() => {
  if (!resultado.value) return []
  const custoTotal = form.custoFixo + form.custoVariavel
  return [10, 15, 20, 25, 30, 40].map(m => {
    const l = custoTotal * m / 100
    const p = custoTotal + l
    return { margem: m, lucro: l, preco: p + (p * form.impostos / 100) }
  })
})
</script>

<template>
  <div class="max-w-5xl mx-auto p-4 space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:tag-outline" class="text-violet-400 w-7 h-7" />
        Calculadora de Preço
      </h1>
      <p class="text-blue-200 text-sm">Calcule o preço ideal com custo, markup e margem de lucro</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Formulário -->
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4">
        <h2 class="text-white font-semibold flex items-center gap-2">
          <Icon icon="mdi:pencil-outline" class="text-violet-400 w-5 h-5" />
          Dados do Cálculo
        </h2>
        <div class="space-y-3">
          <div v-for="f in fields" :key="f.key">
            <div class="flex items-center justify-between mb-1">
              <label class="text-blue-200 text-xs font-medium">{{ f.label }}</label>
              <span class="text-blue-400/60 text-xs" :title="f.help">ⓘ {{ f.help }}</span>
            </div>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 text-xs font-medium">{{ f.prefix }}</span>
              <input v-model.number="form[f.key]" type="number" min="0" step="0.01" autocomplete="off" placeholder="0,00"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50" />
            </div>
          </div>
        </div>
        <div class="flex gap-3">
          <button @click="calcular"
            class="flex-1 bg-violet-600 hover:bg-violet-500 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
            <Icon icon="mdi:calculator" class="w-4 h-4" /> Calcular Preço
          </button>
          <button @click="limpar" class="bg-white/10 hover:bg-white/20 text-white py-2.5 px-4 rounded-lg transition-colors text-sm">
            <Icon icon="mdi:refresh" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Resultado -->
      <div class="space-y-4">
        <div v-if="resultado" class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4">
          <!-- Preço principal -->
          <div class="bg-gradient-to-br from-violet-700 to-purple-700 rounded-xl p-5 text-center">
            <div class="text-white/80 text-sm mb-1">Preço Sugerido</div>
            <div class="text-4xl font-black text-white">{{ fmt(resultado.precoFinal) }}</div>
          </div>
          <!-- Breakdown -->
          <div class="space-y-2">
            <div v-for="item in [
              { label: 'Custo Total', value: fmt(resultado.custoTotal) },
              { label: 'Lucro', value: fmt(resultado.lucro) },
              { label: 'Impostos', value: fmt(resultado.impostoValor) },
            ]" :key="item.label" class="flex justify-between text-sm">
              <span class="text-blue-200">{{ item.label }}</span>
              <span class="text-white font-medium">{{ item.value }}</span>
            </div>
          </div>
          <!-- Faixa -->
          <div class="grid grid-cols-2 gap-3 border-t border-white/10 pt-3">
            <div class="text-center">
              <div class="text-xs text-blue-200 mb-0.5">Preço Mínimo</div>
              <div class="text-white font-bold">{{ fmt(resultado.precoMinimo) }}</div>
            </div>
            <div class="text-center">
              <div class="text-xs text-blue-200 mb-0.5">Preço Premium</div>
              <div class="text-white font-bold">{{ fmt(resultado.precoPremium) }}</div>
            </div>
          </div>
        </div>
        <div v-else class="bg-[#0f1e3c] border border-white/10 rounded-xl flex items-center justify-center p-10">
          <div class="text-center">
            <Icon icon="mdi:tag-outline" class="w-14 h-14 text-violet-400/20 mx-auto mb-3" />
            <p class="text-blue-200 text-sm">Preencha os dados e calcule o preço</p>
          </div>
        </div>

        <!-- Tabela comparativa -->
        <div v-if="comparativos.length" class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4">
          <h3 class="text-white text-sm font-semibold mb-2">Comparativo de Margens</h3>
          <div class="space-y-1">
            <div v-for="c in comparativos" :key="c.margem" class="flex justify-between text-xs" :class="c.margem === form.margem ? 'text-violet-300 font-semibold' : 'text-blue-200'">
              <span>Margem {{ c.margem }}%</span>
              <span>{{ fmt(c.lucro) }} lucro</span>
              <span>{{ fmt(c.preco) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
