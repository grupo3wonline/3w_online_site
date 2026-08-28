<template>
  <div class="tool-wrapper min-h-screen flex flex-col bg-slate-50/50">
    <!-- Breadcrumb & Top Bar — Dark Navy -->
    <div class="bg-gradient-to-r from-[#0a1628] via-[#111d3a] to-[#162044] py-3.5 border-b border-white/10 text-white">
      <div class="container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
        <nav class="flex items-center text-xs text-blue-300 gap-1.5 flex-wrap" aria-label="Breadcrumb">
          <RouterLink to="/" class="hover:text-white transition-colors flex items-center gap-1">
            <Icon icon="mdi:home" class="w-3.5 h-3.5" />
            <span>Início</span>
          </RouterLink>
          <Icon icon="mdi:chevron-right" class="w-3.5 h-3.5 text-blue-400/60" />
          <RouterLink to="/ferramentas" class="hover:text-white transition-colors">
            Ferramentas Digitais
          </RouterLink>
          <Icon icon="mdi:chevron-right" class="w-3.5 h-3.5 text-blue-400/60" />
          <span class="text-white font-semibold truncate max-w-[200px] sm:max-w-none">{{ toolName }}</span>
        </nav>

        <!-- Ações Rápidas: Copiar Link & WhatsApp -->
        <div class="flex items-center gap-2 text-xs">
          <button
            @click="copyToolLink"
            class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-blue-200 hover:text-white transition-colors text-[11px]"
            title="Copiar link desta ferramenta"
          >
            <Icon :icon="copied ? 'mdi:check' : 'mdi:content-copy'" class="w-3.5 h-3.5" :class="copied ? 'text-green-400' : ''" />
            <span>{{ copied ? 'Copiado!' : 'Copiar Link' }}</span>
          </button>
          <a
            :href="whatsappShareUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-green-500/20 hover:bg-green-500/30 text-green-300 hover:text-green-200 transition-colors text-[11px]"
            title="Compartilhar no WhatsApp"
          >
            <Icon icon="mdi:whatsapp" class="w-3.5 h-3.5" />
            <span>Compartilhar</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Promo Carousel Banner -->
    <div class="bg-gradient-to-r from-accent-500 to-accent-600 py-2 text-white overflow-hidden shadow-sm">
      <div class="container">
        <div class="flex items-center justify-center gap-3 text-xs sm:text-sm">
          <button @click="prevPromo" class="p-1 hover:bg-white/20 rounded-full transition-colors shrink-0" aria-label="Promoção anterior">
            <Icon icon="mdi:chevron-left" class="w-4 h-4" />
          </button>
          <Transition name="fade" mode="out-in">
            <div :key="currentPromo" class="flex items-center gap-2 min-w-0">
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

    <!-- Selo de Privacidade & Execução Local -->
    <div class="bg-emerald-50/70 border-b border-emerald-100 py-2">
      <div class="container flex items-center justify-center gap-2 text-[11px] sm:text-xs text-emerald-800 text-center font-medium">
        <Icon icon="mdi:shield-check" class="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>100% Seguro & Client-Side:</strong> Seus dados e cálculos são processados localmente no seu navegador. Zero envio para servidores.</span>
      </div>
    </div>

    <!-- Conteúdo da Ferramenta Específica -->
    <main class="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RouterView />
    </main>

    <!-- Ferramentas Relacionadas da Mesma Categoria -->
    <section v-if="relatedTools.length > 0" class="bg-white border-t border-gray-200/80 py-10">
      <div class="container max-w-5xl">
        <div class="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
          <div>
            <span class="section-label">Utilidades Semelhantes</span>
            <h3 class="text-base sm:text-lg font-bold text-gray-900">
              Outras Ferramentas Recomendadas
            </h3>
          </div>
          <RouterLink to="/ferramentas" class="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
            <span>Ver Catálogo Completo (120+)</span>
            <Icon icon="mdi:arrow-right" class="w-3.5 h-3.5" />
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <RouterLink
            v-for="rel in relatedTools"
            :key="rel.id"
            :to="rel.path"
            class="p-4 rounded-xl border border-gray-100 bg-slate-50 hover:bg-white hover:border-primary-200 hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div class="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                <i :class="['fas', rel.icon, 'text-sm']"></i>
              </div>
              <h4 class="text-xs font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-1 line-clamp-1">
                {{ rel.name }}
              </h4>
              <p class="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                {{ rel.description }}
              </p>
            </div>
            <div class="mt-3 pt-2 border-t border-gray-200/50 flex items-center justify-between text-[10px] text-primary-600 font-semibold">
              <span>Acessar</span>
              <Icon icon="mdi:chevron-right" class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Serviços Relacionados da 3W Online -->
    <section class="py-12 bg-slate-50 border-t border-gray-200/60">
      <div class="container max-w-5xl">
        <div class="text-center mb-8">
          <span class="section-label">Soluções Corporativas</span>
          <h3 class="text-lg sm:text-xl font-bold text-gray-900">
            Precisa de uma Solução Sob Medida para Sua Empresa?
          </h3>
          <p class="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto mt-1">
            Além das nossas ferramentas gratuitas, desenvolvemos tecnologia personalizada para acelerar o seu negócio.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <RouterLink
            v-for="service in services"
            :key="service.title"
            :to="service.path"
            class="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-primary-200 hover:-translate-y-0.5 transition-all group"
          >
            <div :class="['w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-105', service.bgColor]">
              <Icon :icon="service.icon" :class="['text-xl', service.iconColor]" />
            </div>
            <h4 class="font-bold text-gray-900 text-sm mb-1 group-hover:text-primary-600 transition-colors">{{ service.title }}</h4>
            <p class="text-xs text-gray-500 leading-relaxed">{{ service.description }}</p>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Final CTA — Dark Navy -->
    <section class="bg-gradient-to-br from-[#0a1628] via-[#111d3a] to-[#162044] py-10 text-white">
      <div class="container max-w-3xl text-center">
        <h2 class="text-xl sm:text-2xl font-bold mb-2">
          Transforme Seu Negócio com Soluções Digitais & IA
        </h2>
        <p class="text-blue-200 mb-6 text-xs sm:text-sm max-w-xl mx-auto">
          Marketing digital, desenvolvimento web, sistemas sob medida e automação com IA em Curitiba e todo o Brasil.
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <a
            href="https://wa.me/5541996924829?text=Olá! Gostaria de um orçamento gratuito pelo site."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary text-xs font-bold !py-2.5 !px-5 shadow-lg"
          >
            <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-1.5" />
            Orçamento no WhatsApp
          </a>
          <RouterLink
            to="/servicos"
            class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-xs font-semibold !py-2.5 !px-5"
          >
            <Icon icon="mdi:briefcase-outline" class="w-4 h-4 mr-1.5" />
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
import { Icon } from '@iconify/vue'
import { useToolsStore } from '@/stores/tools'

