<!--
  LpMidCta.vue — Interruptor de CTA no meio da landing page.

  Exibe entre seções para capturar leads com alta intenção.
  Inclui: FOMO social, vagas restantes, CTA e garantia.

  Props:
  - headline: texto principal
  - subline: texto secundário
  - ctaLabel: texto do botão
  - ctaUrl: destino do botão
  - slotsLeft: número de vagas restantes
  - theme: 'green' | 'blue' | 'purple' (cor do accent)
-->
<template>
  <section
    class="relative overflow-hidden py-10 print:hidden"
    :class="themeBg"
    aria-label="Oferta especial"
  >
    <!-- Orbs decorativos -->
    <div class="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none" :class="themeOrb"></div>
    <div class="absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-2xl opacity-15 pointer-events-none" :class="themeOrb"></div>

    <div class="container relative z-10">
      <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-10">

        <!-- Conteúdo -->
        <div class="flex-1 text-center md:text-left">
          <!-- FOMO social -->
          <div v-if="showFomo" class="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs text-white mb-3">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            {{ fomoText }}
          </div>

          <h3 class="text-xl sm:text-2xl font-black text-white mb-2 leading-tight">{{ headline }}</h3>
          <p v-if="subline" class="text-sm text-blue-200 leading-relaxed">{{ subline }}</p>

          <!-- Trust items -->
          <div class="flex flex-wrap justify-center md:justify-start gap-3 mt-3 text-xs text-blue-300">
            <span class="flex items-center gap-1">
              <i class="fas fa-shield-halved text-emerald-400 text-xs" aria-hidden="true"></i>
              Garantia 30 dias
            </span>
            <span class="flex items-center gap-1">
              <i class="fas fa-lock-open text-emerald-400 text-xs" aria-hidden="true"></i>
              Sem fidelidade
            </span>
            <span class="flex items-center gap-1">
              <i class="fas fa-clock text-emerald-400 text-xs" aria-hidden="true"></i>
              Resposta em 24h
            </span>
          </div>
        </div>

        <!-- CTA box -->
        <div class="shrink-0 flex flex-col items-center gap-3 w-full md:w-auto">
          <!-- Slots indicator -->
          <div
            v-if="slotsLeft !== undefined"
            class="flex items-center gap-2 bg-rose-500/20 border border-rose-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-rose-200"
          >
            <i class="fas fa-fire text-rose-400 text-xs animate-pulse" aria-hidden="true"></i>
            Apenas <strong class="text-rose-300 mx-0.5">{{ slotsLeft }}</strong> vagas disponíveis
          </div>

          <!-- Primary CTA -->
          <a
            :href="ctaUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary w-full sm:w-auto text-sm !py-4 !px-8 font-black shadow-xl justify-center flex items-center gap-2 transform hover:scale-105 transition-all"
            @click="trackClick"
          >
            <i class="fab fa-whatsapp text-base" aria-hidden="true"></i>
            {{ ctaLabel }}
          </a>

          <!-- Secondary CTA -->
          <a
            v-if="secondaryCtaLabel"
            :href="secondaryCtaUrl"
            class="text-xs text-blue-300 hover:text-white underline underline-offset-2 transition-colors"
          >
            {{ secondaryCtaLabel }}
          </a>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  headline?:           string
  subline?:            string
  ctaLabel?:           string
  ctaUrl?:             string
  secondaryCtaLabel?:  string
  secondaryCtaUrl?:    string
  slotsLeft?:          number
  theme?:              'green' | 'blue' | 'purple' | 'rose'
  showFomo?:           boolean
  fomoText?:           string
}>(), {
  headline:    'Pronto para transformar seu negócio?',
  subline:     'Agende um diagnóstico gratuito agora e descubra o plano ideal para sua empresa.',
  ctaLabel:    'Falar no WhatsApp Agora',
  ctaUrl:      'https://wa.me/5541996924829?text=Olá! Gostaria de um diagnóstico gratuito.',
  theme:       'green',
  showFomo:    true,
  fomoText:    '🟢 3 pessoas solicitaram orçamento nas últimas 2 horas',
})

const themeBg = {
  green:  'bg-gradient-to-br from-[#0a1628] via-[#111d3a] to-[#162044]',
  blue:   'bg-gradient-to-br from-[#0a1628] via-[#0d2255] to-[#162044]',
  purple: 'bg-gradient-to-br from-[#1a0a2e] via-[#2d1058] to-[#1a0a2e]',
  rose:   'bg-gradient-to-br from-[#1a0810] via-[#3b0d1a] to-[#1a0810]',
}[props.theme]

const themeOrb = {
  green:  'bg-emerald-500',
  blue:   'bg-primary-500',
  purple: 'bg-purple-500',
  rose:   'bg-rose-500',
}[props.theme]

function trackClick() {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({ event: 'lp_mid_cta_click', cta_label: props.ctaLabel })
  }
}
</script>
