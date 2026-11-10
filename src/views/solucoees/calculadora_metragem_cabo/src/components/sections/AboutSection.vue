<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const items = [
  { icon: 'ph:lightning-bold', key: 'instant' },
  { icon: 'ph:browsers-bold', key: 'professional' },
  { icon: 'ph:clipboard-text-bold', key: 'export' },
  { icon: 'ph:squares-four-bold', key: 'versatile' },
]
</script>

<template>
  <section id="sobre" class="section scroll-mt-24 bg-gray-50 dark:bg-gray-950">
    <div class="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
      <div>
        <span
          class="badge bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300"
        >
          <Icon icon="ph:info-bold" class="h-4 w-4" aria-hidden="true" />
          {{ t('about.badge') }}
        </span>
        <h2 class="section-title mt-4 !text-left">{{ t('about.title') }}</h2>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-400">{{ t('about.intro') }}</p>

        <div class="mt-8 flex flex-wrap gap-4">
          <RouterLink to="/calculadora" class="btn-primary">
            <Icon icon="ph:calculator-bold" class="h-4 w-4" aria-hidden="true" />
            {{ t('common.useCalc') }}
          </RouterLink>
          <a href="#faq" class="btn-secondary">{{ t('common.knowMore') }}</a>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <div
          v-for="(item, i) in items"
          :key="item.key"
          v-motion-slide-bottom
          class="card p-5"
          :class="{ 'sm:translate-y-6': i % 2 === 1 }"
        >
          <span
            class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white"
          >
            <Icon :icon="item.icon" class="h-6 w-6" aria-hidden="true" />
          </span>
          <h3 class="mt-3 font-display font-semibold text-gray-900 dark:text-white">
            {{ t(`about.items.${item.key}.title`) }}
          </h3>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {{ t(`about.items.${item.key}.desc`) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
