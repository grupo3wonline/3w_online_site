<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHead } from '@unhead/vue'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'
import { formatCurrency } from '@/utils/formatters'
import { calculateConstruction, calculateRenovation, type ConstructionParams, type ConstructionResult } from '@/utils/constructionCalculations'
import { propertyTypes, finishingStandards, regionalFactors, terrainConditions, accessibilityLevels, specialFeatures, renovationServices } from '@/data/constructionData'

useHead({
  title: 'Calculadora de Construção e Reforma - Orçamento Completo | Calculadora Aluguel Fácil',
  meta: [{ name: 'description', content: 'Calcule o custo de construção ou reforma do seu imóvel. Orçamento detalhado por etapas com materiais, mão de obra e cronograma.' }]
})

const activeTab = ref<'construction' | 'renovation'>('construction')

const params = ref<ConstructionParams>({
  projectType: 'construction',
  propertyType: 'casa',
  area: 0,
  finishingStandard: 'médio',
  region: 'sudeste',
  terrainCondition: 'plano',
  accessibilityLevel: 'fácil',
  specialFeatures: [],
  selectedServices: [],
  contingencyPercentage: 10,
  materialQuality: 'médio',
  laborProductivity: 'média'
})

function toggleFeature(key: string) {
  const idx = params.value.specialFeatures.indexOf(key)
  if (idx === -1) params.value.specialFeatures.push(key)
  else params.value.specialFeatures.splice(idx, 1)
}

function toggleService(key: string) {
  const idx = params.value.selectedServices.indexOf(key)
  if (idx === -1) params.value.selectedServices.push(key)
  else params.value.selectedServices.splice(idx, 1)
}

function setTab(tab: 'construction' | 'renovation') {
  activeTab.value = tab
  params.value.projectType = tab
}

const result = computed<ConstructionResult | null>(() => {
  if (!params.value.area || params.value.area <= 0) return null
  try {
    if (activeTab.value === 'construction') {
      return calculateConstruction(params.value)
    } else {
      if (params.value.selectedServices.length === 0) return null
      return calculateRenovation(params.value)
    }
  } catch { return null }
})

const breakdownPercentages = computed(() => {
  if (!result.value) return null
  const total = result.value.grandTotal
  return {
    materials: ((result.value.breakdown.materials / total) * 100).toFixed(1),
    labor: ((result.value.breakdown.labor / total) * 100).toFixed(1),
    indirect: ((result.value.breakdown.indirect / total) * 100).toFixed(1),
    contingency: ((result.value.breakdown.contingency / total) * 100).toFixed(1),
    specialFeatures: ((result.value.breakdown.specialFeatures / total) * 100).toFixed(1)
  }
})
</script>

