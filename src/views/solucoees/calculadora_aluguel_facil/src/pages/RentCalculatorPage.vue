<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHead } from '@unhead/vue'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'
import { formatCurrency, formatNumber, parseFormattedNumber } from '@/utils/formatters'
import { calculateRent, type RentalParams, type RentalResult } from '@/utils/rentalCalculations'
import { propertyTypes, locations, conditions, furnishedOptions, regions, buildingAges, specialFeatures, transportAccess, seasonality, marketConditions, amenities } from '@/data/rentalData'
import { useAlert } from '@/composables/useAlert'
import { escapeHtml } from '@/utils/security'

const alert = useAlert()

useHead({
  title: 'Calculadora de Aluguel - Determine o Valor Ideal | Calculadora Aluguel Fácil',
  meta: [{ name: 'description', content: 'Calcule o valor ideal de aluguel do seu imóvel com base em 20+ variáveis de mercado.' }]
})

const params = ref<RentalParams>({
  propertyValue: 0, propertyType: '', location: '', condition: '', furnished: '',
  region: 'sudeste', buildingAge: 'intermediario', specialFeatures: [], transportAccess: 'regular',
  seasonality: 'sem_sazonalidade', marketCondition: 'equilibrado', propertySize: 0, floors: 0, amenities: []
})

const showAdvanced = ref(false)
const propertyValueFormatted = ref('')

function onPropertyValueInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  propertyValueFormatted.value = formatNumber(val)
  params.value.propertyValue = parseFormattedNumber(val)
}

function toggleFeature(key: string) {
  const idx = params.value.specialFeatures.indexOf(key)
  if (idx === -1) params.value.specialFeatures.push(key)
  else params.value.specialFeatures.splice(idx, 1)
}

function toggleAmenity(key: string) {
  const idx = params.value.amenities.indexOf(key)
  if (idx === -1) params.value.amenities.push(key)
  else params.value.amenities.splice(idx, 1)
}

const result = computed<RentalResult | null>(() => {
  const p = params.value
  if (!p.propertyValue || !p.location || !p.propertyType || !p.condition || !p.furnished || !p.propertySize) return null
  try { return calculateRent(p) } catch { return null }
})

const confidenceClass = computed(() => {
  if (!result.value) return ''
  const c = result.value.recommendations.confidence
  if (c === 'alta') return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300'
  if (c === 'média') return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
  return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
})

function shareResult() {
  if (!result.value) return
  const r = result.value
  const html = `
    <div style="text-align:left">
      <p><strong>Valor sugerido:</strong> ${escapeHtml(formatCurrency(r.adjustedRent))}/mês</p>
      <p><strong>Faixa recomendada:</strong> ${escapeHtml(formatCurrency(r.recommendations.minRent))} – ${escapeHtml(formatCurrency(r.recommendations.maxRent))}</p>
      <p><strong>Preço por m²:</strong> ${escapeHtml(formatCurrency(r.marketAnalysis.pricePerM2))}</p>
      <p><strong>Rentabilidade anual:</strong> ${escapeHtml(r.marketAnalysis.yieldEstimate.toFixed(2))}%</p>
      <p><strong>Confiança:</strong> ${escapeHtml(r.recommendations.confidence)}</p>
    </div>`
  alert.help('Resumo do Cálculo', html)
}

async function copyResult() {
  if (!result.value) return
  const r = result.value
  const text = `Valor sugerido: ${formatCurrency(r.adjustedRent)}/mês | Faixa: ${formatCurrency(r.recommendations.minRent)} - ${formatCurrency(r.recommendations.maxRent)} | Calculadora Aluguel Fácil`
  try {
    await navigator.clipboard.writeText(text)
    alert.success('Copiado!', 'O resumo foi copiado para a área de transferência.')
  } catch {
    alert.error('Não foi possível copiar', 'Seu navegador bloqueou o acesso à área de transferência.')
  }
}
</script>

