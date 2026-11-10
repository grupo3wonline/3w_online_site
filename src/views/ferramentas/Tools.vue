<template>
  <div class="tools-page">
    <!-- Breadcrumb & Header Bar -->
    <div class="bg-gradient-to-r from-[#0a1628] via-[#111d3a] to-[#162044] py-4 border-b border-white/10">
      <div class="container">
        <nav class="flex items-center text-xs text-blue-300 gap-1.5" aria-label="Trilha de navegação">
          <RouterLink to="/" class="hover:text-white transition-colors flex items-center gap-1">
            <Icon icon="mdi:home" class="w-3.5 h-3.5" />
            <span>Início</span>
          </RouterLink>
          <Icon icon="mdi:chevron-right" class="w-3.5 h-3.5 text-blue-400/60" />
          <span class="text-white font-medium">Ferramentas Digitais</span>
        </nav>
      </div>
    </div>

    <!-- Promo Carousel Banner -->
    <div class="bg-gradient-to-r from-accent-500 to-accent-600 py-2.5 relative overflow-hidden text-white">
      <div class="container">
        <div class="flex items-center justify-center">
          <div class="flex items-center gap-3 text-xs sm:text-sm">
            <button @click="prevPromo" class="p-1 hover:bg-white/20 rounded-full transition-colors shrink-0" aria-label="Promoção anterior">
              <Icon icon="mdi:chevron-left" class="w-4 h-4" />
            </button>
            <Transition name="fade" mode="out-in">
              <div :key="currentPromo" class="flex items-center gap-2.5 min-w-0">
                <Icon :icon="promos[currentPromo].icon" class="w-4 h-4 text-yellow-200 shrink-0" />
                <span class="font-medium truncate">{{ promos[currentPromo].text }}</span>
                <a
                  :href="promos[currentPromo].link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="bg-white text-accent-700 px-3 py-0.5 rounded-full text-[11px] font-bold hover:bg-gray-100 transition-colors whitespace-nowrap shrink-0 shadow-sm"
                >
                  {{ promos[currentPromo].cta }}
                </a>
              </div>
            </Transition>
            <button @click="nextPromo" class="p-1 hover:bg-white/20 rounded-full transition-colors shrink-0" aria-label="Próxima promoção">
              <Icon icon="mdi:chevron-right" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Hero Section -->
    <section class="page-hero relative overflow-hidden">
      <div class="container relative z-10">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 bg-secondary-500/20 text-secondary-300 border border-secondary-500/30 px-3 py-1 rounded-full text-xs font-semibold mb-4">
            <Icon icon="mdi:lightning-bolt" class="w-3.5 h-3.5 text-secondary-400" />
            <span>Suíte Completa • 100% Gratuita & Client-Side</span>
          </div>

          <h1 class="page-hero-title">
            Ferramentas Digitais Profissionais
          </h1>

          <p class="page-hero-subtitle mb-8 max-w-2xl leading-relaxed">
            Mais de 120 utilitários para otimizar sua rotina: calculadoras financeiras, geradores de dados, conversores e validadores com processamento instantâneo no seu navegador.
          </p>

          <!-- Badges de Garantias -->
          <div class="flex flex-wrap gap-2.5">
            <div class="flex items-center bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg px-3.5 py-1.5 text-xs text-white">
              <Icon icon="mdi:shield-check" class="w-4 h-4 mr-1.5 text-green-400" />
              <span>Privacidade Total (Zero Upload)</span>
            </div>
            <div class="flex items-center bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg px-3.5 py-1.5 text-xs text-white">
              <Icon icon="mdi:flash" class="w-4 h-4 mr-1.5 text-yellow-400" />
              <span>Processamento Instantâneo</span>
            </div>
            <div class="flex items-center bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg px-3.5 py-1.5 text-xs text-white">
              <Icon icon="mdi:gift-outline" class="w-4 h-4 mr-1.5 text-pink-300" />
              <span>Livre de Cadastros</span>
            </div>
            <div class="flex items-center bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg px-3.5 py-1.5 text-xs text-white">
              <Icon icon="mdi:cellphone" class="w-4 h-4 mr-1.5 text-cyan-300" />
              <span>100% Responsivo</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Busca e Filtros Sticky -->
    <section class="sticky top-14 md:top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm py-3.5">
      <div class="container">
        <div class="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <!-- Campo de Busca -->
          <div class="relative flex-1">
            <Icon icon="mdi:magnify" class="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar ferramentas por nome, categoria ou utilidade..."
              class="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all shadow-inner"
            />
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              aria-label="Limpar busca"
            >
              <Icon icon="mdi:close-circle" class="w-4 h-4" />
            </button>
          </div>

          <!-- Filtros de Categorias -->
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              v-for="cat in categoryButtons"
              :key="cat.id"
              :class="[
                'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border whitespace-nowrap flex items-center gap-1.5',
                selectedCategory === cat.id
                  ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-primary-400 hover:text-primary-600',
              ]"
              @click="selectCategory(cat.id)"
            >
              <Icon :icon="cat.icon" class="w-3.5 h-3.5" />
              <span>{{ cat.name }}</span>
            </button>
          </div>
        </div>

        <!-- Indicador de Resultados da Busca -->
        <div v-if="searchQuery" class="mt-2.5 text-xs text-gray-600 flex items-center gap-1.5">
          <span v-if="filteredTools.length > 0" class="text-green-700 font-medium flex items-center gap-1">
            <Icon icon="mdi:check-circle" class="w-4 h-4 text-green-600" />
            {{ filteredTools.length }} ferramenta(s) encontrada(s)
          </span>
          <span v-else class="text-red-600 font-medium flex items-center gap-1">
            <Icon icon="mdi:alert-circle" class="w-4 h-4 text-red-500" />
            Nenhuma ferramenta encontrada para "{{ searchQuery }}"
          </span>
        </div>
      </div>
    </section>

    <!-- Cards Métricos de Categorias -->
    <section class="container py-8">
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div
          v-for="(info, key) in store.categoryInfo"
          :key="key"
          class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center hover:shadow-md hover:border-primary-300 transition-all cursor-pointer group"
          :class="{ 'ring-2 ring-primary-500 border-primary-500 bg-primary-50/20': selectedCategory === key }"
          @click="selectCategory(key as string)"
        >
          <div class="w-10 h-10 mx-auto mb-2 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
            <i :class="['fas', info.icon, 'text-base']"></i>
          </div>
          <p class="text-xl font-extrabold text-gray-900 leading-tight">{{ info.total }}</p>
          <p class="text-[11px] text-gray-500 font-medium">{{ info.title }}</p>
        </div>
      </div>
    </section>

    <!-- Grid de Ferramentas -->
    <section class="container pb-16">
      <!-- Modo Filtrado / Busca -->
      <div v-if="searchQuery || selectedCategory !== 'all'">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <ToolCard v-for="tool in filteredTools" :key="tool.id" :tool="tool" />
        </div>
      </div>

      <!-- Modo Agrupado por Categoria -->
      <div v-else class="space-y-12">
        <div
          v-for="(categoryTools, category) in store.toolsByCategory"
          :key="category"
          :id="`category-${category}`"
          class="scroll-mt-36"
        >
          <div class="flex items-center justify-between border-b border-gray-200 pb-3 mb-6">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center">
                <i :class="['fas', store.categoryInfo[category]?.icon || 'fa-folder', 'text-sm']"></i>
              </div>
              <h2 class="text-xl font-bold text-gray-900">
                {{ store.categoryInfo[category]?.title || category }}
              </h2>
            </div>
            <span class="px-3 py-1 text-xs font-bold rounded-full bg-primary-50 text-primary-700 border border-primary-100">
              {{ categoryTools.length }} utilitários
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <ToolCard v-for="tool in categoryTools" :key="tool.id" :tool="tool" />
          </div>
        </div>
      </div>
    </section>

    <!-- CTA: Soluções Comerciais da 3W Online -->
    <section class="cta-section">
      <div class="container text-center">
        <span class="text-xs font-semibold text-secondary-400 uppercase tracking-wider block mb-2">Engenharia & Soluções Sob Medida</span>
        <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-3">Gostou das ferramentas? Construímos seu sistema personalizado!</h2>
        <p class="text-sm text-blue-200 mb-8 max-w-2xl mx-auto leading-relaxed">
          Além das ferramentas gratuitas, criamos plataformas web, CRMs, ERPs sob medida e sites de alta performance para seu negócio.
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useToolsStore } from '@/stores/tools'
import ToolCard from '@/components/tools/common/ToolCard.vue'