const route = useRoute()
const toolsStore = useToolsStore()

const currentPromo = ref(0)
const copied = ref(false)
let promoInterval: ReturnType<typeof setInterval> | null = null

const toolName = computed(() => {
  return (route.meta.title as string)?.split(' | ')[0] || 'Ferramenta Digital'
})

const currentTool = computed(() => {
  return toolsStore.tools.find((t) => t.path === route.path)
})

const relatedTools = computed(() => {
  if (!currentTool.value) {
    return toolsStore.tools.slice(0, 4)
  }
  return toolsStore.tools
    .filter((t) => t.category === currentTool.value?.category && t.id !== currentTool.value?.id)
    .slice(0, 4)
})

const whatsappShareUrl = computed(() => {
  const url = typeof window !== 'undefined' ? window.location.href : 'https://www.3wonline.com.br' + route.path
  const text = `Confira esta ferramenta gratuita: ${toolName.value} da 3W Online! Acesse: ${url}`
  return `https://wa.me/?text=${encodeURIComponent(text)}`
})

const copyToolLink = async () => {
  try {
    const url = window.location.href
    await navigator.clipboard.writeText(url)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    // fallback
  }
}

const promos = [
  { text: '🎁 Sites profissionais a partir de R$ 997', cta: 'SAIBA MAIS', link: 'https://wa.me/5541996924829?text=Quero%20criar%20um%20site%20profissional.' },
  { text: '🚀 Marketing Digital + Anúncios por R$ 500/mês', cta: 'EU QUERO!', link: 'https://wa.me/5541996924829?text=Quero%20marketing%20digital.' },
  { text: '🤖 Automação WhatsApp com IA — Atendimento 24h', cta: 'VER MAIS', link: 'https://wa.me/5541996924829?text=Quero%20automação%20WhatsApp%20com%20IA.' },
  { text: '⭐ Indique amigos e ganhe créditos em serviços!', cta: 'INDICAR', link: 'https://wa.me/5541996924829?text=Quero%20participar%20do%20Indique%20e%20Ganhe.' },
]

const services = [
  { title: 'Criação de Sites', description: 'Sites modernos, responsivos e otimizados para o Google.', icon: 'mdi:web', bgColor: 'bg-blue-50', iconColor: 'text-blue-600', path: '/servicos/criacao-sites' },
  { title: 'Marketing Digital', description: 'Redes sociais e campanhas de anúncios com ROI comprovado.', icon: 'mdi:chart-line', bgColor: 'bg-green-50', iconColor: 'text-green-600', path: '/servicos/marketing-digital' },
  { title: 'Automação com IA', description: 'Chatbots inteligentes, automação WhatsApp e fluxos 24h.', icon: 'mdi:robot', bgColor: 'bg-purple-50', iconColor: 'text-purple-600', path: '/servicos/automacao-ia' },
  { title: 'Sistemas Web', description: 'Plataformas customizadas, CRMs e ERPs sob medida.', icon: 'mdi:application-cog-outline', bgColor: 'bg-orange-50', iconColor: 'text-orange-600', path: '/servicos/criacao-sistemas' },
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
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