<template>
  <div class="container py-8">
    <Breadcrumb :items="[{ label: 'Ferramentas', to: '/#ferramentas' }, { label: 'Calculadora de Aluguel' }]" />

    <div class="text-center mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        <i class="fa-solid fa-calculator text-primary-500 mr-2"></i>Calculadora Avançada de Aluguel
      </h1>
      <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Determine o valor ideal com análise de múltiplas variáveis de mercado, localização e características do imóvel.
      </p>
    </div>

    <!-- Alert -->
    <div class="card p-4 mb-6 border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-900/20">
      <p class="text-sm text-blue-800 dark:text-blue-300">
        <i class="fa-solid fa-lightbulb mr-2"></i>
        <strong>Dica:</strong> Preencha o máximo de campos possível para obter um resultado mais preciso. Os campos obrigatórios são: valor, tipo, localização, condição, mobília e área.
      </p>
    </div>

    <div class="grid gap-6 lg:grid-cols-3">
      <!-- Form -->
      <div class="lg:col-span-2 space-y-6">
        <div class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <i class="fa-solid fa-house text-primary-500"></i> Dados Básicos do Imóvel
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="label-field">Valor de Mercado (R$) <i class="fa-solid fa-circle-question text-gray-400 text-xs ml-1" data-tooltip="Valor estimado de venda do imóvel"></i></label>
              <input type="text" class="input-field" placeholder="Ex: 500.000" autocomplete="off" :value="propertyValueFormatted" @input="onPropertyValueInput" />
            </div>
            <div>
              <label class="label-field">Área (m²)</label>
              <input type="number" class="input-field" placeholder="Ex: 80" autocomplete="off" v-model.number="params.propertySize" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label class="label-field">Tipo de Imóvel</label>
              <select class="select-field" v-model="params.propertyType">
                <option value="" disabled>Selecione o tipo</option>
                <option v-for="(type, key) in propertyTypes" :key="key" :value="key">{{ type.name }}</option>
              </select>
            </div>
            <div>
              <label class="label-field">Localização</label>
              <select class="select-field" v-model="params.location">
                <option value="" disabled>Selecione a região</option>
                <option v-for="(loc, key) in locations" :key="key" :value="key">{{ loc.name }}</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label class="label-field">Estado de Conservação</label>
              <select class="select-field" v-model="params.condition">
                <option value="" disabled>Selecione</option>
                <option v-for="(cond, key) in conditions" :key="key" :value="key">{{ cond.name }}</option>
              </select>
            </div>
            <div>
              <label class="label-field">Mobília</label>
              <select class="select-field" v-model="params.furnished">
                <option value="" disabled>Selecione</option>
                <option v-for="(opt, key) in furnishedOptions" :key="key" :value="key">{{ opt.name }}</option>
              </select>
            </div>
            <div>
              <label class="label-field">Região do País</label>
              <select class="select-field" v-model="params.region">
                <option v-for="(reg, key) in regions" :key="key" :value="key">{{ reg.name }}</option>
              </select>
            </div>
          </div>

          <!-- Advanced -->
          <button @click="showAdvanced = !showAdvanced" class="mt-4 w-full btn-ghost border border-gray-200 dark:border-slate-600 text-sm">
            <i :class="['fa-solid', showAdvanced ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
            {{ showAdvanced ? 'Ocultar' : 'Mostrar' }} Configurações Avançadas
          </button>

          <div v-if="showAdvanced" class="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="label-field">Idade do Imóvel</label>
                <select class="select-field" v-model="params.buildingAge">
                  <option v-for="(age, key) in buildingAges" :key="key" :value="key">{{ age.name }}</option>
                </select>
              </div>
              <div>
                <label class="label-field">Acesso ao Transporte</label>
                <select class="select-field" v-model="params.transportAccess">
                  <option v-for="(t, key) in transportAccess" :key="key" :value="key">{{ t.name }}</option>
                </select>
              </div>
              <div>
                <label class="label-field">Condição do Mercado</label>
                <select class="select-field" v-model="params.marketCondition">
                  <option v-for="(m, key) in marketConditions" :key="key" :value="key">{{ m.name }}</option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="label-field">Sazonalidade</label>
                <select class="select-field" v-model="params.seasonality">
                  <option v-for="(s, key) in seasonality" :key="key" :value="key">{{ s.name }}</option>
                </select>
              </div>
              <div>
                <label class="label-field">Andar (se apartamento)</label>
                <input type="number" class="input-field" placeholder="Ex: 5" autocomplete="off" v-model.number="params.floors" />
              </div>
            </div>
          </div>
        </div>

        <!-- Special Features -->
        <div class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Características Especiais</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <label v-for="(feature, key) in specialFeatures" :key="key" class="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer transition-colors">
              <input type="checkbox" class="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500" :checked="params.specialFeatures.includes(key as string)" @change="toggleFeature(key as string)" />
              <div>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ feature.name }}</span>
                <span class="block text-xs text-gray-500">{{ feature.type === 'fixed' ? `+R$ ${feature.addedValue}` : `+${feature.addedValue}%` }}</span>
              </div>
            </label>
          </div>
        </div>

        <!-- Amenities -->
        <div class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Amenidades do Condomínio</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <label v-for="(amenity, key) in amenities" :key="key" class="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer transition-colors">
              <input type="checkbox" class="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500" :checked="params.amenities.includes(key as string)" @change="toggleAmenity(key as string)" />
              <div>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ amenity.name }}</span>
                <span class="block text-xs text-gray-500">+R$ {{ amenity.valueAdd }}</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- Results -->
      <div class="space-y-6">
        <div class="card p-6 sticky top-20">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <i class="fa-solid fa-chart-line text-primary-500"></i> Resultado
          </h2>

          <template v-if="result">
            <div class="text-center p-5 gradient-primary rounded-xl mb-4">
              <p class="text-sm text-white/80 mb-1">Valor Sugerido</p>
              <p class="text-3xl font-bold text-white">{{ formatCurrency(result.adjustedRent) }}</p>
              <p class="text-xs text-white/60 mt-1">por mês</p>
            </div>

            <!-- Confidence -->
            <div :class="['p-3 rounded-lg border mb-4', confidenceClass]">
              <div class="flex items-center gap-2 mb-1">
                <i class="fa-solid fa-star text-sm"></i>
                <span class="font-medium text-sm">Confiança: {{ result.recommendations.confidence }}</span>
              </div>
            </div>

            <!-- Range -->
            <div class="mb-4">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Faixa Recomendada</h4>
              <div class="flex justify-between text-xs text-gray-500 mb-1">
                <span>{{ formatCurrency(result.recommendations.minRent) }}</span>
                <span>{{ formatCurrency(result.recommendations.maxRent) }}</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2">
                <div class="bg-primary-500 h-2 rounded-full w-1/2"></div>
              </div>
            </div>

            <!-- Market Analysis -->
            <div class="space-y-2 text-sm border-t border-gray-100 dark:border-slate-700 pt-4">
              <h4 class="font-medium text-gray-700 dark:text-gray-300">Análise de Mercado</h4>
              <div class="flex justify-between">
                <span class="text-gray-500">Preço por m²:</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ formatCurrency(result.marketAnalysis.pricePerM2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Rentabilidade anual:</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ result.marketAnalysis.yieldEstimate.toFixed(2) }}%</span>
              </div>
            </div>

            <!-- Ações -->
            <div class="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
              <button type="button" class="btn-ghost flex-1 border border-gray-200 dark:border-slate-600 text-sm" @click="shareResult">
                <i class="fa-solid fa-eye"></i> Ver Resumo
              </button>
              <button type="button" class="btn-ghost flex-1 border border-gray-200 dark:border-slate-600 text-sm" @click="copyResult">
                <i class="fa-solid fa-copy"></i> Copiar
              </button>
            </div>
          </template>

          <template v-else>
            <div class="text-center py-8 text-gray-400">
              <i class="fa-solid fa-calculator text-4xl mb-3 opacity-50"></i>
              <p class="text-sm">Preencha os campos obrigatórios para calcular</p>
            </div>
          </template>
        </div>

        <!-- Important Note -->
        <div class="card p-4 border-l-4 border-l-amber-500 bg-amber-50 dark:bg-amber-900/20">
          <p class="text-xs text-amber-800 dark:text-amber-300">
            <i class="fa-solid fa-triangle-exclamation mr-1"></i>
            <strong>Importante:</strong> Este cálculo é uma estimativa. Pesquise valores similares na região para validar.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
