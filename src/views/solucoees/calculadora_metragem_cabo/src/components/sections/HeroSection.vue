<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const trust = [
  { icon: 'ph:gift-bold', label: 'common.free' },
  { icon: 'ph:target-bold', label: 'common.accurate' },
  { icon: 'ph:device-mobile-bold', label: 'common.responsive' },
]
</script>

<template>
  <section class="relative overflow-hidden bg-gray-950 text-white">
    <!-- Fundo decorativo -->
    <div class="absolute inset-0 bg-grid opacity-40" aria-hidden="true"></div>
    <div
      class="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-primary-600/30 blur-3xl"
      aria-hidden="true"
    ></div>
    <div
      class="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-accent-600/20 blur-3xl"
      aria-hidden="true"
    ></div>

    <div class="relative mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-6 md:pb-32 md:pt-40 lg:px-8">
      <div class="mx-auto max-w-3xl text-center">
        <span
          v-motion-fade
          class="badge border border-primary-400/30 bg-primary-500/10 text-primary-300 backdrop-blur"
        >
          <Icon icon="ph:seal-check-bold" class="h-4 w-4" aria-hidden="true" />
          {{ t('hero.badge') }}
        </span>

        <h1
          v-motion-slide-bottom
          class="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Calculadora de
          <span class="text-gradient">Metragem de Cabos</span>
        </h1>

        <p class="mx-auto mt-6 max-w-2xl text-lg text-gray-300 sm:text-xl">
          {{ t('hero.subtitle') }}
        </p>

        <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <RouterLink to="/calculadora" class="btn-primary w-full !px-8 !py-4 !text-base sm:w-auto">
            <Icon icon="ph:calculator-bold" class="h-5 w-5" aria-hidden="true" />
            {{ t('common.startCalc') }}
          </RouterLink>
          <a
            href="#funcionalidades"
            class="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold backdrop-blur transition-colors hover:bg-white/10 sm:w-auto"
          >
            {{ t('hero.viewFeatures') }}
            <Icon icon="ph:arrow-down-bold" class="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <ul
          class="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-300"
        >
          <li v-for="item in trust" :key="item.label" class="flex items-center gap-2">
            <Icon :icon="item.icon" class="h-5 w-5 text-primary-400" aria-hidden="true" />
            {{ t(item.label) }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Onda de transição -->
    <div class="relative">
      <svg
        class="block w-full text-gray-50 dark:text-gray-950"
        viewBox="0 0 1440 80"
        fill="none"
        preserveAspectRatio="none"
      >
        <path d="M0 80V32C240 64 480 80 720 72 960 64 1200 24 1440 8V80H0Z" fill="currentColor" />
      </svg>
    </div>
  </section>
</template>
