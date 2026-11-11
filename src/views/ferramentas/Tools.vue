<template>
  <div class="tools-page">

    <!-- ── Breadcrumb ─────────────────────────────────────────────── -->
    <div class="bg-gradient-to-r from-[#0a1628] via-[#111d3a] to-[#162044] py-4 border-b border-white/10">
      <div class="container">
        <nav class="flex items-center text-xs text-blue-300 gap-1.5" aria-label="Trilha de navegação">
          <RouterLink to="/" class="hover:text-white transition-colors flex items-center gap-1">
            <Icon icon="mdi:home" class="w-3.5 h-3.5" />
            <span>Início</span>
          </RouterLink>
          <Icon icon="mdi:chevron-right" class="w-3.5 h-3.5 text-blue-400/60" />
          <span class="text-white font-medium">Ferramentas & Aplicações</span>
        </nav>
      </div>
    </div>

    <!-- ── Promo Carousel ─────────────────────────────────────────── -->
    <div class="bg-gradient-to-r from-accent-500 to-accent-600 py-2.5 overflow-hidden text-white">
      <div class="container">
        <div class="flex items-center justify-center gap-3 text-xs sm:text-sm">
          <button @click="prevPromo" class="p-1 hover:bg-white/20 rounded-full transition-colors shrink-0" aria-label="Anterior">
            <Icon icon="mdi:chevron-left" class="w-4 h-4" />
          </button>
          <Transition name="fade" mode="out-in">
            <div :key="currentPromo" class="flex items-center gap-2.5 min-w-0">
              <Icon :icon="promos[currentPromo].icon" class="w-4 h-4 text-yellow-200 shrink-0" />
              <span class="font-medium truncate">{{ promos[currentPromo].text }}</span>
              <a :href="promos[currentPromo].link" target="_blank" rel="noopener noreferrer"
                class="bg-white text-accent-700 px-3 py-0.5 rounded-full text-[11px] font-bold hover:bg-gray-100 transition-colors whitespace-nowrap shrink-0 shadow-sm">
                {{ promos[currentPromo].cta }}
              </a>
            </div>
          </Transition>
          <button @click="nextPromo" class="p-1 hover:bg-white/20 rounded-full transition-colors shrink-0" aria-label="Próximo">
            <Icon icon="mdi:chevron-right" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- ── Hero ───────────────────────────────────────────────────── -->
    <section class="page-hero relative overflow-hidden">
      <div class="container relative z-10">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 bg-secondary-500/20 text-secondary-300 border border-secondary-500/30 px-3 py-1 rounded-full text-xs font-semibold mb-4">
            <Icon icon="mdi:lightning-bolt" class="w-3.5 h-3.5 text-secondary-400" />
            <span>182 Ferramentas & Aplicações • 100% Gratuitas & Client-Side</span>
          </div>
          <h1 class="page-hero-title">Ferramentas & Aplicações Digitais</h1>
          <p class="page-hero-subtitle mb-8 max-w-2xl leading-relaxed">
            Calculadoras, conversores, validadores, geradores e aplicações web completas. Tudo rodando no seu navegador — sem cadastro, sem upload, zero rastreamento de dados.
          </p>
          <div class="flex flex-wrap gap-2.5">
            <div v-for="badge in heroBadges" :key="badge.text" class="flex items-center bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg px-3.5 py-1.5 text-xs text-white">
              <Icon :icon="badge.icon" class="w-4 h-4 mr-1.5" :class="badge.color" />
              <span>{{ badge.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Stats rápidos de categorias ───────────────────────────── -->
    <section class="container py-6">
      <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2.5">
        <button
          v-for="stat in categoryStats"
          :key="stat.id"
          class="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm p-3 text-center hover:shadow-md hover:border-primary-300 dark:hover:border-primary-600 transition-all group"
          :class="{ 'ring-2 ring-primary-500 border-primary-400 !bg-primary-50 dark:!bg-primary-900/20': activeCategory === stat.id }"
          @click="setCategory(stat.id)"
        >
          <div class="w-8 h-8 mx-auto mb-1.5 rounded-lg flex items-center justify-center transition-colors"
            :class="activeCategory === stat.id ? 'bg-primary-600 text-white' : 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 group-hover:bg-primary-600 group-hover:text-white'">
            <Icon :icon="stat.icon" class="w-4 h-4" />
          </div>
          <p class="text-sm font-extrabold text-gray-900 dark:text-white leading-tight">{{ stat.count }}</p>
          <p class="text-[10px] text-gray-500 dark:text-slate-400 font-medium leading-tight">{{ stat.label }}</p>
        </button>
      </div>
    </section>

    <!-- ── BARRA ÚNICA: Busca + Filtro ────────────────────────────── -->
    <div class="sticky top-14 md:top-16 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 shadow-sm py-3">
      <div class="container space-y-2.5">

        <!-- Busca -->
        <div class="relative">
          <Icon icon="mdi:magnify" class="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Buscar nas 182 ferramentas e aplicações..."
            class="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all"
            aria-label="Buscar ferramentas e aplicações"
          />
          <button v-if="searchQuery" @click="searchQuery = ''"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1" aria-label="Limpar">
            <Icon icon="mdi:close-circle" class="w-4 h-4" />
          </button>
        </div>

        <!-- Filtros de categoria (todos os 11 + "Todas") -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
          <button
            v-for="cat in allCategories"
            :key="cat.id"
            :class="[
              'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border whitespace-nowrap flex items-center gap-1.5 shrink-0',
              activeCategory === cat.id
                ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 border-gray-300 dark:border-slate-600 hover:border-primary-400 hover:text-primary-600',
            ]"
            @click="setCategory(cat.id)"
          >
            <Icon :icon="cat.icon" class="w-3.5 h-3.5" />
            <span>{{ cat.label }}</span>
            <span v-if="cat.id !== 'todas'"
              class="ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold leading-none"
              :class="activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-400'">
              {{ cat.count }}
            </span>
          </button>
        </div>

        <!-- Contador de resultados -->
        <div v-if="searchQuery || activeCategory !== 'todas'" class="text-xs flex items-center gap-1.5">
          <template v-if="filteredItems.length > 0">
            <Icon icon="mdi:check-circle" class="w-4 h-4 text-green-600 dark:text-green-400" />
            <span class="text-green-700 dark:text-green-400 font-medium">{{ filteredItems.length }} resultado(s) encontrado(s)</span>
          </template>
          <template v-else>
            <Icon icon="mdi:alert-circle" class="w-4 h-4 text-red-500" />
            <span class="text-red-600 dark:text-red-400 font-medium">Nenhum resultado para "{{ searchQuery }}"</span>
          </template>
          <button @click="clearFilters" class="ml-2 text-primary-600 hover:underline font-semibold flex items-center gap-1">
            <Icon icon="mdi:close-circle-outline" class="w-3.5 h-3.5" />
            Limpar filtros
          </button>
        </div>
      </div>
    </div>

    <!-- ── GRID UNIFICADO ─────────────────────────────────────────── -->
    <section class="container py-8 pb-16">

      <!-- Modo busca/filtro: grid plano -->
      <template v-if="searchQuery || activeCategory !== 'todas'">
        <div v-if="filteredItems.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <component
            :is="item.type === 'ferramenta' ? 'RouterLink' : 'RouterLink'"
            v-for="item in filteredItems"
            :key="item.id"
            :to="item.path"
            @click="trackButtonClick(item.name, 'tools_listing')"
            class="group flex flex-col p-4 rounded-xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md hover:bg-primary-50/30 dark:hover:bg-slate-700 transition-all"
          >
            <div class="flex items-start gap-3 mb-2.5">
              <div class="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                <!-- Ferramentas usam FontAwesome (fa-calculator etc.); Apps usam Iconify MDI -->
                <i v-if="item.type === 'ferramenta' && item.icon" :class="['fas', item.icon, 'text-sm']"></i>
                <Icon v-else :icon="item.icon || 'mdi:tools'" class="w-5 h-5" />
              </div>
              <div class="min-w-0 flex-1">
                <h3 class="text-xs font-bold text-gray-900 dark:text-slate-100 group-hover:text-primary-700 dark:group-hover:text-primary-300 line-clamp-2 leading-snug mb-0.5">
                  {{ item.name }}
                </h3>
                <span class="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                  :class="item.type === 'app' ? 'bg-accent-50 dark:bg-accent-900/30 text-accent-600 dark:text-accent-300' : 'bg-secondary-50 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-300'">
                  <Icon :icon="item.type === 'app' ? 'mdi:rocket-launch-outline' : 'mdi:tools'" class="w-2.5 h-2.5" />
                  {{ item.type === 'app' ? 'App' : 'Ferramenta' }}
                </span>
              </div>
            </div>
            <p class="text-[11px] text-gray-500 dark:text-slate-400 leading-relaxed line-clamp-2 flex-1 mb-2.5">
              {{ item.description }}
            </p>
            <div class="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-600 text-[11px] font-semibold text-primary-600 dark:text-primary-400">
              <span>{{ item.type === 'app' ? 'Abrir App →' : 'Usar ferramenta →' }}</span>
              <Icon icon="mdi:arrow-right" class="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </component>
        </div>
        <div v-else class="flex flex-col items-center justify-center py-20 text-center">
          <div class="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
            <Icon icon="mdi:magnify-close" class="w-8 h-8 text-gray-400 dark:text-slate-500" />
          </div>
          <p class="text-gray-500 dark:text-slate-400 font-medium mb-3">Nenhum resultado para "{{ searchQuery }}"</p>
          <button @click="clearFilters" class="btn-primary text-sm">Ver todas as ferramentas</button>
        </div>
      </template>

      <!-- Modo padrão: agrupado por categoria -->
      <template v-else>
        <div class="space-y-14">
          <!-- Grupos de Ferramentas Rápidas (store) -->
          <div
            v-for="(catTools, category) in toolsByCategory"
            :key="category"
            :id="`cat-${category}`"
            class="scroll-mt-36"
          >
            <div class="flex items-center justify-between border-b border-gray-200 dark:border-slate-700 pb-3 mb-5">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  :class="toolCategoryMeta[category]?.bg || 'bg-primary-100 dark:bg-primary-900/30'">
                  <Icon :icon="toolCategoryMeta[category]?.icon || 'mdi:tools'" class="w-5 h-5"
                    :class="toolCategoryMeta[category]?.color || 'text-primary-600'" />
                </div>
                <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                  {{ toolCategoryMeta[category]?.label || category }}
                </h2>
              </div>
              <span class="px-3 py-1 text-xs font-bold rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border border-primary-100 dark:border-primary-800">
                {{ catTools.length }} {{ catTools.length === 1 ? 'utilitário' : 'utilitários' }}
              </span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <RouterLink
                v-for="tool in catTools"
                :key="tool.id"
                :to="tool.path"
                @click="trackButtonClick(tool.name, 'tools_listing')"
                class="group flex flex-col p-4 rounded-xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md hover:bg-primary-50/30 dark:hover:bg-slate-700 transition-all"
              >
                <div class="flex items-start gap-3 mb-2.5">
                  <div class="w-9 h-9 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <!-- Ícones das ferramentas estão no formato FontAwesome (fa-calculator etc.) -->
                    <i v-if="tool.icon" :class="['fas', tool.icon, 'text-sm']"></i>
                    <Icon v-else icon="mdi:tools" class="w-4 h-4" />
                  </div>
                  <h3 class="text-xs font-bold text-gray-900 dark:text-slate-100 group-hover:text-primary-700 dark:group-hover:text-primary-300 line-clamp-2 leading-snug flex-1">
                    {{ tool.name }}
                  </h3>
                </div>
                <p class="text-[11px] text-gray-500 dark:text-slate-400 leading-relaxed line-clamp-2 flex-1 mb-2.5">
                  {{ tool.description }}
                </p>
                <div class="pt-2 border-t border-gray-100 dark:border-slate-600 text-[11px] font-semibold text-secondary-600 dark:text-secondary-400 flex items-center gap-1">
                  <Icon icon="mdi:flash" class="w-3 h-3" />
                  Usar ferramenta →
                </div>
              </RouterLink>
            </div>
          </div>

          <!-- Grupos de Aplicações (apps array) -->
          <div
            v-for="catDef in appCategoryDefs"
            :key="catDef.id"
            :id="`cat-app-${catDef.id}`"
            class="scroll-mt-36"
          >
            <div class="flex items-center justify-between border-b border-gray-200 dark:border-slate-700 pb-3 mb-5">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" :class="catDef.bg">
                  <Icon :icon="catDef.icon" class="w-5 h-5" :class="catDef.color" />
                </div>
                <h2 class="text-lg font-bold text-gray-900 dark:text-white">{{ catDef.label }}</h2>
              </div>
              <span class="px-3 py-1 text-xs font-bold rounded-full bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300 border border-accent-100 dark:border-accent-800">
                {{ apps.filter(a => a.category === catDef.id).length }} aplicações
              </span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <RouterLink
                v-for="app in apps.filter(a => a.category === catDef.id)"
                :key="app.slug"
                :to="`/ferramentas/${app.slug}`"
                @click="trackButtonClick(app.name, 'tools_listing')"
                class="group flex flex-col p-4 rounded-xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-accent-300 dark:hover:border-accent-600 hover:shadow-md hover:bg-accent-50/20 dark:hover:bg-slate-700 transition-all"
              >
                <div class="flex items-start gap-3 mb-2.5">
                  <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                    :class="[catDef.bg, 'group-hover:bg-accent-600 group-hover:text-white']">
                    <Icon :icon="app.icon" class="w-5 h-5" :class="catDef.color" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <h3 class="text-xs font-bold text-gray-900 dark:text-slate-100 group-hover:text-accent-700 dark:group-hover:text-accent-300 line-clamp-2 leading-snug mb-0.5">
                      {{ app.name }}
                    </h3>
                    <span class="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-accent-50 dark:bg-accent-900/30 text-accent-600 dark:text-accent-300">
                      <Icon icon="mdi:rocket-launch-outline" class="w-2.5 h-2.5" />App
                    </span>
                  </div>
                </div>
                <p class="text-[11px] text-gray-500 dark:text-slate-400 leading-relaxed line-clamp-2 flex-1 mb-2.5">
                  {{ app.description }}
                </p>
                <div class="pt-2 border-t border-gray-100 dark:border-slate-600 text-[11px] font-semibold text-accent-600 dark:text-accent-400 flex items-center gap-1">
                  <Icon icon="mdi:rocket-launch-outline" class="w-3 h-3" />
                  Abrir aplicação →
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
      </template>
    </section>

    <!-- ── CTA Final ───────────────────────────────────────────────── -->
    <section class="cta-section">
      <div class="container text-center">
        <span class="text-xs font-semibold text-secondary-400 uppercase tracking-wider block mb-2">Engenharia & Soluções Sob Medida</span>
        <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-3">Precisando de algo ainda mais específico?</h2>
        <p class="text-sm text-blue-200 mb-8 max-w-2xl mx-auto leading-relaxed">
          Criamos ferramentas, calculadoras e sistemas totalmente personalizados para o seu negócio.
        </p>
        <div class="flex flex-col sm:flex-row gap-3.5 justify-center">
          <RouterLink to="/servicos/criacao-sistemas" class="btn-primary !bg-white !text-primary-700 hover:!bg-gray-100 text-sm font-bold shadow-lg">
            Conhecer Sistemas Sob Medida
          </RouterLink>
          <a
            href="https://wa.me/5541996924829?text=Olá! Gostaria de um orçamento para desenvolvimento de software."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary text-sm font-bold shadow-lg"
          >
            <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" />
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useToolsStore } from '@/stores/tools'
import { useAnalytics } from '@/composables/useAnalytics'

