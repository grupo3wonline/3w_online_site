<template>
  <div class="solucoes-page min-h-screen bg-slate-50">

    <!-- ───── Breadcrumb & Header Bar ───── -->
    <div class="bg-gradient-to-r from-[#0a1628] via-[#111d3a] to-[#162044] py-4 border-b border-white/10">
      <div class="container">
        <nav class="flex items-center text-xs text-blue-300 gap-1.5" aria-label="Trilha de navegação">
          <RouterLink to="/" class="hover:text-white transition-colors flex items-center gap-1">
            <Icon icon="mdi:home" class="w-3.5 h-3.5" />
            <span>Início</span>
          </RouterLink>
          <Icon icon="mdi:chevron-right" class="w-3.5 h-3.5 text-blue-400/60" />
          <span class="text-white font-medium">Soluções Digitais</span>
        </nav>
      </div>
    </div>

    <!-- ───── Promo Banner ───── -->
    <div class="bg-gradient-to-r from-accent-500 to-accent-600 py-2.5 overflow-hidden text-white">
      <div class="container">
        <div class="flex items-center justify-center gap-3 text-xs sm:text-sm">
          <button @click="prevPromo" class="p-1 hover:bg-white/20 rounded-full transition-colors" aria-label="Anterior">
            <Icon icon="mdi:chevron-left" class="w-4 h-4" />
          </button>
          <Transition name="fade" mode="out-in">
            <div :key="currentPromo" class="flex items-center gap-2.5">
              <Icon :icon="promos[currentPromo].icon" class="w-4 h-4 text-yellow-200 shrink-0" />
              <span class="font-medium truncate">{{ promos[currentPromo].text }}</span>
              <a
                :href="promos[currentPromo].link"
                target="_blank"
                rel="noopener noreferrer"
                class="bg-white text-accent-700 px-3 py-0.5 rounded-full text-[11px] font-bold hover:bg-gray-100 transition-colors whitespace-nowrap shadow-sm"
              >
                {{ promos[currentPromo].cta }}
              </a>
            </div>
          </Transition>
          <button @click="nextPromo" class="p-1 hover:bg-white/20 rounded-full transition-colors" aria-label="Próximo">
            <Icon icon="mdi:chevron-right" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- ───── Hero Section ───── -->
    <section class="page-hero relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#111d3a] to-[#162044]">
      <!-- Orbs decorativos -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div class="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"></div>
      </div>

      <div class="container relative z-10 py-16 md:py-20">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 bg-secondary-500/20 text-secondary-300 border border-secondary-500/30 px-3 py-1 rounded-full text-xs font-semibold mb-4">
            <Icon icon="mdi:rocket-launch-outline" class="w-3.5 h-3.5" />
            <span>62 Aplicações • 100% Gratuitas & Client-Side</span>
          </div>

          <h1 class="page-hero-title text-white mb-4">
            Soluções Digitais <span class="text-primary-400">Profissionais</span>
          </h1>

          <p class="text-blue-200/80 text-lg leading-relaxed mb-8 max-w-2xl">
            Suite completa de aplicações web independentes: calculadoras avançadas, simuladores financeiros,
            ferramentas de design, dev tools e muito mais. Todas gratuitas e processadas no seu navegador.
          </p>

          <!-- Barra de Busca -->
          <div class="relative max-w-xl">
            <Icon icon="mdi:magnify" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" aria-hidden="true" />
            <input
              v-model="store.searchQuery"
              type="search"
              placeholder="Buscar solução... (ex: calculadora, PDF, QR code)"
              class="w-full pl-11 pr-4 py-3.5 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-400 transition-all"
              aria-label="Buscar solução"
            />
            <button
              v-if="store.searchQuery"
              @click="store.searchQuery = ''"
              class="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Limpar busca"
            >
              <Icon icon="mdi:close" class="w-4 h-4 text-blue-300" />
            </button>
          </div>

          <!-- Stats -->
          <div class="flex flex-wrap gap-6 mt-8">
            <div v-for="stat in stats" :key="stat.label" class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" :class="stat.bg">
                <Icon :icon="stat.icon" class="w-4 h-4" :class="stat.color" />
              </div>
              <div>
                <div class="text-white font-bold text-sm leading-none">{{ stat.value }}</div>
                <div class="text-blue-300/70 text-[11px]">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ───── Destaques ───── -->
    <section v-if="!store.searchQuery && store.selectedCategory === 'todos'" class="py-10 bg-white border-b border-gray-100">
      <div class="container">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-lg font-bold text-gray-900">⭐ Mais Populares</h2>
            <p class="text-xs text-gray-500 mt-0.5">Soluções com maior engajamento da nossa suite</p>
          </div>
          <button
            @click="store.selectedCategory = 'todos'"
            class="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
          >
            Ver todas <Icon icon="mdi:arrow-right" class="w-3.5 h-3.5" />
          </button>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          <RouterLink
            v-for="s in featuredSolucoes"
            :key="s.id"
            :to="`/solucoes/${s.id}`"
            class="group flex flex-col items-center gap-2 p-3 bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-xl transition-all text-center"
          >
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <Icon :icon="s.icon" class="w-5 h-5 text-white" />
            </div>
            <span class="text-[11px] font-medium text-gray-700 group-hover:text-primary-700 leading-tight line-clamp-2">{{ s.name }}</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ───── Filtros de Categoria ───── -->
    <div class="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div class="container">
        <div class="flex items-center gap-1.5 overflow-x-auto py-3 scrollbar-none">
          <button
            v-for="cat in store.categories"
            :key="cat.id"
            @click="store.selectedCategory = cat.id"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all"
            :class="store.selectedCategory === cat.id
              ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
          >
            <Icon :icon="cat.icon" class="w-3.5 h-3.5" />
            <span>{{ cat.title }}</span>
            <span
              v-if="store.totalByCategory[cat.id]"
              class="text-[10px] px-1.5 py-0.5 rounded-full font-bold leading-none"
              :class="store.selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'"
            >
              {{ store.totalByCategory[cat.id] }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- ───── Grid de Soluções ───── -->
    <section class="py-10">
      <div class="container">

        <!-- Resultado da busca / info -->
        <div v-if="store.searchQuery || store.selectedCategory !== 'todos'" class="mb-5 flex items-center gap-2 text-sm text-gray-500">
          <Icon icon="mdi:filter-outline" class="w-4 h-4" />
          <span>
            <strong class="text-gray-800">{{ store.filteredSolucoes.length }}</strong>
            solução(ões) encontrada(s)
            <span v-if="store.searchQuery"> para <em>"{{ store.searchQuery }}"</em></span>
          </span>
          <button
            v-if="store.searchQuery || store.selectedCategory !== 'todos'"
            @click="clearFilters"
            class="ml-2 text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
          >
            <Icon icon="mdi:close-circle-outline" class="w-3.5 h-3.5" />
            Limpar
          </button>
        </div>

        <!-- Grid -->
        <TransitionGroup
          v-if="store.filteredSolucoes.length > 0"
          name="list"
          tag="div"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <RouterLink
            v-for="solucao in store.filteredSolucoes"
            :key="solucao.id"
            :to="`/solucoes/${solucao.id}`"
            class="group flex flex-col bg-white border border-gray-200 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-500/10 rounded-2xl overflow-hidden transition-all duration-200"
          >
            <!-- Card Header -->
            <div class="p-5 pb-4 flex-1">
              <div class="flex items-start gap-3 mb-3">
                <div
                  class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110"
                  :class="getCategoryColor(solucao.category)"
                >
                  <Icon :icon="solucao.icon" class="w-5.5 h-5.5 text-white" />
                </div>
                <div class="min-w-0">
                  <h3 class="text-sm font-bold text-gray-900 group-hover:text-primary-700 transition-colors leading-snug line-clamp-2">
                    {{ solucao.name }}
                  </h3>
                  <span class="inline-flex items-center gap-1 mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full" :class="getCategoryBadge(solucao.category)">
                    {{ getCategoryTitle(solucao.category) }}
                  </span>
                </div>
              </div>
              <p class="text-xs text-gray-500 leading-relaxed line-clamp-2">
                {{ solucao.shortDesc }}
              </p>
            </div>

            <!-- Tags -->
            <div class="px-5 pb-3 flex flex-wrap gap-1">
              <span
                v-for="tag in solucao.tags.slice(0, 3)"
                :key="tag"
                class="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Card Footer -->
            <div class="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <span class="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <Icon icon="mdi:shield-check" class="w-3.5 h-3.5" />
                100% Gratuita
              </span>
              <span class="text-[11px] text-primary-600 font-semibold flex items-center gap-1 group-hover:gap-1.5 transition-all">
                Acessar
                <Icon icon="mdi:arrow-right" class="w-3.5 h-3.5" />
              </span>
            </div>
          </RouterLink>
        </TransitionGroup>

        <!-- Empty state -->
        <div v-else class="flex flex-col items-center justify-center py-20 text-center">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Icon icon="mdi:magnify-close" class="w-8 h-8 text-gray-400" />
          </div>
          <h3 class="text-gray-700 font-semibold mb-2">Nenhuma solução encontrada</h3>
          <p class="text-sm text-gray-500 mb-4">Tente ajustar os filtros ou o termo de busca.</p>
          <button
            @click="clearFilters"
            class="btn-primary text-sm"
          >
            Ver todas as soluções
          </button>
        </div>
      </div>
    </section>

    <!-- ───── CTA Final ───── -->
    <section class="py-16 bg-gradient-to-br from-[#0a1628] via-[#111d3a] to-[#162044]">
      <div class="container text-center">
        <div class="max-w-2xl mx-auto">
          <div class="w-14 h-14 bg-primary-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Icon icon="mdi:rocket-launch" class="w-7 h-7 text-primary-400" />
          </div>
          <h2 class="text-2xl md:text-3xl font-black text-white mb-4">
            Precisa de uma solução <span class="text-primary-400">personalizada</span>?
          </h2>
          <p class="text-blue-200/80 text-base mb-8">
            Desenvolvemos sistemas, aplicativos e soluções web sob medida para o seu negócio.
            Entre em contato e receba um orçamento gratuito.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://api.whatsapp.com/send?phone=5541996924829&text=Ol%C3%A1!%20Vi%20as%20Solu%C3%A7%C3%B5es%20Digitais%20no%20site%20e%20quero%20um%20or%C3%A7amento."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-whatsapp"
            >
              <Icon icon="mdi:whatsapp" class="w-5 h-5" />
              Falar no WhatsApp
            </a>
            <RouterLink to="/servicos" class="btn-secondary-dark">
              Ver Nossos Serviços
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useSolucoesStore } from '@/stores/solucoes'

