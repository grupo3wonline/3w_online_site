<template>
  <div class="tool-wrapper">
    <!-- Breadcrumb -->
    <div class="bg-gradient-to-r from-[#0a1628] to-[#162044] py-4">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex items-center text-sm text-blue-300" aria-label="Breadcrumb">
          <RouterLink to="/" class="hover:text-white transition-colors">
            <i class="fas fa-home"></i>
          </RouterLink>
          <i class="fas fa-chevron-right text-xs mx-2 text-blue-500"></i>
          <RouterLink to="/ferramentas" class="hover:text-white transition-colors">
            Ferramentas
          </RouterLink>
          <i class="fas fa-chevron-right text-xs mx-2 text-blue-500"></i>
          <span class="text-white font-medium truncate max-w-[200px] sm:max-w-none">{{ toolName }}</span>
        </nav>
      </div>
    </div>

    <!-- Promo Carousel Banner -->
    <div class="bg-gradient-to-r from-accent-500 to-accent-600 py-2.5 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-center gap-3 text-white text-sm">
          <button @click="prevPromo" class="p-1 hover:bg-white/20 rounded-full transition-colors flex-shrink-0" aria-label="Anterior">
            <i class="fas fa-chevron-left text-xs"></i>
          </button>
          <transition name="fade" mode="out-in">
            <div :key="currentPromo" class="flex items-center gap-2 min-w-0">
              <span class="font-medium truncate">{{ promos[currentPromo].text }}</span>
              <a
                :href="promos[currentPromo].link"
                target="_blank"
                class="bg-white text-accent-700 px-3 py-0.5 rounded-full text-xs font-bold hover:bg-gray-100 transition-colors whitespace-nowrap flex-shrink-0"
              >
                {{ promos[currentPromo].cta }}
              </a>
            </div>
          </transition>
          <button @click="nextPromo" class="p-1 hover:bg-white/20 rounded-full transition-colors flex-shrink-0" aria-label="Próximo">
            <i class="fas fa-chevron-right text-xs"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Conteúdo da Ferramenta -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RouterView />
    </div>

    <!-- CTA Meio: Mais ferramentas -->
    <section class="bg-gray-50 border-y border-gray-200 py-10">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-3">
          <i class="fas fa-tools text-primary-500 mr-2"></i>
          Gostou? Temos mais de 120 ferramentas gratuitas!
        </h2>
        <p class="text-gray-600 mb-6">
          Calculadoras, geradores, conversores, validadores e simuladores — tudo gratuito e 100% online.
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <RouterLink
            to="/ferramentas"
            class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            <i class="fas fa-th-large"></i>
            Ver todas as ferramentas
          </RouterLink>
          <a
            href="https://wa.me/5541996924829?text=Ol%C3%A1!%20Vi%20as%20ferramentas%20e%20quero%20saber%20mais%20sobre%20os%20servi%C3%A7os."
            target="_blank"
            class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            <i class="fab fa-whatsapp"></i>
            Falar com especialista
          </a>
        </div>
      </div>
    </section>

    <!-- Serviços Relacionados -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 class="text-xl font-bold text-gray-900 mb-6 text-center">
          Potencialize seus resultados com a 3W Online
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <a v-for="service in services" :key="service.title" :href="service.link" target="_blank" class="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-lg hover:-translate-y-1 transition-all group">
            <div :class="['w-10 h-10 rounded-lg flex items-center justify-center mb-3', service.bgColor]">
              <i :class="['fas', service.icon, service.iconColor, 'text-lg']"></i>
            </div>
            <h4 class="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">{{ service.title }}</h4>
            <p class="text-xs text-gray-600">{{ service.description }}</p>
          </a>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="bg-gradient-to-br from-[#0a1628] via-[#111d3a] to-[#162044] py-12">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 class="text-2xl font-bold mb-3">
          Transforme seu negócio com soluções digitais
        </h2>
        <p class="text-blue-200 mb-6 text-sm">
          Marketing digital, desenvolvimento web e automação com IA em Curitiba. 150+ projetos entregues.
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <a
            href="https://wa.me/5541996924829?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20gratuito."
            target="_blank"
            class="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg"
          >
            <i class="fab fa-whatsapp text-lg"></i>
            Orçamento Gratuito
          </a>
          <RouterLink
            to="/servicos"
            class="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg transition-colors border border-white/20"
          >
            <i class="fas fa-list-check"></i>
            Nossos Serviços
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentPromo = ref(0)
let promoInterval: ReturnType<typeof setInterval> | null = null

const toolName = computed(() => {
  return (route.meta.title as string)?.split(' | ')[0] || 'Ferramenta'
})

const promos = [
  { text: '🎁 Sites profissionais a partir de R$ 997', cta: 'SAIBA MAIS', link: 'https://wa.me/5541996924829?text=Quero%20criar%20um%20site%20profissional.' },
  { text: '🚀 Marketing Digital + Anúncios por R$ 500/mês', cta: 'EU QUERO!', link: 'https://wa.me/5541996924829?text=Quero%20marketing%20digital.' },
  { text: '🤖 Automação WhatsApp com IA — Atendimento 24h', cta: 'VER MAIS', link: 'https://wa.me/5541996924829?text=Quero%20automação%20WhatsApp%20com%20IA.' },
  { text: '⭐ Indique amigos e ganhe créditos!', cta: 'INDICAR', link: 'https://wa.me/5541996924829?text=Quero%20participar%20do%20Indique%20e%20Ganhe.' },
]

const services = [
  { title: 'Criação de Sites', description: 'Sites profissionais, responsivos e otimizados para SEO.', icon: 'fa-globe', bgColor: 'bg-blue-50', iconColor: 'text-blue-600', link: 'https://wa.me/5541996924829?text=Quero%20criar%20um%20site.' },
  { title: 'Marketing Digital', description: 'Redes sociais, Google Ads e Meta Ads com ROI comprovado.', icon: 'fa-bullhorn', bgColor: 'bg-green-50', iconColor: 'text-green-600', link: 'https://wa.me/5541996924829?text=Quero%20marketing%20digital.' },
  { title: 'Automação com IA', description: 'Chatbots GPT, automação WhatsApp e atendimento 24h.', icon: 'fa-robot', bgColor: 'bg-purple-50', iconColor: 'text-purple-600', link: 'https://wa.me/5541996924829?text=Quero%20automação%20com%20IA.' },
  { title: 'Sistemas Web', description: 'CRM, ERP, SaaS e sistemas sob medida.', icon: 'fa-code', bgColor: 'bg-orange-50', iconColor: 'text-orange-600', link: 'https://wa.me/5541996924829?text=Quero%20um%20sistema%20web.' },
]

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
