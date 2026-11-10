<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const features = [
  { icon: 'ph:target-bold', key: 'accurate' },
  { icon: 'ph:cursor-click-bold', key: 'intuitive' },
  { icon: 'ph:lightning-bold', key: 'instant' },
  { icon: 'ph:gift-bold', key: 'free' },
  { icon: 'ph:clipboard-text-bold', key: 'export' },
  { icon: 'ph:question-bold', key: 'help' },
]
</script>

<template>
  <section id="funcionalidades" class="section scroll-mt-24 bg-white dark:bg-gray-900">
    <div class="mx-auto max-w-7xl">
      <div class="text-center">
        <span
          class="badge bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-300"
        >
          <Icon icon="ph:stack-bold" class="h-4 w-4" aria-hidden="true" />
          {{ t('nav.features') }}
        </span>
        <h2 class="section-title mt-4">{{ t('features.title') }}</h2>
        <p class="section-subtitle">{{ t('features.subtitle') }}</p>
      </div>

      <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="feature in features"
          :key="feature.key"
          v-motion-slide-bottom
          class="card card-hover group relative overflow-hidden p-6"
        >
          <div
            class="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary-500/5 transition-transform group-hover:scale-150"
            aria-hidden="true"
          ></div>
          <span
            class="relative flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-700 transition-colors group-hover:bg-primary-600 group-hover:text-white dark:bg-primary-900/40 dark:text-primary-300"
          >
            <Icon :icon="feature.icon" class="h-6 w-6" aria-hidden="true" />
          </span>
          <h3
            class="relative mt-5 font-display text-lg font-semibold text-gray-900 dark:text-white"
          >
            {{ t(`features.items.${feature.key}.title`) }}
          </h3>
          <p class="relative mt-2 text-sm text-gray-600 dark:text-gray-400">
            {{ t(`features.items.${feature.key}.desc`) }}
          </p>
        </div>
      </div>

      <!-- CTA -->
      <div
        class="relative mt-14 overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-600 to-accent-600 p-10 text-center text-white shadow-glow-lg"
      >
        <div class="absolute inset-0 bg-grid opacity-20" aria-hidden="true"></div>
        <div class="relative">
          <h3 class="font-display text-2xl font-bold sm:text-3xl">{{ t('features.ctaTitle') }}</h3>
          <p class="mx-auto mt-3 max-w-xl text-primary-50">{{ t('features.ctaDesc') }}</p>
          <RouterLink
            to="/calculadora"
            class="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-primary-700 shadow-lg transition-transform hover:scale-105"
          >
            <Icon icon="ph:calculator-bold" class="h-5 w-5" aria-hidden="true" />
            {{ t('common.testCalc') }}
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
