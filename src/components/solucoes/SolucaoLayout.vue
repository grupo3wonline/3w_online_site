<template>
  <div class="solucao-layout min-h-screen flex flex-col bg-slate-50/50">
    <!-- Breadcrumb & Top Bar — Dark Navy -->
    <div class="bg-gradient-to-r from-[#0a1628] via-[#111d3a] to-[#162044] py-3.5 border-b border-white/10 text-white">
      <div class="container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
        <nav class="flex items-center text-xs text-blue-300 gap-1.5 flex-wrap" aria-label="Breadcrumb">
          <RouterLink to="/" class="hover:text-white transition-colors flex items-center gap-1">
            <Icon icon="mdi:home" class="w-3.5 h-3.5" />
            <span>Início</span>
          </RouterLink>
          <Icon icon="mdi:chevron-right" class="w-3.5 h-3.5 text-blue-400/60" />
          <RouterLink to="/solucoes" class="hover:text-white transition-colors">
            Soluções Digitais
          </RouterLink>
          <Icon icon="mdi:chevron-right" class="w-3.5 h-3.5 text-blue-400/60" />
          <span class="text-white font-semibold truncate max-w-[200px] sm:max-w-none">{{ name }}</span>
        </nav>

        <!-- Ações Rápidas: Copiar Link & WhatsApp -->
        <div class="flex items-center gap-2 text-xs">
          <button
            @click="copyToolLink"
            class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-blue-200 hover:text-white transition-colors text-[11px]"
            title="Copiar link desta solução"
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

    <!-- Conteúdo da Solução -->
    <main class="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  name: string
}>()

const route = useRoute()
const currentPromo = ref(0)
const copied = ref(false)
let promoInterval: ReturnType<typeof setInterval> | null = null

const promos = [
  { text: '🎁 Sites profissionais a partir de R$ 997', cta: 'SAIBA MAIS', link: 'https://wa.me/5541996924829?text=Quero%20criar%20um%20site%20profissional.' },
  { text: '🚀 Marketing Digital + Anúncios por R$ 500/mês', cta: 'EU QUERO!', link: 'https://wa.me/5541996924829?text=Quero%20marketing%20digital.' },
  { text: '🤖 Automação WhatsApp com IA — Atendimento 24h', cta: 'VER MAIS', link: 'https://wa.me/5541996924829?text=Quero%20automação%20WhatsApp%20com%20IA.' },
  { text: '⭐ Indique amigos e ganhe créditos em serviços!', cta: 'INDICAR', link: 'https://wa.me/5541996924829?text=Quero%20participar%20do%20Indique%20e%20Ganhe.' },
]

const whatsappShareUrl = computed(() => {
  const url = typeof window !== 'undefined' ? window.location.href : 'https://www.3wonline.com.br' + route.path
  const text = `Confira esta solução gratuita: ${props.name} da 3W Online! Acesse: ${url}`
  return `https://wa.me/?text=${encodeURIComponent(text)}`
})

const copyToolLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // fallback silencioso
  }
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
