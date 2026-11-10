<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

interface CampanhaInput {
  orcamento: number
  cpc: number
  ctr: number
  taxaConversao: number
  ticketMedio: number
  canal: string
}

interface ResultadoCampanha {
  cliques: number
  impressoes: number
  conversoes: number
  custoConversao: number
  receita: number
  roi: number
  pontoEquilibrio: number
}

const canais = [
  { valor: 'google-ads', label: 'Google Ads' },
  { valor: 'meta-ads', label: 'Meta Ads (Facebook/Instagram)' },
  { valor: 'linkedin-ads', label: 'LinkedIn Ads' },
  { valor: 'tiktok-ads', label: 'TikTok Ads' },
  { valor: 'youtube-ads', label: 'YouTube Ads' },
]

const inputs = reactive<CampanhaInput>({
  orcamento: 10000,
  cpc: 4.0,
  ctr: 2.5,
  taxaConversao: 3.0,
  ticketMedio: 500,
  canal: 'google-ads',
})

const resultado = ref<ResultadoCampanha | null>(null)

function calcular() {
  if (inputs.orcamento <= 0 || inputs.cpc <= 0 || inputs.ctr <= 0 || inputs.taxaConversao <= 0 || inputs.ticketMedio <= 0) {
    Swal.fire({ icon: 'warning', title: 'Dados inválidos', text: 'Preencha todos os campos com valores maiores que zero.', confirmButtonColor: '#4f46e5' })
    return
  }
  const cliques = Math.round(inputs.orcamento / inputs.cpc)
  const impressoes = Math.round(cliques / (inputs.ctr / 100))
  const conversoes = Math.round(cliques * (inputs.taxaConversao / 100) * 100) / 100
  const custoConversao = Math.round((inputs.orcamento / conversoes) * 100) / 100
  const receita = Math.round(conversoes * inputs.ticketMedio * 100) / 100
  const roi = Math.round(((receita - inputs.orcamento) / inputs.orcamento) * 100 * 100) / 100
  const pontoEquilibrio = Math.round((inputs.orcamento / inputs.ticketMedio) * 100) / 100
  resultado.value = { cliques, impressoes, conversoes, custoConversao, receita, roi, pontoEquilibrio }
  Swal.fire({ icon: 'success', title: 'Cálculo realizado!', text: 'Seus resultados estão prontos.', timer: 1500, showConfirmButton: false })
}

function reiniciar() {
  resultado.value = null
}

function fmt(v: number): string {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
function fmtN(v: number): string {
  return v.toLocaleString('pt-BR')
}

const roiClass = computed(() => {
  if (!resultado.value) return ''
  return resultado.value.roi >= 0
    ? 'text-green-400 bg-green-900/20 border-green-500/20'
    : 'text-red-400 bg-red-900/20 border-red-500/20'
})
</script>

<template>
  <div class="max-w-5xl mx-auto p-4 space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:chart-line" class="text-indigo-400 w-7 h-7" />
        Calculadora de Campanha de Tráfego
      </h1>
      <p class="text-blue-200 text-sm">Simule ROI, CPC, CTR e conversões da sua campanha</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Formulário -->
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4">
        <h2 class="text-white font-semibold flex items-center gap-2">
          <Icon icon="mdi:tune" class="text-indigo-400 w-5 h-5" />
          Parâmetros da Campanha
        </h2>
        <div class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-blue-200 text-xs font-medium block mb-1">Orçamento Total (R$)</label>
              <input v-model.number="inputs.orcamento" type="number" min="0" step="100" autocomplete="off"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
            </div>
            <div>
              <label class="text-blue-200 text-xs font-medium block mb-1">CPC Médio (R$)</label>
              <input v-model.number="inputs.cpc" type="number" min="0" step="0.01" autocomplete="off"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-blue-200 text-xs font-medium block mb-1">CTR Esperado (%)</label>
              <input v-model.number="inputs.ctr" type="number" min="0" max="100" step="0.1" autocomplete="off"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
            </div>
            <div>
              <label class="text-blue-200 text-xs font-medium block mb-1">Taxa de Conversão (%)</label>
              <input v-model.number="inputs.taxaConversao" type="number" min="0" max="100" step="0.1" autocomplete="off"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-blue-200 text-xs font-medium block mb-1">Ticket Médio (R$)</label>
              <input v-model.number="inputs.ticketMedio" type="number" min="0" step="10" autocomplete="off"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
            </div>
            <div>
              <label class="text-blue-200 text-xs font-medium block mb-1">Canal</label>
              <select v-model="inputs.canal" autocomplete="off"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                <option v-for="c in canais" :key="c.valor" :value="c.valor">{{ c.label }}</option>
              </select>
            </div>
          </div>
          <div class="flex gap-3 pt-1">
            <button @click="calcular"
              class="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
              <Icon icon="mdi:calculator" class="w-4 h-4" />
              Calcular ROI
            </button>
            <button v-if="resultado" @click="reiniciar"
              class="bg-white/10 hover:bg-white/20 text-white py-2.5 px-4 rounded-lg transition-colors text-sm">
              <Icon icon="mdi:refresh" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Resultados -->
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4">
        <h2 class="text-white font-semibold flex items-center gap-2">
          <Icon icon="mdi:chart-areaspline" class="text-indigo-400 w-5 h-5" />
          Resultados da Simulação
        </h2>
        <template v-if="resultado">
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-indigo-900/30 border border-indigo-500/20 rounded-lg p-3 text-center">
              <div class="text-2xl font-bold text-indigo-300">{{ fmtN(resultado.cliques) }}</div>
              <div class="text-blue-200 text-xs mt-0.5">Cliques Estimados</div>
            </div>
            <div class="bg-blue-900/30 border border-blue-500/20 rounded-lg p-3 text-center">
              <div class="text-2xl font-bold text-blue-300">{{ fmtN(resultado.impressoes) }}</div>
              <div class="text-blue-200 text-xs mt-0.5">Impressões</div>
            </div>
          </div>
          <div class="space-y-2">
            <div v-for="(item, i) in [
              { label: 'Conversões', value: fmtN(resultado.conversoes) },
              { label: 'Custo por Conversão', value: fmt(resultado.custoConversao) },
              { label: 'Receita Estimada', value: fmt(resultado.receita) },
              { label: 'Ponto de Equilíbrio', value: resultado.pontoEquilibrio + ' vendas' },
            ]" :key="i" class="flex justify-between text-sm">
              <span class="text-blue-200">{{ item.label }}</span>
              <span class="text-white font-semibold">{{ item.value }}</span>
            </div>
          </div>
          <div :class="['border rounded-xl p-4 text-center', roiClass]">
            <div class="text-xs font-medium mb-1">ROI Projetado</div>
            <div class="text-3xl font-black">{{ resultado.roi > 0 ? '+' : '' }}{{ resultado.roi }}%</div>
          </div>
        </template>
        <div v-else class="flex flex-col items-center justify-center py-12 text-center">
          <Icon icon="mdi:chart-bar" class="w-14 h-14 text-indigo-400/30 mb-3" />
          <p class="text-blue-200 text-sm">Preencha os parâmetros e clique em Calcular ROI</p>
        </div>
      </div>
    </div>
  </div>
</template>
