<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, reactive, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

type Complexity = 'basic' | 'standard' | 'advanced' | 'premium'

const COMPLEXITY_OPTIONS = [
  { value: 'basic', label: 'Básico (iniciante)', multiplier: 0.85 },
  { value: 'standard', label: 'Padrão (intermediário)', multiplier: 1 },
  { value: 'advanced', label: 'Avançado (especialista)', multiplier: 1.35 },
  { value: 'premium', label: 'Premium (sênior/agência)', multiplier: 1.7 },
] as const

const PRICING = {
  basePrice: 0.05, platformMultiplier: 10, postMultiplier: 5, videoMultiplier: 18,
  frequencyMultiplier: 2, engagementMultiplier: 0.1, weeksInMonth: 4.33, scale: 10, minimum: 500,
  addons: { adsManagement: 450, reports: 250, communityManagement: 380 },
} as const

const data = reactive({
  profiles: 0, platforms: 0, posts: 0, videos: 0, frequency: 0, engagement: 0,
  complexity: 'standard' as Complexity,
  adsManagement: false, reports: false, communityManagement: false,
})

interface CalculationResult { total: number; monthly: number; hourlyEstimate: number; isMinimumApplied: boolean }
const result = ref<CalculationResult | null>(null)

function calculate() {
  if (!data.profiles || !data.platforms || !data.posts || !data.frequency) {
    Swal.fire({ icon: 'warning', title: 'Preencha os campos obrigatórios', text: 'Perfis, plataformas, posts e frequência são obrigatórios.', confirmButtonColor: '#e91e8c' }); return
  }
  const complexityMult = COMPLEXITY_OPTIONS.find(c => c.value === data.complexity)?.multiplier ?? 1
  const base = (
    data.profiles * PRICING.platformMultiplier +
    data.posts * PRICING.postMultiplier * data.frequency * PRICING.weeksInMonth +
    data.videos * PRICING.videoMultiplier * PRICING.weeksInMonth +
    data.frequency * PRICING.frequencyMultiplier +
    data.engagement * PRICING.engagementMultiplier * data.profiles
  ) * PRICING.scale * PRICING.basePrice * data.platforms
  const withComplexity = base * complexityMult
  const addonsTotal =
    (data.adsManagement ? PRICING.addons.adsManagement : 0) +
    (data.reports ? PRICING.addons.reports : 0) +
    (data.communityManagement ? PRICING.addons.communityManagement : 0)
  const totalRaw = withComplexity + addonsTotal
  const monthly = Math.max(PRICING.minimum, Math.round(totalRaw))
  const isMinimumApplied = totalRaw < PRICING.minimum
  const hourlyEstimate = Math.round(monthly / (data.posts * data.frequency * PRICING.weeksInMonth * 2 + data.videos * PRICING.weeksInMonth * 3))
  result.value = { total: monthly * 12, monthly, hourlyEstimate: isFinite(hourlyEstimate) ? hourlyEstimate : 0, isMinimumApplied }
  Swal.fire({ icon: 'success', title: 'Calculado!', html: `Valor mensal: <strong>${fmt(monthly)}</strong>`, timer: 1800, showConfirmButton: false })
}

function limpar() { Object.assign(data, { profiles: 0, platforms: 0, posts: 0, videos: 0, frequency: 0, engagement: 0, complexity: 'standard', adsManagement: false, reports: false, communityManagement: false }); result.value = null }

function fmt(v: number) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }

const fields = [
  { key: 'profiles', label: 'Perfis', tooltip: 'Total de perfis/contas que você vai gerenciar', icon: 'mdi:account-multiple' },
  { key: 'platforms', label: 'Plataformas', tooltip: 'Instagram, Facebook, LinkedIn, TikTok, YouTube, X', icon: 'mdi:layers' },
  { key: 'posts', label: 'Posts Estáticos/Semana', tooltip: 'Quantidade de posts estáticos por semana', icon: 'mdi:image' },
  { key: 'videos', label: 'Vídeos/Reels por Semana', tooltip: 'Vídeos, Reels ou Shorts por semana', icon: 'mdi:play-circle-outline' },
  { key: 'frequency', label: 'Frequência por Semana', tooltip: 'Número de postagens por semana por perfil', icon: 'mdi:calendar-week' },
  { key: 'engagement', label: 'Taxa de Engajamento (%)', tooltip: 'Taxa média de engajamento esperada', icon: 'mdi:trending-up', step: '0.1', max: '100' },
] as const

const addons = [
  { key: 'adsManagement' as const, label: 'Gestão de Anúncios', price: PRICING.addons.adsManagement, icon: 'mdi:bullhorn-outline' },
  { key: 'reports' as const, label: 'Relatórios Mensais', price: PRICING.addons.reports, icon: 'mdi:file-chart-outline' },
  { key: 'communityManagement' as const, label: 'Gestão de Comunidade', price: PRICING.addons.communityManagement, icon: 'mdi:message-text-outline' },
]
</script>