<template>
  <div class="container py-8">
    <Breadcrumb :items="[{ label: 'Ferramentas', to: '/#ferramentas' }, { label: 'Calculadora de Construção' }]" />

    <div class="text-center mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        <i class="fa-solid fa-hammer text-primary-500 mr-2"></i>Calculadora de Construção e Reforma
      </h1>
      <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Orçamento detalhado com materiais, mão de obra e cronograma. Planeje sua construção ou reforma sem surpresas.
      </p>
    </div>

    <!-- Tabs -->
    <div class="flex justify-center mb-8">
      <div class="inline-flex rounded-xl bg-gray-100 dark:bg-slate-800 p-1">
        <button @click="setTab('construction')" :class="['px-6 py-3 rounded-lg text-sm font-semibold transition-all', activeTab === 'construction' ? 'bg-white dark:bg-slate-700 shadow-md text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900']">
          <i class="fa-solid fa-building mr-2"></i>Construção
        </button>
        <button @click="setTab('renovation')" :class="['px-6 py-3 rounded-lg text-sm font-semibold transition-all', activeTab === 'renovation' ? 'bg-white dark:bg-slate-700 shadow-md text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900']">
          <i class="fa-solid fa-paint-roller mr-2"></i>Reforma
        </button>
      </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-3">
      <!-- Form -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Basic Data -->
        <div class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <i class="fa-solid fa-ruler-combined text-primary-500"></i> Dados do Projeto
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-if="activeTab === 'construction'">
              <label class="label-field">Tipo de Imóvel</label>
              <select class="select-field" v-model="params.propertyType">
                <option v-for="(type, key) in propertyTypes" :key="key" :value="key">{{ type.name }}</option>
              </select>
            </div>
            <div>
              <label class="label-field">Área Total (m²)</label>
              <input type="number" class="input-field" placeholder="Ex: 120" autocomplete="off" v-model.number="params.area" />
            </div>
            <div>
              <label class="label-field">Padrão de Acabamento</label>
              <select class="select-field" v-model="params.finishingStandard">
                <option v-for="(std, key) in finishingStandards" :key="key" :value="key">{{ std.name }}</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label class="label-field">Região</label>
              <select class="select-field" v-model="params.region">
                <option v-for="(reg, key) in regionalFactors" :key="key" :value="key">{{ reg.name }}</option>
              </select>
            </div>
            <div v-if="activeTab === 'construction'">
              <label class="label-field">Condição do Terreno</label>
              <select class="select-field" v-model="params.terrainCondition">
                <option v-for="(ter, key) in terrainConditions" :key="key" :value="key">{{ ter.name }}</option>
              </select>
            </div>
            <div>
              <label class="label-field">Acessibilidade do Local</label>
              <select class="select-field" v-model="params.accessibilityLevel">
                <option v-for="(acc, key) in accessibilityLevels" :key="key" :value="key">{{ acc.name }}</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label class="label-field">Qualidade dos Materiais</label>
              <select class="select-field" v-model="params.materialQuality">
                <option value="básico">Básico</option>
                <option value="médio">Médio</option>
                <option value="alto">Alto</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            <div>
              <label class="label-field">Produtividade da Mão de Obra</label>
              <select class="select-field" v-model="params.laborProductivity">
                <option value="baixa">Baixa (equipe nova)</option>
                <option value="média">Média (equipe experiente)</option>
                <option value="alta">Alta (equipe especializada)</option>
              </select>
            </div>
          </div>

          <!-- Contingency Slider -->
          <div class="mt-4">
            <label class="label-field">Reserva de Contingência: {{ params.contingencyPercentage }}%</label>
            <input type="range" class="w-full h-2 bg-gray-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-primary-500" v-model.number="params.contingencyPercentage" min="5" max="30" step="1" />
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>5%</span>
              <span>30%</span>
            </div>
          </div>
        </div>

        <!-- Special Features (construction only) -->
        <div v-if="activeTab === 'construction'" class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <i class="fa-solid fa-star text-primary-500"></i> Características Especiais
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <label v-for="(feature, key) in specialFeatures" :key="key" class="flex items-start gap-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer transition-colors border border-gray-100 dark:border-slate-700">
              <input type="checkbox" class="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500" :checked="params.specialFeatures.includes(key as string)" @change="toggleFeature(key as string)" />
              <div>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ feature.name }}</span>
                <span class="block text-xs text-gray-500">{{ feature.costPerM2 ? `R$ ${feature.costPerM2}/m²` : `R$ ${feature.fixedCost?.toLocaleString('pt-BR')}` }}</span>
              </div>
            </label>
          </div>
        </div>

        <!-- Renovation Services (renovation only) -->
        <div v-if="activeTab === 'renovation'" class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <i class="fa-solid fa-wrench text-primary-500"></i> Serviços de Reforma
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Selecione os serviços que deseja incluir na reforma:</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label v-for="(service, key) in renovationServices" :key="key" class="flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer transition-colors border border-gray-100 dark:border-slate-700">
              <input type="checkbox" class="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500" :checked="params.selectedServices.includes(key as string)" @change="toggleService(key as string)" />
              <div>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ service.name }}</span>
                <span class="block text-xs text-gray-500">R$ {{ service.costPerM2 }}/m² • {{ service.category }}</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- Results Sidebar -->
      <div class="space-y-6">
        <div class="card p-6 sticky top-20">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <i class="fa-solid fa-chart-pie text-primary-500"></i> Orçamento
          </h2>

          <template v-if="result">
            <div class="text-center p-5 gradient-primary rounded-xl mb-4">
              <p class="text-sm text-white/80 mb-1">Custo Total Estimado</p>
              <p class="text-3xl font-bold text-white">{{ formatCurrency(result.grandTotal) }}</p>
              <p class="text-xs text-white/60 mt-1">{{ formatCurrency(result.costPerM2) }}/m²</p>
            </div>

            <!-- Breakdown -->
            <div class="space-y-3 text-sm border-t border-gray-100 dark:border-slate-700 pt-4">
              <h4 class="font-medium text-gray-700 dark:text-gray-300">Composição do Custo</h4>
              <div class="space-y-2">
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-gray-500">Materiais ({{ breakdownPercentages?.materials }}%)</span>
                    <span class="font-medium">{{ formatCurrency(result.breakdown.materials) }}</span>
                  </div>
                  <div class="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-1.5">
                    <div class="bg-blue-500 h-1.5 rounded-full" :style="{ width: breakdownPercentages?.materials + '%' }"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-gray-500">Mão de Obra ({{ breakdownPercentages?.labor }}%)</span>
                    <span class="font-medium">{{ formatCurrency(result.breakdown.labor) }}</span>
                  </div>
                  <div class="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-1.5">
                    <div class="bg-green-500 h-1.5 rounded-full" :style="{ width: breakdownPercentages?.labor + '%' }"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-gray-500">Custos Indiretos ({{ breakdownPercentages?.indirect }}%)</span>
                    <span class="font-medium">{{ formatCurrency(result.breakdown.indirect) }}</span>
                  </div>
                  <div class="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-1.5">
                    <div class="bg-amber-500 h-1.5 rounded-full" :style="{ width: breakdownPercentages?.indirect + '%' }"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-gray-500">Contingência ({{ breakdownPercentages?.contingency }}%)</span>
                    <span class="font-medium">{{ formatCurrency(result.breakdown.contingency) }}</span>
                  </div>
                  <div class="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-1.5">
                    <div class="bg-red-500 h-1.5 rounded-full" :style="{ width: breakdownPercentages?.contingency + '%' }"></div>
                  </div>
                </div>
                <div v-if="result.breakdown.specialFeatures > 0">
                  <div class="flex justify-between mb-1">
                    <span class="text-gray-500">Extras ({{ breakdownPercentages?.specialFeatures }}%)</span>
                    <span class="font-medium">{{ formatCurrency(result.breakdown.specialFeatures) }}</span>
                  </div>
                  <div class="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-1.5">
                    <div class="bg-purple-500 h-1.5 rounded-full" :style="{ width: breakdownPercentages?.specialFeatures + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Timeline -->
            <div class="border-t border-gray-100 dark:border-slate-700 pt-4 mt-4">
              <h4 class="font-medium text-gray-700 dark:text-gray-300 mb-2">Cronograma Estimado</h4>
              <div class="text-center p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ result.timeline.totalDays }} dias</p>
                <p class="text-xs text-gray-500">≈ {{ Math.ceil(result.timeline.totalDays / 30) }} meses</p>
              </div>
              <div v-if="result.timeline.phases" class="mt-3 space-y-2">
                <div v-for="phase in result.timeline.phases" :key="phase.name" class="flex justify-between text-xs">
                  <span class="text-gray-500">{{ phase.name }}</span>
                  <span class="font-medium text-gray-700 dark:text-gray-300">{{ phase.days }} dias</span>
                </div>
              </div>
            </div>
          </template>

          <template v-else>
            <div class="text-center py-8 text-gray-400">
              <i class="fa-solid fa-hammer text-4xl mb-3 opacity-50"></i>
              <p class="text-sm">Preencha os dados para calcular</p>
            </div>
          </template>
        </div>

        <!-- Note -->
        <div class="card p-4 border-l-4 border-l-amber-500 bg-amber-50 dark:bg-amber-900/20">
          <p class="text-xs text-amber-800 dark:text-amber-300">
            <i class="fa-solid fa-triangle-exclamation mr-1"></i>
            <strong>Importante:</strong> Valores são estimativas baseadas em médias regionais. Solicite orçamentos com profissionais para valores exatos.
          </p>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <section class="mt-16">
      <div class="card max-w-4xl mx-auto overflow-hidden">
        <div class="grid md:grid-cols-2">
          <div class="gradient-primary p-8 text-white">
            <span class="badge bg-white/20 text-white border border-white/30 mb-4">
              <i class="fa-solid fa-globe"></i> Grupo 3W Online
            </span>
            <h3 class="text-2xl font-bold mb-4">Sistema de Orçamento para Construtoras?</h3>
            <p class="opacity-90 leading-relaxed">
              Desenvolvemos plataformas personalizadas para gestão de obras, orçamentos e acompanhamento de projetos de construção civil.
            </p>
          </div>
          <div class="p-8 flex flex-col justify-center">
            <ul class="space-y-3 mb-6">
              <li v-for="item in ['Gestão de Obras', 'Orçamentos Detalhados', 'Acompanhamento em Tempo Real', 'Relatórios Gerenciais']" :key="item" class="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <i class="fa-solid fa-circle-check text-primary-500"></i> {{ item }}
              </li>
            </ul>
            <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" class="btn-primary">
              <i class="fa-solid fa-globe"></i> Conhecer 3W Online <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
