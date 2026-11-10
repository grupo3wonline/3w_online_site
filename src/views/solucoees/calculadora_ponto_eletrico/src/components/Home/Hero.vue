<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { Icon, Button } from '@/components/ui'

const { t } = useI18n()

const stats = computed(() => [
  { value: t('home.hero.stats.norm'), label: t('home.hero.stats.normLabel') },
  { value: t('home.hero.stats.free'), label: t('home.hero.stats.freeLabel') },
  { value: t('home.hero.stats.instant'), label: t('home.hero.stats.instantLabel') },
])
</script>

<template>
  <section
    id="hero"
    class="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-indigo-950 text-white"
    aria-labelledby="hero-title"
  >
    <!-- Padrão de grade + orbs -->
    <div class="pointer-events-none absolute inset-0 bg-grid opacity-60" aria-hidden="true"></div>
    <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        class="absolute -left-24 -top-24 h-72 w-72 animate-float-slow rounded-full bg-primary-500/25 blur-3xl"
      ></div>
      <div
        class="absolute -bottom-32 -right-16 h-96 w-96 animate-float rounded-full bg-[hsl(var(--brand-to)/0.25)] blur-3xl"
      ></div>
      <div
        class="absolute right-1/4 top-10 h-40 w-40 animate-float rounded-full bg-electric/20 blur-2xl"
      ></div>
    </div>

    <div class="container relative z-10 mx-auto px-4 py-24 text-center sm:px-6 sm:py-32">
      <div
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        class="mx-auto max-w-3xl"
      >
        <span
          class="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium shadow-glow-sm"
        >
          <Icon icon="lucide:shield-check" class="h-4 w-4 text-electric" />
          {{ t('home.hero.badge') }}
        </span>

        <h1 id="hero-title" class="mb-4 text-4xl font-black leading-[1.1] sm:text-6xl">
          {{ t('home.hero.title') }}
        </h1>
        <p class="mb-3 text-xl font-semibold text-primary-100 sm:text-2xl">
          {{ t('home.hero.subtitle') }}
        </p>
        <p class="mx-auto mb-10 max-w-2xl text-base text-primary-100/80 sm:text-lg">
          {{ t('home.hero.lead') }}
        </p>

        <div class="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button as-child variant="gradient" size="lg" class="w-full sm:w-auto">
            <RouterLink to="/#calculadora">
              <Icon icon="lucide:calculator" class="h-5 w-5" />
              {{ t('home.hero.ctaPrimary') }}
            </RouterLink>
          </Button>
          <Button
            as="a"
            href="#como-funciona"
            variant="outline"
            size="lg"
            class="w-full border-white/30 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
          >
            <Icon icon="lucide:circle-help" class="h-5 w-5" />
            {{ t('home.hero.ctaSecondary') }}
          </Button>
        </div>

        <!-- Faixa de indicadores -->
        <dl class="mx-auto mt-14 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <dt class="text-2xl font-black text-white sm:text-3xl">{{ stat.value }}</dt>
            <dd class="mt-1 text-xs text-primary-100/70 sm:text-sm">{{ stat.label }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- Onda de transição para a próxima seção -->
    <div class="relative z-10 -mb-px" aria-hidden="true">
      <svg class="block w-full text-background" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path fill="currentColor" d="M0,64 C360,16 1080,16 1440,64 L1440,80 L0,80 Z" />
      </svg>
    </div>
  </section>
</template>
