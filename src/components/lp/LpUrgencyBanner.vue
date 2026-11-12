<!--
  LpUrgencyBanner.vue — Barra de urgência/escassez para landing pages.

  Exibe no topo da página:
  - Countdown até o final do mês (urgência temporal)
  - Indicador de vagas restantes com progress bar (escassez)
  - CTA de alto contraste
  - Fecha via sessionStorage (não reaparece na mesma sessão)
-->
<template>
  <Transition name="slide-banner">
    <div
      v-if="visible"
      class="relative bg-gradient-to-r from-rose-600 via-red-600 to-orange-600 text-white py-2.5 px-4 print:hidden"
      role="alert"
      aria-label="Oferta por tempo limitado"
    >
      <div class="container flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">

        <!-- Lado esquerdo: countdown + slots -->
        <div class="flex flex-wrap items-center justify-center sm:justify-start gap-3">
          <!-- Slots restantes -->
          <div class="flex items-center gap-2">
            <i class="fas fa-fire text-yellow-300 text-sm animate-pulse" aria-hidden="true"></i>
            <span class="text-xs font-black uppercase tracking-wide">
              Apenas <strong class="text-yellow-300 text-sm">{{ slotsLeft }}</strong> vagas neste mês
            </span>
          </div>

          <!-- Separador -->
          <span class="hidden sm:inline text-red-300">•</span>

          <!-- Progress bar de vagas -->
          <div class="flex items-center gap-1.5">
            <div class="flex gap-0.5">
              <div
                v-for="i in totalSlots"
                :key="i"
                :class="[
                  'w-3 h-3 rounded-sm transition-colors',
                  i <= takenSlots ? 'bg-red-900/70' : 'bg-yellow-300',
                ]"
                :title="i <= takenSlots ? 'Vaga ocupada' : 'Vaga disponível'"
              ></div>
            </div>
            <span class="text-[10px] text-red-100 font-semibold">
              {{ takenSlots }}/{{ totalSlots }} ocupadas
            </span>
          </div>

          <!-- Countdown -->
          <div v-if="timeLeft.total > 0" class="flex items-center gap-1.5">
            <span class="hidden sm:inline text-red-300">•</span>
            <i class="fas fa-clock text-yellow-300 text-xs" aria-hidden="true"></i>
            <span class="text-[11px] font-semibold">
              Encerra em:
              <strong class="font-black text-yellow-300 font-mono">
                {{ pad(timeLeft.days) }}d {{ pad(timeLeft.hours) }}h {{ pad(timeLeft.minutes) }}m {{ pad(timeLeft.seconds) }}s
              </strong>
            </span>
          </div>
        </div>

        <!-- CTA -->
        <a
          :href="ctaUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="shrink-0 bg-white text-red-700 hover:bg-yellow-50 text-xs font-black px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md whitespace-nowrap"
          :aria-label="ctaLabel"
          @click="trackClick"
        >
          {{ ctaLabel }} →
        </a>

        <!-- Close button -->
        <button
          class="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-red-200 hover:text-white transition-colors rounded"
          aria-label="Fechar banner de urgência"
          @click="close"
        >
          <i class="fas fa-times text-xs" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  totalSlots?: number
  takenSlots?: number
  ctaLabel?:   string
  ctaUrl?:     string
  storageKey?: string
}>(), {
  totalSlots: 5,
  takenSlots: 3,
  ctaLabel:   'Garantir Minha Vaga',
  ctaUrl:     'https://wa.me/5541996924829?text=Olá! Vi que ainda há vagas disponíveis e gostaria de garantir a minha.',
  storageKey: 'lp_urgency_banner',
})

const slotsLeft = computed(() => props.totalSlots - props.takenSlots)

// ── Visibilidade ──────────────────────────────────────────────────
const visible = ref(false)

function close() {
  visible.value = false
  try {
    sessionStorage.setItem(props.storageKey, '1')
  } catch { /* ignore */ }
}

// ── Countdown até o final do mês ─────────────────────────────────
const timeLeft = ref({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 1 })
let timer: ReturnType<typeof setInterval> | null = null

function calcTime() {
  const now = new Date()
  // Próximo dia 1 do mês seguinte às 00:00
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0)
  const diff = end.getTime() - now.getTime()

  if (diff <= 0) {
    timeLeft.value = { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }
    return
  }

  timeLeft.value = {
    total:   diff,
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const pad = (n: number) => String(n).padStart(2, '0')

// ── Analytics ─────────────────────────────────────────────────────
function trackClick() {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({ event: 'lp_urgency_banner_cta_click', cta_label: props.ctaLabel })
  }
}

onMounted(() => {
  // Não exibe se já foi fechado nesta sessão
  try {
    if (sessionStorage.getItem(props.storageKey)) return
  } catch { /* ignore */ }

  visible.value = true
  calcTime()
  timer = setInterval(calcTime, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.slide-banner-enter-active,
.slide-banner-leave-active {
  transition: max-height 0.3s ease, opacity 0.2s ease;
  overflow: hidden;
}
.slide-banner-enter-from,
.slide-banner-leave-to {
  max-height: 0;
  opacity: 0;
}
.slide-banner-enter-to,
.slide-banner-leave-from {
  max-height: 80px;
  opacity: 1;
}
</style>
