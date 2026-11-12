<!--
  LpStickyBar.vue — Barra sticky de CTA que aparece quando o usuário
  rola além do hero (100vh) e desaparece quando chega ao final da página.

  Exibe: texto de urgência + botão WhatsApp + indicador de vagas.
-->
<template>
  <Transition name="sticky-slide">
    <div
      v-if="isVisible"
      class="fixed bottom-0 left-0 right-0 z-[998] bg-[#0f172a] border-t-2 border-primary-500 shadow-2xl print:hidden"
      role="complementary"
      aria-label="Oferta rápida"
    >
      <div class="container py-2.5">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-2.5">

          <!-- Texto de urgência -->
          <div class="flex items-center gap-2 text-white">
            <i class="fas fa-bolt text-yellow-400 text-sm animate-pulse" aria-hidden="true"></i>
            <div class="text-xs sm:text-sm">
              <span class="font-black text-white">{{ title }}</span>
              <span v-if="subtitle" class="hidden sm:inline text-blue-300"> — {{ subtitle }}</span>
            </div>
          </div>

          <!-- CTAs -->
          <div class="flex items-center gap-2 shrink-0">
            <span v-if="slotsText" class="hidden md:inline-flex items-center gap-1 text-[10px] font-bold text-rose-300 bg-rose-500/15 px-2.5 py-1 rounded-full border border-rose-500/30">
              <i class="fas fa-fire text-[9px]" aria-hidden="true"></i>
              {{ slotsText }}
            </span>

            <a
              :href="ctaUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-green-600 hover:bg-green-500 text-white text-xs font-black px-4 py-2.5 rounded-lg transition-all shadow-md hover:shadow-green-500/30 flex items-center gap-1.5 whitespace-nowrap"
              :aria-label="ctaLabel"
              @click="trackClick"
            >
              <i class="fab fa-whatsapp text-sm" aria-hidden="true"></i>
              {{ ctaLabel }}
            </a>

            <button
              class="p-1.5 text-slate-400 hover:text-white transition-colors rounded"
              aria-label="Fechar barra de CTA"
              @click="dismiss"
            >
              <i class="fas fa-times text-xs" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  title?:      string
  subtitle?:   string
  slotsText?:  string
  ctaLabel?:   string
  ctaUrl?:     string
  threshold?:  number  // px de scroll para aparecer (default: 600)
}>(), {
  title:     'Garantia de 30 dias — sem fidelidade forçada',
  subtitle:  'Vagas limitadas este mês',
  slotsText: '2 vagas restantes',
  ctaLabel:  'Falar no WhatsApp',
  ctaUrl:    'https://wa.me/5541996924829?text=Olá! Vi a oferta e gostaria de mais informações.',
  threshold: 600,
})

const isVisible  = ref(false)
const dismissed  = ref(false)

function checkScroll() {
  if (dismissed.value) return
  const scrollY      = window.scrollY
  const docHeight    = document.documentElement.scrollHeight
  const windowHeight = window.innerHeight
  const nearBottom   = scrollY + windowHeight >= docHeight - 200

  isVisible.value = scrollY > props.threshold && !nearBottom
}

function dismiss() {
  dismissed.value = false   // allow re-showing if user scrolls up and back
  isVisible.value = false
  // Hide for a while
  dismissed.value = true
  setTimeout(() => { dismissed.value = false }, 60_000)
}

function trackClick() {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({ event: 'lp_sticky_bar_click', cta_label: props.ctaLabel })
  }
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll, { passive: true })
  checkScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<style scoped>
.sticky-slide-enter-active,
.sticky-slide-leave-active {
  transition: transform 0.3s ease, opacity 0.25s ease;
}
.sticky-slide-enter-from,
.sticky-slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
