<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'
import {
  calculate,
  calculatorSchema,
  COMPLEXITY_OPTIONS,
  EMPTY_DATA,
  PRESETS,
  PRICING,
  type CalculationResult,
  type CalculatorData,
} from '@/lib/calculator'
import { formatCurrency, SITE } from '@/lib/utils'
import { useLoadingStore } from '@/stores/loading'

const loading = useLoadingStore()

const data = reactive<CalculatorData>({ ...EMPTY_DATA })
const result = ref<CalculationResult | null>(null)

interface FieldDef {
  key: 'profiles' | 'platforms' | 'posts' | 'videos' | 'frequency' | 'engagement'
  label: string
  placeholder: string
  icon: string
  tooltip: string
  max?: number
  step?: string
}

const fields: FieldDef[] = [
  {
    key: 'profiles',
    label: 'Número de Perfis',
    placeholder: 'Ex: 3',
    icon: 'lucide:users',
    tooltip:
      'Quantidade total de perfis/contas que você vai gerenciar. Ex: 3 do Instagram + 2 do Facebook = 5 perfis.',
  },
  {
    key: 'platforms',
    label: 'Número de Plataformas',
    placeholder: 'Ex: 4',
    icon: 'lucide:layers',
    tooltip:
      'Número de plataformas diferentes (Instagram, Facebook, LinkedIn, TikTok, YouTube, X). Ex: 4 plataformas.',
  },
  {
    key: 'posts',
    label: 'Posts Estáticos / Semana',
    placeholder: 'Ex: 12',
    icon: 'lucide:image',
    tooltip: 'Quantidade média de posts estáticos (feed, carrossel) por semana. Ex: 12/semana.',
  },
  {
    key: 'videos',
    label: 'Vídeos / Reels por Semana',
    placeholder: 'Ex: 4',
    icon: 'lucide:clapperboard',
    tooltip: 'Vídeos, Reels ou Shorts por semana. Custam mais que posts estáticos. Ex: 4/semana.',
  },
  {
    key: 'frequency',
    label: 'Frequência por Semana',
    placeholder: 'Ex: 7',
    icon: 'lucide:calendar-days',
    tooltip: 'Frequência de postagens por semana em cada perfil. Ex: 7 posts/semana/perfil.',
  },
  {
    key: 'engagement',
    label: 'Taxa de Engajamento (%)',
    placeholder: 'Ex: 3.5',
    icon: 'lucide:trending-up',
    tooltip:
      'Taxa média de engajamento esperada (curtidas, comentários, compartilhamentos). Ex: 3.5%.',
    max: 100,
    step: '0.1',
  },
]

const addons = [
  {
    key: 'adsManagement' as const,
    label: 'Gestão de Anúncios',
    description: 'Criação e otimização de campanhas pagas',
    icon: 'lucide:megaphone',
    price: PRICING.addons.adsManagement,
  },
  {
    key: 'reports' as const,
    label: 'Relatórios Mensais',
    description: 'Análise de métricas e resultados',
    icon: 'lucide:file-bar-chart',
    price: PRICING.addons.reports,
  },
  {
    key: 'communityManagement' as const,
    label: 'Gestão de Comunidade',
    description: 'Respostas a comentários e mensagens',
    icon: 'lucide:messages-square',
    price: PRICING.addons.communityManagement,
  },
]

const printDate = computed(() => new Date().toLocaleString('pt-BR'))

const summary = computed(() => [
  { label: 'Perfis', value: String(data.profiles), icon: 'lucide:users' },
  { label: 'Plataformas', value: String(data.platforms), icon: 'lucide:layers' },
  { label: 'Posts/semana', value: String(data.posts), icon: 'lucide:image' },
  { label: 'Vídeos/semana', value: String(data.videos), icon: 'lucide:clapperboard' },
  { label: 'Frequência/semana', value: String(data.frequency), icon: 'lucide:calendar-days' },
  { label: 'Engajamento', value: `${data.engagement}%`, icon: 'lucide:trending-up' },
])

function onInput(key: FieldDef['key'], event: Event) {
  const value = Math.max(0, parseFloat((event.target as HTMLInputElement).value) || 0)
  data[key] = value
  result.value = null
}

function applyPreset(preset: CalculatorData) {
  Object.assign(data, preset)
  result.value = null
  Swal.fire({
    icon: 'info',
    title: 'Exemplo aplicado',
    text: 'Ajuste os valores conforme sua realidade e clique em Calcular.',
    timer: 1600,
    showConfirmButton: false,
  })
}