<template>
  <ToolShell

    title="Calculadora Social Mídia"

    description="Calcule o orçamento e retorno de campanhas em redes sociais."

    icon="fa-hashtag"

    icon-gradient="from-pink-500 to-rose-700"

    orb-color="purple"

    :quick-tips="['Resultados instantâneos', 'Sem cadastro', '100% client-side']"

    :tips="[{ title: 'Uso recomendado', text: 'Preencha todos os campos e veja o resultado em tempo real.' }]"

  >

    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:instagram" class="text-pink-400 w-7 h-7" />
        Calculadora de Social Mídia
      </h1>
      <p class="text-blue-200 text-sm">Calcule o valor dos seus serviços de gestão de redes sociais</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Formulário -->
      <div class="glass-panel p-5 space-y-4">
        <h2 class="text-white font-semibold text-sm flex items-center gap-2">
          <Icon icon="mdi:tune" class="text-pink-400 w-4 h-4" /> Parâmetros
        </h2>

        <div class="grid grid-cols-2 gap-3">
          <div v-for="f in fields" :key="f.key">
            <label class="text-blue-200 text-xs font-medium block mb-1 flex items-center gap-1">
              <Icon :icon="f.icon" class="w-3 h-3" /> {{ f.label }}
            </label>
            <input v-model.number="data[f.key]" type="number" min="0" :step="(f as any).step ?? '1'" :max="(f as any).max" autocomplete="off"
              class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50" />
          </div>
        </div>

        <!-- Complexidade -->
        <div>
          <label class="input-aurora-label">Nível de Complexidade/Senioridade</label>
          <select v-model="data.complexity" autocomplete="off"
            class="w-full input-aurora">
            <option v-for="opt in COMPLEXITY_OPTIONS" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
        </div>

        <!-- Adicionais -->
        <div>
          <label class="text-blue-200 text-xs font-medium block mb-2">Serviços Adicionais</label>
          <div class="space-y-2">
            <label v-for="addon in addons" :key="addon.key"
              class="flex items-center gap-3 cursor-pointer border border-white/10 rounded-lg p-2.5 hover:bg-white/5 transition-colors">
              <input type="checkbox" v-model="data[addon.key]" class="rounded h-4 w-4 accent-pink-500" />
              <Icon :icon="addon.icon" class="text-pink-400 w-4 h-4" />
              <div class="flex-1">
                <div class="text-white text-xs font-medium">{{ addon.label }}</div>
              </div>
              <span class="text-blue-300 text-xs">+{{ fmt(addon.price) }}/mês</span>
            </label>
          </div>
        </div>

        <div class="flex gap-3">
          <button @click="calculate"
            class="flex-1 bg-pink-700 hover:bg-pink-600 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
            <Icon icon="mdi:calculator" class="w-4 h-4" /> Calcular Valor
          </button>
          <button @click="limpar" class="bg-white/10 hover:bg-white/20 text-white py-2.5 px-4 rounded-lg transition-colors text-sm">
            <Icon icon="mdi:refresh" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Resultado -->
      <div class="space-y-4">
        <div v-if="result" class="glass-panel p-5 space-y-4">
          <div class="tool-header text-center">
            <div v-if="result.isMinimumApplied" class="text-pink-200 text-xs mb-1">Mínimo aplicado</div>
            <div class="text-white/80 text-sm mb-1">Valor Mensal</div>
            <div class="text-4xl font-black text-white">{{ fmt(result.monthly) }}</div>
            <div class="text-pink-100 text-xs mt-1">{{ fmt(result.total) }}/ano</div>
          </div>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between"><span class="text-blue-200">Valor mensal</span><span class="text-white font-semibold">{{ fmt(result.monthly) }}</span></div>
            <div class="flex justify-between"><span class="text-blue-200">Valor anual</span><span class="text-white font-semibold">{{ fmt(result.total) }}</span></div>
            <div v-if="result.hourlyEstimate > 0" class="flex justify-between"><span class="text-blue-200">Estimativa por hora</span><span class="text-white font-semibold">{{ fmt(result.hourlyEstimate) }}/h</span></div>
          </div>
          <div class="bg-blue-900/20 border border-blue-500/20 rounded-lg p-3">
            <p class="text-blue-200 text-xs flex items-start gap-2">
              <Icon icon="mdi:information-outline" class="w-4 h-4 mt-0.5 shrink-0" />
              Estimativa baseada em modelo de precificação. Ajuste conforme mercado local.
            </p>
          </div>
        </div>
        <div v-else class="glass-panel flex items-center justify-center p-12">
          <div class="text-center">
            <Icon icon="mdi:instagram" class="w-14 h-14 text-pink-400/20 mx-auto mb-3" />
            <p class="text-blue-200 text-sm">Preencha os dados e calcule o valor</p>
          </div>
        </div>
      </div>
    </div>
  


  </ToolShell></template>