const store = useToolsStore()

const searchQuery = ref('')
const selectedCategory = ref('all')
const currentPromo = ref(0)
let promoInterval: ReturnType<typeof setInterval> | null = null

const promos = [
  { icon: 'mdi:web', text: '🎁 Sites Profissionais a partir de R$ 997', cta: 'VER PLANOS', link: 'https://wa.me/5541996924829?text=Quero%20criar%20um%20site%20profissional.' },
  { icon: 'mdi:chart-line', text: '🚀 Gestão de Tráfego + Redes Sociais por R$ 500/mês', cta: 'APROVEITAR', link: 'https://wa.me/5541996924829?text=Quero%20saber%20sobre%20marketing%20digital.' },
  { icon: 'mdi:robot', text: '🤖 Automação WhatsApp com IA — Atendimento 24/7', cta: 'TESTAR', link: 'https://wa.me/5541996924829?text=Quero%20automação%20WhatsApp%20com%20IA.' },
  { icon: 'mdi:handshake', text: '⭐ Indique parceiros e ganhe bônus em serviços digitais!', cta: 'INDIQUE', link: 'https://wa.me/5541996924829?text=Quero%20participar%20do%20Indique%20e%20Ganhe.' },
]

const categoryButtons = [
  { id: 'all', name: 'Todas (120+)', icon: 'mdi:view-grid-outline' },
  { id: 'calculadoras', name: 'Calculadoras', icon: 'mdi:calculator' },
  { id: 'geradores', name: 'Geradores', icon: 'mdi:wand-shining' },
  { id: 'conversores', name: 'Conversores', icon: 'mdi:swap-horizontal' },
  { id: 'validadores', name: 'Validadores', icon: 'mdi:checkbox-marked-circle-outline' },
  { id: 'simuladores', name: 'Simuladores', icon: 'mdi:chart-timeline-variant' },
  { id: 'texto', name: 'Texto & OCR', icon: 'mdi:format-text' },
]

const filteredTools = computed(() => {
  let tools = store.tools

  if (selectedCategory.value !== 'all') {
    tools = tools.filter((t) => t.category === selectedCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    tools = tools.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query),
    )
  }

  return tools
})

const selectCategory = (category: string) => {
  selectedCategory.value = category
  if (category !== 'all' && !searchQuery.value) {
    setTimeout(() => {
      const el = document.getElementById(`category-${category}`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }
}

const clearSearch = () => {
  searchQuery.value = ''
}

const nextPromo = () => {
  currentPromo.value = (currentPromo.value + 1) % promos.length
}

const prevPromo = () => {
  currentPromo.value = currentPromo.value === 0 ? promos.length - 1 : currentPromo.value - 1
}

onMounted(() => {
  promoInterval = setInterval(nextPromo, 4000)
})

onUnmounted(() => {
  if (promoInterval) clearInterval(promoInterval)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