// ─── Store de ferramentas rápidas ─────────────────────────────────────────────
const store = useToolsStore()
const { trackButtonClick, trackSearch } = useAnalytics()

// ─── Estado ───────────────────────────────────────────────────────────────────
const searchQuery   = ref('')
const activeCategory = ref('todas')
const currentPromo  = ref(0)
let promoInterval: ReturnType<typeof setInterval> | null = null

// ─── Metadados de categorias de ferramentas (store) ───────────────────────────
const toolCategoryMeta: Record<string, { label: string; icon: string; color: string; bg: string }> = {
  calculadoras: { label: 'Calculadoras',         icon: 'mdi:calculator',                     color: 'text-blue-600 dark:text-blue-400',    bg: 'bg-blue-50 dark:bg-blue-900/30'    },
  geradores:    { label: 'Geradores',             icon: 'mdi:wand-magic-sparkles',             color: 'text-purple-600 dark:text-purple-400',bg: 'bg-purple-50 dark:bg-purple-900/30'},
  conversores:  { label: 'Conversores',           icon: 'mdi:swap-horizontal',                 color: 'text-cyan-600 dark:text-cyan-400',    bg: 'bg-cyan-50 dark:bg-cyan-900/30'    },
  validadores:  { label: 'Validadores',           icon: 'mdi:checkbox-marked-circle-outline',  color: 'text-green-600 dark:text-green-400',  bg: 'bg-green-50 dark:bg-green-900/30'  },
  simuladores:  { label: 'Simuladores',           icon: 'mdi:chart-timeline-variant',          color: 'text-teal-600 dark:text-teal-400',    bg: 'bg-teal-50 dark:bg-teal-900/30'    },
  texto:        { label: 'Texto & OCR',           icon: 'mdi:format-text',                     color: 'text-indigo-600 dark:text-indigo-400',bg: 'bg-indigo-50 dark:bg-indigo-900/30'},
}