// ─── Store ──────────────────────────────────────────────────────────────────────
const store = useSolucoesStore()

const featuredSolucoes = computed(() => store.featuredSolucoes)

function clearFilters() {
  store.searchQuery = ''
  store.selectedCategory = 'todos'
}

// ─── Helpers de categoria ───────────────────────────────────────────────────────
const categoryMeta: Record<string, { color: string; badge: string; title: string }> = {
  financeiro: { color: 'bg-gradient-to-br from-emerald-500 to-emerald-600', badge: 'bg-emerald-50 text-emerald-600', title: 'Finanças & Saúde' },
  marketing:  { color: 'bg-gradient-to-br from-orange-500 to-orange-600',   badge: 'bg-orange-50 text-orange-600',   title: 'Marketing'        },
  dev:        { color: 'bg-gradient-to-br from-cyan-500 to-cyan-600',       badge: 'bg-cyan-50 text-cyan-600',       title: 'Dev Tools'        },
  texto:      { color: 'bg-gradient-to-br from-violet-500 to-violet-600',   badge: 'bg-violet-50 text-violet-600',   title: 'Texto & Conteúdo' },
  design:     { color: 'bg-gradient-to-br from-pink-500 to-pink-600',       badge: 'bg-pink-50 text-pink-600',       title: 'Design & Mídia'   },
  negocios:   { color: 'bg-gradient-to-br from-yellow-500 to-yellow-600',   badge: 'bg-yellow-50 text-yellow-700',   title: 'Negócios'         },
}