async function handleCalculate() {
  const parsed = calculatorSchema.safeParse({ ...data })
  if (!parsed.success) {
    await Swal.fire({
      icon: 'warning',
      title: 'Campos Obrigatórios',
      text: 'Preencha perfis, plataformas, posts e frequência com valores maiores que zero.',
      confirmButtonText: 'Entendi',
      confirmButtonColor: '#7c3aed',
    })
    return
  }

  const computed = await loading.withLoading(async () => {
    await new Promise((resolve) => setTimeout(resolve, 350))
    return calculate(parsed.data)
  }, 'Calculando o valor ideal...')

  result.value = computed

  await Swal.fire({
    icon: 'success',
    title: 'Cálculo Realizado!',
    html: `<p>Valor mensal sugerido:</p><p style="font-size:1.9rem;font-weight:700;color:#7c3aed;margin-top:.5rem">${formatCurrency(computed.total)}</p>`,
    confirmButtonText: 'Ver Detalhes',
    confirmButtonColor: '#7c3aed',
  })
}

function handleReset() {
  Object.assign(data, EMPTY_DATA)
  result.value = null
  Swal.fire({
    icon: 'info',
    title: 'Formulário Limpo',
    text: 'Todos os campos foram resetados.',
    timer: 1400,
    showConfirmButton: false,
  })
}

function buildReportText(): string {
  const r = result.value!
  const lines = [
    '═══════════════════════════════════════════',
    '  CALCULADORA DE REDES SOCIAIS - 3W Online',
    '═══════════════════════════════════════════',
    '',
    `  Perfis: ${data.profiles}`,
    `  Plataformas: ${data.platforms}`,
    `  Posts/semana: ${data.posts}`,
    `  Vídeos/semana: ${data.videos}`,
    `  Frequência/semana: ${data.frequency}`,
    `  Engajamento: ${data.engagement}%`,
    `  Complexidade: ${r.complexityLabel}`,
    '',
    '  DETALHAMENTO:',
    ...r.breakdown.map((b) => `   - ${b.label}: ${formatCurrency(b.value)}`),
    '',
    `  VALOR MENSAL SUGERIDO: ${formatCurrency(r.total)}`,
    `  Estimativa valor/hora: ${formatCurrency(r.hourlyEstimate)}`,
    '',
    '═══════════════════════════════════════════',
    `  Gerado em: ${printDate.value}`,
    `  ${SITE.baseUrl}`,
    '═══════════════════════════════════════════',
  ]
  return lines.join('\n')
}