// ─── Definições de categorias de aplicações ────────────────────────────────────
const appCategoryDefs = [
  { id: 'financas', label: 'Finanças & Saúde', icon: 'mdi:cash-multiple',    color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/30' },
  { id: 'marketing',label: 'Marketing',        icon: 'mdi:trending-up',      color: 'text-orange-600 dark:text-orange-400',  bg: 'bg-orange-50 dark:bg-orange-900/30'   },
  { id: 'dev',      label: 'Dev Tools',        icon: 'mdi:code-braces',      color: 'text-sky-600 dark:text-sky-400',        bg: 'bg-sky-50 dark:bg-sky-900/30'         },
  { id: 'texto',    label: 'Texto & Conteúdo', icon: 'mdi:text-box-outline', color: 'text-violet-600 dark:text-violet-400',  bg: 'bg-violet-50 dark:bg-violet-900/30'   },
  { id: 'design',   label: 'Design & Mídia',   icon: 'mdi:palette-outline',  color: 'text-pink-600 dark:text-pink-400',      bg: 'bg-pink-50 dark:bg-pink-900/30'       },
  { id: 'negocios', label: 'Negócios',          icon: 'mdi:briefcase-outline',color: 'text-amber-600 dark:text-amber-400',    bg: 'bg-amber-50 dark:bg-amber-900/30'     },
]

// ─── Dados de aplicações (62 apps) ────────────────────────────────────────────
const apps = [
  // Finanças & Saúde
  { slug: 'calculadora-imc',                        name: 'Calculadora de IMC',                     category: 'financas', description: 'Calcule o Índice de Massa Corporal e veja sua classificação.', icon: 'mdi:weight' },
  { slug: 'calculadora-saude',                      name: 'Calculadora de Saúde',                   category: 'financas', description: 'TMB, hidratação, calorias e plano nutricional completo.', icon: 'mdi:heart-pulse' },
  { slug: 'seu-peso',                               name: 'Seu Peso',                               category: 'financas', description: 'Monitore seu peso e acompanhe seu progresso.', icon: 'mdi:scale' },
  { slug: 'calculadora-aluguel-facil',              name: 'Calculadora de Aluguel Fácil',           category: 'financas', description: 'Calcule o aluguel ideal com base na renda e custos.', icon: 'mdi:home-city' },
  { slug: 'calculadora-freelance',                  name: 'Calculadora Freelance',                  category: 'financas', description: 'Calcule o valor da sua hora e precifique projetos.', icon: 'mdi:briefcase-account' },
  { slug: 'calculadora-preco',                      name: 'Calculadora de Preço',                   category: 'financas', description: 'Defina o preço ideal com margem de lucro.', icon: 'mdi:tag' },
  { slug: 'calculadora-produto-servico',            name: 'Calculadora Produto/Serviço',            category: 'financas', description: 'Calcule o custo total incluindo impostos.', icon: 'mdi:package-variant' },
  { slug: 'calculadora-indicadores-financeiros',    name: 'Indicadores Financeiros',                category: 'financas', description: 'Analise KPIs: ROI, ROE, liquidez e muito mais.', icon: 'mdi:chart-box' },
  { slug: 'investsim',                              name: 'InvestSim',                              category: 'financas', description: 'Simule investimentos e compare rendimentos.', icon: 'mdi:trending-up' },
  { slug: 'finance-flow',                           name: 'Finance Flow',                           category: 'financas', description: 'Controle seu fluxo de caixa pessoal.', icon: 'mdi:cash-multiple' },
  { slug: 'rendimento-salarial',                    name: 'Rendimento Salarial',                    category: 'financas', description: 'Calcule seu salário líquido com todos os descontos.', icon: 'mdi:currency-usd' },
  { slug: 'meu-bolso-mensal',                       name: 'Meu Bolso Mensal',                       category: 'financas', description: 'Planeje seu orçamento mensal e controle gastos.', icon: 'mdi:wallet' },
  { slug: 'calculadora-orcamento-marketing-digital',name: 'Orçamento Marketing Digital',           category: 'financas', description: 'Calcule o orçamento ideal para campanhas digitais.', icon: 'mdi:bullseye-arrow' },
  { slug: 'calculadora-churrasco',                  name: 'Calculadora de Churrasco',               category: 'financas', description: 'Calcule a quantidade de carne e bebidas.', icon: 'mdi:fire' },
  { slug: 'calculadora-evento',                     name: 'Calculadora de Evento',                  category: 'financas', description: 'Calcule custos e organize o orçamento do evento.', icon: 'mdi:calendar-star' },
  { slug: 'planejador-casamento',                   name: 'Planejador de Casamento',                category: 'financas', description: 'Organize e calcule custos do casamento.', icon: 'mdi:heart' },
  // Marketing
  { slug: 'calculadora-campanha-trafego',           name: 'Calculadora de Campanha',                category: 'marketing', description: 'Calcule CPC, CPM, ROI e conversões de campanhas.', icon: 'mdi:chart-bar' },
  { slug: 'calculadora-social-midia',               name: 'Calculadora Social Mídia',               category: 'marketing', description: 'Calcule investimento e retorno em mídias sociais.', icon: 'mdi:facebook' },
  { slug: 'orcamento-social-midia',                 name: 'Orçamento Social Mídia',                 category: 'marketing', description: 'Monte o orçamento para gestão de redes sociais.', icon: 'mdi:instagram' },
  { slug: 'gerador-legenda',                        name: 'Gerador de Legenda',                     category: 'marketing', description: 'Gere legendas criativas para redes sociais.', icon: 'mdi:closed-caption' },
  { slug: 'simuladores-empresariais',               name: 'Simuladores Empresariais',               category: 'marketing', description: 'Simule cenários e tome decisões estratégicas.', icon: 'mdi:domain' },
  { slug: 'empreenda-facil',                        name: 'Empreenda Fácil',                        category: 'marketing', description: 'Ferramenta completa para planejamento do negócio.', icon: 'mdi:store' },
  { slug: 'calculadora-empresarial',                name: 'Calculadora Empresarial',                category: 'marketing', description: 'Calcule indicadores essenciais da empresa.', icon: 'mdi:calculator-variant' },
  { slug: 'calculadora-programadores',              name: 'Calculadora Programadores',              category: 'marketing', description: 'Calculadora multi-função para devs.', icon: 'mdi:code-tags' },
  // Dev Tools
  { slug: 'code-gen',                               name: 'CodeGen QR & Barcode',                   category: 'dev', description: 'Gere QR Codes e códigos de barras personalizados.', icon: 'mdi:qrcode' },
  { slug: 'code-logic-flow-studio',                 name: 'Code Logic Flow Studio',                 category: 'dev', description: 'Crie e visualize fluxos de lógica interativos.', icon: 'mdi:arrow-decision-outline' },
  { slug: 'code-master',                            name: 'Code Master',                            category: 'dev', description: 'Editor de código com syntax highlighting em tempo real.', icon: 'mdi:code-json' },
  { slug: 'dev-playground',                         name: 'Dev Playground',                         category: 'dev', description: 'Playground para HTML, CSS e JavaScript.', icon: 'mdi:play-circle-outline' },
  { slug: 'dev-start',                              name: 'Dev Start',                              category: 'dev', description: 'Kit de início rápido para novos projetos.', icon: 'mdi:rocket-launch-outline' },
  { slug: 'dev-toolkit-suite-essentials',           name: 'Dev Toolkit Suite',                      category: 'dev', description: 'Suite completa de ferramentas para devs.', icon: 'mdi:toolbox-outline' },
  { slug: 'calculadora-ponto-eletrico',             name: 'Calculadora Elétrica',                   category: 'dev', description: 'Calcule carga e potência de projetos elétricos.', icon: 'mdi:lightning-bolt' },
  { slug: 'calculadora-metragem-cabo',              name: 'Calculadora de Cabos',                   category: 'dev', description: 'Calcule a quantidade de cabo para instalações.', icon: 'mdi:ethernet-cable' },
  { slug: 'dados-brasil-generator-pro',             name: 'Dados Brasil Generator',                 category: 'dev', description: 'Gere dados fictícios brasileiros para testes.', icon: 'mdi:database-outline' },
  { slug: 'entity-converter-pro',                   name: 'Entity Converter Pro',                   category: 'dev', description: 'Converta HTML entities e caracteres especiais.', icon: 'mdi:swap-horizontal' },
  { slug: 'excel-consolidator',                     name: 'Excel Consolidator',                     category: 'dev', description: 'Consolide planilhas Excel no browser.', icon: 'mdi:microsoft-excel' },
  { slug: 'pdf-convert-pro',                        name: 'PDF Convert Pro',                        category: 'dev', description: 'Converta e mescle arquivos PDF online.', icon: 'mdi:file-pdf-box' },
  { slug: 'srt-converter-pro',                      name: 'SRT Converter Pro',                      category: 'dev', description: 'Converta e edite legendas SRT.', icon: 'mdi:subtitles-outline' },
  { slug: 'qr-code-pro',                            name: 'QR Code Pro',                            category: 'dev', description: 'Crie QR Codes com logo e cores.', icon: 'mdi:qrcode-scan' },
  { slug: 'secure-secret-generator',                name: 'Gerador de Senhas Seguras',              category: 'dev', description: 'Gere senhas e segredos altamente seguros.', icon: 'mdi:key-variant' },
  { slug: 'conversor-cores',                        name: 'Conversor de Cores',                     category: 'dev', description: 'Converta cores entre HEX, RGB, HSL e outros.', icon: 'mdi:eyedropper-variant' },
  { slug: 'convert-share',                          name: 'Convert & Share',                        category: 'dev', description: 'Converta e compartilhe arquivos nos formatos populares.', icon: 'mdi:share-variant-outline' },
  // Texto & Conteúdo
  { slug: 'analisador-texto',                       name: 'Analisador de Texto',                    category: 'texto', description: 'Analise textos: contagem, frequência e legibilidade.', icon: 'mdi:text-search' },
  { slug: 'divisor-texto',                          name: 'Divisor de Texto',                       category: 'texto', description: 'Divida textos em partes iguais ou por delimitador.', icon: 'mdi:format-columns' },
  { slug: 'extrator-email-cpf-cnpj',               name: 'Extrator E-mail/CPF/CNPJ',              category: 'texto', description: 'Extraia e-mails, CPFs e CNPJs de qualquer texto.', icon: 'mdi:email-search-outline' },
  { slug: 'extrator-texto',                         name: 'Extrator de Texto',                      category: 'texto', description: 'Extraia conteúdo específico com regex.', icon: 'mdi:text-box-search-outline' },
  { slug: 'manipulador-lista',                      name: 'Manipulador de Lista',                   category: 'texto', description: 'Ordene, duplique, filtre e transforme listas.', icon: 'mdi:format-list-bulleted' },
  { slug: 'modificador-texto',                      name: 'Modificador de Texto',                   category: 'texto', description: 'Transforme textos: maiúsculas, slug, título e mais.', icon: 'mdi:format-text' },
  { slug: 'wordcraft-pro',                          name: 'WordCraft Pro',                          category: 'texto', description: 'Editor avançado com ferramentas de formatação.', icon: 'mdi:pencil-ruler' },
  { slug: 'ipsum-generator-plus',                   name: 'Ipsum Generator Plus',                   category: 'texto', description: 'Gere Lorem Ipsum e textos placeholder.', icon: 'mdi:format-quote-close' },
  { slug: 'extrator-email',                         name: 'Extrator de E-mails',                    category: 'texto', description: 'Extraia todos os e-mails de um texto.', icon: 'mdi:email-multiple-outline' },
  { slug: 'digitador',                              name: 'Digitador Automático',                   category: 'texto', description: 'Automatize a digitação com velocidade configurável.', icon: 'mdi:keyboard-outline' },
  { slug: 'teste-personalidade',                    name: 'Teste de Personalidade',                 category: 'texto', description: 'Descubra seu perfil com testes detalhados.', icon: 'mdi:head-cog-outline' },
  { slug: 'teste-vocacional',                       name: 'Teste Vocacional',                       category: 'texto', description: 'Descubra as carreiras alinhadas ao seu perfil.', icon: 'mdi:school-outline' },
  // Design & Mídia
  { slug: 'color-craft',                            name: 'Color Craft',                            category: 'design', description: 'Crie paletas de cores harmônicas.', icon: 'mdi:palette-outline' },
  { slug: 'gerador-gradiente',                      name: 'Gerador de Gradiente',                   category: 'design', description: 'Crie gradientes CSS e copie o código.', icon: 'mdi:gradient-horizontal' },
  { slug: 'gerador-fatura',                         name: 'Gerador de Fatura',                      category: 'design', description: 'Crie faturas profissionais e exporte em PDF.', icon: 'mdi:receipt-text-outline' },
  { slug: 'thumbnail-pro',                          name: 'Thumbnail Pro',                          category: 'design', description: 'Crie thumbnails profissionais para vídeos.', icon: 'mdi:image-edit-outline' },
  { slug: 'thumbnail-youtube',                      name: 'Thumbnail YouTube',                      category: 'design', description: 'Design de thumbnails otimizados para YouTube.', icon: 'mdi:youtube' },
  { slug: 'marca-dagua',                            name: "Marca d'Água",                           category: 'design', description: "Adicione marca d'água às suas imagens.", icon: 'mdi:copyright' },
  { slug: 'watermark-wizard',                       name: 'Watermark Wizard',                       category: 'design', description: "Ferramenta avançada para criar marcas d'água.", icon: 'mdi:image-lock-outline' },
  // Negócios
  { slug: 'sorteio-facil',                          name: 'Sorteio Fácil',                          category: 'negocios', description: 'Realize sorteios online transparentes.', icon: 'mdi:dice-5-outline' },
  { slug: 'consulta-pix',                           name: 'Consulta PIX',                           category: 'negocios', description: 'Consulte e valide chaves PIX.', icon: 'mdi:bank-transfer' },
]

// ─── Itens unificados para busca global ───────────────────────────────────────
interface UnifiedItem {
  id: string; name: string; description: string
  icon: string; category: string; path: string
  type: 'ferramenta' | 'app'
}

const unifiedItems = computed<UnifiedItem[]>(() => {
  const toolItems: UnifiedItem[] = store.tools.map((t) => ({
    id: `tool-${t.id}`, name: t.name, description: t.description,
    icon: t.icon || '',  // formato FontAwesome raw: 'fa-calculator'
    category: t.category,
    path: t.path, type: 'ferramenta',
  }))
  const appItems: UnifiedItem[] = apps.map((a) => ({
    id: `app-${a.slug}`, name: a.name, description: a.description,
    icon: a.icon, category: a.category,
    path: `/ferramentas/${a.slug}`, type: 'app',
  }))
  return [...toolItems, ...appItems]
})

// ─── Categorias unificadas (ferramentas + apps) ───────────────────────────────
const allCategories = computed(() => {
  const cats = [
    { id: 'todas',      label: `Todas (${unifiedItems.value.length})`, icon: 'mdi:view-grid-outline', count: 0 },
    // Tool categories
    { id: 'calculadoras',label: 'Calculadoras', icon: 'mdi:calculator',                    count: store.tools.filter(t => t.category === 'calculadoras').length },
    { id: 'geradores',   label: 'Geradores',    icon: 'mdi:wand-magic-sparkles',            count: store.tools.filter(t => t.category === 'geradores').length    },
    { id: 'conversores', label: 'Conversores',  icon: 'mdi:swap-horizontal',                count: store.tools.filter(t => t.category === 'conversores').length  },
    { id: 'validadores', label: 'Validadores',  icon: 'mdi:checkbox-marked-circle-outline', count: store.tools.filter(t => t.category === 'validadores').length  },
    { id: 'simuladores', label: 'Simuladores',  icon: 'mdi:chart-timeline-variant',         count: store.tools.filter(t => t.category === 'simuladores').length  },
    { id: 'texto',       label: 'Texto & OCR',  icon: 'mdi:format-text',                    count: store.tools.filter(t => t.category === 'texto').length + apps.filter(a => a.category === 'texto').length },
    // App categories
    { id: 'financas',    label: 'Finanças & Saúde', icon: 'mdi:cash-multiple',    count: apps.filter(a => a.category === 'financas').length  },
    { id: 'marketing',   label: 'Marketing',        icon: 'mdi:trending-up',      count: apps.filter(a => a.category === 'marketing').length },
    { id: 'dev',         label: 'Dev Tools',        icon: 'mdi:code-braces',      count: apps.filter(a => a.category === 'dev').length       },
    { id: 'design',      label: 'Design & Mídia',   icon: 'mdi:palette-outline',  count: apps.filter(a => a.category === 'design').length    },
    { id: 'negocios',    label: 'Negócios',          icon: 'mdi:briefcase-outline',count: apps.filter(a => a.category === 'negocios').length  },
  ]
  return cats
})

// ─── Stats das categorias (para o grid de stats) ──────────────────────────────
const categoryStats = computed(() => allCategories.value.filter(c => c.id !== 'todas').map(c => ({
  id: c.id, label: c.label, icon: c.icon, count: c.count,
})))

// ─── Ferramentas agrupadas por categoria (para modo padrão) ───────────────────
const toolsByCategory = computed(() => store.toolsByCategory)

// ─── Filtro unificado (busca + categoria) ─────────────────────────────────────
const filteredItems = computed<UnifiedItem[]>(() => {
  let items = unifiedItems.value
  const q = searchQuery.value.trim().toLowerCase()

  if (activeCategory.value !== 'todas') {
    items = items.filter((i) => i.category === activeCategory.value)
  }
  if (q) {
    items = items.filter((i) =>
      i.name.toLowerCase().includes(q) ||
      i.description.toLowerCase().includes(q) ||
      i.category.toLowerCase().includes(q),
    )
  }
  return items
})

// ─── Helpers ──────────────────────────────────────────────────────────────────
function setCategory(id: string) {
  activeCategory.value = id
  searchQuery.value = ''
}

function clearFilters() {
  activeCategory.value = 'todas'
  searchQuery.value = ''
}

// ─── Debounced search tracking ────────────────────────────────────────────────
let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null
watch(searchQuery, (val) => {
  if (searchDebounceTimer) clearTimeout(searchDebounceTimer)
  if (val && val.trim()) {
    searchDebounceTimer = setTimeout(() => trackSearch(val.trim()), 400)
  }
})

// ─── Promo carousel ───────────────────────────────────────────────────────────
const promos = [
  { icon: 'mdi:web',       text: '🎁 Sites Profissionais a partir de R$ 997',           cta: 'VER PLANOS',  link: 'https://wa.me/5541996924829?text=Quero%20criar%20um%20site%20profissional.'     },
  { icon: 'mdi:chart-line',text: '🚀 Gestão de Tráfego + Redes Sociais por R$ 500/mês', cta: 'APROVEITAR',  link: 'https://wa.me/5541996924829?text=Quero%20marketing%20digital.'                  },
  { icon: 'mdi:robot',     text: '🤖 Automação WhatsApp com IA — Atendimento 24/7',     cta: 'TESTAR',      link: 'https://wa.me/5541996924829?text=Quero%20automação%20WhatsApp%20com%20IA.'     },
  { icon: 'mdi:handshake', text: '⭐ Indique parceiros e ganhe bônus em serviços!',      cta: 'INDIQUE',     link: 'https://wa.me/5541996924829?text=Quero%20participar%20do%20Indique%20e%20Ganhe.'},
]

const nextPromo = () => { currentPromo.value = (currentPromo.value + 1) % promos.length }
const prevPromo = () => { currentPromo.value = currentPromo.value === 0 ? promos.length - 1 : currentPromo.value - 1 }

onMounted(() => { promoInterval = setInterval(nextPromo, 4000) })
onUnmounted(() => { if (promoInterval) clearInterval(promoInterval) })

// ─── Badges do Hero ───────────────────────────────────────────────────────────
const heroBadges = [
  { icon: 'mdi:shield-check', color: 'text-green-400', text: 'Privacidade Total (Zero Upload)' },
  { icon: 'mdi:flash',        color: 'text-yellow-400',text: 'Processamento Instantâneo'        },
  { icon: 'mdi:gift-outline', color: 'text-pink-300',  text: 'Livre de Cadastros'               },
  { icon: 'mdi:cellphone',    color: 'text-cyan-300',  text: '100% Responsivo'                  },
]
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }
.scrollbar-none::-webkit-scrollbar     { display: none; }
.scrollbar-none                        { -ms-overflow-style: none; scrollbar-width: none; }
</style>