function getCategoryColor(cat: string) {
  return categoryMeta[cat]?.color ?? 'bg-gradient-to-br from-primary-500 to-primary-600'
}
function getCategoryBadge(cat: string) {
  return categoryMeta[cat]?.badge ?? 'bg-primary-50 text-primary-600'
}
function getCategoryTitle(cat: string) {
  return categoryMeta[cat]?.title ?? cat
}

// ─── Stats ──────────────────────────────────────────────────────────────────────
const stats = [
  { value: '62+',    label: 'Aplicações',      icon: 'mdi:apps',               color: 'text-primary-400',  bg: 'bg-primary-500/20'  },
  { value: '100%',   label: 'Gratuitas',        icon: 'mdi:currency-usd-off',   color: 'text-emerald-400',  bg: 'bg-emerald-500/20'  },
  { value: '0',      label: 'Dados enviados',   icon: 'mdi:shield-check',       color: 'text-secondary-400',bg: 'bg-secondary-500/20'},
  { value: '7',      label: 'Categorias',       icon: 'mdi:tag-multiple-outline',color: 'text-accent-400', bg: 'bg-accent-500/20'   },
]

// ─── Promo Carousel ─────────────────────────────────────────────────────────────
const promos = [
  { icon: 'mdi:rocket-launch', text: 'Precisa de um sistema sob medida? Fale com a 3W Online!', link: 'https://api.whatsapp.com/send?phone=5541996924829', cta: 'Orçamento Grátis' },
  { icon: 'mdi:star-circle',   text: '62 aplicações profissionais gratuitas — sem cadastro!',  link: '#', cta: 'Explorar' },
  { icon: 'mdi:shield-lock',   text: 'Seus dados ficam 100% no seu navegador. Zero upload.',   link: '/privacidade', cta: 'Saiba Mais' },
  { icon: 'mdi:whatsapp',      text: 'Automatize seu negócio com IA e WhatsApp — 3W Online',  link: '/servicos/automacao-ia', cta: 'Ver Solução' },
]

const currentPromo = ref(0)
let promoTimer: ReturnType<typeof setInterval> | null = null

function nextPromo() {
  currentPromo.value = (currentPromo.value + 1) % promos.length
}
function prevPromo() {
  currentPromo.value = (currentPromo.value - 1 + promos.length) % promos.length
}

onMounted(() => {
  promoTimer = setInterval(nextPromo, 6000)
})
onUnmounted(() => {
  if (promoTimer) clearInterval(promoTimer)
})
</script>

<style scoped>
/* Transição do promo carousel */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateX(10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

/* Transição do grid de cards */
.list-enter-active,
.list-leave-active {
  transition: all 0.25s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.96);
}

/* Remove scrollbar horizontal nos filtros */
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
