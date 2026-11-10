<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const steps = [
  { icon: 'ph:ruler-bold', key: 'one' },
  { icon: 'ph:calculator-bold', key: 'two' },
  { icon: 'ph:clipboard-text-bold', key: 'three' },
]

const tips = ['one', 'two', 'three'] as const
</script>

<template>
  <section id="como-funciona" class="section scroll-mt-24 bg-white dark:bg-gray-900">
    <div class="mx-auto max-w-7xl">
      <div class="text-center">
        <span
          class="badge bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-300"
        >
          <Icon icon="ph:path-bold" class="h-4 w-4" aria-hidden="true" />
          {{ t('nav.howItWorks') }}
        </span>
        <h2 class="section-title mt-4">{{ t('howItWorks.title') }}</h2>
        <p class="section-subtitle">{{ t('howItWorks.subtitle') }}</p>
      </div>

      <ol class="relative mt-16 grid gap-8 md:grid-cols-3">
        <!-- Linha conectora (desktop) -->
        <div
          class="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent md:block dark:via-primary-800"
          aria-hidden="true"
        ></div>

        <li
          v-for="(step, index) in steps"
          :key="step.key"
          v-motion-slide-bottom
          class="relative flex flex-col items-center text-center"
        >
          <span
            class="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-glow"
          >
            <Icon :icon="step.icon" class="h-8 w-8" aria-hidden="true" />
            <span
              class="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-bold text-primary-600 shadow dark:bg-gray-800"
            >
              {{ index + 1 }}
            </span>
          </span>
          <h3 class="mt-5 font-display text-lg font-semibold text-gray-900 dark:text-white">
            {{ t(`howItWorks.steps.${step.key}.title`) }}
          </h3>
          <p class="mt-2 max-w-xs text-sm text-gray-600 dark:text-gray-400">
            {{ t(`howItWorks.steps.${step.key}.desc`) }}
          </p>
        </li>
      </ol>

      <!-- Dicas -->
      <div
        class="mx-auto mt-14 max-w-3xl rounded-2xl border border-primary-200 bg-primary-50 p-6 dark:border-primary-900/50 dark:bg-primary-900/20"
      >
        <h3
          class="flex items-center gap-2 font-display text-lg font-semibold text-primary-800 dark:text-primary-300"
        >
          <Icon icon="ph:lightbulb-bold" class="h-5 w-5" aria-hidden="true" />
          {{ t('howItWorks.tipsTitle') }}
        </h3>
        <ul class="mt-4 grid gap-3 sm:grid-cols-1">
          <li
            v-for="tip in tips"
            :key="tip"
            class="flex items-start gap-2 text-sm text-primary-900 dark:text-primary-200"
          >
            <Icon
              icon="ph:check-circle-bold"
              class="mt-0.5 h-4 w-4 flex-shrink-0"
              aria-hidden="true"
            />
            {{ t(`howItWorks.tips.${tip}`) }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
