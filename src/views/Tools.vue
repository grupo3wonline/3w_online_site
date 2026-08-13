<template>
  <div class="tools-page">
    <!-- Breadcrumb -->
    <div class="bg-gradient-to-r from-[#0a1628] to-[#162044] py-4">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex items-center text-sm text-blue-300" aria-label="Breadcrumb">
          <RouterLink to="/" class="hover:text-white transition-colors">
            <i class="fas fa-home"></i>
          </RouterLink>
          <i class="fas fa-chevron-right text-xs mx-2 text-blue-500"></i>
          <span class="text-white font-medium">Ferramentas Digitais</span>
        </nav>
      </div>
    </div>

    <!-- Promo Carousel Banner -->
    <div class="bg-gradient-to-r from-accent-500 to-accent-600 py-3 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-center">
          <div class="flex items-center gap-4 text-white text-sm">
            <button @click="prevPromo" class="p-1 hover:bg-white/20 rounded-full transition-colors" aria-label="Promoção anterior">
              <i class="fas fa-chevron-left"></i>
            </button>
            <transition name="fade" mode="out-in">
              <div :key="currentPromo" class="flex items-center gap-3 min-w-0">
                <i :class="['fas', promos[currentPromo].icon, 'text-lg']"></i>
                <span class="font-medium whitespace-nowrap">{{ promos[currentPromo].text }}</span>
                <a
                  :href="promos[currentPromo].link"
                  target="_blank"
                  class="bg-white text-accent-700 px-3 py-1 rounded-full text-xs font-bold hover:bg-gray-100 transition-colors whitespace-nowrap"
                >
                  {{ promos[currentPromo].cta }}
                </a>
              </div>
            </transition>
            <button @click="nextPromo" class="p-1 hover:bg-white/20 rounded-full transition-colors" aria-label="Próxima promoção">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-14">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <i class="fas fa-tools mr-3 text-secondary-300"></i>
            Ferramentas Digitais Gratuitas
          </h1>
          <p class="text-lg text-primary-100 mb-8">
            Mais de 120 ferramentas profissionais online para facilitar seu trabalho diário.
            Processamento 100% local no seu navegador — privacidade e segurança garantidas.
          </p>
          <div class="flex flex-wrap gap-3">
            <div class="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <i class="fas fa-shield-alt mr-2 text-green-300"></i>
              <span class="text-sm font-medium">100% Seguro</span>
            </div>
            <div class="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <i class="fas fa-bolt mr-2 text-yellow-300"></i>
              <span class="text-sm font-medium">Rápido e Eficiente</span>
            </div>
            <div class="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <i class="fas fa-gift mr-2 text-pink-300"></i>
              <span class="text-sm font-medium">Totalmente Gratuito</span>
            </div>
            <div class="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <i class="fas fa-mobile-alt mr-2 text-blue-300"></i>
              <span class="text-sm font-medium">Funciona no Celular</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Busca e Filtros -->
    <section class="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <!-- Search -->
          <div class="relative flex-1 w-full">
            <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar ferramentas por nome ou descrição..."
              class="w-full pl-12 pr-10 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-base"
            />
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>

          <!-- Category filters -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="cat in categoryButtons"
              :key="cat.id"
              :class="[
                'px-3 py-2 rounded-full text-sm font-medium transition-all border whitespace-nowrap',
                selectedCategory === cat.id
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-primary-400 hover:text-primary-600',
              ]"
              @click="selectCategory(cat.id)"
            >
              <i :class="['fas', cat.icon, 'mr-1']"></i>
              {{ cat.name }}
            </button>
          </div>
        </div>

        <!-- Search result count -->
        <div v-if="searchQuery" class="mt-2 text-sm text-gray-600">
          <span v-if="filteredTools.length > 0">
            <i class="fas fa-check-circle text-green-500 mr-1"></i>
            {{ filteredTools.length }} ferramenta(s) encontrada(s)
          </span>
          <span v-else class="text-red-500">
            <i class="fas fa-exclamation-circle mr-1"></i>
            Nenhuma ferramenta encontrada para "{{ searchQuery }}"
          </span>
        </div>
      </div>
    </section>

    <!-- Estatísticas -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div
          v-for="(info, key) in store.categoryInfo"
          :key="key"
          class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center hover:shadow-md hover:border-primary-200 transition-all cursor-pointer"
          :class="{ 'ring-2 ring-primary-500 border-primary-500': selectedCategory === key }"
          @click="selectCategory(key as string)"
        >
          <div class="w-10 h-10 mx-auto mb-2 rounded-lg bg-primary-50 flex items-center justify-center">
            <i :class="['fas', info.icon, 'text-primary-600']"></i>
          </div>
          <p class="text-2xl font-bold text-gray-900">{{ info.total }}</p>
          <p class="text-xs text-gray-500">{{ info.title }}</p>
        </div>
      </div>
    </section>

    <!-- Ferramentas Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <!-- Modo filtrado -->
      <div v-if="searchQuery || selectedCategory !== 'all'">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <ToolCard v-for="tool in filteredTools" :key="tool.id" :tool="tool" />
        </div>
      </div>

      <!-- Modo agrupado por categoria -->
      <div v-else>
        <div
          v-for="(categoryTools, category) in store.toolsByCategory"
          :key="category"
          :id="`category-${category}`"
          class="mb-12 scroll-mt-24"
        >
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
              <i :class="['fas', store.categoryInfo[category]?.icon || 'fa-folder', 'text-primary-600']"></i>
            </div>
            <h2 class="text-2xl font-bold text-gray-900">
              {{ store.categoryInfo[category]?.title || category }}
            </h2>
            <span class="px-3 py-1 text-sm font-medium rounded-full bg-primary-50 text-primary-700">
              {{ categoryTools.length }}
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <ToolCard v-for="tool in categoryTools" :key="tool.id" :tool="tool" />
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section: Indique e Ganhe -->
    <section class="bg-gradient-to-r from-secondary-500 to-secondary-700 py-10">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div class="flex items-center justify-center gap-2 mb-3">
          <i class="fas fa-gift text-2xl text-yellow-300"></i>
          <h2 class="text-2xl font-bold">Indique e Ganhe!</h2>
          <i class="fas fa-star text-2xl text-yellow-300"></i>
        </div>
        <p class="text-secondary-100 mb-6">
          Indique amigos para a 3W Online e ganhe créditos nos nossos serviços. Quanto mais indicar, mais você ganha!
        </p>
        <a
          href="https://wa.me/5541996924829?text=Ol%C3%A1!%20Quero%20participar%20do%20programa%20Indique%20e%20Ganhe."
          target="_blank"
          class="inline-flex items-center gap-2 bg-white text-secondary-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
        >
          <i class="fab fa-whatsapp text-lg"></i>
          Quero indicar agora
        </a>
      </div>
    </section>

    <!-- Serviços da 3W Online -->
    <section class="py-14 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10">
          <span class="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-2 block">Nossos Serviços</span>
          <h2 class="text-3xl font-bold text-gray-900 mb-3">
            Potencialize seus resultados com a 3W Online
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Além das ferramentas gratuitas, oferecemos soluções completas de marketing digital,
            desenvolvimento web e automação com inteligência artificial.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-lg hover:-translate-y-1 transition-all">
            <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
              <i class="fas fa-globe text-blue-600 text-xl"></i>
            </div>
            <h4 class="font-bold text-gray-900 mb-2">Criação de Sites</h4>
            <p class="text-sm text-gray-600 mb-4">Sites profissionais, responsivos e otimizados para SEO. Design exclusivo.</p>
            <a href="https://wa.me/5541996924829?text=Quero%20um%20or%C3%A7amento%20para%20cria%C3%A7%C3%A3o%20de%20site." target="_blank" class="text-blue-600 hover:text-blue-700 text-sm font-semibold inline-flex items-center gap-1">
              Solicitar orçamento <i class="fas fa-arrow-right text-xs"></i>
            </a>
          </div>

          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-lg hover:-translate-y-1 transition-all">
            <div class="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
              <i class="fas fa-bullhorn text-green-600 text-xl"></i>
            </div>
            <h4 class="font-bold text-gray-900 mb-2">Marketing Digital</h4>
            <p class="text-sm text-gray-600 mb-4">Redes sociais, Google Ads, Meta Ads. ROI comprovado. A partir de R$ 500/mês.</p>
            <a href="https://wa.me/5541996924829?text=Quero%20saber%20sobre%20marketing%20digital." target="_blank" class="text-green-600 hover:text-green-700 text-sm font-semibold inline-flex items-center gap-1">
              Ver planos <i class="fas fa-arrow-right text-xs"></i>
            </a>
          </div>

          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-lg hover:-translate-y-1 transition-all">
            <div class="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
              <i class="fas fa-robot text-purple-600 text-xl"></i>
            </div>
            <h4 class="font-bold text-gray-900 mb-2">Automação com IA</h4>
            <p class="text-sm text-gray-600 mb-4">Chatbots GPT, atendimento 24h, automação WhatsApp e fluxos inteligentes.</p>
            <a href="https://wa.me/5541996924829?text=Quero%20automatizar%20com%20IA." target="_blank" class="text-purple-600 hover:text-purple-700 text-sm font-semibold inline-flex items-center gap-1">
              Automatizar agora <i class="fas fa-arrow-right text-xs"></i>
            </a>
          </div>

          <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-lg hover:-translate-y-1 transition-all">
            <div class="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
              <i class="fas fa-code text-orange-600 text-xl"></i>
            </div>
            <h4 class="font-bold text-gray-900 mb-2">Sistemas Web</h4>
            <p class="text-sm text-gray-600 mb-4">CRM, ERP, plataformas SaaS e sistemas sob medida para seu negócio.</p>
            <a href="https://wa.me/5541996924829?text=Quero%20um%20sistema%20web%20sob%20medida." target="_blank" class="text-orange-600 hover:text-orange-700 text-sm font-semibold inline-flex items-center gap-1">
              Saber mais <i class="fas fa-arrow-right text-xs"></i>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="bg-gradient-to-br from-[#0a1628] via-[#111d3a] to-[#162044] py-14">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 class="text-2xl md:text-3xl font-bold mb-3">
          Transforme seu negócio com soluções digitais
        </h2>
        <p class="text-blue-200 mb-8">
          A 3W Online é especialista em marketing digital, desenvolvimento web e automação com IA em Curitiba. Mais de 5 anos e 150+ projetos entregues.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a
            href="https://wa.me/5541996924829?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20gratuito."
            target="_blank"
            class="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors shadow-lg"
          >
            <i class="fab fa-whatsapp text-xl"></i>
            Orçamento Gratuito
          </a>
          <RouterLink
            to="/servicos"
            class="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3.5 rounded-lg transition-colors border border-white/20"
          >
            <i class="fas fa-list-check"></i>
            Conheça nossos serviços
          </RouterLink>
        </div>
        <p class="text-blue-300 text-sm mt-6">
          <i class="fas fa-phone-alt mr-1"></i> (41) 99692-4829 &nbsp;|&nbsp;
          <i class="fas fa-envelope mr-1"></i> contato@3wonline.com.br
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useToolsStore } from '@/stores/tools'
import ToolCard from '@/components/tools/common/ToolCard.vue'