function handleExport() {
  if (!result.value) {
    Swal.fire({ icon: 'info', title: 'Nenhum Resultado', text: 'Realize um cálculo primeiro.', confirmButtonColor: '#7c3aed' })
    return
  }
  const blob = new Blob([buildReportText()], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `calculo_social_media_${new Date().toISOString().slice(0, 10)}.txt`
  a.click()
  URL.revokeObjectURL(url)
  Swal.fire({ icon: 'success', title: 'Exportado!', timer: 1600, showConfirmButton: false })
}

async function handleCopy() {
  if (!result.value) return
  try {
    await navigator.clipboard.writeText(buildReportText())
    Swal.fire({ icon: 'success', title: 'Copiado!', text: 'Resultado na área de transferência.', timer: 1500, showConfirmButton: false })
  } catch {
    Swal.fire({ icon: 'error', title: 'Não foi possível copiar', confirmButtonColor: '#7c3aed' })
  }
}

function handlePrint() {
  if (!result.value) {
    Swal.fire({ icon: 'info', title: 'Nenhum Resultado', text: 'Realize um cálculo primeiro para imprimir.', confirmButtonColor: '#7c3aed' })
    return
  }
  window.print()
}
</script>

<template>
  <div class="mx-auto w-full max-w-6xl p-4 md:p-6">
    <!-- Presets rápidos -->
    <div class="no-print mb-6 flex flex-wrap items-center justify-center gap-3">
      <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
        <Icon
          icon="lucide:wand-2"
          class="mr-1 inline h-4 w-4"
        />
        Comece com um exemplo:
      </span>
      <button
        v-for="preset in PRESETS"
        :key="preset.name"
        type="button"
        class="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 transition-all hover:-translate-y-0.5 hover:bg-violet-100 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-300"
        @click="applyPreset(preset.data)"
      >
        <Icon
          :icon="preset.icon"
          class="h-3.5 w-3.5"
        />
        {{ preset.name }}
      </button>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:gap-8">
      <!-- Formulário -->
      <div class="no-print overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-elegant dark:border-gray-700 dark:bg-gray-800">
        <div class="h-1.5 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600" />
        <div class="px-6 pb-6 pt-6">
          <div class="mb-5 text-center">
            <div class="mb-3 flex justify-center">
              <div class="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg">
                <Icon
                  icon="lucide:calculator"
                  class="h-6 w-6 text-white"
                />
              </div>
            </div>
            <h2 class="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
              Calculadora de Preços
            </h2>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Preencha os dados e descubra o valor ideal
            </p>
          </div>

          <form
            class="space-y-5"
            autocomplete="off"
            @submit.prevent="handleCalculate"
          >
            <div class="grid gap-4 sm:grid-cols-2">
              <div
                v-for="field in fields"
                :key="field.key"
                class="space-y-1.5"
              >
                <div class="flex items-center gap-2">
                  <Icon
                    :icon="field.icon"
                    class="h-4 w-4 text-violet-600 dark:text-violet-400"
                  />
                  <label
                    :for="field.key"
                    class="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {{ field.label }}
                  </label>
                  <span
                    class="group relative inline-flex cursor-help text-gray-400 hover:text-violet-600"
                    :aria-label="`Ajuda sobre ${field.label}`"
                    tabindex="0"
                  >
                    <Icon
                      icon="lucide:help-circle"
                      class="h-4 w-4"
                    />
                    <span
                      class="pointer-events-none absolute left-1/2 top-6 z-20 w-52 -translate-x-1/2 rounded-lg bg-gray-900 px-3 py-2 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus:opacity-100"
                      role="tooltip"
                    >
                      {{ field.tooltip }}
                    </span>
                  </span>
                </div>
                <input
                  :id="field.key"
                  type="number"
                  min="0"
                  :max="field.max"
                  :step="field.step"
                  :value="data[field.key] || ''"
                  :placeholder="field.placeholder"
                  autocomplete="off"
                  inputmode="decimal"
                  class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  @input="onInput(field.key, $event)"
                >
              </div>
            </div>

            <!-- Complexidade -->
            <div class="space-y-1.5">
              <label
                for="complexity"
                class="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                <Icon
                  icon="lucide:gauge"
                  class="h-4 w-4 text-violet-600 dark:text-violet-400"
                />
                Nível de Complexidade / Senioridade
              </label>
              <select
                id="complexity"
                v-model="data.complexity"
                autocomplete="off"
                class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                @change="result = null"
              >
                <option
                  v-for="opt in COMPLEXITY_OPTIONS"
                  :key="opt.value"
                  :value="opt.value"
                >
                  {{ opt.label }}
                </option>
              </select>
            </div>

            <!-- Serviços adicionais -->
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
                <Icon
                  icon="lucide:plus-circle"
                  class="mr-1 inline h-4 w-4 text-violet-600 dark:text-violet-400"
                />
                Serviços Adicionais
              </p>
              <label
                v-for="addon in addons"
                :key="addon.key"
                class="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 transition-all hover:border-violet-300 dark:border-gray-600 dark:bg-gray-700/50"
              >
                <input
                  v-model="data[addon.key]"
                  type="checkbox"
                  class="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                  @change="result = null"
                >
                <Icon
                  :icon="addon.icon"
                  class="h-5 w-5 text-violet-500"
                />
                <span class="flex-1">
                  <span class="block text-sm font-medium text-gray-900 dark:text-white">{{ addon.label }}</span>
                  <span class="block text-xs text-gray-500 dark:text-gray-400">{{ addon.description }}</span>
                </span>
                <span class="text-xs font-semibold text-violet-600 dark:text-violet-400">+{{ formatCurrency(addon.price) }}</span>
              </label>
            </div>

            <div class="flex gap-3 pt-2">
              <button
                type="submit"
                class="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3 text-base font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:from-violet-700 hover:to-indigo-700 hover:shadow-xl"
              >
                <Icon
                  icon="lucide:calculator"
                  class="mr-2 inline h-5 w-5"
                />
                Calcular
              </button>
              <button
                type="button"
                class="rounded-xl border border-gray-300 p-3 transition-all hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                title="Limpar formulário"
                aria-label="Limpar formulário"
                @click="handleReset"
              >
                <Icon
                  icon="lucide:rotate-ccw"
                  class="h-5 w-5"
                />
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Resultado -->
      <div
        id="print-area"
        class="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-elegant dark:border-gray-700 dark:bg-gray-800"
      >
        <div class="h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />
        <div class="px-6 pb-6 pt-6">
          <!-- Cabeçalho da versão impressa -->
          <div class="print-only mb-6 border-b border-gray-300 pb-4 text-center">
            <h2 class="text-xl font-bold">
              Calculadora de Redes Sociais — 3W Online
            </h2>
            <p class="text-sm">
              Relatório gerado em {{ printDate }}
            </p>
          </div>

          <div class="no-print mb-5 text-center">
            <div class="mb-3 flex justify-center">
              <div class="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg">
                <Icon
                  icon="lucide:trending-up"
                  class="h-6 w-6 text-white"
                />
              </div>
            </div>
            <h2 class="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
              Resultado
            </h2>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Valor sugerido para seus serviços
            </p>
          </div>

          <div
            v-if="result"
            class="animate-fade-in space-y-5"
          >
            <div class="print-break rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 p-6 text-center text-white shadow-xl md:p-8">
              <p class="mb-1 text-sm font-medium opacity-90">
                <Icon
                  icon="lucide:banknote"
                  class="mr-1 inline h-4 w-4"
                />
                Valor Mensal Sugerido
              </p>
              <p class="mb-1 text-3xl font-bold md:text-4xl">
                {{ formatCurrency(result.total) }}
              </p>
              <p class="text-xs opacity-70">
                por mês · ~{{ formatCurrency(result.hourlyEstimate) }}/hora estimado
              </p>
            </div>

            <!-- Detalhamento -->
            <div class="print-break rounded-xl border border-gray-200 p-4 dark:border-gray-700">
              <h3 class="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
                <Icon
                  icon="lucide:receipt-text"
                  class="h-4 w-4 text-violet-500"
                />
                Detalhamento do Cálculo
              </h3>
              <div class="space-y-2">
                <div
                  v-for="(item, i) in result.breakdown"
                  :key="i"
                  class="flex items-center justify-between text-sm"
                >
                  <span class="text-gray-500 dark:text-gray-400">{{ item.label }}</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{ formatCurrency(item.value) }}</span>
                </div>
                <div class="mt-2 flex items-center justify-between border-t border-gray-200 pt-2 text-sm font-bold dark:border-gray-700">
                  <span class="text-gray-900 dark:text-white">Total mensal</span>
                  <span class="text-violet-600 dark:text-violet-400">{{ formatCurrency(result.total) }}</span>
                </div>
              </div>
            </div>

            <div class="print-break space-y-2">
              <div
                v-for="(item, i) in summary"
                :key="i"
                class="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50"
              >
                <span class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Icon
                    :icon="item.icon"
                    class="h-4 w-4 text-violet-500"
                  />
                  {{ item.label }}:
                </span>
                <span class="font-semibold text-gray-900 dark:text-white">{{ item.value }}</span>
              </div>
            </div>

            <!-- Ações -->
            <div class="no-print grid grid-cols-2 gap-2 sm:grid-cols-4">
              <button
                type="button"
                class="flex items-center justify-center gap-1.5 rounded-xl border border-violet-300 py-2.5 text-xs font-semibold text-violet-600 transition-all hover:bg-violet-50 dark:border-violet-600 dark:text-violet-400 dark:hover:bg-violet-900/20"
                @click="handlePrint"
              >
                <Icon
                  icon="lucide:printer"
                  class="h-4 w-4"
                />
                Imprimir
              </button>
              <button
                type="button"
                class="flex items-center justify-center gap-1.5 rounded-xl border border-violet-300 py-2.5 text-xs font-semibold text-violet-600 transition-all hover:bg-violet-50 dark:border-violet-600 dark:text-violet-400 dark:hover:bg-violet-900/20"
                @click="handleExport"
              >
                <Icon
                  icon="lucide:download"
                  class="h-4 w-4"
                />
                Exportar
              </button>
              <button
                type="button"
                class="flex items-center justify-center gap-1.5 rounded-xl border border-violet-300 py-2.5 text-xs font-semibold text-violet-600 transition-all hover:bg-violet-50 dark:border-violet-600 dark:text-violet-400 dark:hover:bg-violet-900/20"
                @click="handleCopy"
              >
                <Icon
                  icon="lucide:copy"
                  class="h-4 w-4"
                />
                Copiar
              </button>
              <a
                :href="SITE.whatsappLink"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-center gap-1.5 rounded-xl bg-green-600 py-2.5 text-xs font-semibold text-white transition-all hover:bg-green-700"
              >
                <Icon
                  icon="fa6-brands:whatsapp"
                  class="h-4 w-4"
                />
                Enviar
              </a>
            </div>

            <div class="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-900/20">
              <p class="text-center text-xs text-amber-700 dark:text-amber-400">
                <Icon
                  icon="lucide:info"
                  class="mr-1 inline h-3.5 w-3.5"
                />
                <template v-if="result.isMinimumApplied">
                  Valor mínimo de {{ formatCurrency(PRICING.minimum) }} aplicado conforme política de precificação.
                </template>
                <template v-else>
                  Valor estimado com base em complexidade, volume, plataformas e engajamento.
                </template>
              </p>
            </div>
          </div>

          <div
            v-else
            class="no-print py-12 text-center"
          >
            <div class="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-2xl bg-gray-100 dark:bg-gray-700">
              <Icon
                icon="lucide:trending-up"
                class="h-10 w-10 text-gray-300 dark:text-gray-500"
              />
            </div>
            <h3 class="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
              Preencha o Formulário
            </h3>
            <p class="mx-auto max-w-xs text-sm text-gray-400 dark:text-gray-500">
              Complete os dados ao lado e clique em "Calcular" para ver o resultado detalhado.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
