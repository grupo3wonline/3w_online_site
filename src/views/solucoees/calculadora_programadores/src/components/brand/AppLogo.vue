<script setup lang="ts">
/**
 * Logo da marca "CalcProgramadores": marca gráfica (calculadora + código)
 * combinada com o wordmark. O símbolo é um SVG próprio e escalável.
 */
withDefaults(
  defineProps<{
    withWordmark?: boolean;
    size?: number;
  }>(),
  { withWordmark: true, size: 36 }
);
</script>

<template>
  <span class="inline-flex items-center gap-2.5">
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="CalcProgramadores"
      class="shrink-0"
    >
      <defs>
        <linearGradient
          id="logo-grad"
          x1="4"
          y1="4"
          x2="44"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="hsl(263 90% 66%)" />
          <stop
            offset="1"
            stop-color="hsl(199 89% 55%)"
          />
        </linearGradient>
      </defs>
      <rect
        x="3"
        y="3"
        width="42"
        height="42"
        rx="12"
        fill="url(#logo-grad)"
      />
      <!-- Simbolo de codigo -->
      <path
        d="M19 17l-6 7 6 7"
        stroke="white"
        stroke-width="2.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M29 17l6 7-6 7"
        stroke="white"
        stroke-width="2.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <!-- Divisor central -->
      <path
        d="M26 15l-4 18"
        stroke="white"
        stroke-width="2.6"
        stroke-linecap="round"
        opacity="0.85"
      />
    </svg>

    <span
      v-if="withWordmark"
      class="text-lg font-extrabold tracking-tight text-foreground"
    >
      Calc<span class="text-gradient">Programadores</span>
    </span>
  </span>
</template>
