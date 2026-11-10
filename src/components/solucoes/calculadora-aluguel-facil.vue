<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

interface RentalResult {
  baseRent: number; adjustedRent: number
  recommendations: { minRent: number; maxRent: number; confidence: 'baixa' | 'média' | 'alta' }
  marketAnalysis: { pricePerM2: number; yieldEstimate: number }
}

const propertyTypes = [
  { key: 'apartamento', name: 'Apartamento', mult: 1.0 },
  { key: 'casa', name: 'Casa', mult: 0.9 },
  { key: 'comercial', name: 'Comercial', mult: 1.1 },
  { key: 'sala', name: 'Sala/Escritório', mult: 1.15 },
  { key: 'galpao', name: 'Galpão/Armazém', mult: 0.75 },
]
const locations = [
  { key: 'centro', name: 'Centro/Nobre', factor: 0.0065 },
  { key: 'bairro_bom', name: 'Bairro Bom', factor: 0.0055 },
  { key: 'bairro_medio', name: 'Bairro Médio', factor: 0.0045 },
  { key: 'bairro_popular', name: 'Bairro Popular', factor: 0.0035 },
  { key: 'periferia', name: 'Periferia', factor: 0.0025 },
]
const conditions = [
  { key: 'novo', name: 'Novo/Reformado', factor: 1.1 },
  { key: 'bom', name: 'Bom Estado', factor: 1.0 },
  { key: 'regular', name: 'Estado Regular', factor: 0.9 },
  { key: 'precario', name: 'Precário', factor: 0.75 },
]
const furnishedOptions = [
  { key: 'mobiliado', name: 'Mobiliado', factor: 1.3 },
  { key: 'semi', name: 'Semi-Mobiliado', factor: 1.1 },
  { key: 'vazio', name: 'Sem Mobília', factor: 1.0 },
]

const params = reactive({
  propertyValue: 0, propertyType: 'apartamento', location: 'bairro_bom',
  condition: 'bom', furnished: 'vazio', propertySize: 0,
})
const showAdvanced = ref(false)
const result = ref<RentalResult | null>(null)

const propertyValueInput = ref('')
function onPropertyValueInput(e: Event) {
  const val = (e.target as HTMLInputElement).value.replace(/\D/g, '')
  propertyValueInput.value = Number(val).toLocaleString('pt-BR')
  params.propertyValue = Number(val)
}

const confidenceClass = computed(() => {
  if (!result.value) return ''
  const c = result.value.recommendations.confidence
  if (c === 'alta') return 'bg-green-900/20 border-green-500/30 text-green-400'
  if (c === 'média') return 'bg-yellow-900/20 border-yellow-500/30 text-yellow-400'
  return 'bg-red-900/20 border-red-500/30 text-red-400'
})

function calcular() {
  if (!params.propertyValue || !params.propertySize) {
    Swal.fire({ icon: 'warning', title: 'Informe o valor de mercado e a área do imóvel', confirmButtonColor: '#3b82f6' }); return
  }
  const type = propertyTypes.find(t => t.key === params.propertyType)!
  const location = locations.find(l => l.key === params.location)!
  const condition = conditions.find(c => c.key === params.condition)!
  const furnished = furnishedOptions.find(f => f.key === params.furnished)!

  let baseRent = params.propertyValue * location.factor
  let adjustedRent = baseRent * type.mult * condition.factor * furnished.factor
  // Ajuste por tamanho
  if (params.propertySize > 200) adjustedRent *= 0.95
  else if (params.propertySize < 50) adjustedRent *= 1.1

  const fields = [params.propertyValue > 0, params.propertyType, params.location, params.condition, params.furnished, params.propertySize > 0]
  const score = fields.filter(Boolean).length
  const confidence = score >= 5 ? 'alta' : score >= 3 ? 'média' : 'baixa'

  result.value = {
    baseRent: Math.round(baseRent),
    adjustedRent: Math.round(adjustedRent),
    recommendations: {
      minRent: Math.round(adjustedRent * 0.85),
      maxRent: Math.round(adjustedRent * 1.15),
      confidence,
    },
    marketAnalysis: {
      pricePerM2: Math.round(adjustedRent / params.propertySize),
      yieldEstimate: Math.round(((adjustedRent * 12) / params.propertyValue) * 100 * 100) / 100,
    },
  }
  Swal.fire({ icon: 'success', title: 'Aluguel calculado!', html: `Valor sugerido: <strong>${fmt(result.value.adjustedRent)}/mês</strong>`, timer: 2000, showConfirmButton: false })
}

async function compartilhar() {
  if (!result.value) return
  const text = `Valor de aluguel sugerido: ${fmt(result.value.adjustedRent)}/mês | Faixa: ${fmt(result.value.recommendations.minRent)}-${fmt(result.value.recommendations.maxRent)}`
  try { await navigator.clipboard.writeText(text); Swal.fire({ icon: 'success', title: 'Copiado!', timer: 1200, showConfirmButton: false }) }
  catch { /* noop */ }
}

function fmt(v: number) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
</script>

