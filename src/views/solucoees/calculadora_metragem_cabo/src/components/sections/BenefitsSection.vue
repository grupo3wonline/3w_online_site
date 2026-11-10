<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const items = [
  { icon: 'ph:target-bold', key: 'accurate', from: 'from-primary-500', to: 'to-primary-600' },
  { icon: 'ph:cursor-click-bold', key: 'intuitive', from: 'from-accent-500', to: 'to-accent-600' },
  { icon: 'ph:clock-countdown-bold', key: 'time', from: 'from-amber-500', to: 'to-orange-600' },
  { icon: 'ph:squares-four-bold', key: 'versatile', from: 'from-fuchsia-500', to: 'to-purple-600' },
]
</script>

<template>
  <section id="beneficios" class="section scroll-mt-24 bg-gray-50 dark:bg-gray-950">
    <div class="mx-auto max-w-7xl">
      <div class="text-center">
        <span
          class="badge bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300"
        >
          <Icon icon="ph:sparkle-bold" class="h-4 w-4" aria-hidden="true" />
          {{ t('nav.benefits') }}
        </span>
        <h2 class="section-title mt-4">{{ t('benefits.title') }}</h2>
        <p class="section-subtitle">{{ t('benefits.subtitle') }}</p>
      </div>

      <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="item in items"
          :key="item.key"
          v-motion-slide-bottom
          class="card card-hover group p-6 text-center"
        >
          <span
            class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform group-hover:scale-110"
            :class="[item.from, item.to]"
          >
            <Icon :icon="item.icon" class="h-8 w-8" aria-hidden="true" />
          </span>
          <h3 class="mt-5 font-display text-lg font-semibold text-gray-900 dark:text-white">
            {{ t(`benefits.items.${item.key}.title`) }}
          </h3>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {{ t(`benefits.items.${item.key}.desc`) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
