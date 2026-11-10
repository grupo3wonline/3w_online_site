<script setup lang="ts">
/**
 * Logotipo da marca "Orçamento Social Mídia".
 * SVG próprio (mark) + wordmark, com variação de tamanho e cor.
 */
withDefaults(
  defineProps<{
    size?: number
    variant?: 'light' | 'dark'
    showWordmark?: boolean
  }>(),
  { size: 40, variant: 'light', showWordmark: true },
)
</script>

<template>
  <span class="inline-flex items-center gap-3">
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Logotipo Orçamento Social Mídia"
      class="shrink-0"
    >
      <defs>
        <linearGradient id="osm-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stop-color="#a855f7" />
          <stop offset="0.5" stop-color="#7c3aed" />
          <stop offset="1" stop-color="#4f46e5" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="13" fill="url(#osm-grad)" />
      <rect
        x="2.75"
        y="2.75"
        width="42.5"
        height="42.5"
        rx="12.25"
        stroke="white"
        stroke-opacity="0.18"
        stroke-width="1.5"
      />
      <!-- Símbolo: "moeda + gráfico" representando orçamento -->
      <path
        d="M15 30.5 L21 24 L26 28.5 L33 19"
        stroke="white"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="33" cy="19" r="2.6" fill="#fde047" />
      <path
        d="M16 34.5 h16"
        stroke="white"
        stroke-opacity="0.55"
        stroke-width="2.4"
        stroke-linecap="round"
      />
    </svg>
    <span v-if="showWordmark" class="leading-tight">
      <span
        class="block text-sm font-extrabold tracking-tight"
        :class="variant === 'light' ? 'text-white' : 'text-foreground'"
      >
        Orçamento <span class="text-gradient">Social Mídia</span>
      </span>
      <span
        class="block text-[10px] font-medium uppercase tracking-[0.2em]"
        :class="variant === 'light' ? 'text-purple-300' : 'text-muted-foreground'"
      >
        Calculadora profissional
      </span>
    </span>
  </span>
</template>