<template>
  <div class="max-w-5xl mx-auto p-4 space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:home-city-outline" class="text-blue-400 w-7 h-7" />
        Calculadora de Aluguel Fácil
      </h1>
      <p class="text-blue-200 text-sm">Determine o valor ideal de aluguel com base em variáveis de mercado</p>
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Formulário -->
      <div class="lg:col-span-2 space-y-4">
        <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4">
          <h2 class="text-white font-semibold text-sm flex items-center gap-2">
            <Icon icon="mdi:home-outline" class="text-blue-400 w-4 h-4" /> Dados Básicos do Imóvel
          </h2>
          <div class="bg-blue-900/20 border border-blue-500/20 rounded-lg p-3">
            <p class="text-blue-200 text-xs flex items-start gap-2">
              <Icon icon="mdi:lightbulb-outline" class="text-yellow-400 w-4 h-4 shrink-0 mt-0.5" />
              Preencha o máximo de campos para resultado mais preciso. Obrigatórios: valor de mercado e área.
            </p>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-blue-200 text-xs font-medium block mb-1">Valor de Mercado (R$)</label>
              <input :value="propertyValueInput" type="text" inputmode="numeric" autocomplete="off" placeholder="Ex: 500.000"
                @input="onPropertyValueInput"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
            </div>
            <div>
              <label class="text-blue-200 text-xs font-medium block mb-1">Área (m²)</label>
              <input v-model.number="params.propertySize" type="number" min="0" autocomplete="off" placeholder="Ex: 80"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-blue-200 text-xs font-medium block mb-1">Tipo de Imóvel</label>
              <select v-model="params.propertyType" autocomplete="off"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                <option v-for="t in propertyTypes" :key="t.key" :value="t.key">{{ t.name }}</option>
              </select>
            </div>
            <div>
              <label class="text-blue-200 text-xs font-medium block mb-1">Localização</label>
              <select v-model="params.location" autocomplete="off"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                <option v-for="l in locations" :key="l.key" :value="l.key">{{ l.name }}</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-blue-200 text-xs font-medium block mb-1">Estado de Conservação</label>
              <select v-model="params.condition" autocomplete="off"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                <option v-for="c in conditions" :key="c.key" :value="c.key">{{ c.name }}</option>
              </select>
            </div>
            <div>
              <label class="text-blue-200 text-xs font-medium block mb-1">Mobília</label>
              <select v-model="params.furnished" autocomplete="off"
                class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                <option v-for="f in furnishedOptions" :key="f.key" :value="f.key">{{ f.name }}</option>
              </select>
            </div>
          </div>
          <button @click="calcular"
            class="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
            <Icon icon="mdi:calculator" class="w-4 h-4" /> Calcular Valor de Aluguel
          </button>
        </div>
      </div>

      <!-- Resultado -->
      <div class="space-y-4">
        <div v-if="result" class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4 sticky top-4">
          <h3 class="text-white font-semibold text-sm flex items-center gap-2">
            <Icon icon="mdi:chart-line" class="text-blue-400 w-4 h-4" /> Resultado
          </h3>
          <div class="bg-blue-900/30 border border-blue-500/20 rounded-xl p-4 text-center">
            <div class="text-blue-200 text-xs mb-1">Valor Sugerido</div>
            <div class="text-3xl font-black text-white">{{ fmt(result.adjustedRent) }}</div>
            <div class="text-blue-300 text-xs mt-1">por mês</div>
          </div>
          <div :class="['border rounded-lg p-2.5 text-center text-sm font-medium', confidenceClass]">
            Confiança: {{ result.recommendations.confidence }}
          </div>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between"><span class="text-blue-200">Faixa mínima</span><span class="text-white">{{ fmt(result.recommendations.minRent) }}</span></div>
            <div class="flex justify-between"><span class="text-blue-200">Faixa máxima</span><span class="text-white">{{ fmt(result.recommendations.maxRent) }}</span></div>
            <div class="flex justify-between border-t border-white/10 pt-2"><span class="text-blue-200">Preço/m²</span><span class="text-white">{{ fmt(result.marketAnalysis.pricePerM2) }}</span></div>
            <div class="flex justify-between"><span class="text-blue-200">Rentabilidade/ano</span><span class="text-white">{{ result.marketAnalysis.yieldEstimate }}%</span></div>
          </div>
          <button @click="compartilhar" class="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2">
            <Icon icon="mdi:content-copy" class="w-4 h-4" /> Copiar Resumo
          </button>
        </div>
        <div v-else class="bg-[#0f1e3c] border border-white/10 rounded-xl flex items-center justify-center p-10">
          <div class="text-center">
            <Icon icon="mdi:home-city-outline" class="w-12 h-12 text-blue-400/20 mx-auto mb-3" />
            <p class="text-blue-200 text-sm">Preencha os dados e calcule</p>
          </div>
        </div>
        <div class="bg-[#0f1e3c] border border-yellow-500/20 rounded-xl p-3">
          <p class="text-yellow-200 text-xs flex items-start gap-2">
            <Icon icon="mdi:alert-outline" class="w-4 h-4 shrink-0 mt-0.5" />
            Este cálculo é uma estimativa. Pesquise valores similares na região para validar.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
