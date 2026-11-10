<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { COMPANY } from '@/config/site'

const { t } = useI18n()

const features = [
  { icon: 'ph:lightbulb-bold', key: 'innovative' },
  { icon: 'ph:gear-bold', key: 'custom' },
  { icon: 'ph:rocket-launch-bold', key: 'fast' },
]

const badges = ['personalized', 'budget'] as const
</script>

<template>
  <section id="empresa" class="relative overflow-hidden bg-gray-950 py-24 text-white">
    <div class="absolute inset-0 bg-grid opacity-30" aria-hidden="true"></div>
    <div
      class="absolute -right-24 top-0 h-96 w-96 rounded-full bg-accent-600/20 blur-3xl"
      aria-hidden="true"
    ></div>
    <div
      class="absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-primary-600/20 blur-3xl"
      aria-hidden="true"
    ></div>

    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-3xl text-center">
        <span class="badge border border-white/20 bg-white/10 text-white backdrop-blur">
          <Icon icon="ph:buildings-bold" class="h-4 w-4" aria-hidden="true" />
          {{ t('company.badge') }}
        </span>
        <h2 class="mt-5 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
          {{ t('company.name') }}
        </h2>
        <p class="mt-2 text-lg font-medium text-primary-300">{{ t('company.tagline') }}</p>
        <p class="mx-auto mt-4 max-w-2xl text-gray-300">{{ t('company.text') }}</p>
      </div>

      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <div
          v-for="feature in features"
          :key="feature.key"
          v-motion-slide-bottom
          class="glass rounded-2xl p-6 text-center"
        >
          <span
            class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white"
          >
            <Icon :icon="feature.icon" class="h-6 w-6" aria-hidden="true" />
          </span>
          <h3 class="mt-4 font-display font-semibold text-white">
            {{ t(`company.features.${feature.key}.title`) }}
          </h3>
          <p class="mt-1 text-sm text-gray-300">{{ t(`company.features.${feature.key}.desc`) }}</p>
        </div>
      </div>

      <!-- CTA -->
      <div
        class="mx-auto mt-12 max-w-3xl rounded-3xl bg-white p-8 text-center shadow-2xl md:p-10 dark:bg-gray-900"
      >
        <h3 class="font-display text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          {{ t('company.ctaTitle') }}
        </h3>
        <p class="mx-auto mt-3 max-w-xl text-gray-600 dark:text-gray-400">
          {{ t('company.ctaText') }}
        </p>
        <a
          :href="COMPANY.url"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-primary mt-7 !px-8 !py-4 !text-base"
        >
          <Icon icon="ph:arrow-up-right-bold" class="h-5 w-5" aria-hidden="true" />
          {{ t('company.ctaBtn') }}
        </a>
        <div
          class="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400"
        >
          <span v-for="badge in badges" :key="badge" class="flex items-center gap-1.5">
            <Icon icon="ph:check-circle-bold" class="h-4 w-4 text-primary-600" aria-hidden="true" />
            {{ t(`company.badges.${badge}`) }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