const store = useToolsStore()

const searchQuery = ref('')
const selectedCategory = ref('all')
const currentPromo = ref(0)
let promoInterval: ReturnType<typeof setInterval> | null = null

const promos = [
  { icon: 'fa-star', text: '🎁 Sites profissionais a partir de R$ 997', cta: 'SAIBA MAIS', link: 'https://wa.me/5541996924829?text=Quero%20criar%20um%20site%20profissional.' },
  { icon: 'fa-rocket', text: '🚀 Gestão de Marketing + Anúncios por R$ 500/mês', cta: 'EU QUERO!', link: 'https://wa.me/5541996924829?text=Quero%20saber%20sobre%20marketing%20digital.' },
  { icon: 'fa-robot', text: '🤖 Automação WhatsApp com IA — Atendimento 24h', cta: 'VER MAIS', link: 'https://wa.me/5541996924829?text=Quero%20automação%20WhatsApp%20com%20IA.' },
  { icon: 'fa-gift', text: '⭐ Indique amigos e ganhe créditos nos nossos serviços!', cta: 'INDICAR', link: 'https://wa.me/5541996924829?text=Quero%20participar%20do%20Indique%20e%20Ganhe.' },
]

const categoryButtons = [
  { id: 'all', name: 'Todas', icon: 'fa-th-large' },
  { id: 'calculadoras', name: 'Calculadoras', icon: 'fa-calculator' },
  { id: 'geradores', name: 'Geradores', icon: 'fa-wand-magic-sparkles' },
  { id: 'conversores', name: 'Conversores', icon: 'fa-arrows-rotate' },
  { id: 'validadores', name: 'Validadores', icon: 'fa-check-circle' },
  { id: 'simuladores', name: 'Simuladores', icon: 'fa-chart-line' },
  { id: 'texto', name: 'Texto', icon: 'fa-text-height' },
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
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
